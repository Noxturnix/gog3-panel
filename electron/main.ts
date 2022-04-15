const { app, BrowserWindow, screen: electronScreen, ipcMain, dialog } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const ws = require("ws");

let wsserver;

const serveURL = serve({ directory: "." });
let mainWindow;

function loadVite(port) {
  mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
    console.log("Error loading URL, retrying", e);
    setTimeout(() => {
      loadVite(port);
    }, 200);
  });
}

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.ts")
    }
  });

  mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (!app.isPackaged) loadVite(3001);
  else serveURL(mainWindow);
};

app.once("ready", () => {
  wsserver = new ws.WebSocketServer({ host: "127.0.0.1", port: 3000 });

  wsserver.on("error", () => {
    dialog.showMessageBoxSync({
      message: "กรุณาปิด gog-backend ก่อนเปิดโปรแกรมนี้",
      type: "error"
    });
    process.exit(1);
  });

  createMainWindow();
});
app.on("activate", () => {
  if (!BrowserWindow.getAllWindows().length) {
    createMainWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("password", (_e, password) => {
  wsserver.clients.forEach((conn) => {
    if (conn.readyState === ws.WebSocket.OPEN) {
      conn.send(password);
    }
  });
});

<script lang="ts">
  let inputBox: HTMLInputElement;

  const clearInput = () => {
    inputBox.value = "";
  };

  const onSubmitPassword = () => {
    let password = inputBox.value;

    if (password) window.api.send("password", password);

    clearInput();
  };
</script>

<form on:submit|preventDefault={onSubmitPassword}>
  <h1>Enter password</h1>
  <div class="password-input-area">
    <label for="password">Password for current room</label>
    <input type="text" id="password" spellcheck="false" bind:this={inputBox} />
  </div>
  <input type="submit" value="Submit" id="submit" />
</form>

<style>
  form,
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .password-input-area {
    max-width: 36rem;
  }

  h1 {
    text-align: center;
  }

  label {
    align-self: flex-start;
    margin-top: 0.6rem;
    color: rgb(160, 160, 160);
    font-weight: 200;
  }

  #password {
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(120, 120, 120);
    color: white;
    min-width: 1rem;
    width: 100%;
    padding-bottom: 0.2rem;
    transition: border-bottom 100ms ease-in-out;
    font-family: "Kanit", sans-serif;
    cursor: text;
  }

  #password:focus {
    border-bottom: 1px solid rgb(255, 255, 255);
  }

  #submit {
    margin-top: 1.6rem;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 0.8rem;
    padding: 0.35rem 1rem;
    font-size: 1.2rem;
    font-family: "Kanit", sans-serif;
    transition: background 100ms ease-in-out;
  }

  #submit:hover {
    background: rgb(175, 175, 175);
  }
</style>

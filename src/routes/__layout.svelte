<script lang="ts">
  import "$lib/Kanit.css";
</script>

<div>
  <slot />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: default;
    user-select: none;
  }

  :global(body) {
    background: #333333;
    color: white;
    font-family: Kanit, sans-serif;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 2rem 4rem;
  }
</style>

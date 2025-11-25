<script lang="ts">
  let isMenuOpen = false;
  import NavBar from "../NavBar.svelte";

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<header class="header">
  <div class="header-container">
    <div class="inner-header">
      <!-- <NavBar/> -->
      <NavBar />
    </div>

    <button class="menu-toggle" on:click={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inner-header {
    width: 100%;
    padding: 0 9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

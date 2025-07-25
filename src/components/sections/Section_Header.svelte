<script lang="ts">
  let isMenuOpen = false
    import NavBar from '../NavBar.svelte'
 
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }
 
</script>

<header class="header">
  <div class="header-container">
    <div class="inner-header">
      <!-- <NavBar/> -->
      <NavBar />
    </div>






    <!-- <nav class="nav" class:active={isMenuOpen}>
      <a href="#home" class="nav-link">HOME</a>
      <a href="#about" class="nav-link">ABOUT</a>
      <a href="#services" class="nav-link">SERVICES</a>
      <a href="#references" class="nav-link">REFERENCES</a>
      <a href="#contact" class="nav-link">CONTACT</a>
    </nav> -->
    
    <button class="menu-toggle" on:click={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<style>
  .header {
  /*   background: rgb(124 136 151); */
    /* box-shadow: 0 2px 10px rgba(0,0,0,0.1); */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 80px;
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
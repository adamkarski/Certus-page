<script lang="ts">
  let isMenuOpen = false
    import NavBar from './NavBar.svelte'
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }
 
</script>

<header class="header">
  <div class="header-container">
   
    


    <NavBar/>






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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
 
  
  .nav {
    display: flex;
    gap: 40px;
  }
  
  .nav-link {
    color: #333;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    position: relative;
  }
  
  .nav-link:hover {
    color: #2c5aa0;
  }
  
  .nav-link:hover::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: #2c5aa0;
  }
  
  .menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    gap: 4px;
  }
  
  .menu-toggle span {
    width: 25px;
    height: 3px;
    background: #333;
    transition: 0.3s;
  }
  
  @media (max-width: 768px) {
    .nav {
      position: fixed;
      top: 80px;
      left: -100%;
      width: 100%;
      height: calc(100vh - 80px);
      background: white;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 50px 0;
      transition: left 0.3s ease;
    }
    
    .nav.active {
      left: 0;
    }
    
    .menu-toggle {
      display: flex;
    }
    
    .nav-link {
      font-size: 18px;
      padding: 15px 0;
    }
  }
</style>
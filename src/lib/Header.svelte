<script lang="ts">
  import Navigation from './Navigation.svelte';
  import Logo from './Logo.svelte';
  import MobileMenu from './MobileMenu.svelte';
  
  let isMenuOpen = false;
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<header class="bg-white shadow-lg border-b border-secondary-100 sticky top-0 z-50 backdrop-blur-sm">
  <div class="container-custom">
    <div class="flex items-center justify-between h-18 lg:h-24">
      <!-- Logo -->
      <Logo />
      
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        <Navigation />
        <div class="flex items-center space-x-4">
          <button class="btn-outline !px-6 !py-3 !text-sm">Kontakt</button>
          <button class="btn-primary !px-6 !py-3 !text-sm">Oferta</button>
        </div>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden p-3 rounded-lg hover:bg-secondary-100 transition-colors"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  <MobileMenu {isMenuOpen} {toggleMenu} />
</header>
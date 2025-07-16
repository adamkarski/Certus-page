<script lang="ts">
  export let isMenuOpen: boolean;
  export let toggleMenu: () => void;
  
  const navItems = [
    { label: 'Produkty', href: '#produkty' },
    { label: 'Rozwiązania', href: '#rozwiazania' },
    { label: 'Usługi', href: '#uslugi' },
    { label: 'O nas', href: '#o-nas' },
    { label: 'Wsparcie', href: '#wsparcie' },
  ];
</script>

{#if isMenuOpen}
  <div class="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-secondary-100 shadow-lg">
    <div class="container-custom py-4">
      <nav class="flex flex-col space-y-4">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="text-secondary-700 hover:text-primary-600 font-medium py-2 transition-colors duration-200"
            on:click={toggleMenu}
          >
            {item.label}
          </a>
        {/each}
        <div class="pt-4 border-t border-secondary-100 flex flex-col space-y-3">
          <button class="btn-outline justify-center">Kontakt</button>
          <button class="btn-primary justify-center">Oferta</button>
        </div>
      </nav>
    </div>
  </div>
{/if}
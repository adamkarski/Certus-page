<script lang="ts">
  const navItems = [
    { label: 'Produkty', href: '#produkty' },
    { label: 'Rozwiązania', href: '#rozwiazania' },
    { label: 'Usługi', href: '#uslugi' },
    { label: 'O nas', href: '#o-nas' },
    { label: 'Wsparcie', href: '#wsparcie' },
  ];
</script>

<nav class="flex items-center space-x-6">
  {#each navItems as item}
    <a 
      href={item.href} 
      class="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 relative group"
    >
      {item.label}
      <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
  {/each}
</nav>
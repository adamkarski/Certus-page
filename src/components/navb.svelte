<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { preloaderVisible } from '$lib/preloaderStore';
  let LottiePlayer;
  let scrolled = false;
  let showLottie = false;
  
  let isFocused = false;
  let isDropdownOpen = false;
  let dropdownTimeout;
  
  // Lista branż
  const branze = [
    { name: 'Motoryzacja', href: '/branze/motoryzacja' },
    { name: 'Lotnictwo', href: '/branze/lotnictwo' },
    { name: 'Medycyna', href: '/branze/medycyna' },
    { name: 'Elektronika', href: '/branze/elektronika' },
    { name: 'Przemysł spożywczy', href: '/branze/przemysl-spozywczy' },
    { name: 'Energetyka', href: '/branze/energetyka' }
  ];

  let query = ''
  let allPosts = [];
  let filteredPosts = [];







  onMount(async () => {
    // Dynamiczny import LottiePlayer
    const module = await import("@lottiefiles/svelte-lottie-player");
    LottiePlayer = module.LottiePlayer;

    // Obsługa scrolla
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Nasłuchuj na zmianę preloadera
    const unsubscribe = preloaderVisible.subscribe((visible) => {
      if (!visible) {
        showLottie = false;
        setTimeout(() => {
          showLottie = true; // wymuś ponowne renderowanie animacji
        }, 0);
      }
    });

    // Pobierz indeks przy ładowaniu komponentu
    const response = await fetch('/search-index.json');
    allPosts = await response.json();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        isFocused = true;
      });
      searchInput.addEventListener('blur', () => {
        isFocused = false;
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  });

  const search = () => {
    if (query.length < 2) {
      filteredPosts = [];
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    filteredPosts = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      return titleMatch || contentMatch;
    });
  };

  const reset = () => {
    query = ''
    filteredPosts = []
    active = false
  }

  function handleMouseEnter() {
    clearTimeout(dropdownTimeout);
    isDropdownOpen = true;
  }

  function handleMouseLeave() {
    dropdownTimeout = setTimeout(() => {
      isDropdownOpen = false;
    }, 150);
  }






</script>

<nav class="relative z-50" class:scrolled={scrolled}>
  <!-- Główna ramka navbar -->
  <div class="mx-auto max-w-7xl   px-4 sm:px-6 lg:px-8 ramka">
    <div class="relative menubar">
      <div class="flex items-center justify-between px-8 py-4 contenerNav">
        
        <!-- Logo -->
        <div class="flex items-center logoCertus">
          <a href="/" class="flex items-center space-x-2 group">
            {#if showLottie && LottiePlayer}
              <svelte:component this={LottiePlayer}
                src="https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json?" + Math.random()
                autoplay={true}
                loop={false}
                controls={false}
              />
            {/if}
          </a>
        </div>

        <!-- Menu główne -->
        <div class="hidden md:flex items-center space-x-1">
          <!-- Maszyny -->
          <a href="/maszyny" 
             class="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 font-medium">
            Maszyny
          </a>

          <!-- Branże z dropdown -->
          <div class="relative" 
               on:mouseenter={handleMouseEnter} 
               on:mouseleave={handleMouseLeave}>
            <button class="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 font-medium flex items-center space-x-1"
                    class:text-green-600={isDropdownOpen}
                    class:bg-green-50={isDropdownOpen}>
              <span>Branże</span>
              <svg class="w-4 h-4 transition-transform duration-300" 
                   class:rotate-180={isDropdownOpen}
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown menu -->
            {#if isDropdownOpen}
              <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                   transition:fly={{ y: -10, duration: 200 }}>
                <div class="py-2">
                  {#each branze as branza, i}
                    <a href={branza.href} 
                       class="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 border-l-4 border-transparent hover:border-green-500"
                       in:fade={{ delay: i * 50, duration: 200 }}>
                      {branza.name}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
          </div>

          <!-- Serwis -->
          <a href="#" 
             class="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 font-medium">
            Serwis
          </a>

          <!-- O nas -->
          <a href="/onas" 
             class="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 font-medium">
            O nas
          </a>
        </div>

        <!-- Prawa sekcja -->
        <div class="flex items-center space-x-4">
          <!-- Search Box -->
          <div class="relative">
            <div class="flex items-center">
              <input
                type="text"
                id="search-input"
                placeholder="Szukaj..."
                class="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                class:w-64={!isFocused}
                class:w-80={isFocused}
                bind:value={query}
                on:focus={() => (active = true)}
                on:keyup={search}
              />
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            {#if query.length > 2}
              <div class="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10">
                <div class="py-2">
                  <h3 class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Wyniki wyszukiwania
                  </h3>
                  {#if filteredPosts.length > 0}
                    <ul>
                      {#each filteredPosts as post}
                        <li>
                          <a href={post.slug} on:click={reset} class="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200">
                            <p class="font-semibold">{post.title}</p>
                            <p class="text-sm text-gray-500">{post.description}</p>
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {:else}
                    <p class="px-4 py-3 text-gray-500">Brak wyników dla "{query}"</p>
                  {/if}
                </div>
              </div>
            {/if}
          </div>

          <!-- Kontakt telefoniczny -->
          <div class="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <div class="text-right">
              <div class="text-sm opacity-90">Zadzwoń</div>
              <div class="font-bold">795 142 656</div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button class="md:hidden p-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>


<style lang="scss">
.ramka{
  display: flex;
  height: 95px;
  border-radius: 72px;
  background-color:rgba(190, 190, 190, 0.13) !important;
  .contenerNav{

    display: flex
;
    gap: 1rem;
    width: 100%;
    padding-top: 15px;
    flex-direction: row;
    margin-left: 12px;
    margin-right: 12px;
    @media screen and (max-width: 768px){
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
    }

  }
}
.logoCertus{
  min-width: 200px;
  padding-right: 3px;
}




</style>
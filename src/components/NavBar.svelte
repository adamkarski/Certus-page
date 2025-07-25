<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { preloaderVisible } from "$lib/preloaderStore";
  import { goto } from "$app/navigation";
  import { resetHeroSwiper } from "../lib/resetHeroSwiperStore";

  let LottiePlayer;
  let scrolled = false;
  let showLottie = false;

  let isFocused = false;
  let isDropdownOpen = false;
  let dropdownTimeout;
  let active = false; // Dodano deklarację 'active'

  // Lista branż
  const branze = [
    { name: "Motoryzacja", href: "/branze/motoryzacja" },
    { name: "Lotnictwo", href: "/branze/lotnictwo" },
    { name: "Medycyna", href: "/branze/medycyna" },
    { name: "Elektronika", href: "/branze/elektronika" },
    { name: "Przemysł spożywczy", href: "/branze/przemysl-spozywczy" },
    { name: "Energetyka", href: "/branze/energetyka" },
  ];

  let query = "";
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
    const response = await fetch("/search-index.json");
    allPosts = await response.json();

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        isFocused = true;
      });
      searchInput.addEventListener("blur", () => {
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

    filteredPosts = allPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      return titleMatch || contentMatch;
    });
  };

  const reset = () => {
    query = "";
    filteredPosts = [];
    active = false;
  };

  function handleMouseEnter() {
    clearTimeout(dropdownTimeout);
    isDropdownOpen = true;
  }

  function handleMouseLeave() {
    dropdownTimeout = setTimeout(() => {
      isDropdownOpen = false;
    }, 150);
  }

  function handleLogoClick() {
    resetHeroSwiper.set(true);
    goto("/");
  }
</script>

<nav class="relative z-50" class:scrolled>
  <!-- Główna ramka navbar -->
  <div class="px-4 sm:px-6 lg:px-8 ramka">
    <div class="relative menubar">
      <div class="flex items-center px-8 py-4 contenerNav">
        <!-- Logo -->
        <div class="flex items-center logoCertus">
          <a
            href="/"
            class="flex items-center space-x-2 group"
            on:click|preventDefault={handleLogoClick}
          >
            {#if showLottie && LottiePlayer}
              <svelte:component
                this={LottiePlayer}
                src="https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json"
                autoplay={true}
                loop={false}
                controls={false}
                height="auto"
                width="auto"
                background="transparent"
                controlsLayout="none"
              />
            {/if}
          </a>
        </div>

        <!-- Menu główne -->
        <div class="md:flex items-center space-x-1 menuItems">
     

          <!-- Maszyny z dropdown -->
          <div
            class="relative"
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}
            role="group"
          >
            <button
              class="dropdown-button flex items-center space-x-1"
              class:text-green-600={isDropdownOpen}
              class:bg-green-50={isDropdownOpen}
            >
              <span>Maszyny</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                class:rotate-180={isDropdownOpen}
                fill="none"
                stroke="#cbcbcb"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Dropdown menu -->
            {#if isDropdownOpen}
              <div
                class="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                transition:fly={{ y: -10, duration: 200 }}
              >
                <div class="py-2">
                  {#each branze as branza, i}
                    <a
                      href={branza.href}
                      class="submenu-item block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 border-l-4 border-transparent hover:border-green-500"
                      in:fade={{ delay: i * 50, duration: 200 }}
                    >
                      {branza.name}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
          </div>


               <!-- Bestselller -->
               <a href="#" class="nav-link"> Bestselller certus69 drop</a>


          <!-- Serwis -->
          <a href="/serwis" class="nav-link"> Serwis </a>

          <!-- O nas -->
          <a href="/onas" class="nav-link"> O nas </a>

          <!-- Kontakt -->
           <a href="/kontakt" class="nav-link"> Kontakt </a>

          <div class="flex items-right searchBox">
            <!-- Search Box -->
            <div class="relative">
              <div class="flex items-center">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Szukaj..."
                  class="search-input"
                  class:w-64={!isFocused}
                  class:w-80={isFocused}
                  bind:value={query}
                  on:focus={() => (active = true)}
                  on:keyup={search}
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              {#if query.length > 2}
                <div
                  class="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10"
                >
                  <div class="py-2">
                    <h3
                      class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      Wyniki wyszukiwania
                    </h3>
                    {#if filteredPosts.length > 0}
                      <ul>
                        {#each filteredPosts as post}
                          <li>
                            <a
                              href={post.slug}
                              on:click={reset}
                              class="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                            >
                              <p class="font-semibold">{post.title}</p>
                              <p class="text-sm text-gray-500">
                                {post.description}
                              </p>
                            </a>
                          </li>
                        {/each}
                      </ul>
                    {:else}
                      <p class="px-4 py-3 text-gray-500">
                        Brak wyników dla "{query}"
                      </p>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>

            <!-- Kontakt telefoniczny -->
            <div
              class="phone-contact hidden lg:flex items-center space-x-3 ml-4"
            >
              <div
                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  ></path>
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-90">Zadzwoń</div>
                <div class="font-bold">795 142 656</div>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button class="mobile-menu-button md:hidden p-2 rounded-xl ml-4">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
       
       
       
        </div>

        <!-- Spacer to push search and phone to the right -->
        <!--     <div class="flex-grow"></div> -->

        <!-- Search Box and Phone Contact Group -->
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  .menubar {
    width: 100%;
  }

.nav-link:first-of-type{
  margin-left: 25px;
}

  .searchBox {
    display: none;
    align-content: center;
    align-items: center;
    width: auto;
    #search-input{
      width: 100px;
    }
  }
  *:focus {
    outline: 0px solid #2c5aa0;
    outline-offset: 0px;
  }

  .menuItems {
    background: white;
    border-radius: 72px;
    color: #616d5d;
    font-size: 0.9em;
    font-weight: 200;
    margin-right: 20px;
    a {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .menuItems a:focus {
    outline: 0px solid #2c5aa0;
    outline-offset: 0px;
  }
  nav {
    width: 100%;
    margin-top: 2.3em;
  }
  .ramka {
    display: flex;
    height: 95px;
    border-radius: 72px;
    background-color: rgba(190, 190, 190, 0.13) !important;
    .contenerNav {
      display: flex;
      gap: 1rem;
      width: 100%;
      padding-top: 8px;
      flex-direction: row;
      margin-left: 12px;
      margin-right: 12px;
      justify-content: space-between;
    }
  }
  .logoCertus {
    min-width: 200px;
    padding-right: 3px;
  }

  .submenu-item:hover {
    color: #22c55e; /* text-green-600 */
    background-color: #f0fdf4; /* bg-green-50 */
    border-color: #22c55e; /* border-green-500 */
  }

  .nav-link {
    padding: 8px 16px; /* px-4 py-2 */
    color: #4b5563; /* text-gray-700 */
    transition: all 300ms ease-in-out; /* transition-all duration-300 */
    font-weight: 500; /* font-medium */
    border-radius: 12px; /* rounded-xl */

    &:hover {
      color: #22c55e; /* hover:text-green-600 */
      background-color: #f0fdf4; /* hover:bg-green-50 */
    }
  }

  .dropdown-button {
    padding: 8px 16px; /* px-4 py-2 */
    color: #4b5563; /* text-gray-700 */
    transition: all 300ms ease-in-out; /* transition-all duration-300 */
    font-weight: 500; /* font-medium */
    border-radius: 12px; /* rounded-xl */

    &:hover {
      color: #22c55e; /* hover:text-green-600 */
      background-color: #f0fdf4; /* hover:bg-green-50 */
    }
  }

  .search-input {
    background-color: #f9fafb; /* bg-gray-50 */
    border: 1px solid #e5e7eb; /* border border-gray-200 */
    border-radius: 12px; /* rounded-2xl */
    padding: 8px 40px 8px 16px; /* px-4 py-2 pr-10 */
    outline: none; /* focus:outline-none */
    transition: all 300ms ease-in-out; /* transition-all duration-300 */
    color: #6b7280; /* placeholder-gray-400 */

    &:focus {
      ring: 2px solid #22c55e; /* focus:ring-2 focus:ring-green-500 */
      border-color: transparent; /* focus:border-transparent */
    }
  }

  .phone-contact {
    padding: 12px 24px;
    border-radius: 12px;
    transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out; /* transition-all duration-300 */

    &:hover {
    }

    div:first-child {
      width: 32px; /* w-8 */
      height: 32px; /* h-8 */
      background-color: rgba(255, 255, 255, 0.2); /* bg-white/20 */
      border-radius: 9999px; /* rounded-full */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div:last-child {
      text-align: right;
    }

    .text-sm {
      font-size: 0.875rem; /* text-sm */
      opacity: 0.9; /* opacity-90 */
    }

    .font-bold {
      font-weight: 700; /* font-bold */
    }
  }

  .mobile-menu-button {
    color: #4b5563; /* text-gray-700 */
    transition: all 300ms ease-in-out; /* transition-all duration-300 */

    &:hover {
      color: #22c55e; /* hover:text-green-600 */
      background-color: #f0fdf4; /* hover:bg-green-50 */
    }
  }
</style>

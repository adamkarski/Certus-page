<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { preloaderVisible } from "$lib/preloaderStore";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { resetHeroSwiper } from "../lib/resetHeroSwiperStore";
  import kategorieMaszyn from "$lib/data/maszyny.json";
  import CtaButton from "./cta-button.svelte";

  // Reaktywne zmienne dla aktywnych linków
  $: currentPath = $page.url.pathname;
  $: isMaszynyActive =
    currentPath === "/maszyny" || currentPath.startsWith("/maszyny/");
  $: isSerwisActive =
    currentPath === "/serwis" || currentPath.startsWith("/serwis/");
  $: isOnasActive = currentPath === "/onas" || currentPath.startsWith("/onas/");
  $: isKontaktActive =
    currentPath === "/kontakt" || currentPath.startsWith("/kontakt/");

  // Reaktywna zmienna dla źródła Lottie w zależności od szerokości ekranu
  $: lottieSource = windowWidth < 900 
    ? "https://cdn.lottielab.com/l/82wmUWPKg24DUr.json"
    : "https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json";

  $: logoMini = windowWidth < 900
    ? "logomini"
    : "logofull";
  let LottiePlayer;
  let scrolled = false;
  let showLottie = false;
  let windowWidth = 0;
  let active = false;

  let isFocused = false;
  let isMaszynyDropdownOpen = false;
  let isBestsellerDropdownOpen = false;
  let dropdownTimeout;
  let hoveredCategory = kategorieMaszyn[0]; // Domyślnie pierwsza kategoria

  // Lista branż
  const branze = [
    { name: "Frezarki CNC", href: "/maszyny/#frezarki" },
    { name: "Plotery przemysłowe CNC", href: "/maszyny/#plotery" },
    { name: "Frezarki pięcioosiowe", href: "/maszyny/#piecioosiowe" },
    { name: "Grawerka CNC", href: "/maszyny/#grawerkicnc" },
    { name: "Plotery tnące linearne CNC", href: "/maszyny/#linearne" },
    { name: "Maszyny specjalityczne ", href: "/maszyny/#specjalistyczne" },
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

    // Obsługa zmiany rozmiaru okna
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Ustaw początkową wartość

    // Nasłuchuj na zmianę preloadera
    const unsubscribe = preloaderVisible.subscribe((visible) => {
      if (!visible) {
        showLottie = true;
      }
    });
    showLottie = true;

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
      window.removeEventListener("resize", handleResize);
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
  }

  function handleMouseLeave() {
    dropdownTimeout = setTimeout(() => {}, 150);
  }

  function handleLogoClick() {
    resetHeroSwiper.set(true);
    goto("/");
  }

  function handleMaszynyNavigation(event: MouseEvent, categoryId: string) {
    event.preventDefault();
    isMaszynyDropdownOpen = false; // Close dropdown on click
    if (currentPath.startsWith("/maszyny")) {
      // Already on /maszyny page, scroll to section
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to /maszyny page with hash
      goto(`/maszyny/#${categoryId}`);
    }
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-sel"
  class:scrolled
>
  <!-- Główna ramka navbar -->
  <div class="px-4 sm:px-6 lg:px-8 ramka">
    <div class="relative menubar">
      <div class="flex items-center px-8 py-4 contenerNav">
        <!-- Logo -->
        <div class="flex items-center logoCertus {logoMini}">
          <a
            href="/"
            class="flex items-center space-x-2 group"
            on:click|preventDefault={handleLogoClick}
          >
            {#if showLottie && LottiePlayer}
              <svelte:component
                this={LottiePlayer}
                src={lottieSource}
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
            class="relative dropDownMenu"
            on:mouseenter={() => (isMaszynyDropdownOpen = true)}
            on:mouseleave={() => (isMaszynyDropdownOpen = false)}
            role="group"
          >
            <a
              href="/maszyny"
              class="nav-link flex items-center space-x-1"
              class:active={isMaszynyActive}
            >
              <span>Maszyny</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                class:rotate-180={isMaszynyDropdownOpen}
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
            </a>

            <!-- Dropdown menu -->
            {#if isMaszynyDropdownOpen}
              <div
                class="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                transition:fly={{ y: -10, duration: 200 }}
              >
                <div class="flex">
                  <div class="w-1/3 py-4 px-2">
                    <ul>
                      {#each kategorieMaszyn as kategoria, i}
                        <li>
                          <a
                            href="#"
                            role="button"
                            on:click={(e) =>
                              handleMaszynyNavigation(e, kategoria.id)}
                            class="submenu-item block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 border-l-4 border-transparent hover:border-green-500 flex items-center"
                            on:mouseenter={() => (hoveredCategory = kategoria)}
                            in:fade={{ delay: i * 50, duration: 200 }}
                          >
                            {kategoria.title}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div
                    class="w-2/3 bg-gray-50 flex flex-col items-center justify-center p-4 image-container"
                  >
                    {#if hoveredCategory}
                      {#key hoveredCategory.id}
                        <img
                          src={hoveredCategory.img}
                          alt={hoveredCategory.title}
                          class="max-h-48 mx-auto mb-4 rounded-lg menu-image"
                          in:fade={{ delay: 150, duration: 150 }}
                          out:fade={{ duration: 150 }}
                        />
                      {/key}
                    {/if}
                  </div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Bestseller z dropdown -->
          <div
            class="relative dropDownMenu bestsellerDropDown"
            on:mouseenter={() => (isBestsellerDropdownOpen = true)}
            on:mouseleave={() => (isBestsellerDropdownOpen = false)}
            role="group"
          >
            <a href="javascript:void(0);" class="nav-link flex items-center space-x-1">
              <span>Bestseller</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                class:rotate-180={isBestsellerDropdownOpen}
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
            </a>

            <!-- Bestseller Dropdown menu -->
            {#if isBestsellerDropdownOpen}
              <div
                class="bestseller-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                transition:fly={{ y: -10, duration: 200 }}
              >
                <div class="bestseller-content p-6">
                  <div class="bestseller-header mb-4">
                    <!-- <div class="bestseller-badge">
                      <span class="badge-text"> BESTSELLER</span>
                    </div> -->
                    <h3 class="bestseller-title">Plotery przemysłowe CNC</h3>
                    <p class="bestseller-subtitle">
                      Najchętniej wybierane przez naszych klientów
                    </p>
                  </div>

                  <div class="bestseller-image mb-4">
                    <img
                      src="/assets/maszyny/combined_88930d1c.png"
                      alt="Plotery przemysłowe CNC - Bestseller"
                      class="bestseller-img"
                    />
                  </div>

                  <div class="bestseller-features mb-4">
                    <ul class="features-list">
                      <li>✓ Najwyższa precyzja cięcia</li>
                      <li>✓ Sprawdzone w tysiącach firm</li>
                      <li>✓ Kompleksowa obsługa serwisowa</li>
                    </ul>
                  </div>

                  <div class="bestseller-cta">
                    <CtaButton
                      text="Zobacz dlaczego wybierają nas"
                      on:click={() => {
                        isBestsellerDropdownOpen = false;
                        window.location.href = "/maszyny/#ploteryPrzemyslowe";
                      }}
                    />
                  </div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Serwis -->
          <a href="/serwis" class="nav-link" class:active={isSerwisActive}>
            <span>Serwis</span>
          </a>

          <!-- O nas -->
          <a href="/onas" class="nav-link" class:active={isOnasActive}>
            <span>O nas</span>
          </a>

          <!-- Kontakt -->
          <a
            href="/kontakt"
            class="nav-link kontakt-nav"
            class:active={isKontaktActive}
          >
            <span>Kontakt</span>
          </a>

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
  .bestsellerDropDown {
    margin-left: 0px !important;
    padding-left: 0px;
  }

  .menubar {
    width: 100%;
  }

  .nav-link.kontakt-nav {
    margin-right: 20px;
  }

  .searchBox {
    display: none;
    align-content: center;
    align-items: center;
    width: auto;
    #search-input {
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
    margin-right: 22px;
    height: 76px;
    margin-top: 2px;

    .dropDownMenu {
      margin-left: 25px;
    }
    a {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .menuItems a:focus {
    outline: 0px solid #788391;
    outline-offset: 0px;
  }
  nav {
    width: 100%;
    margin-top: 0;
    padding-top: 2.3em;
    background: transparent;
    transition: all 0.3s ease-in-out;
  }

  nav.scrolled {
    padding-top: 0em;
    background: rgba(50, 50, 50, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  nav.scrolled .ramka {
    padding-top: 0px;
    margin-left: 7.3em;
    margin-right: 7.3em;
    background-color: transparent !important;
  }

  nav.scrolled .menuItems {
    background: rgba(255, 255, 255, 0.95);
  }

  .ramka {
    display: flex;
    height: 95px;
    border-radius: 72px;
    margin-left: 8em;
    margin-right: 8em;
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
    color: var(--color-text-primary);
    background-color: var(--color-gray-100);
    border-color: var(--color-primary-dark);
  }

  .nav-link {
    padding: 8px 16px; /* px-4 py-2 */
    color: #4b5563; /* text-gray-700 */
    transition: all 300ms ease-in-out; /* transition-all duration-300 */
    font-weight: 500; /* font-medium */
    border-radius: 12px; /* rounded-xl */
    position: relative;
    overflow: hidden;

    &:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
      border-color: var(--color-primary-dark);
    }

    &.active {
      color: white !important;
      background-color: #788391 !important;
      // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27.38 16.53'%3E%3Cpath fill='%2396a500' d='M13.87,0S0,16.53,0,16.53c3.37,0,10.14,0,13.51,0,0,0,13.87-16.53,13.87-16.53'/%3E%3C/svg%3E") !important;
      background-repeat: no-repeat !important;
      background-position: center center !important;
      background-size: 100% 100% !important;
      position: relative;

      border-radius: 5 !important;

      span {
        position: relative;
        z-index: 2;
        font-weight: 600 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      &:hover {
        color: white !important;
        filter: brightness(0.9);
        background: #7e8c00 !important;
      }
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
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
    }
  }

  .mega-menu {
    width: 600px;
    padding: 24px;
    margin-top: 0px;
    margin-left: 210px;

    ul li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
    }
    .submenu-item:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
      border-color: var(--color-primary-dark);
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 200px; /* Adjust as needed */
  }

  .menu-image {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 100%;
    max-width: 100%;
  }

  /* Style dla bestseller dropdown */
  .bestseller-dropdown {
    width: 380px;
    z-index: 1000;
    padding: 24px;
    margin-top: 0px;
    // margin-left: 210px;
  }

  .bestseller-content {
    text-align: center;
  }

  .bestseller-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ffd700, #ffb347);
    color: #8b4513;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  }

  .bestseller-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .bestseller-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0;
    line-height: 1.4;
  }

  .bestseller-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9fafb;
    border-radius: 12px;
    padding: 16px;
    margin: 16px 0;
  }

  .bestseller-img {
    max-width: 100%;
    max-height: 160px;
    object-fit: contain;
    border-radius: 8px;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  .features-list li {
    font-size: 0.875rem;
    color: #374151;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .bestseller-cta {
    margin-top: 16px;
  }

  /* Dostosowanie CTA button w dropdown */
  .bestseller-dropdown :global(.cta-button) {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    font-size: 1rem;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bestseller-dropdown :global(.cta-button .maszyny_span) {
    text-align: center;
    width: 100%;
  }

  .bestseller-dropdown :global(.cta-svg) {
    margin-left: -60px;
  }

  /* Responsywność - dostosowanie menu poniżej 1160px */
  @media (max-width: 1160px) {
    .nav-link{
      font-size: 12px;
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
  }
</style>

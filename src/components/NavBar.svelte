<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { preloaderVisible } from "$lib/preloaderStore";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import kategorieMaszyn from "$lib/data/maszyny.json";
  import CtaButton from "./CtaButton.svelte";
  import { cubicOut } from "svelte/easing";
  import { activePage, resetHeroSwiper } from "$lib/visibilityStore";

  // State for mobile menu
  let isMobileMenuOpen = false;
  let isMobileMaszynyOpen = false;
  let autoExpandTimeout;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
      autoExpandTimeout = setTimeout(() => {
        isMobileMaszynyOpen = true;
      }, 2500);
    } else {
      clearTimeout(autoExpandTimeout);
      isMobileMaszynyOpen = false; // Close sub-menu when main menu closes
    }
  }

  function handleMaszynyToggle() {
    isMobileMaszynyOpen = !isMobileMaszynyOpen;
    clearTimeout(autoExpandTimeout);
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    isMobileMaszynyOpen = false;
  }

  // Reactive variables for active links
  $: currentPath = $page.url.pathname;
  $: isMaszynyActive = currentPath.startsWith("/maszyny");
  $: isSerwisActive = currentPath.startsWith("/serwis");
  $: isOnasActive = currentPath.startsWith("/onas");
  $: isKontaktActive = currentPath.startsWith("/kontakt");
  $: isHomeActive = currentPath === "/";

  // Update active page store
  $: {
    if (isHomeActive) {
      activePage.set("home");
    } else if (isMaszynyActive) {
      activePage.set("maszyny");
    } else if (isSerwisActive) {
      activePage.set("serwis");
    } else if (isOnasActive) {
      activePage.set("onas");
    } else if (isKontaktActive) {
      activePage.set("kontakt");
    }
  }

  // Lottie player setup
  let LottiePlayer;
  let scrolled = false;
  let showLottie = false;
  let windowWidth = 0;
  $: lottieSource =
    windowWidth > 757 && windowWidth < 900
      ? "https://cdn.lottielab.com/l/82wmUWPKg24DUr.json"
      : "https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json";
  $: logoMini =
    windowWidth > 757 && windowWidth < 900 ? "logomini" : "logofull";

  // Dropdown state
  let isMaszynyDropdownOpen = false;
  let isBestsellerDropdownOpen = false;
  let hoveredCategory = kategorieMaszyn[0];

  onMount(() => {
    let cleanup: () => void;

    (async () => {
      const module = await import("@lottiefiles/svelte-lottie-player");
      LottiePlayer = module.LottiePlayer;

      const handleScroll = () => {
        scrolled = window.scrollY > 50;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      const handleResize = () => {
        windowWidth = window.innerWidth;
        if (window.innerWidth > 757 && isMobileMenuOpen) {
          closeMobileMenu();
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();

      const unsubscribe = preloaderVisible.subscribe((visible) => {
        if (!visible) {
          showLottie = true;
        }
      });
      showLottie = true;

      cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        unsubscribe();
      };
    })();

    return () => cleanup && cleanup();
  });

  function handleLogoClick() {
    resetHeroSwiper.set(true);
    closeMobileMenu();
    goto("/");
  }

  async function handleMaszynyNavigation(categoryId: string) {
    isMaszynyDropdownOpen = false;
    closeMobileMenu();
    await tick();

    if (currentPath.startsWith("/maszyny")) {
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      goto(`/maszyny/#${categoryId}`);
    }
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-sel"
  class:scrolled
>
  <div class="px-4 sm:px-6 lg:px-8 ramka">
    <div class="relative menubar">
      <div class="flex items-center justify-between px-8 py-4 contenerNav">
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
                autoplay
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

        <div class="desktop-menu-items">
          <div
            class="relative dropDownMenu"
            on:mouseenter={() => (isMaszynyDropdownOpen = true)}
            on:mouseleave={() => (isMaszynyDropdownOpen = false)}
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
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path></svg
              >
            </a>
            {#if isMaszynyDropdownOpen}
              <div class="mega-menu" transition:fly={{ y: -10, duration: 200 }}>
                <div class="flex">
                  <div class="w-1/3 py-4 px-2">
                    <ul>
                      {#each kategorieMaszyn as kategoria, i}
                        <li>
                          <a
                            href="#"
                            role="button"
                            on:click|preventDefault={() =>
                              handleMaszynyNavigation(kategoria.id)}
                            class="submenu-item"
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
            <a
              href="javascript:void(0);"
              class="nav-link flex items-center space-x-1"
            >
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
                    <CtaButton classs="bestseller"
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

          <a href="/serwis" class="nav-link" class:active={isSerwisActive}
            >Serwis</a
          >
          <a href="/onas" class="nav-link" class:active={isOnasActive}>O nas</a>
          <a
            href="/kontakt"
            class="nav-link kontakt-nav"
            class:active={isKontaktActive}>Kontakt</a
          >
        </div>

        <div class="mobile-menu-button-container">
          <button
            class="mobile-menu-button"
            on:click={toggleMobileMenu}
            aria-label="Otwórz menu"
            class:is-open={isMobileMenuOpen}
          >
            <div class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  {#if isMobileMenuOpen}
    <div
      class="mobile-menu-overlay"
      on:click={closeMobileMenu}
      transition:fade={{ duration: 200 }}
    >
      <div
        class="mobile-menu-content"
        on:click|stopPropagation
        transition:fly={{ x: "-100%", duration: 300, easing: cubicOut }}
      >
        <div class="mobile-menu-header">
          {#if LottiePlayer}
            <svelte:component
              this={LottiePlayer}
              src={"https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json"}
              autoplay
              loop={false}
              controls={false}
              height="auto"
              width="180px"
              background="transparent"
              controlsLayout="none"
            />
          {/if}
        </div>
        <div class="mobile-links-container">
          <button
            class="mobile-nav-link expandable"
            on:click={() => (isMobileMaszynyOpen = !isMobileMaszynyOpen)}
          >
            Maszyny
            <svg
              class="w-6 h-6 transition-transform duration-300"
              class:rotate-180={isMobileMaszynyOpen}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path></svg
            >
          </button>
          {#if isMobileMaszynyOpen}
            <div class="mobile-submenu">
              {#each kategorieMaszyn as kategoria}
                <a
                  href="#"
                  on:click|preventDefault={() =>
                    handleMaszynyNavigation(kategoria.id)}
                  class="mobile-submenu-link">{kategoria.title}</a
                >
              {/each}
            </div>
          {/if}
          <a
            href="/maszyny/#ploteryPrzemyslowe"
            class="mobile-nav-link"
            on:click={closeMobileMenu}>Bestseller</a
          >
          <a href="/serwis" class="mobile-nav-link" on:click={closeMobileMenu}
            >Serwis</a
          >
          <a href="/onas" class="mobile-nav-link" on:click={closeMobileMenu}
            >O nas</a
          >
          <a href="/kontakt" class="mobile-nav-link" on:click={closeMobileMenu}
            >Kontakt</a
          >
        </div>
      </div>
    </div>
  {/if}
</nav>

<style lang="scss">
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

  .desktop-menu-items {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: white;
    border-radius: 72px;
    color: #616d5d;
    font-size: 0.9em;
    font-weight: 200;
    margin-right: 22px;
    height: 76px;
    margin-top: 2px;
    padding: 0 1rem;
  }

  .mobile-menu-button-container {
    display: none;
  }

  .mobile-menu-button {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1002;
    position: relative;
  }

  .hamburger-icon {
    width: 28px;
    height: 20px;
    position: relative;
    transition: all 0.8s ease-in-out !important;

    span {
      display: block;
      position: absolute;
      height: 4px;
      width: 100%;
      background: #f3f3f3;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: all 0.25s ease-in-out;
    }

    span:nth-child(1) {
      top: 0px;
    }
    span:nth-child(2) {
      top: 8px;
    }
    span:nth-child(3) {
      top: 16px;
    }
  }

  .mobile-menu-button.is-open .hamburger-icon {
    span {
      background: #fff;
    }
    span:nth-child(1) {
      top: 8px;
      transform: rotate(135deg);
    }
    span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }
    span:nth-child(3) {
      top: 8px;
      transform: rotate(-135deg);
    }
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: flex-start;
  }

  .mobile-menu-content {
    background: #232c32;
    min-width: 84vw;
    height: 100%;
    display: flex;
    padding-top: 42px !important;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.5rem;
    padding: 2rem;
    transform-origin: left center;
    box-shadow: 5px 0px 25px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
  }

  .mobile-menu-header {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
  }

  .mobile-links-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .mobile-nav-link {
    color: white;
    font-size: 1.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.5rem 0;
    cursor: pointer;

    &.expandable {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:hover {
      color: #96a500;
    }
  }

  .mobile-submenu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1.5rem;
    border-left: 2px solid #96a500;
    margin: 0.5rem 0;
  }

  .mobile-submenu-link {
    color: #e0e0e0;
    font-size: 1.2rem;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #96a500;
    }
  }

  /* Responsywność nawigacji - uporządkowana */
  
  /* Średnie ekrany - lekkie zmniejszenie */
  @media (min-width: 758px) and (max-width: 1024px) {
    .ramka {
      transform: scale(0.85);
      transform-origin: center;
    }
  }
  
  /* Małe ekrany - większe zmniejszenie */
  @media (min-width: 481px) and (max-width: 757px) {
    .desktop-menu-items {
      display: none;
    }
    .mobile-menu-button-container {
      display: block;
    }
    .ramka {
      margin-left: 1em !important;
      margin-right: 1em !important;
      transform: scale(0.7);
      transform-origin: center;
    }
    .contenerNav {
      margin-top: 8px;
    }
    .mobile-menu-button-container {
      margin-right: 36px !important;
    }
  }

  /* Bardzo małe ekrany - największe zmniejszenie */
  @media (max-width: 480px) {
    .desktop-menu-items {
      display: none;
    }
    .mobile-menu-button-container {
      display: block;
    }
    .ramka {
      margin-left: 0.5em !important;
      margin-right: 0.5em !important;
      transform: scale(0.6);
      transform-origin: center;
    }
    .contenerNav {
      margin-top: 8px;
    }
    .mobile-menu-button-container {
      margin-right: 20px !important;
    }
  }

  // Existing styles from the original file
  .bestsellerDropDown {
    margin-left: 0px !important;
    padding-left: 0px;
  }

  .menubar {
    width: 100%;
  }

  .nav-link.kontakt-nav {
    /*  margin-right: 20px; */
  }

  *:focus {
    outline: 0px solid #2c5aa0;
    outline-offset: 0px;
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

  nav.scrolled .desktop-menu-items {
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

  .submenu-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #374151;
    transition: all 0.2s;
    border-left: 4px solid transparent;
    &:hover {
      color: #16a34a;
      background-color: #f0fdf4;
      border-color: #22c55e;
    }
  }

  .nav-link {
    min-width: 75px;
    padding: 8px 16px;
    color: #4b5563;
    transition: all 300ms ease-in-out;
    font-weight: 500;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
    }

    &.active {
      color: white !important;
      background-color: #788391 !important;
      border-radius: 20px !important;

      span {
        position: relative;
        z-index: 2;
        font-weight: 600 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      &:hover {
        filter: brightness(1.1);
      }
    }
  }

  .mega-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #f3f4f6;
    overflow: hidden;
    width: 600px;
    padding: 1rem;

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
</style>

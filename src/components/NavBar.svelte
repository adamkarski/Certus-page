<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { browser } from "$app/environment";
  import { fly, fade, slide } from "svelte/transition";
  import { preloaderVisible } from "$lib/preloaderStore";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import kategorieMaszyn from "$lib/data/maszyny.json";
  import CtaButton from "./CtaButton.svelte";
  import MachineTitleSvg from "$lib/components/MachineTitleSvg.svelte";
  import { cubicOut } from "svelte/easing";
  import { activePage, resetHeroSwiper } from "$lib/visibilityStore";
  import { scrollToElement } from "$lib/utils/smoothScroll";

  // State for mobile menu
  let isMobileMenuOpen = false;
  let isMobileMaszynyOpen = false;
  let autoExpandTimeout: number;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
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

  $: if (browser) {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("mobile-nav-locked");
      document.body.classList.add("mobile-nav-locked");
    } else {
      document.documentElement.classList.remove("mobile-nav-locked");
      document.body.classList.remove("mobile-nav-locked");
    }
  }

  onDestroy(() => {
    if (browser) {
      document.documentElement.classList.remove("mobile-nav-locked");
      document.body.classList.remove("mobile-nav-locked");
    }
  });

  // Reactive variables for active links
  $: currentPath = $page.url.pathname;
  $: isHmpG1Active = currentPath.startsWith("/hmp-g1");
  $: isMaszynyActive = currentPath.startsWith("/maszyny");
  $: isBestsellerActive = currentPath.startsWith("/bestseller");
  $: isSerwisActive = currentPath.startsWith("/serwis");
  $: isDokumentacjaActive = currentPath.startsWith("/dokumentacja");
  $: isOnasActive = currentPath.startsWith("/onas");
  $: isKontaktActive = currentPath.startsWith("/kontakt");

  $: isHomeActive = currentPath === "/";

  // Update active page store
  // $: {
  //   if (isHomeActive) {
  //     activePage.set("home");
  //   } else if (isMaszynyActive) {
  //     activePage.set("maszyny");
  //   } else if (isBestsellerActive) {
  //     activePage.set("bestseller");
  //   } else if (isSerwisActive) {
  //     activePage.set("serwis");
  //   } else if (isOnasActive) {
  //     activePage.set("onas");
  //   } else if (isKontaktActive) {
  //     activePage.set("kontakt");
  //   }else if (isSpecialActive) {
  //     activePage.set("maszyny-specjalistyczne");
  //   }else if (isDoclActive) {
  //     activePage.set("dokumentacja");
  //   }
  // }

  // Lottie player setup
  let LottiePlayer: any;
  let scrolled = false;
  let showLottie = false;
  let windowWidth = 0;
  let ramkaEl: HTMLElement;
  let desktopMenuEl: HTMLElement;
  let isSmallLogo = false;

  // Programowe dopasowanie logo:
  // Mierzymy czy w ramce mieści się pełne logo z typografią (szerokość 210px + marginesy).
  // Jeśli jest pełne menu desktopowe, sprawdzamy: czy dostępne miejsce w ramce >= szerokość menu + pełne logo + odstępy.
  // Jeśli jest hamburger, pełne logo mieści się zawsze (o ile ramka ma min. 320px).
  function checkLogoFit() {
    if (!ramkaEl) return;
    const ramkaWidth = ramkaEl.clientWidth;
    const isDesktopVisible =
      desktopMenuEl &&
      window.getComputedStyle(desktopMenuEl).display !== "none";

    if (isDesktopVisible) {
      const menuWidth = desktopMenuEl.offsetWidth || 650;
      // 175px (pełne logo) + 20px (gap) + menuWidth + 24px (marginesy kapsuły)
      const neededForFull = 175 + 20 + menuWidth + 24;
      isSmallLogo = ramkaWidth < neededForFull;
    } else {
      isSmallLogo = ramkaWidth < 460;
    }
  }

  $: lottieSource = isSmallLogo
    ? "/lottie_logo_sygnet.json"
    : "/lottie_logo_full.json";
  $: logoMini = isSmallLogo ? "logomini" : "logofull";

  // Dropdown state
  let isMaszynyDropdownOpen = false;
  let isBestsellerDropdownOpen = false;
  let hoveredCategory: any = kategorieMaszyn[0];
  let megaMenuEl: HTMLElement;

  // Reposition megamenu to stay within the viewport
  function positionMegaMenu() {
    if (!megaMenuEl) return;

    const navLink = megaMenuEl.parentElement?.querySelector("a.nav-link");
    const categoryList = megaMenuEl.querySelector(
      ".megamenu-category-list",
    ) as HTMLElement;

    if (!navLink || !categoryList) return;

    // Use getBoundingClientRect for all measurements to get consistent, viewport-relative values.
    const navLinkRect = navLink.getBoundingClientRect();
    const megaMenuRect = megaMenuEl.getBoundingClientRect();
    const categoryListRect = categoryList.getBoundingClientRect();
    const parentRect = (
      megaMenuEl.offsetParent as HTMLElement
    ).getBoundingClientRect();

    // Calculate the offset of the category list relative to the mega menu's edge.
    const listInternalOffsetLeft = categoryListRect.left - megaMenuRect.left;

    // Calculate the ideal left position for the mega-menu (in viewport coordinates)
    // to make the category list's right edge align with the nav link's right edge.
    const idealLeft_viewport =
      navLinkRect.right - categoryListRect.width - listInternalOffsetLeft;

    // --- Viewport Collision Detection ---
    let finalLeft_viewport = idealLeft_viewport;
    const menuWidth = megaMenuEl.offsetWidth;
    const viewportWidth = window.innerWidth;

    // Check for and correct right overflow
    if (finalLeft_viewport + menuWidth > viewportWidth - 20) {
      finalLeft_viewport = viewportWidth - menuWidth - 20; // 20px padding
    }

    // Check for and correct left overflow
    if (finalLeft_viewport < 20) {
      finalLeft_viewport = 20; // 20px padding
    }

    // Convert the final viewport-relative 'left' coordinate to a parent-relative
    // value needed for the CSS 'left' property.
    const finalLeft_parent = finalLeft_viewport - parentRect.left;

    megaMenuEl.style.left = `${finalLeft_parent}px`;
    megaMenuEl.style.transform = "none"; // Override any CSS transform for positioning
  }

  // Recalculate position when menu opens
  $: if (isMaszynyDropdownOpen && megaMenuEl) {
    // Use timeout to wait for DOM to update and get correct dimensions
    setTimeout(positionMegaMenu, 0);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isMobileMenuOpen && event.key === "Escape") {
      closeMobileMenu();
    }
  }

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
        if (window.innerWidth >= 1024 && isMobileMenuOpen) {
          closeMobileMenu();
        }
        checkLogoFit();
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      setTimeout(checkLogoFit, 50);

      window.addEventListener("keydown", handleKeyDown);

      const unsubscribe = preloaderVisible.subscribe((visible) => {
        if (!visible) {
          showLottie = true;
        }
      });
      showLottie = true;

      cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeyDown);
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
      // Używamy wspólnej funkcji scrollowania z smooth easing
      scrollToElement(categoryId, 1000, 140); // 1 sekunda animacji, 140px offset
    } else {
      goto(`/maszyny/#${categoryId}`);
    }
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-sel"
  class:scrolled
>
  <div class="ramka" bind:this={ramkaEl}>
    <div class="relative menubar">
      <div class="flex items-center justify-between contenerNav">
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

        <div class="desktop-menu-items" bind:this={desktopMenuEl}>
          <a
            href="/hmp-g1/"
            class="nav-link nav-pill-nowosc"
            class:active={isHmpG1Active}
          >
            Nowość: HMP-G1
          </a>
          <div
            class="relative dropDownMenu maszynyDropdown"
            role="group"
            on:mouseenter={() => (isMaszynyDropdownOpen = true)}
            on:mouseleave={() => (isMaszynyDropdownOpen = false)}
          >
            <a
              href="/maszyny/"
              class="nav-link flex items-center space-x-1"
              class:active={isMaszynyActive}
              on:click={() => (isMaszynyDropdownOpen = false)}
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
            <div
              class="mega-menu"
              class:open={isMaszynyDropdownOpen}
              bind:this={megaMenuEl}
            >
              <div class="flex items-stretch">
                <div class="w-1/3 py-4 px-2 megamenu-category-list">
                  <ul>
                    {#each kategorieMaszyn as kategoria, i}
                      <li>
                        {#if !kategoria.url}
                          <a
                            href="/maszyny/#{kategoria.id}"
                            class="submenu-item {kategoria.id}"
                            role="button"
                            on:mouseenter={() => (hoveredCategory = kategoria)}
                          >
                            {kategoria.title}
                          </a>
                        {/if}

                        {#if kategoria.url}
                          <a
                            href={kategoria.url.endsWith('/') ? kategoria.url : `${kategoria.url}/`}
                            class="submenu-item {kategoria.id}"
                            role="button"
                            on:mouseenter={() => (hoveredCategory = kategoria)}
                          >
                            {kategoria.title}
                          </a>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                </div>
                <div
                  class="w-2/3 bg-gray-50 flex items-center justify-center p-3 image-container"
                >
                  {#if hoveredCategory}
                    {#key hoveredCategory.id}
                      <a
                        href={hoveredCategory.url ? (hoveredCategory.url.endsWith('/') ? hoveredCategory.url : `${hoveredCategory.url}/`) : `/maszyny/#{hoveredCategory.id}`}
                        on:click|preventDefault={() =>
                          handleMaszynyNavigation(hoveredCategory.id)}
                      >
                        <img
                          src={hoveredCategory.img}
                          alt={hoveredCategory.title}
                          class="menu-image"
                        />
                      </a>
                    {/key}
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Bestseller z dropdown -->
          <div
            class="relative dropDownMenu bestsellerDropDown"
            on:mouseenter={() => (isBestsellerDropdownOpen = true)}
            on:mouseleave={() => (isBestsellerDropdownOpen = false)}
            role="group"
          >
            <a
              href="/bestseller/"
              class="nav-link flex items-center space-x-1"
              class:active={isBestsellerActive}
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
            <div
              class="bestseller-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              class:open={isBestsellerDropdownOpen}
            >
              <a
                href="/bestseller/"
                on:click={() => (isBestsellerDropdownOpen = false)}
                class="bestseller-link-wrapper"
              >
                <div class="bestseller-content p-6">
                  <div class="bestseller-header mb-4">
                    <div class="bestseller-title">
                      <MachineTitleSvg
                        text="CERTUS 69"
                        height="1.55em"
                        shadow={false}
                        className="bestseller-svg-title"
                      />
                    </div>
                  </div>

                  <div class="bestseller-image mb-3">
                    <img
                      src="/assets/maszyny/certus-69_hmp_style/c69-hero-render.webp"
                      alt="CERTUS 69"
                      class="bestseller-img"
                    />
                  </div>

                  <p class="bestseller-subtitle mb-4">
                    Najchętniej wybierana przez naszych klientów
                  </p>

                  <div class="bestseller-cta">
                    <CtaButton text="Sprawdź szczegóły" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          <a href="/serwis/" class="nav-link" class:active={isSerwisActive}
            >Serwis</a
          >
          <a href="/onas/" class="nav-link" class:active={isOnasActive}>O nas</a>
          <a
            href="/kontakt/"
            class="nav-link kontakt-nav"
            class:active={isKontaktActive}>Kontakt</a
          >
        </div>

        <div class="mobile-menu-button-container">
          <button
            class="mobile-menu-button"
            on:click={toggleMobileMenu}
            aria-label="Otwórz menu"
            aria-expanded={isMobileMenuOpen}
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
      role="region"
      aria-label="Pełnoekranowe menu"
      transition:fade={{ duration: 200 }}
    >
      <div
        class="mobile-menu-content"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        tabindex="-1"
        transition:fly={{ x: "-100%", duration: 300, easing: cubicOut }}
      >
        <div class="mobile-menu-header">
          <a
            href="/"
            class="mobile-menu-logo"
            on:click={closeMobileMenu}
            aria-label="Strona główna CERTUS"
          >
            <svg
              id="logo_certus_mobile"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1588.85 323.45"
              width="170"
              height="35"
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M165.49.05c9.5.27,19.77,1.54,29.18,3.46,42.62,8.7,81.09,35.31,103.93,72.15l-24.38,24.82c18.63,34.26,19.93,76.36,3.58,111.79l26.17,26.61c-22.22,41.57-63.26,71.97-109.6,81.32C106.72,337.89,21.05,281.58,3.32,194.32-16.87,94.95,57.55,2.96,158.2.05c2.4-.07,4.89-.07,7.29,0h0ZM161.48,74.37c-2.48-7.75-4.51-15.5-5.77-23.56-.36-2.28-.31-5.1-.8-7.22-.08-.36-.08-.71-.52-.83-20.67,2.01-40.28,9.22-57.2,21.11-19.62,13.78-37.39,36.5-43.1,60.05-2.33,9.59-3.66,19.69-4.55,29.52l3.46-13.48c4.41-14.37,10.65-28.62,22.8-38.08l1.46-.03,16.22,5.92c16.52-20.28,41.43-33.63,68-33.4h0ZM269.3,103.28c-11.67-20.73-24.05-31.51-44.4-43.63-1.13-.68-2.69-1.94-3.98-1.85,13.73,10.64,28.11,23.26,33.73,40.27,1.48,4.49,2.33,9.25,3.77,13.76l-.11.79-15.1,14.12c8.74,20.83,9.43,43.87,1.78,65.15-.97,2.71-2.33,5.26-3.27,7.98.18.46.54.43.91.56,5.13,1.73,11.72,2.61,17.22,4.29,4.38,1.34,8.66,3.01,12.99,4.5,15.5-32.8,14.28-74.27-3.55-105.94h0ZM162.88,77.35c-25.33-.47-50.37,11.71-65.95,31.46,4.73,2.07,10,4.44,12.91,8.95,5.27,8.19,5.41,30.18,4.17,39.81-2.36,18.47-10.58,35.04-22.79,48.88,13.73,22.59,39.04,37.98,65.52,39.34-.91-4.7-1.39-10.89.19-15.47,2.43-7.07,17.36-17.17,24-20.84,15.48-8.55,32.7-12.18,50.38-10.86,1.51.11,6.09,1.17,7.12.55,10.87-21.41,11.87-47.97,2.19-69.97-2.76,1.62-5.45,3.44-8.67,4.11-12.64,2.63-32.98-10.29-42.4-18.3-11.85-10.08-19.82-23.88-26.67-37.66h0ZM157.45,248.92c-28.04-1.2-53.44-16.99-68.73-40.1-5.8,6.98-13.03,12.7-19.78,18.76,18.6,27.1,49.4,45.52,82.19,49.33,10.09,1.17,21.23.29,31.14-1.95,14.38-3.26,27.58-11.53,40.11-18.95l-15.49,6.38c-15.1,5.35-31,8.2-46.54,2.68l-2.9-16.15h0Z"
              />
              <path
                fill="#ffffff"
                d="M1256.61,76.2l-29.73,113.31c-2.67,9.79,1.43,19.76,12.41,20.77l69.61.03,35.23-134.1h43.03l-45.08,171.27-121.03-.03c-31.92-3.35-44.5-20.14-39.09-51.8,3.25-19.04,10.26-37.94,15.17-56.62,2.22-8.43,4.46-17.02,5.5-25.66h-66.01l-34.28,134.08h-43.03l34.28-134.08h-65.64l9.48-37.16h219.18Z"
              />
              <path
                fill="#ffffff"
                d="M1588.84,76.2l-10.44,37.12-116.28.05c-10.33.41-24.31,19.04-14.16,26.9,7.32,5.66,26.91,3.21,36.04,2.98,25.72-.65,69.83-3.99,75.2,30.16,5.89,37.48-29.63,70.6-64.99,74.04h-123.81c1.68-8.56,3.58-17.17,5.94-25.58.49-1.76,2.99-11.13,4.15-11.52l115.54-.06c9.93-.32,21.77-14.08,17.16-23.69-4.26-8.88-23.27-6.72-31.36-6.53-33.59.77-85.52,7.14-82.63-42.11,1.39-23.67,20.75-45.03,41.34-54.88,11.71-5.61,22.28-5.94,35.06-6.51,28.93-1.29,57.85-.06,86.79.03,8.83.03,17.63-.43,26.46-.38v-.02Z"
              />
              <path
                fill="#ffffff"
                d="M841.24,113.36c-.14-2.22.46-4.4.91-6.56,1.63-7.85,4.07-17.16,6.57-24.77.58-1.76,1.31-5.52,3.3-5.8l121.05-.03c56.21,5.11,47.15,68.91,8.54,92.7-13.35,8.22-30.02,11.29-45.55,11.51l43.76,67.04h-53.06c-.64-1.3-.78-2.2-1.56-3.54-2.09-3.57-5.9-7.7-8.4-11.28-7.36-10.54-14.19-21.47-21.65-31.93-3.57-5-9.46-14.05-13.78-17.93s-9.95-3.26-14.75-1.24l-16.99,65.92h-44.13l27.02-104.17c20.23-.17,40.47.09,60.7-.02s39.04-.58,58.53-.55c10.98-2.07,23.63-18.63,10.44-26.5-.71-.43-5.52-2.85-5.9-2.85h-115.06.01Z"
              />
              <path
                fill="#ffffff"
                d="M579.04,141.42c2.34-11.91,5.2-25.45-10.49-27.95-12.51-2-30.14-1.56-42.95-.84-19.5,1.09-27.61,4.66-33.82,23.78-5.07,15.61-10.21,35.11-13.28,51.22-2.72,14.28-.4,21.13,15.02,22.66,13.81,1.37,35.19,1.72,48.86,0,15.86-1.99,22.44-14.25,26.08-28.42h42.3c-5.08,35.32-30.25,60.73-65.87,65.17-23.04,2.87-57.97,2.68-80.74-1.58-47-8.81-31.21-51.9-22.5-85.16s15.8-62.89,48.63-77.48c20.03-8.9,50.73-8.05,72.5-7.32,14.15.47,35.83.62,47.94,8.21,20.02,12.56,18.03,38.22,10.79,57.72h-42.49.02Z"
              />
              <path
                fill="#ffffff"
                d="M805.5,143.24l-9.17,37.11-112.66.21c-2.13.51-3.09,4.86-3.72,6.85-2.34,7.35-3.83,15.31-5.37,22.87h113.42c-2.76,12.56-5.76,25.09-10.21,37.16h-155.72l26.07-104.21h157.36Z"
              />
              <path
                fill="#ffffff"
                d="M823.37,76.2l-9.48,37.16h-157.18c3.08-12.43,5.38-25.13,9.85-37.16h156.81Z"
              />
            </svg>
          </a>
          <button
            type="button"
            class="mobile-menu-close-btn"
            on:click={closeMobileMenu}
            aria-label="Zamknij menu"
          >
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="mobile-links-container">
          <!-- Karta 1: Nowość HMP-G1 (Tekst po lewej, przezroczysta maszyna po prawej) -->
          <a
            href="/hmp-g1/"
            class="mobile-promo-card mobile-promo-hmp"
            class:active={isHmpG1Active}
            on:click={closeMobileMenu}
          >
            <div class="mobile-promo-text">
              <div class="mobile-promo-badge">
                <MachineTitleSvg text="NOWOŚĆ" height="0.95em" shadow={false} />
              </div>
              <div class="mobile-promo-title">
                <MachineTitleSvg text="HMP-G1" height="1.6em" shadow={false} />
              </div>
              <span class="mobile-promo-subtitle">Kompaktowe centrum CNC &rarr;</span>
            </div>
            <div class="mobile-promo-image-wrap">
              <img
                src="/assets/maszyny/hmp-g1/hmp-g1-render2.webp"
                alt="HMP-G1"
                class="mobile-promo-img"
                loading="lazy"
              />
            </div>
          </a>

          <!-- Karta 2: Bestseller CERTUS 69 (Przezroczysta maszyna po lewej, tekst po prawej) -->
          <a
            href="/bestseller/"
            class="mobile-promo-card mobile-promo-bestseller mobile-promo-reverse"
            class:active={isBestsellerActive}
            on:click={closeMobileMenu}
          >
            <div class="mobile-promo-image-wrap">
              <img
                src="/assets/maszyny/certus-69_hmp_style/c69-hero-render.webp"
                alt="CERTUS 69"
                class="mobile-promo-img"
                loading="lazy"
              />
            </div>
            <div class="mobile-promo-text">
              <div class="mobile-promo-badge bestseller-badge">
                <MachineTitleSvg text="BESTSELLER" height="0.9em" shadow={false} />
              </div>
              <div class="mobile-promo-title">
                <MachineTitleSvg text="CERTUS 69" height="1.5em" shadow={false} />
              </div>
              <span class="mobile-promo-subtitle">&larr; Najchętniej wybierana</span>
            </div>
          </a>

          <a
            href="/"
            class="mobile-nav-link"
            class:active={isHomeActive}
            on:click={closeMobileMenu}
          >
            Strona główna
          </a>
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
            <div class="mobile-submenu" transition:slide>
              <a
                class="mobile-submenu-link"
                href="/maszyny/"
                on:click={closeMobileMenu}
                style="font-weight: 700; color: #fff;"
              >
                Wszystkie maszyny &rarr;
              </a>
              {#each kategorieMaszyn as kategoria}
                {#if kategoria.url}
                  <a class="mobile-submenu-link" href={kategoria.url.endsWith('/') ? kategoria.url : `${kategoria.url}/`}
                    >{kategoria.title}</a
                  >
                {/if}
                {#if kategoria.url == null}
                  <a
                    class="mobile-submenu-link"
                    on:click|preventDefault={() =>
                      handleMaszynyNavigation(kategoria.id)}
                    href="/maszyny/#{kategoria.id}">{kategoria.title}</a
                  >
                {/if}
              {/each}
            </div>
          {/if}
          <a
            href="/serwis/"
            class="mobile-nav-link"
            class:active={isSerwisActive}
            on:click={closeMobileMenu}>Serwis</a
          >
          <a
            href="/dokumentacja/"
            class="mobile-nav-link"
            class:active={isDokumentacjaActive}
            on:click={closeMobileMenu}>Dokumentacja</a
          >
          <a
            href="/onas/"
            class="mobile-nav-link"
            class:active={isOnasActive}
            on:click={closeMobileMenu}>O nas</a
          >
          <a
            href="/kontakt/"
            class="mobile-nav-link"
            class:active={isKontaktActive}
            on:click={closeMobileMenu}>Kontakt</a
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
    /* Animation styles */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 200ms ease-in-out;
    pointer-events: none;

    &.open {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
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
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  }

  .bestseller-title {
    margin-bottom: 0px;
    line-height: 1.1;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #2b2b2b;
  }

  :global(.bestseller-svg-title) {
    color: #2b2b2b !important;
  }

  .bestseller-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 0;
    line-height: 1.4;
    font-size: 13.5px;
  }

  .bestseller-image {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
  }

  .bestseller-img {
    max-width: 100%;
    max-height: 250px;
    object-fit: contain;
    border-radius: 8px;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    margin-left: 10px;
  }

  .features-list li {
    color: #374151;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .bestseller-cta {
    margin-top: 26px;
    display: flex;
    justify-content: center;
  }

  .desktop-menu-items {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    background: white;
    border-radius: 9999px;
    color: #616d5d;
    font-weight: 200;
    margin: 0;
    height: 48px;
    padding: 0 6px;
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
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
  }

  .mobile-menu-content {
    background: #232c32;
    width: 100%;
    max-width: 100vw;
    height: 100%;
    height: 100dvh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 1.5rem 1.25rem 3rem 1.25rem;
    transform-origin: left center;
    box-shadow: 5px 0px 25px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary);
    }
  }

  .mobile-menu-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .mobile-menu-logo {
    display: flex;
    align-items: center;
    width: 170px;
    height: 35px;
    text-decoration: none;

    svg {
      width: 170px;
      height: auto;
      max-height: 35px;
      display: block;
    }
  }

  .mobile-menu-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.08);
    }
  }

  :global(html.mobile-nav-locked),
  :global(body.mobile-nav-locked) {
    overflow: hidden !important;
    height: 100% !important;
  }

  :global(html.mobile-nav-locked::-webkit-scrollbar),
  :global(body.mobile-nav-locked::-webkit-scrollbar) {
    display: none !important;
    width: 0 !important;
  }

  .mobile-links-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .mobile-nav-link {
    color: white;
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
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #96a500;
    }
  }

  /* Responsywność nawigacji - czyste przejścia */

  /* Poniżej 1024px: tryb tablet i mobile - menu mobilne (hamburger) */
  @media (max-width: 1023px) {
    .desktop-menu-items {
      display: none !important;
    }
    .mobile-menu-button-container {
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin-right: 24px !important;
    }
    .ramka {
      margin-left: 2em !important;
      margin-right: 2em !important;
      transform: none !important;
    }
  }

  /* Bardzo małe ekrany (smartfony) */
  @media (max-width: 600px) {
    .ramka {
      margin-left: 0.75em !important;
      margin-right: 0.75em !important;
      height: 58px;
    }
    .mobile-menu-button-container {
      margin-right: 12px !important;
    }
  }

  /* Ekrany laptop/desktop: zwężenie marginesów bocznych, aby menu nigdy nie dotykało krawędzi */
  @media (min-width: 1024px) and (max-width: 1320px) {
    .ramka {
      margin-left: 2em !important;
      margin-right: 2em !important;
      height: 60px;
    }
    nav.scrolled .ramka {
      margin-left: 2em !important;
      margin-right: 2em !important;
    }
    .desktop-menu-items {
      margin-right: 0px;
      padding: 0 5px;
      gap: 0.1rem;
      height: 46px;
    }
    .nav-link {
      padding: 0 10px;
      font-size: 0.84rem;
      height: 34px;
    }
  }

  // Existing styles from the original file
  .bestsellerDropDown {
    margin-left: 0px !important;
    padding-left: 0px;
  }

  nav .menubar {
    width: 100%;
    height: 100%;
    transition: all 0.7s ease;
    box-shadow: 0px 0px 26px 21px #0000001a;
    border-radius: 9999px;
  }

  nav.scrolled .menubar {
    box-shadow: none;
    border-radius: 9999px;
  }

  .nav-link.kontakt-nav {
    margin-right: 0px;
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
    width: 100vw;
    margin-top: 0;
    padding-top: 1.25em;
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
    height: 60px;
    border-radius: 9999px;
    margin-left: 8em;
    margin-right: 8em;
    background-color: rgba(50, 50, 50, 0.95) !important;
    .contenerNav {
      display: flex;
      gap: 1rem;
      width: 100%;
      height: 100%;
      align-items: center;
      padding: 0 7px 0 10px;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .logoCertus {
    padding-right: 3px;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    :global(.lottie-player) {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      transition: box-shadow 0.6s;
    }

    &.logomini {
      width: 40px;
      height: 40px;
      overflow: hidden;

      :global(.lottie-player) {
        width: 38px !important;
        height: 38px !important;
      }
    }

    &.logofull {
      width: 170px;
      height: 40px;

      :global(.lottie-player) {
        width: 170px !important;
        height: 40px !important;
        margin-left: 0 !important;
      }
    }
  }

  .submenu-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #374151;
    transition:
      color 0.2s,
      background-color 0.2s; // Explicit transition for color and background-color
    border-left: 4px solid transparent;
    &:hover {
      color: #16a34a;
      background-color: #f0fdf4;
      border-color: #22c55e;
    }
  }

  .nav-link {
    min-width: 72px;
    height: 34px;
    box-sizing: border-box;
    padding: 0 13px;
    color: #4b5563;
    transition: all 250ms ease-in-out;
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: 9999px;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    white-space: nowrap;

    &:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
    }

    &.active {
      color: white !important;
      background-color: #788391 !important;
      border-radius: 9999px !important;

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

  .nav-pill-nowosc {
    background-color: #7e8c00 !important;
    color: #ffffff !important;
    height: 34px;
    box-sizing: border-box;
    padding: 0 14px !important;
    border-radius: 9999px !important;
    font-weight: 600 !important;
    font-size: 0.85rem !important;
    white-space: nowrap !important;
    margin: 0;
    letter-spacing: 0.02em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.3s ease,
      filter 0.3s ease !important;

    &:hover {
      background-color: #96a500 !important;
      color: #ffffff !important;
      filter: brightness(1.08);
    }

    &.active {
      background-color: #96a500 !important;
      box-shadow: 0 0 0 2px rgba(126, 140, 0, 0.4);
    }
  }

  /* Karty promocyjne w pełnoekranowym menu mobilnym z efektem 3D Pop-Out */
  .mobile-promo-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 96px;
    padding: 14px 20px;
    border-radius: 22px;
    text-decoration: none;
    box-sizing: border-box;
    position: relative;
    overflow: visible; // Obrazek ma wystawać poza obrys karty!
    margin-top: 16px;
    margin-bottom: 22px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  .mobile-promo-hmp {
    background: linear-gradient(135deg, #6c7800 0%, #464f00 100%);
    border: 1.5px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
    color: #ffffff;

    .mobile-promo-badge {
      background: #ffffff;
      color: #555f00;
      font-weight: 800;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  .mobile-promo-bestseller {
    background: linear-gradient(135deg, #252e37 0%, #171d23 100%);
    border: 1.5px solid #ffd700;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
    color: #ffffff;
    margin-top: 16px;

    .mobile-promo-badge {
      background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
      color: #1a2026;
      font-weight: 800;
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
    }
  }

  .mobile-promo-card.mobile-promo-reverse {
    flex-direction: row;
    padding-left: 14px;
    padding-right: 20px;
  }

  .mobile-promo-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    z-index: 2;
    position: relative;
  }

  .mobile-promo-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 800;
    width: fit-content;
    letter-spacing: 0.05em;
    margin-bottom: 3px;
  }

  .mobile-promo-title {
    display: flex;
    align-items: center;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 2px;

    :global(svg) {
      color: #ffffff !important;
    }
  }

  .mobile-promo-subtitle {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    margin-top: 2px;
  }

  .mobile-promo-image-wrap {
    flex-shrink: 0;
    width: 115px;
    height: 76px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  /* Zdjęcie jest większe i efektownie wystaje ponad i poza box */
  .mobile-promo-img {
    position: absolute;
    width: 135px;
    max-width: none;
    height: auto;
    max-height: 120px;
    object-fit: contain;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.65));
    pointer-events: none;
  }

  .mobile-promo-hmp .mobile-promo-img {
    right: -12px;
    top: -20px;
  }

  .mobile-promo-bestseller .mobile-promo-img {
    left: -12px;
    top: -18px;
  }

  .mega-menu {
    position: absolute;
    top: 100%;

    /* Hidden by default */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 200ms ease-in-out;
    pointer-events: none;

    margin-top: 0rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #f3f4f6;
    overflow: hidden;
    width: 900px;
    max-width: 100vw;
    padding: 1rem;

    /* &.open makes it visible */
    &.open {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    ul li {
      padding: 3px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      &:last-child {
        border-bottom: none; // Remove underline from the last li
      }
    }
    .submenu-item:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
      border-color: var(--color-primary-dark);
    }
  }

  .image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    height: 100%;
    min-height: 420px;
    background-color: #f9fafb;
    border-radius: 0.85rem;
    overflow: hidden;
    padding: 1rem;
    box-sizing: border-box;
  }

  .image-container a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: auto 0;
    cursor: pointer;
  }

  .menu-image {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 380px;
    object-fit: contain;
    object-position: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(1.06);
  }

  .image-container a:hover .menu-image {
    transform: scale(1.1);
  }

  .bestseller-link-wrapper {
    text-decoration: none;
    color: inherit;
    cursor: pointer; // Change cursor to pointer to indicate it's a link
    display: block; // Make the link take up the full space
  }

  .bestseller-link-wrapper:hover {
    text-decoration: none;
    color: inherit;
  }

  .megamenu-category-list {
    position: relative;
    z-index: 1;
    background-color: white;
  }
</style>

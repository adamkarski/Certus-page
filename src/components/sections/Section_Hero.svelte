<script lang="ts">
  import IconDoc from "../IconDoc.svelte";
  import DaneTechniczne from "../../assets/menu/dane_techniczne.svelte";
  import MenuEmail from "../../assets/menu/menu_email.svelte";
  import MenuDownload from "../../assets/menu/menu_download.svelte";
  import CtaButtonHero from "../cta-button-hero.svelte";
  import { register } from "swiper/element/bundle";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";

  import { typoFixAction } from "$lib/utils/typography";
  import list from "$lib/data/maszyny.json";
  import { windowWidth, resetHeroSwiper } from "../../lib/visibilityStore";
  import { activeCategoryStore, activeMachineStore, expandedViewStore } from "../../lib/visibilityStore";
  
  import MaszynyActiveMachine from "../Maszyny_activeMachine.svelte";

  register();

 
 
  let swiperReady = false;
  let swiperElement; // Declare swiperElement

  // Zmienna do śledzenia stanów ładowania obrazków
  let imageLoadingStates = writable({});

  onMount(() => {
    // Start preloading images immediately
    preloadImages();
    
    setTimeout(() => {
      swiperReady = true;
      if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const slideId = urlParams.get("slide");
        const categoryId = urlParams.get("category");
        let machineId = urlParams.get("machine");

        $activeCategoryStore = categoryId;
        $activeMachineStore = machineId;
        $expandedViewStore = !!machineId;

        if (slideId) {
          const index = list.findIndex((item) => item.id === slideId);
          if (index !== -1 && swiperElement && swiperElement.swiper) {
            swiperElement.swiper.slideTo(index);
            setTimeout(
              () => updateNavigationButtons(swiperElement.swiper),
              100
            );
          }
        } else if (!$activeCategoryStore && swiperElement && swiperElement.swiper) {
          setTimeout(() => {
            swiperElement.swiper.slideTo(0);
            setTimeout(
              () => updateNavigationButtons(swiperElement.swiper),
              100
            );
          }, 0);
        }

        // Always update navigation buttons on mount
        if (swiperElement && swiperElement.swiper) {
          setTimeout(() => {
            console.log("Updating buttons on mount");
            updateNavigationButtons(swiperElement.swiper);
          }, 200);
        }
      }
    }, 0); // Upewnij się, że swiperElement jest dostępny
    if (browser) {
      // Initialize windowWidth
      windowWidth.set(window.innerWidth);
      
      // Add resize listener
      const handleResize = () => {
        windowWidth.set(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      window.addEventListener("popstate", handlePopstate);
      
      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("popstate", handlePopstate);
      };
    }


  });

  function handleSwiperInit(event) {
    const swiper = event.detail[0];
    swiperReady = true;

 
    // Set consistent speed for all transitions
    swiper.params.speed = 300; // 300ms for all transitions

    // Update swiper with new breakpoints
    swiper.update();

    // Update navigation buttons state
    updateNavigationButtons(swiper);

    // Listen for slide changes to update navigation
    swiper.on("slideChange", () => {
      updateNavigationButtons(swiper);
    });
  }

  // Reactive function to update buttons when view changes
  $: if (
    browser &&
    swiperElement &&
    swiperElement.swiper &&
    ($activeCategoryStore !== undefined || $expandedViewStore !== undefined)
  ) {
    setTimeout(() => {
      updateNavigationButtons(swiperElement.swiper);
    }, 100);
  }
  $: slidesPerView = $windowWidth < 1024 ? 1 : 2;
  
  $: slidesPerGroup = $windowWidth < 1024 ? 1 : 2;

  // Update swiper when window width changes
  $: if (browser && swiperElement && swiperElement.swiper && $windowWidth) {
    setTimeout(() => {
      console.log("Window width changed, updating swiper:", $windowWidth);
      const swiper = swiperElement.swiper;
      
      // Update swiper parameters
      swiper.params.slidesPerView = slidesPerView;
      swiper.params.slidesPerGroup = slidesPerGroup;
      
      // Update swiper
      swiper.update();
      
      // Update navigation buttons
      updateNavigationButtons(swiper);
    }, 100);
  }

  $: if (browser) {
    if ($windowWidth <= 800) {
        document.body.classList.add("r800");
    } else {
        document.body.classList.remove("r800");
    } 
  }



  // Function to update navigation buttons based on current slide
  function updateNavigationButtons(swiper) {
    if (!swiper) return;

    const prevButton = document.getElementById("swiper-button-prev-hero");
    const nextButton = document.getElementById("swiper-button-next-hero");

    if (prevButton && nextButton) {
      // Without loop mode, we can use isBeginning and isEnd
      const currentIndex = swiper.activeIndex;
      const totalSlides = list.length;
      const currentSlidesPerView = $windowWidth < 1024 ? 1 : 2; // Use reactive value
      const currentSlidesPerGroup = $windowWidth < 1024 ? 1 : 2; // Use reactive value

      
      // Remove existing disabled classes
      prevButton.classList.remove("swiper-button-disabled");
      nextButton.classList.remove("swiper-button-disabled");

      // Use reactive slidesPerGroup value
      const maxGroups = Math.ceil(totalSlides / currentSlidesPerGroup);
      const currentGroup = Math.floor(currentIndex / currentSlidesPerGroup);


      // Check if we're at the beginning (group 0)
      if (currentGroup === 0) {
        console.log("Disabling prev button - at first group");
        prevButton.classList.add("swiper-button-disabled");
      }

      // Check if we're at the end (last group)
      if (currentGroup >= maxGroups - 1) {
        console.log("Disabling next button - at last group");
        nextButton.classList.add("swiper-button-disabled");
      }
    }
  }

  // Navigation button click handlers
  function handlePrevClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      const currentIndex = swiper.activeIndex;
      const slidesPerGroup = swiper.params.slidesPerGroup || 2;
      const currentGroup = Math.floor(currentIndex / slidesPerGroup);

 
      if (currentGroup > 0) {
        const targetIndex = (currentGroup - 1) * slidesPerGroup;
        swiper.slideTo(targetIndex, 300); // 300ms transition
        // Update buttons after slide change
        setTimeout(() => {
          updateNavigationButtons(swiper);
        }, 350); // Slightly longer than transition
      }
    }
  }

  function handleNextClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      const currentIndex = swiper.activeIndex;
      const slidesPerGroup = swiper.params.slidesPerGroup || 2;
      const maxGroups = Math.ceil(list.length / slidesPerGroup);
      const currentGroup = Math.floor(currentIndex / slidesPerGroup);

      console.log(
        "Next click - currentGroup:",
        currentGroup,
        "maxGroups:",
        maxGroups,
        "slidesPerGroup:",
        slidesPerGroup
      );
      console.time("Next transition");
      if (currentGroup < maxGroups - 1) {
        const targetIndex = (currentGroup + 1) * slidesPerGroup;
        console.log("Sliding to index:", targetIndex);
        swiper.slideTo(targetIndex, 300); // 300ms transition
        // Update buttons after slide change
        setTimeout(() => {
          console.timeEnd("Next transition");
          updateNavigationButtons(swiper);
        }, 350); // Slightly longer than transition
      }
    }
  }

  function handleSlideChange(event) {
    if (browser) {
      const swiper = event.detail[0];
      const currentSlideIndex = swiper.activeIndex;
      const currentSlideId = list[currentSlideIndex].id;
      const url = new URL(window.location.href);
      url.searchParams.set("slide", currentSlideId);
      history.replaceState({ slide: currentSlideId }, "", url.toString());

      // Update navigation buttons
      updateNavigationButtons(swiper);
    }
  }

  function handlePopstate(event) {
    if (browser) {
      const urlParams = new URLSearchParams(window.location.search);
      const slideId = urlParams.get("slide");
      const categoryId = urlParams.get("category");
      const machineId = urlParams.get("machine");

      $activeCategoryStore = categoryId;
      $activeMachineStore = machineId;
      $expandedViewStore = !!machineId;

      if (slideId) {
        const index = list.findIndex((item) => item.id === slideId);
        if (index !== -1 && swiperElement && swiperElement.swiper) {
          swiperElement.swiper.slideToLoop(index);
        }
      } else if (!$activeCategoryStore && swiperElement && swiperElement.swiper) {
        setTimeout(() => {
          swiperElement.swiper.slideToLoop(0);
        }, 0);
      }
    }
  }

  // Funkcja do preloadingu obrazków
  function preloadImages() {
    console.log("Starting preload images for", list.length, "items");
    list.forEach((item) => {
      console.log("Preloading image for:", item.id, item.img);
      imageLoadingStates.update((current) => ({
        ...current,
        [item.id]: false,
      })); // Ustaw stan ładowania na false
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        console.log("Image loaded successfully:", item.id);
        imageLoadingStates.update((current) => ({
          ...current,
          [item.id]: true,
        })); // Ustaw stan ładowania na true po załadowaniu
      };
      img.onerror = () => {
        console.error(`Błąd ładowania obrazka: ${item.img}`);
        imageLoadingStates.update((current) => ({
          ...current,
          [item.id]: true,
        })); // Ustaw na true nawet w przypadku błędu, aby nie blokować
      };
    });
  }

  const openCategory = (c) => {
    const category = list.find((item) => item.id === c);
    if (category) {
      $activeCategoryStore = c;
      if (browser) {
        const url = new URL(window.location.href);
        url.searchParams.set("category", c);

        if (category.startExpanded && typeof category.machine === "string") {
          // If startExpanded and single machine, go directly to machine view
          $activeMachineStore = category.machine;
          $expandedViewStore = true;
          url.searchParams.set("machine", category.machine);
          history.pushState(
            { category: c, machine: category.machine },
            "",
            url.toString()
          );
          document.body.classList.add("active_machine_view"); // Add class for active machine view
        } else {
          // Otherwise, go to category view (even if startExpanded and multiple machines)
          document.body.classList.remove("active_machine_view"); // Remove class for active machine view
          $activeMachineStore = null;
          $expandedViewStore = false;
          url.searchParams.delete("machine");
          history.pushState({ category: c, machine: null }, "", url.toString());
        }
      }
    }
  };
  const close = () => {
    $activeCategoryStore = null;
    $activeMachineStore = null; // Ensure activeMachine is null when closing category view
    $expandedViewStore = false; // Ensure expandedView is false when closing category view
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.delete("machine"); // Also clear machine param
      history.pushState({ category: null, machine: null }, "", url.toString());
    }
  };

  const openMachine = (x) => {
    $activeMachineStore = x;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set("machine", x);
      if ($activeCategoryStore) {
        url.searchParams.set("category", $activeCategoryStore);
      }
      history.pushState(
        { category: $activeCategoryStore, machine: x },
        "",
        url.toString()
      );
    }
    setTimeout(() => {
      $expandedViewStore = true;
    }, 800);
  };
 const closeFW = () => {
    $activeCategoryStore = null;
    $activeMachineStore = null;
    $expandedViewStore = false;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.delete("machine");
      history.pushState({ category: null, machine: null }, "", url.toString());
    }
  };

  const expandRightInfo = () => ($expandedViewStore = !$expandedViewStore);

  // Konfiguracja animacji
  const fadeConfig = {
    duration: 400,
    easing: cubicOut,
  };

  const flyConfig = {
    duration: 500,
    easing: cubicOut,
  };

  // --- BLOKADA SCROLLA BODY DLA expandedView ---
  $: if (browser) {
    if ($activeMachineStore) document.body.classList.add("no-scroll-hero");
    else document.body.classList.remove("no-scroll-hero");

    // Zarządzanie widocznością przycisków nawigacyjnych
    const prevButton = document.getElementById("swiper-button-prev-hero");
    const nextButton = document.getElementById("swiper-button-next-hero");
    if (prevButton && nextButton) {
      if ($activeCategoryStore && !$activeMachineStore) {
        // Hide navigation in intermediate view (category selected but no machine)
        prevButton.classList.add("hide-navigation");
        nextButton.classList.add("hide-navigation");
      } else if (!$activeCategoryStore) {
        // Show navigation in main slider view and update button states
        prevButton.classList.remove("hide-navigation");
        nextButton.classList.remove("hide-navigation");

        // Update navigation buttons if swiper is ready
        if (swiperElement && swiperElement.swiper) {
          updateNavigationButtons(swiperElement.swiper);
        }
      } else {
        // Hide navigation in expanded machine view
        prevButton.classList.add("hide-navigation");
        nextButton.classList.add("hide-navigation");
      }
    }
  }

  // --- KONIEC BLOKADY SCROLLA ---

  $: if ($resetHeroSwiper) {
    if (swiperElement && swiperElement.swiper) {
      setTimeout(() => {
        swiperElement.swiper.slideToLoop(0);
      }, 100); // Zwiększone opóźnienie dla pewności
    }
    $activeCategoryStore = null;
    $activeMachineStore = null;
    $expandedViewStore = false;
    resetHeroSwiper.set(false); // Reset the store value
  }
</script>

<!-- Tło i gradient pozostają statyczne -->
<section class="hero">
  <div class="hero-bg gradientHero">
    <div class="hero-overlay"></div>

    <!-- Kontener dla animacji crossfade -->
    <div class="hero-content" in:fade={{ duration: 650, delay: 800 }}>
      <!-- 1. Slider - pokazuje się gdy nie ma aktywnej kategorii -->
      {#if !$activeCategoryStore}
        {#if swiperReady}
          <div
            class="view slider-view"
            in:fade={fadeConfig}
            out:fade={fadeConfig}
          >
            <!-- Custom Navigation Buttons -->
            <button
              id="swiper-button-prev-hero"
              class="swiper-nav-button swiper-nav-prev"
              on:click={handlePrevClick}
              aria-label="Previous slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button
              id="swiper-button-next-hero"
              class="swiper-nav-button swiper-nav-next"
              on:click={handleNextClick}
              aria-label="Next slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <swiper-container
              pagination
              space-between="0"
              slides-per-view={slidesPerView}
              slides-per-group={slidesPerGroup}
             
              mousewheel
              autoplay
              bind:this={swiperElement}
              on:slidechange={handleSlideChange}
              on:swiperinit={handleSwiperInit}
            >
              {#each list as cat}
                <swiper-slide>
                 
                    <button
                      type="button"
                      class="items items-left lift"
                      on:click={() => cat.url 
                        ? window.location.href = cat.url
                        : openCategory(cat.id)
                      }
                    >
                      <div class="headlines">
                        <div class="topline">{cat.title}</div>
                      </div>
                      <div class="item">
                        <div class="image">
                          {#if $imageLoadingStates[cat.id]}
                            <img
                              src={cat.img}
                              alt={cat.title}
                              draggable="false"
                            />
                          {:else}
                            <div class="image-loader">
                              <svg width="50" height="50" viewBox="0 0 50 50">
                                <circle
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  fill="none"
                                  stroke-width="5"
                                  stroke="#96a500"
                                  stroke-dasharray="31.4 31.4"
                                  stroke-linecap="round"
                                >
                                  <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 25 25"
                                    to="360 25 25"
                                    dur="1s"
                                    repeatCount="indefinite"
                                  />
                                </circle>
                              </svg>
                            </div>
                          {/if}
                        </div>
                      </div>
                    </button>
                
                </swiper-slide>
              {/each}
            </swiper-container>
          </div>
        {:else}
          <div class="view slider-view" style="min-height: 400px;"></div>
        {/if}
      {/if}

      <!-- 2. Widoki kategorii - każdy z własną animacją -->
      {#if $activeCategoryStore === "ploteryPrzemyslowe" && !$activeMachineStore}
        <div
          class="view category-view no-sel"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
        >
          <div class="category-content">
            <div class="container" in:fade={{ duration: 600, delay: 200 }}>
              <div class="back_category"></div>
              <div class="content">
                <h1>
                  {list.find((item) => item.id === $activeCategoryStore)?.title}
                </h1>

                <div class="subListMachines">
                  <div>
                    <h2>W zabudowie</h2>
                    <button
                      type="button"
                      on:click={() => openMachine("m-ploter")}
                    >
                      <img class="image" src="/assets/maszyny/88930d1c.png" alt="Ploter przemysłowy" />
                    </button>
                  </div>

                  <div>
                    <h2>Bez zabudowy</h2>
                    <button
                      type="button"
                      on:click={() => openMachine("m-ploter1")}
                    >
                      <img
                        class="image" alt="Ploter przemysłowy bez zabudowy"
                        src="/assets/maszyny/80f5ea646ec.png"
                      />
                    </button>
                  </div>
                </div>
                <CtaButtonHero on:click={close} text="Wróć" />
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>


  


</section>

<MaszynyActiveMachine/>

<style lang="scss">





  :global(.swiper-nav-button.swiper-button-disabled) {
    opacity: 0.1 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
    transition: all;
  }



  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 0px;
  }



  :global(.gradientHero) {
    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);
  }


  .active_flex{

    position: relative;

  }
  .category-content .container {
    position: relative;
    background-image: url(/assets/Background_Hero_swipe.jpg);
    width: 135rem;
    height: 400px;
    border-radius: 1rem;
    .back_category {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgb(208 201 201 / 81%) 0%,
        rgb(136 126 126 / 85%) 100%
      );
      border-radius: 1rem;
      border-left: 11px solid rgb(150, 165, 0);
      z-index: 1;
      opacity: 0.8;
    }
    .content {
      z-index: 2;
      position: relative;
    }
    .flex_table {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      gap: 2rem;
      align-content: center;
      flex-wrap: nowrap;

      color: black;
      padding-left: 2rem;

      .IconDoc {
        position: relative;
        left: 230px;
        top: -35px;
      }

      h3 {
        font-weight: 300;
      }
      padding-top: 3rem;
    }
    h2 {
      font-size: 2rem;
      font-weight: 400;
    }

    h1 {
      padding-left: 2rem;
      font-family: "Poppins", sans-serif;
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      text-align: left;
      margin-bottom: 1rem;
      position: absolute;
      top: -70px;
    }
  }

  /* ————————————————  PRZYCISK POWROTU  ———————————————— */
  .back {
    top: 2rem;
    left: 2rem;
    z-index: 10;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .back:hover {
    background: rgba(0, 0, 0, 0.55);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  /* ————————————————  LAYOUT  ———————————————— */
  .hero {
    width: 100%;
    height: 90vh;
    position: fixed;
    z-index: 0;
    top: 0px;
  }
  .hero-bg {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
    margin-top: -80px;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .view {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* ————————————————  KATEGORIE  ———————————————— */
  .category-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }
  .category-content h1 {
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  .category-image {
    max-width: 600px;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  .category-image:hover {
    transform: scale(1.02);
  }
  .category-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* ————————————————  SWIPER  ———————————————— */
  swiper-container {
    width: 90%;
    height: 678px;
    opacity: 0;
    margin-top: -10px;
    opacity: 0;
    animation: fadeInSlider 0.6s ease-out 0.2s forwards;
  }
  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%; /* Zapewnia równomierne rozmiary dla slides-per-view="2" */
    flex-shrink: 0; /* Zapobiega kurczeniu się slajdów */
    button {
      transform: scale(0.85);
      transition: transform 0.3s ease;

      .headlines {
       /*  transform: translateY(90px); */
      }
    }
  }

  @keyframes fadeInSlider {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ————————————————  KAFELKI  ———————————————— */
  .items {
    flex: 1;
    max-width: 100vw;
    min-width: 0; /* Zapobiega problemom z flex shrinking */
    
    height: 117%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
  .headlines{
    transition: all 0.2s ease;
    transform: translateX(100px) translateY(20px);
  }
  .items:hover {
    transform: scale(1.0) translateY(5px);
  
    .headlines{
     
      transform: translateY(50px) translateX(20px) scale(0.8);

    }
  
  }

  .items::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: linear-gradient(45deg, transparent, rgba(255,255,255,.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .items:hover::before {
    opacity: 1;
  }

  .headlines .topline {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 38px;
    font-weight: 700;
    line-height: 1;
   /*  margin-bottom: 0.25em;
    margin-left: 0.2em; */
    // padding-bottom: 2rem;
    transition: all 0.3s ease;
    position: absolute;
    // margin-top: -180px;
    text-align: left;
  }
  .items:hover .headlines .topline {
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    // transform: translateY(-2px);
  }

  .items:hover{
    // transform: scale(1);
  }
  .item .image {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    transform: scale(0.75);
  }

  .item .image img {
    display: block;
 
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .image-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 200px; /* Minimalna wysokość, żeby loader był widoczny */
  }

  /* ————————————————  INNE  ———————————————— */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.02),
      transparent
    );
    pointer-events: none;
  }

  /* ————————————————  RESPONSYWNOŚĆ  ———————————————— */
  @media (max-width: 768px) {
    .category-content h1 {
      font-size: 36px;
    }
    .category-image {
      max-width: 90%;
    }
    .items {
      padding: 4rem;
    }
    .headlines .topline {
      font-size: 28px;
    }

   
  }

  /* --- BLOKADA SCROLLA BODY DLA expandedView --- */
  :global(body.no-scroll-hero) {
    overflow: hidden !important;
    position: fixed;
    width: 100vw;
    .activeMachine .right {
      /* overflow-x: none; */
      overflow-y: auto;
      .right_params {
        overflow: hidden;
       
      }
    }
  }
  /* ————————————————  NAVIGATION BUTTONS  ———————————————— */
  .swiper-nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .swiper-nav-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  .swiper-nav-prev {
    left: 2rem;
  }

  .swiper-nav-next {
    right: 2rem;
  }

  .swiper-nav-button.swiper-button-disabled {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-50%) scale(0.8);
  }

  .swiper-nav-button.hide-navigation {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) scale(0.8);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .swiper-nav-button {
      width: 40px;
      height: 40px;
    }

    .swiper-nav-prev {
      left: 1rem;
    }

    .swiper-nav-next {
      right: 1rem;
    }
  }



</style>

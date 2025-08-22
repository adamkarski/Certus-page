<script lang="ts">
  import CtaButton from "../CtaButton.svelte";
  import { register } from "swiper/element/bundle";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { onMount, tick, afterUpdate } from "svelte";
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";

  import { typoFixAction } from "$lib/utils/typography";
  import list from "$lib/data/maszyny.json";
  import { windowWidth, resetHeroSwiper } from "../../lib/visibilityStore";
  import {
    activeCategoryStore,
    activeMachineStore,
    expandedViewStore,
  } from "../../lib/visibilityStore";

  import MaszynyActiveMachine from "../Maszyny_activeMachine.svelte";

  register();

  let swiperReady = true; // Start as true so element renders immediately
  let swiperElement; // Declare swiperElement
  let swiperKey = 0; // Klucz do wymuszania re-renderu swipera
  let lastActiveSlideIndex = 0; // Zapamięta ostatni aktywny slajd

  // Zmienna do śledzenia stanów ładowania obrazków
  let imageLoadingStates = writable({});

  onMount(async () => {
    // Start preloading images immediately
    preloadImages();

    // Wait for DOM to update
    await tick();

    // Subscribe to activeCategoryStore changes
    const unsubscribe = activeCategoryStore.subscribe((value) => {
      // Jeśli wracamy do głównego widoku (value === null)
      if (value === null && browser) {
        swiperKey++; // Wymusza re-render swipera

        // Reset atrybutów dla nowego elementu
        if (swiperElement) {
          swiperElement.removeAttribute("data-init-listener-added");
          swiperElement.removeAttribute("data-events-added");
        }

        setTimeout(() => {
          // Po re-renderze swiper powinien być automatycznie zainicjalizowany
          const checkNewSwiper = () => {
            if (swiperElement && swiperElement.swiper) {
              setupSwiperEvents(swiperElement.swiper);
              updateNavigationButtons(swiperElement.swiper);

              // Wróć do zapisanego slajdu po re-renderze
              setTimeout(() => {
                swiperElement.swiper.slideTo(lastActiveSlideIndex);
                updateNavigationButtons(swiperElement.swiper);
              }, 200);
            } else {
              setTimeout(checkNewSwiper, 100);
            }
          };
          checkNewSwiper();
        }, 100);
      }
    });

    setTimeout(() => {
      if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("category");
        const machineId = urlParams.get("machine");
        const slideId = urlParams.get("slide");

        if (categoryId) {
          // If category in URL, don't init swiper, just set stores
          $activeCategoryStore = categoryId;
          $activeMachineStore = machineId;
          $expandedViewStore = !!machineId;
        } else {
          // No category, so init swiper
          if (swiperElement) {
            const checkSwiper = () => {
              if (swiperElement.swiper) {
                setupSwiperEvents(swiperElement.swiper);
                if (slideId) {
                  const index = list.findIndex((item) => item.id === slideId);
                  if (index !== -1) {
                    lastActiveSlideIndex = index;
                    swiperElement.swiper.slideTo(index);
                  }
                }
                setTimeout(
                  () => updateNavigationButtons(swiperElement.swiper),
                  200
                );
              } else {
                setTimeout(checkSwiper, 100);
              }
            };
            checkSwiper();
          }
        }
      }
    }, 10);

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
        unsubscribe(); // Cleanup subscription
      };
    }
  });

  afterUpdate(() => {
    // Jeśli jesteśmy w głównym widoku i swiper istnieje
    if (browser && !$activeCategoryStore && swiperElement) {
      // Dodaj event listener na inicjalizację swipera
      if (!swiperElement.hasAttribute("data-init-listener-added")) {
        swiperElement.addEventListener("swiperinit", () => {
          if (swiperElement.swiper) {
            setupSwiperEvents(swiperElement.swiper);
            updateNavigationButtons(swiperElement.swiper);
          }
        });

        swiperElement.setAttribute("data-init-listener-added", "true");

        // Jeśli swiper już istnieje, uruchom setup od razu
        if (swiperElement.swiper) {
          setupSwiperEvents(swiperElement.swiper);
        }
      }
    }
  });

  function setupSwiperEvents(swiper) {
    // Update navigation buttons state
    updateNavigationButtons(swiper);

    // Usuń poprzednie event listenery jeśli istnieją
    swiper.off("slideChange");

    // Listen for slide changes (works with buttons)
    swiper.on("slideChange", () => {
      lastActiveSlideIndex = swiper.activeIndex; // Zapisz ostatni aktywny slajd
      updateNavigationButtons(swiper);
    });

    // Reinicjalizuj pagination

    if (swiper.pagination) {
      swiper.pagination.destroy();
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    } else {
      // Jeśli pagination nie istnieje, spróbuj ją utworzyć
      try {
        // Inicjalizuj pagination bezpośrednio na swiperze
        if (swiper.modules && swiper.modules.includes("pagination")) {
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();
        }
      } catch (error) {}
    }

    // Sprawdź czy pagination została utworzona
    setTimeout(() => {
      const paginationEl = document.querySelector(".swiper-pagination");

      if (paginationEl) {
      } else {
        // Sprawdź czy istnieje w swiperElement
        const swiperPagination =
          swiperElement.querySelector(".swiper-pagination");
      }
    }, 500);

    // Add mouse event listeners directly to swiper element (sprawdź czy już nie istnieją)
    if (!swiperElement.hasAttribute("data-events-added")) {
      let isMouseDown = false;
      let startX = 0;
      let currentSlideIndex = swiper.activeIndex;

      swiperElement.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        startX = e.clientX;
        currentSlideIndex = swiper.activeIndex;
      });

      swiperElement.addEventListener("mouseup", (e) => {
        if (isMouseDown) {
          isMouseDown = false;

          // Check if slide actually changed after mouse interaction
          setTimeout(() => {
            if (swiper.activeIndex !== currentSlideIndex) {
              lastActiveSlideIndex = swiper.activeIndex; // Zapisz ostatni aktywny slajd
              updateNavigationButtons(swiper);
            }
          }, 100);
        }
      });

      swiperElement.addEventListener("mouseleave", () => {
        if (isMouseDown) {
          isMouseDown = false;

          setTimeout(() => {
            if (swiper.activeIndex !== currentSlideIndex) {
              lastActiveSlideIndex = swiper.activeIndex; // Zapisz ostatni aktywny slajd
              updateNavigationButtons(swiper);
            }
          }, 100);
        }
      });

      swiperElement.setAttribute("data-events-added", "true");
    }
  }

  // Reactive function to update buttons when view changes
  $: if (
    browser &&
    !$activeCategoryStore &&
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
  $: if (
    browser &&
    !$activeCategoryStore &&
    swiperElement &&
    swiperElement.swiper &&
    $windowWidth
  ) {
    setTimeout(() => {
      const swiper = swiperElement.swiper;

      // Update swiper parameters safely
      try {
        if (swiper.params) {
          swiper.params.slidesPerView = slidesPerView;
          swiper.params.slidesPerGroup = slidesPerGroup;
        }

        // Update swiper element attributes
        swiperElement.setAttribute("slides-per-view", slidesPerView);
        swiperElement.setAttribute("slides-per-group", slidesPerGroup);

        // Update swiper
        swiper.update();
      } catch (error) {}

      // Update navigation buttons
      updateNavigationButtons(swiper);
    }, 100);
  }

  $: if (browser) {
    if ($windowWidth <= 800) {
      document.body.classList.add("r800");
      /*  document.body.classList.remove("no-scroll-hero"); */
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
        prevButton.classList.add("swiper-button-disabled");
      }

      // Check if we're at the end (last group)
      if (currentGroup >= maxGroups - 1) {
        nextButton.classList.add("swiper-button-disabled");
      }
    }
  }

  // Navigation button click handlers
  function handlePrevClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      const currentIndex = swiper.activeIndex;
      const currentSlidesPerGroup =
        (swiper.params && swiper.params.slidesPerGroup) ||
        ($windowWidth < 1024 ? 1 : 2);
      const currentGroup = Math.floor(currentIndex / currentSlidesPerGroup);

      if (currentGroup > 0) {
        const targetIndex = (currentGroup - 1) * currentSlidesPerGroup;
        swiper.slideTo(targetIndex, 300); // 300ms transition
        // Update buttons after slide change
        setTimeout(() => {
          lastActiveSlideIndex = swiper.activeIndex; // Zapisz ostatni aktywny slajd
          updateNavigationButtons(swiper);
        }, 350); // Slightly longer than transition
      }
    }
  }

  function handleNextClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      const currentIndex = swiper.activeIndex;
      const currentSlidesPerGroup =
        (swiper.params && swiper.params.slidesPerGroup) ||
        ($windowWidth < 1024 ? 1 : 2);
      const maxGroups = Math.ceil(list.length / currentSlidesPerGroup);
      const currentGroup = Math.floor(currentIndex / currentSlidesPerGroup);

      if (currentGroup < maxGroups - 1) {
        const targetIndex = (currentGroup + 1) * currentSlidesPerGroup;
        swiper.slideTo(targetIndex, 300); // 300ms transition
        // Update buttons after slide change
        setTimeout(() => {
          lastActiveSlideIndex = swiper.activeIndex; // Zapisz ostatni aktywny slajd
          updateNavigationButtons(swiper);
        }, 350); // Slightly longer than transition
      }
    }
  }

  function handleSlideChange(event) {
    if (browser) {
      const swiper = event.detail[0];
      const currentSlideIndex = swiper.activeIndex;
      lastActiveSlideIndex = currentSlideIndex; // Zapisz ostatni aktywny slajd
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
      } else if (
        !$activeCategoryStore &&
        swiperElement &&
        swiperElement.swiper
      ) {
        setTimeout(() => {
          swiperElement.swiper.slideToLoop(0);
        }, 0);
      }
    }
  }

  // Funkcja do preloadingu obrazków
  function preloadImages() {
    list.forEach((item) => {
      imageLoadingStates.update((current) => ({
        ...current,
        [item.id]: false,
      })); // Ustaw stan ładowania na false
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        imageLoadingStates.update((current) => ({
          ...current,
          [item.id]: true,
        })); // Ustaw stan ładowania na true po załadowaniu
      };
      img.onerror = () => {
        imageLoadingStates.update((current) => ({
          ...current,
          [item.id]: true,
        })); // Ustaw na true nawet w przypadku błędu, aby nie blokować
      };
    });
  }

  const openCategory = (c) => {
    // Zapisz aktualny indeks slajdu przed otwarciem kategorii
    if (swiperElement && swiperElement.swiper) {
      lastActiveSlideIndex = swiperElement.swiper.activeIndex;
    }

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

    // Po zamknięciu kategorii, wróć do zapisanego slajdu
    setTimeout(() => {
      if (swiperElement && swiperElement.swiper) {
        swiperElement.swiper.slideTo(lastActiveSlideIndex);
        updateNavigationButtons(swiperElement.swiper);
      }
    }, 100);
  };

  const openMachine = (x) => {
    $activeMachineStore = x;
    if (browser) {
      document.body.classList.add("active_machine_view");
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
    document.body.classList.remove("active_machine_view");

    $activeCategoryStore = null;
    $activeMachineStore = null;
    $expandedViewStore = false;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.delete("machine");
      history.pushState({ category: null, machine: null }, "", url.toString());
    }

    // Po zamknięciu widoku maszyny, wróć do zapisanego slajdu
    setTimeout(() => {
      if (swiperElement && swiperElement.swiper) {
        swiperElement.swiper.slideTo(lastActiveSlideIndex);
        updateNavigationButtons(swiperElement.swiper);
      }
    }, 100);
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

    // Zarządzanie widocznością przycisków nawigacyjnych i pagination z opóźnieniem
    setTimeout(() => {
      const prevButton = document.getElementById("swiper-button-prev-hero");
      const nextButton = document.getElementById("swiper-button-next-hero");
      const pagination = document.querySelector(".swiper-pagination");

      if (prevButton && nextButton) {
        if ($activeCategoryStore && !$activeMachineStore) {
          // Hide navigation in intermediate view (category selected but no machine)
          prevButton.classList.add("hide-navigation");
          nextButton.classList.add("hide-navigation");
          if (pagination) pagination.classList.add("hide-pagination");
        } else if (!$activeCategoryStore) {
          // Show navigation in main slider view and update button states
          prevButton.classList.remove("hide-navigation");
          nextButton.classList.remove("hide-navigation");
          if (pagination) pagination.classList.remove("hide-pagination");

          // Update navigation buttons if swiper is ready
          if (swiperElement && swiperElement.swiper) {
            updateNavigationButtons(swiperElement.swiper);
          }
        } else {
          // Hide navigation in expanded machine view
          prevButton.classList.add("hide-navigation");
          nextButton.classList.add("hide-navigation");
          if (pagination) pagination.classList.add("hide-pagination");
        }
      }
    }, 50);
  }

  // --- KONIEC BLOKADY SCROLLA ---

  $: if ($resetHeroSwiper) {
    if (swiperElement && swiperElement.swiper) {
      setTimeout(() => {
        // Wróć do ostatniego aktywnego slajdu zamiast zawsze do pierwszego
        swiperElement.swiper.slideTo(lastActiveSlideIndex);
        updateNavigationButtons(swiperElement.swiper);
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
              class="swiper-nav-button swiper-nav-prev no-sel"
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
              class="swiper-nav-button swiper-nav-next no-sel"
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

            {#key swiperKey}
              <swiper-container
                pagination
                space-between="0"
                slides-per-view={slidesPerView}
                slides-per-group={slidesPerGroup}
                mousewheel
                bind:this={swiperElement}
                on:swiperslidechange={(event) => {
                  if (swiperElement && swiperElement.swiper) {
                    lastActiveSlideIndex = swiperElement.swiper.activeIndex; // Zapisz ostatni aktywny slajd
                    updateNavigationButtons(swiperElement.swiper);
                  }
                }}
              >
                {#each list as cat}
                  <swiper-slide>
                    <button
                      type="button"
                      class="items items-left lift no-sel"
                      on:click={() =>
                        cat.url
                          ? (window.location.href = cat.url)
                          : openCategory(cat.id)}
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

                <!-- Dodaj pagination element bezpośrednio -->
                <!--  <div class="swiper-pagination" slot="pagination"></div> -->
              </swiper-container>
            {/key}
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
                  <div class="item__category">
                    <h2>W zabudowie</h2>
                    <button
                      type="button"
                      on:click={() => openMachine("m-ploter")}
                    >
                      <img
                        class="image"
                        src="/assets/maszyny/88930d1c.png"
                        alt="Ploter przemysłowy"
                      />
                    </button>
                  </div>

                  <div class="item__category">
                    <h2>Bez zabudowy</h2>
                    <button
                      type="button"
                      on:click={() => openMachine("m-ploter1")}
                    >
                      <img
                        class="image"
                        alt="Ploter przemysłowy bez zabudowy"
                        src="/assets/maszyny/80f5ea646ec.png"
                      />
                    </button>
                  </div>
                </div>
                <div
                  in:fade={{ duration: 400, delay: 800 }}
                  out:fade={{ duration: 300 }}
                >
                  <CtaButton
                    on:click={close}
                    text="Wróć"
                    classs="backFromCategory"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <span class="triangle"></span>
</section>

<MaszynyActiveMachine />

<style lang="scss">
  :global(.home .hero) {
    overflow: hidden;
    &::after {
      content: "";
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100vw;
      height: 37px;
      right: 0px;
      filter: blur(0.3px);
      bottom: 0px;
    }

    .triangle {
      position: absolute;
      width: 400px;
      height: 100px;
      bottom: 0px;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 55px;
        background: #f7f7f7;
        clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
      }
    }
  }

  @media (max-width: 800px) {
    :global(.home .hero .triangle) {
    &::after{
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
    :global(.home .hero .triangle) {
    &::after{
        clip-path: polygon(0 0, 20% 0, 40% 101%, 0% 100%) !important;
      }
    }
  }


  :global(.swiper-nav-button.swiper-button-disabled) {
    opacity: 0.1 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
    transition: all;
  }

  section.hero .hero-bg {
    height: 100%;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 0px;
  }

  :global(.gradientHero) {
    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);
  }

  .active_flex {
    position: relative;
  }
  .subListMachines {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: -100px;
    gap: 13%;
    .image {
      cursor: pointer;
    }
    button {
      cursor: pointer;
    }
    .item__category {
      display: flex;
      width: 30vw;
      flex-direction: column-reverse;
      align-items: flex-end;
      justify-content: flex-end;
      gap: 0.6rem;
      align-content: flex-start;
      flex-wrap: nowrap;
    }
  }

  .category-content .container {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 1rem;

    :global(button.backFromCategory) {
      position: absolute !important;
    /* display: block; */
    bottom: 1px;
    left: 0px;
    z-index: 5;
    transition: all ease 0.4s;
    background-color: var(--color-primary);
    color: white;
    &::before{
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(/assets/images/pattern-image1-2.png);
    }
    }

    .back_category {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      /*  background: linear-gradient(
        180deg,
        rgb(208 201 201 / 81%) 0%,
        rgb(136 126 126 / 85%) 100%
      );  */
      // border-radius: 1rem;
      // border-left: 11px solid rgb(150, 165, 0);
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
      color: #fff;
      text-align: center;
      margin-bottom: 1rem;
      position: relative;
      top: -114px;
      font-family: "Poppins", sans-serif;
      font-size: 2rem;
      font-weight: 700;
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

  /* ————————————————  LAYOUT - CLEAN RESPONSIVE  ———————————————— */
  .hero {
    width: 100%;
    height: 100vh; /* Bazowa wysokość - będzie nadpisana przez media queries */
    position: relative;
    z-index: 0;
    top: 0px;
    transition: height 0.3s ease-in-out; /* Smooth transitions */
  }

  /* RESPONSIVE BREAKPOINTS - UPORZĄDKOWANE I UPROSZCZONE */

  /* Desktop - Duże ekrany (1200px+) */
  @media (min-width: 1200px) {
    .hero {
      height: 100vh;
    }

    .hero-bg {
      padding-top: 120px;
    }
  }

  /* Tablet - Landscape (768px - 1199px) */
  @media (min-width: 768px) and (max-width: 1199px) {
    .hero {
      height: 90vh;
    }

    .hero-bg {
      padding-top: 100px;
    }
  }

  /* Mobile - (max 767px) */
  @media (max-width: 767px) {
    .hero {
      height: 80vh;
    }

    .hero-bg {
      padding-top: 80px;
    }
  }

  /* Bardzo małe ekrany */
  @media (max-width: 480px) {
    .hero {
      height: 75vh;
    }

    .hero-bg {
      padding-top: 60px;
    }
  }

  /* ————————————————  GLOBAL STYLES - OFERTA POSITIONING  ———————————————— */

  /* Reset #oferta - teraz normalny flow, ponieważ hero nie jest fixed */
  :global(.home #oferta) {
    position: relative !important;
    z-index: 1 !important;
    margin-top: 0px !important; /* Normalny flow */
  }

  /* Usunieto skomplikowane pozycjonowanie - teraz normalny flow */

  /* ————————————————  GLOBAL STYLES - ONAS POSITIONING  ———————————————— */

  /* Sekcja O-NAS - normalny flow, bez nakładania */
  :global(.home #o-nas) {
    position: relative !important;
    z-index: 1 !important;
    margin-top: 0px !important; /* Normalny flow */
  }

  /* Usunieto skomplikowane media queries - teraz normalny flow */

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

  .view.category-view {
    padding: 2rem;
    max-height: calc(100vh - 100px); /* Limit height to avoid overflow */
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    margin-top: 18%;

    .item__category {
      h2 {
        color: white !important;
        background-color: #7c8897;
        font-weight: 500;
        padding: 0.5rem;
        border-radius: 23px;
        position: relative;
        top: -60px;
        left: -10px;
        font-size: 1.3rem;
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    .category-content .container h1 {
      padding-left: 0px;
      font-size: 1.2rem;
    }
    .view.category-view {
      margin-top: 20rem;
      .item__category h2 {
        font-size: 0.7rem;
        padding-left: 10px;
        padding-right: 10px;

        margin-top: 3.5rem !important;
      }
    }
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
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    font-family: "Poppins", sans-serif;
    font-size: 48px;
    font-weight: 700;
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

  /* ————————————————  SWIPER - CLEAN RESPONSIVE  ———————————————— */
  swiper-container {
    width: 90%;
    height: 778px; /* Bazowa wysokość */
    opacity: 0;
    margin-top: 0; /* Reset margin-top */
    animation: fadeInSlider 0.6s ease-out 0.2s forwards;

    .topline {
      transition: font-size 0.3s ease-in-out; /* Smooth font size transitions */
    }
  }

  /* SPECJALNE REGUŁY SWIPER DLA PROBLEMATYCZNYCH ROZDZIELCZOŚCI */

  /* 1280x720, 1366x768 - niskie ekrany laptop */
  @media (min-width: 1280px) and (max-width: 1400px) and (max-height: 800px) {
    swiper-container {
      margin-top: 80px;
      height: 500px; /* Mniejsza wysokość dla niskich ekranów */
      width: 95%; /* Szerszy swiper */

      .topline {
        font-size: 1.8em; /* Mniejszy tekst */
        top: 5px; /* Bliżej góry */
      }
    }
  }

  /* 1600x900 - szerokie ale niskie ekrany */
  @media (min-width: 1500px) and (max-width: 1700px) and (max-height: 950px) {
    swiper-container {
      height: 750px; /* Dostosowana wysokość */
      margin-top: 100px; /* Dostosowany margines */
      width: 95%; /* Szerszy swiper */

      .topline {
        font-size: 2em; /* Dostosowany tekst */
        top: 8px;
      }
    }
  }

  /* Bardzo niskie ekrany laptop (height < 700px) */
  @media (min-width: 1024px) and (max-height: 700px) {
    swiper-container {
      height: 350px; /* Bardzo mała wysokość */
      width: 98%; /* Maksymalnie szeroki */

      .topline {
        font-size: 1.6em; /* Mały tekst */
        top: 3px; /* Bardzo blisko góry */
      }
    }
  }

  /* RESPONSIVE SWIPER STYLES */

  /* Desktop - Duże ekrany (1920px+) */
  @media (min-width: 1920px) {
    swiper-container {
      .topline {
        font-size: 2.6em;
      }
    }
  }

  /* Desktop - Średnie ekrany (1600px - 1919px) */
  @media (min-width: 1600px) and (max-width: 1919px) {
    swiper-container {
      .topline {
        font-size: 2.4em;
      }
    }
  }

  /* Desktop - Małe ekrany (1280px - 1599px) */
  @media (min-width: 1280px) and (max-width: 1599px) {
    swiper-container {
      .topline {
        font-size: 2.2em;
      }
    }
  }

  /* Laptop - Średnie (1024px - 1279px) */
  @media (min-width: 1024px) and (max-width: 1279px) {
    swiper-container {
      .topline {
        font-size: 2em;
      }
    }
    .headlines .topline {
      font-size: 1.4rem !important;
    }
  }

  /* Tablet - Landscape (768px - 1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    swiper-container {
      .topline {
        font-size: 1.8em;
      }
    }
  }

  /* Mobile - Landscape (481px - 767px) */
  @media (min-width: 481px) and (max-width: 767px) {
    swiper-container {
      .topline {
        font-size: 1.6em;
        top: 15px; /* Średni margines na mobile landscape */
        min-height: 50px;
      }
    }
  }

  /* Mobile - Portrait (max 480px) */
  @media (max-width: 480px) {
    swiper-container {
      .topline {
        font-size: 1.4em;
        top: 10px; /* Mniejszy margines na mobile */
        min-height: 40px;
      }
    }
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
  .headlines {
    transition: all 0.2s ease;
    transform: translateX(100px) translateY(20px);
  }
  .items:hover {
    transform: scale(0.9) translateY(-3px);

    .headlines {
      // transform: translateY(50px) translateX(20px) scale(0.8);
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
    line-height: 1;
    transition: all 0.3s ease;
    position: absolute;
    text-align: left;
    /* Safe area - teksty nigdy nie będą przykryte przez navbar */
    top: 20px; /* Dodatkowy margines od góry */
    min-height: 60px; /* Minimalna wysokość dla lepszego pozycjonowania */
    font-family: "Poppins", sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
  }
  .items:hover .headlines .topline {
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    // transform: translateY(-2px);
  }

  .items:hover {
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
    width: auto;
    height: auto;
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
  }

  /* --- BLOKADA SCROLLA BODY DLA expandedView --- */
  :global(body.no-scroll-hero) {
    overflow: hidden;
    position: fixed;
    overflow-x: hidden !important;
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
    .headlines .topline {
      font-size: 1.4rem !important;
    }
  }
</style>

<script lang="ts">
  import CtaButton from "../CtaButton.svelte";
  import { register } from "swiper/element/bundle";
  import { fade, fly } from "svelte/transition";
  import { cubicOut, quintOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { onMount, tick, afterUpdate, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { writable, type Writable } from "svelte/store";

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

  const initialScale = 0.85;
  let scaleStores = list.map(() =>
    tweened(initialScale, { duration: 300, easing: quintOut })
  );

  // Stores for subcategory items
  const frezarkaScale1 = tweened(initialScale, {
    duration: 300,
    easing: quintOut,
  });
  const frezarkaScale2 = tweened(initialScale, {
    duration: 300,
    easing: quintOut,
  });
  const ploterScale1 = tweened(initialScale, {
    duration: 300,
    easing: quintOut,
  });
  const ploterScale2 = tweened(initialScale, {
    duration: 300,
    easing: quintOut,
  });

  function scaleOnHover(
    node: HTMLElement,
    { store, initialValue }: { store: Writable<number>; initialValue: number }
  ) {
    const unsubscribe = store.subscribe((value) => {
      node.style.transform = `scale(${value})`;
    });

    const handleMouseenter = () => {
      store.set(initialValue + 0.03);
      isHoveringItems.set(true);
    };

    const handleMouseleave = () => {
      store.set(initialValue);
      isHoveringItems.set(false);
    };

    node.addEventListener("mouseenter", handleMouseenter);
    node.addEventListener("mouseleave", handleMouseleave);

    return {
      destroy() {
        node.removeEventListener("mouseenter", handleMouseenter);
        node.removeEventListener("mouseleave", handleMouseleave);
        unsubscribe();
      },
    };
  }

  let backButtonOffsetX = 20; // User-configurable offset
  let backButtonOffsetY = 20; // User-configurable offset
  let swiperReady = true; // Start as true so element renders immediately
  let swiperElement; // Declare swiperElement
  let swiperKey = 0; // Klucz do wymuszania re-renderu swipera
  let lastActiveSlideIndex = 0; // Zapamięta ostatni aktywny slajd
  let subSwiperKey = 0; // Klucz do wymuszania re-renderu sub-swipera
  // let minHeroContentHeight = 0;

  // Zmienna do śledzenia stanów ładowania obrazków
  let imageLoadingStates = writable({});
  const isHoveringItems = writable(false);

  function positionToplines() {
    if ($isHoveringItems) return; // Prevent execution if an item button is hovered
    // minHeroContentHeight = 0; // Reset for each calculation
    if (browser) {
      // Select all swiper-slides in both main and sub views
      const allSlides = document.querySelectorAll(
        ".slider-view swiper-slide, .subListMachines swiper-slide"
      );

      allSlides.forEach((slide) => {
        const container = slide.querySelector<HTMLElement>(".items"); // The button
        const image = slide.querySelector<HTMLElement>(".item .image");
        const topline = slide.querySelector<HTMLElement>(".headlines .topline");

        if (container && image && topline) {
          // Add debugging borders
          /*   image.style.border = '2px solid red';
                topline.style.border = '2px solid green'; */

          const position = () => {
            const imageRect = image.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const toplineRect = topline.getBoundingClientRect(); // Needed for width

            let top = (imageRect.bottom - containerRect.top) / initialScale;
            let left =
              (imageRect.right - containerRect.left - toplineRect.width) /
              initialScale;

            if ($windowWidth <= 768) {
              // top+=20;
            }

            /*   let left;
                    if ($windowWidth <= 768) { // Assuming 768px as mobile breakpoint
                      // Center horizontally relative to the container
                      left = (containerRect.width / 2 - toplineRect.width / 2) / initialScale;
                      topline.style.textAlign = 'center'; // Align text to center for mobile
                    } else {
                      // Original logic for desktop/larger screens
                      left = ((imageRect.right - containerRect.left) - toplineRect.width) / initialScale - 50;
                      topline.style.textAlign = 'right'; // Align text to the right
                    } */

            // We are positioning the .topline, but it's inside .headlines.
            // The .headlines container needs to not interfere.
            const headlines = slide.querySelector<HTMLElement>(".headlines");
            if (headlines) {
              headlines.style.position = "absolute";
              headlines.style.top = "0";
              headlines.style.left = "0";
              headlines.style.width = "100%"; // Make it full width
              headlines.style.transform = "none";
            }
            topline.style.position = "absolute";
            topline.style.top = `${top}px`;
            // topline.style.top = `${top - 35 + ($windowWidth <= 768 ? 100 : 0)}px`;
            topline.style.left = `${left + 100}px`;
            topline.style.right = "0px";
            topline.style.width = "100%";
            topline.style.textAlign = "center"; // Align text to the center

            /* // The topline's bottom position relative to the hero-content
                    const finalTop = parseFloat(topline.style.top);
                    const finalHeight = toplineRect.height / initialScale; // Use scaled height
                    const currentToplineBottom = finalTop + finalHeight;
                    // Find the button.items element that is the container for the current topline
                    const currentItemsButton = topline.closest('.items');

                    if (currentItemsButton) {
                        const itemsRect = currentItemsButton.getBoundingClientRect();
                        const heroContentRect = document.querySelector('.hero-content')?.getBoundingClientRect();

                        if (heroContentRect) {
                            // Calculate the bottom of the topline relative to the top of the hero-content
                            const absoluteToplineBottom = itemsRect.top - heroContentRect.top + finalTop + finalHeight;
                            minHeroContentHeight = Math.max(minHeroContentHeight, absoluteToplineBottom);
                        }
                    } */
          };

          const imgElement = image.querySelector("img");
          if (imgElement && imgElement.complete) {
            position();
          } else if (imgElement) {
            imgElement.onload = position;
          } else {
            position();
          }
        }
      });
    }
  }

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

              // Reposition toplines after swiper is ready
              positionToplines();

              // Wróć do zapisanego slajdu po re-renderze
              setTimeout(() => {
                if (swiperElement && swiperElement.swiper) {
                  swiperElement.swiper.slideTo(lastActiveSlideIndex);
                  updateNavigationButtons(swiperElement.swiper);
                }
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
        let categoryId = urlParams.get("category");
        let machineId = urlParams.get("machine");
        let slideId = urlParams.get("slide");
        const categoryData = categoryId
          ? list.find((item) => item.id === categoryId)
          : null;

        // If the initial URL is for a category page that shouldn't exist,
        // correct the URL and reset state to the main slider view.
        if (
          categoryId &&
          !machineId &&
          categoryData &&
          typeof categoryData.machine === "string"
        ) {
          history.replaceState(null, "", "/");
          // Nullify params to trigger main slider logic below
          categoryId = null;
          machineId = null;
          slideId = null;
        }

        if (categoryId) {
          // This path is for valid category pages OR direct-to-machine pages.
          $activeCategoryStore = categoryId;
          $activeMachineStore = machineId;
          $expandedViewStore = !!machineId;
        } else {
          // Otherwise, no category in URL, so initialize the main slider.
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
                // Position toplines once the swiper is ready on initial load
                positionToplines();
                setTimeout(() => {
                  if (swiperElement && swiperElement.swiper) {
                    updateNavigationButtons(swiperElement.swiper);
                  }
                }, 200);
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
        positionToplines();
        positionBackButton();
      };
      window.addEventListener("resize", handleResize);
      window.addEventListener("popstate", handlePopstate);

      positionToplines();
      positionBackButton();

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
      positionToplines();
    }

    // --- Initialize Sub-Swipers ---

    if (browser) {
      const initSubSwiper = (el, id) => {
        if (el && !el.swiper) {
          const params = {
            slidesPerView: subSwiperSlidesPerView,
            slidesPerGroup: subSwiperSlidesPerGroup,
            spaceBetween: 0,
            mousewheel: true,
          };
          Object.assign(el, params);
          el.initialize();
          el.swiper.on("fromEdge toEdge slideChange", () => {
            updateSubSwiperNav(el.swiper, id);
          });
          setTimeout(() => updateSubSwiperNav(el.swiper, id), 100);
        }
      };

      initSubSwiper(subSwiperFrezarkiEl, "frezarki");

      initSubSwiper(subSwiperPloteryEl, "plotery");
    }
    positionToplines();
    positionBackButton();
  });

  function setupSwiperEvents(swiper) {
    // Update navigation buttons state
    updateNavigationButtons(swiper);
    positionToplines();
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
        if (swiperElement) {
          const swiperPagination =
            swiperElement.querySelector(".swiper-pagination");
        }
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
      if (swiperElement && swiperElement.swiper) {
        updateNavigationButtons(swiperElement.swiper);
      }
    }, 100);
  }

  $: slidesPerView = $windowWidth <= 1024 ? 1 : 2;

  $: slidesPerGroup = $windowWidth <= 1024 ? 1 : 2;

  // --- Reactive properties for Sub-Swipers (to match main swiper) ---
  $: subSwiperSlidesPerView = $windowWidth <= 1024 ? 1 : 2;
  $: subSwiperSlidesPerGroup = $windowWidth <= 1024 ? 1 : 2;

  // Update sub-swipers when window width changes
  $: if (browser && $windowWidth) {
    const updateSwiper = (swiperEl, slidesPerView, slidesPerGroup) => {
      if (swiperEl && swiperEl.swiper) {
        const swiper = swiperEl.swiper;
        try {
          if (swiper.params) {
            swiper.params.slidesPerView = slidesPerView;
            swiper.params.slidesPerGroup = slidesPerGroup;
          }
          swiperEl.setAttribute("slides-per-view", slidesPerView);
          swiperEl.setAttribute("slides-per-group", slidesPerGroup);
          swiper.update();
        } catch (e) {}
      }
    };
    updateSwiper(
      subSwiperFrezarkiEl,
      subSwiperSlidesPerView,
      subSwiperSlidesPerGroup
    );
    updateSwiper(
      subSwiperPloteryEl,
      subSwiperSlidesPerView,
      subSwiperSlidesPerGroup
    );
  }

  // Update swiper when window width changes
  $: if (
    browser &&
    !$activeCategoryStore &&
    swiperElement &&
    swiperElement.swiper &&
    $windowWidth
  ) {
    setTimeout(() => {
      if (!swiperElement || !swiperElement.swiper) {
        return;
      }
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
      // Use swiper's built-in isBeginning and isEnd properties
      if (swiper.isBeginning) {
        prevButton.classList.add("swiper-button-disabled");
      } else {
        prevButton.classList.remove("swiper-button-disabled");
      }

      if (swiper.isEnd) {
        nextButton.classList.add("swiper-button-disabled");
      } else {
        nextButton.classList.remove("swiper-button-disabled");
      }
    }
  }

  // Navigation button click handlers
  function handlePrevClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      swiper.slidePrev(300);
      setTimeout(() => {
        lastActiveSlideIndex = swiper.activeIndex;
        updateNavigationButtons(swiper);
      }, 350);
    }
  }

  function handleNextClick() {
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;
      swiper.slideNext(300);
      setTimeout(() => {
        lastActiveSlideIndex = swiper.activeIndex;
        updateNavigationButtons(swiper);
      }, 350);
    }
  }

  // --- Functions for Sub-Swipers ---
  let subSwiperFrezarkiEl;
  let subSwiperPloteryEl;

  function updateSubSwiperNav(swiper, idPrefix) {
    if (!swiper) return;
    const prevButton = document.getElementById(
      `swiper-button-prev-${idPrefix}`
    );
    const nextButton = document.getElementById(
      `swiper-button-next-${idPrefix}`
    );

    if (prevButton && nextButton) {
      // Hide buttons if all slides are visible (no need to navigate)
      if (swiper.slides.length <= swiper.params.slidesPerView) {
        prevButton.classList.add("hide-navigation-sub");
        nextButton.classList.add("hide-navigation-sub");
      } else {
        prevButton.classList.remove("hide-navigation-sub");
        nextButton.classList.remove("hide-navigation-sub");

        // Manage disabled state based on swiper position
        if (swiper.isBeginning) {
          prevButton.classList.add("swiper-button-disabled");
        } else {
          prevButton.classList.remove("swiper-button-disabled");
        }
        if (swiper.isEnd) {
          nextButton.classList.add("swiper-button-disabled");
        } else {
          nextButton.classList.remove("swiper-button-disabled");
        }
      }
    }
  }

  function handleSubPrevClick(swiper) {
    if (swiper) {
      swiper.slidePrev(300);
    }
  }

  function handleSubNextClick(swiper) {
    if (swiper) {
      swiper.slideNext(300);
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
      const categoryId = urlParams.get("category");
      const machineId = urlParams.get("machine");
      const slideId = urlParams.get("slide");
      const categoryData = categoryId
        ? list.find((item) => item.id === categoryId)
        : null;

      // If the URL points to a category page that SHOULD NOT exist (because it's a direct-to-machine item),
      // then reset the state to the main slider view and correct the URL.
      if (
        categoryId &&
        !machineId &&
        categoryData &&
        typeof categoryData.machine === "string"
      ) {
        history.replaceState(null, "", "/");
        $activeCategoryStore = null;
        $activeMachineStore = null;
        $expandedViewStore = false;
        // The activeCategoryStore.subscribe will handle the main swiper update.
        return;
      }

      // Default behavior: sync stores with URL parameters.
      const wasInMachineView = $activeMachineStore !== null;
      $activeCategoryStore = categoryId;
      $activeMachineStore = machineId;
      $expandedViewStore = !!machineId;

      // Handle swiper key for sub-swiper re-rendering
      const isNowInCategoryView = categoryId !== null && machineId === null;
      if (wasInMachineView && isNowInCategoryView) {
        subSwiperKey++;
      }

      // Handle main swiper slide position
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
          if (swiperElement && swiperElement.swiper) {
            swiperElement.swiper.slideToLoop(0);
          }
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
    // If a machine view is open...
    if ($activeMachineStore) {
      const categoryData = list.find(
        (item) => item.id === $activeCategoryStore
      );

      // Check if the parent category has a list of machines (sub-category view)
      // by checking if its 'machine' property is an array.
      if (categoryData && Array.isArray(categoryData.machine)) {
        // This machine is part of a subcategory. Go back to the subcategory list.
        document.body.classList.remove("active_machine_view");
        $activeMachineStore = null;
        $expandedViewStore = false;
        if (browser) {
          const url = new URL(window.location.href);
          url.searchParams.delete("machine");
          history.pushState(
            { category: $activeCategoryStore, machine: null },
            "",
            url.toString()
          );
        }
        subSwiperKey++; // Force re-render of the sub-swiper
      } else {
        // This machine was opened directly from the main slider (its 'machine' property is a string).
        // Go back to the main slider.
        $activeCategoryStore = null;
        $activeMachineStore = null;
        $expandedViewStore = false;
        if (browser) {
          const url = new URL(window.location.origin);
          history.pushState(
            { category: null, machine: null },
            "",
            url.toString()
          );
        }
        // The activeCategoryStore subscriber will handle main swiper re-rendering (swiperKey++).
      }
      return; // Stop here
    }

    // If only a category view is open, close it and return to the main slider.
    if ($activeCategoryStore) {
      $activeCategoryStore = null;
      $activeMachineStore = null;
      $expandedViewStore = false;
      if (browser) {
        const url = new URL(window.location.href);
        url.searchParams.delete("category");
        url.searchParams.delete("machine");
        history.pushState(
          { category: null, machine: null },
          "",
          url.toString()
        );
      }

      // Return to the last active slide in the main swiper
      setTimeout(() => {
        if (swiperElement && swiperElement.swiper) {
          swiperElement.swiper.slideTo(lastActiveSlideIndex);
          updateNavigationButtons(swiperElement.swiper);
        }
      }, 100);
    }
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

  $: if ($activeCategoryStore && !$activeMachineStore && browser) {
    // We need to wait for the next DOM update cycle for the button to be rendered.
    // A timeout of 0 achieves this, making the positioning feel instant.
    setTimeout(positionBackButton, 0);
  }

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
        if (swiperElement && swiperElement.swiper) {
          // Wróć do ostatniego aktywnego slajdu zamiast zawsze do pierwszego
          swiperElement.swiper.slideTo(lastActiveSlideIndex);
          updateNavigationButtons(swiperElement.swiper);
        }
      }, 100); // Zwiększone opóźnienie dla pewności
    }
    $activeCategoryStore = null;
    $activeMachineStore = null;
    $expandedViewStore = false;
    resetHeroSwiper.set(false); // Reset the store value
  }

  // Reactive Guard: This block watches for invalid navigation states and corrects them.
  $: {
    if (browser && $activeCategoryStore && !$activeMachineStore) {
      const categoryData = list.find(
        (item) => item.id === $activeCategoryStore
      );
      // If we've entered a "category view" for an item that should link
      // directly to a machine (i.e. 'machine' is a string), it's an invalid state.
      // This can happen when closing a direct-to-machine view.
      // We must correct the state and go back to the main slider.
      if (categoryData && typeof categoryData.machine === "string") {
        // Use a timeout to defer this state change to the next event loop cycle,
        // preventing potential issues with Svelte's reactivity.
        setTimeout(() => {
          $activeCategoryStore = null;
        }, 0);
      }
    }
  }

  // Reactive statement to manage active_machine_view class on body
  $: if (browser) {
    if ($activeMachineStore) {
      document.body.classList.add("active_machine_view");
    } else {
      document.body.classList.remove("active_machine_view");
    }
  }

  function positionBackButton() {
    if (browser) {
      const hero = document.querySelector<HTMLElement>(".hero");
      const triangle = document.querySelector<HTMLElement>(".triangle");
      const backButton =
        document.querySelector<HTMLElement>(".backFromCategory");

      if (hero && triangle && backButton) {
        const heroRect = hero.getBoundingClientRect();
        const triangleRect = triangle.getBoundingClientRect();
        const buttonRect = backButton.getBoundingClientRect();

        // Calculate position relative to the .hero container, placing the button above the triangle
        const top = triangleRect.top - heroRect.top - buttonRect.height - -25; // 10px margin
        const left =
          triangleRect.left -
          heroRect.left +
          triangleRect.width / 2 -
          buttonRect.width / 2;

        backButton.style.position = "absolute";
        backButton.style.top = `${top}px`;
        backButton.style.left = `${left - 40}px`;
        backButton.style.transform = "none";
        backButton.style.zIndex = "100"; // Ensure it's on top
      }
    }
  }

  // function positionBackButton() {
  //   if (browser) {
  //     const triangle = document.querySelector(".triangle");
  //     const backButton = document.querySelector(".backFromCategory");

  //     if (triangle && backButton) {
  //       const rectTriangle = triangle.getBoundingClientRect();
  //       const rectHero = document
  //         .querySelector(".hero")
  //         .getBoundingClientRect();

  //       const top = rectTriangle.top - rectHero.top;
  //       const left = rectTriangle.left - rectHero.left;

  //       backButton.style.position = "absolute";
  //       backButton.style.top = `${top}px`;
  //       backButton.style.left = `${left}px`;
  //     }
  //   }
  // }
  onMount(() => {
    startTimeout();
    positionToplines();
    positionBackButton();

    window.addEventListener("resize", positionBackButton);

    return () => {
      window.removeEventListener("resize", positionBackButton);
    };
  });

  afterUpdate(positionToplines);
  afterUpdate(positionBackButton);

  // Uruchom funkcję po zmianie stanu aktywnej kategorii
  $: if ($activeCategoryStore && !$activeMachineStore) {
    setTimeout(() => positionBackButton(), 0);
  }

  let timer;
  function startTimeout() {
    timer = setInterval(() => {
      positionToplines();
    }, 500); // pozycjonowanie toplines  napisów obok obrazków.
  }

  onDestroy(() => {
    clearInterval(timer);
  });

  function getTitle(node) {
    const parent = node.parentElement;

    const topline = parent.querySelector(".topline");
    if (topline) {
      node.innerHTML = topline.innerHTML;
      node.style.cursor = "pointer";
    }
  }
</script>

<!-- Tło i gradient pozostają statyczne -->
<section class="hero">
  <div class="hero-bg gradientHero">
    <div class="hero-overlay"></div>

    <!-- Kontener dla animacji crossfade -->
    <div class="hero-content" in:fade={{ duration: 650, delay: 800 }}>
      <!-- <div class="hero-content" style="min-height: {minHeroContentHeight}px;" in:fade={{ duration: 650, delay: 800 }}> -->
      <!-- 1. Slider - pokazuje się gdy nie ma aktywnej kategorii -->
      {#if !$activeCategoryStore}
        {#if swiperReady}
          <div
            class="view slider-view"
            class:slider-view--single-slide={slidesPerView === 1}
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
                {#each list as cat, i}
                  <swiper-slide>
                    <button
                      use:scaleOnHover={{
                        store: scaleStores[i],
                        initialValue: initialScale,
                      }}
                      type="button"
                      class="items items-left lift no-sel"
                      on:click={() =>
                        cat.url
                          ? (window.location.href = cat.url)
                          : openCategory(cat.id)}
                    >
                      <div class="headlines">
                        <div class="topline">
                          {cat.title}
                          {#if cat.subtitle}
                            {@html cat.subtitle}
                          {/if}
                        </div>
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

                    <div
                      class="item_title no-sel"
                      use:getTitle
                      on:click={() =>
                        cat.url
                          ? (window.location.href = cat.url)
                          : openCategory(cat.id)}
                    ></div>
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

      {#if $activeCategoryStore === "frezarki" && !$activeMachineStore}
        <div
          class="view category-view no-sel"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
          on:introend={positionToplines}
        >
          <div class="category-content">
            <div class="container" in:fade={{ duration: 600, delay: 200 }}>
              <div class="content">
                {#key subSwiperKey}
                  <div
                    class="subListMachines"
                    class:subListMachines--single-view={subSwiperSlidesPerView ===
                      1}
                  >
                    <button
                      id="swiper-button-prev-frezarki"
                      class="swiper-nav-button swiper-nav-prev no-sel"
                      on:click={() =>
                        handleSubPrevClick(subSwiperFrezarkiEl.swiper)}
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
                    <swiper-container
                      bind:this={subSwiperFrezarkiEl}
                      slides-per-view={subSwiperSlidesPerView}
                      slides-per-group={subSwiperSlidesPerGroup}
                      space-between="0"
                      mousewheel
                      loop="true"
                    >
                      <swiper-slide>
                        <button
                          use:scaleOnHover={{
                            store: frezarkaScale1,
                            initialValue: initialScale,
                          }}
                          type="button"
                          class="items no-sel"
                          on:click={() => openMachine("m_frezarka")}
                        >
                          <div class="item">
                            <div class="image">
                              <img
                                src="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png"
                                alt="CNC HMM-ST"
                                draggable="false"
                              />
                            </div>
                          </div>
                          <div class="headlines">
                            <div class="topline">
                              CNC HMM-ST<br /><span class="nawias"
                                >(ST - Sliding Table - ruchomy stół)</span
                              >
                            </div>
                          </div>
                        </button>
                        <div
                          class="item_title no-sel"
                          use:getTitle
                          on:click={() => openMachine("m_frezarka")}
                        ></div>
                      </swiper-slide>
                      <swiper-slide>
                        <button
                          use:scaleOnHover={{
                            store: frezarkaScale2,
                            initialValue: initialScale,
                          }}
                          type="button"
                          class="items no-sel"
                          on:click={() => openMachine("m_frezarka1")}
                        >
                          <div class="item">
                            <div class="image">
                              <img
                                src="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.png"
                                alt="CNC HMM-GT"
                                draggable="false"
                              />
                            </div>
                          </div>
                          <div class="headlines">
                            <div class="topline">
                              CNC HMM-GT<br /><span class="nawias"
                                >(GT - Ganry Type - ruchoma brama)</span
                              >
                            </div>
                          </div>
                        </button>
                        <div
                          class="item_title no-sel"
                          use:getTitle
                          on:click={() => openMachine("m_frezarka1")}
                        ></div>
                      </swiper-slide>
                    </swiper-container>
                    <button
                      id="swiper-button-next-frezarki"
                      class="swiper-nav-button swiper-nav-next no-sel"
                      on:click={() =>
                        handleSubNextClick(subSwiperFrezarkiEl.swiper)}
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
                  </div>
                {/key}
                <!-- Back button moved for stable positioning -->
              </div>
            </div>
          </div>
        </div>
      {/if}

      {#if $activeCategoryStore === "ploteryPrzemyslowe" && !$activeMachineStore}
        <div
          class="view category-view no-sel"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
          on:introend={positionToplines}
        >
          <div class="category-content">
            <div class="container" in:fade={{ duration: 600, delay: 200 }}>
              <div class="content">
                <!--    <h1>

                {list.find((item) => item.id === $activeCategoryStore)?.title}

              </h1> -->
                {#key subSwiperKey}
                  <div
                    class="subListMachines"
                    class:subListMachines--single-view={subSwiperSlidesPerView ===
                      1}
                  >
                    <button
                      id="swiper-button-prev-plotery"
                      class="swiper-nav-button swiper-nav-prev no-sel"
                      on:click={() =>
                        handleSubPrevClick(subSwiperPloteryEl.swiper)}
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
                    <swiper-container
                      bind:this={subSwiperPloteryEl}
                      slides-per-view={subSwiperSlidesPerView}
                      slides-per-group={subSwiperSlidesPerGroup}
                      space-between="0"
                      mousewheel
                      loop="true"
                    >
                      <swiper-slide>
                        <button
                          use:scaleOnHover={{
                            store: ploterScale1,
                            initialValue: initialScale,
                          }}
                          type="button"
                          class="items no-sel"
                          on:click={() => openMachine("m-ploter")}
                        >
                          <div class="item">
                            <div class="image">
                              <img
                                src="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.png"
                                alt="Ploter przemysłowy"
                                draggable="false"
                              />
                            </div>
                          </div>
                          <div class="headlines">
                            <div class="topline">
                              CNC HPP-CT<br /><span class="nawias"
                                >(CT — Closed Type - w zabudowie)</span
                              >
                            </div>
                          </div>
                        </button>
                        <div
                          class="item_title no-sel"
                          use:getTitle
                          on:click={() => openMachine("m-ploter")}
                        ></div>
                      </swiper-slide>
                      <swiper-slide>
                        <button
                          use:scaleOnHover={{
                            store: ploterScale2,
                            initialValue: initialScale,
                          }}
                          type="button"
                          class="items no-sel"
                          on:click={() => openMachine("m-ploter1")}
                        >
                          <div class="item">
                            <div class="image">
                              <img
                                src="/assets/maszyny/renders/Certus_0816_Layers/Certus_0816_Layer1.png"
                                alt="Ploter przemysłowy bez zabudowy"
                                draggable="false"
                              />
                            </div>
                          </div>
                          <div class="headlines">
                            <div class="topline">
                              CNC HPP-OT<br /><span class="nawias"
                                >(OT — Open Type - otwarte)</span
                              >
                            </div>
                          </div>
                        </button>
                        <div
                          class="item_title no-sel"
                          use:getTitle
                          on:click={() => openMachine("m-ploter1")}
                        ></div>
                      </swiper-slide>
                    </swiper-container>
                    <button
                      id="swiper-button-next-plotery"
                      class="swiper-nav-button swiper-nav-next no-sel"
                      on:click={() =>
                        handleSubNextClick(subSwiperPloteryEl.swiper)}
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
                  </div>
                {/key}

                <!-- Back button moved for stable positioning -->
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Back button now lives here for stable positioning -->
  {#if $activeCategoryStore && !$activeMachineStore}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <CtaButton on:click={close} text="Wróć" classs="backFromCategory" />
    </div>
  {/if}

  <span class="triangle"></span>
</section>

<MaszynyActiveMachine />

<style lang="scss">
  :global(.activeMachine .active_flex .maszyny-plain-image-container) {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #f8f9fa;
    aspect-ratio: 2 / 1;
    display: flex;
  }
  :global(.activeMachine .active_flex .maszyny-plain-image-container img) {
    position: relative;
    width: 100%;
    height: 100%;
    
  }

  .category-content .subListMachines {
    height: 500px;
  }
  .item_title {
    position: absolute;
    margin-bottom: -57%;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.72);
    color: rgb(255, 255, 255);
    line-height: 1;
    transition: all 0.9s ease;
    text-align: center;
    width: 100%;
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.75;
    font-family: "Poppins" !important;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 746px) {
    .item_title {
      font-size: 1.6rem;
      margin-bottom: -85% !important;

      span {
        font-size: 0.8rem;
      }
    }
  }

  :global(.home .hero) {
    overflow: hidden;
    &::after {
      content: "";
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100vw;
      height: 37px;
      right: 0px;

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
      &::after {
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
    :global(.home .hero .triangle) {
      &::after {
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

  :global(.swiper-nav-button.hide-navigation-sub) {
    opacity: 0 !important;
    pointer-events: none !important;
    transition: opacity 0.3s ease;
  }

  section.hero .hero-bg {
    height: 100%;
  }

  .container {
    /*   max-width: 1200px;
    margin: 0 auto;
    padding: 0 0px; */
  }

  :global(.gradientHero) {
    background: linear-gradient(344deg, #3e4042 40%, #5454 100%);

    @media (max-width: 767px) {
      background: linear-gradient(330deg, #3e4042 40%, #5454 100%) !important;
    }
  }
  :global(.gradientHero_old) {
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
  }
  .active_flex {
    position: relative;
  }
  .subListMachines {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .swiper-nav-button {
      top: 50%;
    }
    /* Most styles are now inherited from the shared rules below */
  }

  :global(button.backFromCategory.back-button-positioned) {
    top: var(--back-button-top) !important;
    left: var(--back-button-left) !important;
    transform: none !important;
  }

  @media (max-height: 750px) {
    .category-content .container {
      :global(button.backFromCategory) {
      }
    }
  }

  :global(button.backFromCategory) {
    z-index: 9999;
    transition: all ease 0.4s;
    height: 42px !important;
    background-color: #96a500 !important;
    color: white !important;

    .text-container {
      z-index: 300;
    }

    &::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(/assets/images/pattern-image1-2.png);
    }
  }
  .category-content .container {
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
  @media (min-width: 1025px) {
    :global(.subListMachines .swiper-nav-button) {
      opacity: 0;
      transition: all ease 0.5s;
    }
  }

  @media (min-width: 1200px) {
    .hero {
      height: 100vh;
    }

    .hero-bg {
      /*  padding-top: 120px; */
    }
  }

  @media (max-width: 1200px) {
    .view {
      margin-top: -80px;
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
      // height: 100vh;
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
    // padding: 2rem;
    max-height: 100vh;
    position: absolute;
    /* width: 100%; */
    /* height: 100%; */
    /* display: flex; */
    /* align-items: flex-start; */
    justify-content: center;
    /* flex-direction: row; */
    // margin-top: 18%;
    z-index: 100;

    .item__category {
      h2 {
        /* font-size: 1rem;
          color: #e3e3e3 !important;
          font-weight: 500;
          padding: 0.5rem;
          border-radius: 23px;
          position: relative;
          top: -60px;
          left: -10px;
          padding-left: 20px;
          padding-right: 20px; */
        font-size: 1rem;
        color: #e3e3e3 !important;
        font-weight: 500;
        padding: 0.5rem;
        border-radius: 23px;
        position: relative;
        bottom: -32vw;
        right: -29vw;
      }
    }
  }

  .item__category h2 {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .category-content .container h1 {
      padding-left: 0px;
      font-size: 1.2rem;
    }
    .view.category-view {
      // margin-top: 20rem;

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
    /*    display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 2rem; */
    width: 100%;
  }
  .category-content h1 {
    color: #fff;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    font-family: "Poppins", sans-serif;
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
    width: 100%;
    margin-top: -10px;
    opacity: 0;
    animation: fadeInSlider 0.6s ease-out 0.2s forwards;
    overflow: visible;
    height: 130%;
  }

  .slider-view swiper-container swiper-slide,
  .subListMachines swiper-container swiper-slide {
    button > div.item > div {
      /* .image */
      opacity: 0.6;
      transition: opacity 0.3s ease;
    }
    button > div.item > div img {
      filter: blur(0.6px);
      transition: filter 0.3s ease;
    }

    button:hover > div.item > div {
      opacity: 1;
    }
    button:hover > div.item > div img {
      filter: blur(0);
    }
  }

  // Override opacity/blur for single-view main swiper
  .slider-view--single-slide swiper-container swiper-slide {
    button > div.item > div {
      opacity: 1 !important;
    }
    button > div.item > div img {
      filter: blur(0) !important;
    }
  }
  // Override opacity/blur for single-view sub-swipers
  .subListMachines--single-view swiper-container swiper-slide {
    button > div.item > div {
      opacity: 1 !important;
    }
    button > div.item > div img {
      filter: blur(0) !important;
    }
  }

  // .subListMachines swiper-slide .item {
  // }
  @media (max-width: 768px) {
    .slider-view swiper-container swiper-slide,
    .subListMachines swiper-container swiper-slide {
      button > div.item > div {
        opacity: 1; // Remove opacity for mobile devices
      }
    }
  }

  .slider-view swiper-container swiper-slide:nth-child(1),
  .slider-view swiper-container swiper-slide:nth-child(2),
  .subListMachines swiper-container swiper-slide:nth-child(1),
  .subListMachines swiper-container swiper-slide:nth-child(2) {
    button > div.item > div {
      transform: scale(1) !important;
    }
  }

  /* SPECJALNE REGUŁY SWIPER DLA PROBLEMATYCZNYCH ROZDZIELCZOŚCI */

  /* 1280x720, 1366x768 - niskie ekrany laptop */
  @media (min-width: 1280px) and (max-width: 1400px) and (max-height: 800px) {
    swiper-container {
      margin-top: 80px;
      height: 500px;
      width: 95%;
    }
  }

  /* 1600x900 - szerokie ale niskie ekrany */
  @media (min-width: 1500px) and (max-width: 1700px) and (max-height: 950px) {
    swiper-container {
      height: 750px;
      margin-top: 100px;
      width: 95%;
    }
  }

  /* Bardzo niskie ekrany laptop (height < 700px) */
  @media (min-width: 1024px) and (max-height: 700px) {
    swiper-container {
      width: 100%;

      .topline {
        text-shadow: 0px 0px 7px black;
      }
    }
  }

  .slider-view swiper-slide,
  .subListMachines swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    flex-shrink: 0;
    // overflow: visible;

    @media (max-width: 1024px) {
      width: 100%; // Ensure full width on smaller screens when slidesPerView is 1
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

    height: 100%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 16px;
    position: relative;
    overflow: visible;
  }
  .headlines {
    transition: all 0.2s ease;
    /* transform: translateX(100px) translateY(20px); */
    z-index: 900000000000;
    /* position: absolute; */
    /* width: 70vh; */
    display: none;
  }

  .items::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .items:hover::before {
    opacity: 1;
  }

  :global(body.home span.nawias) {
    font-size: 1rem;
    margin-top: 10px;
    /*   float: right; */
  }

  .headlines .topline {
    width: 350px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    color: #e3e3e3;
    line-height: 1;
    transition: all 0.3s ease;
    text-align: left;
    font-size: 1.5rem;
    z-index: 999999999;
    font-weight: 200;
    font-family: "Poppins" !important;
    margin-left: -15%;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      width: 200px;
      margin-left: -25%;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      width: 150px;
    }
  }
  .items:hover .headlines .topline {
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .items:hover {
    // transform: scale(1);
  }
  .item .image {
    position: relative;
    // border-radius: 12px;
    // overflow: hidden;
    transition: all 0.3s ease;
    transform: scale(1);
  }

  .item .image::after {
    content: "";
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 50%;
    background: #000;
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
    border-radius: 50%; /* Make it round */
  }

  .items:hover .item .image::after {
    opacity: 0.05; /* More delicate */
  }

  .item .image img {
    display: block;
    width: auto;
    height: auto;
    object-fit: cover;
    transition: all 0.3s ease;
    margin-top: -30px;
  }

  .item .image img.bg {
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
    }
  }

  // --- Sub-Swiper Styles ---
  .sublist-swiper-container {
    position: relative;
    width: 100%;
    max-width: 90vw;
    height: 450px; // Adjust as needed

    .swiper-nav-button {
      top: 50%; // Align with main swiper
    }

    swiper-container {
      width: 100%;
      height: 100%;
      overflow: visible;

      swiper-slide {
        transition:
          transform 0.4s ease,
          opacity 0.4s ease;
        transform: scale(0.75);
        opacity: 0.4;
        display: flex;
        justify-content: center;
        align-items: center;

        .item__category {
          // Override some styles if needed
          h2 {
            top: -20px;
          }
        }
      }

      swiper-slide.swiper-slide-active {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .slider-view swiper-container swiper-slide:nth-child(1),
  .slider-view swiper-container swiper-slide:nth-child(2),
  .slider-view swiper-container swiper-slide:nth-child(5),
  .subListMachines swiper-container swiper-slide:nth-child(1),
  .subListMachines swiper-container swiper-slide:nth-child(2),
  .subListMachines swiper-container swiper-slide:nth-child(5) {
    .headlines .topline {
      /*  margin-left: -90px; */
    }
  }

  .slider-view swiper-container swiper-slide:nth-child(1),
  .slider-view swiper-container swiper-slide:nth-child(2),
  .subListMachines swiper-container swiper-slide:nth-child(1),
  .subListMachines swiper-container swiper-slide:nth-child(2) {
    .headlines .topline {
      /*   margin-left: -90px; */
    }

    button > div.item > div {
      transform: scale(1) !important;
    }
  }
</style>

<script >
  import IconDoc from "../IconDoc.svelte";
  import DaneTechniczne from "../../assets/menu/dane_techniczne.svelte";
  import MenuEmail from "../../assets/menu/menu_email.svelte";
  import MenuDownload from "../../assets/menu/menu_download.svelte";
  import CtaButtonHero from "../cta-button-hero.svelte";
  import { register } from "swiper/element/bundle";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import {onMount}  from "svelte";
  import { browser } from "$app/environment";
  import { writable } from 'svelte/store';
  import { resetHeroSwiper } from '../../lib/resetHeroSwiperStore';
  import { typoFix } from '$lib/utils/typography';

  register();

  let activeCategory = null;
  let activeMachine = null;
  let expandedView = false;
  let swiperReady = false;
  let swiperElement; // Declare swiperElement

  // Zmienna do śledzenia stanów ładowania obrazków
  let imageLoadingStates = writable({});

  onMount(() => {
    setTimeout(() => {
      swiperReady = true;
      // Initial load logic
      if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const slideId = urlParams.get('slide');
        const categoryId = urlParams.get('category');
        const machineId = urlParams.get('machine');

        // Explicitly set activeCategory, activeMachine, and expandedView based on URL params
        activeCategory = categoryId;
        activeMachine = machineId;
        expandedView = !!machineId; // Set expandedView based on machineId presence

        if (slideId) {
          const index = list.findIndex(item => item.id === slideId);
          if (index !== -1 && swiperElement && swiperElement.swiper) {
            swiperElement.swiper.slideToLoop(index);
          }
        } else {
          // If no slide param, ensure Swiper is on the first slide after a small delay
          if (swiperElement && swiperElement.swiper) {
            setTimeout(() => {
              swiperElement.swiper.slideToLoop(0);
            }, 0);
          }
        }

        window.addEventListener('popstate', handlePopstate);
      }
    }, 150); // 150ms na inicjalizację Swipera

    preloadImages();

    return () => {
      if (browser) {
        window.removeEventListener('popstate', handlePopstate);
      }
    };
  });

  function handleSwiperInit() {
    swiperReady = true;
  }

  function handleSlideChange(event) {
    if (browser) {
      const swiper = event.detail[0];
      const currentSlideIndex = swiper.realIndex;
      const currentSlideId = list[currentSlideIndex].id;
      const url = new URL(window.location.href);
      url.searchParams.set('slide', currentSlideId);
      history.pushState({ slide: currentSlideId }, '', url.toString());
    }
  }

  function handlePopstate(event) {
    if (browser) {
      const urlParams = new URLSearchParams(window.location.search);
      const slideId = urlParams.get('slide');
      const categoryId = urlParams.get('category');
      const machineId = urlParams.get('machine');

      // Explicitly set activeCategory, activeMachine, and expandedView based on URL params
      activeCategory = categoryId;
      activeMachine = machineId;
      expandedView = !!machineId; // Set expandedView based on machineId presence

      if (slideId) {
        const index = list.findIndex(item => item.id === slideId);
        if (index !== -1 && swiperElement && swiperElement.swiper) {
          swiperElement.swiper.slideToLoop(index);
        }
      } else {
        // If no slide param, ensure Swiper is on the first slide after a small delay
        if (swiperElement && swiperElement.swiper) {
          setTimeout(() => {
            swiperElement.swiper.slideToLoop(0);
          }, 0);
        }
      }
    }
  }

  const list = [
    {
      id: "frezarki",
      title: "Frezarki CNC",
      img: "/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "grawerki",
      title: "Grawerki CNC",
      img: "/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "plotery",
      title: "Plotery CNC",
      img: "/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "tokarki",
      title: "Tokarki CNC",
      img: "/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "serwis",
      title: "Serwis, gwarancyjny i pogwarancyjny",
      img: "/assets/certus-serwis-pogwarancyjny.png",
    },
    {
      id: "pomoc",
      title: "Pomagamy, wdrażamy optymalizujemy procesy produkcji",
      img: "/assets/certus-pomoc-wdrozenia.png",
    },
  ];

  // Funkcja do preloadingu obrazków
  function preloadImages() {
    list.forEach((item) => {
      imageLoadingStates.update(current => ({ ...current, [item.id]: false })); // Ustaw stan ładowania na false
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        imageLoadingStates.update(current => ({ ...current, [item.id]: true })); // Ustaw stan ładowania na true po załadowaniu
      };
      img.onerror = () => {
        console.error(`Błąd ładowania obrazka: ${item.img}`);
        imageLoadingStates.update(current => ({ ...current, [item.id]: true })); // Ustaw na true nawet w przypadku błędu, aby nie blokować
      };
    });
  }

  const open = (c) => {
    activeCategory = c;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set('category', c);
      history.pushState({ category: c }, '', url.toString());
    }
  };
  const close = () => {
    activeCategory = null;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete('category');
      history.pushState({ category: null }, '', url.toString());
    }
  };

  const openFW = (x) => {
    activeMachine = x;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set('machine', x);
      history.pushState({ machine: x }, '', url.toString());
    }
    setTimeout(() => {
      expandedView = true;
    }, 800);
  };
  const closeFW = () => {
    activeMachine = null;
    expandedView = false;
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete('machine');
      history.pushState({ machine: null }, '', url.toString());
    }
  };
  


  const expandRightInfo = () => (expandedView = !expandedView);

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
   if (activeMachine) document.body.classList.add('no-scroll-hero');
    else document.body.classList.remove('no-scroll-hero');
  }

  // --- KONIEC BLOKADY SCROLLA ---

  $: if ($resetHeroSwiper) {
    if (swiperElement && swiperElement.swiper) {
      setTimeout(() => {
        swiperElement.swiper.slideToLoop(0);
      }, 100); // Zwiększone opóźnienie dla pewności
    }
    activeCategory = null;
    activeMachine = null;
    expandedView = false;
    resetHeroSwiper.set(false); // Reset the store value
  }
</script>

<!-- Tło i gradient pozostają statyczne -->
<section class="hero"  >
  <div class="hero-bg gradientHero">
    <div class="hero-overlay" ></div>

    <!-- Kontener dla animacji crossfade -->
    <div class="hero-content" in:fade={{ duration: 650 , delay: 800}}>
       <!-- 1. Slider - pokazuje się gdy nie ma aktywnej kategorii -->
      {#if !activeCategory}
        {#if swiperReady}
          <div
            class="view slider-view"
            in:fade={fadeConfig}
            out:fade={fadeConfig}
          >
            <swiper-container
              loop
              pagination
              space-between="0"
              slides-per-view="2"
              slides-per-group="2"
              mousewheel
              autoplay
              bind:this={swiperElement}
              on:slidechange={handleSlideChange}
            >
              {#each list as cat}
                <swiper-slide>
                  <button
                    type="button"
                    class="items items-left lift"
                    on:click={() => open(cat.id)}
                  >
                    <div class="headlines">
                      <div class="topline">{cat.title}</div>
                    </div>
                    <div class="item">
                      <div class="image">
                        {#if $imageLoadingStates[cat.id]}
                          <img src={cat.img} alt={cat.title} draggable="false" />
                        {:else}
                          <div class="image-loader">
                            <svg width="50" height="50" viewBox="0 0 50 50">
                              <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="#96a500" stroke-dasharray="31.4 31.4" stroke-linecap="round">
                                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
                              </circle>
                            </svg>
                          </div>
                        {/if}
                      </div>
                    </div>
                  
                </swiper-slide>
              {/each}
            </swiper-container>
          </div>
        {:else}
          <div class="view slider-view" style="min-height: 400px;"></div>
        {/if}
      {/if}

      <!-- 2. Widoki kategorii - każdy z własną animacją -->
      {#if activeCategory === "frezarki"}
        <div
          class="view category-view no-sel"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
        >
          <div class="category-content">
            <div class="container" in:fade={{ duration: 600, delay: 200 }}>
              <div class="back_category"></div>
              <div class="content">
                <h1 in:fade={{ duration: 600, delay: 500 }}>Frezarki CNC</h1>
                <div
                  class="flex_table"
                  in:fade={{ duration: 600, delay: 1200 }}
                >
                  <div>
                    <h3>
                      Specjalistyczne grawerki CNC do drewna i innych
                      materiałów. Doskonałe do detali i dekoracji.
                    </h3>
                    <br />
                    <button type="button" on:click={() => openFW("Frezarkia Certus 1212")}>
                      Certus 1212 
                      <IconDoc
                        />
                      
                    
                      
                    
                    <p>
                      Duże pole robocze (1200x1200x350 mm) <br />
                      dla ambitnych projektów.
                    </p>

                    <br />
                    <h2>
                      Certus 1212 <span class="IconDoc"
                        ><IconDoc
                        /></span
                      >
                    </h2>
                    <p>
                      Duże pole robocze (1200x1200x350 mm) <br />
                      dla ambitnych projektów.
                    </p>

                    <CtaButtonHero on:click={close} text="Wróć" />
                  </div>

                  <div
                    class="category-image"
                    in:fade={{ duration: 600, delay: 0 }}
                  >
                    <img
                      src="/assets/maszyny/certus_7111_temp.png"
                      alt="Frezarki CNC"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else if activeCategory === "grawerki"}
        <div
          class="view category-view"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
        >
          <button class="back" on:click={close}>← Wróć</button>
          <div class="category-content">
            <h1 in:fade={{ duration: 600, delay: 200 }}>Grawerki CNC</h1>
            <div class="category-image" in:fade={{ duration: 600, delay: 400 }}>
              <img
                src="/assets/maszyny/certus_7111_temp.png"
                alt="Grawerki CNC"
              />
            </div>
          </div>
        </div>
      {:else if activeCategory === "plotery"}
        <div
          class="view category-view"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
        >
          <button class="back" on:click={close}>← Wróć</button>
          <div class="category-content">
            <h1 in:fade={{ duration: 600, delay: 200 }}>Plotery CNC</h1>
            <div class="category-image" in:fade={{ duration: 600, delay: 400 }}>
              <img
                src="/assets/maszyny/certus_7111_temp.png"
                alt="Plotery CNC"
              />
            </div>
          </div>
        </div>
      {:else if activeCategory === "tokarki"}
        <div
          class="view category-view"
          in:fly={{ ...flyConfig, y: 50 }}
          out:fly={{ ...flyConfig, y: -50 }}
        >
          <button class="back" on:click={close}>← Wróć</button>
          <div class="category-content">
            <h1 in:fade={{ duration: 600, delay: 200 }}>Tokarki CNC</h1>
            <div class="category-image" in:fade={{ duration: 600, delay: 400 }}>
              <img
                src="/assets/maszyny/certus_7111_temp.png"
                alt="Tokarki CNC"
              />
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  {#if activeMachine}
    <div class="activeMachine no-sel">
      <div
        class="left gradientHero"
        class:short={expandedView}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Certus 1212</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki CNC"
          />

          <!--   <button class="cta-button-hero" on:click={closeFW}>
            <span class="maszyny_span">Zamknij szczegóły</span>
                    </button> -->
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={expandedView}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1>
            Do szybkiego i wydajnego frezowania w materiałach takich jak stal,
            aluminium, drewno, plastik itp.
          </h1>
          <p>
            Przykłady zastosowań: wykonanie form wtryskowych, tłoczników,
            obróbkę modeli odlewniczych, do termo formowania, stempli, matryc
            wykrojników ze stali i aluminium, grawerowania elementów itp.
            <br />
            Panel sterujący nie jest zintegrowany z maszyną, co pozwala na lepsze
            zagospodarowanie stanowiska pracy. Oprogramowanie sterujące jest w języku
            polskim.
            <br />
            Niewątpliwym atutem urządzeń jest kompletna zabudowa maszyny co umożliwia
            ciągłe chłodzenie narzędzi jak i obrabianego materiału. Odstojnik, zbiornik
            na chłodziwo oraz pompa stanowi integralną część urządzenia. Dodatkowo
            technika liniowa – prowadnice i śruby kulowe posiadają trwałe osłony
            stalowe. Maszyny te są wyposażone w standardowo w automatyczną wymianę
            narzędzi z magazynem.
            <br />
            Komfort obsługi i pracy z urządzeniem podnosi wolno stojący panel sterujący.
            Panel ten zawiera przyciski sterujące – Start, Stop, Pauza, Reset, komputer,
            monitor, klawiaturę oraz mysz.
            <br />
            Urządzenie zostało wyposażone w polskojęzyczne oprogramowanie z transferem
            danych przez port LAN oraz Serwonapędy Hybrydowe lub Serwa AC (w zależności
            od opcji) pozwalające maszynie zachować wysoką jakość i dokładność obróbki.
          </p>

          <div class="right_menu">
            <nav>
              <ul>
                <li >
                  <DaneTechniczne text="Dane techniczne" on:click={expandRightInfo} />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>

                <!--          <li><a href="#"><img src="/assets/menu/menu_download.svg" alt="Do pobrania" />Do pobrania</a></li>
                <li><a href="#"><img src="/assets/menu/menu_email.svg" alt="Kontakt" />Kontakt</a></li> -->
              </ul>
            </nav>
          </div>
        </div>

        {#if expandedView}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny frezarki Certus 7111 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny frezarki Certus 7111 - widok 2"
              />

              <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 1200 x 1200 x 350 mm</li>
                <li>Silniki: Serwo AC</li>
                <li>Chłodzenie: Automatyczne</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>






    </div>
  {/if}


  <div class="pattern-overlay no-sel">

    <div class="pattern two"></div>
  </div>
  <div class="first-container-back">
    
    

  </div>
</section>

<style lang="scss">
  
  

  .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      opacity: 0.3;

      
      .pattern.two {
        transform:scale(1.2) skew(-15deg, 0deg);
        background-image: url(/assets/images/pattern-image1-2.png);
        position: absolute;
        width: 100%;
        height: 63px;
        z-index: 11;
        left: 0;
        bottom: -10px;
        pointer-events: auto;
      }
    }


  .right_params_content img:hover {
    cursor: url("data:image/svg+xml;base64,CjxzdmcgaWQ9IkxheWVyXzEiIGRhdGEtbmFtZT0iTGF5ZXIgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQwLjA0IDE0MC4wNCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogbm9uZTsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjOTZhNTAwOwogICAgICAgIHN0cm9rZTogIzk2YTUwMDsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTMgewogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDZweDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBmaWxsOiAjYzVkNDE4OwogICAgICAgIHN0cm9rZTogI2M1ZDQxODsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iMTQwLjA0IiBoZWlnaHQ9IjE0MC4wNCIvPgogIDxnPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjEuMDIsMjAuODZjLTIyLjkyLDAtNDEuNTEsMTguNTgtNDEuNTEsNDEuNTFzMTguNTgsNDEuNTEsNDEuNTEsNDEuNTEsNDEuNTEtMTguNTgsNDEuNTEtNDEuNTEtMTguNTgtNDEuNTEtNDEuNTEtNDEuNTEFaTTYxLjAyLDk4LjU1Yy0xOS45OCwwLTM2LjE4LTE2LjItMzYuMTgtMzYuMThTNDEuMDMsMjYuMTksNjEuMDIsMjYuMTlzMzYuMTgsMTYuMiwzNi4xOCwzNi4xOC0xNi4yLDM2LjE4LTM2LjE4LDM2LjE4WiIvPgogICAgPHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9Ijk4LjM4IDk2LjkxIDk0LjY2IDEwMC42MyAxMTMuMzkgMTE5LjE4IDEyMC41MyAxMTguODUgOTguMzggOTYuOTEiLz4KICA8L2c+Cjwvc3ZnPg==") 32 32, pointer;

/* 👇 PNG fallback */
cursor: -webkit-image-set(url("data:image/png;base64,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") 2x) 12 12, pointer;
}


 .container{
    max-width: 1200px;
  margin: 0 auto;
  padding: 0 0px;
}

  .IconDoc:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
  
  :global(.gradientHero) {
    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);
  }

  .activeMachine {
    display: flex;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    color: white;
    padding: 2rem;
    text-align: center;

    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  }

  .activeMachine .left {
    width: 60%;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: width 0.3s ease-in-out;
  }

  .activeMachine .left.short {
    width: 40%;
  }

  .activeMachine .right {
    background-color: white;
    margin: 0px 0px 0px 0px;
    padding: 0px 20px 0px 20px;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    transition: width 0.3s ease-in-out;
  }

  .activeMachine .right.expanded {
    width: 60%;
  }

  /* tExt right side of the active machine */
  .activeMachine .right_params_content {
    color: #595959;
    padding-top: 4rem;
    text-align: left;
    padding-left: 2rem;
    ul {
      list-style-type: none;
      padding-left: 0;
      margin-top: 2rem;
    }
    img {
      max-width: 25rem;
    }
    h2 {
      margin-top: 4rem;
      padding-left: 2rem;
      font-size: x-large;
    }
    p {
      padding-left: 2rem;
    }

    li {
      padding-left: 2rem;
    }
  }
  .activeMachine .right_content {
    color: #595959;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 35vw;
    h1 {
      text-align: left;
    margin-top: 4rem;
    border-left: solid 0.4em #96a500;
    margin-left: -21.6px;
    padding-left: 1.5em;
    color: var(--color-text-primary);
    font-size: x-large;
    }

    p {
      padding-top: 2em;
      text-align: left;
      padding-left: 1.5em;
      width: 35vw;
    }

    .right_menu {
      width: 100%;
      margin-top: 4em;

      nav {
        width: 100%;

        ul {
          list-style-type: none;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-around;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          margin-top: 2rem;
          padding-top: 3rem;
          padding-bottom: 3rem;

          li {
            display: flex;
          }
          li img {
            width: 1.7em;
            margin-right: 20px;
          }
          
        }
      }
    }
  }

  .activeMachine .left_image {
    width: 100%;
    display: flex;
    align-content: center;
    height: 100%;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .activeMachine .left_image img {
    max-width: 35vw;
    min-width: 25vw;
  }

  .activeMachine .back_image {
    position: absolute;
  }

  .activeMachine .left h1 {
    font-size: 3em;
    color: white;
    width: 100%;
    text-align: left;
    padding-left: 2em;
    padding-top: 2em;
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
      background: linear-gradient(180deg, rgb(208 201 201 / 81%) 0%, rgb(136 126 126 / 85%) 100%);
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
    height: 81vh;
    position: relative;
    
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
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fadeInSlider 0.6s ease-out 0.2s forwards;
  }
  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
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
    padding: 8rem;
    width: auto;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
  .items:hover {
    transform: scale(1.05) translateY(-5px);
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
    margin-bottom: 0.25em;
    margin-left: 0.2em;
    padding-bottom: 2rem;
    transition: all 0.3s ease;
  }
  .items:hover .headlines .topline {
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  .item .image {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .items:hover .item .image {
    transform: scale(1.02);
  }
  .item .image img {
    display: block;
    width: 100%;
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
    background-color: #f0f0f0;
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
    .activeMachine .right{
      overflow-x: auto;
      .right_params{overflow: hidden;}
    }
  }
  /* --- KONIEC BLOKADY SCROLLA --- */

  /* --- SCROLL TYLKO W OBRĘBIE PARAMS --- */
  .right_params {
    max-height: 100vh;
    overflow-y: auto;
  }
  /* --- KONIEC SCROLLA PARAMS --- */
</style>

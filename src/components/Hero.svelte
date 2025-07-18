<script>
  import { register } from "swiper/element/bundle";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import IconDoc from "./IconDoc.svelte";
  import DaneTechniczne from "../assets/menu/dane_techniczne.svelte";
  import MenuEmail from "../assets/menu/menu_email.svelte";
  import MenuDownload from "../assets/menu/menu_download.svelte";

  register();

  let activeCategory = null;
  let activeMachine = null;
  let expandedView = false;
  const list = [
    {
      id: "frezarki",
      title: "Frezarki CNC",
      img: "/src/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "grawerki",
      title: "Grawerki CNC",
      img: "/src/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "plotery",
      title: "Plotery CNC",
      img: "/src/assets/maszyny/certus_7111_temp.png",
    },
    {
      id: "tokarki",
      title: "Tokarki CNC",
      img: "/src/assets/maszyny/certus_7111_temp.png",
    },
  ];

  const open = (c) => (activeCategory = c);
  const close = () => (activeCategory = null);

  const openFW = (x) => (activeMachine = x);
  const closeFW = () => (activeMachine = null);

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
</script>

<!-- Tło i gradient pozostają statyczne -->
<section class="hero">
  <div class="hero-bg gradientHero">
    <div class="hero-overlay"></div>

    <!-- Kontener dla animacji crossfade -->
    <div class="hero-content">
      <!-- 1. Slider - pokazuje się gdy nie ma aktywnej kategorii -->
      {#if !activeCategory}
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
            mousewheel
            autoplay
          >
            {#each list as cat}
              <swiper-slide>
                <div
                  class="items items-left lift"
                  on:click={() => open(cat.id)}
                >
                  <div class="headlines">
                    <div class="topline">{cat.title}</div>
                  </div>
                  <div class="item">
                    <div class="image">
                      <img src={cat.img} alt="CERTUS 7111" draggable="false" />
                    </div>
                  </div>
                </div>
              </swiper-slide>
            {/each}
          </swiper-container>
        </div>
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
                    <h2>
                      Certus 1212 <span class="IconDoc"
                        ><IconDoc
                          on:click={() => openFW("Frezarkia Certus 1212")}
                        /></span
                      >
                    </h2>
                    <p>
                      Duże pole robocze (1200x1200x350 mm) <br />
                      dla ambitnych projektów.
                    </p>

                    <br />
                    <h2>
                      Certus 1212 <span class="IconDoc"
                        ><IconDoc
                          on:click={() => openFW("Certus 1212 (drugi)")}
                        /></span
                      >
                    </h2>
                    <p>
                      Duże pole robocze (1200x1200x350 mm) <br />
                      dla ambitnych projektów.
                    </p>

                    <button class="cta-button-hero" on:click={close}>
                      <span class="maszyny_span">Zobacz więcej</span>
                    </button>
                  </div>

                  <div
                    class="category-image"
                    in:fade={{ duration: 600, delay: 0 }}
                  >
                    <img
                      src="/src/assets/maszyny/certus_7111_temp.png"
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
                src="/src/assets/maszyny/certus_7111_temp.png"
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
                src="/src/assets/maszyny/certus_7111_temp.png"
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
                src="/src/assets/maszyny/certus_7111_temp.png"
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
            src="/src/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/src/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki CNC"
          />

          <button class="cta-button-hero" on:click={closeFW}>
            <span class="maszyny_span">Zamknij szczegóły</span>
          </button>
        </div>
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


              <li on:click={expandRightInfo}> <DaneTechniczne text="Dane techniczne"  /> </li>
              <li><MenuDownload text="Do pobrania" href="/pobierz" /></li> 
              <li><MenuEmail text="Kontakt" href="/kontakt" /> </li>
               

              
       <!--          <li><a href="#"><img src="/src/assets/menu/menu_download.svg" alt="Do pobrania" />Do pobrania</a></li>
                <li><a href="#"><img src="/src/assets/menu/menu_email.svg" alt="Kontakt" />Kontakt</a></li> -->
              </ul>
            </nav>
            </div>
        </div>


      </div>
    </div>
  {/if}
</section>

<style lang="scss">
  .category-content .container {
    position: relative;
    background-image: url(/src/assets/Background_Hero_swipe.jpg);
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
        rgba(208.74, 220.7, 224.12, 0.81) 0%,
        rgba(173, 180, 182, 0.85) 100%
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
    height: 75vh;
    position: relative;
  }
  .hero-bg {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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
</style>

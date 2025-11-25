<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { typoFixAction } from "$lib/utils/typography";
  import Section_Image02 from "$lib/../components/sections/Section_Image02.svelte";
  import Section_Kontakt from "$lib/../components/sections/Section_Kontakt.svelte";
  import CtaButton from "./CtaButton.svelte";
  import { goto } from "$app/navigation";
  const images = [
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-1.jpg",
      alt: "Frezarko-grawerka CNC Certus 69 - widok z przodu",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-2.jpg",
      alt: "Panel sterowania frezarki CNC Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-3.jpg",
      alt: "Szczegóły techniczne i konstrukcja maszyny Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-4.jpg",
      alt: "Frezarka Certus 69 w trakcie pracy",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-5.jpg",
      alt: "Model 3D frezarko-grawerki CNC Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-6.jpg",
      alt: "Elementy konstrukcyjne polskiej frezarki CNC Certus",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-7.jpg",
      alt: "Głowica robocza frezarki Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-8.jpg",
      alt: "System prowadnic w maszynie CNC Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-9.jpg",
      alt: "Gotowy produkt wykonany na frezarce Certus 69",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-model-10.jpg",
      alt: "Frezarko-grawerka Certus 69 - perspektywa boczna",
    },
  ];

  let lightboxImage: string | null = null;
  let currentImageIndex: number = 0;
  let lightboxOverlay: HTMLDivElement;

  // New variables for header image cycling
  let currentHeaderImageIndex = 0;
  let displayedHeaderImageSrc = images[currentHeaderImageIndex].src;
  let imageIntervalId: number; // Renamed for clarity
  let zoomIntervalId: number; // New interval for zoom

  // Tweened store for scale
  const scale = tweened(1.0, { duration: 30000, easing: cubicOut }); // Longer duration for one zoom cycle

  const dev = false;

  onMount(() => {
    if (!dev) {
      // Start the continuous zoom animation
      function startZoomAnimation() {
        scale.set(1.05, { duration: 8000 }).then(() => {
          // Zoom in over 5 seconds
          scale.set(1.0, { duration: 8000 }).then(() => {
            // Zoom out over 5 seconds
            // Loop the animation
            startZoomAnimation();
          });
        });
      }
      startZoomAnimation(); // Start the animation when component mounts

      // Image changing interval
      imageIntervalId = setInterval(() => {
        currentHeaderImageIndex = (currentHeaderImageIndex + 1) % images.length;
        displayedHeaderImageSrc = images[currentHeaderImageIndex].src;
      }, 5000); // Change image every 5 seconds

      return () => {
        clearInterval(imageIntervalId);
        // No need to clear zoomIntervalId if it's a recursive promise chain
      };
    }
  });

  function openLightbox(src: string, index: number) {
    lightboxImage = src;
    currentImageIndex = index;
    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      lightboxOverlay?.focus();
    }, 0);
  }

  function closeLightbox() {
    lightboxImage = null;
    window.removeEventListener("keydown", handleKeyDown);
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage = images[currentImageIndex].src;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage = images[currentImageIndex].src;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!lightboxImage) return;
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    }
  }

  const slideConfig = {
    delay: 0,
    duration: 400,
    easing: cubicOut,
    axis: "x",
  };
</script>

<div class="maszyny-specjalistyczne-container">
  <header class="page-header">
    {#key displayedHeaderImageSrc}
      <img
        src={displayedHeaderImageSrc}
        alt="Header background"
        class="header-bg-image"
        transition:fade={{ duration: 1000 }}
        style="transform: scale({$scale});"
      />
    {/key}
    <span class="triangle"></span>
  </header>

  <section class="main-title-section">
    <div class="content-wrapper">
      <h1 use:typoFixAction>Maszyny specjalistyczne</h1>
    </div>

    <!-- <div class="content-wrapper">
      <p use:typoFixAction class="subtitle">
        Gdy nie istnieje gotowe rozwiązanie do Twojego zadania, projektujemy i wykonujemy je od podstaw — prosto, rozsądnie i tak, żeby bezproblemowo działało w Twojej produkcji. Stawiamy na praktyczność: minimum komplikacji, maksimum niezawodności.
        [Zapytaj o wycenę →] [Zadzwoń: +48 …]
      </p>
    </div> -->
  </section>

  <section class="images-special">
    <div class="content-wrapper">
      <div class="container">
        <div class="text-block">
          <h2 use:typoFixAction>
            Maszyny specjalistyczne to nasza oferta urządzeń budowanych na
            indywidualne zamówienie. Gdy nie istnieje gotowe rozwiązanie do
            Twojego zadania, projektujemy i wykonujemy je od podstaw — prosto,
            rozsądnie i tak, żeby bezproblemowo działało w Twojej produkcji.
            Stawiamy na praktyczność: minimum komplikacji, maksimum
            niezawodności.
          </h2>

         <div class="call-to-action-buttons">

          <div on:click|stopPropagation={() => {
            goto("/kontakt");
          }}
        >
          <CtaButton classs="ms-button" text="Zapytaj o wycenę" />
        </div>
        <div on:click|stopPropagation={() => {
            window.location.href = "tel:+48606324406";
          }}
        >
          <CtaButton classs="ms-button" text="Zadzwoń: 606 324 406" />
        </div>

        </div>

    
     
     
     

      </div>
   <div class="images-wrapper">
        <img
          class="image_spc"
          src="/assets/maszyny/renders/Certus_4040_Layers/Certus_4040_Layer1.png"
          alt="Maszyna 1"
        />
        <img
          class="image_spc"
          src="/assets/maszyny/renders/Certus_wiertarka_V1_Layers/Certus_wiertarka_V1_Layer1.png"
          alt="Maszyna 2"
        />
      </div>

   
    </div>
  </section>

  <section class="main-content"></section>

  <!-- Co nas wyróżnia Section -->
  <section class="ms-section-benefits section no-sel">
    <div class="content-wrapper">
      <div class="ms-benefits-grid">
        <div class="ms-benefit-item">
          <h2>Co robimy</h2>
          <p class="" use:typoFixAction>
            Projektujemy i budujemy solidne urządzenia pod konkretne
            zastosowanie: cięcie, frezowanie, wiercenie, znakowanie, podawanie,
            testowanie elementów czy małe automaty. Każdą maszynę dopasowujemy
            do miejsca pracy — wymiarami, napędami, sterowaniem i ergonomią —
            tak, by pasowała do Twojej hali i sposobu pracy zespołu. Korzystamy
            wyłącznie ze sprawdzonych podzespołów, łatwo dostępnych i
            serwisowalnych w Polsce i UE.
          </p>
        </div>
        <div class="ms-benefit-item">
          <h2>Dla kogo</h2>
          <p class="" use:typoFixAction>
            Nasze rozwiązania są dla firm, które chcą uprościć proces,
            przyspieszyć powtarzalne czynności i odciążyć ludzi od żmudnych
            operacji. Najczęściej współpracujemy z małymi i średnimi zakładami
            produkcyjnymi, warsztatami, prototypowniami oraz działami utrzymania
            ruchu.
          </p>
        </div>
        <div class="ms-benefit-item">
          <h2>Jak pracujemy</h2>
          <p class="" use:typoFixAction>
            Zaczynamy od krótkiej rozmowy: mówisz, co ma robić maszyna i jakie
            są ograniczenia (przestrzeń, budżet, termin). Na tej podstawie
            przygotowujemy prostą propozycję — rysunek poglądowy, zakres, cenę i
            termin realizacji. Po akceptacji składamy urządzenie, uruchamiamy je
            u Ciebie i pokazujemy, jak z niego korzystać. Bez zbędnych etapów i
            nadmiarowej dokumentacji.
          </p>
        </div>
        <div class="ms-benefit-item">
          <h2>Co przygotować do wyceny</h2>
          <p class="" use:typoFixAction>
            Aby szybko wrócić z konkretną ofertą, przyda się kilka zdjęć lub
            szkic opisujący zadanie, podstawowe wymiary detali i zakres pracy
            (np. długość cięcia, wysokość, skok), oczekiwana wydajność w szt./h
            oraz informacja o materiale (np. aluminium, tworzywo). Resztę
            doprecyzujemy w rozmowie.
          </p>
        </div>
        <div class="ms-benefit-item">
          <h2>Serwis i dokumentacja</h2>
          <p class="" use:typoFixAction>
            Do każdej maszyny dołączamy instrukcję użytkowania i podstawowy
            pakiet dokumentów. W razie potrzeby przygotujemy dodatkowe
            materiały. Zapewniamy wsparcie telefoniczne i dojazd serwisowy — gdy
            coś się wydarzy, nie zostawiamy Cię samego z problemem.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="gallery-section">
    <div class="content-wrapper">
      <div class="gallery-grid">
        {#each images as image, i}
          <button
            class="gallery-item"
            on:click={() => openLightbox(image.src, i)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        {/each}
      </div>
    </div>
  </section>

  <Section_Image02 />
  <Section_Kontakt />
</div>

{#if lightboxImage}
  <div
    bind:this={lightboxOverlay}
    class="lightbox-overlay"
    on:click={closeLightbox}
    on:keydown={handleKeyDown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <button
      class="lightbox-close"
      on:click|stopPropagation={closeLightbox}
      aria-label="Zamknij galerię"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <button
      class="lightbox-nav lightbox-prev"
      on:click|stopPropagation={prevImage}
      aria-label="Poprzednie zdjęcie"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button
      class="lightbox-nav lightbox-next"
      on:click|stopPropagation={nextImage}
      aria-label="Następne zdjęcie"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    <img
      src={lightboxImage}
      alt="Powiększone zdjęcie bestsellera"
      class="lightbox-image"
      on:click|stopPropagation
      transition:fade={{ duration: 200 }}
    />
  </div>
{/if}

<style lang="scss">
  :global(button.ms-button) {
    width: 20% !important;
    float: right !important;
    height: 54px !important;
    
    max-height: 45px !important;
    color: white !important;
    padding: 10px !important;
    background-color: var(--color-primary) !important;
   
    padding: 10px 10px 10px 0px !important;
    margin: 10px 10px 10px 0px !important;


    span.text-container{}
  font-size: 0.8em !important;

  }





  .call-to-action-buttons {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: nowrap;
  
  }
  .ms-item {
    height: auto;
    min-height: 231px;
  }
  .container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    /* Szeroki ekran: tekst i obrazki obok siebie */
  }

  /* Blok tekstowy i przyciski zajmują większą część */
  .text-block {
    flex: 2;
  }

  /* Obrazki w kolumnie obok tekstu na dużych ekranach */
  .images-wrapper {
    
     display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    
    max-width: 61vh;
    min-width: 41vh;
  }

  /* Obrazki */
  .image1,
  .image2 {
    width: 100%;
  }

  /* Na mniejszych ekranach cały kontener w kolumnie */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    /* Obrazki pod tekstem i przyciskami, ułożone w wierszu obok siebie */
    .images-wrapper {
      flex-direction: column; /* Added for stacking on small screens */
      justify-content: flex-start;
      gap: 10px;
      margin-top: 20px;
    }
    .image1,
    .image2 {
      width: 50%; /* dwie połowy ekranu dla obrazków */
    }
  }

  .ms-section-benefits {
    background: white;

    h2 {
      text-align: center;
      margin-bottom: 80px;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
      position: relative;

      &::before {
        /*  content: "";
       position: absolute;
       left: 50%;
       transform: translateX(-50%);
       top: -20px;
       width: 60px;
       height: 4px;
       background: var(--color-primary);
       border-radius: 2px; */
      }
    }

    .ms-benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 4px;
      justify-items: center;
    }

    .ms-benefit-item {
      text-align: center;
      max-width: 90%;
      padding: 32px 24px;

      border-radius: 12px;
      transition: all 0.3s ease;
      background-color: white;
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgb(75 124 23 / 13%);

      &:hover {
        transform: translateY(-8px);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        margin: 0;
        font-weight: 500;
      }
    }

    .call-to-action-section {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem 0;

      h1 {
        font-weight: 700;
        color: var(--color-text-secondary);
        margin-bottom: 16px;
        position: relative;
        display: inline-block;

        &::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -20px;
          width: 60px;
          height: 4px;
          background: var(--color-primary);
          border-radius: 2px;
        }
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }
  @media (max-width: 768px) {
    .ms-section-benefits {
      padding: 60px 0;
    }

    .ms-section-benefits .content-wrapper {
      padding: 0 16px;
    }

    .ms-section-benefits h2 {
      margin-bottom: 60px;
    }

    .ms-benefits-grid {
      gap: 32px;
    }

    .ms-benefit-item {
      padding: 24px 16px;
    }
  }

  .schematy {
    display: flex;
  }
  .schematy img {
    max-width: 45%;
  }

  :global(.image-section-02 .phone-holder div a) {
    color: white;
  }

  .page-header::before {
    content: "";
    background-image: url(/assets/images/pattern-image1-2.png);
    position: absolute;
    width: 100vw;
    height: 37px;
    right: 0px;
    /*  filter: blur(0.3px); */
    bottom: 0px;
  }

  .maszyny-specjalistyczne-container {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-wrapper {
    margin: 0 auto;
    padding: 0 2rem; // Default horizontal padding for content
  }

  .page-header {
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ); // Keep overlay, remove image
    background-size: cover;
    color: white;
    padding: 4rem 2rem;
    text-align: center;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .header-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1; // Place behind other header content
    }

    .triangle {
      position: absolute;
      width: 400px;
      height: 100px;
      bottom: 0px;
      left: 0;
      z-index: 1; // Ensure it's above other content if needed

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 55px;
        background: white;
        clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
      }
    }
  }

  .main-title-section {
    background-color: white; /* Assuming the page background is white */

    text-align: center;
    margin-top: -20px;
    position: relative;
    z-index: 2;
    padding-bottom: 40px;
    padding-top: -20px;

    h1 {
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
      margin-top: 5rem;
    }
    .subtitle {
      color: var(--color-text-secondary);
      max-width: 800px;
      /* margin: 0 auto; */ /* Removed center alignment */
    }
  }

  .main-content {
    display: flex;
    gap: 2rem;
    margin: 3rem auto;
    padding: 0 2rem;
    align-items: flex-start;
  }

  .text-column {
    flex: 2;
  }

  .image-column {
    flex: 1;
    display: flex;
    flex-direction: column; /* Stack images vertically */
    gap: 1.5rem; /* Space between images */
    align-items: flex-start; /* Align images to the top */
    justify-content: flex-start; /* Align images to the top */

    img {
      max-width: 100%;
    }
  }

  .text-column h2 {
    font-weight: 700;
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary-light);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .text-column h3 {
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .text-column p,
  .text-column li {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .text-column li {
    list-style-type: none;
    border-left: solid 4px var(--color-primary-light);
    padding-left: 1rem;
  }
  .text-column ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  .text-column a {
    color: var(--color-primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .ms-section-benefits {
    background: white;

    h2 {
      text-align: center;
      margin-bottom: 80px;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
      position: relative;

      &::before {
        /*  content: "";
           position: absolute;
           left: 50%;
           transform: translateX(-50%);
           top: -20px;
           width: 60px;
           height: 4px;
           background: var(--color-primary);
           border-radius: 2px; */
      }
    }

    .ms-benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      justify-items: center;
    }

    .ms-benefit-item {
      text-align: center;
      max-width: 90%;
      padding: 32px 24px;

      border-radius: 12px;
      transition: all 0.3s ease;
      background-color: white;
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgb(75 124 23 / 13%);

      &:hover {
        transform: translateY(-8px);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        margin: 0;
        font-weight: 500;
      }
    }

    .call-to-action-section {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem 0;

      h1 {
        font-weight: 700;
        color: var(--color-text-secondary);
        margin-bottom: 16px;
        position: relative;
        display: inline-block;

        &::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -20px;
          width: 60px;
          height: 4px;
          background: var(--color-primary);
          border-radius: 2px;
        }
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    .ms-section-benefits {
      padding: 60px 0;
    }

    .ms-section-benefits .content-wrapper {
      padding: 0 16px;
    }

    .ms-section-benefits h2 {
      margin-bottom: 60px;
    }

    .ms-benefits-grid {
      gap: 32px;
    }

    .ms-benefit-item {
      padding: 24px 16px;
    }
  }

  .gallery-section {
    padding: 100px 0;
    margin: 0 auto;
    padding: 1.7rem;
    padding-bottom: 9rem;

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    .gallery-item {
      overflow: hidden; /* Ensure no scroll on hover */
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative; /* For z-index on hover */
      min-height: 250px; /* Added to ensure visibility */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: opacity 0.3s ease; /* Fade in/out */
      }
      &:hover {
        transform: scale(1.03); /* Keep scale */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 10; /* Bring to front on hover */
      }
    }
  }

  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
  }

  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 40px; /* Make clickable area larger */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 1rem;
    cursor: pointer;
    z-index: 1001;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .lightbox-prev {
    left: 20px;
  }

  .lightbox-next {
    right: 20px;
  }

  .lightbox-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    cursor: default;
  }

  @media (max-width: 800px) {
    .page-header .triangle {
      &::after {
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
    .page-header .triangle {
      &::after {
        clip-path: polygon(0 0, 20% 0, 40% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 3rem 1rem;
      h1 {
      }
      p {
      }
    }
    .main-title-section {
      padding: 1.5rem 1rem;
      h1 {
      }
      .subtitle {
      }
    }
    .main-content {
      flex-direction: column;
      padding: 0rem 3rem 0rem 3rem;

      .text-column {
        padding: 0 2rem;
      }
      .image-column {
        padding: 0 2rem;
      }
    }

    .gallery-section {
      padding: 0 2rem;
      margin-bottom: 120px;
    }
    .gallery-grid {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
    }
    .features-section {
      padding: 2rem 1rem;
      h2 {
        font-size: 1.8rem;
      }
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  }

  .images-special .content-wrapper {
    flex-direction: column;
    gap: 0px;
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: stretch;
    img.image_spc {
      max-width: 100%; /* Ensure images are responsive */
      height: auto; /* Maintain aspect ratio */
      display: block; /* Remove extra space below images */
    }
  }

  .images-special .content-wrapper .container {
    flex-direction: column;
    align-items: center;
  }

  .schematy {
    display: flex;
  }
  .schematy img {
    max-width: 45%;
  }

  :global(.image-section-02 .phone-holder div a) {
    color: white;
  }

  .page-header::before {
    content: "";
    background-image: url(/assets/images/pattern-image1-2.png);
    position: absolute;
    width: 100vw;
    height: 37px;
    right: 0px;
    /*  filter: blur(0.3px); */
    bottom: 0px;
  }

  .maszyny-specjalistyczne-container {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-wrapper {
    margin: 0 auto;
    padding: 0 2rem; // Default horizontal padding for content
  }

  .page-header {
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ); // Keep overlay, remove image
    background-size: cover;
    color: white;
    padding: 4rem 2rem;
    text-align: center;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .header-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1; // Place behind other header content
    }

    .triangle {
      position: absolute;
      width: 400px;
      height: 100px;
      bottom: 0px;
      left: 0;
      z-index: 1; // Ensure it's above other content if needed

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 55px;
        background: white;
        clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
      }
    }
  }

  .main-title-section {
    background-color: white; /* Assuming the page background is white */

    text-align: center; /* Changed to left */
    margin-top: -20px; /* Overlap with the triangle */
    position: relative;
    z-index: 2;

    h1 {
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
      margin-top: 5rem;
    }

    .subtitle {
      text-align: center !important;
      color: var(--color-text-secondary);
      max-width: 800px;
      /* margin: 0 auto; */ /* Removed center alignment */
    }
  }

  .main-content {
    display: flex;
    gap: 2rem;
    margin: 3rem auto;
    padding: 0 2rem;
    align-items: flex-start;
  }

  .text-column {
    flex: 2;
  }

  .image-column {
    flex: 1;
    display: flex;
    flex-direction: column; /* Stack images vertically */
    gap: 1.5rem; /* Space between images */
    align-items: flex-start; /* Align images to the top */
    justify-content: flex-start; /* Align images to the top */

    img {
      max-width: 100%;
    }
  }

  .text-column h2 {
    font-weight: 700;
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary-light);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .text-column h3 {
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .text-column p,
  .text-column li {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .text-column li {
    list-style-type: none;
    border-left: solid 4px var(--color-primary-light);
    padding-left: 1rem;
  }
  .text-column ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  .text-column a {
    color: var(--color-primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .ms-section-benefits {
    background: white;

    h2 {
      text-align: center;
      margin-bottom: 80px;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -20px;
        width: 60px;
        height: 4px;
        background: var(--color-primary);
        border-radius: 2px;
      }
    }

    .ms-benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 4px;
      justify-items: center;
    }

    .ms-benefit-item {
      text-align: center;
      max-width: 90%;
      padding: 32px 24px;
      margin-top: 8px;

      border-radius: 12px;
      transition: all 0.3s ease;
      background-color: white;
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgb(75 124 23 / 13%);

      &:hover {
        transform: translateY(-8px);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        margin: 0;
        font-weight: 500;
        font-size: 0.9em;
        text-align: left;
      }
    }

    .call-to-action-section {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem 0;

      h1 {
        font-weight: 700;
        color: var(--color-text-secondary);
        margin-bottom: 16px;
        position: relative;
        display: inline-block;

        &::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -20px;
          width: 60px;
          height: 4px;
          background: var(--color-primary);
          border-radius: 2px;
        }
      }

      p {
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    .ms-section-benefits {
      padding: 60px 0;
    }

    .ms-section-benefits .content-wrapper {
      padding: 0 16px;
    }

    .ms-section-benefits h2 {
      margin-bottom: 60px;
    }

    .ms-benefits-grid {
      gap: 32px;
    }

    .ms-benefit-item {
      padding: 24px 16px;
    }
  }

  .gallery-section {
    padding: 100px 0;
    margin: 0 auto;
    padding: 1.7rem;
    padding-bottom: 9rem;

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    .gallery-item {
      overflow: hidden; /* Ensure no scroll on hover */
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative; /* For z-index on hover */
      min-height: 250px; /* Added to ensure visibility */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: opacity 0.3s ease; /* Fade in/out */
      }
      &:hover {
        transform: scale(1.03); /* Keep scale */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 10; /* Bring to front on hover */
      }
    }
  }

  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
  }

  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 40px; /* Make clickable area larger */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 1rem;
    cursor: pointer;
    z-index: 1001;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .lightbox-prev {
    left: 20px;
  }

  .lightbox-next {
    right: 20px;
  }

  .lightbox-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    cursor: default;
  }

  @media (max-width: 800px) {
    .page-header .triangle {
      &::after {
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
    .page-header .triangle {
      &::after {
        clip-path: polygon(0 0, 20% 0, 40% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 3rem 1rem;
      h1 {
      }
      p {
      }
    }
    .main-title-section {
      padding: 1.5rem 1rem;
      h1 {
      }
      .subtitle {
      }
    }
    .main-content {
      flex-direction: column;
      padding: 0rem 3rem 0rem 3rem;

      .text-column {
        padding: 0 2rem;
      }
      .image-column {
        padding: 0 2rem;
      }
    }

    .gallery-section {
      padding: 0 2rem;
      margin-bottom: 120px;
    }
    .gallery-grid {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
    }
    .features-section {
      padding: 2rem 1rem;
      h2 {
        font-size: 1.8rem;
      }
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  }
</style>

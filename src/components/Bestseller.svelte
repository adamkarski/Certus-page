<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { typoFixAction } from "$lib/utils/typography";
  import Section_Image02 from "$lib/../components/sections/Section_Image02.svelte";
  import Section_Kontakt from "$lib/../components/sections/Section_Kontakt.svelte";

  const images = [
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-1.png",
      alt: "Frezarko-grawerka CNC Certus 69 - widok z przodu",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-2.png",
      alt: "Panel sterowania frezarki CNC Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-3.png",
      alt: "Szczegóły techniczne i konstrukcja maszyny Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-4.png",
      alt: "Frezarka Certus 69 w trakcie pracy",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-5.png",
      alt: "Model 3D frezarko-grawerki CNC Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-6.png",
      alt: "Elementy konstrukcyjne polskiej frezarki CNC Certus",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-7.png",
      alt: "Głowica robocza frezarki Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-8.png",
      alt: "System prowadnic w maszynie CNC Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-9.png",
      alt: "Gotowy produkt wykonany na frezarce Certus 69",
    },
    {
      src: "/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-model-10.png",
      alt: "Frezarko-grawerka Certus 69 - perspektywa boczna",
    },
  ];

  let lightboxImage: string | null = null;
  let currentImageIndex: number = 0;

  // New variables for header image cycling
  let currentHeaderImageIndex = 0;
  let displayedHeaderImageSrc = images[currentHeaderImageIndex].src;
  let imageIntervalId: number; // Renamed for clarity
  let zoomIntervalId: number; // New interval for zoom

  // Tweened store for scale
  const scale = tweened(1.0, { duration: 10000, easing: cubicOut }); // Longer duration for one zoom cycle

  const dev = false;

  onMount(() => {
    if (!dev) {
      // Start the continuous zoom animation
      function startZoomAnimation() {
        scale.set(1.05, { duration: 5000 }).then(() => {
          // Zoom in over 5 seconds
          scale.set(1.0, { duration: 5000 }).then(() => {
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
  }

  function closeLightbox() {
    lightboxImage = null;
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage = images[currentImageIndex].src;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage = images[currentImageIndex].src;
  }

  const slideConfig = {
    delay: 0,
    duration: 400,
    easing: cubicOut,
    axis: "x",
  };
</script>

<div class="bestseller-container">
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
      <h1 use:typoFixAction>Frezarko-grawerka CNC – CERTUS 69</h1>
      <p use:typoFixAction class="subtitle">
        Kompaktowa, w pełni funkcjonalna frezarka i grawerka CNC o szerokim
        zastosowaniu.
      </p>
    </div>
  </section>

  <section class="main-content">
    <div class="text-column">
      <h2>Opis urządzenia</h2>
      <p use:typoFixAction>
        CERTUS 69 to kompaktowa w pełni funkcjonalna frezarka, grawerka cnc o
        szerokim zastosowaniu. Przeznaczona do pracy w materiałach taki jak:
        aluminium, metale kolorowe, drewno, plexi, obróbka drobnych elementów
        stalowych itp. Ogólny opis urządzeń CERTUS model: 69 Standard / 69
        Serwo.
      </p>
      <p use:typoFixAction>
        Urządzenie posiada otwartą przestrzeń roboczą, o polu pracy: w osi (X)
        600mm x (Y) 900mm x (Z) 200 mm.
      </p>

      <h3>Obecnie produkowane modele:</h3>
      <ul>
        <li>
          <strong>Model: CERTUS 69 Standard</strong> - Pole pracy 600x900x200 mm.
          Waga maszyny 350 kg.
        </li>
        <li>
          <strong>Model: CERTUS 69 Serwo</strong> - Pole pracy 600x900x200 mm. Waga
          maszyny 450 kg.
        </li>
      </ul>

      <p>
        Zapraszamy do składania zapytań: <a href="mailto:biuro@mg-certus.pl"
          >biuro@mg-certus.pl</a
        >
      </p>
    </div>
    <div class="image-column">
      <img
        src="/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-glowne1.jpg"
        alt="Główne zdjęcie frezarko-grawerki CNC Certus 69"
        class="main-machine-image"
      />
    </div>
  </section>

  <section class="benefits-section">
    <div class="content-wrapper">
      <h2>Kluczowe cechy maszyny</h2>
      <div class="benefits-grid">
        {#each ["Małe gabaryty zewnętrzne maszyny przy maksymalnie dużym polu pracy.", "Kompaktowa budowa, profesjonalny wygląd oraz bezpieczeństwo podczas pracy.", "Duża sztywność maszyny.", "Ochrona elementów techniki liniowej.", "Możliwość łatwej rozbudowy oraz łatwy montaż przewidzianych dodatków w tym rozbudowa o 4 oś obrotu bez utraty pola pracy!", "Funkcjonalny panel wolno stający z komputerem i monitorem.", "Oprogramowanie sterujące PIKOCNC PL", "Wybór sprawdzonych podzespołów do budowy obrabiarki, który zapewnia bardzo dużą jakość produktu."] as feature, i}
          <div class="benefit-item">
            <p>{feature}</p>
          </div>
        {/each}
      </div>
      <div class="call-to-action-section">
        <h1>Oceń Potencjał !</h1>
        <p use:typoFixAction>
          To urządzenie wyróżnia się na rynku dzięki swoim unikalnym atutom. Aby
          w pełni ocenić jego potencjał, zapraszamy do przetestowania
          przykładowych maszyn w naszym centrum demonstracyjnym.
        </p>
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
    class="lightbox-overlay"
    on:click={closeLightbox}
    role="dialog"
    aria-modal="true"
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
    filter: blur(0.3px);
    bottom: 0px;
  }

  .bestseller-container {
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
    padding: 4rem 0 2rem; /* Increased top padding */
    text-align: left; /* Changed to left */
    margin-top: -55px; /* Overlap with the triangle */
    position: relative;
    z-index: 2;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
      margin-top: 5rem;
    }
    .subtitle {
      font-size: 1.3rem;
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
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary-light);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .text-column h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .text-column p,
  .text-column li {
    font-size: 1.2rem;
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

  .benefits-section {
    padding: 100px 0;
    background: white;

    h2 {
      text-align: center;
      margin-bottom: 80px;
      font-size: 2rem;
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

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      justify-items: center;
    }

    .benefit-item {
      text-align: center;
      max-width: 280px;
      padding: 32px 24px;
      border-top: 3px solid var(--color-primary);
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
        font-size: 1.1rem;
        font-weight: 500;
      }
    }

    .call-to-action-section {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem 0;

      h1 {
        font-size: 2rem;
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
        font-size: 1.2rem;
        color: var(--color-text-secondary);
        opacity: 0.8;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    .benefits-section {
      padding: 60px 0;
    }

    .benefits-section .content-wrapper {
      padding: 0 16px;
    }

    .benefits-section h2 {
      margin-bottom: 60px;
      font-size: 2rem;
    }

    .benefits-grid {
      gap: 32px;
    }

    .benefit-item {
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
    font-size: 3rem;
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
    font-size: 2rem;
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
        font-size: 2.5rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
    .main-title-section {
      padding: 1.5rem 1rem;
      h1 {
        font-size: 2.2rem;
      }
      .subtitle {
        font-size: 1rem;
      }
    }
    .main-content {
      flex-direction: column;
      padding: 1.5rem 1rem;
    
      .text-column{
        padding: 0 2rem;
      }
      .image-column{
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

<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte"; 
  import { tweened } from "svelte/motion"; 
  import { cubicOut } from "svelte/easing"; 



  const images = [
    {
      src: "/assets/images/onas/certus-frezarki-maszyny-cnc.jpg",
      alt: "Certus frezarki maszyny CNC",
    },
    {
      src: "/assets/images/onas/certus-maszyny-aluminium.jpg",
      alt: "Certus maszyny aluminium",
    },
    {
      src: "/assets/images/onas/certus-maszyny-stół.jpg",
      alt: "Certus maszyny stół",
    },
    {
      src: "/assets/images/onas/certus-maszyny-wielkogabarytowe-cnc.jpg",
      alt: "Certus maszyny wielkogabarytowe CNC",
    },
    { src: "/assets/images/onas/certus-maszyny.png", alt: "Certus maszyny" },
    {
      src: "/assets/images/onas/element-obrabiany-maszynami-certus-2.png",
      alt: "Element obrabiany maszynami Certus 2",
    },
    {
      src: "/assets/images/onas/element-obrabiany-maszynami-certus.png",
      alt: "Element obrabiany maszynami Certus",
    },
    {
      src: "/assets/images/onas/przemysł-jubilerski-cerus-cnc-maszyny.png",
      alt: "Przemysł jubilerski Certus CNC maszyny",
    },
  ];

  let currentHeaderImageIndex = 0;
  let displayedHeaderImageSrc = images[currentHeaderImageIndex].src;
  let imageIntervalId: number;
  const scale = tweened(1.0, { duration: 30000, easing: cubicOut });

  let showHeroTitle = false; // New variable

  onMount(() => {
    // Trigger the hero title to show after a short delay
    setTimeout(() => {
      showHeroTitle = true;
    }, 100); // Show after 100ms

    function startZoomAnimation() {
      scale.set(1.05, { duration: 15000 }).then(() => {
        scale.set(1.0, { duration: 15000 }).then(() => {
          startZoomAnimation();
        });
      });
    }
    startZoomAnimation();

    // Image changing interval
    imageIntervalId = window.setInterval(() => {
      // Use window.setInterval for clarity
      currentHeaderImageIndex = (currentHeaderImageIndex + 1) % images.length;
      displayedHeaderImageSrc = images[currentHeaderImageIndex].src;
    }, 8000); // Change image every 5 seconds

    return () => {
      window.clearInterval(imageIntervalId); // Use window.clearInterval
    }; 
  });
</script>

<section id="onas-images" class="onas">
  <span class="triangle"></span>
  <div class="pattern-overlay">
    <div class="onas-pattern-1"></div>
    <div class="onas-pattern-2"></div>
    <div class="onas-pattern-3"></div>
  </div>
  <div class="onas-container">
    {#key displayedHeaderImageSrc}
      <div
        class="image-and-patterns-wrapper"
        transition:fade={{ duration: 3000 }}
      >
        <img
          src={displayedHeaderImageSrc}
          alt="Obrazy prezentujące firmę Certus"
          class="header-bg-image"
          style="transform: scale({$scale});"
        />

        
      </div>
    {/key}
   
    <div class="onas-header">
      <!-- Removed bind:this={headerEl} and class:visible -->

      <div class="hero-text no-sel">
        {#if showHeroTitle}
          <h1 class="hero-title no-sel" in:fade={{ duration: 1600, delay: 100 }}>
           <span in:fade={{ duration: 1600, delay: 800 }}>Your Vision,</span> 
           <span in:fade={{ duration: 1600, delay: 1600 }}>Our Precision</span>
          </h1>
        {/if}
      </div>
    </div>
  </div>
</section>

<style lang="scss">



  .triangle {
    position: absolute;
    width: 400px;
    height: 100px;
    top: 399px;
    left: 0;
    z-index: 12;

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

  .image-and-patterns-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* Ensure content doesn't spill out */
  }
  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
   
    height: 495px;
    z-index: 54;
    pointer-events: none;
    opacity: 0.6;
  }
  .onas-pattern-1 {
  /*   background-image: url(/assets/images/pattern-video-1.png);
    position: absolute;
    width: 184px;
    height: 263px;
    z-index: 10;
    right: 0px;
    top: -40px;
    pointer-events: auto; */
  }
  .onas-pattern-2 {
    background-image: url(/assets/images/pattern-video-2.png);
    position: absolute;
    width: 102px;
    height: 194px;
    z-index: 10;
    left: 0px;
    bottom: 311px;
    transform: scale(1.2);
    pointer-events: auto;
    background-position-x: -115px;
  }
  .onas-pattern-3 {
    background-image: url(/assets/images/pattern-video-3.png);
    position: absolute;
    width: 100%;
    height: 64px;
    z-index: 10;
    left: 0px;
    bottom: -20px;
    transform: scale(1.1) scaleX(2.3);
    pointer-events: auto;
    background-position-x: -128px;
  }
  .onas-header {
    background: transparent;
    position: absolute;
    z-index: 2;
    width: 100vw;
    text-align: center;
    top: 200px;
  }
  .onas-header h1 {
    margin: 0;
    font-size: 4rem;
    color: white;
    text-shadow:0 13px 27px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    /* Removed word-by-word animation styles */
    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 46px;
      margin-left: -40px;
      background-image: url(assets/images/red-arrow.svg);
      margin-top: 26px;
    }
  }
  .onas-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    min-height: 500px; /* Added to ensure visibility */
    background: linear-gradient(
      180deg,
      rgba(247, 247, 247, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    img {
      filter: brightness();
    }
  }
  /* Removed .masked-onas styles */
  .header-bg-image {
    /* Added styles from Bestseller.svelte */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2; /* Placed above pattern-overlay for fade visibility */
  }
  @media (max-width: 768px) {
    .onas-header h1 {
      font-size: 1.5rem;
    }
  }
</style>

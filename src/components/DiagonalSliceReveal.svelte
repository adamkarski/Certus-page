<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { landingVisible } from '$lib/landingStore';

  // Props
  export let src = '';
  export let alt = 'Background image';
  export let duration = 3000; // Czas pokazywania każdego slajdu (3 sekundy)
  export let transitionDuration = 800; // Czas animacji przejścia

  let container;
  let imageLoaded = false;
  let showAnimation = false;
  let isVisible = false;
  let currentSlideIndex = 0;
  let intervalId;

  // Dane slajdów z ikonami SVG
  const slides = [
    {
      title: "Analiza Potrzeb",
      description: "Dokładnie poznajemy Twoje wymagania produkcyjne",
      icon: "/assets/ikony/onas-analiza-potrzeb.svg"
    },
    {
      title: "Dobór Rozwiązania", 
      description: "Proponujemy optymalną maszynę CNC dla Twojej branży",
      icon: "/assets/ikony/onas-dobor-rozwiazan.svg"
    },
    {
      title: "Wdrożenie",
      description: "Kompleksowa instalacja i szkolenie operatorów", 
      icon: "/assets/ikony/onas-wdrozenie.svg"
    },
    {
      title: "Wsparcie",
      description: "Serwis gwarancyjny i pogwarancyjny przez całą eksploatację",
      icon: "/assets/ikony/onas-wsparcie.svg"
    }
  ];

  onMount(() => {
    if (container) {
      // IntersectionObserver dla wykrywania widoczności
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          console.log('Slides visibility changed from', wasVisible, 'to', isVisible);
          
          // Jeśli element stał się widoczny i landing page zniknął, uruchom animację
          if (isVisible && !$landingVisible && !showAnimation) {
            console.log('Starting slides animation from intersection observer...');
            startAnimation();
          }
        },
        {
          threshold: 0.1, // Uruchom gdy 10% elementu jest widoczne
          rootMargin: '50px' // Dodatkowy margines dla wcześniejszego wykrycia
        }
      );
      intersectionObserver.observe(container);
      
      // Sprawdź początkową widoczność
      setTimeout(() => {
        const rect = container.getBoundingClientRect();
        const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
        console.log('Initial slides visibility check:', isInitiallyVisible);
        if (isInitiallyVisible && !isVisible) {
          isVisible = true;
          if (!$landingVisible && !showAnimation) {
            console.log('Starting slides animation from initial visibility check...');
            startAnimation();
          }
        }
      }, 100);
      
      // Fallback - uruchom animację po 1 sekundzie jeśli inne warunki nie zadziałały
      setTimeout(() => {
        if (!showAnimation) {
          if (imageLoaded && isValidSrc) {
            console.log('🚀 Fallback: Starting carousel animation after timeout');
            showAnimation = true;
            startCarousel();
          } else if (!isValidSrc) {
            console.log('🚀 Fallback: Starting carousel without image (no valid src)');
            showAnimation = true;
            startCarousel();
          }
        }
      }, 1000);
      
      // Dodatkowy fallback dla obrazków które się nie ładują
      setTimeout(() => {
        if (!showAnimation && isValidSrc && !imageLoaded) {
          console.log('🚀 Fallback: Image failed to load, starting carousel anyway');
          imageLoaded = true; // Wymuszamy żeby template się renderował
          showAnimation = true;
          startCarousel();
        }
      }, 2000);
      
      return () => {
        intersectionObserver.disconnect();
      };
    }
  });

  function handleImageLoad() {
    console.log('✅ Background image loaded:', src);
    console.log('✅ Image load conditions:', { isVisible, landingVisible: $landingVisible, showAnimation });
    imageLoaded = true;
    
    // Sprawdź wszystkie warunki przed uruchomieniem animacji
    if (isVisible && !$landingVisible && !showAnimation) {
      console.log('✅ Starting carousel animation from handleImageLoad...');
      startAnimation();
    }
  }
  


  function handleImageError() {
    console.error('❌ Failed to load background image:', src);
    console.error('❌ Will try to start carousel anyway in fallback...');
  }

  function startAnimation() {
    // Krótkie opóźnienie dla płynności
    setTimeout(() => {
      showAnimation = true;
      startCarousel();
    }, 100);
  }

  function startCarousel() {
    // Wyczyść poprzedni interval
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    // Uruchom carousel - zmiana co duration + transitionDuration
    intervalId = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    }, duration + transitionDuration);
  }

  function stopCarousel() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    // Zrestartuj carousel od nowego slajdu
    startCarousel();
  }

  function slideInTransition(node, { delay = 0 }) {
    return {
      delay,
      duration: transitionDuration,
      easing: cubicOut,
      css: (t) => {
        const progress = t;
        const opacity = progress;
        const scale = 0.9 + (progress * 0.1);
        // Slajd wjeżdża z prawej strony
        const translateX = (1 - progress) * 300; // Zaczyna 300px z prawej
        
        return `
          transform: 
            translateX(${translateX}px) 
            scale(${scale});
          opacity: ${opacity};
        `;
      }
    };
  }

  function slideOutTransition(node, { delay = 0 }) {
    return {
      delay,
      duration: transitionDuration,
      easing: cubicOut,
      css: (t) => {
        const progress = 1 - t; // Odwracamy progress dla wyjścia
        const opacity = 1 - progress;
        const scale = 1 - (progress * 0.1);
        // Slajd wyjeżdża w lewą stronę
        const translateX = progress * -300; // Kończy -300px w lewo
        
        return `
          transform: 
            translateX(${translateX}px) 
            scale(${scale});
          opacity: ${opacity};
        `;
      }
    };
  }

  onDestroy(() => {
    stopCarousel();
  });

  // Funkcja do zresetowania animacji
  export function replay() {
    stopCarousel();
    showAnimation = false;
    currentSlideIndex = 0;
    setTimeout(() => {
      if (isVisible && imageLoaded) {
        showAnimation = true;
        startCarousel();
      }
    }, 50);
  }
  
  // Reaktywność na zmiany landingVisible - uproszczona wersja
  $: if (!$landingVisible && imageLoaded && !showAnimation) {
    console.log('Landing page hidden, starting carousel animation...');
    startAnimation();
  }
  
  // Dodatkowa reaktywność - uruchom gdy obrazek się załaduje
  $: if (imageLoaded && !$landingVisible && !showAnimation) {
    console.log('Image loaded and landing hidden, starting carousel...');
    startAnimation();
  }

  // Sprawdzenie czy src jest poprawny
  $: isValidSrc = src && src.trim() !== '';
  
  // Debug - sprawdź wszystkie warunki
  $: console.log('🔍 Carousel Debug:', {
    landingVisible: $landingVisible,
    isVisible,
    imageLoaded,
    showAnimation,
    isValidSrc,
    src
  });
  
  // Log na początku żeby sprawdzić czy komponent się w ogóle ładuje
  console.log('🎠 DiagonalSliceReveal component initialized with src:', src);

  // Bardzo agresywny fallback - uruchom po 3 sekundach bez względu na wszystko
  let forceStartTimeout;
  $: if (isValidSrc && !showAnimation) {
    if (forceStartTimeout) clearTimeout(forceStartTimeout);
    forceStartTimeout = setTimeout(() => {
      console.log('🚨 FORCE START: Starting carousel after 3 seconds regardless of conditions');
      imageLoaded = true;
      showAnimation = true;
      startCarousel();
    }, 3000);
  }
</script>

<div class="carousel-container" bind:this={container}>
  <!-- Obrazek tła -->
  {#if !isValidSrc}
    <div class="error-message">
      <p>Brak poprawnego źródła obrazka</p>
    </div>
  {:else if !imageLoaded}
    <img 
      {src} 
      {alt} 
      on:load={handleImageLoad} 
      on:error={handleImageError} 
      style="opacity: 0; position: absolute;" 
    />
    <div class="loading-spinner"></div>
  {:else}
    <img 
      {src} 
      {alt} 
      class="background-image"
    />
  {/if}

  <!-- Overlay z aktualnym slajdem -->
  {#if showAnimation && (imageLoaded || !isValidSrc)}
    {#key currentSlideIndex}
      <div class="slide-overlay" 
           in:slideInTransition 
           out:slideOutTransition>
        <div class="slide-content " >
          <div class="slide-icon">
            <img src={slides[currentSlideIndex].icon} alt={slides[currentSlideIndex].title} />
          </div>
          <div class="slide-text">
            <h3 class="slide-title no-sel">{slides[currentSlideIndex].title}</h3>
            <p class="slide-description no-sel">{slides[currentSlideIndex].description}</p>
          </div>
        </div>
      </div>
    {/key}
    
    <!-- Wskaźniki postępu (dots) -->
    <div class="slide-indicators">
      {#each slides as _, index}
        <button 
          class="indicator" 
          class:active={index === currentSlideIndex}
          on:click={() => goToSlide(index)}
          aria-label="Przejdź do slajdu {index + 1}"
        ></button>
      {/each}
    </div>
  {/if}
  
  <!-- Wskaźniki dla przypadku bez obrazka -->
  {#if showAnimation && !isValidSrc}
    <div class="slide-indicators">
      {#each slides as _, index}
        <button 
          class="indicator" 
          class:active={index === currentSlideIndex}
          on:click={() => goToSlide(index)}
          aria-label="Przejdź do slajdu {index + 1}"
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 12px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(52, 152, 219, 0.3);
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #e74c3c;
    font-size: 14px;
    padding: 20px;
    background: rgba(231, 76, 60, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }

  .error-message p {
    margin: 0;
  }

  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    will-change: transform, opacity;
  }

  .slide-content {
    text-align: center;
    color: white;
    max-width: 80%;
  }

  .slide-icon {
    margin-bottom: 20px;
  }

  .slide-icon img {
    width: 80px;
    height: 80px;
    /* filter: brightness(0) invert(1); /* Zmienia SVG na białe */ 
    /* drop-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); */
  }

  .slide-text {
    text-align: center;
  }

  .slide-title {
    margin: 0 0 12px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .slide-description {
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .slide-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .indicator:hover {
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }

  .indicator.active {
    background: white;
    border-color: white;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  @keyframes spin {
    0% { 
      transform: translate(-50%, -50%) rotate(0deg); 
    }
    100% { 
      transform: translate(-50%, -50%) rotate(360deg); 
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .carousel-container {
      height: 350px;
    }

    .slide-icon img {
      width: 60px;
      height: 60px;
    }

    .slide-title {
      font-size: 1.3rem;
    }

    .slide-description {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .carousel-container {
      height: 300px;
    }

    .slide-content {
      max-width: 90%;
    }

    .slide-icon {
      margin-bottom: 15px;
    }

    .slide-icon img {
      width: 50px;
      height: 50px;
    }

    .slide-title {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    .slide-description {
      font-size: 0.85rem;
    }
  }
</style>
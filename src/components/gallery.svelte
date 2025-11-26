<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  // Props
  export let images: Array<{ src: string; fallbackSrc: string; title: string; alt: string }> = [];
  export let isOpen: boolean = false;
  export let onClose: () => void;

  let currentImageIndex = 0;
  let hasTransitioned = false; // To control main image transition

  // Functions for navigation
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    hasTransitioned = false;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    hasTransitioned = false;
  }

  function selectImage(index: number) {
    if (index === currentImageIndex) {
      // If the same image is selected, consider it a "zoom" action
      // You can add logic here to open a full-screen view or a link
    } else {
      currentImageIndex = index;
      hasTransitioned = false;
    }
  }

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (!isOpen) return;

    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowRight") {
      nextImage();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    }
  }
  
  // Thumbnail dragging
  let thumbnailsEl: HTMLDivElement;
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    if (!thumbnailsEl) return;
    startX = e.pageX - thumbnailsEl.offsetLeft;
    scrollLeft = thumbnailsEl.scrollLeft;
    thumbnailsEl.classList.add('grabbing');
  }

  function handleMouseLeave() {
    if (!isDragging) return;
    isDragging = false;
    if (!thumbnailsEl) return;
    thumbnailsEl.classList.remove('grabbing');
  }

  function handleMouseUp() {
    isDragging = false;
    if (!thumbnailsEl) return;
    thumbnailsEl.classList.remove('grabbing');
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !thumbnailsEl) return;
    e.preventDefault();
    const x = e.pageX - thumbnailsEl.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    thumbnailsEl.scrollLeft = scrollLeft - walk;
  }
  
  // Touch events for mobile
  function handleTouchStart(e: TouchEvent) {
    isDragging = true;
    if (!thumbnailsEl) return;
    startX = e.touches[0].pageX - thumbnailsEl.offsetLeft;
    scrollLeft = thumbnailsEl.scrollLeft;
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging || !thumbnailsEl) return;
    const x = e.touches[0].pageX - thumbnailsEl.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    thumbnailsEl.scrollLeft = scrollLeft - walk;
  }

  // Add/remove keyboard listener and manage body scroll on mount/destroy
  onMount(() => {
    // Initial scroll lock if modal is open on mount
    if (browser && isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    
    if (thumbnailsEl) {
      thumbnailsEl.addEventListener('mousedown', handleMouseDown);
      thumbnailsEl.addEventListener('mouseleave', handleMouseLeave);
      thumbnailsEl.addEventListener('mouseup', handleMouseUp);
      thumbnailsEl.addEventListener('mousemove', handleMouseMove);
      thumbnailsEl.addEventListener('touchstart', handleTouchStart);
      thumbnailsEl.addEventListener('touchend', handleTouchEnd);
      thumbnailsEl.addEventListener('touchmove', handleTouchMove);
    }


    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (browser) {
        // Ensure overflow is reset when component is destroyed
        document.body.style.overflow = "";
      }
      if (thumbnailsEl) {
        thumbnailsEl.removeEventListener('mousedown', handleMouseDown);
        thumbnailsEl.removeEventListener('mouseleave', handleMouseLeave);
        thumbnailsEl.removeEventListener('mouseup', handleMouseUp);
        thumbnailsEl.removeEventListener('mousemove', handleMouseMove);
        thumbnailsEl.removeEventListener('touchstart', handleTouchStart);
        thumbnailsEl.removeEventListener('touchend', handleTouchEnd);
        thumbnailsEl.removeEventListener('touchmove', handleTouchMove);
      }
    };
  });

  // Fade transition config for images
  const imageFade = {
    duration: 300,
    easing: cubicOut,
  };

  function handleImageLoad() {
    hasTransitioned = true;
  }
</script>

{#if isOpen}
  <div class="gallery-modal-overlay" transition:fade={{ duration: 200 }}>
    <div
      class="gallery-modal-content"
      in:fly={{ y: 50, duration: 300, easing: cubicOut }}
      out:fly={{ y: 50, duration: 200, easing: cubicOut }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery"
    >
      <button class="close-button" on:click={onClose} aria-label="Zamknij galerię">
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

      <!-- Main Image Display -->
      <div class="main-image-display">
        {#key currentImageIndex}
          <div class="image-wrapper" in:fade={imageFade} out:fade={{duration: 150}}>
            <picture>
              <source srcset={images[currentImageIndex].src} type="image/webp" />
              <img
                src={images[currentImageIndex].fallbackSrc}
                alt={images[currentImageIndex].alt}
                title={images[currentImageIndex].title}
                on:load={handleImageLoad}
              />
            </picture>
          </div>
        {/key}
        <div class="image-info" transition:fade={{duration: 150, delay: 300}}>
          {#if images[currentImageIndex].title}
            <h2>{images[currentImageIndex].title}</h2>
          {/if}
        </div>
        <button class="nav-button prev" on:click={prevImage} aria-label="Poprzedni obrazek">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="nav-button next" on:click={nextImage} aria-label="Następny obrazek">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Thumbnails -->
      <div class="thumbnails-container" bind:this={thumbnailsEl}>
        <div class="thumbnails-scroll" >
          {#each images as image, i}
            <button
              class="thumbnail-item"
              class:active={i === currentImageIndex}
              on:click={() => selectImage(i)}
              aria-label="Wyświetl obrazek {image.title}"
            >
            <picture>
              <source srcset={image.src} type="image/webp" />
              <img src={image.fallbackSrc} alt={image.alt} />
            </picture>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .gallery-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000; /* Ensure it's on top of everything */
  }

  .gallery-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    max-height: 90vh;
    background-color: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    overflow: hidden; /* For rounded corners */
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 2rem;
    z-index: 10001; /* Above main image */
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    svg {
      width: 30px;
      height: 30px;
    }
  }

  .main-image-display {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #000; /* Black background for main image area */
    max-height: calc(90vh - 120px); /* Adjust based on thumbnail height */
    
    .image-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; /* Ensure image fits without cropping */
    }
  }

  .image-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    font-size: 0.9rem;
    pointer-events: none; /* Allows clicks to pass through to image if needed */
    h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: normal;
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    padding: 15px 10px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.2s;
    border-radius: 4px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &.prev {
      left: 15px;
    }
    &.next {
      right: 15px;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }

  .thumbnails-container {
    height: 100px; /* Fixed height for thumbnails */
    background-color: #222;
    padding: 10px 0;
    width: 100%;
    flex-shrink: 0; /* Prevent from shrinking */
    overflow-x: scroll; /* Enable horizontal scrolling */
    white-space: nowrap; /* Keep thumbnails in a single line */
    text-align: center; /* Center thumbnails if they don't fill width */
    z-index: 300;
    cursor: grab;

    &.grabbing {
      cursor: grabbing;
    }

    /* Hide scrollbar */
    scrollbar-width: none; /* For Firefox */
    &::-webkit-scrollbar {
      display: none; /* For Chrome, Safari, Edge */
    }
  }

  .thumbnails-scroll {
    display: inline-flex; /* Use inline-flex for proper alignment */
    justify-content: flex-start; /* Start thumbnails from the left */
    gap: 10px;
    padding: 0 10px; /* Padding for scrollable area */
  }

  .thumbnail-item {
    background: none;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    width: 80px; /* Fixed width for thumbnails */
    height: 80px; /* Fixed height for thumbnails */
    overflow: hidden;
    flex-shrink: 0; /* Prevent shrinking */
    transition: border-color 0.2s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.4);
    }
    &.active {
      border-color: #96a500; /* Active thumbnail border */
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Crop thumbnails to fit */
      pointer-events: none; // prevent image drag
    }
  }

  @media (max-width: 768px) {
    .gallery-modal-content {
      max-width: 95vw;
      max-height: 95vh;
    }
    .main-image-display {
      padding: 10px;
      max-height: calc(95vh - 100px);
    }
    .close-button {
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    .nav-button {
      padding: 8px 5px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .thumbnails-container {
      height: 80px;
    }
    .thumbnail-item {
      width: 60px;
      height: 60px;
    }
    .image-info {
      padding: 5px 10px;
      h2 {
        font-size: 0.9rem;
      }
    }
  }
</style>
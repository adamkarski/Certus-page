<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";
  import { typoFixAction } from '$lib/utils/typography';

  export let sectionId: string = "maszyny-image-02";
  export let imgSrc: string = "/assets/placeholder-machine-2.jpg";
  export let title: string = "Galeria zdjęć";
  export let subtitle: string = "Zobacz więcej realizacji";
  export let ctaText: string = "Przejdź do galerii";
  export let ctaAction: () => void = () => {};
  
  let headerEl: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(sectionId);
        }
      },
      { threshold: 0.05 },
    );
    if (headerEl) observer.observe(headerEl);
    return () => observer.disconnect();
  });

  $: visible = $visibilityStore[sectionId] === true;
</script>

<section id={sectionId} class="maszyny-plain-image-section">
  <div class="maszyny-plain-image-container">
    <img
      src={imgSrc}
      alt={title}
      class="maszyny-plain-image"
    />
    <div class="maszyny-plain-image-header" bind:this={headerEl} class:visible>
      {#if visible}
        <h3 class="no-sel" in:fade={{ duration: 600, delay: 400 }} use:typoFixAction>
          {title}
        </h3>
        <p class="no-sel" use:typoFixAction>{subtitle}</p>
        <button class="maszyny-cta-btn" on:click={ctaAction}>
          {ctaText}
        </button>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .maszyny-plain-image-section {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .maszyny-plain-image-header {
    min-height: 60px;
    width: 100%;
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      margin: 0 0 8px 0;
      font-size: 1.4rem;
      color: white;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-weight: 600;
    }
    
    p {
      margin: 0 0 15px 0;
      color: white;
      font-weight: 300;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-size: 0.9rem;
    }
  }

  .maszyny-cta-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.3s ease;

    &:hover {
      background: #2980b9;
    }
  }

  .maszyny-plain-image-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .maszyny-plain-image {
    width: 100%;
    height: 250px;
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .maszyny-plain-image-header h3 {
      font-size: 1.2rem;
    }
    
    .maszyny-plain-image-header p {
      font-size: 0.8rem;
    }
    
    .maszyny-plain-image {
      height: 180px;
    }
    
    .maszyny-cta-btn {
      font-size: 0.8rem;
      padding: 6px 12px;
    }
  }
</style>
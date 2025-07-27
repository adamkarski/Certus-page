<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";
  import { typoFix } from '$lib/utils/typography';

  export let sectionId: string = "maszyny-video";
  export let videoSrc: string = "/assets/video/placeholder-machine.mp4";
  export let title: string = "Zobacz w akcji";
  export let subtitle: string = "Maszyna podczas pracy";
  
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

<section id={sectionId} class="maszyny-video-section">
  <div class="maszyny-video-container">
    <video
      src={videoSrc}
      autoplay
      muted
      loop
      playsinline
      class="maszyny-video"
      title={title}
    />

    <div class="maszyny-video-header" bind:this={headerEl} class:visible>
      {#if visible}
        <h3 class="no-sel" in:fade={{ duration: 600, delay: 400 }}>
          {@html typoFix(title)}
        </h3>
        <p class="no-sel">{@html typoFix(subtitle)}</p>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .maszyny-video-section {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .maszyny-video-header {
    min-height: 60px;
    width: 100%;
    text-align: left;
    padding: 1.5rem 0 1rem 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    padding-left: 2rem;
    padding-right: 2rem;

    h3 {
      margin: 0 0 8px 0;
      font-size: 1.4rem;
      color: white;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: white;
      font-weight: 300;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-size: 0.9rem;
    }
  }

  .maszyny-video-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #f8f9fa;
  }

  .maszyny-video {
    width: 100%;
    height: 200px;
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .maszyny-video-header h3 {
      font-size: 1.2rem;
    }
    
    .maszyny-video-header p {
      font-size: 0.8rem;
    }
    
    .maszyny-video {
      height: 150px;
    }
  }
</style>
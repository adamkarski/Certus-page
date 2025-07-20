<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../lib/visibilityStore";

  const sectionId = "video-header";
  let headerEl: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(sectionId);
        }
      },
      { threshold: 0.05 }
    );
    if (headerEl) observer.observe(headerEl);
    return () => observer.disconnect();
  });

  $: visible = $visibilityStore[sectionId] === true;

  const videoSrc = '/src/assets/video/video.m4v';
</script>

<section id="video" class="video">
  <div class="video-container">
    <video
      src={videoSrc}
      autoplay
      muted
      loop
      playsinline
      class="masked-video"
    />
    <div class="video-header" bind:this={headerEl} class:visible={visible}>
      {#if visible}
        <h1 class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          Pomagamy wdrażamy,<br/>
          optymalizujemy procesy produkcyjne
        </h1>
      {/if}
    </div>
  </div>
</section>

<style>
.video-header {
  min-height: 80px;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  text-align: left;
  padding: 2rem 0 1rem 0;
  background: transparent;
  position: absolute;
  z-index: 2;
  margin-left: 11em;
  margin-top: -15em;
}
.video-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
.video-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(180deg,rgba(247, 247, 247, 1) 0%, rgba(255, 255, 255, 1) 100%);;
}
.masked-video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  object-position: center top;
  clip-path: polygon(
    0% 0%,
    94.18% 0%,
    100% 12.04%,
    100% 95.54%,
    34.93% 95.54%,
    32.23% 100%,
    4.18% 100%,
    0% 91.39%,
    0% 0%
  );
}
@media (max-width: 768px) {
  .video-header h1 {
    font-size: 1.5rem;
  }
}
</style>
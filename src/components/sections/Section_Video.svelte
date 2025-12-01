<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";
  import { typoFixAction } from '$lib/utils/typography';

  const sectionId = "video-header";
  let headerEl: HTMLDivElement;

  let videoElement: HTMLVideoElement; // Declare the video element

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(sectionId);
          // Attempt to play video when it enters viewport
          if (videoElement) {
            videoElement.play().catch(error => {
              console.error("Video playback failed:", error);
              // Fallback for iOS: if autoplay fails, consider showing a play button
              // or ensure poster image is visible.
            });
          }
        } else {
            // Pause video when it leaves viewport
            if (videoElement) {
                videoElement.pause();
            }
        }
      },
      { threshold: 0.05 },
    );
    if (headerEl) observer.observe(headerEl); // Use headerEl or a dedicated video container element for observation
    
    // Also try to play immediately if already in view or for initial load
    if (videoElement) {
        videoElement.play().catch(error => {
            console.error("Initial video playback failed:", error);
        });
    }

    return () => {
        observer.disconnect();
        // Ensure video is paused or stopped on component destroy
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0; // Reset video to start
        }
    };
  });

  $: visible = $visibilityStore[sectionId] === true;

  const videoSrc = "/assets/video/video-hd.webm";
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
      title="Wideo prezentujące procesy produkcyjne Certus"
      preload="metadata"
      poster="/assets/images/pattern-video-1.png"
      bind:this={videoElement}
    />

    <div class="pattern-overlay">
      <div class="video-pattern-1"></div>
      <div class="video-pattern-2"></div>
      <div class="video-pattern-3"></div>
    </div>

    <div class="video-header" bind:this={headerEl} class:visible>
      {#if visible}
        <h1 class="no-sel" in:fade={{ duration: 600, delay: 800 }} use:typoFixAction>
          Pomagamy, wdrażamy,<br />optymalizujemy procesy produkcyjne
        </h1>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    opacity: 0.6;
  }
  .video-pattern-1 {
    background-image: url(/assets/images/pattern-video-1.png);
    position: absolute;
    width: 184px;
    height: 263px;
    z-index: 10;
    right: 0px;
    top: -40px;
    pointer-events: auto;
  }
  .video-pattern-2 {
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
  .video-pattern-3 {
    background-image: url(/assets/images/pattern-video-3.png);
    position: absolute;
    width: 100%;
    height: 64px;
    z-index: 10;
    left: 0px;
    bottom: -20px;
    transform: scale(1.7);
    pointer-events: auto;
    background-position-x: -128px;
  }
  .video-header {
    min-height: 80px;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    text-align: left;
    padding: 6rem 0 1rem 0;
    background: transparent;
    position: absolute;
    z-index: 2;
    margin-left: 11em;
    margin-top: -15em;
    :before {
      content: "";
      position: absolute;
      width: 30px;
      height: 46px;
      margin-left: -40px;
      background-image: url(/assets/images/red-arrow.svg);
      margin-top: 4px;;
    }
  }
  .video-header h1 {
    margin: 0;
    width: 80%;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    font-weight: 700;
  }
  .video-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(
      180deg,
      rgba(247, 247, 247, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .masked-video {
    width: 100%;
    height: 500px;
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
 
</style>

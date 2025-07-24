<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";

  const sectionId = "video-header";
  let headerEl: HTMLDivElement;

  const imgSrc = "/assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg";

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

  const videoSrc = "/assets/video/video.m4v";
</script>

<section id="image-section-01" class="image-section-01">
  <div class="image-container">
    <img
      src={imgSrc}
      alt="Certus maszyny tworzone z pasją i precyzją"
      class="masked-image"
    />
    <div class="image-header" bind:this={headerEl} class:visible>
      {#if visible}
        <h1 class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          Tworzone z pasją i precyzją
        </h1>
        <h3 class="no-sel">Optymalne do wykonywanych zadań.</h3>
      {/if}
    </div>

    <div class="pattern-overlay no-sel">
      <div class="pattern one"></div>
      <div class="pattern two"></div>
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
    opacity: 0.8;

    .pattern.one {
      background-image: url(/assets/images/pattern-image1.png);
    position: absolute;
    width: 140px;
    height: 64px;
    z-index: 10;
    right: 0px;
    top: 22px;
    pointer-events: auto;
    }
    .pattern.two {
      background-image: url(/assets/images/pattern-image1-2.png);
    position: absolute;
    width: 100%;
    height: 63px;
    z-index: 10;
    left: 0px;
    bottom: -11px;
    pointer-events: auto;
    }
  }

  .image-header {
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

    h1:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 46px;
      margin-left: -40px;
      background-image: url(assets/red-arrow.svg);
    }
    h1 {
    margin: 0;
    font-size: 2.5rem;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }h3 {
    margin: 0;
    color: white;
    font-weight: 300;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    padding-top: 10px;
  }
  }

  .image-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .masked-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center top;
    clip-path: polygon(
      0% 0%,
      94.5% 0%,
      100% 13.9%,
      100% 100%,
      33.7% 100%,
      29.9% 95.3%,
      1.6% 95.3%,
      0% 91.3%,
      0% 0%
    );
  }
  @media (max-width: 768px) {
    .image-header h1 {
      font-size: 1.5rem;
    }
  }
</style>

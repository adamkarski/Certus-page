<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";

  const sectionId = "image-section-03";
  let headerEl: HTMLDivElement;

  const imgSrc = "https://www.mg-certus.pl/wp-content/uploads/2024/01/4.jpg";

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

<section id="image-section-03" class="image-section-03">
  <div class="image-container-02 no-sel">
    <img
      src={imgSrc}
      alt="Certus maszyny tworzone z pasją i precyzją"
      class="plain-image-02"
    />
    <div class="image-header-02" bind:this={headerEl} class:visible>
      {#if visible}
        <h2 class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          Od pomysłu do gotowego rozwiązania
        </h2>

        <h3>Umów bezpłatną konsultację techniczną z naszym ekspertem</h3>
      {/if}
    </div>
    <div class="phone-holder" bind:this={headerEl} class:visible>
      {#if visible}
        <div class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          <img src="/assets/ikony/telefon.svg" alt="kontakt telefoniczny" />
          <a href="tel:+48606324406" title="Zadzwoń do Certus">606 324 406</a>
        </div>
      {/if}
    </div>
    <div class="pattern-overlay no-sel">
      <div class="pattern one"></div>
      <div class="pattern two"></div>
    </div>
  </div>
</section>

<style lang="scss">

h3 {
    margin: 0;
    color: white;
    font-weight: 300;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    padding-top: 10px;
  }
.image-section-03 {
    width: 100vw;
    position: relative;
    overflow: hidden;

    .phone-holder {
      position: absolute;
      right: 8em;
      width: auto;
      height: auto;
      margin-top: -88px;
      z-index: 100;

      div {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;

        img {
          width: 34px;
        }
        a {
          font-size: 3em;
          font-weight: 800;
          padding-left: 0.5em;
        }
      }
    }

    .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      

      .pattern.one {
        background-image: url(/assets/images/pattern-image2-1.png);
        position: absolute;
        width: 157px;
        height: 181px;
        z-index: 10;
        right: -27px;
        top: -42px;
        pointer-events: auto;
      }
      .pattern.two {
        background-image: url(/assets/images/pattern-image1-2.png);
        position: absolute;
        width: 100%;
        height: 63px;
        z-index: 11;
        left: 0;
        bottom: 0;
        pointer-events: auto;
      }
    }
  }
  .image-container-02 {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(
      180deg,
      rgba(247, 247, 247, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .plain-image-02 {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center top;
  }
  .image-header-02 {
    min-height: 80px;
    width: 100%;
    text-align: left;
    padding: 2rem 0 1rem 0;
    background: transparent;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    padding-left: 11em;
    h3{

      font-weight: 500 !important;
      margin-left: -27px;
      font-size: 1.2rem;
    }
  }
  .image-header-02 h2 {
    margin: 0;
    font-size: 2.5rem;
    color: white !important; 
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    margin-left: -0.8em;
    font-size: 2.5rem;
    font-weight: 700;
  }
  .image-header-02 h2:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 46px;
      margin-left: -40px;
      background-image: url(assets/red-arrow.svg);
    }
  @media (max-width: 768px) {
    .image-header-02 h2 {
      font-size: 1.5rem;
    }
  }
</style>

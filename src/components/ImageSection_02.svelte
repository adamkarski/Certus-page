<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../lib/visibilityStore";

  const sectionId = "image-section-02";
  let headerEl: HTMLDivElement;

  const imgSrc = '/src/assets/certus-szkolenia-wdrozenia.jpg';

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
</script>

<section id="image-section-02" class="image-section-02">
  <div class="image-container-02">
    <img
      src={imgSrc}
      alt="Certus maszyny tworzone z pasją i precyzją"
      class="plain-image-02"
    />
    <div class="image-header-02" bind:this={headerEl} class:visible={visible}>
      {#if visible}
        <h2 class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          Pomagamy wdrażamy,<br/>
          optymalizujemy procesy produkcyjne
        </h2>

        <p>Umów bezpłatną konsultację techniczną z naszym ekspertem</p>
      {/if}
    </div>
    <div class="phone" bind:this={headerEl} class:visible={visible}>
      {#if visible}
        <div class="no-sel" in:fade={{ duration: 600, delay: 800 }}>
          <img src="/src/assets/phone.svg" alt="kontakt telefoniczny" />
          <a href="tel:+48601601601">+48 601 601 601</a>
       </div>
      {/if}
    </div>
  </div>
</section>

<style>
.image-section-02 {
  width: 100vw;
  position: relative;
  overflow: hidden;
}
.image-container-02 {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(180deg,rgba(247, 247, 247, 1) 0%, rgba(255, 255, 255, 1) 100%);
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
.image-header-02 h2 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
@media (max-width: 768px) {
  .image-header-02 h2 {
    font-size: 1.5rem;
  }
}
</style>
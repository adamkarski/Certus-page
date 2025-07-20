<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  let sectionEl: HTMLElement;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="info-cards-section" bind:this={sectionEl}>
  <div class="info-cards-wrapper">
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 0 : 9999 }}>
      <div class="info-card-header">
        <img src="/src/assets/red-arrow.svg" alt="Ikona" class="info-icon" />
        <span class="info-title">Najwyższa jakość<br>komponentów:</span>
      </div>
      <p class="info-desc">
        Wszystkie maszyny są produkowane z użyciem najwyższej jakości komponentów, co gwarantuje trwałość i niezawodność.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 300 : 9999 }}>
      <div class="info-card-header">
        <img src="/src/assets/red-arrow.svg" alt="Ikona" class="info-icon" />
        <span class="info-title">Własny serwis:</span>
      </div>
      <p class="info-desc">
        Firma oferuje pomoc w konfiguracji i ustawieniu maszyn, serwis gwarancyjny i pogwarancyjny, w tym serwis na miejscu, co zapewnia ciągłość pracy urządzeń.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 600 : 9999 }}>
      <div class="info-card-header">
        <img src="/src/assets/red-arrow.svg" alt="Ikona" class="info-icon" />
        <span class="info-title">Ponad 10 lat<br>doświadczenia<br>w branży</span>
      </div>
      <p class="info-desc">
        Z ponad dekadą doświadczenia w branży CNC, CERTUS jest wiarygodnym partnerem dla wymagających klientów.
      </p>
    </div>
  </div>
</section>

<style>
.info-cards-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: none;
  padding: 0;
  margin: 0;
}
.info-cards-wrapper {
  display: flex;
  gap: 3vw;
  width: 100%;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 0 0 0;
}
.info-card {
  background: #f7f7f7;
  border-radius: 0;
  box-shadow: none;
  padding: 32px 32px 32px 32px;
  width: 100%;
  max-width: 400px;
  min-width: 320px;
  min-height: 260px;
  border-top: 4px solid #555a5e;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: flex-start;
}
.info-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.info-icon {
  width: 28px;
  height: 28px;
  margin-right: 2px;
  margin-top: 2px;
  filter: hue-rotate(60deg) brightness(0.8) saturate(2.5);
}
.info-title {
  font-size: 2rem;
  font-weight: 700;
  color: #555a5e;
  line-height: 1.1;
}
.info-desc {
  font-size: 1.1rem;
  color: #222;
  margin: 0;
  font-weight: 400;
}
@media (max-width: 1100px) {
  .info-cards-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .info-card {
    max-width: 600px;
    min-width: 0;
    width: 90vw;
  }
}
@media (max-width: 600px) {
  .info-title {
    font-size: 1.2rem;
  }
  .info-card {
    padding: 20px 10px 20px 10px;
    min-height: 180px;
  }
  .info-desc {
    font-size: 0.98rem;
  }
}
</style>
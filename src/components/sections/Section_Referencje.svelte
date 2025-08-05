<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
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

<div class="section-wrapper">
<section class="info-cards-section no-sel" bind:this={sectionEl}>



  <div class="info-cards-wrapper">
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 0 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Najwyższa jakość naszych komponentów" class="info-icon" />
        <span class="info-title" use:typoFixAction>Najwyższa jakość komponentów:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Wszystkie maszyny są produkowane z użyciem najwyższej jakości komponentów, co gwarantuje trwałość i niezawodność.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 300 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Własny serwis gwarancyjny i pogwarancyjny" class="info-icon" />
        <span class="info-title" use:typoFixAction>Własny serwis:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Firma oferuje pomoc w konfiguracji i ustawieniu maszyn, serwis gwarancyjny i pogwarancyjny, w tym serwis na miejscu, co zapewnia ciągłość pracy urządzeń.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 600 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Ponad 20 lat doświadczenia w branży CNC" class="info-icon" />
        <span class="info-title">Ponad 20 lat<br>doświadczenia<br>w branży</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Z ponad dekadą doświadczenia w branży CNC, CERTUS jest wiarygodnym partnerem dla wymagających klientów.
      </p>
    </div>
  </div>

</section>
</div>

<style lang="scss">

.section-wrapper {
  display: block;
    position: relative;
    /* width: 100%; */
    /* height: 100%; */
    background-color: white;
}

.info-cards-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: none;
  padding: 0;
  margin: 0;
  padding-bottom: 10em;


}
.info-cards-wrapper {
  display: flex;
  gap: 3vw;
  width: 100%;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 0 0 0;
  margin-top: 80px;
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
  position: relative; // Dodaj to!

}
.info-card::before{
  content: url(/assets/images/triangle.svg); // Użyj ścieżki absolutnej, jak w <img>
  position: absolute;
  right: 0;
  bottom: 0;
  width: 119px;
  height: 68px;
  pointer-events: none;
   

  }
.info-card-header {
  display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
    height: 7em;
 
}
.info-icon {
  width: 34px;
    height: 44px;
    margin-right: 2px;
    margin-top: 2px;
 
}
.info-title {
  font-size: 2rem;
  font-weight: 700;
  color: #555a5e;
  line-height: 1.1;
  margin-top: 6px;
}
.info-desc {
  font-size: 1.1rem;
  color: #222;
  margin: 0;
  font-weight: 400;
  padding-left: 1em;
  bottom: 0px;
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
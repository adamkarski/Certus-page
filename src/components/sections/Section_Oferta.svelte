<script lang="ts">
  import OfertaGrid from "../OfertaGrid.svelte";
  import { typoFixAction } from "$lib/utils/typography";
  const oferta = [];
</script>

<section id="oferta" class="oferta">
  <div class="oferta-container container">
    <div class="section-header no-sel">
      <h2 class="section-title" use:typoFixAction>
        Polski producent maszyn CNC
      </h2>

      <p class="section-subtitle" use:typoFixAction>
        10 lat doświadczenia w produkcji frezarek, grawerek, tokarek i ploterów
        CNC.<br /><br />
        Kompleksowa obsługa od projektu po serwis.<br /><br />
        — wszystko z jednego źródła Znajdź sprzęt idealny do Twojej firmy
      </p>
    </div>

    <OfertaGrid variant="homepage" />
  </div>
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel">
    <div class="pattern two"></div>
  </div>
</section>

<style lang="scss">


.pattern-overlay {
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    z-index: 2;
    pointer-events: none;
    opacity: 0.3;
    margin-top: -200px;

    .pattern.two {
      transform: scale(1.2) skew(-15deg, 0deg);
    background-image: url(/assets/images/pattern-image1-2.png);
    position: absolute;
    width: 100%;
    height: 63px;
    z-index: 11;
    left: 0;
    bottom: 85px;
    pointer-events: auto;
    }
  }

  :global(.home #oferta) {
    position: relative;
    z-index: 516;
    margin-top: 1000px;

    .oferta-container {
      overflow: hidden;
      width: 100%;
      padding: 0 9rem;
      background: #f7f7f7;
    }

  }

  
  .oferta {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
  }

  .oferta-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    .oferta {
      padding: 80px 0;
    }

    .oferta-container {
      padding: 0 2rem !important;
    }

    .section-title {
      font-size: 20px;
    }
    .section-subtitle {
      font-size: 14px;
    }
  }
</style>

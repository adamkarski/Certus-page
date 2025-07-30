<script lang="ts">
  import OfertaGrid from "../OfertaGrid.svelte";
  import { typoFixAction } from '$lib/utils/typography';
  const oferta = [
   
  ];
</script>

<section id="oferta" class="oferta">


  <div class="oferta-container container">
    <div class="section-header no-sel">
      <h2 class="section-title" use:typoFixAction>Polski producent maszyn CNC</h2>

      <p class="section-subtitle" use:typoFixAction>
        10 lat doświadczenia w produkcji frezarek, grawerek, tokarek i ploterów CNC.<br /><br />
        Kompleksowa obsługa od projektu po serwis.<br /><br />
        — wszystko z jednego źródła Znajdź sprzęt idealny do Twojej firmy
      </p>
    </div>

    <OfertaGrid variant="homepage" />
  </div>
  <div class="first-container-back">
    
    

  </div>


</section>

<style lang="scss">
 
  :global(.first-container-back){
 
    background-image: url('/assets/first-block-polyline.svg');
    position: absolute;
    top: 77.6vh;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;

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
      padding: 0 2rem;
    }

    .section-title {
      font-size: 32px;
    }
  }
</style>
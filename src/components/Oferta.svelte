<script lang="ts">
  import CtaButton from "./cta-button-kategory.svelte";
  const oferta = [
   
  ];
</script>

<section id="oferta" class="oferta">


  <div class="oferta-container container">
    <div class="section-header">
      <h2 class="section-title">Polski producent maszyn CNC</h2>

      <p class="section-subtitle">
        10 lat doświadczenia w produkcji frezarek, grawerek, tokarek i ploterów
        CNC.
        <br />
        Kompleksowa obsługa od projektu po serwis.
        <br /> <br />
        — wszystko z jednego źródła Znajdź sprzęt idealny do Twojej firmy
      </p>
    </div>

    <div class="oferta-grid">
      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/frezarki.svg" alt="Frezarki CNC" />
        </div>

        <CtaButton text="Frezarki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/tokarki.svg" alt="Tokarki CNC" />
        </div>

        <CtaButton text="Tokarki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/grawerki.svg" alt="Grawerki CNC" />
        </div>

        <CtaButton text="Grawerki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/plotery.svg" alt="Plotery CNC" />
        </div>

        <CtaButton text="Plotery CNC" />
      </div>
    </div>
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
    img{
      height: 37px;

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

  :global(.oferta-grid){
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    .oferta-card {
    padding: 40px 30px;
    border-radius: 10px;
    text-align: center;
   
    transition: all 0.3s ease;
    display: grid;
    align-items: end;
    justify-content: center;
    align-content: center;
  }
  .oferta-card:hover {
    transform: translateY(-10px);
 
    
  }

  .oferta-icon {
    font-size: 60px;
    margin-bottom: 25px;
    display: block;
    width: 4em;

    img{
      margin-left: 0.6em;
    }
  }

  }

  

  



  

  @media (max-width: 768px) {
    .oferta {
      padding: 80px 0;
    }

    .section-title {
      font-size: 32px;
    }

    .oferta-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .oferta-card {
      padding: 30px 20px;
    }
  }
</style>
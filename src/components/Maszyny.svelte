<script lang="ts">
  import CtaButton from "./cta-button-kategory.svelte";
  const maszyny = [];
</script>

<section class="maszyny_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="maszyny" class="maszyny">
  <div class="maszyny-container container">
    <div class="section-header">
      <h2 class="section-title">Maszyny</h2>

      <p class="section-subtitle">
        10 lat doświadczenia w produkcji frezarek, grawerek, tokarek i ploterów
        CNC.
        <br />
        Kompleksowa obsługa od projektu po serwis.
        <br /> <br />
        — wszystko z jednego źródła Znajdź sprzęt idealny do Twojej firmy
      </p>
    </div>
  
    
    <div class="oferta-container container">

    <div class="oferta-grid">
      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/frezarki.svg" alt="Frezarki CNC" />
        </div>

        <CtaButton text="Frezarki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="assets/ikony/tokarki.svg" alt="Toakrki CNC" />
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

  

    </div>"

  
  </div>

  <!-- gruba HR z przezroczystą kolorową tło -->
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
</section>

<style lang="scss">



.oferta-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }


  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    z-index: 2;
    pointer-events: none;
    opacity: 0.3;

    .pattern.one {
      transform: scale(1.2) skew(-15deg, 0deg);
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100%;
      height: 63px;
      z-index: 41;
      left: 1px;
      bottom: -8px;
      pointer-events: auto;
    }
    .pattern.two {
      transform: scale(1.2) skew(-15deg, 0deg);
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100%;
      height: 63px;
      z-index: 11;
      left: 0;
      bottom: -10px;
      pointer-events: auto;
    }
  }

  .maszyny_page {
    min-width: 100vw;
    margin: 0 auto;

    min-height: 20vh;

    background-color: red;
  }

  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 209px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
  }
  .maszyny {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
  }

  .maszyny-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .section-header {
    margin-bottom: 80px;
  }

  .maszyny-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .maszyny-card {
    padding: 40px 30px;
    border-radius: 10px;
    text-align: center;

    transition: all 0.3s ease;
    display: grid;
    align-items: end;
    justify-content: center;
    align-content: center;
  }

  .maszyny-card:hover {
    transform: translateY(-10px);
  }

  .maszyny-icon {
    font-size: 60px;
    margin-bottom: 25px;
    display: block;
    width: 4em;

    img {
      margin-left: 0.6em;
    }
  }

  @media (max-width: 768px) {
    .maszyny {
      padding: 80px 0;
    }

    .section-title {
      font-size: 32px;
    }

    .maszyny-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .maszyny-card {
      padding: 30px 20px;
    }
  }
</style>

<script>
  import CtaButton from "../cta-button.svelte";
  import { typoFixAction } from '$lib/utils/typography';
</script>

<section id="o-nas" class="o-nas">
  <div class="o-nas-container container">
    <div class="o-nas-content">
      <div class="o-nas-text">
        <h2 class="section-title " use:typoFixAction>Nasze maszyny CNC łączą polską inżynierię</h2>

        <p class=" section-subtitle" use:typoFixAction>z najnowocześniejszymi technologiami obróbki.</p>
        <br/><br/>
        <p class="section-subtitle" use:typoFixAction>Zaprojektowane z myślą o małych zakładach i dużych kombinatach, oferują:</p>
        <div class="o-nas-features">
          <ul>
            <li class="feature" use:typoFixAction>Precyzja obróbki do ±0,01mm</li>
            <li class="feature" use:typoFixAction>Kompatybilność z różnymi materiałami</li>
            <li class="feature" use:typoFixAction>Intuicyjne oprogramowanie sterujące</li>
            <li class="feature" use:typoFixAction>Kompleksowy serwis gwarancyjny i pogwarancyjny</li>
          </ul>
        </div>
        <p class="o-nas-description" use:typoFixAction>Idealne rozwiązanie dla firm wymagających wysokiej jakości obróbki metali w produkcji prototypów i serii masowych.</p>

        <div class="center-cta">
          <CtaButton text="Zapraszamy na bezpłatną konsultację" />
        </div>
      </div>

      <div class="o-nas-right">
        <div class="step">
          <img
            src="/assets/ikony/onas-analiza-potrzeb.svg"
            alt="Analiza Potrzeb"
          />
          <div class="step-content">
            <div class="step-title">Analiza Potrzeb</div>
            <div class="step-description">
              Dokądnie poznajemy Twoje wymagania produkcyjne
            </div>
          </div>
        </div>
        <div class="step">
          <img
            src="/assets/ikony/onas-dobor-rozwiazan.svg"
            alt="Dobór rozwiązania"
          />
          <div class="step-content">
            <div class="step-title">Dobór Rozwiązania</div>
            <div class="step-description">
              Proponujemy optymalną maszynę CNC dla Twojej branży
            </div>
          </div>
        </div>
        <div class="step">
          <img src="/assets/ikony/onas-wdrozenie.svg" alt="Wdrożenie" />
          <div class="step-content">
            <div class="step-title">Wdrożenie</div>
            <div class="step-description">
              kompleksowa instalacja i szkolenie operatorów
            </div>
          </div>
        </div>
        <div class="step">
          <img src="/assets/ikony/onas-wsparcie.svg" alt="Wsparcie" />
          <div class="step-content">
            <div class="step-title">Wsparcie</div>
            <div class="step-description">
              Serwis gwarancyjny i pogwarancyjny przez całą eksploatację
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="scss">

:global(#o-nas button )
   {
    width: auto;
    padding-right: 16px;
    
  }

  .o-nas {
    width: 100%;
    padding: 100px 0;
    background: white;
  }

  .o-nas-container {
    width: 100%;
    padding: 0 9rem;
  }

  .o-nas-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .section-title {
    color: var(--color-text-secondary);
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 38px;
    text-align: left;
  }

  .o-nas-description {
    color: #666;
    line-height: 1.8;
    margin-bottom: 25px;
    font-size: 16px;
  }

  .o-nas-features {
    margin-top: 40px;
  }

  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }
  .o-nas-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: auto;
  }

  .step {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;

    display: flex;
    align-items: center;
    gap: 20px;
  }

  .step-content {
    display: flex;
    flex-direction: column;
  }

  .step-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-text-secondary);
  }

  .step-description {
    font-size: 16px;
    color: #555;
  }

  .o-nas-right img {
    width: 4em;

    object-fit: cover;
    padding: 0.4em;
  }

  @media (max-width: 768px) {
    .o-nas {
      padding: 80px 0;
    }

    .o-nas-content {
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .section-title {
      font-size: 32px;
    }

    .o-nas-right {
      order: -1;
    }
  }
</style>

<script>
  import CtaButton from "../CtaButton.svelte";
  import { typoFixAction } from "$lib/utils/typography";
</script>

<section id="o-nas" class="o-nas">
  <div class="o-nas-container container">
    <div class="o-nas-content">
      <div class="o-nas-text no-sel">
        <h2 class="section-title step-title">
          Precyzja, która pracuje na Twój wynik.
        </h2>

        <h3 class="step-description" use:typoFixAction>
          Projektujemy i budujemy w Polsce plotery i frezarki CNC – stabilne,
          powtarzalne, gotowe do pracy w wymagającej produkcji.
        </h3>

        <br /><br />

        <h2 class="section-title step-title">Dlaczego my:</h2>

        <div class="">
          <ul>
            <li class="feature title-green" use:typoFixAction>
              Kontrola jakości na każdym etapie, mierzalna precyzja detalu
            </li>
            <li class="feature title-green" use:typoFixAction>
              Standardowe modele + maszyny specjalne pod Twój proces
            </li>
            <li class="feature title-green" use:typoFixAction>
              Sztywne konstrukcje, markowe podzespoły, długi bezawaryjny cykl
              pracy
            </li>
            <li class="feature title-green" use:typoFixAction>
              Szybkie wdrożenie i serwis, realne wsparcie po zakupie
            </li>
          </ul>
        </div>
        <br /><br />
        <h3 class="step-description" use:typoFixAction>
          Aluminium, kompozyty, tworzywa, drewno — jedna technologia, wiele zastosowań. Zobacz nasze maszyny albo zamów konfigurację na miarę.
        </h3>
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
              Dokładnie poznajemy Twoje wymagania produkcyjne
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
  .title-green {
    padding-left: 20px;
    border-left: 4px solid var(--color-primary-dark);
  }

  :global(#o-nas button) {
    width: auto;
    padding-right: 16px;
  }

  .o-nas {
    width: 100%;
    padding: 100px 0;
    background: white;
    position: relative;
  }

  .o-nas-container {
    width: 100%;
    padding: 0 9rem;
  }

  .o-nas-content {
    display: flex;
    flex: 1 1 0;
    gap: 80px;
    align-items: start;
  }

  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: #333;
  }

  .o-nas-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: 0px;
  }

  .step {
    background-color: #fff;
    border-radius: 8px;

    display: flex;
    align-items: center;
    gap: 20px;
  }

  .step-content {
    display: flex;
    flex-direction: column;
  }

  .step-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-text-secondary);
  }

  .step-description {
    min-width: 300px;
    color: #555;
  }

  .o-nas-right img {
    width: 4em;

    object-fit: cover;
    padding: 0.4em;
  }

  @media (max-width: 930px) {
    .o-nas-content {
      display: flex;
      gap: 5px;
      flex-direction: column-reverse;


      .o-nas-right{

        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        margin-left: 0px;
        margin-top: 1em;

      }
    }

    .step-description {
      min-width: 200px;
      color: #555;
    }
  }
  @media (max-width: 768px) {
    .o-nas {
      padding: 80px 0;
    }

    .o-nas-content {
      grid-template-columns: 1fr;
      gap: 50px;
    }

    /* Lokalny styl usunięty - używamy globalnego z typography.scss */

    .o-nas-right {
      order: -1;
    }
  }
</style>

<script>
  import CtaButton from "../CtaButton.svelte";
  import { typoFixAction } from "$lib/utils/typography";
</script>

<section id="o-nas" class="o-nas">
  <div class="o-nas-container container">
    <div class="o-nas-content">
      <div class="o-nas-text no-sel">
        <h1 class="section-title step-title">
          Precyzja, która pracuje na Twój wynik.
        </h1>

        <h3 class="step-description" use:typoFixAction>
          Projektujemy i budujemy w Polsce plotery i frezarki CNC – stabilne,
          powtarzalne, gotowe do pracy w wymagającej produkcji.
        </h3>

        <br /><br />

        <h2 class="section-title step-title">Dlaczego my:</h2>

        <div class="">
          <ul>
            <li class="feature title-green" use:typoFixAction>
              Rygorystyczna kontrola jakości na każdym etapie montażu
            </li>
            <li class="feature title-green" use:typoFixAction>
              Standardowe modele oraz maszyny specjalne projektowane pod Twój proces
            </li>
            <li class="feature title-green" use:typoFixAction>
              Sztywne konstrukcje stalowe i sprawdzone podzespoły renomowanych marek
            </li>
            <li class="feature title-green" use:typoFixAction>
              Szybkie wdrożenie, szkolenie operatorów i bezpośrednie wsparcie serwisu
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
            width="64"
            height="64"
            loading="lazy"
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
            width="64"
            height="64"
            loading="lazy"
          />
          <div class="step-content">
            <div class="step-title">Dobór Rozwiązania</div>
            <div class="step-description">
              Proponujemy optymalną maszynę CNC dla Twojej branży
            </div>
          </div>
        </div>
        <div class="step">
          <img src="/assets/ikony/onas-wdrozenie.svg" alt="Wdrożenie" width="64" height="64" loading="lazy" />
          <div class="step-content">
            <div class="step-title">Wdrożenie</div>
            <div class="step-description">
              kompleksowa instalacja i szkolenie operatorów
            </div>
          </div>
        </div>
        <div class="step">
          <img src="/assets/ikony/onas-wsparcie.svg" alt="Wsparcie" width="64" height="64" loading="lazy" />
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
    background: #18191c;
    position: relative;
    color: #e5e7eb;
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
    color: #d1d5db;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .o-nas-left .step-description {
    color: #9ca3af;
  }

  .o-nas-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: 0px;
  }

  .step {
    background-color: #222428;
    border: 1px solid #33363d;
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease, transform 0.2s ease;

    &:hover {
      border-color: var(--color-primary-dark);
      transform: translateY(-2px);
    }
  }

  .step-content {
    display: flex;
    flex-direction: column;
  }

  .step-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: #ffffff;
  }

  .step-description {
    min-width: 300px;
    color: #9ca3af;
  }

  .o-nas-right img {
    width: 4em;
    object-fit: cover;
    padding: 0.4em;
    filter: brightness(1.1);
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

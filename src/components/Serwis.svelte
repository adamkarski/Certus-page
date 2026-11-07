<script lang="ts">
  import { typoFixAction } from "$lib/utils/typography";
  import SerwisKontakt from "./serwis/SerwisKontakt.svelte";

  function scrollToZgloszenie() {
    const el = document.getElementById("zgloszenie-serwisowe");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function scrollToCennik() {
    const el = document.getElementById("cennik");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<div class="serwis-page no-sel">
  <!-- ===================================================================
       1. HERO STUDIO (Identyczna struktura, wysokość i światła jak HMP-G1 / C69 / O nas)
       =================================================================== -->
  <div class="hmp-hero-wrapper">
    <!-- Tło ze zdjęciem studio i dwoma światłami na podłodze -->
    <div class="hmp-hero-bg" aria-hidden="true"></div>

    <section class="cx-wrap hmp-hero-section">
      <div class="hero-grid">
        <!-- Lewa kolumna: Treść -->
        <div class="hero-text-col">
          <span class="hero-pill-badge">Serwis producenta</span>
          <h1 class="hero-h1">SERWIS</h1>
          <p class="hero-lead" use:typoFixAction>
            Gwarancja od dnia odbioru, szkolenie w cenie maszyny i bezpośrednie wsparcie techniczne konstruktorów i inżynierów CERTUS.
          </p>

          <div class="hero-actions">
            <button type="button" on:click={scrollToZgloszenie} class="btn-certus-primary">Zgłoś usterkę</button>
            <button type="button" on:click={scrollToCennik} class="btn-certus-outline">Zasady serwisu i cennik</button>
          </div>
        </div>

        <!-- Prawa kolumna: Render frezarki w zabudowie stojącej na podłodze -->
        <div class="hero-machine-col">
          <div class="hero-machine-stage">
            <img
              src="/assets/images/serwis/hero-serwis-maszyna.webp"
              alt="Frezarka CNC CERTUS w pełnej zabudowie – serwis fabryczny"
              class="hero-machine-render"
              width="1024"
              height="768"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <!-- Pasek 4 KPI (klasy cx-kpi identyczne z HMP-G1 / C69 / O nas) -->
      <div class="cx-kpi">
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">GWARANCJA</p>
          <p class="cx-kpi-value">12 miesięcy</p>
          <p class="cx-kpi-note">od dnia odbioru</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">SZKOLENIE</p>
          <p class="cx-kpi-value">do 3 h</p>
          <p class="cx-kpi-note">w cenie maszyny</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">ZGŁOSZENIA</p>
          <p class="cx-kpi-value">pn–pt 8–16</p>
          <p class="cx-kpi-note">telefon i e-mail</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">PRZEGLĄDY</p>
          <p class="cx-kpi-value">co 12 mies.</p>
          <p class="cx-kpi-note">zalecany przegląd</p>
        </div>
      </div>
    </section>

    <!-- Ukośne ścięcie Hero przechodzące w tło -->
    <div class="cx-cut" aria-hidden="true"></div>
  </div>

  <!-- ===================================================================
       2. PEŁNA OPIEKA PO ZAKUPIE
       =================================================================== -->
  <section class="section-pad">
    <div class="certus-container">
      <div class="card-base-white care-card">
        <div class="care-header">
          <h2 class="care-title" use:typoFixAction>Pełna opieka po zakupie. Dedykowany zespół od projektu po serwis.</h2>
          <p class="care-sub" use:typoFixAction>
            Zakres usług serwisowych dla wszystkich maszyn CERTUS. Stawki — w cenniku poniżej.
          </p>
        </div>

        <div class="service-cards-grid">
          <!-- 1. Serwis gwarancyjny -->
          <article class="service-item">
            <div class="service-thumb-box">
              <img
                src="/assets/images/serwis/serwis-gwarancyjny.webp"
                alt="Serwis gwarancyjny maszyn CNC CERTUS"
                width="391"
                height="263"
                loading="lazy"
              />
            </div>
            <h3 class="service-title">Serwis gwarancyjny</h3>
            <p class="service-desc" use:typoFixAction>
              12 miesięcy od dnia odbioru, potwierdzonego protokołem odbioru technicznego. Prace serwisowe oraz części wymieniane w ramach gwarancji — bez opłat.
            </p>
          </article>

          <!-- 2. Serwis pogwarancyjny -->
          <article class="service-item">
            <div class="service-thumb-box">
              <img
                src="/assets/images/serwis/serwis-pogwarancyjny.webp"
                alt="Serwis pogwarancyjny i modernizacje maszyn CNC"
                width="620"
                height="600"
                loading="lazy"
              />
            </div>
            <h3 class="service-title">Serwis pogwarancyjny</h3>
            <p class="service-desc" use:typoFixAction>
              Diagnostyka i naprawy na miejscu u klienta, części zamienne, modernizacje maszyn.
            </p>
          </article>

          <!-- 3. Przeglądy okresowe -->
          <article class="service-item">
            <div class="service-thumb-box">
              <img
                src="/assets/images/serwis/przeglady-okresowe.webp"
                alt="Przeglądy okresowe obrabiarek CNC"
                width="391"
                height="260"
                loading="lazy"
              />
            </div>
            <h3 class="service-title">Przeglądy okresowe</h3>
            <p class="service-desc" use:typoFixAction>
              Co 12 miesięcy. Zakres według karty przeglądu CERTUS – przegląd HMM-ST to ok. 3–4 h.
            </p>
          </article>

          <!-- 4. Szkolenia i diagnostyka zdalna -->
          <article class="service-item">
            <div class="service-thumb-box">
              <img
                src="/assets/images/serwis/szkolenia-diagnostyka.webp"
                alt="Szkolenia operatorów i zdalna diagnostyka PikoCNC"
                width="560"
                height="678"
                loading="lazy"
              />
            </div>
            <h3 class="service-title">Szkolenia i diagnostyka zdalna</h3>
            <p class="service-desc" use:typoFixAction>
              Szkolenie podstawowe operatora przy uruchomieniu (do 3 h) w cenie maszyny. Szkolenia dodatkowe i zdalna pomoc — według cennika.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       3. CENNIK SERWISU (Tabela + 3 karty boczne)
       =================================================================== -->
  <section class="section-pad-sm" id="cennik">
    <div class="certus-container">
      <div class="cennik-header-row">
        <h2 class="cennik-main-title">CENNIK SERWISU</h2>
        <span class="cennik-date-note">obowiązuje od 11/2026 · ceny netto</span>
      </div>

      <div class="cennik-layout">
        <!-- Lewa kolumna: Tabela cennika -->
        <div class="cennik-table-wrap">
          <div class="cennik-table-header">
            <div class="col-service">USŁUGA</div>
            <div class="col-rate">STAWKA</div>
            <div class="col-notes">UWAGI</div>
          </div>

          <div class="cennik-table-body">
            <!-- Wiersz 1 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Prace serwisowe i diagnostyka</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">240 zł / h</span>
              </div>
              <div class="col-notes">
                <span>po gwarancji</span>
              </div>
            </div>

            <!-- Wiersz 2 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Dojazd</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">2,50 zł / km</span>
              </div>
              <div class="col-notes">
                <span>liczony w obie strony od siedziby firmy</span>
              </div>
            </div>

            <!-- Wiersz 3 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Diagnostyka zdalna</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">100 zł / 30 min</span>
              </div>
              <div class="col-notes">
                <span>za każde rozpoczęte 30 min</span>
              </div>
            </div>

            <!-- Wiersz 4 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Przegląd okresowy</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">240 zł / h</span>
              </div>
              <div class="col-notes">
                <span>+ dojazd; HMM-ST ok. 3–4 h</span>
              </div>
            </div>

            <!-- Wiersz 5 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Szkolenie podstawowe</span>
              </div>
              <div class="col-rate">
                <span class="chip-price chip-accent">w cenie</span>
              </div>
              <div class="col-notes">
                <span>przy uruchomieniu, do 3 h</span>
              </div>
            </div>

            <!-- Wiersz 6 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Szkolenie dodatkowe</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">240 zł / h</span>
              </div>
              <div class="col-notes">
                <span>zakres według potrzeb</span>
              </div>
            </div>

            <!-- Wiersz 7 -->
            <div class="cennik-row">
              <div class="col-service">
                <span class="row-service-name">Części i materiały</span>
              </div>
              <div class="col-rate">
                <span class="chip-price">wg wyceny</span>
              </div>
              <div class="col-notes">
                <span>po diagnozie</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Prawa kolumna: 3 karty informacyjne -->
        <div class="cennik-sidebar">
          <!-- Karta 1: Pobierz PDF -->
          <div class="sidebar-download-card card-base-dark">
            <h3 class="side-card-title">Zasady serwisu i cennik</h3>
            <p class="side-card-sub">Dokument PDF · pełne warunki</p>
            <a
              href="/do_pobrania/dokumentacja/CERTUS_Zasady_serwisu_i_cennik.pdf"
              target="_blank"
              download
              class="btn-certus-primary btn-pobierz"
            >
              Pobierz
            </a>
          </div>

          <!-- Karta 2: Przykład dojazdu -->
          <div class="sidebar-info-card card-base-white">
            <h4 class="side-info-title">Przykład: dojazd</h4>
            <p class="side-info-text">
              Klient 150 km od siedziby firmy: 2 × 150 km × 2,50 zł = <strong>750 zł netto</strong>.
            </p>
          </div>

          <!-- Karta 3: W okresie gwarancji -->
          <div class="sidebar-info-card card-base-white">
            <h4 class="side-info-title">W okresie gwarancji</h4>
            <div class="warranty-terms">
              <p>
                <strong class="text-free">Bez opłat:</strong> diagnostyka, prace serwisowe, części wymieniane w naprawie.
              </p>
              <p>
                <strong>Płatne:</strong> dojazd, materiały eksploatacyjne i części zużywające się (smar, chłodziwo, tulejki, paski).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       4. JAK ZGŁOSIĆ USTERKĘ
       =================================================================== -->
  <section class="section-pad">
    <div class="certus-container">
      <div class="section-header-block center-text">
        <h2 class="section-heading">Jak zgłosić usterkę</h2>
      </div>

      <div class="how-to-grid">
        <!-- Krok 1 -->
        <div class="how-to-card">
          <div class="how-to-top">
            <span class="how-to-step">1. Pobierz formularz</span>
          </div>
          <p class="how-to-desc">
            Formularz zgłoszenia usterki — z zakładki
            <a href="/dokumentacja" class="link-underlined">Dokumentacja</a>
            lub <a href="/do_pobrania/dokumentacja/CERTUS_Zgloszenie_usterki.pdf" target="_blank" download class="link-underlined">pobierz PDF</a>.
          </p>
        </div>

        <!-- Krok 2 -->
        <div class="how-to-card">
          <div class="how-to-top">
            <span class="how-to-step">2. Wyślij e-mailem</span>
          </div>
          <p class="how-to-desc">
            Na <a href="mailto:kontakt@mg-certus.pl" class="link-underlined">kontakt@mg-certus.pl</a> — ze zdjęciem lub filmem usterki.
          </p>
        </div>

        <!-- Krok 3 -->
        <div class="how-to-card">
          <div class="how-to-top">
            <span class="how-to-step">3. Oddzwonimy</span>
          </div>
          <p class="how-to-desc">
            Ustalimy termin wizyty lub diagnostyki zdalnej.
          </p>
        </div>

        <!-- Krok 4: Pilne / Zadzwoń -->
        <div class="how-to-card highlight-card">
          <div class="how-to-top">
            <span class="how-to-step text-urgent">Pilne? Zadzwoń</span>
          </div>
          <a href="tel:+48606324406" class="urgent-phone-link">+48 606 324 406</a>
          <span class="urgent-hours">pn–pt, 8–16</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       5. ZGŁOSZENIE SERWISOWE (Oryginalny komponent SerwisKontakt)
       =================================================================== -->
  <div id="zgloszenie-serwisowe">
    <SerwisKontakt />
  </div>
</div>

<style lang="scss">
  /* ===================================================================
     LOKALNE STYLE DLA PODSTRONY SERWIS
     =================================================================== */

  .serwis-page {
    width: 100%;
    overflow-x: clip;
    background-color: var(--color-bg-secondary, #f7f7f7);
    color: var(--color-text-primary, #333333);
  }

  .section-pad {
    padding-top: clamp(48px, 6vw, 80px);
    padding-bottom: clamp(48px, 6vw, 80px);
  }

  .section-pad-sm {
    padding-top: clamp(24px, 4vw, 44px);
    padding-bottom: clamp(24px, 4vw, 44px);
  }

  .center-text {
    text-align: center;
  }

  /* ===== 1. HERO STUDIO LOCAL ===== */
  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
  }

  .hero-text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 3;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 8px;
  }

  .hero-machine-col {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .hero-machine-stage {
    width: 100%;
    max-width: 630px; /* Powiększenie o 20% (wcześniej 520px) */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .hero-machine-render {
    width: 100%;
    height: auto;
    max-height: 545px;
    object-fit: contain;
    /* filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5)); */
    transform: translateY(14%) scale(1.3);
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 12%,
      rgba(0, 0, 0, 0.9) 28%,
      #000000 40%,
      #000000 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 12%,
      rgba(0, 0, 0, 0.9) 28%,
      #000000 40%,
      #00000087 100%
    );
    transition: transform 0.4s ease;

    &:hover {
      transform: translateY(14%) scale(1.32);
    }
  }

  /* ===== 2. PEŁNA OPIEKA PO ZAKUPIE ===== */
  .care-card {
    padding: clamp(32px, 5vw, 56px);
  }

  .care-header {
    margin-bottom: clamp(32px, 4vw, 48px);
  }

  .care-title {
    font-size: clamp(22px, 2.8vw, 32px);
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.25;
    margin: 0 0 10px 0;
    letter-spacing: -0.015em;
  }

  .care-sub {
    font-size: clamp(14px, 1.2vw, 16px);
    color: #666666;
    margin: 0;
    line-height: 1.6;
  }

  .service-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 4vw, 48px);
  }

  .service-item {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .service-thumb-box {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 12px;
    overflow: hidden;
    background: #e5e7eb;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  .service-title {
    margin: 0;
    font-size: clamp(17px, 1.8vw, 20px);
    font-weight: 700;
    color: #1a1a1a;
  }

  .service-desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: #555555;
  }

  /* ===== 3. CENNIK SERWISU ===== */
  .cennik-header-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
  }

  .cennik-main-title {
    font-family: 'Snasm', sans-serif;
    font-size: clamp(24px, 3.2vw, 36px);
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .cennik-date-note {
    font-size: 13px;
    color: #888888;
    font-weight: 500;
  }

  .cennik-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.95fr);
    gap: clamp(24px, 3vw, 36px);
    align-items: start;
  }

  /* Tabela lewa */
  .cennik-table-wrap {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #ebebeb;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .cennik-table-header {
    display: grid;
    grid-template-columns: 210px 140px minmax(0, 1fr);
    background: #232528;
    color: #ffffff;
    padding: 14px 22px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cennik-table-body {
    display: flex;
    flex-direction: column;
  }

  .cennik-row {
    display: grid;
    grid-template-columns: 210px 140px minmax(0, 1fr);
    padding: 16px 22px;
    border-bottom: 1px solid #eceef1;
    align-items: center;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fafbfa;
    }
  }

  .row-service-name {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .col-notes {
    font-size: 13px;
    color: #666666;
    line-height: 1.45;
  }

  /* Prawa kolumna cennika */
  .cennik-sidebar {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .sidebar-download-card {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .side-card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
  }

  .side-card-sub {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: #a0a6ad;
  }

  .btn-pobierz {
    padding: 10px 24px;
    font-size: 13px;
  }

  .sidebar-info-card {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .side-info-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .side-info-text {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: #555555;
  }

  .warranty-terms {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      margin: 0;
      font-size: 13px;
      line-height: 1.55;
      color: #555555;
    }

    .text-free {
      color: var(--color-primary-dark, #7e8c00);
    }
  }

  /* ===== 4. JAK ZGŁOSIĆ USTERKĘ ===== */
  .how-to-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 24px);
    margin-top: 32px;
  }

  .how-to-card {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #e6e8dc;
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: all 0.25s ease;

    &:hover {
      border-color: var(--color-primary, #96a500);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(150, 165, 0, 0.1);
    }

    &.highlight-card {
      border-top: 3px solid var(--color-primary, #96a500);
    }
  }

  .how-to-step {
    font-size: 16px;
    font-weight: 800;
    color: #1a1a1a;
  }

  .text-urgent {
    color: #1a1a1a;
  }

  .how-to-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: #666666;
  }

  .link-underlined {
    color: var(--color-primary-dark, #7e8c00);
    text-decoration: underline;

    &:hover {
      color: #4a5400;
    }
  }

  .urgent-phone-link {
    font-size: 17px;
    font-weight: 800;
    color: var(--color-primary-dark, #7e8c00);
    text-decoration: none;
    margin-top: 2px;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary, #96a500);
    }
  }

  .urgent-hours {
    font-size: 12px;
    color: #888888;
  }

  /* ===== 5. FORMULARZ ZGŁOSZENIA SERWISOWEGO ===== */
  .section-form-wrap {
    padding-bottom: clamp(60px, 8vw, 100px);
  }

  .service-ticket-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    gap: clamp(32px, 5vw, 64px);
    padding: clamp(32px, 5vw, 56px);
    align-items: start;
  }

  .ticket-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ticket-title {
    font-size: clamp(24px, 3.2vw, 34px);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .ticket-desc {
    font-size: 15px;
    line-height: 1.65;
    color: #b8bec4;
    margin: 0 0 16px 0;
  }

  .ticket-contacts {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ticket-contact-row {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-primary-light, #c5d418);
      transform: translateX(4px);
    }
  }

  .ticket-bar {
    width: 3px;
    height: 22px;
    background: var(--color-primary, #96a500);
    border-radius: 2px;
  }

  .ticket-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .form-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 12px;
      font-weight: 600;
      color: #b0b6bc;
      letter-spacing: 0.02em;
    }

    input,
    textarea {
      background: #1c1d1f;
      border: 1px solid #3e4247;
      border-radius: 8px;
      padding: 12px 14px;
      color: #ffffff;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--color-primary, #96a500);
        box-shadow: 0 0 0 2px rgba(150, 165, 0, 0.2);
        background: #232528;
      }

      &::placeholder {
        color: #656b73;
      }
    }

    textarea {
      resize: vertical;
      min-height: 90px;
    }
  }

  .form-action-row {
    margin-top: 6px;
  }

  .btn-submit-ticket {
    width: 100%;
    padding: 14px 28px;
    font-size: 15px;
    letter-spacing: 0.02em;
  }

  .form-feedback {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.45;

    &.feedback-ok {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
    }

    &.feedback-err {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid #ef4444;
      color: #f87171;
    }
  }

  /* ===================================================================
     RESPONSYWNOŚĆ (RWD) ZGODNIE ZE STRONĄ 2 MOCKUPU
     =================================================================== */

  @media (max-width: 992px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 36px;
    }

    .hero-machine-col {
      order: 2;
    }

    .hero-machine-render {
      transform: none;
      mask-image: none;
      -webkit-mask-image: none;

      &:hover {
        transform: scale(1.02);
      }
    }

    .service-cards-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .cennik-layout {
      grid-template-columns: 1fr;
    }

    .how-to-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .service-ticket-card {
      grid-template-columns: 1fr;
      gap: 36px;
    }
  }

  @media (max-width: 640px) {
    .cennik-table-header {
      display: none;
    }

    .cennik-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 16px 18px;

      .col-rate {
        margin: 4px 0;
      }
    }

    .how-to-grid {
      grid-template-columns: 1fr;
    }

    .form-grid-2 {
      grid-template-columns: 1fr;
    }

    .hero-actions {
      flex-direction: column;
      width: 100%;

      .btn-certus-primary,
      .btn-certus-outline {
        width: 100%;
        text-align: center;
      }
    }
  }
</style>

<script lang="ts">
  import { typoFixAction } from "$lib/utils/typography";
  import Section_Kontakt from "./sections/Section_Kontakt.svelte";

  function scrollToDetal() {
    const el = document.getElementById("kontakt-detal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<div class="onas-page no-sel">
  <!-- ===================================================================
       1. HERO STUDIO (Identyczna struktura, wysokość i światła jak HMP-G1 / C69)
       =================================================================== -->
  <div class="hmp-hero-wrapper">
    <!-- Tło ze zdjęciem studio -->
    <div class="hmp-hero-bg has-custom-lights" aria-hidden="true"></div>

    <!-- Element z obrazem maszyn w tle (hero-tlo-maszyny.webp) - NAD TŁEM -->
    <div class="hero-image-backdrop" aria-hidden="true">
      <img
        src="/assets/images/onas/hero-tlo-maszyny.webp"
        alt=""
        class="hero-backdrop-img"
        loading="eager"
      />
    </div>

    <!-- Dedykowana warstwa rozjaśnień na podłodze - NAD ZDJĘCIEM -->
    <div class="hmp-hero-lights" aria-hidden="true"></div>

    <section class="cx-wrap hmp-hero-section">
      <div class="hero-grid">
        <!-- Lewa kolumna: Treść (prawa strona pozostaje otwarta na tło z maszynami) -->
        <div class="hero-text-col">
          <span class="hero-pill-badge">Polski producent maszyn CNC</span>
          <h1 class="hero-h1">O NAS</h1>
          <p class="hero-lead" use:typoFixAction>
            Projektujemy i budujemy frezarki, plotery i centra obróbcze CNC w Choczni pod Wadowicami.
            Ten sam zespół konfiguruje maszynę, montuje ją, uruchamia u klienta i serwisuje.
          </p>

          <div class="hero-actions">
            <a href="/maszyny" class="btn-certus-primary">Zobacz maszyny</a>
            <button type="button" on:click={scrollToDetal} class="btn-certus-outline">Porozmawiajmy o detalu</button>
          </div>
        </div>
      </div>

      <!-- Pasek 4 KPI (klasy cx-kpi identyczne z HMP-G1 / C69) -->
      <div class="cx-kpi">
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">GWARANCJA</p>
          <p class="cx-kpi-value">12 miesięcy</p>
          <p class="cx-kpi-note">od dnia odbioru</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">KLIENCI</p>
          <p class="cx-kpi-value">500+ firm</p>
          <p class="cx-kpi-note">w całej Polsce</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">PROJEKT I MONTAŻ</p>
          <p class="cx-kpi-value">100% Polska</p>
          <p class="cx-kpi-note">Małopolska</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">SERWIS</p>
          <p class="cx-kpi-value">Producenta</p>
          <p class="cx-kpi-note">gwarancyjny i pogwarancyjny</p>
        </div>
      </div>
    </section>

    <!-- Ukośne ścięcie Hero przechodzące w tło (identycznie jak cx-cut na HMP-G1 / C69) -->
    <div class="cx-cut" aria-hidden="true"></div>
  </div>

  <!-- ===================================================================
       2. KIM JESTEŚMY
       =================================================================== -->
  <section class="section-pad">
    <div class="certus-container">
      <div class="split-grid">
        <div class="split-text">
          <span class="section-pretitle">K I M &nbsp; J E S T E Ś M Y</span>
          <h2 class="section-heading" use:typoFixAction>Od kompaktowego centrum po produkcję wielozmianową.</h2>
          <div class="prose-paragraphs">
            <p use:typoFixAction>
              CERTUS to marka firmy MG-CERTUS. Robimy maszyny od kompaktowych centrów do małych warsztatów po
              plotery i frezarki do produkcji wielozmianowej, a także maszyny specjalne pod konkretny proces.
            </p>
            <p use:typoFixAction>
              Modernizujemy też maszyny innych producentów.
            </p>
          </div>
        </div>

        <div class="split-media">
          <div class="media-frame">
            <img
              src="/assets/images/onas/onas-kim-jestesmy.webp"
              alt="Linia maszyn i centrów obróbczych CERTUS w hali produkcyjnej"
              class="rounded-media-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       3. SKĄD SIĘ WZIĘLIŚMY (Doświadczenie z warsztatu)
       =================================================================== -->
  <section class="section-pad-sm">
    <div class="certus-container">
      <div class="card-base-dark bio-card">
        <div class="bio-grid">
          <!-- Lewa strona: Karta z rokiem i siatką techniczną CAD -->
          <div class="bio-visual-box">
            <div class="bio-grid-pattern"></div>
            <div class="bio-stat-badge">
              <span class="stat-year">2000</span>
              <span class="stat-divider"></span>
              <span class="stat-year-label">ROK WEJŚCIA W BRANŻĘ CNC</span>
            </div>
          </div>

          <!-- Prawa strona: Treść i 3 filary z zielonymi akcentami -->
          <div class="bio-info-col">
            <span class="section-pretitle section-pretitle-light">SKĄD SIĘ WZIĘLIŚMY</span>
            <h2 class="section-heading section-heading-white bio-title" use:typoFixAction>
              Doświadczenie<br />z&nbsp;warsztatu,<br />nie z&nbsp;katalogu.
            </h2>

            <p class="bio-desc" use:typoFixAction>
              Założyciel CERTUS działa na rynku CNC od 2000 roku i był jednym z liderów Forum CNC – społeczności, która przez lata kształtowała polską branżę obrabiarek. To doświadczenie stoi dziś za każdą maszyną, którą projektujemy i montujemy.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       4. JAK PRACUJEMY (4 etapy procesu)
       =================================================================== -->
  <section class="section-pad section-process-wrap">
    <div class="certus-container">
      <div class="section-header-block">
        <span class="section-pretitle">J A K &nbsp; P R A C U J E M Y</span>
        <h2 class="section-heading" use:typoFixAction>Od rozmowy o detalu do serwisu – jeden zespół.</h2>
      </div>

      <div class="process-grid-4">
        <div class="card-proc-step">
          <span class="step-num">01</span>
          <h3 class="step-title">Dobór konfiguracji</h3>
          <p class="step-desc" use:typoFixAction>
            Zaczynamy od detalu: materiał, wymiary, dokładność. Dobieramy model, pole robocze, stół, wrzeciono i ATC. Gdy standard nie wystarczy, projektujemy maszynę specjalną.
          </p>
        </div>

        <div class="card-proc-step">
          <span class="step-num">02</span>
          <h3 class="step-title">Projekt i montaż</h3>
          <p class="step-desc" use:typoFixAction>
            Projektujemy i montujemy u siebie. Części zamienne mamy na miejscu.
          </p>
        </div>

        <div class="card-proc-step">
          <span class="step-num">03</span>
          <h3 class="step-title">Uruchomienie</h3>
          <p class="step-desc" use:typoFixAction>
            Uruchamiamy maszynę u klienta i szkolimy operatora. Szkolenie podstawowe jest w cenie maszyny.
          </p>
        </div>

        <div class="card-proc-step">
          <span class="step-num">04</span>
          <h3 class="step-title">Serwis producenta</h3>
          <p class="step-desc" use:typoFixAction>
            12 miesięcy gwarancji, potem serwis pogwarancyjny, przeglądy i modernizacje.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       5. Z CZEGO BUDUJEMY
       =================================================================== -->
  <section class="section-pad">
    <div class="certus-container">
      <div class="components-wrap card-base-white">
        <!-- Góra: tekst + zdjęcie -->
        <div class="split-grid split-grid-middle">
          <div class="split-text">
            <span class="section-pretitle">Z &nbsp; C Z E G O &nbsp; B U D U J E M Y</span>
            <h2 class="section-heading" use:typoFixAction>Sprawdzone komponenty.</h2>
            <p class="section-desc" use:typoFixAction>
              Prowadnice liniowe i śruby kulowe na osiach, serwonapędy i sterowanie PikoCNC z polskim interfejsem.
              Konstrukcje projektujemy pod wieloletnią eksploatację w produkcji wielozmianowej.
            </p>
          </div>

          <div class="split-media">
            <div class="media-frame">
              <img
                src="/assets/images/onas/onas-z-czego-budujemy.webp"
                alt="Wrzeciono i układ prowadnic liniowych oraz śrub kulowych CERTUS"
                class="rounded-media-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Dół: Pas 4 komponentów z pionowymi separatorami -->
        <div class="components-strip">
          <div class="comp-col">
            <h4 class="comp-name">Prowadnice liniowe</h4>
            <span class="comp-sub">prowadzenie osi</span>
          </div>

          <div class="comp-col">
            <h4 class="comp-name">Śruby kulowe</h4>
            <span class="comp-sub">napęd osi</span>
          </div>

          <div class="comp-col">
            <h4 class="comp-name">Serwonapędy</h4>
            <span class="comp-sub">pozycjonowanie w pętli zamkniętej</span>
          </div>

          <div class="comp-col">
            <h4 class="comp-name">PikoCNC</h4>
            <span class="comp-sub">sterowanie z polskim interfejsem</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       6. GDZIE PRACUJĄ NASZE MASZYNY (Branże)
       =================================================================== -->
  <section class="section-pad-sm">
    <div class="certus-container">
      <div class="section-header-block">
        <span class="section-pretitle">G D Z I E &nbsp; P R A C U J Ą &nbsp; N A S Z E &nbsp; M A S Z Y N Y</span>
        <h2 class="section-heading" use:typoFixAction>Branże naszych klientów – i wiele innych.</h2>
      </div>

      <div class="industries-grid-6">
        <!-- 1. Jubilerstwo -->
        <div class="industry-tile">
          <div class="tile-img-box">
            <img src="/assets/images/onas/branze/jubilerstwo.webp" alt="Obróbka CNC w jubilerstwie" loading="lazy" />
          </div>
          <span class="tile-label">Jubilerstwo</span>
        </div>

        <!-- 2. Mechanika precyzyjna -->
        <div class="industry-tile">
          <div class="tile-img-box">
            <img src="/assets/images/onas/branze/mechanika-precyzyjna.webp" alt="Mechanika precyzyjna części CNC" loading="lazy" />
          </div>
          <span class="tile-label">Mechanika precyzyjna</span>
        </div>

        <!-- 3. Obróbka aluminium -->
        <div class="industry-tile">
          <div class="tile-img-box">
            <img src="/assets/images/onas/branze/obrobka-aluminium.webp" alt="Precyzyjna obróbka aluminium" loading="lazy" />
          </div>
          <span class="tile-label">Obróbka aluminium</span>
        </div>

        <!-- 4. Stolarstwo i meble -->
        <div class="industry-tile">
          <div class="tile-img-box">
            <img src="/assets/images/onas/branze/stolarstwo-i-meble.webp" alt="Stolarstwo i meble formowanie CNC" loading="lazy" />
          </div>
          <span class="tile-label">Stolarstwo i meble</span>
        </div>

        <!-- 5. Przemysł tekstylny -->
        <div class="industry-tile">
          <div class="tile-img-box">
            <img src="/assets/images/onas/branze/przemysl-tekstylny.webp" alt="Cięcie CNC w przemyśle tekstylnym" loading="lazy" />
          </div>
          <span class="tile-label">Przemysł tekstylny</span>
        </div>

        <!-- 6. Karta "+" -->
        <div class="industry-plus-card">
          <span class="plus-sign">+</span>
          <p class="plus-text" use:typoFixAction>obróbka kamienia,<br />produkcja okularów<br />i wiele innych</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       7. CO BUDUJEMY (Maszyny CERTUS)
       =================================================================== -->
  <section class="section-pad">
    <div class="certus-container">
      <div class="machines-showcase-box card-base-white">
        <div class="section-header-block">
          <span class="section-pretitle">C O &nbsp; B U D U J E M Y</span>
          <h2 class="section-heading" use:typoFixAction>Od kompaktowego centrum po maszyny specjalne.</h2>
        </div>

        <div class="machines-grid-4">
          <!-- 1. HMP-G1 -->
          <a href="/hmp-g1/" class="machine-card">
            <div class="machine-thumb-wrap">
              <img src="/assets/images/onas/maszyny/hmp-g1.webp" alt="CERTUS HMP-G1" loading="lazy" />
            </div>
            <div class="machine-info">
              <h3 class="machine-name">HMP-G1</h3>
              <p class="machine-sub">kompaktowe centrum frezarskie</p>
            </div>
          </a>

          <!-- 2. CERTUS 69 -->
          <a href="/bestseller" class="machine-card">
            <div class="machine-thumb-wrap">
              <img src="/assets/images/onas/maszyny/certus-69.webp" alt="CERTUS 69" loading="lazy" />
            </div>
            <div class="machine-info">
              <h3 class="machine-name">CERTUS 69</h3>
              <p class="machine-sub">PRO-L i PRO-R, ATC 6 lub 10 poz.</p>
            </div>
          </a>

          <!-- 3. HMM-ST / HMM-GT -->
          <a href="/maszyny/#frezarki" class="machine-card">
            <div class="machine-thumb-wrap">
              <img src="/assets/images/onas/maszyny/hmm-st-gt.webp" alt="CERTUS HMM-ST / HMM-GT" loading="lazy" />
            </div>
            <div class="machine-info">
              <h3 class="machine-name">HMM-ST / HMM-GT</h3>
              <p class="machine-sub">frezarki – kinematyka stołowa i bramowa</p>
            </div>
          </a>

          <!-- 4. HPP-OT / HPP-CT -->
          <a href="/maszyny/#ploteryPrzemyslowe" class="machine-card">
            <div class="machine-thumb-wrap">
              <img src="/assets/images/onas/maszyny/hpp-ot-ct.webp" alt="CERTUS HPP-OT / HPP-CT" loading="lazy" />
            </div>
            <div class="machine-info">
              <h3 class="machine-name">HPP-OT / HPP-CT</h3>
              <p class="machine-sub">plotery przemysłowe, otwarte i w zabudowie</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       8. DETAL DO OBRÓBKI (Oryginalny komponent Section_Kontakt)
       =================================================================== -->
  <section class="onas-contact-wrapper" id="kontakt-detal">
    <Section_Kontakt
      customTitle="Masz detal do obróbki? Zacznijmy od niego."
      customSubtitle="Opisz materiał, wymiary i wymaganą dokładność. Dobierzemy maszynę i konfigurację – albo powiemy wprost, że standard nie wystarczy i trzeba maszyny specjalnej."
    />
  </section>
</div>

<style lang="scss">
  /* ===================================================================
     LOKALNE STYLE DEDYKOWANE DLA PODSTRONY O NAS
     Wykorzystują klasy bazowe z src/lib/styles/shared-components.scss
     =================================================================== */

  .onas-page {
    width: 100%;
    overflow-x: clip;
    background-color: var(--color-bg-secondary, #f7f7f7);
    color: var(--color-text-primary, #333333);
  }

  .onas-contact-wrapper :global(.contact-left:before) {
    display: none !important;
  }

  .section-pad {
    padding-top: clamp(48px, 6vw, 80px);
    padding-bottom: clamp(48px, 6vw, 80px);
  }

  .section-pad-sm {
    padding-top: clamp(24px, 4vw, 40px);
    padding-bottom: clamp(24px, 4vw, 40px);
  }

  .section-header-block {
    margin-bottom: clamp(28px, 4vw, 40px);
  }

  /* ===== 1. HERO LOCAL OVERRIDES ===== */
  /* Element z obrazem maszyn w tle (hero-tlo-maszyny.webp) */
  .hero-image-backdrop {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    overflow: hidden;

    .hero-backdrop-img {
      position: absolute;
      right: clamp(-20px, 0vw, 15px);
      bottom: clamp(236px, 4.8vw, 248px);
      width: clamp(680px, 60vw, 1120px);
      height: auto;
      max-height: 480px;
      -o-object-fit: contain;
      object-fit: contain;
      /* filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5)); */
      transform: translateY(14%) scale(1);
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
        rgba(0, 0, 0, 0.5294117647) 100%
      );
      transition: transform 0.4s ease;
      z-index: 12;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (max-width: 900px) {
      .hero-backdrop-img {
        right: 50%;
        transform: translateX(50%) scale(1);
        bottom: 90px;
        width: 92%;
        max-width: 540px;
        height: auto;
        opacity: 0.25;
        mask-image: linear-gradient(to top, transparent 0%, #000 25%, #000 75%, transparent 100%);
        -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 25%, #000 75%, transparent 100%);
      }
    }
  }

  .hero-grid {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 340px;
    position: relative;
    z-index: 3;
  }

  .hero-text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 580px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 8px;
  }

  /* ===== 2. SPLIT LAYOUT (KIM JESTEŚMY / Z CZEGO BUDUJEMY) ===== */
  .split-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 56px);
    align-items: center;
  }

  .split-grid-middle {
    align-items: center;
  }

  .prose-paragraphs {
    display: flex;
    flex-direction: column;
    gap: 16px;

    p {
      margin: 0;
      font-size: clamp(14px, 1.2vw, 15px);
      line-height: 1.68;
      color: #555555;
    }
  }

  .media-frame {
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    background: #e6e8eb;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }

  .rounded-media-img {
    width: 100%;
    height: 100%;
    max-height: 420px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  /* ===== 3. SKĄD SIĘ WZIĘLIŚMY ===== */
  .bio-card {
    padding: clamp(28px, 4vw, 52px);
  }

  .bio-grid {
    display: grid;
    grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
    gap: clamp(32px, 4.5vw, 60px);
    align-items: center;
  }

  .bio-visual-box {
    position: relative;
    background-color: #161719;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1 / 1;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .bio-grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    background-position: center center;
    pointer-events: none;
  }

  .bio-stat-badge {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
  }

  .stat-year {
    font-family: 'Snasm', sans-serif;
    font-style: italic;
    font-size: clamp(62px, 7vw, 92px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  .stat-divider {
    width: 44px;
    height: 3px;
    background: var(--color-primary-light, #c5d418);
    border-radius: 2px;
    margin: 16px 0 14px 0;
  }

  .stat-year-label {
    font-size: clamp(10px, 0.95vw, 11px);
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-primary-light, #c5d418);
    text-align: center;
  }

  .bio-title {
    margin: 0 0 18px 0;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  .bio-desc {
    font-size: clamp(14px, 1.15vw, 15px);
    line-height: 1.65;
    color: #b0b6be;
    margin: 0 0 32px 0;
    max-width: 620px;
  }

  .bio-features-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(14px, 2.2vw, 24px);
  }

  .bio-feature-item {
    display: flex;
    align-items: stretch;
    gap: 12px;
  }

  .bio-feature-bar {
    width: 3px;
    background: var(--color-primary-light, #c5d418);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .bio-feature-text {
    display: flex;
    flex-direction: column;
  }

  .bio-feature-title {
    font-size: clamp(15px, 1.15vw, 16px);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.25;
  }

  .bio-feature-sub {
    font-size: 13px;
    color: #8c929a;
    line-height: 1.35;
    margin-top: 4px;
  }

  /* ===== 4. JAK PRACUJEMY ===== */
  .section-process-wrap {
    background: #eef0f3;
  }

  .process-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 24px);
  }

  /* ===== 5. Z CZEGO BUDUJEMY ===== */
  .components-wrap {
    display: flex;
    flex-direction: column;
    gap: clamp(32px, 4vw, 44px);
  }

  .components-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border: 1px solid #e8eae6;
    border-radius: 12px;
    background: #fafbfa;
    overflow: hidden;
  }

  .comp-col {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-right: 1px solid #e8eae6;

    &:last-child {
      border-right: none;
    }
  }

  .comp-name {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .comp-sub {
    font-size: 13px;
    color: #666666;
    line-height: 1.4;
  }

  /* ===== 6. BRANŻE (6 KAFELKÓW) ===== */
  .industries-grid-6 {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: clamp(12px, 1.8vw, 20px);
  }

  .industry-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .tile-img-box {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 14px;
    overflow: hidden;
    background: #e8e8e8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }

    &:hover img {
      transform: scale(1.06);
    }
  }

  .tile-label {
    font-size: 13px;
    font-weight: 700;
    color: #333333;
    line-height: 1.3;
  }

  .industry-plus-card {
    background: #232528;
    color: #ffffff;
    border-radius: 14px;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: clamp(14px, 2vw, 20px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  .plus-sign {
    font-size: 26px;
    font-weight: 800;
    color: var(--color-primary, #96a500);
    line-height: 1;
    margin-bottom: 8px;
  }

  .plus-text {
    margin: 0;
    font-size: 12px;
    line-height: 1.45;
    color: #c5cbd1;
  }

  /* ===== 7. CO BUDUJEMY (MASZYNY) ===== */
  .machines-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 24px);
  }

  .machine-card {
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #ebebeb;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
      border-color: var(--color-primary, #96a500);

      .machine-thumb-wrap img {
        transform: scale(1.05);
      }
    }
  }

  .machine-thumb-wrap {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: #191b1d;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 12px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.35s ease;
    }
  }

  .machine-info {
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .machine-name {
    margin: 0;
    font-size: 16px;
    font-weight: 800;
    color: #1a1a1a;
  }

  .machine-sub {
    margin: 0;
    font-size: 12px;
    color: #666666;
    line-height: 1.4;
  }

  /* ===== 8. DETAL DO OBRÓBKI (DOLNE CTA) ===== */
  .cta-detail-card {
    position: relative;
    overflow: hidden;
    padding: clamp(32px, 5vw, 56px);
  }

  .cta-watermark {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 55%;
    opacity: 0.12;
    pointer-events: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
    }
  }

  .cta-content-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
  }

  .cta-title {
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.25;
    margin: 0 0 16px 0;
  }

  .cta-desc {
    font-size: clamp(14px, 1.2vw, 15px);
    line-height: 1.65;
    color: #bcc2c8;
    margin: 0;
    max-width: 540px;
  }

  .cta-contacts-side {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .contact-link-row {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: #ffffff;
    font-size: clamp(15px, 1.5vw, 18px);
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-primary-light, #c5d418);
      transform: translateX(4px);
    }
  }

  .contact-bar {
    width: 3px;
    height: 24px;
    background: var(--color-primary, #96a500);
    border-radius: 2px;
  }

  .contact-val {
    letter-spacing: -0.01em;
  }

  /* ===================================================================
     RESPONSYWNOŚĆ (RWD) ZGODNIE ZE STRONĄ 2 MOCKUPU
     =================================================================== */

  @media (max-width: 992px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 36px;
    }

    .split-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .bio-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .bio-visual-box {
      aspect-ratio: auto;
      min-height: 220px;
      padding: clamp(36px, 6vw, 48px) 20px;
    }

    .process-grid-4 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .components-strip {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      .comp-col:nth-child(2) {
        border-right: none;
      }

      .comp-col:nth-child(1),
      .comp-col:nth-child(2) {
        border-bottom: 1px solid #e8eae6;
      }
    }

    .industries-grid-6 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .machines-grid-4 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .cta-content-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  @media (max-width: 768px) {
    .bio-features-row {
      grid-template-columns: 1fr;
      gap: 18px;
    }
  }

  @media (max-width: 640px) {
    .hero-platform-stage {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 50px 100%, 0 calc(100% - 50px));

      &::after {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50px 100%, 0 calc(100% - 50px));
      }
    }

    .process-grid-4 {
      grid-template-columns: 1fr;
    }

    .components-strip {
      grid-template-columns: 1fr;

      .comp-col {
        border-right: none !important;
        border-bottom: 1px solid #e8eae6;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .industries-grid-6 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .machines-grid-4 {
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

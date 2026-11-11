<script lang="ts">
  import CtaButton from "./CtaButton.svelte";
  import OfertaGrid from "./OfertaGrid.svelte";
  import Section_Maszyny_Video from "./sections/Section_Maszyny_Video.svelte";
  import Section_Maszyny_Image02 from "./sections/Section_Maszyny_Image02.svelte";
  import { typoFixAction } from "$lib/utils/typography";

  import Maszyny_table_frezarki_GT_ST from "./tables/Maszyny_table_frezarki_GT_ST.svelte";
  import Maszyny_table_ploteryPrzemyslowe_CT_OT from "./tables/Maszyny_table_plotery_przemyslowe_CT_OT.svelte";
  import Maszyny_table_ploteryLinearne from "./tables/Maszyny_table_ploteryLinearne.svelte";
  import Maszyny_table_grawerki from "./tables/Maszyny_table_grawerki.svelte";
  import Maszyny_table_frezarki5osiowe from "./tables/Maszyny_table_frezarki5osiowe.svelte";

  import MachineMenu from "./MachineMenu.svelte";
  import MachineTitleSvg from "$lib/components/MachineTitleSvg.svelte";
  import "$lib/table.scss";

  // Gallery Imports
  import Gallery from "$lib/components/Gallery.svelte";
  import { galleryData } from "$lib/data/galleryData";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  // Gallery State
  let isGalleryOpen: boolean = false;
  let currentGalleryImages: Array<{ src: string; title: string; alt: string }> = [];

  const maszyny = [];

  function openGallery(categoryId: string) {
    const galleryEntry = galleryData.find(g => g.id === categoryId);
    if (galleryEntry) {
      currentGalleryImages = galleryEntry.images;
      isGalleryOpen = true;
    } else {
      console.warn(`Gallery data not found for category ID: ${categoryId}`);
    }
  }

  function closeGallery() {
    isGalleryOpen = false;
    currentGalleryImages = [];
  }

  // Desktop: 1 poziom rozwijania szczegółów (domyślnie pierwsza otwarta, reszta zwinięta)
  let desktopExpanded: Record<string, boolean> = {
    frezarki: true,
    "frezarki-gt": false,
    ploteryPrzemyslowe: false,
    ploteryPrzemysloweZabudowa: false,
    grawerki: false,
    frezarki5osiowe: false,
    ploteryLinearne: false
  };

  // Mobile: Poziom 1 (rozwijanie samej maszyny)
  let mobileMachineExpanded: Record<string, boolean> = {
    frezarki: true,
    "frezarki-gt": false,
    ploteryPrzemyslowe: false,
    ploteryPrzemysloweZabudowa: false,
    grawerki: false,
    frezarki5osiowe: false,
    ploteryLinearne: false
  };

  // Mobile: Poziom 2 (rozwijanie szczegółowych parametrów wewnątrz maszyny)
  let mobileDetailsExpanded: Record<string, boolean> = {
    frezarki: false,
    "frezarki-gt": false,
    ploteryPrzemyslowe: false,
    ploteryPrzemysloweZabudowa: false,
    grawerki: false,
    frezarki5osiowe: false,
    ploteryLinearne: false
  };

  function toggleDesktop(id: string) {
    desktopExpanded = { ...desktopExpanded, [id]: !desktopExpanded[id] };
  }

  function toggleMobileMachine(id: string) {
    mobileMachineExpanded = { ...mobileMachineExpanded, [id]: !mobileMachineExpanded[id] };
  }

  function toggleMobileDetails(id: string) {
    mobileDetailsExpanded = { ...mobileDetailsExpanded, [id]: !mobileDetailsExpanded[id] };
  }

  function toggleSpecs(id: string) {
    const isNowOpen = !(desktopExpanded[id] || mobileDetailsExpanded[id]);
    desktopExpanded = { ...desktopExpanded, [id]: isNowOpen };
    mobileDetailsExpanded = { ...mobileDetailsExpanded, [id]: isNowOpen };
  }

  function handleHashOpen(hash: string) {
    const cleanId = hash.replace("#", "");
    if (cleanId && desktopExpanded[cleanId] !== undefined) {
      desktopExpanded = { ...desktopExpanded, [cleanId]: true };
      mobileMachineExpanded = { ...mobileMachineExpanded, [cleanId]: true };
      mobileDetailsExpanded = { ...mobileDetailsExpanded, [cleanId]: true };
    }
  }

  onMount(() => {
    if (browser) {
      if (window.location.hash) {
        handleHashOpen(window.location.hash);
      }
      window.addEventListener("hashchange", () => {
        handleHashOpen(window.location.hash);
      });
    }
  });
</script>


<section class="maszyny_page gradientHero_old">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="maszyny" class="maszyny">
  <div class="maszyny-container container">
    <div class="section-header">
      <h1 class="no-sel">Centra obróbcze, frezarki i plotery przemysłowe CNC</h1>
      <hr />
    </div>
  </div>
  <OfertaGrid variant="maszyny" />
</section>

<!-- Frezarka CNC HMM-ST -->
<section id="frezarki" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('frezarki')}
      aria-expanded={mobileMachineExpanded['frezarki']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Frezarka CNC HMM-ST</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['frezarki'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['frezarki']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['frezarki']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC HMM-ST" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Frezarka z ruchomym stołem</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        Zaprojektowana z myślą o szybkim i precyzyjnym frezowaniu materiałów takich jak stal, aluminium, drewno, tworzywa sztuczne i inne.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('frezarki')}
          aria-expanded={desktopExpanded['frezarki'] || mobileDetailsExpanded['frezarki']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['frezarki'] || mobileDetailsExpanded['frezarki']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.webp" alt="Frezarka CNC HMM-ST" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['frezarki']}
      class:mobile-l2-closed={!mobileDetailsExpanded['frezarki']}
    >
      <div class="maszyny-dane-text-image" use:typoFixAction>
    <div class="left">

      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Produkcję form wtryskowych i tłoczników</li>
        <li use:typoFixAction>
          Obróbkę modeli odlewniczych i termoformowanych
        </li>
        <li use:typoFixAction>
          Wykonywanie stempli, matryc oraz wykrojników ze stali i aluminium
        </li>
        <li use:typoFixAction>
          Precyzyjne grawerowanie i wiele innych procesów przemysłowych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i ergonomia:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Panel sterujący w formie wolnostojącej konsoli pozwala na elastyczne
          rozmieszczenie stanowiska pracy, zwiększając komfort obsługi i
          bezpieczeństwo operatora
        </li>
        <li use:typoFixAction>
          Konsola zawiera m.in.: przyciski sterujące (Start, Stop, Pauza,
          Reset), komputer przemysłowy, monitor, klawiaturę i mysz
        </li>
        <li use:typoFixAction>
          Interfejs użytkownika oraz oprogramowanie dostępne są w języku polskim
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i bezpieczeństwo pracy:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Zamknięta, w pełni zabudowana konstrukcja maszyny umożliwia efektywne
          chłodzenie narzędzi oraz obrabianego materiału
        </li>
        <li use:typoFixAction>
          Wbudowany układ chłodzenia składa się ze zbiornika, odstojnika oraz
          pompy, co zapewnia stabilną pracę i ochronę komponentów
        </li>
        <li use:typoFixAction>
          Elementy prowadzące, takie jak prowadnice liniowe oraz śruby kulowe,
          są zabezpieczone trwałymi osłonami stalowymi, chroniąc je przed
          zanieczyszczeniami i wydłużając ich żywotność
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Wyposażenie i napęd:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Opcjonalnie: automatyczna wymiana narzędzi z magazynem rewolwerowym
        </li>
        <li use:typoFixAction>
          Napęd realizowany jest przez Serwonapędy Hybrydowe lub Serwa AC (w
          zależności od konfiguracji), zapewniając wysoką precyzję i jakość
          obróbki
        </li>
        <li use:typoFixAction>
          Komunikacja z maszyną odbywa się poprzez złącze LAN, co ułatwia
          integrację z siecią zakładową
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Cechy charakterystyczne serii HMM-ST:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Wysoka sztywność konstrukcji</li>
        <li use:typoFixAction>
          Dokładność i powtarzalność pracy w swojej klasie
        </li>
        <li use:typoFixAction>
          Intuicyjna obsługa i wsparcie w języku polskim
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_1.webp"
        alt="Schemat techniczny frezarki Certus 1080 PRO - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_2.webp"
        alt="Schemat techniczny frezarki Certus 1080 PRO - widok 2"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki_GT_ST type="ST" />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
     <!--  <Section_Maszyny_Image01
        sectionId="frezarki-image-01"
        imgSrc="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.webp"
        title="Frezarki CNC HMM-ST"
        subtitle="Precyzyjne obróbki skrawaniem"
      /> -->

      <Section_Maszyny_Image02
        sectionId="frezarki-gallery"
        imgSrc="/assets/maszyny/galeria/webp/frezarka-hmm-st-1080-07.webp"
        title="Galeria realizacji"
        subtitle="Zobacz nasze frezarki w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("frezarki-st")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_HMM-ST.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Frezarka CNC HMM-GT -->
<section id="frezarki-gt" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('frezarki-gt')}
      aria-expanded={mobileMachineExpanded['frezarki-gt']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Frezarka CNC HMM-GT</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['frezarki-gt'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['frezarki-gt']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['frezarki-gt']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC HMM-GT" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Frezarka z ruchomą bramą</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        Do dużych formatów i ciężkich detali — detal stoi, pracuje brama. HMM‑GT
        zaprojektowano do szybkieji precyzyjnej obróbki arkuszy oraz elementów
        o dużej masie i gabarytach. Doskonale sprawdza się w aluminium i jego
        stopach, kompozytach, tworzywach, drewnie oraz — w odpowiedniej
        konfiguracji wrzeciona — w wybranych stalach.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('frezarki-gt')}
          aria-expanded={desktopExpanded['frezarki-gt'] || mobileDetailsExpanded['frezarki-gt']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['frezarki-gt'] || mobileDetailsExpanded['frezarki-gt']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.webp" alt="Frezarki CNC HMM-G" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['frezarki-gt']}
      class:mobile-l2-closed={!mobileDetailsExpanded['frezarki-gt']}
    >
      <div class="maszyny-dane-text-image">
    <div class="left">


      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zastosowanie maszyn obejmuje m.in.:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Modele i formy (odlewnicze, termoformujące, laminaty)
        </li>
        <li use:typoFixAction>
          Panele, płyty i profile długie (meblarstwo, signage, automotive)
        </li>
        <li use:typoFixAction>
          Matryce, wykrojniki, przyrządy, prototypy i serie krótkie
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i ergonomia:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Stół stały — łatwy załadunek z palety, wózka lub żurawia; brak
          bezwładności detalu = lepsza jakość krawędzi i dokładność wymiarowa.
        </li>
        <li use:typoFixAction>
          Brama przejezdna o wysokiej sztywności; napędy tandemowe osi Y
          umożliwiają duże pola robocze bez zwiększania masy ruchomego stołu.
        </li>
        <li use:typoFixAction>
          Stół segmentowy: T-rowkowy (opcjonalnie stalowa nakładka) lub podciśnieniowy; opcja przelotu dla elementów dłuższych niż pole pracy.
        </li>
        <li use:typoFixAction>
          Konsola sterownicza wolnostojąca; interfejs i wsparcie w języku
          polskim.
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i bezpieczeństwo pracy:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Zabudowa z odciągiem wiórów/pyłów; czysta i bezpieczna strefa pracy.
        </li>
        <li use:typoFixAction>
          Zintegrowane chłodzenie (zbiornik, odstojnik, pompa) dla stabilności
          procesu i ochrony komponentów.
        </li>
        <li use:typoFixAction>
          Osłony prowadnic i śrub kulowych — dłuższa żywotność i powtarzalność.
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Wyposażenie i napęd:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Opcjonalnie: automatyczna wymiana narzędzi z magazynem rewolwerowym.
        </li>
        <li use:typoFixAction>
          Serwonapędy hybrydowe lub AC (wg konfiguracji). Oś Y napędzana tandemowo – brama na dwóch śrubach kulowych.
        </li>
        <li use:typoFixAction>
          Komunikacja LAN — łatwa integracja z siecią zakładową i systemami CAM.
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1410_1.webp"
        alt="Schemat techniczny frezarki Certus CNC HMM-GT 1410 - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1410_2.webp"
        alt="Schemat techniczny frezarki Certus CNC HMM-GT 1410 - widok 2"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki_GT_ST type="GT" />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image02
        sectionId="frezarki-gt-gallery"
        imgSrc="/assets/maszyny/galeria/webp/frezarka-hmm-gt-02.webp"
        title="Galeria realizacji"
        subtitle="Zobacz nasze frezarki w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("frezarki-gt")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_HMM-GT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Ploter CNC HPP-OT -->
<section id="ploteryPrzemyslowe" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('ploteryPrzemyslowe')}
      aria-expanded={mobileMachineExpanded['ploteryPrzemyslowe']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Ploter CNC HPP-OT</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['ploteryPrzemyslowe'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['ploteryPrzemyslowe']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['ploteryPrzemyslowe']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC HPP-OT" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Wielkoformatowy ploter przemysłowy bez zabudowy</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        Wielkoformatowe centrum obróbcze CNC stanowiące wysokowydajną
        platformę przeznaczoną do skrawania w co najmniej trzech osiach, z możliwością
        rozbudowy o dodatkowe osie sterowane. Frezowanie, wiercenie, gwintowanie i cięcie, a na zamówienie – z dodatkowym wyposażeniem – także toczenie (4. oś), bigowanie i dozowanie.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('ploteryPrzemyslowe')}
          aria-expanded={desktopExpanded['ploteryPrzemyslowe'] || mobileDetailsExpanded['ploteryPrzemyslowe']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['ploteryPrzemyslowe'] || mobileDetailsExpanded['ploteryPrzemyslowe']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_0816_Layers/Certus_0816_Layer1.webp" alt="Przemysłowe plotery CNC ploter przemysłowy bez zabudowy – HPP-OT" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['ploteryPrzemyslowe']}
      class:mobile-l2-closed={!mobileDetailsExpanded['ploteryPrzemyslowe']}
    >
      <div class="maszyny-dane-text-image">

      <div class="left">


      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i precyzja:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Bazują na sprawdzonych rozwiązaniach ploterów przemysłowych, oferując
          m.in. konstrukcję bramową z obustronnym napędem serwonapędami oraz
          elektroniczną kompensację odchyłek bramy, co przekłada się na
          wyjątkową dokładność i stabilność pracy
        </li>
        <li use:typoFixAction>
          Wzmocniona, zwarta konstrukcja zapewnia znacznie wyższą sztywność niż
          klasyczne plotery, umożliwiając obróbkę trudniejszych materiałów z
          zachowaniem wysokiej precyzji
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zakres zastosowań:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          W zależności od konfiguracji i wyposażenia, urządzenia te mogą
          obrabiać szeroką gamę materiałów – od tworzyw sztucznych i kompozytów,
          przez metale nieżelazne (aluminium, mosiądz), aż po blachy stalowe
        </li>
        <li use:typoFixAction>
          Do cięższych zastosowań przewidziano możliwość zastosowania wrzecion o
          mocy do 16 kW, z opcjonalnym automatycznym systemem wymiany narzędzi – liniowym
          lub obrotowym
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje mocowania materiału:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Standardowo: stół T-rowkowy panelowy – mocowanie detali bezpośrednio do stołu, w imadłach lub dedykowanych uchwytach
        </li>
        <li use:typoFixAction>
          Opcjonalnie: stół podciśnieniowy – szybkie mocowanie arkuszy i elementów o nieregularnym kształcie
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0816_1.webp"
        alt="Schemat techniczny frezarki Certus 0816 - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0816_2.webp"
        alt="Schemat techniczny frezarki Certus 0816 - widok 2"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_ploteryPrzemyslowe_CT_OT type="OT" />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image02
        sectionId="plotery-ot-gallery"
        imgSrc="/assets/maszyny/galeria/webp/ploter-hpp-ot-05.webp"
        title="Galeria realizacji"
        subtitle="Zobacz nasze plotery w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("plotery-przemyslowe-ot")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_HPP-OT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Ploter CNC HPP-CT (w zabudowie) -->
<section id="ploteryPrzemysloweZabudowa" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('ploteryPrzemysloweZabudowa')}
      aria-expanded={mobileMachineExpanded['ploteryPrzemysloweZabudowa']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Ploter CNC HPP-CT (w zabudowie)</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['ploteryPrzemysloweZabudowa'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['ploteryPrzemysloweZabudowa']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['ploteryPrzemysloweZabudowa']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC HPP-CT" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Zaawansowany wieloosiowy ploter przemysłowy w zabudowie</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        To zaawansowane wieloosiowe centrum obróbcze, zaprojektowane z myślą o pracy w środowisku przemysłowym, gdzie kluczowe znaczenie mają
        bezpieczeństwo, czystość procesu oraz stabilność parametrów pracy.
        Podobnie jak modele otwarte, pozwalają na frezowanie, wiercenie, cięcie,
        gwintowanie czy bigowanie, jednak dzięki pełnej zabudowie oferują
        dodatkowe korzyści operacyjne i eksploatacyjne.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('ploteryPrzemysloweZabudowa')}
          aria-expanded={desktopExpanded['ploteryPrzemysloweZabudowa'] || mobileDetailsExpanded['ploteryPrzemysloweZabudowa']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['ploteryPrzemysloweZabudowa'] || mobileDetailsExpanded['ploteryPrzemysloweZabudowa']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.webp" alt="Zaawansowany wieloosiowy ploter przemysłowy w zabudowie CERTUS HPP-CT" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['ploteryPrzemysloweZabudowa']}
      class:mobile-l2-closed={!mobileDetailsExpanded['ploteryPrzemysloweZabudowa']}
    >
      <div class="maszyny-dane-text-image">
    <div class="left">


      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Przewagi konstrukcyjne:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          W porównaniu do wersji otwartej, zabudowa chroni operatora przed
          odpryskami, pyłem i mgłą olejową, znacząco poprawiając bezpieczeństwo
          oraz komfort pracy
        </li>
        <li use:typoFixAction>
          W pełni zamknięta przestrzeń robocza ułatwia również utrzymanie
          czystości w miejscu pracy oraz ogranicza emisję hałasu i
          zanieczyszczeń do otoczenia
        </li>
        <li use:typoFixAction>
          Zamknięta konstrukcja pozwala na skuteczniejsze chłodzenie narzędzi i
          materiału obrabianego – możliwa jest praca z układami chłodzenia mgłą
          olejową lub cieczą w obiegu zamkniętym
        </li>
        <li use:typoFixAction>
          W wielu przypadkach zabudowa umożliwia też efektywniejsze odciąganie
          wiórów i pyłu, co przekłada się na lepszą jakość obróbki i dłuższą
          żywotność komponentów
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Stabilność i precyzja:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Konstrukcja HPP-OT: brama napędzana obustronnie dwiema śrubami kulowymi, z elektroniczną kompensacją odchyłek bramy
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zastosowania i elastyczność:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Do aplikacji wymagających powtarzalności, czystego stanowiska i pracy z chłodzeniem w zamkniętej komorze – aluminium, stal, tworzywa, formy i przyrządy
        </li>
        <li use:typoFixAction>
          Mogą pracować z szeroką gamą materiałów, od tworzyw sztucznych i
          kompozytów, po aluminium i stal, z możliwością rozbudowy o osie
          obrotowe oraz automatyczne systemy wymiany narzędzi
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje mocowania materiału:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Standardowo stół T-rowkowy panelowy. Opcje: stół podciśnieniowy oraz pionowa płyta T-rowkowa na końcu stołu – do mocowania detali pionowo
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_1.webp"
        alt="Schemat techniczny frezarki Certus 0815 - widok 5"
        width="2000"
        height="2000"
        loading="lazy"
      />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_2.webp"
        alt="Schemat techniczny frezarki Certus 0815 - widok 3"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_ploteryPrzemyslowe_CT_OT type="CT" />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image02
        sectionId="zabudowa-gallery"
        imgSrc="/assets/maszyny/galeria/webp/ploter-hpp-ct-02.webp"
        title="Plotery w zabudowie"
        subtitle="Kompaktowe rozwiązania"
        ctaText="Zobacz galerie"
        ctaAction={() => openGallery("plotery-przemyslowe-ct")}
      />

    <!--   <Section_Maszyny_Image01
        sectionId="zabudowa-specs"
        imgSrc="/assets/certus-pomoc-wdrozenia.webp"
        title="Dokumentacja techniczna"
        subtitle="Pobierz specyfikację"
      /> -->
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_HPP-CT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Grawerki CNC -->
<section id="grawerki" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('grawerki')}
      aria-expanded={mobileMachineExpanded['grawerki']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Grawerki CNC</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['grawerki'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['grawerki']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['grawerki']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC GRAWER" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Kompaktowe grawerki precyzyjne</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        To kompaktowe, precyzyjne urządzenia
        dedykowane do obróbki materiałów wymagających bardzo dużej dokładności przy
        niewielkich wymiarach obszaru roboczego. Znajdą zastosowanie m.in. w produkcji
        form wtryskowych, stempli, narzędzi precyzyjnych, tabliczek znamionowych,
        paneli frontowych, biżuterii oraz w mikroobróbce komponentów technicznych.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('grawerki')}
          aria-expanded={desktopExpanded['grawerki'] || mobileDetailsExpanded['grawerki']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['grawerki'] || mobileDetailsExpanded['grawerki']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.webp" alt="Grawerki CNC Certus" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['grawerki']}
      class:mobile-l2-closed={!mobileDetailsExpanded['grawerki']}
    >
      <div class="maszyny-dane-text-image">
    <div class="left">
      <p use:typoFixAction>
        <strong>Grawerki CNC</strong><br /><br />
      </p>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Precyzja i wydajność:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Maszyny wyposażone są w wysokobrotowe wrzeciona (do 60 000 obr./min) o
          mocach od 0,8 do 2,1 kW, co umożliwia obróbkę materiałów takich jak
          stal, aluminium, mosiądz, tworzywa sztuczne czy laminaty techniczne z
          wyjątkową dokładnością i czystością krawędzi
        </li>
        <li use:typoFixAction>
          Zależnie od potrzeb, możliwy jest dobór wrzeciona pod kątem mocy i
          prędkości, dopasowany do konkretnej aplikacji
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i sterowanie:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Grawerkę wyposażono w niezależny pulpit operatorski, co ułatwia
          ergonomiczne rozmieszczenie stanowiska pracy
        </li>
        <li use:typoFixAction>
          Kompaktowa konstrukcja oraz wysokość robocza 200 mm czyni ją idealnym
          wyborem zarówno do warsztatów narzędziowych, jak i precyzyjnej
          produkcji seryjnej
        </li>
        <li use:typoFixAction>
          Urządzenie może być skonfigurowane z magazynem narzędzi w wersji
          rewolwerowej, umożliwiającym szybką zmianę narzędzi podczas złożonych
          procesów obróbczych, lub w wersji podstawowej – bez wymiany narzędzi
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje i rozbudowa:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Pomiar wysokości narzędzia</li>
        <li use:typoFixAction>Sonda 3D współpracująca z makrami pomiarowymi</li>
        <li use:typoFixAction>Centralny układ smarowania</li>
        <li use:typoFixAction>Kamera wizyjna do monitorowania procesu</li>
        <li use:typoFixAction>
          Dodatkowa 4. i 5. oś obrotowa montowana na stole roboczym
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i mocowanie:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Do efektywnego chłodzenia podczas obróbki przewidziano system mgły
          olejowej lub chłodzenia cieczą w obiegu zamkniętym
        </li>
        <li use:typoFixAction>
          W zależności od potrzeb możliwe jest zastosowanie stołu T-rowkowego,
          podciśnieniowego, próżniowego lub hybrydowego – co daje dużą
          elastyczność w mocowaniu detali, zarówno w produkcji jednostkowej, jak
          i seryjnej
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_Grawerka_frezarka_nabiurkowa_1.webp"
        alt="Schemat techniczny Certus Grawerka Frezarka Nabiurkowa - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_Grawerka_frezarka_nabiurkowa_2.webp"
        alt="Schemat techniczny Certus Grawerka Frezarka Nabiurkowa - widok 2"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_grawerki />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
    <!--   <Section_Maszyny_Image01
        sectionId="grawerki-image"
        imgSrc="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.webp"
        title="Grawerki CNC"
        subtitle="Precyzyjne grawerowanie"
      /> -->

      <Section_Maszyny_Image02
        sectionId="grawerki-gallery"
        imgSrc="/assets/maszyny/galeria/webp/grawerka-cnc-05.webp"
        title="Galeria grawerek"
        subtitle="Zobacz nasze realizacje"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("grawerki")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_Grawerki-CNC.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Frezarki CNC 5-osiowe -->
<section id="frezarki5osiowe" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('frezarki5osiowe')}
      aria-expanded={mobileMachineExpanded['frezarki5osiowe']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/frezarki5osiowe.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Frezarki CNC 5-osiowe</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['frezarki5osiowe'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['frezarki5osiowe']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['frezarki5osiowe']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/frezarki5osiowe.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC 5-OSIOWE" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Pięcioosiowe centra frezarskie CNC</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        To zaawansowane
        urządzenia przeznaczone do precyzyjnej obróbki detali o złożonej geometrii.
        Znajdują zastosowanie przede wszystkim w produkcji matryc do termoformowania, modeli kompozytowych oraz elementów
        wymagających wielostronnej obróbki w jednym mocowaniu.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('frezarki5osiowe')}
          aria-expanded={desktopExpanded['frezarki5osiowe'] || mobileDetailsExpanded['frezarki5osiowe']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['frezarki5osiowe'] || mobileDetailsExpanded['frezarki5osiowe']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.webp" alt="Frezarki CNC pięcioosiowe" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['frezarki5osiowe']}
      class:mobile-l2-closed={!mobileDetailsExpanded['frezarki5osiowe']}
    >
      <div class="maszyny-dane-text-image">
    <div class="left">
      <p use:typoFixAction>
        <strong></strong><br /><br />
      </p>

      <div class="maszyny-dane-podtytul">Zaawansowane sterowanie:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Sterowanie umożliwia jednoczesną interpolację wszystkich osi roboczych
          z projekcją prędkości na czoło narzędzia
        </li>
        <li use:typoFixAction>
          Pozwala to na płynną i szybką obróbkę nawet najbardziej złożonych
          powierzchni 3D
        </li>
        <li use:typoFixAction>
          Rozwiązanie to szczególnie sprawdza się w wykańczaniu elementów po
          laminowaniu lub termoformowaniu, gdzie niezbędna jest wysoka
          dokładność i powtarzalność ruchu
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Automatyzacja i precyzja:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Frezarki pięcioosiowe umożliwiają wykonywanie obróbek korekcyjnych i
          wykańczających bez konieczności stosowania specjalistycznego
          oprogramowania CAM
        </li>
        <li use:typoFixAction>
          Dzięki współpracy z głowicą pomiarową 3D i makrami pomiarowymi,
          maszyna może automatycznie skanować i obrabiać powierzchnie na
          podstawie danych rzeczywistych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Konstrukcja i wydajność:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Stół obrotowo-uchylny (oś A 0–360°, oś B 0–210°) napędzany bezluzowymi przekładniami falowymi (harmonicznymi) lub cykloidalnymi – duża sztywność przy zachowaniu dynamiki ruchu
        </li>
        <li use:typoFixAction>
          Urządzenia zaprojektowane są z myślą o intensywnej, wielozmianowej
          pracy w warunkach produkcyjnych, gdzie kluczowa jest precyzja,
          szybkość oraz niezawodność
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Opcje rozbudowy:</div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Pięcioosiowe frezarki CNC mogą być rozbudowane o dodatkowe opcje takie
          jak chłodzenie narzędzi mgłą olejową
        </li>
        <li use:typoFixAction>
          Automatyczne systemy wymiany narzędzi, sondy pomiarowe, kamery wizyjne
        </li>
        <li use:typoFixAction>
          Stoły hybrydowe umożliwiające elastyczne mocowanie materiału – zarówno
          podciśnieniowe, jak i mechaniczne
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_5_Osi_1.webp"
        alt="Schemat techniczny - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_5_Osi_2.webp"
        alt="Schemat techniczny - widok 2"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki5osiowe />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
   <!--    <Section_Maszyny_Image01
        sectionId="frezarki5osiowe-image"
        imgSrc="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.webp"
        title="Frezarki pięcioosiowe"
        subtitle="Zaawansowana obróbka"
      /> -->

      <Section_Maszyny_Image02
        sectionId="frezarki5osiowe-gallery"
        imgSrc="/assets/maszyny/galeria/webp/frezarka-5osiowa-01.webp"
        title="Galeria frezarek 5-osiowych"
        subtitle="Zobacz możliwości"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("frezarki-5osiowe")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_Frezarki-5-osiowe.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

<!-- Plotery linearne CNC HLP-FT -->
<section id="ploteryLinearne" class="maszyny-dane">
  <!-- Mobile Level 1 Header (widoczne tylko na smartfonach) -->
  <div class="mobile-machine-header mobile-only">
    <button
      type="button"
      class="mobile-level1-btn"
      on:click={() => toggleMobileMachine('ploteryLinearne')}
      aria-expanded={mobileMachineExpanded['ploteryLinearne']}
    >
      <div class="mobile-level1-left">
        <img src="/assets/ikony/maszyny/ploteryLinearne.svg" alt="" class="mobile-level1-icon" width="32" height="32" loading="lazy" />
        <span class="mobile-level1-title">Plotery linearne CNC HLP-FT</span>
      </div>
      <div class="mobile-level1-right">
        <span class="mobile-level1-status">
          {mobileMachineExpanded['ploteryLinearne'] ? 'Zwiń' : 'Rozwiń'}
        </span>
        <span class="btn-arrow" class:is-rotated={mobileMachineExpanded['ploteryLinearne']}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </button>
  </div>

  <!-- Główny kontener maszyny (na mobile zwijany poziomem 1) -->
  <div class="machine-content-wrapper" class:mobile-l1-closed={!mobileMachineExpanded['ploteryLinearne']}>
    <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-header-block">
        <img src="/assets/ikony/maszyny/ploteryLinearne.svg" alt="" class="cnc-icon" width="56" height="56" loading="lazy">
        <div class="cnc-title-group">
          <div class="cnc-svg-title">
            <MachineTitleSvg text="CNC HLP-FT" height="1.6em" shadow={false} />
          </div>
          <h2 class="cnc-title" use:typoFixAction>Plotery CNC ze stołem hybrydowym</h2>
        </div>
      </div>
      <div class="cnc-desc" use:typoFixAction>
        To precyzyjne
        i wydajne urządzenia zaprojektowane do cięcia, bigowania, znakowania i opisywania
        szerokiej gamy materiałów płaskich. Idealnie sprawdzają się w przemyśle opakowaniowym,
        reklamowym, tekstylnym, kompozytowym i wielu innych branżach, gdzie wymagana
        jest wysoka jakość krawędzi oraz powtarzalność obróbki.
      </div>
      <!-- Przycisk Specyfikacja wyrównany do lewej zaraz pod tekstem -->
      <div class="spec-btn-row">
        <button
          type="button"
          class="spec-btn"
          on:click={() => toggleSpecs('ploteryLinearne')}
          aria-expanded={desktopExpanded['ploteryLinearne'] || mobileDetailsExpanded['ploteryLinearne']}
        >
          <svg class="spec-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span class="spec-label">Specyfikacja</span>
          <span class="btn-arrow" class:is-rotated={desktopExpanded['ploteryLinearne'] || mobileDetailsExpanded['ploteryLinearne']}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1530_Layers/Certus_1530_Layer1.webp" alt="Plotery CNC HLP-FT Certus" class="" width="1200" height="800" loading="lazy">
    </div>
  </div>

    <!-- Szczegółowe parametry: zawsze w HTML dla robotów SEO, ukrywane wyłącznie klasami CSS -->
    <div
      class="machine-details-collapsible"
      class:desktop-closed={!desktopExpanded['ploteryLinearne']}
      class:mobile-l2-closed={!mobileDetailsExpanded['ploteryLinearne']}
    >
      <div class="maszyny-dane-text-image">
    <div class="left">
      <div class="maszyny-dane-podtytul">Wszechstronność i funkcjonalność:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Maszyny mogą być wyposażone w różne głowice robocze – frezującą,
          bigującą, znakującą i piszącą – co pozwala na kompleksową obróbkę w
          jednym cyklu
        </li>
        <li use:typoFixAction>
          Opcjonalny pneumatyczny nóż oscylacyjny umożliwia cięcie miękkich i
          elastycznych materiałów, takich jak pianki, gumy, tkaniny techniczne
          czy karton
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Format i konstrukcja:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Plotery dostępne są w różnych wariantach wymiarów obszaru roboczego –
          od kompaktowych (700×1600 mm) po wielkoformatowe (do 2000×4000 mm), co
          pozwala dopasować urządzenie do specyfiki produkcji i dostępnej
          przestrzeni
        </li>
        <li use:typoFixAction>
          Standardowa wysokość robocza 270 mm pozwala na obróbkę materiałów o
          znacznej grubości
        </li>
        <li use:typoFixAction>
          Konstrukcja opiera się na stabilnym stole próżniowym, zapewniającym
          pewne i szybkie mocowanie obrabianego materiału bez konieczności
          stosowania zacisków mechanicznych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Automatyzacja i wygoda:</div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Plotery HLP-FT mogą być opcjonalnie wyposażone w taśmowy lub
          bezkońcowy stół transportowy, co znacząco zwiększa wydajność przy
          obróbce długich serii materiałów z roli lub arkuszy
        </li>
        <li use:typoFixAction>
          Tego typu rozwiązania pozwalają na zautomatyzowaną pracę ciągłą,
          minimalizując przestoje i zwiększając efektywność operacyjną
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Obsługa i ergonomia:</div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Sterowanie odbywa się z poziomu niezależnego pulpitu operatorskiego,
          co zapewnia wygodę i bezpieczeństwo obsługi, a także ułatwia
          organizację przestrzeni roboczej
        </li>
        <li use:typoFixAction>
          Intuicyjne oprogramowanie umożliwia szybkie przezbrojenie maszyny i
          optymalizację ścieżek cięcia
        </li>
      </ul>
    </div>
    <div class="right">
      <br />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_1530_1.webp"
        alt="Schemat techniczny frezarki Certus 1530 - widok 1"
        width="2000"
        height="2000"
        loading="lazy"
      />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_1530_2.webp"
        alt="Schemat techniczny frezarki Certus 1530 - widok 4"
        width="2000"
        height="2000"
        loading="lazy"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_ploteryLinearne />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
     <!--  <Section_Maszyny_Image01
        sectionId="ploteryLinearne-image"
        imgSrc="/assets/maszyny/SCHEMATY/Certus_1530_2.webp"
        title="Plotery CNC HLP-FT"
        subtitle="Precyzyjne cięcie"
      /> -->

      <Section_Maszyny_Image02
        sectionId="ploteryLinearne-gallery"
        imgSrc="/assets/maszyny/galeria/webp/ploter-hlp-ft.webp"
        title="Galeria ploterów linearnych"
        subtitle="Zobacz w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => openGallery("plotery-linearne")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Karta katalogowa (PDF)"
    downloadHref="/do_pobrania/CERTUS_Karta_katalogowa_HLP-FT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
    </div>
  </div>
</section>

{#if isGalleryOpen}
  <Gallery images={currentGalleryImages} isOpen={isGalleryOpen} onClose={closeGallery} />
{/if}

<style lang="scss">


  


  .cnc-table {
    display: grid;
    grid-template-columns: 1.6fr 1.2fr;
    width: 100%;
    background: #fff;
    align-items: end;
    gap: 32px;
    padding: 10px 0 20px 0;
  }

  .cnc-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 220px;
  }

  .cnc-header-block {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #eef1f4;
  }

  .cnc-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.06));
  }

  .cnc-title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .cnc-svg-title {
    display: flex;
    align-items: center;
    color: #1a1c1e;
    line-height: 1;
  }

  .cnc-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #2b2e33;
    line-height: 1.35;
    margin: 0;
  }

  .cnc-desc {
    color: #5d636b;
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 6px;
  }

  .cnc-right {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-width: 200px;
    padding: 0;
    align-self: end;

    img {
      max-width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.08));
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: 1024px) {
    .cnc-table {
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
    }
    .cnc-icon {
      width: 52px;
      height: 52px;
    }
  }

  @media (max-width: 768px) {
    .maszyny-dane {
      padding: 0.75rem 0.5rem;
    }
    .cnc-table {
      grid-template-columns: 1fr !important;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 6px 0 16px 0;
    }
    .cnc-left {
      padding: 0.25em 0;
      width: 100%;
    }
    .cnc-header-block {
      gap: 12px;
      margin-bottom: 12px;
      padding-bottom: 10px;
    }
    .cnc-icon {
      width: 44px;
      height: 44px;
    }
    .cnc-title {
      font-size: 1.05rem;
    }
    .cnc-desc {
      font-size: 0.9rem;
      line-height: 1.55;
    }
    .cnc-right {
      padding: 0.5rem 0;
      width: 100%;
      img {
        max-width: 290px;
        margin: 0 auto;
        display: block;
      }
    }
  }


  .first-container-back {
    display: none;
  }
  .pattern-overlay .pattern.two {
    display: none;
  }
  .maszyny-dane-hr {
    width: 70%;
  }
  .topline {
    height: 5em;
    position: absolute;
    width: 100%;
    left: 0px;
    /*  margin-top: -100px; */
    .topImage {
      margin-top: -10px;
      float: right;
      width: 37rem;
      padding-right: 8rem;
    }
  }

  @media (max-width: 927px) {
    .logomini {
      min-width: 62px !important;
      width: 30px;
    }
    .topline .topImage {
      width: 16rem !important;
      padding-right: 1em !important;
      margin-top: 67px;
    }
  }

  @media (max-width: 900px) {
    .maszyny-dane-header h2{
      width: 50% !important;
      top: -20px;
    }
    .title_ {
      width: 70% !important;
    }
    .topImage{
      margin-top: -300px;
    }
  }
  @media (min-width: 928px) and (max-width: 1199px) {
    .topline .topImage {
      width: 24rem !important;
      padding-right: 1em !important;
      margin-top: 0px;
    }
  }
  @media (min-width: 900px) {
    .topline .topImage {
      width: 20rem !important;
      padding-right: 1em !important;
      margin-top: 0px;
    }
  }

  @media (min-width: 1200px) {
    .topline .topImage {
      width: 30rem !important;
      padding-right: 1em !important;
      margin-top: -100px;
    }
  }
  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 218px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
  }

  .maszyny-dane-text-image p {
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .maszyny_page {
    // min-width: 100vw;
    margin: 0 auto;
    // height: 0px;
    min-height: 170px;
  }

  .section-header h1 {
    color: var(--color-text-secondary) !important;
    font-weight: 600 !important;
  }

  /* ———————————————— RESPONSIVE TOGGLE VISIBILITY ———————————————— */
  .desktop-only {
    display: inline-flex !important;
  }
  .mobile-only {
    display: none !important;
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none !important;
    }
    .mobile-only {
      display: block !important;
    }
    button.mobile-only {
      display: inline-flex !important;
    }
  }

  /* ———————————————— MOBILE LEVEL 1 HEADER ———————————————— */
  .mobile-machine-header {
    margin: 16px 0 8px 0;
    padding: 0 16px;

    .mobile-level1-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: #1e2022;
      border: 1px solid rgba(150, 165, 0, 0.45);
      border-radius: 12px;
      color: #ffffff;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.25s ease;

      &:active {
        transform: scale(0.98);
        border-color: #96a500;
      }

      .mobile-level1-left {
        display: flex;
        align-items: center;
        gap: 12px;

        .mobile-level1-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .mobile-level1-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: #ffffff;
          text-align: left;
        }
      }

      .mobile-level1-right {
        display: flex;
        align-items: center;
        gap: 8px;

        .mobile-level1-status {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: #96a500;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      }
    }
  }

  /* ———————————————— COLLAPSIBLE LOGIC (SEO-FRIENDLY CSS) ———————————————— */
  @media (max-width: 768px) {
    .machine-content-wrapper.mobile-l1-closed {
      display: none !important;
    }
  }

  @media (min-width: 769px) {
    .machine-details-collapsible.desktop-closed {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .machine-details-collapsible.mobile-l2-closed {
      display: none !important;
    }
  }

  /* ———————————————— BUTTON STYLES ———————————————— */
  .spec-btn-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 6px;

    @media (max-width: 768px) {
      margin-top: 14px;
      margin-bottom: 12px;
    }
  }

  .spec-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    background: #1f2123;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    border-radius: 9999px;
    border: 1.5px solid #96a500;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    letter-spacing: 0.01em;

    .spec-icon {
      stroke: #96a500;
      flex-shrink: 0;
      transition: stroke 0.2s ease;
    }

    .spec-label {
      line-height: 1;
    }

    .btn-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

      svg {
        stroke: #96a500;
        transition: stroke 0.2s ease;
      }

      &.is-rotated {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background: #96a500;
      color: #111213;
      border-color: #96a500;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(150, 165, 0, 0.3);

      .spec-icon {
        stroke: #111213;
      }

      .btn-arrow svg {
        stroke: #111213;
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    svg {
      transition: stroke 0.2s ease;
    }

    &.is-rotated {
      transform: rotate(180deg);
    }
  }
</style>

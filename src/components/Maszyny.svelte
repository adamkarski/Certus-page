<script lang="ts">
  import CtaButton from "./cta-button-kategory.svelte";
  import Section_Maszyny_Image01 from "./sections/Section_Maszyny_Image01.svelte";
  import Section_Maszyny_Video from "./sections/Section_Maszyny_Video.svelte";
  import Section_Maszyny_Image02 from "./sections/Section_Maszyny_Image02.svelte";

  import Maszyny_table_frezarki from "./tables/Maszyny_table_frezarki.svelte";
  import Maszyny_table_plotery from "./tables/Maszyny_table_plotery.svelte";
  import Maszyny_table_zabudowa from "./tables/Maszyny_table_zabudowa.svelte";
  import Maszyny_table_grawerki from "./tables/Maszyny_table_grawerki.svelte";
  import Maszyny_table_frezarki5osiowe from "./tables/Maszyny_table_frezarki5osiowe.svelte";
  import Maszyny_table_ploteryLinearne from "./tables/Maszyny_table_ploteryLinearne.svelte";
  import Maszyny_table_specjalistyczne from "./tables/Maszyny_table_specjalistyczne.svelte";

  // import css styles
  import "./tables/table.css";

  const maszyny = [];

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<section class="maszyny_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="maszyny" class="maszyny">
  <div class="maszyny-container container">
    <div class="section-header">
      <h1 class="no-sel">Kategorie maszyn</h1>

      <hr />
    </div>
  </div>
  <div class="oferta-container container">
    <div class="oferta-grid">
      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="/assets/ikony/maszyny/frezarki.svg" alt="Frezarki CNC" />
        </div>

        <CtaButton
          text="Frezarki CNC HMM"
          on:click={() => scrollToSection("frezarki")}
        />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img
            src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
            alt="Przemysłowe plotery CNC"
          />
        </div>

        <CtaButton
          text="Plotery CNC"
          on:click={() => scrollToSection("ploteryPrzemyslowe")}
        />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img
            src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg"
            alt="Przemysłowe plotery CNC"
          />
        </div>

        <CtaButton
          text="Plotery CNC w zabudowie"
          on:click={() => scrollToSection("ploteryPrzemysloweZabudowa")}
        />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img
            src="/assets/ikony/maszyny/frezarki5osiowe.svg"
            alt="Frezarki pięcioosiowe"
          />
        </div>

        <CtaButton
          text="Frezarki pięcioosiowe"
          on:click={() => scrollToSection("frezarki5osiowe")}
        />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="/assets/ikony/maszyny/grawerki.svg" alt="Grawerki CNC" />
        </div>

        <CtaButton
          text="Grawerki CNC"
          on:click={() => scrollToSection("grawerki")}
        />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img
            src="/assets/ikony/maszyny/ploteryLinearne.svg"
            alt="Plotery tnące linearne CNC"
          />
        </div>

        <CtaButton
          text="Plotery tnące linearne CNC"
          on:click={() => scrollToSection("ploteryLinearne")}
        />
      </div>
    </div>
  </div>
</section>

<!-- Frezarki CNC HMM -->
<section id="frezarki" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/frezarki.svg"
      alt="Frezarki CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Frezarki CNC HMM</h2>
  </div>
  <hr class="maszyny-dane-hr" />

  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="frezarki-image-01"
        imgSrc="/assets/maszyny/certus_7111_temp_schemat01.png"
        title="Frezarki CNC HMM"
        subtitle="Precyzyjne obróbki skrawaniem"
      />

      <Section_Maszyny_Image02
        sectionId="frezarki-gallery"
        imgSrc="/assets/maszyny/certus_7111_temp.png"
        title="Galeria realizacji"
        subtitle="Zobacz nasze frezarki w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => console.log("Galeria frezarek")}
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Przemysłowe plotery CNC -->
<section id="ploteryPrzemyslowe" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
      alt="Przemysłowe plotery CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Przemysłowe plotery CNC</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_plotery />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Video
        sectionId="plotery-video"
        videoSrc="/assets/video/video.m4v"
        title="Plotery w akcji"
        subtitle="Zobacz jak działają nasze plotery"
      />

      <Section_Maszyny_Image01
        sectionId="plotery-image"
        imgSrc="/assets/maszyny/88930d1c.png"
        title="Przemysłowe plotery CNC"
        subtitle="Wydajność i precyzja"
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Przemysłowe plotery CNC w zabudowie -->
<section id="ploteryPrzemysloweZabudowa" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg"
      alt="Przemysłowe plotery CNC w zabudowie"
      class="maszyny-dane-ikona"
    />
    <h2>Przemysłowe plotery CNC w zabudowie</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_zabudowa />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image02
        sectionId="zabudowa-gallery"
        imgSrc="/assets/maszyny/combined_88930d1c.png"
        title="Plotery w zabudowie"
        subtitle="Kompaktowe rozwiązania"
        ctaText="Zobacz galerie"
        ctaAction={() => console.log("Galeria zabudowa")}
      />

      <Section_Maszyny_Image01
        sectionId="zabudowa-specs"
        imgSrc="/assets/certus-pomoc-wdrozenia.png"
        title="Dokumentacja techniczna"
        subtitle="Pobierz specyfikację"
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Grawerki CNC -->
<section id="grawerki" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/grawerki.svg"
      alt="Grawerki CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Grawerki CNC</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
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
      <Section_Maszyny_Image01
        sectionId="grawerki-image"
        imgSrc="/assets/maszyny/80f5ea646ec.png"
        title="Grawerki CNC"
        subtitle="Precyzyjne grawerowanie"
      />

      <Section_Maszyny_Video
        sectionId="grawerki-video"
        videoSrc="/assets/video/video.m4v"
        title="Przykłady prac"
        subtitle="Zobacz realizacje na grawerkach"
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Frezarki pięcioosiowe -->
<section id="frezarki5osiowe" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/frezarki5osiowe.svg"
      alt="Frezarki pięcioosiowe"
      class="maszyny-dane-ikona"
    />
    <h2>Frezarki pięcioosiowe</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
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
      <Section_Maszyny_Image02
        sectionId="frezarki5-gallery"
        imgSrc="/assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg"
        title="Frezarki 5-osiowe"
        subtitle="Skomplikowane kształty 3D"
        ctaText="Zobacz możliwości"
        ctaAction={() => console.log("Galeria 5-osiowe")}
      />

      <Section_Maszyny_Image01
        sectionId="frezarki5-details"
        imgSrc="/assets/maszyny/certus_7111_temp_schemat02.png"
        title="Przykłady detali"
        subtitle="Precyzyjne obróbki wieloosiowe"
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Plotery tnące linearne CNC -->
<section id="ploteryLinearne" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/ploteryLinearne.svg"
      alt="Plotery tnące linearne CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Plotery tnące linearne CNC</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do frezowania stali, aluminium, drewna, plastiku itp.
        </li>
        <li>
          Kompletna zabudowa umożliwiająca chłodzenie narzędzi i materiału.
        </li>
        <li>Zintegrowany odstojnik, zbiornik na chłodziwo oraz pompa.</li>
        <li>Trwałe osłony stalowe prowadnic i śrub kulowych.</li>
        <li>Wolnostojący panel sterujący.</li>
        <li>Polskojęzyczne oprogramowanie, transfer danych przez LAN.</li>
        <li>Serwonapędy hybrydowe lub serwa AC (w zależności od opcji).</li>
        <li>Wysoka sztywność i precyzja w swojej klasie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Wersja bazowa zawiera m.in.:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Konstrukcję o zwiększonej sztywności z pełną zabudową,</li>
        <li>System chłodzenia w obiegu zamkniętym z pompą i odstojnikiem,</li>
        <li>
          Niezależny panel sterowania z komputerem i przyciskami fizycznymi,
        </li>
        <li>Wrzeciono z automatyczną wymianą narzędzi (ATC),</li>
        <li>Polskojęzyczne sterowanie PikoCNC z modułem CAM,</li>
        <li>Serwonapędy hybrydowe,</li>
        <li>Instrukcje obsługi i dokumentację DTR w języku polskim,</li>
        <li>Podstawowe szkolenie użytkownika.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp_schemat01.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 1"
      />
      <img
        src="/assets/maszyny/certus_7111_temp_schemat02.png"
        alt="Schemat techniczny frezarki Certus 7111 - widok 2"
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
      <Section_Maszyny_Video
        sectionId="plotery-tnace-video"
        videoSrc="/assets/video/video.m4v"
        title="Plotery tnące w akcji"
        subtitle="Zobacz proces cięcia materiałów"
      />

      <Section_Maszyny_Image02
        sectionId="plotery-materials"
        imgSrc="/assets/certus-serwis-pogwarancyjny.png"
        title="Materiały do cięcia"
        subtitle="Szeroka gama możliwości"
        ctaText="Zobacz materiały"
        ctaAction={() => console.log("Materiały do cięcia")}
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<!-- Maszyny specjalistyczne -->
<section id="specjalistyczne" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/maszyny/specjalistyczne.svg"
      alt="Maszyny specjalistyczne"
      class="maszyny-dane-ikona"
    />
    <h2>Maszyny specjalistyczne</h2>
  </div>
  <hr class="maszyny-dane-hr" />
  <div class="maszyny-dane-text-image">
    <div class="left">
      <ul class="maszyny-dane-lista">
        <li>
          Przeznaczone do obróbki materiałów wymagających specjalistycznych
          rozwiązań.
        </li>
        <li>
          Dostosowane do indywidualnych potrzeb klienta i specyfiki produkcji.
        </li>
        <li>Wysoka precyzja i niezawodność w trudnych warunkach.</li>
        <li>Możliwość integracji z istniejącymi systemami produkcyjnymi.</li>
        <li>Wsparcie techniczne i serwisowe na każdym etapie.</li>
      </ul>
      <div class="maszyny-dane-podtytul">Przykładowe zastosowania:</div>
      <ul class="maszyny-dane-lista-small">
        <li>Produkcja prototypów i małych serii.</li>
        <li>Obróbka materiałów egzotycznych.</li>
        <li>Zastosowania w przemyśle lotniczym i medycznym.</li>
        <li>Automatyzacja procesów produkcyjnych.</li>
      </ul>
    </div>
    <div class="right">
      <img
        src="/assets/maszyny/certus_7111_temp.png"
        alt="Maszyny specjalistyczne"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_specjalistyczne />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="specjalistyczne-image"
        imgSrc="/assets/maszyny/certus_7111_temp.png"
        title="Maszyny specjalistyczne"
        subtitle="Rozwiązania na miarę"
      />

      <Section_Maszyny_Video
        sectionId="specjalistyczne-video"
        videoSrc="/assets/video/video.m4v"
        title="Maszyny specjalistyczne w akcji"
        subtitle="Zobacz możliwości"
      />
    </div>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<style lang="scss">
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

  .oferta-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  :global(.oferta-grid) {





    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

    .oferta-card {
      padding: 10px 0px;
      border-radius: 0px;
      text-align: center;
      transition: all 0.3s ease;
      display: grid;
      align-items: end;
      justify-content: center;
      align-content: center;
   
   

    }
   

    .oferta-card:hover {
      transform: translateY(-5px);
    }

    .oferta-icon {
      font-size: 60px;
      margin-bottom: 25px;
      display: block;
      width: 4em;

      img {
        margin-left: 0.6em;
      }
    }
  }
</style>

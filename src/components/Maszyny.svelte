<script lang="ts">
  import CtaButton from "./cta-button-kategory.svelte";
  import Section_Maszyny_Image01 from "./sections/Section_Maszyny_Image01.svelte";
  import Section_Maszyny_Video from "./sections/Section_Maszyny_Video.svelte";
  import Section_Maszyny_Image02 from "./sections/Section_Maszyny_Image02.svelte";

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
          on:click={() => scrollToSection("Frezarki")}
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
          text="Przemysłowe plotery CN "
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
          text="Przemysłowe plotery CNC w zabudowie"
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
          <img
            src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
            alt="Grawerki CNC"
          />
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
<section id="Frezarki" class="maszyny-dane">
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
        <table class="maszyny-dane-tabela frezarki">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="/assets/ikony/table/wymiary.svg" alt="Wymiary" />
                <div class="text">Wymiary obszaru roboczego (mm)</div>
              </td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>400×400</li>
                  <li>600×400</li>
                  <li>700×600</li>
                  <li>1000×700</li>
                  <li>1000×800</li>
                  <li>1200×1000</li>
                  <li>1200×1200</li>
                  <li>1500×2000</li>
                  <li>2000×2500</li>
                  <li>2000×3000</li>
                  <li>2000×4000</li>
                  <li>700×1600</li>
                  <li>1000×1200</li>
                  <li>1000×1400</li>
                  <li>1400×1000</li>
                  <li>1400×1200</li>
                  <li>1400×1600</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/assets/ikony/table/wysokosc.svg" alt="Wysokość" />
                <div class="text">Wysokość nad stołem roboczym (mm)</div>
              </td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>270</li>
                  <li>300</li>
                  <li>350</li>
                  <li>400</li>
                  <li>500</li>
                  <li>600</li>
                  <li>270-600 (różne opcje)</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="/assets/ikony/table/rodzajewzeciona.svg"
                  alt="Wrzeciona"
                />
                <div class="text">Rodzaje wrzeciona</div>
              </td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>24k obrotów (2,2kW-16kW)</li>
                  <li>40k obrotów (5kW)</li>
                  <li>50k obrotów (3kW)</li>
                  <li>Wolnoobrotowe z wysokim momentem (serwonapęd 5/7,5kW)</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="/assets/ikony/table/oswietlenie.svg"
                  alt="Oświetlenie"
                />
                <div class="text">Oświetlenie obszaru roboczego</div>
              </td>
              <td class="standard-feature">✓ W standardzie</td>
            </tr>
            <tr>
              <td>
                <img src="/assets/ikony/table/atc.svg" alt="ATC" />
                <div class="text">Automatyczny magazyn narzędzi ATC</div>
              </td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Bez wymiany</li>
                  <li>Magazyn rewolwerowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/assets/ikony/table/pulpit.svg" alt="Pulpit" />
                <div class="text">Niezależny pulpit operatorski</div>
              </td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>
                <img src="/assets/ikony/table/opcje.svg" alt="Opcje" />
                <div class="text">Opcje dodatkowe</div>
              </td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Chłodzenie (ciągłe cieczą)</li>
                  <li>Chłodzenie (mgła olejowa)</li>
                  <li>Pomiar wysokości narzędzia</li>
                  <li>Sonda 3D z makrami</li>
                  <li>Centralne smarowanie</li>
                  <li>Kamera wizyjna</li>
                  <li>4. oś obrotowa</li>
                  <li>5. oś obrotowa</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/assets/ikony/table/stoelroboczy.svg" alt="Stół" />
                <div class="text">Typ stołu roboczego</div>
              </td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>T-rowkowy</li>
                  <li>Podciśnieniowy</li>
                  <li>Próżniowy</li>
                  <li>Hybrydowy</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <table class="maszyny-dane-tabela plotery">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wymiary obszaru roboczego (mm)</td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>1500×2000</li>
                  <li>2000×2500</li>
                  <li>2000×3000</li>
                  <li>2000×4000</li>
                  <li>700×1600</li>
                  <li>1000×1200</li>
                  <li>1000×1400</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Wysokość nad stołem roboczym (mm)</td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>270</li>
                  <li>300</li>
                  <li>350</li>
                  <li>400</li>
                  <li>500</li>
                  <li>600</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Rodzaje wrzeciona</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>24k obrotów (2,2kW-16kW)</li>
                  <li>40k obrotów (5kW)</li>
                  <li>50k obrotów (3kW)</li>
                  <li>Wolnoobrotowe z wysokim momentem (serwonapęd 5/7,5kW)</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Oświetlenie obszaru roboczego</td>
              <td class="standard-feature">✓ W standardzie</td>
            </tr>
            <tr>
              <td>Automatyczny magazyn narzędzi ATC</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Bez wymiany</li>
                  <li>Magazyn rewolwerowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Niezależny pulpit operatorski</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Opcje dodatkowe</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Chłodzenie (ciągłe cieczą)</li>
                  <li>Chłodzenie (mgła olejowa)</li>
                  <li>Pomiar wysokości narzędzia</li>
                  <li>Sonda 3D z makrami</li>
                  <li>Centralne smarowanie</li>
                  <li>Kamera wizyjna</li>
                  <li>4. oś obrotowa</li>
                  <li>5. oś obrotowa</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Typ stołu roboczego</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>T-rowkowy</li>
                  <li>Podciśnieniowy</li>
                  <li>Próżniowy</li>
                  <li>Hybrydowy</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <table class="maszyny-dane-tabela zabudowa">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wymiary obszaru roboczego (mm)</td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>1400×1000</li>
                  <li>1400×1200</li>
                  <li>1400×1600</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Wysokość nad stołem roboczym (mm)</td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>270</li>
                  <li>300</li>
                  <li>350</li>
                  <li>400</li>
                  <li>500</li>
                  <li>600</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Rodzaje wrzeciona</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>24k obrotów (2,2kW-16kW)</li>
                  <li>40k obrotów (5kW)</li>
                  <li>50k obrotów (3kW)</li>
                  <li>Wolnoobrotowe z wysokim momentem (serwonapęd 5/7,5kW)</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Oświetlenie obszaru roboczego</td>
              <td class="standard-feature">✓ W standardzie</td>
            </tr>
            <tr>
              <td>Automatyczny magazyn narzędzi ATC</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Bez wymiany</li>
                  <li>Magazyn rewolwerowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Niezależny pulpit operatorski</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Opróżniany zbiornik na wióry</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Osłony boczne</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Stół roboczy poziomo-pionowy T-rowkowy</td>
              <td class="standard-feature">✓ Do 1000mm wysokości</td>
            </tr>
            <tr>
              <td>Opcje dodatkowe</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Chłodzenie (ciągłe cieczą)</li>
                  <li>Chłodzenie (mgła olejowa)</li>
                  <li>Pomiar wysokości narzędzia</li>
                  <li>Sonda 3D</li>
                  <li>Centralne smarowanie</li>
                  <li>Kamera</li>
                  <li>4. oś obrotowa</li>
                  <li>5. oś obrotowa</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Typ stołu roboczego</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>T-rowkowy</li>
                  <li>Podciśnieniowy</li>
                  <li>Próżniowy</li>
                  <li>Hybrydowy</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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
      src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
      alt="Grawerki CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Grawerki CNC</h2>
  </div>
  <hr class="maszyny-dane-hr" />

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <table class="maszyny-dane-tabela grawerka">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wymiary obszaru roboczego (mm)</td>
              <td class="highlight-options">375×400</td>
            </tr>
            <tr>
              <td>Automatyczny magazyn narzędzi ATC</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Bez wymiany</li>
                  <li>Magazyn rewolwerowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Niezależny pulpit operatorski</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Opcje dodatkowe</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Chłodzenie (ciągłe cieczą)</li>
                  <li>Chłodzenie (mgła olejowa)</li>
                  <li>Pomiar wysokości narzędzia</li>
                  <li>Sonda 3D</li>
                  <li>Centralne smarowanie</li>
                  <li>Kamera</li>
                  <li>4. oś obrotowa</li>
                  <li>5. oś obrotowa</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Typ stołu roboczego</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>T-rowkowy</li>
                  <li>Podciśnieniowy</li>
                  <li>Próżniowy</li>
                  <li>Hybrydowy</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <table class="maszyny-dane-tabela piecosie">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wymiar obszaru roboczego (mm)</td>
              <td class="highlight-options">⌀ 350</td>
            </tr>
            <tr>
              <td>Automatyczny magazyn narzędzi ATC</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Bez wymiany</li>
                  <li>Magazyn rewolwerowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Niezależny pulpit operatorski</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Opcje dodatkowe</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Chłodzenie (ciągłe cieczą)</li>
                  <li>Chłodzenie (mgła olejowa)</li>
                  <li>Pomiar wysokości narzędzia</li>
                  <li>Sonda 3D</li>
                  <li>Centralne smarowanie</li>
                  <li>Kamera</li>
                  <li>4. oś obrotowa</li>
                  <li>5. oś obrotowa</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Typ stołu roboczego</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>T-rowkowy</li>
                  <li>Podciśnieniowy</li>
                  <li>Próżniowy</li>
                  <li>Hybrydowy</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Zakres pracy osi A</td>
              <td class="highlight-options">0-360°</td>
            </tr>
            <tr>
              <td>Zakres pracy osi B</td>
              <td class="highlight-options">0-210°</td>
            </tr>
          </tbody>
        </table>
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <table class="maszyny-dane-tabela tnace">
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Dostępne opcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wymiary obszaru roboczego (mm)</td>
              <td class="highlight-options">
                <ul class="options-list">
                  <li>1500×2000</li>
                  <li>2000×2500</li>
                  <li>2000×3000</li>
                  <li>2000×4000</li>
                  <li>700×1600</li>
                  <li>1000×1200</li>
                  <li>1000×1400</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Wysokość nad stołem roboczym (mm)</td>
              <td class="highlight-options">270</td>
            </tr>
            <tr>
              <td>Nóż oscylacyjny</td>
              <td class="standard-feature">✓ Pneumatyczny</td>
            </tr>
            <tr>
              <td>Głowica tnąca</td>
              <td class="specs-text">
                <ul class="options-list">
                  <li>Frezująca</li>
                  <li>Bigująca</li>
                  <li>Znakująca</li>
                  <li>Pisząca</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Niezależny pulpit operatorski</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
            <tr>
              <td>Typ stołu roboczego</td>
              <td class="standard-feature">✓ Próżniowy</td>
            </tr>
            <tr>
              <td>Taśmowy, bezkońcowy stół transportowy</td>
              <td class="standard-feature">✓ Tak</td>
            </tr>
          </tbody>
        </table>
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

<style lang="scss">
  .maszyny-dane-tabela {
    .text {
      color: var(--color-text-primary);
    }
    img {
      width: 30px;
    }
  }

  .maszyny-dane-header {
    display: flex !important;
    align-items: flex-end !important;
    gap: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    flex-direction: row !important;
    justify-content: flex-start !important;
    margin-bottom: -10px !important;

    img {
      width: 120px;
      margin-left: calc(-2px);
      margin-right: calc(-32px);
      height: 120px;
      background: none;
      border-radius: 0px;
      padding: 0px;
      box-shadow: none;
    }
    h2 {
      position: relative;
      background-color: #eeeeee !important;
      height: 30px;
      font-size: 1.3em !important;
      font-weight: 500 !important;
      padding-top: 3px;
      margin-bottom: 10px !important;
    }
  }
  .maszyny-dane-hr {
    margin-bottom: 4em !important;
  }
  .maszyny-dane-podtytul {
    font-weight: 700;
    font-size: 21px;
    color: #000000;
    padding-left: 1.1em;
    padding-top: 2em;
    padding-bottom: 1em;
  }
  .maszyny-dane-text-image {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap; /* Zmieniono na wrap */

    .left {
      flex: 1; /* Pozwól lewej kolumnie rosnąć */
      min-width: 50%; /* Minimalna szerokość, aby nie było zbyt wąsko na większych ekranach */
    }

    .right {
      width: 32%; /* Zachowaj oryginalną szerokość na większych ekranach */
      text-align: right;

      img {
        max-width: 100%; /* Upewnij się, że obrazki nie wychodzą poza kontener */
        height: auto;
      }
    }
  }

  @media (max-width: 900px) {
    .maszyny-dane-text-image {
      flex-direction: column; /* Ułóż elementy w kolumnie na małych ekranach */

      .left,
      .right {
        width: 100%; /* Zajmij całą szerokość */
        text-align: left; /* Wyrównaj tekst do lewej */
      }

      .right {
        margin-top: 20px; /* Dodaj odstęp między sekcjami */
      }
    }
  }
  .maszyny-dane-lista-small li {
    padding-left: 1em;
    font-size: 15px !important;
    border-left: 5px solid var(--color-primary);
    margin-bottom: 0.3em;
    margin-left: 30px;
    color: var(--color-text-secondary);
  }
  li {
    color: var(--color-text-secondary);
  }
  h1 {
    font-size: 21px;
    font-weight: 400;
  }
  hr,
  .maszyny-dane hr {
    margin-top: 1em;
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
  }

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

  :global(.oferta-grid) {
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

      img {
        margin-left: 0.6em;
      }
    }
  }

  /* --- UNIFIKOWANE STYLE DLA BLOKU MASZYNY --- */
  .maszyny-dane {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
    padding: 3rem 9rem 2.5rem 9rem; /* Zmieniono padding, aby odpowiadał szerokości kontenera */
    margin-bottom: 3rem;
    /* Usunięto max-width i margin: auto */
  }
  .maszyny-dane-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .maszyny-dane-ikona {
    width: 60px;
    height: 60px;
    background: #f7f7f7;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  }
  .maszyny-dane h2 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
  }
  .maszyny-dane-lista {
    margin: 0 0 1.2rem 0;
    padding-left: 1.2em;
    font-size: 1.08rem;
    color: #222;
  }
  .maszyny-dane-lista li {
    margin-bottom: 0.3em;
    line-height: 1.5;
  }
  .maszyny-dane-podtytul {
    font-weight: 600;
    margin: 1.2em 0 0.5em 0;
    font-size: 1.1rem;
  }
  .maszyny-dane-tabela-wrap {
    overflow-x: auto;
    margin: 1.5em 0 1.5em 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Nowy layout flex dla sekcji z tabelą */
  .maszyny-dane-content {
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-bottom: 40px;
    align-items: flex-start;
  }

  .maszyny-dane-table-column {
    flex: 2;
    min-width: 0; /* Pozwala na shrinking */
  }

  .maszyny-dane-gallery-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 300px;
  }

  .maszyny-dane-tabela {
    width: 100%;
    border-collapse: collapse;
    background: #fafbfc;
    border-radius: 10px;
    overflow: hidden;
    font-size: 1rem;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.03);
  }
  .maszyny-dane-tabela th,
  .maszyny-dane-tabela td {
    padding: 0.8em 1em;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }
  .maszyny-dane-tabela th {
    background: #f1f3f6;
    font-weight: 600;
    font-size: 1.05em;
  }
  .maszyny-dane-tabela tr:last-child td {
    border-bottom: none;
  }
  .maszyny-dane-cta {
    margin-top: 2.2em;
    text-align: right;
  }
  @media (max-width: 900px) {
    .maszyny-dane {
      padding: 2rem 1rem;
    }
    .maszyny-dane-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.7rem;
    }
    .maszyny-dane-cta {
      text-align: center;
    }
  }
  /* --- KONIEC UNIFIKOWANYCH STYLI --- */

  /* --- STYLE DLA NOWYCH TABEL --- */
  tbody tr td img {
    float: left;
    margin-right: 20px;
  }

  tbody tr td .text {
    width: auto;
    display: flow-root;
  }

  .options-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    list-style-type: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .options-list li {
    padding: 6px;
    position: relative;
    list-style-type: none;
    border: 1px solid gray;
    border-radius: 15px;
    width: auto;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.04);
    margin-bottom: 4px;
    margin-right: 12px;
    padding-left: 12px;
    padding-right: 12px;
    transition: all ease 0.3s;
  }

  .options-list li:hover {
    background-color: white;
  }

  .standard-feature {
    color: #27ae60;
    font-weight: 600;
  }

  .specs-text {
    line-height: 1.5;
  }

  .highlight-options {
    /* Dodatkowe style dla wyróżnionych opcji */
  }

  /* Ujednolicone kolory nagłówków dla wszystkich tabel */
  .frezarki th,
  .plotery th,
  .zabudowa th,
  .grawerka th,
  .piecosie th,
  .tnace th {
    background: linear-gradient(135deg, #3498db, #2980b9) !important;
  }

  /* Dodatkowe style dla pierwszej kolumny tabel */
  .maszyny-dane-tabela td:first-child {
    font-weight: 600;
    background-color: #f8f9fa;
    border-right: 2px solid #3498db;
    min-width: 250px;
    flex-direction: row;
    align-items: start;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: start;
    height: auto;
    min-height: 36px;
    justify-items: stretch;
  }

  .maszyny-dane-tabela td:last-child {
    width: 65%;
  }

  .maszyny-dane-tabela tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .maszyny-dane-tabela tr:hover {
    background-color: #e3f2fd;
    transition: background-color 0.3s ease;
  }
  /* --- KONIEC STYLI DLA NOWYCH TABEL --- */

  /* Tablet i mniejsze laptopy */
  @media (max-width: 1200px) {
    .maszyny-dane .maszyny-dane-content {
      flex-direction: column;
      gap: 30px;
    }

    .maszyny-dane .maszyny-dane-table-column,
    .maszyny-dane .maszyny-dane-gallery-column {
      flex: none;
      width: 100%;
      min-width: auto;
    }

    .maszyny-dane .maszyny-dane-gallery-column {
      order: 2;
    }

    .maszyny-dane .maszyny-dane-table-column {
      order: 1;
    }
  }

  /* Średnie tablety */
  @media (max-width: 1024px) {
    .maszyny-dane .maszyny-dane-content {
      gap: 25px;
    }
  }

  @media (max-width: 768px) {
    .maszyny {
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

    /* Dodatkowe style dla małych ekranów */
    .maszyny-dane .maszyny-dane-content {
      flex-direction: column;
      gap: 20px;
    }

    .maszyny-dane .maszyny-dane-table-column,
    .maszyny-dane .maszyny-dane-gallery-column {
      flex: none;
      width: 100%;
      min-width: auto;
    }

    .options-list li {
      font-size: 0.8rem;
      padding: 4px 8px;
    }

    .maszyny-dane-tabela-wrap {
      overflow-x: auto;
    }

    .maszyny-dane-tabela {
      min-width: 500px;
    }
  }
</style>

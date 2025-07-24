<script lang="ts">
  import CtaButton from "./cta-button-kategory.svelte";
  const maszyny = [];

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          <img src="/assets/ikony/frezarki.svg" alt="Frezarki CNC" />
        </div>

        <CtaButton text="Frezarki CNC" on:click={() => scrollToSection('Frezarki')} />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="/assets/ikony/tokarki.svg" alt="Tokarki CNC" />
        </div>

        <CtaButton text="Tokarki CNC" on:click={() => scrollToSection('Tokarki')} />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="/assets/ikony/grawerki.svg" alt="Grawerki CNC" />
        </div>

        <CtaButton text="Grawerki CNC" on:click={() => scrollToSection('Grawerki')} />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="/assets/ikony/plotery.svg" alt="Plotery CNC" />
        </div>

        <CtaButton text="Plotery CNC" on:click={() => scrollToSection('Plotery')} />
      </div>
    </div>
  </div>
  "
</section>

<section id="Frezarki" class="maszyny-dane">
  <div class="maszyny-dane-header no-sel">
    <img
      src="/assets/ikony/frezarki.svg"
      alt="Frezarki CNC"
      class="maszyny-dane-ikona"
    />
    <h2>Frezarki CNC</h2>
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
      <img src="/assets/maszyny/certus_7111_temp_schemat02.png" alt="Schemat techniczny frezarki Certus 7111 - widok 2" >
    </div>
  </div>

  <div class="maszyny-dane-tabela-wrap">
    <table class="maszyny-dane-tabela">
      <thead>
        <tr>
          <th>Model</th>
          <th>Pole pracy</th>
          <th>Waga [t]</th>
          <th>Opcje wyposażenia</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>CERTUS 1212<br />STANDARD / ATC</b></td>
          <td>1200 x 1200 x 350</td>
          <td>4,2</td>
          <td>Automatyczna wymiana narzędzi (ATC), magazyn narzędzi</td>
        </tr>
        <tr>
          <td><b>CERTUS 1080<br />STANDARD / ATC</b></td>
          <td>1000 x 800 x 350</td>
          <td>3,5</td>
          <td></td>
        </tr>
        <tr>
          <td><b>CERTUS 7060<br />STANDARD / ATC</b></td>
          <td>700 x 600 x 279</td>
          <td>1,2</td>
          <td></td>
        </tr>
        <tr>
          <td><b>CERTUS 4040<br />STANDARD / ATC</b></td>
          <td>400 x 400 x 350</td>
          <td>0,7</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="maszyny-dane-cta">
    <CtaButton text="Zamów konsultację" />
  </div>
</section>

<style lang="scss">
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
  }
</style>

<script lang="ts">
  import '$lib/table.scss';
  import { typoFixAction } from "$lib/utils/typography";
</script>

<section class="Dokumentacja_page gradientHero">
  <!--  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div> -->
</section>
<section id="dokumentacja" class="dokumentacja">
  <div class="dokumentacja-container container">
    <div class="section-header">
      <h1 class="no-sel">Dokumentacja</h1>
      <hr />
      <div class="dokumentacja-intro" use:typoFixAction>

        <p>
          W tej sekcji znajdą Państwo wszystkie niezbędne dokumenty techniczne, formularze oraz instrukcje dotyczące naszych maszyn CNC. Dbamy o to, aby nasi klienci mieli łatwy dostęp do pełnej dokumentacji, co jest kluczem do efektywnej i bezpiecznej pracy z naszymi urządzeniami. Poniższa tabela zawiera szczegółowe protokoły, karty kontrolne oraz ogólne warunki, które pomogą w codziennej eksploatacji i konserwacji.
        </p>
        <p>
          Każdy dokument został przygotowany z myślą o Państwa wygodzie i zawiera kluczowe informacje techniczne. Jeśli jednak potrzebują Państwo dodatkowych wyjaśnień lub spersonalizowanej instrukcji, nasz zespół wsparcia technicznego jest do Państwa dyspozycji. Zachęcamy do skorzystania z naszego <a href="/kontakt">formularza kontaktowego</a>, aby zadać pytanie lub poprosić o szczegółowe informacje.
        </p>
        <p>
          W przypadku dokumentów związanych z obsługą serwisową, takich jak formularze zgłoszenia usterki czy zasady serwisu, więcej informacji na temat naszych usług znajdą Państwo na stronie <a href="/serwis">Serwis</a>. Naszym priorytetem jest zapewnienie Państwu kompleksowego wsparcia na każdym etapie współpracy.
        </p>
      </div>
    </div>

    <div class="maszyny-dane-tabela-wrap">
      <table class="maszyny-dane-tabela">
        <thead>
          <tr>
            <th>Opis</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Formularz przeglądu technicznego okresowego (checklista)</strong><br>
              Dokument ten stanowi checklistę do przeprowadzania okresowych przeglądów technicznych maszyn. Obejmuje kontrolę układu mechanicznego, elektrycznego, automatyki oraz systemów bezpieczeństwa.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/Formularz-przeglądu-technicznego-okresowego-checklista.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /> </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Formularz zgłoszenia usterki (serwisowy)</strong><br>
              Formularz służący do zgłaszania awarii lub nieprawidłowego działania maszyn. Zawiera pola na dane zgłaszającego, szczegóły maszyny oraz dokładny opis usterki.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/Formularz-zgłoszenia-usterki-serwisowy.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>KARTA KONTROLNA BHP</strong><br>
              Karta kontrolna bezpieczeństwa i higieny pracy. Jest to checklista do weryfikacji stanu maszyny, wymaganych środków ochrony indywidualnej oraz procedur bezpieczeństwa przed rozpoczęciem pracy.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/KARTA-KONTROLNA-BHP.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Ogólne Warunki Sprzedaży (OWS)</strong><br>
              Dokument określa ogólne warunki sprzedaży obowiązujące w MG-CERTUS. Reguluje kwestie związane z ofertami, zamówieniami, cenami, warunkami płatności i dostaw.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/OWS.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Protokół odbioru technicznego maszyny CNC</strong><br>
              Protokół używany przy technicznym odbiorze maszyny CNC. Dokumentuje dane ogólne, stan maszyny, zakres wdrożenia oraz oświadczenia stron po zakończeniu instalacji.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/PROTOKÓŁ-ODBIORU–TECHNICZNEGO-MASZYNY-CNC.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Protokół szkoleniowo-wdrożeniowy operatora CNC</strong><br>
              Dokument potwierdzający przeszkolenie operatora maszyny CNC. Określa zakres odbytego szkolenia, obejmujący m.in. bezpieczeństwo, obsługę, programowanie i konserwację.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/Protokół szkoleniowo-wdrożeniowy operatora CNC.pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Zasady serwisu</strong><br>
              Dokument opisujący zasady świadczenia usług serwisowych. Obejmuje warunki serwisu gwarancyjnego, pogwarancyjnego oraz zasady przeprowadzania okresowych przeglądów i napraw.
            </td>
            <td>
              <a href="/do_pobrania/dokumantacja/Zasady serwisu gwarancyjnego, pogwarancyjnego i okresowych napraw - CERTUS (1).pdf" download class="cta-button"><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <span class="triangle"></span>
</section>

<style lang="scss">
  .cta-button {
    display: inline-block;
    padding: 10px 15px;
    
    color: #333;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .cta-button:hover {
    
  }

  .cta-button img {
    vertical-align: middle;
  }

  .dokumentacja-intro {
    padding-top: 5%;
    margin-bottom: 60px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-size: 1.1rem;
    color: #333;
  
    
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-size: 1.1rem;
    color: #333;
  }

  .dokumentacja-intro p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5em;
    line-height: 1.7;
  }

  .dokumentacja-intro a {
    color: var(--color-primary);
    text-decoration: underline;
    font-weight: 600;
  }

  .dokumentacja-intro a:hover {
    color: var(--color-primary-dark);
  }
  @media (min-width: 1200px) {
    tbody tr td:first-child {
         width: 90% !important; 
        min-width: 20px !important;
    }
}
  .dokumentacja-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .dokumentacja {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    .dokumentacja {
      padding: 80px 0;
    }
  }
  #dokumentacja {
    overflow: hidden;
    background-color: #ffffff;
    min-height: 50vh;
    &::before {
      content: "";
      position: absolute;
      top: 220px;
      left: 0px;
      width: 100%;
      height: 50px;
      background-image: url(/assets/images/pattern-image1-2.png);
    }
  }
  .triangle {
    position: absolute;
    width: 400px;
    height: 100px;
    top: 160px;
    left: 0;
    z-index: 1; // Ensure it's above other content if needed

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 55px;
      background: #ffffff;
      clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
    }
  }
  @media (max-width: 800px) {
     .triangle {
      &::after {
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
     .triangle {
      &::after {
        clip-path: polygon(0 0, 20% 0, 40% 101%, 0% 100%) !important;
      }
    }
  }

  .Dokumentacja-container {
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

  .Dokumentacja_page {
    min-width: 100vw;
    margin: 0 auto;
    height: 260px;
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
  .Dokumentacja {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    .Dokumentacja {
      padding: 80px 0;
    }
  }
</style>

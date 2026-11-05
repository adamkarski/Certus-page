<script lang="ts">
  import "$lib/table.scss";
  import { typoFixAction } from "$lib/utils/typography";
</script>

<section class="Dokumentacja_page gradientHero_old">
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
          W tej sekcji znajdą Państwo wszystkie niezbędne dokumenty techniczne,
          formularze oraz instrukcje dotyczące naszych maszyn CNC. Dbamy o to,
          aby nasi klienci mieli łatwy dostęp do pełnej dokumentacji, co jest
          kluczem do efektywnej i bezpiecznej pracy z naszymi urządzeniami.
          Poniższa tabela zawiera szczegółowe protokoły, karty kontrolne oraz
          ogólne warunki, które pomogą w codziennej eksploatacji i konserwacji.
        </p>
        <p>
          Każdy dokument został przygotowany z myślą o Państwa wygodzie i
          zawiera kluczowe informacje techniczne. Jeśli jednak potrzebują
          Państwo dodatkowych wyjaśnień lub spersonalizowanej instrukcji, nasz
          zespół wsparcia technicznego jest do Państwa dyspozycji. Zachęcamy do
          skorzystania z naszego <a href="/kontakt">formularza kontaktowego</a>,
          aby zadać pytanie lub poprosić o szczegółowe informacje.
        </p>
        <p>
          W przypadku dokumentów związanych z obsługą serwisową, takich jak
          formularze zgłoszenia usterki czy zasady serwisu, więcej informacji na
          temat naszych usług znajdą Państwo na stronie <a href="/serwis"
            >Serwis</a
          >. Naszym priorytetem jest zapewnienie Państwu kompleksowego wsparcia
          na każdym etapie współpracy.
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
              <strong>Ogólne Warunki Sprzedaży (OWS)</strong><br />
              Warunki ofert, zamówień, płatności, dostawy, gwarancji i odpowiedzialności MG-CERTUS.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_OWS_Ogolne_Warunki_Sprzedazy.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Zasady serwisu i cennik usług serwisowych</strong><br />
              Serwis gwarancyjny i pogwarancyjny, przeglądy okresowe, tryb zgłoszeń, stawki i koszt dojazdu.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Zasady_serwisu_i_cennik.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Protokół odbioru technicznego maszyny CNC</strong><br />
              Protokół podpisywany przy odbiorze: dane maszyny i wyposażenia, zakres wdrożenia, stan maszyny, oświadczenia stron.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Protokol_odbioru_technicznego.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Protokół szkolenia i wdrożenia operatora</strong><br />
              Potwierdzenie szkolenia operatora: zakres szkolenia, uwagi i podpisy.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Protokol_szkolenia_operatora.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Karta kontrolna BHP</strong><br />
              Kontrola stanu maszyny, środków ochrony indywidualnej i procedur bezpieczeństwa przed rozpoczęciem pracy.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Karta_kontrolna_BHP.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Zgłoszenie usterki / awarii</strong><br />
              Formularz zgłoszenia serwisowego. Wypełniony wyślij na kontakt@mg-certus.pl wraz ze zdjęciami lub wideo.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Zgloszenie_usterki.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Protokół serwisowy z kartą przeglądu</strong><br />
              Protokół wizyty serwisowej (przegląd, naprawa) z kartą pomiarów i listą kontrolną przeglądu okresowego.
            </td>
            <td>
              <a
                href="/do_pobrania/dokumentacja/CERTUS_Protokol_serwisowy_karta_przegladu.pdf"
                download
                class="cta-button"
                ><img src="/assets/ikony/doc.svg" alt="Pobierz PDF" width="28" height="36" loading="lazy" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <span class="triangle"></span>
</section>

<style lang="scss">

:global(.gradientHero_old) {
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
  }


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
    
  }

  tbody tr td:first-child {
      width: 90% !important;
      min-width: 20px !important;
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
    .dokumentacja-container{


      padding: 0 1rem;

    }
  }
  #dokumentacja {
    overflow-x: clip;
    overflow-y: visible;
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
    max-width: 100%;
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
    width: 100%;
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
  #dokumentacja {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    #dokumentacja {
      padding: 80px 0;
    }
  }
</style>

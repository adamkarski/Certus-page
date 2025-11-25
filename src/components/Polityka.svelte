<script lang="ts">
  import { typoFixAction } from "$lib/utils/typography";
</script>

<section class="polityka_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<!-- Sekcja z kartami usług politykaowych używająca istniejących stylów -->
<section id="polityka-services" class="info-cards-section no-sel">
  <div class="privacy-policy-container" use:typoFixAction>
    <h1>Polityka prywatności</h1>

    <h2>I. Informacje ogólne</h2>
    <p>
      Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony
      danych osobowych użytkowników serwisu <a
        href="https://certus-page.onrender.com/"
        >https://certus-page.onrender.com/</a
      > (dalej: Serwis). Serwis zapewnia ochronę Państwa prywatności i przestrzega
      obowiązujących przepisów dotyczących ochrony danych osobowych, w szczególności
      Rozporządzenia Parlamentu Europeyjskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
      2016 r. (RODO).
    </p>

    <h2>II. Administrator danych</h2>
    <p>
      Administratorem Państwa danych osobowych jest CERTUS (lub pełna nazwa
      firmy, jeśli inna), z siedzibą w [adres firmy], e-mail kontaktowy: [adres
      e-mail], telefon: [numer telefonu].
    </p>
    <p>
      W sprawach związanych z ochroną danych osobowych można kontaktować się
      również z inspektorem ochrony danych (IOD) pod adresem: [adres e-mail
      IOD].
    </p>

    <h2>III. Cele i podstawy prawne przetwarzania danych</h2>
    <p>Dane osobowe mogą być przetwarzane w celach:</p>
    <ul>
      <li>świadczenia usług oferowanych przez Serwis,</li>
      <li>obsługi zapytań i kontaktu poprzez formularze kontaktowe,</li>
      <li>realizacji obowiązków prawnych,</li>
      <li>
        marketingu bezpośredniego własnych produktów i usług (jeśli wyrazili
        Państwo na to zgodę),
      </li>
      <li>zapewnienia bezpieczeństwa Serwisu i zapobiegania nadużyciom.</li>
    </ul>
    <p>Podstawą prawną przetwarzania danych jest:</p>
    <ul>
      <li>zgoda użytkownika (art. 6 ust. 1 lit. a RODO),</li>
      <li>
        realizacja umowy lub podjętych działań na żądanie użytkownika przed
        zawarciem umowy (art. 6 ust. 1 lit. b RODO),
      </li>
      <li>
        obowiązek prawny ciążący na administratorze (art. 6 ust. 1 lit. c RODO),
      </li>
      <li>
        prawnie uzasadnione interesy realizowane przez administratora (art. 6
        ust. 1 lit. f RODO).
      </li>
    </ul>

    <h2>IV. Zakres i rodzaj przetwarzanych danych</h2>
    <p>
      W Serwisie mogą być zbierane dane osobowe takie jak: imię, nazwisko, adres
      e-mail, numer telefonu, adres IP, a także dane zbierane automatycznie za
      pomocą plików cookies i technologii podobnych (np. dane o zachowaniu na
      stronie).
    </p>

    <h2>V. Odbiorcy danych</h2>
    <p>
      Dane osobowe mogą być udostępniane wyłącznie upoważnionym podmiotom, takim
      jak podmioty realizujące usługi techniczne i informatyczne (np. dostawcy
      hostingu), podmioty obsługujące płatności, firmy kurierskie, organy
      publiczne w zakresie przewidzianym prawem.
    </p>
    <p>
      Dane nie są przekazywane do państw spoza Europejskiego Obszaru
      Gospodarczego, chyba że jest to konieczne i odbywa się z zastosowaniem
      odpowiednich zabezpieczeń.
    </p>

    <h2>VI. Okres przechowywania danych</h2>
    <p>
      Dane osobowe będą przechowywane przez czas niezbędny do realizacji celów,
      dla których zostały zebrane, w tym przez okres przedawnienia roszczeń lub
      do czasu wycofania zgody.
    </p>

    <h2>VII. Prawa użytkowników</h2>
    <p>Użytkownicy Serwisu mają prawo do:</p>
    <ul>
      <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
      <li>sprostowania (poprawiania) danych,</li>
      <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
      <li>ograniczenia przetwarzania danych,</li>
      <li>wniesienia sprzeciwu wobec przetwarzania danych,</li>
      <li>przenoszenia danych do innego administratora,</li>
      <li>
        wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem
        przetwarzania przed jej wycofaniem),
      </li>
      <li>
        wniesienia skargi do organu nadzorczego (w Polsce jest to Urząd Ochrony
        Danych Osobowych).
      </li>
    </ul>

    <h2>VIII. Pliki cookies i technologie podobne</h2>
    <p>
      Serwis wykorzystuje pliki cookies w celu zapewnienia prawidłowego
      działania strony, analizy ruchu, reklamy oraz personalizacji treści.
    </p>
    <p>
      Użytkownik może w każdej chwili zmienić ustawienia dotyczące cookies w
      swojej przeglądarce.
    </p>

    <h2>IX. Zabezpieczenia</h2>
    <p>
      Administrator stosuje odpowiednie środki techniczne i organizacyjne
      zapewniające ochronę danych osobowych przed nieuprawnionym dostępem,
      utratą czy zmianą.
    </p>
  </div>
</section>

<style lang="scss">


.privacy-policy-container {
      max-width: 800px;
      margin: 20px auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
  }
  h2 {
      color: #34495e;
      margin-top: 25px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
  }
  p {
      margin-bottom: 10px;
      color: var(--color-text-secondary);
  }
  ul {
      list-style-type: disc;
      margin-left: 20px;
      margin-bottom: 10px;
  }
  ul li {
      margin-bottom: 5px;
      color: var(--color-text-secondary);
  }
  a {
      color: #3498db;
      text-decoration: none;
  }
  a:hover {
      text-decoration: underline;
  }






  .pattern-overlay {
    position: relative;
    top: 148px;
    overflow: hidden;
    left: 0;
    width: 100%;
    height: 20px;
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

  .polityka_page {
    min-width: 100vw;
    margin: 0 auto;
    min-height: 174px;
  }

  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 147px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
    filter: contrast(8.5);
  }






  a:hover {
    color: var(--color-primary);
  }




</style>

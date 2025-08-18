<script lang="ts">
  import OfertaGrid from "./OfertaGrid.svelte";
  import { fade } from 'svelte/transition';
</script>

<section class="onas_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
  <div class="hero-content"></div>
</section>




<div class="hero-text">
  <h1 class="hero-title">O firmie CERTUS</h1>
  <p class="hero-tagline">Your Vision, Our Precision</p>
  <p class="hero-description">
    Jesteśmy polskim producentem maszyn CNC z ponad 10-letnim
    doświadczeniem w branży. Specjalizujemy się w tworzeniu precyzyjnych
    urządzeń dostosowanych do indywidualnych potrzeb naszych klientów.
  </p>
  <button class="btn btn--primary btn--lg cta-button"
    >Poznaj nasze produkty</button
  >
</div>



<!-- Co nas wyróżnia Section -->
<section class="wyroznia section">
  <h2 class="section-title">Co nas wyróżnia</h2>
  <div class="strengths-grid">
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M503.5 284.5l-91-91c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-12.5 12.5-12.5 32.8 0 45.3l67.9 67.9-45.3 45.3-67.9-67.9c-12.5-12.5-32.8-12.5-45.3 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6l91 91c6.2 6.2 16.4 6.2 22.6 0l136-136c6.3-6.2 6.3-16.4 0-22.6zM208 32c-26.5 0-48 21.5-48 48v32H48c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-16V80c0-26.5-21.5-48-48-48H208z"
          /></svg
        >
      </div>
      <h3>Wszechstronność i elastyczność</h3>
      <p>
        Od małych warsztatów po złożone linie produkcyjne – tworzymy maszyny CNC
        dostosowane do potrzeb. Realizujemy również nietypowe projekty dla
        różnorodnych branż.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM256 448a192 192 0 1 1 0-384 192 192 0 1 1 0 384zM256 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
          /></svg
        >
      </div>
      <h3>Indywidualne podejście</h3>
      <p>
        Nie sprzedajemy gotowców – każda maszyna powstaje w dialogu z Klientem.
        Dopasowujemy parametry, konfiguracje i rozwiązania technologiczne.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8z"
          /></svg
        >
      </div>
      <h3>Solidność i niezawodność</h3>
      <p>
        Nasze maszyny tworzone są z myślą o wieloletniej eksploatacji. CERTUS to
        jakość bez kompromisów – nasze urządzenia pracują 24/7.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V64C32 46.3 46.3 32 64 32zM160 224c17.7 0 32 14.3 32 32v96c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V256c0-17.7 14.3-32 32-32zM288 128c17.7 0 32 14.3 32 32v192c0 8.8-7.2 16-16 16H304c-8.8 0-16-7.2-16-16V160c0-17.7 14.3-32 32-32zM416 288c17.7 0 32 14.3 32 32v32c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V320c0-17.7 14.3-32 32-32zM480 32c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32z"
          /></svg
        >
      </div>
      <h3>Najlepszy stosunek jakości do ceny</h3>
      <p>
        Umożliwiamy inwestycje w profesjonalne maszyny bez przepłacania.
        Wszystko projektujemy i montujemy w Polsce.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M192 208c0-17.7-14.3-32-32-32h-16c-35.3 0-64 28.7-64 64v48c0 35.3 28.7 64 64 64h16c17.7 0 32-14.3 32-32V208zM512 208v48c0 35.3-28.7 64-64 64h-16c-17.7 0-32-14.3-32-32V208c0-17.7 14.3-32 32-32h16c35.3 0 64 28.7 64 64zM288 32c-17.7 0-32 14.3-32 32V416c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32z"
          /></svg
        >
      </div>
      <h3>Serwis i rozwój</h3>
      <p>
        Oferujemy serwis gwarancyjny i pogwarancyjny oraz modernizacje urządzeń
        innych producentów. Twoja maszyna może rozwijać się razem z Tobą.
      </p>
    </div>
  </div>
</section>





<!-- Historia Section -->
<section class="historia section">







  <h2 class="section-title">Nasza Historia</h2>
  <div class="historia-content">
    <div class="timeline">
      <div class="timeline-item fade-in" in:fade>
        <div class="timeline-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="1em"
            height="1em"
            fill="currentColor"
            ><path
              d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
            /></svg
          >
        </div>
        <div class="timeline-content">
          <h3>2000</h3>
          <p>Właściciel związany z rynkiem CNC od 2000 roku</p>
        </div>
      </div>
      <div class="timeline-item fade-in" in:fade>
        <div class="timeline-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            ><path
              d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
            /></svg
          >
        </div>
        <div class="timeline-content">
          <h3>Forum CNC</h3>
          <p>Założyciel kultowego Forum CNC w Polsce</p>
        </div>
      </div>
      <div class="timeline-item fade-in" in:fade>
        <div class="timeline-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            ><path
              d="M378.7 32H133.3L256 182.7L378.7 32zM512 192H0V480c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V192zM256 336c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32s-14.3 32-32 32z"
            /></svg
          >
        </div>
        <div class="timeline-content">
          <h3>Dziś</h3>
          <p>Wiodący producent maszyn CNC w Polsce</p>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- Produkty Section -->
<section class="produkty section">
  <h2 class="section-title">Nasze Produkty</h2>
  <OfertaGrid />
</section>

<!-- Branże Section -->
<section class="branze section">
  <h2 class="section-title">Obsługiwane Branże</h2>
  <div class="industries-grid">
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M378.7 32H133.3L256 182.7L378.7 32zM512 192H0V480c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V192zM256 336c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32s-14.3 32-32 32z"
        /></svg
      >
      <h4>Złotnictwo</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M160 32C160 14.3 145.7 0 128 0S96 14.3 96 32V64H48c-26.5 0-48 21.5-48 48V192c0 26.5 21.5 48 48 48H96v32c0 17.7 14.3 32 32 32s32-14.3 32-32V240h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H160V64H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H160zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352V176c-17.7 0-32 14.3-32 32s14.3 32 32 32h48v32c0 17.7 14.3 32 32 32s32-14.3 32-32V240h48c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H416V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H320V32z"
        /></svg
      >
      <h4>Produkcja okularów</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM160 256c0-19.7 5.8-38.3 15.8-53.1L60.7 148.9c-33.2 36-52.7 82.8-52.7 133.1c0 23.4 3.8 45.9 10.8 67.1L128 320l32-32v-32zM288 480c23.4 0 45.9-3.8 67.1-10.8L320 352l-32-32h-32v32c0 19.7-5.8 38.3-15.8 53.1L288 480zM400 256c0 19.7-5.8 38.3-15.8 53.1L449.3 364.1c33.2-36 52.7-82.8 52.7-133.1c0-23.4-3.8-45.9-10.8-67.1L400 192l-32 32v32z"
        /></svg
      >
      <h4>Przemysł tekstylny</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M318.6 254.6c-8.4-31.5-22.1-58.9-39.3-80.5C262.2 150.2 256 126.3 256 102.3c0-15.2 3.2-29.4 8.9-42.3H247.1c5.7 12.9 8.9 27.1 8.9 42.3 0 24-6.2 47.9-23.3 71.8-17.2 21.6-30.9 49-39.3 80.5C184.8 293.1 160 346.5 160 402.3c0 11.2 1.5 22.1 4.3 32.6H416c-15.2-40.5-28.9-83.2-40.1-127.5-2.1-8.3-4.4-16.5-7-24.6-2.6-8-5.3-15.9-8.2-23.7l-.1-.1zM128 448c0-55.2 24.2-107.2 62.8-145.1 2.5-2.5 5.2-4.9 7.9-7.2-12.4-31.2-21.9-63.8-28.3-97.5C163.6 169.5 144 133.5 144 96c0-35.3 28.7-64 64-64s64 28.7 64 64c0 37.5-20.4 73.5-27.2 102.2-.6 2.5-1.2 5-1.8 7.5H320c-1.2-5.1-2.5-10.2-3.9-15.1-5.8-20.9-11.6-41.8-11.6-64.3 0-35.3 28.7-64 64-64s64 28.7 64 64c0 37.5-19.6 73.5-26.4 102.2-6.8 28.7-16.3 56.1-28.3 81.2l-1.9 3.8c38.6 37.9 62.8 89.9 62.8 145.1H128z"
        /></svg
      >
      <h4>Obróbka kamienia</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM128 256a128 128 0 1 1 256 0 128 128 0 1 1 -256 0zM80 256a176 176 0 1 0 352 0 176 176 0 1 0 -352 0z"
        /></svg
      >
      <h4>Jubilerstwo</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width="1em"
        height="1em"
        fill="currentColor"
        ><path
          d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 352.8 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"
        /></svg
      >
      <h4>Optyka</h4>
    </div>
  </div>
</section>

<!-- Dlaczego CERTUS Section -->
<section class="dlaczego section">
  <div class="dlaczego-content">
    <h2 class="section-title">Dlaczego CERTUS?</h2>
    <p class="dlaczego-text">
      Wybierając CERTUS, inwestujesz w polską jakość, indywidualne podejście i
      wieloletnie doświadczenie. Nasze maszyny CNC to gwarancja precyzji,
      niezawodności i optymalnego stosunku jakości do ceny.
    </p>
    <button class="btn btn--primary btn--lg">Skontaktuj się z nami</button>
  </div>
</section>

<style lang="scss">
  .onas_page {
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
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .section {
    padding: 60px 0;
  }

  .section-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
    font-weight: bold;
  }

  /* Historia Section */
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    &::after {
      content: "";
      position: absolute;
      width: 6px;
      background-color: var(--color-border);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }
  }

  .timeline-item {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    width: 50%;
    &.fade-in {
    }
    &:nth-child(odd) {
      left: 0;
    }
    &:nth-child(even) {
      left: 50%;
    }
    &::after {
      content: "";
      position: absolute;
      width: 25px;
      height: 25px;
      right: -17px;
      background-color: white;
      border: 4px solid var(--color-primary);
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    &:nth-child(even)::after {
      left: -16px;
    }
  }

  .timeline-icon {
    position: absolute;
    top: 15px;
    font-size: 1.5rem;
    color: var(--color-primary);
    z-index: 2;
  }

  .timeline-content {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border-radius: 6px;
  }

  /* Co nas wyróżnia Section */
  .strengths-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  .strength-card {
    background: var(--color-bg-secondary);
    padding: 30px;
    text-align: center;
    border-radius: 8px;
    transition: transform 0.3s;
    &:hover {
      transform: translateY(-10px);
    }
  }

  .strength-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    color: var(--color-primary);
  }

  /* Branże Section */
  .industries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    text-align: center;
  }

  .industry-card {
    i {
      font-size: 3rem;
      margin-bottom: 10px;
    }
  }

  /* Dlaczego CERTUS Section */
  .dlaczego {
    background: var(--color-bg-secondary);
    text-align: center;
  }

  .dlaczego-text {
    max-width: 800px;
    margin: 0 auto 30px;
  }

  @media (max-width: 768px) {
    .timeline::after {
      left: 20px;
    }

    .timeline-item {
      width: 100%;
      padding-left: 60px;
      left: 0 !important;
    }

    .timeline-item::after {
      left: 13px;
    }

    .timeline-item:nth-child(even)::after {
      left: 13px;
    }

    .timeline-item:nth-child(even) {
      left: 0; /* Ensure it's not pushed to 50% on mobile */
    }
  }
</style>

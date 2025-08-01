<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
  
  let sectionEl: HTMLElement;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="serwis_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="serwis" class="serwis">
  <div class="serwis-container container">
    <div class="section-header">
      <h1 class="no-sel">Serwis</h1>
      <hr />
    </div>
    
    <div class="content-intro">
      <p class="intro-text" use:typoFixAction>Rola naszego przedsiębiorstwa nie kończy się zaraz po dostarczeniu Ci maszyn. Oferujemy bowiem także profesjonalny serwis gwarancyjny oraz pogwarancyjny. W ten sposób możemy zapewnić naszym Klientom pełen zakres wsparcia technicznego.</p>
    </div>
  </div>
</section>

<!-- Sekcja z kartami serwisowymi -->
<section class="info-cards-section no-sel" bind:this={sectionEl}>
  <div class="info-cards-wrapper">
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 0 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Serwis gwarancyjny" class="info-icon" />
        <span class="info-title" use:typoFixAction>Serwis<br>gwarancyjny:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Zapewniamy pełen serwis gwarancyjny dla wszystkich naszych maszyn CNC. Nasz zespół techników jest dostępny, aby szybko rozwiązać wszelkie problemy.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 300 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Serwis pogwarancyjny" class="info-icon" />
        <span class="info-title" use:typoFixAction>Serwis<br>pogwarancyjny:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Nawet po zakończeniu okresu gwarancji, nadal świadczymy profesjonalne usługi serwisowe. Dbamy o długotrwałą współpracę z naszymi Klientami.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 600 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Przeróbki i modernizacje" class="info-icon" />
        <span class="info-title">Przeróbki<br>i modernizacje</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Oferujemy przeróbki maszyn innych producentów oraz modernizacje istniejących urządzeń, dostosowując je do aktualnych potrzeb.
      </p>
    </div>
  </div>
</section>

<!-- Sekcja kontaktowa w stylu istniejącego komponentu -->
<section class="serwis-contact">
  <div class="contact-flex">
    <div class="contact-left">
      <h2>Potrzebujesz pomocy serwisowej?</h2>
      <ul  use:typoFixAction  class="contact-bullets no-sel">
        <li>
          <span  use:typoFixAction  class="bullet"></span>
          Doświadczony zespół techników z ponad 10-letnim stażem w branży CNC
        </li>
        <li>
          <span class="bullet"></span>
          Szybka reakcja na zgłoszenia serwisowe - zazwyczaj w ciągu 24 godzin
        </li>
        <li>
          <span class="bullet"></span>
          Oryginalne części zamienne najwyższej jakości oraz konkurencyjne ceny
        </li>
      </ul>
      <div class="contact-info-block">
        <div class="info-row">
          <span class="info-icon">
            <img src="assets/ikony/telefon.svg" alt="Telefon" />
          </span>
          <b>
            <a href="tel:+48606324406" title="Zadzwoń do serwisu Certus">+48 606 324 406</a>
          </b>
        </div>
        <div class="info-row">
          <span class="info-icon">
            <img src="assets/ikony/email.svg" alt="Email" />
          </span>
          <b>
            <a href="mailto:biuro@mg-certus.pl" title="Wyślij e-mail do serwisu">biuro@mg-certus.pl</a>
          </b>
        </div>
        <div class="info-row">
          <span class="info-icon">
            <img src="assets/ikony/lokalizacja.svg" alt="Lokalizacja" />
          </span>
          <b>
            <a href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" title="Otwórz lokalizację serwisu w Google Maps" rel="noopener noreferrer">
              Biała Droga 177, 34-123 Chocznia, woj. Małopolskie
            </a>
          </b>
        </div>
      </div>
    </div>
    <div class="contact-right">
      <div class="service-benefits">
        <h3>Dlaczego warto wybrać nasz serwis?</h3>
        <ul class="benefits-list">
          <li use:typoFixAction>Kompleksowe wsparcie techniczne</li>
          <li use:typoFixAction>Możliwość modernizacji i rozbudowy maszyn</li>
          <li use:typoFixAction>Serwis na miejscu u klienta</li>
          <li use:typoFixAction>Pomoc w konfiguracji i ustawieniu maszyn</li>
          <li use:typoFixAction>Ciągłość pracy urządzeń</li>
          <li use:typoFixAction>Profesjonalne doradztwo techniczne</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Dodatkowa sekcja z treścią -->
<section id="serwis-details" class="serwis-details">
  <div class="serwis-container container">
    <div class="content-section">
      <h2 class="section-title">Wsparcie techniczne na najwyższym poziomie</h2>
      <p use:typoFixAction>Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Jako zespół wsparcia jesteśmy zawsze dostępni, aby rozwiązać wszelkie problemy i udzielić profesjonalnej pomocy w każdej sytuacji.</p>
    </div>
  </div>
</section>

<style lang="scss">
  .serwis-container {
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

  .serwis_page {
    min-width: 100vw;
    margin: 0 auto;
    min-height: 20vh;
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
  .serwis {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
        color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  .content-intro {
    margin-bottom: 40px;
    
    .intro-text {
      font-size: 1.2rem;
      line-height: 1.8;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }

  // Style dla info-cards-section (kopiowane z istniejącego komponentu)
  .info-cards-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: none;
    padding: 0;
    margin: 0;
    padding-bottom: 10em;
  }
  
  .info-cards-wrapper {
    display: flex;
    gap: 3vw;
    width: 100%;
    max-width: 1400px;
    justify-content: center;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  
  .info-card {
    background: #f7f7f7;
    border-radius: 0;
    box-shadow: none;
    padding: 32px 32px 32px 32px;
    width: 100%;
    max-width: 400px;
    min-width: 320px;
    min-height: 260px;
    border-top: 4px solid #555a5e;
    display: flex;
    flex-direction: column;
    gap: 18px;
    justify-content: flex-start;
    position: relative;
  }
  
  .info-card::before{
    content: url(/assets/images/triangle.svg);
    position: absolute;
    right: 0;
    bottom: 0;
    width: 119px;
    height: 68px;
    pointer-events: none;
  }
  
  .info-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
    height: 7em;
  }
  
  .info-icon {
    width: 34px;
    height: 44px;
    margin-right: 2px;
    margin-top: 2px;
  }
  
  .info-title {
    font-size: 2rem;
    font-weight: 700;
    color: #555a5e;
    line-height: 1.1;
    margin-top: 6px;
  }
  
  .info-desc {
    font-size: 1.1rem;
    color: #222;
    margin: 0;
    font-weight: 400;
    padding-left: 1em;
    bottom: 0px;
  }

  // Style dla sekcji kontaktowej (kopiowane z istniejącego komponentu)
  .serwis-contact {
    padding: 60px 0;
    background: #f7f7f7;
  }

  .contact-flex {
    display: flex;
    gap: 0px;
    box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    max-width: 1060px;
    margin: 0 auto;
    align-items: stretch;
    background: #fff;
  }

  .contact-left:before {
    content: "";
    position: absolute;
    overflow: hidden;
    width: 110px;
    height: 110px;
    margin-left: -70px;
    margin-top: -74px;
    background: #f4f4f4;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    background-repeat: no-repeat;
  }

  .contact-left {
    flex: 1.1;
    background: #232c32;
    color: #fff;
    border-radius: 20px 0px 0px 20px;
    padding: 40px 36px 32px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 340px;
    max-width: 480px;
    background-image: url(/assets/kontakt-background.jpg);
    background-size: cover;
  }

  .contact-left h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 32px;
    line-height: 1.2;
    color: white;
    max-width: 300px;
  }

  .contact-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
  }

  .contact-bullets li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 18px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-gray-200);
  }

  .bullet {
    width: 11px;
    height: 63px;
    background: var(--color-primary);
    border-radius: 0;
    margin-right: 16px;
    margin-top: 4px;
    flex-shrink: 0;
    position: relative;
  }

  .contact-info-block {
    margin: 32px 0 18px 0;
  }

  .info-row {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 10px;
    gap: 10px;
  }

  .info-row .info-icon {
    font-size: 1.2rem;
    margin-right: 6px;
    width: auto;
    height: auto;
  }

  .contact-right {
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 0px 20px 20px 0px;
    padding: 40px;
  }

  .service-benefits {
    width: 100%;
    
    h3 {
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      margin-bottom: 30px;
      font-weight: 600;
    }
  }

  .benefits-list {
    list-style: none;
    padding: 0;
    
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 15px;
      line-height: 1.6;
      color: var(--color-text-secondary);
      
      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }

  // Style dla dodatkowej sekcji
  .serwis-details {
    width: 100%;
    padding: 100px 0;
    background: white;
    color: var(--color-text-secondary);
  }

  .content-section {
    margin-bottom: 60px;
    
    .section-title {
      position: relative;
      color: var(--color-text-secondary);
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      font-size: 38px;
      text-align: left;
      margin-bottom: 30px;
      
      &::before {
        content: "";
        position: absolute;
        left: -14px;
        width: 28px;
        height: 43px;
        background-image: url(/assets/red-arrow.svg);
      }
    }
    
    p {
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  }

  a:hover {
    color: var(--color-primary);
  }

  @media (max-width: 1100px) {
    .info-cards-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .info-card {
      max-width: 600px;
      min-width: 0;
      width: 90vw;
    }
  }

  @media (max-width: 900px) {
    .contact-flex {
      flex-direction: column;
      padding: 24px 6px;
      gap: 24px;
    }
    .contact-left,
    .contact-right {
      max-width: 100%;
      min-width: 0;
      padding: 24px 12px;
    }
  }

  @media (max-width: 768px) {
    .serwis {
      padding: 80px 0;
    }
    
    .serwis-container {
      padding: 0 2rem;
    }
    
    .content-intro .intro-text {
      font-size: 1rem;
    }
    
    .info-title {
      font-size: 1.2rem;
    }
    .info-card {
      padding: 20px 10px 20px 10px;
      min-height: 180px;
    }
    .info-desc {
      font-size: 0.98rem;
    }
    
    .content-section .section-title {
      font-size: 28px;
    }
    
    .serwis-details {
      padding: 80px 0;
    }
  }
</style>

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
  
  // Import komponentów serwisu
  import ServiceModal from './serwis/ServiceModal.svelte';
  import BenefitsSection from './serwis/BenefitsSection.svelte';
  import SerwisKontakt from './serwis/SerwisKontakt.svelte';


  
  // Import istniejących komponentów
  import CtaButton from './cta-button.svelte';
  
  let sectionEl: HTMLElement;
  let visible = false;
  let modalOpen = false;
  let selectedService: any = null;




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

  function handleOpenModal(event: CustomEvent) {
    selectedService = event.detail;
    modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function handleCloseModal() {
    modalOpen = false;
    selectedService = null;
    document.body.style.overflow = 'auto';
  }



  function scrollToServices() {
    const servicesSection = document.getElementById('serwis-services');
    if (servicesSection) {
      const headerOffset = 100;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  function makePhoneCall() {
    window.open('tel:+48606324406', '_self');
  }
</script>

<section class="serwis_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>


<section id="serwis" class="serwis">
<section id="serwis-details" class="serwis-details">
  <div class="serwis-container container">
    <div class="content-section">
      <h2 class="section-title">Wsparcie techniczne na najwyższym poziomie</h2>
      <p use:typoFixAction>Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Jako zespół wsparcia jesteśmy zawsze dostępni, aby rozwiązać wszelkie problemy i udzielić profesjonalnej pomocy w każdej sytuacji.</p>
   
      <br/>
   
      <p class="intro-text" use:typoFixAction>Rola naszego przedsiębiorstwa nie kończy się zaraz po dostarczeniu Ci maszyn. Oferujemy bowiem także profesjonalny <b>serwis gwarancyjny oraz pogwarancyjny</b>. W ten sposób możemy zapewnić naszym Klientom pełen zakres wsparcia technicznego.</p>

    </div>
  </div>
</section>


</section>


<section class="cta_serwis">
  <div class="serwis-cta-wrapper">
    <div class="serwis-hero-actions">
      <CtaButton 
        text="Skontaktuj się z nami" 
        on:click={makePhoneCall} 
        class="primary-button"
        aria-label="Zadzwoń do nas"
      />
    </div>
  </div>

  
</section>

<!-- Sekcja z kartami usług serwisowych używająca istniejących stylów -->
<section id="serwis-services" class="info-cards-section no-sel" bind:this={sectionEl}>
  <div class="serwis-services-header">
    <h2 use:typoFixAction>Nasze Usługi Serwisowe</h2>
    <p use:typoFixAction>Kompleksowa opieka serwisowa dla wszystkich maszyn CNC</p>
  </div>
  
  <div class="info-cards-wrapper">
    <!-- Serwis Gwarancyjny -->
    <div 
      class="info-card serwis-service-card warranty-card"
      class:visible
      on:click={() => handleOpenModal({detail: {
        type: 'warranty',
        title: "Serwis Gwarancyjny",
        description: "Kompleksowa opieka serwisowa dla wszystkich maszyn CNC w okresie 12 miesięcy od daty dostawy",
        highlights: ["BEZPŁATNE", "Do 5 dni"],
        details: [
          { label: "Okres gwarancji", value: "12 miesięcy od dostawy" },
          { label: "Koszt serwisu", value: "BEZPŁATNE", highlight: true },
          { label: "Koszt dojazdu", value: "Bezpłatne do 200 km" },
          { label: "Czas reakcji", value: "Do 5 dni roboczych" }
        ],
        includes: [
          "Wady materiałowe",
          "Błędy produkcyjne", 
          "Awarie z normalnego użytkowania",
          "Oryginalne części zamienne",
          "Raport z wykonanych prac"
        ],
        excludes: [
          "Błędy użytkownika",
          "Zaniedbania konserwacyjne",
          "Eksploatacja niezgodna z przeznaczeniem",
          "Uszkodzenia mechaniczne"
        ]
      }})}
      on:keydown={(e) => e.key === 'Enter' && handleOpenModal({detail: {type: 'warranty'}})}
      role="button"
      tabindex="0"
      aria-label="Otwórz szczegóły usługi Serwis Gwarancyjny"
    >
      <div class="info-card-header">
        <div class="serwis-service-icon warranty-icon info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <span class="info-title" use:typoFixAction>Serwis Gwarancyjny</span>
      </div>
      
      <p class="info-desc" use:typoFixAction>Kompleksowa opieka serwisowa dla wszystkich maszyn CNC w okresie 12 miesięcy od daty dostawy</p>
      
      <div class="serwis-service-highlight">
        <span class="serwis-highlight-item" use:typoFixAction>BEZPŁATNE</span>
        <span class="serwis-highlight-item" use:typoFixAction>Do 5 dni</span>
      </div>
      
      <button class="serwis-service-btn" aria-label="Zobacz szczegóły">
        <span use:typoFixAction>Szczegóły</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <!-- Serwis Pogwarancyjny -->
    <div 
      class="info-card serwis-service-card post-warranty-card"
      class:visible
      on:click={() => handleOpenModal({detail: {
        type: 'post-warranty',
        title: "Serwis Pogwarancyjny",
        description: "Profesjonalne usługi serwisowe po okresie gwarancji z pełnym wsparciem technicznym",
        highlights: ["240 zł/h", "Do 7 dni"],
        details: [
          { label: "Stawka godzinowa", value: "240 zł netto/h", highlight: true },
          { label: "Minimalne rozliczenie", value: "1 godzina" },
          { label: "Czas reakcji", value: "Do 7 dni roboczych" },
          { label: "Koszt dojazdu", value: "2,50 zł netto/km" }
        ],
        includes: [
          "Diagnostyka awarii",
          "Naprawa podzespołów",
          "Wymiana części zamiennych",
          "Testowanie po naprawie",
          "Szczegółowy raport serwisowy",
          "Instrukcja eksploatacji"
        ],
        note: "Koszt dojazdu liczony w obie strony. Części zamienne dodatkowo według cennika."
      }})}
      on:keydown={(e) => e.key === 'Enter' && handleOpenModal({detail: {type: 'post-warranty'}})}
      role="button"
      tabindex="0"
      aria-label="Otwórz szczegóły usługi Serwis Pogwarancyjny"
    >
      <div class="info-card-header">
        <div class="serwis-service-icon post-warranty-icon info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
        <span class="info-title" use:typoFixAction>Serwis Pogwarancyjny</span>
      </div>
      
      <p class="info-desc" use:typoFixAction>Profesjonalne usługi serwisowe po okresie gwarancji z pełnym wsparciem technicznym</p>
      
      <div class="serwis-service-highlight">
        <span class="serwis-highlight-item" use:typoFixAction>240 zł/h</span>
        <span class="serwis-highlight-item" use:typoFixAction>Do 7 dni</span>
      </div>
      
      <button class="serwis-service-btn" aria-label="Zobacz szczegóły">
        <span use:typoFixAction>Szczegóły</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <!-- Przeglądy Okresowe -->
    <div 
      class="info-card serwis-service-card inspections-card"
      class:visible
      on:click={() => handleOpenModal({detail: {
        type: 'inspections',
        title: "Przeglądy Okresowe",
        description: "Regularne przeglądy zapewniające optymalną pracę maszyn i przedłużające ich żywotność",
        highlights: ["Od 1000 zł", "Co 6 mies."],
        details: [
          { label: "Częstotliwość", value: "Co 6 miesięcy lub 1000 roboczogodzin" },
          { label: "Maszyny 3-osiowe standard", value: "1000 zł netto", highlight: true },
          { label: "Maszyny 3-osiowe rozszerzony", value: "1600 zł netto", highlight: true },
          { label: "Maszyny 5-osiowe standard", value: "1400 zł netto", highlight: true },
          { label: "Maszyny 5-osiowe rozszerzony", value: "2200 zł netto", highlight: true }
        ],
        includes: [
          "Diagnostyka wszystkich podzespołów",
          "Kontrola dokładności osi",
          "Sprawdzenie systemów chłodzenia",
          "Kontrola układów smarowania",
          "Kalibracja narzędzi",
          "Raport z rekomendacjami",
          "Plan konserwacji"
        ],
        note: "Przegląd rozszerzony obejmuje dodatkowo wymianę płynów eksploatacyjnych i drobnych części zużywalnych."
      }})}
      on:keydown={(e) => e.key === 'Enter' && handleOpenModal({detail: {type: 'inspections'}})}
      role="button"
      tabindex="0"
      aria-label="Otwórz szczegóły usługi Przeglądy Okresowe"
    >
      <div class="info-card-header">
        <div class="serwis-service-icon inspections-icon info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11l3 3l8-8"></path>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"></path>
          </svg>
        </div>
        <span class="info-title" use:typoFixAction>Przeglądy Okresowe</span>
      </div>
      
      <p class="info-desc" use:typoFixAction>Regularne przeglądy zapewniające optymalną pracę maszyn i przedłużające ich żywotność</p>
      
      <div class="serwis-service-highlight">
        <span class="serwis-highlight-item" use:typoFixAction>Od 1000 zł</span>
        <span class="serwis-highlight-item" use:typoFixAction>Co 6 mies.</span>
      </div>
      
      <button class="serwis-service-btn" aria-label="Zobacz szczegóły">
        <span use:typoFixAction>Szczegóły</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <!-- Usługi Dodatkowe -->
    <div 
      class="info-card serwis-service-card additional-card"
      class:visible
      on:click={() => handleOpenModal({detail: {
        type: 'additional',
        title: "Usługi Dodatkowe",
        description: "Dodatkowe usługi wspierające eksploatację maszyn i rozwój zespołu",
        highlights: ["Priorytet 48h", "Szkolenia"],
        services: [
          {
            name: "Serwis priorytetowy",
            price: "400 zł netto",
            description: "Reakcja do 48 godzin",
            details: "Priorytetowe traktowanie zgłoszenia serwisowego"
          },
          {
            name: "Diagnostyka zdalna",
            price: "100 zł netto",
            description: "Każde rozpoczęte 30 minut",
            details: "Zdalna pomoc techniczna przez internet"
          },
          {
            name: "Szkolenie operatora",
            price: "1200 zł netto/dzień",
            description: "Na miejscu u klienta",
            details: "Kompleksowe szkolenie z obsługi maszyny"
          },
          {
            name: "Instalacja maszyny",
            price: "1500-2500 zł netto",
            description: "Według umowy",
            details: "Profesjonalna instalacja i uruchomienie"
          }
        ]
      }})}
      on:keydown={(e) => e.key === 'Enter' && handleOpenModal({detail: {type: 'additional'}})}
      role="button"
      tabindex="0"
      aria-label="Otwórz szczegóły usługi Usługi Dodatkowe"
    >
      <div class="info-card-header">
        <div class="serwis-service-icon additional-icon info-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
        <span class="info-title" use:typoFixAction>Usługi Dodatkowe</span>
      </div>
      
      <p class="info-desc" use:typoFixAction>Dodatkowe usługi wspierające eksploatację maszyn i rozwój zespołu</p>
      
      <div class="serwis-service-highlight">
        <span class="serwis-highlight-item" use:typoFixAction>Priorytet 48h</span>
        <span class="serwis-highlight-item" use:typoFixAction>Szkolenia</span>
      </div>
      
      <button class="serwis-service-btn" aria-label="Zobacz szczegóły">
        <span use:typoFixAction>Szczegóły</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  </div>
</section>

<section class="benefits">
  <div class="container">
      <div class="section-header">
          <h2>Dlaczego CERTUS?</h2>
          <p>Zaufało nam już ponad 500 firm w całej Polsce</p>
      </div>
      
      <div class="benefits-grid">
          <div class="benefit-item">
              <div class="benefit-icon">
                  <i class="fas fa-users"></i>
              </div>
              <h4>Doświadczony zespół</h4>
              <p>10+ lat stażu w branży CNC</p>
          </div>
          
          <div class="benefit-item">
              <div class="benefit-icon">
                  <i class="fas fa-clock"></i>
              </div>
              <h4>Szybka reakcja</h4>
              <p>Zazwyczaj w ciągu 24 godzin</p>
          </div>
          
          <div class="benefit-item">
              <div class="benefit-icon">
                  <i class="fas fa-cogs"></i>
              </div>
              <h4>Oryginalne części</h4>
              <p>Najwyższa jakość komponentów</p>
          </div>
          
          <div class="benefit-item">
              <div class="benefit-icon">
                  <i class="fas fa-tools"></i>
              </div>
              <h4>Serwis na miejscu</h4>
              <p>Przyjazd do klienta</p>
          </div>
      </div>
  </div>
</section>

<!-- Sekcja kontaktowa dedykowana dla serwisu -->
<SerwisKontakt />

<!-- Dodatkowa sekcja z treścią -->


<!-- Modal dla szczegółów usług -->
<ServiceModal 
  isOpen={modalOpen} 
  service={selectedService} 
  on:close={handleCloseModal} 
/>



<style lang="scss">



.info-card {
  position: relative;
  z-index: 1;
  background: #fff;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.15));
}

.info-card::before {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  background: transparent; /* Przezroczystość, nie inherit */
  clip-path: inherit;      /* Ten sam kształt, by cień był wygięty */
  box-shadow: 0 8px 15px 14px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.15));
}





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
    top: 218px;
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

  // Style dla sekcji hero z przyciskami CTA
  .serwis-hero-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .serwis-cta-wrapper {
    display: flex;
    justify-content: center;
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

  // Style dla nagłówka sekcji usług serwisowych
  .serwis-services-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 0 20px;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -20px;
        width: 60px;
        height: 4px;
        background: var(--color-primary);
        border-radius: 2px;
      }
    }

    p {
      font-size: 1.2rem;
      color: var(--color-text-secondary);
      opacity: 0.8;
      max-width: 600px;
      margin: 0 auto;
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

  // Responsive styles dla komponentów serwisu
  @media (max-width: 768px) {
    .serwis-hero-actions {
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 0 20px;
    }

    .serwis-services-header {
      margin-bottom: 30px;

      h2 {
        font-size: 2rem;
      }

      p {
        font-size: 1.1rem;
      }
    }


  }

  @media (max-width: 480px) {
    .serwis-hero-actions {
      padding: 0 16px;
    }

    .serwis-services-header h2 {
      font-size: 1.8rem;
    }
  }

  // Style info-cards skopiowane z Section_Referencje dla kart serwisowych
  .info-cards-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: none;
    padding: 80px 0;
    margin: 0;
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
    min-height: 320px; // Zwiększone dla dodatkowych elementów serwisu
    border-top: 4px solid #555a5e;
    display: flex;
    flex-direction: column;
    gap: 18px;
    justify-content: flex-start;
    position: relative;
  }

  /* .info-card::before {
    content: url(/assets/images/triangle.svg);
    position: absolute;
    right: 0;
    bottom: 0;
    width: 119px;
    height: 68px;
    pointer-events: none;
  } */

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
    flex-grow: 1;
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

  @media (max-width: 600px) {
    .info-title {
      font-size: 1.2rem;
    }
    .info-card {
      padding: 20px 10px 20px 10px;
      min-height: 280px;
    }
    .info-desc {
      font-size: 0.98rem;
    }
  }

  // Style specyficzne dla kart serwisowych
  .serwis-service-card {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  // Kolorowe obramowania dla różnych typów usług
  .warranty-card {
    border-top-color: #10b981; // Zielony
  }

  .post-warranty-card {
    border-top-color: #3b82f6; // Niebieski
  }

  .inspections-card {
    border-top-color: #f59e0b; // Pomarańczowy
  }

  .additional-card {
    border-top-color: #8b5cf6; // Fioletowy
  }

  // Ikony serwisowe - używamy dokładnie tych samych wymiarów co info-icon
  .serwis-service-icon {
    width: 34px;
    height: 44px;
    margin-right: 2px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    :global(svg) {
      width: 24px;
      height: 24px;
    }
  }

  .warranty-icon {
    color: #10b981;
  }

  .post-warranty-icon {
    color: #3b82f6;
  }

  .inspections-icon {
    color: #f59e0b;
  }

  .additional-icon {
    color: #8b5cf6;
  }

  // Highlights (znaczniki)
  .serwis-service-highlight {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0;
    padding-left: 1em;
  }

  .serwis-highlight-item {
    background: var(--color-primary);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  // Przycisk szczegółów
  .serwis-service-btn {
    background: none;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: auto;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 0.9rem;

    &:hover {
      background: var(--color-primary);
      color: white;
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    svg {
      transition: transform 0.2s;
    }

    &:hover svg {
      transform: translateY(2px);
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
    

    
    .content-section .section-title {
      font-size: 28px;
    }
    
    .serwis-details {
      padding: 80px 0;
    }

    .serwis-service-highlight {
      justify-content: flex-start;
    }

    .serwis-service-btn {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
  }
</style>

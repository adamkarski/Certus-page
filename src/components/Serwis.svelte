<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
  
  // Import nowych komponentów serwisu
  import ServiceCard from './serwis/ServiceCard.svelte';
  import ServiceModal from './serwis/ServiceModal.svelte';
  import BenefitsSection from './serwis/BenefitsSection.svelte';
  import SerwisKontakt from './serwis/SerwisKontakt.svelte';
  import SerwisInfoCards from './serwis/SerwisInfoCards.svelte';
  import SerwisInfoModal from './serwis/SerwisInfoModal.svelte';
  import { serviceData, type ServiceType } from './serwis/serviceData';
  
  // Import istniejących komponentów
  import CtaButton from './cta-button.svelte';
  
  let sectionEl: HTMLElement;
  let visible = false;
  let modalOpen = false;
  let selectedService: any = null;
  let infoModalOpen = false;
  let selectedInfoCard: any = null;

  // Konwersja danych serwisowych na tablicę
  const services = Object.values(serviceData);

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

  function handleOpenInfoModal(event: CustomEvent) {
    selectedInfoCard = event.detail;
    infoModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function handleCloseInfoModal() {
    infoModalOpen = false;
    selectedInfoCard = null;
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
  <div class="serwis-container container">
    <div class="section-header">
      <h1 class="no-sel">Serwis</h1>
      <hr />
    </div>
    
    <div class="content-intro">
      <p class="intro-text" use:typoFixAction>Rola naszego przedsiębiorstwa nie kończy się zaraz po dostarczeniu Ci maszyn. Oferujemy bowiem także profesjonalny serwis gwarancyjny oraz pogwarancyjny. W ten sposób możemy zapewnić naszym Klientom pełen zakres wsparcia technicznego.</p>
    </div>

    <!-- Sekcja hero z przyciskami CTA używającymi istniejących komponentów -->
    <div class="serwis-hero-actions">
      <div class="serwis-cta-wrapper">
        <CtaButton text="Zadzwoń teraz: +48 606 324 406" on:click={makePhoneCall} />
      </div>
      
      <div class="serwis-cta-wrapper">
        <CtaButton text="Zobacz nasze usługi" on:click={scrollToServices} />
      </div>
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
    {#each services as service, index}
      <ServiceCard 
        {service} 
        delay={index * 150}
        {visible}
        on:openModal={handleOpenModal}
      />
    {/each}
  </div>
</section>

<!-- Sekcja info-cards dedykowana dla serwisu -->
<SerwisInfoCards on:openModal={handleOpenInfoModal} />

<!-- Sekcja kontaktowa dedykowana dla serwisu -->
<SerwisKontakt />

<!-- Dodatkowa sekcja z treścią -->
<section id="serwis-details" class="serwis-details">
  <div class="serwis-container container">
    <div class="content-section">
      <h2 class="section-title">Wsparcie techniczne na najwyższym poziomie</h2>
      <p use:typoFixAction>Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Jako zespół wsparcia jesteśmy zawsze dostępni, aby rozwiązać wszelkie problemy i udzielić profesjonalnej pomocy w każdej sytuacji.</p>
    </div>
  </div>
</section>

<!-- Modal dla szczegółów usług -->
<ServiceModal 
  isOpen={modalOpen} 
  service={selectedService} 
  on:close={handleCloseModal} 
/>

<!-- Modal dla szczegółów kart informacyjnych -->
<SerwisInfoModal 
  isOpen={infoModalOpen} 
  cardData={selectedInfoCard} 
  on:close={handleCloseInfoModal} 
/>

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

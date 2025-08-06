<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount, createEventDispatcher } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
  
  const dispatch = createEventDispatcher();
  
  let sectionEl: HTMLElement;
  let visible = false;

  // Dane kart serwisowych
  const serwisCards = [
    {
      id: 'diagnostyka',
      icon: '/assets/ikony/diagnostyka.svg',
      iconAlt: 'Bezpłatna diagnostyka maszyn CNC',
      title: 'Bezpłatna<br>diagnostyka:',
      description: 'Oferujemy bezpłatną diagnostykę wszystkich maszyn CNC. Nasi specjaliści szybko zidentyfikują problem i przedstawią plan naprawy.',
      features: ['Diagnostyka zdalna', 'Wizyta na miejscu', 'Szczegółowy raport'],
      modalData: {
        title: 'Bezpłatna diagnostyka maszyn CNC',
        description: 'Profesjonalna diagnostyka to pierwszy krok do skutecznej naprawy. Nasi doświadczeni technicy wykorzystują nowoczesne narzędzia diagnostyczne.',
        details: [
          'Diagnostyka zdalna przez TeamViewer',
          'Wizyta technika na miejscu',
          'Szczegółowy raport z usterek',
          'Plan naprawy z wyceną',
          'Doradztwo techniczne'
        ],
        price: 'Bezpłatnie',
        time: '24-48h'
      }
    },
    {
      id: 'serwis-24h',
      icon: '/assets/ikony/serwis-24h.svg',
      iconAlt: 'Serwis 24/7 maszyn CNC',
      title: 'Serwis 24/7:',
      description: 'Nasz zespół serwisowy jest dostępny przez całą dobę, 7 dni w tygodniu. Gwarantujemy szybką reakcję na awarie.',
      features: ['Hotline 24/7', 'Szybka reakcja', 'Serwis weekendowy'],
      modalData: {
        title: 'Serwis 24/7 - Zawsze gotowi pomóc',
        description: 'Awarie nie wybierają pory dnia ani dnia tygodnia. Dlatego nasz serwis jest dostępny przez całą dobę.',
        details: [
          'Hotline serwisowa: +48 606 324 406',
          'Czas reakcji: do 2 godzin',
          'Serwis w weekendy i święta',
          'Pomoc zdalna w trybie pilnym',
          'Części zamienne ex stock'
        ],
        price: 'Wg cennika',
        time: 'Natychmiast'
      }
    },
    {
      id: 'czesci-zamienne',
      icon: '/assets/ikony/czesci-zamienne.svg',
      iconAlt: 'Części zamienne do maszyn CNC',
      title: 'Części zamienne<br>ex stock:',
      description: 'Posiadamy bogaty magazyn części zamiennych do wszystkich produkowanych przez nas maszyn. Szybka dostawa w całej Europie.',
      features: ['Magazyn ex stock', 'Dostawa 24h', 'Gwarancja jakości'],
      modalData: {
        title: 'Części zamienne - Zawsze w magazynie',
        description: 'Nasz magazyn części zamiennych to gwarancja ciągłości pracy Twoich maszyn. Posiadamy pełny asortyment komponentów.',
        details: [
          'Ponad 5000 pozycji w magazynie',
          'Części oryginalne i zamienniki',
          'Dostawa kurierem w 24h',
          'Wysyłka do całej Europy',
          '12 miesięcy gwarancji na części'
        ],
        price: 'Wg cennika',
        time: '24h dostawa'
      }
    }
  ];

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

  function openModal(cardData: any) {
    dispatch('openModal', cardData);
  }

  function handleKeydown(event: KeyboardEvent, cardData: any) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(cardData);
    }
  }
</script>

<div class="section-wrapper">
  <section class="info-cards-section no-sel" bind:this={sectionEl}>
    <div class="serwis-cards-header">
      <h2 use:typoFixAction>Dlaczego warto wybrać nasz serwis?</h2>
      <p use:typoFixAction>Profesjonalna opieka serwisowa na najwyższym poziomie</p>
    </div>

    <div class="info-cards-wrapper">
      {#each serwisCards as card, index}
        <div 
          class="info-card serwis-info-card" 
          in:fade={{ duration: 500, delay: visible ? index * 200 : 9999 }}
          on:click={() => openModal(card)}
          on:keydown={(e) => handleKeydown(e, card)}
          role="button"
          tabindex="0"
          aria-label="Otwórz szczegóły: {card.title.replace(/<br>/g, ' ')}"
        >
          <div class="info-card-header">
            <img src={card.icon} alt={card.iconAlt} class="info-icon" />
            <span class="info-title" use:typoFixAction>{@html card.title}</span>
          </div>
          <p class="info-desc" use:typoFixAction>
            {card.description}
          </p>
          
          <div class="serwis-features">
            {#each card.features as feature}
              <span class="serwis-feature-tag" use:typoFixAction>{feature}</span>
            {/each}
          </div>
          
          <div class="serwis-card-footer">
            <button class="serwis-details-btn" aria-label="Zobacz szczegóły">
              <span use:typoFixAction>Szczegóły</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<style lang="scss">
  .section-wrapper {
    display: block;
    position: relative;
    background-color: white;
  }

  // Nagłówek sekcji
  .serwis-cards-header {
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

  // Używamy wszystkich oryginalnych stylów info-cards
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
    min-height: 320px; // Zwiększone dla dodatkowych elementów
    border-top: 4px solid #555a5e;
    display: flex;
    flex-direction: column;
    gap: 18px;
    justify-content: flex-start;
    position: relative;
    transition: all 0.3s ease;
  }

  // Dodajemy interaktywność dla kart serwisowych
  .serwis-info-card {
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-top-color: var(--color-primary);
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  .info-card::before {
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
    flex-grow: 1;
  }

  // Nowe elementy specyficzne dla serwisu
  .serwis-features {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0;
    padding-left: 1em;
  }

  .serwis-feature-tag {
    background: var(--color-primary);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .serwis-card-footer {
    margin-top: auto;
    padding-left: 1em;
    padding-right: 1em;
  }

  .serwis-details-btn {
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
    width: 100%;
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

  // Responsive styles - kopiujemy z oryginału
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

  @media (max-width: 768px) {
    .serwis-cards-header {
      margin-bottom: 30px;

      h2 {
        font-size: 2rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .info-cards-section {
      padding: 60px 0;
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

    .serwis-cards-header h2 {
      font-size: 1.8rem;
    }

    .serwis-features {
      justify-content: flex-start;
    }

    .serwis-details-btn {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
  }
</style>
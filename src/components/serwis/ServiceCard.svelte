<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { typoFixAction } from '$lib/utils/typography';

  const dispatch = createEventDispatcher();

  export let service: any;
  export let delay = 0;
  export let visible = false;

  function handleClick() {
    dispatch('openModal', service);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<div 
  class="info-card serwis-service-card {service.type}-card"
  class:visible
  in:fade={{ duration: 500, delay: visible ? delay : 9999 }}
  on:click={handleClick}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-label="Otwórz szczegóły usługi {service.title}"
>
  <div class="info-card-header">
    <div class="serwis-service-icon {service.type}-icon info-icon">
      {@html service.icon}
    </div>
    <span class="info-title" use:typoFixAction>{service.title}</span>
  </div>
  
  <p class="info-desc" use:typoFixAction>{service.description}</p>
  
  <div class="serwis-service-highlight">
    {#each service.highlights as highlight}
      <span class="serwis-highlight-item" use:typoFixAction>{highlight}</span>
    {/each}
  </div>
  
  <button class="serwis-service-btn" aria-label="Zobacz szczegóły">
    <span use:typoFixAction>Szczegóły</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
</div>

<style lang="scss">
  // Używamy istniejących stylów info-card i dodajemy tylko specyficzne dla serwisu
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

  // Używamy dokładnie tych samych stylów co w Onas.svelte
  .info-title {
    font-size: 2rem;
    font-weight: 700;
    color: #555a5e;
    line-height: 1.1;
    margin-top: 6px;
  }

  // Używamy dokładnie tych samych stylów co w Onas.svelte dla info-desc
  .info-desc {
    font-size: 1.1rem;
    color: #222;
    margin: 0;
    font-weight: 400;
    padding-left: 1em;
    bottom: 0px;
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

  @media (max-width: 768px) {
    .info-title {
      font-size: 1.2rem;
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
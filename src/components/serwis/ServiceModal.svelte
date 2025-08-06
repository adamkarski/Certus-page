<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { typoFixAction } from '$lib/utils/typography';

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let service: any = null;

  function closeModal() {
    dispatch('close');
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && service}
  <div 
    class="serwis-modal-backdrop" 
    transition:fade={{ duration: 200 }}
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="serwis-modal-content" transition:scale={{ duration: 300, start: 0.9 }}>
      <div class="serwis-modal-header">
        <h3 id="modal-title" use:typoFixAction>{service.title}</h3>
        <button class="serwis-modal-close" on:click={closeModal} aria-label="Zamknij modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="serwis-modal-body">
        <p class="serwis-modal-description" use:typoFixAction>{service.description}</p>
        
        {#if service.details}
          <div class="serwis-detail-section">
            <h4>Szczegóły usługi</h4>
            <ul class="serwis-detail-list">
              {#each service.details as detail}
                <li>
                  <span use:typoFixAction>{detail.label}</span>
                  <span class="serwis-detail-value" class:highlight={detail.highlight} use:typoFixAction>
                    {detail.value}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if service.services}
          <div class="serwis-detail-section">
            <h4>Dostępne usługi</h4>
            {#each service.services as item}
              <div class="serwis-service-item">
                <div class="serwis-service-header">
                  <strong use:typoFixAction>{item.name}</strong>
                  <span class="serwis-price-highlight" use:typoFixAction>{item.price}</span>
                </div>
                <div class="serwis-service-description" use:typoFixAction>{item.description}</div>
                <div class="serwis-service-details" use:typoFixAction>{item.details}</div>
              </div>
            {/each}
          </div>
        {/if}

        {#if service.includes}
          <div class="serwis-detail-section">
            <h4>W cenie usługi</h4>
            <ul class="serwis-includes-list">
              {#each service.includes as item}
                <li use:typoFixAction>
                  <svg class="serwis-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {item}
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if service.excludes}
          <div class="serwis-detail-section">
            <h4>Nie obejmuje gwarancja</h4>
            <ul class="serwis-excludes-list">
              {#each service.excludes as item}
                <li use:typoFixAction>
                  <svg class="serwis-times-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  {item}
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if service.note}
          <div class="serwis-detail-section">
            <div class="serwis-note">
              <strong>Uwaga:</strong> <span use:typoFixAction>{service.note}</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .serwis-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }

  .serwis-modal-content {
    background: white;
    border-radius: 12px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .serwis-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    border-bottom: 1px solid #e5e7eb;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-text-secondary);
    }
  }

  .serwis-modal-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #6b7280;
    transition: all 0.2s;

    &:hover {
      background: #f3f4f6;
      color: #374151;
    }
  }

  .serwis-modal-body {
    padding: 32px;
  }

  .serwis-modal-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 32px;
  }

  .serwis-detail-section {
    margin-bottom: 32px;

    h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
    }
  }

  .serwis-detail-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .serwis-detail-value {
    font-weight: 500;
    color: var(--color-text-secondary);

    &.highlight {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  .serwis-service-item {
    margin-bottom: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid var(--color-primary);
  }

  .serwis-service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .serwis-price-highlight {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1.1rem;
  }

  .serwis-service-description {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  .serwis-service-details {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .serwis-includes-list,
  .serwis-excludes-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;
      padding: 8px 0;
      line-height: 1.5;
    }
  }

  .serwis-check-icon {
    color: var(--color-primary);
    margin-right: 12px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .serwis-times-icon {
    color: #ef4444;
    margin-right: 12px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .serwis-note {
    padding: 16px;
    background: #fef3c7;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
    
    strong {
      color: #d97706;
    }
  }

  @media (max-width: 768px) {
    .serwis-modal-content {
      margin: 10px;
      max-height: 95vh;
    }

    .serwis-modal-header {
      padding: 20px;
    }

    .serwis-modal-body {
      padding: 20px;
    }

    .serwis-service-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
</style>
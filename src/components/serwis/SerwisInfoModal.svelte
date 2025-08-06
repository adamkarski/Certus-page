<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { typoFixAction } from '$lib/utils/typography';
  import CtaButton from '../cta-button.svelte';

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let cardData: any = null;

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

  function handleContact() {
    // Scroll do sekcji kontaktowej
    const contactSection = document.querySelector('.contact-flex');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      closeModal();
    }
  }

  function makePhoneCall() {
    window.open('tel:+48606324406', '_self');
  }
</script>

{#if isOpen && cardData}
  <div 
    class="modal-backdrop" 
    transition:fade={{ duration: 200 }}
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-content" transition:scale={{ duration: 300, start: 0.9 }}>
      <button class="modal-close" on:click={closeModal} aria-label="Zamknij modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="modal-header">
        <div class="modal-icon">
          <img src={cardData.icon} alt={cardData.iconAlt} />
        </div>
        <div class="modal-title-section">
          <h2 id="modal-title" use:typoFixAction>{cardData.modalData.title}</h2>
          <div class="modal-badges">
            <span class="modal-badge price-badge" use:typoFixAction>{cardData.modalData.price}</span>
            <span class="modal-badge time-badge" use:typoFixAction>{cardData.modalData.time}</span>
          </div>
        </div>
      </div>

      <div class="modal-body">
        <p class="modal-description" use:typoFixAction>
          {cardData.modalData.description}
        </p>

        <div class="modal-details">
          <h3 use:typoFixAction>Co obejmuje usługa:</h3>
          <ul class="details-list">
            {#each cardData.modalData.details as detail}
              <li use:typoFixAction>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {detail}
              </li>
            {/each}
          </ul>
        </div>

        <div class="modal-features">
          <h4 use:typoFixAction>Kluczowe korzyści:</h4>
          <div class="features-tags">
            {#each cardData.features as feature}
              <span class="feature-tag" use:typoFixAction>{feature}</span>
            {/each}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="modal-contact-info">
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span use:typoFixAction>Hotline: +48 606 324 406</span>
          </div>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span use:typoFixAction>serwis@mg-certus.pl</span>
          </div>
        </div>

        <div class="modal-actions">
          <button class="secondary-btn" on:click={makePhoneCall}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span use:typoFixAction>Zadzwoń teraz</span>
          </button>
          
          <CtaButton text="Wyślij zgłoszenie" on:click={handleContact} />
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;

    &:hover {
      background: #e5e7eb;
      transform: scale(1.1);
    }

    svg {
      color: #6b7280;
    }
  }

  .modal-header {
    padding: 40px 40px 20px 40px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    border-bottom: 1px solid #f3f4f6;
  }

  .modal-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 16px rgba(150, 165, 0, 0.2);

    img {
      width: 32px;
      height: 32px;
      filter: brightness(0) invert(1);
    }
  }

  .modal-title-section {
    flex: 1;

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-text-secondary);
      margin: 0 0 12px 0;
      line-height: 1.2;
    }
  }

  .modal-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .modal-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;

    &.price-badge {
      background: #dcfce7;
      color: #166534;
    }

    &.time-badge {
      background: #dbeafe;
      color: #1e40af;
    }
  }

  .modal-body {
    padding: 20px 40px;
  }

  .modal-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 24px;
  }

  .modal-details {
    margin-bottom: 24px;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 12px;
    }
  }

  .details-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 1rem;
      line-height: 1.5;
      color: var(--color-text-secondary);

      svg {
        color: var(--color-primary);
        margin-top: 2px;
        flex-shrink: 0;
      }
    }
  }

  .modal-features {
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 12px;
    }
  }

  .features-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .feature-tag {
    background: var(--color-primary);
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .modal-footer {
    padding: 20px 40px 40px 40px;
    border-top: 1px solid #f3f4f6;
  }

  .modal-contact-info {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--color-text-secondary);

    svg {
      color: var(--color-primary);
    }
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .secondary-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;

    &:hover {
      background: var(--color-primary);
      color: white;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      margin: 10px;
      border-radius: 16px;
    }

    .modal-header {
      padding: 30px 20px 15px 20px;
      flex-direction: column;
      text-align: center;
      gap: 16px;

      h2 {
        font-size: 1.5rem;
      }
    }

    .modal-body {
      padding: 15px 20px;
    }

    .modal-footer {
      padding: 15px 20px 30px 20px;
    }

    .modal-contact-info {
      flex-direction: column;
      gap: 12px;
    }

    .modal-actions {
      flex-direction: column;
      gap: 8px;

      .secondary-btn {
        justify-content: center;
      }
    }

    .modal-close {
      top: 15px;
      right: 15px;
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    .modal-badges {
      justify-content: center;
    }

    .features-tags {
      justify-content: center;
    }
  }
</style>
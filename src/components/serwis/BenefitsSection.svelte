<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { typoFixAction } from '$lib/utils/typography';

  let sectionEl: HTMLElement;
  let visible = false;

  const benefits = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`,
      title: 'Doświadczony zespół',
      description: '10+ lat stażu w branży CNC'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
      </svg>`,
      title: 'Szybka reakcja',
      description: 'Zazwyczaj w ciągu 24 godzin'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>`,
      title: 'Oryginalne części',
      description: 'Najwyższa jakość komponentów'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>`,
      title: 'Serwis na miejscu',
      description: 'Przyjazd do klienta'
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
</script>

<section class="serwis-benefits" bind:this={sectionEl}>
  <div class="serwis-benefits-container">
    <div class="serwis-section-header">
      <h2 use:typoFixAction>Dlaczego CERTUS?</h2>
      <p use:typoFixAction>Zaufało nam już ponad 500 firm w całej Polsce</p>
    </div>
    
    <div class="serwis-benefits-grid">
      {#each benefits as benefit, index}
        <div 
          class="serwis-benefit-item"
          in:fade={{ duration: 500, delay: visible ? index * 100 : 9999 }}
        >
          <div class="serwis-benefit-icon">
            {@html benefit.icon}
          </div>
          <h4 use:typoFixAction>{benefit.title}</h4>
          <p use:typoFixAction>{benefit.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .serwis-benefits {
    padding: 100px 0;
    background: white;
  }

  .serwis-benefits-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .serwis-section-header {
    text-align: center;
    margin-bottom: 80px;

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
    }
  }

  .serwis-benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    justify-items: center;
  }

  .serwis-benefit-item {
    text-align: center;
    max-width: 280px;
    padding: 32px 24px;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  }

  .serwis-benefit-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: white;
    box-shadow: 0 10px 15px -3px rgba(150, 165, 0, 0.2);

    :global(svg) {
      width: 32px;
      height: 32px;
    }
  }

  .serwis-benefit-item h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }

  .serwis-benefit-item p {
    color: var(--color-text-secondary);
    opacity: 0.8;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .serwis-benefits {
      padding: 60px 0;
    }

    .serwis-benefits-container {
      padding: 0 16px;
    }

    .serwis-section-header {
      margin-bottom: 60px;

      h2 {
        font-size: 2rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .serwis-benefits-grid {
      gap: 32px;
    }

    .serwis-benefit-item {
      padding: 24px 16px;
    }

    .serwis-benefit-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 20px;

      :global(svg) {
        width: 24px;
        height: 24px;
      }
    }

    .serwis-benefit-item h4 {
      font-size: 1.1rem;
    }
  }
</style>
<script lang="ts">
  import { browser } from "$app/environment";
  import CtaButton from "./CtaButton.svelte";
  import { scrollToElement } from "$lib/utils/smoothScroll";

  export let variant: "homepage" | "maszyny" = "homepage";

  function navigateToMachine(sectionId: string) {
    if (browser) {
      if (variant === "homepage") {
        // For homepage - navigate to maszyny page with hash
        window.location.href = `/maszyny#${sectionId}`;
      } else {
        // For maszyny page - scroll to section with smooth animation
        scrollToElement(sectionId, 1200, 140); // 1.2 sekundy animacji, 140px offset
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent, sectionId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      navigateToMachine(sectionId);
    }
  }
</script>

<div class="oferta-container container">
  <div class="oferta-grid">
    <a 
      href="/maszyny#frezarki"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("frezarki")}
      title="Frezarki CNC HMM-ST z ruchomym stołem"
    >
      <div class="oferta-icon">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="Frezarki CNC HMM" width="100" height="100" loading="lazy" />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Frezarki CNC HMM"
      />
    </a>

    <a 
      href="/maszyny#ploteryPrzemyslowe"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("ploteryPrzemyslowe")}
      title="Plotery przemysłowe CNC bez zabudowy HPP-OT"
    >
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
          alt="Przemysłowe plotery CNC"
          width="100"
          height="100"
          loading="lazy"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery CNC"
      />
    </a>

    <a 
      href="/maszyny#ploteryPrzemysloweZabudowa"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("ploteryPrzemysloweZabudowa")}
      title="Plotery przemysłowe CNC w pełnej zabudowie HPP-CT"
    >
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg"
          alt="Przemysłowe plotery CNC w zabudowie"
          width="100"
          height="100"
          loading="lazy"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery CNC w zabudowie"
      />
    </a>

    <a 
      href="/maszyny#frezarki5osiowe"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("frezarki5osiowe")}
      title="Pięcioosiowe centra frezarskie CNC"
    >
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/frezarki5osiowe.svg"
          alt="Frezarki pięcioosiowe"
          width="100"
          height="100"
          loading="lazy"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Frezarki pięcioosiowe"
      />
    </a>

    <a 
      href="/maszyny#grawerki"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("grawerki")}
      title="Grawerki CNC CERTUS"
    >
      <div class="oferta-icon">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="Grawerki CNC" width="100" height="100" loading="lazy" />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Grawerki CNC"
      />
    </a>

    <a 
      href="/maszyny#ploteryLinearne"
      class="oferta-card" 
      on:click|preventDefault={() => navigateToMachine("ploteryLinearne")}
      title="Plotery CNC z napędem liniowym HLP-FT"
    >
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryLinearne.svg"
          alt="Plotery CNC HLP-FT"
          width="100"
          height="100"
          loading="lazy"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery CNC HLP-FT"
      />
    </a>
  </div>
</div>

<style lang="scss">
  .oferta-container {
    overflow: visible;
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
  }

  :global(body.maszyny .oferta-container) {
    padding-left: clamp(1rem, 3vw, 2.5rem) !important;
    padding-right: clamp(1rem, 3vw, 2.5rem) !important;
  }

  :global(.oferta-grid) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem 1rem;
    justify-content: center;
    justify-items: center;
    align-items: stretch;
    width: 100%;
    margin: 0 auto;

    .oferta-card {
      padding: 12px 6px;
      border-radius: 8px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      max-width: 190px;
      text-decoration: none;
      color: inherit;
      box-sizing: border-box;

      span {
        text-align: center;
      }
    }

    .oferta-card:hover {
      transform: translateY(-4px);
    }

    :global(.oferta-card:hover .oferta-cta) {
      background-color: rgba(150, 165, 0, 1);
      border-left: 4px solid #7e8c00;
    }

    :global(.oferta-card:hover .oferta-cta .text-container) {
      transform: translateX(-4px);
      color: var(--color-text-white);
    }

    .oferta-icon {
      margin-bottom: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      min-width: 80px;
      max-width: 110px !important;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  @media (max-width: 1280px) {
    :global(.oferta-grid) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem 1.25rem;
    }
  }

  // Kafelki kategorii na telefonie w 2 kolumnach (F3)
  @media (max-width: 680px) {
    :global(body.maszyny .oferta-container) {
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
    }

    :global(.oferta-grid) {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 14px 10px !important;
      justify-items: stretch !important;

      .oferta-card {
        width: 100% !important;
        max-width: 100% !important;
        padding: 10px 4px !important;
        margin: 0 !important;

        .oferta-icon {
          width: 52px !important;
          min-width: 48px !important;
          max-width: 60px !important;
          margin-bottom: 12px !important;

          img {
            width: 100%;
            height: auto;
          }
        }

        :global(.oferta-cta) {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          height: auto !important;
          min-height: 42px !important;
          padding: 8px 4px !important;
          font-size: 0.8rem !important;
          justify-content: center !important;
          text-align: center !important;
        }
      }
    }
  }

  :global(.oferta-cta) {
    width: 100% !important;
    min-width: 150px !important;
    max-width: 100% !important;
    clip-path: none !important;
  }
</style>
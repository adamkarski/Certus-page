<script lang="ts">
  import CtaButton from "./CtaButton.svelte";
  import { scrollToElement } from "$lib/utils/smoothScroll";

  export let variant: "homepage" | "maszyny" = "homepage";

  function navigateToMachine(sectionId: string) {
    if (variant === "homepage") {
      // For homepage - navigate to maszyny page with hash
      window.location.href = `/maszyny#${sectionId}`;
    } else {
      // For maszyny page - scroll to section with smooth animation
      scrollToElement(sectionId, 1200, 140); // 1.2 sekundy animacji, 140px offset
    }
  }
</script>

<div class="oferta-container container">
  <div class="oferta-grid">
    <div class="oferta-card">
      <div class="oferta-icon">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="Frezarki CNC" />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Frezarki CNC HMM"
        on:click={() => navigateToMachine("frezarki")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg"
          alt="Przemysłowe plotery CNC"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery CNC"
        on:click={() => navigateToMachine("ploteryPrzemyslowe")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg"
          alt="Przemysłowe plotery CNC"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery CNC w zabudowie"
        on:click={() => navigateToMachine("ploteryPrzemysloweZabudowa")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/frezarki5osiowe.svg"
          alt="Frezarki pięcioosiowe"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Frezarki pięcioosiowe"
        on:click={() => navigateToMachine("frezarki5osiowe")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="Grawerki CNC" />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Grawerki CNC"
        on:click={() => navigateToMachine("grawerki")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img
          src="/assets/ikony/maszyny/ploteryLinearne.svg"
          alt="Plotery tnące linearne CNC"
        />
      </div>

      <CtaButton
        classs="oferta-cta"
        text="Plotery tnące linearne CNC"
        on:click={() => navigateToMachine("ploteryLinearne")}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .oferta-container {
    overflow: hidden;
    width: 100%;
    padding: 0 0rem;
  }

  :global(body.maszyny .oferta-container) {
    padding-left: 6em !important;
    padding-right: 6em !important;
  }

  :global(.oferta-grid) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: end;
    justify-items: center;
    .oferta-card {
      padding: 10px 0px;
      border-radius: 0px;
      text-align: center;
      transition: all 0.3s ease;
      display: grid;
      align-items: end;
      justify-content: start;
      align-content: center;

      span {
        text-align: left;
      }
    }
    .oferta-card {
      width: min-content;
    }
    .oferta-card:hover {
      transform: translateY(-5px);
    }

    .oferta-icon {
      font-size: 50px;
      margin-bottom: 25px;
      display: block;
      width: 3.5em;
      min-width: 100px;
      max-width: 140px !important;

      img {
        // margin-left: 0.3em;
        width: 100%;
        height: auto;
      }
    }
  }

  // Responsive styles
  @media (min-width: 1617px) {
    :global(.oferta-grid) {
      grid-template-columns: repeat(6, 1fr);

      .oferta-icon {
        font-size: 45px;
        width: 3.2em;
        max-width: 120px !important;
      }
    }
  }

  // Układ pionowy poniżej 600px
  @media (max-width: 600px) {
    :global(.oferta-grid) {
      grid-template-columns: 1fr;
      gap: 25px;

      .oferta-card {
        padding: 20px 15px;
        max-width: 320px;
        margin: 0 auto;

        // Dostosowanie ikon
        .oferta-icon {
          font-size: 45px;
          margin-bottom: 20px;
          width: 3.5em;
          min-width: 90px;
          max-width: 120px !important;

          img {
            margin-left: 0.3em;
            width: 100%;
            height: auto;
          }
        }

        // Dostosowanie przycisków CTA
        :global(.oferta-cta) {
          width: 100% !important;
          max-width: 100% !important;
          font-size: 0.9rem !important;
          height: auto !important;
          min-height: 50px !important;
          padding: 12px 15px !important;
        }
      }
    }
  }

  // Style dla przycisków CTA - pozwalamy na łamanie tekstu
  :global(.oferta-cta) {
    width: 100% !important;
    min-width: 180px !important;
    max-width: 100% !important;
    clip-path: none !important;
  }

  :global(.oferta-cta .text-container .maszyny_span) {
    white-space: normal !important;
    word-break: break-word !important;
    line-height: 1.3 !important;
    text-align: left !important;
    display: block !important;
  }

  @media (max-width: 768px) {
    .oferta-container {
      padding: 0 2rem;
    }

    :global(.oferta-grid) {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;

      .oferta-card {
        padding: 15px 5px;
      }

      .oferta-icon {
        font-size: 50px;
        margin-bottom: 20px;
        width: 3em;

        img {
          margin-left: 0.5em;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .oferta-container {
      padding: 0 1rem;
    }

    :global(.oferta-grid) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;

      .oferta-card {
        padding: 10px 5px;
      }

      .oferta-icon {
        font-size: 40px;
        margin-bottom: 15px;
        width: 2.5em;

        img {
          margin-left: 0.4em;
        }
      }
    }
  }
</style>

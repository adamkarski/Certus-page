<script lang="ts">
  import CtaButton from "./CtaButton.svelte";

  export let variant: 'homepage' | 'maszyny' = 'homepage';

  function navigateToMachine(sectionId: string) {
    if (variant === 'homepage') {
      // For homepage - navigate to maszyny page with hash
      window.location.href = `/maszyny#${sectionId}`;
    } else {
      // For maszyny page - scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
        text="Frezarki pięcioosiowe"
        on:click={() => navigateToMachine("frezarki5osiowe")}
      />
    </div>

    <div class="oferta-card">
      <div class="oferta-icon">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="Grawerki CNC" />
      </div>

      <CtaButton
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

  :global(.oferta-grid) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .oferta-card {
      padding: 10px 0px;
      border-radius: 0px;
      text-align: center;
      transition: all 0.3s ease;
      display: grid;
      align-items: end;
      justify-content: center;
      align-content: center;
    }

    .oferta-card:hover {
      transform: translateY(-5px);
    }

    .oferta-icon {
      font-size: 60px;
      margin-bottom: 25px;
      display: block;
      width: 4em;

      img {
        margin-left: 0.6em;
      }
    }
  }

  // Responsive styles
  @media (min-width: 1617px) {
    :global(.oferta-grid) {
      grid-template-columns: repeat(6, 1fr);
    }
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
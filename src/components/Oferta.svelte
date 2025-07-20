<script lang="ts">
  import CtaButton from "./cta-button.svelte";
  const oferta = [
    {
      icon: "💼",
      title: "BUSINESS CONSULTING",
      description:
        "Strategic business advice and consulting oferta to help your company grow and succeed in competitive markets.",
    },
    {
      icon: "📊",
      title: "FINANCIAL PLANNING",
      description:
        "Comprehensive financial planning oferta including budgeting, forecasting, and investment strategies.",
    },
    {
      icon: "💰",
      title: "INVESTMENT MANAGEMENT",
      description:
        "Professional investment management oferta to maximize your returns while minimizing risks.",
    },
    {
      icon: "🏦",
      title: "BANKING SOLUTIONS",
      description:
        "Complete banking solutions including loans, credit facilities, and cash management oferta.",
    },
    {
      icon: "📈",
      title: "MARKET ANALYSIS",
      description:
        "In-depth market research and analysis to help you make informed business decisions.",
    },
    {
      icon: "🔒",
      title: "RISK MANAGEMENT",
      description:
        "Comprehensive risk assessment and management strategies to protect your business assets.",
    },
  ];
</script>

<section id="oferta" class="oferta">
  <div class="oferta-container">
    <div class="section-header">
      <h2 class="section-title">Polski producent maszyn CNC</h2>

      <p class="section-subtitle">
        10 lat doświadczenia w produkcji frezarek, grawerek, tokarek i ploterów
        CNC.
        <br />
        Kompleksowa obsługa od projektu po serwis.
        <br /> <br />
        — wszystko z jednego źródła Znajdź sprzęt idealny do Twojej firmy
      </p>
    </div>

    <div class="oferta-grid">
      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="src/assets/ikony/frezarki.svg" alt="Frezarki CNC" />
        </div>

        <CtaButton text="Frezarki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="src/assets/ikony/tokarki.svg" alt="Toakrki CNC" />
        </div>

        <CtaButton text="Tokarki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="src/assets/ikony/grawerki.svg" alt="Grawerki CNC" />
        </div>

        <CtaButton text="Grawerki CNC" />
      </div>

      <div class="oferta-card">
        <div class="oferta-icon">
          <img src="src/assets/ikony/Plotery.svg" alt="Plotery CNC" />
        </div>

        <CtaButton text="Plotery CNC" />
      </div>



    </div>
  </div>
</section>

<style>
  .oferta {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
  }

  .oferta-container {
    width: 100%;
    padding: 0 20px;
  }

  .section-header {
    margin-bottom: 80px;
  }

  .section-title {
    /*    font-size: 42px;
    font-weight: 800;
    color: #2c5aa0;
    margin-bottom: 20px;
    letter-spacing: 2px; */
  }

  .title-underline {
    width: 80px;
    height: 4px;
    background: #ffd700;
    margin: 0 auto 30px;
  }

  .section-subtitle {
  }

  .oferta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
  }

  .oferta-card {
    padding: 40px 30px;
    border-radius: 10px;
    text-align: center;
    width: 4em;
    transition: all 0.3s ease;
  }

  .oferta-card:hover {
    transform: translateY(-10px);
    /* border-top-color: #2c5aa0; */
  }

  .oferta-icon {
    font-size: 60px;
    margin-bottom: 25px;
    display: block;
    width: 4em;
  }

  .oferta-title {
    font-size: 20px;
    font-weight: 700;
    color: #2c5aa0;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  .oferta-description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
  }

  .oferta-btn {
    background: #2c5aa0;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  .oferta-btn:hover {
    background: #1a4480;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .oferta {
      padding: 80px 0;
    }

    .section-title {
      font-size: 32px;
    }

    .oferta-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .oferta-card {
      padding: 30px 20px;
    }
  }
</style>

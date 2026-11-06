<script lang="ts">
  import { page } from "$app/stores";
  import Section_Header from "../components/sections/Section_Header.svelte";
  import Section_Footer from "../components/sections/Section_Footer.svelte";

  $: status = $page.status || 404;
</script>

<svelte:head>
  <title>Nie ma takiej strony - CERTUS Maszyny CNC</title>
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="app">
  <Section_Header />
  <main class="error-page-wrapper">
    <section class="error-section">
      <div class="error-container">
        <span class="error-badge">{status}</span>
        <h1>Nie ma takiej strony</h1>
        <p class="error-desc">
          Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona pod inny adres.
        </p>
        <div class="error-buttons">
          <a href="/maszyny" class="error-btn btn-primary" title="Przejdź do oferty maszyn CNC">
            Maszyny
          </a>
          <a href="/kontakt" class="error-btn btn-secondary" title="Skontaktuj się z nami">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  .app {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    overflow-x: hidden;
  }

  .error-page-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 180px 20px 120px;
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
    color: white;
  }

  .error-section {
    width: 100%;
  }

  .error-container {
    max-width: 620px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  .error-badge {
    font-size: 80px;
    font-weight: 900;
    line-height: 1;
    color: #96a500;
    letter-spacing: -2px;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .error-desc {
    font-size: 16px;
    line-height: 1.6;
    color: #e2e8f0;
    max-width: 480px;
    margin: 0;
  }

  .error-buttons {
    display: flex;
    gap: 16px;
    margin-top: 14px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .error-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 34px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    min-width: 150px;
  }

  .btn-primary {
    background-color: #96a500;
    color: #ffffff;
    border: 2px solid #96a500;

    &:hover {
      background-color: #7e8c00;
      border-color: #7e8c00;
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid rgba(255, 255, 255, 0.4);

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: #ffffff;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    .error-page-wrapper {
      padding: 140px 16px 80px;
    }

    .error-badge {
      font-size: 64px;
    }

    .error-buttons {
      width: 100%;
      flex-direction: column;
    }

    .error-btn {
      width: 100%;
    }
  }
</style>

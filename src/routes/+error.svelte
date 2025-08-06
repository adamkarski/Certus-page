<script lang="ts">
  import { page } from '$app/stores';
  import LogoCertus from '../assets/logo_certus.svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import CtaButton from '../components/CtaButton.svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  $: status = $page.status;
  $: message = $page.error?.message;
</script>

<svelte:head>
  <title>Strona nie została znaleziona - Certus</title>
  <meta name="description" content="Przepraszamy, strona której szukasz nie istnieje." />
</svelte:head>

{#if mounted}
  <div class="error-page gradientHero" transition:fade={{ duration: 500 }}>
    <div class="error-container">
      <!-- Logo -->
      <div class="logo-container" transition:fly={{ y: -30, duration: 800, delay: 200 }}>
        <LogoCertus />
      </div>

      <!-- Kod błędu -->
      <div class="error-code" transition:fly={{ y: 30, duration: 800, delay: 400 }}>
        {status || 404}
      </div>

      <!-- Komunikat błędu -->
      <div class="error-message" transition:fly={{ y: 30, duration: 800, delay: 600 }}>
        <h1>Ups! Strona nie została znaleziona</h1>
        <p>
          {#if status === 404}
            Strona, której szukasz, nie istnieje lub została przeniesiona.
          {:else if message}
            {message}
          {:else}
            Wystąpił nieoczekiwany błąd.
          {/if}
        </p>
      </div>

      <!-- Akcje -->
      <div class="error-actions" transition:fly={{ y: 30, duration: 800, delay: 800 }}>
        <a href="/" style="text-decoration: none;" title="Wróć do strony głównej Certus">
          <CtaButtonKategory text="Wróć do strony głównej" />
        </a>
        <button style="background: none; border: none; padding: 0; margin: 0;" on:click={() => history.back()}>
          <CtaButtonKategory text="Wróć do poprzedniej strony" />
        </button>
      </div>

      <!-- Dodatkowe linki -->
      <div class="error-links" transition:fly={{ y: 30, duration: 800, delay: 1000 }}>




        <a href="/maszyny" class="link" title="Zobacz nasze maszyny CNC">Nasze maszyny</a>
        <a href="/onas" class="link" title="Dowiedz się więcej o firmie Certus">O nas</a>
        <a href="/kontakt" class="link" title="Skontaktuj się z nami">Kontakt</a>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  :global(.gradientHero) {
    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);
  }

  .error-page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    color: white;
  }

  .error-container {
    text-align: center;
    max-width: 600px;
    width: 100%;
  }

  .logo-container {
    width: 200px;
    height: auto;
    margin: 0 auto 3rem;
    opacity: 0.9;
  }

  .logo-container :global(svg) {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .error-code {
    font-size: 8rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  
  }

  .error-message {
    margin-bottom: 3rem;
  }

  .error-message h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .error-message p {
    font-size: 1.25rem;
    opacity: 0.9;
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto;
  }

  .error-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
    align-items: center;
  }

  

  .error-links {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
  }

  .link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-bottom-color: #96a500;
  }

:global(.error-page .cta-button){

  width: 390px !important;
    padding-right: 30px;
    align-items: center !important;
    text-align: left !important;

}

  /* Responsywność */
  @media (max-width: 768px) {
    .error-page {
      padding: 1rem;
    }

    .logo-container {
      width: 150px;
      margin-bottom: 2rem;
    }

    .error-code {
      font-size: 6rem;
      margin-bottom: 1rem;
    }

    .error-message h1 {
      font-size: 2rem;
    }

    .error-message p {
      font-size: 1.1rem;
    }

    .error-actions {
      margin-bottom: 2rem;
    }

 

    .error-links {
      gap: 1rem;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .error-code {
      font-size: 4rem;
    }

    .error-message h1 {
      font-size: 1.75rem;
    }

    .error-message p {
      font-size: 1rem;
    }

  }
</style>
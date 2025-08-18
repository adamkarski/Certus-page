<script lang="ts">

  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import '../lib/app.css';
  import { onMount } from 'svelte';
  import { preloaderVisible } from '$lib/preloaderStore';
  import { activePage } from "$lib/visibilityStore";
  import { landingVisible } from '$lib/landingStore';
  import LandingTargi from '../components/landing_targi.svelte';
  import DevResolutionDisplay from '../components/DevResolutionDisplay.svelte';
  let loading = true;
  onMount(() => {
    // Sprawdź czy strona już się załadowała
    if (document.readyState === 'complete') {
      loading = false;
    } else {
      window.addEventListener('load', () => {
        loading = false;
      });
    }
    // Fallback - wyłącz preloader po 2 sekundach
    setTimeout(() => preloaderVisible.set(false), 2000);

    // Automatyczne dodanie data-label dla responsive tabel
    const addResponsiveTableLabels = () => {
      const tables = document.querySelectorAll('.maszyny-dane-tabela');
      tables.forEach(table => {
        const headers = table.querySelectorAll('thead th');
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          cells.forEach((cell, index) => {
            if (headers[index] && !cell.hasAttribute('data-label')) {
              cell.setAttribute('data-label', headers[index].textContent?.trim() || '');
            }
          });
        });
      });
    };

    // Uruchom po załadowaniu strony
    setTimeout(addResponsiveTableLabels, 100);
    
    // Uruchom też po każdej zmianie DOM (np. przy dynamicznym ładowaniu tabel)
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (node.querySelector?.('.maszyny-dane-tabela') || node.classList?.contains('maszyny-dane-tabela'))) {
              shouldUpdate = true;
            }
          });
        }
      });
      if (shouldUpdate) {
        setTimeout(addResponsiveTableLabels, 50);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup na unmount
    return () => {
      observer.disconnect();
    };
  });
  $: preloaderVisible.set(loading);

  // Add active page class to body
  $: if (typeof document !== 'undefined') {
    // Remove all page classes
    document.body.classList.remove('home', 'maszyny', 'serwis', 'onas', 'kontakt', 'landing');
    // Add current page class
    document.body.classList.add($activePage);
    // Add landing class if landing is visible
    if ($landingVisible) {
      document.body.classList.add('landing');
    }
  }
</script>

{#if loading}
  <div class="preloader no-sel gradientHero">
    <img src="/assets/logo-certus.svg" alt="Wczytuje stronę..." width="64" height="64" />
  </div>
{/if}

{#key $page.url.pathname}
  <div transition:fade>
    <slot />
  </div>
{/key}



{#if $landingVisible}
  <LandingTargi />
{/if}

<!-- Dev Resolution Display - only visible during development -->
<DevResolutionDisplay />


<style lang="scss">

:global(.lottie-player .animation svg > g > g:nth-child(5)) {
    // g > g:nth-child(3) > g > g:nth-child(6)
    opacity: 0;
  }
.preloader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s;
    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);

  }
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :global(body) {
    width: 100%;
    overflow-x: hidden;
  }
</style>
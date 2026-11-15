<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';

  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import '../lib/app.css';
  import '../lib/media_queries.css';
  import { onMount } from 'svelte';
  import { preloaderVisible } from '$lib/preloaderStore';
  import { activePage } from "$lib/visibilityStore";
  import { landingVisible } from '$lib/landingStore';
  import LandingTargi from '../components/landing_targi.svelte';
  import DevResolutionDisplay from '../components/DevResolutionDisplay.svelte';
  let loading = true;
  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 500);

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
            const el = node as Element;
            if (node.nodeType === 1 && (el.querySelector?.('.maszyny-dane-tabela') || el.classList?.contains('maszyny-dane-tabela'))) {
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

  // Update activePage store based on current path
  $: {
    if (typeof document !== 'undefined' && $page) {
      const path = $page.url.pathname;
      let pageName = 'home'; // Default to home

      if (path === '/') {
        pageName = 'home';
      } else {
        // Extract the first segment after '/'
        const segments = path.split('/').filter(Boolean); // Remove empty strings
        if (segments.length > 0) {
          pageName = segments[0];
        }
      }
      activePage.set(pageName);
    }
  }

  // Add active page class to body
  $: if (typeof document !== 'undefined') {
    // Remove all page classes
    document.body.classList.remove('home', 'active_machine_view', 'maszyny', 'serwis', 'onas', 'kontakt', 'landing', 'dokumentacja', 'maszyny-specjalistyczne', 'maszyny-specjalne', 'bestseller');
    // Add current page class
    document.body.classList.add($activePage);
    // Add landing class if landing is visible
   /*  if ($landingVisible) {
      document.body.classList.add('landing');
    } */
  }
</script>

<Seo />

{#if loading}
  <div class="preloader no-sel gradientHero_old">
    <img src="/assets/logo-certus.svg" alt="Wczytuje stronę..." width="164" height="164" />
  </div>
{/if}

{#key $page.url.pathname}
  <div transition:fade>
    <slot />
  </div>
{/key}


<!--  POPUP  -->
<!-- {#if $landingVisible}
  <LandingTargi />
{/if} -->

<!-- Dev Resolution Display - only visible during development -->
<!-- <DevResolutionDisplay /> -->


<style lang="scss">
  :global(.gradientHero_old) {
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
  }
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
    // background: linear-gradient(180deg, #545454 0%, #3e4042 100%);

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
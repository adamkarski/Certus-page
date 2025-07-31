<script lang="ts">

  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import '../lib/app.css';
  import { onMount } from 'svelte';
  import { preloaderVisible } from '$lib/preloaderStore';
  import { activePage } from "$lib/visibilityStore";
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
    // Fallback - wyłącz preloader po 1 sekundzie
    setTimeout(() => loading = false, 1000);
  });
  $: preloaderVisible.set(loading);

  // Add active page class to body
  $: if (typeof document !== 'undefined') {
    // Remove all page classes
    document.body.classList.remove('home', 'maszyny', 'serwis', 'onas', 'kontakt');
    // Add current page class
    document.body.classList.add($activePage);
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
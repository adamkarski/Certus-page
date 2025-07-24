<script lang="ts">

  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import '../lib/app.css';
  import { onMount } from 'svelte';
  import { preloaderVisible } from '$lib/preloaderStore';
  let loading = true;
  onMount(() => {
    window.addEventListener('load', () => {
      loading = false;
    });
    setTimeout(() => loading = false, 2000); // fallback
  });
  $: preloaderVisible.set(loading);
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
.ramka {
    width: 1380px;
    height: 90px;
    left: 0px;
    top: 0px;
    position: absolute;
    opacity: 0.13;
    background: #bebebe;
    border-radius: 70px;
  
    

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
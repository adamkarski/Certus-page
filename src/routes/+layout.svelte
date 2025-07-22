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
  <div class="preloader">
    <img src="/assets/logo-certus.svg" alt="Loading..." width="64" height="64" />
  </div>
{/if}

{#key $page.url.pathname}
  <div transition:fade>
    <slot />
  </div>
{/key}

<style>
  .preloader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s;
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
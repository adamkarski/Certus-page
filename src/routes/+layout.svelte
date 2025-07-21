<script lang="ts">
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import '../lib/app.css';
</script>

{#key $page.url.pathname}
  <div transition:fade>
    <slot />
  </div>
{/key}

<style>
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
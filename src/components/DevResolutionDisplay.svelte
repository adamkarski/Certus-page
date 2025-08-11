<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let screenWidth = 0;
  let screenHeight = 0;
  let windowWidth = 0;
  let windowHeight = 0;

  function updateDimensions() {
    if (browser) {
      screenWidth = screen.width;
      screenHeight = screen.height;
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    }
  }

  onMount(() => {
    updateDimensions();
    
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

{#if browser}
  <div class="resolution-display">
    <div class="window-size">
      <strong>{windowWidth}×{windowHeight}</strong>
    </div>
    <div class="screen-size">
      Screen: {screenWidth}×{screenHeight}
    </div>
    <div class="breakpoint">
      {#if windowWidth >= 1617}
        XL (≥1617px)
      {:else if windowWidth >= 1200}
        L (1200-1616px)
      {:else if windowWidth >= 900}
        M (900-1199px)
      {:else if windowWidth >= 600}
        S (600-899px)
      {:else}
        XS (&lt;600px)
      {/if}
    </div>
  </div>
{/if}

<style>
  .resolution-display {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 11px;
    line-height: 1.3;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    z-index: 9999;
    pointer-events: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 99999999999999;
  }

  .resolution-display:hover {
    opacity: 0.9;
    pointer-events: auto;
  }

  .window-size {
    font-weight: bold;
    color: #4ade80;
    margin-bottom: 2px;
  }

  .screen-size {
    color: #94a3b8;
    font-size: 10px;
    margin-bottom: 2px;
  }

  .breakpoint {
    color: #fbbf24;
    font-size: 10px;
    font-weight: bold;
  }

  /* Ukryj w produkcji */
  @media (min-width: 1px) {
    .resolution-display {
      display: block;
    }
  }

  /* Opcjonalnie: ukryj w buildzie produkcyjnym */
  :global(body.production) .resolution-display {
    display: none !important;
  }
</style>
<script lang="ts">
  import { getMachineSvg } from "$lib/data/machineSvgPaths";

  export let text: string = "";
  export let height: string = "1em";
  export let width: string = "auto";
  export let className: string = "";
  export let style: string = "";
  export let shadow: boolean = true;

  $: svgData = getMachineSvg(text);
</script>

{#if svgData}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={svgData.viewBox}
    class="machine-svg-title {className}"
    class:with-shadow={shadow}
    style="display: inline-block; vertical-align: middle; height: {height}; width: {width}; max-width: 100%; {style}"
    aria-label={text}
    role="img"
  >
    <title>{text}</title>
    <desc>{text}</desc>
    <path d={svgData.d} fill="currentColor" />
  </svg>
  <span class="sr-only">{text}</span>
{:else}
  <span class="{className}" class:with-shadow={shadow} {style}>{text}<slot /></span>
{/if}

<style>
  .machine-svg-title {
    display: inline-block;
    vertical-align: middle;
    overflow: visible;
    transition: filter 0.3s ease;
  }
  .machine-svg-title.with-shadow {
    filter: drop-shadow(0 2px 9px rgba(0, 0, 0, 0.2)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85));
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>

<script lang="ts">
  import { getMachineSvg } from "$lib/data/machineSvgPaths";

  export let text: string = "";
  export let height: string = "1em";
  export let width: string = "auto";
  export let className: string = "";
  export let style: string = "";

  $: svgData = getMachineSvg(text);
</script>

{#if svgData}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={svgData.viewBox}
    class="machine-svg-title {className}"
    style="display: inline-block; vertical-align: middle; height: {height}; width: {width}; max-width: 100%; {style}"
    aria-label={text}
    role="img"
  >
    <path d={svgData.d} fill="currentColor" />
  </svg>
{:else}
  <span class={className} {style}>{text}</span>
{/if}

<style>
  .machine-svg-title {
    display: inline-block;
    vertical-align: middle;
    overflow: visible;
  }
</style>


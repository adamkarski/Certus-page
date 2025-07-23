import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index.js";
const preloaderVisible = writable(true);
const css = {
  code: ".preloader.svelte-obxuet{position:fixed;inset:0;z-index:9999;background:white;display:flex;align-items:center;justify-content:center;transition:opacity 0.5s;background:linear-gradient(180deg, #7c8897 0%, #3e4042 100%)}*{margin:0;padding:0;box-sizing:border-box}body{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { fade } from 'svelte/transition';\\nimport { page } from '$app/stores';\\nimport '../lib/app.css';\\nimport { onMount } from 'svelte';\\nimport { preloaderVisible } from '$lib/preloaderStore';\\nlet loading = true;\\nonMount(() => {\\n    window.addEventListener('load', () => {\\n        loading = false;\\n    });\\n    setTimeout(() => loading = false, 2000); // fallback\\n});\\n$: preloaderVisible.set(loading);\\n<\/script>\\n\\n{#if loading}\\n  <div class=\\"preloader no-sel gradientHero\\">\\n    <img src=\\"/assets/logo-certus.svg\\" alt=\\"Wczytuje stronę...\\" width=\\"64\\" height=\\"64\\" />\\n  </div>\\n{/if}\\n\\n{#key $page.url.pathname}\\n  <div transition:fade>\\n    <slot />\\n  </div>\\n{/key}\\n\\n<style>\\n  .preloader {\\n    position: fixed;\\n    inset: 0;\\n    z-index: 9999;\\n    background: white;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    transition: opacity 0.5s;\\n    background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);\\n\\n  }\\n  :global(*) {\\n    margin: 0;\\n    padding: 0;\\n    box-sizing: border-box;\\n  }\\n  :global(body) {\\n    width: 100%;\\n    overflow-x: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AA4BE,wBAAW,CACT,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAE9D,CACQ,CAAG,CACT,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UACd,CACQ,IAAM,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let loading = true;
  $$result.css.add(css);
  {
    preloaderVisible.set(loading);
  }
  $$unsubscribe_page();
  return `${`<div class="preloader no-sel gradientHero svelte-obxuet" data-svelte-h="svelte-1fvd3b6"><img src="/assets/logo-certus.svg" alt="Wczytuje stronę..." width="64" height="64"></div>`} <div>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};

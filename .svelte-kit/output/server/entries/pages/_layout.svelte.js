import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index.js";
import { a as activePage } from "../../chunks/visibilityStore.js";
const preloaderVisible = writable(true);
const css = {
  code: ".lottie-player .animation svg > g > g:nth-child(5){opacity:0}.preloader.svelte-bninx1{position:fixed;inset:0;z-index:9999;background:white;display:flex;align-items:center;justify-content:center;transition:opacity 0.5s;background:linear-gradient(180deg, #7c8897 0%, #3e4042 100%)}*{margin:0;padding:0;box-sizing:border-box}body{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { fade } from 'svelte/transition';\\nimport { page } from '$app/stores';\\nimport '../lib/app.css';\\nimport { onMount } from 'svelte';\\nimport { preloaderVisible } from '$lib/preloaderStore';\\nimport { activePage } from \\"$lib/visibilityStore\\";\\nlet loading = true;\\nonMount(() => {\\n    // Sprawdź czy strona już się załadowała\\n    if (document.readyState === 'complete') {\\n        loading = false;\\n    }\\n    else {\\n        window.addEventListener('load', () => {\\n            loading = false;\\n        });\\n    }\\n    // Fallback - wyłącz preloader po 1 sekundzie\\n    setTimeout(() => loading = false, 1000);\\n});\\n$: preloaderVisible.set(loading);\\n// Add active page class to body\\n$: if (typeof document !== 'undefined') {\\n    // Remove all page classes\\n    document.body.classList.remove('home', 'maszyny', 'serwis', 'onas', 'kontakt');\\n    // Add current page class\\n    document.body.classList.add($activePage);\\n}\\n<\/script>\\n\\n{#if loading}\\n  <div class=\\"preloader no-sel gradientHero\\">\\n    <img src=\\"/assets/logo-certus.svg\\" alt=\\"Wczytuje stronę...\\" width=\\"64\\" height=\\"64\\" />\\n  </div>\\n{/if}\\n\\n{#key $page.url.pathname}\\n  <div transition:fade>\\n    <slot />\\n  </div>\\n{/key}\\n\\n<style lang=\\"scss\\">:global(.lottie-player .animation svg > g > g:nth-child(5)) {\\n  opacity: 0;\\n}\\n\\n.preloader {\\n  position: fixed;\\n  inset: 0;\\n  z-index: 9999;\\n  background: white;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  transition: opacity 0.5s;\\n  background: linear-gradient(180deg, #7c8897 0%, #3e4042 100%);\\n}\\n\\n:global(*) {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\n:global(body) {\\n  width: 100%;\\n  overflow-x: hidden;\\n}</style>"],"names":[],"mappings":"AA0C2B,kDAAoD,CAC7E,OAAO,CAAE,CACX,CAEA,wBAAW,CACT,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAC9D,CAEQ,CAAG,CACT,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UACd,CAEQ,IAAM,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activePage, $$unsubscribe_activePage;
  let $$unsubscribe_page;
  $$unsubscribe_activePage = subscribe(activePage, (value) => $activePage = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let loading = true;
  $$result.css.add(css);
  {
    preloaderVisible.set(loading);
  }
  {
    if (typeof document !== "undefined") {
      document.body.classList.remove("home", "maszyny", "serwis", "onas", "kontakt");
      document.body.classList.add($activePage);
    }
  }
  $$unsubscribe_activePage();
  $$unsubscribe_page();
  return `${`<div class="preloader no-sel gradientHero svelte-bninx1" data-svelte-h="svelte-1fvd3b6"><img src="/assets/logo-certus.svg" alt="Wczytuje stronę..." width="64" height="64"></div>`} <div>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};

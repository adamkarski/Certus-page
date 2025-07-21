import { c as create_ssr_component } from "../../chunks/ssr.js";
const css = {
  code: "*{margin:0;padding:0;box-sizing:border-box}body{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import '../lib/app.css';\\n<\/script>\\n\\n<slot />\\n\\n<style>\\n  :global(*) {\\n    margin: 0;\\n    padding: 0;\\n    box-sizing: border-box;\\n  }\\n  \\n  :global(body) {\\n    width: 100%;\\n    overflow-x: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AAMU,CAAG,CACT,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UACd,CAEQ,IAAM,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};

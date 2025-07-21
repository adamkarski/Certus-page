import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { O as Oferta } from "../../../chunks/Oferta.js";
const css = {
  code: ".app.svelte-fjdlzt{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Header from '../../components/Header.svelte';\\nimport Footer from '../../components/Footer.svelte';\\nimport Oferta from '../../components/Oferta.svelte';\\n<\/script>\\n\\n<svelte:head>\\n  <title>Maszyny CNC - Certus</title>\\n  <meta name=\\"description\\" content=\\"Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe\\" />\\n</svelte:head>\\n\\n<div class=\\"app\\">\\n  <Header />\\n  <main>\\n    <Oferta />\\n  </main>\\n  <Footer />\\n</div>\\n\\n<style>\\n  .app {\\n    width: 100%;\\n    overflow-x: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AAmBE,kBAAK,CACH,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1lfmsun_START -->${$$result.title = `<title>Maszyny CNC - Certus</title>`, ""}<meta name="description" content="Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe"><!-- HEAD_svelte-1lfmsun_END -->`, ""} <div class="app svelte-fjdlzt">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main>${validate_component(Oferta, "Oferta").$$render($$result, {}, {}, {})}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};

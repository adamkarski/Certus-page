import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { O as Oferta } from "../../../chunks/Oferta.js";
const css = {
  code: ".maszyny_page.svelte-1dj4x8m{max-width:80vw;margin:0 auto;min-height:80vh;background-color:red}.app.svelte-1dj4x8m{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Header from '../../components/Header.svelte';\\nimport Footer from '../../components/Footer.svelte';\\nimport Oferta from '../../components/Oferta.svelte';\\n<\/script>\\n\\n<svelte:head>\\n  <title>Maszyny CNC - Certus</title>\\n  <meta name=\\"description\\" content=\\"Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe\\" />\\n</svelte:head>\\n\\n\\n\\n\\n<div class=\\"app\\">\\n  <Header />\\n  <main>\\n\\n    <section class=\\"maszyny_page\\" >\\n\\n\\n\\n\\n <div class=\\"first-container-back\\">\\n    \\n    \\n\\n  </div>\\n    </section>\\n\\n    <Oferta />\\n  </main>\\n  <Footer />\\n</div>\\n\\n<style>\\n\\n.maszyny_page{\\n\\n\\n  max-width: 80vw; margin: 0 auto;\\n\\n\\n\\n  min-height: 80vh;\\n\\nbackground-color: red;\\n\\n}\\n\\n\\n\\n\\n\\n  .app {\\n    width: 100%;\\n    overflow-x: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AAoCA,4BAAa,CAGX,SAAS,CAAE,IAAI,CAAE,MAAM,CAAE,CAAC,CAAC,IAAI,CAI/B,UAAU,CAAE,IAAI,CAElB,gBAAgB,CAAE,GAElB,CAME,mBAAK,CACH,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1lfmsun_START -->${$$result.title = `<title>Maszyny CNC - Certus</title>`, ""}<meta name="description" content="Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe"><!-- HEAD_svelte-1lfmsun_END -->`, ""} <div class="app svelte-1dj4x8m">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main><section class="maszyny_page svelte-1dj4x8m" data-svelte-h="svelte-1owpvfm"><div class="first-container-back"></div></section> ${validate_component(Oferta, "Oferta").$$render($$result, {}, {}, {})}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};

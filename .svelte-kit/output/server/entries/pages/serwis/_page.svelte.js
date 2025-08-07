import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { S as Serwis } from "../../../chunks/Serwis.js";
import { S as Section_Header, a as Section_Referencje, b as Section_Footer } from "../../../chunks/Section_Referencje.js";
import { S as Section_Image02 } from "../../../chunks/Section_Image02.js";
const css = {
  code: ".app.svelte-6qkort{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Serwis from '../../components/Serwis.svelte';\\nimport Section_Header from \\"../../components/sections/Section_Header.svelte\\";\\nimport Section_Footer from \\"../../components/sections/Section_Footer.svelte\\";\\nimport Section_Image02 from \\"../../components/sections/Section_Image02.svelte\\";\\nimport Section_Referencje from \\"../../components/sections/Section_Referencje.svelte\\";\\n<\/script>\\n\\n<svelte:head>\\n  <title>Serwis maszyn CNC - Gwarancyjny i pogwarancyjny - Certus</title>\\n  <meta name=\\"description\\" content=\\"Profesjonalny serwis maszyn CNC Certus. Oferujemy serwis gwarancyjny, pogwarancyjny oraz przeróbki maszyn. Doświadczony zespół techników.\\" />\\n</svelte:head>\\n\\n<div class=\\"app\\">\\n  <Section_Header />\\n  <main>\\n    <Serwis />\\n    <Section_Image02 />\\n    <Section_Referencje />\\n  </main>\\n  <Section_Footer />\\n</div>\\n\\n\\n\\n<style lang=\\"scss\\">.app {\\n  width: 100%;\\n  overflow-x: hidden;\\n}</style>\\n"],"names":[],"mappings":"AAwBmB,kBAAK,CACtB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-5j5v9a_START -->${$$result.title = `<title>Serwis maszyn CNC - Gwarancyjny i pogwarancyjny - Certus</title>`, ""}<meta name="description" content="Profesjonalny serwis maszyn CNC Certus. Oferujemy serwis gwarancyjny, pogwarancyjny oraz przeróbki maszyn. Doświadczony zespół techników."><!-- HEAD_svelte-5j5v9a_END -->`, ""} <div class="app svelte-6qkort">${validate_component(Section_Header, "Section_Header").$$render($$result, {}, {}, {})} <main>${validate_component(Serwis, "Serwis").$$render($$result, {}, {}, {})} ${validate_component(Section_Image02, "Section_Image02").$$render($$result, {}, {}, {})} ${validate_component(Section_Referencje, "Section_Referencje").$$render($$result, {}, {}, {})}</main> ${validate_component(Section_Footer, "Section_Footer").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};

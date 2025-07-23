import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
/* empty css                                                                */
import { L as LocalBusiness, O as Onas, I as ImageSection_01, C as Contact, a as ImageSection_02, R as Referencje } from "../../../chunks/LocalBusiness.js";
const css = {
  code: ".app.svelte-fjdlzt{width:100%;overflow-x:hidden}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Header from '../../components/Header.svelte';\\nimport Footer from '../../components/Footer.svelte';\\nimport Oferta from '../../components/Oferta.svelte';\\nimport Onas from '../../components/Onas.svelte';\\nimport ImageSection_01 from '../../components/ImageSection_01.svelte';\\nimport Contact from '../../components/Contact.svelte';\\nimport ImageSection_02 from '../../components/ImageSection_02.svelte';\\nimport Referencje from '../../components/Referencje.svelte';\\nimport LocalBusiness from '../../components/LocalBusiness.svelte';\\n<\/script>\\n\\n<svelte:head>\\n  <title>O nas - Certus</title>\\n  <meta name=\\"description\\" content=\\"O naszej firmie, poznaj naszą historię i zespół\\" />\\n</svelte:head>\\n\\n\\n\\n<div class=\\"app\\">\\n  <Header />\\n  <LocalBusiness/>\\n  <main>\\n    <Onas />\\n    <ImageSection_01 />\\n    <Contact />\\n    <ImageSection_02 />\\n    <Referencje />\\n  </main>\\n  <Footer />\\n</div>\\n\\n<style>\\n  .app {\\n    width: 100%;\\n    overflow-x: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AAgCE,kBAAK,CACH,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-121alup_START -->${$$result.title = `<title>O nas - Certus</title>`, ""}<meta name="description" content="O naszej firmie, poznaj naszą historię i zespół"><!-- HEAD_svelte-121alup_END -->`, ""} <div class="app svelte-fjdlzt">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(LocalBusiness, "LocalBusiness").$$render($$result, {}, {}, {})} <main>${validate_component(Onas, "Onas").$$render($$result, {}, {}, {})} ${validate_component(ImageSection_01, "ImageSection_01").$$render($$result, {}, {}, {})} ${validate_component(Contact, "Contact").$$render($$result, {}, {}, {})} ${validate_component(ImageSection_02, "ImageSection_02").$$render($$result, {}, {}, {})} ${validate_component(Referencje, "Referencje").$$render($$result, {}, {}, {})}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};

<script lang="ts">
  
  import MapaWitryny from '../../components/MapaWitryny.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
  
</script>

<svelte:head>
  <title>Mapa witryny - Certus</title>
  <meta name="description" content="Znajdź wszystko, czego szukasz na naszej stronie. Pełna mapa witryny Certus." />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <MapaWitryny />
    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>



<style lang="scss">
  .app {
    width: 100%;
    overflow-x: hidden;
  }

  :global(body) {
  
  }
</style>

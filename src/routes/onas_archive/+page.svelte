<script lang="ts">
  
  import Onas from '../../components/Onas.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
  
</script>

<svelte:head>
  <title>O nas - Polski producent maszyn CNC - Certus</title>
  <meta name="description" content="Poznaj Certus - polskiego producenta maszyn CNC z ponad 20-letnim doświadczeniem. Specjalizujemy się w frezarkach, ploterach i grawerach dla różnych branż." />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Onas />
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

<script lang="ts">
  import Onas from '../../components/Onas.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Onas_Images from "../../components/sections/Section_Onas_Images.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
  
</script>

<svelte:head>
  <title>O nas - CERTUS | Your Vision, Our Precision</title>
  <meta name="description" content="Jesteśmy polskim producentem maszyn CNC z ponad 10-letnim doświadczeniem w branży. Specjalizujemy się w tworzeniu precyzyjnych urządzeń dostosowanych do indywidualnych potrzeb naszych klientów." />
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

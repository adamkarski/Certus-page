<script lang="ts">
  import Bestseller from '../../components/Bestseller.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
</script>

<svelte:head>
  <title>Bestseller: Frezarko-Grawerka CNC Certus 69 | Polski Producent</title>
  <meta 
    name="description" 
    content="Poznaj frezarko-grawerkę CNC Certus 69 - nasz bestseller. Kompaktowa, precyzyjna i wszechstronna maszyna do obróbki aluminium, drewna i metali kolorowych. Sprawdź dane techniczne i galerię."
  />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Bestseller />
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>

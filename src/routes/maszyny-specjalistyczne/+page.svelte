<script lang="ts">
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import MaszynySpecjalistyczne from "../../components/MaszynySpecjalistyczne.svelte";
</script>

<svelte:head>
  <title>Maszyny Specjalistyczne - CERTUS | Your Vision, Our Precision</title>
  <meta name="description" content="Poznaj nasze maszyny specjalistyczne CNC, zaprojektowane i zbudowane w odpowiedzi na unikalne wymagania produkcyjne naszych klientów." />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <MaszynySpecjalistyczne />
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

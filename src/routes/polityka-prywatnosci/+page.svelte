<script lang="ts">
  
  import Serwis from '../../components/Serwis.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
</script>

<svelte:head>
  <title>O nas - Certus</title>
  <meta name="description" content="O naszej firmie, poznaj naszą historię i zespół" />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Serwis />
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

<script lang="ts">
  import Header from '../../components/Header.svelte'
  import Footer from '../../components/Footer.svelte'
  import Oferta from '../../components/Oferta.svelte';
  import Onas from '../../components/Onas.svelte';
  import ImageSection_01 from '../../components/ImageSection_01.svelte';
  import Contact from '../../components/Contact.svelte';
  import ImageSection_02 from '../../components/ImageSection_02.svelte';
  import Referencje from '../../components/Referencje.svelte';
  
</script>

<svelte:head>
  <title>O nas - Certus</title>
  <meta name="description" content="O naszej firmie, poznaj naszą historię i zespół" />
</svelte:head>

<div class="app">
  <Header />
  <main>
    <Onas />
    <ImageSection_01 />
    <Contact />
    <ImageSection_02 />
    <Referencje />
  </main>
  <Footer />
</div>

<style>
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>
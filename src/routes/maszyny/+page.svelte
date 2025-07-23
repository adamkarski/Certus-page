<script lang="ts">
  import Header from '../../components/Header.svelte'
  import Footer from '../../components/Footer.svelte'
  import Oferta from '../../components/Oferta.svelte';
import Maszyny from '../../components/Maszyny.svelte';
  import ImageSection_02 from '../../components/ImageSection_02.svelte';
  import Referencje from '../../components/Referencje.svelte';
</script>

<svelte:head>
  <title>Maszyny CNC - Certus</title>
  <meta name="description" content="Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe" />
</svelte:head>




<div class="app">
  <Header />
  <main>

  

    <Maszyny />
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
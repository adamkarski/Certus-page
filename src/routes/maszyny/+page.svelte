<script lang="ts">
  import Header from '../../components/Header.svelte'
  import Footer from '../../components/Footer.svelte'
  import Oferta from '../../components/Oferta.svelte';
</script>

<svelte:head>
  <title>Maszyny CNC - Certus</title>
  <meta name="description" content="Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe" />
</svelte:head>

<div class="app">
  <Header />
  <main>

    <section class="maszyny_page" >




 <div class="first-container-back">
    
    

  </div>
    </section>

    <Oferta />
  </main>
  <Footer />
</div>

<style>

.maszyny_page{


  max-width: 80vw; margin: 0 auto;



  min-height: 80vh;

background-color: red;

}





  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>
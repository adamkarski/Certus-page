<script lang="ts">
  import Header from '../components/Header.svelte'
  import Hero from '../components/Hero.svelte'
  import Oferta from '../components/Oferta.svelte'
  import Contact from '../components/Contact.svelte'
  import Footer from '../components/Footer.svelte'
  import Video from '../components/Video.svelte';
  import Onas from '../components/Onas.svelte';
  import ImageSection_01 from '../components/ImageSection_01.svelte';
  import ImageSection_02 from '../components/ImageSection_02.svelte';
  import Referencje from '../components/Referencje.svelte';
  import LocalBusiness from '../components/LocalBusiness.svelte';
</script>

<svelte:head>
  <title>Certus - Maszyny tworzone z pasją i precyzją</title>
  <meta name="description" content="Certus - specjalizujemy się w produkcji maszyn przemysłowych najwyższej jakości" />
  <link rel="preload" href="/static/assets/Background_Hero_swipe.jpg" as="image">
</svelte:head>

<div class="app">
  <Header />
  <LocalBusiness/>
  <main>
    <Hero />
    <Oferta />
    <Video />
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
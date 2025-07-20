<script lang="ts">
  import Header from './components/Header.svelte'
  import Hero from './components/Hero.svelte'
  import Oferta from './components/Oferta.svelte'
  import Contact from './components/Contact.svelte'
  import Footer from './components/Footer.svelte'
  import Video from './components/Video.svelte';
  import Onas from './components/Onas.svelte';
  import ImageSection_01 from './components/image_section_01.svelte';
  import ImageSection_02 from './components/image_section_02.svelte';
    import Referencje from './components/Referencje.svelte';
</script>

<div class="app">
  <Header />
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
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>
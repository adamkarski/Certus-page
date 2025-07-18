<script lang="ts">
  import Header from './components/Header.svelte'
  import Hero from './components/Hero.svelte'
  import Services from './components/Services.svelte'
  import About from './components/About.svelte'
  import References from './components/References.svelte'
  import Contact from './components/Contact.svelte'
  import Footer from './components/Footer.svelte'
</script>

<div class="app">
  <Header />
  <main>
    <Hero />
    <Services />
    <About />
    <References />
    <Contact />
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
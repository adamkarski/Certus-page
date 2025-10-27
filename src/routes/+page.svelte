<script lang="ts">
  import Section_Header from '../components/sections/Section_Header.svelte'
  import Section_Oferta from '../components/sections/Section_Oferta.svelte'
  import Section_Kontakt from '../components/sections/Section_Kontakt.svelte'
  import Section_Footer from '../components/sections/Section_Footer.svelte'
  import Section_Video from '../components/sections/Section_Video.svelte';
  import Section_Onas from '../components/sections/Section_Onas.svelte';
  import Section_Image01 from '../components/sections/Section_Image01.svelte';
  import Section_Image02 from '../components/sections/Section_Image02.svelte';
  import Section_Referencje from '../components/sections/Section_Referencje.svelte';
  import LocalBusiness from '../components/LocalBusiness.svelte';
  import Section_Hero from '../components/sections/Section_Hero.svelte';
</script>

<svelte:head>
  <title>Certus - Maszyny tworzone z pasją i precyzją</title>
  <meta name="description" content="Certus - specjalizujemy się w produkcji maszyn przemysłowych najwyższej jakości" />
</svelte:head>

<div class="app">
  <Section_Header />
  <LocalBusiness/>
  <main>
    
    <Section_Hero />
    <Section_Oferta />
    <Section_Video />
    <Section_Onas />
    <Section_Image01 />
    <Section_Kontakt />
    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>

<style>
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>
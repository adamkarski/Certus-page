<script lang="ts">
  import HmpG1 from "../../components/HmpG1.svelte";
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
</script>

<svelte:head>
  <title>HMP-G1 – kompaktowe centrum frezarskie CNC | CERTUS</title>
  <meta
    name="description"
    content="CERTUS HMP-G1: kompaktowe centrum frezarskie CNC w pełnej zabudowie. Pole pracy 500 × 400 mm, oś Z do 350 mm, wrzeciono do 6 kW, opcjonalnie ATC 10–16 pozycji. Polski producent."
  />
  <link rel="canonical" href="https://mg-certus.pl/hmp-g1" />
  <meta
    property="og:title"
    content="HMP-G1 – kompaktowe centrum frezarskie CNC | CERTUS"
  />
  <meta
    property="og:description"
    content="CERTUS HMP-G1: kompaktowe centrum frezarskie CNC w pełnej zabudowie. Pole pracy 500 × 400 mm, oś Z do 350 mm, wrzeciono do 6 kW, opcjonalnie ATC 10–16 pozycji. Polski producent."
  />
  <meta property="og:url" content="https://mg-certus.pl/hmp-g1" />
  <meta property="og:type" content="product" />
  <meta
    property="og:image"
    content="https://mg-certus.pl/assets/maszyny/hmp-g1/hmp-g1-hero.webp"
  />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <HmpG1 />
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>

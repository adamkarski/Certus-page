<script lang="ts">
  
  import Reklamacje from "../../components/Reklamacje.svelte";
  

  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
</script>

<svelte:head>
  <title>Reklamacje - Certus</title>
  <meta
    name="description"
    content="Zgłoś reklamację lub dowiedz się więcej o procesie."
  />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Reklamacje />
    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>



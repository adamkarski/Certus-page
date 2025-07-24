<script lang="ts">
  
  import Kontakt from '../../components/Kontakt.svelte';

  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
</script>

<svelte:head>
  <title>Kontakt - Certus</title>
  <meta name="description" content="Skontaktuj się z nami - dane teleadresowe." />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Kontakt />

    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>









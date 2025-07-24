<script lang="ts">
  import Maszyny from '../../components/Maszyny.svelte';

  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";

</script>

<svelte:head>
  <title>Maszyny CNC - Certus</title>
  <meta name="description" content="Poznaj naszą ofertę maszyn CNC - wysokiej jakości urządzenia przemysłowe" />
</svelte:head>




<div class="app">
  <Section_Header />
  <main>

    <Maszyny />


    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>


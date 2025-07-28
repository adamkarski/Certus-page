<script lang="ts">
  import Maszyny from '../../components/Maszyny.svelte';
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(() => {
    if (browser && window.location.hash) {
      const id = window.location.hash.substring(1); // Remove the #
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
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
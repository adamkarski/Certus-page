<script lang="ts">
  import Section_Header from '../../components/sections/Section_Header.svelte'
  import Section_Footer from '../../components/sections/Section_Footer.svelte'
  import Dokumentacja from '../../components/Dokumentacja.svelte';
  import Section_Image01 from '../../components/sections/Section_Image01.svelte';
  import Section_Referencje from '../../components/sections/Section_Referencje.svelte';
</script>

<svelte:head>
  <title>Dokumentacja - Certus</title>
  <meta name="description" content="Pobierz dokumentację techniczną i instrukcje obsługi." />
</svelte:head>

<div class="app">
  <Section_Header />
  <main>
    <Dokumentacja />
    <Section_Image01 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>





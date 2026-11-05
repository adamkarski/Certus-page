<script lang="ts">
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import MaszynySpecjalistyczne from "../../components/MaszynySpecjalistyczne.svelte";
</script>

<div class="app">
  <Section_Header />
  <main>
    <MaszynySpecjalistyczne />
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  .app {
    width: 100%;
    overflow-x: hidden;
  }
</style>


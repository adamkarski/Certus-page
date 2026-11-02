<script lang="ts">
  import HmpG1 from "../../components/HmpG1.svelte";
  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
</script>



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

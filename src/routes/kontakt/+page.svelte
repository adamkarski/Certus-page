<script lang="ts">
  import LocalBusiness from '../../components/LocalBusiness.svelte';
  import Kontakt from '../../components/Kontakt.svelte';

  import Section_Header from "../../components/sections/Section_Header.svelte";
  import Section_Footer from "../../components/sections/Section_Footer.svelte";
  import Section_Image02 from "../../components/sections/Section_Image02.svelte";
  import Section_Referencje from "../../components/sections/Section_Referencje.svelte";
</script>



<LocalBusiness />

<div class="app">
  <Section_Header />
  <main>
    <Kontakt isKontaktPage={true} />

    <Section_Image02 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>









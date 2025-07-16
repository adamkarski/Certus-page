<script lang="ts">
  import Header from './lib/Header.svelte';
  import HeroSection from './lib/HeroSection.svelte';
  import ProductsSection from './lib/ProductsSection.svelte';
  import SolutionsSection from './lib/SolutionsSection.svelte';
  import AboutSection from './lib/AboutSection.svelte';
  import ContactSection from './lib/ContactSection.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<main class="min-h-screen bg-white">
  <Header />
  <HeroSection />
  <ProductsSection />
  <SolutionsSection />
  <AboutSection />
  <ContactSection />
  <Footer />
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(.line-clamp-2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
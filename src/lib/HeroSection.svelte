<script lang="ts">
  import { onMount } from 'svelte';
  
  let videoElement: HTMLVideoElement;
  
  onMount(() => {
    if (videoElement) {
      videoElement.play();
    }
  });
</script>

<section class="relative bg-primary-900 overflow-hidden h-screen flex items-center">
  <!-- Background Video -->
  <div class="absolute inset-0 z-0">
    <video
      muted
      loop
      autoplay
      class="w-full h-full object-cover"
      bind:this={videoElement}
    >
      <source src="https://www.certus.com/media/video/certus-machines-showreel.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="gradient-overlay"></div>
  </div>
  
  <div class="container-custom relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="heading-xl text-white mb-8">
        Zaawansowane rozwiązania CNC<br>dla przemysłu
      </h1>
      <p class="text-lead text-white/90 mb-12 max-w-3xl mx-auto">
        Dostarczamy precyzyjne maszyny i oprogramowanie, które rewolucjonizują produkcję przemysłową
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-6">
        <button class="btn-primary !bg-white !text-primary-600 hover:!bg-secondary-100">
          Poznaj naszą ofertę
        </button>
        <button class="btn-outline !text-white !border-white hover:!bg-white/10">
          Skontaktuj się
        </button>
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
    <div class="flex flex-col items-center animate-bounce">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </div>
</section>
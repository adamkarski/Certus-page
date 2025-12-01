<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { visibilityStore, setSectionVisible } from "../../lib/visibilityStore";
  import { typoFixAction } from '$lib/utils/typography';

  export let sectionId: string = "maszyny-image-02";
  export let imgSrc: string = "/assets/placeholder-machine-2.jpg";
  export let title: string = "Galeria zdjęć";
  export let subtitle: string = "Zobacz więcej realizacji";
  export let ctaText: string = "Przejdź do galerii";
  export let ctaAction: () => void = () => {};
  
  let headerEl: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(sectionId);
        }
      },
      { threshold: 0.05 },
    );
    if (headerEl) observer.observe(headerEl);
    return () => observer.disconnect();
  });

  $: visible = $visibilityStore[sectionId] === true;
</script>

<section id={sectionId} class="maszyny-plain-image-section">
  <div class="maszyny-plain-image-container">
    <img
      src={imgSrc}
      alt={title}
      class="maszyny-plain-image"
    />
    <div class="maszyny-plain-image-header" bind:this={headerEl} class:visible>
      {#if visible}
        <!-- <h3 class="no-sel" in:fade={{ duration: 600, delay: 400 }} use:typoFixAction>
          {title}
        </h3> -->
       <!--  <p class="no-sel" use:typoFixAction>{subtitle}</p> -->
        <button class="maszyny-cta-btn" on:click={ctaAction}>
          {ctaText}
        </button>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">



  .maszyny-plain-image-section {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow:  1px 7px 20px 0px rgb(96 93 93 / 65%);
    .maszyny-plain-image{


      border: solid 1px black;

    }
  }

  .maszyny-plain-image-header {
    min-height: 60px;
    width: 100%;
    text-align: right;
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding-left: 20px;


    h3 {
      margin: 0 0 8px 0;
      color: white;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-weight: 600;
    }
    
    p {
      margin: 0 0 15px 0;
      color: white;
      font-weight: 300;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }
  }

  .maszyny-cta-btn {
  position: relative;
  background: rgba(126, 140, 0, 1);
  color: white;
  border: none;
  padding: 8px 16px;
 
  cursor: pointer;
  font-weight: 600;
  overflow: hidden;
  min-width: 200px;
  text-align: left;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -30px;
    width: 28px;
    height: 100%;
    background: linear-gradient(135deg, 
      transparent 49%, 
      rgba(251, 251, 251, 1) 49%, 
      rgba(251, 251, 251, 1) 100%
    );
    transition: right 0.2s ease;
    z-index: 1;
  }

  &:hover {
    
    
    &::before {
      right: 0;
    }
  }
}


  .maszyny-plain-image-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #f8f9fa;
    aspect-ratio: 2 / 1; /* Make the container square */
  }

  .maszyny-plain-image {
    width: 100%;
    height: 100%; /* Fill the square container */
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .maszyny-plain-image-header h3 {
    }
    
    .maszyny-plain-image-header p {
    }
    
    /* No need to set height here anymore, aspect-ratio handles it */
    
    .maszyny-cta-btn {
      padding: 6px 12px;
    }
  }
</style>
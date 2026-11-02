<script lang="ts">
	// import { text } from '@sveltejs/kit';
  import { createEventDispatcher } from "svelte";
  export let text: string = "OK";
  export let type: string = "button";
  export let disabled: boolean = false;
  export let hero: boolean = false; // Dodajemy propsa do wariantu hero
  export let classs: string = "";
  import { typoFixAction } from "$lib/utils/typography"; // Importujemy akcję do poprawy typografii
  const dispatch = createEventDispatcher();
</script>

<button
  class:hero
  class={classs}
  on:click={() => dispatch("click")}
  {type}
  {disabled}
>
  <span class="text-container">
    <span use:typoFixAction class="maszyny_span">{text}</span>
  </span>
  <span class="svg-container">
    <svg
      class="cta-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 158.04 93.76"
    >
      <polyline class="cls-1" points="109.49 0 158.04 0 49.13 93.76 0 93.76" />
      <polygon
        class="cls-2"
        points="158.04 0 48.56 93.76 158.04 93.76 158.04 0"
      />
    </svg>
  </span>
</button>

<style lang="scss">

:global(body.home .contact-flex .text-left.ctaButton button) {

}


:global(section.dlaczego .onasbutton .text-container){
  text-align: left !important;
    width: 100% !important;
    
}

  :global(.oferta-card .oferta-cta:hover .svg-container) {
    display: none !important;
  }

  button {
    clip-path: polygon(0% 1%, 100% 0, 80% 100%, 0% 100%);

    position: relative;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border: none;
    // border-radius: 0px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0 2em;
    height: 45px; // Zwiększamy wysokość dla lepszej proporcji
    width: auto; // Szerokość dopasuje się do treści
    min-width: 260px; // Minimalna szerokość
    max-width: 90vw; // Maksymalna szerokość na mobilnych
    color: var(--color-text-primary);
    background-color: #eeeeee;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;

    .text-container {
      transition: transform 0.3s ease;
      width: 81%;
    }

    .svg-container {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 50px; // Szerokość kontenera SVG
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      // background-color: #7e8c00; // Tło dla SVG
    }

    .cta-svg {
      width: 1.5em;
      height: 1.5em;
      .cls-1 {
        fill: #c5d418;
      }
      .cls-2 {
        fill: #96a500;
      }
    }

    &:hover {
      background-color: #7e8c00;
      color: white;
      border-radius: 0px;

      .text-container {
        // width: 50%; // Ustawiamy szerokość na auto, aby tekst mógł się rozciągać
        transform: translateX(-25px); // Przesuwamy tekst w lewo
      }

      .svg-container {
        transform: translateX(0) scale(4);
        background-color: transparent !important;
      }
    }

    &.hero:hover, &.backButton:hover, &.backFromCategory:hover {
      .text-container {
        transform: none !important;
      }
      .svg-container {
        transform: translateX(100%) !important;
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(150, 165, 0, 0.5);
    }
  }

  // Wariant HERO
  button.hero {
    background-color: #96a500;
    color: white;
    position: absolute;
    bottom: 10%;
    left: 10%;
    transition: background-color 0.3s ease, color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;

    .svg-container {
      background-color: #7e8c00;
    }

    &:hover {
      background-color: #7e8c00;
      filter: brightness(1.05);
    }
  }
  button.oferta-cta {
    
    color: var(--color-text-primary);
   
    .svg-container {
      // background-color: #7e8c00;
    }
    .cta-svg {
    }
    .text-container {
      text-align: center;
      width: 100%;
      transition: transform 0.4s ease;
    }
    &:hover {
      background-color: rgba(150, 165, 0, 1);
      border-left: 4px solid #7e8c00;
      .text-container {
        transform: translateX(-6px); // Przesuwamy tekst w lewo
        color: var(--color-text-white);
      }
    }
  }
  button.bestseller {
    background-color: #7e8c00;
    clip-path: polygon(0% 1%, 100% 0, 83% 100%, 0% 100%);
    padding: 10px;
    color: white;
    position: relative;
    bottom: 10%;
    right: 10%;
    width: 315px;
    left: 0px;

    .svg-container {
      // background-color: #96a500;
    }
    .cta-svg {
      width: 1.3em;
      height: 1em;
      left: 126px;
      position: relative;
    }
    .text-container {
      text-align: left;
      transform: translateX(6px);
    }
    &:hover {
      background-color: rgba(150, 165, 0, 1);
      .cta-svg {
        width: 1.3em;
        height: 1em;
        left: 26px;
        position: relative;
      }
      .text-container {
  
        transform: translateX(18px); // Przesuwamy tekst w lewo
        text-align: left;
      }
    }
  }
</style>

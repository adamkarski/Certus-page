<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let text: string = "OK";
  export let type: string = "button";
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button class="cta-button" on:click={() => dispatch("click")} {type} {disabled}>
  <span class="maszyny_span">{text}</span>
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
</button>

<style lang="scss">
  :global(.oferta-card .cta-button .maszyny_span) {
    font-size: 15px;
  }


  :global(.oferta-card .cta-button:hover .maszyny_span) {
    font-size: 14px;
  }
:global(.oferta-card .cta-button .cta-svg) {
  margin-left: -43px;
  }

:global(.oferta-card){
  transform: scale(0.85);
}

  .cta-button {
    background-color: #eeeeee;
    border-radius: 12px;
    border-top-left-radius: 0px;
    padding-left: 40px;
    height: 25px;
    font-weight: 600;
    font-size: 1rem;
    width: 246px;
    text-align: left;
    display: flex;
    cursor: pointer;
    align-items: center;
    flex-direction: row;
    color: white;
    border: none;
    font-family: "Poppins";
    margin-left: 34px;
    transition: all ease-in-out 0.2s;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
    color: var(--color-text-primary);
    :hover {
      color: #eeeeee;
    }
  }
  .cta-button:hover span {
    margin-right: auto;
    margin-left: 1em;
    color: #eeeeee;
  }
  .cta-svg {
    width: 2em;
    height: 1.2em;
    display: inline-block;
    margin-left: -73px;
    position: absolute;
  }

  .cta-svg .cls-1 {
    fill: #96a500;
    transition: fill 0.2s;
  }
  .cta-svg .cls-2 {
    fill: #eeeeee;
    transition: fill 0.2s;
  }

  .cta-button:hover {
    /* background: #222; */
    background-color: #7e8c00;
  }
 
  .cta-button:hover .cta-svg .cls-2 {
    fill: #7e8c00;
  }

  :global(.oferta-card:hover) {
    .cta-button:hover {
      /* background: #222; */
      background-color: #7e8c00;
    }
   
    .cta-button:hover .cta-svg .cls-2 {
      fill: #7e8c00;
    }
    .cta-button:hover span {
      margin-right: auto;
      margin-left: 1em;
      color: #eeeeee;
    }
  }

  .cta-button:focus {
    outline: none;
    outline-offset: 0px;
  }
</style>

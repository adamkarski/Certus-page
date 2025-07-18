<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let text: string = "OK";
  const dispatch = createEventDispatcher();
</script>

<button class="cta-button-hero" on:click={() => dispatch('click')}>
  <span class="maszyny_span">{text}</span>
  <svg class="cta-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.04 93.76">
    <polyline class="cls-1" points="109.49 0 158.04 0 49.13 93.76 0 93.76"/>
    <polygon class="cls-2" points="158.04 0 48.56 93.76 158.04 93.76 158.04 0"/>
  </svg>
</button>

<style>
 .cta-button-hero { 
 background-color: #96a500; 
 border-radius: 12px; 
 border-top-left-radius: 0px; 
 padding-left: 40px; 
 height: 25px; 
 font-weight: 600; 
 font-size: 1.3rem; 
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
}

.cta-svg {
    width: 2em;
    height: 1.2em;
    display: inline-block;
    margin-left: -73px;
    position: absolute;
}

:global(.activeMachine .cta-button-hero) {
  position: absolute;
  left: 4em;
  bottom: 4em;
}
:global(.flex_table .cta-button-hero) {
  position: relative;
  top: 1.6em;
  left: -1em;
}   
.cta-svg .cls-1 {
  fill: #c5d418;
  transition: fill 0.2s;
}
.cta-svg .cls-2 {
  fill: #96a500;
  transition: fill 0.2s;
}

.cta-button-hero:hover {
  /* background: #222; */
  background-color: #7e8c00;
}
.cta-button-hero:hover .cta-svg .cls-1 {
 /*  fill: #95a500; */
}
.cta-button-hero:hover .cta-svg .cls-2 {
  fill: #7e8c00;
}





.cta-button-hero:focus {
  outline: none;
  outline-offset: 0px;
}



</style>
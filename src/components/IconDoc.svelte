<script lang="ts">
import { createEventDispatcher } from 'svelte';

let className = "icon-doc";
const dispatch = createEventDispatcher();

function handleClick() {
  dispatch('click');
}
</script>

<div class:className></div>

<button class="icon-doc" on:click={handleClick} tabindex="0">



            
    <svg class="svg-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.04 93.76">
        <polyline class="cls-1" points="109.49 0 158.04 0 49.13 93.76 0 93.76"/>
        <polygon class="cls-2" points="158.04 0 48.56 93.76 158.04 93.76 158.04 0"/>
    </svg>



        <svg class="iconDoc" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" d="M26.0469 2.9375H10C8.49219 2.9375 7.27344 4.15625 7.27344 5.66406V36.7891C7.27344 38.2969 8.49219 39.5156 10 39.5156H31.6953C33.2031 39.5156 34.4219 38.2969 34.4219 36.7891V11.3125L26.0391 2.92969L26.0469 2.9375Z" fill="black"/>
        <path d="M24.9922 1.40625H8.94531C7.4375 1.40625 6.21875 2.625 6.21875 4.13281V35.2578C6.21875 36.7656 7.4375 37.9844 8.94531 37.9844H30.6406C32.1484 37.9844 33.3672 36.7656 33.3672 35.2578V9.78906L24.9844 1.40625H24.9922Z" fill="white"/>
        <path d="M28.7969 17.3125H10.6406V18.6328H28.7969V17.3125Z" fill="#6B6B6B"/>
        <path d="M28.7969 20.5703H10.6406V21.8906H28.7969V20.5703Z" fill="#6B6B6B"/>
        <path d="M28.7969 24.2422H10.6406V25.5625H28.7969V24.2422Z" fill="#6B6B6B"/>
        <path d="M20.1094 27.6562H10.6406V28.9766H20.1094V27.6562Z" fill="#6B6B6B"/>
        <path d="M27.7188 9.78906H33.3672L24.9844 1.40625V7.05469C24.9844 8.5625 26.2031 9.78125 27.7109 9.78125L27.7188 9.78906Z" fill="#D9D9D9"/>
        </svg>




   </button>
   
   
   <style>
 /* }:focus{

outline: none;
} */


 .icon-doc{

    transition: all 0.2s ease-in-out;
    background-color: transparent;
    background: none;
    outline: none;
    border: none;
    display: flex;
    width: 3em;
    position: absolute;
    margin-bottom: 1em;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    z-index: 100;

 }:focus{
outline: none;
}:hover{

    cursor:pointer;
  /*   transform: scale(1.1); */
    

}
 

.iconDoc{

    background-color: none;
    background: none;
    margin-left: -6px;
 }

 .svg-lines{
 
    width: 35px;
    z-index: 10;
    
}

.svg-lines .cls-1 {
  fill: #c5d418;
  transition: fill 0.2s;
}
.svg-lines .cls-2 {
  fill: #96a500;
  transition: fill 0.2s;
}



/* .icon-doc:hover {
  /* background: #222; */
  /* background-color: #7e8c00; */
/* } */ 
.icon-doc:hover .svg-lines .cls-1 {
  /* fill: #95a500; */
}
.icon-doc:hover .svg-lines .cls-2 {
  fill: #7e8c00;
}



    </style>
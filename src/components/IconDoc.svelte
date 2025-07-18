<script lang="ts">
import { createEventDispatcher } from 'svelte';

let className = "icon-doc";
const dispatch = createEventDispatcher();

function handleClick() {
  dispatch('click');
}
</script>

<div class:className></div>

<div class="group-73" on:click={handleClick} role="button" tabindex="0">
    <div class="rectangle-101"></div>
    <div class="rectangle-100"></div>
    <div class="docs-1">
    <div class="vector"></div>
    <div class="vector_01"></div>
    <div class="vector_02"></div>
    <div class="vector_03"></div>
    <div class="vector_04"></div>
    <div class="vector_05"></div>
    <div class="vector_06"></div>
    </div>
    </div>
    <style>
    .rectangle-101 {
    width: 33.75px;
    height: 19.40px;
    left: 0px;
    top: 8.53px;
    position: absolute;
    background: #C5D417;
    
    }:focus{

      outline: none;
    }
    .rectangle-100 {
    width: 27.93px;
    height: 19.40px;
    left: 6.98px;
    top: 8.53px;
    position: absolute;
    background: #95A500;
    }:focus{

outline: none;
}
    .vector {
    width: 21.06px;
    height: 28.39px;
    left: 5.64px;
    top: 2.27px;
    position: absolute;
    opacity: 0.10;
    background: black;
    }:focus{

outline: none;
}
.vector_01 {
    width: 21.06px;
    height: 28.38px;
    left: 4.83px;
    top: 1.09px;
    position: absolute;
    background: white;
    }:focus{

outline: none;
}
    .vector_02 {
    width: 14.09px;
    height: 1.02px;
    left: 8.26px;
    top: 13.43px;
    position: absolute;
    background: #6B6B6B;
    }:focus{

outline: none;
}
    .vector_03 {
    width: 14.09px;
    height: 1.02px;
    left: 8.26px;
    top: 15.96px;
    position: absolute;
    background: #6B6B6B;
    }:focus{

outline: none;
}
    .vector_04 {
    width: 14.09px;
    height: 1.02px;
    left: 8.26px;
    top: 18.81px;
    position: absolute;
    background: #6B6B6B;
    }:focus{

outline: none;
}
    .vector_05 {
    width: 7.35px;
    height: 1.02px;
    left: 8.26px;
    top: 21.46px;
    position: absolute;
    background: #6B6B6B;
    }:focus{

outline: none;
}
    .vector_06 {
    width: 6.50px;
    height: 6.50px;
    left: 19.38px;
    top: 1.09px;
    position: absolute;
    background: #D9D9D9;
    }:focus{

outline: none;
}
    .docs-1 {
    width: 31.03px;
    height: 31.03px;
    left: 13.97px;
    top: 0px;
    position: absolute;
    overflow: hidden;
    }:focus{

outline: none;
}
    .group-73 {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    }:focus{

outline: none;
}
    .group-73:hover {
    transform: scale(1.004);
    }:focus{

outline: none;
}
    .group-73:active {
    /* transform: scale(0.95); */
    }:focus{

outline: none;
}
    </style>
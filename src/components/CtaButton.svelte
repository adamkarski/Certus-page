<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { typoFixAction } from "$lib/utils/typography";

  export let text: string = "OK";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let variant: "primary" | "secondary" = "primary";
  export let href: string = "";
  export let classs: string = "";
  export let hero: boolean = false; // wsteczna kompatybilność

  const dispatch = createEventDispatcher();
</script>

{#if href}
  <a
    {href}
    class="certus-btn certus-btn--{variant} {classs}"
    class:hero
    class:disabled
    on:click={(e) => {
      if (disabled) {
        e.preventDefault();
      } else {
        dispatch("click", e);
      }
    }}
  >
    <span class="btn-text" use:typoFixAction>{text}</span>
    <span class="btn-pattern" aria-hidden="true"></span>
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="certus-btn certus-btn--{variant} {classs}"
    class:hero
    on:click={(e) => dispatch("click", e)}
  >
    <span class="btn-text" use:typoFixAction>{text}</span>
    <span class="btn-pattern" aria-hidden="true"></span>
  </button>
{/if}

<style lang="scss">
  .certus-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    padding: 14px 28px;
    border-radius: 30px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    box-sizing: border-box;
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease,
      filter 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.2s ease;

    .btn-text {
      position: relative;
      z-index: 2;
      display: inline-block;
      pointer-events: none;
    }

    /* Subtelny poziomy biały wzorek w tle na spodzie przycisku */
    .btn-pattern {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 18px;
      background-image: url(/assets/images/pattern-video-3.png);
      background-repeat: repeat-x;
      background-position: center bottom;
      background-size: auto 18px;
      opacity: 0.35;
      mix-blend-mode: overlay;
      pointer-events: none;
      z-index: 1;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    &:hover .btn-pattern {
      opacity: 0.6;
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(126, 140, 0, 0.45);
    }

    &:disabled,
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  /* Wariant Primary (jak Poznaj HMP-G1) */
  .certus-btn--primary {
    background-color: #7e8c00;
    color: #ffffff !important;
    border: none;

    &:hover {
      background-color: #96a500;
      color: #ffffff !important;
      filter: brightness(1.08);
      box-shadow: 0 6px 18px rgba(126, 140, 0, 0.4);
    }
  }

  /* Wariant Secondary (jak Zapytaj o ofertę) */
  .certus-btn--secondary {
    background-color: transparent;
    color: #ffffff !important;
    border: 1.5px solid #ffffff;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      border-color: #ffffff;
      color: #ffffff !important;
    }
  }

  /* Specyficzne klasy pomocnicze dla istniejących widoków */
  :global(.oferta-card .certus-btn) {
    min-width: 220px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }

  :global(.contact-flex .certus-btn) {
    width: auto;
    min-width: 200px;
  }
</style>

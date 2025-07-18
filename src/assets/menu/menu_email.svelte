<!-- IconLink2.svelte -->
<script lang="ts">
  export let href: string = '#';
  export let text: string = 'Wyślij zapytanie';
</script>

<a {href} class="icon-link">
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140.04 140.04"
  >
    <defs>
      <style>
        .cls-1 {
          fill: none;
        }

        /* Domyślnie wszystko szare */
        .cls-2,
        .cls-3 {
          fill: #c6c6c6;
          transition: fill 0.2s ease;
        }

        /* Po hoverze – kolorowe */
        .icon-link:hover .cls-2 {
          fill: #96a500;
        }
        .icon-link:hover .cls-3 {
          fill: #c5d418;
        }
      </style>
    </defs>

    <g>
      <polygon class="cls-2" points="6.24 113.55 6.24 115.53 14.77 121.44 125.19 121.56 133.72 115.65 133.72 113.69 6.24 113.55"/>
      <path class="cls-3" d="M128.48,15.58l-116.9-.17L2.55,23.57v2.72l13.69,9.07h0l46.82,36.7h16.68l45.88-36,11.89-9.57v-2.74l-9.04-8.17ZM115.75,26.49l-40.46,32.01h-8.75L26.74,26.49l-2.02-.17,99.79.15h0s-8.76.02-8.76.02Z"/>
      <polygon class="cls-2" points="133.72 43.15 125.6 50.64 125.44 113.65 133.72 113.65 133.72 43.15"/>
      <polygon class="cls-2" points="6.24 113.55 15.14 113.55 14.97 50.62 6.24 42.92 6.24 113.55"/>
    </g>
    <rect class="cls-1" width="140.04" height="140.04"/>
  </svg>

  <span>{text}</span>
</a>

<style>
  .icon-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s;
  }

  .icon-link:hover {
    color: #96a500;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.2s;
  }

  .icon-link:hover svg {
    transform: scale(1.1);
  }
</style>
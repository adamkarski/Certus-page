<!-- IconLink.svelte -->
<script lang="ts">
  export let href: string = '#';
  export let text: string = 'xxx';
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
        .cls-1 { fill: none; }

        /* domyślnie szare */
        .cls-2, .cls-3 {
          fill: #c6c6c6;
          transition: fill .2s ease;
        }

        /* po hoverze – kolorowe */
        .icon-link:hover .cls-2 {
          fill: #c5d418;
        }
        .icon-link:hover .cls-3{
          fill: #96a500;
        }
      </style>
    </defs>

    <g>
      <g>
        <polygon class="cls-3"
          points="55.44 7.69 15.18 7.69 15.18 10.88 15.18 10.88 15.18 39.33 24.22 39.33 24.22 16.73 55.44 16.73 55.44 7.69"/>
        <polygon class="cls-3"
          points="15.18 86.23 15.18 98.51 55.44 61.42 55.44 49.14 15.18 86.23"/>
        <polygon class="cls-3"
          points="15.18 58.84 15.18 71.13 55.44 34.04 55.44 21.75 15.18 58.84"/>
        <polygon class="cls-3"
          points="46.4 82.07 46.4 107.51 34.33 119.58 20.27 105.52 15.18 110.21 15.18 113.21 34.31 132.35 34.33 132.33 34.34 132.35 55.37 111.31 55.44 111.31 55.44 111.25 55.44 104.14 55.44 73.75 46.4 82.07"/>
      </g>
      <g>
        <polygon class="cls-2"
          points="124.86 59.19 119.9 59.19 119.9 20.39 119.9 17.13 94.38 17.13 94.38 20.39 116.65 20.39 116.65 59.19 111.38 59.19 111.38 76.38 116.65 76.38 116.65 119.65 82.57 119.65 82.57 122.9 119.9 122.9 119.9 119.65 119.9 76.38 124.86 76.38 124.86 59.19"/>
        <rect class="cls-2" x="111.38" y="17.13" width="13.48" height="105.77"/>
      </g>
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
    transition: color .2s;
  }

  .icon-link:hover {
    color: #96a500;
  }
  .icon-link:focus { border: none; outline: none; }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform .2s;
  }

  .icon-link:hover svg {
    transform: scale(1.1);
  }
</style>
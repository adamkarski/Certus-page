<script lang="ts">
  export let href: string = '#';
  export let text: string = 'Do pobrania';
</script>

<a {href} target="_blank" rel="noopener noreferrer nofollow" class="icon-link" title={text}>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140.04 140.04"
  >
    <defs>
      <style>
        .cls-1 { fill: none; }

        /* default grey */
        .cls-2, .cls-3 {
          fill: #c6c6c6;
          transition: fill .2s ease;
        }

        /* hover colours */
        .icon-link:hover .cls-2{ fill: #96a500; }
        .icon-link:hover .cls-3{ fill: #c5d418; }
        .icon-link:focus { border: none; outline: none; }
      </style>
    </defs>

    <g>
      <polygon class="cls-3" points="100.41 53.43 69.52 81.88 69.52 96.7 100.41 68.25 100.41 53.43"/>
      <polygon class="cls-3" points="40.48 53.47 40.48 68.29 69.52 96.7 69.52 81.88 40.48 53.47"/>
      <polygon class="cls-3" points="74.87 81.64 75.07 10.41 64.17 10.41 63.97 81.64 74.87 81.64"/>
      <polygon class="cls-2" points="131.02 118.64 131.22 83.4 120.32 83.4 120.12 118.64 131.02 118.64"/>
      <polygon class="cls-2" points="19.72 118.64 19.92 83.4 9.02 83.4 8.82 118.64 19.72 118.64"/>
      <polygon class="cls-2" points="8.99 118.54 8.99 121.28 17.16 129.45 122.88 129.63 131.04 121.46 131.04 118.74 8.99 118.54"/>
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

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform .2s;
  }

  .icon-link:hover svg {
    transform: scale(1.1);
  }
</style>
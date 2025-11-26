<script lang="ts">
  // import OfertaGrid from "./OfertaGrid.svelte";
  import { fade } from "svelte/transition";
  import Section_Onas_Images from "./sections/Section_Onas_Images.svelte";
  import CtaButton from "../components/CtaButton.svelte";
  import { typoFixAction } from "$lib/utils/typography";
  import CircleImage from "../components/circleImage.svelte";
</script>

<Section_Onas_Images />

<section class="onas section">
  <p
    class="description no-sel"
    use:typoFixAction
    in:fade={{ duration: 600, delay: 900 }}
  >
    
  CERTUS to polska marka zbudowana na solidnych fundamentach – wiedzy,
doświadczeniu i pasji do inżynierii. Jesteśmy producentem maszyn CNC, który od
ponad dekady dostarcza rozwiązania skrojone na miarę – niezawodne, długowieczne
i technologicznie zaawansowane.
<br/><br/>
Nasza historia zaczęła się dużo wcześniej. Właściciel CERTUS od 2000 roku związany jest z rynkiem CNC i był jednym z liderów kultowego Forum CNC – społeczności, która kształtowała oblicze branży w Polsce.
  </p>
</section>

<!-- Co nas wyróżnia Section -->
<section class="wyroznia section no-sel">
  <h2 class="section-title">Co nas wyróżnia?</h2>
  <div class="strengths-grid no-sel">
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
            
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740.24 565.6" width="1.4em"
height="1.2em" fill="currentColor">
  <g id="yXk5h1">
    <g>
      <path d="M429.83,59.37c9.61,3.43,19.25,6.87,28.7,10.75,4.38,1.8,18.16,9.51,21.51,9.51,2.37,0,4.5-1.45,6.42-2.62,10.15-6.18,20.76-18.27,31.1-24.83,7.3-4.63,12.56-5.1,19.85,0,18.72,13.11,37.7,41.67,56.52,56.33,3.86,4.27,4.71,9.81,1.87,14.9-7.97,11.62-19.99,22.72-27.77,34.15-1.56,2.29-2.71,3.34-2.71,6.4,0,3.36,10.02,19.78,12.28,24.79s4.71,11.17,6.57,16.4c1.99,5.58,8.75,33.15,10.18,34.76,1.15,1.3,1.95,1.27,3.51,1.48,4.09.54,39.72.52,41.51-.53,4.44-2.62.41-28.65,2.19-34.75,1.08-3.69,8.01-5.82,11.55-5.05s12.77,9.65,16.23,12.82c23.21,21.3,45.38,43.91,68.44,65.38,8.54,12.11-7.05,23.21-15,31.02-14.9,14.66-30.74,28.58-46,42.88-8.44,7.91-23.61,30.86-34.22,15.3-1.58-12.14,1.39-26.99-.16-38.78-.43-3.31-1.23-4.06-4.49-4.49-7.91-1.04-28.79-.75-37.05,0-2.22.2-4.34.2-5.92,2.07s-7.04,24.3-8.77,29.18c-5.07,14.26-12.17,28.89-20.17,41.73l-.02,6.94,28.29,34.61c4.07,7.61,2.23,12.62-2.83,18.85-15.47,19.07-39.89,35.64-56.02,54.83-7.54,5.03-12.22,2.5-18.82-2.02-10.67-7.3-20.92-17.73-31.47-25.45-7.62-3.32-18.87,4.99-26.29,7.82s-18.56,5.29-25.47,8.49c-1.58.73-2.68,1.93-3.78,3.21l-11.92,49.99c-1.89,5.61-6.62,8.93-12.48,9.49-22.65,2.18-48.86-1.68-71.9-.11-4.2-1-8.26-3.94-10.06-7.91-5.15-15.41-6.21-33.95-10.72-49.2-.65-2.2-1.92-3.9-3.82-5.17-8.56-2.4-16.91-5.55-25.17-8.79-4.62-1.82-19.6-9.95-23.12-9.74-1.62.1-4.11,1.6-5.51,2.55-10.12,6.87-23.27,22.19-33.69,27.23-8.01,3.88-12.77,1.88-19.32-3.32-18.9-14.99-36.11-39.07-54.92-54.94-3.28-4.46-4.12-8.48-1.76-13.74,4.29-9.57,21.57-24.87,28.16-34.75,1.15-1.72,2.7-4.25,2.56-6.36-.16-2.39-10.24-17.93-12.16-21.86-8.3-16.98-12.96-35.23-18.78-53.12l-47-.03c-4.14,2.77-.33,32.94-2.4,39.54-1.47,4.7-7.31,5.87-11.6,4.49-2.02-.65-19.32-17.77-22.57-20.87-19.64-18.76-38.31-38.61-57.8-57.54-4.97-5.51-4.78-13.24.5-18.52l76.43-74.37c1.16-1.09,2.48-1.69,4.06-1.94,22.68-3.57,6.95,37.57,13.82,42.98,3.9,3.07,43.89-.63,51.8,1.13,2.63.54,27.11,18.32,30.61,21.32,3.71,3.18,6.29,5.85,6.99,10.99,1.13,8.31.11,18.88,1.1,27.86,19.6,178.67,258.92,223.96,343.09,65.44,33.99-64.02,25.14-148.51-22.52-203.2-88.47-101.53-257.28-76.92-308.08,49.42-4.23,10.51-6.26,22.17-11.96,31.72-1.71.26-25.48-16.42-28.82-18.93-3.72-2.8-8.1-4.67-7.5-10.03,1.61-14.37,14.34-35.92,21.03-48.96.68-1.31.91-2.67.76-4.13-.48-4.74-23.44-29.69-27.8-36.2-5.26-7.85-4.18-13.34,1.32-20.32,10.05-12.74,38.18-40.24,50.92-50.94,7.35-6.17,12.24-9.81,21.8-4.77,11.18,5.89,22.79,20.51,33.7,27.21,8.05,4.94,18.66-3.61,26.96-6.91,9.2-3.65,18.46-7.01,27.88-10.07,1.93-1.14,2.36-3.05,3-4.99,4.27-13.05,5.2-34.67,10.52-46.4,1.91-4.2,5.84-6.81,10.24-7.74,22.72,1.1,48.32-2.29,70.71-.28,7.08.63,11.82,3,14.17,9.8,2.53,7.34,9.22,46.66,11.5,48.92Z"/>
      <path d="M533.22,281.76c0,90.02-73,163-163.04,163s-163.04-72.98-163.04-163,73-163,163.04-163,163.04,72.98,163.04,163ZM360.68,208.39v-68.9c-25.38,10.25-39.67,40.8-47.96,65.39l47.96,3.51ZM379.66,140.49v67.9c15.41-.47,31.2-.86,46.48-2.99,1.47-.2,1.61.56,1.5-1.52-.13-2.48-3.04-9.16-4.17-11.82-6.04-14.13-17.16-33.01-28.81-43.09-1.85-1.6-13.29-10.26-14.99-8.48ZM322.73,146.49c-17.24,5.82-34.26,15.48-47.96,27.44-2.17,1.89-16.44,15.49-14.97,17.48l34.95,10c5.92-19.78,14.45-39.16,27.98-54.91ZM467.2,175.78c-14.18-12.33-30.14-23.42-48.59-28.3l13.5,19.95,14.41,33.54,35.01-9.57-14.33-15.62ZM512.5,273.29c-.61-23.06-7.53-47.48-20.43-66.66l-40.5,12.75c4.97,17.48,6.58,35.75,7,53.91h53.93ZM281.78,273.29c.35-17.99,2.93-35.8,6.91-53.28l-40.39-12.71-1.36.21c-11.07,20.51-18.26,42.35-20.1,65.78h54.93ZM360.68,227.36l-52.99-4.59c-4.73,16.41-5.32,33.63-6.94,50.52h59.93v-45.93ZM439.59,273.29c-.75-16.99-2.35-34.11-6.94-50.52l-52.98,4.59v45.93h59.93ZM281.78,292.26h-53.93c1.06,18.88,6.09,38.84,14.8,55.6,1.17,2.25,4.69,9.17,6.67,9.35l39.45-12.03c-3.64-17.43-6.64-35.02-6.99-52.92ZM360.68,292.26h-59.93c1.4,16.94,2.6,34,6.95,50.5l52.98-5.57v-44.93ZM439.59,292.26h-59.93v44.93l52.99,4.58,6.94-49.52ZM512.5,292.26h-54.93c.08.87.85,1.51.82,2.46-.57,16.99-3.92,33.76-6.78,50.43l40.85,13c10.86-20.38,19.53-42.4,20.04-65.89ZM360.68,356.17l-47.96,4.52c6.99,24.91,23.02,54.23,47.96,64.38v-68.9ZM379.66,356.17v67.9c25.49-9.48,39.34-39.63,48.95-63.4l-48.95-4.5ZM480.53,372.15l-33.94-8c-5.83,19.02-15.44,36.8-26.98,52.92,20.22-6.09,40.47-20.16,54.45-35.92,1.02-1.16,7.16-8.33,6.47-9ZM294.67,365.26c-1.62-1.39-28.9,6.04-32.62,7.67-.89.39-1.79-.08-1.15,1.61,1.16,3.08,12.29,13.9,15.36,16.61,13.24,11.69,29.61,20.7,46.47,25.93-14.65-13.61-22.62-32.92-28.06-51.82Z"/>
    </g>
  </g>
</svg>
      </div>
      <h3 use:typoFixAction in:fade={{ duration: 600, delay: 900 }}>
        Wszechstronność i elastyczność
      </h3>
      <p use:typoFixAction>
        Od małych warsztatów po złożone linie produkcyjne – tworzymy maszyny CNC
        dostosowane do potrzeb. Realizujemy również nietypowe projekty dla
        różnorodnych branż.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM256 448a192 192 0 1 1 0-384 192 192 0 1 1 0 384zM256 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
          /></svg
        >
      </div>
      <h3 use:typoFixAction in:fade={{ duration: 600, delay: 900 }}>
        Indywidualne podejście
      </h3>
      <p use:typoFixAction>
        Nie sprzedajemy gotowców – każda maszyna powstaje w dialogu z Klientem.
        Dopasowujemy parametry, konfiguracje i rozwiązania technologiczne.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          ><path
            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8z"
          /></svg
        >
      </div>
      <h3 use:typoFixAction in:fade={{ duration: 600, delay: 900 }}>
        Solidność i niezawodność
      </h3>
      <p use:typoFixAction>
        Nasze maszyny tworzone są z myślą o wieloletniej eksploatacji. CERTUS to
        jakość bez kompromisów – nasze urządzenia pracują 24/7.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
 
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 587.17 653.36"  width="1.6em"
height="1.2em"
fill="currentColor">
  <g id="dGb8vN">
    <g>
      <path d="M587.17,510.28c0,79.02-64.05,143.08-143.07,143.08s-143.07-64.06-143.07-143.08,64.05-143.08,143.07-143.08,143.07,64.06,143.07,143.08ZM524.88,443.05c-4.52-3.45-9.15-5.29-14.1-1.4l-93,92.8-46-44.66c-7.01-2.15-17.74,9.49-21.78,14.75-4.72,6.14-4.72,9.89,0,16.02,19.19,16.46,36.18,39.52,55.43,55.41,5.5,4.54,10.67,8.85,17.99,4.99l112.25-111.42c2.55-3.47,3.43-7.79,2.11-11.97-.36-1.15-11.33-13.32-12.91-14.52Z"/>
      <path d="M32.5,558.49c-15.9-2.26-30.89-19.79-32.44-35.46l-.05-348.55c.25-6.83,2.47-13.26,5.87-19.1C51.19,106.17,100.5,60.22,147.3,12.22c22.32-18.65,44.78-14.73,65.44,3.51,46.12,40.72,87.53,91.67,133.3,133.32,12.49,15.24,9.34,29.47,9.43,47.4.3,62.27-.13,124.53.06,186.8-.36,1.86-17.46,14.73-20.63,17.82-41.06,39.92-56.89,102.72-38.29,157.43H32.5ZM213.45,124.58c0-19.92-16.14-36.07-36.06-36.07s-36.06,16.15-36.06,36.07,16.14,36.07,36.06,36.07,36.06-16.15,36.06-36.07ZM192.76,435.67c35.69-3.56,59.85-28.59,56.9-65.4-2.42-30.22-25.51-40.8-51.14-48.71-14.64-4.52-48.33-8.2-51.45-26.44-5.64-32.94,41.5-35.27,58.21-18.27,3.32,3.38,8.26,14.15,12.18,14.86,2.06.37,28.9-6.51,29.77-7.79,1.97-2.91-2.7-12.54-4.38-15.69-9.83-18.48-28.44-28.67-48.66-32.22-2.03-6.69,2.29-22.43-2.91-27.05-3.47-3.09-23.58-3.05-27,0-4.97,4.42-1.3,20.3-2.58,26.89-26.63,3.25-49.52,21.78-51.8,49.55-3.09,37.52,15.42,52.68,48.39,63.42,20.31,6.61,61.29,8.7,53.76,39.74-6.09,25.09-51.74,22.82-65.22,4.68-2.14-2.88-6.01-13.87-7.66-14.38l-30.04,6.63c-4.77,2.22-1.13,10.47.27,14.22,7.87,21.09,29.67,33.77,51.35,36.01,1.33,7.73-3.63,25.55,5.3,29.15,3.32,1.34,19.21,1.29,22.45,0,7.94-3.17,5.43-22.35,4.25-29.19Z"/>
    </g>
  </g>
</svg>
      </div>
      <h3 use:typoFixAction in:fade={{ duration: 600, delay: 900 }}>
        Najlepszy stosunek jakości do ceny
      </h3 >
      <p use:typoFixAction>
        Umożliwiamy inwestycje w profesjonalne maszyny bez przepłacania.
        Wszystko projektujemy i montujemy w Polsce.
      </p>
    </div>
    <div class="strength-card fade-in" in:fade>
      <div class="strength-icon">
     
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 681.47 553.01"  width="1.6em"
        height="1.2em"
        fill="currentColor">
          <g id="_7vYKQz" data-name="7vYKQz">
            <g>
              <path d="M299.72,234c-23.12,18.67-57.88,32.08-52.67,68.13.99,6.88,7.08,16.99,12.2,21.75,16.57,15.43,38.22,11.92,57.72,4.74,12.64-4.66,33.74-19.13,46.72-15.29,5.09,1.51,12.03,10.84,16.47,14.49,25.8,21.27,54.71,41.93,81.47,62.33,11.02,8.4,43.01,28.39,47.58,39.3,9.21,21.95-15.37,39.04-35.44,27.45s-40.15-33.13-60.27-45.58c-1.13-.7-3.72-2.63-4.92-2.11-4.94,2.1-3.51,13.48,0,17.01l53.97,42.9c15.46,17.09-4.71,40.63-26.9,25.89-15.94-10.59-31.91-28.15-48.12-37.76-10.42-6.18-12.51,3.59-7.33,11.32,6.76,10.08,30.29,22.5,39.38,32.53,10.84,11.97-.01,30.78-16.05,27.02-7.6-1.78-25.43-20.91-33.56-26.35-4.85-3.25-7.66-2.78-9.11,3.53-3.35,14.53,14.71,13.15,17.32,26.19,1.67,8.35-2.76,16.25-10.54,19.53-13.59,5.73-27.15-1.65-35.88-12.12,6.03-7.76,13.51-13.36,14.8-23.94,2.81-23.11-13.85-39.29-35.89-41.78-1.62-11.95-8.23-22.31-18.99-27.94-7.78-4.07-13.46-3.45-21.95-4.02-4.54-19.42-20.66-35.97-41.96-31.96-3.28-9.71-5.28-17.57-13.45-24.47-27.81-23.49-51.86,7.76-71.94,23.95-3.29.55-5.1-.89-7.74-2.21-4.88-2.43-17.35-10.08-21.61-13.35s-3.71-6.43-2.28-11.14l60.62-132.09c3.88-3.64,9.34-.27,14.02,0,17.8,1.02,41.81-5.9,60.08-8.8,18-2.86,36.1-5.73,54.27-7.15Z"/>
              <path d="M368.39,221.27c18.86-2.6,44.74,12.23,62.64,18.73,13.03,4.73,45.26,16.39,57.69,14.7,6.37-.87,12.84-5.76,17.48-6.57,5.24-.92,8.46,9.06,10.42,13.14,17.33,36.19,38.69,79.85,52.93,116.82,1.68,4.37,4.63,7.95.84,12.18l-42.26,22.67-4.74.36c-45.51-34.16-89.03-71.15-134.9-104.83-14.17-10.41-21.57-17.95-40.83-13.07s-68.86,39.98-80.39,7.45c-7.83-22.1,13.37-32.62,28.53-42.33s57.94-37.25,72.58-39.27Z"/>
              <path d="M596.08,188.3c6.59-1.27,10.68.97,13.78,6.72l69.56,154.12c2.68,6.05,3.63,14.62-2.84,18.48l-71.76,33.19c-5.11-.01-8.58-3.01-10.64-7.39l-72.6-163.92c.63-5.61,3.28-7.52,7.81-10.03,20.67-11.41,45.38-20.5,66.69-31.17Z"/>
              <path d="M205.48,400.1c6.57,6.57,6.85,16.54,2.75,24.51-3.65,7.09-34.95,34.68-42.32,36.58-17.01,4.37-30.8-11.24-23.2-27.19,2.84-5.95,33.63-34.48,39.76-37.13,7.72-3.34,16.87-2.89,23,3.24Z"/>
              <path d="M229.54,427.94c17.42-3.01,27.94,12.9,20.42,28.4-2.74,5.65-30.84,32.43-36.8,36.1-17.7,10.89-38.05-6.41-28.14-25.14,3.12-5.9,33.39-34.44,39.47-37.42,1.59-.78,3.29-1.63,5.05-1.94Z"/>
              <g>
                <path d="M368.98,156.76c-12.79-13.2-25.02-27.69-38.78-39.6l-125.32,90.45c-2.83,1.2-5.4-.19-8.02-1.1-10.03-3.47-21.11-10.6-31.27-14.4-3.17-3.42-1.75-8.33,1.8-11.03l159.6-117.03c6.65-3.18,13.28-2.34,18.71,2.66,19.17,17.65,37.46,40.16,55.9,58.94,8.95,9.12,18.91,17.66,27.99,26.94,2.08,2.12,8.71,11.6,11.29,11.37l150.19-120.98c.52-.57.98-1.44.92-2.19-.27-3.45-16.82-19.11-19.37-24.2-3.02-6.02,1.09-10.58,7.23-11.28,21.63-2.46,49.13-4.34,70.89-5,7.64-.23,21.71-2.39,20.3,9.24-6.79,25.28-10.76,51.34-17.25,76.68-1.44,5.62-2.27,12.7-10.02,12.49s-15.96-17.55-22.44-22.02l-1.69.27-174.21,138.46c-9.55,3.61-15.85,1.63-23.34-4.42-16.7-13.5-37.55-38.17-53.11-54.24Z"/>
                <path d="M3.43,366.45c-1.79-1.7-3.56-5.62-3.42-8.14,22.25-56.72,48.88-111.99,74.47-167.28,4.13-3.27,8.9-3.99,13.78-1.75l69.67,34.19c3.13,3.55,2.24,8.52.45,12.49l-70.51,157.16c-2.63,5.51-7.57,9.29-13.9,7.13L3.43,366.45Z"/>
                <path d="M228.15,522.21c-6.05-5.34-7.99-15.46-3.77-22.54,2.78-4.67,29.45-29.02,34.88-33.02,17.37-12.79,42.18,2.77,31.29,20.3-4.33,6.97-33.78,35.42-40.8,38.1s-15.52,2.54-21.61-2.83Z"/>
                <path d="M305.45,494.83c14.51-2.49,29.63,8.54,22.63,23.62-1.88,4.04-26.33,27.04-30.65,29.27-20.51,10.6-39.2-10.22-23.07-28.06,5.85-6.46,23.16-23.47,31.09-24.83Z"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <h3 use:typoFixAction in:fade={{ duration: 600, delay: 900 }}>
        Serwis i rozwój
      </h3>
      <p use:typoFixAction>
        Oferujemy serwis gwarancyjny i pogwarancyjny oraz modernizacje urządzeń
        innych producentów. Twoja maszyna może rozwijać się razem z Tobą.
      </p>
    </div>
  </div>
</section>


<!-- Produkty Section
<section class="produkty section no-sel">
  <h2 class="section-title">Nasze Produkty</h2>
  <OfertaGrid />
</section> -->

<!-- Branże Section -->
<section class="branze section no-sel">
  <h2 class="section-title">
    Te i wiele innych branży w których pracują nasi klienci
  </h2>
  <div class="industries-grid">
    <div class="industry-card fade-in" in:fade>
      <CircleImage
        src="/assets/images/przemysł-tekstylny.jpg"
        alt="Przemysł tekstylny"
      />

      <h4>Przemysł tekstylny</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <CircleImage
        src="/assets/images/obrobka-kamienia.jpg"
        alt="Przemysł tekstylny"
      />

      <h4>Obróbka kamienia</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <CircleImage
        src="/assets/images/jubilerstwo.jpg"
        alt="Przemysł jubilerski"
      />

      <h4>Jubilerstwo</h4>
    </div>
    <div class="industry-card fade-in" in:fade>
      <CircleImage
        src="/assets/images/produkcja-okularow.jpg"
        alt="Produkcja okularów"
      />

      <h4>Produkcja okularów</h4>
    </div>
  </div>
</section>

<!-- Dlaczego CERTUS Section -->
<section class="dlaczego section no-sel">
  <div class="dlaczego-content">
    <h2 class="section-title">Dlaczego CERTUS?</h2>
    <p class="dlaczego-text">
      Wybierając CERTUS, inwestujesz w polską jakość, indywidualne podejście i
      wieloletnie doświadczenie. Nasze maszyny CNC to gwarancja precyzji,
      niezawodności i optymalnego stosunku jakości do ceny.
    </p>
    <CtaButton
      on:click={() => (window.location.href = "/kontakt")}
      classs="btn btn--primary btn--lg onasbutton"
      text="Skontaktuj się z nami"
    ></CtaButton>
  </div>
</section>

<style lang="scss">
  section.branze {
    .section-title {
      padding-bottom: 5vh;
    }

    padding: 0 5rem; /* Reduced default padding for wider screens */
    padding-top: 10vh;
    padding-bottom: 10vh;
    @media (max-width: 768px) {
      padding: 0 1rem; /* Specific padding for mobile */
    }
    .industries-grid {
      h4 {
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--color-text-secondary);
        text-align: center;
      }
    }
  }

  section.onas {
    padding: 0 4rem;
    padding-top: 3rem;

    .description {
     

      color: var(--color-text-secondary);
    }
  }
  section.historia {
    padding: 0 0rem;
    padding-top: 0rem;
  
  }
  section.branze {
    padding: 0 0rem;
    padding-top: 0rem;
  
  }
  .onas_page {
    display: none;
    min-width: 100vw;
    margin: 0 auto;
    min-height: 174px;
  }

  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 147px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
    filter: contrast(8.5);
  }

  .pattern-overlay {
    position: relative;
    top: 148px;
    overflow: hidden;
    left: 0;
    width: 100%;
    height: 20px;
    z-index: 2;
    pointer-events: none;
    opacity: 0.3;

    .pattern.two {
      transform: scale(1.2) skew(-15deg, 0deg);
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100%;
      height: 63px;
      z-index: 11;
      left: 0;
      bottom: -10px;
      pointer-events: auto;
    }
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .section {
    padding: 60px 0;
    color: var(--color-text-secondary);
    .description{

      padding: 0  1rem;
    color: var(--color-text-secondary);
    text-align:left;
    }
  }

  .section-title {
    text-align: center;
    margin-bottom: 40px;
    font-weight: bold;
  }

  /* Historia Section */
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    &::after {
      content: "";
      position: absolute;
      width: 6px;
      background-color: var(--color-border);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }
  }

  .timeline-item {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    width: 50%;
    &.fade-in {
    }
    &:nth-child(odd) {
      left: 0;
    }
    &:nth-child(even) {
      left: 50%;
    }
    &::after {
      content: "";
      position: absolute;
      width: 25px;
      height: 25px;
      right: -17px;
      background-color: white;
      border: 4px solid var(--color-primary);
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    &:nth-child(even)::after {
      left: -16px;
    }
  }

  .timeline-icon {
    position: absolute;
    top: 15px;
    color: var(--color-primary);
    z-index: 2;
  }

  .timeline-content {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border-radius: 6px;
    padding-top: 7px;
  }

  /* Co nas wyróżnia Section */
  .strengths-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    padding: 0 4rem; /* Reduced default padding for wider screens */
    h3 {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;

      font-weight: 600;
    }
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .strength-card {
    background: var(--color-bg-secondary);
    padding: 30px;
    text-align: center;
    border-radius: 8px;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &:hover {
      transform: translateY(-10px);
    }
    h3 {
      min-height: 80px;
    }
  }

  .strength-icon {
       color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    svg{

      transform: scale(3);
      margin-bottom: 40px;
    }
  }

  /* Branże Section */
  .industries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    text-align: center;
  }

  .industry-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 100%; /* Make the image responsive */
      object-fit: contain; /* Maintain aspect ratio and fit within container */
      max-height: 150px; /* Set a maximum height if needed */
      margin-bottom: 10px; /* Add some space between image and title */
    }
    h4 {
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 600;
      min-height: 150px;;
    }
  }
  /* Dlaczego CERTUS Section */
  .dlaczego {
    background: var(--color-bg-secondary);
    text-align: center;
  }

  .dlaczego-text {
    max-width: 800px;
    margin: 0 auto 30px;
  }

  @media (max-width: 768px) {
  

  
    .timeline::after {
      left: 20px;
    }

    .timeline-item {
      width: 100%;
      padding-left: 60px;
      left: 0 !important;
    }

    .timeline-item::after {
      left: 13px;
    }

    .timeline-item:nth-child(even)::after {
      left: 13px;
    }

    .timeline-item:nth-child(even) {
      left: 0; /* Ensure it's not pushed to 50% on mobile */
    }
  }


  @media (max-width: 768px) {

    section.onas{

      padding: 1rem 1rem;


    }


  }

</style>

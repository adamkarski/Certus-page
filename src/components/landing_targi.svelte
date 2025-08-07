<script>
import { fade } from 'svelte/transition';
import { landingVisible } from '$lib/landingStore';
import { onMount } from 'svelte';

let leftGradient = '';
let rightGradient = '';
let leftGradients = []; // Tablica gradientów dla lewej strony
let rightGradients = []; // Tablica gradientów dla prawej strony
let machineImg;
let isMobile = false;
let imageSource = '/assets/landing_targi2025/MACHINE.jpg';

function handleClick() {
  landingVisible.hide();
}

function checkMobile() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const aspectRatio = screenWidth / screenHeight;
  
  // Sprawdź czy to urządzenie mobilne (szerokość < 768px lub aspect ratio < 1)
  const wasMobile = isMobile;
  isMobile = screenWidth < 768 || aspectRatio < 1;
  
  // Zaktualizuj źródło obrazka jeśli się zmieniło
  const newImageSource = isMobile 
    ? '/assets/landing_targi2025/MACHINE-mobile.jpg'
    : '/assets/landing_targi2025/MACHINE.jpg';
    
  if (newImageSource !== imageSource) {
    imageSource = newImageSource;
    // Przeładuj analizę kolorów po zmianie obrazka
    if (machineImg && machineImg.complete) {
      setTimeout(() => analyzeImageColors(machineImg), 100);
    }
  }
}

function analyzeImageColors(img) {
  // Na mobile nie analizujemy kolorów - nie ma blur efektów
  if (isMobile) {
    leftGradients = [];
    rightGradients = [];
    leftGradient = '';
    rightGradient = '';
    return;
  }
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Oblicz gdzie będą widoczne krawędzie obrazka na ekranie
  // Obrazek jest wyśrodkowany i ma height: 100vh, więc width będzie proporcjonalny
  const aspectRatio = canvas.width / canvas.height;
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;
  const imageDisplayWidth = screenHeight * aspectRatio;
  
  // Jeśli obrazek jest szerszy niż ekran, będzie widoczna tylko środkowa część
  let leftEdgeX, rightEdgeX;
  if (imageDisplayWidth > screenWidth) {
    // Obrazek jest szerszy - oblicz które części będą widoczne
    const visibleWidth = screenWidth / imageDisplayWidth; // procent szerokości obrazka widoczny na ekranie
    const centerOffset = (1 - visibleWidth) / 2; // offset od środka
    leftEdgeX = Math.floor(canvas.width * centerOffset);
    rightEdgeX = Math.floor(canvas.width * (1 - centerOffset));
  } else {
    // Obrazek jest węższy - będą widoczne boki
    leftEdgeX = 0;
    rightEdgeX = canvas.width;
  }
  
  const leftColorSections = [];
  const rightColorSections = [];
  const sampleWidth = Math.floor(canvas.width * 0.03); // Jeszcze węższa próbka
  const sections = 5;
  
  for (let section = 0; section < sections; section++) {
    const startY = Math.floor((canvas.height / sections) * section);
    const endY = Math.floor((canvas.height / sections) * (section + 1));
    const leftSectionColors = [];
    const rightSectionColors = [];
    
    // Próbkuj kolory w tej sekcji
    for (let y = startY; y < endY; y += Math.max(1, Math.floor((endY - startY) / 8))) {
      // Lewa strona - próbkuj od lewej krawędzi widocznej części
      for (let x = leftEdgeX; x < leftEdgeX + sampleWidth && x < canvas.width; x += 2) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) { // Sprawdź czy piksel nie jest przezroczysty
          leftSectionColors.push({
            r: data[index],
            g: data[index + 1],
            b: data[index + 2]
          });
        }
      }
      
      // Prawa strona - próbkuj od prawej krawędzi widocznej części
      for (let x = rightEdgeX - sampleWidth; x < rightEdgeX && x >= 0; x += 2) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) { // Sprawdź czy piksel nie jest przezroczysty
          rightSectionColors.push({
            r: data[index],
            g: data[index + 1],
            b: data[index + 2]
          });
        }
      }
    }
    
    if (leftSectionColors.length > 0) {
      leftColorSections.push(averageColors(leftSectionColors));
    }
    if (rightSectionColors.length > 0) {
      rightColorSections.push(averageColors(rightSectionColors));
    }
  }
  
  // Debug info
  console.log('Image dimensions:', canvas.width, 'x', canvas.height);
  console.log('Screen dimensions:', screenWidth, 'x', screenHeight);
  console.log('Image display width:', imageDisplayWidth);
  console.log('Left edge X:', leftEdgeX, 'Right edge X:', rightEdgeX);
  console.log('Left colors:', leftColorSections);
  console.log('Right colors:', rightColorSections);
  
  // Stwórz osobne gradienty dla każdej sekcji
  leftGradients = leftColorSections.map((color, index) => ({
    gradient: `linear-gradient(to right, 
      rgba(${color.r}, ${color.g}, ${color.b}, 0.8) 0%, 
      rgba(${color.r}, ${color.g}, ${color.b}, 0.4) 50%,
      transparent 100%)`,
    top: `${(index / sections) * 100}%`,
    height: `${100 / sections}%`
  }));
  
  rightGradients = rightColorSections.map((color, index) => ({
    gradient: `linear-gradient(to left, 
      rgba(${color.r}, ${color.g}, ${color.b}, 0.8) 0%, 
      rgba(${color.r}, ${color.g}, ${color.b}, 0.4) 50%,
      transparent 100%)`,
    top: `${(index / sections) * 100}%`,
    height: `${100 / sections}%`
  }));
  
  // Zachowaj też główny gradient dla kompatybilności
  if (leftColorSections.length > 0) {
    const avgLeft = averageColors(leftColorSections);
    leftGradient = `linear-gradient(to right, 
      rgba(${avgLeft.r}, ${avgLeft.g}, ${avgLeft.b}, 0.7) 0%, 
      rgba(${avgLeft.r}, ${avgLeft.g}, ${avgLeft.b}, 0.3) 50%,
      transparent 100%)`;
  }
  
  if (rightColorSections.length > 0) {
    const avgRight = averageColors(rightColorSections);
    rightGradient = `linear-gradient(to left, 
      rgba(${avgRight.r}, ${avgRight.g}, ${avgRight.b}, 0.7) 0%, 
      rgba(${avgRight.r}, ${avgRight.g}, ${avgRight.b}, 0.3) 50%,
      transparent 100%)`;
  }
}

function averageColors(colors) {
  const total = colors.reduce((acc, color) => ({
    r: acc.r + color.r,
    g: acc.g + color.g,
    b: acc.b + color.b
  }), { r: 0, g: 0, b: 0 });
  
  return {
    r: Math.round(total.r / colors.length),
    g: Math.round(total.g / colors.length),
    b: Math.round(total.b / colors.length)
  };
}

onMount(() => {
  // Dodaj klasę do body gdy landing jest aktywny
  document.body.classList.add('landing-active');
  
  // Sprawdź czy to mobile przy pierwszym załadowaniu
  checkMobile();
  
  // Dodaj listener na zmianę rozmiaru okna
  const handleResize = () => {
    checkMobile();
  };
  
  window.addEventListener('resize', handleResize);
  
  // Analizuj kolory gdy obrazek się załaduje
  if (machineImg) {
    if (machineImg.complete) {
      analyzeImageColors(machineImg);
    } else {
      machineImg.onload = () => analyzeImageColors(machineImg);
    }
  }
  
  // Cleanup
  return () => {
    document.body.classList.remove('landing-active');
    window.removeEventListener('resize', handleResize);
  };
});
</script>

<div in:fade out:fade class="container targi-container" on:click={handleClick} on:keydown={handleClick} role="button" tabindex="0">
    
    <!-- Główny obrazek -->
    <img class="machine" bind:this={machineImg} src={imageSource} alt="Machine" 
         on:load={() => analyzeImageColors(machineImg)}>
    
    {#if !isMobile}
      <!-- Blur w tle - tylko na desktop -->
      <img class="machine2" src={imageSource} alt="Machine blur">
      
      <!-- Rozciągnięte i rozmyte krawędzie - tylko na desktop -->
      <div class="edge-blur-left">
        <img src={imageSource} alt="Left edge blur">
      </div>
      
      <div class="edge-blur-right">
        <img src={imageSource} alt="Right edge blur">
      </div>
      
      <!-- Dynamiczne gradienty po bokach - tylko na desktop -->
      {#each leftGradients as leftGrad, index}
        <div class="left-gradient-section" 
             style="background: {leftGrad.gradient}; top: {leftGrad.top}; height: {leftGrad.height}"></div>
      {/each}
      
      {#each rightGradients as rightGrad, index}
        <div class="right-gradient-section" 
             style="background: {rightGrad.gradient}; top: {rightGrad.top}; height: {rightGrad.height}"></div>
      {/each}
      
      <!-- Zapasowe główne gradienty - tylko na desktop -->
      {#if leftGradient && leftGradients.length === 0}
        <div class="left-gradient" style="background: {leftGradient}"></div>
      {/if}
      
      {#if rightGradient && rightGradients.length === 0}
        <div class="right-gradient" style="background: {rightGradient}"></div>
      {/if}
    {/if}
    
    <img class="gradient" src="/assets/landing_targi2025/background1.png" alt="Background">
          
  
 
</div>

<style lang="scss">
    :global(body.landing) {
     
        overflow: hidden;
        position: relative;
        height: 100vh;
        width: 100vw;
      

    }
.machine {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 100vh;
    z-index: 2;
}
.machine2 {
    filter: blur(660px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 1;
}
.gradient{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width: 100%;
    height: 100%;
    filter: opacity(0.9) brightness(0.7);
}


.targi-container {
    
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-image: url(/assets/landing_targi2025/background.jpg);
    background-size: cover;
}

.left-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    z-index: 3;
    pointer-events: none;
}

.right-gradient {
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100vh;
    z-index: 3;
    pointer-events: none;
}

.left-gradient-section {
    position: absolute;
    left: 0;
    width: 40%;
    z-index: 3;
    pointer-events: none;
}

.right-gradient-section {
    position: absolute;
    right: 0;
    width: 40%;
    z-index: 3;
    pointer-events: none;
}

/* Rozmyte krawędzie */
.edge-blur-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100vh;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
}

.edge-blur-left img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) scaleX(3);
    width: auto;
    height: 100vh;
    filter: blur(80px);
    opacity: 0.8;
    object-fit: cover;
    /* Pokazuj tylko lewą część obrazka */
    clip-path: inset(0 70% 0 0);
}

.edge-blur-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
}

.edge-blur-right img {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) scaleX(3);
    width: auto;
    height: 100vh;
    filter: blur(80px);
    opacity: 0.8;
    object-fit: cover;
    /* Pokazuj tylko prawą część obrazka */
    clip-path: inset(0 0 0 70%);
}

/* Nadpisanie klasy r800 dla landing page */
:global(body.r800) .targi-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
    overflow: hidden !important;
}

/* Zapewnienie że body nie interferuje z landing page */
:global(body.r800.landing-active) {
    position: static !important;
    overflow: hidden !important;
    all: revert !important;
}

/* Dodatkowe nadpisanie dla app container */
:global(body.r800.landing-active .app) {
    overflow: hidden !important;
}

/* Ogólne style dla aktywnego landing */
:global(body.landing-active) {
    overflow: hidden !important;
}

/* Responsywność dla urządzeń mobilnych */
@media (max-width: 768px), (max-aspect-ratio: 1/1) {
    .machine {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        height: 100vh;
        max-height: 100vh;
        object-fit: contain;
        object-position: center;
    }
    
    .targi-container {
        padding: 0;
        overflow: hidden;
    }
    
    .gradient {
        /* Na mobile gradient może być bardziej przezroczysty */
        filter: opacity(0.7) brightness(0.8);
    }
}
</style>
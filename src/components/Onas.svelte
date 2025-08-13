<script lang="ts">
	import DiagonalSliceReveal from './DiagonalSliceReveal.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { typoFixAction } from '$lib/utils/typography';
  

  let sectionEl: HTMLElement;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="onas_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="onas" class="onas">
  <div class="onas-container container">
    <div class="section-header">
      <h1 class="no-sel">O nas</h1>
      <hr />
    </div>
    
    <div class="content-layout">
      <div class="content-intro">
        <p class="intro-text" use:typoFixAction>Jesteśmy bardzo dumni z naszej ponad 20-letniej historii w branży nowoczesnych maszyn CNC. Nasze doświadczenie to oczywiście nie tylko liczby! Nasz sukces liczymy bowiem w ilości udanych projektów oraz w pełni zadowolonych Klientów.</p>
      </div>
      <div class="content-image">
        <DiagonalSliceReveal  src="/assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg" alt="O nas - maszyny CNC"/>
       
      </div>
    </div>
  </div>
</section>

<!-- Sekcja z kartami informacyjnymi -->
<section class="info-cards-section no-sel" bind:this={sectionEl}>
  <div class="info-cards-wrapper">
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 0 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Doświadczony zespół" class="info-icon" />
        <span class="info-title" use:typoFixAction>Doskonale zgrani<br>inżynierowie:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Nasz zespół inżynierów to klucz do Twojego sukcesu. Ich wieloletnie doświadczenie, kreatywność, a także zgranie pozwalają nam kreować maszyny o nietypowej budowie i funkcjonalności.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 300 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Bogata oferta" class="info-icon" />
        <span class="info-title" use:typoFixAction>Bogata oferta<br>maszyn CNC:</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        W naszej ofercie znajdziesz frezarki CNC do aluminium, plotery, grawerki do drewna, tokarki oraz centra obróbcze. Wszystkie urządzenia spełniają najwyższe standardy przemysłowe.
      </p>
    </div>
    <div class="info-card" in:fade={{ duration: 500, delay: visible ? 600 : 9999 }}>
      <div class="info-card-header">
        <img src="/assets/green-arrow.svg" alt="Jakość bez kompromisów" class="info-icon" />
        <span class="info-title">Jakość, która<br>nie lubi<br>kompromisów</span>
      </div>
      <p class="info-desc" use:typoFixAction>
        Do produkcji naszych maszyn używamy tylko komponentów najwyższej jakości. To zapewnia nie tylko ich niezawodność, ale także precyzję i efektywność.
      </p>
    </div>
  </div>
</section>

<!-- Dodatkowa sekcja z treścią -->
<section id="onas-details" class="onas-details">
  <div class="onas-container container">
    <div class="content-section">
      <h2 class="section-title">Nietypowe projekty dla wymagających Klientów</h2>
      <p use:typoFixAction>Jednym z naszych atutów jest zdolność do tworzenia maszyn o nietypowej budowie i funkcjonalności. Pracowaliśmy dla Klientów z różnych branż, takich jak <strong>złotnictwo, produkcja okularów, przemysł tekstylny czy obróbka kamienia</strong>. Dostarczane przez nas urządzenia są nie tylko niezawodne, ale także dostosowane do specyficznych potrzeb.</p>
    </div>

    <div class="content-section">
      <h2 class="section-title">Zaufaj profesjonalistom</h2>
      <p use:typoFixAction>Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Dodatkowo oferujemy własny serwis gwarancyjny i pogwarancyjny oraz przeróbki maszyn innych producentów.</p>
    </div>
  </div>
</section>

<style lang="scss">
  
  .onas-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
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
      overflow: hidden;
    }
  }

  .onas_page {
    min-width: 100vw;
    margin: 0 auto;
    min-height: 20vh;
  }

  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 218px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
  }
  .onas {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  .content-layout {
    display: flex;
    align-items: center;
    gap: 60px;
    margin-bottom: 40px;
  }

  .content-intro {
    flex: 1;
    
    .intro-text {
      font-size: 1.2rem;
      line-height: 1.8;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }

  .content-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .about-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  // Importujemy style dla info-cards-section z istniejącego komponentu
  .info-cards-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: none;
    padding: 0;
    margin: 0;
    padding-bottom: 10em;
    position: relative;
    background: white;
  }
  
  .info-cards-wrapper {
    display: flex;
    gap: 3vw;
    width: 100%;

    justify-content: center;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  
  .info-card {
    background: #f7f7f7;
    border-radius: 0;
    box-shadow: none;
    padding: 32px 32px 32px 32px;
    width: 100%;
    max-width: 400px;
    min-width: 320px;
    min-height: 260px;
    border-top: 4px solid #555a5e;
    display: flex;
    flex-direction: column;
    gap: 18px;
    justify-content: flex-start;
    position: relative;
  }
  
  .info-card::before{
    content: url(/assets/images/triangle.svg);
    position: absolute;
    right: 0;
    bottom: 0;
    width: 119px;
    height: 68px;
    pointer-events: none;
  }
  
  .info-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
    height: 7em;
  }
  
  .info-icon {
    width: 34px;
    height: 44px;
    margin-right: 2px;
    margin-top: 2px;
  }
  
  .info-title {
    font-size: 2rem;
    font-weight: 700;
    color: #555a5e;
    line-height: 1.1;
    margin-top: 6px;
  }
  
  .info-desc {
    font-size: 1.1rem;
    color: #222;
    margin: 0;
    font-weight: 400;
    padding-left: 1em;
    bottom: 0px;
  }

  // Style dla dodatkowej sekcji
  .onas-details {
    width: 100%;
    padding: 100px 0;
    background: white;
    color: var(--color-text-secondary);
  }

  .content-section {
    margin-bottom: 60px;
    
  
    .section-title {
      position: relative;
      color: var(--color-text-secondary);
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      font-size: 38px;
      text-align: left;
      margin-bottom: 30px;
      
      &::before {
        content: "";
        position: absolute;
        left: -14px;
        width: 28px;
        height: 43px;
        background-image: url(/assets/red-arrow.svg);
      }
    }
    p {
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  }

  @media (max-width: 1100px) {
    .info-cards-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .info-card {
      max-width: 600px;
      min-width: 0;
      width: 90vw;
    }
  }

  @media (max-width: 768px) {
    .onas {
      padding: 80px 0;
    }
    
    .onas-container {
      padding: 0 2rem;
    }
    
    .content-layout {
      flex-direction: column;
      gap: 40px;
    }
    
    .content-intro .intro-text {
      font-size: 1rem;
    }
    
    .info-title {
      font-size: 1.2rem;
    }
    .info-card {
      padding: 20px 10px 20px 10px;
      min-height: 180px;
    }
    .info-desc {
      font-size: 0.98rem;
    }
    
   
    .content-section .section-title {
      font-size: 28px;
    }
    .onas-details {
      padding: 80px 0;
    }
  }
</style>

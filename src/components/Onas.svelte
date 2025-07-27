<script lang="ts">
  import { typoFix } from '$lib/utils/typography';
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
    
    <div class="content-section">
      <h2>Jesteśmy polskim producentem maszyn CNC</h2>
      <p>{@html typoFix("Jesteśmy bardzo dumni z naszej ponad 10-letniej historii w branży nowoczesnych maszyn CNC. Nasze doświadczenie to oczywiście nie tylko liczby! Nasz sukces liczymy bowiem w ilości udanych projektów oraz w pełni zadowolonych Klientów. Zaczynając na małych warsztatach, aż po duże kompleksy produkcyjne, dostarczamy im wysokiej jakości urządzenia sterowane numerycznie. Te rewolucjonizują procesy produkcyjne!")}</p>
    </div>

    <div class="content-section">
      <h2>Doskonale zgrani inżynierowie</h2>
      <p>{@html typoFix("Nasz zespół inżynierów to klucz do Twojego sukcesu. Ich wieloletnie doświadczenie, kreatywność, a także zgranie pozwalają nam bowiem kreować maszyny o nietypowej budowie i funkcjonalności. Dla Klientów z branż tak różnorodnych, jak produkcja okularów przemysł tekstylny czy obróbka kamienia, a nawet złotnictwo jesteśmy w stanie zrealizować projekty, które spełniała najwyższe standardy oraz oczekiwania!")}</p>
    </div>

    <div class="content-section">
      <h2>Bogata oferta maszyn CNC</h2>
      <p>{@html typoFix("W naszej ofercie znajdziesz nie tylko nietypowe projekty, ale również sprawdzone i solidne maszyny. Możemy Ci zaproponować frezarki CNC do aluminium, plotery, grawerki do drewna, tokarki oraz centra obróbcze. Wszystkie dostępne w naszym asortymencie urządzenia spełniają najwyższe standardy przemysłowe, są także przygotowane do intensywnej pracy w Twoim zakładzie produkcyjnym.")}</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <h3>Stawiamy na jakość</h3>
        <p>{@html typoFix("Do produkcji naszych maszyn wykorzystujemy komponenty najwyższej jakości.")}</p>
      </div>
      <div class="feature-card">
        <h3>Optymalne rozwiązania</h3>
        <p>{@html typoFix("Pomagamy w konfiguracji i dobrze maszyn odpowiadających Państwa potrzebom.")}</p>
      </div>
      <div class="feature-card">
        <h3>Własny serwis</h3>
        <p>{@html typoFix("Zapewniamy serwis gwarancyjny i pogwarancyjny oraz przeróbki maszyn innych producentów.")}</p>
      </div>
    </div>

    <div class="content-section">
      <h2>Jakość, która nie lubi kompromisów</h2>
      <p>{@html typoFix("Do produkcji naszych maszyn używamy tylko komponentów najwyższej jakości. To zapewnia nie tylko ich niezawodność, ale także precyzję i efektywność. Jesteśmy dumni z tego, że nasze maszyny CNC spełniają oczekiwania nawet tych najbardziej wymagających Klientów.")}</p>
    </div>

    <div class="content-section">
      <h2>Nietypowe projekty dla wymagających Klientów</h2>
      <p>{@html typoFix("Jednym z naszych atutów jest zdolność do tworzenia maszyn o nietypowej budowie i funkcjonalności. Pracowaliśmy dla Klientów z różnych branż, takich jak złotnictwo, produkcja okularów, przemysł tekstylny czy obróbka kamienia. Dostarczane przez nas urządzenia są nie tylko niezawodne, ale także dostosowane do specyficznych potrzeb.")}</p>
    </div>

    <div class="content-section">
      <h2>Zaufaj profesjonalistom</h2>
      <p>{@html typoFix("Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Dodatkowo oferujemy własny serwis gwarancyjny i pogwarancyjny oraz przeróbki maszyn innych producentów.")}</p>
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
    top: 209px;
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

  .content-section {
    margin-bottom: 60px;
    
    h2 {
      color: var(--color-primary);
      font-size: 1.8rem;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    p {
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 60px 0;
    
    .feature-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      
      h3 {
        color: var(--color-primary);
        font-size: 1.4rem;
        margin-bottom: 15px;
        font-weight: 600;
      }
      
      p {
        line-height: 1.6;
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    .onas {
      padding: 80px 0;
    }
    
    .onas-container {
      padding: 0 2rem;
    }
    
    .content-section {
      h2 {
        font-size: 1.5rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      
      .feature-card {
        padding: 20px;
        
        h3 {
          font-size: 1.2rem;
        }
      }
    }
  }
</style>

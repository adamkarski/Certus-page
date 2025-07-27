<script lang="ts">
  import { typoFix } from '$lib/utils/typography';
</script>

<section class="serwis_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="serwis" class="serwis">
  <div class="serwis-container container">
    <div class="section-header">
      <h1 class="no-sel">Serwis</h1>
      <hr />
    </div>
    
    <div class="content-section">
      <h2>Profesjonalny serwis maszyn CNC</h2>
      <p>{@html typoFix("Rola naszego przedsiębiorstwa nie kończy się zaraz po dostarczeniu Ci maszyn. Oferujemy bowiem także profesjonalny serwis gwarancyjny oraz pogwarancyjny. W ten sposób możemy zapewnić naszym Klientom pełen zakres wsparcia technicznego. Jesteśmy otwarci na dalsze udoskonalenia oraz rozwijanie już zakupionych produktów.")}</p>
    </div>

    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">🔧</div>
        <h3>Serwis gwarancyjny</h3>
        <p>{@html typoFix("Zapewniamy pełen serwis gwarancyjny dla wszystkich naszych maszyn CNC. Nasz zespół techników jest dostępny, aby szybko rozwiązać wszelkie problemy.")}</p>
      </div>
      <div class="service-card">
        <div class="service-icon">⚙️</div>
        <h3>Serwis pogwarancyjny</h3>
        <p>{@html typoFix("Nawet po zakończeniu okresu gwarancji, nadal świadczymy profesjonalne usługi serwisowe. Dbamy o długotrwałą współpracę z naszymi Klientami.")}</p>
      </div>
      <div class="service-card">
        <div class="service-icon">🔄</div>
        <h3>Przeróbki i modernizacje</h3>
        <p>{@html typoFix("Oferujemy przeróbki maszyn innych producentów oraz modernizacje istniejących urządzeń, dostosowując je do aktualnych potrzeb.")}</p>
      </div>
    </div>

    <div class="content-section">
      <h2>Wsparcie techniczne na najwyższym poziomie</h2>
      <p>{@html typoFix("Naszym Klientom oferujemy wsparcie pogwarancyjne oraz możliwość udoskonalania zakupionych produktów. Wierzymy, że praca nie kończy się na sprzedaży maszyny — jesteśmy zawsze gotowi pomóc i doradzić. Jako zespół wsparcia jesteśmy zawsze dostępni, aby rozwiązać wszelkie problemy i udzielić profesjonalnej pomocy w każdej sytuacji.")}</p>
    </div>

    <div class="contact-section">
      <h2>Skontaktuj się z naszym serwisem</h2>
      <div class="contact-info">
        <div class="contact-item">
          <strong>Telefon:</strong>
          <a href="tel:+48606324406">+48 606 324 406</a>
        </div>
        <div class="contact-item">
          <strong>Email:</strong>
          <a href="mailto:biuro@mg-certus.pl">biuro@mg-certus.pl</a>
        </div>
        <div class="contact-item">
          <strong>Adres:</strong>
          <span>Biała Droga 177, 34-123 Chocznia, woj. małopolskie</span>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2>Dlaczego warto wybrać nasz serwis?</h2>
      <ul class="benefits-list">
        <li>{@html typoFix("Doświadczony zespół techników z ponad 10-letnim stażem")}</li>
        <li>{@html typoFix("Szybka reakcja na zgłoszenia serwisowe")}</li>
        <li>{@html typoFix("Oryginalne części zamienne najwyższej jakości")}</li>
        <li>{@html typoFix("Kompleksowe wsparcie techniczne")}</li>
        <li>{@html typoFix("Możliwość modernizacji i rozbudowy maszyn")}</li>
        <li>{@html typoFix("Konkurencyjne ceny usług serwisowych")}</li>
      </ul>
    </div>
  </div>
</section>

<style lang="scss">
  .serwis-container {
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

  .serwis_page {
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
  .serwis {
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

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 60px 0;
    
    .service-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      
      .service-icon {
        font-size: 3rem;
        margin-bottom: 20px;
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
        text-align: left;
      }
    }
  }

  .contact-section {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin: 60px 0;
    
    h2 {
      color: var(--color-primary);
      font-size: 1.8rem;
      margin-bottom: 30px;
      font-weight: 600;
      text-align: center;
    }
    
    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      
      .contact-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        strong {
          color: var(--color-primary);
          font-weight: 600;
        }
        
        a {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
          
          &:hover {
            color: var(--color-primary);
          }
        }
      }
    }
  }

  .benefits-list {
    list-style: none;
    padding: 0;
    
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 15px;
      line-height: 1.6;
      
      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 768px) {
    .serwis {
      padding: 80px 0;
    }
    
    .serwis-container {
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
    
    .services-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      
      .service-card {
        padding: 20px;
        
        .service-icon {
          font-size: 2.5rem;
        }
        
        h3 {
          font-size: 1.2rem;
        }
      }
    }
    
    .contact-section {
      padding: 20px;
      
      h2 {
        font-size: 1.5rem;
      }
      
      .contact-info {
        grid-template-columns: 1fr;
      }
    }
  }
</style>

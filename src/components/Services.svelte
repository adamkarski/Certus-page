<script lang="ts">
  const services = [
    {
      icon: '💼',
      title: 'BUSINESS CONSULTING',
      description: 'Strategic business advice and consulting services to help your company grow and succeed in competitive markets.'
    },
    {
      icon: '📊',
      title: 'FINANCIAL PLANNING',
      description: 'Comprehensive financial planning services including budgeting, forecasting, and investment strategies.'
    },
    {
      icon: '💰',
      title: 'INVESTMENT MANAGEMENT',
      description: 'Professional investment management services to maximize your returns while minimizing risks.'
    },
    {
      icon: '🏦',
      title: 'BANKING SOLUTIONS',
      description: 'Complete banking solutions including loans, credit facilities, and cash management services.'
    },
    {
      icon: '📈',
      title: 'MARKET ANALYSIS',
      description: 'In-depth market research and analysis to help you make informed business decisions.'
    },
    {
      icon: '🔒',
      title: 'RISK MANAGEMENT',
      description: 'Comprehensive risk assessment and management strategies to protect your business assets.'
    }
  ]
</script>

<section id="services" class="services">
  <div class="services-container">
    <div class="section-header">
      <h2 class="section-title">OUR SERVICES</h2>
      <div class="title-underline"></div>
      <p class="section-subtitle">
        We offer a comprehensive range of financial services designed to meet all your business needs
      </p>
    </div>
    
    <div class="services-grid">
      {#each services as service}
        <div class="service-card">
          <div class="service-icon">{service.icon}</div>
          <h3 class="service-title">{service.title}</h3>
          <p class="service-description">{service.description}</p>
          <button class="service-btn">LEARN MORE</button>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    width: 100%;
    padding: 100px 0;
    background: #f8f9fa;
  }
  
  .services-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 42px;
    font-weight: 800;
    color: #2c5aa0;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
  
  .title-underline {
    width: 80px;
    height: 4px;
    background: #ffd700;
    margin: 0 auto 30px;
  }
  
  .section-subtitle {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
  }
  
  .service-card {
    background: white;
    padding: 40px 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 25px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border-top: 4px solid transparent;
  }
  
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    border-top-color: #2c5aa0;
  }
  
  .service-icon {
    font-size: 60px;
    margin-bottom: 25px;
    display: block;
  }
  
  .service-title {
    font-size: 20px;
    font-weight: 700;
    color: #2c5aa0;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }
  
  .service-description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
  }
  
  .service-btn {
    background: #2c5aa0;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  
  .service-btn:hover {
    background: #1a4480;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .services {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: 32px;
    }
    
    .services-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .service-card {
      padding: 30px 20px;
    }
  }
</style>
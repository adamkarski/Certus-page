<script lang="ts">
  const testimonials = [
    {
      name: 'John Smith',
      company: 'CEO, TechCorp',
      content: 'Financer has been instrumental in helping our company achieve financial stability and growth. Their expertise and dedication are unmatched.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      company: 'CFO, GlobalTrade',
      content: 'The financial planning services provided by Financer have exceeded our expectations. They truly understand our business needs.',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Brown',
      company: 'Director, InvestPro',
      content: 'Professional, reliable, and results-driven. Financer has helped us navigate complex financial challenges with ease.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]
</script>

<!-- <section id="references" class="references">
  <div class="references-bg">
    <div class="references-overlay"></div>
    <div class="references-container">
      <div class="section-header">
        <h2 class="section-title">CLIENT TESTIMONIALS</h2>
        <div class="title-underline"></div>
        <p class="section-subtitle">
          See what our satisfied clients have to say about our services
        </p>
      </div>
      
      <div class="testimonials-grid">
        {#each testimonials as testimonial}
          <div class="testimonial-card">
            <div class="quote-icon">"</div>
            <p class="testimonial-text">{testimonial.content}</p>
            <div class="testimonial-author">
              <img src={testimonial.image} alt={testimonial.name} class="author-image" />
              <div class="author-info">
                <h4 class="author-name">{testimonial.name}</h4>
                <p class="author-company">{testimonial.company}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="clients-section">
        <h3 class="clients-title">TRUSTED BY LEADING COMPANIES</h3>
        <div class="clients-logos">
          <div class="client-logo">TECHCORP</div>
          <div class="client-logo">GLOBALTRADE</div>
          <div class="client-logo">INVESTPRO</div>
          <div class="client-logo">FINANCEGROUP</div>
          <div class="client-logo">BUSINESSPRO</div>
        </div>
      </div>
    </div>
  </div>
</section> -->

<style>
  .references {
    width: 100%;
    padding: 100px 0;
    position: relative;
  }
  
  .references-bg {
    background: linear-gradient(135deg, #2c5aa0 0%, #1a4480 100%);
    position: relative;
    overflow: hidden;
  }
  
  .references-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover;
    opacity: 0.1;
  }
  
  .references-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 90, 160, 0.9);
  }
  
  .references-container {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    color: white;
  }
  
  .section-title {
    font-size: 42px;
    font-weight: 800;
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
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    margin-bottom: 80px;
  }
  
  .testimonial-card {
    background: rgba(255, 255, 255, 0.95);
    padding: 40px 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
  }
  
  .quote-icon {
    font-size: 60px;
    color: #2c5aa0;
    line-height: 1;
    margin-bottom: 20px;
    certusmily: Poppins;
  }
  
  .testimonial-text {
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 16px;
    font-style: italic;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  
  .author-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .author-info {
    text-align: left;
  }
  
  .author-name {
    font-size: 18px;
    font-weight: 700;
    color: #2c5aa0;
    margin-bottom: 5px;
  }
  
  .author-company {
    color: #666;
    font-size: 14px;
    margin: 0;
  }
  
  .clients-section {
    text-align: center;
    color: white;
  }
  
  .clients-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }
  
  .clients-logos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
  }
  
  .client-logo {
    font-size: 18px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    transition: color 0.3s ease;
  }
  
  .client-logo:hover {
    color: #ffd700;
  }
  
  @media (max-width: 768px) {
    .references {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: 32px;
    }
    
    .testimonials-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .clients-logos {
      flex-direction: column;
      gap: 20px;
    }
  }
</style>
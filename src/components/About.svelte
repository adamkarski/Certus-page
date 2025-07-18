<section id="about" class="about">
  <div class="about-container">
    <div class="about-content">
      <div class="about-text">
        <h2 class="section-title">ABOUT FINANCER</h2>
        <div class="title-underline"></div>
        <p class="about-description">
          With over 20 years of experience in the financial industry, Financer has been providing 
          exceptional financial services to businesses of all sizes. Our team of expert professionals 
          is dedicated to helping you achieve your financial goals through innovative solutions and 
          personalized service.
        </p>
        <p class="about-description">
          We pride ourselves on our commitment to excellence, integrity, and client satisfaction. 
          Our comprehensive approach ensures that every aspect of your financial needs is addressed 
          with the highest level of professionalism and expertise.
        </p>
        <div class="about-features">
          <div class="feature">
            <div class="feature-icon">✓</div>
            <span>20+ Years of Experience</span>
          </div>
          <div class="feature">
            <div class="feature-icon">✓</div>
            <span>Expert Professional Team</span>
          </div>
          <div class="feature">
            <div class="feature-icon">✓</div>
            <span>Personalized Solutions</span>
          </div>
          <div class="feature">
            <div class="feature-icon">✓</div>
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>
      
      <div class="about-image">
        <img src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Financial Team" />
        <div class="image-overlay">
          <div class="stats">
            <div class="stat">
              <span class="stat-number">2500+</span>
              <span class="stat-label">Happy Clients</span>
            </div>
            <div class="stat">
              <span class="stat-number">98%</span>
              <span class="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    width: 100%;
    padding: 100px 0;
    background: white;
  }
  
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
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
    margin-bottom: 30px;
  }
  
  .about-description {
    color: #666;
    line-height: 1.8;
    margin-bottom: 25px;
    font-size: 16px;
  }
  
  .about-features {
    margin-top: 40px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }
  
  .feature-icon {
    width: 25px;
    height: 25px;
    background: #2c5aa0;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .about-image {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  }
  
  .about-image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(44, 90, 160, 0.9));
    padding: 40px 30px 30px;
  }
  
  .stats {
    display: flex;
    justify-content: space-around;
  }
  
  .stat {
    text-align: center;
    color: white;
  }
  
  .stat-number {
    display: block;
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    .about {
      padding: 80px 0;
    }
    
    .about-content {
      grid-template-columns: 1fr;
      gap: 50px;
    }
    
    .section-title {
      font-size: 32px;
    }
    
    .about-image {
      order: -1;
    }
  }
</style>
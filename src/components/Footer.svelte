<script lang="ts">
  const currentYear = new Date().getFullYear()
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-logo">FINANCER</h3>
        <p class="footer-description">
          Your trusted partner in financial success. We provide comprehensive financial solutions 
          to help businesses achieve their goals.
        </p>
        <div class="social-links">
          <a href="#" class="social-link">Facebook</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Instagram</a>
        </div>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-title">SERVICES</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Business Consulting</a></li>
          <li><a href="#" class="footer-link">Financial Planning</a></li>
          <li><a href="#" class="footer-link">Investment Management</a></li>
          <li><a href="#" class="footer-link">Banking Solutions</a></li>
          <li><a href="#" class="footer-link">Risk Management</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-title">COMPANY</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">About Us</a></li>
          <li><a href="#" class="footer-link">Our Team</a></li>
          <li><a href="#" class="footer-link">Careers</a></li>
          <li><a href="#" class="footer-link">News</a></li>
          <li><a href="#" class="footer-link">Contact</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-title">CONTACT INFO</h4>
        <div class="contact-info">
          <p class="contact-item">
            <span class="contact-icon">📍</span>
            123 Financial Street, NY 10001
          </p>
          <p class="contact-item">
            <span class="contact-icon">📞</span>
            +1 (555) 123-4567
          </p>
          <p class="contact-item">
            <span class="contact-icon">✉️</span>
            info@financer.com
          </p>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © {currentYear} FINANCER. All rights reserved.
        </p>
        <div class="footer-bottom-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Sitemap</a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    background: #1a1a1a;
    color: white;
    padding: 80px 0 0;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 60px;
    margin-bottom: 50px;
  }
  
  .footer-logo {
    font-size: 28px;
    font-weight: 800;
    color: #ffd700;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }
  
  .footer-description {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }
  
  .social-link:hover {
    color: #ffd700;
  }
  
  .footer-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 25px;
    letter-spacing: 1px;
    color: white;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 12px;
  }
  
  .footer-link {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }
  
  .footer-link:hover {
    color: #ffd700;
  }
  
  .contact-info {
    margin-top: 0;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: #ccc;
    font-size: 14px;
  }
  
  .contact-icon {
    margin-right: 10px;
    font-size: 16px;
  }
  
  .footer-bottom {
    border-top: 1px solid #333;
    padding: 30px 0;
  }
  
  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .copyright {
    color: #999;
    font-size: 14px;
    margin: 0;
  }
  
  .footer-bottom-links {
    display: flex;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: 60px 0 0;
    }
    
    .footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .footer-bottom-content {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
    
    .footer-bottom-links {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  }
</style>
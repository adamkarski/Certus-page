<script lang="ts">
  import LogoCertus from "../assets/logo_certus.svelte";

  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <LogoCertus />
        </div>
        <h5 class="footer-description">
          Możesz nam zaufać!
        </h5>
        
        <h5 class="footer-description-secondary">
          Jesteśmy polskim producentem z ponad 10 letnim doświadczeniem w branży maszyn CNC.

        </h5>

        <div class="social-links">
          <a href="#" class="social-link">Facebook</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Instagram</a>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">PRODUKTY</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Frezarki CNC</a></li>
          <li><a href="#" class="footer-link">Tokarki CNC</a></li>
          <li><a href="#" class="footer-link">Grawerki CNC</a></li>
          <li><a href="#" class="footer-link">Plotery CNC</a></li>
       
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">FIRMA</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">O nas</a></li>
          <li><a href="#" class="footer-link">Wszystkie maszyny CNC</a></li>
              <li><a href="#" class="footer-link">Zwroty / Reklamacje</a></li>
          <li><a href="#" class="footer-link">Dokumentacja</a></li>
          
          <li><a href="#" class="footer-link">Kontakt</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Kontakt</h4>
        <div class="contact-info">
          <p class="contact-item">
            <span class="contact-icon">
              <img src="src/assets/ikony/lokalizacja.svg" alt="Lokalizacja">
            </span>
           <a href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank">Biała Droga 177, 34-123 Chocznia, woj. Małopolskie</a>
            
          </p>
          <p class="contact-item">
            <span class="contact-icon">
              <img src="src/assets/ikony/telefon.svg" alt="Telefon">
            </span>
            <a href="tel:+48 606 324 406">+48 606 324 406</a>
          </p>
          <p class="contact-item">
            <span class="contact-icon">
              <img src="src/assets/ikony/email.svg" alt="Email">
            </span>
           <a href="mailto:biuro@mg-certus.pl">biuro@mg-certus.pl</a>
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
    width: 100%;
    padding: 0 45px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 60px;
    margin-bottom: 50px;
  }

  .footer-logo {
    margin-bottom: 20px;
    letter-spacing: 1px;
    width: 21em;
  }

  .footer-description {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
  }
  .footer-description-secondary{
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 400;
    max-width: 23vh;
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

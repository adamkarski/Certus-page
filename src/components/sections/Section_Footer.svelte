<script lang="ts">
  import { onMount } from "svelte";
  import { typoFix } from '$lib/utils/typography';
  const currentYear = new Date().getFullYear();

  let LottiePlayer;

  onMount(async () => {
    const module = await import("@lottiefiles/svelte-lottie-player");
    LottiePlayer = module.LottiePlayer;
  });
</script>

<footer class="footer">
  <div class="footer-container gradientFooter">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          {#if LottiePlayer}
            <!-- src="assets/logo-certus.json?"+Math.random() -->
            <svelte:component
              this={LottiePlayer}
              src="https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json?"
              +Math.random()
              autoplay={true}
              loop={false}
              controls={false}
            ></svelte:component>
          {/if}
        </div>
        <h5 class="footer-description">{@html typoFix('Możesz nam zaufać!')}</h5>

        <h5 class="footer-description-secondary">
          {@html typoFix('Jesteśmy polskim producentem z ponad 10 letnim doświadczeniem w branży maszyn CNC.')}
        </h5>
       

        <div class="social-links">
          <a
            href="https://m.facebook.com/CertusCNC/"
            class="social-link"
            title="Odwiedź nas na Facebooku"
            rel="nofollow noopener noreferrer">Facebook</a
          >
          <a
            href="https://www.youtube.com/user/MGCERTUS/videos"
            class="social-link"
            title="Nasze maszyny CNC w akcji"
            rel="nofollow noopener noreferrer">Youtube</a
          >
         
          <!-- <a
            href="https://www.linkedin.com/company/certus_example"
            class="social-link"
            title="Odwiedź nas na LinkedIn"
            rel="nofollow noopener noreferrer">LinkedIn</a
          > -->
          <!-- <a
            href="https://www.instagram.com/certus_example"
            class="social-link"
            title="Odwiedź nas na Instagramie"
            rel="nofollow noopener noreferrer">Instagram</a
          > -->
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">PRODUKTY</h4>
        <ul class="footer-links">
          <li>
            <a
              href="/maszyny/#frezarki"
              class="footer-link"
              title="Frezarki CNC">Frezarki CNC</a
            >
          </li>
          <li>
            <a href="/maszyny/#tokarki" class="footer-link" title="Tokarki CNC"
              >Tokarki CNC</a
            >
          </li>
          <li>
            <a
              href="/maszyny/#grawerki"
              class="footer-link"
              title="Grawerki CNC">Grawerki CNC</a
            >
          </li>
          <li>
            <a href="/maszyny/#plotery" class="footer-link" title="Plotery CNC"
              >Plotery CNC</a
            >
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">FIRMA</h4>
        <ul class="footer-links">
          <li><a href="/onas" class="footer-link" title="O nas">O nas</a></li>
          <li>
            <a href="/maszyny" class="footer-link" title="Wszystkie maszyny CNC"
              >Wszystkie maszyny CNC</a
            >
          </li>
          <li>
            <a
              href="/reklamacje"
              class="footer-link"
              title="Zwroty / Reklamacje">Zwroty / Reklamacje</a
            >
          </li>
          <li>
            <a href="/dokumentacja" class="footer-link" title="Dokumentacja"
              >Dokumentacja</a
            >
          </li>

          <li>
            <a href="/kontakt" class="footer-link" title="Kontakt">Kontakt</a>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Kontakt</h4>
        <div class="contact-info">
          <p class="contact-item">
            <span class="contact-icon">
              <img src="assets/ikony/lokalizacja.svg" alt="Lokalizacja" />
            </span>
            <a
              href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              title="Otwórz lokalizację Certus w Google Maps"
              rel="noopener noreferrer"
              >Biała Droga 177, 34-123 Chocznia, woj. Małopolskie</a
            >
          </p>
          <p class="contact-item">
            <span class="contact-icon">
              <img src="assets/ikony/telefon.svg" alt="Telefon" />
            </span>
            <a href="tel:+48 606 324 406" title="Zadzwoń do Certus"
              >+48 606 324 406</a
            >
          </p>
          <p class="contact-item">
            <span class="contact-icon">
              <img src="assets/ikony/email.svg" alt="Email" />
            </span>
            <a href="mailto:biuro@mg-certus.pl" title="Wyślij e-mail do Certus"
              >biuro@mg-certus.pl</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © {currentYear} CERTUS wszelkie prawa zastrzeżone.
        </p>
        <div class="footer-bottom-links">
          <a
            href="/polityka-prywatnosci"
            class="footer-link"
            title="Polityka prywatności">Polityka prywatności</a
          >

          <a href="/mapa-witryny" class="footer-link" title="Mapa witryny"
            >Mapa witryny</a
          >
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  :global(.gradientFooter) {
    background: linear-gradient(0deg, #67717e 0%, #3e4042 100%);
  }

  .footer {
    width: 100%;
    background: #1a1a1a;
    color: white;
  }

  .footer-container {
    width: 100%;
    padding: 0 45px;
    padding-top: 80px;
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
  .footer-description-secondary {
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
    color: white;
    background-color: var(--color-primary);
    transition: all 0.2s ease;
    font-weight: 400;
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
    transition: all 0.2s ease;
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: white;
    background-color: var(--color-primary);
    padding: 5px;
    font-weight: 800;
    transition: all 0.2s ease;
  }

  .contact-info {
    margin-top: 0;
    transition: all 0.2s ease;

    a {
      transition: all 0.2s ease;
    }

    a:hover {
      color: white;
      background-color: var(--color-primary);
      padding: 2px;
      font-weight: 800;
    }
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
    border-top: 1px solid var(--color-primary-dark);
    padding: 30px 0;
  }

  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    color: #ccc;
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

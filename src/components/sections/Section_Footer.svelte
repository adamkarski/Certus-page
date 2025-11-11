<script lang="ts">
  import { onMount } from "svelte";
  import { typoFixAction } from '$lib/utils/typography';
  
  import kategorieMaszyn from "$lib/data/maszyny.json";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  const currentYear = new Date().getFullYear();



  async function handleMaszynyNavigation(categoryId: string) {
    
    closeMobileMenu();
    await tick();

    if (currentPath.startsWith("/maszyny")) {
      // Używamy wspólnej funkcji scrollowania z smooth easing
      scrollToElement(categoryId, 1000, 140); // 1 sekunda animacji, 140px offset
    } else {
      goto(`/maszyny/#${categoryId}`);
    }
  }

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
          <div style="width: 21em; height: auto;">
            {#if LottiePlayer}
              <svelte:component
                this={LottiePlayer}
                src="https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json"
                autoplay={true}
                loop={false}
                controls={false}
                height="auto"
                width="auto"
                background="transparent"
                controlsLayout="none"
              ></svelte:component>
            {/if}
          </div>
        </div>
        <h5 class="footer-description" use:typoFixAction>Możesz nam zaufać!</h5>

        <h5 class="footer-description-secondary" use:typoFixAction>
          Jesteśmy polskim producentem z ponad 20 letnim doświadczeniem w branży maszyn CNC.
        </h5>
       

        <div class="social-links">
          <a
            href="https://m.facebook.com/CertusCNC/"
            class="social-link"
            title="Odwiedź nas na Facebooku"
            rel="nofollow noopener noreferrer">
           
            




      
<svg  class="footer_media_icon " data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.19 359.21">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }
    </style>
  </defs>
  <g id="_8dSMfM" data-name="8dSMfM">
    <g>
      <path class="cls-1" d="M163.86.64c126.81-9.46,220.75,87.62,197.89,214.37-34.32,190.27-318.18,192.22-357.37,5.99C-18.55,112.02,50.63,9.08,163.86.64ZM169.86,14.6C68.56,21.29,1.8,105.01,16.21,205.2c26.78,186.25,306.48,186.63,332.69-1.02C364.38,93.36,280.87,7.26,169.86,14.6Z"/>
      <path class="cls-1" d="M233.07,117.06h-22.5c-5.14,0-11.5,6.39-11.5,11.47v22.45h31.5c.35,0,1.19,1.11,1.36,1.66.52,1.62-3.15,29.8-3.87,33.75-.21,1.13-.47,1.87-1.49,2.5h-27.5v86.29l-1.5,1.5h-35c-4.26,0-1.51-10.17-1.46-12.43.47-20.45,2.29-52.58.01-71.92-.17-1.45-.12-2.57-1.55-3.44h-26l-1.5-1.5v-34.92l1.5-1.5h26l1.52-2.51c-3.82-29.43,1.03-60.7,35.6-65.2,5.97-.78,12.02-.15,17.84-.08s13.68-1.32,18.54,1.45v32.42Z"/>
    </g>
  </g>
</svg>

            </a
          >
          <a
            href="https://www.youtube.com/user/MGCERTUS/videos"
            class="social-link"
            title="Nasze maszyny CNC w akcji"
            rel="nofollow noopener noreferrer">
            
         
            <svg  class="footer_media_icon " data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.19 359.21">
              <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }
    </style>
  </defs>
  <g id="Wak7U3">
    <g>
      <path class="cls-1" d="M164.91.54c130.52-8.95,223.14,94.54,194.48,223.91-38.8,175.15-301.3,181.93-351.19,11.56C-24.94,122.89,45.41,8.73,164.91.54ZM169.9,14.54C61.48,21.74-4.88,116.33,19.3,221.88c37.24,162.58,282.73,165.32,324.68,5.13C374.7,109.68,290.57,6.53,169.9,14.54Z"/>
      <path class="cls-1" d="M117.01,97.54c44.92-3.78,95.71,1.09,140.94,1.15,37.23,7.55,32.44,61.44,31.92,90.09-.54,29.74,1.91,61.35-34.72,69.2-43.39.4-90.15,3.75-133.44,1.25-68.35-3.95-41.87-79.18-46.28-125.36,3.7-22.11,19.87-34.5,41.58-36.33ZM152.39,218.98c2.11,1.95,7.11,2.2,9.61.65l58.74-35.14c3.82-2.18,4.11-7.17,2.14-10.66-17.78-10.07-35.66-24.02-53.76-33.11-11.01-5.53-17.67-8.68-19.01,6.98s-1.68,49.78,0,65.06c.17,1.53,1.27,5.28,2.27,6.22Z"/>
    </g>
  </g>
</svg>

            </a
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
          {#each kategorieMaszyn as kategoria, i}
            <li>
              
              {#if !kategoria.url}
              
              <a href="/maszyny#{kategoria.id}"
                class="footer-link {kategoria.id}"
                role="button"
              
                
                in:fade={{ delay: i * 50, duration: 200 }}
              >
                {kategoria.title}
              </a>
              {/if}

              {#if kategoria.url} 
              <a href="{kategoria.url}"
              class="footer-link {kategoria.id}"
              role="button"
            
              
              in:fade={{ delay: i * 50, duration: 200 }}
            >
              {kategoria.title}
            </a> 
              {/if}

            </li>
          {/each}
        </ul>








        
      </div>

      <div class="footer-section">
        <h4 class="footer-title">FIRMA</h4>
        <ul class="footer-links">
          <li><a href="/onas" class="footer-link" title="O nas">O nas</a></li>
              
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

         
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  :global(.gradientFooter) {
    background: linear-gradient(0deg, #67717e 0%, #3e4042 100%);
  }




  .social-link .footer_media_icon{

    width: 2.4em;
    height: auto;

    
  }

  a.social-link{
    border-radius: 200px;
  
  
  }

  .footer {
    width: 100%;
    background: #1a1a1a;
    color: white;
    position: relative;
  }

  .footer-container {
    width: 100%;
    padding: 0 45px;
    padding-top: 80px;
    padding-left: 8em;
    padding-right: 8em;
    
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
    transition: color 0.3s ease;
  }

  .social-link:hover {
    color: white;
    background-color: var(--color-primary);
    transition: all 0.2s ease;
    font-weight: 400;
  }

  .footer-title {
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
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: white;
    background-color: var(--color-primary);
    padding: 2px;
    font-weight: 600;
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
      
    }
  }

  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: #ccc;
  }

  .contact-icon {
    margin-right: 10px;
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
    margin: 0;
  }

  .footer-bottom-links {
    display: flex;
    gap: 30px;
  
    a{
     
      text-decoration: none;
      transition: color 0.3s ease;
    }
    a:hover {
      padding: 0;
      font-size: 14px;
    }
  }

  @media (max-width: 1100px) {
    .footer-container {
      padding-left: 4em;
      padding-right: 4em;
    }

    .footer-content {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .footer-logo {
      width: 18em;
    }

    .footer-logo div {
      width: 18em !important;
    }

    .footer-description-secondary {
      max-width: 20vh;
    }
  }

  @media (max-width: 768px) {
    .footer {
      padding: 60px 0 0;
    }

    .footer-container {
      padding-left: 2em;
      padding-right: 2em;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .footer-logo {
      width: 15em;
    }

    .footer-logo div {
      width: 15em !important;
    }

    .footer-description-secondary {
      max-width: 100%;
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

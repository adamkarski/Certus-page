<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../cta-button.svelte";
    import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  export let isKontaktPage = false; // Dodano deklarację propsa
  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
    country: "PL",
  };
  let isSubmitting = false;
  let submitMessage = "";
  let phonePrefix = "+48";
  let messageInputMode: "text" | "record" | null = null; // 'text', 'record', or null (initial state)
  let isRecording = false;
  let recordedFileName = "";

  function selectTextInputMode() {
    messageInputMode = "text";
    isRecording = false;
    recordedFileName = "";
    formData.message = ""; // Clear message when switching modes
  }

  function selectRecordInputMode() {
    messageInputMode = "record";
    isRecording = false;
    recordedFileName = "";
    formData.message = ""; // Clear message when switching modes
  }

  function startRecording() {
    isRecording = true;
    recordedFileName = ""; // Clear previous recording
    // Simulate recording for a few seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  }

  function stopRecording() {
    isRecording = false;
    recordedFileName = `wiadomosc_glosowa_${Date.now()}.mp3`;
    formData.message = `Wiadomość głosowa (załącznik: ${recordedFileName})`;
  }

  const countryPrefixes = [
    { code: "Polska", prefix: "+48" },
    { code: "Österreich", prefix: "+43" },
    { code: "België", prefix: "+32" },
    { code: "България (Bŭlgariya)", prefix: "+359" },
    { code: "Schweiz", prefix: "+41" },
    { code: "Česká republika", prefix: "+420" },
    { code: "Deutschland", prefix: "+49" },
    { code: "Danmark", prefix: "+45" },
    { code: "Eesti", prefix: "+372" },
    { code: "España", prefix: "+34" },
    { code: "Suomi", prefix: "+358" },
    { code: "France", prefix: "+33" },
    { code: "United Kingdom", prefix: "+44" },
    { code: "Ελλάδα (Elláda)", prefix: "+30" },
    { code: "Hrvatska", prefix: "+385" },
    { code: "Magyarország", prefix: "+36" },
    { code: "Éire", prefix: "+353" },
    { code: "Italia", prefix: "+39" },
    { code: "Lietuva", prefix: "+370" },
    { code: "Latvija", prefix: "+371" },
    { code: "Nederland", prefix: "+31" },
    { code: "Norge", prefix: "+47" },
    { code: "Portugal", prefix: "+351" },
    { code: "România", prefix: "+40" },
    { code: "Россия (Rossiya)", prefix: "+7" },
    { code: "Sverige", prefix: "+46" },
    { code: "Slovenija", prefix: "+386" },
    { code: "Slovensko", prefix: "+421" },
    { code: "Україна (Ukrayina)", prefix: "+380" },
    { code: "United States", prefix: "+1" },
    {
      code: "الإمارات العربية المتحدة (Al-Imārāt al-ʿArabīyah al-Muttaḥidah)",
      prefix: "+971",
    },
    { code: "বাংলাদেশ (Bānglādesh)", prefix: "+880" },
    { code: "中国 (Zhōngguó)", prefix: "+86" },
    { code: "香港 (Xiānggǎng)", prefix: "+852" },
    { code: "Indonesia", prefix: "+62" },
    { code: "ישראל (Yisra'el)", prefix: "+972" },
    { code: "भारत (Bhārat)", prefix: "+91" },
    { code: "ایران (Īrān)", prefix: "+98" },
    { code: "日本 (Nihon)", prefix: "+81" },
    { code: "대한민국 (Daehan Minguk)", prefix: "+82" },
    { code: "Malaysia", prefix: "+60" },
    { code: "Pilipinas", prefix: "+63" },
    { code: "پاکستان (Pākistān)", prefix: "+92" },
    {
      code: "المملكة العربية السعودية (Al-Mamlakah al-ʿArabīyah as-Saʿūdīyah)",
      prefix: "+966",
    },
    { code: "Singapore", prefix: "+65" },
    { code: "ประเทศไทย (Prathet Thai)", prefix: "+66" },
    { code: "Türkiye", prefix: "+90" },
    { code: "臺灣 (Táiwān)", prefix: "+886" },
    { code: "Việt Nam", prefix: "+84" },
    // Możesz dodać więcej prefixów jeśli chcesz
  ];

  function handleCountryChange(e: Event) {
    const code = (e.target as HTMLSelectElement).value;
    const found = countryPrefixes.find((c) => c.code === code);
    phonePrefix = found ? found.prefix : "";
    formData.country = code;
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!formData.privacy) {
      submitMessage = "Musisz zaakceptować politykę prywatności.";
      return;
    }

    // Ensure message is set for recorded mode
    if (messageInputMode === "record" && !formData.message) {
      submitMessage = "Proszę nagrać wiadomość.";
      return;
    }

    isSubmitting = true;
    submitMessage = "";
    setTimeout(() => {
      isSubmitting = false;
      submitMessage = "Dziękujemy za wiadomość! Skontaktujemy się wkrótce.";
      formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
        country: "PL",
      };
      phonePrefix = "+48";
      messageInputMode = null; // Reset input mode after submission
      recordedFileName = "";
    }, 1000);
  };
</script>

<section class="contact-flex">
  <div class="contact-left no-sel" class:is-kontakt-page={isKontaktPage}>
    <h2>Masz pytania? Skontaktuj się z nami!</h2>
    <ul use:typoFixAction class="contact-bullets no-sel">
      <li>
        <span class="bullet"></span>
        Wypełnij formularz, a nasz doradca skontaktuje się z Tobą, by omówić szczegóły
        i przygotować indywidualną wycenę.
      </li>
      <li>
        <span class="bullet"></span>
        Nasz zespół ekspertów chętnie pomoże<br /> w doborze odpowiedniego urządzenia,
        przygotuje ofertę lub wyjaśni szczegóły techniczne.
      </li>
      <li>
        <span class="bullet"></span>
        Skorzystaj z bezpłatnej konsultacji<br /> – odpowiadamy szybko i
        rzeczowo,<br /> zazwyczaj w ciągu 24 godzin.
      </li>
    </ul>
    <div class="contact-info-block">
      <div class="info-row">
        <span class="info-icon"
          ><img src="assets/ikony/telefon.svg" alt="Telefon" /></span
        >
        <b
          ><a href="tel:+48 606 324 406" title="Zadzwoń do Certus"
            >+48 606 324 406</a
          ></b
        >
      </div>
      <div class="info-row">
        <span class="info-icon"
          ><img src="assets/ikony/email.svg" alt="Email" /></span
        >
        <b
          ><a href="mailto:biuro@mg-certus.pl" title="Wyślij e-mail do Certus"
            >biuro@mg-certus.pl</a
          ></b
        >
      </div>
      <div class="info-row">
        <span class="info-icon"
          ><img src="assets/ikony/lokalizacja.svg" alt="Lokalizacja" /></span
        >
        <b
          ><a
            href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            title="Otwórz lokalizację Certus w Google Maps"
            rel="noopener noreferrer"
            >Biała Droga 177, 34-123 Chocznia, woj. Małopolskie</a
          >
        </b>
      </div>
    </div>
    <div class="contact-social">
      <a
        href="https://m.facebook.com/CertusCNC/"
        aria-label="YouTube"
        class="social-icon"
        rel="nofollow noopener noreferrer"
      >
        <img src="assets/ikony/facebook.svg" alt="facebook" />
      </a>

      <a
        href="https://www.youtube.com/user/MGCERTUS/videos"
        aria-label="YouTube"
        class="social-icon"
        rel="nofollow noopener noreferrer"
      >
        <img src="assets/ikony/youtube.svg" alt="youtube" />
      </a>
    </div>
  </div>
  <div class="contact-right">
    <form class="contact-form" on:submit={handleSubmit} autocomplete="off">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Imię</label>
          <input
            id="firstName"
            type="text"
            placeholder="Imię"
            bind:value={formData.firstName}
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Nazwisko</label>
          <input
            id="lastName"
            type="text"
            placeholder="Nazwisko"
            bind:value={formData.lastName}
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          bind:value={formData.email}
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Numer telefonu</label>
        <div class="phone-row">
          <select
            bind:value={formData.country}
            on:change={handleCountryChange}
            class="country-select"
          >
            {#each countryPrefixes as c}
              <option value={c.code}>{c.code}</option>
            {/each}
          </select>
          <input
            id="phone"
            type="tel"
            placeholder=""
            bind:value={formData.phone}
            required
            pattern="[0-9\-\s\(\)]+"
          />
        </div>
      </div>
      {#if messageInputMode === null}
        <div class="message-mode-selection">
          <button on:click={selectTextInputMode} class="writeMessage" in:fade={{ }}>
            <img src="/assets/ikony/message.svg" alt="Wpisz wiadomość" />
          </button>

          <button on:click={selectRecordInputMode} class="recordMessage" in:fade={{ }}>
            <img src="/assets/ikony/record.svg" alt="Nagraj wiadomość" />
          </button>
        </div>
      {:else if messageInputMode === "text"}
        <div class="form-group">
          <label for="message">Wiadomość</label>
          <textarea
            id="message"
            placeholder="Wiadomość"
            rows="5"
            bind:value={formData.message}
            required
          ></textarea>
        </div>
      {:else if messageInputMode === "record"}
        <div class="form-group">
          <label for="message-voice">Wiadomość głosowa</label>
          {#if !isRecording && !recordedFileName}
            <CtaButton text="Rozpocznij nagrywanie" on:click={startRecording} />
          {:else if isRecording}
            <p>Nagrywanie... <span class="recording-indicator"></span></p>
            <CtaButton text="Zatrzymaj nagrywanie" on:click={stopRecording} />
          {:else if recordedFileName}
            <p>Nagrano: {recordedFileName}</p>
            <CtaButton
              text="Nagraj ponownie"
              on:click={selectRecordInputMode}
            />
          {/if}
        </div>
      {/if}
      <div class="form-group privacy-group checkbox-row no-sel">
        <input id="privacy" type="checkbox" bind:checked={formData.privacy} />
        <label for="privacy">Zgadzam się z polityką prywatności.</label>
      </div>
      <!--    <button type="submit" class="submit-btn" disabled={isSubmitting}>
        
      </button> -->
      <div class="text-left">
        <CtaButton
          text={isSubmitting ? "wysyłanie..." : "wyślij wiadomość"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
      {#if submitMessage}
        <div class="success-message">{submitMessage}</div>
      {/if}
    </form>
  </div>
</section>

<style lang="scss">
  .message-mode-selection {
    display: flex;
    transition: all ease 0.5s;
    button {
      display: flex;
      width: 50%;
      height: 120px;
      border: 1px solid var(--color-gray-200);
      border-radius: 6px;
      background-color: var(--color-bg-overlay);
      text-align: center;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      transition: all ease 0.5s;
      img {
        width: 30%;
        opacity: 0.5;
      }
      
    }
  }
  .message-mode-selection button:hover{

    border: 1px solid var(--color-primary-dark);


  }
  .country-select {
    max-width: 120px;
  }
  a:hover {
    color: var(--color-primary);
  }
  .form-group.privacy-group.checkbox-row {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;

    label {
      font-size: 12px;
    }
  }
  .contact-flex {
    display: flex;
    gap: 0px;
    box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    max-width: 1060px;
    margin: 126px auto;
    align-items: stretch;
  }
  .text-left {
    display: flex;
    text-align: left;
    width: 100%;
    align-content: end;
    flex-direction: row;
    justify-content: flex-end;
  }
  .contact-left:before {
    content: "";

    position: absolute;
    overflow: hidden;
    width: 110px;
    height: 110px;
    margin-left: -70px;
    margin-top: -74px;
    background: #ffffff;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    border-left: 2px solid rgb(255 255 255);
    border-top: 2px solid rgb(255, 255, 255);
    background-repeat: no-repeat;
  }

  .contact-left.is-kontakt-page:before {
    background: #f4f4f4; // Kolor dla strony kontakt
    border-left: none;
    border-top: none;
  }

  :global(.contact-flex .cta-button:hover) {
    width: 64%;
  }

  .contact-left {
    flex: 1.1;
    background: #232c32;
    color: #fff;
    border-radius: 20px 0px 0px 20px;
    padding: 40px 36px 32px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 340px;
    max-width: 480px;
    background-image: url(/assets/kontakt-background.jpg);
    background-size: cover;
  }
  .contact-left h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 32px;
    line-height: 1.2;
    color: white;
    max-width: 300px;
    left: -31px;
  }

  .contact-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
  }
  .contact-bullets li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 18px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-gray-200);
  }
  .bullet {
    width: 11px;
    height: 63px;
    background: var(--color-primary);
    border-radius: 0;
    margin-right: 16px;
    margin-top: 4px;
    flex-shrink: 0;
    position: relative;
  }
  .contact-info-block {
    margin: 32px 0 18px 0;
  }
  .info-row {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 10px;
    gap: 10px;
  }
  .info-icon {
    font-size: 1.2rem;
    margin-right: 6px;
  }
  .contact-social {
    display: flex;
    gap: 16px;
    margin-top: 18px;
  }
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #cddc39;
    border-radius: 50%;
    transition: background 0.2s;
    box-shadow: 0 2px 8px rgba(44, 90, 160, 0.08);
  }
  .social-icon:hover {
    background: #fff;
  }
  .contact-right {
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .contact-form {
    width: 100%;
    max-width: 480px;
    background: #fff;
    border-radius: 12px;
    padding: 36px 32px 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .form-row {
    display: flex;
    gap: 18px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 6px;
  }
  .form-group label {
    font-size: 0.98rem;
    color: #232c32;
    font-weight: 500;
  }
  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 12px 14px;
    border: 1.5px solid #e0e3e7;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    background: #f8f9fa;
    transition: border 0.2s;
  }
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border: 1.5px solid #cddc39;
  }
  .phone-row {
    display: flex;
    gap: 8px;
  }
  .phone-row select {
    min-width: 56px;
    background: #f8f9fa;
  }
  .checkbox-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .success-message {
    margin-top: 12px;
    padding: 12px;
    background: #eaf7d6;
    color: #3a5a1a;
    border-radius: 5px;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
  }

  .message-mode-selection {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .recording-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    .contact-flex {
      flex-direction: column;
      padding: 24px 6px;
      gap: 24px;
    }
    .contact-left,
    .contact-right {
      max-width: 100%;
      min-width: 0;
      padding: 24px 12px;
    }
    .contact-form {
      padding: 24px 10px;
    }
  }
</style>

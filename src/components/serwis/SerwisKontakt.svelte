<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../CtaButton.svelte";
  import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  
  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
    country: "PL",
    serviceType: "warranty", // Dodane pole specyficzne dla serwisu
  };
  let isSubmitting = false;
  let submitMessage = "";
  let phonePrefix = "+48";
  let messageInputMode: "text" | "record" | null = null;
  let isRecording = false;
  let recordedFileName = "";

  function selectTextInputMode() {
    messageInputMode = "text";
    isRecording = false;
    recordedFileName = "";
    formData.message = "";
  }

  function selectRecordInputMode() {
    messageInputMode = "record";
    isRecording = false;
    recordedFileName = "";
    formData.message = "";
  }

  function startRecording() {
    isRecording = true;
    recordedFileName = "";
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
    { code: "Deutschland", prefix: "+49" },
    { code: "Česká republika", prefix: "+420" },
    { code: "France", prefix: "+33" },
    { code: "United Kingdom", prefix: "+44" },
    { code: "Italia", prefix: "+39" },
    { code: "España", prefix: "+34" },
    { code: "Nederland", prefix: "+31" },
    { code: "United States", prefix: "+1" },
  ];

  function updatePhonePrefix() {
    const selectedCountry = countryPrefixes.find(c => c.code === formData.country);
    if (selectedCountry) {
      phonePrefix = selectedCountry.prefix;
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitMessage = "";

    try {
      // Symulacja wysyłania formularza
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      submitMessage = "Dziękujemy za kontakt! Nasz zespół serwisowy skontaktuje się z Tobą w ciągu 24 godzin.";
      
      // Reset formularza
      formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
        country: "PL",
        serviceType: "warranty",
      };
      messageInputMode = null;
      
    } catch (error) {
      submitMessage = "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.";
    } finally {
      isSubmitting = false;
    }
  }

  onMount(() => {
    updatePhonePrefix();
  });

  $: if (formData.country) {
    updatePhonePrefix();
  }
</script>

<section class="contact-flex">
  <div class="background">
    <div class="contact">
      <div class="contact-left no-sel serwis-contact-left">
        <h2>Potrzebujesz pomocy serwisowej?</h2>
        <ul use:typoFixAction class="contact-bullets no-sel">
          <li>
            <span class="bullet"></span>
            Wypełnij formularz, a nasz serwisant skontaktuje się z Tobą w ciągu 24 godzin
            i umówi wizytę lub udzieli pomocy zdalnej.
          </li>
          <li>
            <span class="bullet"></span>
            Nasz zespół serwisowy pracuje 7 dni w tygodniu<br /> 
            i jest gotowy pomóc w każdej sytuacji awaryjnej.
          </li>
          <li>
            <span class="bullet"></span>
            Oferujemy bezpłatną diagnostykę<br /> 
            oraz szybką wycenę naprawy<br /> 
            dla wszystkich maszyn CNC.
          </li>
        </ul>
        <div class="contact-info-block">
          <div class="info-row">
            <span class="info-icon">
              <img src="assets/ikony/telefon.svg" alt="Telefon serwisowy" />
            </span>
            <div>
              <b>
                <a href="tel:+48 606 324 406" title="Zadzwoń do serwisu Certus">
                  +48 606 324 406
                </a>
              </b>
              <small>Linia serwisowa 24/7</small>
            </div>
          </div>
          <div class="info-row">
            <span class="info-icon">
              <img src="assets/ikony/email.svg" alt="Email serwisowy" />
            </span>
            <div>
              <b>
                <a href="mailto:serwis@mg-certus.pl" title="Wyślij e-mail do serwisu">
                  serwis@mg-certus.pl
                </a>
              </b>
              <small>Zgłoszenia serwisowe</small>
            </div>
          </div>
          <div class="info-row">
            <span class="info-icon">
              <img src="assets/ikony/lokalizacja.svg" alt="Lokalizacja serwisu" />
            </span>
            <div>
              <b>
                <a
                  href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  title="Otwórz lokalizację serwisu w Google Maps"
                  rel="noopener noreferrer"
                >
                  Biała Droga 177, 34-123 Chocznia
                </a>
              </b>
              <small>Centrum serwisowe</small>
            </div>
          </div>
        </div>
        <div class="contact-social">
          <a
            href="https://m.facebook.com/CertusCNC/"
            aria-label="Facebook"
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
          <h3>Zgłoszenie serwisowe</h3>
          
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
              placeholder="twoj@email.com"
              bind:value={formData.email}
              required
            />
          </div>

          <div class="form-group">
            <label for="serviceType">Typ usługi serwisowej</label>
            <select
              id="serviceType"
              bind:value={formData.serviceType}
              required
            >
              <option value="warranty">Serwis gwarancyjny</option>
              <option value="post-warranty">Serwis pogwarancyjny</option>
              <option value="inspection">Przegląd techniczny</option>
              <option value="repair">Naprawa awaryjna</option>
              <option value="maintenance">Konserwacja</option>
              <option value="upgrade">Modernizacja</option>
              <option value="consultation">Konsultacja techniczna</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="country">Kraj</label>
              <select
                id="country"
                bind:value={formData.country}
                class="country-select"
              >
                {#each countryPrefixes as country}
                  <option value={country.code}>{country.code}</option>
                {/each}
              </select>
            </div>
            <div class="form-group">
              <label for="phone">Telefon</label>
              <div class="phone-row">
                <span class="phone-prefix">{phonePrefix}</span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="123 456 789"
                  bind:value={formData.phone}
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Opis problemu</label>
            {#if messageInputMode === null}
              <div class="message-mode-selection">
                <button type="button" on:click={selectTextInputMode}>
                  <img src="/assets/ikony/message.svg" alt="Wiadomość tekstowa" />
                  <span>Napisz wiadomość</span>
                </button>
                <button type="button" on:click={selectRecordInputMode}>
                  <img src="/assets/ikony/record.svg" alt="Wiadomość głosowa" />
                  <span>Nagraj wiadomość</span>
                </button>
              </div>
            {:else if messageInputMode === "text"}
              <textarea
                id="message"
                placeholder="Opisz problem z maszyną, objawy awarii, model urządzenia..."
                bind:value={formData.message}
                rows="4"
                required
              ></textarea>
              <button type="button" class="mode-switch" on:click={() => messageInputMode = null}>
                Zmień na nagranie głosowe
              </button>
            {:else if messageInputMode === "record"}
              <div class="voice-recording">
                {#if !isRecording && !recordedFileName}
                  <button type="button" class="record-btn" on:click={startRecording}>
                    <img src="assets/ikony/microphone.svg" alt="Mikrofon" />
                    Rozpocznij nagrywanie
                  </button>
                {:else if isRecording}
                  <div class="recording-indicator">
                    <div class="recording-dot"></div>
                    Nagrywanie... (3s)
                  </div>
                {:else if recordedFileName}
                  <div class="recorded-file">
                    <img src="assets/ikony/audio-file.svg" alt="Plik audio" />
                    <span>{recordedFileName}</span>
                    <button type="button" on:click={() => { recordedFileName = ""; formData.message = ""; }}>
                      Usuń
                    </button>
                  </div>
                {/if}
              </div>
              <button type="button" class="mode-switch" on:click={() => messageInputMode = null}>
                Zmień na wiadomość tekstową
              </button>
            {/if}
          </div>

          <div class="form-group privacy-group checkbox-row">
            <input
              id="privacy"
              type="checkbox"
              bind:checked={formData.privacy}
              required
            />
            <label for="privacy">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zgłoszenia serwisowego zgodnie z 
              <a href="/polityka-prywatnosci" target="_blank">polityką prywatności</a>.
            </label>
          </div>

          {#if submitMessage}
            <div class="submit-message" class:success={submitMessage.includes('Dziękujemy')} class:error={submitMessage.includes('błąd')}>
              {submitMessage}
            </div>
          {/if}

          <div class="text-left">
            <CtaButton 
              text={isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie serwisowe"} 
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  // Używamy wszystkich istniejących stylów z Section_Kontakt i dodajemy specyficzne dla serwisu
  
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
  
  .message-mode-selection button:hover {
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
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 60%,
      rgba(235, 235, 235, 1) 100%
    );
    height: auto;
    position: relative;
    top: 0px;
    padding-top: 5px;
    padding-bottom: 4px;
  }
  
  .contact-flex .background .contact {  
    display: flex;
    gap: 0px;
    box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    max-width: 1060px;
    margin: 126px auto;
    align-items: stretch;
    position: relative;
    background-color: white;
  }
  
  .contact-flex .background {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .text-left {
    display: flex;
    text-align: left;
    width: 100%;
    align-content: end;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  // Specyficzne style dla serwisu
  .serwis-contact-left {
    background-image: url(/assets/serwis-background.jpg); // Można dodać dedykowane tło
    
    h2 {
      color: white;
      font-size: 1.6rem;
      margin-bottom: 32px;
    }
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
    align-items: flex-start;
    font-size: 1rem;
    margin-bottom: 16px;
    gap: 10px;
    
    div {
      display: flex;
      flex-direction: column;
      
      small {
        color: #ccc;
        font-size: 0.85rem;
        margin-top: 2px;
      }
    }
  }
  
  .info-icon {
    font-size: 1.2rem;
    margin-right: 6px;
    margin-top: 4px;
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
    
    h3 {
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      margin-bottom: 20px;
      font-weight: 600;
      text-align: center;
    }
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
    align-items: center;
    
    .phone-prefix {
      background: #f8f9fa;
      border: 1.5px solid #e0e3e7;
      border-radius: 6px;
      padding: 12px 8px;
      font-size: 1rem;
      color: #666;
      min-width: 60px;
      text-align: center;
    }
  }
  
  .phone-row select {
    min-width: 56px;
    background: #f8f9fa;
  }
  
  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    
    input[type="checkbox"] {
      margin-top: 4px;
      flex-shrink: 0;
    }
    
    label {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
  
  // Specyficzne style dla serwisu
  .voice-recording {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px dashed #e0e3e7;
    border-radius: 8px;
    background: #f9fafb;
  }
  
  .record-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    
    &:hover {
      background: var(--color-primary-dark);
    }
    
    img {
      width: 20px;
      height: 20px;
    }
  }
  
  .recording-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #dc2626;
    font-weight: 600;
    
    .recording-dot {
      width: 12px;
      height: 12px;
      background: #dc2626;
      border-radius: 50%;
      animation: pulse 1s infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .recorded-file {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #e5f3ff;
    padding: 8px 12px;
    border-radius: 6px;
    
    img {
      width: 20px;
      height: 20px;
    }
    
    button {
      background: #dc2626;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
  
  .mode-switch {
    background: none;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
    margin-top: 8px;
    
    &:hover {
      background: var(--color-primary);
      color: white;
    }
  }
  
  .submit-message {
    padding: 12px;
    border-radius: 6px;
    font-weight: 500;
    text-align: center;
    
    &.success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #10b981;
    }
    
    &.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #ef4444;
    }
  }

  @media (max-width: 900px) {
    .contact-flex .background .contact {
      flex-direction: column;
      padding: 24px 6px;
      gap: 24px;
      margin: 60px auto;
    }
    
    .contact-left,
    .contact-right {
      max-width: 100%;
      min-width: 0;
      padding: 24px 12px;
    }
    
    .contact-left {
      border-radius: 20px 20px 0 0;
    }
    
    .form-row {
      flex-direction: column;
      gap: 12px;
    }
  }

  @media (max-width: 768px) {
    .contact-form {
      padding: 24px 20px;
      
      h3 {
        font-size: 1.25rem;
        margin-bottom: 16px;
      }
    }
    
    .form-group {
      gap: 4px;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
      padding: 10px 12px;
    }
    
    .contact-left h2 {
      font-size: 1.3rem;
    }
    
    .contact-bullets li {
      font-size: 0.9rem;
    }
  }
</style>
<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../CtaButton.svelte";
  import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  import axios from 'axios';
  import '$lib/styles/form-styles.scss';
  import { Turnstile } from 'svelte-turnstile';

  export let isKontaktPage = false;
  export let customTitle: string = "";
  export let customSubtitle: string = "";
  export let customBullets: string[] = [];

  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  };

  let isSubmitting = false;
  let submitMessage = "";
  let phonePrefix = "+48";
  let errors: Record<string, string> = {};
  let turnstileToken: string | null = null;
  let turnstileReset: (() => void) | undefined;

  // Audio recording state
  let messageInputMode: 'text' | 'record' | null = null;
  let isRecording = false;
  let recordingDuration = 0;
  let recordedFileName: string | null = null;
  let recordedFile: Blob | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  const countryPrefixes = [
    { code: "PL", name: "Polska", prefix: "+48" },
    { code: "AT", name: "Austria", prefix: "+43" },
    { code: "BE", name: "Belgia", prefix: "+32" },
    { code: "DE", name: "Niemcy", prefix: "+49" },
    { code: "CZ", name: "Czechy", prefix: "+420" },
    { code: "FR", name: "Francja", prefix: "+33" },
    { code: "GB", name: "Wielka Brytania", prefix: "+44" },
    { code: "IT", name: "Włochy", prefix: "+39" },
    { code: "ES", name: "Hiszpania", prefix: "+34" },
    { code: "NL", name: "Holandia", prefix: "+31" },
    { code: "US", name: "USA", prefix: "+1" },
  ];

  function handlePhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (value.startsWith('+')) {
      for (const country of countryPrefixes) {
        if (value.startsWith(country.prefix)) {
          phonePrefix = country.prefix;
          formData.phone = value.substring(country.prefix.length).trim();
          break;
        }
      }
    }
  }

  function handleCountryCodeInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    // If browser autofill dumps full number into prefix field, parse it
    for (const country of countryPrefixes) {
      if (val.startsWith(country.prefix)) {
        phonePrefix = country.prefix;
        formData.phone = val.substring(country.prefix.length).trim();
        return;
      }
    }
    // If it's just digits without +, it might be the full number — keep prefix, put digits in phone
    if (/^\d{7,}$/.test(val.replace(/[\s\-]/g, ''))) {
      formData.phone = val.trim();
      phonePrefix = "+48";
    }
  }

  // Validation functions
  function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email jest wymagany";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) return "Nieprawidłowy format email";
    if (email.length > 254) return "Email jest za długi (max 254 znaków)";
    return null;
  }

  function getPhoneMinLength(prefix: string): number {
    const lengths: Record<string, number> = {
      '+48': 9,
      '+43': 10,
      '+32': 9,
      '+49': 11,
      '+420': 9,
      '+33': 10,
      '+44': 10,
      '+39': 10,
      '+34': 9,
      '+31': 9,
      '+1': 10,
    };
    return lengths[prefix] || 9;
  }

  function getPhoneMaxLength(prefix: string): number {
    const lengths: Record<string, number> = {
      '+48': 9,
      '+43': 11,
      '+32': 9,
      '+49': 12,
      '+420': 9,
      '+33': 10,
      '+44': 11,
      '+39': 11,
      '+34': 9,
      '+31': 9,
      '+1': 10,
    };
    return lengths[prefix] || 12;
  }

  function validatePhone(phone: string): string | null {
    if (!phone.trim()) return "Telefon jest wymagany";
    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return "Numer telefonu może zawierać tylko cyfry, spacje i myślniki";
    }
    
    const minLength = getPhoneMinLength(phonePrefix);
    const maxLength = getPhoneMaxLength(phonePrefix);
    if (cleanPhone.length < minLength) {
      return `Numer jest za krótki (min ${minLength} cyfr dla ${phonePrefix})`;
    }
    if (cleanPhone.length > maxLength) {
      return `Numer jest za długi (max ${maxLength} cyfr dla ${phonePrefix})`;
    }
    
    return null;
  }

  function validateName(name: string, fieldName: string): string | null {
    if (!name.trim()) return `${fieldName} jest wymagane`;
    if (name.trim().length < 2) return `${fieldName} musi mieć co najmniej 2 znaki`;
    if (name.length > 50) return `${fieldName} jest za długie (max 50 znaków)`;
    return null;
  }

  function validateMessage(message: string): string | null {
    if (messageInputMode === 'text' && !message.trim()) return "Wiadomość jest wymagana";
    if (messageInputMode === 'text' && message.trim().length < 10) return "Wiadomość musi mieć co najmniej 10 znaków";
    if (messageInputMode === 'text' && message.length > 2000) return "Wiadomość jest za długa (max 2000 znaków)";
    if (messageInputMode === 'record' && !recordedFile) return "Nagraj wiadomość głosową lub wybierz wiadomość tekstową";
    return null;
  }

  function validateField(fieldName: string, value: any): string | null {
    switch (fieldName) {
      case 'firstName': return validateName(value, 'Imię');
      case 'lastName': return validateName(value, 'Nazwisko');
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value);
      case 'message': return validateMessage(value);
      case 'privacy': return value ? null : 'Musisz zaakceptować politykę prywatności';
      default: return null;
    }
  }

  function validateSingleField(fieldName: string) {
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    if (error) {
      errors = { ...errors, [fieldName]: error };
    } else {
      const { [fieldName]: removed, ...rest } = errors;
      errors = rest;
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'message', 'privacy'];
    
    for (const field of fieldsToValidate) {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
      }
    }
    
    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  // Audio recording functions
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        recordedFile = new Blob(audioChunks, { type: 'audio/wav' });
        recordedFileName = `nagranie-${new Date().toISOString()}.wav`;
        isRecording = false;
        validateSingleField('message');
      };
      mediaRecorder.start();
      isRecording = true;
      recordingDuration = 0;
      const timer = setInterval(() => {
        if (isRecording) {
          recordingDuration++;
        } else {
          clearInterval(timer);
        }
      }, 1000);
    } catch (err) {
      console.error("Recording error:", err);
      submitMessage = "Nie udało się rozpocząć nagrywania. Sprawdź uprawnienia do mikrofonu.";
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  function deleteRecording() {
    recordedFile = null;
    recordedFileName = null;
    recordingDuration = 0;
    validateSingleField('message');
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    submitMessage = "";

    if (!validate()) {
      console.log("❌ Validation failed:", errors);
      submitMessage = "Proszę poprawić błędy w formularzu.";
      return;
    }

    if (!turnstileToken) {
      submitMessage = "Weryfikacja zabezpieczeń nie powiodła się. Spróbuj ponownie za chwilę.";
      isSubmitting = false;
      return;
    }

    console.log("✅ Validation passed, sending data...");
    isSubmitting = true;

    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
        formDataToSend.append(key, String(formData[key as keyof typeof formData]));
    });
    
    const phoneWithPrefix = `${phonePrefix} ${formData.phone.trim()}`;
    formDataToSend.set('phone', phoneWithPrefix);

    formDataToSend.append('formType', 'main-kontakt');
    formDataToSend.append('timestamp', new Date().toISOString());
    formDataToSend.append('userAgent', navigator.userAgent);
    formDataToSend.append('cf-turnstile-response', turnstileToken);

    if (messageInputMode === 'record' && recordedFile) {
        formDataToSend.append('messageType', 'audio');
        formDataToSend.append('audio', recordedFile, recordedFileName || 'audio-message.wav');
        formDataToSend.delete('message');
    } else {
        formDataToSend.append('messageType', 'text');
    }

    try {
        const apiUrl = 'https://api.mg-certus.pl/sendEmail.php';
        
        console.log("📤 Sending to:", apiUrl);
        
        const response = await axios.post(apiUrl, formDataToSend, {
            headers: {
                // Axios will automatically set 'Content-Type': 'multipart/form-data'
            },
            timeout: 30000,
        });
      
      console.log("📬 Response received:", response.data);
      
      if (response.data.success) {
        submitMessage = response.data.message || 
          "Dziękujemy za kontakt! Nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.";
        
        formData = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          privacy: false,
        };
        phonePrefix = "+48";
        messageInputMode = null;
        recordedFile = null;
        recordedFileName = null;
        errors = {};
        turnstileReset?.();
        
      } else {
        submitMessage = response.data.message || "Wystąpił problem z wysyłaniem formularza.";
      }
      
    } catch (error) {
      turnstileReset?.();
      console.error('Błąd wysyłania formularza:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          submitMessage = "Timeout - spróbuj ponownie za chwilę.";
        } else if (error.response?.status === 413) {
          submitMessage = "Dane są za duże. Spróbuj skrócić wiadomość lub nagrać krótszy plik.";
        }
      } else {
        submitMessage = "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";
      }
    } finally {
      isSubmitting = false;
    }
  }

</script>

<section class="contact-flex">
 
  <div class="background">

<div class="contact">

  <div class="contact-left no-sel" class:is-kontakt-page={isKontaktPage}>
    {#if isKontaktPage}
      <h1 use:typoFixAction>{customTitle || "Masz pytania? Skontaktuj się z nami!"}</h1>
    {:else}
      <h2 use:typoFixAction>{customTitle || "Masz pytania? Skontaktuj się z nami!"}</h2>
    {/if}
    {#if customSubtitle}
      <p class="contact-custom-subtitle" use:typoFixAction>{customSubtitle}</p>
    {/if}
    <ul use:typoFixAction class="contact-bullets no-sel">
      {#if customBullets && customBullets.length > 0}
        {#each customBullets as bullet}
          <li>
            <span class="bullet"></span>
            <div class="bullet-content">
              {bullet}
            </div>
          </li>
        {/each}
      {:else}
        <li>
          <span class="bullet"></span>
          <div class="bullet-content">
            Wypełnij formularz, a nasz doradca skontaktuje się z Tobą, by omówić szczegóły
            i przygotować indywidualną wycenę.
          </div>
        </li>
        <li>
          <span class="bullet"></span>
          <div class="bullet-content">
            Nasz zespół ekspertów chętnie pomoże<br /> w doborze odpowiedniego urządzenia,
            przygotuje ofertę lub wyjaśni szczegóły techniczne.
          </div>
        </li>
        <li>
          <span class="bullet"></span>
          <div class="bullet-content">
            Skorzystaj z bezpłatnej konsultacji<br /> – odpowiadamy rzeczowo,<br /> z reguły w 1 dzień roboczy.
          </div>
        </li>
      {/if}
    </ul>
    <div class="contact-info-block">
      <div class="info-row">
        <span class="info-icon"
          ><img src="/assets/ikony/telefon.svg" alt="Telefon" width="24" height="24" loading="lazy" /></span
        >
        <b
          ><a href="tel:+48 606 324 406" title="Zadzwoń do Certus"
            >+48 606 324 406</a
          ></b
        >
      </div>
      <div class="info-row">
        <span class="info-icon"
          ><img src="/assets/ikony/email.svg" alt="Email" width="24" height="24" loading="lazy" /></span
        >
        <div>
          <b
            ><a href="mailto:biuro@mg-certus.pl" title="Wyślij e-mail do Certus"
              >biuro@mg-certus.pl</a
            ></b
          >
          <small class="email-routing-hint">Zapytania ofertowe: <a href="mailto:biuro@mg-certus.pl">biuro@mg-certus.pl</a> · Zgłoszenia serwisowe: <a href="mailto:kontakt@mg-certus.pl">kontakt@mg-certus.pl</a></small>
        </div>
      </div>
      <div class="info-row">
        <span class="info-icon"
          ><img src="/assets/ikony/lokalizacja.svg" alt="Lokalizacja" width="24" height="24" loading="lazy" /></span
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
        aria-label="Facebook"
        class="social-icon"
        rel="nofollow noopener noreferrer"
      >
        <img src="/assets/ikony/facebook.svg" alt="facebook" width="24" height="24" loading="lazy" />
      </a>

      <a
        href="https://www.youtube.com/user/MGCERTUS/videos"
        aria-label="YouTube"
        class="social-icon"
        rel="nofollow noopener noreferrer"
      >
        <img src="/assets/ikony/youtube.svg" alt="youtube" width="24" height="24" loading="lazy" />
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
            name="firstName"
            type="text"
            placeholder="Imię"
            bind:value={formData.firstName}
            class:error={errors.firstName}
            on:blur={() => validateSingleField('firstName')}
            on:input={() => validateSingleField('firstName')}
            maxlength="50"
            autocomplete="given-name"
            required
          />
          {#if errors.firstName}<span class="error-message">{errors.firstName}</span>{/if}
        </div>
        <div class="form-group">
          <label for="lastName">Nazwisko</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Nazwisko"
            bind:value={formData.lastName}
            class:error={errors.lastName}
            on:blur={() => validateSingleField('lastName')}
            on:input={() => validateSingleField('lastName')}
            maxlength="50"
            autocomplete="family-name"
            required
          />
          {#if errors.lastName}<span class="error-message">{errors.lastName}</span>{/if}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="twoj@email.com"
          bind:value={formData.email}
          class:error={errors.email}
          on:blur={() => validateSingleField('email')}
          on:input={() => validateSingleField('email')}
          maxlength="254"
          autocomplete="email"
          required
        />
        {#if errors.email}<span class="error-message">{errors.email}</span>{/if}
      </div>
      
      <div class="form-group phone-group">
        <label for="phone">Telefon</label>
        <div class="phone-input-wrapper">
          <input
            type="text"
            name="phoneCountryCode"
            bind:value={phonePrefix}
            class="country-code-input"
            autocomplete="tel-country-code"
            on:input={handleCountryCodeInput}
          />
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="123 456 789"
            bind:value={formData.phone}
            class:error={errors.phone}
            on:input={handlePhoneInput}
            on:blur={() => validateSingleField('phone')}
            required
            autocomplete="tel-national"
          />
        </div>
        {#if errors.phone}<span class="error-message">{errors.phone}</span>{/if}
      </div>

      <div class="form-group">
        <label for="message">Wiadomość</label>
        {#if messageInputMode === null}
          <div class="message-mode-selection">
            <button type="button" on:click={() => messageInputMode = 'text'}>
              <img
                src="/assets/ikony/message.svg"
                alt="Wiadomość tekstowa"
              />
              <span>Napisz wiadomość</span>
            </button>
            <button type="button" on:click={() => messageInputMode = 'record'}>
              <img src="/assets/ikony/record.svg" alt="Wiadomość głosowa" />
              <span>Nagraj wiadomość</span>
            </button>
          </div>
        {:else if messageInputMode === "text"}
          <textarea
            id="message"
            placeholder="Opisz swoje zapytanie, wymagania techniczne, potrzeby..."
            bind:value={formData.message}
            rows="4"
            on:blur={() => validateSingleField('message')}
            on:input={() => validateSingleField('message')}
            maxlength="2000"
            class:error={errors.message}
            required
          ></textarea>
          <div class="char-counter" style="color: {formData.message.length > 1800 ? '#ef4444' : formData.message.length > 1600 ? '#f59e0b' : '#6b7280'}">
            {2000 - formData.message.length} znaków pozostało
          </div>
          <button
            type="button"
            class="mode-switch"
            on:click={() => { messageInputMode = 'record'; formData.message = ''; validateSingleField('message'); }}
          >
            Zmień na nagranie głosowe
          </button>
        {:else if messageInputMode === "record"}
          <div class="voice-recording">
            {#if !isRecording && !recordedFileName}
              <div class="record-instructions">
                <img src="/assets/ikony/microphone.svg" alt="Mikrofon" />
                <p>Naciśnij przycisk i opisz swoje zapytanie</p>
                <small>Maksymalnie 3 minuty nagrania</small>
              </div>
              <button
                type="button"
                class="record-btn"
                on:click={startRecording}
              >
                <img src="/assets/ikony/microphone.svg" alt="Mikrofon" />
                Rozpocznij nagrywanie
              </button>
            {:else if isRecording}
              <div class="recording-indicator">
                <div class="recording-dot"></div>
                <div class="recording-info">
                  <span class="recording-text">Nagrywanie...</span>
                  <span class="recording-duration">{Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}</span>
                </div>
                <button
                  type="button"
                  class="stop-btn"
                  on:click={stopRecording}
                >
                  Zatrzymaj
                </button>
              </div>
            {:else if recordedFileName}
              <div class="recorded-file">
                <img src="/assets/ikony/audio-file.svg" alt="Plik audio" />
                <div class="file-info">
                  <span class="file-name">{recordedFileName}</span>
                  <small class="file-duration">{Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')} min</small>
                </div>
                <button
                  type="button"
                  class="delete-btn"
                  on:click={deleteRecording}
                  title="Usuń nagranie"
                >
                  ✕
                </button>
              </div>
            {/if}
          </div>
          <button
            type="button"
            class="mode-switch"
            on:click={() => { messageInputMode = 'text'; deleteRecording(); }}
          >
            Zmień na wiadomość tekstową
          </button>
        {/if}
        {#if errors.message}<span class="error-message">{errors.message}</span>{/if}
      </div>
      <div class="form-group privacy-group checkbox-row no-sel">
        <input 
          id="privacy" 
          type="checkbox" 
          bind:checked={formData.privacy}
          class:error={errors.privacy}
          on:change={() => validateSingleField('privacy')}
          required
        />
        <label for="privacy">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
          obsługi zapytania zgodnie z
          <a href="/polityka-prywatnosci" target="_blank">polityką prywatności</a>.
          {#if errors.privacy}<span class="error-message">{errors.privacy}</span>{/if}
        </label>
        
      </div>

      {#if submitMessage}
        <div
          class="submit-message"
          class:success={submitMessage.includes("Dziękujemy")}
          class:error={submitMessage.includes("błąd")}
        >
          {submitMessage}
        </div>
      {/if}

      

              <Turnstile siteKey="0x4AAAAAACEnWiyzZjf30AYU" theme="light" bind:reset={turnstileReset} on:callback={(e) => { turnstileToken = e.detail.token; }} on:expired={() => { turnstileToken = null; }} on:error={(e) => { turnstileToken = null; turnstileReset?.(); submitMessage = "Błąd weryfikacji. Odświeżam zabezpieczenie..."; console.error('Turnstile error:', e.detail.code); }} />

      <div class="text-left ctaButton">
        <CtaButton
          text={isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  </div>


</div>


</div>
</section>

<style lang="scss">
  a:hover {
    color: var(--color-primary);
  }

  .phone-group {
    .phone-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .country-code-input {
      flex-shrink: 0;
      width: 70px;
      padding: 12px 8px;
      // Add other styles to match your input fields
    }
    input[type="tel"] {
      flex-grow: 1;
    }
  }

  .contact-flex {
    /* background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 60%,
      rgba(235, 235, 235, 1) 100%
    ); */
    height: auto;
    position: relative;
    top: 0px;
 
  }

  .contact-flex .background .contact {  
    display: flex;
    gap: 0px;
    box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    max-width: 1060px;
    margin: 30px auto;
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
    background: #f7f7f7; // Kolor dla strony kontakt
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

  .contact-left h1,
  .contact-left h2 {
    font-weight: 600 !important;
    margin-bottom: 32px;
    line-height: 1.2;
    color: white !important;
    max-width: 300px;
    left: -31px;
  }

  .contact-custom-subtitle {
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-gray-200, #e2e8f0);
    margin: -10px 0 24px;
  }

  .contact-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
  }

  .contact-bullets li {
    display: flex;
    align-items: stretch;
    margin-bottom: 18px;
    line-height: 1.5;
    color: var(--color-gray-200);

    .bullet-content {
      flex: 1;
    }
  }

  .bullet {
    width: 11px;
    min-height: 22px;
    height: auto;
    background: var(--color-primary);
    border-radius: 0;
    margin-right: 16px;
    margin-top: 3px;
    margin-bottom: 3px;
    flex-shrink: 0;
    position: relative;
  }

  .contact-info-block {
    margin: 32px 0 18px 0;
    a{
      transition: all ease 0.3s;
    }
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 10px;

    b {
      color: #fff;
    }

    .email-routing-hint {
      display: block;
      color: #a0a0a0;
      font-size: 0.82rem;
      margin-top: 4px;
      line-height: 1.4;

      a {
        color: #b0bf1a;
        text-decoration: underline;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .info-icon {
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

  @media (max-width: 900px) {
    .contact-flex .background .contact {
      flex-direction: column;
      margin: 24px 6px 24px 6px !important;
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
  }

  @media (max-width: 768px) {
  }
</style>
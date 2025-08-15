<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../CtaButton.svelte";
  import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  import axios from 'axios';
  export let isKontaktPage = false;
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
  let messageInputMode: "text" | "record" | null = null;
  let isRecording = false;
  let recordedFileName = "";
  let audioBlob: Blob | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let recordingDuration = 0;
  let recordingTimer: number | null = null;
  let errors: Record<string, string> = {};

  function selectTextInputMode() {
    messageInputMode = "text";
    cleanupRecording();
    formData.message = "";
  }

  function selectRecordInputMode() {
    messageInputMode = "record";
    cleanupRecording();
    formData.message = "";
  }

  function cleanupRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    isRecording = false;
    recordedFileName = "";
    audioBlob = null;
    audioChunks = [];
    recordingDuration = 0;
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
  }

  async function startRecording() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Nagrywanie nie jest obsługiwane w tej przeglądarce');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      audioChunks = [];
      recordingDuration = 0;
      
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder?.mimeType || 'audio/webm';
        audioBlob = new Blob(audioChunks, { type: mimeType });
        
        const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
        recordedFileName = `wiadomosc_glosowa_${Date.now()}.${extension}`;
        formData.message = `Wiadomość głosowa (${Math.round(recordingDuration)}s) - ${recordedFileName}`;
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(1000);
      isRecording = true;
      
      recordingTimer = setInterval(() => {
        recordingDuration += 1;
        if (recordingDuration >= 180) {
          stopRecording();
        }
      }, 1000) as unknown as number;
      
    } catch (error) {
      console.error('Błąd podczas nagrywania:', error);
      submitMessage = error instanceof Error ? error.message : 'Nie udało się uzyskać dostępu do mikrofonu';
    }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
    
    isRecording = false;
  }

  function deleteRecording() {
    cleanupRecording();
    formData.message = "";
  }

  const countryPrefixes = [
    { code: "PL", name: "Polska", prefix: "+48", length: 9 },
    { code: "AT", name: "Austria", prefix: "+43", length: 11 },
    { code: "BE", name: "Belgia", prefix: "+32", length: 9 },
    { code: "DE", name: "Niemcy", prefix: "+49", length: 12 },
    { code: "CZ", name: "Czechy", prefix: "+420", length: 9 },
    { code: "FR", name: "Francja", prefix: "+33", length: 10 },
    { code: "GB", name: "Wielka Brytania", prefix: "+44", length: 11 },
    { code: "IT", name: "Włochy", prefix: "+39", length: 10 },
    { code: "ES", name: "Hiszpania", prefix: "+34", length: 9 },
    { code: "NL", name: "Holandia", prefix: "+31", length: 9 },
    { code: "US", name: "USA", prefix: "+1", length: 10 },
  ];

  function updatePhonePrefix() {
    const selectedCountry = countryPrefixes.find(
      (c) => c.code === formData.country
    );
    if (selectedCountry) {
      phonePrefix = selectedCountry.prefix;
    }
  }

  // Funkcje walidacji (skopiowane z SerwisKontakt)
  function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email jest wymagany";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) return "Nieprawidłowy format email";
    if (email.length > 254) return "Email jest za długi (max 254 znaków)";
    return null;
  }

  function validatePhone(phone: string, countryCode: string): string | null {
    if (!phone.trim()) return "Telefon jest wymagany";
    
    const country = countryPrefixes.find(c => c.code === countryCode);
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (!/^\d+$/.test(cleanPhone)) {
      return "Numer telefonu może zawierać tylko cyfry";
    }
    
    if (country && cleanPhone.length !== country.length) {
      return `Numer telefonu dla ${country.name} musi mieć ${country.length} cyfr`;
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
    if (!message.trim()) return "Wiadomość jest wymagana";
    if (message.trim().length < 10) return "Wiadomość musi mieć co najmniej 10 znaków";
    if (message.length > 2000) return "Wiadomość jest za długa (max 2000 znaków)";
    return null;
  }

  function validateField(fieldName: string, value: any): string | null {
    switch (fieldName) {
      case 'firstName': return validateName(value, 'Imię');
      case 'lastName': return validateName(value, 'Nazwisko');
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value, formData.country);
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

  async function handleSubmit(event: Event) {
    event.preventDefault();
    console.log("🚀 Kontakt form submitted!", { formData, errors });
    submitMessage = "";

    if (!validate()) {
      console.log("❌ Validation failed:", errors);
      submitMessage = "Proszę poprawić błędy w formularzu.";
      return;
    }

    console.log("✅ Validation passed, sending data...");
    isSubmitting = true;

    try {
      const formDataToSend = new FormData();
      
      // Dodaj podstawowe dane formularza
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', `${phonePrefix} ${formData.phone.trim()}`);
      formDataToSend.append('serviceType', 'consultation'); // Domyślny typ dla kontaktu głównego
      formDataToSend.append('country', formData.country);
      formDataToSend.append('messageType', messageInputMode || 'text');
      
      // Dodaj wiadomość lub plik audio
      if (messageInputMode === 'record' && audioBlob) {
        formDataToSend.append('audioMessage', audioBlob, recordedFileName);
        formDataToSend.append('message', `Wiadomość głosowa (${Math.round(recordingDuration)}s)`);
      } else {
        formDataToSend.append('message', formData.message.trim());
      }
      
      // Dodaj metadane
      formDataToSend.append('timestamp', new Date().toISOString());
      formDataToSend.append('userAgent', navigator.userAgent);
      formDataToSend.append('formType', 'main-kontakt');
      
      // Endpoint - serwis-kontakt.php obsługuje oba formularze
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:8000/api/serwis-kontakt.php'
        : '/api/serwis-kontakt.php';
        
      console.log("📤 Sending to:", apiUrl);
      console.log("📦 FormData contents:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`  ${key}:`, value);
      }
        
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });
      
      console.log("📬 Response received:", response.data);
      
      if (response.data.success) {
        submitMessage = response.data.message || 
          "Dziękujemy za kontakt! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.";
        
        // Reset formularza przy sukcesie
        formData = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          privacy: false,
          country: "PL",
        };
        messageInputMode = null;
        cleanupRecording();
        
      } else {
        submitMessage = response.data.message || "Wystąpił problem z wysyłaniem formularza.";
      }
      
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          submitMessage = "Timeout - spróbuj ponownie za chwilę.";
        } else if (error.response?.status === 413) {
          submitMessage = "Plik audio jest za duży. Spróbuj nagrać krótszą wiadomość.";
        } else if (error.response?.status >= 500) {
          submitMessage = "Problem z serwerem. Spróbuj ponownie za chwilę.";
        } else {
          submitMessage = error.response?.data?.message || "Wystąpił błąd podczas wysyłania.";
        }
      } else {
        submitMessage = "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";
      }
    } finally {
      isSubmitting = false;
    }
  }

  onMount(() => {
    updatePhonePrefix();
  });

  $: if (formData.country) {
    updatePhonePrefix();
    if (formData.phone.trim()) {
      validateSingleField('phone');
    }
  }
</script>

<section class="contact-flex">
 
  <div class="background">

<div class="contact">

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
            class:error={errors.firstName}
            on:blur={() => validateSingleField('firstName')}
            on:input={() => validateSingleField('firstName')}
            maxlength="50"
            required
          />
          {#if errors.firstName}<span class="error-message">{errors.firstName}</span>{/if}
        </div>
        <div class="form-group">
          <label for="lastName">Nazwisko</label>
          <input
            id="lastName"
            type="text"
            placeholder="Nazwisko"
            bind:value={formData.lastName}
            class:error={errors.lastName}
            on:blur={() => validateSingleField('lastName')}
            on:input={() => validateSingleField('lastName')}
            maxlength="50"
            required
          />
          {#if errors.lastName}<span class="error-message">{errors.lastName}</span>{/if}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="twoj@email.com"
          bind:value={formData.email}
          class:error={errors.email}
          on:blur={() => validateSingleField('email')}
          on:input={() => validateSingleField('email')}
          maxlength="254"
          required
        />
        {#if errors.email}<span class="error-message">{errors.email}</span>{/if}
      </div>
      <div class="form-group">
        <label for="phone">Numer telefonu</label>
        <div class="phone-row">
          <span class="phone-prefix">{phonePrefix}</span>
          <select
            bind:value={formData.country}
            class="country-select"
          >
            {#each countryPrefixes as country}
              <option value={country.code}>{country.name}</option>
            {/each}
          </select>
          <input
            id="phone"
            type="tel"
            placeholder="123 456 789"
            bind:value={formData.phone}
            class:error={errors.phone}
            on:blur={() => validateSingleField('phone')}
            on:input={() => validateSingleField('phone')}
            required
          />
          {#if errors.phone}<span class="error-message">{errors.phone}</span>{/if}
        </div>
      </div>
      <div class="form-group">
        <label for="message">Wiadomość</label>
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
            on:click={() => (messageInputMode = null)}
          >
            Zmień na nagranie głosowe
          </button>
        {:else if messageInputMode === "record"}
          <div class="voice-recording">
            {#if !isRecording && !recordedFileName}
              <div class="record-instructions">
                <img src="assets/ikony/record.svg" alt="Mikrofon" />
                <p>Naciśnij przycisk i opisz swoje zapytanie głosowo</p>
                <small>Maksymalnie 3 minuty nagrania</small>
              </div>
              <button
                type="button"
                class="record-btn"
                on:click={startRecording}
              >
                <img src="assets/ikony/record.svg" alt="Mikrofon" />
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
                <img src="assets/ikony/audio-file.svg" alt="Plik audio" />
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
            on:click={() => (messageInputMode = null)}
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
        </label>
        {#if errors.privacy}<span class="error-message">{errors.privacy}</span>{/if}
      </div>

      {#if submitMessage}
        <div
          class="submit-message"
          class:success={submitMessage.includes("Dziękujemy")}
          class:error={submitMessage.includes("błąd") || submitMessage.includes("Error")}
        >
          {submitMessage}
        </div>
      {/if}

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
  .contact-flex{
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
  .contact-flex .background .contact{  
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
    color: white !important;
    font-weight: 600;
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
    .contact-flex .background .contact {
      flex-direction: column !important;
      margin: 60px auto;
      
      max-width: 100%;
      gap: 0px;
    }
    .contact-flex .background{
      padding: 0px 2em;
      padding-bottom: 3em;
      
      
      button{
img{    width: 3rem;
}
    
      }

    }
    .contact-left {
      border-radius: 20px 20px 0px 0px !important;
      min-width: 100% !important;
      max-width: 100% !important;
      padding: 30px 24px;
    }
    
    .contact-right {
      min-width: 100% !important;
      max-width: 100% !important;
      flex: 1;
    }
    
    .contact-form {
      padding: 30px 24px;
      border-radius: 0px 0px 20px 20px !important;
    }
    
    .contact-left:before {
      display: none; // Ukrywa trójkąt na małych ekranach
    }
  }
  
  @media (max-width: 600px) {
    .contact-flex {
      padding: 0px 15px;
    }
    
    .contact-flex .background .contact {
      margin: 40px auto;
      border-radius: 12px;
    }
    
    .contact-left {
      border-radius: 12px 12px 0px 0px !important;
      padding: 24px 20px;
    }
    
    .contact-left h2 {
      font-size: 1.3rem;
      margin-bottom: 24px;
    }
    
    .contact-bullets li {
      font-size: 0.9rem;
      margin-bottom: 16px;
    }
    
    .contact-form {
      padding: 24px 20px;
      border-radius: 0px 0px 12px 12px !important;
    }
    
    .form-row {
      flex-direction: column;
      gap: 12px;
    }
    
    .message-mode-selection {
      flex-direction: column;
      
      button {
        width: 100%;
        height: 80px;
      }
    }
  }

  // Nowe styles dla live validation i audio recording (ujednolicone z SerwisKontakt)
  .error-message {
    display: block;
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 4px;
    font-weight: 500;
  }
  
  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #ef4444;
    background-color: #fef2f2;
  }

  .char-counter {
    font-size: 0.75rem;
    text-align: right;
    margin-top: 4px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  // Style dla phone prefix
  .phone-prefix {
    background: #f9fafb;
    border: 1px solid #e0e3e7;
    border-right: none;
    border-radius: 6px 0 0 6px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #6b7280;
    min-width: 60px;
  }

  .phone-row {
    display: flex;
    align-items: stretch;
  }

  .phone-row input {
    border-radius: 0 6px 6px 0 !important;
    flex: 1;
  }

  .phone-row select {
    border-radius: 0 !important;
    border-left: none;
    border-right: none;
    min-width: 120px;
  }

  // Enhanced focus states
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border: 1.5px solid #cddc39;
    background-color: #ffffff;
  }

  .form-group input:valid:not(.error),
  .form-group textarea:valid:not(.error),
  .form-group select:valid:not(.error) {
    border-color: #10b981;
  }

  // Voice recording styles (skopiowane z SerwisKontakt)
  .voice-recording {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px dashed #e0e3e7;
    border-radius: 8px;
    background: #f9fafb;
    gap: 16px;
  }

  .record-instructions {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #6b7280;

    img {
      width: 40px;
      height: 40px;
      opacity: 0.6;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 500;
    }

    small {
      font-size: 0.75rem;
      color: #9ca3af;
    }
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
    transition: all 0.2s;

    &:hover {
      background: var(--color-primary-dark);
      transform: scale(1.02);
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .recording-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: #dc2626;
    font-weight: 600;
    padding: 20px;

    .recording-dot {
      width: 16px;
      height: 16px;
      background: #dc2626;
      border-radius: 50%;
      animation: pulse 1s infinite;
    }

    .recording-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .recording-text {
        font-size: 1rem;
      }

      .recording-duration {
        font-size: 1.5rem;
        font-family: monospace;
        color: #991b1b;
      }
    }

    .stop-btn {
      background: #dc2626;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #991b1b;
      }
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .recorded-file {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #dcfce7;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #bbf7d0;
    width: 100%;
    max-width: 400px;

    img {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .file-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .file-name {
        font-size: 0.85rem;
        font-weight: 500;
        color: #047857;
      }

      .file-duration {
        font-size: 0.75rem;
        color: #059669;
        font-family: monospace;
      }
    }

    .delete-btn {
      background: #ef4444;
      color: white;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s;

      &:hover {
        background: #dc2626;
      }
    }
  }

  .mode-switch {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;

    &:hover {
      background: var(--color-primary);
      color: white;
    }
  }

  // Submit message styles
  .submit-message {
    margin: 16px 0;
    padding: 12px 16px;
    border-radius: 6px;
    font-weight: 500;

    &.success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    &.error {
      background: #fee2e2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
  }

  // Message mode selection improvements
  .message-mode-selection {
    display: flex;
    gap: 12px;
    margin: 16px 0;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex: 1;
      padding: 16px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: var(--color-primary);
        background: #f0f9ff;
      }

      img {
        width: 32px;
        height: 32px;
        opacity: 0.7;
      }

      span {
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
      }
    }
  }
</style>

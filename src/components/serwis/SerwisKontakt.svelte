<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../CtaButton.svelte";
  import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  import axios from 'axios';
  import '$lib/styles/form-styles.scss';

  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
    serviceType: "warranty", // Dodane pole specyficzne dla serwisu
  };
  let isSubmitting = false;
  let submitMessage = "";
  let phonePrefix = "+48";
  let turnstileToken: string | null = null;

  // Global callback for Turnstile
  // This function needs to be globally accessible, so it's attached to window.
  // Turnstile will call this function when it successfully verifies the user.
  onMount(() => {
    (window as any).onTurnstileSuccessSerwis = (token: string) => {
      turnstileToken = token;
    };
    (window as any).onTurnstileExpiredSerwis = () => {
      turnstileToken = null;
    };
    (window as any).onTurnstileErrorSerwis = (err?: any) => {
      // Cloudflare error 300030 lub inne błędy klienta
      turnstileToken = null;
      submitMessage = "Błąd weryfikacji. Odświeżam zabezpieczenie...";
      // Reset wszystkich widżetów na stronie (auto-render)
      (window as any).turnstile?.reset();
    };
  });

  let messageInputMode: 'text' | 'record' | null = null;
  let isRecording = false;
  let recordingDuration = 0;
  let recordedFileName: string | null = null;
  let recordedFile: Blob | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  

  let errors: Record<string, string> = {};

  function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email jest wymagany";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return "Nieprawidłowy format email";
    }
    if (email.length > 254) return "Email jest za długi (max 254 znaków)";
    return null;
  }

  function validatePhone(phone: string): string | null {
    if (!phone.trim()) return "Telefon jest wymagany";
    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return "Numer telefonu może zawierać tylko cyfry, spacje i myślniki";
    }
    // General phone number length validation (e.g., 7 to 15 digits)
    const minLength = 7;
    const maxLength = 15;
    if (cleanPhone.length < minLength) {
      return `Numer jest za krótki (min ${minLength} cyfr)`;
    }
    if (cleanPhone.length > maxLength) {
      return `Numer jest za długi (max ${maxLength} cyfr)`;
    }
    return null;
  }

  function validateField(fieldName: string, value: any): string | null {
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) return "Imię jest wymagane";
        if (value.trim().length < 2) return "Imię musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50) return "Imię jest za długie (max 50 znaków)";
        return null;
      case 'lastName':
        if (!value.trim()) return "Nazwisko jest wymagane";
        if (value.trim().length < 2) return "Nazwisko musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50) return "Nazwisko jest za długie (max 50 znaków)";
        return null;
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'serviceType':
        if (!value) return "Wybierz rodzaj usługi serwisowej";
        return null;
      case 'message':
        if (messageInputMode === 'text' && !value.trim()) return "Opis problemu jest wymagany";
        if (messageInputMode === 'text' && value.trim().length < 10) return "Opis musi mieć co najmniej 10 znaków";
        if (messageInputMode === 'text' && value.trim().length > 2000) return "Opis jest za długi (max 2000 znaków)";
        if (messageInputMode === 'record' && !recordedFile) return "Nagraj wiadomość głosową";
        return null;
      case 'privacy':
        if (!value) return "Zgoda na przetwarzanie danych jest wymagana";
        return null;
      default:
        return null;
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

  function getRemainingChars(text: string, maxLength: number): number {
    return maxLength - text.length;
  }

  function getCharCountColor(text: string, maxLength: number): string {
    const remaining = getRemainingChars(text, maxLength);
    if (remaining < 50) return '#ef4444';
    if (remaining < 200) return '#f59e0b';
    return '#6b7280';
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(fieldName => {
      if (fieldName === 'country') return;
      const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    errors = newErrors;
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    submitMessage = "";

    if (!validate()) {
      submitMessage = "Proszę poprawić błędy w formularzu.";
      return;
    }

    if (!turnstileToken) {
      submitMessage = "Weryfikacja zabezpieczeń nie powiodła się. Odśwież stronę i spróbuj ponownie.";
      isSubmitting = false;
      return;
    }

    isSubmitting = true;

    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
    });

    formDataToSend.append('cf-turnstile-response', turnstileToken);

    if (messageInputMode === 'record' && recordedFile) {
        formDataToSend.append('messageType', 'audio');
        formDataToSend.append('audio', recordedFile, recordedFileName || 'audio-message.wav');
    } else {
        formDataToSend.append('messageType', 'text');
    }

    formDataToSend.append('formType', 'serwis-kontakt');

    try {
        const apiUrl = 'https://dm73147.domenomania.eu/api/send-email.php';
        const response = await axios.post(apiUrl, formDataToSend, {
            // Do not set 'Content-Type' manually; Axios will add proper multipart boundary
            timeout: 30000,
        });

      if (response.data.success) {
        submitMessage = response.data.message || "Dziękujemy za kontakt! Nasz zespół serwisowy skontaktuje się z Tobą w ciągu 24 godzin.";
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
        recordedFile = null;
        recordedFileName = null;
      } else {
        submitMessage = response.data.message || "Wystąpił problem z wysyłaniem formularza.";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          submitMessage = "Timeout - spróbuj ponownie za chwilę.";
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
            Wypełnij formularz, a nasz serwisant skontaktuje się z Tobą w ciągu 24
            godzin i umówi wizytę lub udzieli pomocy zdalnej.
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
              <img src="/assets/ikony/telefon.svg" alt="Telefon serwisowy" />
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
              <img src="/assets/ikony/email.svg" alt="Email serwisowy" />
            </span>
            <div>
              <b>
                <a
                  href="mailto:serwis@mg-certus.pl"
                  title="Wyślij e-mail do serwisu"
                >
                  serwis@mg-certus.pl
                </a>
              </b>
              <small>Zgłoszenia serwisowe</small>
            </div>
          </div>
          <div class="info-row">
            <span class="info-icon">
              <img
                src="/assets/ikony/lokalizacja.svg"
                alt="Lokalizacja serwisu"
              />
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
            <img src="/assets/ikony/facebook.svg" alt="facebook" />
          </a>
          <a
            href="https://www.youtube.com/user/MGCERTUS/videos"
            aria-label="YouTube"
            class="social-icon"
            rel="nofollow noopener noreferrer"
          >
            <img src="/assets/ikony/youtube.svg" alt="youtube" />
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
            <label for="serviceType">Typ usługi serwisowej</label>
            <select id="serviceType" bind:value={formData.serviceType} class:error={errors.serviceType} on:change={() => validateSingleField('serviceType')} required>
              <option value="warranty">Serwis gwarancyjny</option>
              <option value="post-warranty">Serwis pogwarancyjny</option>
              <option value="inspection">Przegląd techniczny</option>
              <option value="repair">Naprawa awaryjna</option>
              <option value="maintenance">Konserwacja</option>
              <option value="upgrade">Modernizacja</option>
              <option value="consultation">Konsultacja techniczna</option>
            </select>
            {#if errors.serviceType}<span class="error-message">{errors.serviceType}</span>{/if}
          </div>

          <div class="form-row">
            <div class="form-group">
            <label for="phone">Telefon</label>
            <input
              id="phone"
              type="tel"
              placeholder="+48 123 456 789 (z numerem kierunkowym)"
              bind:value={formData.phone}
              class:error={errors.phone}
              on:blur={() => validateSingleField('phone')}
              on:input={() => validateSingleField('phone')}
              required
              autocomplete="tel"
            />
            {#if errors.phone}<span class="error-message">{errors.phone}</span>{/if}
          </div>
          </div>

          <div class="form-group">
            <label for="message">Opis problemu</label>
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
                placeholder="Opisz problem z maszyną, objawy awarii, model urządzenia..."
                bind:value={formData.message}
                rows="4"
                on:blur={() => validateSingleField('message')}
                on:input={() => validateSingleField('message')}
                maxlength="2000"
                required
              ></textarea>
              <div class="char-counter" style="color: {getCharCountColor(formData.message, 2000)}">
                {getRemainingChars(formData.message, 2000)} znaków pozostało
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
                    <img src="/assets/ikony/microphone.svg" alt="Mikrofon" />
                    <p>Naciśnij przycisk i opisz problem głosowo</p>
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
                on:click={() => (messageInputMode = null)}
              >
                Zmień na wiadomość tekstową
              </button>
            {/if}
            {#if errors.message}<span class="error-message">{errors.message}</span>{/if}
          </div>

          <div class="form-group privacy-group checkbox-row">
            <input
              id="privacy"
              type="checkbox"
              bind:checked={formData.privacy}
              on:change={() => validateSingleField('privacy')}
              required
            />
            <label for="privacy">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
              obsługi zgłoszenia serwisowego zgodnie z
              <a href="/polityka-prywatnosci" target="_blank"
                >polityką prywatności</a
              >.
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





          

          <div class="cf-turnstile" data-sitekey="0x4AAAAAABs8xaWAuEhKPhWB" data-callback="onTurnstileSuccessSerwis" data-expired-callback="onTurnstileExpiredSerwis" data-error-callback="onTurnstileErrorSerwis"></div> <!-- Turnstile widget -->

          <div class="text-left ctaButton">
            <CtaButton
              text={isSubmitting
                ? "Wysyłanie..."
                : "Wyślij zgłoszenie serwisowe"}
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

  :global(.recorded-file){
    color: var(--color-text-secondary) !important;
    font-size: 0.8rem;
  }
  :global(.ctaButton button span.text-container){
    text-align: left;
    span{
      text-align: left;
    }
  }
  #serviceType {
    color: var(--color-text-secondary) !important;
  }

  #phone{
   /*  width: auto;
    max-width: 50%; */
  }

  .country-select input{
    color: var(--color-text-secondary) !important;
  }

  a:hover {
    color: var(--color-primary);
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

  .serwis-contact-left {
    background-image: url(/assets/serwis-background.jpg); 

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
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    margin-bottom: 32px;
    line-height: 1.2;
    color: white !important;
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

  .contact-form h3 {
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      margin-bottom: 20px;
      font-weight: 600;
      text-align: center;
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
  }

  @media (max-width: 768px) {
    .contact-form h3 {
        font-size: 1.25rem;
        margin-bottom: 16px;
    }

    .contact-left h2 {
      font-size: 1.3rem;
    }

    .contact-bullets li {
      font-size: 0.9rem;
    }
  }

  #country {
    color: var(--color-text-secondary) !important;
  }

</style>
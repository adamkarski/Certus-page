<script lang="ts">
  import { onMount } from "svelte";
  import CtaButton from "../CtaButton.svelte";
  import { fade } from "svelte/transition";
  import { typoFixAction } from "$lib/utils/typography";
  import axios from 'axios';

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
  let audioBlob: Blob | null = null;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let recordingDuration = 0;
  let recordingTimer: number | null = null;

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
      // Sprawdź czy przeglądarka obsługuje MediaRecorder
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
        
        // Zatrzymaj wszystkie ścieżki audio
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(1000); // Zbieraj dane co sekundę
      isRecording = true;
      
      // Timer do zliczania czasu
      recordingTimer = setInterval(() => {
        recordingDuration += 1;
        
        // Automatycznie zatrzymaj po 3 minutach (180s)
        if (recordingDuration >= 180) {
          stopRecording();
        }
      }, 1000);
      
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

  function updatePhonePrefix() {
    const selectedCountry = countryPrefixes.find(
      (c) => c.code === formData.country
    );
    if (selectedCountry) {
      phonePrefix = selectedCountry.prefix;
    }
  }

  let errors: Record<string, string> = {};

  // Ulepszone funkcje walidacyjne
  function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email jest wymagany";
    
    // Bardziej precyzyjna regex dla email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return "Nieprawidłowy format email";
    }
    
    if (email.length > 254) return "Email jest za długi (max 254 znaków)";
    return null;
  }

  function validatePhone(phone: string): string | null {
    if (!phone.trim()) return "Telefon jest wymagany";
    
    // Usuń spacje i myślniki dla walidacji
    const cleanPhone = phone.replace(/[\s\-]/g, '');
    
    // Sprawdź czy zawiera tylko cyfry
    if (!/^\d+$/.test(cleanPhone)) {
      return "Numer telefonu może zawierać tylko cyfry, spacje i myślniki";
    }
    
    // Sprawdź długość w zależności od kraju
    const selectedCountry = countryPrefixes.find(c => c.code === formData.country);
    if (selectedCountry) {
      const minLength = getPhoneMinLength(selectedCountry.prefix);
      const maxLength = getPhoneMaxLength(selectedCountry.prefix);
      
      if (cleanPhone.length < minLength) {
        return `Numer jest za krótki (min ${minLength} cyfr dla ${selectedCountry.code})`;
      }
      if (cleanPhone.length > maxLength) {
        return `Numer jest za długi (max ${maxLength} cyfr dla ${selectedCountry.code})`;
      }
    }
    
    return null;
  }

  function getPhoneMinLength(prefix: string): number {
    const lengths: Record<string, number> = {
      '+48': 9,   // Polska
      '+43': 10,  // Austria
      '+32': 9,   // Belgia
      '+49': 11,  // Niemcy
      '+420': 9,  // Czechy
      '+33': 10,  // Francja
      '+44': 10,  // UK
      '+39': 10,  // Włochy
      '+34': 9,   // Hiszpania
      '+31': 9,   // Holandia
      '+1': 10,   // USA
    };
    return lengths[prefix] || 9;
  }

  function getPhoneMaxLength(prefix: string): number {
    const lengths: Record<string, number> = {
      '+48': 9,   // Polska
      '+43': 11,  // Austria
      '+32': 9,   // Belgia
      '+49': 12,  // Niemcy
      '+420': 9,  // Czechy
      '+33': 10,  // Francja
      '+44': 11,  // UK
      '+39': 11,  // Włochy
      '+34': 9,   // Hiszpania
      '+31': 9,   // Holandia
      '+1': 10,   // USA
    };
    return lengths[prefix] || 12;
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
        if (!value.trim()) return "Opis problemu jest wymagany";
        if (value.trim().length < 10) return "Opis musi mieć co najmniej 10 znaków";
        if (value.trim().length > 2000) return "Opis jest za długi (max 2000 znaków)";
        return null;
      
      case 'privacy':
        if (!value) return "Zgoda na przetwarzanie danych jest wymagana";
        return null;
      
      default:
        return null;
    }
  }

  // Live validation - walidacja pojedynczego pola
  function validateSingleField(fieldName: string) {
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    if (error) {
      errors = { ...errors, [fieldName]: error };
    } else {
      const { [fieldName]: removed, ...rest } = errors;
      errors = rest;
    }
  }

  // Funkcje pomocnicze dla UI
  function getRemainingChars(text: string, maxLength: number): number {
    return maxLength - text.length;
  }

  function getCharCountColor(text: string, maxLength: number): string {
    const remaining = getRemainingChars(text, maxLength);
    if (remaining < 50) return '#ef4444'; // czerwony
    if (remaining < 200) return '#f59e0b'; // pomarańczowy
    return '#6b7280'; // szary
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    
    // Walidacja wszystkich pól
    Object.keys(formData).forEach(fieldName => {
      if (fieldName === 'country') return; // Kraj nie wymaga walidacji
      
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
    console.log("🚀 Form submitted!", { formData, errors });
    submitMessage = "";

    if (!validate()) {
      console.log("❌ Validation failed:", errors);
      submitMessage = "Proszę poprawić błędy w formularzu.";
      return;
    }

    console.log("✅ Validation passed, sending data...");
    isSubmitting = true;

    try {
      // Przygotuj dane do wysłania
      const formDataToSend = new FormData();
      
      // Dodaj podstawowe dane formularza
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', `${phonePrefix} ${formData.phone.trim()}`);
      formDataToSend.append('serviceType', formData.serviceType);
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
      formDataToSend.append('formType', 'serwis-kontakt');
      
      // Wyślij dane do PHP endpoint
      // Dla development używaj localhost:8000, dla production relatywny URL
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
        timeout: 30000, // 30s timeout
      });
      
      console.log("📬 Response received:", response.data);
      
      // Sprawdź odpowiedź
      if (response.data.success) {
        submitMessage = response.data.message || 
          "Dziękujemy za kontakt! Nasz zespół serwisowy skontaktuje się z Tobą w ciągu 24 godzin.";
        
        // Reset formularza przy sukcesie
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
    // Ponownie waliduj telefon po zmianie kraju
    if (formData.phone.trim()) {
      validateSingleField('phone');
    }
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
                src="assets/ikony/lokalizacja.svg"
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
              <label for="country">Kraj</label>
              <select
                id="country"
                bind:value={formData.country}
                class="country-select"
              >
                {#each countryPrefixes as country}
                  <option value={country.code}>{country.name}</option>
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
                  class:error={errors.phone}
                  on:blur={() => validateSingleField('phone')}
                  on:input={() => validateSingleField('phone')}
                  required
                />
                {#if errors.phone}<span class="error-message">{errors.phone}</span>{/if}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Opis problemu</label>
            {#if messageInputMode === null}
              <div class="message-mode-selection">
                <button type="button" on:click={selectTextInputMode}>
                  <img
                    src="/assets/ikony/message.svg"
                    alt="Wiadomość tekstowa"
                  />
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
                    <img src="assets/ikony/microphone.svg" alt="Mikrofon" />
                    <p>Naciśnij przycisk i opisz problem głosowo</p>
                    <small>Maksymalnie 3 minuty nagrania</small>
                  </div>
                  <button
                    type="button"
                    class="record-btn"
                    on:click={startRecording}
                  >
                    <img src="assets/ikony/microphone.svg" alt="Mikrofon" />
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
            </label>
            {#if errors.privacy}<span class="error-message">{errors.privacy}</span>{/if}
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
    width: auto;
    max-width: 77%;
  }

  .country-select input{
    color: var(--color-text-secondary) !important;
  }

  .message-mode-selection button {
    
    img{

      padding: 10px;
    }
    
    span {
      color: var(--color-text-secondary);
      font-size: 0.8rem;
    }
  }
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
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
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

  #country {
    color: var(--color-text-secondary) !important;
  }

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

  // Ulepszenia wizualne dla live validation
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

  .form-group input:invalid.error,
  .form-group textarea:invalid.error,
  .form-group select:invalid.error {
    border-color: #ef4444;
  }
</style>

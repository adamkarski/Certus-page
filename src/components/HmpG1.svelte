<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { Turnstile } from "svelte-turnstile";
  import { typoFixAction } from "$lib/utils/typography";
  import { scrollToElement } from "$lib/utils/smoothScroll";
  import MachineTitleSvg from "$lib/components/MachineTitleSvg.svelte";
  import CtaButton from "./CtaButton.svelte";
  import "$lib/styles/form-styles.scss";

  // Flag for catalog PDF (hidden until provided)
  const showCatalogPdf = false;

  // Contact form state
  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    material: "",
    size: "",
    message: "",
    privacy: false,
  };

  let phonePrefix = "+48";

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

    if (value.startsWith("+")) {
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
    for (const country of countryPrefixes) {
      if (val.startsWith(country.prefix)) {
        phonePrefix = country.prefix;
        formData.phone = val.substring(country.prefix.length).trim();
        return;
      }
    }
    if (/^\d{7,}$/.test(val.replace(/[\s\-]/g, ""))) {
      formData.phone = val.trim();
      phonePrefix = "+48";
    }
  }

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
    const cleanPhone = phone.replace(/[\s\-]/g, "");
    if (!/^\d+$/.test(cleanPhone)) {
      return "Numer telefonu może zawierać tylko cyfry, spacje i myślniki";
    }
    if (cleanPhone.length < 7) {
      return "Numer jest za krótki (min 7 cyfr)";
    }
    if (cleanPhone.length > 15) {
      return "Numer jest za długi (max 15 cyfr)";
    }
    return null;
  }

  function validateField(fieldName: string, value: any): string | null {
    switch (fieldName) {
      case "firstName":
        if (!value.trim()) return "Imię jest wymagane";
        if (value.trim().length < 2) return "Imię musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50) return "Imię jest za długie (max 50 znaków)";
        return null;
      case "lastName":
        if (!value.trim()) return "Nazwisko jest wymagane";
        if (value.trim().length < 2) return "Nazwisko musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50) return "Nazwisko jest za długie (max 50 znaków)";
        return null;
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "privacy":
        if (!value) return "Zgoda na przetwarzanie danych jest wymagana";
        return null;
      default:
        return null;
    }
  }

  function validateSingleField(fieldName: string) {
    const error = validateField(
      fieldName,
      formData[fieldName as keyof typeof formData]
    );
    if (error) {
      errors = { ...errors, [fieldName]: error };
    } else {
      const { [fieldName]: _, ...rest } = errors;
      errors = rest;
    }
  }

  let isSubmitting = false;
  let submitMessage = "";
  let submitSuccess = false;
  let turnstileToken: string | null = null;
  let turnstileReset: (() => void) | undefined;
  let errors: Record<string, string> = {};

  function validate() {
    errors = {};
    const firstNameErr = validateField("firstName", formData.firstName);
    if (firstNameErr) errors.firstName = firstNameErr;

    const lastNameErr = validateField("lastName", formData.lastName);
    if (lastNameErr) errors.lastName = lastNameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    const privacyErr = validateField("privacy", formData.privacy);
    if (privacyErr) errors.privacy = privacyErr;

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    submitMessage = "";

    if (!validate()) {
      submitMessage = "Proszę uzupełnić wymagane pola formularza.";
      submitSuccess = false;
      return;
    }

    if (!turnstileToken) {
      submitMessage =
        "Weryfikacja zabezpieczeń nie powiodła się. Spróbuj ponownie za chwilę.";
      submitSuccess = false;
      return;
    }

    isSubmitting = true;
    const fullPhone = `${phonePrefix} ${formData.phone}`.trim();
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", fullPhone);
    formDataToSend.append("subject", "Zapytanie: HMP-G1");
    formDataToSend.append("formType", "hmp-g1");
    formDataToSend.append("cf-turnstile-response", turnstileToken);

    // Format message with HMP-G1 details
    let fullMessage = `Dotyczy: Zapytanie o maszynę HMP-G1\n`;
    if (formData.material)
      fullMessage += `Obrabiany materiał: ${formData.material}\n`;
    if (formData.size)
      fullMessage += `Największy detal [mm]: ${formData.size}\n`;
    fullMessage += `\nWiadomość od klienta:\n${formData.message || "(brak dodatkowej wiadomości)"}`;

    formDataToSend.append("message", fullMessage);
    formDataToSend.append("material", formData.material);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("timestamp", new Date().toISOString());

    try {
      const apiUrl = "https://api.mg-certus.pl/sendEmail.php";
      let res;
      try {
        res = await axios.post(apiUrl, formDataToSend, { timeout: 15000 });
      } catch (err) {
        res = await axios.post("/send-email.php", formDataToSend, {
          timeout: 15000,
        });
      }

      if (res.data && res.data.success) {
        submitSuccess = true;
        submitMessage =
          "Dziękujemy za zapytanie! Skontaktujemy się z Tobą w ciągu 24 godzin z przygotowaną konfiguracją HMP-G1.";
        formData = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          material: "",
          size: "",
          message: "",
          privacy: false,
        };
        errors = {};
        turnstileReset?.();
      } else {
        submitSuccess = false;
        submitMessage =
          res.data?.message ||
          "Wystąpił problem z wysłaniem wiadomości. Prosimy o kontakt telefoniczny lub mailowy.";
      }
    } catch (err) {
      console.error("Błąd wysyłki formularza:", err);
      submitSuccess = false;
      submitMessage =
        "Nie udało się połączyć z serwerem. Prosimy o bezpośredni kontakt na biuro@mg-certus.pl.";
    } finally {
      isSubmitting = false;
    }
  }

  function handleScrollToContact() {
    scrollToElement("kontakt", 1000, 140);
  }

  onMount(() => {
    if (window.location.hash === "#kontakt") {
      setTimeout(() => {
        scrollToElement("kontakt", 1000, 140);
      }, 300);
    }
  });
</script>

<div class="hmp-page">
  <!-- D1. HERO (ciemny pas na całą szerokość wg mockupu Dawida) -->
  <div class="hmp-hero-wrapper">
    <section id="top" class="cx-wrap hmp-hero-section">
      <div class="cx-hero">
        <div class="cx-hero-text">
          <p class="cx-hero-pretitle" use:typoFixAction>
            Nowość · kompaktowe centrum frezarskie CNC
          </p>
          <h1 class="cx-hero-title">
            <MachineTitleSvg text="HMP-G1" height="1em" />
          </h1>
          <p class="cx-hero-lead" use:typoFixAction>
            Pełna zabudowa, ATC i wrzeciono do 6 kW<br />na mniej niż 1 metrze
            kwadratowym powierzchni.
          </p>
          <div class="cx-hero-buttons">
            <button
              type="button"
              class="btn-primary"
              on:click={handleScrollToContact}
            >
              Zapytaj o ofertę
            </button>
            {#if showCatalogPdf}
              <a
                href="/do_pobrania/Karta-katalogowa-HMP-G1.pdf"
                class="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Karta katalogowa PDF
              </a>
            {/if}
          </div>
        </div>
        <div class="cx-hero-img-box">
          <img
            src="/assets/maszyny/hmp-g1/hmp-g1-render2.webp"
            alt="Frezarka CNC CERTUS HMP-G1 w pełnej zabudowie"
            class="cx-hero-img"
          />
        </div>
      </div>

      <!-- 4 kluczowe parametry (KPI) wg mockupu Dawida -->
      <div class="cx-kpi">
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">Pole pracy X × Y</p>
          <p class="cx-kpi-value">500 × 400 mm</p>
          <p class="cx-kpi-note">lub 400 × 250 mm</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">Oś Z</p>
          <p class="cx-kpi-value">do 350 mm</p>
          <p class="cx-kpi-note">zakres roboczy</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">Wrzeciono</p>
          <p class="cx-kpi-value">do 6 kW</p>
          <p class="cx-kpi-note">dobór pod materiał</p>
        </div>
        <div class="cx-kpi-item">
          <p class="cx-kpi-label">Magazyn ATC</p>
          <p class="cx-kpi-value">10–16 poz.</p>
          <p class="cx-kpi-note">opcja</p>
        </div>
      </div>
    </section>

    <!-- Ukośne ścięcie wg mockupu Dawida -->
    <div class="cx-cut"></div>
  </div>

  <main>
    <!-- D2. KONSTRUKCJA (biała karta na szarym tle wg mockupu Dawida) -->
    <section class="cx-wrap section-pad">
      <div class="white-card">
        <h2 class="card-title" use:typoFixAction>
          Mały gabaryt. Ta sama konstrukcja co w dużych maszynach.
        </h2>
        <p class="card-subtitle" use:typoFixAction>
          HMP-G1 ma rozwiązania mechaniczne większych maszyn CERTUS — zmienione
          są wymiary, nie zasady.
        </p>

        <div class="cx-feat">
          <article class="feat-item">
            <img
              src="/assets/maszyny/hmp-g1/hmp-g1-kinematyka.webp"
              alt="Konstrukcja HMP-G1 bez osłon"
              loading="lazy"
              class="feat-img"
            />
            <h3 class="feat-title" use:typoFixAction>Kinematyka</h3>
            <p class="feat-desc" use:typoFixAction>
              Prowadnice liniowe i śruby kulowe na wszystkich osiach, napęd
              przez przekładnię pasową HTD.
            </p>
          </article>

          <article class="feat-item">
            <img
              src="/assets/maszyny/hmp-g1/hmp-g1-zabudowa.webp"
              alt="HMP-G1 z uniesionymi drzwiami komory"
              loading="lazy"
              class="feat-img"
            />
            <h3 class="feat-title" use:typoFixAction>Zabudowa</h3>
            <p class="feat-desc" use:typoFixAction>
              Zamknięta komora robocza z czujnikiem drzwi. Drzwi z pneumatycznym
              wspomaganiem — jedyne takie rozwiązanie w ofercie CERTUS.
            </p>
          </article>

          <article class="feat-item">
            <img
              src="/assets/maszyny/hmp-g1/hmp-g1-wrzeciono.webp"
              alt="Wrzeciono HMP-G1 nad stołem T-rowkowym"
              loading="lazy"
              class="feat-img"
            />
            <h3 class="feat-title" use:typoFixAction>Wrzeciono i narzędzia</h3>
            <p class="feat-desc" use:typoFixAction>
              Wrzeciona do 6 kW. Wersja bazowa: tulejki ER20 bezpośrednio na
              wrzecionie. Z ATC: oprawki ISO20 / ISO30 i magazyn 10–16 pozycji.
            </p>
          </article>

          <article class="feat-item">
            <img
              src="/assets/maszyny/hmp-g1/hmp-g1-stol.webp"
              alt="Stół roboczy HMP-G1 z czujnikiem pomiaru narzędzia"
              loading="lazy"
              class="feat-img"
            />
            <h3 class="feat-title" use:typoFixAction>Kontrola procesu</h3>
            <p class="feat-desc" use:typoFixAction>
              Chłodzenie mgłą olejową lub cieczą, czujnik długości narzędzia,
              centralne smarowanie — dobierane do materiału i trybu pracy.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="cx-wrap section-pad-sm">
      <div class="white-card">
        <div class="header-sekcja">
          <div><MachineTitleSvg text="HMP-G1" height="2em" /></div>

          <div>
            <h2 class="card-title" use:typoFixAction>Dane techniczne</h2>
          </div>
        </div>

        <div class="cx-spec">
          <!-- Tabela z chipsami -->
          <div class="table-card">
            <div class="table-header">
              <span>Parametr</span>
              <span>Dostępne opcje</span>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Obszar roboczy X × Y (mm)</span>
              <div class="chips-wrap">
                <span class="chip">400×250</span>
                <span class="chip">500×400</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Oś Z (mm)</span>
              <div class="chips-wrap">
                <span class="chip">do 350</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Wrzeciono</span>
              <div class="chips-wrap">
                <span class="chip">do 6 kW</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Mocowanie narzędzia</span>
              <div class="chips-wrap">
                <span class="chip">ER20 (bez ATC)</span>
                <span class="chip">ISO20 / ISO30 (z ATC)</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Magazyn narzędzi ATC</span>
              <div class="chips-wrap">
                <span class="chip">Bez wymiany</span>
                <span class="chip">10–16 pozycji</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Prowadzenie i napęd osi</span>
              <div class="chips-wrap">
                <span class="chip">Prowadnice liniowe, rozmiar 20</span>
                <span class="chip">Śruby kulowe, pasek HTD</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Zabudowa</span>
              <span class="checkmark-text"
                >✓ W standardzie · czujnik drzwi · wspomaganie pneumatyczne
                drzwi</span
              >
            </div>

            <div class="cx-tr">
              <span class="cx-param">Opcje dodatkowe</span>
              <div class="chips-wrap">
                <span class="chip">Chłodzenie cieczą</span>
                <span class="chip">Mgła olejowa</span>
                <span class="chip">Pomiar długości narzędzia</span>
                <span class="chip">Centralne smarowanie</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Sterowanie</span>
              <div class="chips-wrap">
                <span class="chip">PikoCNC</span>
                <span class="chip">CAM: PikoCAM</span>
                <span class="chip">Wolnostojący pulpit</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param">Sprężone powietrze</span>
              <div class="chips-wrap">
                <span class="chip">6,5 bar (robocze)</span>
              </div>
            </div>

            <div class="cx-tr">
              <span class="cx-param"
                >Wymiary zewnętrzne (szer. × gł. × wys.)</span
              >
              <div class="chips-wrap">
                <span class="chip">936 × 900 × 1466 mm</span>
              </div>
            </div>
          </div>

          <!-- Prawa strona: rysunek wymiarowy + karta katalogowa -->
          <div class="drawing-side">
            <img
              src="/assets/maszyny/hmp-g1/hmp-g1-render3.webp"
              alt="Wymiary zewnętrzne HMP-G1: 936 × 900 × 1466 mm"
              loading="lazy"
              class="drawing-img"
            />
            {#if showCatalogPdf}
              <div id="pobierz" class="download-box">
                <p class="download-title">Karta katalogowa HMP-G1</p>
                <p class="download-status">PDF · [w przygotowaniu]</p>
                <a
                  href="/do_pobrania/Karta-katalogowa-HMP-G1.pdf"
                  class="btn-olive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pobierz PDF
                </a>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- D5. PO ZAKUPIE (wg mockupu Dawida) -->
    <section class="cx-wrap section-pad-sm">
      <h2 class="cards-section-title" use:typoFixAction>Po zakupie</h2>
      <div class="cx-cards">
        <div class="benefit-card">
          <p class="benefit-title">Uruchomienie</p>
          <p class="benefit-text" use:typoFixAction>
            Instalacja i szkolenie podstawowe operatora (do 3 h) w cenie
            maszyny.
          </p>
        </div>

        <div class="benefit-card">
          <p class="benefit-title">Gwarancja 12 miesięcy</p>
          <p class="benefit-text" use:typoFixAction>
            Od dnia odbioru, potwierdzonego protokołem odbioru technicznego.
          </p>
        </div>

        <div class="benefit-card">
          <p class="benefit-title">Dokumentacja</p>
          <p class="benefit-text" use:typoFixAction>
            DTR, deklaracja zgodności WE, karta gwarancyjna z każdą maszyną.
          </p>
        </div>

        <div class="benefit-card">
          <p class="benefit-title">Serwis producenta</p>
          <p class="benefit-text" use:typoFixAction>
            Gwarancyjny i pogwarancyjny. <a href="/serwis" class="olive-link"
              >Zasady i cennik</a
            >
          </p>
        </div>
      </div>
    </section>

    <!-- D6. KONTAKT (wg mockupu Dawida) -->
    <section id="kontakt" class="cx-wrap section-pad-lg">
      <div class="white-card">
        <div class="cx-two">
          <!-- Lewa kolumna: Treść kontaktowa -->
          <div class="contact-left-col">
            <h2 class="contact-title" use:typoFixAction>
              Masz pytania? Skontaktuj się z nami!
            </h2>
            <p class="contact-lead-box" use:typoFixAction>
              Napisz, z jakiego materiału i jakiej wielkości są Twoje detale —
              dobierzemy konfigurację HMP-G1 i przygotujemy ofertę.
            </p>

            <div class="contact-info-list">
              <p class="contact-phone">
                <a href="tel:+48606324406">+48 606 324 406</a>
              </p>
              <p class="contact-email">
                <a href="mailto:biuro@mg-certus.pl">biuro@mg-certus.pl</a>
              </p>
              <p class="contact-address">
                Biała Droga 177, 34-123 Chocznia, woj. Małopolskie
              </p>
            </div>
          </div>

          <!-- Prawa kolumna: Formularz kontaktowy -->
          <div class="contact-form-col">
            <form class="cx-form" on:submit={handleSubmit}>
              <label class="form-field">
                <span class="field-label">Imię *</span>
                <input
                  type="text"
                  bind:value={formData.firstName}
                  class:input-err={errors.firstName}
                  placeholder="Imię"
                />
                {#if errors.firstName}<span class="err-text"
                    >{errors.firstName}</span
                  >{/if}
              </label>

              <label class="form-field">
                <span class="field-label">Nazwisko *</span>
                <input
                  type="text"
                  bind:value={formData.lastName}
                  class:input-err={errors.lastName}
                  placeholder="Nazwisko"
                />
                {#if errors.lastName}<span class="err-text"
                    >{errors.lastName}</span
                  >{/if}
              </label>

              <label class="form-field">
                <span class="field-label">Email *</span>
                <input
                  type="email"
                  bind:value={formData.email}
                  class:input-err={errors.email}
                  placeholder="adres@email.com"
                />
                {#if errors.email}<span class="err-text">{errors.email}</span
                  >{/if}
              </label>

              <label class="form-field">
                <span class="field-label">Telefon *</span>
                <input
                  type="tel"
                  bind:value={formData.phone}
                  class:input-err={errors.phone}
                  placeholder="+48 123 456 789"
                />
                {#if errors.phone}<span class="err-text">{errors.phone}</span
                  >{/if}
              </label>

              <label class="form-field">
                <span class="field-label">Obrabiany materiał</span>
                <input
                  type="text"
                  bind:value={formData.material}
                  placeholder="np. aluminium, mosiądz, POM"
                />
              </label>

              <label class="form-field">
                <span class="field-label">Największy detal [mm]</span>
                <input
                  type="text"
                  bind:value={formData.size}
                  placeholder="np. 180 × 120 × 40"
                />
              </label>

              <label class="form-field form-field--full">
                <span class="field-label">Wiadomość</span>
                <textarea
                  rows="4"
                  bind:value={formData.message}
                  placeholder="Opisz swoje potrzeby lub zadaj pytanie..."
                ></textarea>
              </label>

              <div class="form-field form-field--full">
                <label class="checkbox-label">
                  <input type="checkbox" bind:checked={formData.privacy} />
                  <span>
                    Wyrażam zgodę na przetwarzanie danych osobowych w celu
                    obsługi zapytania zgodnie z <a
                      href="/polityka-prywatnosci"
                      target="_blank"
                      class="olive-link">polityką prywatności</a
                    >. *
                  </span>
                </label>
                {#if errors.privacy}<span class="err-text"
                    >{errors.privacy}</span
                  >{/if}
              </div>

              <div class="turnstile-box form-field--full">
                <Turnstile
                  siteKey="0x4AAAAAAAxyxV79aWwI7t9_"
                  on:turnstile-callback={(e) =>
                    (turnstileToken = e.detail.token)}
                  on:turnstile-reset={() => (turnstileToken = null)}
                  bind:reset={turnstileReset}
                />
              </div>

              {#if submitMessage}
                <div
                  class="alert-box form-field--full"
                  class:alert-ok={submitSuccess}
                  class:alert-err={!submitSuccess}
                >
                  {submitMessage}
                </div>
              {/if}

              <div class="form-field--full">
                <button
                  type="submit"
                  class="btn-submit"
                  disabled={isSubmitting}
                >
                  {#if isSubmitting}
                    Wysyłanie...
                  {:else}
                    Wyślij zapytanie
                  {/if}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

<style lang="scss">
  .hmp-page {
    font-family: "Poppins", Arial, sans-serif;
    color: #666666;
    background: #f7f7f7;
    font-size: 15px;
    line-height: 1.6;
    width: 100%;
  }

  .cx-wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px;
    box-sizing: border-box;
  }

  /* HERO */
  .hmp-hero-wrapper {
    background: linear-gradient(180deg, #545454 0%, #2e3032 100%);
    position: relative;
    overflow: hidden;
    padding-top: 130px;
    background-image: url("/assets/maszyny/hmp-g1/tlo_panoramiczne1.webp");
    // blur effect
    background-size: cover;
  }

  .header-sekcja {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .hmp-hero-section {
    padding-top: 50px;
    padding-bottom: 104px;
    position: relative;
    z-index: 2;
  }

  .cx-hero {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: 56px;
    align-items: center;
  }

  .cx-hero-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cx-hero-pretitle {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c5d84a;
  }

  .cx-hero-title {
    font-family: "Snasm", "Poppins", sans-serif !important;
    margin: 0;
    font-size: 84px;
    line-height: 0.95;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.02em;
  }

  .cx-hero-lead {
    margin: 0;
    font-size: 19px;
    line-height: 1.55;
    color: #efefef;
  }

  .cx-hero-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .btn-primary {
    background: #9acd32;
    color: #232c32;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      filter 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      background: #7e8c00;
      color: #ffffff;
      filter: brightness(1.08);
      box-shadow: 0 4px 14px rgba(126, 140, 0, 0.4);
    }
  }

  .btn-secondary {
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    padding: 13px 25px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    background: transparent;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #9acd32;
      color: #9acd32;
    }
  }

  .btn-olive {
    align-self: flex-start;
    background: #7e8c00;
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      filter 0.3s ease;

    &:hover {
      background: #96a500;
      filter: brightness(1.08);
    }
  }

  .btn-submit {
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    background: #7e8c00;
    color: #ffffff;
    border: 0;
    border-radius: 30px;
    padding: 12px 32px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      filter 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      background: #96a500;
      filter: brightness(1.08);
      box-shadow: 0 4px 14px rgba(126, 140, 0, 0.35);
    }
  }

  .cx-hero-img-box {
    overflow: hidden;
  }
  .cx-hero-img-box::after {
    display: block;
    position: relative;
    content: " _";
    width: 28%;
    border-radius: 12px;
    height: 42%;
    box-shadow: 20px 20px 20px rgba(255, 255, 255, 0.3);
  }
  .cx-hero-img {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  /* KPI */
  .cx-kpi {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin-top: 56px;
  }

  .cx-kpi-item {
    border-top: 3px solid #9acd32;
    padding-top: 14px;
  }

  .cx-kpi-label {
    margin: 0;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #bfc3c7;
  }

  .cx-kpi-value {
    margin: 2px 0 0;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
  }

  .cx-kpi-note {
    margin: 0;
    font-size: 13px;
    color: #bfc3c7;
  }

  /* Ukośne ścięcie */
  .cx-cut {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 34%;
    height: 46px;
    background: #f7f7f7;
    clip-path: polygon(0 0, 82% 0, 100% 100%, 0 100%);
    z-index: 1;
  }

  /* SEKCJE */
  .section-pad {
    padding-top: 48px;
  }

  .section-pad-sm {
    padding-top: 32px;
  }

  .section-pad-lg {
    padding-top: 32px;
    padding-bottom: 64px;
  }

  .white-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 48px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  }

  .card-title {
    margin: 0 0 8px;
    font-size: 26px;
    font-weight: 700;
    color: #444444;
  }

  .card-subtitle {
    margin: 0 0 36px;
    max-width: 760px;
    font-size: 15px;
    color: #666666;
  }

  /* D2. Konstrukcja - 4 bloki */
  .cx-feat {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .feat-item {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .feat-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    border-radius: 10px;
    transition: transform 0.4s ease;

    .feat-item:hover & {
      transform: scale(1.02);
    }
  }

  .feat-title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: #444444;
    padding-left: 12px;
    border-left: 4px solid #96a500;
  }

  .feat-desc {
    margin: 0;
    font-size: 15px;
    color: #666666;
  }

  /* D3. Dane techniczne */
  .cx-spec {
    display: grid;
    grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
    gap: 28px;
    align-items: start;
    margin-top: 24px;
  }

  .table-card {
    background: #fafbfc;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 16px;
    padding: 14px 20px;
    background: #f1f3f6;
    color: #5d636b;
    font-weight: 600;
    font-size: 14px;
  }

  .cx-tr {
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    padding: 14px 20px;
    border-top: 1px solid #eceef1;
  }

  .cx-param {
    font-size: 13px;
    line-height: 1.4;
    color: #5d636b;
    font-weight: 500;
  }

  .chips-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    font-size: 13px;
    padding: 4px 10px;
    border: 1px solid #dadde2;
    border-radius: 4px;
    background: #f4f5f7;
    color: #444444;
    font-weight: 500;
  }

  .checkmark-text {
    font-size: 13px;
    font-weight: 600;
    color: #7e8c00;
  }

  .drawing-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .drawing-img {
    width: 100%;
    display: block;
    // border-radius: 10px;
    // box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }

  .download-box {
    background: #f7f7f7;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .download-title {
    margin: 0;
    font-weight: 600;
    color: #444444;
  }

  .download-status {
    margin: 0;
    font-size: 13px;
    color: #a06a00;
  }

  /* D5. Po zakupie */
  .cards-section-title {
    margin: 0 0 22px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #444444;
  }

  .cx-cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }

  .benefit-card {
    background: #ffffff;
    border-top: 3px solid #96a500;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    padding: 24px 20px;
    text-align: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .benefit-title {
    margin: 0 0 6px;
    font-weight: 600;
    color: #444444;
    font-size: 15px;
  }

  .benefit-text {
    margin: 0;
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
  }

  .olive-link {
    color: #7e8c00;
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: #4f5700;
    }
  }

  /* D6. Kontakt */
  .cx-two {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 48px;
  }

  .contact-left-col {
    display: flex;
    flex-direction: column;
  }

  .contact-title {
    margin: 0 0 18px;
    font-size: 22px;
    font-weight: 600;
    color: #444444;
  }

  .contact-lead-box {
    margin: 0;
    padding-left: 14px;
    border-left: 4px solid #96a500;
    color: #666666;
    font-size: 15px;
    line-height: 1.6;
  }

  .contact-info-list {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .contact-phone {
    margin: 0 0 4px;
    font-weight: 600;
    color: #444444;
    font-size: 16px;

    a {
      color: #444444;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #7e8c00;
      }
    }
  }

  .contact-email {
    margin: 0 0 4px;
    a {
      color: #7e8c00;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #4f5700;
        text-decoration: underline;
      }
    }
  }

  .contact-address {
    margin: 0;
    color: #666666;
    font-size: 14px;
  }

  /* Formularz */
  .cx-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .field-label {
      font-size: 13px;
      color: #444444;
      font-weight: 500;
    }

    input,
    textarea {
      font-family: inherit;
      font-size: 14px;
      padding: 10px;
      border: 1px solid #d6d6d6;
      background: #f7f7f7;
      border-radius: 4px;
      color: #333333;
      transition:
        border-color 0.3s ease,
        background-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #7e8c00;
        background: #ffffff;
      }

      &.input-err {
        border-color: #ef4444;
      }
    }
  }

  .form-field--full {
    grid-column: 1 / -1;
  }

  .err-text {
    font-size: 12px;
    color: #ef4444;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    line-height: 1.5;
    color: #666666;
    cursor: pointer;

    input[type="checkbox"] {
      margin-top: 3px;
      accent-color: #7e8c00;
    }
  }

  .turnstile-box {
    margin: 4px 0;
  }

  .alert-box {
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
  }

  .alert-ok {
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  .alert-err {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  /* RWD */
  @media (max-width: 900px) {
    .cx-hero,
    .cx-feat,
    .cx-spec,
    .cx-two,
    .cx-form {
      grid-template-columns: minmax(0, 1fr);
    }

    .cx-kpi,
    .cx-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .cx-tr,
    .table-header {
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }

    .cx-hero-title {
      font-size: 52px;
    }

    .cx-hero-lead {
      font-size: 16px;
    }

    .white-card {
      padding: 24px;
    }
  }
</style>

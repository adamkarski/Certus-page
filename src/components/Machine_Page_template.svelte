<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { Turnstile } from "svelte-turnstile";
  import { typoFixAction } from "$lib/utils/typography";
  import { scrollToElement } from "$lib/utils/smoothScroll";
  import MachineTitleSvg from "$lib/components/MachineTitleSvg.svelte";
  import CtaButton from "./CtaButton.svelte";
  import Gallery from "$lib/components/Gallery.svelte";
  import "$lib/styles/form-styles.scss";

  // Typy danych dla szablonu
  export interface KpiItem {
    label: string;
    value: string;
    note: string;
  }

  export interface FeatItem {
    imgSrc: string;
    imgAlt: string;
    title: string;
    desc: string;
    galleryIndex?: number;
  }

  export interface SpecRow {
    param: string;
    chips?: string[];
    checkmarkText?: string;
  }

  export interface BenefitCard {
    title: string;
    text: string;
    linkHref?: string;
    linkText?: string;
  }

  export interface ProcessStep {
    number: string;
    title: string;
    subtitle: string;
    desc: string;
    iconSvg?: string;
  }

  export interface ChecklistItem {
    badge: string;
    title: string;
    desc: string;
    iconSvg?: string;
  }

  export interface TargetItem {
    text: string;
    iconSvg?: string;
  }

  export interface InfoSectionData {
    badge?: string;
    title: string;
    lead: string;
    targetTitle?: string;
    targetItems?: (string | TargetItem)[];
    processTitle?: string;
    processSubtitle?: string;
    processSteps?: ProcessStep[];
    checklistTitle?: string;
    checklistSubtitle?: string;
    checklistItems?: ChecklistItem[];
    quoteBox?: {
      title: string;
      text: string;
      phone: string;
      phoneRaw: string;
      btnText: string;
    };
  }

  export interface GalleryImage {
    src: string;
    fallbackSrc?: string;
    title: string;
    alt: string;
  }

  export interface BulletItem {
    text: string;
  }

  // Właściwości (props) konfigurujące maszynę
  export let machineId: string = "hmp-g1";
  export let machineName: string = "HMP-G1";
  export let heroTitleFontSize: string = ""; // Opcjonalny override rozmiaru czcionki tytułu w Hero
  export let promoBadge: string = "NOWOŚĆ";
  export let heroPretitle: string = "Nowość · kompaktowe centrum frezarskie CNC";
  export let heroTitleSrOnly: string = "HMP-G1 – kompaktowe centrum frezarskie CNC";
  export let heroLead: string = "Pełna zabudowa, opcjonalne ATC i wrzeciona do 6 kW na powierzchni mniejszej niż 1 m².";
  export let heroImageSrc: string = "/assets/maszyny/hmp-g1/hmp-g1-render2.webp";
  export let heroImageAlt: string = "Frezarka CNC CERTUS HMP-G1 w pełnej zabudowie";
  export let catalogPdfUrl: string = "/do_pobrania/CERTUS_Karta_katalogowa_HMP-G1.pdf";
  export let catalogPdfTitle: string = "Karta katalogowa HMP-G1";
  export let showCatalogPdf: boolean = true;

  export let kpis: KpiItem[] = [];
  export let constrSectionTitle: string = "Mały gabaryt. Ta sama konstrukcja co w dużych maszynach.";
  export let constrSectionSubtitle: string = "HMP-G1 ma rozwiązania mechaniczne większych maszyn CERTUS — zmienione są wymiary, nie zasady.";
  export let feats: FeatItem[] = [];

  export let infoSection: InfoSectionData | null = null;

  export let specs: SpecRow[] = [];
  export let drawingImgSrc: string = "/assets/maszyny/hmp-g1/hmp-g1-render3.webp";
  export let drawingImgAlt: string = "Wymiary zewnętrzne";

  export let optionCardBadge: string = "OPCJA";
  export let optionCardTitle: string = "Sonda 3D";
  export let optionCardDesc: string = "Pomiar materiału i detalu bezpośrednio na maszynie. Ułatwia wyznaczanie punktu zerowego oraz ustalanie położenia materiału i detalu przed obróbką.";

  export let benefitsSectionTitle: string = "Po zakupie";
  export let benefits: BenefitCard[] = [];
  export let showGalleryStrip: boolean = false;
  export let galleryStripTitle: string = "Galeria realizacji";
  export let galleryImages: GalleryImage[] = [];

  export let contactBullets: string[] = [
    `Napisz, z jakiego materiału i jakiej wielkości są Twoje detale — dobierzemy optymalną konfigurację ${machineName} i przygotujemy wycenę.`,
    `Pomożemy dobrać wrzeciono, magazyn narzędzi ATC i wyposażenie dodatkowe.`,
    `Skorzystaj z bezpłatnej konsultacji technicznej — odpowiadamy szybko, zazwyczaj w ciągu 24 godzin.`
  ];

  export let formSubject: string = `Zapytanie: ${machineName}`;
  export let formType: string = machineId;
  export let formHeading: string = `Zapytaj o konfigurację ${machineName}`;

  // Galeria zdjęć (otwierana po kliknięciu w render hero lub kafelki cech)
  let isGalleryOpen = false;
  let galleryInitialIndex = 0;

  function openGallery(index = 0) {
    if (galleryImages && galleryImages.length > 0) {
      galleryInitialIndex = index;
      isGalleryOpen = true;
    }
  }

  function closeGallery() {
    isGalleryOpen = false;
  }

  // Stan formularza kontaktowego
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
        if (value.trim().length < 2)
          return "Imię musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50)
          return "Imię jest za długie (max 50 znaków)";
        return null;
      case "lastName":
        if (!value.trim()) return "Nazwisko jest wymagane";
        if (value.trim().length < 2)
          return "Nazwisko musi mieć co najmniej 2 znaki";
        if (value.trim().length > 50)
          return "Nazwisko jest za długie (max 50 znaków)";
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

  let errors: Record<string, string> = {};

  function validateSingleField(fieldName: string) {
    const error = validateField(
      fieldName,
      formData[fieldName as keyof typeof formData],
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
    formDataToSend.append("subject", formSubject);
    formDataToSend.append("formType", formType);
    formDataToSend.append("cf-turnstile-response", turnstileToken);

    let fullMessage = `Dotyczy: Zapytanie o maszynę ${machineName}\n`;
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
          `Dziękujemy za zapytanie! Skontaktujemy się z Tobą w ciągu 24 godzin z przygotowaną konfiguracją ${machineName}.`;
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
    <!-- Tło ze zdjęciem studio -->
    <div class="hmp-hero-bg"></div>
    <section id="top" class="cx-wrap hmp-hero-section">
      <div class="cx-hero">
        <div class="cx-hero-text">
          {#if promoBadge}
            <span class="hero-promo-badge">{promoBadge}</span>
          {/if}

          <div class="cx-hero-title" aria-hidden="true" style={heroTitleFontSize ? `font-size: ${heroTitleFontSize};` : ''}>
            <MachineTitleSvg text={machineName} height="1em" />
          </div>
          <h1 class="sr-only">{heroTitleSrOnly}</h1>

          <p class="cx-hero-lead" use:typoFixAction>
            {heroLead}
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
                href={catalogPdfUrl}
                class="btn-secondary"
                target="_blank"
                rel="noopener"
                title={`Karta katalogowa ${machineName} w formacie PDF`}
                aria-label={`Pobierz kartę katalogową ${machineName} w formacie PDF`}
              >
                Karta katalogowa
              </a>
            {/if}
          </div>
        </div>

        <!-- Zdjęcie maszyny w Hero - kliknięcie otwiera galerię -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <div
          class="cx-hero-img-box {galleryImages && galleryImages.length > 0 ? 'clickable-hero-img' : ''}"
          on:click={() => openGallery(0)}
          role={galleryImages && galleryImages.length > 0 ? 'button' : undefined}
          tabindex={galleryImages && galleryImages.length > 0 ? 0 : undefined}
          title={galleryImages && galleryImages.length > 0 ? `Zobacz galerię zdjęć ${machineName}` : undefined}
        >
          <img
            src={heroImageSrc}
            alt={heroImageAlt}
            class="cx-hero-img"
          />
        </div>
      </div>

      <!-- 4 kluczowe parametry (KPI) wg mockupu Dawida -->
      {#if kpis && kpis.length > 0}
        <div class="cx-kpi">
          {#each kpis as kpi}
            <div class="cx-kpi-item">
              <p class="cx-kpi-label">{kpi.label}</p>
              <p class="cx-kpi-value">{kpi.value}</p>
              <p class="cx-kpi-note">{kpi.note}</p>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <!-- Ukośne ścięcie wg mockupu Dawida -->
    <div class="cx-cut"></div>
  </div>

  <main>
    <!-- D2. SEKCJA INFORMACYJNA DLA MASZYN NA ZAMÓWIENIE (zaraz pod Hero) -->
    {#if infoSection}
      <section class="cx-wrap section-pad">
        <div class="info-rich-card">
          <!-- HEADER -->
          <div class="info-rich-header">
            {#if infoSection.badge}
              <span class="info-rich-badge">{infoSection.badge}</span>
            {/if}
            <h2 class="info-rich-title" use:typoFixAction>{infoSection.title}</h2>
            <p class="info-rich-lead" use:typoFixAction>{infoSection.lead}</p>
          </div>

          <!-- DLA KOGO — duże karty z ikoną po lewej -->
          {#if infoSection.targetItems && infoSection.targetItems.length > 0}
            <div class="info-target-box">
              <h3 class="info-block-heading">{infoSection.targetTitle || "Dla kogo budujemy maszyny specjalne"}</h3>
              <div class="info-target-grid">
                {#each infoSection.targetItems as target, i}
                  <article class="info-target-chip">
                    <span class="chip-icon-wrap">
                      {#if i === 0}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V8l5 3V8l5 3V4h8a2 2 0 0 1 2 2v14"/><path d="M2 20h20"/><rect x="14" y="9" width="3" height="3" rx=".5"/><rect x="14" y="14" width="3" height="3" rx=".5"/><rect x="6" y="14" width="3" height="3" rx=".5"/></svg>
                      {:else if i === 1}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                      {:else if i === 2}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                      {:else}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                      {/if}
                    </span>
                    <p>{typeof target === 'string' ? target : target.text}</p>
                  </article>
                {/each}
              </div>
            </div>
          {/if}

          <!-- PROCES — 3 kolumny, numer jako duży accent -->
          {#if infoSection.processSteps && infoSection.processSteps.length > 0}
            <div class="info-process-box">
              <div class="section-title-group">
                <h3 class="info-block-heading">{infoSection.processTitle || "Jak wygląda proces realizacji"}</h3>
                {#if infoSection.processSubtitle}
                  <p class="section-subtext">{infoSection.processSubtitle}</p>
                {/if}
              </div>
              <div class="process-steps-grid">
                {#each infoSection.processSteps as step, i}
                  <article class="process-step-card">
                    <div class="step-number-block">
                      <span class="step-number-big">{String(i + 1).padStart(2, '0')}</span>
                      <span class="step-icon-inline">
                        {#if i === 0}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        {:else if i === 1}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        {:else}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {/if}
                      </span>
                    </div>
                    <h4 class="step-title">{step.title}</h4>
                    {#if step.subtitle}
                      <p class="step-subtitle">{step.subtitle}</p>
                    {/if}
                    <p class="step-desc" use:typoFixAction>{step.desc}</p>
                  </article>
                {/each}
              </div>
            </div>
          {/if}

          <!-- CHECKLISTA + KONTAKT -->
          {#if infoSection.checklistItems && infoSection.checklistItems.length > 0}
            <div class="info-checklist-wrap">
              <div class="checklist-side">
                <h3 class="info-block-heading">{infoSection.checklistTitle || "Co przygotować do wyceny?"}</h3>
                {#if infoSection.checklistSubtitle}
                  <p class="checklist-intro">{infoSection.checklistSubtitle}</p>
                {/if}
                <div class="checklist-items">
                  {#each infoSection.checklistItems as item, i}
                    <article class="checklist-item-card">
                      <span class="chk-num">{item.badge}</span>
                      <div class="chk-content">
                        <h4 class="chk-title">{item.title}</h4>
                        <p class="chk-desc" use:typoFixAction>{item.desc}</p>
                      </div>
                    </article>
                  {/each}
                </div>
              </div>

              {#if infoSection.quoteBox}
                <aside class="quote-callout-card">
                  <span class="quote-pill">Szybka konsultacja</span>
                  <h4 class="quote-card-title">{infoSection.quoteBox.title}</h4>
                  <p class="quote-card-text" use:typoFixAction>{infoSection.quoteBox.text}</p>
                  <a href={`tel:${infoSection.quoteBox.phoneRaw}`} class="quote-card-phone">
                    <span class="phone-icon-wrap">
                      <img src="/assets/ikony/telefon.svg" alt="Telefon" />
                    </span>
                    <span>{infoSection.quoteBox.phone}</span>
                  </a>
                  <button type="button" class="btn-primary quote-card-btn" on:click={handleScrollToContact}>
                    {infoSection.quoteBox.btnText}
                  </button>
                </aside>
              {/if}
            </div>
          {/if}
        </div>
      </section>
    {/if}

    <!-- D3. KONSTRUKCJA (biała karta na szarym tle wg mockupu Dawida) -->
    {#if feats && feats.length > 0}
      <section class="cx-wrap section-pad">
        <div class="white-card">
          <h2 class="card-title" use:typoFixAction>
            {constrSectionTitle}
          </h2>
          <p class="card-subtitle" use:typoFixAction>
            {constrSectionSubtitle}
          </p>

          <div class="cx-feat">
            {#each feats as feat}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <article
                class="feat-item {feat.galleryIndex !== undefined && galleryImages && galleryImages.length > 0 ? 'clickable-feat-item' : ''}"
                on:click={() => {
                  if (feat.galleryIndex !== undefined) openGallery(feat.galleryIndex);
                }}
                role={feat.galleryIndex !== undefined ? 'button' : undefined}
                tabindex={feat.galleryIndex !== undefined ? 0 : undefined}
              >
                <img
                  src={feat.imgSrc}
                  alt={feat.imgAlt}
                  loading="lazy"
                  class="feat-img"
                />
                <h3 class="feat-title" use:typoFixAction>{feat.title}</h3>
                <p class="feat-desc" use:typoFixAction>{feat.desc}</p>
              </article>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- D3. DANE TECHNICZNE (styl tabeli 1:1 z HMP-G1) -->
    <section class="cx-wrap section-pad-sm">
      <div class="white-card">
        <div class="header-sekcja">
          <div><MachineTitleSvg text={machineName} height="2em" shadow={false} /></div>
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

            {#each specs as row}
              <div class="cx-tr">
                <span class="cx-param">{row.param}</span>
                {#if row.checkmarkText}
                  <span class="checkmark-text">{row.checkmarkText}</span>
                {:else if row.chips && row.chips.length > 0}
                  <div class="chips-wrap">
                    {#each row.chips as chip}
                      <span class="chip">{chip}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Prawa strona: rysunek/schemat wymiarowy + pobieranie PDF + karta opcji -->
          <div class="drawing-side">
            <img
              src={drawingImgSrc}
              alt={drawingImgAlt}
              loading="lazy"
              class="drawing-img"
            />

            {#if showCatalogPdf}
              <div id="pobierz" class="download-box">
                <p class="download-title">{catalogPdfTitle}</p>
                <p class="download-status">Dokumentacja techniczna PDF</p>
                <a
                  href={catalogPdfUrl}
                  class="btn-olive"
                  target="_blank"
                  rel="noopener"
                  title={`Pobierz dokumentację ${machineName}`}
                  aria-label={`Pobierz kartę katalogową ${machineName}`}
                >
                  Pobierz
                </a>
              </div>
            {/if}

            <div class="sonda-card">
              <div class="sonda-header">
                <span class="sonda-badge">{optionCardBadge}</span>
                <p class="sonda-title">{optionCardTitle}</p>
              </div>
              <p class="sonda-desc" use:typoFixAction>
                {optionCardDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- D4. DLACZEGO CERTUS — kompaktowy strip z 4 filarami -->
    {#if benefits && benefits.length > 0}
      <section class="cx-wrap section-pad-sm">
        <div class="why-certus-strip">
          <h2 class="why-certus-title" use:typoFixAction>{benefitsSectionTitle}</h2>
          <div class="why-certus-grid">
            {#each benefits as benefit, i}
              <article class="why-certus-item">
                <span class="why-icon">
                  {#if i === 0}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  {:else if i === 1}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  {:else if i === 2}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  {:else}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  {/if}
                </span>
                <h3 class="why-item-title">{benefit.title}</h3>
                <p class="why-item-text" use:typoFixAction>
                  {benefit.text}
                  {#if benefit.linkHref}
                    {" "}<a href={benefit.linkHref} class="olive-link">{benefit.linkText || "Szczegóły"}</a>
                  {/if}
                </p>
              </article>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- D4b. WIDOCZNA GALERIA ZDJĘĆ / REALIZACJI (opcjonalny pasek/grid) -->
    {#if showGalleryStrip && galleryImages && galleryImages.length > 0}
      <section class="cx-wrap section-pad-sm gallery-strip-section">
        <div class="gallery-strip-header">
          <h2 class="cards-section-title" use:typoFixAction>{galleryStripTitle}</h2>
          <p class="gallery-strip-subtitle">Kliknij dowolne zdjęcie, aby powiększyć i przejrzeć całą galerię.</p>
        </div>
        <div class="gallery-preview-grid">
          {#each galleryImages as img, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <div
              class="gallery-preview-card"
              on:click={() => openGallery(i)}
              role="button"
              tabindex="0"
              title={img.title || img.alt}
            >
              <img src={img.src} alt={img.alt} loading="lazy" class="gallery-preview-thumb" />
              <div class="gallery-preview-overlay">
                <span class="gallery-zoom-badge">Powiększ</span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- D5. KONTAKT (oryginalne stylowanie kontaktu 1:1 z HMP-G1) -->
    <section id="kontakt" class="contact-flex">
      <div class="background">
        <div class="contact">
          <!-- Lewa kolumna: Treść kontaktowa z grafiką tła kontakt-background.jpg -->
          <div class="contact-left no-sel hmp-contact-left">
            <h2 use:typoFixAction>Masz pytania? Skontaktuj się z nami!</h2>
            <ul use:typoFixAction class="contact-bullets no-sel">
              {#each contactBullets as bullet}
                <li>
                  <span class="bullet"></span>
                  <div class="bullet-content">
                    {bullet}
                  </div>
                </li>
              {/each}
            </ul>

            <div class="contact-info-block">
              <div class="info-row">
                <span class="info-icon">
                  <img src="/assets/ikony/telefon.svg" alt="Telefon" />
                </span>
                <div>
                  <b>
                    <a href="tel:+48606324406" title="Zadzwoń do Certus"
                      >+48 606 324 406</a
                    >
                  </b>
                  <small>Dni robocze 8:00–16:00</small>
                </div>
              </div>
              <div class="info-row">
                <span class="info-icon">
                  <img src="/assets/ikony/email.svg" alt="Email" />
                </span>
                <div>
                  <b>
                    <a
                      href="mailto:biuro@mg-certus.pl"
                      title="Wyślij e-mail do Certus">biuro@mg-certus.pl</a
                    >
                  </b>
                  <small>Dział handlowy i techniczny</small>
                </div>
              </div>
              <div class="info-row">
                <span class="info-icon">
                  <img src="/assets/ikony/lokalizacja.svg" alt="Lokalizacja" />
                </span>
                <div>
                  <b>
                    <a
                      href="https://www.google.com/maps/dir//Bia%C5%82a+Droga+177,+34-123+Chocznia/@49.8630838,19.3645919,17989m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471685f8e05f1bf3:0x5264562f84f98863!2m2!1d19.4469926!2d49.8630023!3e0?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Nawiguj do siedziby firmy"
                    >
                      Biała Droga 177, 34-123 Chocznia
                    </a>
                  </b>
                  <small>Siedziba i produkcja CERTUS</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Prawa kolumna: Formularz kontaktowy -->
          <div class="contact-right">
            <form
              class="contact-form"
              on:submit={handleSubmit}
              autocomplete="off"
            >
              <h3>{formHeading}</h3>

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
                    on:blur={() => validateSingleField("firstName")}
                    maxlength="50"
                    autocomplete="given-name"
                    required
                  />
                  {#if errors.firstName}<span class="error-message"
                      >{errors.firstName}</span
                    >{/if}
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
                    on:blur={() => validateSingleField("lastName")}
                    maxlength="50"
                    autocomplete="family-name"
                    required
                  />
                  {#if errors.lastName}<span class="error-message"
                      >{errors.lastName}</span
                    >{/if}
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
                  on:blur={() => validateSingleField("email")}
                  maxlength="254"
                  autocomplete="email"
                  required
                />
                {#if errors.email}<span class="error-message"
                    >{errors.email}</span
                  >{/if}
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
                    on:blur={() => validateSingleField("phone")}
                    required
                    autocomplete="tel-national"
                  />
                </div>
                {#if errors.phone}<span class="error-message"
                    >{errors.phone}</span
                  >{/if}
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="material">Obrabiany materiał</label>
                  <input
                    id="material"
                    name="material"
                    type="text"
                    placeholder="np. aluminium, stal, mosiądz"
                    bind:value={formData.material}
                  />
                </div>
                <div class="form-group">
                  <label for="size">Największy detal [mm]</label>
                  <input
                    id="size"
                    name="size"
                    type="text"
                    placeholder="np. 180 × 120 × 40"
                    bind:value={formData.size}
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="message">Wiadomość / uwagi do konfiguracji</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Opisz rodzaj obróbki, wymagane tolerancje lub zadaj pytanie..."
                  bind:value={formData.message}
                  maxlength="2000"
                ></textarea>
              </div>

              <div class="form-group privacy-group checkbox-row">
                <input
                  id="privacy"
                  type="checkbox"
                  bind:checked={formData.privacy}
                  on:change={() => validateSingleField("privacy")}
                  required
                />
                <label for="privacy">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                  obsługi zapytania zgodnie z
                  <a href="/polityka-prywatnosci" target="_blank"
                    >polityką prywatności</a
                  >. *
                  {#if errors.privacy}<span class="error-message"
                      >{errors.privacy}</span
                    >{/if}
                </label>
              </div>

              <Turnstile
                siteKey="0x4AAAAAACEnWiyzZjf30AYU"
                theme="light"
                bind:reset={turnstileReset}
                on:callback={(e) => {
                  turnstileToken = e.detail.token;
                }}
                on:expired={() => {
                  turnstileToken = null;
                }}
                on:error={(e) => {
                  turnstileToken = null;
                  turnstileReset?.();
                  submitMessage =
                    "Błąd weryfikacji. Odświeżam zabezpieczenie...";
                }}
              />

              {#if submitMessage}
                <div
                  class="submit-message"
                  class:success={submitSuccess}
                  class:error={!submitSuccess}
                >
                  {submitMessage}
                </div>
              {/if}

              <div class="text-left ctaButton">
                <CtaButton
                  text={isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

<!-- Modal galerii zdjęć -->
{#if galleryImages && galleryImages.length > 0}
  <Gallery
    images={galleryImages}
    isOpen={isGalleryOpen}
    initialIndex={galleryInitialIndex}
    onClose={closeGallery}
  />
{/if}

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

  /* HERO: Główne style tła studio i dwóch świateł na podłodze (.hmp-hero-wrapper, .hmp-hero-bg, ::before, ::after)
     są zdefiniowane globalnie w src/lib/styles/shared-components.scss */

  .header-sekcja {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
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
    align-items: start;
  }

  .cx-hero-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 18px;
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
    background: var(--color-primary, #96a500);
    color: #ffffff;
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
      background: var(--color-primary-dark, #7e8c00);
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
      border-color: var(--color-primary, #96a500);
      color: var(--color-primary-light, #c5d418);
    }
  }

  .btn-olive {
    align-self: flex-start;
    background: var(--color-primary-dark, #7e8c00);
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
      background: var(--color-primary, #96a500);
      filter: brightness(1.08);
    }
  }

  .clickable-hero-img {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .clickable-feat-item {
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  .cx-hero-img-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1448 / 1086;
  }
  /* Rozjaśnienie (zblurowany glow) bezpośrednio pod/za zdjęciem maszyny jako ::after */
  .cx-hero-img-box::after {
    content: "";
    position: absolute;
    bottom: 120px;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    height: 70%;
    background: radial-gradient(
      ellipse at center,
      #ffffff73,
      #ffffff26 45%,
      #fff0 75%
    );
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
    filter: blur(62px);
  }
  .cx-hero-img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    max-width: none;
    transform: scale(1.14);
    transform-origin: center center;
    display: block;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.45));
  }

  /* KPI */
  .cx-kpi {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin-top: 56px;
  }

  .cx-kpi-item {
    border-top: 3px solid var(--color-primary, #96a500);
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
    bottom: -1px;
    width: 34%;
    height: 46px;
    background: #f7f7f7;
    clip-path: polygon(0 0, 82% 0, 100% 100%, 0 100%);
    z-index: 1;
  }

  /* SEKCJE */
  .section-pad {
    padding-top: 48px;
    padding-bottom: 24px;
  }

  .section-pad-sm {
    padding-top: 40px;
    padding-bottom: 40px;
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

  /* D3. DANE TECHNICZNE (styl tabeli zachowany 1:1 z HMP-G1) */
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
    background: #2b2b2b;
    color: #ffffff;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
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
    color: var(--color-primary-dark, #7e8c00);
  }

  .drawing-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .drawing-img {
    width: 100%;
    display: block;
  }

  .download-box {
    background: #2b2b2b;
    color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .download-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
  }

  .download-status {
    margin: 0 0 8px;
    font-size: 13px;
    color: #aaaaaa;
  }

  .sonda-card {
    background: #fafafa;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sonda-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sonda-badge {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--color-primary, #96a500);
    color: #ffffff;
  }

  .sonda-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #333333;
  }

  .sonda-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: #666666;
  }

  /* D4. SEKCJA INFORMACYJNA DLA MASZYN SPECJALNYCH — REDESIGN */
  .info-rich-card {
    background: #ffffff;
    border-radius: 20px;
    padding: clamp(28px, 5cqi, 56px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 48px;
    container-type: inline-size;
    container-name: infocard;
  }

  .info-rich-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-inline-size: 780px;
  }

  .info-rich-badge {
    align-self: flex-start;
    background: #f1f4d8;
    color: var(--color-primary-dark, #7e8c00);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 5px 14px;
    border-radius: 20px;
  }

  .info-rich-title {
    margin: 0;
    font-size: clamp(22px, 3cqi, 32px);
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .info-rich-lead {
    margin: 0;
    font-size: clamp(14px, 1.8cqi, 17px);
    line-height: 1.65;
    color: #555555;
  }

  .info-block-heading {
    margin: 0 0 20px;
    font-size: clamp(17px, 2.2cqi, 22px);
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.01em;
  }

  /* ── TARGET CHIPS — 2×2 grid, taller cards ── */
  .info-target-box {
    border-top: 1px solid #ebebeb;
    padding-top: 40px;
  }

  .info-target-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @container infocard (max-width: 600px) {
    .info-target-grid {
      grid-template-columns: 1fr;
    }
  }

  .info-target-chip {
    background: #f8f9f3;
    border: 1px solid #e6e8dc;
    border-radius: 14px;
    padding: 22px 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      border-color: var(--color-primary, #96a500);
      box-shadow: 0 2px 12px rgba(150, 165, 0, 0.08);
    }

    .chip-icon-wrap {
      inline-size: 40px;
      block-size: 40px;
      border-radius: 10px;
      background: #edf0d4;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--color-primary-dark, #7e8c00);

      svg {
        inline-size: 20px;
        block-size: 20px;
      }
    }

    p {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      line-height: 1.5;
    }
  }

  /* ── PROCESS STEPS — prominent numbers ── */
  .info-process-box {
    border-top: 1px solid #ebebeb;
    padding-top: 40px;
  }

  .section-title-group {
    margin-bottom: 28px;
  }

  .section-subtext {
    margin: 4px 0 0;
    font-size: 14px;
    color: #777777;
    line-height: 1.5;
  }

  .process-steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @container infocard (max-width: 700px) {
    .process-steps-grid {
      grid-template-columns: 1fr;
    }
  }

  .process-step-card {
    background: #f8f9f3;
    border-radius: 16px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    border: 1px solid #e6e8dc;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      border-color: var(--color-primary, #96a500);
      box-shadow: 0 4px 16px rgba(150, 165, 0, 0.08);
    }
  }

  .step-number-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .step-number-big {
    font-size: 36px;
    font-weight: 800;
    color: #edf0d4;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .step-icon-inline {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 10px;
    background: #edf0d4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-dark, #7e8c00);

    svg {
      inline-size: 18px;
      block-size: 18px;
    }
  }

  .step-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.3;
  }

  .step-subtitle {
    margin: -6px 0 0;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #999999;
  }

  .step-desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #555555;
  }

  /* ── CHECKLIST + QUOTE — 2-column layout ── */
  .info-checklist-wrap {
    border-top: 1px solid #ebebeb;
    padding-top: 40px;
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: 28px;
    align-items: start;
  }

  @container infocard (max-width: 780px) {
    .info-checklist-wrap {
      grid-template-columns: 1fr;
    }
  }

  .checklist-intro {
    margin: -8px 0 24px;
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
  }

  .checklist-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .checklist-item-card {
    background: #f8f9f3;
    border: 1px solid #e6e8dc;
    border-radius: 12px;
    padding: 20px 22px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--color-primary, #96a500);
    }
  }

  .chk-num {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 10px;
    background: #1a1a1a;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.04em;
  }

  .chk-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .chk-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .chk-desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: #666666;
  }

  /* ── QUOTE CALLOUT ── */
  .quote-callout-card {
    background: #1a1a1a;
    color: #ffffff;
    border-radius: 16px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .quote-pill {
    align-self: flex-start;
    background: rgba(150, 165, 0, 0.25);
    border: 1px solid var(--color-primary, #96a500);
    color: var(--color-primary-light, #c5d418);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .quote-card-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }

  .quote-card-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: #cccccc;
  }

  .quote-card-phone {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    margin-top: 4px;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary-light, #c5d418);
    }
  }

  .phone-icon-wrap {
    width: 34px;
    height: 34px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 18px;
      height: 18px;
      filter: brightness(0) invert(1);
    }
  }

  .quote-card-btn {
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }

  /* D4. Dlaczego CERTUS — kompaktowy strip */
  .why-certus-strip {
    background: #ffffff;
    border-radius: 20px;
    padding: clamp(28px, 4cqi, 48px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    container-type: inline-size;
    container-name: whycertus;
  }

  .why-certus-title {
    margin: 0 0 28px;
    font-size: clamp(18px, 2.5cqi, 24px);
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -0.01em;
  }

  .why-certus-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  @container whycertus (max-width: 700px) {
    .why-certus-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container whycertus (max-width: 400px) {
    .why-certus-grid {
      grid-template-columns: 1fr;
    }
  }

  .why-certus-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .why-icon {
    inline-size: 40px;
    block-size: 40px;
    border-radius: 10px;
    background: #f2f5dd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-dark, #7e8c00);

    svg {
      inline-size: 20px;
      block-size: 20px;
    }
  }

  .why-item-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .why-item-text {
    margin: 0;
    font-size: 13px;
    color: #666666;
    line-height: 1.55;
  }

  .cards-section-title {
    margin: 0 0 22px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #444444;
  }

  .olive-link {
    color: var(--color-primary-dark, #7e8c00);
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: #4f5700;
    }
  }

  /* D4b. WIDOCZNA GALERIA */
  .gallery-strip-section {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .gallery-strip-header {
    text-align: center;
    margin-bottom: 24px;
  }

  .gallery-strip-subtitle {
    margin: -10px 0 0;
    font-size: 14px;
    color: #777777;
  }

  .gallery-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  .gallery-preview-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background: #e8e8e8;
    aspect-ratio: 4 / 3;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);

      .gallery-preview-overlay {
        opacity: 1;
      }

      .gallery-preview-thumb {
        transform: scale(1.05);
      }
    }
  }

  .gallery-preview-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .gallery-preview-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .gallery-zoom-badge {
    background: var(--color-primary, #96a500);
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  /* D5. KONTAKT - ORYGINALNY STYL 1:1 Z HMP-G1 */
  .contact-flex {
    background: transparent;
    height: auto;
    position: relative;
    top: 0px;
    padding: 32px 0 80px 0;
  }

  .contact-flex .background {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .contact-flex .background .contact {
    display: flex;
    gap: 0px;
    box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    max-width: 1060px;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
    background-color: white;
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
    position: relative;

    &::before {
      display: none !important;
    }

    h2 {
      font-size: 1.5rem !important;
      font-weight: 600 !important;
      margin-bottom: 32px;
      line-height: 1.2;
      color: white !important;
      max-width: 300px;
    }
  }

  .contact-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;

    li {
      display: flex;
      align-items: stretch;
      margin-bottom: 18px;
      line-height: 1.5;
      color: var(--color-gray-200);

      .bullet-content {
        flex: 1;
        font-size: 14px;
      }
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
    margin: 24px 0 12px 0;

    a {
      transition: all ease 0.3s;
      color: #ffffff;
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;

      b {
        font-size: 15px;
        color: #ffffff;
      }

      small {
        color: #ccc;
        margin-top: 2px;
        font-size: 12px;
      }
    }
  }

  .info-icon {
    margin-right: 6px;
    margin-top: 4px;
    img {
      width: 20px;
      height: 20px;
      display: block;
    }
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
      margin-bottom: 20px;
      font-weight: 600;
      text-align: center;
      font-size: 1.25rem;
    }
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
    }

    input[type="tel"] {
      flex-grow: 1;
    }
  }

  .contact-flex .text-left.ctaButton {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;

    :global(button) {
      height: 45px;
      background-color: var(--color-primary);
      color: white;
    }
  }

  :global(.contact-flex .cta-button:hover) {
    width: 64%;
  }

  .submit-message {
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.4;

    &.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    &.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }

  /* RWD */
  @media (max-width: 900px) {
    .contact-flex .background .contact {
      flex-direction: column;
      padding: 24px 6px;
      gap: 24px;
      margin: 20px auto;
    }

    .contact-left,
    .contact-right {
      max-width: 100%;
      min-width: 0;
      padding: 24px 16px;
    }

    .contact-left {
      border-radius: 20px 20px 0 0;
    }

    .cx-hero,
    .cx-feat,
    .cx-spec {
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

    .header-sekcja {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
    }
  }
</style>


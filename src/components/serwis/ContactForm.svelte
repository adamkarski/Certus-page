<script lang="ts">
  import { typoFixAction } from '$lib/utils/typography';

  let formData = {
    company: '',
    name: '',
    dialCode: '+48', // New field
    phone: '',
    serviceType: '',
    description: ''
  };

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  const commonDialCodes = [
    '+1', '+7', '+20', '+27', '+30', '+31', '+32', '+33', '+34', '+36', '+39', '+40', '+41', '+43', '+44', '+45', '+46', '+47', '+48', '+49',
    '+51', '+52', '+53', '+54', '+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63', '+64', '+65', '+66', '+81', '+82', '+84', '+86',
    '+90', '+91', '+92', '+93', '+94', '+95', '+98', '+212', '+213', '+216', '+218', '+220', '+221', '+222', '+223', '+224', '+225', '+226',
    '+227', '+228', '+229', '+230', '+231', '+232', '+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240', '+241', '+242', '+243',
    '+244', '+245', '+246', '+247', '+248', '+249', '+250', '+251', '+252', '+253', '+254', '+255', '+256', '+257', '+258', '+260', '+261',
    '+262', '+263', '+264', '+265', '+266', '+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299', '+350', '+351', '+352', '+353',
    '+354', '+355', '+356', '+357', '+358', '+359', '+370', '+371', '+372', '+373', '+374', '+375', '+376', '+377', '+378', '+379', '+380',
    '+381', '+382', '+385', '+386', '+387', '+389', '+420', '+421', '+423', '+500', '+501', '+502', '+503', '+504', '+505', '+506', '+507',
    '+508', '+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596', '+597', '+598', '+599', '+670', '+672', '+673', '+674', '+675',
    '+676', '+677', '+678', '+679', '+680', '+681', '+682', '+683', '+685', '+686', '+687', '+688', '+689', '+690', '+691', '+692', '+699',
    '+850', '+852', '+853', '+855', '+856', '+870', '+878', '+880', '+881', '+882', '+883', '+886', '+888', '+960', '+961', '+962', '+963',
    '+964', '+965', '+966', '+967', '+968', '+969', '+970', '+971', '+972', '+973', '+974', '+975', '+976', '+977', '+991', '+992', '+993',
    '+994', '+995', '+996', '+998'
  ].sort((a, b) => b.length - a.length); // Sort by length descending for correct matching

  $: {
    if (formData.phone) {
      let currentPhone = formData.phone.trim();
      let currentDialCode = formData.dialCode.trim();

      let matchedNewDialCode = null;
      let remainingPhone = currentPhone;

      // Check if the phone number starts with a known dial code (different from current dialCode)
      for (const code of commonDialCodes) {
        if (currentPhone.startsWith(code) && code !== currentDialCode) {
          matchedNewDialCode = code;
          remainingPhone = currentPhone.substring(code.length).trim();
          break;
        }
      }

      if (matchedNewDialCode) {
        formData.dialCode = matchedNewDialCode;
        formData.phone = remainingPhone;
      } else if (currentPhone.startsWith(currentDialCode)) {
        // If it starts with the current dial code, just remove it from phone
        formData.phone = currentPhone.substring(currentDialCode.length).trim();
      }
    }
  }

  // Ensure dialCode starts with '+'
  $: if (formData.dialCode && !formData.dialCode.startsWith('+')) {
    formData.dialCode = '+' + formData.dialCode.replace(/[^0-9]/g, ''); // Add '+' and remove non-digits
  } else if (formData.dialCode) {
    formData.dialCode = formData.dialCode.replace(/[^0-9+]/g, ''); // Only allow digits and '+'
  }

  function validateForm() {
    errors = {};

    if (!formData.company.trim()) {
      errors.company = 'Nazwa firmy jest wymagana';
    }

    if (!formData.name.trim()) {
      errors.name = 'Imię i nazwisko jest wymagane';
    }

    // Validate dialCode
    if (!formData.dialCode.trim()) {
      errors.dialCode = 'Numer kierunkowy jest wymagany';
    } else if (!/^\+[0-9]+$/.test(formData.dialCode.trim())) {
      errors.dialCode = 'Nieprawidłowy format numeru kierunkowego (np. +48)';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^[0-9\s\-\(\)]+$/.test(formData.phone.trim())) { // Removed '+' from regex as dialCode is separate
      errors.phone = 'Nieprawidłowy format numeru telefonu';
    }

    if (!formData.serviceType) {
      errors.serviceType = 'Wybierz typ usługi';
    }

    if (!formData.description.trim()) {
      errors.description = 'Opis problemu jest wymagany';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    isSubmitting = true;

    try {
      // Symulacja wysyłania formularza
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Dziękujemy za zgłoszenie! Skontaktujemy się z Państwem w ciągu 24 godzin.');
      
      // Reset formularza
      formData = {
        company: '',
        name: '',
        dialCode: '+48', // Reset dialCode
        phone: '',
        serviceType: '',
        description: ''
      };
      errors = {};
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="serwis-contact-form">
  <h3 use:typoFixAction>Zgłoś serwis</h3>
  
  <form on:submit={handleSubmit}>
    <div class="serwis-form-group">
      <label class="serwis-form-label" for="company" use:typoFixAction>Nazwa firmy</label>
      <input 
        type="text" 
        id="company"
        class="serwis-form-control" 
        class:error={errors.company}
        bind:value={formData.company}
        placeholder="Wprowadź nazwę firmy"
      />
      {#if errors.company}
        <span class="serwis-error-message">{errors.company}</span>
      {/if}
    </div>
    
    <div class="serwis-form-row">
      <div class="serwis-form-group">
        <label class="serwis-form-label" for="name" use:typoFixAction>Imię i nazwisko</label>
        <input 
          type="text" 
          id="name"
          class="serwis-form-control" 
          class:error={errors.name}
          bind:value={formData.name}
          placeholder="Wprowadź imię i nazwisko"
        />
        {#if errors.name}
          <span class="serwis-error-message">{errors.name}</span>
        {/if}
      </div>
      
      <div class="serwis-form-group">
        <label class="serwis-form-label" for="phone" use:typoFixAction>Telefon</label>
        <div class="phone-input-group">
          <input
            type="text"
            id="dialCode"
            class="serwis-form-control dial-code-input"
            bind:value={formData.dialCode}
            placeholder="+48"
            style="width: 80px; flex-shrink: 0;"
          />
          <input
            type="tel"
            id="phone"
            class="serwis-form-control"
            class:error={errors.phone}
            bind:value={formData.phone}
            placeholder="123 456 789"
            autocomplete="tel"
          />
        </div>
        {#if errors.phone}
          <span class="serwis-error-message">{errors.phone}</span>
        {/if}
      </div>
    </div>
    
    <div class="serwis-form-group">
      <label class="serwis-form-label" for="serviceType" use:typoFixAction>Typ usługi</label>
      <select 
        id="serviceType"
        class="serwis-form-control" 
        class:error={errors.serviceType}
        class:placeholder-visible={formData.serviceType === ''}
        bind:value={formData.serviceType}
      >
        <option value="">Wybierz typ usługi</option>
        <option value="warranty">Serwis gwarancyjny</option>
        <option value="post-warranty">Serwis pogwarancyjny</option>
        <option value="inspection">Przegląd okresowy</option>
        <option value="additional">Usługi dodatkowe</option>
      </select>
      {#if errors.serviceType}
        <span class="serwis-error-message">{errors.serviceType}</span>
      {/if}
    </div>
    
    <div class="serwis-form-group">
      <label class="serwis-form-label" for="description" use:typoFixAction>Opis problemu</label>
      <textarea 
        id="description"
        class="serwis-form-control" 
        class:error={errors.description}
        bind:value={formData.description}
        rows="4"
        placeholder="Opisz szczegółowo problem z maszyną..."
      ></textarea>
      {#if errors.description}
        <span class="serwis-error-message">{errors.description}</span>
      {/if}
    </div>
    
    <button 
      type="submit" 
      class="serwis-submit-btn"
      disabled={isSubmitting}
    >
      {#if isSubmitting}
        <svg class="serwis-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        <span use:typoFixAction>Wysyłanie...</span>
      {:else}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
        </svg>
        <span use:typoFixAction>Wyślij zgłoszenie</span>
      {/if}
    </button>
  </form>
</div>

<style lang="scss">
  .serwis-contact-form {
    width: 100%;
    
    h3 {
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      margin-bottom: 30px;
      font-weight: 600;
    }
  }

  .serwis-form-group {
    margin-bottom: 24px;
    display: flex; // Added
    flex-direction: column;
    width: 100%; // Added to ensure it takes full width of its grid cell // Added
  }

  .serwis-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px; // Changed from 20px
    min-width: 0; // Added
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  .serwis-form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }

  .serwis-form-control {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
    background: white;
    color: var(--color-text-secondary);
    box-sizing: border-box; // Added
    min-width: 0; // Added

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(150, 165, 0, 0.1);
    }

    &.error {
      border-color: #ef4444;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  select.serwis-form-control {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
    appearance: none;
  }

  textarea.serwis-form-control {
    resize: vertical;
    min-height: 100px;
  }

  .serwis-error-message {
    display: block;
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 4px;
  }

  .serwis-submit-btn {
    width: 100%;
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover:not(:disabled) {
      background: var(--color-primary-dark);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  .serwis-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .serwis-contact-form {
      h3 {
        font-size: 1.25rem;
        margin-bottom: 24px;
      }
    }

    .serwis-form-group {
      margin-bottom: 20px;
    }

    .serwis-form-control {
      padding: 10px 14px;
    }

    .serwis-submit-btn {
      padding: 14px 20px;
    }
  }

  #serviceType {
    color: var(--color-text-secondary) !important;
  }
</style>
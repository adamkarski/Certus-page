<script lang="ts">
  import { typoFixAction } from '$lib/utils/typography';

  let formData = {
    company: '',
    name: '',
    phone: '',
    serviceType: '',
    description: ''
  };

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  function validateForm() {
    errors = {};

    if (!formData.company.trim()) {
      errors.company = 'Nazwa firmy jest wymagana';
    }

    if (!formData.name.trim()) {
      errors.name = 'Imię i nazwisko jest wymagane';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
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
        <input 
          type="tel" 
          id="phone"
          class="serwis-form-control" 
          class:error={errors.phone}
          bind:value={formData.phone}
          placeholder="+48 123 456 789"
        />
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
  }

  .serwis-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
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
</style>
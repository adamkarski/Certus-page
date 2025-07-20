<script lang="ts">
  import { onMount } from 'svelte';
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
    country: 'PL',
  };
  let isSubmitting = false;
  let submitMessage = '';
  let phonePrefix = '+48';
  const countryPrefixes = [
    { code: 'PL', prefix: '+48' },
    // Możesz dodać więcej prefixów jeśli chcesz
  ];

  function handleCountryChange(e: Event) {
    const code = (e.target as HTMLSelectElement).value;
    const found = countryPrefixes.find(c => c.code === code);
    phonePrefix = found ? found.prefix : '';
    formData.country = code;
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!formData.privacy) {
      submitMessage = 'Musisz zaakceptować politykę prywatności.';
      return;
    }
    isSubmitting = true;
    submitMessage = '';
    setTimeout(() => {
      isSubmitting = false;
      submitMessage = 'Dziękujemy za wiadomość! Skontaktujemy się wkrótce.';
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        privacy: false,
        country: 'PL',
      };
      phonePrefix = '+48';
    }, 1000);
  };
</script>

<section class="contact-flex">
  <div class="contact-left">
    <h2>Masz pytania? Skontaktuj się z nami!</h2>
    <ul class="contact-bullets">
      <li>
        <span class="bullet"></span>
        Wypełnij formularz, a nasz doradca skontaktuje się z Tobą, by omówić szczegóły i przygotować indywidualną wycenę.
      </li>
      <li>
        <span class="bullet"></span>
        Nasz zespół ekspertów chętnie pomoże w doborze odpowiedniego urządzenia, przygotuje ofertę lub wyjaśni szczegóły techniczne.
      </li>
      <li>
        <span class="bullet"></span>
        Skorzystaj z bezpłatnej konsultacji – odpowiadamy szybko i rzeczowo, zazwyczaj w ciągu 24 godzin.
      </li>
    </ul>
    <div class="contact-info-block">
      <div class="info-row"><span class="info-icon">📞</span> <b>+48 606 324 406</b></div>
      <div class="info-row"><span class="info-icon">✉️</span> <b>biuro@mg-certus.pl</b></div>
      <div class="info-row"><span class="info-icon">📍</span> <b>Biała Droga 177, 34-123 Chocznia, woj. Małopolskie</b></div>
    </div>
    <div class="contact-social">
      <a href="#" aria-label="Instagram" class="social-icon"> <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><text x="7" y="17" font-size="12" fill="#222">IG</text></svg></a>
      <a href="#" aria-label="YouTube" class="social-icon"> <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><text x="4" y="17" font-size="12" fill="#222">YT</text></svg></a>
      <a href="#" aria-label="LinkedIn" class="social-icon"> <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><text x="4" y="17" font-size="12" fill="#222">IN</text></svg></a>
    </div>
  </div>
  <div class="contact-right">
    <form class="contact-form" on:submit={handleSubmit} autocomplete="off">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Imię</label>
          <input id="firstName" type="text" placeholder="Imię" bind:value={formData.firstName} required />
        </div>
        <div class="form-group">
          <label for="lastName">Nazwisko</label>
          <input id="lastName" type="text" placeholder="Nazwisko" bind:value={formData.lastName} required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="you@company.com" bind:value={formData.email} required />
      </div>
      <div class="form-group">
        <label for="phone">Numer telefonu</label>
        <div class="phone-row">
          <select bind:value={formData.country} on:change={handleCountryChange}>
            {#each countryPrefixes as c}
              <option value={c.code}>{c.code}</option>
            {/each}
          </select>
          <input id="phone" type="tel" placeholder="+48 (000) 000-000" bind:value={formData.phone} required pattern="[0-9\-\s\(\)]+" />
        </div>
      </div>
      <div class="form-group">
        <label for="message">Wiadomość</label>
        <textarea id="message" placeholder="Wiadomość" rows="5" bind:value={formData.message} required></textarea>
      </div>
      <div class="form-group checkbox-row">
        <input id="privacy" type="checkbox" bind:checked={formData.privacy} />
        <label for="privacy">Zgadzam się z polityką prywatności.</label>
      </div>
      <button type="submit" class="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'wysyłanie...' : 'wyślij wiadomość'}
      </button>
      {#if submitMessage}
        <div class="success-message">{submitMessage}</div>
      {/if}
    </form>
  </div>
</section>

<style>
.contact-flex {
  display: flex;
  gap: 40px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(44, 90, 160, 0.08);
  padding: 40px 32px;
  max-width: 1200px;
  margin: 40px auto;
  align-items: stretch;
}
.contact-left {
  flex: 1.1;
  background: #232c32;
  color: #fff;
  border-radius: 12px;
  padding: 40px 36px 32px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 340px;
  max-width: 480px;
}
.contact-left h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  line-height: 1.2;
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
}
.bullet {
  display: inline-block;
  width: 6px;
  height: 28px;
  background: #cddc39;
  border-radius: 2px;
  margin-right: 16px;
  margin-top: 4px;
  flex-shrink: 0;
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
  box-shadow: 0 2px 8px rgba(44,90,160,0.08);
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
  box-shadow: 0 4px 16px rgba(44,90,160,0.06);
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
.submit-btn {
  width: 100%;
  padding: 14px 0;
  background: linear-gradient(90deg, #cddc39 0 20%, #fff 20% 100%);
  color: #232c32;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(44,90,160,0.06);
  transition: background 0.2s, color 0.2s;
}
.submit-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #fff 0 80%, #cddc39 80% 100%);
  color: #232c32;
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
@media (max-width: 900px) {
  .contact-flex {
    flex-direction: column;
    padding: 24px 6px;
    gap: 24px;
  }
  .contact-left, .contact-right {
    max-width: 100%;
    min-width: 0;
    padding: 24px 12px;
  }
  .contact-form {
    padding: 24px 10px;
  }
}
</style>
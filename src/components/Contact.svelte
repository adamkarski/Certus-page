<script lang="ts">
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  let isSubmitting = false
  let submitMessage = ''
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    isSubmitting = true
    
    setTimeout(() => {
      isSubmitting = false
      submitMessage = 'Thank you for your message! We will contact you soon.'
      formData = { name: '', email: '', subject: '', message: '' }
    }, 1000)
  }
</script>

<section id="contact" class="contact">
  <div class="contact-container">
   
   contact.svelte
   
    <!--  <div class="section-header">
      <h2 class="section-title">CONTACT US</h2>
      <div class="title-underline"></div>
      <p class="section-subtitle">
        Get in touch with our financial experts today
      </p>
    </div> -->
    
    <div class="contact-content">
  <!--     <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">📍</div>
          <h3 class="info-title">ADDRESS</h3>
          <p class="info-text">123 Financial Street<br>Business District<br>New York, NY 10001</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">📞</div>
          <h3 class="info-title">PHONE</h3>
          <p class="info-text">+1 (555) 123-4567<br>+1 (555) 987-6543</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">✉️</div>
          <h3 class="info-title">EMAIL</h3>
          <p class="info-text">info@financer.com<br>support@financer.com</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">🕒</div>
          <h3 class="info-title">HOURS</h3>
          <p class="info-text">Mon - Fri: 9:00 AM - 6:00 PM<br>Sat: 10:00 AM - 4:00 PM</p>
        </div>
      </div>
      
      <div class="contact-form-section">
        <form class="contact-form" on:submit={handleSubmit}>
          <div class="form-row">
            <div class="form-group">
              <input 
                type="text" 
                placeholder="Your Name" 
                class="form-input"
                bind:value={formData.name}
                required
              />
            </div>
            <div class="form-group">
              <input 
                type="email" 
                placeholder="Your Email" 
                class="form-input"
                bind:value={formData.email}
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Subject" 
              class="form-input"
              bind:value={formData.subject}
              required
            />
          </div>
          
          <div class="form-group">
            <textarea 
              placeholder="Your Message" 
              class="form-textarea"
              rows="6"
              bind:value={formData.message}
              required
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
          
          {#if submitMessage}
            <div class="success-message">{submitMessage}</div>
          {/if}
        </form>
      </div> -->
    </div>
  </div>
</section>

<style>
  .contact {
    width: 100%;
    padding: 100px 0;
    background: #f8f9fa;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 42px;
    font-weight: 800;
    color: #2c5aa0;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
  
  .title-underline {
    width: 80px;
    height: 4px;
    background: #ffd700;
    margin: 0 auto 30px;
  }
  
  .section-subtitle {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }
  
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
  
  .contact-info {
    display: grid;
    gap: 30px;
  }
  
  .info-card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .info-card:hover {
    transform: translateY(-5px);
  }
  
  .info-icon {
    font-size: 40px;
    margin-bottom: 20px;
  }
  
  .info-title {
    font-size: 18px;
    font-weight: 700;
    color: #2c5aa0;
    margin-bottom: 15px;
    letter-spacing: 1px;
  }
  
  .info-text {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
  
  .contact-form {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 15px 20px;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    font-family: inherit;
  }
  
  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #2c5aa0;
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 18px;
    background: #2c5aa0;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .submit-btn:hover:not(:disabled) {
    background: #1a4480;
    transform: translateY(-2px);
  }
  
  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .success-message {
    margin-top: 20px;
    padding: 15px;
    background: #d4edda;
    color: #155724;
    border-radius: 5px;
    text-align: center;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .contact {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: 32px;
    }
    
    .contact-content {
      grid-template-columns: 1fr;
      gap: 50px;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .contact-form {
      padding: 30px 20px;
    }
  }
</style>
<script lang="ts">
  let formData = {
    name: '',
    email: '',
    company: '',
    message: ''
  };
  
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };
  
  const contactInfo = [
    {
      icon: "📍",
      title: "Adres",
      content: "ul. Przemysłowa 15\n01-123 Warszawa",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "📞",
      title: "Telefon",
      content: "+48 22 123 45 67\n+48 22 123 45 68",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "✉️",
      title: "Email",
      content: "kontakt@certus.pl\nsprzedaz@certus.pl",
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: "⏰",
      title: "Godziny pracy",
      content: "Pon-Pt: 8:00-18:00\nSob: 8:00-14:00",
      color: "from-primary-600 to-secondary-600"
    }
  ];
</script>

<section id="kontakt" class="section-padding section-bg">
  <div class="container-custom">
    <div class="text-center mb-20">
      <h2 class="heading-lg mb-6">Skontaktuj się z nami</h2>
      <p class="text-lead max-w-4xl mx-auto">
        Jesteśmy gotowi odpowiedzieć na Twoje pytania i omówić możliwości współpracy
      </p>
    </div>
    
    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Contact Information -->
      <div class="space-y-8">
        <div class="grid gap-6">
          {#each contactInfo as info}
            <div class="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-8 hover-lift">
              <div class="absolute inset-0 bg-gradient-to-br {info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div class="flex items-start space-x-6">
                <div class="text-4xl">{info.icon}</div>
                <div>
                  <h3 class="text-xl font-bold text-secondary-900 mb-3">{info.title}</h3>
                  <p class="text-secondary-600 whitespace-pre-line text-lg leading-relaxed">{info.content}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Map Placeholder -->
        <div class="bg-white rounded-xl shadow-lg p-8 text-center hover-lift">
          <div class="aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center mb-6">
            <svg class="w-20 h-20 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-secondary-900 mb-3">Nasza Lokalizacja</h3>
          <p class="text-secondary-600 text-lg">Zobacz jak do nas dojechać</p>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-white rounded-xl shadow-xl p-10">
        <h3 class="text-3xl font-bold text-secondary-900 mb-8">Wyślij wiadomość</h3>
        
        <form on:submit={handleSubmit} class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-base font-semibold text-secondary-700 mb-3">
                Imię i nazwisko *
              </label>
              <input
                id="name"
                type="text"
                bind:value={formData.name}
                required
                class="w-full px-5 py-4 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Jan Kowalski"
              />
            </div>
            
            <div>
              <label for="email" class="block text-base font-semibold text-secondary-700 mb-3">
                Email *
              </label>
              <input
                id="email"
                type="email"
                bind:value={formData.email}
                required
                class="w-full px-5 py-4 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="jan.kowalski@firma.pl"
              />
            </div>
          </div>
          
          <div>
            <label for="company" class="block text-base font-semibold text-secondary-700 mb-3">
              Firma
            </label>
            <input
              id="company"
              type="text"
              bind:value={formData.company}
              class="w-full px-5 py-4 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Nazwa firmy"
            />
          </div>
          
          <div>
            <label for="message" class="block text-base font-semibold text-secondary-700 mb-3">
              Wiadomość *
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="6"
              class="w-full px-5 py-4 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none text-lg"
              placeholder="Opisz swoje potrzeby..."
            ></textarea>
          </div>
          
          <button type="submit" class="btn-primary w-full justify-center text-lg py-5 mt-8">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Wyślij wiadomość
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
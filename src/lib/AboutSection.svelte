<script lang="ts">
  const stats = [
    { number: "25+", label: "Lat na rynku", icon: "📅" },
    { number: "500+", label: "Zrealizowanych projektów", icon: "✅" },
    { number: "50+", label: "Specjalistów", icon: "👥" },
    { number: "15", label: "Krajów obsługi", icon: "🌍" }
  ];
  
  const values = [
    {
      title: "Innowacyjność",
      description: "Ciągłe poszukiwanie nowych rozwiązań i technologii",
      icon: "💡"
    },
    {
      title: "Jakość",
      description: "Najwyższe standardy w każdym aspekcie naszej działalności",
      icon: "⭐"
    },
    {
      title: "Niezawodność",
      description: "Partnerstwo oparte na zaufaniu i długotrwałej współpracy",
      icon: "🤝"
    }
  ];
</script>

<section id="o-nas" class="section-padding bg-secondary-50">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- Content -->
      <div class="space-y-8">
        <div>
          <h2 class="heading-lg mb-6">O Firmie certus</h2>
          <div class="space-y-4 text-secondary-700 leading-relaxed">
            <p>
              Od ponad 25 lat jesteśmy liderem w dziedzinie precyzyjnych rozwiązań CNC. 
              Nasza passion to tworzenie innowacyjnych technologii, które umożliwiają naszym 
              klientom osiągnięcie najwyższej jakości i wydajności w produkcji.
            </p>
            <p>
              Specjalizujemy się w zaawansowanych systemach obróbki CNC, automatyzacji 
              procesów produkcyjnych oraz kompleksowym wsparciu technicznym. Nasz zespół 
              doświadczonych inżynierów i technologów gwarantuje rozwiązania na najwyższym poziomie.
            </p>
            <p>
              Współpracujemy z firmami z branży motoryzacyjnej, lotniczej, medycznej 
              i elektronicznej, dostarczając rozwiązania dostosowane do specyficznych 
              wymagań każdego sektora.
            </p>
          </div>
        </div>
        
        <!-- Values -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-secondary-900">Nasze Wartości</h3>
          <div class="grid gap-4">
            {#each values as value}
              <div class="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div class="text-2xl">{value.icon}</div>
                <div>
                  <h4 class="font-semibold text-secondary-900 mb-1">{value.title}</h4>
                  <p class="text-sm text-secondary-600">{value.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Stats and Visual -->
      <div class="space-y-8">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-6">
          {#each stats as stat}
            <div class="bg-white p-6 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
              <div class="text-3xl mb-2">{stat.icon}</div>
              <div class="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div class="text-sm text-secondary-600">{stat.label}</div>
            </div>
          {/each}
        </div>
        
        <!-- Image Placeholder -->
        <div class="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-center">
          <div class="bg-white rounded-lg p-6 shadow-inner">
            <div class="aspect-video bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-16 h-16 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-secondary-900 mb-2">Nowoczesne Technologie</h3>
            <p class="text-secondary-600 text-sm">Inwestujemy w najnowsze rozwiązania technologiczne</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
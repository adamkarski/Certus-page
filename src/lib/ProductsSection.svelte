<script lang="ts">
  const products = [
    {
      id: 1,
      title: "Frezarki CNC",
      description: "Precyzyjne frezarki CNC do obróbki różnych materiałów z najwyższą dokładnością",
      image: "https://www.certus.com/media/images/certus-m8-cube-machine.jpg",
      features: ["5-osiowa obróbka", "Automatyczna wymiana narzędzi", "System chłodzenia"],
      specs: [
        { name: "Precyzja", value: "±0.001 mm", icon: "precision" },
        { name: "Prędkość wrzeciona", value: "24,000 RPM", icon: "speed" },
        { name: "Moc", value: "10 kW", icon: "power" },
        { name: "Powtarzalność", value: "0.005 mm", icon: "repeat" }
      ]
    },
    {
      id: 2,
      title: "Centra Obróbkowe",
      description: "Kompleksowe centra obróbkowe dla automatyzacji procesów produkcyjnych",
      image: "https://www.certus.com/media/images/certus-c5-machine.jpg",
      features: ["Automatyzacja", "Wieloosiowa obróbka", "Wysoka wydajność"],
      specs: [
        { name: "Obszar roboczy", value: "1000x600x500 mm", icon: "dimensions" },
        { name: "Prędkość posuwu", value: "60 m/min", icon: "speed" },
        { name: "Liczba narzędzi", value: "24", icon: "tools" },
        { name: "Sterowanie", value: "SIEMENS 840D", icon: "control" }
      ]
    },
    {
      id: 3,
      title: "Systemy CAM",
      description: "Zaawansowane oprogramowanie CAM do programowania i optymalizacji procesów",
      image: "https://www.certus.com/media/images/certus-next-software-interface.jpg",
      features: ["Intuicyjny interfejs", "Symulacja 3D", "Optymalizacja ścieżek"],
      specs: [
        { name: "Obsługiwane formaty", value: "STEP, IGES, STL", icon: "formats" },
        { name: "Symulacja kolizji", value: "Tak", icon: "simulation" },
        { name: "Optymalizacja czasu", value: "Do 40%", icon: "optimization" },
        { name: "Integracja z CAD", value: "Pełna", icon: "integration" }
      ]
    }
  ];
</script>

<section id="produkty" class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-20">
      <h2 class="heading-lg mb-6">Nasze Produkty</h2>
      <p class="text-lead max-w-4xl mx-auto">
        Oferujemy kompleksowe rozwiązania CNC, od precyzyjnych maszyn po zaawansowane oprogramowanie
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {#each products as product}
        <div class="bg-white rounded-xl shadow-xl overflow-hidden card-hover border border-secondary-100">
          <div class="relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title}
              class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          
          <div class="p-8">
            <h3 class="text-2xl font-bold text-secondary-900 mb-4">{product.title}</h3>
            <p class="text-secondary-600 mb-6 line-clamp-2 text-base leading-relaxed">{product.description}</p>
            
            <!-- Technical Specifications -->
            <div class="grid grid-cols-1 gap-4 mb-8">
              {#each product.specs as spec}
                <div class="flex items-center bg-secondary-50 rounded-lg p-4">
                  <div class="bg-primary-100 p-2 rounded-lg mr-4">
                    <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm text-secondary-500">{spec.name}</div>
                    <div class="font-semibold text-secondary-900">{spec.value}</div>
                  </div>
                </div>
              {/each}
            </div>
            
            <!-- Features -->
            <div class="space-y-3 mb-8">
              <h4 class="text-lg font-semibold text-secondary-800 mb-3">Kluczowe cechy:</h4>
              {#each product.features as feature}
                <div class="flex items-center text-secondary-700">
                  <svg class="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {feature}
                </div>
              {/each}
            </div>
            
            <button class="btn-primary w-full justify-center">
              Dowiedz się więcej
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
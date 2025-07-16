<script lang="ts">
  const solutions = [
    {
      id: 1,
      title: "Produkcja komponentów ogniw paliwowych",
      description: "Kompleksowe rozwiązania do precyzyjnej obróbki komponentów ogniw paliwowych",
      image: "https://www.certus.com/media/images/fuel-cell-bipolar-plate-machining.jpg",
      features: [
        "Obróbka płyt bipolarnych",
        "Dysponowanie uszczelkami",
        "Produkcja kolektorów prądowych"
      ],
      specs: [
        "Precyzja ±0.002 mm",
        "Automatyzacja procesów",
        "Materiały: grafit, stopy lekkie"
      ]
    },
    {
      id: 2,
      title: "High-Speed CNC Milling",
      description: "Zaawansowane frezowanie HSC dla efektywnej produkcji",
      image: "https://www.certus.com/media/images/certus-m8-cube-machine.jpg",
      features: [
        "Prędkość obrotowa do 60,000 RPM",
        "Sztywna konstrukcja portalowa",
        "Automatyczna wymiana narzędzi"
      ],
      specs: [
        "Powtarzalność 0.005 mm",
        "System chłodzenia minimalną ilością cieczy",
        "Obszar roboczy do 1000x600x500 mm"
      ]
    },
    {
      id: 3,
      title: "Systemy Dysponujące",
      description: "Precyzyjne aplikowanie materiałów do uszczelnień",
      image: "https://www.certus.com/media/images/dispensing-system-seals.jpg",
      features: [
        "Krótkie czasy cykli",
        "Programowalne ilości dysponowania",
        "Najwyższa jakość i precyzja"
      ],
      specs: [
        "Rozdzielczość 0.01 mm",
        "Kompatybilność z różnymi materiałami",
        "Automatyzacja procesów"
      ]
    },
    {
      id: 4,
      title: "Rozwiązania Automatyczne",
      description: "Zintegrowane systemy dla bezobsługowej produkcji",
      image: "https://www.certus.com/media/images/automated-cnc-workcell.jpg",
      features: [
        "Integracja z robotami",
        "Systemy podawania materiału",
        "Monitorowanie procesu w czasie rzeczywistym"
      ],
      specs: [
        "24/7 praca ciągła",
        "Systemy wizyjne kontroli jakości",
        "Chmurowe zarządzanie produkcją"
      ]
    }
  ];
</script>

<section id="rozwiazania" class="section-padding section-bg">
  <div class="container-custom">
    <div class="text-center mb-20">
      <h2 class="heading-lg mb-6">Rozwiązania dla przemysłu</h2>
      <p class="text-lead max-w-4xl mx-auto">
        Kompleksowe technologie dla zaawansowanych zastosowań produkcyjnych
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
      {#each solutions as solution}
        <div class="bg-white rounded-xl overflow-hidden border border-secondary-200 card-hover shadow-lg">
          <div class="h-64 overflow-hidden relative">
            <img 
              src={solution.image} 
              alt={solution.title}
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <div class="p-8">
            <h3 class="text-2xl font-bold text-secondary-900 mb-4">{solution.title}</h3>
            <p class="text-secondary-600 mb-6 text-base leading-relaxed">{solution.description}</p>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-semibold text-secondary-800 mb-3 flex items-center">
                  <svg class="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Zalety:
                </h4>
                <ul class="space-y-2">
                  {#each solution.features as feature}
                    <li class="flex items-start text-secondary-700">
                      <svg class="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  {/each}
                </ul>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold text-secondary-800 mb-3 flex items-center">
                  <svg class="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
                  </svg>
                  Specyfikacje:
                </h4>
                <ul class="space-y-2">
                  {#each solution.specs as spec}
                    <li class="flex items-start text-secondary-700">
                      <svg class="w-5 h-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
                      </svg>
                      {spec}
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
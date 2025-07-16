<script lang="ts">
  const applications = [
    {
      id: 1,
      title: "Obróbka Blach",
      description: "Precyzyjna produkcja komponentów lotniczych i medycznych",
      industries: ["Lotnictwo", "Medycyna"],
      features: [
        "Płyty bipolarne dla ogniw paliwowych",
        "Elementy konstrukcyjne dronów",
        "Implanty medyczne"
      ],
      specs: ["Precyzja ±0.002 mm", "Materiały: aluminium, stopy", "Automatyzacja procesów"]
    },
    {
      id: 2,
      title: "Obudowy Aluminiowe",
      description: "Produkcja precyzyjnych obudów elektronicznych",
      industries: ["Elektronika", "Automotive"],
      features: [
        "Obudowy do laptopów i smartfonów",
        "Elementy systemów automotive",
        "Housings dla urządzeń IoT"
      ],
      specs: ["Frezy do aluminium", "Szybkość do 60 m/min", "Systemy chłodzenia"]
    },
    {
      id: 3,
      title: "Rapid Prototyping",
      description: "Szybkie prototypowanie złożonych komponentów",
      industries: ["Inżynieria", "Design"],
      features: [
        "Prototypy funkcjonalne",
        "Modele koncepcyjne",
        "Testy form i narzędzi"
      ],
      specs: ["Czas realizacji 24h", "Materiały: tworzywa, metale", "Precyzja 0.01 mm"]
    },
    {
      id: 4,
      title: "Mikrowiercenie",
      description: "Precyzyjne wiercenie mikro-otworów",
      industries: ["Elektronika", "Mikromechanika"],
      features: [
        "Płytki drukowane PCB",
        "Elementy mikromechaniczne",
        "Czujniki i sensory"
      ],
      specs: ["Średnice od 0.1 mm", "Prędkość 40,000 RPM", "Systemy wizyjne"]
    },
    {
      id: 5,
      title: "Komponenty Medyczne",
      description: "Produkcja implantów i narzędzi chirurgicznych",
      industries: ["Medycyna", "Biotechnologia"],
      features: [
        "Implanty tytanowe",
        "Narzędzia chirurgiczne",
        "Elementy protetyczne"
      ],
      specs: ["Certyfikaty medyczne", "Strefy czyste", "Materiały: Ti, CrCo"]
    },
    {
      id: 6,
      title: "Części Lotnicze",
      description: "Produkcja komponentów dla przemysłu kosmicznego",
      industries: ["Lotnictwo", "Kosmonautyka"],
      features: [
        "Elementy konstrukcyjne satelitów",
        "Komponenty systemów napędowych",
        "Osłony i uchwyty"
      ],
      specs: ["Materiały kompozytowe", "Certyfikaty lotnicze", "Kontrola jakości 3D"]
    }
  ];
</script>

<section id="zastosowania" class="section-padding bg-secondary-50">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="heading-lg mb-4">Zastosowania Przemysłowe</h2>
      <p class="text-lead max-w-3xl mx-auto">
        Zaawansowane technologie obróbcze dla wymagających zastosowań produkcyjnych
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each applications as app}
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full mr-2">
                {#each app.industries as industry, i}
                  {industry}{i < app.industries.length - 1 ? ', ' : ''}
                {/each}
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-secondary-900 mb-3">{app.title}</h3>
            <p class="text-secondary-600 mb-4">{app.description}</p>
            
            <div class="space-y-3">
              <div>
                <h4 class="text-sm font-medium text-secondary-700 mb-1">Kluczowe cechy:</h4>
                <ul class="space-y-1">
                  {#each app.features as feature}
                    <li class="flex items-start text-sm text-secondary-600">
                      <svg class="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  {/each}
                </ul>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-secondary-700 mb-1">Możliwości techniczne:</h4>
                <ul class="space-y-1">
                  {#each app.specs as spec}
                    <li class="flex items-start text-sm text-secondary-600">
                      <svg class="w-4 h-4 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
<script lang="ts">
  const industries = [
    {
      id: 1,
      name: "Elektronika",
      description: "Precyzyjna obróbka mikrokomponentów i płytek PCB",
      applications: [
        "Obudowy urządzeń",
        "Płytki drukowane",
        "Elementy chłodzenia"
      ],
      capabilities: [
        "Mikrowiercenie do 0.1 mm",
        "Frezy do aluminium",
        "Obróbka bezodpryskowa"
      ]
    },
    {
      id: 2,
      name: "Lotnictwo i Kosmonautyka",
      description: "Produkcja komponentów lotniczych i satelitarnych",
      applications: [
        "Elementy konstrukcyjne",
        "Osłony i uchwyty",
        "Systemy napędowe"
      ],
      capabilities: [
        "Materiały kompozytowe",
        "Certyfikaty lotnicze",
        "Kontrola jakości 3D"
      ]
    },
    {
      id: 3,
      name: "Produkcja Medyczna",
      description: "Implanty i narzędzia chirurgiczne najwyższej jakości",
      applications: [
        "Implanty tytanowe",
        "Narzędzia chirurgiczne",
        "Urządzenia diagnostyczne"
      ],
      capabilities: [
        "Strefy czyste ISO 7",
        "Materiały: Ti, CrCo, PEEK",
        "Powierzchnie antybakteryjne"
      ]
    },
    {
      id: 4,
      name: "Badania i Rozwój",
      description: "Prototypowanie i innowacje technologiczne",
      applications: [
        "Modele koncepcyjne",
        "Testy funkcjonalne",
        "Optymalizacja procesów"
      ],
      capabilities: [
        "Szybkie prototypowanie",
        "Materiały eksperymentalne",
        "Integracja z oprogramowaniem CAD/CAM"
      ]
    },
    {
      id: 5,
      name: "Grawerstwo",
      description: "Precyzyjne znakowanie i zdobienie",
      applications: [
        "Formy grawerskie",
        "Znakowanie przemysłowe",
        "Biżuteria i wzornictwo"
      ],
      capabilities: [
        "Rozdzielczość 0.01 mm",
        "Technologia laserowa",
        "Obróbka 3D i 4D"
      ]
    },
    {
      id: 6,
      name: "Warsztaty",
      description: "Wszechstronne możliwości obróbcze",
      applications: [
        "Nisko- i średnioseryjna",
        "Prototypowanie",
        "Naprawy i modyfikacje"
      ],
      capabilities: [
        "Szybkie przezbrojenia",
        "Uniwersalne materiały",
        "Automatyzacja procesów"
      ]
    },
    {
      id: 7,
      name: "Produkcja OEM",
      description: "Wysokowydajna produkcja seryjna",
      applications: [
        "Elementy maszyn",
        "Komponenty elektroniczne",
        "Systemy mocowań"
      ],
      capabilities: [
        "Praca 24/7",
        "Automatyzacja linii",
        "Kontrola jakości inline"
      ]
    },
    {
      id: 8,
      name: "Edukacja i Makerspace",
      description: "Rozwiązania dla szkół i przestrzeni kreatywnych",
      applications: [
        "Szkolenia CNC",
        "Prototypowanie studenckie",
        "Projekty badawcze"
      ],
      capabilities: [
        "Bezpieczne środowisko",
        "Niskie koszty eksploatacji",
        "Oprogramowanie edukacyjne"
      ]
    }
  ];
</script>

<section id="branze" class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="heading-lg mb-4">Branże Przemysłowe</h2>
      <p class="text-lead max-w-3xl mx-auto">
        Specjalistyczne rozwiązania CNC dopasowane do wymagań różnych sektorów
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each industries as industry}
        <div class="bg-secondary-50 rounded-xl p-6 border border-secondary-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
              {industry.name}
            </div>
          </div>
          
          <p class="text-secondary-600 mb-4 text-sm">{industry.description}</p>
          
          <div class="space-y-3">
            <div>
              <h4 class="text-sm font-medium text-secondary-700 mb-1">Zastosowania:</h4>
              <ul class="space-y-1">
                {#each industry.applications as app}
                  <li class="flex items-start text-sm text-secondary-600">
                    <svg class="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    {app}
                  </li>
                {/each}
              </ul>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-secondary-700 mb-1">Możliwości:</h4>
              <ul class="space-y-1">
                {#each industry.capabilities as capability}
                  <li class="flex items-start text-sm text-secondary-600">
                    <svg class="w-4 h-4 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
                    </svg>
                    {capability}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
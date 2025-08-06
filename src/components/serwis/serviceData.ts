export const serviceData = {
  warranty: {
    type: 'warranty',
    title: "Serwis Gwarancyjny",
    description: "Kompleksowa opieka serwisowa dla wszystkich maszyn CNC w okresie 12 miesięcy od daty dostawy",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`,
    highlights: ["BEZPŁATNE", "Do 5 dni"],
    details: [
      { label: "Okres gwarancji", value: "12 miesięcy od dostawy" },
      { label: "Koszt serwisu", value: "BEZPŁATNE", highlight: true },
      { label: "Koszt dojazdu", value: "Bezpłatne do 200 km" },
      { label: "Czas reakcji", value: "Do 5 dni roboczych" }
    ],
    includes: [
      "Wady materiałowe",
      "Błędy produkcyjne", 
      "Awarie z normalnego użytkowania",
      "Oryginalne części zamienne",
      "Raport z wykonanych prac"
    ],
    excludes: [
      "Błędy użytkownika",
      "Zaniedbania konserwacyjne",
      "Eksploatacja niezgodna z przeznaczeniem",
      "Uszkodzenia mechaniczne"
    ]
  },
  
  'post-warranty': {
    type: 'post-warranty',
    title: "Serwis Pogwarancyjny",
    description: "Profesjonalne usługi serwisowe po okresie gwarancji z pełnym wsparciem technicznym",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`,
    highlights: ["240 zł/h", "Do 7 dni"],
    details: [
      { label: "Stawka godzinowa", value: "240 zł netto/h", highlight: true },
      { label: "Minimalne rozliczenie", value: "1 godzina" },
      { label: "Czas reakcji", value: "Do 7 dni roboczych" },
      { label: "Koszt dojazdu", value: "2,50 zł netto/km" }
    ],
    includes: [
      "Diagnostyka awarii",
      "Naprawa podzespołów",
      "Wymiana części zamiennych",
      "Testowanie po naprawie",
      "Szczegółowy raport serwisowy",
      "Instrukcja eksploatacji"
    ],
    note: "Koszt dojazdu liczony w obie strony. Części zamienne dodatkowo według cennika."
  },
  
  inspections: {
    type: 'inspections',
    title: "Przeglądy Okresowe",
    description: "Regularne przeglądy zapewniające optymalną pracę maszyn i przedłużające ich żywotność",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 11l3 3l8-8"></path>
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"></path>
    </svg>`,
    highlights: ["Od 1000 zł", "Co 6 mies."],
    details: [
      { label: "Częstotliwość", value: "Co 6 miesięcy lub 1000 roboczogodzin" },
      { label: "Maszyny 3-osiowe standard", value: "1000 zł netto", highlight: true },
      { label: "Maszyny 3-osiowe rozszerzony", value: "1600 zł netto", highlight: true },
      { label: "Maszyny 5-osiowe standard", value: "1400 zł netto", highlight: true },
      { label: "Maszyny 5-osiowe rozszerzony", value: "2200 zł netto", highlight: true }
    ],
    includes: [
      "Diagnostyka wszystkich podzespołów",
      "Kontrola dokładności osi",
      "Sprawdzenie systemów chłodzenia",
      "Kontrola układów smarowania",
      "Kalibracja narzędzi",
      "Raport z rekomendacjami",
      "Plan konserwacji"
    ],
    note: "Przegląd rozszerzony obejmuje dodatkowo wymianę płynów eksploatacyjnych i drobnych części zużywalnych."
  },
  
  additional: {
    type: 'additional',
    title: "Usługi Dodatkowe",
    description: "Dodatkowe usługi wspierające eksploatację maszyn i rozwój zespołu",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>`,
    highlights: ["Priorytet 48h", "Szkolenia"],
    services: [
      {
        name: "Serwis priorytetowy",
        price: "400 zł netto",
        description: "Reakcja do 48 godzin",
        details: "Priorytetowe traktowanie zgłoszenia serwisowego"
      },
      {
        name: "Diagnostyka zdalna",
        price: "100 zł netto",
        description: "Każde rozpoczęte 30 minut",
        details: "Zdalna pomoc techniczna przez internet"
      },
      {
        name: "Szkolenie operatora",
        price: "1200 zł netto/dzień",
        description: "Na miejscu u klienta",
        details: "Kompleksowe szkolenie z obsługi maszyny"
      },
      {
        name: "Instalacja maszyny",
        price: "1500-2500 zł netto",
        description: "Według umowy",
        details: "Profesjonalna instalacja i uruchomienie"
      }
    ]
  }
};

export type ServiceType = keyof typeof serviceData;
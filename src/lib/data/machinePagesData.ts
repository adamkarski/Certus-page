export interface KpiItem {
  label: string;
  value: string;
  note: string;
}

export interface FeatItem {
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  galleryIndex?: number;
}

export interface SpecRow {
  param: string;
  chips?: string[];
  checkmarkText?: string;
}

export interface BenefitCard {
  title: string;
  text: string;
  linkHref?: string;
  linkText?: string;
}

export interface GalleryImage {
  src: string;
  fallbackSrc?: string;
  title: string;
  alt: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  iconSvg?: string;
}

export interface ChecklistItem {
  badge: string;
  title: string;
  desc: string;
  iconSvg?: string;
}

export interface TargetItem {
  text: string;
  iconSvg?: string;
}

export interface InfoSectionData {
  badge?: string;
  title: string;
  lead: string;
  targetTitle?: string;
  targetItems?: (string | TargetItem)[];
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: ProcessStep[];
  checklistTitle?: string;
  checklistSubtitle?: string;
  checklistItems?: ChecklistItem[];
  quoteBox?: {
    title: string;
    text: string;
    phone: string;
    phoneRaw: string;
    btnText: string;
  };
}

export interface MachinePageConfig {
  machineId: string;
  machineName: string;
  heroTitleFontSize?: string;
  promoBadge: string;
  heroPretitle: string;
  heroTitleSrOnly: string;
  heroLead: string;
  heroImageSrc: string;
  heroImageAlt: string;
  catalogPdfUrl: string;
  catalogPdfTitle: string;
  showCatalogPdf: boolean;
  kpis: KpiItem[];
  constrSectionTitle: string;
  constrSectionSubtitle: string;
  feats: FeatItem[];
  specs: SpecRow[];
  drawingImgSrc: string;
  drawingImgAlt: string;
  optionCardBadge: string;
  optionCardTitle: string;
  optionCardDesc: string;
  infoSection?: InfoSectionData | null;
  benefitsSectionTitle?: string;
  benefits: BenefitCard[];
  showGalleryStrip?: boolean;
  galleryStripTitle?: string;
  galleryImages: GalleryImage[];
  contactBullets: string[];
  formSubject: string;
  formType: string;
  formHeading: string;
}

export const hmpG1Data: MachinePageConfig = {
  machineId: "hmp-g1",
  machineName: "HMP-G1",
  promoBadge: "NOWOŚĆ",
  heroPretitle: "Nowość · kompaktowe centrum frezarskie CNC",
  heroTitleSrOnly: "HMP-G1 – kompaktowe centrum frezarskie CNC",
  heroLead: "Pełna zabudowa, opcjonalne ATC i wrzeciona do 6 kW na powierzchni mniejszej niż 1 m².",
  heroImageSrc: "/assets/maszyny/hmp-g1/hmp-g1-render2.webp",
  heroImageAlt: "Frezarka CNC CERTUS HMP-G1 w pełnej zabudowie",
  catalogPdfUrl: "/do_pobrania/CERTUS_Karta_katalogowa_HMP-G1.pdf",
  catalogPdfTitle: "Karta katalogowa HMP-G1",
  showCatalogPdf: true,
  kpis: [
    { label: "Pole pracy X × Y", value: "500 × 400 mm", note: "lub 400 × 250 mm" },
    { label: "Oś Z", value: "do 350 mm", note: "zakres roboczy" },
    { label: "Wrzeciono", value: "do 6 kW", note: "dobór pod materiał" },
    { label: "Magazyn ATC", value: "10–16 poz.", note: "opcja" },
  ],
  constrSectionTitle: "Mały gabaryt. Ta sama konstrukcja co w dużych maszynach.",
  constrSectionSubtitle: "HMP-G1 ma rozwiązania mechaniczne większych maszyn CERTUS — zmienione są wymiary, nie zasady.",
  feats: [
    {
      imgSrc: "/assets/maszyny/hmp-g1/hmp-g1-kinematyka.webp",
      imgAlt: "Konstrukcja HMP-G1 bez osłon",
      title: "Kinematyka",
      desc: "Prowadnice liniowe i śruby kulowe na wszystkich osiach, napęd przez przekładnię pasową HTD.",
      galleryIndex: 1,
    },
    {
      imgSrc: "/assets/maszyny/hmp-g1/hmp-g1-zabudowa.webp",
      imgAlt: "HMP-G1 z uniesionymi drzwiami komory",
      title: "Zabudowa",
      desc: "Zamknięta komora robocza z czujnikiem drzwi. Drzwi z pneumatycznym wspomaganiem — jedyne takie rozwiązanie w ofercie CERTUS.",
      galleryIndex: 2,
    },
    {
      imgSrc: "/assets/maszyny/hmp-g1/hmp-g1-wrzeciono.webp",
      imgAlt: "Wrzeciono HMP-G1 nad stołem T-rowkowym",
      title: "Wrzeciono i narzędzia",
      desc: "Wrzeciona do 6 kW. Wersja bazowa: tulejki ER20 bezpośrednio na wrzecionie. Z ATC: oprawki ISO20 / ISO30 i magazyn 10–16 pozycji.",
      galleryIndex: 3,
    },
    {
      imgSrc: "/assets/maszyny/hmp-g1/hmp-g1-stol.webp",
      imgAlt: "Stół roboczy HMP-G1 z czujnikiem pomiaru narzędzia",
      title: "Kontrola procesu",
      desc: "Chłodzenie mgłą olejową lub cieczą, czujnik długości narzędzia, sonda 3D do pomiaru materiału i detalu, centralne smarowanie — dobierane do materiału i trybu pracy.",
      galleryIndex: 4,
    },
  ],
  specs: [
    { param: "Obszar roboczy X × Y (mm)", chips: ["400×250", "500×400"] },
    { param: "Oś Z (mm)", chips: ["do 350"] },
    { param: "Wrzeciono", chips: ["do 6 kW"] },
    { param: "Mocowanie narzędzia", chips: ["ER20 (bez ATC)", "ISO20 / ISO30 (z ATC)"] },
    { param: "Magazyn narzędzi ATC", chips: ["Bez wymiany", "10–16 pozycji"] },
    { param: "Prowadzenie i napęd osi", chips: ["Prowadnice liniowe, rozmiar 20", "Śruby kulowe, pasek HTD"] },
    { param: "Zabudowa", checkmarkText: "✓ W standardzie · czujnik drzwi · wspomaganie pneumatyczne drzwi" },
    { param: "Opcje dodatkowe", chips: ["Chłodzenie cieczą", "Mgła olejowa", "Pomiar długości narzędzia", "Sonda 3D", "Centralne smarowanie"] },
    { param: "Sterowanie", chips: ["PikoCNC", "CAM: PikoCAM", "Wolnostojący pulpit"] },
    { param: "Sprężone powietrze", chips: ["6,5 bar (robocze)"] },
    { param: "Wymiary zewnętrzne (szer. × gł. × wys.)", chips: ["936 × 900 × 1466 mm"] },
  ],
  drawingImgSrc: "/assets/maszyny/hmp-g1/hmp-g1-render3.webp",
  drawingImgAlt: "Wymiary zewnętrzne HMP-G1: 936 × 900 × 1466 mm",
  optionCardBadge: "OPCJA",
  optionCardTitle: "Sonda 3D",
  optionCardDesc: "Pomiar materiału i detalu bezpośrednio na maszynie. Ułatwia wyznaczanie punktu zerowego oraz ustalanie położenia materiału i detalu przed obróbką.",
  benefits: [
    { title: "Uruchomienie", text: "Instalacja i szkolenie podstawowe operatora (do 3 h) w cenie maszyny." },
    { title: "Gwarancja 12 miesięcy", text: "Od dnia odbioru, potwierdzonego protokołem odbioru technicznego." },
    { title: "Dokumentacja", text: "DTR, deklaracja zgodności WE, karta gwarancyjna z każdą maszyną." },
    { title: "Serwis producenta", text: "Gwarancyjny i pogwarancyjny.", linkHref: "/serwis", linkText: "Zasady i cennik" },
  ],
  galleryImages: [
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-render2.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-render.webp",
      title: "HMP-G1 – Frezarka CNC w pełnej zabudowie",
      alt: "Frezarka CNC CERTUS HMP-G1 w pełnej zabudowie",
    },
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-kinematyka.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-kinematyka.webp",
      title: "HMP-G1 – Konstrukcja i kinematyka",
      alt: "Konstrukcja HMP-G1 bez osłon",
    },
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-zabudowa.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-zabudowa.webp",
      title: "HMP-G1 – Pełna zabudowa i pneumatyczne drzwi",
      alt: "HMP-G1 z uniesionymi drzwiami komory",
    },
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-wrzeciono.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-wrzeciono.webp",
      title: "HMP-G1 – Wrzeciono do 6 kW i narzędzia",
      alt: "Wrzeciono HMP-G1 nad stołem T-rowkowym",
    },
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-stol.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-stol.webp",
      title: "HMP-G1 – Stół roboczy i czujnik pomiaru narzędzia",
      alt: "Stół roboczy HMP-G1 z czujnikiem pomiaru narzędzia",
    },
    {
      src: "/assets/maszyny/hmp-g1/hmp-g1-render3.webp",
      fallbackSrc: "/assets/maszyny/hmp-g1/hmp-g1-render3.webp",
      title: "HMP-G1 – Wymiary zewnętrzne",
      alt: "Wymiary zewnętrzne HMP-G1: 936 × 900 × 1466 mm",
    },
  ],
  contactBullets: [
    "Napisz, z jakiego materiału i jakiej wielkości są Twoje detale — dobierzemy optymalną konfigurację HMP-G1 i przygotujemy wycenę.",
    "Pomożemy dobrać wrzeciono (do 6 kW), magazyn narzędzi ATC (10–16 pozycji) i wyposażenie dodatkowe.",
    "Skorzystaj z bezpłatnej konsultacji technicznej — odpowiadamy szybko, zazwyczaj w ciągu 24 godzin.",
  ],
  formSubject: "Zapytanie: HMP-G1",
  formType: "hmp-g1",
  formHeading: "Zapytaj o konfigurację HMP-G1",
};

export const certus69Data: MachinePageConfig = {
  machineId: "certus-69",
  machineName: "CERTUS 69",
  promoBadge: "BESTSELLER",
  heroPretitle: "Bestseller · kompaktowe centrum obróbcze CNC",
  heroTitleSrOnly: "CERTUS 69 – kompaktowe centrum obróbcze CNC",
  heroLead: "Otwarta przestrzeń robocza, dwie wersje ATC i wrzeciona do 6 kW na kompaktowej podbudowie.",
  heroImageSrc: "/assets/maszyny/certus-69/c69-hero-render.webp",
  heroImageAlt: "Frezarka CNC CERTUS 69",
  catalogPdfUrl: "/do_pobrania/CERTUS_Karta_katalogowa_C69-PRO.pdf",
  catalogPdfTitle: "Karta katalogowa C69 PRO",
  showCatalogPdf: true,
  kpis: [
    { label: "Pole pracy X × Y", value: "600 × 900 mm", note: "obie wersje" },
    { label: "Oś Z", value: "200 mm", note: "zakres roboczy" },
    { label: "Wrzeciono", value: "do 6 kW", note: "oprawka ISO20" },
    { label: "Magazyn ATC", value: "6 / 10 poz.", note: "PRO-L liniowy · PRO-R rewolwer" },
  ],
  constrSectionTitle: "Mały gabaryt. Maksymalne możliwości obróbcze.",
  constrSectionSubtitle: "CERTUS 69 to sprawdzona konstrukcja łącząca przemysłową sztywność, precyzyjne śruby kulowe i automatyczną wymianę narzędzi.",
  feats: [
    {
      imgSrc: "/assets/maszyny/certus-69/certus-69-06.webp",
      imgAlt: "Konstrukcja CERTUS 69",
      title: "Kinematyka i napęd",
      desc: "Prowadnice liniowe rozmiar 20 i precyzyjne śruby kulowe na wszystkich osiach. Napęd przez bezluzową przekładnię pasową HTD. Elementy techniki liniowej pod osłonami.",
      galleryIndex: 4,
    },
    {
      imgSrc: "/assets/maszyny/certus-69/certus-69-02.webp",
      imgAlt: "Przestrzeń robocza CERTUS 69",
      title: "Konstrukcja korpusu",
      desc: "Duże pole pracy przy małym gabarycie zewnętrznym. Otwarta przestrzeń robocza, stół T-rowkowy aluminiowy i możliwość montażu 4. osi bez utraty pola pracy.",
      galleryIndex: 0,
    },
    {
      imgSrc: "/assets/maszyny/certus-69/certus-69-08.webp",
      imgAlt: "Magazyn narzędzi ISO20 CERTUS 69",
      title: "Wrzeciono i wymiana narzędzi",
      desc: "Wrzeciona do 6 kW z oprawką ISO20. Dwie wersje magazynu: liniowy 6 pozycji przy stole (PRO-L) lub boczny rewolwerowy 10 pozycji (PRO-R).",
      galleryIndex: 6,
    },
    {
      imgSrc: "/assets/maszyny/certus-69/certus-69-09.webp",
      imgAlt: "Sterowanie i panel operatora CERTUS 69",
      title: "Sterowanie i kontrola",
      desc: "Sterowanie PikoCNC z intuicyjnym polskim interfejsem, programowanie w PikoCAM oraz wolnostojący, ergonomiczny pulpit z komputerem i monitorem.",
      galleryIndex: 7,
    },
  ],
  specs: [
    { param: "Obszar roboczy X × Y (mm)", chips: ["600 × 900"] },
    { param: "Oś Z (mm)", chips: ["200 mm"] },
    { param: "Wrzeciono", chips: ["do 6 kW"] },
    { param: "Mocowanie narzędzia", chips: ["ISO20"] },
    { param: "Magazyn narzędzi ATC", chips: ["PRO-L: 6 pozycji (liniowy)", "PRO-R: 10 pozycji (rewolwer)"] },
    { param: "Prowadzenie i napęd osi", chips: ["Prowadnice liniowe, rozmiar 20", "Śruby kulowe, pasek HTD"] },
    { param: "Stół roboczy", chips: ["Aluminiowy T-rowkowy"] },
    { param: "Sterowanie", chips: ["PikoCNC PL · PikoCAM · pulpit z PC"] },
    { param: "Opcje dodatkowe", chips: ["4. oś obrotowa", "Chłodzenie mgłą olejową", "Czujnik narzędzia"] },
    { param: "Materiały", chips: ["Aluminium i metale kolorowe", "Drobne elementy stalowe", "Plexi i tworzywa", "Drewno"] },
  ],
  drawingImgSrc: "/assets/maszyny/SCHEMATY/Certus_69_1_cropped.png",
  drawingImgAlt: "Schemat techniczny i wymiary CERTUS 69",
  optionCardBadge: "OPCJA",
  optionCardTitle: "4. oś obrotowa",
  optionCardDesc: "Możliwość łatwej rozbudowy o 4. oś obrotu bez utraty podstawowego pola pracy. Precyzyjne frezowanie elementów cylindrycznych i form.",
  benefits: [
    { title: "Uruchomienie", text: "Instalacja i szkolenie podstawowe operatora (do 3 h) w cenie maszyny." },
    { title: "Gwarancja 12 miesięcy", text: "Od dnia odbioru, potwierdzonego protokołem odbioru technicznego." },
    { title: "Dokumentacja", text: "DTR, deklaracja zgodności WE, karta gwarancyjna z każdą maszyną." },
    { title: "Serwis producenta", text: "Gwarancyjny i pogwarancyjny.", linkHref: "/serwis", linkText: "Zasady i cennik" },
  ],
  galleryImages: [
    {
      src: "/assets/maszyny/certus-69/certus-69-02.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-02.png",
      title: "CERTUS 69 – Widok z perspektywy",
      alt: "Frezarka CNC CERTUS 69 w profesjonalnej oprawie",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-03.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-03.png",
      title: "CERTUS 69 – Stół roboczy i przestrzeń robocza",
      alt: "Przestrzeń robocza maszyny CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-04.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-04.png",
      title: "CERTUS 69 – Precyzyjna głowica i wrzeciono",
      alt: "Wrzeciono i osie frezarki CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-05.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-05.png",
      title: "CERTUS 69 – Studio render",
      alt: "CERTUS 69 w ujęciu studyjnym",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-06.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-06.png",
      title: "CERTUS 69 – Konstrukcja i prowadnice",
      alt: "Sztywna konstrukcja frezarki CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-07.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-07.png",
      title: "CERTUS 69 – Detal wykonania",
      alt: "Precyzja wykonania CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-08.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-08.png",
      title: "CERTUS 69 – Magazyn narzędzi ISO20",
      alt: "Automatyczna wymiana narzędzi CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-09.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-09.png",
      title: "CERTUS 69 – Panel i pulpit operatora",
      alt: "Stanowisko operatora frezarki CERTUS 69",
    },
    {
      src: "/assets/maszyny/certus-69/certus-69-10.webp",
      fallbackSrc: "/assets/maszyny/certus-69/certus-69-10.png",
      title: "CERTUS 69 – Centrum obróbcze CNC",
      alt: "Centrum obróbcze CNC CERTUS 69",
    },
  ],
  contactBullets: [
    "Napisz, z jakiego materiału i jakiej wielkości są Twoje detale — dobierzemy optymalną konfigurację CERTUS 69 i przygotujemy wycenę.",
    "Pomożemy dobrać wrzeciono (do 6 kW), wersję magazynu ATC (PRO-L 6 pozycji lub PRO-R 10 pozycji) i wyposażenie dodatkowe.",
    "Skorzystaj z bezpłatnej konsultacji technicznej — odpowiadamy szybko, zazwyczaj w ciągu 24 godzin.",
  ],
  formSubject: "Zapytanie: CERTUS 69",
  formType: "certus-69",
  formHeading: "Zapytaj o konfigurację CERTUS 69",
};

export const maszynySpecjalistyczneData: MachinePageData = {
  machineId: "maszyny-specjalne",
  machineName: "MASZYNY SPECJALNE",
  heroTitleFontSize: "clamp(28px, 3.6vw, 46px)",
  promoBadge: "NA ZAMÓWIENIE",
  heroPretitle: "Projekt i produkcja CNC na indywidualne zamówienie",
  heroTitleSrOnly: "Maszyny specjalne CNC – budowa na zamówienie",
  heroLead: "Gdy nie istnieje gotowe rozwiązanie do Twojego zadania, projektujemy i budujemy je od podstaw — prosto, rozsądnie i niezawodnie.",
  heroImageSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-hero-transparent.webp",
  heroImageAlt: "Maszyny specjalne CNC budowane na zamówienie przez CERTUS",
  catalogPdfUrl: "/kontakt",
  catalogPdfTitle: "Wycena indywidualna",
  showCatalogPdf: false,
  kpis: [
    {
      label: "OBSZAR ROBOCZY",
      value: "Dowolny",
      note: "wymiary pod proces klienta",
    },
    {
      label: "LICZBA OSI",
      value: "3 do 5 osi",
      note: "oraz osie obrotowe / liniowe",
    },
    {
      label: "WRZECIONA I GŁOWICE",
      value: "do 15 kW",
      note: "frezowanie, cięcie, wiercenie",
    },
    {
      label: "AUTOMATYZACJA",
      value: "ATC / Robotyka",
      note: "podajniki, pomiary, systemy wizyjne",
    },
  ],
  constrSectionTitle: "Maszyny budowane pod Twoje zadanie produkcyjne.",
  constrSectionSubtitle: "Nie dopasowujesz technologii do maszyny — to maszynę projektujemy ściśle pod Twój detal, materiał i halę.",
  feats: [
    {
      imgSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-01.webp",
      imgAlt: "Indywidualny projekt konstrukcji maszyny specjalnej",
      title: "Konstrukcja pod proces",
      desc: "Projektujemy i spawamy korpusy o sztywności dopasowanej do docelowych materiałów: od kompozytów i tworzyw po stale i metale kolorowe.",
      galleryIndex: 0,
    },
    {
      imgSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-02.webp",
      imgAlt: "Prowadnice liniowe i napędy serwo",
      title: "Sprawdzone napędy i komponenty",
      desc: "Korzystamy wyłącznie z certyfikowanych podzespołów przemysłowych łatwo dostępnych w Polsce i UE: serwonapędy, śruby toczne i precyzyjne listwy zębate.",
      galleryIndex: 1,
    },
    {
      imgSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-03.webp",
      imgAlt: "Dedykowane wrzeciona i głowice robocze",
      title: "Dedykowana głowica i oprzyrządowanie",
      desc: "Dobieramy wrzeciona wysokoobrotowe, agregaty kątowe, noże oscylacyjne, głowice tnące, znakujące lub automatyczne zespoły wiertarskie.",
      galleryIndex: 2,
    },
    {
      imgSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-04.webp",
      imgAlt: "Sterowanie przemysłowe i automatyka PLC",
      title: "Intuicyjne sterowanie i automatyka",
      desc: "Wdrażamy systemy sterowania z przejrzystym interfejsem w języku polskim, integrację z liniami produkcyjnymi, czujnikami detali oraz bazami danych.",
      galleryIndex: 3,
    },
  ],
  specs: [
    { param: "Wymiary obszaru roboczego (mm)", chips: ["Dostosowane do potrzeb (od małych gniazd po wielki format)"] },
    { param: "Konfiguracja kinematyki", chips: ["3-osiowa", "4-osiowa", "5-osiowa", "Portałowa", "Z ruchomym stołem"] },
    { param: "Rodzaje wrzecion i głowic", chips: ["Wysokoobrotowe (do 60 000 rpm)", "Wrzeciona dużej mocy do stali", "Głowice wiertarskie i tnące"] },
    { param: "Wymiana narzędzi", chips: ["Ręczna", "Automatyczna ATC liniowa", "ATC karuzelowa / rewolwerowa"] },
    { param: "Opcje automatyzacji", chips: ["Automatyczny załadunek / rozładunek", "Systemy wizyjne", "Zintegrowane sondy 3D", "Robotyka"] },
    { param: "System sterowania", chips: ["PikoCNC PL", "Sterowanie przemysłowe dedykowane", "Pulpit wolnostojący"] },
    { param: "Materiały obrabiane", chips: ["Aluminium i metale kolorowe", "Stal i odlewy", "Tworzywa sztuczne i kompozyty", "Materiały techniczne"] },
  ],
  drawingImgSrc: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-schemat.webp",
  drawingImgAlt: "Projekt maszyny specjalnej CNC CERTUS",
  optionCardBadge: "INDYWIDUALNIE",
  optionCardTitle: "Automatyzacja i integracja",
  optionCardDesc: "Budujemy maszyny wyposażone w automatyczne podajniki materiału, systemy wizyjne, zintegrowane pomiary detalu oraz stanowiska zrobotyzowane.",
  infoSection: {
    badge: "OFERTA DEDYKOWANA",
    title: "Gdy gotowe maszyny z katalogu nie rozwiązują problemu",
    lead: "Projektujemy i wykonujemy urządzenia CNC od podstaw pod konkretne operacje wytwórcze. Stawiamy na praktyczność: minimum niepotrzebnej komplikacji, maksimum niezawodności i ergonomii na Twojej hali produkcyjnej.",
    targetTitle: "Dla kogo budujemy maszyny specjalne?",
    targetItems: [
      { text: "Małe i średnie zakłady produkcyjne automatyzujące powtarzalne operacje" },
      { text: "Warsztaty i działy prototypowania wymagające niestandardowych gabarytów lub osi" },
      { text: "Działy utrzymania ruchu i linie produkcyjne potrzebujące urządzeń pomocniczych" },
      { text: "Firmy poszukujące zintegrowanych stacji: cięcie, wiercenie, znakowanie w jednym cyklu" }
    ],
    processTitle: "Jak pracujemy – przejrzysty proces w 3 krokach",
    processSubtitle: "Bez zbędnych etapów, nadmiarowej biurokracji i z pełnym wsparciem inżynierskim.",
    processSteps: [
      {
        number: "KROK 01",
        title: "Krótka rozmowa i wytyczne",
        subtitle: "Konsultacja techniczna",
        desc: "Mówisz, co ma robić maszyna i jakie są ograniczenia: przestrzeń na hali, wymagana wydajność, tolerancje detalu, budżet i oczekiwany termin."
      },
      {
        number: "KROK 02",
        title: "Koncepcja i przejrzysta wycena",
        subtitle: "Rysunek i kalkulacja",
        desc: "Przygotowujemy prostą propozycję inżynierską — rysunek poglądowy, dokładny zakres komponentów, stałą cenę oraz harmonogram budowy."
      },
      {
        number: "KROK 03",
        title: "Produkcja, montaż i szkolenie",
        subtitle: "Uruchomienie u Ciebie",
        desc: "Składamy maszynę z europejskich komponentów, przywozimy, uruchamiamy na Twojej hali i szkolimy operatorów z obsługi i konserwacji."
      }
    ],
    checklistTitle: "Co warto przygotować do wyceny?",
    checklistSubtitle: "Abyśmy mogli szybko wrócić z konkretną propozycją techniczną i cenową, przydadzą się następujące informacje:",
    checklistItems: [
      {
        badge: "01",
        title: "Zadanie i operacja",
        desc: "Krótki opis zadania (np. cięcie, frezowanie, wiercenie, podawanie) + 2-3 zdjęcia poglądowe detalu lub szkic stanowiska."
      },
      {
        badge: "02",
        title: "Wymiary i zakres roboczy",
        desc: "Podstawowe gabaryty detalu (długość, szerokość, wysokość) oraz wymagany skok roboczy w osiach X, Y, Z."
      },
      {
        badge: "03",
        title: "Materiał i wydajność",
        desc: "Rodzaj materiału (aluminium, tworzywa, stal, kompozyty) oraz oczekiwane tempo produkcji w szt./h lub min/detal."
      }
    ],
    quoteBox: {
      title: "Chcesz omówić swój pomysł?",
      text: "Zadzwoń bezpośrednio do konstruktora lub wyślij szkic zadania przez formularz. Odpowiadamy konkretnie.",
      phone: "+48 606 324 406",
      phoneRaw: "+48606324406",
      btnText: "Napisz do konstruktora"
    }
  },
  benefitsSectionTitle: "Dlaczego CERTUS?",
  benefits: [
    {
      title: "Europejskie podzespoły",
      text: "Hiwin, Delta, Leadshine, PikoCNC — stosujemy wyłącznie sprawdzone komponenty łatwo dostępne i serwisowalne w Polsce i UE.",
    },
    {
      title: "Stała cena i termin",
      text: "Wycena obejmuje całość: projekt, budowę, transport, uruchomienie i szkolenie. Bez ukrytych kosztów, ze stałym harmonogramem.",
    },
    {
      title: "Dokumentacja i zgodność",
      text: "Kompletna dokumentacja techniczna DTR, deklaracja zgodności WE/CE, instrukcja obsługi w języku polskim.",
    },
    {
      title: "Serwis fabryczny",
      text: "Gwarancja, dedykowany opiekun techniczny, szybka reakcja serwisowa (telefon + dojazd) i dostępność części zamiennych.",
    },
  ],
  showGalleryStrip: false,
  galleryStripTitle: "Zdjęcia z realizacji maszyn specjalnych",
  galleryImages: [
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-01.webp",
      title: "Maszyna specjalna CERTUS – Realizacja przemysłowa",
      alt: "Maszyna specjalna CNC CERTUS – widok ogólny",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-02.webp",
      title: "Maszyna specjalna CERTUS – Konstrukcja i podzespoły",
      alt: "Szczegóły konstrukcyjne maszyny specjalnej",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-03.webp",
      title: "Maszyna specjalna CERTUS – Moduł roboczy",
      alt: "Moduł roboczy maszyny specjalnej",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-04.webp",
      title: "Maszyna specjalna CERTUS – Zespół napędowy i brama",
      alt: "Brama i napędy maszyny na zamówienie",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-05.webp",
      title: "Maszyna specjalna CERTUS – Stół i przestrzeń operacyjna",
      alt: "Przestrzeń robocza maszyny specjalnej",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-06.webp",
      title: "Maszyna specjalna CERTUS – Precyzyjna głowica robocza",
      alt: "Głowica robocza wykonana na zamówienie",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-07.webp",
      title: "Maszyna specjalna CERTUS – Detal mechaniczny",
      alt: "Prowadnice i mechanika maszyny",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-08.webp",
      title: "Maszyna specjalna CERTUS – Układ sterowania i automatyka",
      alt: "Automatyka maszyny specjalnej",
    },
    {
      src: "/assets/images/maszyny-specjalistyczne/webp/maszyna-specjalistyczna-09.webp",
      title: "Maszyna specjalna CERTUS – Gotowe urządzenie w hali",
      alt: "Uruchomiona maszyna specjalna CERTUS",
    },
  ],
  contactBullets: [
    "Opisz swoje zadanie produkcyjne — przygotujemy wstępną koncepcję, rysunek poglądowy i niezobowiązującą wycenę.",
    "Dobierzemy optymalną technologię, wymiary pola pracy, rodzaj napędów oraz poziom automatyzacji.",
    "Gwarantujemy bezpośredni kontakt z inżynierem prowadzącym projekt i szybką odpowiedź w 24h.",
  ],
  formSubject: "Zapytanie: Maszyny specjalne",
  formType: "maszyny-specjalne",
  formHeading: "Zapytaj o maszynę na zamówienie",
};

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

export interface MachinePageConfig {
  machineId: string;
  machineName: string;
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
  benefits: BenefitCard[];
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
  heroLead: "Pole pracy 600 × 900 × 200 mm na kompaktowej podstawie, wrzeciono do 6 kW z oprawką ISO20 i automatyczną wymianą narzędzi: magazyn liniowy 6 poz. lub rewolwerowy 10 poz.",
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
  drawingImgSrc: "/assets/maszyny/SCHEMATY/Certus_69_1.png",
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

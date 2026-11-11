export interface RouteSeoData {
	title: string;
	description: string;
	ogTitle?: string;
	ogDescription?: string;
	image: string;
	type?: 'website' | 'product' | 'article';
}

export const routeSeoMap: Record<string, RouteSeoData> = {
	'/': {
		title: 'CERTUS - Maszyny i Centra Obróbcze CNC | Polski Producent',
		description:
			'Polski producent maszyn CNC: centra obróbcze, frezarki, plotery przemysłowe i grawerki. Projekt i montaż w Polsce, serwis producenta, ponad 20 lat w branży.',
		ogTitle: 'CERTUS - Maszyny i Centra Obróbcze CNC | Polski Producent',
		ogDescription:
			'Polski producent maszyn CNC: centra obróbcze, frezarki, plotery przemysłowe i grawerki. Projekt i montaż w Polsce, serwis producenta, ponad 20 lat w branży.',
		image: '/assets/images/certusPage.webp',
		type: 'website'
	},
	'/serwis': {
		title: 'Serwis maszyn CNC - Gwarancyjny i pogwarancyjny | CERTUS',
		description:
			'Serwis maszyn CNC CERTUS: gwarancja 12 miesięcy od odbioru, serwis pogwarancyjny, przeglądy, szkolenia i diagnostyka zdalna. Cennik i zasady online.',
		ogTitle: 'Serwis maszyn CNC – Gwarancyjny i Pogwarancyjny | CERTUS',
		ogDescription:
			'Serwis maszyn CNC CERTUS: gwarancja 12 miesięcy od odbioru, serwis pogwarancyjny, przeglądy, szkolenia i diagnostyka zdalna. Cennik i zasady online.',
		image: '/assets/images/serwis/hero-serwis-maszyna.webp',
		type: 'website'
	},
	'/hmp-g1': {
		title: 'HMP-G1 – kompaktowe centrum frezarskie CNC | CERTUS',
		description:
			'CERTUS HMP-G1: kompaktowe centrum frezarskie CNC w pełnej zabudowie. Pole pracy 500 × 400 mm, oś Z do 350 mm, wrzeciono do 6 kW, opcjonalnie ATC 10–16 pozycji. Polski producent.',
		ogTitle: 'HMP-G1 – kompaktowe centrum frezarskie CNC | CERTUS',
		ogDescription:
			'Kompaktowe centrum frezarskie CNC w pełnej zabudowie. Precyzja, sztywność i wysoka wydajność w zwartej obudowie.',
		image: '/assets/maszyny/hmp-g1/hmp-g1-hero.webp',
		type: 'product'
	},
	'/bestseller': {
		title: 'Bestseller: Frezarko-Grawerka CNC Certus 69 | Polski Producent',
		description:
			'Poznaj frezarko-grawerkę CNC Certus 69 - nasz bestseller. Kompaktowa, precyzyjna i wszechstronna maszyna do obróbki aluminium, drewna i metali kolorowych.',
		ogTitle: 'Frezarko-Grawerka CNC Certus 69 – Bestseller | CERTUS',
		ogDescription:
			'Niezawodna, precyzyjna frezarko-grawerka CNC Certus 69. Sprawdź specyfikację techniczną, galerię i możliwości obróbki.',
		image: '/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-glowne1.webp',
		type: 'product'
	},
	'/maszyny': {
		title: 'Maszyny CNC i Centra Obróbcze | CERTUS',
		description:
			'Poznaj pełną ofertę maszyn CNC Certus: frezarki CNC HMM, wielkoformatowe plotery przemysłowe HPP oraz centra 5-osiowe. Wybierz rozwiązanie dla swojego przemysłu.',
		ogTitle: 'Oferta Maszyn CNC i Centrów Obróbczych | CERTUS',
		ogDescription:
			'Frezarki CNC, plotery przemysłowe i centra obróbcze projektowane i produkowane w Polsce. Sprawdź naszą ofertę.',
		image: '/assets/images/baner1_plotery_hpp.webp',
		type: 'website'
	},
	'/maszyny-specjalne': {
		title: 'Maszyny specjalne CNC – budowa na zamówienie | CERTUS',
		description:
			'Projektujemy i budujemy dedykowane maszyny specjalne CNC pod indywidualne wymagania technologiczne i procesy produkcyjne klientów.',
		ogTitle: 'Maszyny specjalne CNC – budowa na zamówienie | CERTUS',
		ogDescription:
			'Indywidualne projekty maszyn CNC dopasowane do unikalnych potrzeb Twojego zakładu produkcyjnego.',
		image: '/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-glowne1.webp',
		type: 'website'
	},
	'/maszyny-specjalistyczne': {
		title: 'Maszyny Specjalne CNC na Zamówienie | CERTUS',
		description:
			'Projektujemy i budujemy dedykowane maszyny specjalne CNC pod indywidualne wymagania technologiczne i procesy produkcyjne klientów.',
		ogTitle: 'Dedykowane Maszyny Specjalne CNC | CERTUS',
		ogDescription:
			'Indywidualne projekty maszyn CNC dopasowane do unikalnych potrzeb Twojego zakładu produkcyjnego.',
		image: '/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-glowne1.webp',
		type: 'website'
	},
	'/onas': {
		title: 'O nas – Polski producent maszyn CNC | CERTUS',
		description:
			'Projektujemy i budujemy frezarki, plotery i centra obróbcze CNC w Choczni pod Wadowicami. Ponad 20 lat w branży CNC, 500+ wdrożeń w całej Polsce.',
		ogTitle: 'O nas – CERTUS | Budujemy maszyny CNC do pracy, nie do katalogu',
		ogDescription:
			'Poznaj zespół CERTUS, konfigurację maszyn pod detal klienta, sprawdzone komponenty na każdej osi i profesjonalny serwis producenta.',
		image: '/assets/images/onas/hero-3maszyny.webp',
		type: 'website'
	},
	'/kontakt': {
		title: 'Kontakt | CERTUS - Maszyny i Centra Obróbcze CNC',
		description:
			'Skontaktuj się z nami. Zespół doradców technicznych i handlowych CERTUS pomoże dobrać optymalną maszynę CNC dla Twojej firmy.',
		ogTitle: 'Skontaktuj się z CERTUS – Doradztwo i Oferta Maszyn CNC',
		ogDescription:
			'Masz pytania dotyczące maszyn CNC, serwisu lub konfiguracji? Skontaktuj się z nami telefonicznie lub przez formularz.',
		image: '/assets/kontakt-background.webp',
		type: 'website'
	},
	'/dokumentacja': {
		title: 'Dokumentacja Techniczna i Instrukcje Maszyn CNC | CERTUS',
		description:
			'Pobierz dokumentację techniczną, instrukcje obsługi oraz specyfikacje maszyn i centrów obróbczych CNC firmy CERTUS.',
		ogTitle: 'Dokumentacja i Pliki do Pobrania | CERTUS',
		ogDescription:
			'Specyfikacje techniczne, karty katalogowe i dokumentacja maszyn CNC Certus.',
		image: '/assets/images/certusPage.webp',
		type: 'website'
	},
	'/polityka-prywatnosci': {
		title: 'Polityka Prywatności | CERTUS',
		description:
			'Informacje o przetwarzaniu danych osobowych, plikach cookies oraz zasadach ochrony prywatności użytkowników serwisu mg-certus.pl.',
		ogTitle: 'Polityka Prywatności | CERTUS',
		ogDescription:
			'Zasady przetwarzania danych osobowych oraz ochrony prywatności w serwisie mg-certus.pl.',
		image: '/assets/images/certusPage.webp',
		type: 'website'
	},
	'/mapa-witryny': {
		title: 'Mapa Witryny | CERTUS',
		description:
			'Pełna struktura i spis wszystkich podstron oraz kategorii maszyn w serwisie CERTUS CNC.',
		ogTitle: 'Mapa Witryny | CERTUS',
		ogDescription:
			'Przegląd wszystkich podstron i modeli maszyn w serwisie mg-certus.pl.',
		image: '/assets/images/certusPage.webp',
		type: 'website'
	}
};

export function getRouteSeo(pathname: string): RouteSeoData | undefined {
	const normalized = pathname.replace(/\/$/, '') || '/';
	return routeSeoMap[normalized];
}


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
			'Specjalizujemy się w produkcji maszyn przemysłowych najwyższej jakości: centra obróbcze CNC, frezarki, plotery i grawerki. Ponad 20 lat doświadczenia.',
		ogTitle: 'CERTUS - Maszyny i Centra Obróbcze CNC | Polski Producent',
		ogDescription:
			'Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia maszyn w przemyśle.',
		image: '/assets/images/certusPage.jpg',
		type: 'website'
	},
	'/serwis': {
		title: 'Serwis maszyn CNC - Gwarancyjny i pogwarancyjny | CERTUS',
		description:
			'Profesjonalny serwis maszyn CNC Certus. Oferujemy serwis gwarancyjny, pogwarancyjny oraz modernizacje maszyn. Doświadczony zespół inżynierów i techników.',
		ogTitle: 'Profesjonalny Serwis Maszyn CNC | CERTUS',
		ogDescription:
			'Szybki serwis gwarancyjny i pogwarancyjny maszyn CNC, diagnostyka, naprawy oraz części zamienne. Sprawdź ofertę serwisu Certus.',
		image: '/assets/certus-serwis-pogwarancyjny.png',
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
		image: '/assets/images/bestseller/frezarko-grawerka-cnc-certus-69-glowne1.jpg',
		type: 'product'
	},
	'/maszyny': {
		title: 'Maszyny CNC i Centra Obróbcze | CERTUS',
		description:
			'Poznaj pełną ofertę maszyn CNC Certus: frezarki CNC HMM, wielkoformatowe plotery przemysłowe HPP oraz centra 5-osiowe. Wybierz rozwiązanie dla swojego przemysłu.',
		ogTitle: 'Oferta Maszyn CNC i Centrów Obróbczych | CERTUS',
		ogDescription:
			'Frezarki CNC, plotery przemysłowe i centra obróbcze projektowane i produkowane w Polsce. Sprawdź naszą ofertę.',
		image: '/assets/images/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg',
		type: 'website'
	},
	'/maszyny-specjalistyczne': {
		title: 'Maszyny Specjalistyczne CNC na Zamówienie | CERTUS',
		description:
			'Projektujemy i budujemy dedykowane maszyny specjalistyczne CNC pod indywidualne wymagania technologiczne i procesy produkcyjne klientów.',
		ogTitle: 'Dedykowane Maszyny Specjalistyczne CNC | CERTUS',
		ogDescription:
			'Indywidualne projekty maszyn CNC dopasowane do unikalnych potrzeb Twojego zakładu produkcyjnego.',
		image: '/assets/images/maszyny-specjalistyczne/frezarko-grawerka-cnc-certus-69-glowne1.jpg',
		type: 'website'
	},
	'/onas': {
		title: 'O nas - Polski producent maszyn CNC | CERTUS',
		description:
			'Jesteśmy polskim producentem maszyn CNC z ponad 20-letnim doświadczeniem. Tworzymy precyzyjne centra obróbcze dopasowane do indywidualnych potrzeb.',
		ogTitle: 'O firmie CERTUS – Polski Producent Maszyn CNC',
		ogDescription:
			'Poznaj historię, technologię i wartości marki CERTUS. Ponad dwie dekady precyzji i pasji w inżynierii maszynowej.',
		image: '/assets/images/onas/certus-maszyny-wielkogabarytowe-cnc.jpg',
		type: 'website'
	},
	'/kontakt': {
		title: 'Kontakt | CERTUS - Maszyny i Centra Obróbcze CNC',
		description:
			'Skontaktuj się z nami. Zespół doradców technicznych i handlowych CERTUS pomoże dobrać optymalną maszynę CNC dla Twojej firmy.',
		ogTitle: 'Skontaktuj się z CERTUS – Doradztwo i Oferta Maszyn CNC',
		ogDescription:
			'Masz pytania dotyczące maszyn CNC, serwisu lub konfiguracji? Skontaktuj się z nami telefonicznie lub przez formularz.',
		image: '/assets/kontakt-background.jpg',
		type: 'website'
	},
	'/dokumentacja': {
		title: 'Dokumentacja Techniczna i Instrukcje Maszyn CNC | CERTUS',
		description:
			'Pobierz dokumentację techniczną, instrukcje obsługi oraz specyfikacje maszyn i centrów obróbczych CNC firmy CERTUS.',
		ogTitle: 'Dokumentacja i Pliki do Pobrania | CERTUS',
		ogDescription:
			'Specyfikacje techniczne, karty katalogowe i dokumentacja maszyn CNC Certus.',
		image: '/assets/images/certusPage.jpg',
		type: 'website'
	},
	'/polityka-prywatnosci': {
		title: 'Polityka Prywatności | CERTUS',
		description:
			'Informacje o przetwarzaniu danych osobowych, plikach cookies oraz zasadach ochrony prywatności użytkowników serwisu mg-certus.pl.',
		ogTitle: 'Polityka Prywatności | CERTUS',
		ogDescription:
			'Zasady przetwarzania danych osobowych oraz ochrony prywatności w serwisie mg-certus.pl.',
		image: '/assets/images/certusPage.jpg',
		type: 'website'
	},
	'/mapa-witryny': {
		title: 'Mapa Witryny | CERTUS',
		description:
			'Pełna struktura i spis wszystkich podstron oraz kategorii maszyn w serwisie CERTUS CNC.',
		ogTitle: 'Mapa Witryny | CERTUS',
		ogDescription:
			'Przegląd wszystkich podstron i modeli maszyn w serwisie mg-certus.pl.',
		image: '/assets/images/certusPage.jpg',
		type: 'website'
	}
};

export function getRouteSeo(pathname: string): RouteSeoData | undefined {
	const normalized = pathname.replace(/\/$/, '') || '/';
	return routeSeoMap[normalized];
}


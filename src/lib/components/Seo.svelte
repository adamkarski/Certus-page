<script lang="ts">
	import { page } from '$app/stores';

	// Definiujemy dane SEO, które komponent może przyjąć
	export let title = 'CERTUS - Maszyny i Centra Obróbcze CNC';
	export let description = 'Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia.';
	export let image = 'https://mg-certus.pl/assets/images/maszyny/frezarki/frezarka-cnc-hmm-st/Frezarka-CNC-HMM-ST-z-ruchomym-stoem-Certus-1080-PRO.jpg'; // Domyślny obrazek
	export let type = 'website';

	// Pobieramy bazowy URL ze zmiennej środowiskowej
	// W przyszłości można to przenieść do .env i czytać za pomocą import.meta.env.VITE_BASE_URL
	const base_url = 'https://mg-certus.pl:5173'; 

	// Konstruujemy pełne adresy URL
	const canonicalUrl = `${base_url}${$page.url.pathname}`;
	const imageUrl = image.startsWith('http') ? image : `${base_url}${image}`;
	const logoUrl = `${base_url}/static/assets/logo-certus.svg`; // Zakładając, że logo jest w static/assets
</script>

<svelte:head>
	<!-- Standard SEO -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="CERTUS Maszyny CNC" />
	<meta property="og:logo" content={logoUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>

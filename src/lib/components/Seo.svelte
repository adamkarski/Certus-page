<script lang="ts">
	import { page } from "$app/stores";
	const base_url = "https://mg-certus.pl";
	// Definiujemy dane SEO, które komponent może przyjąć
	export let title = "CERTUS - Maszyny i Centra Obróbcze CNC";
	export let description =
		"Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia.";
	export let image = `${base_url}/static/images/certusPage.jpg`; // Domyślny obrazek
	export let type = "website";

	$: isHmp = $page?.url?.pathname?.startsWith("/hmp-g1");

	// Konstruujemy pełne adresy URL
	$: canonicalUrl = `${base_url}${$page.url.pathname}`;
	$: imageUrl = image.startsWith("http") ? image : `${base_url}${image}`;
	$: logoUrl = `${base_url}/static/assets/logo-certus.svg`; // Zakładając, że logo jest w static/assets
</script>

<svelte:head>
	{#if !isHmp}
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
	{/if}
</svelte:head>

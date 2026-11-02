<script lang="ts">
	import { page } from "$app/stores";
	import { getRouteSeo, type RouteSeoData } from "$lib/data/seo-routes";

	const BASE_URL = "https://mg-certus.pl";

	// Optional props (in case passed manually)
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let ogTitle: string | undefined = undefined;
	export let ogDescription: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let type: string | undefined = undefined;

	$: pageSeo = ($page?.data?.seo || {}) as {
		title?: string;
		description?: string;
		ogTitle?: string;
		ogDescription?: string;
		image?: string;
		type?: "website" | "product" | "article";
	};

	$: pathname = ($page?.url?.pathname || "/").replace(/\/$/, "") || "/";
	$: routeSeo = (getRouteSeo(pathname) || {}) as Partial<RouteSeoData>;

	$: effectiveTitle =
		title || pageSeo.title || routeSeo.title || "CERTUS - Maszyny i Centra Obróbcze CNC";
	$: effectiveDescription =
		description ||
		pageSeo.description ||
		routeSeo.description ||
		"Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia.";
	$: effectiveOgTitle =
		ogTitle || pageSeo.ogTitle || routeSeo.ogTitle || effectiveTitle;
	$: effectiveOgDescription =
		ogDescription ||
		pageSeo.ogDescription ||
		routeSeo.ogDescription ||
		effectiveDescription;
	$: effectiveType = type || pageSeo.type || routeSeo.type || "website";

	$: rawImage =
		image || pageSeo.image || routeSeo.image || "/assets/images/certusPage.jpg";
	$: cleanImage = rawImage.replace(/^\/static\//, "/").replace(/^static\//, "/");
	$: imageUrl = cleanImage.startsWith("http")
		? cleanImage
		: `${BASE_URL}${cleanImage.startsWith("/") ? "" : "/"}${cleanImage}`;

	$: canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
	$: logoUrl = `${BASE_URL}/assets/logo-certus.svg`;
</script>

<svelte:head>
	<!-- Standard SEO -->
	<title>{effectiveTitle}</title>
	<meta name="description" content={effectiveDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={effectiveType} />
	<meta property="og:title" content={effectiveOgTitle} />
	<meta property="og:description" content={effectiveOgDescription} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="CERTUS Maszyny CNC" />
	<meta property="og:logo" content={logoUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={effectiveOgTitle} />
	<meta name="twitter:description" content={effectiveOgDescription} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>

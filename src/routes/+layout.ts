import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return {
		seo: {
			title: 'CERTUS - Maszyny i Centra Obróbcze CNC',
			description: 'Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia.'
			// Można tu dodać domyślny og:image jeśli jest inny niż w Seo.svelte
		}
	};
};

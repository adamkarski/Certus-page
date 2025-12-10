import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data: parentData }) => {
	const childData = (await parentData?.('seo')) || {}; // Attempt to get seo from child data

	return {
		seo: {
			title: childData.title || 'CERTUS - Maszyny i Centra Obróbcze CNC',
			description: childData.description || 'Wysokowydajne centra obróbcze CNC, frezarki, plotery i grawerki. Profesjonalne doradztwo, serwis i wdrożenia.',
			image: childData.image, // Pass image if available from child
			type: childData.type || 'website' // Pass type if available from child
		}
	};
};

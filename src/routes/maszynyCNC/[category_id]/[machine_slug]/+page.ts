import type { PageLoad } from './$types';
import maszynyData from '$lib/data/maszyny.json';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const category = maszynyData.find((cat) => cat.id === params.category_id);
	if (!category || !category.seo) {
		throw error(404, 'Category not found or has no SEO data');
	}

	const machine = category.seo.find((m) => m.slug === params.machine_slug);
	if (!machine) {
		throw error(404, 'Machine not found');
	}

	const machineTitle = `${machine.name} | ${category.title} | CERTUS CNC`;
	const machineDescription =
		machine.short_description || `Poznaj szczegóły techniczne i możliwości maszyny ${machine.name}.`;
	const machineImage = machine.image;

	return {
		machine: machine,
		category: category,
		seo: {
			title: machineTitle,
			description: machineDescription,
			ogTitle: machineTitle,
			ogDescription: machineDescription,
			image: machineImage,
			type: 'product'
		}
	};
};

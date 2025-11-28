import { error } from '@sveltejs/kit';
import maszynyData from '$lib/data/maszyny.json';
import machineSeoContent from '$lib/data/machine-seo-content.json'; // New import
import { createSlug } from '$lib/utils/seo-utils';

// Helper function to find a specific machine entry based on category and machine SLUG from URL
function findMachineDetails(categoryId: string, machineSlug: string) {
    console.log(`findMachineDetails called with categoryId: ${categoryId}, machineSlug: ${machineSlug}`); // Log params
    
    for (const categoryEntry of maszynyData) {
        if (categoryEntry.id !== categoryId) {
            continue;
        }
        console.log(`Found categoryEntry: ${categoryEntry.id}`); // Log found category

        // Handle case where category.machine is a single string (direct machine)
        if (typeof categoryEntry.machine === 'string') {
            const internalMachineId = categoryEntry.machine;
            const seoDataForMachine = machineSeoContent[internalMachineId];

            if (seoDataForMachine) {
                const generatedSlug = createSlug(seoDataForMachine.title);
                console.log(`  Internal machine (single): ${internalMachineId}, Title: "${seoDataForMachine.title}", Generated Slug: "${generatedSlug}"`); // Log details
                if (generatedSlug === machineSlug) {
                    console.log(`  Match found for: ${internalMachineId}`); // Log match
                    return {
                        id: internalMachineId,
                        category_id: categoryEntry.id,
                        ...seoDataForMachine,
                        maszynyJsonData: categoryEntry
                    };
                }
            } else {
                console.log(`  No SEO data found for internalMachineId: ${internalMachineId}`); // Log missing SEO data
            }
        }
        // Handle case where category.machine is an array of machine IDs (sub-machines)
        else if (Array.isArray(categoryEntry.machine)) {
            for (const internalMachineId of categoryEntry.machine) {
                const seoDataForMachine = machineSeoContent[internalMachineId];

                if (seoDataForMachine) {
                    const generatedSlug = createSlug(seoDataForMachine.title);
                    console.log(`  Internal machine (array): ${internalMachineId}, Title: "${seoDataForMachine.title}", Generated Slug: "${generatedSlug}"`); // Log details
                    if (generatedSlug === machineSlug) {
                        console.log(`  Match found for: ${internalMachineId}`); // Log match
                        return {
                            id: internalMachineId,
                            category_id: categoryEntry.id,
                            ...seoDataForMachine,
                            maszynyJsonData: categoryEntry
                        };
                    }
                } else {
                    console.log(`  No SEO data found for internalMachineId: ${internalMachineId}`); // Log missing SEO data
                }
            }
        }
    }
    console.log(`No machine details found for categoryId: ${categoryId}, machineSlug: ${machineSlug}`); // Log no match
    return null;
}

export async function load({ params }) {
    const { category_id, machine_id } = params;

    console.log(`Load function received category_id: ${category_id}, machine_id: ${machine_id}`); // Log load params

    const machineDetails = findMachineDetails(category_id, machine_id);

    if (!machineDetails) {
        console.error(`404: Machine not found for category_id: ${category_id}, machine_id: ${machine_id}`); // Log 404
        throw error(404, 'Machine not found');
    }

    const canonicalSlug = createSlug(machineDetails.title);
    if (machine_id !== canonicalSlug) {
        // This is where a 301 redirect would typically go in a production setup.
        // For debugging, we'll allow it to pass but log the discrepancy.
        console.warn(`URL slug mismatch: Expected "${canonicalSlug}", Got "${machine_id}" for machine "${machineDetails.title}"`);
    }

    return {
        machine: {
            id: machineDetails.id,
            category_id: machineDetails.category_id,
            title: machineDetails.title,
            image: machineDetails.image,
            downloadLink: machineDetails.downloadLink,
            internalLinks: machineDetails.internalLinks,
            longDescriptionHtml: machineDetails.longDescriptionHtml,
            seoImages: machineDetails.seoImages, // Include seoImages
            galleryId: machineDetails.galleryId // Include galleryId
        },
        seo: {
            title: machineDetails.title,
            description: machineDetails.description,
            image: machineDetails.image,
            url: `/maszyny/${category_id}/${canonicalSlug}`,
            keywords: machineDetails.keywords
        }
    };
}

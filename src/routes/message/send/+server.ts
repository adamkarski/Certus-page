import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Disable prerendering for this server route
export const prerender = false;

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        console.log('Received form data:', data);

        // Simulate a successful response
        return json({ status: 'wyslano', message: 'Formularz został wysłany pomyślnie.' });

        // Simulate an error response (uncomment to test error)
        // return json({ status: 'error', message: 'Wystąpił błąd podczas przetwarzania formularza.' }, { status: 500 });

    } catch (error) {
        console.error('Error processing form data:', error);
        return json({ status: 'error', message: 'Nieprawidłowy format danych.' }, { status: 400 });
    }
};
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

// Fix for Svelte 4 / SvelteKit bug in Node SSR where SvelteKit erroneously checks Svelte 5 runes ($state)
if (typeof globalThis.$state === 'undefined') {
	const dummy = (v) => v;
	dummy.raw = (v) => v;
	dummy.snapshot = (v) => v;
	globalThis.$state = dummy;
}

export default {
	preprocess: preprocess({
		scss: {}
	}),
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false // Allow dynamic routes to be ignored
		}),
		csp: {
			directives: {
				'script-src': ['self', 'https://challenges.cloudflare.com', 'unsafe-inline'],
				'frame-src': ['self', 'https://challenges.cloudflare.com'],
				'connect-src': ['self', 'https://cdn.lottielab.com', 'https://api.mg-certus.pl', 'ws:', 'wss:']
			}
		},
		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				console.warn(`[prerender warning] HTTP ${status} on ${path} (from ${referrer || 'root'})`);
				return;
			},
			handleMissingId: (details) => {
				if (
					details.id.startsWith('m_') ||
					details.id.startsWith('m-')
				) {
					return;
				}
				console.warn(details.message);
			}
		}
	}
};

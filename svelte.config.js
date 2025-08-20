import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

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
			fallback: undefined,
			precompress: false,
			strict: false // Allow dynamic routes to be ignored
		}),
		csp: {
			directives: {
				'script-src': ['self', 'https://challenges.cloudflare.com'],
				'frame-src': ['self', 'https://challenges.cloudflare.com'],
				'connect-src': ['self', 'https://cdn.lottielab.com']
			}
		}
	}
};

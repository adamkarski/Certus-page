export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon/.DS_Store","favicon/apple-touch-icon.png","favicon/favicon-96x96.png","favicon/favicon.ico","favicon/favicon.svg","favicon/site.webmanifest","favicon/web-app-manifest-192x192.png","favicon/web-app-manifest-512x512.png","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.Cb3pW4ZV.js",app:"_app/immutable/entry/app.CDjMUPul.js",imports:["_app/immutable/entry/start.Cb3pW4ZV.js","_app/immutable/chunks/BXZxZXrf.js","_app/immutable/chunks/BkRqh9q4.js","_app/immutable/chunks/rWnS30K5.js","_app/immutable/entry/app.CDjMUPul.js","_app/immutable/chunks/BkRqh9q4.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/maszyny",
				pattern: /^\/maszyny\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/onas",
				pattern: /^\/onas\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/Background_Hero_swipe.jpg","assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg","assets/certus-pomoc-wdrozenia.png","assets/certus-serwis-pogwarancyjny.png","assets/certus-szkolenia-wdrozenia.jpg","assets/first-block-polyline.svg","assets/green-arrow.svg","assets/ikony/email.svg","assets/ikony/frezarki.svg","assets/ikony/grawerki.svg","assets/ikony/lokalizacja.svg","assets/ikony/onas-analiza-potrzeb.svg","assets/ikony/onas-dobor-rozwiazan.svg","assets/ikony/onas-wdrozenie.svg","assets/ikony/onas-wsparcie.svg","assets/ikony/plotery.svg","assets/ikony/telefon.svg","assets/ikony/tokarki.svg","assets/ikony/wszystkie.svg","assets/images/pattern-image1-2.png","assets/images/pattern-image1.png","assets/images/pattern-image2-1.png","assets/images/pattern-video-1.png","assets/images/pattern-video-1.svg","assets/images/pattern-video-2.png","assets/images/pattern-video-2.svg","assets/images/pattern-video-3.png","assets/images/pattern-video-3.svg","assets/images/triangle.svg","assets/kontakt-background.jpg","assets/logo-certus.json","assets/logo-certus.svg","assets/maszyny/.DS_Store","assets/maszyny/certus_7111_temp.png","assets/maszyny/certus_7111_temp_schemat01.png","assets/maszyny/certus_7111_temp_schemat02.png","assets/menu_back.png","assets/red-arrow.svg","assets/search.svg","assets/video/video.m4v","favicon/.DS_Store","favicon/apple-touch-icon.png","favicon/favicon-96x96.png","favicon/favicon.ico","favicon/favicon.svg","favicon/site.webmanifest","favicon/web-app-manifest-192x192.png","favicon/web-app-manifest-512x512.png","search-index.json","site.webmanifest"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.DLIDE4RF.js",app:"_app/immutable/entry/app.pk2uG-_L.js",imports:["_app/immutable/entry/start.DLIDE4RF.js","_app/immutable/chunks/KO0Y64iQ.js","_app/immutable/chunks/DO6R2vb4.js","_app/immutable/entry/app.pk2uG-_L.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DO6R2vb4.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dokumentacja",
				pattern: /^\/dokumentacja\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/kontakt",
				pattern: /^\/kontakt\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/mapa-witryny",
				pattern: /^\/mapa-witryny\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/maszyny",
				pattern: /^\/maszyny\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/onas",
				pattern: /^\/onas\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/polityka-prywatnosci",
				pattern: /^\/polityka-prywatnosci\/?$/,
				params: [],
				page: { layouts: [0,6,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/reklamacje",
				pattern: /^\/reklamacje\/?$/,
				params: [],
				page: { layouts: [0,7,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/serwis",
				pattern: /^\/serwis\/?$/,
				params: [],
				page: { layouts: [0,8,], errors: [1,,], leaf: 17 },
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

export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/Background_Hero_swipe.jpg","assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg","assets/certus-pomoc-wdrozenia.png","assets/certus-serwis-pogwarancyjny.png","assets/certus-szkolenia-wdrozenia.jpg","assets/first-block-polyline.svg","assets/green-arrow.svg","assets/ikony/.DS_Store","assets/ikony/email.svg","assets/ikony/facebook.svg","assets/ikony/lokalizacja.svg","assets/ikony/maszyny/.DS_Store","assets/ikony/maszyny/frezarki.svg","assets/ikony/maszyny/frezarki5osiowe.svg","assets/ikony/maszyny/grawerki.svg","assets/ikony/maszyny/plotery.svg","assets/ikony/maszyny/ploteryLinearne.svg","assets/ikony/maszyny/ploteryPrzemyslowe.svg","assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg","assets/ikony/maszyny/specjalistyczne.svg","assets/ikony/maszyny/tokarki.svg","assets/ikony/message.svg","assets/ikony/onas-analiza-potrzeb.svg","assets/ikony/onas-dobor-rozwiazan.svg","assets/ikony/onas-wdrozenie.svg","assets/ikony/onas-wsparcie.svg","assets/ikony/record.svg","assets/ikony/table/.DS_Store","assets/ikony/table/atc.svg","assets/ikony/table/opcje.svg","assets/ikony/table/oslonyboczne.svg","assets/ikony/table/oswietlenie.svg","assets/ikony/table/pulpit.svg","assets/ikony/table/rodzajewzeciona.svg","assets/ikony/table/stoelroboczy.svg","assets/ikony/table/wymiary.svg","assets/ikony/table/wysokosc.svg","assets/ikony/table/zbiornik.svg","assets/ikony/telefon.svg","assets/ikony/wszystkie.svg","assets/ikony/youtube.svg","assets/images/pattern-image1-2.png","assets/images/pattern-image1.png","assets/images/pattern-image2-1.png","assets/images/pattern-video-1.png","assets/images/pattern-video-1.svg","assets/images/pattern-video-2.png","assets/images/pattern-video-2.svg","assets/images/pattern-video-3.png","assets/images/pattern-video-3.svg","assets/images/triangle.svg","assets/kontakt-background.jpg","assets/logo-certus.json","assets/logo-certus.svg","assets/maszyny/.DS_Store","assets/maszyny/80f5ea646ec.png","assets/maszyny/88930d1c.png","assets/maszyny/certus_7111_temp.png","assets/maszyny/certus_7111_temp_schemat01.png","assets/maszyny/certus_7111_temp_schemat02.png","assets/maszyny/combined_88930d1c.png","assets/menu-active-bg.svg","assets/menu_back.png","assets/red-arrow.svg","assets/search.svg","assets/video/video.m4v","favicon/.DS_Store","favicon/apple-touch-icon.png","favicon/favicon-96x96.png","favicon/favicon.ico","favicon/favicon.svg","favicon/site.webmanifest","favicon/web-app-manifest-192x192.png","favicon/web-app-manifest-512x512.png","search-index.json","site.webmanifest"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.ii9-Vyvq.js",app:"_app/immutable/entry/app.f5UScjHy.js",imports:["_app/immutable/entry/start.ii9-Vyvq.js","_app/immutable/chunks/CZ49WNO-.js","_app/immutable/chunks/Cg5mWMQE.js","_app/immutable/entry/app.f5UScjHy.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Cg5mWMQE.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

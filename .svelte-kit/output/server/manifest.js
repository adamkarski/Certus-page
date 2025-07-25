export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/Background_Hero_swipe.jpg","assets/certus-maszyny-tworzone-z-pasja-i-precyzja.jpg","assets/certus-pomoc-wdrozenia.png","assets/certus-serwis-pogwarancyjny.png","assets/certus-szkolenia-wdrozenia.jpg","assets/first-block-polyline.svg","assets/green-arrow.svg","assets/ikony/email.svg","assets/ikony/facebook.svg","assets/ikony/frezarki.svg","assets/ikony/grawerki.svg","assets/ikony/lokalizacja.svg","assets/ikony/message.svg","assets/ikony/onas-analiza-potrzeb.svg","assets/ikony/onas-dobor-rozwiazan.svg","assets/ikony/onas-wdrozenie.svg","assets/ikony/onas-wsparcie.svg","assets/ikony/plotery.svg","assets/ikony/record.svg","assets/ikony/telefon.svg","assets/ikony/tokarki.svg","assets/ikony/wszystkie.svg","assets/ikony/youtube.svg","assets/images/pattern-image1-2.png","assets/images/pattern-image1.png","assets/images/pattern-image2-1.png","assets/images/pattern-video-1.png","assets/images/pattern-video-1.svg","assets/images/pattern-video-2.png","assets/images/pattern-video-2.svg","assets/images/pattern-video-3.png","assets/images/pattern-video-3.svg","assets/images/triangle.svg","assets/kontakt-background.jpg","assets/logo-certus.json","assets/logo-certus.svg","assets/maszyny/.DS_Store","assets/maszyny/certus_7111_temp.png","assets/maszyny/certus_7111_temp_schemat01.png","assets/maszyny/certus_7111_temp_schemat02.png","assets/menu_back.png","assets/red-arrow.svg","assets/search.svg","assets/video/video.m4v","favicon/.DS_Store","favicon/apple-touch-icon.png","favicon/favicon-96x96.png","favicon/favicon.ico","favicon/favicon.svg","favicon/site.webmanifest","favicon/web-app-manifest-192x192.png","favicon/web-app-manifest-512x512.png","search-index.json","site.webmanifest"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.8f9LYl4l.js",app:"_app/immutable/entry/app.D5FUoL7g.js",imports:["_app/immutable/entry/start.8f9LYl4l.js","_app/immutable/chunks/C_ITLKyn.js","_app/immutable/chunks/7ETh-EOw.js","_app/immutable/entry/app.D5FUoL7g.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/7ETh-EOw.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/dokumentacja","/kontakt","/mapa-witryny","/maszyny","/onas","/polityka-prywatnosci","/reklamacje","/serwis"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

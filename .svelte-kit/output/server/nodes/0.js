import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.C2wKxb4w.js","_app/immutable/chunks/BL8nUCH2.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CkttJHg2.js","_app/immutable/chunks/CdwoHo1I.js","_app/immutable/chunks/BpbfvEUE.js","_app/immutable/chunks/SvdCCocu.js","_app/immutable/chunks/D5uOeNLI.js"];
export const stylesheets = ["_app/immutable/assets/0.BHGV4iHe.css"];
export const fonts = [];

import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BH4-BXje.js","_app/immutable/chunks/7ETh-EOw.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CPRo2IRN.js","_app/immutable/chunks/CtXn64Vd.js","_app/immutable/chunks/C_ITLKyn.js","_app/immutable/chunks/CQVkI1G6.js"];
export const stylesheets = ["_app/immutable/assets/0.BKoY_thf.css"];
export const fonts = [];

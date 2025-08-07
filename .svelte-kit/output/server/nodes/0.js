import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CkpPAtHJ.js","_app/immutable/chunks/CHc3s7io.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BJW8a3Uk.js","_app/immutable/chunks/CxT1OD7f.js","_app/immutable/chunks/BfEGbiYr.js"];
export const stylesheets = ["_app/immutable/assets/0.DKhZ4d8b.css"];
export const fonts = [];

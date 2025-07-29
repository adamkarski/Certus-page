import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BAxdD0Lu.js","_app/immutable/chunks/BrZOaFpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BO5TVoVW.js","_app/immutable/chunks/DbZsF-Wj.js","_app/immutable/chunks/C1ep61Eb.js"];
export const stylesheets = ["_app/immutable/assets/0.BDWx4equ.css"];
export const fonts = [];

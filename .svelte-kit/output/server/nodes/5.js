import * as universal from '../entries/pages/onas/_layout.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/onas/+layout.ts";
export const imports = ["_app/immutable/nodes/5.CjM8uu3t.js","_app/immutable/chunks/CGfEuJTL.js","_app/immutable/chunks/DO6R2vb4.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

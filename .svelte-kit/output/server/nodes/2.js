import * as universal from '../entries/pages/maszyny/_layout.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/maszyny/+layout.ts";
export const imports = ["_app/immutable/nodes/2.BKjC2pbc.js","_app/immutable/chunks/BNXpxP00.js","_app/immutable/chunks/BkRqh9q4.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

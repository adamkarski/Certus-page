import * as universal from '../entries/pages/kontakt/_layout.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/kontakt/+layout.ts";
export const imports = ["_app/immutable/nodes/2.URzL1fia.js","_app/immutable/chunks/DmHw7fC1.js","_app/immutable/chunks/7ETh-EOw.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

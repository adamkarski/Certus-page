import * as universal from '../entries/pages/onas/_layout.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/onas/+layout.ts";
export const imports = ["_app/immutable/nodes/5.cmBX2Hch.js","_app/immutable/chunks/DwBRVhdj.js","_app/immutable/chunks/BrZOaFpE.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

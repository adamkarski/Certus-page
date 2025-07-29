import * as universal from '../entries/pages/reklamacje/_layout.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/reklamacje/+layout.ts";
export const imports = ["_app/immutable/nodes/7.cmBX2Hch.js","_app/immutable/chunks/DwBRVhdj.js","_app/immutable/chunks/BrZOaFpE.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

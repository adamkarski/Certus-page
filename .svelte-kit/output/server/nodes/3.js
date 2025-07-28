import * as universal from '../entries/pages/mapa-witryny/_layout.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/mapa-witryny/+layout.ts";
export const imports = ["_app/immutable/nodes/3.Bj72IwQu.js","_app/immutable/chunks/BGx2Ehlu.js","_app/immutable/chunks/Xqig9hI-.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];

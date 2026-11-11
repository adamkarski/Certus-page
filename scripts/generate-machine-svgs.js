import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';

const fontPath = fs.existsSync('static/fonts/Snasm-Italic.ttf')
  ? 'static/fonts/Snasm-Italic.ttf'
  : 'dokumenty na stronę/HMP-G1/FONT SNASM 28fc7216a1b52f6feda6901861c3d3e5/Snasm W00 Italic/Snasm W00 Italic.ttf';
const cachePath = 'scripts/.svg-cache.json';

// Persistent disk cache to prevent unnecessary recalculations
let diskCache = {};
if (fs.existsSync(cachePath)) {
  try {
    diskCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (e) {
    diskCache = {};
  }
}

const buffer = fs.readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

// Standardized vertical font box metrics to guarantee 100% IDENTICAL letter size
// across all titles regardless of descenders (p, y, g) or accents (ę, ć, ó).
const STANDARD_TOP = -720;
const STANDARD_BOTTOM = 330;
const STANDARD_HEIGHT = STANDARD_BOTTOM - STANDARD_TOP; // 1050

function getSvgData(text, fontSize = 1000) {
  const cacheKey = `${text}_${fontSize}_v2`;
  if (diskCache[cacheKey]) {
    return diskCache[cacheKey];
  }

  // Base font size 1000 matches native OpenType UPM (1000 unitsPerEm) for ultra-high vector resolution
  const p = font.getPath(text, 0, 0, fontSize);
  const bbox = p.getBoundingBox();
  const width = Math.round((bbox.x2 - bbox.x1) * 10) / 10;
  const height = STANDARD_HEIGHT;
  // Uniform baseline placement (-STANDARD_TOP) ensures capitals and baseline align perfectly
  const normalizedPath = font.getPath(text, -bbox.x1, -STANDARD_TOP, fontSize);

  const d = normalizedPath.commands
    .map((cmd) => {
      const f = (n) => Number(n.toFixed(2));
      switch (cmd.type) {
        case 'M':
          return `M${f(cmd.x)} ${f(cmd.y)}`;
        case 'L':
          return `L${f(cmd.x)} ${f(cmd.y)}`;
        case 'C':
          return `C${f(cmd.x1)} ${f(cmd.y1)} ${f(cmd.x2)} ${f(cmd.y2)} ${f(cmd.x)} ${f(cmd.y)}`;
        case 'Q':
          return `Q${f(cmd.x1)} ${f(cmd.y1)} ${f(cmd.x)} ${f(cmd.y)}`;
        case 'Z':
          return 'Z';
        default:
          return '';
      }
    })
    .join(' ');

  const result = {
    width,
    height,
    viewBox: `0 0 ${width} ${height}`,
    aspectRatio: Math.round((width / height) * 1000) / 1000,
    d
  };

  diskCache[cacheKey] = result;
  return result;
}

const machineNames = [
  'NOWOŚĆ',
  'Nowość',
  'NOWOŚĆ: HMP-G1',
  'BESTSELLER',
  'Bestseller',
  'HMP-G1',
  'HMP',
  'G1',
  'HMM',
  'HMM-ST',
  'HMM-GT',
  'ST',
  'GT',
  'HPP',
  'HPP-OT',
  'HPP-CT',
  'OT',
  'CT',
  'HLP',
  'HLP-FT',
  'FT',
  'CERTUS',
  'CERTUS 69',
  '69',
  'C69',
  'CERTUS HMM-ST',
  'CERTUS HMM-GT',
  'CERTUS HPP-OT',
  'CERTUS HPP-CT',
  'CERTUS HLP-FT',
  'CERTUS HMP-G1',
  'PRO',
  'ATC',
  'CERTUS 1080 PRO',
  'CERTUS 1410',
  'CERTUS 0816',
  'CERTUS 0815 ATC',
  'CNC HMM-ST',
  'CNC HMM-GT',
  'CNC HPP-CT',
  'CNC HPP-OT',
  'CNC 5-OSIOWE',
  '5-OSIOWE',
  'CNC GRAWER',
  'GRAWER',
  'CNC HLP-FT',
  'Kompaktowe centrum HMP-G1',
  'Frezarki CNC HMM',
  'Plotery przemysłowe CNC',
  'Frezarki pięcioosiowe',
  'Grawerki CNC',
  'Plotery CNC HLP-FT',
  'Certus 69',
  'Maszyny specjalistyczne',
  'Maszyny specjalne'
];

const svgs = {};
machineNames.forEach((name) => {
  svgs[name] = getSvgData(name);
});

// Save persistent disk cache
fs.writeFileSync(cachePath, JSON.stringify(diskCache, null, 2));

const output = `// Auto-generated machine title SVG vector data (Snasm Italic - High-Res 1000 UPM)
// Zero font files needed by client - 100% legal pure vector SVG
// Static cached paths with O(1) runtime lookup
export interface SvgData {
  width: number;
  height: number;
  viewBox: string;
  aspectRatio: number;
  d: string;
}

export const PRECOMPUTED_SVGS: Record<string, SvgData> = ${JSON.stringify(svgs, null, 2)};

// In-memory runtime cache for O(1) instant access
const runtimeCache = new Map<string, SvgData>();

export function getMachineSvg(text: string): SvgData | null {
  if (!text) return null;
  const trimmed = text.trim();
  if (runtimeCache.has(trimmed)) {
    return runtimeCache.get(trimmed)!;
  }
  if (PRECOMPUTED_SVGS[trimmed]) {
    runtimeCache.set(trimmed, PRECOMPUTED_SVGS[trimmed]);
    return PRECOMPUTED_SVGS[trimmed];
  }
  const upper = trimmed.toUpperCase();
  if (PRECOMPUTED_SVGS[upper]) {
    runtimeCache.set(trimmed, PRECOMPUTED_SVGS[upper]);
    return PRECOMPUTED_SVGS[upper];
  }
  return null;
}
`;

fs.writeFileSync('src/lib/data/machineSvgPaths.ts', output);
console.log('Successfully generated high-res cached machineSvgPaths.ts with', Object.keys(svgs).length, 'models');

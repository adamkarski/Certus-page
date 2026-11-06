import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { parse } from 'node-html-parser';

const buildDir = '.svelte-kit/output/prerendered';
const searchIndexPath = 'static/search-index.json';
const sitemapPath = 'static/sitemap.xml';
const staticRedirectsPath = 'static/_redirects';
const buildRedirectsPath = 'build/_redirects';
const BASE_URL = 'https://mg-certus.pl';

console.log('Rozpoczynam generowanie indeksu, sitemapy i reguł routingu z plików produkcyjnych...');

// Sprawdź, czy katalog build istnieje
if (!fs.existsSync(buildDir)) {
  console.warn(`⚠️ Katalog ${buildDir} nie istnieje. Prawdopodobnie projekt nie został jeszcze zbudowany. Przerywam.`);
  process.exit(0); // Zakończ bez błędu
}

const htmlFiles = globSync(`${buildDir}/**/*.html`);

const pages = htmlFiles.map((filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const root = parse(fileContent);

  // Wyciągnij tytuł strony
  const title = root.querySelector('title')?.text || path.basename(filePath, '.html');

  // Wyciągnij treść z głównych tagów
  const mainContent = root.querySelector('main')?.structuredText || '';

  // Wygeneruj ścieżkę URL
  let urlPath = '/' + path.relative(buildDir, filePath)
    .replace(/\\/g, '/')
    .replace(/^pages\//, '')
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '');

  // Normalizuj ścieżkę do formatu ze slashem na końcu (zgodnie z trailingSlash = 'always')
  if (urlPath !== '/' && !urlPath.endsWith('/')) {
    urlPath = `${urlPath}/`;
  }

  console.log(`📄 Indeksuję: ${filePath} -> ${urlPath}`);

  return {
    slug: urlPath,
    title: title,
    content: mainContent.replace(/\s+/g, ' ').trim(), // Usuń nadmiarowe białe znaki
  };
});

// 1. Zapisz indeks wyszukiwania
fs.writeFileSync(searchIndexPath, JSON.stringify(pages, null, 2));
console.log(`💾 Indeks wyszukiwania z ${pages.length} stronami zapisany w: ${searchIndexPath}`);

// 2. Automatycznie wygeneruj sitemap.xml ze wszystkimi podstronami (czyste adresy 200 OK z kanonicznym slashem)
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(p => `  <url>\n    <loc>${BASE_URL}${p.slug === '/' ? '/' : p.slug}</loc>\n  </url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemapXml);
if (fs.existsSync('build')) {
  fs.writeFileSync('build/sitemap.xml', sitemapXml);
}
console.log(`🗺️ Sitemap.xml zaktualizowany z ${pages.length} adresami URL (zgodnymi z SEO).`);

// 3. Automatycznie wygeneruj reguły _redirects (301 bez-slasha -> ze-slashem dla każdego adresu)
const staticRedirects = [
  '/do_pobrania/dokumentacja/Formularz-przegladu-technicznego-okresowego-checklista.pdf   /do_pobrania/dokumentacja/CERTUS_Protokol_serwisowy_karta_przegladu.pdf   301',
  '/do_pobrania/dokumentacja/Formularz-zgloszenia-usterki-serwisowy.pdf                   /do_pobrania/dokumentacja/CERTUS_Zgloszenie_usterki.pdf                   301',
  '/do_pobrania/dokumentacja/KARTA-KONTROLNA-BHP.pdf                                      /do_pobrania/dokumentacja/CERTUS_Karta_kontrolna_BHP.pdf                  301',
  '/do_pobrania/dokumentacja/OWS.pdf                                                      /do_pobrania/dokumentacja/CERTUS_OWS_Ogolne_Warunki_Sprzedazy.pdf          301',
  '/do_pobrania/dokumentacja/PROTOKOL-ODBIORU–TECHNICZNEGO-MASZYNY-CNC.pdf                /do_pobrania/dokumentacja/CERTUS_Protokol_odbioru_technicznego.pdf        301',
  '/do_pobrania/dokumentacja/PROTOKOL-ODBIORU%E2%80%93TECHNICZNEGO-MASZYNY-CNC.pdf        /do_pobrania/dokumentacja/CERTUS_Protokol_odbioru_technicznego.pdf        301',
  '/do_pobrania/dokumentacja/Protokol-szkoleniowo-wdrozeniowy-operatora-CNC.pdf           /do_pobrania/dokumentacja/CERTUS_Protokol_szkolenia_operatora.pdf       301',
  '/do_pobrania/dokumentacja/Zasady-serwisu-gwarancyjnego-pogwarancyjnego-i-okresowych-napraw-CERTUS.pdf /do_pobrania/dokumentacja/CERTUS_Zasady_serwisu_i_cennik.pdf 301',
  '/do_pobrania/Frezarki-CNC-HMM-ST.pdf            /do_pobrania/CERTUS_Karta_katalogowa_HMM-ST.pdf            301',
  '/do_pobrania/Frezarki-CNC-HMM-GT.pdf            /do_pobrania/CERTUS_Karta_katalogowa_HMM-GT.pdf            301',
  '/do_pobrania/Plotery-przemyslowe-CNC-HPP-OT.pdf /do_pobrania/CERTUS_Karta_katalogowa_HPP-OT.pdf           301',
  '/do_pobrania/Plotery-przemyslowe-CNC-HPP-CT.pdf /do_pobrania/CERTUS_Karta_katalogowa_HPP-CT.pdf           301',
  '/do_pobrania/Grawerki-CNC.pdf                   /do_pobrania/CERTUS_Karta_katalogowa_Grawerki-CNC.pdf      301',
  '/do_pobrania/Frezarki-5osiowe.pdf               /do_pobrania/CERTUS_Karta_katalogowa_Frezarki-5-osiowe.pdf  301',
  '/do_pobrania/Plotery-linearne-CNC.pdf           /do_pobrania/CERTUS_Karta_katalogowa_HLP-FT.pdf            301',
  '/maszyny-specjalistyczne                        /maszyny-specjalne/                                        301',
  '/maszyny-specjalistyczne/                       /maszyny-specjalne/                                        301'
];

const autoSlashRedirects = [];
for (const page of pages) {
  if (page.slug !== '/' && page.slug.endsWith('/')) {
    const withoutSlash = page.slug.slice(0, -1);
    autoSlashRedirects.push(`${withoutSlash.padEnd(48, ' ')}${page.slug}   301`);
  }
}

const finalRedirectsContent = [
  '# === Statyczne przekierowania plików i archiwalnych adresów ===',
  ...staticRedirects,
  '',
  '# === Automatyczne przekierowania 301 bez slasha na kanoniczny slash (SEO & UX) ===',
  ...autoSlashRedirects,
  '',
  '# === SPA Fallback dla podstron ===',
  '/*                                              /index.html   200',
  ''
].join('\n');

fs.writeFileSync(staticRedirectsPath, finalRedirectsContent);
if (fs.existsSync('build')) {
  fs.writeFileSync(buildRedirectsPath, finalRedirectsContent);
}
console.log(`🔀 Wygenerowano _redirects z ${autoSlashRedirects.length} automatycznymi regułami 301 bez-slasha -> ze-slashem.`);

console.log('✅ Gotowe!');

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { parse } from 'node-html-parser';

const buildDir = '.svelte-kit/output/prerendered';
const searchIndexPath = 'static/search-index.json';

console.log('🚀 Rozpoczynam generowanie indeksu wyszukiwania z plików produkcyjnych...');

// Sprawdź, czy katalog build istnieje
if (!fs.existsSync(buildDir)) {
  console.warn(`⚠️ Katalog ${buildDir} nie istnieje. Prawdopodobnie projekt nie został jeszcze zbudowany. Przerywam.`);
  process.exit(0); // Zakończ bez błędu
}

const pages = globSync(`${buildDir}/**/*.html`).map((filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const root = parse(fileContent);

  // Wyciągnij tytuł strony
  const title = root.querySelector('title')?.text || path.basename(filePath, '.html');

  // Wyciągnij treść z głównych tagów
  const mainContent = root.querySelector('main')?.structuredText || '';

  // Wygeneruj ścieżkę URL
  const urlPath = '/' + path.relative(buildDir, filePath).replace(/\\/g, '/').replace(/^pages\//, '').replace(/index\.html$/, '');

  console.log(`📄 Indeksuję: ${filePath}`);

  return {
    slug: urlPath,
    title: title,
    content: mainContent.replace(/\s+/g, ' ').trim(), // Usuń nadmiarowe białe znaki
  };
});

// Zapisz indeks do pliku JSON
fs.writeFileSync(searchIndexPath, JSON.stringify(pages, null, 2));
console.log(`💾 Indeks wyszukiwania z ${pages.length} stronami został zapisany w: ${searchIndexPath}`);

console.log('✅ Gotowe!');
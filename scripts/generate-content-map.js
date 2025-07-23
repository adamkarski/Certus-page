

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';

const siteUrl = 'https://twoja-domena.com'; // Zmień na swój URL
const contentPath = 'src/routes/**/*.md';
const searchIndexPath = 'static/search-index.json';
const sitemapPath = 'static/sitemap.xml';

console.log('🚀 Rozpoczynam generowanie mapy strony i indeksu wyszukiwania...');

const pages = globSync(contentPath).map((filePath) => {
  // Normalizuj ścieżkę do formatu URL
  const urlPath = filePath
    .replace(/^src\/routes/, '') // Usuń `src/routes`
    .replace(/\/\+page\.md$/, '') // Usuń `+page.md`
    .replace(/\/index\.md$/, '') // Usuń `index.md` (jeśli używasz)
    .replace(/\\/g, '/'); // Zamień \ na /

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  console.log(`📄 Przetwarzam: ${filePath} -> ${siteUrl}${urlPath}`);

  return {
    url: `${siteUrl}${urlPath}`,
    title: data.title,
    description: data.description,
    // Możesz dodać treść, jeśli chcesz ją przeszukiwać
    // content: content.slice(0, 200) // np. pierwsze 200 znaków
  };
}).filter(page => page.title); // Pomiń strony bez tytułu

// 1. Generowanie indeksu wyszukiwania
const searchIndex = pages.map(page => ({
  slug: page.url.replace(siteUrl, ''), // Użyj ścieżki jako sluga
  title: page.title,
  description: page.description,
}));

fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2));
console.log(`💾 Indeks wyszukiwania zapisany w: ${searchIndexPath}`);

// 2. Generowanie sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <priority>0.8</priority>
    </url>`
    )
    .join('')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemap);
console.log(`🗺️ Mapa strony zapisana w: ${sitemapPath}`);

console.log('✅ Gotowe!');


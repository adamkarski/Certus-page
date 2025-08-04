export function typoFix(html: string): string {
  const sierotki = [
    'a', 'i', 'o', 'u', 'w', 'z',
    'A', 'I', 'O', 'U', 'W', 'Z'
  ];

  const regex = /<[^>]+>|[^<]+/g;

  return html.replace(regex, (match) => {
    if (match.startsWith('<') && match.endsWith('>')) {
      return match;
    }

    let text = match;
    text = text.replace(
      new RegExp(`\\b(${sierotki.join('|')})\\s`, 'g'),
      (_, s) => `${s}\u00A0`
    );
    text = text.replace(
      /(\w+)-(\w+)/g,
      (m, before, after) => `${before}‑${after}`
    );
    return text;
  });
}

// Akcja Svelte dla dyrektywy typoFix
export function typoFixAction(node: HTMLElement) {
  const originalHTML = node.innerHTML || '';
  const fixedHTML = typoFix(originalHTML);
  node.innerHTML = fixedHTML;
  
  return {
    destroy() {
      // Cleanup jeśli potrzebny
    }
  };
} 
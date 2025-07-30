export function typoFix(text: string): string {
  const sierotki = [
    'a', 'i', 'o', 'u', 'w', 'z',
    'A', 'I', 'O', 'U', 'W', 'Z'
  ];
  
  let result = text;
  
  // Obsługa sierotki (pojedyncze litery)
  result = result.replace(
    new RegExp(`\\b(${sierotki.join('|')})\\s`, 'g'),
    (_, s) => `${s}\u00A0` // niełamliwa spacja
  );
  
  // Obsługa słów z myślnikami - zapobieganie dzieleniu słów złożonych
  result = result.replace(
    /(\w+)-(\w+)/g,
    (match, before, after) => `${before}‑${after}` // używamy niełamliwego myślnika (U+2011)
  );
  
  return result;
}

// Akcja Svelte dla dyrektywy typoFix
export function typoFixAction(node: HTMLElement) {
  const originalText = node.textContent || '';
  const fixedText = typoFix(originalText);
  node.innerHTML = fixedText;
  
  return {
    destroy() {
      // Cleanup jeśli potrzebny
    }
  };
} 
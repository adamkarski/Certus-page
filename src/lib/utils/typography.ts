export function typoFix(text: string): string {
  const sierotki = [
    'a', 'i', 'o', 'u', 'w', 'z',
    'A', 'I', 'O', 'U', 'W', 'Z'
  ];
  return text.replace(
    new RegExp(`\\b(${sierotki.join('|')})\\s`, 'g'),
    (_, s) => `${s}\u00A0` // niełamliwa spacja
  );
} 
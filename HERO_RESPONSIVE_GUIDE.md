# Hero Section - Nowy System Responsywności

## Co zostało zrobione

### 1. Stworzony nowy plik: `src/lib/hero-responsive.scss`
- Czysty, logiczny system responsywności tylko dla sekcji hero
- Nie wpływa na resztę aplikacji
- Zastępuje chaotyczne reguły z `responsive.scss`

### 2. Zaimportowany do `Section_Hero.svelte`
- Dodany import: `import "$lib/hero-responsive.scss";`

### 3. Wyłączone stare reguły w `responsive.scss`
- Wszystkie reguły dotyczące hero zostały zakomentowane
- Oznaczone komentarzem: `/* HERO RESPONSYWNOŚĆ PRZENIESIONA DO hero-responsive.scss */`

## Nowy System Breakpointów

| Rozdzielczość | Hero Height | Oferta Margin | Topline Size |
|---------------|-------------|---------------|--------------|
| 1920px+ | 100vh | 100vh | 2.6em |
| 1600-1919px | 95vh | 95vh | 2.4em |
| 1280-1599px | 90vh | 90vh | 2.2em |
| 1024-1279px | 85vh | 85vh | 2.0em |
| 768-1023px | 80vh | 80vh | 1.8em |
| 481-767px | 75vh | 75vh | 1.6em |
| max 480px | 70vh | 70vh | 1.4em |

## Specjalne Przypadki

### Pionowe rozdzielczości (aspect ratio < 1.2)
- Hero height: 60vh (dla ekranów 1024px+)

### Bardzo szerokie ekrany (aspect ratio > 2.5)  
- Hero height: 100vh

### Niskie ekrany laptop (1024px+, height < 700px)
- Usunięte `display: none` - teraz hero jest widoczne
- Hero height: 100vh

## Testowanie

### 1. Podstawowe testy
```bash
# Uruchom aplikację
npm run dev
# lub
yarn dev
```

### 2. Otwórz tester responsywności:
- Otwórz plik: `test-responsive.html` w przeglądarce
- Lub przejdź do: `file:///Users/tosh/Documents/PlatformIO/Projects/Certus project/test-responsive.html`

### 3. Testowanie (3 metody):

#### METODA A - Tester + DevTools (zalecana):
1. W testerze kliknij "Otwórz w Nowej Karcie"
2. Przejdź do karty z aplikacją
3. Naciśnij `F12` (Developer Tools)
4. Kliknij ikonę urządzenia mobilnego 📱
5. Wybierz "Responsive" i wpisz wymiary
6. Testuj różne rozdzielczości

#### METODA B - Bookmarklety:
1. Przeciągnij bookmarklety z testera do paska zakładek
2. Otwórz aplikację w nowej karcie
3. Klikaj bookmarklety żeby włączyć debug/sprawdzić info

#### METODA C - Ręczne testowanie:
1. Otwórz aplikację: http://localhost:5173
2. Przeciągnij za róg okna przeglądarki
3. Obserwuj zmiany w sekcji hero

### 4. Rozdzielczości do testowania:
- **Desktop**: 1920x1080, 1600x900, 1440x900, 1280x720
- **Laptop**: 1366x768, 1024x768
- **Tablet**: 1024x768, 768x1024
- **Mobile**: 414x896, 375x667, 360x640
- **Problematyczne**: 1024x600, 2560x1080, 1200x1600

### 5. Sprawdź czy:
- ✅ Hero ma odpowiednią wysokość (zgodną z tabelą breakpointów)
- ✅ Sekcja #oferta nie nakłada się na hero
- ✅ Swiper-container ma odpowiedni rozmiar tekstu
- ✅ Nie ma problemów z przewijaniem
- ✅ Inne sekcje działają normalnie
- ✅ Debug mode pokazuje poprawne wymiary

## Debug Mode (opcjonalny)

Jeśli chcesz zobaczyć aktualne wymiary ekranu:

### 1. Dodaj klasę debug do body:
```javascript
// W konsoli przeglądarki:
document.body.classList.add('hero-debug');
document.body.setAttribute('data-viewport-info', 
  `${window.innerWidth}x${window.innerHeight} | ${window.innerWidth/window.innerHeight > 2.5 ? 'wide' : window.innerWidth/window.innerHeight < 1.2 ? 'tall' : 'normal'}`
);
```

### 2. Usuń debug:
```javascript
document.body.classList.remove('hero-debug');
```

## Rollback (jeśli coś pójdzie nie tak)

### 1. Usuń import z Section_Hero.svelte:
```typescript
// Usuń tę linię:
import "$lib/hero-responsive.scss";
```

### 2. Przywróć stare reguły w responsive.scss:
- Usuń komentarze `/* */` z zakomentowanych reguł hero

### 3. Usuń nowy plik:
```bash
rm src/lib/hero-responsive.scss
```

## Dalsze Optymalizacje (opcjonalne)

### 1. Dodaj smooth transitions:
Już dodane w nowym pliku - wszystkie zmiany mają `transition: all 0.3s ease-in-out`

### 2. Dodaj więcej breakpointów:
Możesz dodać dodatkowe media queries w `hero-responsive.scss`

### 3. Optymalizuj dla konkretnych urządzeń:
```scss
/* iPhone 12 Pro */
@media only screen and (device-width: 390px) and (device-height: 844px) {
  // specjalne reguły
}
```

## Kontakt

Jeśli masz problemy lub pytania:
1. Sprawdź konsolę przeglądarki pod kątem błędów
2. Użyj debug mode żeby zobaczyć wymiary
3. Przetestuj rollback jeśli coś nie działa
# Hero + O-nas Layout - Naprawione Pozycjonowanie

## 🎯 **Problem do rozwiązania**

### **Wymagania**:
1. **Swiper hero** musi być **między navbar a sekcją "onas"**
2. **Sekcja "onas"** powinna **lekko wystawać z dołu** hero
3. **Teksty hero** nigdy nie mogą być przykryte przez navbar
4. **Tylko na stronie głównej** (body.home)

### **Poprzedni problem**:
- Moje wcześniejsze zmiany safe area zepsuły odstępy dla sekcji onas
- Brak właściwego pozycjonowania sekcji onas względem hero

## ✅ **Rozwiązanie - Trójwarstwowy Layout**

### **1. Navbar (z-index: 50)**
```scss
nav {
  position: fixed;
  top: 0;
  z-index: 50; /* Najwyższy - zawsze na wierzchu */
  height: ~132px; /* 95px ramka + 37px padding */
}
```

### **2. Hero Section (z-index: 0)**
```scss
.hero {
  position: fixed;
  z-index: 0; /* Tło - najniższy */
  height: 100vh; /* Responsywne wysokości */
}

.hero-bg {
  padding-top: 160px; /* Safe area - swiper między navbar a onas */
}
```

### **3. Sekcja O-nas (z-index: 10)**
```scss
:global(.home #o-nas) {
  position: relative;
  z-index: 10; /* Między hero (0) a navbar (50) */
  margin-top: -100px; /* Lekko wystaje z dołu hero */
}
```

## 📊 **Responsywne Dostosowania**

### **Hero Safe Area (padding-top)**:
| Rozdzielczość | Safe Area | Cel |
|---------------|-----------|-----|
| 1920px+ | 180px | Duży odstęp dla dużych tekstów |
| 1600-1919px | 170px | Średni odstęp |
| 1280-1599px | 160px | Standardowy odstęp |
| 768-1279px | 160px | Zachowany odstęp |
| 481-767px | 140px | Mniejszy na mobile landscape |
| max 480px | 130px | Najmniejszy na mobile portrait |

### **Sekcja O-nas Wystawanie (margin-top)**:
| Rozdzielczość | Wystawanie | Efekt |
|---------------|------------|-------|
| 1920px+ | -120px | Więcej wystawania na dużych ekranach |
| 1600-1919px | -110px | Średnie wystawanie |
| 1280-1599px | -100px | Standardowe wystawanie |
| 1024-1279px | -90px | Mniejsze na laptopach |
| 768-1023px | -80px | Tablet landscape |
| 481-767px | -70px | Mobile landscape |
| max 480px | -60px | Mobile portrait |

### **Teksty Hero Pozycjonowanie**:
| Rozdzielczość | Top Margin | Min Height |
|---------------|------------|------------|
| Desktop | 20px | 60px |
| Mobile L | 15px | 50px |
| Mobile P | 10px | 40px |

## 🏗️ **Struktura Layoutu**

```
┌─────────────────────────────────────┐
│ NAVBAR (z-index: 50, fixed)        │ ← Zawsze na wierzchu
├─────────────────────────────────────┤
│ SAFE AREA (160px+ padding-top)     │ ← Bezpieczna strefa
│ ┌─────────────────────────────────┐ │
│ │ SWIPER HERO                     │ │ ← Między navbar a onas
│ │ (teksty + top: 20px)            │ │
│ └─────────────────────────────────┘ │
│ HERO BACKGROUND (z-index: 0)       │ ← Tło
├─────────────────────────────────────┤
│ ↑ SEKCJA O-NAS WYSTAJE (-100px)    │ ← Lekko wystaje z dołu
│ (z-index: 10)                      │
└─────────────────────────────────────┘
```

## 🎯 **Korzyści Rozwiązania**

### ✅ **Rozwiązane problemy**:
- ❌ Swiper przykryty przez navbar → ✅ **Safe area 160px+**
- ❌ Brak wystawania sekcji onas → ✅ **Negative margin -100px+**
- ❌ Zepsute odstępy onas → ✅ **Responsywne dostosowania**
- ❌ Niespójne pozycjonowanie → ✅ **Trójwarstwowy z-index system**

### 🔧 **Zachowane funkcjonalności**:
- ✅ Wszystkie animacje hero działają
- ✅ Swiper responsywność zachowana
- ✅ Smooth transitions działają
- ✅ Hover effects na kafelkach
- ✅ Sekcja onas ma właściwe style

### 📱 **Testowane scenariusze**:
- ✅ **Desktop**: Duży safe area (180px) + duże wystawanie (-120px)
- ✅ **Laptop**: Średni safe area (160px) + średnie wystawanie (-90px)
- ✅ **Tablet**: Dostosowany safe area (160px) + wystawanie (-80px)
- ✅ **Mobile**: Mały safe area (130px) + małe wystawanie (-60px)

## 🧪 **Jak przetestować**

### **1. Layout Test**:
1. Otwórz: http://localhost:5173
2. Sprawdź czy swiper jest między navbar a sekcją onas
3. Sprawdź czy sekcja onas lekko wystaje z dołu hero
4. Sprawdź czy teksty nie są przykryte przez navbar

### **2. Responsywność Test**:
1. F12 → Device Toolbar → Responsive
2. Testuj różne rozmiary: 1920x1080, 1280x720, 768x1024, 375x667
3. Sprawdź czy proporcje są zachowane na wszystkich ekranach

### **3. Scroll Test**:
1. Przewiń stronę w dół
2. Sprawdź czy sekcja onas ma właściwe pozycjonowanie
3. Przewiń z powrotem - sprawdź czy layout się nie zepsuł

### **4. Hover Test**:
1. Najedź na kafelki hero
2. Sprawdź czy animacje tekstów działają
3. Upewnij się, że teksty nie "uciekają" pod navbar lub onas

## 📝 **Szczegóły Techniczne**

### **Z-index Hierarchy**:
```scss
navbar: z-index: 50    /* Najwyższy - zawsze widoczny */
onas:   z-index: 10    /* Średni - wystaje z hero */
hero:   z-index: 0     /* Najniższy - tło */
```

### **Safe Area Calculation**:
```
Navbar height: ~132px
Safe area: 160px+ (28px+ buffer)
Text top: 20px (dodatkowy margines)
Total buffer: 48px+ (bezpieczny odstęp)
```

### **Overlap Calculation**:
```
Hero height: 100vh (responsywne)
Onas margin-top: -100px (responsywne)
Efekt: Sekcja onas wystaje ~100px z dołu hero
```

## 🚀 **Rezultat**

**Perfect Layout na stronie głównej:**

- ✅ **Navbar** zawsze na wierzchu (z-index: 50)
- ✅ **Swiper hero** bezpiecznie między navbar a onas
- ✅ **Sekcja onas** lekko wystaje z dołu hero
- ✅ **Teksty hero** nigdy nie są przykryte
- ✅ **Responsywne dostosowania** dla wszystkich ekranów
- ✅ **Smooth UX** bez wizualnych problemów

**Layout hero + onas jest teraz idealny!** 🎉
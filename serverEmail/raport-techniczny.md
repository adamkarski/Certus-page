# Raport techniczny —konfiguracja poczty mg-certus.pl

**Data:** 27.08.2026
**Domena:** mg-certus.pl
**Serwer pocztowy:** cyber-folks (s141.cyber-folks.pl)

---

## 0. Przyczyna problemów

**Wszystkie wykryte problemy wynikały z niepoprawnej konfiguracji poczty na serwerze hostingowym cyber-folks.** Początkowo poczta była obsługiwana przez inny serwer (domenomania). Po migracji na cyber-folks konfiguracja nie została kompletnie przeniesiona — brakowało kluczy DNS, rekordy wskazywały na stare serwery, a zabezpieczenia end-pointu nie zostały dostosowane do nowej architektury.

---

## 1. Wykryte problemy

### 1.1 Niekompletna konfiguracja DKIM

Usługa DKIM była włączona na serwerze pocztowym cyber-folks, jednak klucz kryptograficzny nie został wygenerowany ani opublikowany w strefie DNS domeny. Odbiorcy weryfikujący DKIM (np. Yahoo, AOL) odrzucali wiadomości z kodem **550 5.7.9** — "sender is unauthenticated".

**Przyczyna:** Na serwerze cyber-folks włączono opcję DKIM, ale nie wygenerowano klucza w panelu DirectAdmin i nie opublikowano go w DNS.

**Skutek:** Maile z formularza kontaktowego trafiały do spamu lub były odrzucane przez serwery odbiorcze.

### 1.2 Niepoprawny rekord SPF

Rekord SPF w strefie DNS domeny wskazywał na serwery inne niż aktualny dostawca poczty (cyber-folks), co powodowało niezgodność IP nadawcy z zadeklarowaną polityką SPF.

**Przyczyna:** Po migracji poczty na cyber-folks rekord SPF nie został zaktualizowany, aby uwzględnić zakres IP nowego serwera.

**Skutek:** Weryfikacja SPF dla domeny mg-certus.pl zwracała wynik **FAIL** dla adresu IP serwera pocztowego.

### 1.3 Niepoprawna konfiguracja CORS

End-point pocztowy akceptował żądania z dowolnego originu, co stanowiło zagrożenie bezpieczeństwa (możliwość podszycia się pod formularz z dowolnej domeny).

**Przyczyna:** Konfiguracja end-pointu nie została dostosowana do nowej architektury — brakowało listy dozwolonych domen.

### 1.4 Brak resetu widgetu Turnstile

Po wysłaniu formularza (sukces lub błąd) token Cloudflare Turnstile nie był resetowany, co powodowało błędy przy kolejnych próbach wysłania (**timeout-or-duplicate**).

**Przyczyna:** Komponent Turnstile nie miał powiązania z mechanizmem resetu — token pozostawał zużyty po pierwszej próbie wysłania.

---

## 2. Podjęte działania

> **Uwaga dot. infrastruktury:** Strona internetowa oraz formularz kontaktowy są chronione przez Cloudflare (proxy). Cały ruch HTTP przechodzi przez sieć CDN Cloudflare, co zapewnia ochronę przed atakami DDoS, botami i innymi zagrożeniami na poziomie sieci. Poczta wychodząca (SMTP) nie przechodzi przez Cloudflare — jest wysyłana bezpośrednio z serwerów cyber-folks. Prawidłowa konfiguracja kluczy DNS (SPF, DKIM, DMARC) wpływa na dostarczalność wiadomości oraz ich autoryzację przez serwery odbiorcze.

### 2.1 Wygenerowanie i publikacja klucza DKIM

- Wygenerowano klucz RSA DKIM w panelu DirectAdmin (sekcja DNS → Edycja strefy)
- Selector: `x`
- Opublikowano rekord TXT `x._domainkey.mg-certus.pl` w strefie DNS (Cloudflare)

### 2.2 Aktualizacja rekordu SPF

Zaktualizowano rekord TXT SPF w strefie DNS, uwzględniając prawidłowy zakres IP serwera pocztowego:

```
v=spf1 a mx include:spf.linuxpl.com ip4:195.78.66.236 -all
```

### 2.3 Ograniczenie dostępu CORS

Zmodyfikowano end-point pocztowy — dozwolone originy to wyłącznie:

- `https://mg-certus.pl`
- `https://www.mg-certus.pl`

### 2.4 Naprawa mechanizmu resetu Turnstile

Dodano binding `bind:reset` do komponentu Cloudflare Turnstile w obu formularzach kontaktowych. Token jest resetowany po:

- Wysłaniu wiadomości (sukces)
- Wystąpieniu błędu wysyłki
- Błęzie renderowania widgetu (on:error)

### 2.5 Aktualizacja nagłówków CSP

Zaktualizowano politykę Content-Security Policy — domena end-pointu pocztowego dodana do `connect-src`.

---

## 3. Wynik

| Element                | Przed     | Po        |
| ---------------------- | --------- | --------- |
| DKIM                   | brak      | podpisany |
| SPF                    | FAIL      | PASS      |
| DMARC                  | brak      | monitor   |
| CORS                   | wildcard  | allowlist |
| Turnstile reset        | brak      | działa   |
| Dostarczalność maili | odrzucone | OK        |

---

## 4. Rekordy DNS (aktualny stan)

| Nazwa                     | Typ | Wartość                                                      |
| ------------------------- | --- | -------------------------------------------------------------- |
| mg-certus.pl              | MX  | mail.mg-certus.pl (priorytet 10)                               |
| mg-certus.pl              | TXT | `v=spf1 a mx include:spf.linuxpl.com ip4:195.78.66.236 -all` |
| x._domainkey.mg-certus.pl | TXT | `v=DKIM1; k=rsa; p=MIIBIjAN...`                              |
| _dmarc.mg-certus.pl       | TXT | `v=DMARC1; p=none; sp=none`                                  |
| mail.mg-certus.pl         | A   | 195.78.66.236                                                  |
| smtp.mg-certus.pl         | A   | 195.78.66.236                                                  |
| pop3.mg-certus.pl         | A   | 195.78.66.236                                                  |
| api.mg-certus.pl          | A   | 195.78.66.236                                                  |

---

## 5. Dalsze zalecenia

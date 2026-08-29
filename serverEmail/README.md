# Certus — ServerEmail API

Serwer emailowy dla formularzy kontaktowych na mg-certus.pl.
Hosted na cyber-folks (DirectAdmin), serwis: s141.cyber-folks.pl.

## Struktura plików

```
api/
├── sendEmail.php          ← Główny endpoint (formularz → SMTP)
├── api-upload.php         ← Tymczasowy upload plików (USUNĄĆ PO PRACY)
├── log-reader.php         ← Tymczasowy odczyt logów (USUNĄĆ PO PRACY)
├── .env                   ← Credentials SMTP (chmod 0640)
├── PHPMailer/             ← Biblioteka PHPMailer
└── email_log.txt          ← Logi (poza webrootem na serwerze)
```

## Wersja produkcyjna — sendEmail.php

Endpoint przyjmuje POST (multipart/form-data lub JSON) z polami:
- `firstName`, `lastName`, `email`, `phone`, `message`
- `formType`: `main-kontakt` | `serwis-kontakt`
- `cf-turnstile-response`: token Cloudflare Turnstile

Wysyła:
1. **Email do admina** → `zbigniew.karski@gmail.com` + `gmaro@mg-certus.pl` (obydwa)
2. **Auto-reply do klienta** → na adres z formularza

SMTP: `kontakt@mg-certus.pl` → `s141.cyber-folks.pl:465` (SSL)

CORS: allowlist → `https://mg-certus.pl`, `https://www.mg-certus.pl`

---

## Tymczasowe narzędzia (do usunięcia)

### api-upload.php — Upload plików

**Cel:** Szybki upload plików na serwer bez SSH/FTP.

**Uwaga: USUŃ TEN PLIK po zakończeniu prac konfiguracyjnych.**
Alternatywnie: `chmod 0444 api-upload.php` (tylko odczyt, brak możliwości wykonania).

#### Jak działa

1. Wymaga hasła w polu `password` (POST) lub nagłówku `X-Password`
2. Akceptuje tylko: `.php`, `.env`, `.txt`, `.json`
3. Max rozmiar: 5MB
4. Automatycznie tworzy backup istniejącego pliku (`.bak.YYYYMMDD-HHMMSS`)
5. Directory traversal zabezpieczony — nie można pisać poza katalogiem `api/`
6. Loguje wszystkie operacje do `upload_log.txt`

#### Użycie (curl)

```bash
curl -X POST https://api.mg-certus.pl/api-upload.php \
  -F "password=ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg=" \
  -F "file=@sendEmail-cyberfolks.php;filename=sendEmail.php" \
  -F "directory=/home/gmaro/domains/mg-certus.pl/public_html/api"
```

#### Odpowiedź (sukces)

```json
{
  "success": true,
  "message": "File uploaded: sendEmail.php",
  "path": "/home/gmaro/domains/mg-certus.pl/public_html/api/sendEmail.php",
  "size": 7432
}
```

#### Prawa dostępu (po użyciu)

```bash
# Ogranicz upload do odczytu
chmod 0444 api-upload.php

# Lub usuń entirely
rm api-upload.php
```

---

### log-reader.php — Odczyt logów

**Cel:** Szybki podgląd logów emailowych bez SSH.
**Uwaga: USUŃ TEN PLIK po zakończeniu prac.**

#### Użycie

```bash
# GET z hasłem
curl "https://api.mg-certus.pl/log-reader.php?p=ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg="

# Lub POST
curl -X POST https://api.mg-certus.pl/log-reader.php \
  -d "password=ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg="
```

Zwraca zawartość `email_log.txt` jako text/plain.

---

## Zabezpieczenia (domyślne po wdrożeniu)

| Plik | Domyślne prawa | Uwagi |
|------|----------------|-------|
| `sendEmail.php` | 0644 | Odczyt dla wszystkich, zapis dla ownera |
| `.env` | 0640 | Owner + group — **NIEUDOSTĘPNIAĆ publicznie** |
| `api-upload.php` | **0444** lub **USUNĄĆ** | Tylko odczyt (nie wykonywalny) |
| `log-reader.php` | **0444** lub **USUNĄĆ** | Tylko odczyt (nie wykonywalny) |
| `email_log.txt` | 0640 | Logi chronione |
| `api/` katalog | 0755 | Standardowy |

### Czego NIE robić

- Nigdy nie udostępniać `.env` publicznie
- Nie zostawiać `api-upload.php` na produkcji (hasło w kodzie)
- Nie zostawiać `log-reader.php` na produkcji
- Nie ustawiać `.env` na 0644 (publiczny odczyt)

### Checklista po wdrożeniu

- [ ] `sendEmail.php` działa — formularz na stronie wysyła maile
- [ ] `api-upload.php` usunięty lub chmod 0444
- [ ] `log-reader.php` usunięty lub chmod 0444
- [ ] `.env` chmod 0640
- [ ] `email_log.txt` nie jest dostępny publicznie
- [ ] Cloudflare Turnstile siteverify działa
- [ ] CORS allowlist ograniczony do mg-certus.pl
- [ ] SPF/DKIM poprawnie skonfigurowane w DNS

---

## Historia zmian

- 2026-08-27: Pierwsza wersja — migracja z domenomania na cyber-folks
  - Nowy endpoint: `api.mg-certus.pl/sendEmail.php`
  - SMTP: `kontakt@mg-certus.pl` → `s141.cyber-folks.pl:465`
  - CORS: allowlist zamiast wildcard
  - Turnstile reset w obu formularzach (Section_Kontakt + SerwisKontakt)

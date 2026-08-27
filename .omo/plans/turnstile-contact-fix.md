# turnstile-contact-fix - Work Plan

## TL;DR (For humans)
Naprawiam formularz kontaktowy na mg-certus.pl: mail ma przychodzić z `kontakt@mg-certus.pl` (zamiast domenomanii), Turnstile ma resetować widget po każdej próbie, a SMTP ma działać na serwerze cyber-folks (MX domeny).

**Co dostaniesz:** Działający formularz kontaktowy — Turnstile weryfikuje + mail dochodzi na `kontakt@mg-certus.pl` bez spamu.

**Dlaczego tak:** PHP zostaje (user nie chce migracji). Poczta leci na cyber-folks (MX domeny) — tam trzeba postawić endpoint SMTP. Frontend repair to 2 pliki, DNS robi user z naszą instrukcją.

**Czego NIE robimy:** Nie zmieniamy frameworka, nie ruszamy innych sekcji, nie przenosimy na Workers/SaaS, nie commity bez Twojego OK.

**Wysiłek:** Short (2-3h z Twoimi krokami manualnymi)
**Ryzyko:** Niskie — zmieniamy tylko mail + 2 komponenty + DNS
**Decyzje do sprawdzenia:** Kolejność kroków (stykasz się z DirectAdmin/Cloudflare)

Twój następny krok: Zatwierdź plan → zaczynamy od kroku 1.

---

> TL;DR (machine): Short effort, low risk. Fix SMTP auth by moving PHP to cyber-folks hosting, fix Turnstile lifecycle, update frontend URLs.

## Scope

### Must have
1. Mailbox `kontakt@mg-certus.pl` created on cyber-folks (user manual)
2. PHP send-email.php moved to cyber-folks with correct SMTP creds
3. Frontend endpoints point to `api.mg-certus.pl`
4. Turnstile widget resets after success/failure in both forms
5. SPF/DKIM records in Cloudflare DNS
6. CORS allowlist: only `mg-certus.pl` + `www.mg-certus.pl`

### Must NOT have (guardrails)
- No backend framework migration (staying with PHP)
- No env-var sitekey (hardcoded is fine for now)
- No changes to other page sections
- No commits without explicit user approval
- No SMTP password in repo (use config.php outside webroot)

## Verification strategy
> Each step verified before next. User confirms manual steps, agent verifies code changes.
- Test decision: manual E2E per step
- Evidence: .omo/evidence/task-<N>-turnstile-contact-fix.<ext>

## Execution strategy

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | - | 2, 3 | - |
| 2 | 1 | 4 | - |
| 3 | 1 | 5 | - |
| 4 | 2 | 6 | 5 |
| 5 | 3 | 7 | 6 |
| 6 | 4,5 | 7 | - |
| 7 | 6 | 8 | - |
| 8 | 7 | - | - |

## Todos

### Step 1: Utwórz skrzynkę na cyber-folks (USER MANUAL)
**Co zrobić:**
1. Zaloguj się na DirectAdmin: `https://s141.cyber-folks.pl:2223/`
2. Email Accounts → Create Mailbox
3. Adres: `kontakt@mg-certus.pl`
4. Hasło: wygeneruj silne, zapisz gdzieś bezpiecznie
5. Zanotuj dane SMTP: host, port, login (=pełny email), hasło

**Weryfikacja:** User potwierdza: "skrzynka utworzona, dane SMTP: ___"

---

### Step 2: Przygotuj PHP na cyber-folks (AGENT)
**Co zrobić:**
1. Skopiować `serverEmail/api/sendEmail.php` do nowej wersji
2. Zmienić dane SMTP na cyber-folks (host, port, user, pass — czekamy na dane od Ciebie)
3. Zmienić `setFrom()` na `kontakt@mg-certus.pl`
4. Dodać CORS allowlist: tylko `https://mg-certus.pl` + `https://www.mg-certus.pl`
5. Usunąć/zabezpieczyć email_log.txt z webroot

**Weryfikacja:** lsp_diagnostics clean, user widzi nowy plik

---

### Step 3: Upload PHP na cyber-folks (USER MANUAL)
**Co zrobić:**
1. W DirectAdmin: File Manager → `public_html/api/`
2. Wgrać: `send-email.php`, `config.php` (z nowymi danymi), cały folder `PHPMailer/`
3. Upewnić się że `config.php` jest poza webroot lub chroniony

**Weryfikacja:** User testuje w przeglądarce: `https://api.mg-certus.pl/api/send-email.php` → powinien dostać 405 Method Not Allowed (bo GET zamiast POST)

---

### Step 4: DNS — rekord A dla api.mg-certus.pl (USER MANUAL)
**Co zrobić:**
1. Zaloguj się do Cloudflare: mg-certus.pl
2. DNS → Records → Add Record
3. Type: A, Name: `api`, Content: IP serwera cyber-folks (z DirectAdmin)
4. Proxy status: DNS only (gray cloud) — bo PHP nie obsłuży Cloudflare proxy

**Weryfikacja:** `dig api.mg-certus.pl` → zwraca IP serwera cyber-folks

---

### Step 5: Zmień endpoint w frontendzie (AGENT)
**Co zrobić:**
1. `src/components/sections/Section_Kontakt.svelte`: zmienić `dm73147.domenomania.eu` na `api.mg-certus.pl`
2. `src/components/serwis/SerwisKontakt.svelte`: ta sama zmiana
3. Dodać `credentials: 'include'` do fetch (jeśli CORS wymaga)

**Weryfikacja:** lsp_diagnostics clean, grep nie znajduje starego URL

---

### Step 6: Napraw reset Turnstile (AGENT)
**Co zrobić:**
1. `Section_Kontakt.svelte`: dodać `bind:reset={turnstileReset}`, wywołać po sukcesie i błędzie
2. `SerwisKontakt.svelte`: dodać `let turnstileReset: (() => void) | undefined`, `bind:reset`, wywołać

**Weryfikacja:** lsp_diagnostics clean, grep potwierdza bind:reset w obu plikach

---

### Step 7: SPF/DKIM w Cloudflare (USER MANUAL)
**Co zrobić:**
1. W DirectAdmin cyber-folks: sprawdź wartości SPF i DKIM (lub wygeneruj)
2. W Cloudflare DNS mg-certus.pl: dodaj rekordy TXT:
   - SPF: `v=spf1 include:spf.cyber-folks.pl ~all` (dostosuj do danych z DirectAdmin)
   - DKIM: wg danych z DirectAdmin
3. (Opcjonalnie) DMARC: `_dmarc.mg-certus.pl` TXT `v=DMARC1; p=none; rua=mailto:kontakt@mg-certus.pl`

**Weryfikacja:** `dig TXT mg-certus.pl` → widzi SPF, `dig TXT default._domainkey.mg-certus.pl` → widzi DKIM

---

### Step 8: Test E2E (USER MANUAL)
**Co zrobić:**
1. Otwórz `https://mg-certus.pl/#kontakt`
2. Wypełnij formularz (imię, email, telefon, wiadomość)
3. Przejdź Turnstile
4. Wyślij
5. Sprawdź skrzynkę `kontakt@mg-certus.pl` — mail powinien dotrzeć
6. Sprawdź spam — nie powinno być w spamie
7. Sprawdź czy po wysyłce widget się zresetował (można wysłać drugi raz)

**Weryfikacja:** Mail dochodzi, nie w spamie, Turnstile resetuje się

---

## Final verification wave
> Po zakończeniu wszystkich kroków:
- [ ] F1. Formularz wysyła maila na `kontakt@mg-certus.pl`
- [ ] F2. Mail nie trafia do spamu
- [ ] F3. Turnstile resetuje się po każdej próbie
- [ ] F4. Nadawca to `kontakt@mg-certus.pl`
- [ ] F5. CORS blokuje inne domeny

## Commit strategy
Każdy krok kodowy = osobny commit po Twoim OK. Bez commitów bez Twojej akceptacji.

## Success criteria
1. Użytkownik wypełnia formularz → mail dochodzi na `kontakt@mg-certus.pl`
2. Mail nie jest w spamie
3. Nadawca = `kontakt@mg-certus.pl`
4. Turnstile resetuje się po każdej próbie
5. Wysyłanie wielokrotne działa (nie ma `timeout-or-duplicate`)

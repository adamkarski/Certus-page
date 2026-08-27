---
slug: turnstile-contact-fix
status: approved
intent: clear
pending-action: APPEND todos to .omo/plans/turnstile-contact-fix.md; fold Metis findings; TL;DR last
approach: Naprawa SMTP auth na domenomanii + identyfikacja nadawcy @mg-certus.pl + reset lifecycle Turnstile we frontendzie + hardening PHP/DNS. Pełny ledger: .omo/drafts/turnstile-contact-fix.notes.md
---

# Draft: turnstile-contact-fix

## Components (topology ledger)
<!-- id | outcome | status | evidence -->
- C1 | Widget Turnstile render+verify działa end-to-end | OK (nie ruszać) | email_log.txt "Turnstile verification successful." 2026-08-24
- C2 | Token lifecycle frontend: reset widgetu po sukcesie/błędzie w 2 formularzach | ACTIVE bug | Section_Kontakt.svelte:26,284-297,598; SerwisKontakt.svelte:161-242,597; log "timeout-or-duplicate" 2026-08-22
- C3 | PHP SMTP send pada ("Could not authenticate") | ACTIVE root cause | email_log.txt 2026-08-24 22:23:42; serverEmail/api/sendEmail.php:170-212
- C4 | Infra/DNS/identity: nadawca @mg-certus.pl, SPF/DKIM/DMARC, widget hostnames | ACTIVE | user pytanie "mail jak z mg-certus.pl"; MX nieznane → diagnoza W1

## Open assumptions (announced defaults)
- MX mg-certus.pl prawdopodobnie na domenomanii (user nie wie) → W1 dig rozstrzyga, plan ma gałąź B dla innego providera.
- DKIM per-domena może być niedostępny na shared hostingu → fallback: SPF+DMARC sp=none akceptowalne.
- Duplikat send-email.php w root nieużywany przez żaden deploy script (Render build = statyk) → można usunąć.

## Findings (cited - path:lines)
- Zobacz .omo/drafts/turnstile-contact-fix.notes.md (pełne fakty + log).

## Decisions (with rationale)
1. Zostać przy PHP na domenomanii (poczta tam stoi; migracja odrzucona przez usera).
2. Kanoniczny plik serverEmail/api/sendEmail.php; root duplikat DELETE (drift).
3. Nadawca = skrzynka @mg-certus.pl utworzona u dostawcy MX; Reply-To = klient (już w kodzie).
4. Sekrety → config.php poza webroot (config.php.example w repo); rotacja hasła SMTP obowiązkowa (wyciekł).
5. CORS allowlist [mg-certus.pl, www]; email_log.txt poza webroot / .htaccess deny.
6. Sitekey zostaje hardcodowany; bez env w tym scope.
7. FTP/panel/DNS wykonuje użytkownik wg instrukcji planu; agent tylko repo.

## Scope IN
Frontend reset fix (2 komponenty), PHP canonical refactor + config externalizacja, usunięcie duplikatu, instrukcje hostingowe (skrzynka, FTP, DNS CF, widget hostname), checklist weryfikacji E2E.

## Scope OUT (Must NOT have)
- Migracja backendu (Workers/SaaS), redesign formularzy, env-var sitekey, zmiany innych sekcji strony, commity bez requestu.

## Open questions
- Brak blokujących. MX rozstrzyga W1 w trakcie wykonania.

## Approval gate
status: approved (2026-08-24, user: "tak")

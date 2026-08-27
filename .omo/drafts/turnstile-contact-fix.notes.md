# DRAFT - turnstile-contact-fix

status: awaiting-approval
pending action: write .omo/plans/turnstile-contact-fix.md (scaffold script, then Metis, then APPEND todos)
intent: CLEAR
review_required: false

## Request (user, PL)
Formularz kontaktowy na https://mg-certus.pl ma działać z Cloudflare Turnstile. Domena przez Cloudflare, strona statyczna GitHub→Render, poczta+PHP na innym hostingu (domenomania, konto dm73147). Użytkownik nie wiedział, gdzie "mieszka" send-email.php i czy mail może wyglądać jako wysłany z @mg-certus.pl.

## Facts (evidence)
- Frontend: SvelteKit adapter-static, CSP ok (`challenges.cloudflare.com` w script-src/frame-src) — svelte.config.js:18-24.
- 2 formularze z Turnstile, sitekey hardcodowany `0x4AAAAAACEnWiyzZjf30AYU`:
  - src/components/sections/Section_Kontakt.svelte:598 (+ submit :225-317)
  - src/components/serwis/SerwisKontakt.svelte:597 (+ submit :161-242)
- Endpoint: POST multipart → https://dm73147.domenomania.eu/api/send-email.php
- PHP kopie w repo: serverEmail/api/sendEmail.php (kanoniczna) + send-email.php (root, duplikat).
- PHP zawiera pełną weryfikację siteverify (secret `0x4AAAAAACEnWmYxJ485BOOXrQZBbobe-Jc`) — poprawna.
- SYMPTOM (console od usera): walidacja OK → token jest → POST → **HTTP 500**.
  Kod błędów PHP: brak tokenu=400, siteverify fail=403, cURL fail=502 → **500 = wyjątek PHPMailera (SMTP send)**. Turnstile już działa; pada wysyłka SMTP z `certus@dm73147.domenomania.eu` port 465 SSL.
- Dokładny powód 500: plik email_log.txt obok skryptu na hostingu (FTP dostęp: TAK).
- Token lifecycle bug: Section_Kontakt sukces NIE czyści tokenu / nie resetchuje widgetu; SerwisKontakt czyści tylko zmienną, nigdy widget.reset(); `turnstileReset` niezbindowane (Section_Kontakt.svelte:26).
- Bezpieczeństwo: hasło SMTP `I2h(1dBTN=KeNIAK` + sekret Turnstile jawne w kodzie (repo PRYWATNE — user potwierdził) i były wklejone w czacie → rotacja zalecana. CORS reflect-any-origin. email_log.txt w webroocie.

## Decisions ledger (adopted defaults + answers)
1. Architektura zostaje: statyk Render + API PHP na domenomanii (user zaakceptował kierunek; jego troska = identyfikacja nadawcy, nie migracja).
2. Kanoniczna wersja PHP: `serverEmail/api/sendEmail.php`; duplikat root `send-email.php` usunąć/zsynchronizować (drift risk).
3. Nadawca maili: prawdziwa skrzynka @mg-certus.pl utworzona na hostingu obsługującym MX; Reply-To = email klienta (już jest). Wymaga rekordów SPF/DKIM(/DMARC) w Cloudflare DNS.
4. Nie wiemy gdzie MX dla mg-certus.pl → pierwszy todo-diagnoza: `dig MX mg-certus.pl` + decyzja skrzynki wg wyniku.
5. Rotacja hasła SMTP po naprawie (hasło było w czacie/kodzie).
6. Sitekey zostaje hardcodowany (minimalny scope); opcjonalnie env — NIE w tym planie.
7. Hardening PHP: CORS allowlist (https://mg-certus.pl, www), log poza webroot lub .htaccess deny, sekret/hasło do configu poza webrootem.

## Topology (components)
- C1 Widget Turnstile render — działa (token dochodzi do PHP; 500≠403). Dowód: konsola usera.
- C2 Token lifecycle frontend — BUG, do naprawy (reset po sukcesie/błędzie).
- C3 PHP SMTP send — PADA (500). Naprawa wg email_log.txt + zmiana nadawcy na @mg-certus.pl.
- C4 Infra/DNS — CF proxy OK; do dodania SPF/DKIM/DMARC; weryfikacja hostname'ów widgetu w dashbordzie CF (mg-certus.pl, www).

## ROOT CAUSE (potwierdzony logiem email_log.txt, user wkleił 2026-08-24)
1. GŁÓWNY: `SMTP Error: Could not authenticate.` po udanej weryfikacji Turnstile ("Turnstile verification successful." → 2s później SMTP auth fail).
   → Serwer SMTP `dm73147.domenomania.eu:465`, user `certus@dm73147.domenomania.eu`: złe hasło lub skrzynka nie istnieje/wyłączona, ew. wymagany port 587/STARTTLS albo autoryzacja inną nazwą. Fix: potwierdzić/odtworzyć skrzynkę w panelu domenomanii + poprawne dane w PHP (config poza webrootem), ew. port 587.
2. WTÓRNY (wpis z 2026-08-22): `timeout-or-duplicate` — token zużyty/wygasał przy retry. Potwierdza bug C2 (brak resetu widgetu) — naprawa frontendu obowiązuje.
3. Turnstile siteverify DZIAŁA end-to-end (wpis "verification successful" 2026-08-24). Dashboard/hostname config OK.

## Approval gate
Brief przedstawiony. Czekam na explicite "tak" → scaffold → Metis → todos → TL;DR.

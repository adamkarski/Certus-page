# Podsumowanie konfiguracji poczty — mg-certus.pl

**Data:** 27.08.2026

---

## Co zostało zrobione

### Bezpieczeństwo strony

Strona internetowa mg-certus.pl jest chroniona przez Cloudflare. Oznacza to, że:

- Strona jest odporna na ataki i przeciążenia
- Formularz kontaktowy jest zabezpieczony przed spamem (weryfikacja Turnstile)
- Ruch między użytkownikiem a stroną jest szyfrowany

### Przyczyna problemów

**Wszystkie problemy z dostarczalnością maili wynikały z niepoprawnej konfiguracji poczty na serwerze hostingowym.** Po migracji poczty na nowy serwer konfiguracja nie została kompletnie przeniesiona — brakowało kluczy DNS, rekordy wskazywały na stare serwery, a zabezpieczenia nie były dostosowane.

### Co naprawiliśmy

| Problem                           | Co oznaczał                                                          | Co zrobiliśmy                                               |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Brak podpisu DKIM**       | Maile były odrzucane przez część serwerów pocztowych (np. Yahoo) | Wygenerowano klucz kryptograficzny i opublikowano go w DNS  |
| **Niepoprawny SPF**         | Serwery odbiorcze nie mogły zweryfikować nadawcy                    | Zaktualizowano rekord SPF w DNS                              |
| **Brak zabezpieczeń CORS** | Formularz mógł być wykorzystany z dowolnej strony                  | Ograniczono dostęp do dwóch domen                          |
| **Błędy Turnstile**       | Ponowne wysłanie formularza powodowało błąd                       | Naprawiono mechanizm resetu tokena                           |

### Efekt

- Maile z formularza kontaktowego są dostarczane do wszystkich dostawców poczty (Gmail, Yahoo, Outlook itd.)
- Wiadomości nie trafiają do spamu i poprawnie funkcjonuje forwarding maili z formularzy kontaktowych.
- Formularz działa poprawnie przy wielokrotnym użyciu
- Strona jest lepiej zabezpieczona przed atakami sieciowymi

---

*Raport sporządzony na podstawie analizy konfiguracji serwera i strefy DNS. Problemy wynikały z niepoprawnej konfiguracji poczty na serwerze hostingowym po migracji.*

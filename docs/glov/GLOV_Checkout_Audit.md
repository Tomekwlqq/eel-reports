# GLOV — Audyt Checkout
> Data: 2026-05-13 | Desktop (1372x877) + analiza struktury
> URL: glov.co/checkouts/cn/... (Shopify One-Page Checkout)

---

## TL;DR — Checkout jest dobry, problem leży gdzie indziej

Checkout GLOV jest **zaskakująco dobry** jak na standardy polskiego e-commerce:
- One-page checkout ✅
- 6 metod płatności (BLIK, karta, PayPal, Klarna, Przelewy24, przelew) ✅
- Darmowa dostawa wyświetlana od razu po wpisaniu adresu ✅
- Express checkout: Shop Pay, PayPal, Google Pay na wejściu ✅

**Wniosek:** Drop Direct (26.3% checkout→purchase) to **NIE** jest problem z checkout UX. Prawdopodobna przyczyna: porzucenie po zobaczeniu wyboru metody wysyłki (zbyt wiele opcji DHL) lub brak preferowanej opcji (kurier do drzwi — widoczna jest tylko sieć punktów).

---

## Struktura checkout — ONE-PAGE

Shopify One-Page Checkout — wszystko na jednej stronie przewijając w dół:

```
[Góra strony]
├── Logo GLOV + "-25% na wszystko KOD: MAMA25" (announcement bar)
├── [EXPRESS] Shop Pay | PayPal | Google Pay
│
├── SEKCJA 1: Kontakt
│   └── E-mail (opcja: Zaloguj się)
│
├── SEKCJA 2: Dostawa
│   ├── Kraj/region (Polska domyślnie)
│   ├── Imię + Nazwisko
│   ├── Adres + Mieszkanie (opcjonalne)
│   ├── Kod pocztowy + Miasto
│   └── Telefon
│
├── SEKCJA 3: Metoda wysyłki [pojawia się po wpisaniu adresu]
│   ├── DHL Parcel POP punkty (sorted by distance) — GRATIS
│   └── [wiele opcji — wszystkie GRATIS dla zamówień ≥150 zł]
│
├── SEKCJA 4: Płatność
│   ├── Przelewy24 (domyślnie zaznaczone)
│   │   ├── BLIK
│   │   ├── Karta kredytowa (Visa, Mastercard + 2)
│   │   ├── PayPal
│   │   ├── Klarna
│   │   └── Przelew tradycyjny
│   └── "Wszystkie transakcje są bezpieczne i szyfrowane"
│
├── SEKCJA 5: Adres rozliczeniowy
│   ├── ● Taki sam jak adres wysyłki (domyślnie)
│   └── ○ Użyj innego adresu
│
├── [ ] Zapisz informacje (Shop Pay konto)
│
└── [ZAPŁAĆ TERAZ] (czarny przycisk)

[Stopka checkout]
Polityka zwrotu | Wysyłka | Polityka prywatności | Warunki | Anulowania
```

---

## Podsumowanie po prawej stronie (sticky)

| Element | Wartość |
|---|---|
| Produkt 1 | GLOV Sleeping Beauty Cheetah — 199,00 zł |
| Produkt 2 | Tarka-pumeks do stóp GLOV Pink — 39,90 zł |
| Suma częściowa | 238,90 zł |
| Wysyłka | GRATIS (po wpisaniu adresu) |
| **Suma** | **238,90 zł** |
| W tym VAT | 44,67 zł |
| Pole rabatowe | Widoczne ("Kod rabatowy lub karta prezentowa") |

---

## Metody płatności — pełna lista

| Metoda | Ikony | Dostępność |
|---|---|---|
| **Przelewy24** | Logo + ikony submetod | ✅ domyślna |
| **BLIK** | BLIK logo | ✅ |
| **Karta kredytowa** | Visa + Mastercard + 2 inne | ✅ |
| **PayPal** | PayPal logo | ✅ |
| **Klarna** | Klarna logo (różowa) | ✅ |
| **Przelew tradycyjny** | — | ✅ |
| **Shop Pay** (express) | Shop logo | ✅ (na górze) |
| **Google Pay** (express) | Google Pay logo | ✅ (na górze) |

**Brakuje:** Apple Pay — nie widoczne w tej sesji. Możliwe że pojawia się tylko na iOS Safari.

---

## Metody wysyłki

Wszystkie opcje to **punkty odbioru DHL** (posortowane wg odległości od podanego adresu):
- DHL POP ŻABKA — 0.04 km — GRATIS
- DHL ŻABKA — 0.04 km — GRATIS
- DHL POP Relay Metro — 0.1 km — GRATIS
- (i kolejne...)

**⚠️ KLUCZOWY PROBLEM:** Brak opcji kuriera do drzwi (home delivery) widocznej w pierwszej kolejności. Użytkownik widzi tylko punkty odbioru. Jeśli ktoś preferuje dostawę do domu, musi scrollować przez długą listę punktów żeby znaleźć tę opcję — lub jej po prostu nie ma i jest to zaskoczenie.

---

## Frictions znalezione w checkout

### ✅ Działa dobrze

| Element | Ocena |
|---|---|
| Express payment (Shop/PayPal/GPay) na górze | ✅ Best practice |
| One-page checkout | ✅ Mniejszy drop niż multi-step |
| Darmowa wysyłka pokazuje się natychmiast po adresie | ✅ |
| 6 metod płatności | ✅ Dobry wybór dla PL |
| BLIK dostępny | ✅ Niezbędne w Polsce |
| Karta kredytowa dostępna | ✅ |
| Klarna dostępna | ✅ (BNPL dla droższych produktów) |
| "Bezpieczne i szyfrowane" | ✅ Trust element |
| Brak wymagania rejestracji | ✅ Guest checkout |
| Polityki (zwrot, wysyłka) w stopce checkout | ✅ |

### ⚠️ Potencjalne problemy

| # | Problem | Dowód | Mechanizm |
|---|---|---|---|
| C1 | Wysyłka: tylko punkty DHL w pierwszej kolejności | Screenshooty checkout | Użytkownik który chce kuriera do drzwi musi scrollować lub opcja nie istnieje — potencjalne zaskoczenie i abandon |
| C2 | Tarka-pumeks w koszyku — skąd? | Screenshot koszyk | Stary produkt z poprzedniej sesji w ciasteczku — user może zobaczyć nieznany produkt i być zdezorientowany (dla nowych użytkowników) |
| C3 | "Zapłać teraz" zamiast "Złóż zamówienie" | Widoczne na screenshocie | Mniejsza bariera psychologiczna przy "zamów" vs "zapłać" — ale to drobiazg |
| C4 | Brak trust seals (SSL, Trusted Shops) przy przycisku | Widoczne na screenshocie | Brak dodatkowego potwierdzenia bezpieczeństwa tuż przed kliknięciem |
| C5 | Brak widocznej opcji kuriera do drzwi | Metody wysyłki | Jeśli kurier do drzwi w ogóle nie istnieje lub jest ukryty — duży problem dla użytkowników bez punktu DHL |

### ❓ Do weryfikacji

- Czy istnieje opcja kuriera DHL do drzwi? Jeśli nie — to poważny brak.
- Ile opcji wysyłki widzi użytkownik spoza Warszawy (np. mała miejscowość)?
- Czy Apple Pay pojawia się na iOS/Safari?
- Co widzi użytkownik Direct który wraca po porzuceniu koszyka — czy koszyk jest zachowany?

---

## Rewizja frictions #3 (Direct checkout drop 26.3%)

Z analizy wynika, że **checkout sam w sobie nie jest problemem** dla Direct.

**Nowa hipoteza:** Direct to głównie powracający użytkownicy którzy:
1. Dodają do koszyka (33.7% — najwyższy wskaźnik)
2. Klikają "Przejdź do kasy"
3. Widzą że wysyłka jest GRATIS (powinno motywować!)
4. **Ale** — może mają problem z metodą płatności której szukają (np. chcą Apple Pay na iOS)
5. Albo — Shopify wymaga emaila co przerywa flow zalogowanego użytkownika

**Alternatywna hipoteza (bardziej prawdopodobna):** Część "Direct" to tak naprawdę dark social + return visits po kilku dniach. Sesja wygasła, koszyk pusty, muszą zacząć od nowa — i nie pamiętają co chcieli kupić (bo pusty koszyk nie ma rekomendacji — Friction #5).

---

## Koszyk drawer — odkrycia (uzupełnienie)

Drawer otwiera się po kliknięciu ATC. Zawiera:
- **"Darmowa wysyłka przyznana!"** z paskiem 100% (dla 199 zł produktu > próg 150 zł) ✅
- **Upsell karuzelowy** — "Depilator z nano szkła GLOV 39,90 zł" + przycisk "Dobierz" ✅
- **"Do zamówienia od 120 zł prezent TUTAJ"** — link do prezentów ✅
- Pole wiadomości dla sprzedającego (opcjonalne) ✅
- Przycisk "PRZEJDŹ DO KASY — [kwota]" ✅
- Link "KONTYNUUJ ZAKUPY" ✅

**Wniosek:** Drawer koszyka jest dobrze zaprojektowany. Upsell jest obecny. Free shipping bar działa.

---

## Screenshoty zapisane

| Plik | Zawartość |
|---|---|
| (tymczasowe ID: ss_1632oowf7) | Drawer koszyka po ATC — upsell + free shipping |
| (tymczasowe ID: ss_7269pshj6) | Checkout krok 1 — express payment + formularz |
| (tymczasowe ID: ss_6573zv14w) | Checkout — metody wysyłki DHL (po wpisaniu adresu) |
| (tymczasowe ID: ss_3356im94w) | Checkout — sekcja płatności: BLIK, karta, PayPal, Klarna |
| (tymczasowe ID: ss_6464ddaxb) | Checkout — przycisk "Zapłać teraz" + stopka |

---

## Quick Wins z audytu checkout

| # | Akcja | Priorytet | Czas |
|---|---|---|---|
| 1 | Sprawdzić czy kurier do drzwi DHL jest dostępny — jeśli nie, dodać | 🔴 | 30 min |
| 2 | Dodać trust seal (Trusted Shops / SSL) przy przycisku "Zapłać teraz" | 🟡 | 15 min |
| 3 | Sprawdzić działanie Apple Pay na iOS Safari | 🟡 | 10 min |
| 4 | Zweryfikować czy powracający użytkownik (direct) ma zachowany koszyk po 24h | 🟡 | Test manualny |

---

*Analiza wykonana: 2026-05-13 | Desktop checkout, dane testowe (Jan Kowalski, 00-001 Warszawa)*

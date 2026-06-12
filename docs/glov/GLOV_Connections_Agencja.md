# Połączenia źródeł danych z Claude — Przewodnik agencyjny (multi-klient)

**Data:** 2026-05-22 · **Przepisane na natywny konektor:** 2026-06-09
**Autor:** Tomek Wlq — Ecomms Activation
**Cel:** Praca z dziesiątkami klientów GA4 przez natywny konektor `google-analytics-mcp` (bez warstwy pośredniej)

---

## Kluczowe pytanie: czy jeden konektor = 100 klientów GA4?

**Odpowiedź krótka: tak.** Natywny konektor `google-analytics-mcp` działa na OAuth jednego konta Google. To konto widzi **wszystkie** property GA4, do których zostało dodane jako użytkownik — niezależnie czy jest ich 1 czy 100.

Mechanika jest prosta:
- Łączysz konektor `google-analytics-mcp` jednym kontem Google agencji (jeden OAuth).
- `get_account_summaries` zwraca listę wszystkich kont i property, do których to konto ma dostęp.
- Każdy raport odpytujesz podając konkretne `property_id` — izolacja per klient robi się przez ID, nie przez osobne połączenia.

**Co to oznacza w praktyce dla agencji:**

Dajesz klientowi jedną instrukcję: „Dodaj `twoj_mail@agencja.pl` jako Viewer w GA4 → Admin → Property Access Management". Raz. Po Twojej stronie nic więcej — konektor przy następnym `get_account_summaries` zobaczy nową property automatycznie.

Nie potrzebujesz 100 osobnych połączeń ani aliasów. Jedno konto Google z dostępem do 100 property = jeden konektor = wszystkie property dostępne.

> **Weryfikacja na GLOV (2026-06-09):** `get_account_summaries` zwróciło 3 konta (Phenicoptere/GLOV, Sejf Zone, Plichta Audi) i wszystkie ich property z jednego połączenia. Model multi-klient potwierdzony w praktyce.

---

## Architektura multi-klient

### Model A: Jedno konto Google agencji (rekomendowany)

```
agencja@gmail.com
    │
    ├── dodany jako Viewer do GA4 klienta 1 (Property: 342844459)
    ├── dodany jako Viewer do GA4 klienta 2 (Property: 123456789)
    ├── dodany jako Viewer do GA4 klienta 3 (Property: 987654321)
    └── ... 100+ property

    ↓ jeden OAuth w konektorze google-analytics-mcp

Claude → get_account_summaries → widzi WSZYSTKIE property
       → run_report(property_id=...) → odpytuje wybraną
```

**Wymagane od klienta:** dodanie jednego maila agencji jako Viewer w GA4.
**Wymagana konfiguracja po stronie agencji:** jednorazowe połączenie konektora `google-analytics-mcp`.

**Ograniczenie:** klient musi Ci dać dostęp Viewer do swojego GA4 — nie obejdziesz tego. To standardowa praktyka agencyjna.

### Model B: Osobne konta Google per klient (pełna izolacja)

Gdy klient NIE chce dodawać Cię jako Viewer, a woli zostawić dane na swoim koncie Google — łączysz konektor osobno per konto Google. W praktyce oznacza to przełączanie aktywnego połączenia konektora, więc to wolniejszy model. Stosuj tylko gdy klient wymaga, by jego dane nigdy nie były widoczne z konta agencji.

**Kiedy stosować:** wymóg izolacji po stronie klienta, brak zgody na dodanie maila agencji.

### Model C: Hybrydowy (rekomendowany dla agencji 10-100 klientów)

```
Konto Google agencji + natywne konektory
    │
    ├── google-analytics-mcp  → jedno konto Google agencji
    │       └── dostęp do wszystkich GA4 gdzie jesteś Viewerem
    │
    ├── meta-ads-glov         → Facebook Business Manager GLOV
    ├── meta-ads-klientB      → Business Manager klienta B
    │
    └── shopify (per sklep)   → token Shopify GLOV
```

Jedno połączenie Google obsługuje wszystkich klientów GA4 którzy dodali Cię jako Viewer. Meta i Shopify — osobne połączenia per klient (tam nie ma hierarchii „dodaj jako Viewer").

---

## Co klient musi zrobić (onboarding checklist)

### GA4 (Google Analytics 4)

1. Wejdź na analytics.google.com
2. Admin → Property Access Management
3. Kliknij „+" → Add users
4. Wpisz: `[mail agencji]`
5. Rola: **Viewer** (wystarczy do czytania danych)
6. Zatwierdź

**Czas:** 2 minuty. Klient nie musi nic instalować. Property pojawi się w `get_account_summaries` od razu po zatwierdzeniu.

### Google Search Console

1. Wejdź na search.google.com/search-console
2. Wybierz property (domenę)
3. Settings → Users and permissions
4. Add user → wpisz mail agencji → Rola: **Full**
5. Zatwierdź

### Google Ads

1. Wejdź na ads.google.com
2. Tools → Access and security → Users
3. „+ New user" → wpisz mail agencji
4. Rola: **Read only**
5. Zatwierdź

### Meta Ads (Facebook Business Manager)

Tutaj nie ma „dodaj jako Viewer" — trzeba osobnego połączenia per klient.

**Opcja A (agencja ma dostęp przez swój BM):**
1. Business Manager klienta → Business Settings → People
2. Dodaj mail agencji jako Partner lub Employee
3. Daj dostęp do Ad Account
4. Agencja łączy konektor Meta Ads z tym kontem — jeden BM obsługuje wszystkie konta reklamowe, do których masz dostęp

**Opcja B (klient zostawia konto u siebie):**
1. Klient dodaje agencję jako Partnera w swoim BM z dostępem read/manage do Ad Account
2. Agencja łączy osobny konektor Meta dla tego konta

### Microsoft Clarity

Clarity ma system ról — możesz dodać maila agencji bezpośrednio w projekcie.

1. clarity.microsoft.com → projekt klienta → Settings → Members
2. Invite member → wpisz mail agencji → rola: **Member**
3. Agencja generuje Data Export Token ze swojego konta w tym projekcie

**Alternatywa:** klient generuje Data Export Token i wysyła Ci go. Konektor Clarity konfigurujesz z tym tokenem (tak działa obecne połączenie `clarity-glov`).

---

## Praktyczny workflow dla nowego klienta

```
Dzień 1 — onboarding
├── Wyślij klientowi checklist (3-5 kroków wyżej)
├── Klient dodaje mail agencji do GA4, SC, Ads (2-5 min)
└── get_account_summaries pokazuje nową property przy następnym zapytaniu

Dzień 1 — dla Ciebie (jeśli nowe konto Google)
└── Raz: połącz konektor google-analytics-mcp → wszystko gotowe

Dla Meta Ads (per klient)
└── Klient dodaje agencję jako Partnera w BM → łączysz konektor Meta
```

---

## Limity i ograniczenia

### Natywny konektor GA4 — co warto wiedzieć

| Kwestia | Szczegół |
|---------|----------|
| Liczba property | Jedno konto Google = setki property GA4, wszystkie po jednym OAuth |
| Izolacja danych | Robi się przez `property_id` w zapytaniu — zawsze podawaj właściwe ID |
| Token refresh | Konektor odświeża OAuth automatycznie — nie musisz się tym martwić |
| Lista dostępów | `get_account_summaries` — szybki sposób na sprawdzenie do czego masz dostęp |
| Wiele kont Google | Wymaga osobnego połączenia konektora i przełączania (Model B) |

### Google Analytics API — limity

- 10 żądań/sekundę per projekt Google Cloud
- 100 000 żądań/dzień (standardowe tokeny)
- Przy 100 klientach z codziennymi raportami warto monitorować zużycie quota (raport zwraca `return_property_quota`)

### Meta Ads API — limity

- Rate limiting per token (nie per konto)
- Business Manager z wieloma kontami: jedno połączenie obsługuje wszystkie konta do których masz dostęp
- Konektor Meta odświeża tokeny automatycznie

---

## Warianty połączeń — tabela decyzyjna

| Scenariusz | Metoda | Liczba połączeń |
|------------|--------|--------------|
| 1-5 klientów, wszystko Google | `google-analytics-mcp`, mail agencji jako Viewer | 1 |
| 10-100 klientów GA4 | `google-analytics-mcp`, mail agencji jako Viewer w każdym | 1 |
| Klienci Meta Ads | Konektor Meta przez Business Manager LUB osobny per klient | 1 (BM) lub N |
| Klienci chcą izolacji GA4 | Osobne połączenie konektora per konto Google | N (jeden per klient) |
| Enterprise, pełna kontrola | Service account Google, własne tokeny | N (per środowisko) |

---

## Natywny konektor vs service account — różnica multi-klient

**Natywny konektor `google-analytics-mcp` (OAuth):**
- Jeden OAuth = dostęp do WSZYSTKICH property GA4, gdzie konto jest Viewerem
- Idealne dla agencji: klient dodaje Cię jako Viewer, Ty nie ruszasz konfiguracji
- `get_account_summaries` zawsze pokazuje aktualny stan dostępów
- Token odświeżany automatycznie

**Service account Google:**
- Dodajesz adres service accountu jako Viewer do każdej property
- Brak interaktywnego OAuth — działa headless, dobre do automatyzacji/cron
- Więcej setupu po stronie Google Cloud, ale pełna kontrola i audyt
- Rekomendowane dopiero przy enterprise / pełnej automatyzacji onboardingu

---

## Onboarding nowego klienta — komenda do Claude'a

Po dodaniu maila agencji jako Viewer, napisz do Claude'a:

```
Sprawdź dostępne property GA4 (get_account_summaries) i pokaż,
czy property klienta [NAZWA] już się pojawiła.
```

Claude wywoła `get_account_summaries` i potwierdzi dostęp. Od tego momentu możesz odpytywać raporty przez `run_report(property_id=...)`.

---

## Notatka architektoniczna

Natywny konektor `google-analytics-mcp` daje prosty stack: nie ma warstwy pośredniej (OAuth proxy), nie ma aliasów do pilnowania, a izolacja klientów sprowadza się do jednego pola `property_id`. Tokeny i refresh obsługuje sam konektor.

Dla skali 100+ klientów z pełną automatyzacją onboardingu (bez ręcznego klikania OAuth) warto rozważyć **service account Google** — headless, audytowalny, zarządzalny przez API. Natywny konektor OAuth pozostaje rekomendowany dla typowej agencji do ~100 klientów.

---

*Dokument: GLOV_Connections_Agencja.md — Ecomms Activation / Me Myself & I*

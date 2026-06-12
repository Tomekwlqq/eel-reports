# GLOV — Instrukcja: eventy GA4 przez Google Tag Manager

**Kontener GTM:** `GTM-PQ9JFT2` (potwierdzony w kodzie strony glov.co)
**Property GA4:** `342844459` (glov.co, PLN)
**Tracking siedzi w GTM, NIE w plikach motywu Shopify** — wszystkie zmiany poniżej robi się w gtm.google.com, nie w Shopify Admin.
**Data:** 2026-06-11

> ⚠️ ZASADA: to produkcja. Każda zmiana w GTM → najpierw w **Preview/Debug Mode**, sprawdź w GA4 DebugView, dopiero potem **Submit/Publish**. GTM ma wersjonowanie — w razie błędu cofasz do poprzedniej wersji jednym kliknięciem.

---

## CZĘŚĆ A — Jak w ogóle dodać/poprawić event GA4 w GTM (podstawa)

Model w GTM: **Trigger** (kiedy) → **Tag** (co wyślij) → **Variables** (jakie dane dołącz).

### Krok po kroku — nowy event:
1. **gtm.google.com** → wybierz kontener `GTM-PQ9JFT2`.
2. **Tags → New → Tag Configuration → „Google Analytics: GA4 Event"**.
3. **Configuration Tag:** wskaż swój główny tag GA4 Config (ten z Measurement ID `G-...`).
4. **Event Name:** nazwa eventu (np. `add_to_cart`, `filter_select`).
5. **Event Parameters:** dodaj parametry (klucz → wartość, wartość zwykle z Variable, np. `{{DLV - source}}`).
6. **Triggering:** wybierz/utwórz trigger (kiedy ma się odpalić).
7. **Preview** (prawy górny róg) → otwórz glov.co w debug → wykonaj akcję → sprawdź czy tag się odpalił i z jakimi parametrami.
8. W GA4: **Admin → DebugView** → zobacz event na żywo z parametrami.
9. Jak OK → **Submit → Publish** (nadaj wersji nazwę, np. „dodano filter_select 2026-06").

### Rejestracja parametru w GA4 (WAŻNE — częsty błąd):
Sam parametr w evencie NIE wystarczy, żeby go widzieć w raportach. Trzeba go zarejestrować:
- GA4 **Admin → Custom definitions → Create custom dimension** → Event-scoped → wpisz nazwę parametru (np. `atc_source`).
- Bez tego parametr leci, ale jest niewidoczny w raportach/API (to dokładnie problem pustych custom dimensions GLOV — visitor_type itd. są zarejestrowane, ale parametry nigdy nie są wysyłane).

---

## CZĘŚĆ B — KEJS GLOV #1: ATC bez źródła (PDP vs listing) — ślepe pole

**Problem:** `add_to_cart` w GLOV przychodzi bez `page_location`/`pagePath` (`(not set)` w 100%). Nie wiadomo, czy dodanie padło z karty produktu (PDP) czy z kafelka na listingu (quick-add). To blokuje analizę ścieżek zakupowych.

**Cel:** dodać do eventu `add_to_cart` parametr `atc_source` o wartości `pdp` / `collection` / `home`.

### Wariant 1 — gdy ATC jest trackowane przez dataLayer.push (sprawdź najpierw)
1. W **Preview Mode** kliknij „Dodaj do koszyka" na PDP i na listingu — zobacz w zakładce dataLayer co się pushuje.
2. Jeśli jest event typu `add_to_cart` / `addToCart` w dataLayer — dodaj do niego parametr źródła PO STRONIE motywu/skryptu, który robi push. To wymaga edycji kodu pushującego (motyw albo custom JS), bo GTM tylko czyta dataLayer, sam go nie wzbogaca o kontekst strony.

### Wariant 2 — wywnioskuj źródło z URL w momencie kliknięcia (czysto w GTM, bez ruszania motywu)
To prostsze, bo nie wymaga developera Shopify:
1. Utwórz **Variable → „URL" → Page Path** (wbudowana) — nazwij `Page Path`.
2. Utwórz **Variable → Custom JavaScript** `atc_source_calc`:
   ```javascript
   function() {
     var p = {{Page Path}} || '';
     if (p.indexOf('/products/') > -1) return 'pdp';
     if (p.indexOf('/collections/') > -1) return 'collection';
     if (p === '/') return 'home';
     if (p.indexOf('/cart') > -1) return 'cart';
     return 'other';
   }
   ```
3. W tagu GA4 Event `add_to_cart` → Event Parameters → dodaj `atc_source` = `{{atc_source_calc}}`.
4. Zarejestruj `atc_source` jako custom dimension w GA4 (część A).

> **Uwaga:** to działa, jeśli klik ATC i odpalenie tagu dzieją się na tej samej stronie (zwykle tak). Quick-add z listingu → Page Path = `/collections/...` → `atc_source=collection`. ATC z PDP → `/products/...` → `atc_source=pdp`. Po wdrożeniu rozróżnisz ścieżki, których dziś nie widać.

---

## CZĘŚĆ C — KEJS GLOV #2: gubiony landing page (worek „(not set)", ~23k/90dni)

**Problem:** ~22,5k sesji/90 dni ma `landingPage = (not set)`. Rozbicie po źródłach pokazało, że to głównie **ruch z aplikacji Meta (Facebook/Instagram in-app browser)** — `meta/cpc/adc_konwersje_*` — plus Direct i część Organic. In-app browser gubi pełne dane nawigacji, więc GA4 nie zapisuje strony wejścia. UTM-y z reklamy zostają, landing ginie.

**To NIE jest do końca naprawialne w samym GTM** — przyczyna jest po stronie przeglądarki in-app, nie tagu. Ale są realne kroki ograniczające:

### Krok 1 — diagnoza: czy tag GA4 odpala się za wcześnie
1. W **Preview Mode** wejdź na glov.co z linku Meta (skopiuj URL reklamy z `fbclid`).
2. Sprawdź kolejność: czy GA4 Config tag odpala się PO załadowaniu strony (`Page View` / `DOM Ready`), czy za wcześnie (`Consent Initialization` / `Initialization`).
3. Jeśli tag GA4 leci na bardzo wczesnym triggerze, `page_location` może być jeszcze niegotowy → landing `(not set)`. Przenieś GA4 Config na trigger **„Initialization - All Pages"** lub **„Page View"** (nie „Consent Initialization").

### Krok 2 — wymuś page_location jako parametr explicite
1. Variable → **„URL"** (Full URL) — nazwij `Full URL`.
2. W tagu GA4 Config → Fields/Parameters → dodaj `page_location` = `{{Full URL}}` (wymusza przekazanie pełnego URL nawet gdy automatyka zawiedzie).

### Krok 3 — Consent Mode (jeśli consent blokuje pierwsze odsłony)
Część `(not set)` to sesje, gdzie user nie zaakceptował cookies od razu → pierwsze page_view niemierzone. Sprawdź czy wdrożony **Consent Mode v2** — z `url_passthrough` i `ads_data_redaction`, które ratują część atrybucji przy braku zgody.

### Krok 4 — naprawa u źródła w Meta Ads (poza GTM)
- W Meta Ads Manager sprawdź, czy linki kampanii mają **poprawne UTM-y** i czy nie ma podwójnego przekierowania (redirect gubi landing).
- Rozważ wyłączenie skracaczy linków / redirectów w reklamach katalogowych.

> **Realistycznie:** in-app browser zawsze będzie gubić część landingów — to ograniczenie platformy Meta, nie błąd GLOV. Cel: zmniejszyć worek z ~25% ruchu do kilku %. Reszta zostaje, ale wiemy że to głównie Meta-produktowe (z nazwy kampanii odtwarzamy produkt: `adc_konwersje_luna-eye` → PDP Luna Eye).

---

## CZĘŚĆ D — KEJS GLOV #3: filtry nieoeventowane (opcjonalnie)

**Problem:** filtrowanie/sortowanie na listingu nie zostawia eventu ani parametru URL → niemierzalne.

### Dodanie eventu `filter_select`:
1. Trigger → **„Click - All Elements"** z warunkiem: Click Element matches CSS selector filtra (sprawdź selektor w Preview, np. `.facet-checkbox`, `[data-filter]`).
2. Tag GA4 Event `filter_select`, parametry: `filter_type` = `{{Click Text}}` albo `{{Click Element - data-filter}}`.
3. Zarejestruj `filter_type` jako custom dimension.

> Uwaga: jeśli motyw GLOV nie ma faktowych filtrów (tylko sortowanie `?sort_by=`), ten krok pomiń — sortowanie i tak widać w URL.

---

## Checklist wdrożenia (kolejność priorytetowa)

| # | Co | Efekt | Trudność |
|---|---|---|---|
| 1 | `atc_source` na add_to_cart (Część B, wariant 2) | Rozróżnienie ścieżek PDP vs quick-add | Łatwe (czysto GTM) |
| 2 | page_location explicite + sprawdzenie triggera GA4 (Część C) | Mniejszy worek `(not set)` | Średnie |
| 3 | Rejestracja custom dimensions w GA4 (Część A) | visitor_type itd. zaczną działać | Łatwe |
| 4 | filter_select (Część D) | Pomiar filtrów | Średnie (jeśli filtry istnieją) |

**Po każdej zmianie:** Preview → DebugView → Publish z nazwą wersji. Nigdy bezpośrednio na produkcję bez debug.

---

## Konto / dostęp
GTM-PQ9JFT2 — wymaga dostępu Edit do kontenera GTM GLOV (Phenicoptere). GA4 property 342844459 — dostęp przez `tomekwlq@proton.me` (Viewer wystarcza do DebugView; rejestracja custom dimensions wymaga roli Editor/Admin w GA4).

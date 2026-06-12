# Scenariusze analityczne GLOV — kandydaci na standardy

> Markery dla terminala: `@std` = nowy standard (do `_shared/STANDARDS/`) · `@event` = wzorzec/pułapka oeventowania · `@ski` = usprawnienie skilla. Terminal podnosi zawartość markerów. Ja NIE piszę do `_shared/` ani do plików skilla.

---

# STANDARD 1 — „Architektura + Eventy" (wzór: zakładka z raportu Plichty)

<!-- @std -->
## Standard: Architektura + Eventy (per obszar UI)

**Cel:** zanim policzysz JAKĄKOLWIEK analizę aktywności (search, filtry, ścieżki, ATC-per-obszar), zmapuj co realnie jest oeventowane w podziale na obszary strony. Odpowiada na pytanie „czy w ogóle da się to zmierzyć" — warunek wstępny każdej analizy zachowań.

**Struktura (wzór Plichta):**
1. **Mapa eventów × obszar UI** — dla każdego obszaru (HP, listing, PDP, search, koszyk, checkout, content) wylistuj jakie eventy się odpalają + wolumen (eventCount, totalUsers).
2. **Tabela mierzalności aktywności** — dla każdej planowanej analizy zachowań: ✅ mierzalne / ⚠️ tylko z URL / ❌ ślepe pole + metoda.
3. **Ślepe pola → backlog dotagowania** — czego NIE da się policzyć bez zmian w GTM/dataLayer.

**Metoda GA4 (property GLOV 342844459):**
- Eventy globalnie: `run_report` dim[eventName] metrics[eventCount, totalUsers]
- Event × obszar: dim[eventName, pagePath] z dimension_filter na eventName LUB na pagePath
- Aktywność w URL (sort/filtr/paginacja): dim[pagePathPlusQueryString] + filtr PARTIAL_REGEXP `(sort_by|filter|page=)`
- Sprawdź istnienie eventu interakcji: filtr eventName PARTIAL_REGEXP `(filter|sort|facet)` → 0 wierszy = brak eventu

**Złota reguła:** dla KAŻDEJ akcji, którą chcesz analizować → sprawdź najpierw czy zostawia ślad (event ALBO parametr URL). Jeśli ani jedno → ślepe pole, do backlogu dotagowania, NIE obiecuj analizy.
<!-- /@std -->

---

## Wynik dla GLOV (maj 2026, property 342844459)

### Mapa eventów × obszar UI

**Strona główna `/`** (maj):
page_view 2750 · user_engagement 2525 · session_start 2072 · js_error 1692 · first_visit 1573 · scroll 185 · login 78 · click 41 · **select_item 24** · newsletter 12.
→ Z HP ludzie klikają w produkt (select_item) i idą na PDP. **Brak `add_to_cart` na HP** i brak `view_item_list` (HP nie generuje impresji listy).

**Listing `/collections/*`:** view_item_list (poprawnie per kolekcja), select_item. Sortowanie tylko w URL `?sort_by=`.

**PDP `/products/*` + `/collections/*/products/*`:** view_item, add_to_cart (ale bez ścieżki — p. niżej).

**Search `/search`:** view_search_results + frazy `?q=` (top: Led, Lakier, Płatki).

**Koszyk `/cart` + drawer:** view_cart (omijany), remove_from_cart, begin_checkout.

**Checkout (domena Shopify):** add_shipping_info, add_payment_info, purchase — pagePath `(not set)` (normalne).

### Tabela mierzalności aktywności (dla przyszłych analiz zachowań)

| Aktywność | Mierzalne? | Jak / dlaczego nie |
|---|---|---|
| **Search** | ✅ tak | `view_search_results` + frazy `?q=` |
| **Nawigacja HP→listing→PDP** | ✅ tak | sekwencje pagePath, view_item_list, select_item |
| **Paginacja** | ✅ tak | `?page=N` w URL |
| **Sortowanie** | ⚠️ ledwo | tylko z URL `?sort_by=`, wolumen znikomy (top 7 page_view/mc, suma ~dziesiątki) — prawie nikt nie sortuje |
| **Filtrowanie** | ❌ ślepe pole | brak eventu (filtr eventName `filter\|sort\|facet` = 0 wierszy) ORAZ brak `?filter.v` w URL — motyw bez faktowych filtrów albo AJAX bez zmiany URL |
| **ATC z którego obszaru (HP/listing/PDP)** | ❌ ślepe pole | `add_to_cart` ma pagePath `(not set)` w 100% (6858 eventów maj, wszystkie bez ścieżki) |

### Ślepe pola → backlog dotagowania
1. **`add_to_cart` bez `page_location`** — żeby wiedzieć skąd ludzie dodają (HP vs listing vs PDP), trzeba dodać parametr ścieżki do eventu ATC w dataLayer/GTM.
2. **Filtry nieoeventowane** — jeśli motyw ma filtry, dodać event `filter_select` (parametr: typ+wartość filtra). Bez tego „ilu używa filtrów" = niepoliczalne.
3. (z poprzedniego audytu) custom dimensions puste, `formularz_konkursy` zaburzony — p. `ga4_findings.md`.

---

## Wzorce/pułapki oeventowania (cross-client)

<!-- @event -->
**Pułapka „add_to_cart bez page_location na Shopify".** Standardowy Shopify dataLayer wysyła `add_to_cart` BEZ ścieżki strony → pagePath `(not set)` w 100%. Konsekwencja: niemożliwe „z którego obszaru dodają do koszyka" (HP vs listing vs PDP) bez customowego dotagowania. Zawsze sprawdź `add_to_cart × pagePath` PRZED obietnicą analizy ATC-per-obszar. (GLOV maj: 6858 ATC, wszystkie `(not set)`.)
<!-- /@event -->

<!-- @event -->
**Pułapka „filtry = ślepe pole na Shopify".** Filtrowanie kolekcji często nie ma eventu ANI parametru URL (AJAX in-place). Test dwustronny: (1) eventName regex `filter|sort|facet`, (2) pagePathPlusQueryString regex `filter|sort_by`. Jeśli oba puste/znikome → filtrów nie zmierzysz. Sortowanie bywa w URL `?sort_by=`, ale na GLOV wolumen znikomy (~dziesiątki/mc) — statystycznie nieistotne.
<!-- /@event -->

---

## Usprawnienia do skilla

<!-- @ski -->
**Nowy skill/tryb „eel-architecture" (Architektura + Eventy).** Komplementarny do eel-event-map: event-map skupia się na lejku i zaburzeniach, architecture mapuje eventy PER OBSZAR UI + buduje tabelę mierzalności planowanych analiz zachowań. Output: mapa obszar×event + tabela ✅/⚠️/❌ + backlog dotagowania. Uruchamiać gdy klient chce analizować aktywność (search/filtry/ścieżki) — najpierw ustal co w ogóle mierzalne.
<!-- /@ski -->

<!-- @ski -->
**Preset testów mierzalności aktywności (do skilla).** Stały zestaw do odpalenia: (1) `add_to_cart × pagePath` → czy ma ścieżkę, (2) eventName regex `filter|sort|facet` → czy filtry oeventowane, (3) `pagePathPlusQueryString` regex `sort_by|filter|page` → ślad w URL, (4) eventy na `/` → co generuje HP. Cztery zapytania dają pełen obraz mierzalności zachowań na Shopify.
<!-- /@ski -->

---

---

# STANDARD 2 (w budowie) — Segmentacja behawioralna + cross GA4 × Clarity

## Definicja segmentów behawioralnych Tomka (segmenty startowe)

Podział użytkowników wg głębokości zaangażowania (od najgłębszego):

1. **Kupił** — purchase
2. **Nie kupił, ale ATC + zaczął checkout** — add_to_cart ∧ begin_checkout ∧ ¬purchase (porzucenie w checkout)
3. **Nie kupił, ATC bez checkout** — add_to_cart ∧ ¬begin_checkout ∧ ¬purchase (porzucenie koszyka)
4. **Nie kupił, ale ≥1 karta produktu** — view_item ∧ ¬add_to_cart (oglądał, nie dodał)

> „na początek" — to baza, segmenty mogą się rozrastać (np. browser bez PDP, search-users).

### Segmenty zakupowe (typ zakupu) — dodane 2026-06-09

Wśród kupujących (segment 1) dodatkowy podział wg typu zakupu:

5. **1st purchase** (pierwszy zakup) vs 6. **ponowny purchase** (repeat)
7. **1-item purchase** (jedna pozycja) vs 8. **multi-item purchase** (koszyk 2+)

**Mierzalność (sprawdzone na maju 2026, GA4 342844459):**

| Segment | GA4 mierzalne? | Jak / pułapka |
|---|---|---|
| **1st vs ponowny** | ⚠️ tylko przybliżenie | `newVsReturning` (maj: 574 new / 209 returning / 48 not set transakcji). ALE to nowy vs wracający URZĄDZENIE (cookies), NIE „pierwszy zakup w życiu vs kolejny". Twardy repeat-customer wymaga `purchase_count_ld` (PUSTY) albo Shopify. |
| **1-item vs multi-item** | ✅ pełne | `transactionId × itemsPurchased`: maj 833 transakcje, rozkład 1–12 itemów (top koszyk 12 szt). Czysty twardy segment. |

**Źródło lepsze = Shopify** dla obu: ma twardego „returning customer" (nie z cookies) i twardą liczbę pozycji per order. ShopifyQL walidacja staje się tu kluczowa, nie opcjonalna.

<!-- @event -->
**Pułapka „newVsReturning ≠ pierwszy zakup".** GA4 `newVsReturning` to nowość URZĄDZENIA/cookie, nie historia klienta. Klient z 5 zakupami na nowym telefonie = „new". Do twardego „1st purchase vs repeat" potrzebny user-scoped custom dim (np. purchase_count) ALBO źródło transakcyjne (Shopify customer.orders_count). Nigdy nie raportuj newVsReturning jako „pierwszy/kolejny zakup" — to nowy/wracający gość.
<!-- /@event -->

## WYNIKI — 8 segmentów, maj vs marzec 2026 (policzone 2026-06-09)

### Segmenty behawioralne 1–4 (GA4, totalUsers per warstwa lejka, rozłączne)

| Segment | Maj | % | Marzec | % |
|---|---|---|---|---|
| **1. Kupił** (purchase) | 819 | 7,0% | 483 | 4,7% |
| **2. Checkout bez zakupu** (begin_checkout ¬purchase) | 1 126 | 9,6% | 460 | 4,5% |
| **3. ATC bez checkout** (add_to_cart ¬begin_checkout) | 1 995 | 16,9% | 615 | 6,0% |
| **4. Tylko PDP** (view_item ¬add_to_cart) | 7 839 | 66,5% | 8 659 | 84,8% |
| **Baza: view_item users** | 11 779 | | 10 217 | |

Surowe (GA4 totalUsers): view_item 11779/10217 · add_to_cart 3940/1558 · begin_checkout 1945/943 · purchase 819/483.

<!-- @ga4 -->
**Segmenty behawioralne GLOV — maj DUŻO lepszy, ale to różnica JAKOŚCI ruchu, nie ilości.** Maj: z 11 779 oglądających PDP 33% dodało do koszyka, 7,0% kupiło. Marzec: z 10 217 tylko **15%** dodało (8 659 = 85% utknęło na PDP), 4,7% kupiło.

**Rozjazd „tylko PDP" 66% (maj) vs 85% (marzec) jest REALNY (nie artefakt odejmowania) i tłumaczy go wzorzec nawigacji:**
- Ruch podobny ilościowo: session_start 29 293 (maj) vs 21 399 (marzec) — ten sam rząd.
- ALE w marcu ludzie POMIJALI przeglądanie sklepu: view_item_list users 4 519 vs 8 713 (−48%), select_item 1 937 vs 4 474 (−57%) — przy prawie identycznym view_item (~10k).
- Wzorzec marca = **„one-page PDP bounce"**: user wpada WPROST na kartę produktu (z reklam/Google/Direct), ogląda jeden produkt, NIE przegląda listingu, NIE dodaje, wychodzi. Maj = ruch który realnie zwiedza sklep (listing → select → ATC).
- ATC-rate z PDP: maj 33% vs marzec 15% → potwierdza, że marcowy ruch docierał do produktu, ale go „nie chciał".

WNIOSEK: marzec nie miał „mniej ruchu" — miał ruch gorszej INTENCJI, który ląduje na PDP bez kontekstu i nie konwertuje na zaangażowanie. Spójne z kanałami (marzec: Direct top 6 862 sesji @ CR 0,8%; Paid Social słaby). Największy segment ZAWSZE „tylko PDP" (66–85%) → tu kierować Clarity „dlaczego nie dodają", ale dla marca pytanie brzmi raczej „czemu ten ruch w ogóle przyszedł / skąd / czy landing pasuje do reklamy".
<!-- /@ga4 -->

### Segmenty zakupowe 5–8

**5–6. 1st vs ponowny (ŹRÓDŁO: Shopify — twarde, nie cookies):**

| | Maj | Marzec |
|---|---|---|
| Zamówienia ogółem | 832 | 490 |
| **Pierwszy zakup** (first) | 574 (69%) | 329 (67%) |
| **Ponowny** (returning) | 258 (31%) | 161 (33%) |
| returning_customer_rate | 32,4% | 33,5% |

**7–8. 1-item vs multi-item (GA4 transactionId × itemsPurchased):**

| | Maj | Marzec |
|---|---|---|
| **1-item** | 300 (36%) | 158 (32%) |
| **Multi-item (2+)** | 531 (64%) | 331 (68%) |
| Transakcje (GA4) | 831 | 489 |

<!-- @ga4 -->
**GLOV: ~⅓ klientów wraca, ~⅔ koszyków to multi-item.** Returning rate stabilny 32–34% (Shopify, twarde). Koszyki w większości wieloproduktowe (64–68% to 2+ pozycje) — GLOV NIE jest sklepem jednego produktu, ludzie kupują zestawami. To argument za cross-sellem i bundlami. Najdłuższy koszyk: 12 pozycji (maj), 32 (marzec).
<!-- /@ga4 -->

<!-- @event -->
**Walidacja GA4 vs Shopify — potwierdzona pułapka newVsReturning.** Maj returning: GA4 `newVsReturning` = 209, Shopify twarde = 258 (+23%). GA4 zaniża wracających (gubi po wyczyszczonych cookies / nowym urządzeniu). „New" zgadza się idealnie (GA4 574 = Shopify 832−258=574 to przypadek zbieżności, ale rząd OK). WNIOSEK: dla 1st-vs-repeat ZAWSZE Shopify, nie GA4. Transakcje GA4 (831/489) vs Shopify orders (832/490) — zgodne ±1, GA4 ecommerce wiarygodne dla liczby zamówień i items.
<!-- /@event -->

### Segmenty kanałowe 9–10 (GA4 sessionDefaultChannelGroup) — nakładające się

> UWAGA: segmenty NIE są unikalne/rozłączne. Kanałowe nakładają się z behawioralnymi i zakupowymi (ten sam user może być „paid social" + „multi-item" + „returning").

**Konwersja per kanał (sessionConversionRate = transakcje/sesje):**

| Kanał | Maj sesje | Maj trans | Maj CR | Marzec sesje | Marzec trans | Marzec CR |
|---|---|---|---|---|---|---|
| **Paid Social** | 14 015 | 244 | 1,7% | 5 910 | 51 | 0,9% |
| **Organic Search** | 7 673 | 192 | 2,5% | 5 748 | 65 | 1,1% |
| **Direct** | 6 146 | 90 | 1,5% | 6 862 | 55 | 0,8% |
| **Paid Search** | 2 762 | 144 | **5,2%** | 2 555 | 142 | **5,6%** |
| **Cross-network** | 2 893 | 68 | 2,4% | 3 304 | 92 | 2,8% |
| **Organic Social** | 669 | 13 | 1,9% | 1 005 | 35 | 3,5% |
| Organic Shopping | 330 | 19 | 8,3% | 56 | 1 | — |
| Unassigned | 1 683 | 69 | 4,6% | 1 364 | 78 | 6,0% |

<!-- @ga4 -->
**KANAŁY GLOV — Paid Search to ukryty mistrz konwersji.** Paid Search ma 5× mniej ruchu niż Paid Social (2 762 vs 14 015 sesji w maju), ale CR 5,2% vs 1,7% — czyli **3× wyższa konwersja**, i dał prawie tyle samo transakcji (144 vs 244) przy ułamku ruchu. W marcu jeszcze wyraźniej: Paid Search 142 trans / Paid Social 51. Paid Social = wolumenowy top, ale „leje" mało konwertujący ruch (intencja niska). Direct słaby w marcu (CR 0,8%). Organic Social mały, ale w marcu CR 3,5%. **Rekomendacja: przesunąć budżet ku Paid Search / zbadać czemu Paid Social konwertuje tak słabo (jakość ruchu, landing match).** Spójne z sesją 2026-05-14 (Meta Advantage+ napędza wolumen, nie jakość).
<!-- /@ga4 -->

<!-- @event -->
**Pułapka „segmenty kanałowe nakładają się — nie sumuj do 100% niezależnie".** Channel group jest per SESJA (last non-direct attribution), behawioralne per USER. Ten sam user może mieć sesję paid social i osobną organic. NIE traktuj jako rozłącznych kubełków; przy crossowaniu (np. „ilu paid-social-users kupiło") licz na poziomie usera z sessionSource, nie sumuj sesji kanałów. Cross kanał×behawior wymaga osobnego zapytania, nie iloczynu udziałów.
<!-- /@event -->

### Benchmark lejka sesyjnego (Shopify, maj)
sessions 46 592 → z ATC 2 478 → reached checkout 1 823 → completed 726 · **CR 1,56%**.
(Uwaga: Shopify liczy per sesja, GA4 per user — stąd różnice w bazach. Oba spójne kierunkowo.)

## Możliwości i TWARDE ograniczenia Clarity (sprawdzone 2026-06-09)

<!-- @ga4 -->
**Clarity GLOV — wolumen sesji:** 3 453 sesji non-bot w 3 dni (7–9.06.2026), czyli ~1 150/dzień. Baza majowa miała tylko 250 (próbka) — realnie Clarity zbiera dużo więcej. Konektor `clarity-glov` daje nagrania (`list-session-recordings`, max 250/zapytanie, z timeline klików per URL, Core Web Vitals per strona) ORAZ agregaty (`query-analytics-dashboard`).
<!-- /@ga4 -->

<!-- @event -->
**Ograniczenia Clarity — DWA RÓŻNE ENDPOINTY (skorygowane 2026-06-09 po teście na żywo).** Konektor Clarity ma dwa kanały o RÓŻNYCH limitach:
- **`list-session-recordings` (nagrania)** — BEZ limitu 3 dni. Test: pobrano 250 nagrań za jeden dzień (8.06), filtr dat dowolny → **maj jest dostępny** (zależnie od retencji nagrań Clarity, domyślnie ~30 dni — marzec prawdopodobnie już wypadł, maj graniczny, sprawdzić testem). Daje: timeline klików per URL (hash elementu), Core Web Vitals per strona, pagesCount, clickCount. Max 250/zapytanie → paginacja po dniach.
- **`query-analytics-dashboard` (agregaty/heatmapy)** — TU jest limit Data Export API: max 3 dni wstecz, 3 wymiary, ~10 req/dzień. Heatmapy wizualne tylko web dashboard.
→ KOREKTA wcześniejszej tezy „Clarity nie sięga maja": dotyczyła agregatów, NIE nagrań. Nagrania sięgają wstecz do granicy retencji.

**Cross GA4↔Clarity (status: integracja ŚWIEŻO połączona 2026-06-09 przez Tomka):**
- Custom dimension **„Clarity Playback URL" jeszcze NIE widać w property 342844459** — to NORMALNE przy świeżym połączeniu. Pojawi się dla ruchu PO połączeniu, z opóźnieniem GA4 24–48h. Sprawdzić ponownie za 1–2 dni.
- **Most GA4→nagranie zadziała tylko dla świeżego ruchu (od 2026-06-09 w przód)** — dane historyczne maj/marzec NIE dostaną linku wstecz. Dla historii: GA4 i Clarity osobno (segmenty z eventów GA4 + segmenty z timeline nagrań), cross tylko per wzorzec.
- TODO: zarejestrować „Clarity Playback URL" w GA4 Admin → Custom definitions (inaczej parametr leci, ale nieodpytywalny w API/raportach).
- Microsoft oficjalnie: zakładka GA w Clarity **nie wspiera filtrów ani segmentów**; „Clarity nie wspiera segmentów GA4". Segmentu GA4 „kupił" NIE wrzucisz do Clarity automatycznie — segment odtwarzamy z timeline nagrań (czy sesja zawiera URL /cart, /checkout, /products/).
- **Wniosek:** dla świeżego ruchu (od teraz) cross 1:1 per sesja MOŻLIWY przez Playback URL (gdy się pojawi). Dla maja/marca — cross tylko per wzorzec/segment.
<!-- /@event -->

<!-- @ga4 -->
**Wniosek architektoniczny dla GLOV:** podział „GA4 = co/kiedy/historia (maj, marzec, ścieżki makro, segmenty kupił/ATC/PDP po eventach), Clarity = jak/dlaczego, ale tylko ostatnie 3 dni i bez segmentu behawioralnego w API". Segmenty 1–4 policzymy w GA4 (eventy purchase/begin_checkout/add_to_cart/view_item per user). Clarity dokłada jakościowe „dlaczego porzucił" na świeżej próbce — przez przeglądanie nagrań z odpowiednim wzorcem w timeline, nie przez filtr segmentu.
<!-- /@ga4 -->

## Skille/narzędzia Clarity w społeczności (rozeznanie 2026-06-09)
Istnieje „Microsoft Clarity Automation" (Composio/awesome-claude-skills, mcpmarket) — ale opiera się na tym samym Clarity Data Export API z limitami 3 dni/3 wymiary/10 req. Nic nie obchodzi limitu API. Oficjalny Clarity MCP Server (Microsoft) — ta sama bariera. Wniosek: gotowy skill nie da więcej niż nasz konektor; wartość dodana = NASZ workflow crossowania z GA4, nie samo odpytywanie Clarity.

---

# CLARITY — analiza behawioralna 650 nagrań (2026-06-09, okno 3-9.06)

Próbka: 150 najkrótszych (bounce) + 250 najwięcej-klików (engaged) + 250 najdłuższych. Reprezentatywny przekrój.

## Segment PDP-bounce (150 najkrótszych) — bierne odbicie, nie rezygnacja

<!-- @ga4 -->
**PDP-bounce GLOV = bierne odbicie ruchu reklamowego, NIE problem UX karty produktu.** Na 150 najkrótszych sesji: ~55% wchodzi wprost na /products/, mediana czasu ~300-450 ms, **tylko 3 kliknięcia na 150 sesji** (reszta timelineEvents puste). Referrer: ~90% płatny/akwizycyjny (google Shopping gclid 62, facebook fbclid 27, instagram 13, „null" 30 = też Meta in-app browser z utm=meta/fbclid). 0 dotarcia do /cart i /checkout. Dominują kampanie Meta Advantage+/katalog (`adc_katalog_zakup_advantage`). Top produkty-magnesy bounce: Sleeping Beauty (~20), Pumeks nano (~15), Skin Smoothing (~11). User nie zostaje na tyle długo, by UX miał znaczenie → problem to JAKOŚĆ AKWIZYCJI (przypadkowe kliki w reklamę in-app), nie PDP.
<!-- /@ga4 -->

<!-- @ga4 -->
**Mismatch geo/język dewaluuje ~11% ruchu.** Userzy lądują na /en-eu/, /de-eu/, /fr-eu/ NA polskiej domenie glov.co (PLN, polski checkout) — Google Shopping i feedy kierują zagranicznych odbiorców do złej wersji sklepu. W długich sesjach widać anglojęzycznych „przeskakujących" między /en-eu/ a polskimi CTA (mieszanka językowa). 120 trafień /en-eu/ wśród najdłuższych sesji.
<!-- /@ga4 -->

## Segment engaged (250 najwięcej klików) — dochodzą do koszyka, urywają przed kasą

<!-- @ga4 -->
**Engaged GLOV: 38% klika ATC, ale tylko 20% „Przejdź do kasy" — drop koszyk→kasa to główna strata wśród zmotywowanych.** Mediana 21 klików / 6 stron na sesję. Lejek engaged (250 sesji): „Dodaj do koszyka" 95 sesji (38%) → /cart 27 (10%) → „Przejdź do kasy" 52 (20%). Nawigacja TEMATYCZNA (kolekcje „Gładkie ciało" 77, „Piękne włosy" 45, „Bestsellery" 64 klikane częściej niż HP) — potwierdza, że kolekcje angażują mocniej niż homepage. Pętle /sklep i /cart na końcu sesji = niezdecydowanie/porzucanie, nie bounce. Lamoda.pl daje 11 zaangażowanych sesji (eksplorują, ale backlog: 0 zakupów).
<!-- /@ga4 -->

## DWA TWARDE BUGI UX (z najdłuższych sesji) — nowe odkrycia

<!-- @ga4 -->
**[KRYTYCZNY] Cena NIE renderuje się na przycisku „Przejdź do kasy" — brakujący glif fontu.** W nagraniach CTA koszyka pojawia się jako `„Przejdź do kasy - ▫▫▫,▫▫▪"` (36 wystąpień) — cyfry ceny renderują się jako puste boxy missing-glyph. To samo na banerze rabatu `„-▫▫% na WSZYSTKO z kodem:"` (procent nieczytelny). **Na najważniejszym przycisku konwersji klient nie widzi kwoty do zapłaty** — blocker zaufania. Problem fontu (brak glifów cyfr) na elementach z dynamiczną ceną. #1 priorytet konwersji. (UWAGA: zweryfikować wizualnie — Clarity maskuje część tekstu jako PII, ale ▫ na cenach w wielu sesjach to wzorzec, nie maska.)
<!-- /@ga4 -->

<!-- @ga4 -->
**[WAŻNY] „Załaduj więcej" zamiast scrolla = mozolne (178-235 klików, jeden user 20+ razy z rzędu).** Listing i recenzje wymagają ciągłego ręcznego doładowywania zamiast lazy-scroll/paginacji. Plus ~850 pustych klików („ ") + 150 klików w „▫" (brakujące ikony/swatche) — userzy klikają w nieklikalne obrazki/zepsute ikony szukając reakcji. Przejrzeć PDP pod „wygląda klikalnie, nie jest" + brakujące glify swatchy.
<!-- /@ga4 -->

<!-- @ga4 -->
**[WAŻNY] Core Web Vitals z FIELD DATA dużo gorsze niż Lighthouse („wszystko zielone").** Realne sesje: LCP≥2s w 231 wystąpieniach, LCP 10-19s w 18, ekstremalne 100-130s na PDP pielęgnacji włosów (mini-czepek satynowy, frotka HydroWeave, szczotka ARC FIVE, CoolCurl, Magnet Cleanser). CLS≥0,1 w 177, CLS≥0,2 w 133, do 0,9 (pumeks PDP). **Field ≠ lab** — kolekcja `produkty-do-pielegnacji-wlosow` ma dramatyczne LCP/CLS mimo zielonego Lighthouse audytu z 2026-05-13. Zoptymalizować obrazy/layout tej kolekcji.
<!-- /@ga4 -->

<!-- @event -->
**Pułapka „Clarity nie widzi checkout.shopify".** Checkout jest na osobnej domenie (checkout.shopify) — Clarity NIE nagrywa. Ostatni widoczny sygnał = klik „Przejdź do kasy". Więc „0 sesji checkout" w nagraniach to artefakt, nie brak. Realny współczynnik dojścia do kasy wyższy niż widoczne 20%. Do lejka checkout używać GA4 (add_shipping/payment/purchase), nie Clarity.
<!-- /@event -->

<!-- @event -->
**Pułapka „najdłuższe sesje ≠ najbardziej zaangażowane".** Top sesje czasowo (5-6h) to pagesCount:1, clickCount:0, url:null — porzucone karty w tle / boty. Filtrować po pagesCount>1 ∧ clickCount>0. Do „zaangażowanych" sortować SessionClickCount_DESC, nie Duration_DESC.
<!-- /@ski -->
**Workflow analizy nagrań Clarity (do skilla): pobieraj 3 przekroje × ~150-250 i deleguj parsowanie do subagentów.** Nagrania są za duże na kontekst (250 sesji = 80k+ linii). Wzorzec: (1) SessionDuration_ASC = bounce, (2) SessionClickCount_DESC = engaged, (3) SessionDuration_DESC = długie/friction. Każdy plik → subagent z grep (referrerUrl, eventtype, „text", /cart, /en-eu, LCP/CLS). Subagent zwraca liczby+wnioski, nie surowe nagrania.
<!-- /@ski -->

# ŚCIEŻKI + ŚREDNIE INTERAKCJI (2026-06-09)

<!-- @ga4 -->
**Ścieżka determinuje wynik: głębokość chodzenia ≈ szansa zakupu.** Średnie/sesja (maj): Paid Search 5,2 strony / 27 eventów / 8 min / CR 5,2% — najgłębsza ścieżka, najwyższa konwersja. Direct 1,4 strony / 7 eventów / bounce 52% — płytka, słaba. Wzorzec: wejście na LISTING → dużo stron → zakup; wejście wprost na PDP z reklamy → 1,7-2,3 strony → wyjście. Dowód: Sleeping Beauty Paid Social 786 sesji/2,3 strony/2 zakupy vs /collections/sklep Paid Search 1280 sesji/7,4 strony/95 zakupów. Ta sama witryna, inna ścieżka = inny wynik.
<!-- /@ga4 -->

<!-- @ga4 -->
**Siła PDP (view→ATC rate) różni się 10× między produktami — magnesy ruchu vs produkty co sprzedają się same.** Maj per produkt: Infinity Eye Patches 69% ATC, Pumeks nano 59% (321 zakupów, top), Rękawica demakijaż 54%, Biobased 51% — sprzedają się same. PRZECIWNIE: Sleeping Beauty 1706 odsłon ale tylko 6% ATC (magnes ruchu, nie sprzedaży), Luna Eye największy ruch 5272 odsłony ale 26% ATC. Reklama ściąga tłum na Sleeping Beauty/Luna Eye, ale karta nie domyka → największy ukryty potencjał = audyt tych PDP.
<!-- /@ga4 -->

<!-- @ga4 -->
**[BUG] „Luna Eye z etui ładującym" — 955 odsłon, 0 ATC, 0 zakupów (maj).** Wariant produktu zbiera ruch, ale dodanie do koszyka nie działa wcale (0%). Niedostępny wariant albo zepsuty przycisk ATC na tej karcie. Czysta strata 955 odsłon/mc — do pilnego sprawdzenia.
<!-- /@ga4 -->

<!-- @event -->
**Pułapka „exits nie istnieje w GA4 Data API".** Do analizy wyjść użyj screenPageViewsPerSession (głębokość) + bounceRate + landingPage×transactions zamiast exits/exitRate (te są tylko w UI). Pełne path exploration też tylko w UI — ścieżki rekonstruować z landing+PVperSession (GA4) + timeline nagrań (Clarity).
<!-- /@event -->

# Backlog scenariuszy (do omówienia / policzenia później)

- **Ścieżki konsumentów kupił vs nie kupił** (maj + marzec) — sekwencje typów stron per sesja, podział purchase/no-purchase. Poziom: typy stron (domyślnie). Źródło: GA4 (Clarity nie sięga maja/marca).
- **Segmenty behawioralne 1–4** (wyżej) — policzyć wolumeny w GA4 (maj+marzec), potem cross z Clarity na świeżej próbce dla „dlaczego".
- **Profil aktywności: search / sortowanie / nawigacja** (maj + marzec) — mierzalne wg tabeli; filtry i ATC-per-obszar = ślepe pola.
- Walidacja: GA4 vs Shopify analytics (ShopifyQL) jako benchmark transakcji.

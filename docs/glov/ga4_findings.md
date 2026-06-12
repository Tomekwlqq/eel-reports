# GA4 Event Mapping — GLOV (glov.co, property 342844459)

**Audyt oeventowania (eel-event-map)** · okno: 30 dni (ostatnie do wczoraj) · waluta PLN · strefa Europe/Warsaw
Metoda: standard EVENT_MAPPING_STANDARD (typologia 🟢/🔵/⚪/🟣/❌/⚠️, warstwy A–D, reguła zaburzonego eventu wg ratio).

> Markery: `@ga4` = fakt o GLOV · `@event` = wzorzec/pułapka oeventowania · `@ski` = usprawnienie do skilla. Terminal podniesie zawartość markerów.

---

## Warstwa A — Legenda + lejek zweryfikowany

Pełny lejek e-commerce **jest oeventowany i spójny** (GA4 Enhanced Ecommerce przez Shopify dataLayer). Wszystkie kroki obecne:

| Krok | Event | Typ | eventCount | sessions | users |
|---|---|---|---|---|---|
| Lista | `view_item_list` | 🔵 | 136 983 | 10 132 | 8 765 |
| PDP | `view_item` | 🔵 | 26 519 | 15 126 | 12 220 |
| Klik z listy | `select_item` | 🔵 | 9 225 | 5 016 | 4 492 |
| Dodanie do koszyka | `add_to_cart` | 🟢 | 7 043 | 4 231 | 4 035 |
| Podgląd koszyka | `view_cart` | 🔵 | 1 177 | 679 | 583 |
| Start checkout | `begin_checkout` | 🟢 | 2 219 | 2 038 | 1 998 |
| Dane wysyłki | `add_shipping_info` | 🔵 | 1 672 | 1 262 | 1 235 |
| Dane płatności | `add_payment_info` | 🔵 | 1 317 | 1 116 | 1 091 |
| Zakup | `purchase` | 🟢 | 838 | 833 | 828 |
| Zwrot | `refund` | ⚪ | 10 | — | 10 |

<!-- @ga4 -->
**Lejek konwersji GLOV (30 dni, sessions):** add_to_cart 4 231 → begin_checkout 2 038 (−51,8%) → add_shipping 1 262 → add_payment 1 116 → purchase 833. Checkout→purchase: 833/2 038 = **40,9%**. ATC→begin_checkout drop 51,8% to największa pojedyncza dziura w lejku po stronie koszyka (spójne z friction listą koszyka z audytu Davinci). `purchase` czysty: ratio eventCount/users = 1,01.
<!-- /@ga4 -->

<!-- @ga4 -->
**view_cart anomalia:** view_cart (sessions 679) < view_item_list i << add_to_cart (4 231). Większość użytkowników dodaje do koszyka i idzie wprost do checkout z drawer/slide-cart, **pomijając stronę /cart**. view_cart NIE jest wiarygodnym krokiem lejka dla GLOV — używać begin_checkout jako pierwszego twardego sygnału koszyka.
<!-- /@ga4 -->

---

## Warstwa B — Mapa eventów per widok (glov.co × GA4)

### Strona główna `/`
| Element | Akcja | Event | Status |
|---|---|---|---|
| Sekcje produktowe HP | wejście | `page_view` | 🟢 jest |
| Kafle produktów na HP | impresja listy | `view_item_list` | ⚠️ **brak na `/`** — view_item_list odpala się tylko na `/collections/*`, nie na HP (HP ma produkty, ale bez impresji listy) |
| Logowanie | login | `login` | 🟢 jest (87 na `/`) |

### Listing kolekcji `/collections/*`
| Element | Akcja | Event | Status |
|---|---|---|---|
| Wejście na kolekcję | impresja listy | `view_item_list` | 🟢 jest (poprawnie per kolekcja) |
| Klik w produkt | wybór | `select_item` | 🟢 jest |

### PDP `/products/*` i `/collections/sklep/products/*`
| Element | Akcja | Event | Status |
|---|---|---|---|
| Wejście na PDP | podgląd produktu | `view_item` | 🟢 jest |
| „Dodaj do koszyka" | ATC | `add_to_cart` | 🟢 jest |

### Koszyk `/cart` + drawer
| Element | Akcja | Event | Status |
|---|---|---|---|
| Wejście na /cart | podgląd koszyka | `view_cart` | 🟢 jest (ale omijany, p. wyżej) |
| Usunięcie pozycji | remove | `remove_from_cart` | 🟢 jest (1 871) |
| Przejście do checkout | begin_checkout | `begin_checkout` | 🟢 jest |

### Checkout (domena Shopify)
| Element | Akcja | Event | Status |
|---|---|---|---|
| Dane wysyłki | shipping | `add_shipping_info` | 🟢 jest |
| Dane płatności | payment | `add_payment_info` | 🟢 jest |
| Zakup | purchase | `purchase` | 🟢 jest |

### Wyszukiwarka `/search`
| Element | Akcja | Event | Status |
|---|---|---|---|
| Wyniki wyszukiwania | search results | `view_search_results` | 🟢 jest (top frazy: Led, Lakier, Płatki) |
| Sama fraza | search | `search` | ❌ brak osobnego `search` (jest tylko view_search_results) |

### Content / lead
| Element | Akcja | Event | Status |
|---|---|---|---|
| Formularz konkursowy | submit | `formularz_konkursy` | ⚠️ **zaburzony** (p. warstwa C) |
| Newsletter | zapis | `newsletter` | 🔵 jest, ale niski wolumen (40 / 27 users) |
| Wideo | progress/start/complete | `video_*` | ⚪ jest, znikomy wolumen (6–34) |

---

## Warstwa C — Ślepe pola i zaburzenia (priorytety)

<!-- @ga4 -->
**[P1] `formularz_konkursy` — event ZABURZONY (747 eventCount / 0 totalUsers).** Odpala się na endpointach POST `/{uuid}/send` (np. `/bf090fc1-.../send` 542, `/a0568b5f-.../send` 185) — to server-side / proxy hity formularza, NIE akcje przypisane do użytkownika. Zero przypisanych userów = nie nadaje się jako metryka leadów. Jeśli ktoś raportuje „leady z konkursów" z tego eventu → liczba fałszywa. Wymaga przepięcia na client-side submit z user-scope albo oznaczenia jako wykluczony z analiz konwersji.
<!-- /@ga4 -->

<!-- @ga4 -->
**[P1] Custom dimensions GLOV są PUSTE (ślepe pole danych).** Zarejestrowane w property: `visitor_type` (event-scoped), `shopify_customer_id_ld`, `payment_gateway_ld`, `lifetime_revenue_ld`, `purchase_count_ld`, `last_transaction_date_ld` (user-scoped). Test na `visitor_type` × {add_to_cart, purchase, login} → **wszędzie `(not set)`**. Wymiary zdefiniowane w UI, ale parametry nigdy nie trafiają do dataLayer → segmentacja nowy/powracający, gateway płatności i LTV po stronie GA4 niemożliwa mimo pozornej gotowości. Klasyczna pułapka „skonfigurowane ≠ wysyłane".
<!-- /@ga4 -->

<!-- @ga4 -->
**[P2] `js_error` masowy — 38 907 eventów / 7 549 users (5,2 erroru/user).** Hotspoty: `/collections/sklep` 12 073 (5,4 err/user!), Sleeping Beauty 2 212, skin-smoothing 2 172, HP `/` 1 771, depilator 1 396. To realny problem techniczny (custom event łapiący wyjątki JS), nie błąd oeventowania. Listing `/collections/sklep` = epicentrum. Wysoki js_error koreluje z drop lista→produkt z referencji R01–R09. Do zbadania osobno (źródło wyjątku na listingu).
<!-- /@ga4 -->

<!-- @ga4 -->
**[P2] `404_error` 689 eventów / 529 users — rozproszony, brak jednego dominanta.** Sleeping Beauty już NIE w czołówce (redirect 2026-06-09 zadziałał). 356 różnych martwych URL-i, top: `coolnails` lakier peel-off 26, `free-gift-satin-sleep-cap` (en-eu) 11, `precious-set-2` 10, `think-pink-set` 8, `dream-curl-set` 7. Dwa wzorce: (1) martwe zestawy/produkty PL, (2) zepsuty link `/https://glov.co/policies/terms-of-service` 7 — literówka w hrefie (podwójny protokół). Naprawa: redirecty na top ~10 + fix linku terms-of-service. Długi ogon (356) nie wart ręcznej naprawy.
<!-- /@ga4 -->

<!-- @ga4 -->
**[P3] `view_item_list` eventCount zawyżony przez paginację.** 136 983 eventCount vs 8 765 users (ratio 15,9). Powód: event odpala się na każdej stronie paginacji (`/collections/sklep?page=2..11`, `/collections/all?page=2..11`) oraz wielu kolekcjach na sesję — NIE zaburzenie eventu, ale eventCount jest bezużyteczny jako miara „ilu obejrzało listę". Używać sessions/users.
<!-- /@ga4 -->

<!-- @ga4 -->
**[P3] Podwójne URL-e tego samego produktu rozbijają agregację.** Każdy produkt ma min. 2 ścieżki: `/products/{handle}` ORAZ `/collections/{kolekcja}/products/{handle}` (+ warianty z `?country=PL&currency=PLN`, `?variant=`, `?_su_rec=`). Np. Luna Eye view_item rozsypane na: 2 785 + 805 + 626 + 135 + … . Bez normalizacji pagePath ranking produktów per URL jest zaniżony. To friction analityczny Shopify, nie błąd eventu.
<!-- /@ga4 -->

---

## Warstwa D — Match / niematch (oeventowanie vs UI)

**Match (UI ma element → event istnieje i działa):** cały lejek e-commerce, search results, login, newsletter, remove_from_cart, video.

**Niematch (UI ma element → event brak/zaburzony):**
- HP `/` ma kafle produktów → **brak `view_item_list` na HP** (impresje produktów na stronie głównej nie mierzone)
- Formularz konkursowy → event jest, ale **zaburzony** (0 users)
- Custom dimensions zdefiniowane → **parametry niewysyłane** (puste)
- `search` (sama fraza) → tylko `view_search_results`, brak osobnego eventu intencji

---

## Wzorce i pułapki oeventowania (cross-client)

<!-- @event -->
**Pułapka „event z 0 totalUsers = server-side/proxy hit, nie akcja użytkownika".** Gdy custom event ma wysoki eventCount ale totalUsers=0 i odpala się na endpointach typu `/{uuid}/send` lub `/api/*`, to prawie zawsze hit POST/webhook bez kontekstu klienta GA4 (brak client_id). Reguła: totalUsers=0 przy eventCount>0 → zawsze ⚠️ zaburzony, wykluczyć z metryk konwersji. (GLOV: `formularz_konkursy`.)
<!-- /@event -->

<!-- @event -->
**Pułapka „custom dimension skonfigurowana ≠ wysyłana".** Property może mieć zdefiniowane custom dimensions, które wyglądają na gotowe, ale parametr nigdy nie trafia do dataLayer → `(not set)` na 100% eventów. Test: run_report z [eventName × customEvent:X] na kluczowych eventach (purchase, add_to_cart). Jeśli wszędzie `(not set)` → ślepe pole danych. Zawsze weryfikować przed obietnicą segmentacji po custom dim. (GLOV: wszystkie 6 custom dims puste.)
<!-- /@event -->

<!-- @event -->
**Pułapka „view_item_list eventCount na Shopify".** Na sklepach Shopify z paginacją kolekcji view_item_list odpala się per strona paginacji → eventCount nadmuchany (ratio 15+/user). To NIE zaburzenie (event poprawny), ale eventCount jest mylący jako miara zasięgu listy. Reguła: dla view_item_list raportować sessions/users, nie eventCount. Analogicznie podwójne ścieżki produktu (`/products/X` vs `/collections/Y/products/X`) wymagają normalizacji pagePath przed rankingiem PDP.
<!-- /@event -->

<!-- @event -->
**Wzorzec „view_cart omijany przez slide-cart".** Na Shopify z drawer/slide-cart większość ATC → begin_checkout pomija stronę /cart, więc view_cart << add_to_cart. view_cart NIE jest wiarygodnym krokiem lejka. Pierwszy twardy sygnał koszyka = begin_checkout. (GLOV: view_cart 679 sessions vs add_to_cart 4 231.)
<!-- /@event -->

---

## Usprawnienia do skilla eel-event-map

<!-- @ski -->
**Dodać do skilla krok „weryfikacja custom dimensions".** Po pobraniu eventów: get_custom_dimensions_and_metrics → dla każdej event-scoped/user-scoped custom dim odpalić run_report [topEvent × customEvent:X]. Jeśli `(not set)` na purchase/add_to_cart → zaraportować jako ślepe pole. To częsty, łatwy do przeoczenia błąd (wymiar wygląda na gotowy w UI).
<!-- /@ski -->

<!-- @ski -->
**Dodać regułę „totalUsers=0 → zaburzony" obok reguły ratio.** Obecna reguła zaburzonego eventu opiera się na absurdalnym ratio eventCount/totalUsers. Brakuje przypadku granicznego totalUsers=0 (dzielenie przez zero → ratio nieskończony). Jawnie: eventCount>0 ∧ totalUsers=0 ⇒ ⚠️ server-side/proxy, wyklucz z konwersji.
<!-- /@ski -->

<!-- @ski -->
**Dodać do skilla preset „Shopify blind spots".** Stałe ślepe pola Shopify do sprawdzenia za każdym razem: (1) view_item_list nadmuchany paginacją → raportuj sessions, (2) podwójne URL-e produktu /products vs /collections/.../products → normalizuj pagePath, (3) view_cart omijany przez slide-cart → użyj begin_checkout, (4) checkout na domenie Shopify → add_shipping/add_payment/purchase mają pagePath `(not set)` (to normalne, nie błąd). Te 4 powtarzają się na każdym Shopify.
<!-- /@ski -->

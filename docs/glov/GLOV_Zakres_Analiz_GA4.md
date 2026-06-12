# GLOV — Zakres Analiz GA4
> Framework diagnostyczny: co analizować i co z tego wyciągnąć
> Ostatnia aktualizacja: 2026-05-13
> 🔗 Globalny standard GA4 (auth, properties, wzorce, pułapki): `_shared/GA4_STANDARD.md`. Ten plik = warstwa „co analizować" dla GLOV; jest tam zalinkowany jako framework.

---

## Jak czytać tę tabelę

- **Analiza** — nazwa i zakres zapytania do GA4
- **Co mierzę** — konkretne metryki i wymiary
- **Co z tego wyciągam** — decyzja lub diagnoza, którą ta analiza umożliwia
- **Częstotliwość** — jak często warto robić
- **Priorytet** — 🔴 krytyczne / 🟡 ważne / 🟢 uzupełniające

---

## BLOK 1 — Ruch i pozyskanie

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 1.1 | **Kanały — przegląd** | Sesje, użytkownicy, engagement rate per kanał (Default Channel Group) | Które kanały dostarczają ruch i czy jest on zaangażowany | Tygodniowo | 🔴 |
| 1.2 | **Kanały — konwersja i przychód** | Zakupy, CR, przychód per kanał | Które kanały przynoszą pieniądze, nie tylko ruch | Tygodniowo | 🔴 |
| 1.3 | **Nowi vs powracający** | Sesje, CR, przychód per user type (new/returning) | Czy sklep utrzymuje klientów; skąd idzie sprzedaż — akwizycja czy retencja | Miesięcznie | 🟡 |
| 1.4 | **Kampanie płatne** | Sesje, CR, ROAS per campaign / source / medium | Które kampanie są rentowne, które przepalają budżet | Tygodniowo | 🔴 |
| 1.5 | **Referral — skąd przychodzą** | Sesje, landing page, CR per source dla kanału Referral | Co linkuje do sklepu i czy ten ruch kupuje | Na żądanie | 🟡 |
| 1.6 | **Organic Search — landing pages** | Sesje, bounce, CR per landing page dla Organic Search | Które strony rankują i konwertują organicznie | Miesięcznie | 🟡 |

---

## BLOK 2 — Zachowanie na stronie

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 2.1 | **Top strony wg sesji** | Sesje, avg engagement time, bounce per page path | Które strony przyciągają ruch i czy zatrzymują użytkownika | Tygodniowo | 🔴 |
| 2.2 | **Strony produktowe — ranking** | Sesje, engagement rate per strona produktu (filtr: /products/) | Które produkty są najchętniej oglądane; ranking popularności | Tygodniowo | 🔴 |
| 2.3 | **Kolekcje — ranking** | Sesje, engagement rate per kolekcja (filtr: /collections/) | Które kategorie przyciągają ruch; czy ekspozycja na HP to odzwierciedla | Tygodniowo | 🔴 |
| 2.4 | **Strony z wysokim bounce** | Bounce rate, avg time on page per strona (filtr: bounce > 70%) | Które strony nie angażują; kandydaci do redesignu lub poprawy treści | Miesięcznie | 🟡 |
| 2.5 | **Ścieżki nawigacji** | Page path + event sequence per sesja | Jak użytkownicy poruszają się po sklepie; gdzie zbaczają z lejka | Na żądanie | 🟢 |
| 2.6 | **Wyszukiwarka wewnętrzna** | Zapytania (event: search, param: search_term) | Czego klienci szukają i nie mogą znaleźć na nawigacji | Miesięcznie | 🟡 |

---

## BLOK 3 — Lejek zakupowy

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 3.1 | **Lejek ogólny** | view_item_list → view_item → add_to_cart → begin_checkout → purchase (liczby i drop-off %) | Gdzie w lejku tracę największy % użytkowników; gdzie jest priorytet naprawy | Tygodniowo | 🔴 |
| 3.2 | **Lejek per kanał** | Jak 3.1, ale z segmentacją per Default Channel Group | Czy lejek psuje się tak samo dla każdego kanału czy jest specyfika; np. Direct odpada na checkout | Tygodniowo | 🔴 |
| 3.3 | **Lejek per urządzenie** | Jak 3.1, ale z segmentacją per device category | Czy mobile konwertuje inaczej niż desktop; gdzie jest największa dysproporcja | Tygodniowo | 🔴 |
| 3.4 | **Add-to-cart per produkt** | Zdarzenia add_to_cart per item_name / item_id | Które produkty są dodawane do koszyka; CR = add_to_cart / view_item per produkt | Miesięcznie | 🟡 |
| 3.5 | **Checkout — porzucenia per krok** | begin_checkout → add_shipping_info → add_payment_info → purchase | Na którym kroku checkout odpada najwięcej; diagnoza: cena dostawy, metody płatności, UX | Miesięcznie | 🔴 |
| 3.6 | **Czas do zakupu** | Sesje i dni od pierwszej wizyty do purchase | Jak długi jest cykl decyzyjny klientów; czy retargeting ma sens | Na żądanie | 🟢 |

---

## BLOK 4 — Produkty i przychód

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 4.1 | **Produkty — ranking sprzedaży** | Zakupy, przychód, ilość per item_name | Które produkty zarabiają; top 10 do priorytetyzacji w merchandisingu | Tygodniowo | 🔴 |
| 4.2 | **Produkty — CR (ruch vs zakupy)** | Sesje na PDP vs zakupy per produkt (złączenie 2.2 + 4.1) | Które produkty mają wysoki ruch ale niski CR; kandydaci do optymalizacji PDP | Miesięcznie | 🔴 |
| 4.3 | **Średnia wartość zamówienia (AOV)** | Przychód / liczba zakupów per kanał, per kampania | Czy różne kanały przynoszą różną jakość klienta; gdzie jest najwyższy AOV | Miesięcznie | 🟡 |
| 4.4 | **Produkty w koszyku bez zakupu** | Zdarzenia add_to_cart bez purchase (per item) | Które produkty są dodawane do koszyka ale nie kupowane; problem ceny, dostępności, lub zaufania | Na żądanie | 🟡 |
| 4.5 | **Promocje i rabaty — wpływ** | Przychód, CR w dniach z promocją vs bez | Czy promocje rzeczywiście zwiększają konwersję i nie kanibalizują marży | Na żądanie | 🟢 |

---

## BLOK 5 — Urządzenia i technologia

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 5.1 | **Mobile vs Desktop — KPI** | Sesje, CR, przychód, engagement per device category | Jak dużo ruchu to mobile i czy konwertuje; priorytet optymalizacji mobilnej | Miesięcznie | 🔴 |
| 5.2 | **Przeglądarki i systemy** | Sesje, CR per browser / OS | Czy jest problem z konkretną przeglądarką lub systemem (np. Safari / iOS) | Na żądanie | 🟢 |
| 5.3 | **Rozdzielczości ekranów** | Sesje per screen resolution | Czy design jest zoptymalizowany pod dominujące rozdzielczości mobile | Na żądanie | 🟢 |

---

## BLOK 6 — Geolokalizacja i rynek

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 6.1 | **Kraje — ruch i konwersja** | Sesje, CR, przychód per country | Skąd pochodzi ruch i sprzedaż; czy ekspansja zagraniczna ma sens | Miesięcznie | 🟡 |
| 6.2 | **Miasta — ruch PL** | Sesje per city (filtr: country = Poland) | Czy ruch jest rozproszony geograficznie czy skupiony; wpływ na strategie lokalną | Na żądanie | 🟢 |

---

## BLOK 7 — Treści i blog

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 7.1 | **Blog — ruch per artykuł** | Sesje, engagement time per /blogs/ URL | Które artykuły przyciągają ruch; czy blog jest źródłem organic search | Miesięcznie | 🟡 |
| 7.2 | **Blog → sklep — przepływ** | Sesje na blog → zdarzenia na stronach produktów lub kolekcji (next page) | Czy blog konwertuje czytelników w odwiedzających sklep | Miesięcznie | 🟡 |
| 7.3 | **Strony niskiego zaangażowania** | Avg engagement time < 30 sek, per page (filtr: /pages/) | Które strony statyczne (FAQ, O nas, Dostawa) nie angażują i wymagają poprawy | Na żądanie | 🟢 |

---

## BLOK 8 — Trendy i sezonowość

| # | Analiza | Co mierzę | Co z tego wyciągam | Częstotliwość | Priorytet |
|---|---|---|---|---|---|
| 8.1 | **Tygodniowy trend ruchu** | Sesje day-by-day (ostatnie 30 dni vs poprzednie 30 dni) | Czy ruch rośnie, spada, czy jest stabilny; wykrycie anomalii | Tygodniowo | 🔴 |
| 8.2 | **Dzień tygodnia i godzina** | Sesje i CR per day_of_week / hour | Kiedy klienci kupują; optymalizacja harmonogramu kampanii i publikacji | Miesięcznie | 🟡 |
| 8.3 | **Sezonowość per kategoria** | Sesje na kolekcjach per miesiąc (YoY jeśli możliwe) | Planowanie budżetu kampanii i stocku per sezon | Kwartalnie | 🟢 |

---

## Kolejność wdrożenia (pierwsza sesja)

Jeśli robisz pierwszą diagnozę sklepu — zacznij od tych analiz w tej kolejności:

1. **1.1 + 1.2** — skąd idzie ruch i kto zarabia
2. **3.1** — gdzie jest największy drop w lejku
3. **3.3** — czy problem jest na mobile
4. **2.2 + 4.1** — które produkty rządzą ruchem vs sprzedażą
5. **3.2** — który kanał ma najgorszy lejek
6. **3.5** — gdzie odpada checkout

Reszta analiz — na żądanie lub po zidentyfikowaniu konkretnych problemów.

---

## Property IDs GLOV

| Sklep | Property ID | Waluta |
|---|---|---|
| glov.co (PL) — **główny** | `properties/342844459` | PLN |
| glov.eu | `properties/326256483` | EUR |
| glov-france.com | `properties/413599124` | EUR |
| glov-germany.com | `properties/413616939` | EUR |

Metoda połączenia: `mcp__google-analytics-mcp__run_report` (natywny konektor, aplikacja Google Cloud "eel-analytics")

---

*Framework stworzony na podstawie analizy glov.co — 2026-05-13*

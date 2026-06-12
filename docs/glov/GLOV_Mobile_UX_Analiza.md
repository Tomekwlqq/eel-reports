# GLOV — Analiza Mobile UX
> Viewport: 390x844 (iPhone 14), Chrome DevTools mobile emulation
> Data: 2026-05-13 | Źródło: screenshoty + DOM inspection

---

## Strony przeanalizowane

1. `/collections/sklep` — listing główny
2. `/products/upiekszajaca-poduszka-nocna-glov-sleeping-beauty` — PDP #1 wg ruchu
3. `/cart` — koszyk pusty

---

## 1. Listing — /collections/sklep

### Co widać na mobile

**Nagłówek (above the fold):**
- Announcement bar: 🔥 -25% NA WSZYSTKO Z KODEM: MAMA25 🔥 — widoczny, działa
- Navigation: hamburger menu + selektor języka (PL ▼) + logo + ikony (konto, koszyk)
- Cookie banner Cookiebot — blokuje cały ekran przy pierwszej wizycie (fullscreen modal)
- Trusted Shops widget (4.68 ★) — lewy dolny róg, nakłada się na treść

**Filtry / nawigacja kategorii:**
- Poziomy scroll tagów kategorii: "Urządzenia LED", "Pumeksy i depilatory", "Rękawice..." — skrojony, dobrze
- Przycisk SORTUJ z ikoną filtra — tylko sortowanie, bez filtrów po atrybutach

**Kafelki produktów (2 kolumny):**
- Zdjęcie zajmuje ~60% karty — duże, czytelne
- Etykieta "Bestseller" / "Nowość" na zdjęciu
- Warianty kolorów jako kółka pod zdjęciem
- Nazwa produktu — **ucięta elipsą** ("Płatki LED LUNA EYE pielęgnacyjne dla rozświetlonej i...")
- Ocena + liczba recenzji (★★★★★ 4.9 (14))
- **Cena: WIDOCZNA** — zarówno cena regularna jak i promocyjna (przekreślona stara + czerwona nowa)
- Przycisk **"DODAJ DO KOSZYKA"** — widoczny bezpośrednio na kafelku

### Kluczowe odkrycia

| Element | Stan | Uwaga |
|---|---|---|
| Ceny na kafelkach | ✅ Są | Poprzednie mapowanie błędne |
| Quick Add to Cart | ✅ Jest | Przycisk "DODAJ DO KOSZYKA" na każdym kafelku |
| Filtry atrybutowe | ❌ Brak | Tylko sortowanie i tagi kategorii |
| Nazwy produktów | ⚠️ Ucięte | Elipsa po 2 linijkach — nie widać pełnej nazwy |
| Cookie banner | ⚠️ Blokuje | Fullscreen modal przy pierwszej wizycie |
| Trusted Shops widget | ⚠️ Nakłada | Zasłania część treści w lewym dolnym rogu |
| Wishlist (serduszko) | ✅ Jest | Widoczne na listingu |

### Sleeping Beauty nieobecna na listingu /collections/sklep
Produkt #1 wg GA4 (852 sesje) **nie istnieje na liście 16 produktów** w /collections/sklep.
Sprawdzone przez DOM: brak jakiegokolwiek linka do "sleeping" lub "poduszka".

---

## 2. PDP — Sleeping Beauty

### Ważne odkrycie: zmiana URL produktu

- **Stary URL** (z GA4): `/products/poduszka-do-spania-sleeping-beauty-glov` → **404**
- **Nowy URL**: `/products/upiekszajaca-poduszka-nocna-glov-sleeping-beauty`

**To tłumaczy 852 sesje w GA4** — ruch idzie na stary URL który zwraca 404. Użytkownicy lądują na stronie błędu, nie na produkcie. Dramatyczna strata konwersji.

### Struktura PDP (od góry)

| Sekcja | Zawartość | Ocena |
|---|---|---|
| Announcement bar | -25% MAMA25 | ✅ |
| Breadcrumbs | STRONA GŁÓWNA › GLOV SLEEPING BEAUTY... | ✅ Jest (poprzednie mapowanie błędne!) |
| Galeria zdjęć | Duże zdjęcia, swipe, nawigacja strzałkami | ✅ |
| Cena | 199,00zł + badge WYPRZEDAŻ + OSZCZĘDZASZ 50,00ZŁ | ✅ Czytelna |
| Oceny | ★★★★★ 5.0 (3) | ✅ Ale tylko 3 recenzje |
| Dostawa | "Darmowa dostawa i prezent: od 150 zł" | ✅ Widoczna przy cenie! |
| Warianty | KOLOR: Cheetah / White / Pink (kółka) | ✅ |
| Opis "Dlaczego Warto?" | Accordion — długi opis tekstowy | ✅ |
| Sticky ATC | "DODAJ DO KOSZYKA" na dole | ✅ |
| Recenzje | Sekcja recenzji klientów (3 recenzje) | ✅ |
| Może Ci się spodobać | Slider produktów powiązanych z ceną i ATC | ✅ Jest! |
| Ostatnio oglądane | Sekcja z historią przeglądania | ✅ Jest! |

### Kluczowe korekty vs poprzednie mapowanie

| Co napisałem wcześniej | Rzeczywistość |
|---|---|
| ❌ Brak breadcrumbs | ✅ Są breadcrumbs |
| ❌ Brak Related Products | ✅ Jest "Może Ci się spodobać" ze sliderem |
| ❌ Brak info o dostawie na PDP | ✅ Jest "Darmowa dostawa od 150 zł" przy cenie |
| ❌ Brak Wishlist | ✅ Jest serduszko (Wishlist) |

### Co faktycznie brakuje na PDP

- Brak **ilości dostępnych sztuk** / stock indicator
- Brak **ikon metod płatności** pod ATC
- Brak **FAQ accordion** z pytaniami o użytkowanie
- Trusted Shops widget zasłania część tekstu na mobile
- Tylko **3 recenzje** — mało jak na #1 produkt ruchu

---

## 3. Koszyk — /cart (pusty)

### Widok pustego koszyka

- Komunikat: "Twój koszyk jest pusty."
- Ikona koszyka (szara, duża)
- Link: "KONTYNUUJ ZAKUPY"
- Brak jakichkolwiek rekomendacji produktów
- Brak inspiracji ("Może Ci się spodobać", bestsellery)
- Brak newslettera czy innego capture

**Ocena:** Funkcjonalnie poprawny, ale straconą szansa na ratowanie sesji.

---

## 4. Najważniejsze odkrycie sesji: URL 404 Sleeping Beauty

**Problem:** GA4 raportuje 852 sesje na Sleeping Beauty (rank #1), ale stary URL produktu zwraca 404.

**Mechanizm:** Zewnętrzne linki (social media, recenzje, SEO) prowadzą do starego URL. Użytkownik ląduje na stronie błędu 404, nie widzi produktu, wychodzi.

**Wpływ:** Praktycznie każda z tych 852 sesji to stracona potencjalna konwersja. Przy CR sklepu ~2.18% to ~18 potencjalnych zakupów miesięcznie w powietrzu.

**Rozwiązanie:** Dodać redirect 301 ze starego URL na nowy w Shopify Admin → Navigation → URL Redirects.

---

## 5. Korekty do GLOV_20_Frictions.md

Frictions które były błędne i wymagają korekty:

| # | Stara diagnoza | Korekta |
|---|---|---|
| #1 | "Brak cen na kafelkach" | Ceny SĄ. Usunąć jako przyczynę drop-off |
| #2 | "Zero related products na PDP" | Related products SĄ ("Może Ci się spodobać") |
| #12 | "Brak breadcrumbs" | Breadcrumby SĄ na PDP |
| #14 | "Brak info o dostawie na PDP" | Info o dostawie JEST przy cenie |
| #16 | "Brak wishlist" | Wishlist JEST (serduszko) |

**Nowy friction do dodania (krytyczny):**
- **URL 404 dla #1 produktu** — stary URL Sleeping Beauty zwraca 404, 852 sesje miesięcznie lądują na stronie błędu

---

## Screenshoty zapisane

| Plik | Zawartość |
|---|---|
| `glov-collection-mobile2.jpeg` | Listing /collections/sklep — górna część z hero |
| `glov-collection-mobile3.jpeg` | Listing — kafelki z cenami i ATC |
| `glov-pdp-sleeping-beauty-mobile.jpeg` | PDP Sleeping Beauty — hero + galeria |
| `glov-pdp-sleeping-beauty-mobile2.jpeg` | PDP — cena, warianty, dostawa, opis |
| `glov-pdp-sleeping-beauty-mobile3.jpeg` | PDP — cena 199zł + breadcrumbs |
| `glov-pdp-related-mobile.jpeg` | PDP — sekcja "Może Ci się spodobać" |
| `glov-cart-mobile.jpeg` | Koszyk pusty |

---

*Analiza wykonana: 2026-05-13 | Chrome DevTools mobile 390x844*

# Szkielet ścieżek GLOV — definicja (bez danych, do późniejszego wlania)

> Etap: DEFINICJA. Najpierw struktura (segmenty → wejścia → modelowe ścieżki). Dane i warstwa wizualna dokleimy potem.
> Źródło struktury nawigacji: live glov.co (2026-06-09) + GA4 + Clarity.

---

## 1. LISTA SEGMENTÓW

**① Behawioralne** (głębokość zaangażowania — per user, rozłączne wewnątrz grupy):
1. Kupił
2. Nie kupił, ale ATC + zaczął checkout (porzucenie w checkout)
3. Nie kupił, ATC bez checkout (porzucenie koszyka)
4. Nie kupił, ale ≥1 PDP (tylko oglądał)

**② Zakupowe** (typ zakupu — wśród kupujących):
5. 1st purchase · 6. ponowny (repeat)
7. 1-item · 8. multi-item

**③ Kanałowe** (źródło — nakładają się z resztą):
9. Paid Search · 10. Paid Social · Direct · Organic Search · Cross-network · Organic Social

> REGUŁA: segmenty NIE są rozłączne między grupami. User = behawioralny × zakupowy × kanałowy jednocześnie.

---

## 2. LISTA WEJŚĆ (pierwszy ekran sesji)

- **W1 — Listing / obszar z listingiem** (`/collections/*`)
- **W2 — PDP wprost** (`/products/*` — zwykle reklama produktowa Meta katalog / Google Shopping)
- **W3 — Strona główna** (`/`)
- **W4 — Search results** (`/search?q=`) — wejście rzadkie (~1,8% userów)
- **W5 — Blog** (`/blogs/pl`) — osobno (treść, nie zakup wprost)
- **W6 — Koszyk wprost** (`/cart`) — OSOBNO, bo tu prowadzą kampanie odzyskiwania koszyka (remarketing/mail)
- **W7 — Landing page** (`/pages/*`) — landingi kampanijne, rozpoznane na żywo:
  - Rutyny: `/pages/rutyna-coolnails`, `/pages/rutyna-wieczorna-pielegnacja-z-glov`, `/pages/rutyna-gladkie-cialo`, `/pages/rutyna-wlosowa-grzebien-gratis`
  - Promo/gratis: `/pages/gladkie-cialo-przez-caly-rok`, `/pages/glov-scrubex-gratis`, `/pages/iconic-mitt-glov-wielopaki`
  - LED Therapy: `/pages/terapia-swiatlem-led`
  - Brand: `/pages/o-nas`, `/pages/glov-club-1`, `/pages/contact`

---

## 3. MODELOWE ŚCIEŻKI (WEJŚCIE → ŚRODEK TRANSPORTU → AKCJA → WYNIK)

Środek transportu = JAK się przemieszcza: nawigacja (kolekcje) / search / brak (PDP wprost).

**Ś-A · Listing-driven (przeglądacz)** — główny dla kupujących
`W1 listing → nawigacja kolekcji (view_item_list→select_item) → PDP → ATC → koszyk → checkout → [kupił / porzucił]`

**Ś-B · PDP-driven (z reklamy)** — główny dla odpadających
`W2 PDP wprost → [brak środka] → ATC albo wyjście → [koszyk / PDP-bounce]`

**Ś-C · Search-driven (margines)**
`W3/W1 → search → wyniki → PDP → ATC → koszyk → [kupił / nie]`

**Ś-D · Homepage-driven**
`W3 HP → klik kolekcja/produkt → PDP → ATC → koszyk → [kupił / nie]`

**Ś-E · Landing-driven (kampanijny)**
`W7 /pages/* → klik produkt/kolekcja → PDP → ATC → koszyk → [kupił / nie]`

**Ś-F · Cart-recovery (odzyskiwanie koszyka)**
`W6 /cart wprost (z maila/remarketingu) → checkout → [kupił / nie]`

**Ś-G · Bounce bez celu**
`dowolne wejście → 0 akcji → wyjście`

**Ś-H · Quick-add z listingu (POMIJA PDP)** — KLASA DOMINUJĄCA, potwierdzona danymi
ATC następuje z kafelka na listingu/HP, BEZ wchodzenia na kartę produktu. Warianty:
- **Ś-H1:** `W3 HP → listing → ATC (kafelek) → koszyk → checkout → [kupił/porzucił]`
- **Ś-H2:** `W1 listing → ATC (kafelek) → koszyk → checkout → [kupił/porzucił]`
- **Ś-H3:** `W1 listing → ATC → WYJŚCIE` (dodał, nie dokończył)
DOWÓD (GA4 maj, addToCarts per landing): /collections/sklep jako landing = 8 194 sesje, **1 478 ATC**, 159 transakcji — największe pojedyncze źródło ATC w sklepie. Quick-add „Dodaj do koszyka" jest na kafelkach HP i listingu (potwierdzone w HTML glov.co).

> KOREKTA MODELU: istnieją DWIE równoległe mechaniki ATC — (a) z PDP [Ś-A, Ś-B], (b) z listingu/HP [Ś-H]. Wcześniejszy model zakładał błędnie, że ATC zawsze na PDP.

---

## ŚLEPE POLA (wpływają na ścieżki)
- **ATC bez pagePath** (`(not set)` w 100%, potwierdzone pageReferrer też puste) → nie wiemy czy ATC padło na listingu czy PDP → Ś-A i Ś-B ZLEWAJĄ SIĘ w punkcie ATC. Naprawa = parametr źródła w GTM (nie Shopify).
- **Filtry** nieoeventowane → brak jako środek transportu.
- **Search** mierzalny, ale 1,8% → margines.

## NASTĘPNY KROK
Wlać dane (wolumeny per wejście × ścieżka × segment), potem warstwa wizualna (Sankey + mapa głębokości + tory segmentowe).

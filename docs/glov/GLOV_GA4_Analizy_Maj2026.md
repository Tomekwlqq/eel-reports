# GLOV — Analizy GA4 | Maj 2026 (1–13 maja)
> Źródło: Google Analytics 4, property `glov.co (GA4)` — `properties/342844459`
> Waluta: PLN | Strefa: Europe/Warsaw
> Ostatnia aktualizacja: 2026-05-13

---

## 1. KPI Ogólne

| Metryka | Wartość |
|---|---|
| Aktywni użytkownicy | **9 203** |
| Sesje | **10 970** |
| Odsłony | **25 304** |
| Engagement rate | **50.1%** |
| Śr. czas sesji | **~4 min 2 sek** |
| Zakupy | **239** |
| Przychód | **28 976 PLN** |
| Śr. wartość zamówienia | **~121 PLN** |

---

## 2. Kanały — sesje, konwersja, przychód

| Kanał | Sesje | Zakupy | CR | Przychód |
|---|---|---|---|---|
| Direct | 2 809 | 20 | 0.71% | 2 396 PLN |
| Paid Social | 2 608 | 64 | 2.46% | 7 282 PLN |
| Organic Search | 2 425 | 60 | 2.47% | 6 991 PLN |
| Cross-network | 1 166 | 18 | 1.54% | 3 129 PLN |
| **Paid Search** | **1 140** | **52** | **4.56% ⭐** | **6 004 PLN** |
| Unassigned | 706 | 17 | 2.41% | 2 031 PLN |
| Organic Social | 161 | 4 | 2.48% | 471 PLN |
| Referral | 74 | 0 | 0% ⚠️ | 0 PLN |
| Organic Shopping | 63 | 4 | 6.35% ⭐ | 671 PLN |

**Wnioski:**
- Paid Search najwyższy CR (4.56%) — warto skalować budżet
- Organic Shopping 6.35% CR — gotowi kupujący, mały wolumen
- Referral 0 zakupów — zbadać skąd przychodzą
- Direct niski CR (0.71%) — dużo botów lub powracających bez intencji

---

## 3. Lejki per kanał

> view_item → add_to_cart → begin_checkout → purchase

| Kanał | view_item | add_to_cart | begin_checkout | purchase | view→cart | cart→checkout | checkout→purchase |
|---|---|---|---|---|---|---|---|
| Paid Social | 2 486 | 501 | 144 | 64 | 20.2% | 28.7% | 44.4% |
| Organic Search | 2 038 | 381 | 106 | 60 | 18.7% | 27.8% | 56.6% |
| Cross-network | 1 402 | 121 | 38 | 18 | 8.6% | 31.4% | 47.4% |
| Paid Search | 1 337 | 317 | 81 | 52 | 23.7% | 25.6% | 64.2% |
| Direct | 602 | 203 | 76 | 20 | 33.7% | 37.4% | 26.3% |
| Unassigned | 363 | 126 | 42 | 17 | 34.7% | 33.3% | 40.5% |
| Organic Social | 124 | 21 | 9 | 4 | 16.9% | 42.9% | 44.4% |
| Referral | 71 | 5 | 2 | 0 | 7.0% | 40.0% | 0% ⚠️ |
| Organic Shopping | 41 | 20 | 7 | 4 | 48.8% | 35.0% | 57.1% |

**Wnioski z lejków:**
- **Paid Search** najskuteczniejszy na każdym etapie — checkout→purchase 64.2%
- **Direct** ma wysoki view→cart (33.7%) ale odpada na checkout→purchase (tylko 26.3%) — coś blokuje finalizację
- **Cross-network** słaby view→cart (8.6%) — reklamy kierują na złe strony lub nieodpowiednia grupa
- **Referral**: tylko 5 add_to_cart ze 71 view_item i 0 zakupów — nieodpowiedni ruch
- **Organic Shopping** najwyższy view→cart (48.8%) — klienci z intencją zakupu

---

## 4. Lejek ogólny (maj)

| Event | Liczba | Drop-off |
|---|---|---|
| view_item_list | 34 630 | — |
| view_item | 8 465 | -75.6% ⚠️ |
| add_to_cart | 1 695 | -80.0% ⚠️ |
| begin_checkout | 505 | -70.2% |
| add_shipping_info | 451 | -10.7% |
| add_payment_info | 371 | -17.7% |
| purchase | 239 | -35.6% |

**Główny problem: lista → produkt (-75.6%)** — strony kategorii nie zachęcają do kliknięcia w produkt

---

## 5. Urządzenia

| Urządzenie | Sesje | Udział | Zakupy | CR |
|---|---|---|---|---|
| 📱 Mobile | 6 982 | 63.6% | 194 | **2.78%** |
| 💻 Desktop | 4 048 | 36.9% | 42 | 1.04% |
| Tablet | 68 | 0.6% | 3 | 4.41% |

**Mobile konwertuje lepiej niż desktop** — dobry znak, sklep zoptymalizowany mobilnie.

---

## 6. Ranking stron produktowych (wg sesji)

| # | Produkt | Sesje | Odsłony | Śr. czas | Engagement |
|---|---|---|---|---|---|
| 1 | Poduszka nocna Sleeping Beauty | 851 | 1 267 | 1:10 | 52.1% |
| 2 | Pumeks nano glass | 725 | 1 016 | 1:31 | 55.3% |
| 3 | Płatki LED Luna Eye | 608 | 675 | 1:21 | 53.9% |
| 4 | Depilator nano glass | 246 | 288 | 1:52 | 69.1% |
| 5 | Szczotka do włosów Biobased | 230 | 239 | 0:53 | 47.0% |
| 6 | Bubble Burst 3w1 | 185 | 173 | 0:52 | 40.5% |
| 7 | Rękawica Skin Smoothing | 157 | 280 | 0:49 | 55.4% |
| 8 | Klips Zero Gravity | 155 | 173 | 1:17 | 60.6% |
| 9 | Pumeks + Depilator 2w1 | 91 | 94 | 1:38 | 63.7% |
| 10 | Rękawica On The Go | 72 | 135 | 1:34 | 65.3% |

**Uwagi:**
- Top 3 produkty generują łącznie ~2 184 sesji — to core portfolio maja
- Depilator nano glass ma wysoki engagement (69%) i długi czas sesji → wysokie zainteresowanie
- Bunny Ears: 36 sesji ale aż 295 odsłon i 4:36 na stronie → bardzo zaangażowani

---

## 7. Ranking listingów (wg sesji)

| # | Listing | Sesje | Odsłony | Śr. czas | Engagement |
|---|---|---|---|---|---|
| 1 | /collections/sklep (główny) | 1 363 | 3 313 | 2:12 | **78.1%** |
| 2 | /collections/rekawice-do-demakijazu | 369 | 640 | 1:40 | 76.7% |
| 3 | /collections/produkty-do-pielegnacji-wlosow | 310 | 819 | 2:14 | **83.2%** |
| 4 | /collections/produkty-do-pielegnacji-ciala | 254 | 467 | 1:15 | 83.1% |
| 5 | /collections/produkty-do-pielegnacji-twarzy | 277 | 662 | 2:01 | **88.1%** |
| 6 | /collections/all | 232 | 967 | 2:41 | **84.5%** |
| 7 | /collections/zestawy | 139 | 298 | 1:24 | 79.9% |
| 8 | /collections/coolnails | 121 | 262 | 2:54 | 75.2% |
| 9 | /collections/nano-glass-collection | 73 | 105 | 1:08 | 90.4% |
| 10 | /collections/wyprzedaz | 46 | 60 | 1:05 | 87.0% |

**Uwagi:**
- Listingi mają bardzo wysoki engagement (75-90%) vs strony produktowe (40-70%)
- Pielęgnacja twarzy (88.1%) i nano-glass (90.4%) — najwyższe zaangażowanie
- /collections/all z 967 odsłonami i 2:41 — użytkownicy przeglądają szeroko

---

## 8. Priorytety działania

1. **🔴 Drop lista→produkt (-75.6%)** — lepsze karty produktów w widoku kolekcji (zdjęcia, ceny, opisy skrócone)
2. **🟡 Skalować Paid Search** — najwyższy CR (4.56%), tylko 1 140 sesji — duży potencjał
3. **🟡 Zbadać Direct checkout drop** — wysoki view→cart (33.7%) ale niski finalizacji (26.3%)
4. **🟢 Cross-network view→cart 8.6%** — kampanie kierują na złe landing pages
5. **🟢 Referral 0 zakupów** — sprawdzić skąd pochodzi ten ruch

---

## Property IDs (do zapytań GA4)

| Sklep | Property ID | Waluta |
|---|---|---|
| glov.co (PL) | `properties/342844459` | PLN |
| glov.eu | `properties/326256483` | EUR |
| LP glov-france.com | `properties/413599124` | EUR |
| LP glov-germany.com | `properties/413616939` | EUR |

Konto GA4: `accounts/39784404` (Phenicoptere)

---

*Raport wygenerowany przez Claude + `google-analytics-mcp` | 2026-05-13*

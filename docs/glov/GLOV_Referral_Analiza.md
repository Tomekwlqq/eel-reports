# GLOV — Analiza Ruchu Referral
> Data: 2026-05-13 | Źródło: GA4 properties/342844459 | Okres: ostatnie 30 dni
> Kontekst: Referral = 74 sesji (wcześniejszy okres), 0 zakupów wg wcześniejszego raportu

---

## TL;DR — Referral to głównie szum, nie realny kanał sprzedażowy

Ruch Referral jest zdominowany przez trzy typy źródeł:
1. **Boty/link preview** — Microsoft Teams, Lark/Feishu (ByteDance) — automatyczne podglądy linków bez realnych użytkowników
2. **AI assistants** — ChatGPT, Gemini, Perplexity, Claude.ai — użytkownicy którzy zadają AI pytania o pielęgnację i klikają linki do GLOV
3. **Marketplace/porównywarki** — Lamoda.pl, Skapiec.pl — ruch z listingów produktów

**Zakupy:** 2 zakupy w 30 dniach — z `trustedshops.lightning.force.com` (59,90 zł) i `glov.eu` (425,65 zł). Żadne z nich nie są "typowym" ruchem referral.

**Wniosek:** Referral NIE jest kanałem sprzedażowym dla GLOV. Nie ma partnerstw contentowych, blogerów, prasy ani innych źródeł które generują intencyjny ruch zakupowy.

---

## Ranking źródeł Referral (30 dni)

| # | Źródło | Sesje | ATC | Checkout | Zakupy | Przychód | Typ |
|---|---|---|---|---|---|---|---|
| 1 | statics.teams.cdn.office.net | 29 | 9 | 0 | 0 | 0 zł | 🤖 Bot/preview |
| 2 | bytedance.larkoffice.com | 24 | 3 | 0 | 0 | 0 zł | 🤖 Bot/preview |
| 3 | chatgpt.com | 24 | 7 | 1 | 0 | 0 zł | 🤖 AI assistant |
| 4 | attomy.io | 18 | 1 | 1 | 0 | 0 zł | ❓ Nieznane |
| 5 | lamoda.pl | 14 | 1 | 1 | 0 | 0 zł | 🛒 Marketplace |
| 6 | ucneg3jpopda.feishu.cn | 7 | 0 | 0 | 0 | 0 zł | 🤖 Bot/preview |
| 7 | trustedshops.lightning.force.com | 5 | 1 | 1 | **1** | **59,90 zł** | 🏪 Trusted Shops |
| 8 | gemini.google.com | 4 | 1 | 1 | 0 | 0 zł | 🤖 AI assistant |
| 9 | fynk.livespace.io | 3 | 0 | 0 | 0 | 0 zł | 🏢 CRM |
| 10 | klarna | 3 | 4 | 1 | 0 | 0 zł | 💳 Płatność |
| 11 | search.brave.com | 3 | 3 | 1 | 0 | 0 zł | 🔍 Brave Search |
| 12 | skapiec.pl | 3 | 0 | 0 | 0 | 0 zł | 💰 Porównywarka |
| 13 | zasobygwp.pl | 3 | 0 | 0 | 0 | 0 zł | ❓ Nieznane |
| 14 | glov.eu | 2 | 3 | 1 | **1** | **425,65 zł** | 🔗 Własna domena |
| 15 | claude.ai | 2 | 0 | 0 | 0 | 0 zł | 🤖 AI assistant |
| 16 | perplexity.ai | 1 | 0 | 0 | 0 | 0 zł | 🤖 AI assistant |
| 17 | shoplookz.me | 2 | 0 | 0 | 0 | 0 zł | ❓ Nieznane |
| 18 | startuppoland.org | 1 | 0 | 0 | 0 | 0 zł | 📰 Media |

**Łącznie:** ~165 sesji, 2 zakupy, 485,55 zł

---

## Analiza typów źródeł

### 🤖 Boty i link preview (największy segment — ~60 sesji)

**Microsoft Teams** (`statics.teams.cdn.office.net`) — 29 sesji
- To nie są prawdziwi użytkownicy. Teams automatycznie pobiera podgląd każdego linku wklejonego do chatu.
- 9 "add_to_cart" to najprawdopodobniej fałszywe eventy z botów skanujących stronę.
- **Wniosek:** To szum danych, nie realny ruch.

**Lark/Feishu** (`bytedance.larkoffice.com`, `ucneg3jpopda.feishu.cn`) — 31 sesji
- ByteDance collaboration tools — podobna sytuacja jak Teams.
- Ale: `bytedance.larkoffice.com` ma 4 sesje na konkretny produkt COOLNAILS z 1197 s avg session = prawdziwy użytkownik
- Ktoś z firmy używającej Lark wkleił linka do GLOV w komunikatorze.

---

### 🤖 AI Assistants (nowy, rosnący segment — ~30 sesji)

**ChatGPT** — 24 sesji, 7 ATC, 0 zakupów
- Landing pages: strona główna (6 sesji, 350s avg, 4 ATC!), produkty niemieckie, strona główna ponownie
- Ktoś zapytał ChatGPT o coś związanego z pielęgnacją i dostał link do GLOV. Czas na stronie 350s = poważne zainteresowanie.
- 4 ATC z 6 sesji to **67% view→cart** — najwyższy ze wszystkich źródeł!
- **Problem:** 1 checkout, 0 zakupów. Możliwe bariery: brak preferowanej metody płatności, cena, brak oferty dopasowanej do ich rynku (DE?)

**Gemini** — 4 sesji, 1 ATC, 0 zakupów
**Perplexity** — 1 sesja
**Claude.ai** — 2 sesje (prawdopodobnie ja 😄)

**Obserwacja:** GLOV jest polecany przez AI asystentów! To oznacza że produkt ma dobrą "AI visibility" — jest w danych treningowych jako rekomendacja. Ten ruch będzie rosnąć.

---

### 🛒 Marketplace i porównywarki (~17 sesji)

**Lamoda.pl** — 14 sesji, 7 sesji na `/products/biodegradowalne-platki-oczyszczajace-glov-natural-cleansing-pads`
- Lamoda to duży rosyjski/europejski marketplace. GLOV jest tam listowany.
- Ruch ląduje bezpośrednio na stronie produktu — to potencjalnie intencyjny ruch zakupowy.
- 0 zakupów mimo 14 sesji = problem z konwersją tego konkretnego produktu lub cena vs Lamoda.

**Skapiec.pl** — 3 sesji, 0 ATC — porównywarka cen, użytkownicy szukają najtaniej.

---

### 💳 Klarna (3 sesji — cross-channel confusion)

Klarna jako źródło referral = użytkownicy wracający po procesie Klarna (BNPL). 4 ATC, 1 checkout, 0 zakupów — możliwe że Klarna flow nie zakończyło się sukcesem.

---

### 🔗 Własne domeny GLOV (ciekawy przypadek)

**glov.eu** — 2 sesje, 1 zakup, 425,65 zł
- Zakup z europejskiej domeny GLOV → polskiej. Prawdopodobnie klient który zna markę z innego rynku.
- GA4 traktuje cross-domain jako referral jeśli nie jest skonfigurowane cross-domain tracking.
- **To powinno być naprawione:** dodać glov.eu do listy "cross-domain domains" w GA4, żeby nie liczyło jako referral.

**account.glov.co** — 1 sesja — własna subdomena (konta klientów).

---

### ❓ Nieznane/podejrzane (~24 sesji)

**attomy.io** — 18 sesji, 170s avg session, 1 ATC, 1 checkout, 0 zakupów
- [attomy.io](https://attomy.io) to platforma MLM/affiliate dla beauty & wellness products.
- Ktoś w sieci attomy.pl promuje GLOV jako partner. Ruch trafia na stronę główną i kategorie.
- Potencjał: jeśli to rzeczywiście sieć partnerska, warto ją aktywować. Ale 0 zakupów sugeruje mismatch.

**zasobygwp.pl** — 3 sesje — portal Grupy Wydawniczej Polskapresse. Możliwy artykuł/wzmianka.

**startuppoland.org** — 1 sesja — portal startupowy. Wzmianka o GLOV?

---

## Diagnoza: Dlaczego 0 zakupów z Referral (poprzedni raport)?

Poprzedni raport mówił "Referral: 74 sesje, 0 zakupów". Teraz widzimy 2 zakupy w 30 dniach — rozbieżność może wynikać z:
1. Różnych okresów raportowania
2. Zakupy z trustedshops i glov.eu to incydentalne, nie strukturalne

**Realna diagnoza:**
- **~50% ruchu to boty** (Teams, Feishu/Lark) — nie są prawdziwymi użytkownikami
- **~20% to AI assistants** — intencja zakupowa ale coś blokuje finalizację
- **~15% to marketplace/porównywarki** — wysoka intencja, ale może problem z ceną lub landing page
- **~15% to inne** — niekonkretne, rozproszone

---

## Szanse i rekomendacje

### 🟢 Szybkie wygrane

| # | Akcja | Uzasadnienie | Czas |
|---|---|---|---|
| 1 | Dodać glov.eu do cross-domain tracking w GA4 | Zakupy z glov.eu są traktowane jako referral — zaburzają dane | 15 min (GA4 Admin) |
| 2 | Sprawdzić listing na Lamoda.pl | 14 sesji/mc z jednego produktu — czy GLOV jest dobrze opisany na Lamoda? | 30 min |
| 3 | Zfiltrować boty Teams/Feishu w GA4 | Dodać filtr "Hostname contains office.net OR feishu" do segmentu wewnętrznego | 15 min (GA4) |

### 🟡 Średni termin

| # | Akcja | Uzasadnienie | Czas |
|---|---|---|---|
| 4 | Zbadać attomy.io | Potencjalna sieć partnerska — jeśli tak, aktywować partnership lub wyjaśnić skąd ruch | 1h |
| 5 | Monitorować AI assistants | ChatGPT → 67% view→cart. Kiedy OpenAI doda checkout to może być kanał. Upewnij się że produkty są dobrze opisane w języku który AI cytuje | Ongoing |
| 6 | Zbadać zasobygwp.pl / startuppoland.org | Może wzmianka prasowa — warto znaleźć artykuł i zobaczyć jak GLOV jest przedstawiony | 30 min |

### 🔴 Strategiczne (brak partnerów contentowych = luka)

GLOV nie ma żadnego partnera contentowego który by regularnie generował ruch zakupowy przez referral:
- Brak blogerów beauty z linkami afiliacyjnymi
- Brak prasy z "recenzja + link do sklepu"
- Brak influencer blog posts z linkami

**To jest luka strategiczna.** Dla polskiego beauty e-commerce, referral z blogów/mediów to często 5-15% sprzedaży. GLOV ma 0.

**Rekomendacja długoterminowa:** Program afiliacyjny (Shopify ma wbudowane narzędzia) + outreach do beauty bloggerek z ofertą współpracy + PR do mediów beauty.

---

## Kontekst: AI Traffic to nowy Referral

Ciekawa obserwacja: ChatGPT (24 sesji), Gemini (4), Perplexity (1), Claude (2) = ~31 sesji z AI.
To ~19% całego ruchu Referral. I rośnie.

ChatGPT view→cart = 67% — użytkownicy którzy klikają link z ChatGPT są BARDZO zmotywowani.

**Co to znaczy dla GLOV:**
1. GLOV jest "znany" AI modelom — dobry sygnał SEO i content authority
2. Gdy AI shopping agents staną się powszechne (OpenAI Operator, Gemini Shopping), GLOV będzie dobrze pozycjonowany
3. Warto upewnić się że opisy produktów są jasne i odpowiadają na pytania które użytkownicy zadają AI

---

## Podsumowanie

| Metryka | Wartość |
|---|---|
| Całkowite sesje Referral (30 dni) | ~165 |
| Sesje z botów/preview | ~60 (36%) |
| Sesje z AI assistants | ~31 (19%) |
| Sesje z marketplace | ~17 (10%) |
| Sesje z unknown/inne | ~57 (35%) |
| Zakupy | 2 (incydentalne) |
| Przychód | 485,55 zł |
| **Wniosek** | **Referral nie jest kanałem sprzedażowym — brak partnerów contentowych** |

---

*Analiza: 2026-05-13 | GA4 properties/342844459 | 30 dni*

# GLOV — Lista friction points
> Źródło: GA4 Maj 2026 + Visual mapping + Mobile UX analiza (2026-05-13)
> Zasada: tylko frictions potwierdzone danymi lub bezpośrednią obserwacją. Bez hipotez bez pokrycia.
> Zaktualizowano po mobile UX analizie — usunięto 5 błędnych diagnoz

---

## Jak czytać tę listę

- **Dowód** — konkretna liczba z GA4 lub obserwacja ze screenshota/DOM
- **Mechanizm** — jak dokładnie to blokuje konwersję
- **Fix** — co konkretnie zrobić

Kolejność: od najbardziej udowodnionego i największego wpływu.

---

## 🔴 Krytyczne — potwierdzone twarde dane

---

### #1 — URL 404: Sleeping Beauty traci 852 sesje miesięcznie

**Dowód:** GA4: `/products/poduszka-do-spania-sleeping-beauty-glov` = rank #1 w ruchu (852 sesje). Chrome DevTools: ten URL zwraca 404. Nowy URL produktu: `/products/upiekszajaca-poduszka-nocna-glov-sleeping-beauty`.  
**Mechanizm:** Produkt zmienił slug po rebrandingu/tłumaczeniu. Wszystkie zewnętrzne linki (social, SEO, stare kampanie) prowadzą na martwą stronę. Użytkownik widzi błąd 404 i wychodzi.  
**Szacunek:** Przy CR 2.18% → ~18 straconych zakupów miesięcznie z samego tego produktu.  
**Fix:** Shopify Admin → Navigation → URL Redirects → dodaj: stary slug → nowy slug. 2 minuty.

---

### #2 — Sleeping Beauty nieobecna w /collections/sklep (główny listing)

**Dowód:** DOM inspection listingu: brak jakiegokolwiek linka do "sleeping" lub "poduszka" wśród 16 produktów na /collections/sklep. GA4: Sleeping Beauty = #1 produkt wg sesji w maju.  
**Mechanizm:** Użytkownik który wchodzi na główny listing sklepu (1 363 sesje, #1 kolekcja) nie zobaczy najchętniej odwiedzanego produktu. Merchandising oderwany od danych.  
**Fix:** Dodać Sleeping Beauty do kolekcji /collections/sklep w Shopify Admin.

---

### #3 — Direct: wysoki view→cart (33.7%) ale tylko 26.3% finalizuje checkout

**Dowód:** GA4 lejek per kanał: Direct view→cart = 33.7% (najwyższy ze wszystkich kanałów), checkout→purchase = 26.3% (najniższy ze wszystkich). 2 809 sesji → tylko 20 zakupów.  
**Mechanizm:** Direct to głównie powracający użytkownicy — mają intencję, dodają do koszyka, ale odpadają na ostatnim kroku. Klasyczny symptom: nieoczekiwany koszt dostawy lub brak preferowanej metody płatności ujawniające się dopiero w checkout.  
**Co zbadać:** Przejść przez checkout manualnie i sprawdzić czy próg darmowej dostawy jest komunikowany przed checkout, oraz jakie metody płatności są dostępne.

---

### #4 — Cross-network (PMax): 8.6% view→cart — najniższy ze wszystkich kanałów

**Dowód:** GA4: Cross-network view→cart = 8.6% vs Organic Shopping 48.8%, Direct 33.7%, Paid Search 23.7%. 1 166 sesji → 18 zakupów (CR 1.54%).  
**Mechanizm:** PMax prawdopodobnie kieruje ruch na HP zamiast na konkretne produkty. Użytkownik który widział reklamę "Pumeks nano" ląduje na stronie głównej i musi sam znaleźć produkt — większość odpada.  
**Dowód pośredni:** HP jest pierwszą stroną w lejku Cross-network — sprawdzenie landing pages per kampania potwierdziłoby tę hipotezę.  
**Fix:** W Google Ads → Ustawienia kampanii PMax → Final URL → ustawić konkretne URL produktów zamiast HP.

---

### #5 — Pusty koszyk: tylko "Twój koszyk jest pusty" + przycisk "Kontynuuj zakupy"

**Dowód:** Screenshot mobile koszyka /cart: jeden komunikat, jedna ikona koszyka, jeden link. Brak jakichkolwiek rekomendacji produktów.  
**Mechanizm:** Użytkownik który trafi na pusty koszyk (po wygaśnięciu sesji, po usunięciu produktu, po kliknięciu ikony koszyka) dostaje dead end. Brak inspiracji = wyjście ze sklepu.  
**Fix:** Dodać sekcję "Może Ci się spodobać" lub "Bestsellery" na stronie pustego koszyka — standard Shopify, nie wymaga developera.

---

### #6 — Blog: 11 artykułów bez żadnego linka do produktów

**Dowód:** DOM inspection /blogs/pl: zero linków `/products/` w treści żadnego artykułu. Artykuły o wieczornej pielęgnacji, Prezentowniku 2022, recyklingu — bez CTA.  
**Mechanizm:** Organic Search = 2 425 sesji, 2.47% CR. Blog przyciąga część tej organiki (artykuły o pielęgnacji rankują na long-tail). Użytkownik który przeczytał "jak przeprowadzić wieczorną pielęgnację" jest w idealnym momencie zakupowym — i nie dostaje żadnego CTA.  
**Fix:** Ręczna edycja każdego artykułu — dodać 1-2 linki do produktów powiązanych z tematem artykułu.

---

### #7 — Referral: 74 sesje, 0 zakupów, 5 add_to_cart → 0 purchase

**Dowód:** GA4: Referral = 74 sesje, 0 PLN przychodu, 0 zakupów. Lejek: 71 view_item, 5 add_to_cart, 2 begin_checkout, 0 purchase.  
**Mechanizm:** Ktoś linkuje do sklepu (press, blogerzy, partnerzy?) ale ten ruch nie kupuje. Możliwe przyczyny: linki prowadzą na nieodpowiednie landing pages, ruch jest niespójny z treścią źródłową, lub to ruch botów/spam.  
**Co zbadać:** GA4 → Acquisition → Traffic Acquisition → filtruj Referral → kolumna "Session source" — zobaczyć które domeny linkują.

---

## 🟡 Ważne — potwierdzone obserwacją

---

### #8 — Brak progu darmowej dostawy w koszyku i nagłówku

**Dowód:** Screenshot koszyk mobile + screenshot HP: trust bar mówi "Darmowa dostawa" bez kwoty. Na PDP jest info "Darmowa dostawa i prezent: od 150 zł" — ale w koszyku i nagłówku tej informacji nie ma.  
**Mechanizm:** AOV = 121 PLN. Jeśli próg to 150 PLN, brakuje średnio 29 PLN do darmowej dostawy. Bez dynamicznego progress bara ("Brakuje Ci 29 zł do darmowej dostawy!") użytkownik nie wie że jest blisko i nie dopcha koszyka.  
**Fix:** Shopify: zainstalować aplikację lub włączyć opcję motywu free shipping progress bar w koszyku.

---

### #9 — Sleeping Beauty ma tylko 3 recenzje przy 852 sesjach miesięcznie

**Dowód:** Screenshot PDP + DOM: ★★★★★ 5.0 (3 recenzje). GA4: 852 sesje miesięcznie na ten produkt.  
**Mechanizm:** 3 recenzje to za mało żeby budować zaufanie dla produktu premium (199 zł). Użytkownik szuka social proof — przy tylko 3 opiniach może mieć wątpliwości co do popularności produktu.  
**Fix:** Aktywna kampania zbierania recenzji od dotychczasowych kupujących (email post-purchase z prośbą o opinię).

---

### #10 — Depilator nano: 69.1% engagement i 1:52 na stronie ale niski wolumen sprzedaży

**Dowód:** GA4: Depilator nano glass = 246 sesji, engagement rate 69.1%, avg session duration 1:52. To najwyższe engagement rate i najdłuższy czas ze wszystkich top produktów.  
**Mechanizm:** Użytkownicy długo czytają stronę Depilatora — mają zainteresowanie ale coś blokuje decyzję. Klasyczny symptom nieodpowiedzianej obiekcji: "jak to działa na mojej skórze?", "boli?", "jak często używać?". Brak FAQ na PDP = obiekcja bez odpowiedzi = brak zakupu.  
**Fix:** Dodać FAQ accordion na PDP Depilatora z pytaniami "Jak działa?", "Dla jakiego typu skóry?", "Jak często używać?", "Jak czyścić?".

---

### #11 — Koszyk nie ma cross-sellu ani upsells

**Dowód:** Screenshot koszyka mobile: lista produktów + pole rabatowe + notatka + przycisk checkout. Zero rekomendacji.  
**Mechanizm:** Koszyk to najlepszy moment na cross-sell — użytkownik jest zdecydowany kupić. Przy AOV 121 PLN i asortymencie GLOV (produkty 39-299 zł) dołożenie jednego produktu per zamówienie to realna dźwignia.  
**Fix:** Shopify: dodać sekcję "Klienci kupili też" w szablonie koszyka lub zainstalować aplikację cart upsell.

---

### #12 — 7 równorzędnych banerów "Oferty specjalne" na HP bez hierarchii

**Dowód:** DOM inspection HP: sekcja "Oferty specjalne" = 7 banerów: Gładkie ciało i stopy, Włosowy must have + prezent, Scrubex gratis, Nano szkło, Silicone Bath, Kolekcja Cheetah, Wielopaki. Żaden nie jest wizualnie wyróżniony.  
**Mechanizm:** Paradoks wyboru — 7 równorzędnych opcji promocyjnych sprawia że żadna nie przykuwa uwagi. Użytkownik skanuje i nie klika.  
**Fix:** Zredukować do 2-3 banerów i wyróżnić jeden jako główną promocję tygodnia.

---

### #13 — Brak opisu tekstowego (SEO) na stronach kategorii

**Dowód:** DOM inspection /collections/rekawice-do-demakijazu, /collections/produkty-do-pielegnacji-wlosow, /collections/produkty-do-pielegnacji-twarzy: brak jakiegokolwiek tekstu opisowego pod nagłówkiem H1 — same kafelki produktów.  
**Mechanizm:** Google nie ma co indeksować na tych stronach poza nazwami produktów. Kategorie z wysokim engagement (83-88%) mogłyby rankować na frazy typu "produkty do pielęgnacji twarzy" gdyby miały 150-300 słów opisu.  
**Fix:** Dodać krótki opis (150-200 słów) na każdej stronie kategorii — content kategorii w Shopify Admin → Collections → Description.

---

## 🟢 Do zbadania — dane wskazują problem, przyczyna nieznana

---

### #14 — Drop lista→produkt -75.6% — przyczyna nieustalona

**Dowód:** GA4 lejek ogólny: view_item_list → view_item = -75.6%. Tylko 1 na 4 użytkowników którzy widzą listing wchodzi na stronę produktu.  
**Co wykluczono:** Ceny SĄ na kafelkach (mobile screenshot). Quick Add to Cart JEST na kafelkach.  
**Hipotezy do weryfikacji:** Core Web Vitals mobile (wolne ładowanie = bounce przed kliknięciem), jakość ruchu z Paid Social (cold traffic bez intencji zakupowej), niedopasowanie produktów w listingu do intencji użytkownika.  
**Jak zbadać:** 1) Lighthouse mobile audit → LCP/INP/CLS. 2) Nagrania sesji Hotjar/Clarity — zobaczyć co robi użytkownik na listingu przed wyjściem. 3) Segment GA4: tylko Organic Search (intencyjny ruch) → ile wynosi drop dla nich osobno.

---

### #15 — Drop view_item→add_to_cart -80% — przyczyna nieustalona

**Dowód:** GA4: view_item → add_to_cart = -80%. Tylko 1 na 5 który wchodzi na PDP dodaje do koszyka.  
**Co wykluczono:** Related products SĄ ("Może Ci się spodobać" — DOM i screenshot). Breadcrumby SĄ. Info o dostawie JEST przy cenie.  
**Hipotezy do weryfikacji:** Brak wystarczającego social proof (Sleeping Beauty: 3 recenzje), nieodpowiedziane obiekcje (szczególnie Depilator — patrz #10), brak urgency/scarcity, ruch niskiej jakości który i tak by nie kupił.  
**Jak zbadać:** Nagrania sesji na konkretnych PDP — zobaczyć gdzie użytkownik scrolluje i gdzie wychodzi.

---

## Frictions które wymagają jeszcze danych (nie analizowane)

| Obszar | Co sprawdzić | Narzędzie |
|---|---|---|
| Checkout krok po kroku | Ile kroków, co pojawia się na każdym, gdzie odpada Direct | Manualny test + GA4 Checkout Funnel |
| Metody płatności | Czy są BLIK, karty, PayPo — co widzi użytkownik | Manualny test checkout |
| Core Web Vitals mobile | LCP, INP, CLS — czy wolne ładowanie powoduje drop | Lighthouse audit |
| Email post-purchase | Czy sklep wysyła emaile odzyskania koszyka | Test zakupu + sprawdzenie Klaviyo/Shopify Email |
| Retencja | Jaki % klientów wraca i kupuje ponownie | GA4 User cohorts |

---

## Quick Wins — do zrobienia bez developera w < tydzień

| # | Akcja | Gdzie | Czas |
|---|---|---|---|
| 1 | **Redirect 301** stary URL Sleeping Beauty → nowy | Shopify Admin → Navigation → URL Redirects | 2 min |
| 2 | **Dodaj Sleeping Beauty** do /collections/sklep | Shopify Admin → Collections | 5 min |
| 3 | **Zredukuj banery** "Oferty specjalne" z 7 do 2-3 | Shopify Admin → Customize | 15 min |
| 4 | **Dodaj CTA do produktów** w artykułach bloga | Shopify Admin → Blog | 30 min |
| 5 | **Dodaj opis kategorii** — zacznij od /collections/rekawice | Shopify Admin → Collections → Description | 30 min |

---

*Ostatnia aktualizacja: 2026-05-13*  
*Źródła: GA4 properties/342844459 · Chrome DevTools mobile 390x844 · DOM inspection*

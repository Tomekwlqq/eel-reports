# BRIEF — Siatka reklamowa Hebe + Repozytorium formatów RM
## Zlecenie dla Claude · wykonanie: HTML interaktywny

*Wersja 1.0 · 2026-09-16 · zamawiający: Tomek (Blisko) · odbiorca końcowy: Hebe (drogeria)*
*Dokument samowystarczalny — wszystkie dane wejściowe, źródła i wymagania są w środku.*

---

## 1 · CO MA POWSTAĆ

Dwa artefakty, oba jako **single-file HTML, light theme, interaktywne**. Nie mockupy graficzne, nie PDF — klikalne strony do otwarcia w przeglądarce.

| # | Artefakt | Co to jest | Po co |
|---|---|---|---|
| **A** | **Siatka reklamowa Hebe** | Klikalna makieta sklepu z nałożonymi formatami reklamowymi — 3 widoki: desktop, mobile, aplikacja | Pokazać wewnętrznie i klientowi, **gdzie dokładnie stoi każdy format** i jak wygląda w kontekście strony |
| **B** | **Repozytorium formatów RM** | Interaktywna galeria formatów reklamowych z różnych sklepów świata — nazwa, przykład, opis, źródło | Wzorce rynkowe w jednym miejscu — materiał do warsztatu i do projektowania oferty Hebe |

**Zależność:** B budujemy pierwsze (daje wzorce), A korzysta z wniosków B.

---

## 2 · ZAŁOŻENIA (twarde)

1. **Odtwarzamy sklep Hebe** — nie projektujemy nowego. Bierzemy strukturę, którą klient ma (mapy strony + zrzuty + arkusz inventory) i nakładamy formaty.
2. **Trzy widoki osobno:** desktop (WWW), mobile (WWW), aplikacja. Aplikacja to osobny layout, nie zmniejszony desktop.
3. **Korzystamy z materiałów klienta** — cennik, arkusz placementów i opis formatów są już dostarczone (sekcja 4). Nie wymyślamy formatów — odtwarzamy te, które klient sprzedaje lub planuje.
4. **Dokładamy mapę strony** — każdy format musi mieć wskazane miejsce w strukturze (strona główna / kategoria / PDP / koszyk / inne), ze strefą i przybliżoną pozycją.
5. **Język: polski** (dokument dla Tomka i klienta). Nazwy własne i cytaty źródłowe zostają w oryginale.

---

## 3 · WIDOK A — SIATKA REKLAMOWA: co dokładnie ma być

### 3.1 Struktura ekranu

```
┌─ PANEL LEWY (stały, ~320 px) ──────────┬─ PODGLĄD SKLEPU ─────────────────┐
│ Zakładki: DESKTOP | MOBILE | APP       │  Makieta sklepu (wireframe lub   │
│                                        │  zrzut) z formatami w miejscach  │
│ Lista formatów (klikalna):             │                                  │
│  □ 01 Produkt promowany — Search       │  Formaty podświetlają się po     │
│  □ 02 Produkt promowany — Listing      │  kliknięciu na liście            │
│  □ 03 Baner hero                        │                                  │
│  □ 04 Baner w listingu                  │  Hover = tooltip z nazwą         │
│  □ 05 … (pełna lista z arkusza)         │                                  │
│                                        │  Klik na format = panel szczegółów│
│ Filtry: status · kanał · kategoria      │                                  │
└────────────────────────────────────────┴──────────────────────────────────┘
```

### 3.2 Co pokazuje kliknięcie formatu

Panel (prawy dolny róg albo pod podglądem) z polami:

- **Nazwa handlowa** (PL, dokładnie jak w cenniku klienta)
- **Numer inventory** (z arkusza — kolumna „#")
- **Kanał:** WWW / APP / WWW+APP
- **Miejsce w strukturze:** np. „strona główna, górna sekcja, nad karuzelą"
- **Status:** ON SALE · READY TO SALE · IN-PROGRESS · TO BE DEVELOPED (kolory: zielony / żółty / pomarańczowy / szary)
- **Wymiary kreacji** (jeśli ustalone)
- **Model wyceny:** CPC / CPM / FLAT
- **Etap w ścieżce zakupowej:** Discovery → Exploration → Intent → Consideration → Conversion → Retention
- **Wygląd:** miniatura wzorca (z repozytorium B albo własny wireframe)

### 3.3 Wymagania interaktywne

- Klik na liście formatów → podświetlenie w makiety + otwarcie szczegółów
- Filtr statusu i kanału (checkboxy, działają natychmiast)
- Zakładki desktop/mobile/app przełączają całą makietę
- Legenda statusów zawsze widoczna
- Bez przeładowania strony, bez backendu (czysty JS w pliku)

---

## 4 · DANE WEJŚCIOWE (od klienta — wszystkie dostępne lokalnie)

### 4.1 Folder roboczy klienta — `~/Desktop/hebe/` ⭐

**To jest główne źródło. Zajrzyj tam ZANIM cokolwiek zaprojektujesz.** Zawartość:

| Plik | Co zawiera |
|---|---|
| **`SERWISY MARKETINGOWE Hebe 2026.pdf`** ⭐ | **47 stron — pełna oferta reklamowa klienta** („Wizualizacja i specyfikacja"). 23 serwisy (NR 50–72), każdy z: opisem serwisu, specyfikacją techniczną, wymiarami kreacji i **wizualizacją na makiecie strony** |
| **`2026_08_week34.xlsx`** | **Raport z kampanii** (tydzień 34) — realne wyniki: odsłony, widoczność, kliknięcia, CTR, CPC per format i kategoria. 1 941 wierszy |
| **`PLACMENT List dla BLISKO.xlsx`** | Arkusz 57 placementów — nr, nazwa, kanał, status, zasób roczny, alokacja RM, sales type, operator |
| **`Hebe_pytania 15.09.docx`** ⭐ | **Notatki Tomka z rozmowy 15.09** — ustalenia i lista pytań otwartych (m.in. cała sekcja o Adshero, targetowaniu, relacji TM/RM) |
| **`Hebe_Pytania_RevShare_uzupełnione.xlsx`** | Odpowiedzi klienta na pytania (skala, stack, dane behavioralne) |
| **`Hebe_Tomek_slides_EN_fina;.pptx`** | Deck Tomka dla klienta (EN) — wersja finalna |
| `hebe_opodwiedzi.docx` | Notatki z wizyty u klienta |
| `Plan_Warsztatu_Hebe_v2.docx/.md/.pdf` | Plan warsztatu w nowym kącie (roadmapa + bezpieczne RM) |
| `SZKOLENIE_Hebe_RM_tresc.docx` | Treść szkolenia |
| `Hebe_Retail_Media_Long_Term_Vision_Board_PM (2).pdf` | Vision board projektu |
| `image001.png`, `image002.png` | Zrzuty (m.in. listing Hebe z sekcją „Produkt promowany") |

### 4.2 Materiały już przetworzone (gotowe do użycia)

Leżą w `Projects/Hebe_Retail_Media/materialy_ref/klient/`:

| Zasób | Ścieżka | Co to jest |
|---|---|---|
| **Tekst oferty** | `SERWISY_MARKETINGOWE_2026_SKAN.txt` | 588 linii — cała oferta wyciągnięta z PDF do tekstu (wymiary, specyfikacje, warunki) |
| **Strony oferty** | `oferta_strony/strona-01.png` … `strona-47.png` | **47 stron oferty zrenderowanych jako obrazy** — opis + specyfikacja + wizualizacja razem |
| **Wizualizacje formatów** | `wizualizacje_formatow/` | **48 wyciągniętych wizualizacji** — makiety strony Hebe z zaznaczonym formatem (różowa strzałka) |
| Zrzuty konkurencji | `materialy_ref/siatki_konkurencji/*.png` | 7 zrzutów live (bez banerów cookie) |

### 4.3 Pełna lista serwisów w ofercie klienta (NR 50–72)

To formaty, które klient **już sprzedaje przez trade marketing** (Wiktoria):

| Nr | Serwis | Nr | Serwis |
|---|---|---|---|
| 50 | Widoczność na podstronie promocji | 62 | Besty influencerek |
| 51 | Artykuł sponsorowany na blogu Hebe | 63 | Widoczność marki |
| 52 | Pop-up w aplikacji | 64 | Ekspozycja marki |
| 53 | Landing page marki — wizerunkowy | 65 | Logotyp marki |
| 54 | Landing page marki — tematyczny | 66 | Widoczność artykułu |
| 55 | Baner w kategorii | 67 | Hebe testuje |
| 56 | Baner w podkategorii | 68 | Baner na rozwijanym menu |
| 57 | Baner na podstronie „Nowości" | 69 | Rich content |
| 58 | Widget z karuzelą produktową | 70 | Widoczność dla promocji GWP |
| 59 | Widget z karuzelą produktową (wariant) | 71 | Zdrapka w aplikacji |
| 60 | Baner hero produktowy | 72 | Akcja specjalna |
| 61 | Stories na mobilnej wersji | | |

**Wymiary występujące w ofercie:** 1680×1040 px (desktop), 1179×1179 px (mobile), 1326×513, 1312×520, 1242×1125, 1207×782, 1120×840, 1024×1366, 994×899, 680×680, 640×640, 686×428, 570×487, 720×360, 1500×640, 116×40, 180×180 px.

**KLUCZOWE USTALENIE:** w ofercie (NR 50–72) **nie ma produktu promowanego / sponsored product**. To znaczy, że PS jest formatem **nowym, poza trade marketingiem** — i tylko on jest czysto „retail-mediowy". Baner hero (NR 60) i baner w listingu (NR 55/56) są w ofercie TM, więc przy nich trzeba rozstrzygnąć podział RM/TM.

### 4.4 Pozostałe dane wejściowe

| Plik / źródło | Ścieżka | Co zawiera |
|---|---|---|
| **Odpowiedzi klienta** (mail 07.08.2026) | `HEBE_ODPOWIEDZI_KLIENTA.html` | stack, dane behawioralne, lead time'y, właściciele inventory, skala ruchu (web vs app) |
| **Inventory jako dokument** | `INVENTORY_RM_HEBE_57.html` | 57 pozycji w 3 kanałach |
| **Siatka formatów (wersja robocza)** | `siatka_formatow/SIATKA_FORMATOW_HEBE.html` | poprzednia wersja — **punkt startowy, nie do skopiowania 1:1** |
| **Diagnoza raportu W34** | `DIAGNOZA_RAPORTU_RM_HEBE.html` | co jest, a czego brakuje w raportowaniu |

**Uwaga o sprzeczności do rozstrzygnięcia w warstwie widoku:** arkusz inventory ma 57 pozycji (w tym off-site i in-store), a oferta operacyjna ma 23 serwisy. To dwa różne zbiory — w siatce pokazuj **oba z oznaczeniem pochodzenia** (badge „inventory" / „oferta TM").

---

## 4B · Adshero — KLUCZOWY WĄTEK (do zdobycia informacji)

**Kontekst:** Hebe wymienia adserwer. Nowe narzędzie to **Adshero** (od strony klienta; w materiałach wewnętrznych występuje jako „Adshero"). **Wdrożenie: styczeń–luty 2027** (klient bardzo chce tego terminu). Cztery gotowe formaty **przejdą na nowe narzędzie w styczniu**.

### Co już wiemy (z notatek 15.09 i contact reportu)

- **Do czasu Adshero nie ma praktycznie żadnych opcji targetowania** — jedyne, co działa, to fizyczna lokalizacja formatu w strukturze strony
- **Struktura stała i strony searchowe to dwa różne silniki** — inaczej patrzą na targetowanie dla stałej struktury (HP, kategoria, PDP) i inaczej dla wyników wyszukiwania
- Adshero ma dać: **personalizację na poziomie danych behawioralnych**, integrację z **własnym CDP**, targetowanie
- Klient **chce mieć targetowanie wg keywordów** — teraz może testować, docelowo przenieść na nowe narzędzie
- Wyszukiwarka działa od **minimum 3 liter**
- Banery są też sprzedawane przez trade marketing — **tylko w flacie**; część umów jest **kontraktowa, zagwarantowana (legacy)**
- **3 warsztaty Adshero** w ciągu 2 tygodni (Blisko zaproszone, obecność obowiązkowa): integracja z CDP i SAP; kalendarz rezerwacji; zarządzanie siatką reklamową; analityka

### Czego musimy się dowiedzieć (lista do zdobycia — wstaw jako sekcję „open questions" w artefaktach)

**Targetowanie:**
- Jak działa sponsored product **w tej chwili** — jaki mechanizm stoi za dopasowaniem?
- Jak **targetowanie w aplikacji** różni się od targetowania na stronie?
- Czy „zawężenie do poziomu obecności" (czyli tylko *gdzie*) to jedyne, co mamy dziś?
- Jak będzie działać targetowanie wg keywordów w Adshero — na jakim słowniku (własny, czy z Luigi's Box)?
- Czy Adshero obsłuży segmenty z CDP na starcie, czy dopiero w kolejnej fazie?

**Adserwer i integracje:**
- **Co podepniemy do Adshero?** Które systemy w pierwszej kolejności (CDP, SAP/Izberg, SFCC, Insider, Luigi's Box)?
- **Jakie dodatkowe dane** daje Adshero ponad to, co jest dziś w raportach?
- Czy Adshero obsłuży **oba silniki** (struktura stała + search), czy to dwa osobne moduły?
- Co się dzieje z **Cruxo** — równolegle, czy wyłączany?
- Jak wygląda **kalendarz rezerwacji** powierzchni w Adshero — czy rozstrzyga konflikty TM/RM?

**Pomiar:**
- Czy Adshero domknie brakujące metryki (sprzedaż, zamówienia, konwersja, ATC, ROAS)?
- **Czy da się sprawdzić sprzedaż „obok"** — porównanie analogicznych okresów (test inkrementalności)?
- Jak wygląda atrybucja: klik vs odsłona, okno atrybucji, dekduplikacja między banerem a produktem promowanym?

**Operacje:**
- Jak przebiega **setup** — co robi klient, co my, jaki jest czas wdrożenia formatu?
- Jak **sprzedaje się sponsored products** dziś i co się zmieni przy Adshero?
- Jaki jest **lead time** wdrożenia nowego formatu do siatki?
- Czy będą **zmiany w relacji TM → RM** przy przejściu na Adshero?

### Dlaczego to jest w briefie

Klient wprost powiedział, że **obecność na warsztatach Adshero jest obowiązkowa**, a od Blisko oczekuje „pomocy w setupie Adshero, żeby efektywnie pomagał w sprzedaży". To znaczy, że siatka i repozytorium mają być **materiałem przygotowawczym do tych warsztatów** — pokazać klientowi, że wiemy, co Adshero ma dać, i umiemy o tym rozmawiać.

Jeżeli w materiałach nie ma odpowiedzi na któreś z powyższych pytań — **wpisz je jako jawną lukę** (sekcja „czego nie wiemy / do potwierdzenia"), nie zgaduj.

---

## 5 · ŹRÓDŁA I MAPA STRONY (do doklejenia)

Mapa struktury sklepu Hebe:

- **Strona główna (HP)** — sekcje: baner hero, karuzela marek, kafle promocyjne („Strefa okazji"), karuzela produktów, sekcje contentowe
- **Strona kategorii (listing/PLP)** — siatka produktów, filtry, banery śródlistowe
- **Wyniki wyszukiwania (SRP)** — sekcja sponsorowana nad wynikami, produkty w wynikach
- **Karta produktu (PDP)** — galeria, opis, rekomendacje, sekcje marek
- **Koszyk** — cross-sell „Mogą Cię zainteresować"
- **Aplikacja** — ekran startowy z karuzelami, wyszukiwarka, PDP z odznakami, koszyk, lista życzeń, mapa sklepów

Uwaga: **lista życzeń** i **mapa sklepów** w aplikacji to powierzchnie **poza arkuszem inventory** — oznacz je jako potencjał, nie jako istniejące formaty.

---

## 6 · REFERENCJE RYNKOWE — ZWERYFIKOWANE LINKI

Wszystkie poniższe linki sprawdzone 2026-09-16 (status HTTP). Legenda: ✅ działa · ⚠️ wymaga przeglądarki/logowania · 🌐 geo.

### 6.1 Siatki formatów — sieci (bezpośrednie wzorce)

| Sieć | Link | Co tam jest |
|---|---|---|
| **Walmart Connect** | https://marketplacelearn.walmart.com/guides/Advertising/Walmart%20Connect/walmart-connect-advertising-onsite-display | ✅ oficjalny guide Onsite Display, 17 formatów z wymiarami |
| **Walmart Connect** | https://www.walmartconnect.com/solutions/small-business | ✅ podział oferty small/enterprise |
| **Walmart Connect (szablony)** | https://www.walmartconnect.ca/en/advertising-help/display/ad-specs/creative-templates | ✅ szablony kreatywne PSD |
| **Ulta (UB Media)** | https://www.rmiq.net/networks/us/ulta-rmn-products/ | ✅ katalog formatów sieci |
| **Ulta (UB Media)** | https://www.ulta.com/company/ubmedia/solutions | 🌐 403 geo (US) — do otwarcia z VPN |
| **Rossmann retail media** | https://retailmedia.rossmann.de/ | ✅ strona RM, formaty + zasięgi (DE) |
| **Empik Ads** | https://news.empik.com/209595-empikcom-jako-platforma-reklamowa-wystartowala-usluga-empik-ads | ✅ oficjalny start usługi, 2 formaty bazowe |
| **Empik — rozwój RM** | https://news.empik.com/405065-empik-stawia-na-rozwoj-omnikanalowych-narzedzi-retail-media | ✅ kierunek rozwoju, omnichannel |
| **Allegro Ads** | https://help.allegro.com/pl/sell/a/reklama-graficzna-allegro-ads-ZMl7ZDgYGCy | ✅ wszystkie formaty graficzne + wymiary |
| **Allegro Ads (rozliczenie)** | https://help.allegro.com/pl/sell/a/ile-kosztuje-i-jak-jest-rozliczana-reklama-w-allegro-ads-v875Pq01Ruo | ✅ modele rozliczenia |
| **Ceneo** | https://www.ceneo.pl/uslugi/reklamy-digital | ✅ formaty reklamowe porównywarki |

### 6.2 Wzorce zagraniczne (najlepiej opisane)

| Sieć | Link | Co tam jest |
|---|---|---|
| **Albert Heijn** | https://www.ahretailmediaservices.nl/ | ✅ pełny rate card 2026 (PDF, 13 stron) — **wzór cennika** |
| **Carrefour Links** | https://links.carrefour.com/ | ⚠️ wchodzi z przeglądarki |
| **Tesco Media & Insight** | https://www.dunnhumby.com/tesco-media-insight-platform/ | ✅ opis platformy i formatów |
| **Target Roundel** | https://roundel.com/ | ✅ układ oferty, podział na kanały |
| **Albertsons Media Collective** | https://www.albertsonsmediacollective.com/overview/default.aspx | ⚠️ wchodzi z przeglądarki |
| **Amazon Ads** | https://advertising.amazon.com/ | ✅ hub, specs za logowaniem |

### 6.3 Repozytoria kreacji — galerie gotowych reklam

**To jest odpowiedź na „nigdy nie widziałem gotowych siatek reklamowych" — te serwisy pokazują realne kreacje.**

| Repozytorium | Link | Co tam jest |
|---|---|---|
| **Google Rich Media Gallery** ⭐ | https://www.richmediagallery.com/ | ✅ **to jest dokładnie to, o co chodziło** — showcase gotowych kreacji z nazwami marek (Nespresso, Netflix, L'Oréal, Toyota, Ferrari, Actimel, Lincoln). Filtry: **kraj (jest Polska)**, format (Banner, Billboard, Expanding, In-app, In-stream, Interstitial, Pushdown, Takeover, Tandem), rozmiar (300×250, 160×600, 728×90, 970×250 itd.), funkcja (HTML5, Dynamic, QR, Video). Każda kreacja = podgląd + szczegóły. **Zacznij repozytorium od tego źródła.** |
| **Criteo Display Ad Gallery** | https://www.criteo.com/ad-gallery/ | ✅ galeria formatów display z przykładami (Criteo obsługuje showcase display Ulty i sieci europejskich); treść pod zakładkami strony |
| **Amazon Ads — display examples** | https://advertising.amazon.com/library/guides/display-ads-examples | ✅ przykłady kreacji display z omówieniem, co działa i dlaczego |
| **TikTok Creative Center** | https://ads.tiktok.com/business/creativecenter/ | ✅ najpopularniejsze reklamy wideo z realnymi wynikami — wzorzec dla formatów video-to-sales |
| **AdForum — best retail** | https://www.adforum.com/top5/retail/94 | ⚠️ wchodzi z przeglądarki; biblioteka reklam retail (TV, print, OOH, web) |
| **Meta Ad Library** | https://www.facebook.com/ads/library/ | ⚠️ filtrowanie wymaga logowania; publiczna baza aktywnych reklam |
| **mimbi — katalog RMN** | https://www.mimbi.io/retail-media-networks-list | ✅ katalog sieci RM z opisami — kontekst rynkowy |

---

## 7 · WIDOK B — REPOZYTORIUM: co dokładnie ma być

### 7.1 Struktura

Karty formatów (grid, filtrowalny), każda zawiera:

- **Nazwa formatu** (jak nazywa go sieć) + sieć, z której pochodzi
- **Miniatura / przykład** (obraz — jeśli brak dostępu, wireframe CSS z opisem)
- **Opis w 2–3 zdaniach:** co to jest i gdzie stoi w ścieżce zakupowej
- **Wymiary kreacji** (jeśli znane) + format pliku
- **Model wyceny** (CPC/CPM/FLAT) — jeśli znany
- **Etap lejka:** Discovery / Exploration / Intent / Consideration / Conversion / Retention
- **Źródło** — link z datą

### 7.2 Filtry

- Po sieci (Walmart / Ulta / Rossmann / Empik / Allegro / AH / Tesco / Roundel / Amazon / Ceneo)
- Po etapie lejka
- Po typie: sponsored / display / video / in-store / rekomendacje / dane
- Po rynku: PL / Europa / USA

### 7.3 Grupowanie (rodziny formatów)

| Rodzina | Przykłady |
|---|---|
| **Sponsored / Search** | produkt promowany w wyszukiwarce, w listingu, baner marki nad wynikami |
| **Display** | baner hero, baner w listingu, banery kategorii, elastyczne banery |
| **Rekomendacje** | karuzele produktowe, „polecane", widgety kategorii |
| **Video** | pre-roll, shoppable video, in-stream |
| **In-store** | ekrany, radio, sampling, POS |
| **Dane / pomiar** | segmenty, closed-loop reporting, atrybucja |

---

## 8 · WYMAGANIA TECHNICZNE

- **Single-file HTML** — jeden plik na artefakt, zero zależności zewnętrznych poza Google Fonts
- **Light theme** — białe tło, ciemny tekst (cała strona, także nagłówek)
- **Design system:** `Space Grotesk` (tekst) + `IBM Plex Mono` (liczby, etykiety); akcent fioletowy `#7c5cff`; kolory statusów: zielony `#16a34a`, żółty `#f5751a`, czerwony `#dc2626`, szary
- **Duża typografia** — nagłówki sekcji min. 26 px, tekst treści 16–17 px (odbiorca czyta na dużym ekranie)
- **Zero zależności JS** — czysty vanilla JS w pliku, bez frameworków
- **Responsywność** — desktop-first, ale czytelne na tablecie
- **Bez backendu, bez iframe'ów**

### Czego NIE robić

- Nie generować fikcyjnych danych liczbowych — brak danych = „brak danych", nie wymyślona liczba
- Nie wstawiać zrzutów z widocznymi banerami cookie (bezwzględny wymóg — materiał idzie do klienta)
- Nie kopiować 1:1 poprzedniej wersji `SIATKA_FORMATOW_HEBE.html` — to punkt startowy, nie wzorzec
- Nie projektować nowych formatów, których nie ma w materiałach klienta ani w referencjach
- Nie używać żargonu w opisach dla klienta (mówimy „produkt promowany", nie „sponsored product" — chyba że w nawiasie przy nazwie własnej)

---

## 9 · KRYTERIA AKCEPTACJI

Artefakt A (siatka):
- [ ] Trzy widoki przełączalne: desktop / mobile / aplikacja
- [ ] Wszystkie formaty z arkusza inventory **i** z cennika, z oznaczeniem pochodzenia
- [ ] Klik na formacie → panel szczegółów z 8 polami z sekcji 3.2
- [ ] Filtry statusu i kanału działają bez przeładowania
- [ ] Legenda statusów widoczna
- [ ] Formaty mają wskazane miejsce w strukturze strony

Artefakt B (repozytorium):
- [ ] Min. 25 formatów z min. 6 sieci
- [ ] Każdy format ma: nazwę, opis, etap lejka, źródło z datą
- [ ] Filtry po sieci / etapie / typie / rynku
- [ ] Linki źródłowe (z sekcji 6) wstawione i klikalne
- [ ] Sekcja „co z tego bierzemy do Hebe" — wnioski

---

## 10 · KONTEKST BIZNESOWY (żeby decyzje projektowe miały sens)

**Sytuacja:** Blisko (Tomek) doradza Hebe przy wdrożeniu retail media. Klient ma technicznie gotowe **4 formaty** (produkt promowany w wersji Search i Listing, baner hero, baner w listingu) i chce zacząć sprzedawać. Równolegle czeka na wdrożenie nowego adserwera (Adshero).

**Czego brakuje:** klient nie ma wizualizacji, gdzie formaty stoją, ani wzorców rynkowych. Siatka i repozytorium wypełniają tę lukę i idą na warsztat.

**Kluczowy wniosek, który artefakty mają pokazać:** cztery formaty obsługują cztery różne etapy ścieżki zakupowej — a w koszyku (najtańsza konwersja) i w wideo (najdroższa półka) nie ma nic. To argument za roadmapą, którą Blisko proponuje klientowi.

**Dane liczbowe do wykorzystania** (realne, z raportu W34):
- produkt promowany: CTR 0,24%, widoczność 11,3% (11,4 mln odsłon)
- pozycja w wyszukiwarce: CTR 2,40%, widoczność 82,8% (116 tys. odsłon)
- baner w listingu: zero odsłon (nie testowany)

---

## 11 · JAK PRACOWAĆ (dla wykonawcy)

1. **Najpierw czytaj, potem buduj.** Materiały wejściowe z sekcji 4 są kompletne — nie dopytać o to, co już jest w plikach.
2. **Buduj B przed A.** Repozytorium daje wzorce wizualne dla siatki.
3. **Konsultuj układ, nie wykonanie.** Jeśli struktura siatki jest niejasna — zapytaj o układ, nie o dane.
4. **Weryfikacja wizualna obowiązkowa.** Po zbudowaniu: zrzut przez headless Chrome i sprawdzenie wzrokowe (ostrość, ucinanie, kontrast). Bilans tagów i brak błędów składniowych nie wystarcza.
5. **Linki wstawiaj dokładnie jak w sekcji 6** — już zweryfikowane, nie zmieniaj i nie dodawaj nowych bez sprawdzenia.

---

*Brief · 2026-09-16 · Blisko × Hebe · kontakt: Tomek*

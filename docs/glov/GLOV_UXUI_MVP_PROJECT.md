# PROJECT — GLOV UX/UI MVP

*Notatka scope · 2026-06-02 · wejście dla `/gsd:new-project` (świeża sesja). NIE jest jeszcze .planning/PROJECT.md — GSD wygeneruje właściwy z tego dokumentu.*

## What This Is

Pierwszy moduł (UX/UI) większego **serwisu analityczno-akcyjnego dla sklepu Shopify GLOV**. Nie tylko diagnoza UX — architektura **„od razu z akcjami"**: od danych → przez wnioski → po gotowe drafty zmian do wdrożenia.

To 1. z **6 obszarów** docelowej platformy: UX/UI · Performance Ads · Content · SEO · Retencja/Loyalty · Ruch/Afiliacja. Pozostałe = przyszłe moduły/milestone'y. Afiliacja (obszar 6) wydzielona jako osobny produkt (scraping social + outreach), nie część dashboardu.

## Core Value

**Jedna rzecz, która musi działać:** pokazać gdzie na ścieżce klient się gubi/odpada → wyjaśnić dlaczego → dać konkretną, gotową do wdrożenia zmianę (układ/copy/CSS), która podnosi konwersję.

## Architektura — 3 warstwy

1. **Diagnoza** (Clarity + GA4): funnel z punktami odrzuceń · heatmapy (gdzie krążą / zatrzymują się / nie zaglądają) · rage-clicki + dead-clicki.
2. **Wnioski AI:** co konkretnie nie działa i dlaczego.
3. **Akcje:** konkretne propozycje zmian układu/copy + **drafty do wdrożenia** (CSS/liquid/copy w Shopify theme) — ZAWSZE za zatwierdzeniem (żywy sklep = ryzyko).

## Stack

Rozbudowa **istniejącego dashboardu Streamlit**: `meta_ads/dashboard.py` — dodać moduł UX/UI. NIE budować od zera.

## Źródła danych (MCP podłączone)

`clarity-glov` (heatmapy, nagrania, dashboard query) · `google-analytics-mcp` (funnel, ścieżki, bounce) · Shopify (theme, produkty — dla warstwy akcji) · Chrome (skan HTML/visual, weryfikacja zmian).

## Istniejące zasoby (NIE zaczynamy od zera)

`GLOV_Clarity_Sessions_DB.json` · `GLOV_UX_Audit_2026-05-06` · `GLOV_Checkout_Diagnoza_Kompletna.html` · `GLOV_20_Frictions` · `GLOV_Mobile_UX_Analiza` · `GLOV_Core_Web_Vitals` · `GLOV_Raport_Analityczny.html` · `glov-homepage-mapping.html` · `GLOV_Kohorty/LTV` (do obszaru Retencja). MVP = skonsolidować to w działający dashboard + warstwa akcji.

## Requirements (hipotezy — do walidacji przez GSD)

### Active (v1)
- [ ] **UX-01**: Dashboard pokazuje funnel z punktami odrzuceń (Clarity + GA4)
- [ ] **UX-02**: Heatmapy — gdzie klienci krążą / zatrzymują się / nie zaglądają
- [ ] **UX-03**: Detekcja rage-clicków i dead-clicków z wnioskiem
- [ ] **UX-04**: AI generuje wnioski „co nie działa i dlaczego" per ekran
- [ ] **UX-05**: AI proponuje konkretne zmiany układu/copy
- [ ] **UX-06**: Generowanie draftów do wdrożenia (CSS/liquid/copy) z gate zatwierdzenia
- [ ] **UX-07**: Moduł wpięty w istniejący dashboard Streamlit GLOV

### Out of Scope (świadomie)
- Pozostałe 5 obszarów (Ads/Content/SEO/Retencja/Afiliacja) — przyszłe moduły
- Afiliacja/scouting social — osobny produkt
- Auto-wdrażanie zmian bez zatwierdzenia — żywy sklep, zawsze human-in-the-loop

## Key Decisions

| Decyzja | Uzasadnienie |
|---|---|
| MVP = obszar UX/UI | dane gotowe (Clarity+GA4), fundament konwersji |
| „od razu z akcjami" | klient chce wdrożeń, nie tylko raportów |
| Rozbudowa Streamlit, nie nowy serwis | spójność z meta_ads dashboard |
| Build: GSD | >3h, integracje + akcje na żywym sklepie = kontrola fazami |
| Afiliacja wydzielona | to osobny produkt, nie dashboard |

## Mierzalny efekt

Wzrost konwersji · spadek porzuconych koszyków · wydłużenie sesji.
*(Korekta briefu: oryginał miał „spadek współczynnika konwersji" — błąd, ma być WZROST.)*

## Do dyskusji później (otwarte — przed GSD)

- **Co Clarity MCP realnie daje?** heatmap data przez API czy tylko nagrania + dashboard query? Determinuje warstwę 1 (czy heatmapy z danych, czy ze screenshotów).
- **Theme-edit Shopify** — bezpieczna ścieżka akcji: draft/preview theme przez MCP, czy tylko generujemy kod do ręcznego wklejenia przez Ewę/klienta? (żywy sklep)
- **Jak akcje zatwierdzane** — preview + diff w dashboardzie? jednym klikiem czy export?
- **Priorytet ekranów** — homepage / PDP / checkout? (checkout ma już `GLOV_Checkout_Diagnoza` — może najszybszy win).
- **Baseline** — czy `GLOV_20_Frictions` + UX_Audit jako punkt startu (co już wiemy) zamiast diagnozy od zera.

## Następny krok

Świeża sesja → `/gsd:new-project --auto @GLOV_UXUI_MVP_PROJECT.md` (lub bez --auto dla pełnego questioningu). GSD: research → requirements → roadmap. Rozważyć `/gsd:map-codebase` najpierw (brownfield — dużo materiału + dashboard.py).

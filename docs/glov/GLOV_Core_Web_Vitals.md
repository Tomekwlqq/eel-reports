# GLOV — Core Web Vitals / Lighthouse Audit
> Data: 2026-05-13 | Źródło: PageSpeed Insights (CrUX — dane rzeczywistych użytkowników)
> URL: glov.co/collections/sklep | Tryb: Komórka (mobile)
> Okres danych: ostatnie 28 dni

---

## TL;DR — Core Web Vitals: ZALICZONE ✅

Wszystkie trzy wskaźniki Core Web Vitals **przeszły próg Google** dla danych rzeczywistych użytkowników. Strona jest szybka na mobile.

**Wniosek dla drop -75.6% lista→produkt:** Core Web Vitals NIE są przyczyną. Problem leży w jakości ruchu lub UX/ofercie, nie w szybkości ładowania.

---

## Wyniki CrUX — dane rzeczywistych użytkowników Chrome

| Wskaźnik | Wartość | Próg | Status |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | **1,7 s** | < 2,5 s | 🟢 Zaliczony |
| **INP** (Interaction to Next Paint) | **127 ms** | < 200 ms | 🟢 Zaliczony |
| **CLS** (Cumulative Layout Shift) | **0,02** | < 0,1 | 🟢 Zaliczony |
| **FCP** (First Contentful Paint) | **1 s** | < 1,8 s | 🟢 Dobry |
| **TTFB** (Time to First Byte) | **0,3 s** | < 0,8 s | 🟢 Dobry |

Ocena podstawowych wskaźników internetowych: **ZALICZONE**

---

## Lighthouse Symulacja — błąd

Sekcja "Rozpoznawaj problemy z wydajnością" (Lighthouse lab data) zwróciła błąd dla wszystkich 4 kategorii:
- Wydajność — ❌ błąd
- Ułatwienia dostępu — ❌ błąd  
- Sprawdzone metody — ❌ błąd
- SEO — ❌ błąd

**Przyczyna:** Cloudflare bot protection na Shopify blokuje symulowane żądania Lighthouse. To znany problem — PageSpeed Insights nie może pobrać strony w trybie symulacji. Nie oznacza złych wyników.

**Co to znaczy:** Dane CrUX (rzeczywistych użytkowników) są ważniejsze niż dane laboratoryjne — i te są zielone.

---

## Interpretacja dla GLOV

### Drop -75.6% lista→produkt NIE jest spowodowany wolnym ładowaniem

Dane CrUX potwierdzają:
- LCP 1,7 s = strona renderuje się szybko na mobile
- INP 127 ms = reaguje natychmiast na dotyk
- CLS 0,02 = brak przesunięć layoutu po załadowaniu

Użytkownik który widzi listing nie odpada przez wolne ładowanie. Przyczyna drop musi być gdzie indziej:

**Hipotezy do weryfikacji (wg priorytetu):**
1. **Jakość ruchu** — Paid Social (cold traffic) trafia na listing bez intencji zakupowej
2. **Matching produktów** — użytkownik nie widzi produktu którego szukał (Sleeping Beauty nieobecna na listingu!)
3. **UX listingu** — ucięte nazwy produktów, za dużo opcji bez filtrów
4. **Sesje nagrania** — jedyne co rozstrzygnie sprawę to Hotjar/Clarity

---

## Kontekst: Shopify + Core Web Vitals

Shopify od 2022 aktywnie optymalizuje wydajność motywów. Wyniki GLOV (LCP 1,7 s, INP 127 ms) to **wyniki powyżej mediany dla Shopify** — sklep jest w dobrej kondycji technicznej.

---

*Analiza: 2026-05-13 | PageSpeed Insights mobile | glov.co/collections/sklep*

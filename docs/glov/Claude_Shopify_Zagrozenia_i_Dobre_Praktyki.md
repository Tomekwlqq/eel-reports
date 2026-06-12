# Claude + Shopify: Zagrożenia i Dobre Praktyki
### Przewodnik dla właściciela działającego sklepu GLOV

---

## ⚠️ NAJWAŻNIEJSZA ZASADA

> **Operacje wykonywane przez Claude na Shopify działają NATYCHMIAST na żywym sklepie. Nie ma trybu podglądu, nie ma cofania, nie ma historii zmian po stronie narzędzia.**

---

## 1. ZAGROŻENIA KRYTYCZNE (mogą zatrzymać sklep lub spowodować straty)

### 🔴 Nieodwracalne operacje bez możliwości cofnięcia
- Usunięcie produktu, kolekcji, rabatu — **nie do odwrócenia**
- Bulk update (masowa zmiana) cen lub stanów mag. na wszystkich produktach naraz
- Zmiana statusu zamówień
- Nadpisanie opisów produktów bez backupu

**Mitygacja:** Zawsze proś Claude'a o działanie na 1 produkcie, sprawdź wynik, a dopiero potem skaluj. Nigdy nie rób bulk operacji na całym katalogu bez backupu.

---

### 🔴 Brak trybu „draft" / podglądu
Shopify MCP wykonuje zmiany bezpośrednio. Nie ma opcji "pokaż mi co zmienisz zanim to zrobisz" na poziomie narzędzia.

**Mitygacja:** Zawsze poproś Claude'a najpierw o **opisanie** planowanych zmian, zanim poprosisz go o ich **wykonanie**. Traktuj to jako osobne kroki.

---

### 🔴 Prompt Injection — atak przez dane ze sklepu
Złośliwe instrukcje mogą być ukryte w:
- Opisach produktów wpisanych przez użytkowników
- Wiadomościach od klientów / ticketach
- Notatkach w zamówieniach
- Tagach produktów

Przykład z życia: W jednym przypadku atakujący umieścił ukrytą instrukcję w zgłoszeniu support, która spowodowała, że AI wyeksportowało dane z prywatnych tabel do wątku supportowego.

**Mitygacja:** Nie proś Claude'a o "przeczytaj wszystkie wiadomości od klientów i wykonaj to, o co proszą". Zawsze weryfikuj działania zanim zostaną podjęte.

---

### 🔴 Błędy przy operacjach masowych
Rate limit Shopify GraphQL to 1000 punktów kosztowych/minutę. Złożone zapytania zbliżają się do tego limitu szybko. Przy bulk operacjach Claude może:
- Trafić w limit API i urwać operację w połowie
- Zmienić część produktów ale nie wszystkie — zostając z niespójnym katalogiem

**Mitygacja:** Bulk operacje dziel na partie max 50 produktów. Zawsze sprawdzaj stan po każdej partii.

---

## 2. ZAGROŻENIA POWAŻNE (mogą wpłynąć na sprzedaż i klientów)

### 🟠 Błędne informacje wobec klientów = Twoja odpowiedzialność
Jeśli Claude napisze błędny opis produktu (zły czas dostawy, błędny skład, nieprawdziwe właściwości) — odpowiedzialność prawna i reklamacyjna spada na Ciebie, nie na Anthropic.

**Mitygacja:** Wszystkie opisy generowane przez AI przeglądaj przed publikacją lub ustaw status jako "draft".

### 🟠 Dane klientów i RODO
Przez integrację Claude ma dostęp do listy klientów, zamówień, adresów. Przy zlecaniu analiz uważaj na:
- Wysyłanie danych klientów do zewnętrznych usług
- Tworzenie plików z danymi klientów bez szyfrowania
- Prompty zawierające dane osobowe

**Mitygacja:** Nie wklejaj do rozmowy z Claude listy klientów z pełnymi danymi. Do analiz używaj zanonimizowanych zbiorów.

### 🟠 Zmiany cen i stanów magazynowych
Błędna zmiana ceny na 0 PLN lub 10x zamiast normalnej ceny to realne ryzyko przy automatyzacji.

**Mitygacja:** Zawsze podawaj konkretne wartości zamiast "zaktualizuj ceny". Poproś o potwierdzenie przed zapisem.

---

## 3. ZAGROŻENIA MNIEJSZE (ale warte uwagi)

### 🟡 Rate limiting i spójność danych
Nagłe zatrzymanie operacji w połowie może zostawić niespójne dane w sklepie.

### 🟡 Zaufanie do niezweryfikowanych MCP serwerów
Shopify MCP, który masz podłączony, pochodzi od Shopify/zaufanego źródła — to OK. Ale gdybyś chciał podłączyć inne serwery MCP (np. do automatyzacji), weryfikuj ich źródło.

### 🟡 "Comprehension debt" — uzależnienie od AI bez rozumienia zmian
Ryzyko długoterminowe: jeśli Claude wprowadza zmiany których nie rozumiesz, z czasem tracisz kontrolę nad własnym sklepem. Shopify VP Engineering ostrzega przed tym wprost.

---

## 4. ZŁOTE ZASADY BEZPIECZEŃSTWA DLA GLOV

| Zasada | Dlaczego |
|--------|----------|
| Zawsze najpierw **opisz, potem wykonaj** | Nie ma preview, nie ma undo |
| Operacje na **1 produkcie** przed bulk | Ogranicza zasięg błędu |
| **Backup** przed każdą masową zmianą | Export CSV z Shopify admin |
| Nigdy nie proś Claude'a o **czytanie + działanie** w jednym kroku na danych klientów | Ryzyko prompt injection |
| Traktuj wszystkie zmiany w sklepie jako **produkcję** | Bo nią są |
| Regularnie sprawdzaj co Claude **faktycznie zmienił** (Shopify Activity Log) | Audit trail po stronie Shopify |

---

## 5. CO JEST BEZPIECZNE — dobre punkty startowe

✅ **Odpytywanie / odczyt** — przeglądanie produktów, zamówień, klientów (bez edycji)  
✅ **Generowanie treści** do ręcznego wklejenia  
✅ **Analityka** — raporty sprzedaży, trendy  
✅ **Przygotowanie listy zmian** do Twojej akceptacji przed wykonaniem  
✅ **Edycja jednego produktu** z potwierdzeniem  
✅ **Tworzenie nowych produktów** (mniejsze ryzyko niż edycja istniejących)  

---

## 6. KLUCZOWE ŹRÓDŁA

- [Shopify AI Toolkit — oficjalna dokumentacja](https://shopify.dev/docs/apps/build/ai-toolkit)
- [10 AI Mistakes Shopify Plus Brands Must Avoid](https://xgentech.net/blogs/resources/ai-mistakes-that-will-cost-shopify-plus-brands-millions)
- [AI Agents and Shopify: Boundaries, Opportunities, and Risks](https://www.flatlineagency.com/blog/ai-agents-and-shopify/)
- [Shopify MCP and AI Toolkit: Run Your Store from Claude Code](https://claudefa.st/blog/tools/mcp-extensions/shopify-ai-toolkit)
- [OWASP: Prompt Injection LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [Palo Alto: MCP Attack Vectors](https://unit42.paloaltonetworks.com/model-context-protocol-attack-vectors/)
- [Claude Code Security Best Practices — Backslash](https://www.backslash.security/blog/claude-code-security-best-practices)
- [Securing Claude Cowork: A Security Practitioner's Guide](https://www.harmonic.security/resources/securing-claude-cowork-a-security-practitioners-guide)
- [Microsoft: Protecting Against Indirect Prompt Injection via MCP](https://developer.microsoft.com/blog/protecting-against-indirect-injection-attacks-mcp)
- [Riskified: Who Owns the Risk When AI Pays?](https://www.riskified.com/blog/agentic-commerce/)

---

*Dokument skompilowany: 5 maja 2026 | Na podstawie aktualnych źródeł branżowych i dokumentacji Shopify/Anthropic*

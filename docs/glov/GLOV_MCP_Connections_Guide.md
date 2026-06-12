# Przewodnik: Połączenie źródeł danych z Claude — Wszystkie metody (2026)

**Data:** 2026-05-22  
**Dotyczy:** Claude Code (Terminal) i Claude Desktop (Cowork)  
**Kontekst:** Projekt GLOV / Ecomms Activation

---

## Spis treści

1. [Meta Ads (Facebook/Instagram)](#1-meta-ads)
2. [Google Ads](#2-google-ads)
3. [Google Analytics 4 (GA4)](#3-google-analytics-4-ga4)
4. [Microsoft Clarity](#4-microsoft-clarity)
5. [Google Search Console](#5-google-search-console)
6. [TikTok Ads](#6-tiktok-ads)
7. [Shopify](#7-shopify)
8. [Klaviyo](#8-klaviyo)
9. [Pinterest Ads](#9-pinterest-ads)
10. [Narzędzia multi-platformowe](#10-narzędzia-multi-platformowe)
11. [Tabela porównawcza](#11-tabela-porównawcza)

---

## 1. Meta Ads

### Metoda A: Oficjalny Meta MCP (`mcp.facebook.com/ads`) — REKOMENDOWANE

**Status:** Publiczna beta od 29 kwietnia 2026  
**Endpoint:** `mcp.facebook.com/ads`  
**Koszt:** Bezpłatny podczas bety

#### Co daje
29 narzędzi w 5 kategoriach:
- Campaign Creation & Management (5 narzędzi)
- Product Catalog (10 narzędzi)
- Accounts/Pages/Assets (3 narzędzia)
- Dataset Quality & Diagnostics (4 narzędzia)
- Insights & Performance (7 narzędzi)

#### Krok po kroku — Claude Desktop (Cowork)
1. Otwórz Claude Desktop → Settings → MCP Servers
2. Kliknij "Add MCP Server"
3. Wpisz URL: `mcp.facebook.com/ads`
4. Autoryzacja OAuth — to samo konto Meta Business, które znasz
5. Czas setup: < 5 minut

**Uwaga:** Custom MCP connectors wymagają Claude Pro lub Max.

#### Krok po kroku — Claude Code (Terminal)
```bash
claude mcp add --transport http meta-ads "https://mcp.facebook.com/ads" \
  --headers "Authorization:Bearer YOUR_META_ACCESS_TOKEN"
```
Ewentualnie przez CLI Meta:
```bash
npm install -g @meta/ads-mcp-cli
meta-ads-mcp auth login
meta-ads-mcp connect --client claude-code
```

#### Wymagania
- Konto Meta Business Manager
- Dostęp do Ads Manager dla konta reklamowego
- Claude Pro/Max dla custom connectors w Claude Desktop

#### Ograniczenia
- Tylko konta, do których masz dostęp przez Business Manager
- Niektóre narzędzia (write) wymagają dodatkowych uprawnień API
- Beta — mogą być zmiany w API

**Trudność:** 2/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: Pipeboard Meta Ads MCP (open-source)

**Repo:** `github.com/pipeboard-co/meta-ads-mcp`  
**Koszt:** $49/miesiąc (hosted) lub self-hosted (free)

#### Instalacja
```bash
npx -y meta-ads-mcp
```

#### Konfiguracja w `claude_desktop_config.json`
```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "npx",
      "args": ["-y", "meta-ads-mcp"],
      "env": {
        "META_ACCESS_TOKEN": "TWOJ_TOKEN",
        "META_ACCOUNT_ID": "act_414505328896049"
      }
    }
  }
}
```

#### Jak zdobyć META_ACCESS_TOKEN
1. Idź na `developers.facebook.com`
2. Utwórz aplikację lub użyj istniejącej
3. Wejdź w Graph API Explorer
4. Wygeneruj User Access Token z uprawnieniami `ads_read`, `ads_management`
5. Przedłuż token do długotrwałego (60 dni): POST `/oauth/access_token`

**Trudność:** 3/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda C: gomarble/facebook-ads-mcp-server

```bash
npx -y @smithery/cli install @gomarble-ai/facebook-ads-mcp-server --client claude
```
Automatyczna instalacja przez Smithery dla Claude Desktop.

**Trudność:** 1/5  
**Działa w:** Claude Desktop TAK | Claude Code wymaga konfiguracji ręcznej

---

## 2. Google Ads

### Metoda A: Oficjalny Google Ads MCP (`googleads/google-ads-mcp`) — dla developerów

**Repo:** `github.com/googleads/google-ads-mcp`  
**Status:** Wydany 28 kwietnia 2026  
**Tryb:** Read-only (3 narzędzia bazowe)

#### Narzędzia
- `list_accessible_customers` — lista kont
- `search` — zapytania GAQL (Google Ads Query Language)
- `get_resource_metadata` — schemat zasobów API

#### Wymagania
- Python 3.12+
- Developer Token (22-znakowy string z Google Ads API Center)
- Google Cloud Project ID
- OAuth 2.0 credentials (Client ID + Client Secret)
- Plik `google-ads.yaml`

#### Konfiguracja `google-ads.yaml`
```yaml
developer_token: TWOJ_DEVELOPER_TOKEN
client_id: TWOJ_CLIENT_ID
client_secret: TWOJ_CLIENT_SECRET
refresh_token: TWOJ_REFRESH_TOKEN
login_customer_id: 1698452663
```

#### Instalacja i dodanie do Claude Code
```bash
pip install pipx
pipx install "git+https://github.com/googleads/google-ads-mcp"
```

Konfiguracja w `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "google-ads": {
      "command": "pipx",
      "args": ["run", "google-ads-mcp"],
      "env": {
        "GOOGLE_PROJECT_ID": "TWOJ_PROJECT_ID",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "TWOJ_TOKEN",
        "GOOGLE_ADS_YAML_PATH": "/Users/Tomek_Main/.google-ads.yaml"
      }
    }
  }
}
```

Lub przez Claude Code CLI:
```bash
claude mcp add --transport stdio google-ads -- pipx run google-ads-mcp
```

**Trudność:** 4/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: cohnen/mcp-google-ads (community, latwiejszy setup)

**Repo:** `github.com/cohnen/mcp-google-ads`

```bash
npm install -g @hapotech/google-ads-mcp
```

lub bez instalacji:
```bash
npx @hapotech/google-ads-mcp
```

Konfiguracja:
```json
{
  "mcpServers": {
    "google-ads": {
      "command": "npx",
      "args": ["@hapotech/google-ads-mcp"],
      "env": {
        "GOOGLE_ADS_DEVELOPER_TOKEN": "TWOJ_TOKEN",
        "GOOGLE_ADS_CLIENT_ID": "TWOJ_CLIENT_ID",
        "GOOGLE_ADS_CLIENT_SECRET": "TWOJ_CLIENT_SECRET",
        "GOOGLE_ADS_REFRESH_TOKEN": "TWOJ_REFRESH_TOKEN",
        "GOOGLE_ADS_CUSTOMER_ID": "1698452663"
      }
    }
  }
}
```

**Trudność:** 3/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Jak zdobyc Developer Token Google Ads
1. Zaloguj sie na `ads.google.com`
2. Przejdź do Tools → API Center
3. Złoz wniosek o Developer Token (standardowy lub testowy)
4. Testowy token: dostepny natychmiast, tylko konta testowe
5. Produkcyjny token: wymaga review przez Google (kilka dni)

**WAZNE dla GLOV:** Customer ID to `169-845-2663` (bez myslnikow: `1698452663`). Brak dostepu API — wymagane uzyskanie uprawnien od wlasciciela konta.

---

## 3. Google Analytics 4 (GA4)

### Metoda A: Natywny konektor `google-analytics-mcp` — AKTYWNE W GLOV

**Status w projekcie:** Polaczone (natywny konektor, bez warstwy posredniej)

GA4 idzie przez `mcp__google-analytics-mcp__run_report` — natywny konektor (aplikacja Google Cloud "eel-analytics"). `get_account_summaries` zwraca liste dostepnych property; raport odpytujesz przez `run_report(property_id=...)`.

Szczegoly: `_shared/GA4_STANDARD.md` + `_GA4_CONTEXT.md` w folderze projektu.

---

### Metoda B: Stape GA4 MCP (hosted, no-code) — REKOMENDOWANE dla marketerow

**URL:** `https://mcp-ga.stape.ai/mcp`

#### Konfiguracja w Claude Desktop
```json
{
  "mcpServers": {
    "ga4-stape": {
      "command": "npx",
      "args": ["-y", "@stape/ga4-mcp"],
      "env": {
        "GA4_PROPERTY_ID": "342844459",
        "GOOGLE_SERVICE_ACCOUNT_KEY": "KLUCZ_JSON_BASE64"
      }
    }
  }
}
```

Lub jako remote server w Claude Desktop:
1. Settings → MCP Servers → Add
2. URL: `https://mcp-ga.stape.ai/mcp`
3. Autoryzacja przez OAuth Google

**Trudność:** 2/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda C: surendranb/google-analytics-mcp (open-source, zaawansowany)

**Repo:** `github.com/surendranb/google-analytics-mcp`

Oferuje schema discovery, server-side aggregation, anomaly detection.

```bash
pip install google-analytics-mcp
```

Wymagania:
- Google Cloud Project
- Service Account z rola `Viewer` na wlasciwosci GA4
- Klucz JSON Service Account

```json
{
  "mcpServers": {
    "ga4": {
      "command": "python",
      "args": ["-m", "google_analytics_mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json",
        "GA4_PROPERTY_ID": "342844459"
      }
    }
  }
}
```

**Trudność:** 3/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda D: Windsor.ai MCP (hosted, multi-source)

Windsor.ai laczy GA4 + Google Ads + Meta Ads + inne w jednym MCP.
Dodaje single connector do Claude Desktop, zapytania cross-platformowe.

**Koszt:** Platny (freemium)  
**Trudnosc:** 2/5

---

### Property IDs GLOV
| Sklep | Property ID | Waluta |
|-------|-------------|--------|
| glov.co (PL) — GLOWNY | `342844459` | PLN |
| glov.eu | `326256483` | EUR |
| glov-france.com | `413599124` | EUR |
| glov-germany.com | `413616939` | EUR |

---

## 4. Microsoft Clarity

### Metoda A: Oficjalny Microsoft Clarity MCP — REKOMENDOWANE

**Repo:** `github.com/microsoft/clarity-mcp-server`  
**Docs:** `learn.microsoft.com/en-us/clarity/third-party-integrations/clarity-mcp-server`

#### Jak zdobyc API Token
1. Idz na `clarity.microsoft.com`
2. Wybierz projekt GLOV
3. Settings → Data Export
4. Kliknij "Generate new API token"
5. Skopiuj i zapisz token bezpiecznie

#### Instalacja
```bash
npx @microsoft/clarity-mcp-server --clarity_api_token=TWOJ_TOKEN
```

#### Konfiguracja w `claude_desktop_config.json`
```json
{
  "mcpServers": {
    "microsoft-clarity": {
      "command": "npx",
      "args": [
        "@microsoft/clarity-mcp-server",
        "--clarity_api_token=TWOJ_TOKEN_TUTAJ"
      ]
    }
  }
}
```

#### Instalacja w Claude Desktop (GUI)
1. File → Settings → Extensions
2. Wyszukaj "Microsoft Clarity MCP Server"
3. Kliknij Install

#### Co daje
- Dane behawioralne: scroll depth, engagement time, total traffic
- Filtering po: browser, OS, country/region, device
- Heatmap insights
- Export danych sesji

#### Ograniczenia (WAZNE)
- **Tylko 10 API requests per dzien per projekt**
- Maksymalnie 3 dni danych na zapytanie
- Maksymalnie 3 wymiary na zapytanie
- Brak nagran sesji (tylko dane agregowane)
- Dane dostepne z ~24h opoznieniem

**Trudnosc:** 2/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

## 5. Google Search Console

### Metoda A: AminForou/mcp-gsc (rekomendowany community server)

**Repo:** `github.com/AminForou/mcp-gsc`

Aktualizowany 2026, obsługuje pełną instalację OAuth.

#### Wymagania
- Google Cloud Project
- OAuth 2.0 credentials
- Search Console dostep do domeny `glov.co`

```bash
npx -y mcp-gsc
```

```json
{
  "mcpServers": {
    "google-search-console": {
      "command": "npx",
      "args": ["-y", "mcp-gsc"],
      "env": {
        "GOOGLE_CLIENT_ID": "TWOJ_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET": "TWOJ_CLIENT_SECRET",
        "GOOGLE_REFRESH_TOKEN": "TWOJ_REFRESH_TOKEN"
      }
    }
  }
}
```

**Trudnosc:** 3/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: suganthan-gsc-mcp (20 narzedzi SEO)

**Repo:** `github.com/surendranb/google-search-console-mcp`  
**npm:** `suganthan-gsc-mcp` (v2.2.2+)

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "suganthan-gsc-mcp"]
    }
  }
}
```

20 narzedzi SEO: performance queries, AI Overviews analysis, traffic intelligence.

**Trudnosc:** 2/5

---

### Metoda C: sofianbettayeb/gsc-mcp-server (prosty, NPM-first)

```bash
npm install -g gsc-mcp-server
```

Uproszczony UX, query analytics, indexing status, sitemaps.

**Trudnosc:** 2/5

---

### Metoda D: Binary (bez Node.js/Python) — NAJLATWIEJSZE

**Repo:** `github.com/ncosentino/google-search-console-mcp`

Pre-built binaries dla macOS — pobierz, skonfiguruj, uruchom.  
Brak dependencji runtime!

**Trudnosc:** 1/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

## 6. TikTok Ads

### Metoda A: AdsMCP/tiktok-ads-mcp-server

**Repo:** `github.com/AdsMCP/tiktok-ads-mcp-server`  
**Status:** Community, brak oficjalnego MCP od TikTok (stan maj 2026)

```bash
npx -y tiktok-ads-mcp-server
```

```json
{
  "mcpServers": {
    "tiktok-ads": {
      "command": "npx",
      "args": ["-y", "tiktok-ads-mcp-server"],
      "env": {
        "TIKTOK_ACCESS_TOKEN": "TWOJ_TOKEN",
        "TIKTOK_APP_ID": "TWOJ_APP_ID",
        "TIKTOK_SECRET": "TWOJ_SECRET"
      }
    }
  }
}
```

**Trudnosc:** 3/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: Porter Metrics MCP (hosted, najlatwiejsze)

`portermetrics.com` — hosted connector, TikTok + inne w jednym MCP.  
4 sposoby polaczenia TikTok Ads, w tym free tier.

**Trudnosc:** 1/5 — hosted, GUI setup

---

### Metoda C: Markifact (multi-platform, wlacznie z TikTok)

Patrz sekcja nizej.

---

## 7. Shopify

### Metoda A: Oficjalny Shopify AI Toolkit — AKTYWNE W GLOV

**Repo:** `github.com/Shopify/Shopify-AI-Toolkit` (MIT, od 9 kwietnia 2026)  
**Docs:** `shopify.dev/docs/apps/build/devmcp`

#### Szybka instalacja (1 komenda)
```bash
claude mcp add --transport stdio shopify-dev-mcp -- npx -y @shopify/dev-mcp@latest
```

#### Co daje (7 narzedzi)
- Search Shopify developer docs
- Validate GraphQL queries
- Execute store operations via Admin API
- Theme check / Liquid validation
- GraphQL schema access

#### Wymagania dla store operations
```bash
shopify auth login
```
Potrzebny dostep Partner Account do sklepu `glov.myshopify.com`.

#### Ograniczenia
- Oficjalny toolkit jest developer-focused (kod, schematy, dokumentacja)
- Do analityki sklepu (zamowienia, produkty) — uzywaj Admin API bezposrednio

**Trudnosc:** 1/5 dla instalacji; 3/5 dla store operations  
**Działa w:** Claude Code TAK | Claude Desktop czesciowo (glownie dla Code)

---

## 8. Klaviyo

### Metoda A: Oficjalny Klaviyo MCP Server — REKOMENDOWANE

**Docs:** `developers.klaviyo.com/en/docs/klaviyo_mcp_server`  
**Repo:** `github.com/mattcoatsworth/Klaviyo-MCP-Server`

Klaviyo ma partnerstwo z Anthropic (oficjalna integracja).

#### Instalacja
```bash
npm install klaviyo-mcp-server@latest
```

Konfiguracja w Claude Desktop:
```json
{
  "mcpServers": {
    "klaviyo": {
      "command": "npx",
      "args": ["-y", "klaviyo-mcp-server"],
      "env": {
        "KLAVIYO_API_KEY": "pk_live_TWOJ_KLUCZ",
        "READ_ONLY": "true"
      }
    }
  }
}
```

#### Jak zdobyc API Key
1. Klaviyo Dashboard → Account → Settings → API Keys
2. Utworz Private API Key z uprawnieniami: profiles, campaigns, flows, metrics (read)
3. Dla read-only: `pk_live_...`

#### Co daje
- Profile i segmenty klientow
- Kampanie emailowe (metryki, tresci)
- Flows (automatyzacje)
- Metrics i analytics
- Listy subskrybentow

**Trudnosc:** 2/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: Claude Desktop wbudowany connector

1. Settings → Connectors → Browse Connectors
2. Wyszukaj "Klaviyo"
3. Kliknij Connect
4. Podaj API Key

**Trudnosc:** 1/5 — tylko Claude Desktop

---

## 9. Pinterest Ads

### Metoda A: Adzviser MCP (hosted, cross-platform)

**URL:** `adzviser.com`

Obsługuje Pinterest Ads + Google Ads + Meta Ads w jednym MCP.  
Autoryzacja przez OAuth Pinterest.

```json
{
  "mcpServers": {
    "adzviser": {
      "command": "npx",
      "args": ["-y", "@adzviser/mcp"],
      "env": {
        "ADZVISER_API_KEY": "TWOJ_KLUCZ"
      }
    }
  }
}
```

**Trudnosc:** 2/5  
**Działa w:** Claude Desktop TAK | Claude Code TAK

---

### Metoda B: twominutereports/pinterest-ads-mcp

**Repo:** `mcpservers.org/servers/twominutereports/pinterest-ads-mcp`

Dane: Pin clicks, outbound clicks, engagement rate, conversions.

**Trudnosc:** 2/5

---

### Metoda C: Markifact (multi-platform, w tym Pinterest)

Patrz sekcja nizej.

---

## 10. Narzedzia multi-platformowe

### Markifact MCP — REKOMENDOWANE dla GLOV (multi-source w jednym)

**Repo:** `github.com/markifact/markifact-mcp`

#### Obsługuje w jednym MCP
Google Ads, Meta Ads, GA4, TikTok Ads, LinkedIn Ads, Microsoft Ads, Reddit Ads, Pinterest Ads, Snapchat Ads, Amazon Ads, DV360, Google Search Console, Google Business Profile, Google Merchant Center, Shopify, HubSpot, Klaviyo, BigQuery, i wiecej.

#### Kluczowa cecha: Human-in-the-loop
Kazda operacja write (tworzenie, edycja, pause) wymaga zatwierdzenia przez uzytkownika przed wykonaniem.

#### Instalacja
```bash
npx -y markifact-mcp
```

#### Konfiguracja
```json
{
  "mcpServers": {
    "markifact": {
      "command": "npx",
      "args": ["-y", "markifact-mcp"],
      "env": {
        "MARKIFACT_API_KEY": "TWOJ_KLUCZ"
      }
    }
  }
}
```

**Kompatybilnosc:** Claude Code, Claude Desktop, ChatGPT, Cursor, Gemini CLI  
**Trudnosc:** 2/5

---

### Porter Metrics MCP

**URL:** `portermetrics.com`

Hosted MCP: TikTok Ads + Google Ads + GA4 + Shopify + HubSpot + Klaviyo + Google Sheets + 20+ zrodel.  
Blend danych z wielu platform w jednej rozmowie.

**Koszt:** Freemium  
**Trudnosc:** 1/5 — GUI setup

---

### Windsor.ai MCP

Meta Ads + GA4 + Google Ads + inne w jednym hosted MCP.  
Real-time bridge do Claude bez lokalnej konfiguracji.

**Trudnosc:** 1/5 — hosted, platny

---

## 11. Tabela porowawcza

| Platforma | Najlatwiejsza metoda | Trudnosc | Terminal (Code) | Desktop (Cowork) | Koszt |
|-----------|---------------------|----------|----------------|------------------|-------|
| Meta Ads | Oficjalny MCP `mcp.facebook.com/ads` | 2/5 | TAK | TAK | Free (beta) |
| Google Ads | cohnen/mcp-google-ads | 3/5 | TAK | TAK | Free/Freemium |
| GA4 | `google-analytics-mcp` (juz aktywne!) | 1/5 | TAK | TAK | Free |
| Microsoft Clarity | `@microsoft/clarity-mcp-server` npx | 2/5 | TAK | TAK | Free |
| Google Search Console | Binary (ncosentino) lub suganthan-gsc-mcp | 1-2/5 | TAK | TAK | Free |
| TikTok Ads | Porter Metrics (hosted) | 1/5 | TAK | TAK | Freemium |
| Shopify | `@shopify/dev-mcp` (oficjalny) | 1/5 | TAK | czesciowo | Free |
| Klaviyo | Wbudowany connector w Claude Desktop | 1/5 | TAK | TAK | Free |
| Pinterest Ads | Adzviser lub Markifact | 2/5 | TAK | TAK | Freemium |
| Wszystkie naraz | Markifact MCP | 2/5 | TAK | TAK | Freemium |

---

## Priorytety wdrozenia dla GLOV

### Natychmiast (juz prawie gotowe)
1. **Microsoft Clarity** — tylko `npx @microsoft/clarity-mcp-server --clarity_api_token=TOKEN`. Token jest w projekcie (Data Export token dodany 2026-05-20). Uwaga: 10 req/dzien limit.

2. **Meta Ads oficjalny MCP** — OAuth w 5 minut przez Claude Desktop, lub `claude mcp add` z tokenem. Token `act_414505328896049` juz znamy.

### Krotkoterminowo
3. **Google Search Console** — binary method (zero dependencji). Potrzebny Google OAuth dla domeny `glov.co`.

4. **Klaviyo** — Wbudowany connector w Claude Desktop jezeli jest dostep do konta GLOV. API key z Klaviyo Dashboard.

### Gdy bedzie dostep
5. **Google Ads** — Customer ID `169-845-2663` jest znany. Czeka na developer token i OAuth od wlasciciela konta.

### Opcjonalnie (multi-source)
6. **Markifact** — jezeli chcesz wszystko w jednym MCP z human-in-the-loop na write operations.

---

## Pulapki i zle praktyki

### Tokeny i bezpieczenstwo
- Nigdy nie commituj tokenow do git — uzywaj zmiennych srodowiskowych lub `.env` (w .gitignore)
- Meta Access Token wygasa po 60 dniach — ustaw przypomnienie o odnowieniu
- Google Refresh Token nie wygasa (chyba ze rewokeisz aplikacje)

### Limity API
- Microsoft Clarity: tylko 10 req/dzien — nie uzywaj w petlach
- GA4 (`google-analytics-mcp`): 10 zadan/s i 100 000 zadan/dzien per projekt Google Cloud
- Meta Ads API: rate limits zalezne od poziomu konta reklamowego

### Kontekst Claude
- Kazdy MCP server laduje narzedzia do kontekstu przy starcie sesji
- 3+ MCP naraz = ok. 12 000 tokenow kontekstu (bez Tool Search)
- Z MCP Tool Search: ok. 600 tokenow (tylko dla wywolanych narzedzi)
- Uzywaj `claude mcp add --transport http` z Tool Search dla oszczednosci kontekstu

### Write operations
- Zawsze testuj na jednym obiekcie przed bulk operacja
- Preferuj MCP z human-in-the-loop (Markifact) dla operacji modyfikujacych
- Shopify AI Toolkit: store operations wymagaja Partner Account access

---

## Zrodla

- [Meta Official MCP Guide (April 2026)](https://pasqualepillitteri.it/en/news/1707/official-meta-ads-mcp-claude-29-tools-2026)
- [Google Ads MCP — oficjalna dokumentacja](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server)
- [Google Ads MCP — GitHub](https://github.com/googleads/google-ads-mcp)
- [GA4 MCP — Stape](https://stape.io/blog/mcp-server-for-google-analytics)
- [Microsoft Clarity MCP — GitHub](https://github.com/microsoft/clarity-mcp-server)
- [Microsoft Clarity MCP — Docs](https://learn.microsoft.com/en-us/clarity/third-party-integrations/clarity-mcp-server)
- [Google Search Console MCP — suganthan](https://suganthan.com/blog/google-search-console-mcp-server/)
- [TikTok Ads MCP — Porter Metrics](https://portermetrics.com/en/tutorial/claude/chat-tiktok-ads/)
- [Shopify AI Toolkit — oficjalna dokumentacja](https://shopify.dev/docs/apps/build/devmcp)
- [Klaviyo MCP — oficjalna dokumentacja](https://developers.klaviyo.com/en/docs/klaviyo_mcp_server)
- [Klaviyo + Anthropic partnerstwo](https://www.klaviyo.com/blog/agentic-marketing-workflows-with-klaviyo-anthropic-claude)
- [Markifact MCP — GitHub](https://github.com/markifact/markifact-mcp)
- [Google Analytics MCP — google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp)
- [Pipeboard Meta Ads MCP](https://github.com/pipeboard-co/meta-ads-mcp)

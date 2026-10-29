/* glosowanie.js — głosowanie zespołu na wersję startową (Tomek 29.10: „wrzuć reko na hub z opcją głosowania (Tomek, Rafał, Bartek), podobnie jak na China Select, ten sam worker”).
   Osobna instancja grzejeko-glosy (kopia kodu workera CC, własna baza i lista osób; hub/glosy_worker): głos = typ „komentarz”, kotwica „glos-start”, tekst = JSON {wariant, uwaga}; liczy się OSTATNI głos każdej osoby.
   Konfiguracja w <script data-strona data-osoby>. Warianty = sekcje .wa[id] + kafel startowy #b0. Wygląd = skórka sklepu (bez łuczków). */
(function () {
  var S = document.currentScript, API = "https://grzejeko-glosy.waleqq.workers.dev/api/komentarze"; // osobna instancja grzejeko (hub/glosy_worker), NIE baza CC
  var STRONA = S.dataset.strona, OSOBY = (S.dataset.osoby || "Tomek,Rafał,Bartek").split(","), KOTW = "glos-start";
  var css = ".gl{background:#f4f6fa;border-radius:16px;padding:20px;margin:22px 0;font-family:inherit;color:#0f1a2e}.gl h2{font-size:21px;font-weight:800;margin:0 0 4px;letter-spacing:-.02em}.gl p{margin:0 0 12px;color:#5b667a;font-size:14px}" +
    ".gl-os{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}.gl-os button,.gl-w button,.gl-btn{font:inherit;cursor:pointer;min-height:44px;border-radius:999px;border:1px solid #e3e7ef;background:#fff;color:#0f1a2e;padding:0 16px;font-weight:600;font-size:14px}" +
    ".gl-os button[aria-pressed=true]{background:#0f1a2e;border-color:#0f1a2e;color:#fff}.gl-w{display:grid;grid-template-columns:minmax(0,1fr);gap:6px}@media(min-width:700px){.gl-w{grid-template-columns:1fr 1fr}}" +
    ".gl-w button{display:flex;align-items:center;gap:10px;border-radius:12px;text-align:left;padding:8px 12px;width:100%}.gl-w button b{flex:none;min-width:34px}.gl-w button span{flex:1;font-weight:500;font-size:13.5px;line-height:1.3}" +
    ".gl-w button i{font-style:normal;font-size:12.5px;color:#5b667a;white-space:nowrap}.gl-w button[aria-pressed=true]{border-color:#2251f0;background:#eef2ff}.gl-w button.lead i{color:#0a7a4b;font-weight:700}" +
    ".gl textarea{width:100%;min-height:64px;border:1px solid #e3e7ef;border-radius:10px;padding:10px;font:inherit;font-size:14px;margin:12px 0 8px;box-sizing:border-box}.gl-st{font-size:13.5px;color:#5b667a;margin-top:8px}.gl-st b{color:#0f1a2e}" +
    ".gl-btn{background:#2251f0;border-color:#2251f0;color:#fff;border-radius:10px}.gl-mini{font:600 13px inherit;cursor:pointer;border:1px solid #e3e7ef;background:#fff;color:#2251f0;border-radius:999px;padding:6px 12px;min-height:36px;margin:6px 0}" +
    ".gl-mini[aria-pressed=true]{background:#eef2ff;border-color:#2251f0}.gl button:focus-visible,.gl-mini:focus-visible{outline:2px solid #2251f0;outline-offset:2px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var opcje = [];
  var b0 = document.getElementById("b0"); if (b0) opcje.push({ id: "start", tyt: "Kafel startowy (proponowany domyślny)", el: b0 });
  document.querySelectorAll("section.wa[id]").forEach(function (s) {
    var h = s.querySelector("h3,h2"); var t = h ? h.textContent.replace(/^\s*W\d+\s*/, "").trim() : s.id;
    opcje.push({ id: s.id, tyt: t, el: s });
  });
  var osoba = null; try { osoba = localStorage.getItem("glos-osoba"); } catch (e) {}
  var glosy = {}; // autor -> {wariant, uwaga, ts}
  var box = document.createElement("section"); box.className = "gl"; box.id = "glosowanie";
  box.innerHTML = '<h2>Głosowanie: która wersja kafla na start?</h2><p>Wybierz siebie, potem wersję. Liczy się Twój ostatni głos, możesz go zmienić. Głosy widzi cały zespół.</p>' +
    '<div class="gl-os" role="group" aria-label="Kto głosuje">' + OSOBY.map(function (o) { return '<button type="button" data-o="' + o + '">' + o + '</button>'; }).join("") + '</div>' +
    '<div class="gl-w" role="group" aria-label="Wersje kafla"></div><textarea placeholder="Uwaga do głosu (opcjonalnie)" aria-label="Uwaga do głosu"></textarea>' +
    '<div class="gl-st" aria-live="polite"></div>';
  var kot = document.getElementById("dzis") || document.querySelector("main section");
  kot.parentNode.insertBefore(box, kot);
  var W = box.querySelector(".gl-w"), ST = box.querySelector(".gl-st"), TA = box.querySelector("textarea");
  function liczby() { var n = {}; Object.keys(glosy).forEach(function (a) { var w = glosy[a].wariant; (n[w] = n[w] || []).push(a); }); return n; }
  function rysuj() {
    box.querySelectorAll(".gl-os button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.o === osoba); });
    var n = liczby(), max = 0; Object.keys(n).forEach(function (k) { max = Math.max(max, n[k].length); });
    W.innerHTML = opcje.map(function (o) {
      var kto = n[o.id] || [], moj = osoba && glosy[osoba] && glosy[osoba].wariant === o.id;
      return '<button type="button" data-w="' + o.id + '" aria-pressed="' + !!moj + '" class="' + (kto.length && kto.length === max ? "lead" : "") + '"><b>' + (o.id === "start" ? "Start" : o.id.toUpperCase()) + '</b><span>' + o.tyt + '</span><i>' + (kto.length ? kto.length + " · " + kto.join(", ") : "—") + '</i></button>';
    }).join("");
    document.querySelectorAll(".gl-mini").forEach(function (m) { m.setAttribute("aria-pressed", !!(osoba && glosy[osoba] && glosy[osoba].wariant === m.dataset.w)); m.textContent = m.getAttribute("aria-pressed") === "true" ? "Twój głos ✓" : "Głosuję na tę wersję"; });
    var opis = OSOBY.map(function (o) { return "<b>" + o + "</b>: " + (glosy[o] ? (glosy[o].wariant === "start" ? "Start" : glosy[o].wariant.toUpperCase()) + (glosy[o].uwaga ? " („" + glosy[o].uwaga.replace(/</g, "&lt;") + "”)" : "") : "jeszcze nie głosował(a)"); });
    ST.innerHTML = opis.join(" · ");
  }
  function wczytaj() {
    fetch(API + "?strona=" + encodeURIComponent(STRONA)).then(function (r) { return r.json(); }).then(function (rows) {
      glosy = {}; (rows || []).filter(function (r) { return r.kotwica === KOTW && r.typ === "komentarz"; }).forEach(function (r) {
        try { var d = JSON.parse(r.tekst); glosy[r.autor] = { wariant: d.wariant, uwaga: d.uwaga || "", ts: r.ts }; } catch (e) {}
      }); rysuj();
    }).catch(function () { ST.textContent = "Głosowanie jeszcze nie działa: osobna baza głosów grzejeko czeka na uruchomienie. Strona działa."; });
  }
  function glosuj(w) {
    if (!osoba) { ST.textContent = "Najpierw wybierz, kto głosuje: " + OSOBY.join(", ") + "."; box.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    var body = { strona: STRONA, kotwica: KOTW, autor: osoba, typ: "komentarz", tekst: JSON.stringify({ wariant: w, uwaga: TA.value.trim() }) };
    ST.textContent = "Zapisuję głos…";
    fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) { if (!x.ok) { ST.textContent = "Głos nie zapisany: " + (x.j.blad || "błąd") + (x.j.blad === "nieznana osoba" ? " (ta osoba jeszcze nie jest na liście workera)" : ""); return; } TA.value = ""; wczytaj(); })
      .catch(function () { ST.textContent = "Głos nie zapisany: brak połączenia."; });
  }
  box.addEventListener("click", function (e) {
    var o = e.target.closest("[data-o]"); if (o) { osoba = o.dataset.o; try { localStorage.setItem("glos-osoba", osoba); } catch (er) {} rysuj(); return; }
    var w = e.target.closest("[data-w]"); if (w && W.contains(w)) glosuj(w.dataset.w);
  });
  opcje.forEach(function (o) { var m = document.createElement("button"); m.type = "button"; m.className = "gl-mini"; m.dataset.w = o.id; m.addEventListener("click", function () { glosuj(o.id); });
    var h = o.el.querySelector("h3,h2"); (h && h.parentNode ? h.parentNode : o.el).appendChild(m); });
  rysuj(); wczytaj();
})();

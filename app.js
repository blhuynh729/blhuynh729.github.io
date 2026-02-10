// ENG 003 Parts Manual — app.js
// Renders the manual JSON into a clean, searchable UI with copyable code blocks.

const els = {
  layout: document.getElementById("layout"),
  sidebar: document.getElementById("sidebar"),
  toc: document.getElementById("toc"),
  content: document.getElementById("content"),
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  searchMeta: document.getElementById("searchMeta"),
  menuBtn: document.getElementById("menuBtn"),
  toast: document.getElementById("toast"),
};

let manual = null;
let partEls = [];      // { id, el, tocLinkEl, searchText }
let sectionEls = [];   // { id, el, partIds }
let tocSectionEls = []; // { id, el }

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.add("is-visible");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 1400);
}

function normalize(text){
  return String(text ?? "").toLowerCase().replace(/\s+/g, " ").trim();
}

function createEl(tag, props = {}, children = []){
  const el = document.createElement(tag);
  for (const [k,v] of Object.entries(props)){
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (k.startsWith("data-")) el.setAttribute(k, v);
    else if (k === "text") el.textContent = v;
    else if (k === "href") el.setAttribute("href", v);
    else if (k === "target") el.setAttribute("target", v);
    else if (k === "rel") el.setAttribute("rel", v);
    else if (k === "id") el.id = v;
    else if (k === "type") el.setAttribute("type", v);
    else if (k === "aria-label") el.setAttribute("aria-label", v);
    else el.setAttribute(k, v);
  }
  for (const c of children){
    if (typeof c === "string") el.appendChild(document.createTextNode(c));
    else if (c) el.appendChild(c);
  }
  return el;
}

function renderCallout(node){
  const variant = node.variant || "info";
  const wrap = createEl("div", { class: `callout callout--${variant}`});
  wrap.appendChild(createEl("p", { class: "callout__title", text: node.title || "Note" }));
  wrap.appendChild(createEl("p", { class: "callout__text", text: node.text || "" }));
  return wrap;
}

function renderTable(node){
  const wrap = createEl("div", { class: "table-wrap" });
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  for (const h of (node.headers || [])){
    trh.appendChild(createEl("th", { text: h }));
  }
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const row of (node.rows || [])){
    const tr = document.createElement("tr");
    for (const cell of row){
      tr.appendChild(createEl("td", { text: String(cell ?? "") }));
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);

  const out = document.createElement("div");
  out.appendChild(wrap);
  if (node.caption){
    out.appendChild(createEl("div", { class: "table-caption", text: node.caption }));
  }
  return out;
}

function renderImage(node){
  const fig = document.createElement("figure");
  const a = createEl("a", { href: node.src, target: "_blank", rel: "noopener" });
  const img = createEl("img", { src: node.src, alt: node.alt || "" });
  a.appendChild(img);
  fig.appendChild(a);
  if (node.caption){
    fig.appendChild(createEl("figcaption", { text: node.caption }));
  }
  return fig;
}

function renderCode(node, partId){
  const lang = node.language || "text";
  const title = node.title || "Code";
  const codeId = `${partId}__code__${Math.random().toString(16).slice(2)}`;

  const header = createEl("div", { class: "codeblock__header" }, [
    createEl("div", { class: "codeblock__title" }, [
      createEl("strong", { text: title }),
      node.source ? createEl("span", { class: "codeblock__meta", html: `• <a href="${escapeHtml(node.source)}" target="_blank" rel="noopener">source</a>` }) : null,
      createEl("span", { class: "codeblock__meta", text: `• ${lang}` }),
    ]),
  ]);

  const copyBtn = createEl("button", { class: "copy-btn", type: "button", "aria-label": "Copy code", "data-code-id": codeId }, [
    "Copy"
  ]);
  header.appendChild(copyBtn);

  const pre = document.createElement("pre");
  const code = createEl("code", { id: codeId, "data-lang": lang, text: node.code || "" });
  pre.appendChild(code);

  const wrap = createEl("div", { class: "codeblock" }, [header, pre]);
  return wrap;
}

function renderLink(node){
  return createEl("p", {}, [
    createEl("a", { href: node.url, target: "_blank", rel: "noopener", text: node.label || node.url })
  ]);
}

function extractSearchText(part){
  const chunks = [];
  chunks.push(part.title || "");
  for (const t of (part.tags || [])) chunks.push(t);

  for (const node of (part.content || [])){
    if (!node || typeof node !== "object") continue;
    if (node.type === "p" || node.type === "h3") chunks.push(node.text || "");
    if (node.type === "callout") chunks.push(node.title || "", node.text || "");
    if (node.type === "table"){
      for (const h of (node.headers || [])) chunks.push(h);
      for (const r of (node.rows || [])) for (const c of r) chunks.push(String(c ?? ""));
    }
    if (node.type === "code") chunks.push(node.title || "", node.code || "");
    if (node.type === "link") chunks.push(node.label || "", node.url || "");
    if (node.type === "img") chunks.push(node.caption || "");
  }
  return normalize(chunks.join(" "));
}

function setCollapsed(partEl, collapsed){
  partEl.classList.toggle("is-collapsed", collapsed);
  const btn = partEl.querySelector(".part__toggle");
  if (btn) btn.textContent = collapsed ? "Expand" : "Collapse";
  btn?.setAttribute("aria-expanded", (!collapsed).toString());
}

function scrollToPart(partId){
  const target = document.getElementById(partId);
  if (!target) return;
  setCollapsed(target, false);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderIntro(){
  const inner = createEl("div", { class: "content__inner" });

  // Intro card
  const introCard = createEl("div", { class: "card" });
  const introHeader = createEl("div", { class: "card__header" }, [
    createEl("h2", { class: "h2", text: "Start here" }),
    createEl("p", { class: "muted", text: "How to use this manual." }),
  ]);
  const introBody = createEl("div", { class: "card__body" });

  for (const node of (manual.intro || [])){
    introBody.appendChild(renderNode(node, "intro"));
  }

  // Quick nav
  if (manual.quickNav){
    const qWrap = createEl("div", { class: "quicknav" });
    qWrap.appendChild(createEl("h3", { text: manual.quickNav.title || "Quick links" }));
    const grid = createEl("div", { class: "quicknav__grid" });

    for (const item of (manual.quickNav.items || [])){
      const q = createEl("button", { class: "qcard", type: "button" });
      q.appendChild(createEl("div", { class: "qcard__title", text: item.label || "" }));
      q.appendChild(createEl("div", { class: "qcard__hint", text: "Jump to related parts" }));
      q.addEventListener("click", () => {
        const first = (item.targets || [])[0];
        if (first) scrollToPart(first);
      });
      grid.appendChild(q);
    }

    qWrap.appendChild(grid);
    introBody.appendChild(qWrap);
  }

  introCard.appendChild(introHeader);
  introCard.appendChild(introBody);

  inner.appendChild(introCard);

  return inner;
}

function renderNode(node, partId){
  if (!node || typeof node !== "object") return document.createTextNode("");
  if (node.type === "p") return createEl("p", { text: node.text || "" });
  if (node.type === "h3") return createEl("h3", { text: node.text || "" });
  if (node.type === "callout") return renderCallout(node);
  if (node.type === "img") return renderImage(node);
  if (node.type === "table") return renderTable(node);
  if (node.type === "code") return renderCode(node, partId);
  if (node.type === "link") return renderLink(node);
  return createEl("p", { text: node.text || "" });
}

function renderPart(part){
  const article = createEl("article", {
    class: "part is-collapsed",
    id: part.id,
    "data-part-id": part.id,
  });

  const titleWrap = document.createElement("div");
  titleWrap.appendChild(createEl("h2", { class: "part__title", text: part.title || part.id }));

  const pills = createEl("div", { class: "pills" });
  for (const tag of (part.tags || [])){
    pills.appendChild(createEl("span", { class: "pill", text: tag }));
  }
  titleWrap.appendChild(pills);

  const toggleBtn = createEl("button", {
    class: "btn btn--sm part__toggle",
    type: "button",
    "aria-label": "Expand part",
    "aria-expanded": "false",
  }, ["Expand"]);

  toggleBtn.addEventListener("click", () => {
    const collapsed = article.classList.contains("is-collapsed");
    setCollapsed(article, !collapsed);
  });

  const header = createEl("header", { class: "part__header" }, [
    titleWrap,
    toggleBtn,
  ]);

  const body = createEl("div", { class: "part__body" });
  for (const node of (part.content || [])){
    body.appendChild(renderNode(node, part.id));
  }

  // Resources (if present)
  if (Array.isArray(part.resources) && part.resources.length){
    body.appendChild(createEl("h3", { text: "Resources" }));
    const ul = document.createElement("ul");
    for (const r of part.resources){
      const li = document.createElement("li");
      li.appendChild(createEl("a", {
        href: r.url,
        target: "_blank",
        rel: "noopener",
        text: r.label || r.url
      }));
      ul.appendChild(li);
    }
    body.appendChild(ul);
  }

  article.appendChild(header);
  article.appendChild(body);
  return article;
}

function renderManual(){
  els.content.innerHTML = "";
  const inner = renderIntro();

  // Sections + parts
  sectionEls = [];
  partEls = [];

  for (const section of (manual.sections || [])){
    const sectionCard = createEl("div", { class: "card", id: `section-${section.id}` });

    const header = createEl("div", { class: "card__header" }, [
      createEl("h2", { class: "h2", text: section.title }),
      section.description ? createEl("p", { class: "muted", text: section.description }) : null
    ]);

    const body = createEl("div", { class: "card__body" });
    const partIds = [];

    for (const part of (section.parts || [])){
      const el = renderPart(part);
      el.dataset.search = extractSearchText(part);
      body.appendChild(el);

      partIds.push(part.id);
      partEls.push({
        id: part.id,
        el,
        searchText: el.dataset.search,
        tocLinkEl: null,
        sectionId: section.id,
      });
    }

    sectionCard.appendChild(header);
    sectionCard.appendChild(body);
    inner.appendChild(sectionCard);

    sectionEls.push({ id: section.id, el: sectionCard, partIds });
  }

  els.content.appendChild(inner);

  // Wire up copy buttons
  els.content.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const codeId = btn.getAttribute("data-code-id");
      const codeEl = document.getElementById(codeId);
      if (!codeEl) return;
      const text = codeEl.textContent || "";
      try{
        await navigator.clipboard.writeText(text);
        toast("Copied!");
      }catch(err){
        // fallback
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try{
          document.execCommand("copy");
          toast("Copied!");
        }catch(_){
          toast("Copy failed");
        }
        sel.removeAllRanges();
      }
    });
  });
}

function buildToc(){
  els.toc.innerHTML = "";
  tocSectionEls = [];

  for (const section of (manual.sections || [])){
    const sectionWrap = document.createElement("div");
    sectionWrap.setAttribute("data-section-id", section.id);

    sectionWrap.appendChild(createEl("div", { class: "toc__section-title", text: section.title }));

    const ul = createEl("ul", { class: "toc__list" });

    for (const part of (section.parts || [])){
      const a = createEl("a", {
        class: "toc__link",
        href: `#${part.id}`,
        "data-part-id": part.id
      }, [
        createEl("span", { text: part.title }),
        createEl("span", { class: "toc__badge", text: (part.tags && part.tags[0]) ? part.tags[0] : "part" })
      ]);

      a.addEventListener("click", (e) => {
        // On mobile, close sidebar
        if (window.matchMedia("(max-width: 980px)").matches){
          els.layout.classList.remove("sidebar-open");
        }

        // Expand & scroll
        e.preventDefault();
        history.replaceState(null, "", `#${part.id}`);
        scrollToPart(part.id);
        setActiveToc(part.id);
      });

      const li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);

      const p = partEls.find(x => x.id === part.id);
      if (p) p.tocLinkEl = a;
    }

    sectionWrap.appendChild(ul);
    els.toc.appendChild(sectionWrap);

    tocSectionEls.push({ id: section.id, el: sectionWrap });
  }
}


function setActiveToc(partId){
  for (const p of partEls){
    p.tocLinkEl?.classList.toggle("is-active", p.id === partId);
  }
}

function applySearch(queryRaw){
  const q = normalize(queryRaw);
  if (!q){
    els.searchMeta.textContent = "";
    for (const p of partEls){
      p.el.hidden = false;
      p.tocLinkEl?.closest("li")?.removeAttribute("hidden");
    }
    for (const s of sectionEls){
      s.el.hidden = false;
    }
    for (const s of tocSectionEls){
      s.el.hidden = false;
    }
    return;
  }

  let matches = 0;

  for (const p of partEls){
    const ok = p.searchText.includes(q);
    p.el.hidden = !ok;
    if (p.tocLinkEl){
      const li = p.tocLinkEl.closest("li");
      if (li) li.hidden = !ok;
    }
    if (ok) matches++;
  }

  // Hide whole sections if none of their parts are visible
  for (const s of sectionEls){
    const anyVisible = s.partIds.some(pid => {
      const p = partEls.find(x => x.id === pid);
      return p && !p.el.hidden;
    });
    s.el.hidden = !anyVisible;
  }

  // Hide TOC section groups if none of their links are visible
  for (const s of tocSectionEls){
    const sectionDef = (manual.sections || []).find(x => x.id === s.id);
    const partIds = sectionDef?.parts?.map(p => p.id) || [];
    const anyVisible = partIds.some(pid => {
      const p = partEls.find(x => x.id === pid);
      return p && !p.el.hidden;
    });
    s.el.hidden = !anyVisible;
  }

  els.searchMeta.textContent = `${matches} result${matches === 1 ? "" : "s"}`;
}

function setupSearch(){
  els.clearSearchBtn.addEventListener("click", () => {
    els.searchInput.value = "";
    applySearch("");
    els.searchInput.focus();
  });

  els.searchInput.addEventListener("input", () => {
    applySearch(els.searchInput.value);
  });

  // Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== els.searchInput){
      e.preventDefault();
      els.searchInput.focus();
    }
    if (e.key === "Escape"){
      if (document.activeElement === els.searchInput || els.searchInput.value){
        els.searchInput.value = "";
        applySearch("");
      }
    }
  });

  els.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
      const first = partEls.find(p => !p.el.hidden);
      if (first){
        scrollToPart(first.id);
        setActiveToc(first.id);
      }
    }
  });
}

function setupMobileSidebar(){
  els.menuBtn.addEventListener("click", () => {
    els.layout.classList.toggle("sidebar-open");
  });

  // Click outside to close (mobile)
  document.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    if (!isMobile) return;
    if (!els.layout.classList.contains("sidebar-open")) return;

    const clickedInSidebar = els.sidebar.contains(e.target);
    const clickedMenuBtn = els.menuBtn.contains(e.target);
    if (!clickedInSidebar && !clickedMenuBtn){
      els.layout.classList.remove("sidebar-open");
    }
  });
}

function openFromHash(){
  const id = (location.hash || "").replace("#", "");
  if (!id) return;
  const exists = document.getElementById(id);
  if (exists){
    setTimeout(() => {
      scrollToPart(id);
      setActiveToc(id);
    }, 0);
  }
}

function setupScrollSpy(){
  const obs = new IntersectionObserver((entries) => {
    // choose the most visible entry
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible){
      setActiveToc(visible.target.id);
    }
  }, { root: null, threshold: [0.08, 0.2, 0.35, 0.5, 0.65] });

  for (const p of partEls){
    obs.observe(p.el);
  }
}

async function init(){
  const res = await fetch("data/manual.json");
  manual = await res.json();

  // Title
  const title = manual?.meta?.course ? `${manual.meta.course} ${manual.meta.title}` : "ENG 003 Parts Manual";
  document.title = title;

  renderManual();
  buildToc();
  setupSearch();
  setupMobileSidebar();
  setupScrollSpy();
  openFromHash();
}

init().catch(err => {
  console.error(err);
  els.content.innerHTML = `
    <div class="loading">
      <strong>Failed to load manual.</strong><br />
      Make sure you are serving this folder with a local server (not opening the HTML file directly).<br />
      Example: <code>python -m http.server</code>
    </div>
  `;
});

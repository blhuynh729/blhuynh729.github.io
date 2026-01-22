/*
  ENG 03 Docs — UI enhancements
  - dark mode toggle (persisted)
  - scroll progress bar
  - upgraded code blocks with language pill + copy button
  - floating "On this page" ToC (h2/h3)
  - back-to-top button
  - '/' focuses search
*/

(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeLocalStorageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeLocalStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function setTheme(theme) {
    const html = document.documentElement;
    html.classList.toggle('theme-dark', theme === 'dark');
    html.dataset.theme = theme;
    safeLocalStorageSet('eng03-theme', theme);
  }

  function initTheme() {
    const stored = safeLocalStorageGet('eng03-theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(sysDark ? 'dark' : 'light');
  }

  function injectThemeToggle() {
    const header = $('.main-header') || $('.site-header') || document.body;
    if (!header || $('#theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.innerHTML = `
      <span class="theme-toggle__icon" aria-hidden="true">☀</span>
      <span class="theme-toggle__label">Theme</span>
    `;

    const setIcon = () => {
      const icon = btn.querySelector('.theme-toggle__icon');
      if (!icon) return;
      icon.textContent = document.documentElement.classList.contains('theme-dark') ? '☾' : '☀';
    };
    setIcon();

    btn.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
      setTheme(next);
      setIcon();
    });

    // Place next to search (if present)
    const search = $('.search') || $('#search-input')?.closest('.search');
    if (search && search.parentElement) {
      search.parentElement.appendChild(btn);
    } else {
      header.appendChild(btn);
    }
  }

  function injectScrollProgress() {
    if ($('#scroll-progress')) return;
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.innerHTML = '<div class="scroll-progress__bar"></div>';
    document.body.appendChild(bar);
    const inner = bar.firstElementChild;

    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(1, Math.max(0, doc.scrollTop / max));
      inner.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function getLanguageFromBlock(wrap) {
    const code = $('code', wrap);
    if (!code) return null;
    const dl = wrap.getAttribute('data-lang');
    if (dl) return dl;
    const langClass = Array.from(code.classList).find((c) => c.startsWith('language-'));
    if (!langClass) return null;
    return langClass.replace('language-', '').trim();
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function enhanceCodeBlocks() {
    $$('div.highlighter-rouge').forEach((wrap) => {
      if (wrap.dataset.enhanced === '1') return;
      wrap.dataset.enhanced = '1';

      const pre = $('pre', wrap);
      const code = $('code', wrap);
      if (!pre || !code) return;

      const bar = document.createElement('div');
      bar.className = 'codebar';

      const langName = getLanguageFromBlock(wrap) || 'Code';
      const lang = document.createElement('span');
      lang.className = 'codelang';
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = langName;
      lang.appendChild(pill);

      const actions = document.createElement('div');
      actions.className = 'codeactions';

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.innerHTML = `
        <span class="copy-btn__icon" aria-hidden="true">⧉</span>
        <span class="copy-btn__label">Copy</span>
      `;
      btn.setAttribute('aria-label', 'Copy code to clipboard');

      btn.addEventListener('click', async () => {
        const raw = code.innerText.replace(/\n{3,}$/g, '\n\n');
        try {
          await copyText(raw);
          btn.classList.add('is-copied');
          const label = btn.querySelector('.copy-btn__label');
          if (label) label.textContent = 'Copied!';
          window.setTimeout(() => {
            btn.classList.remove('is-copied');
            if (label) label.textContent = 'Copy';
          }, 1400);
        } catch {
          // ignore
        }
      });

      actions.appendChild(btn);
      bar.appendChild(lang);
      bar.appendChild(actions);
      wrap.insertBefore(bar, pre);
    });

    // Hide Just the Docs' default copy buttons if enabled
    $$('.js-copy-code-button').forEach((b) => (b.style.display = 'none'));
  }

  function slugify(str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[\'\"“”’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function buildToc() {
    const main = $('.main-content');
    if (!main) return;

    const headings = $$('h2, h3', main).filter((h) => {
      return !h.closest('pre') && !h.closest('code') && !h.closest('#toc');
    });

    if (headings.length < 2) return;
    if ($('.page-toc')) return;

    const aside = document.createElement('aside');
    aside.className = 'page-toc';
    aside.innerHTML = `
      <div class="page-toc__inner">
        <div class="page-toc__title">On this page</div>
        <nav class="page-toc__nav" aria-label="On this page"></nav>
      </div>
    `;

    const nav = $('.page-toc__nav', aside);
    const ul = document.createElement('ul');
    ul.className = 'page-toc__list';

    const used = new Set();
    headings.forEach((h) => {
      if (!h.id) {
        let id = slugify(h.textContent || 'section');
        if (!id) id = 'section';
        let n = 2;
        let candidate = id;
        while (used.has(candidate) || document.getElementById(candidate)) {
          candidate = `${id}-${n++}`;
        }
        h.id = candidate;
      }
      used.add(h.id);

      const li = document.createElement('li');
      li.className = `page-toc__item page-toc__item--${h.tagName.toLowerCase()}`;
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = h.textContent || '';
      a.className = 'page-toc__link';
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    const wrap = $('.main-content-wrap') || main.parentElement;
    (wrap || document.body).appendChild(aside);

    // Active highlighting
    if ('IntersectionObserver' in window) {
      const links = $$('a.page-toc__link', aside);
      const byId = new Map(links.map((a) => [a.getAttribute('href')?.slice(1), a]));
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const a = byId.get(e.target.id);
            if (!a) return;
            links.forEach((x) => x.classList.remove('is-active'));
            a.classList.add('is-active');
          });
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] }
      );
      headings.forEach((h) => obs.observe(h));
    }
  }

  function injectBackToTop() {
    if ($('#back-to-top')) return;
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<span aria-hidden="true">↑</span>';
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
    document.body.appendChild(btn);

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      btn.classList.toggle('is-visible', y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function slashToSearch() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
      if (typing) return;
      const input = $('#search-input') || $('input[type="search"]');
      if (!input) return;
      e.preventDefault();
      input.focus();
    });
  }

  function markReady() {
    document.body.classList.add('ui-ready');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    injectThemeToggle();
    injectScrollProgress();
    enhanceCodeBlocks();
    buildToc();
    injectBackToTop();
    slashToSearch();
    markReady();
  });
})();

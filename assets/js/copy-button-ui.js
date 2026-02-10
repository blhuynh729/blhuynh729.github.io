// Lightweight UI factory for the copy button.
// Exposes `window.createCopyButton()` which returns a DOM `button` element.
(function () {
  function createCopyButton() {
    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Z" fill="currentColor"/>
        <path d="M20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" fill="currentColor"/>
      </svg>
      <span class="copy-label">Copy</span>
    `;
    return btn;
  }

  if (!window.createCopyButton) window.createCopyButton = createCopyButton;
})();

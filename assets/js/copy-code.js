document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("div.highlighter-rouge").forEach((block) => {
    const code = block.querySelector("pre code");
    if (!code) return;

    // Create accessible status node for screen readers
    let status = block.querySelector('.copy-status');
    if (!status) {
      status = document.createElement('span');
      status.className = 'copy-status';
      status.setAttribute('aria-live', 'polite');
      status.style.position = 'absolute';
      status.style.left = '-9999px';
      block.appendChild(status);
    }

    // Create button (use UI factory if provided)
    let btn;
    if (window.createCopyButton && typeof window.createCopyButton === 'function') {
      btn = window.createCopyButton();
    } else {
      btn = document.createElement('button');
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
    }

    // show on keyboard focus as well
    btn.addEventListener('focus', () => btn.classList.add('focused'));
    btn.addEventListener('blur', () => btn.classList.remove('focused'));

    async function doCopy() {
      const text = code.innerText.replace(/\r\n/g, '\n').trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // fallback
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Visual feedback
        btn.classList.add('copied');
        const label = btn.querySelector('.copy-label');
        if (label) label.textContent = 'Copied!';
        status.textContent = 'Code copied to clipboard.';

        setTimeout(() => {
          btn.classList.remove('copied');
          if (label) label.textContent = 'Copy';
          status.textContent = '';
        }, 1500);
      } catch (err) {
        console.error('Copy failed', err);
        status.textContent = 'Copy failed.';
      }
    }

    btn.addEventListener('click', doCopy);

    // allow Ctrl/Cmd+C when button focused
    btn.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        doCopy();
      }
    });

    // append button (placed after content so it's stacked above)
    block.appendChild(btn);
  });
});

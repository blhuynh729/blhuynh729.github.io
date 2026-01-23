document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("div.highlighter-rouge").forEach((block) => {
    const code = block.querySelector("pre code");
    if (!code) return;

    // Create button
    const btn = document.createElement("button");
    btn.className = "copy-code-btn";
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Z" fill="currentColor"/>
        <path d="M20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" fill="currentColor"/>
      </svg>
      <span>Copy</span>
    `;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        btn.classList.add("copied");
        btn.querySelector("span").textContent = "Copied!";

        setTimeout(() => {
          btn.classList.remove("copied");
          btn.querySelector("span").textContent = "Copy";
        }, 1500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });

    block.appendChild(btn);
  });
});

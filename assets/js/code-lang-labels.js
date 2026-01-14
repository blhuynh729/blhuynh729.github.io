document.addEventListener("DOMContentLoaded", () => {
  // Finds all Rouge-highlighted blocks and adds a readable language label.
  document.querySelectorAll("div.highlighter-rouge").forEach((wrap) => {
    const code = wrap.querySelector("code");
    if (!code) return;

    // Find "language-xxx" class
    const langClass = [...code.classList].find((c) => c.startsWith("language-"));
    if (!langClass) return;

    const raw = langClass.replace("language-", "").trim();
    if (!raw) return;

    // Map to nice display names
    const map = {
      js: "JavaScript",
      javascript: "JavaScript",
      ts: "TypeScript",
      typescript: "TypeScript",
      py: "Python",
      python: "Python",
      cpp: "C++",
      c: "C",
      ino: "Arduino",
      arduino: "Arduino",
      bash: "Terminal",
      sh: "Terminal",
      shell: "Terminal",
      powershell: "PowerShell",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      yaml: "YAML",
      yml: "YAML",
      md: "Markdown",
    };

    const display = map[raw.toLowerCase()] || raw.toUpperCase();
    wrap.setAttribute("data-lang", display);
  });
});

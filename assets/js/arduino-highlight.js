document.addEventListener("DOMContentLoaded", () => {
  const arduinoFns = [
    "pinMode", "digitalWrite", "digitalRead", "analogRead", "analogWrite",
    "delay", "delayMicroseconds", "millis", "micros",
    "attachInterrupt", "detachInterrupt", "interrupts", "noInterrupts",
    "shiftIn", "shiftOut", "tone", "noTone", "pulseIn",
    "map", "constrain", "min", "max", "abs", "sqrt", "pow", "sin", "cos", "tan"
  ];

  // target code blocks that are already highlighted by your highlighter
  document.querySelectorAll("pre.highlight code, .highlight pre code, pre code").forEach(codeEl => {
    // Only touch HTML that already exists (spans etc.)
    let html = codeEl.innerHTML;

    // 1. Wrap Arduino built-ins (they get priority)
    const arduinoPattern = new RegExp(`\\b(${arduinoFns.join("|")})\\b(?=\\s*(?:<[^>]*>)*\\s*\\()`, "g");
    if (!html.includes(`class="arduino-fn"`)) {
      html = html.replace(arduinoPattern, `<span class="arduino-fn">$1</span>`);
    }

    // 2. Wrap ALL function calls (identifiers followed by paren) in function-call class
    // This catches user-defined functions. Exclude control structures by negative lookbehind pattern.
    // Skip if we've already wrapped it as arduino-fn
    const functionCallPattern = /\b([a-zA-Z_]\w*)\b(?=\s*(?:<[^>]*>)*\s*\()/g;
    html = html.replace(functionCallPattern, (match, name) => {
      // Don't double-wrap if already an arduino-fn
      if (match.includes('class="arduino-fn"')) {
        return match;
      }
      // Wrap user-defined functions
      return `<span class="fn-call">${name}</span>`;
    });

    codeEl.innerHTML = html;
  });
});


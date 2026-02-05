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

    // Wrap matches that are whole words and followed by '(' (function call)
    const pattern = new RegExp(`\\b(${arduinoFns.join("|")})\\b(?=\\s*\\()`, "g");

    // Avoid double-wrapping
    html = html.replace(pattern, `<span class="arduino-fn">$1</span>`);

    codeEl.innerHTML = html;
  });
});

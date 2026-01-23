---
title: Breadboard Questions?
nav_order: 1
parent: Need some Help?
layout: page
---

# Breadboards

A **breadboard** is a reusable prototyping board that lets you build circuits **without soldering**. It’s perfect for quickly testing ideas with an Arduino, sensors, LEDs, resistors, and ICs.

---

## What a breadboard is made of

A typical breadboard has:

- **Terminal strips** (the main grid where you plug components)
- **Power rails** (long columns on the sides, usually marked red/blue)
- A **center gap** (the trench down the middle for DIP chips)

---

## How the connections work

### Terminal strips (main grid)

In the middle area, holes are connected in **groups of 5**:

- Each **row of 5 holes** is electrically connected **horizontally**
- This is true on **both sides** of the center gap
- The **center gap breaks the connection**, so left and right sides are not connected to each other

**Rule of thumb:**  
If two component leads are in the *same 5-hole row*, they are connected.

---

### Center gap (for DIP chips)

The center gap is designed so that **DIP ICs** (like the L293D, 74HC595, op-amps, etc.) can straddle the gap:

- Pins on the **left side** connect to the left terminal strip
- Pins on the **right side** connect to the right terminal strip
- The chip’s pins do **not** accidentally short together

---

### Power rails

The rails run vertically down the side(s):

- Often marked **red (+)** and **blue (-)**
- Typically connected **vertically** along the rail
- Some breadboards have rails that are **split in the middle** (top half not connected to bottom half)

✅ **Always verify if your rails are continuous or split** using:
- the breadboard markings, or
- a quick continuity check with a multimeter, or
- a simple LED test circuit.

---

## Common breadboard patterns

### 1) Supplying power

1. Connect Arduino **5V** to the **+ rail**
2. Connect Arduino **GND** to the **- rail**
3. If you use both left and right rails, **bridge them** with jumper wires:
   - + to +, and - to -

---

### 2) Placing a resistor + LED (basic series circuit)

Typical safe LED wiring:

- Arduino digital pin → **resistor** → **LED anode (+)**
- LED cathode (-) → **GND rail**

Suggested resistor values:
- 220 Ω (bright)
- 330 Ω (slightly dimmer)
- 1 kΩ (dim but very safe)

---

### 3) Adding a button (with a pull-down)

A stable button input needs a pull-up or pull-down resistor.

Example pull-down:
- One side of button → **5V**
- Other side of button → Arduino input pin
- Input pin → **10 kΩ** → GND

(Alternative: use `pinMode(pin, INPUT_PULLUP)` and wire button to GND.)

---

## Common mistakes (and how to avoid them)

### Mistake: Thinking rows connect vertically
In the main grid, the 5-hole groups connect **horizontally**, not vertically.

**Fix:** Rotate parts or move leads into the same 5-hole row if you want them connected.

---

### Mistake: Power rails aren’t actually connected end-to-end
Many breadboards split the rails halfway.

**Fix:** Add a jumper wire bridging the two rail halves.

---

### Mistake: No common ground between supplies
If you power a motor or sensor from an external supply, the Arduino must share ground.

**Fix:** Connect **external supply GND → Arduino GND**.

---

### Mistake: Shorting the rails
A misplaced jumper can connect + to - directly.

**Fix:** Double-check rail connections before powering. If something gets hot, unplug immediately.

---

## Quick checklist before powering a circuit

- [ ] Arduino 5V goes to **+ rail**
- [ ] Arduino GND goes to **- rail**
- [ ] Components that should be connected share the **same 5-hole row**
- [ ] DIP chips straddle the **center gap**
- [ ] Rails are bridged if they’re split
- [ ] External supplies share **common ground**
- [ ] No accidental + to - shorts

---

## Next steps

- Try building: **LED + resistor**
- Then: **button input**
- Then: a simple IC (like **L293D motor driver**) straddling the gap
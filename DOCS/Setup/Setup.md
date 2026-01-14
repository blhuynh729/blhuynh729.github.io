---
title: Help with Setup?
nav_order: 1
parent: Need some Help?
layout: page
---

# Setup

This page will help you get your Arduino environment ready so you can run the example code and build the wiring diagrams in this course.

---

## What you need

### Hardware
- Arduino Uno (or compatible)
- USB cable (USB-B for Uno, USB-C/Micro-USB for some boards)
- Breadboard
- Jumper wires (male-male, and some male-female)
- Resistors kit (especially 220Ω, 330Ω, 1kΩ, 10kΩ)

### Software
- Arduino IDE (recommended) **or** Arduino Web Editor
- USB driver (only needed for some clone boards)

---

## Install the Arduino IDE

1. Download Arduino IDE (v2.x recommended) from the official Arduino website.
2. Install it like a normal app.
3. Open the IDE once after installing.

---

## Connect your board

1. Plug your Arduino into your computer using the USB cable.
2. The **ON** light on the Arduino should turn on.

If nothing lights up:
- try a different USB cable (some cables are “power-only”)
- try a different USB port

---

## Select the correct Board and Port

### Choose the board
In Arduino IDE:
- **Tools → Board → Arduino AVR Boards → Arduino Uno**  
(or choose your specific board model)

### Choose the port
- **Tools → Port → (select the port that appears when you plug the board in)**

Tip: If you’re unsure which port is correct, unplug the Arduino and see which port disappears — that was it.

---

## Upload your first test program (Blink)

1. In Arduino IDE: **File → Examples → 01.Basics → Blink**
2. Click **Upload** (right arrow button)

You should see the built-in LED on the Arduino blink once per second.

If it worked ✅ you are ready for the course.

---

## Common issues and fixes

### “Port not found” or no port shows up
- Try a different USB cable
- Try a different USB port
- Restart Arduino IDE
- On Windows: install the driver for your board (common with CH340 clone boards)

### “Upload failed” / “avrdude” errors
- Make sure **Tools → Board** and **Tools → Port** are correct
- Close any program using the port (Serial Monitor, other IDEs)
- Try pressing **Reset** once right before uploading

### Serial Monitor doesn’t show anything
- Make sure baud rate matches the code (commonly `9600`)
- Try unplugging/replugging the board
- Add a small delay after `Serial.begin(...)` if needed

---

## How wiring will be shown in this course

Each sensor page includes:
- **Parts list**
- **Wiring table** (sensor pin → Arduino pin)
- **Example code**
- **Troubleshooting**

**Important safety note:** Never connect a component if you’re unsure about power (5V vs 3.3V). Ask first.

---

## Course wiring conventions (recommended)

- Red wire: **5V**
- Black wire: **GND**
- Yellow/White: **Signal**
- Blue/Green: **I2C/SPI lines** (when used)

---

## Next steps

Go to **Sensors** in the sidebar and start with:
- **Movement and Location → PIR Motion Sensor**
- **Movement and Location → Ultrasonic Sensor**

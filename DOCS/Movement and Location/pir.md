---
title: PIR Motion Sensor
parent: Movement and Location
nav_order: 1
---

# PIR Motion Sensor

## What does it detect?
Detects motion using infrared radiation from warm objects.

## Parts Required
- Arduino
- PIR sensor
- Breadboard
- Jumper wires

## Wiring

| PIR Pin | Arduino Pin |
|--------|------------|
| VCC | 5V |
| OUT | 7 |
| GND | GND |

## Example Code

```cpp
int pirPin = 7;

void setup() {
  pinMode(pirPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  int motion = digitalRead(pirPin);
  if (motion == HIGH) {
    Serial.println("Motion detected!");
  }
  delay(500);
}



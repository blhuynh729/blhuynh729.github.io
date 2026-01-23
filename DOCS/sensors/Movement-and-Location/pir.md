---
title: Did an Object Move? (PIR Sensor)
parent: Movement and Location
layout: page
nav_order: 2
---

# PIR Motion Sensor

PIR stands for [“passive infrared” or “passive IR”](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/how-pirs-work) motion sensor. These sensors detect whether large mammals (such as dogs or humans) are moving within 20 feet of the sensor; PIR sensors are often used to operate automatic lights.

All bodies emit infrared light, but warm bodies emit more infrared light. The PIR sensor has two pyroelectric sensors that detect infrared light; when the difference between the pyroelectric sensors changes, the PIR sensor registers this as detecting motion.


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
```


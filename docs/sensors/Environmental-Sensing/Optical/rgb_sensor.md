---
title: RGB Color Sensor
layout: page
nav_order: 3
parent: Optical
grand_parent: "Environmental Sensing"
---
# RGB Color Sensor

The TCS34725 is a digital RGB color sensor that detects the red, green, and blue components of light, as well as clear (unfiltered) light intensity. It communicates over I2C and includes an IR blocking filter for more accurate color measurement. This sensor can be used in projects involving color sorting, color matching, or ambient light detection.

{% include figure.html src="/assets/images/environmental_sensors/rgb_sensor/rgb_sensor.png" caption="RGB Color Sensor" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/rgb_sensor/rbg_sensor_pinout.png" caption="RGB Color Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VIN | 5V | Power supply (3.3V–5V) |
| GND | GND | Common ground |
| SDA | SDA (A4) | I2C data line |
| SCL | SCL (A5) | I2C clock line |
| LED | — | Onboard LED enable (can leave unconnected, or connect to a digital pin to control) |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/rgb_sensor/rgb_sensor_wiring.png" caption="RGB Color Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect VIN to 5V and GND to ground. Connect SDA to Arduino pin A4 and SCL to Arduino pin A5 (the default I2C pins on the Arduino Uno). The onboard LED can be left connected by default to illuminate the surface being measured, or tied to a digital pin if you want to control it.

## Example Code

The `Adafruit_TCS34725` library must first be downloaded from the Arduino Library Manager.

```cpp
#include <Wire.h>
#include "Adafruit_TCS34725.h"

// Initialize the sensor with integration time and gain
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);

void setup() {
  Serial.begin(9600);

  if (tcs.begin()) {
    Serial.println("Found TCS34725 sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }
}

void loop() {
  uint16_t r, g, b, c;

  // Read raw red, green, blue, and clear values
  tcs.getRawData(&r, &g, &b, &c);

  Serial.print("R: "); Serial.print(r); Serial.print("  ");
  Serial.print("G: "); Serial.print(g); Serial.print("  ");
  Serial.print("B: "); Serial.print(b); Serial.print("  ");
  Serial.print("C: "); Serial.println(c);

  delay(500);
}
```

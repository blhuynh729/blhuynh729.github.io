---
title: Oximeter
layout: page
nav_order: 2
parent: Biometrics
grand_parent: "Human Sensing and Controls"
---
# Oximeter

{% include figure.html src="/assets/images/human_sensing_and_controls/oximeter/oximeter.png" caption="Pulse Oximeter (MAX30102)" caption_prefix="Fig 1:" width="60%" %}

A pulse oximeter measures blood oxygen saturation (SpO2) by shining red and infrared light through the skin and comparing how much of each wavelength is absorbed. Oxygenated blood absorbs more infrared light, while deoxygenated blood absorbs more red light. The ratio between these measurements is used to estimate SpO2 percentage. A commonly used module is the MAX30102 or MAX30105.

## Pinout

{% include figure.html src="/assets/images/human_sensing_and_controls/oximeter/oximeter_pinout.png" caption="MAX30102 Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VIN | 3.3V or 5V | Power supply |
| GND | GND | Common ground |
| SDA | SDA (A4) | I2C data line |
| SCL | SCL (A5) | I2C clock line |
| INT | — | Optional interrupt pin (can be left unconnected for basic use) |

## Wiring

{% include figure.html src="/assets/images/human_sensing_and_controls/oximeter/oximeter_wiring.png" caption="Oximeter Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect VIN to 3.3V (or 5V if the module has a voltage regulator), GND to ground, SDA to Arduino pin A4, and SCL to Arduino pin A5. Place your finger gently over the sensor window to take readings.

## Example Code

The `SparkFun_MAX3010x` library must first be downloaded from the Arduino Library Manager. Search for "SparkFun MAX3010x" and install it.

```cpp
#include <Wire.h>
#include "MAX30105.h"

MAX30105 particleSensor;

void setup() {
  Serial.begin(9600);
  Serial.println("MAX30102 Oximeter Test");

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 was not found. Check wiring.");
    while (1);
  }

  // Configure sensor with default settings
  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x0A);  // Turn Red LED low to indicate sensor is running
  particleSensor.setPulseAmplitudeIR(0x1F);    // Set IR LED brightness
}

void loop() {
  long irValue = particleSensor.getIR();
  long redValue = particleSensor.getRed();

  // A basic check: if IR value is low, no finger is detected
  if (irValue < 50000) {
    Serial.println("No finger detected. Place your finger on the sensor.");
  } else {
    Serial.print("IR: ");
    Serial.print(irValue);
    Serial.print("  Red: ");
    Serial.println(redValue);
  }

  delay(100);
}
```

**Note:** For accurate SpO2 and BPM calculations, use the `heartRate.h` and `spo2_algorithm.h` files included with the SparkFun library. The example above outputs raw IR and Red values as a starting point.

---
title: Microphone
layout: page
nav_order: 1
parent: Acoustic
grand_parent: "Environmental Sensing"
---
# Microphone (Mic Amp)

A microphone amplifier (mic amp) module detects sound and outputs an analog signal proportional to the sound level. These modules typically include a small electret microphone and an onboard amplifier. They can be used in projects to detect claps, measure ambient noise, or trigger actions based on sound.

A commonly used module is the MAX4466 or MAX9814 electret microphone amplifier breakout.

{% include figure.html src="/assets/images/environmental_sensors/acoustic/microphone_amp.png" caption="Microphone Amplifier Module" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/acoustic/microphone_amp_pinout.png" caption="Microphone Amplifier Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 3.3V or 5V | Power supply |
| GND | GND | Common ground |
| OUT | Analog Pin (A0) | Amplified audio signal output |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/acoustic/microphone_amp_wiring.png" caption="Microphone Amplifier Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect VCC to 3.3V (or 5V depending on the module), GND to ground, and OUT to an analog input pin. In the example below, A0 is used. Some modules also have a small potentiometer on the back to adjust the gain (sensitivity).

## Example Code

The code below reads the analog output from the microphone and calculates a simple peak-to-peak amplitude over a sample window, which represents the volume level.

```cpp
const int micPin = A0;
const int sampleWindow = 50; // Sample window width in ms (50 ms = 20Hz)

void setup() {
  Serial.begin(9600);
}

void loop() {
  unsigned long startMillis = millis();
  unsigned int signalMax = 0;
  unsigned int signalMin = 1024;

  // Collect data for the duration of the sample window
  while (millis() - startMillis < sampleWindow) {
    int sample = analogRead(micPin);
    if (sample > signalMax) {
      signalMax = sample;
    }
    if (sample < signalMin) {
      signalMin = sample;
    }
  }

  unsigned int peakToPeak = signalMax - signalMin; // peak-to-peak amplitude
  float voltage = peakToPeak * (5.0 / 1023.0);     // convert to voltage

  Serial.print("Peak-to-Peak: ");
  Serial.print(peakToPeak);
  Serial.print(" | Voltage: ");
  Serial.println(voltage, 3);

  delay(100);
}
```

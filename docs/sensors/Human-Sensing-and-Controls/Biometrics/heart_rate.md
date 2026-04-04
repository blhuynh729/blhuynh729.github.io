---
title: Heart Rate Sensor
layout: page
nav_order: 1
parent: Biometrics
grand_parent: "Human Sensing and Controls"
---
# Heart Rate Sensor

{% include figure.html src="/assets/images/human_sensing_and_controls/heart_rate/heart_rate_sensor.png" caption="Heart Rate Sensor" caption_prefix="Fig 1:" width="60%" %}

A heart rate sensor detects your pulse by shining a light (usually green or infrared) into the skin and measuring the amount of light reflected back. As blood pulses through your veins, the amount of reflected light changes, allowing the sensor to detect each heartbeat. A commonly used module is the KY-039 or a basic pulse sensor (such as the PulseSensor from pulsesensor.com).

## Pinout

{% include figure.html src="/assets/images/human_sensing_and_controls/heart_rate/heart_rate_sensor_pinout.png" caption="Heart Rate Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| S (Signal) | Analog Pin (A0) | Analog pulse signal output |
| + (VCC) | 5V or 3.3V | Power supply |
| - (GND) | GND | Common ground |

## Wiring

{% include figure.html src="/assets/images/human_sensing_and_controls/heart_rate/heartrate_sensor_wiring.png" caption="Heart Rate Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect the signal pin (S) to an analog input pin (A0 in the example below), the + pin to 5V (or 3.3V depending on the module), and the - pin to GND. Place your fingertip gently on the sensor surface to get a reading.

## Example Code

The code below reads the analog value from the pulse sensor. The raw values fluctuate with each heartbeat — a simple threshold can be used to detect beats. For more accurate BPM calculation, consider using the [PulseSensor Playground library](https://github.com/WorldFamousElectronics/PulseSensorPlayground).

```cpp
const int pulsePin = A0;
int threshold = 550;          // Adjust based on your sensor and placement
bool beatDetected = false;
unsigned long lastBeatTime = 0;
int bpm = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(pulsePin);

  // Simple beat detection using threshold
  if (sensorValue > threshold && !beatDetected) {
    beatDetected = true;
    unsigned long currentTime = millis();
    unsigned long interval = currentTime - lastBeatTime;

    if (interval > 300 && interval < 2000) { // Filter out noise
      bpm = 60000 / interval;
      Serial.print("BPM: ");
      Serial.println(bpm);
    }

    lastBeatTime = currentTime;
  }

  if (sensorValue < threshold) {
    beatDetected = false;
  }

  delay(10);
}
```

---
title: Soil Moisture Sensor
layout: page
nav_order: 2
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Soil Moisture Sensor

The capacitive soil moisture sensor measures how wet soil is. This sensor is not terribly precise, and does not calibrate to output data in any particular units. To use the sensor it must be calibrated in a way that serves its intended use. [The code below requires that you collect the analog value for air and for water, then divides the values between those values into three categories: very wet, wet, and dry](https://www.datocms-assets.com/28969/1662716326-hw-101-hw-moisture-sensor-v1-0.pdf). There are other ways to calibrate the sensor and define its values, such as measuring fully wet soil, but ultimately the sensor will deliver qualitative, not quantitative measurements.

{% include figure.html src="/assets/images/environmental_sensors/soil_moisture/soil_moisture_image.png" caption="Soil Moisture Sensor" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/soil_moisture/soil_moisture_pinout.png" caption="Soil Moisture Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 5V | Power supply |
| GND | GND | Common ground |
| AOUT | Analog Pin (A0) | Analog output signal |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/soil_moisture/soil_moisture_wiring.png" caption="Soil Moisture Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect VCC to 5V, GND to ground, and AOUT to an analog input pin (A0 in the example below). Insert the sensor into the soil to take readings.

## Example Code

```cpp
const int AirValue = 520;    // you need to change this value that you had recorded in the air
const int WaterValue = 260;  // you need to change this value that you had recorded in the water
int intervals = (AirValue - WaterValue) / 3;
int soilMoistureValue = 0;

void setup() {
  Serial.begin(9600); // open serial port, set the baud rate to 9600 bps
}

void loop() {
  soilMoistureValue = analogRead(A0); // put Sensor insert into soil
  if (soilMoistureValue > WaterValue && soilMoistureValue < (WaterValue + intervals)) {
    Serial.println("Very Wet");
  }
  else if (soilMoistureValue > (WaterValue + intervals) && soilMoistureValue < (AirValue - intervals)) {
    Serial.println("Wet");
  }
  else if (soilMoistureValue < AirValue && soilMoistureValue > (AirValue - intervals)) {
    Serial.println("Dry");
  }
  delay(100);
}
```

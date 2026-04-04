---
title: Water Level Sensor
layout: page
nav_order: 3
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Water Level Sensor

## Capacitive Water Sensor

{% include figure.html src="/assets/images/environmental_sensors/water_level/water_level_sensor.png" caption="Water Level Sensor" caption_prefix="Fig 1:" width="60%" %}

[The capacitive water sensors generate a high signal when water hits the long lines on the capacitive plates](https://www.adafruit.com/product/4965#technical-details). The output may vary somewhat based on how much water hits the plates, but this sensor uses a binary sensor to detect whether or not the sensor is touching water.

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/water_level/water_level_sensor_pinout.png" caption="Water Level Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| + | 5V | Power supply |
| - | GND | Common ground |
| S | Analog Pin (A0) | Signal output |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/water_level/water_level_sensor_wiring.png" caption="Water Level Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

To wire the water sensor, connect the "-" pin to ground, the "+" pin to 5V and the "S" pin to an analog input pin for detecting the sensor signal. In the example code below, analog input pin 0 is used.

## Example Code

```cpp
/*
* ------------------------------------------------------------------------------
* This is example code of how to use the RED Water Level Sensor with the Arduino.
* ------------------------------------------------------------------------------
* Wiring directions
*
* VCC -> Arduino 5V
* GND -> Arduino GND
* S -> A0
*
* ------------------------------------------------------------------------------
* This code is for the RED Water Sensor
*
* It will detect if there is water present
* When it is submerged at all it is about 620
* If there is any water on it (residual or a drop) it will be 150-500
* No water = 0
* ------------------------------------------------------------------------------
*/

const int analogPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int analogVal = analogRead(analogPin);

  Serial.println(analogVal);

  if (analogVal > 500) // arbitrary number
  {
    // do something
  }
  else
  {
    // do something else
  }

  delay(1000);
}
```

---
title: Am I level? (digital tilt sensor)
layout: page
nav_order: 3
parent: "Orientation and Navigation"
grand_parent: "Motion and position sensing"
---
# Tilt Sensor

The tilt sensor outputs a digital signal indicating whether or not the sensor is level. It is used to detect orientation. Inside the sensor, there is a ball that makes contact with the pins when the case is upright. Tilt the sensor over and the balls don't touch, thus not making a connection.

{% include figure.html src="/assets/images/motion_and_position_sensors/tilt_sensor/tilt_sensor.png" caption="Tilt Sensor" caption_prefix="Fig 1:" width="60%" %}

[More info](https://www.dfrobot.com/product-77.html)

## Pinout

{% include figure.html src="/assets/images/motion_and_position_sensors/tilt_sensor/tilt_sensor_pinout.png" caption="Tilt Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| OUT | Digital Pin (3) | Output signal |
| VCC | 5V | Power supply |
| GND | GND | Common ground |

## Wiring

{% include figure.html src="/assets/images/motion_and_position_sensors/tilt_sensor/tilt_sensor_wiring.png" caption="Tilt Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect OUT to a digital pin (pin 3 in the example), VCC to Arduino 5V, and GND to Arduino GND.

## Example Code

```cpp
/*
* ------------------------------------------------------------------------------
* This is example code of how to use the Digital Tilt Sensor with the Arduino.
* ------------------------------------------------------------------------------
* Wiring directions (from LEFT TO RIGHT)
*
* OUT -> Pin 3
* VCC -> Arduino 5V
* GND -> Arduino GND
*/
int ledPin = 13;                      // Connect LED to pin 13
int switcher = 3;                     // Connect Tilt sensor to Pin3

void setup() {
  pinMode(ledPin, OUTPUT);            // Set digital pin 13 to output mode
  pinMode(switcher, INPUT);           // Set digital pin 3 to input mode
}

void loop() {
  if(digitalRead(switcher) == HIGH) { // Read sensor value
    digitalWrite(ledPin, HIGH);       // Turn on LED when the sensor is tilted
  } else {
    digitalWrite(ledPin, LOW);        // Turn off LED when the sensor is not triggered
  }
}
```

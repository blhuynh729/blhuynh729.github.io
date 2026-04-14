---
title: Submersible Temperature Sensor
layout: page
nav_order: 6
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Submersible Temperature Sensor

{% include figure.html src="/assets/images/environmental_sensors/submersible_temp/submerged_temp_sensor.png" caption="Submersible Temperature Sensor" link="https://arduinogetstarted.com/tutorials/arduino-temperature-sensor" caption_prefix="Fig 1:" width="60%" %}

The one-wire submerged temperature sensors read the temperature of water, and output data, instead of as an analog output, as a series of pulses. The "OneWire" and "DallasTemperature" libraries must be downloaded to translate those signals into temperature values.

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/submersible_temp/submerged_temp_sensor_pinout.png" caption="Submersible Temperature Sensor Pinout" link="https://www.aliexpress.com/i/2251832463242930.html?gatewayAdapt=4itemAdapt" caption_prefix="Fig 2:" width="60%" %}

| Wire/Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 5V | Power supply |
| GND | GND | Common ground |
| SIG | Digital Pin (4) | Data signal |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/submersible_temp/submerged_temp_sensor_wiring.png" caption="Submersible Temperature Sensor Wiring" link="https://arduinogetstarted.com/tutorials/arduino-temperature-sensor#google_vignette" caption_prefix="Fig 3:" width="80%" %}

To connect the module to the Arduino, connect VCC to 5V, GND to ground and SIG to a digital pin. In the example code below, digital pin 4 is used.

## Example Code

```cpp
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is connected to the Arduino digital pin 4
#define ONE_WIRE_BUS 4

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

void setup(void)
{
  // Start serial communication for debugging purposes
  Serial.begin(9600);
  // Start up the library
  sensors.begin();
}

void loop(void) {
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures();

  Serial.print("Celsius temperature: ");
  // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  Serial.print(sensors.getTempCByIndex(0));
  Serial.print(" - Fahrenheit temperature: ");
  Serial.println(sensors.getTempFByIndex(0));
  delay(1000);
}
```

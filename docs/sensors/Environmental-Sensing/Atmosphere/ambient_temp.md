---
title: Ambient Temperature Sensor
layout: page
nav_order: 1
parent: Atmosphere
grand_parent: "Environmental Sensing"
---
# Ambient Temperature Sensor
Ambient temperature sensors measure the air temperature around the sensor and output a signal you can read with an Arduino. These sensors can be used in projects like greenhouse monitoring, room comfort monitors, and any system that needs to react to heat (turning on a fan, triggering alarms, etc.).

One of the most common ambient temperature sensors used for this class is the TMP36. The TMP36 is an analog temperature sensor, meaning it outputs a voltage that changes smoothly with temperature. The Arduino reads that voltage using an analog input pin (A0–A5) and converts it into a temperature value.

{% include figure.html src="/assets/images/environmental_sensors/ambient_temp/ambient_temp_sensor.png" caption="TMP36 Ambient Temperature Sensor" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/ambient_temp/ambient_temp_pinout.png" caption="TMP36 Pinout" caption_prefix="Fig 2:" width="60%" %}

With the flat side facing you and the legs pointing downward:

| TMP36 Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| +Vs | 5V | Takes in 2.7-5.5V for Power |
| Vout | Analog Pin | The temperature signal that will be read |
| GND | GND | Must share common ground with Arduino |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/ambient_temp/ambient_temp_wiring.png" caption="Wiring for TMP36 sensor" caption_prefix="Fig 3:" width="80%" %}

To wire the TMP36 temperature sensor, connect the Arduino 5V to the sensor's +Vs pin, and connect the Arduino ground to the sensor's GND pin. To read the temperature data from the TMP36, connect the sensor's Vout (OUT) pin to an Arduino analog input pin. For our example, we connected Vout to A0.

## Converting the Reading to Temperature

To turn the TMP36 reading into an interpretable temperature value, there are two primary steps to take.

1. **Convert the read bits into voltage**

   When you read from the analog pin, the Arduino converts the analog signal into digital using a 10-bit analog to digital converter (ADC). The resulting value ranges from 0 to 1023 bits. This bit value can then be mapped into voltage using the relationship that 0 bits corresponds to 0.0V and 1023 bits corresponds to approximately 5.0V.

   `voltage = ADCbits * (5.0 / 1023.0)`

2. **Convert the voltage into temperature**

   The TMP36 was engineered such that the temperature, in celsius, can be directly calculated using:

   `TempC = (voltage - 0.5) * 100`

## Example Code

```cpp
const int temp_pin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int bits = analogRead(temp_pin);

  // Convert ADC reading to voltage
  float voltage = bits * (5.0 / 1023.0);

  // TMP36: 0.5V offset, 10mV per deg C
  float tempC = (voltage - 0.5) * 100.0;

  Serial.print("Raw: ");
  Serial.print(bits);
  Serial.print(" | V: ");
  Serial.print(voltage, 3);
  Serial.print(" | TempC: ");
  Serial.println(tempC, 1);

  delay(1000);
}
```

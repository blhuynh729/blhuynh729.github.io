---
title: Ambient Temperature Sensor
layout: page
nav_order: 2
parent: Environmental Sensors
---
# Ambient Temperature Sensor
--- 
Ambient temperature sensors measure the air temperature around the sensor and output a signal you can read with an Arduino. These sensors can be used in projects like greenhouse monitoring, room comfort monitors, and any system that needs to react to heat (turning on a fan, triggering alarms, etc.).

One of the most common ambient temperature sensors used for this class is the TMP36. The TMP36 is an analog temperature sensor, meaning it outputs a voltage that changes smoothly with temperature. The Arduino reads that voltage using an analog input pin (A0–A5) and converts it into a temperature value.


{%include figure.html src="/assets/images/components/sensors/tmp_36.jpg" caption="Image of TMP 36 sensor" width = "60%" link="https://www.adafruit.com/product/165?srsltid=AfmBOooTGwxKLsPFQ2FJ7tr43eBsvh276IYVaKMpOEjXb2NZx1ToVAF8" caption_prefix="Fig 1:"%}



## Pinout
---
{%include figure.html src="/assets/images/pinouts/sensors/tmp_36_pinout.gif" caption="Image of TMP 36 sensor" width = "60%" link="https://lastminuteengineers.com/tmp36-temperature-sensor-arduino-tutorial/" caption_prefix="Fig 2:"%}


**Important**: With the flat side facing you and the legs pointing downward:

| TMP36 Pin | Connect to Arduino | Description |
|---|---|---|
| +Vs | 5V | Takes in 2.7–5.5V for Power |
| Vout | Analog Pin | The temperature signal that will be read |
| GND | GND | Must share common ground with Arduino |


## Wiring
---
{%include figure.html src="/assets/images/wiring/sensors/tmp_36_wiring.png" caption="Wiring of TMP 36 sensor" width = "60%" caption_prefix="Fig 3:"%}


To wire the TMP 36 temperature sensor, connect the Arduino 5V to the sensor’s +Vs pin, and connect the Arduino ground to the sensor’s GND pin. To read the temperature data from the TMP 36, connect the sensor’s Vout (OUT) pin to an Arduino analog input pin. For our example, we connected Vout to A0. 

To turn the TMP 36 reading into an interpretable temperature value, there are two primary steps to take. 
1. Convert the read bits into voltage 
2. Convert the Voltage into temperature


$\sqrt{3x-1}+(1+x)^2$


This sentence uses $\` and \`$ delimiters to show math inline: $`\sqrt{3x-1}+(1+x)^2`$

## Example Code for TMP36

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
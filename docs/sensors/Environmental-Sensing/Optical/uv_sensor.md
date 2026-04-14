---
title: UV Sensor
layout: page
nav_order: 2
parent: Optical
grand_parent: "Environmental Sensing"
---
# UV Sensors

There are several UV sensor options available for use with Arduino.

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/uv_sensor.png" caption="UV Sensors" caption_prefix="Fig 1:" link="https://www.adafruit.com/product/1777?srsltid=AfmBOopa54S_ALWKZ8D6tx_udLVJz38WwnADzi0Y04JyjLUX1DP8CZB2" width="60%" %}

---

## SI1145

The SI1145 can read visible, infrared, and ultraviolet light. The UV index is calculated based on the visible and IR light. The board can potentially be used for proximity testing, but the LED pin would need to be connected to three IR LEDs.

### Wiring

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/SI1145_wiring.png" caption="SI1145 Wiring" link="https://dronebotworkshop.com/arduino-uv-index-meter/" caption_prefix="Fig 2:" width="80%" %}

Connect the sensor using I2C (SDA and SCL pins). Install the `Adafruit_SI1145` library.

### Example Code

```cpp
#include <Wire.h>
#include "Adafruit_SI1145.h"

// This is the library specific to the adafruit device
Adafruit_SI1145 uv = Adafruit_SI1145();

void setup() {
  Serial.begin(9600);

  Serial.println("UV deck reading");

  // Checks to see if the UV sensor is connected
  if (! uv.begin()) {
    Serial.println("Didn't find Si1145");
    while (1);
  }

  Serial.println("OK!");
}

void loop() {
  // You can pull three different values from the sensor: Visible, Infrared and Ultraviolet light
  float UVindex = uv.readUV();
  float Visible = uv.readVisible();
  float IR = uv.readIR();
  // the index is multiplied by 100 so to get the
  // integer index, divide by 100!
  UVindex /= 100.0;

  float Proximity = uv.readProx();
  Serial.print("UV: ");
  Serial.println(UVindex);
  Serial.print("Visible: ");
  Serial.println(Visible);
  Serial.print("IR: ");
  Serial.println(IR);

  delay(1000);
}
```

---

## VEML6070

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/VEML6070.png" caption="VEML6070 UV Sensor" link="https://www.cytron.io/p-veml6070-uv-index-sensor-module?srsltid=AfmBOoojlCoVYyCFV2GJbeHd0jR168gR_n6h3P8yRS5XH_87zVzL97-X" caption_prefix="Fig 3:" width="60%" %}

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/veml6070_wiring.png" caption="VEML6070 Wiring" link="https://theorycircuit.com/arduino-projects/veml6070-uv-sensor-arduino-interface/" caption_prefix="Fig 4:" width="80%" %}

### Example Code

```cpp
#include <Wire.h>
#include "Adafruit_VEML6070.h"

Adafruit_VEML6070 uv = Adafruit_VEML6070();

void setup() {
  Serial.begin(9600);
  Serial.println("VEML6070 Test");
  uv.begin(VEML6070_1_T);
}

void loop() {
  uint16_t uvLevel = uv.readUV();
  Serial.print("UV light level: ");
  Serial.println(uvLevel);

  delay(1000);
}
```
---

## Analog UV Sensor

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/analog_uv_sensor.png" caption="Analog UV Sensor" link="https://www.adafruit.com/product/1918?srsltid=AfmBOor058NrJqWa4SfD0Oe9LT_kRwo6st76fHY5EzFNXnGflay0mnUx" caption_prefix="Fig 5:" width="60%" %}

{% include figure.html src="/assets/images/environmental_sensors/uv_sensor/analog_uv_sensor_wiring.png" caption="Analog UV Sensor Wiring" link="https://electropeak.com/learn/interfacing-uvm30a-uv-light-sensor-module-with-arduino/?srsltid=AfmBOooDV6jxOELGB7tGn8gb1bnfsS0EtcXlDHWq0kMsgi21mgEliUrZ" caption_prefix="Fig 6:" width="80%" %}

### Wiring

Connect the output pin to an analog input pin (e.g., A0), VCC to 5V, and GND to ground.

### Example Code

```cpp
// Initializes serial monitor
void setup() {
  Serial.begin(9600);
}

void loop() {
  // Reads output from analog pin A0
  int analogUV = analogRead(A0);

  // Converts analog value into voltage, then multiplies by 10 to get UV index
  float UV = 10.0 * analogUV * (5.0 / 1023.0);

  Serial.print("UV light level: ");
  Serial.println(UV);

  delay(1000);
}
```

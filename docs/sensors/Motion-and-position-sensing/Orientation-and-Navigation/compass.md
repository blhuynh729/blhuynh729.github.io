---
title: Which way is north? (compass)
layout: page
nav_order: 2
parent: "Orientation and Navigation"
grand_parent: "Motion and position sensing"
---
# Compass (Magnetometer)

A magnetometer (digital compass) detects the direction and strength of magnetic fields, including the Earth's magnetic field. By reading the magnetic field on the X and Y axes, you can calculate the compass heading and determine which way is north. A commonly used module is the HMC5883L 3-axis digital compass. The LSM303 module also includes a magnetometer — see the [LSM303 Accelerometer and Compass](accelerometer_and_compass) page for a combined approach.

**Note:** Magnetometers are sensitive to nearby magnetic fields from electronics (laptops, motors, etc.), so keep the sensor away from such devices for accurate readings.

## Pinout (HMC5883L)

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 3.3V or 5V | Power supply |
| GND | GND | Common ground |
| SDA | SDA (A4) | I2C data line |
| SCL | SCL (A5) | I2C clock line |

## Wiring

Connect VCC to 3.3V (or 5V if the module has a voltage regulator), GND to ground, SDA to Arduino pin A4, and SCL to Arduino pin A5. Install the `Adafruit_HMC5883_U` and `Adafruit_Sensor` libraries from the Arduino Library Manager.

## Example Code

```cpp
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_HMC5883_U.h>

// Assign a unique ID to this sensor
Adafruit_HMC5883_Unified mag = Adafruit_HMC5883_Unified(12345);

void setup() {
  Serial.begin(9600);
  Serial.println("HMC5883L Compass Test");

  if (!mag.begin()) {
    Serial.println("No HMC5883L detected ... check your wiring!");
    while (1);
  }
}

void loop() {
  sensors_event_t event;
  mag.getEvent(&event);

  Serial.print("X: "); Serial.print(event.magnetic.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event.magnetic.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event.magnetic.z); Serial.print("  ");
  Serial.println("uT");

  // Calculate heading from X and Y magnetic values
  // This assumes the sensor is lying flat
  float heading = atan2(event.magnetic.y, event.magnetic.x);

  // Normalize to 0-360 degrees
  if (heading < 0) {
    heading += 2 * PI;
  }

  // Convert radians to degrees
  float headingDegrees = heading * 180.0 / PI;

  Serial.print("Heading: ");
  Serial.print(headingDegrees);
  Serial.println(" degrees");

  delay(500);
}
```

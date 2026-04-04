---
title: Which way is down? (accelerometer)
layout: page
nav_order: 1
parent: "Orientation and Navigation"
grand_parent: "Motion and position sensing"
---
# Accelerometer

An accelerometer measures the direction and magnitude of acceleration forces acting on the sensor, including gravity. By reading the acceleration on the X, Y, and Z axes, you can determine which way is "down" (gravity pulls at ~9.8 m/s²), detect tilt, freefall, or sudden movement. A commonly used module is the ADXL345, a 3-axis digital accelerometer that communicates over I2C or SPI.

For projects that need both an accelerometer and a compass (magnetometer), see also the [LSM303 Accelerometer and Compass](accelerometer_and_compass) page.

## Pinout (ADXL345)

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 5V or 3.3V | Power supply |
| GND | GND | Common ground |
| SDA | SDA (A4) | I2C data line |
| SCL | SCL (A5) | I2C clock line |
| CS | 5V | Chip select (tie HIGH for I2C mode) |

## Wiring

Connect VCC to 5V (or 3.3V), GND to ground, SDA to Arduino pin A4, and SCL to Arduino pin A5. Tie the CS pin to 5V to select I2C communication mode. Install the `Adafruit_ADXL345_U` and `Adafruit_Sensor` libraries from the Arduino Library Manager.

## Example Code

```cpp
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

// Assign a unique ID to this sensor
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

void setup() {
  Serial.begin(9600);
  Serial.println("ADXL345 Accelerometer Test");

  if (!accel.begin()) {
    Serial.println("No ADXL345 detected ... check your wiring!");
    while (1);
  }

  // Set the range (2G, 4G, 8G, or 16G)
  accel.setRange(ADXL345_RANGE_2_G);
}

void loop() {
  sensors_event_t event;
  accel.getEvent(&event);

  Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event.acceleration.z); Serial.print("  ");
  Serial.println("m/s^2");

  // When the sensor is flat, Z should read ~9.8 m/s^2 (gravity)
  if (event.acceleration.z > 9.0) {
    Serial.println("Sensor is roughly level (flat).");
  }

  delay(500);
}
```

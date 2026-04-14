---
title: How am I moving? (accelerometer, compass, and gyroscope)
layout: page
nav_order: 3
parent: "Orientation and Navigation"
grand_parent: "Motion and position sensing"
---

# Accelerometer, Compass, and Gyroscope

The LSM9DS1 has three sensors: an accelerometer, a gyroscope, and a magnetometer. The accelerometer detects the direction and magnitude of forces on the sensor, the gyroscope measures rotational rate around each axis, and the magnetometer detects the direction and magnitude of magnetic fields.

{% include figure.html src="/assets/images/motion_and_position_sensors/accelerometer_compass/LSM9DS1.png" caption="The breakout board of the LSM9DS1" link="https://learn.adafruit.com/adafruit-lsm9ds1-accelerometer-plus-gyro-plus-magnetometer-9-dof-breakout/overview" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/motion_and_position_sensors/accelerometer_compass/LSM9DS1_Pinout.png" caption="Pins of a LSM9DS1" link="https://learn.adafruit.com/adafruit-lsm9ds1-accelerometer-plus-gyro-plus-magnetometer-9-dof-breakout/pinouts" caption_prefix="Fig 2:" width="60%" %}

As you can see, there are many pins on the LSM9DS1, but we only need 4 of them.

| Pin | Function | Description |
| :---- | :---- | :---- |
| VIN | Power Supply | Supplies 5V to sensor |
| GND | Common Ground | Common Ground |
| SDA | Serial Data | I2C data line |
| SCL | Serial Clock | I2C clock line |

## Wiring

{% include figure.html src="/assets/images/motion_and_position_sensors/accelerometer_compass/LSM9DS1_wiring.png" caption="Wiring for LSM9DS1" link="https://learn.adafruit.com/adafruit-lsm9ds1-accelerometer-plus-gyro-plus-magnetometer-9-dof-breakout/arduino-code" caption_prefix="Fig 3:" width="80%" %}

Connect the Vin to 5V and Gnd to ground. Connect the SCL and SDA pins to the respective pins on the Arduino. To operate the board, you'll need to download the "Adafruit_Sensor" and "Adafruit_LSM9DS1" libraries in the Arduino IDE.

## Example Code

The code below outputs acceleration, gyroscope, and magnetic data on the x, y, and z axes.

* The acceleration data is referenced as `accelEvent.acceleration.[]`
* The gyroscope data is referenced as `gyroEvent.gyro.[]`
* The magnetic data is referenced as `magEvent.magnetic.[]`

Where `[]` is x, y, or z.

The code is programmed to light up the built-in LED when acceleration in the z axis is greater than 9.5 m/s², which is to say when the sensor is roughly flat.

For the magnetic data, the code assumes that the sensor is lying flat, and uses arctangent to determine the heading direction of the sensor. The result is a compass heading in degrees from 0 to 360, where 0° is North, 90° is East, 180° is South, and 270° is West.

> **Note:** The magnetometer is easily disrupted by the magnetic fields of nearby electric appliances such as laptops, so getting accurate compass readings in practice can be difficult. Good luck!

```cpp
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LSM9DS1.h>

// This is the desired direction of travel
// expressed as a 0-360 degree compass heading
// 0.0   = North
// 90.0  = East
// 180.0 = South
// 270.0 = West
const float targetHeading = 0.0;
const float Pi = 3.14159;

/* Create LSM9DS1 object */
Adafruit_LSM9DS1 lsm = Adafruit_LSM9DS1();

void setupSensor() {
  // Set accelerometer range
  lsm.setupAccel(lsm.LSM9DS1_ACCELRANGE_2G);

  // Set magnetometer sensitivity
  lsm.setupMag(lsm.LSM9DS1_MAGGAIN_4GAUSS);

  // Set gyroscope range
  lsm.setupGyro(lsm.LSM9DS1_GYROSCALE_245DPS);
}

void setup(void) {
#ifndef ESP8266
  while (!Serial);
#endif
  Serial.begin(9600);
  Serial.println("LSM9DS1 Test"); Serial.println("");

  pinMode(LED_BUILTIN, OUTPUT);

  /* Initialise the sensor */
  if (!lsm.begin()) {
    Serial.println("Ooops, no LSM9DS1 detected ... Check your wiring!");
    while (1);
  }

  setupSensor();
}

void loop(void) {
  /* Get a new sensor event */
  sensors_event_t accelEvent, magEvent, gyroEvent, tempEvent;
  lsm.getEvent(&accelEvent, &magEvent, &gyroEvent, &tempEvent);

  // Light up LED when sensor is roughly flat (z acceleration close to gravity)
  if (accelEvent.acceleration.z > 9.5) {
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  /* Display acceleration (m/s^2) */
  Serial.print("acceleration: ");
  Serial.print("X: "); Serial.print(accelEvent.acceleration.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(accelEvent.acceleration.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(accelEvent.acceleration.z); Serial.print("  ");
  Serial.println("m/s^2");

  /* Display gyroscope data (degrees per second) */
  Serial.print("gyroscope: ");
  Serial.print("X: "); Serial.print(gyroEvent.gyro.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(gyroEvent.gyro.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(gyroEvent.gyro.z); Serial.print("  ");
  Serial.println("dps");

  /* Display magnetic data (micro-Tesla) */
  Serial.print("magnetic data: ");
  Serial.print("X: "); Serial.print(magEvent.magnetic.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(magEvent.magnetic.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(magEvent.magnetic.z); Serial.print("  ");
  Serial.println("uT");

  // Calculate heading in degrees (0-360)
  float heading = atan2(magEvent.magnetic.y, magEvent.magnetic.x) * 180.0 / Pi;

  if (heading < 0) {
    heading = 360 + heading;
  }

  Serial.print("heading: "); Serial.println(heading);
  Serial.println("/");

  /* Delay before the next sample */
  delay(1000);
}
```

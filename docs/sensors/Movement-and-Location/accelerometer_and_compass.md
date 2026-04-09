---
title: Which way is down? (accelerometer and compass)
parent: Movement and Location
layout: page
nav_order: 1
---

# LSM303

The LSM303 has two sensors: an accelerometer and a magnetometer. The accelerometer detects the direction and magnitude of forces on the sensor, while the magnetometer detects the direction and magnitude of magnetic fields.

# Wiring
Connect the Vin to 5V and Gnd to ground. Connect the SCL and SDA pins to the respective pins on the arduino. To operate the board, you’ll need to download the “Adafruit_Sensor” and “Adafruit_LSM303DLHC” libraries in the Arduino IDE.



# Example Code
```cpp
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LSM303_U.h>


// This is the desired direction of travel
// expressed as a 0-360 degree compass heading
// 0.0 = North
// 90.0 = East
// 180.0 = South
// 270 = West
const float targetHeading = 0.0;
const float Pi = 3.14159;


/* Assign a unique ID to this sensor at the same time */
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(54321);


/* Assign a unique ID to this sensor at the same time */
Adafruit_LSM303_Mag_Unified mag = Adafruit_LSM303_Mag_Unified(12345);


void setup(void)
{
#ifndef ESP8266
  while (!Serial);     // will pause Zero, Leonardo, etc until serial console opens
#endif
  Serial.begin(9600);
  Serial.println("Accelerometer Test"); Serial.println("");


  /* Initialise the sensor */
  if(!accel.begin())
  {
    /* There was a problem detecting the ADXL345 ... check your connections */
    Serial.println("Ooops, no LSM303 detected ... Check your wiring!");
    while(1);
  }
  mag.enableAutoRange(true);


  /* Initialise the sensor */
  if(!mag.begin())
  {
    /* There was a problem detecting the LSM303 ... check your connections */
    Serial.println("Ooops, no LSM303 detected ... Check your wiring!");
    while(1);
  }


}


void loop(void)
{
  /* Get a new sensor event */
  sensors_event_t event;
  accel.getEvent(&event);
 
  if(event.acceleration.z>9.5){
  digitalWrite(LED_BUILTIN,HIGH);
  }
  else{
    digitalWrite(LED_BUILTIN,LOW);
  }


  /* Display the results (acceleration is measured in m/s^2) */
  Serial.print("acceleration: ");
  Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event.acceleration.z); Serial.print("  ");
  Serial.println("m/s^2 ");


  /* Note: You can also get the raw (non unified values) for */
  /* the last data sample as follows. The .getEvent call populates */
  /* the raw values used below. */
  //Serial.print("X Raw: "); Serial.print(accel.raw.x); Serial.print("  ");
  //Serial.print("Y Raw: "); Serial.print(accel.raw.y); Serial.print("  ");
  //Serial.print("Z Raw: "); Serial.print(accel.raw.z); Serial.println("");


  /* Get a new sensor event */
  sensors_event_t event2;
   mag.getEvent(&event2);


  /* Display the results (magnetic vector values are in micro-Tesla (uT)) */
  Serial.print("magnetic data: ");
  Serial.print("X: "); Serial.print(event2.magnetic.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event2.magnetic.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event2.magnetic.z); Serial.print("  ");


   // Calculate the angle of the vector y,x
  float heading = (atan2(event2.magnetic.y,event2.magnetic.x));  // Normalize to 0-360
   
  if (heading < 0)
 
  { heading = 360 + heading;
  }
   
  Serial.print("heading: "); Serial.println(heading);
  Serial.println("/");


  /* Note: You can also get the raw (non unified values) for */
  /* the last data sample as follows. The .getEvent call populates */
  /* the raw values used below. */
  // Serial.print("X Raw: "); Serial.print(mag.raw.x); Serial.print("  ");
  // Serial.print("Y Raw: "); Serial.print(mag.raw.y); Serial.print("  ");
  // Serial.print("Z Raw: "); Serial.print(mag.raw.z); Serial.println("");


  /* Delay before the next sample */
  delay(1000);
}



```
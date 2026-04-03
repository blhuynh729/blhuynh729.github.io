---
title: Servo Motors
layout: page
nav_order: 3
parent: Common Components
---

# Micro Servos
Micro servo motors are compact and precise actuators used in robotics, hobby projects, and RC vehicles. They typically offer 180 degrees of rotation and operate on 4.8V-6V DC. 


{% include figure.html src="/assets/images/common_components/servo_motors/servo_motor.png" caption="Image of Servo Continuous motor" link="https://www.newark.com/dfrobot/dfr0063/lcd-display-module-i2c-16x2-arduino/dp/52AJ4987" width = "60%" caption_prefix="Fig 1:" %}


## Pinout


## Wiring


## Example Code

```cpp
// C++ code
//
/*
  Sweep


  by BARRAGAN <http://barraganstudio.com>
  This example code is in the public domain.


  modified 8 Nov 2013  by Scott Fitzgerald
  http://www.arduino.cc/en/Tutorial/Sweep
*/


#include <Servo.h>


int pos = 0;
int servo_num = 9;


Servo servo;


void setup()
{
  servo.attach(servo_num, 500, 2500);
}


void loop()
{
  // sweep the servo from 0 to 180 degrees in steps
  // of 1 degrees
  for (pos = 0; pos <= 180; pos += 1) {
    // tell servo to go to position in variable 'pos'
    servo.write(pos);
    // wait 15 ms for servo to reach the position
    delay(15); // Wait for 15 millisecond(s)
  }
  for (pos = 180; pos >= 0; pos -= 1) {
    // tell servo to go to position in variable 'pos'
    servo.write(pos);
    // wait 15 ms for servo to reach the position
    delay(15); // Wait for 15 millisecond(s)
  }
}



```
---
title: Step Motors
layout: page
nav_order: 2
parent: Common Components
---

# Step Motors
A stepper motor is a brushless, synchronous electric motor that converts digital pulses into precise mechanical rotation. In other words, the stepper motor rotates in small, fixed “steps” in comparison to spinning freely like a DC motor. Each step is a known angle (e.g., 1.8° per step = 200 steps per revolution), allowing for precise control through a sequence of pulses to its coils.

Steppers are great for repeatable positioning (3D printers, CNC machines, camera sliders, robotics joints). They typically need a stepper driver (e.g., A4988, DRV8825, TMC drivers) as an Arduino/microcontroller is unable to provide the required current. 


{%include figure.html src="/assets/images/common_components/stepper_motors/stepper_motor.jpg" caption="Image of Stepper Motor" width = "60%" link="https://www.adafruit.com/product/918?srsltid=AfmBOoqkdKM4TfWzcxklg3zFAh1jiX8pufIN6j_QLNabiMXqBBOpznym/" caption_prefix="Fig 1:" %}

## Pinout
Since the stepper motor driver will be controlling the stepper motor, we will be describing the pinout of the stepper motor driver board.

For our class, we will be using the TLN2003 Stepper motor driver board to control the stepper motor. 

{%include figure.html src="/assets/images/common_components/stepper_motors/ULN2003_stepper_motor_driver.png" caption="Image of the ULN2003 Stepper Motor Driver" link="https://lastminuteengineers.com/28byj48-stepper-motor-arduino-tutorial/" width = "60%" caption_prefix="Fig 2:"%}

| Pin              | Function |
|------------------|----------|
| IN1 - IN4        | The control inputs that send the step sequence to the motor. These connect to the Arduino’s digital output pins. |
| GND              | Ground pin |
| VCC              | Supplies 5V to motor. Note: since the motor draws a lot of current, it is recommended to supply power to the motor using external power supply over Arduino 5V pin. |
| Motor Connection | Location where motor connects with motor board driver |



## Wiring
{%include figure.html src="/assets/images/common_components/stepper_motors/stepper_motor_wiring.png" caption="Image of the ULN2003 Stepper Motor Driver" link="https://lastminuteengineers.com/28byj48-stepper-motor-arduino-tutorial/" caption_prefix="Fig 3:" %}

 ***IMPORTANT NOTE:***
A stepper motor driver board should never be powered directly with an Arduino. The digital output pins on an Arduino cannot supply enough current to safely power the motor driver. Attempting to do so may damage the Arduino.
{: .callout-warning }

## Example Code
```cpp
* ------------------------------------------------------------------------------
* This is example code of how to use the Stepper Motor with the Arduino.
* ------------------------------------------------------------------------------
*
* INSTALL LIBRARY Stepper.h
*
* Wiring directions
*
* IN1 -> Pin 8
* IN2 -> Pin 9
* IN3 -> Pin 10
* IN4 -> Pin 11
*
* (+) -> Arduino 5V
* (-) -> Arduino GND
*
*/




// Include the Arduino Stepper.h library:
#include "Stepper.h"




// Define number of steps per rotation:
const int stepsPerRevolution = 2048; //DO NOT CHANGE THIS




// Create stepper object called 'myStepper', note the pin order:
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11); //Yes, the order is supposed to be 8, 10, 9, 11




void setup() {
 // Set the speed to 10 rpm:
 myStepper.setSpeed(10); //MAXIMUM SPEED IS 25
  // Begin Serial communication at a baud rate of 9600:
 Serial.begin(9600);
}




void loop() {
 int angleDeg = 720; //This is how many degrees you want the stepper motor to turn/rotate
 int steps = map(angleDeg, 0, 360, 0, stepsPerRevolution); //Converts angle in degrees to the number of steps you want to take, you can exceed 360 degrees
 Serial.println(angleDeg);




 // Step one revolution in one direction:
 Serial.println("clockwise");
 myStepper.step(steps);
 delay(500);
  // Step one revolution in the other direction:
 Serial.println("counterclockwise");
 myStepper.step(-steps);
 delay(500);
}


```

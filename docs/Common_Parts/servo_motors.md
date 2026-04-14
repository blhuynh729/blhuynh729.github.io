---
title: Servo Motors
layout: page
nav_order: 3
parent: Common Components
---

# Micro Servos
Micro servo motors are compact actuators commonly used in robotics, hobby projects, and RC vehicles. They operate on 4.8V–6V DC and are controlled with a PWM (Pulse Width Modulation) signal. There are two main types you'll encounter: **positional (standard) servos** and **continuous rotation servos**. Both look nearly identical and share the same wiring, but they behave very differently in code.

## Positional vs. Continuous Servos

| Feature | Positional Servo | Continuous Rotation Servo |
| :---- | :---- | :---- |
| Motion | Rotates to a specific angle (typically 0°–180°) and holds | Spins continuously in either direction |
| `servo.write(value)` meaning | Target **angle** in degrees (0–180) | **Speed and direction** (0 = full reverse, 90 = stop, 180 = full forward) |
| Typical uses | Robot arms, steering, camera tilt, flaps, levers | Drive wheels, conveyor belts, rotating sensors |
| Internal feedback | Has a potentiometer for position feedback | Feedback removed/disabled — no position sensing |

A handy way to remember it: with a positional servo, the number you write is *where to go*. With a continuous servo, the number you write is *how fast to spin and which way*.

{% include figure.html src="/assets/images/common_components/servo_motors/servo_motor.jpg" caption="Image of a micro servo motor" link="https://www.adafruit.com/product/2442?srsltid=AfmBOopg6rnFvNuGf2fM2NcqItRWsj-XKYtzNb_4wgXFj8UOJjJq3-jp" width = "60%" caption_prefix="Fig 1:" %}


## Pinout

Both positional and continuous servos use the same three-wire interface.

{% include figure.html src="/assets/images/common_components/servo_motors/servo_motor_pinout.png" caption="Pinout of micro Servo motor" link="https://lastminuteengineers.com/servo-motor-arduino-tutorial/" caption_prefix="Fig 2:" width="60%" %}

| Pin | Function | Description |
| :---- | :---- | :---- |
| 5V (red wire) | Power | Supplies 5V to the servo |
| GND (brown wire) | Ground | Ground pin |
| Data/Control (yellow/orange wire) | Control Signal from Arduino | Receives a PWM signal. Controls position (positional) or speed/direction (continuous) |

## Wiring

{% include figure.html src="/assets/images/common_components/servo_motors/servo_motor_wiring.png" caption="Servo Motor Wiring" caption_prefix="Fig 3:" width="80%" %}

On the servo motor, wire the brown pin to ground (GND), the red pin to 5V, and the orange/yellow wire to pin 9. Wiring is identical for both servo types.

## Example Code — Positional Servo

This example sweeps a positional servo back and forth between 0° and 180°.

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
  // sweep the servo from 0 to 180 degrees in steps of 1 degree
  for (pos = 0; pos <= 180; pos += 1) {
    servo.write(pos);    // tell servo to go to position in variable 'pos'
    delay(15);           // wait 15 ms for servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) {
    servo.write(pos);
    delay(15);
  }
}
```

## Example Code — Continuous Rotation Servo

For a continuous rotation servo, `servo.write()` sets speed and direction instead of an angle. This example spins forward, stops, then spins in reverse.

```cpp
#include <Servo.h>

int servo_num = 9;
Servo servo;

void setup()
{
  servo.attach(servo_num, 500, 2500);
}

void loop()
{
  servo.write(180);   // full speed forward
  delay(2000);

  servo.write(90);    // stop
  delay(1000);

  servo.write(0);     // full speed reverse
  delay(2000);

  servo.write(90);    // stop
  delay(1000);
}
```

> **Tip:** If your continuous servo creeps slowly when you call `servo.write(90)`, it needs to be calibrated. Most continuous servos have a small trim potentiometer on the bottom — adjust it with a screwdriver while writing 90 until the motor stops fully.
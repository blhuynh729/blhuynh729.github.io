---
title: Is there something sitting here? (force sensor)
layout: page
nav_order: 2
parent: "Proximity and Presence"
grand_parent: "Motion and position sensing"
---
# Force Sensitive Resistor (FSR)

{% include figure.html src="/assets/images/motion_and_position_sensors/force_sensor/force_sensitive_resistor.png" caption="Force Sensitive Resistor" caption_prefix="Fig 1:" width="60%" %} 

A force-sensitive resistor (FSR) decreases in resistance the more force is applied to it. When no force is applied it has practically infinite resistance. At small amounts of force the resistance changes very rapidly, then levels out. [At large forces the nonlinear relationship can be linearized on a log-log graph](https://learn.adafruit.com/force-sensitive-resistor-fsr).

Force-sensitive resistors aren't ideal for determining exact weights, but can be used to differentiate between a "light" and "heavy" object.

## Pinout

{% include figure.html src="/assets/images/motion_and_position_sensors/force_sensor/force_sensitive_resistor_pinout.png" caption="FSR Pinout" caption_prefix="Fig 2:" width="60%" %}

The ends of a FSR are ambiguous — either end can be used to complete the wiring.

## Wiring

{% include figure.html src="/assets/images/motion_and_position_sensors/force_sensor/force_sensitive_resistor_wiring.png" caption="FSR Wiring" caption_prefix="Fig 3:" width="80%" %}

FSRs need to be connected in series with a standard resistor to convert the change of resistance into a change in voltage. The diagram below shows wiring with a 1 kilohm resistor.

Connect one end of the FSR to power, the other end to Analog 0. Then connect one end of a 1K resistor from Analog 0 to ground.

If you are interested in learning how to use the voltage to change the brightness of an LED, refer to [Adafruit's overview on FSRs](https://learn.adafruit.com/force-sensitive-resistor-fsr/using-an-fsr).

## Example Code

The example code below takes the reading from analog pin A0. If the reading is above 300, then the yellow LED turns on.

```cpp
// C++ code
//
int sensor = 0;
int led_pin = 8;

void setup()
{
  pinMode(A0, INPUT);
  pinMode(led_pin, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  sensor = analogRead(A0);
  if (sensor > 300) {
    digitalWrite(led_pin, HIGH);
  } else {
    digitalWrite(led_pin, LOW);
  }
  Serial.print("sensor = ");
  Serial.println(sensor);
  delay(100); // Wait for 100 millisecond(s)
}
```

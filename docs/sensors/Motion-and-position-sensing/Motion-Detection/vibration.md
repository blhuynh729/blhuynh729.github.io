---
title: Am I vibrating? (vibration sensor)
layout: page
nav_order: 2
parent: "Motion Detection"
grand_parent: "Motion and position sensing"
---
# Vibration Sensor

The vibration sensor converts vibration into an electric signal.

{% include figure.html src="/assets/images/motion_and_position_sensors/vibration/vibration_sensor.png" caption="Vibration Sensor" link="https://www.keyestudio.com/products/keyestudio-analog-piezoelectric-ceramic-vibration-sensor-for-arduino" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/motion_and_position_sensors/vibration/vibration_sensor_pinout.png" caption="Vibration Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

The ceramic disc is the actual sensor, which connects to the breakout board.

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| NC | 5V | Power supply |
| - | GND | Common ground |
| S | Analog Pin (A0) | Signal output |

## Wiring

{% include figure.html src="/assets/images/motion_and_position_sensors/vibration/vibration_sensor_wiring.png" caption="Vibration Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

The device is very simple. Connect "NC" on the breakout board to 5V and "-" to ground. Connect the "S" pin to an analog input pin.

## Example Code

Below is example code from the [keyestudio wiki](https://wiki.keyestudio.com/Ks0272_keyestudio_Analog_Piezoelectric_Ceramic_Vibration_Sensor):

```cpp
void setup()
{
  Serial.begin(9600); // Open the serial to set the baud rate for 9600bps
}

void loop()
{
  int val;
  val = analogRead(0); // Connect the analog piezoelectric ceramic vibration sensor to analog interface 0
  Serial.print("Vibration is ");
  Serial.println(val, DEC); // Print the analog value read via serial port
  delay(100);
}
```

This code outputs the analog value from the sensor to the serial monitor. In a practical application you will likely not output that value, as it is not particularly meaningful, but you might decide that above certain analog values the sensor is vibrating.

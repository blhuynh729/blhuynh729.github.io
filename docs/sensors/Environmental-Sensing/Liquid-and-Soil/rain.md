---
title: Rain Sensor
layout: page
nav_order: 1
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Rain Sensor

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor.png" caption="Rain Sensor Module" caption_prefix="Fig 1:" width="60%" %}

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_components.png" caption="Rain Sensor Components" caption_prefix="Fig 2:" width="60%" %}

[The rain sensor is a capacitive sensor capable of detecting whether or not moisture is present on the capacitive plate, or estimating rain intensity.](https://urolakostapk.wordpress.com/wp-content/uploads/2016/10/yl-83-rain-detector-datasheet_low.pdf) To operate the sensor, make sure the plate is connected to the module.

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_pinout.png" caption="Rain Sensor Pinout" caption_prefix="Fig 3:" width="60%" %}

Connect the module's VCC and GND pins to 5V and ground, respectively. The module has two outputs:

- **DO pin** — outputs "high" if sufficient water is on the plate; the threshold can be adjusted by turning the little screw in the blue plastic box (trimpot).
- **AO pin** — gives the analog output of the sensor.

The plate also has a heating element, though it will take some time for it to warm up. The heating element allows the plate to dry quickly, so that rain droplets don't accumulate too much, making the plate's output more directly tied to current rain intensity.

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_wiring.png" caption="Rain Sensor Wiring" caption_prefix="Fig 4:" width="80%" %}

Connect VCC to 5V, GND to ground, and AO to an analog input pin (A0 in the example below).

## Example Code

The code below uses the analog output connected to analog input pin 0. It divides the analog value sensor range into five ranges; when sensor values are within the lower two ranges, it outputs "heavy rain" or "light rain."

```cpp
const int sensorMin = 0;     // sensor minimum
const int sensorMax = 1023;  // sensor maximum

void setup() {
  // initialize serial communication @ 9600 baud:
  Serial.begin(9600);
}

void loop() {
  // read the sensor on analog A0:
  int sensorReading = analogRead(A0);
  // map the sensor range (four options):
  int range = map(sensorReading, sensorMin, sensorMax, 0, 4);

  // range value:
  switch (range) {
    case 0:    // Sensor getting wet
      Serial.println("Heavy Rain");
      break;
    case 1:    // Sensor dry
      Serial.println("Light Rain");
      break;
    default:
      Serial.println("No Rain");
      break;
  }
  delay(1000);  // delay between reads
}
```

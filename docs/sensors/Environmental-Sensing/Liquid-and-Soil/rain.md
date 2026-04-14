---
title: Rain Sensor
layout: page
nav_order: 1
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Rain Sensor

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor.png" caption="Rain Sensor Module" caption_prefix="Fig 1:" width="60%" %}

[The rain sensor is a capacitive sensor capable of detecting whether or not moisture is present on the capacitive plate, or estimating rain intensity.](https://urolakostapk.wordpress.com/wp-content/uploads/2016/10/yl-83-rain-detector-datasheet_low.pdf)

The rain sensor consists of a sensing pad with a series of exposed copper traces. These traces are not connected to each other but are bridged by water when rain falls on the pad. This forms a variable resistor, much like a potentiometer, where the resistance changes based on the amount of water present on the pad.

Therefore,

* When there is water present, conductivity increases while the resistance decreases.
* When there is less water present, the conductivity decreases and the resistance increases.

Since the resistance decreases when water is present, this results in a lower voltage output. Likewise, when the resistance is high, this indicates a lack of water, resulting in a higher voltage output.

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_components.png" caption="Rain Sensor Components" caption_prefix="Fig 2:" link="https://newbiely.com/tutorials/arduino-nano/arduino-nano-rain-sensor#google_vignette" width="60%" %}

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_pinout.png" caption="Rain Sensor Pinout" caption_prefix="Fig 3:" link="https://lastminuteengineers.com/rain-sensor-arduino-tutorial/" width="60%" %}

| Pin | Function | Description |
| :---- | :---- | :---- |
| VCC | Supplies Power | Supplies 5V |
| GND | Common Ground | Common Ground |
| A0 | Analog Out | Gives a variable voltage that corresponds to the amount of water on the sensing pad |
| D0 | Digital Out | LOW when the amount of water on the sensing pad exceeds the threshold value set by the potentiometer, and HIGH otherwise. |

Note: You can adjust the sensitivity of the sensing pad by turning the screw on the trimpot (blue plastic box) on the module.

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/rain_sensor/rain_sensor_wiring.png" caption="Rain Sensor Wiring" caption_prefix="Fig 4:" link="https://lastminuteengineers.com/rain-sensor-arduino-tutorial/" width="80%" %}

Connect VCC to 5V (or a digital pin) and GND to ground. Connect D0 to a digital pin and A0 to an analog pin.

## Example Code

The code below is intended to use the analog output, connected to analog input pin 0. It divides the analog value sensor range into five ranges; when sensor values are within the lower two ranges, it outputs "heavy rain" or "light rain."

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
  // ex: 'long int map(long int, long int, long int, long int, long int)'
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

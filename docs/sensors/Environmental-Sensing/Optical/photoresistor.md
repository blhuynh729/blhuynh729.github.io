---
title: Photoresistor
layout: page
nav_order: 1
parent: Optical
grand_parent: "Environmental Sensing"
---
# Photoresistor

A photoresistor, or light-dependent resistor (LDR), is an electronic component whose resistance decreases as the intensity of light increases. In other words, as more light hits the sensor, the resistance decreases and allows more electricity to flow through.

A common application is utilizing the photoresistor as a simple night-light circuit: the Arduino reads the light level from the photoresistor, and if the environment is dark (low light), the Arduino turns an LED on. If the environment is bright, the LED stays off.


{% include figure.html src="/assets/images/environmental_sensors/photoresistor/photoresistor_image.jpg" caption="Photoresistor" link="https://content.instructables.com/FBD/AXY7/IANRP4H2/FBDAXY7IANRP4H2.jpg?auto=webp" caption_prefix="Fig 1:" width="60%" %}


## Pinout

Photoresistors are two-terminal resistors whose resistance changes with light. Therefore, unlike other sensors, there are no specific pins for GND or VCC. In other words, either terminal can be used to supply the input voltage or ground.

{% include figure.html src="/assets/images/environmental_sensors/photoresistor/photoresistor_pinout.png" caption="Photoresistor Terminals" caption_prefix="Fig 2:" width="60%" %}


## Wiring

The wiring below represents a circuit that mimics a simple night-light, meaning when the environment is dark, the light turns on and vice-versa.

{% include figure.html src="/assets/images/environmental_sensors/photoresistor/photoresistor_wiring.png" caption="Wiring for photoresistor for a simple night-light circuit" caption_prefix="Fig 3:" width="80%" %}

To build this circuit, connect the Arduino 5V pin to one terminal of the photoresistor (in our case, Terminal 1). Connect the other terminal of the photoresistor (Terminal 2) to a 10 kOhm resistor that runs to GND. The point where the photoresistor and the 10 kOhm resistor meet is the junction. Connect this junction to an Arduino analog input pin (for example, A5). This forms a voltage divider, allowing the Arduino to read a changing voltage that corresponds to the light level.

There is also an LED that is wired to GND and a 220 Ohm resistor that runs from the Anode to a digital pin.

## Example Code

```cpp
// C++ code
//
int led_pin = 13;

void setup() {
  Serial.begin(9600);
  pinMode(led_pin, OUTPUT);
}

void loop() {
  int value = analogRead(A5);
  Serial.println("Analog Value: ");
  Serial.println(value);

  // if the value from the photoresistor is greater than 450
  // LED turns on, else the LED is off
  if (value > 450) {
    digitalWrite(led_pin, LOW);
  } else {
    digitalWrite(led_pin, HIGH);
  }

  delay(500);
}
```

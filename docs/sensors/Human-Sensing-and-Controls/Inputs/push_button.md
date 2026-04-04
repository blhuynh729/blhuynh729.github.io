---
title: Push Button and Switch
layout: page
nav_order: 1
parent: Inputs
grand_parent: "Human Sensing and Controls"
---
# Push Button and Switch

{% include figure.html src="/assets/images/human_sensing_and_controls/push_button/pushbutton.png" caption="Push Button" caption_prefix="Fig 1:" width="60%" %}

A push button is a simple momentary switch that completes a circuit when pressed and breaks it when released. A toggle switch, by contrast, stays in the position you set it to (on or off). Both are commonly used to control LEDs, trigger actions, or navigate menus in Arduino projects.

## Pinout

A standard push button has 4 legs. The legs are connected in pairs internally — pressing the button connects the two pairs together.

| Pin | Description |
| :---- | :---- |
| Leg 1 / Leg 2 | Connected internally (one side of the switch) |
| Leg 3 / Leg 4 | Connected internally (other side of the switch) |

## Wiring

Connect one side of the push button to a digital pin (pin 2 in the example below) and the other side to GND. The code uses the Arduino's built-in pull-up resistor (`INPUT_PULLUP`), so no external resistor is needed. When the button is not pressed, the pin reads HIGH. When pressed, the pin reads LOW.

Alternatively, you can wire one side to 5V and the other side to a digital pin with a 10K pull-down resistor to GND.

## Example Code

The code below turns the built-in LED on when the button is pressed and off when it is released.

```cpp
const int buttonPin = 2;

void setup() {
  pinMode(buttonPin, INPUT); 
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == LOW) { // LOW means button is pressed (with pull-up)
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("Button pressed!");
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  delay(50); // Small delay for debouncing
}
```

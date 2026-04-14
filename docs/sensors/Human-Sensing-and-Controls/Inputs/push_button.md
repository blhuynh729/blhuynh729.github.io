---
title: Push Button and Switch
layout: page
nav_order: 1
parent: Inputs
grand_parent: "Human Sensing and Controls"
---
# Push Button and Switch

{% include figure.html src="/assets/images/human_sensing_and_controls/push_button/pushbutton.png" caption="Push Button" link="https://en.hwlibre.com/button/#google_vignette" caption_prefix="Fig 1:" width="60%" %}

A push button is a simple momentary switch that completes a circuit when pressed and breaks it when released. A toggle switch, by contrast, stays in the position you set it to (on or off). Both are commonly used to control LEDs, trigger actions, or navigate menus in Arduino projects.

## Pinout

{% include figure.html src="/assets/images/human_sensing_and_controls/push_button/pushbutton_pinout.png" caption="Push Button Pinout" caption_prefix="Fig 2:" width="60%" %}

A standard push button has 4 legs. The legs are connected in pairs internally - pressing the button connects the two pairs together.

| Pin | Description |
| :---- | :---- |
| Leg 1 / Leg 4 | Connected internally (one side of the switch) |
| Leg 2 / Leg 3 | Connected internally (other side of the switch) |

## Wiring

{% include figure.html src="/assets/images/human_sensing_and_controls/push_button/pushbutton_wiring.png" caption="Push Button Wiring" caption_prefix="Fig 3:" width="80%" %}

Connect terminal 2 pin to a digital pin (pin 4 in the example below). On the directly diagonal pin, terminal pin 4, connect 5V. On the neighboring pin, terminal pin 3, connect the push button to ground. Add in a pull-down resistor (10 kOhm) between the terminal pin 3 and GND. When the button is not pressed, the pin reads LOW. When pressed, the pin reads HIGH.

   > **Note:** The 5V and GND have to be on the same side of the push button. It must be using both Terminal Pins 1 and 2, or Terminal Pins 3 and 4. 
   {: .callout-note }

## Example Code

The code below turns the built-in LED on when the button is pressed and off when it is released.

```cpp
// C++ code
//


int LED_PIN = 8;
int BUTTON_PIN = 4;
bool button_pressed = false;


void setup()
{
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
 
}


void loop()
{
  button_pressed = digitalRead(BUTTON_PIN);
 
  if(button_pressed == HIGH){
   digitalWrite(LED_PIN, HIGH);
  } else {
   digitalWrite(LED_PIN, LOW);
  }
}

```

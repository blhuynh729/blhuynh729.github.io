---
title: Rotary Encoder
layout: page
nav_order: 2
parent: Inputs
grand_parent: "Human Sensing and Controls"
---
# Rotary Encoder

{% include figure.html src="/assets/images/human_sensing_and_controls/rotary_encoder/rotary_encoder.png" caption="Rotary Encoder" link="https://rudysarduinoprojects.wordpress.com/2019/04/05/fun-with-arduino-25-rotary-encoder-with-switch/" caption_prefix="Fig 1:" width="60%" %}

The rotary encoder can be used to increase and decrease a number. The encoder has "clicks" when it rotates — each click will increase or decrease the number. If you press the knob it will reset the value back to 0.

## Pinout

{% include figure.html src="/assets/images/human_sensing_and_controls/rotary_encoder/rotary_encoder_pinout.png" caption="Rotary Encoder Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| CLK | Digital Pin (2) | Clock signal |
| DT | Digital Pin (3) | Data signal |
| SW | Digital Pin (4) | Switch (button press) |
| + | 5V | Power supply |
| GND | GND | Common ground |

## Wiring

{% include figure.html src="/assets/images/human_sensing_and_controls/rotary_encoder/rotary_encoder_wiring.png" caption="Rotary Encoder Wiring" link="https://circuitdigest.com/microcontroller-projects/rotary-encoder-module-interfacing-with-arduino" caption_prefix="Fig 3:" width="80%" %}

Connect CLK to pin 2, DT to pin 3, SW to pin 4, + to Arduino 5V, and GND to Arduino GND.

## Example Code

```cpp
/*
* ------------------------------------------------------------------------------
* This is example code of how to use the Rotary Encoder with the Arduino.
* ------------------------------------------------------------------------------
* Wiring directions
*
* CLK -> Pin 2
* DT -> Pin 3
* SW -> Pin 4
* + -> Arduino 5V
* GND -> Arduino GND
*
* ------------------------------------------------------------------------------
* This code uses the rotary encoder to increase and decrease a number.
* The encoder has "clicks" when it rotates, each click will increase or decrease the number.
* If you press the knob it will reset the value back to 0.
* ------------------------------------------------------------------------------
*/

// Rotary Encoder Inputs
#define CLK 2
#define DT 3
#define SW 4

int counter = 0;
int currentStateCLK;
int lastStateCLK;
String currentDir = "";
unsigned long lastButtonPress = 0;

void setup() {
  // Set encoder pins as inputs
  pinMode(CLK, INPUT);
  pinMode(DT, INPUT);
  pinMode(SW, INPUT_PULLUP);

  // Setup Serial Monitor
  Serial.begin(9600);

  // Read the initial state of CLK
  lastStateCLK = digitalRead(CLK);
}

void loop() {
  // Read the current state of CLK
  currentStateCLK = digitalRead(CLK);

  // If last and current state of CLK are different, then pulse occurred
  // React to only 1 state change to avoid double count
  if (currentStateCLK != lastStateCLK && currentStateCLK == 1) {

    // If the DT state is different than the CLK state then
    // the encoder is rotating CCW so decrement
    if (digitalRead(DT) == currentStateCLK) {
      counter--;
      currentDir = "CCW";
    } else {
      // Encoder is rotating CW so increment
      counter++;
      currentDir = "CW";
    }

    Serial.print("Direction: ");
    Serial.print(currentDir);
    Serial.print(" | Counter: ");
    Serial.println(counter);
  }

  // Remember last CLK state
  lastStateCLK = currentStateCLK;

  // Read the button state
  int btnState = digitalRead(SW);

  // If we detect LOW signal, button is pressed
  if (btnState == LOW) {
    // if 50ms have passed since last LOW pulse, it means that the
    // button has been pressed, released and pressed again
    if (millis() - lastButtonPress > 50) {
      Serial.println("Button pressed!");
      counter = 0;
      Serial.print("Direction: ");
      Serial.print(currentDir);
      Serial.print(" | Counter: ");
      Serial.println(counter);
    }

    // Remember last button press event
    lastButtonPress = millis();
  }

  // Put in a slight delay to help debounce the reading
  delay(1);
}
```

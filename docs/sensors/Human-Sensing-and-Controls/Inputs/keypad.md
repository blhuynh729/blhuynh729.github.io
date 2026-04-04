---
title: Keypad
layout: page
nav_order: 3
parent: Inputs
grand_parent: "Human Sensing and Controls"
---
# Keypad

{% include figure.html src="/assets/images/human_sensing_and_controls/keypad/keypad.png" caption="3x4 and 4x4 Keypads" caption_prefix="Fig 1:" width="60%" %}

The keypad is a matrix of push buttons indexed by row and column. A 3x4 keypad has 4 rows and 3 columns, and a 4x4 keypad has 4 rows and 4 columns.

By scanning through the rows and column pins, the Arduino detects pins to high/low then reading the voltage on other pins. The following example code detects when the buttons are pressed or released. The pressed buttons are output in the serial monitor, and the built-in LED lights up when the number 1 is pressed, then turned off when number 1 is released.

## Pinout

{% include figure.html src="/assets/images/human_sensing_and_controls/keypad/keypad_pinout.png" caption="Keypad Pinout" caption_prefix="Fig 2:" width="60%" %}

On a 3x4 keypad, C1-C3 and R1-R4 are the 7 wires that form a matrix of switches:

- R1, R2, R3, R4 = the 4 row lines
- C1, C2, C3 = the 3 column lines

Similarly, on a 4x4 keypad, C1-C4 and R1-R4 are the 8 wires that form a matrix of switches:

- R1, R2, R3, R4 = the 4 row lines
- C1, C2, C3, C4 = the 4 column lines

For each of these row and column lines, there needs to be one wire per row and one wire per column.

## Wiring

{% include figure.html src="/assets/images/human_sensing_and_controls/keypad/keypad_wiring.png" caption="Keypad Wiring" caption_prefix="Fig 3:" width="80%" %}

| Keypad Pins (3x4) | Arduino Pin |
| :---- | :---- |
| R1 | 9 |
| R2 | 8 |
| R3 | 7 |
| R4 | 6 |
| C1 | 5 |
| C2 | 4 |
| C3 | 3 |

| Keypad Pins (4x4) | Arduino Pin |
| :---- | :---- |
| R1 | 9 |
| R2 | 8 |
| R3 | 7 |
| R4 | 6 |
| C1 | 5 |
| C2 | 4 |
| C3 | 3 |
| C4 | 2 |

## Example Code

The library `Adafruit_Keypad.h` must first be downloaded from the library manager.

```cpp
#include "Adafruit_Keypad.h"

const byte ROWS = 4; // rows
const byte COLS = 3; // columns

int R1 = 9;
int R2 = 8;
int R3 = 7;
int R4 = 6;
int C1 = 5;
int C2 = 4;
int C3 = 3;

// define the symbols on the buttons of the keypads
char keys[ROWS][COLS] = {
  {'1','2','3'},
  {'4','5','6'},
  {'7','8','9'},
  {'*','0','#'}
};
byte rowPins[ROWS] = {R1, R2, R3, R4}; // connect to the row pinouts of the keypad
byte colPins[COLS] = {C1, C2, C3};      // connect to the column pinouts of the keypad

// initialize an instance of class NewKeypad
Adafruit_Keypad customKeypad = Adafruit_Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);
  customKeypad.begin();
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  customKeypad.tick();

  while(customKeypad.available()) {
    keypadEvent e = customKeypad.read();
    Serial.print((char)e.bit.KEY);
    if(e.bit.EVENT == KEY_JUST_PRESSED) {
      Serial.println(" pressed");
      if((char)e.bit.KEY == '1') digitalWrite(LED_BUILTIN, HIGH);
    }
    else if(e.bit.EVENT == KEY_JUST_RELEASED) {
      Serial.println(" released");
      if((char)e.bit.KEY == '1') digitalWrite(LED_BUILTIN, LOW);
    }
  }

  delay(10);
}
```

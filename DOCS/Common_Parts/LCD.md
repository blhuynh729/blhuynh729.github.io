---
title: LCD (Liquid Crystal Display)
layout: page
nav_order: 3
parent: Common Components
---

# LCD (Liquid Crystal Display)
--- 
A Liquid Crystal Display (LCD) is a commonly used display device for Arduinos to  output information like text, numbers, and sensor data. So rather than printing to the Serial Monitor, you can see results directly from the device. LCDs commonly have sizes of 16x2 or 20x4 character displays, as well as an I2C “backpack” module for communicating with the Arduino.

{% include figure.html src="/assets/images/components/LCD/LCD.png" caption="Image of LCD" link="https://www.newark.com/dfrobot/dfr0063/lcd-display-module-i2c-16x2-arduino/dp/52AJ4987" width = "60%" caption_prefix="Fig 1:" %}

# Pinout 
--- 

{% include figure.html src="/assets/images/pinouts/LCD/LCD_pinout.png" caption="Image of LCD pinout" link="https://arduinogetstarted.com/tutorials/arduino-lcd-i2c" caption_prefix="Fig 2:" %}

| Pin Name | Function     | Description                                                                 |
|---------|---------------|-----------------------------------------------------------------------------|
| VCC     | Power         | Supplied +5 V to sensor                                                     |
| SDA     | Carries Data  | Serial Data line: carries the actual data between the Arduino and the sensor|
| SCL     | Clock         | Serial Clock line - synchronizes data transfer using a clock signal         |
| GND     | Ground        | Common Ground                                                               |

SDA (Serial Data) and SCL (Serial Clock) are the two signal lines used for the I²C (Inter-Integrated Circuit) communication protocol. I2C allows a microcontroller to communicate with multiple devices on the same bus using shared wiring. SDA carries the data being transmitted, while SCL provides the clock signal that times and synchronizes each bit of data. 

# Wiring
--- 
{% include figure.html src="/assets/images/wiring/LCD/LCD_wiring.png" caption="Image of LCD wiring" caption_prefix="Fig 3:" %}

Wire the LCD display by connecting the 5V to VCC and GND to GND. Connect SDA and the SCL on the Arduino to their respective pins on the LCD.


# Code example for LCD: 

The LCD is arranged like a small grid of columns and rows. For example, a 16×2 LCD has 16 columns (characters across) and 2 rows (lines down). When you position text, you use setCursor(column, row), where the column is how far left-to-right you want to start (0 to 15 on a 16-column display) and the row selects the line (row 0 is the top line, row 1 is the bottom line). So setCursor(0, 0) moves to the top-left corner, while setCursor(0, 1) moves to the start of the second line.

Also, to use the LCD, you have to include the Adafruit_LiquidCrystal library. 

```cpp
// C++ code
//
#include <Adafruit_LiquidCrystal.h>


int seconds = 0;


Adafruit_LiquidCrystal lcd_1(0);


void setup()
{
  lcd_1.begin(16, 2);
  lcd_1.setBacklight(1);
}


void loop()
{
  lcd_1.clear();
 


  // Row 0 (top)
  lcd_1.setCursor(0, 0);
  lcd_1.print("Welcome to ENG3!");


  // Row 1 (bottom)
  lcd_1.setCursor(0, 1);
  lcd_1.print(":)");
 
  delay(1000);
}
```
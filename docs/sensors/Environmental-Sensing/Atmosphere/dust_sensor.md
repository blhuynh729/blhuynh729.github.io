---
title: Dust Sensors
layout: page
nav_order: 4
parent: Atmosphere
grand_parent: "Environmental Sensing"
---
# Dust Sensor

This is an optical dust sensor, which uses an [infrared emitting diode (IRED) and a phototransistor to measure dust concentration](https://global.sharp/products/device/lineup/data/pdf/datasheet/gp2y1010au_e.pdf). Essentially, the IR light is reflected by dust, which the phototransistor detects. The higher the dust concentration, the more light the phototransistor receives, and the higher the output voltage from the sensor. Since this sensor is light sensitive, try to keep ambient light from hitting the hole in the sensor.

{% include figure.html src="/assets/images/environmental_sensors/dust_sensors/dust_sensor.png" caption="Dust Sensor" caption_prefix="Fig 1:" width="60%" %}




## Pinout

{% include figure.html src="/assets/images/environmental_sensors/dust_sensors/dust_sensor_pinout.png" caption="Dust Sensor Pins" caption_prefix="Fig 2:" width="60%" %}


The dust sensor has the following pins:

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| VCC | 5V | Power supply |
| GND | GND | Common ground |
| OUT | Analog Pin (A0) | Sends the output voltage of the sensor |
| LED | Digital Pin (7) | Turns the infrared emitting diode on and off |

## Wiring

The dust sensor's VCC pin must be connected to 5V, the GND pin connected to ground, the AOUT pin connected to an analog input pin, and the ILED pin connected to a digital pin. The ILED pin turns the infrared emitting diode on and off, while the AOUT pin sends the output voltage of the sensor. In the code below, AOUT is connected to analog input pin A0, and ILED is controlled by digital pin 7.

## Example Code

```cpp
/***************************************************************************************************
*
* File                : DustSensor
* Hardware Environment:
* Build Environment   : Arduino
* Version             : V1.0.5-r2
* By                  : WaveShare
*
* Wiring Instructions:
*
* GND -> Arduino GND
* VCC -> Arduino 5V
* LED -> Pin 7
* OUT -> Analog Pin A0
*
* This code looks at the Dust sensor, it uses a light inside of it to detect if there is any dust
* in the way, it attempts to count the particles.
* To test if your code is working and your wiring is correct I would recommend getting something
* non-metal and small and insert it into the hole.
* When there is nothing in the hole it should read 0.00 ug/m3
* When there is something in the hole it means there is something (it assumes dust) in the way
* and will be greater than 0.00
****************************************************************************************************/

#define COV_RATIO      0.2            // ug/mmm / mv
#define NO_DUST_VOLTAGE 400           // mv
#define SYS_VOLTAGE    5000

/*
I/O define
*/
const int iled = 7;                    // drive the led of sensor
const int vout = A0;                   // analog input

/*
variable
*/
float density, voltage;
int   adcvalue;

/*
private function
*/
int Filter(int m)
{
  static int flag_first = 0, _buff[10], sum;
  const int _buff_max = 10;
  int i;

  if(flag_first == 0)
  {
    flag_first = 1;
    for(i = 0, sum = 0; i < _buff_max; i++)
    {
      _buff[i] = m;
      sum += _buff[i];
    }
    return m;
  }
  else
  {
    sum -= _buff[0];
    for(i = 0; i < (_buff_max - 1); i++)
    {
      _buff[i] = _buff[i + 1];
    }
    _buff[9] = m;
    sum += _buff[9];

    i = sum / 10.0;
    return i;
  }
}

void setup(void)
{
  pinMode(iled, OUTPUT);
  digitalWrite(iled, LOW);                                     // iled default closed

  Serial.begin(9600);                                          // send and receive at 9600 baud
  Serial.println("Initialized!");
}

void loop(void)
{
  /*
  get adcvalue
  */
  digitalWrite(iled, HIGH);
  delayMicroseconds(280);
  adcvalue = analogRead(vout);
  digitalWrite(iled, LOW);

  adcvalue = Filter(adcvalue);

  /*
  convert voltage (mv)
  */
  voltage = (SYS_VOLTAGE / 1024.0) * adcvalue * 11;

  /*
  voltage to density
  */
  if(voltage >= NO_DUST_VOLTAGE)
  {
    voltage -= NO_DUST_VOLTAGE;

    density = voltage * COV_RATIO;
  }
  else
    density = 0;

  /*
  display the result
  */
  Serial.print("The current dust concentration is: ");
  Serial.print(density);
  Serial.print(" ug/m3\n");

  delay(1000);
}
```

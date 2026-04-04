---
title: Total Dissolved Solids Sensor
layout: page
nav_order: 5
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Total Dissolved Solids (TDS) Sensor

{% include figure.html src="/assets/images/environmental_sensors/tds_sensor/tds_sensor.png" caption="TDS Sensor" caption_prefix="Fig 1:" width="60%" %}

The total dissolved solids sensor reads and [prints out how many solids are dissolved in water, in parts per million](http://www.cqrobot.wiki/index.php/TDS_(Total_Dissolved_Solids)_Meter_Sensor_SKU:_CQRSENTDS01).

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/tds_sensor/tds_sensor_pinout.png" caption="TDS Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Pin | Connect to Arduino | Description |
| :---- | :---- | :---- |
| + | 5V | Power supply |
| - | GND | Common ground |
| A (S) | Analog Pin (A0) | Analog signal output |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/tds_sensor/tds_wiring.png" caption="TDS Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

To connect the TDS sensor to the Arduino, connect the "+" pin to 5V, the "-" pin to ground, and the "A" pin to an analog input pin. In the code below, analog input pin 0 is used.

## Example Code

```cpp
/*
* ------------------------------------------------------------------------------
* This is example code of how to use the TDS (total dissolved solids) water sensor with the Arduino.
* ------------------------------------------------------------------------------
* Wiring directions
*
* S (green) -> Pin A0
* VCC -> Arduino 5V
* GND -> Arduino GND
*/

// Original source code: https://wiki.keyestudio.com/KS0429_keyestudio_TDS_Meter_V1.0#Test_Code
// Project details: https://RandomNerdTutorials.com/arduino-tds-water-quality-sensor/

#define TdsSensorPin A0
#define VREF 5.0              // analog reference voltage(Volt) of the ADC
#define SCOUNT  30            // sum of sample point

int analogBuffer[SCOUNT];     // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0;
int copyIndex = 0;
float averageVoltage = 0;
float tdsValue = 0;
float temperature = 16;       // current temperature for compensation

// median filtering algorithm
int getMedianNum(int bArray[], int iFilterLen) {
  int bTab[iFilterLen];
  for (byte i = 0; i < iFilterLen; i++)
    bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0) {
    bTemp = bTab[(iFilterLen - 1) / 2];
  }
  else {
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  }
  return bTemp;
}

void setup() {
  Serial.begin(115200);
  pinMode(TdsSensorPin, INPUT);
}

void loop() {
  static unsigned long analogSampleTimepoint = millis();
  if (millis() - analogSampleTimepoint > 40U) {     // every 40 milliseconds, read the analog value from the ADC
    analogSampleTimepoint = millis();
    analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);    // read the analog value and store into the buffer
    analogBufferIndex++;
    if (analogBufferIndex == SCOUNT) {
      analogBufferIndex = 0;
    }
  }

  static unsigned long printTimepoint = millis();
  if (millis() - printTimepoint > 800U) {
    printTimepoint = millis();
    for (copyIndex = 0; copyIndex < SCOUNT; copyIndex++) {
      analogBufferTemp[copyIndex] = analogBuffer[copyIndex];

      // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      averageVoltage = getMedianNum(analogBufferTemp, SCOUNT) * (float)VREF / 1024.0;

      // temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
      float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);
      // temperature compensation
      float compensationVoltage = averageVoltage / compensationCoefficient;

      // convert voltage value to tds value
      tdsValue = (133.42 * compensationVoltage * compensationVoltage * compensationVoltage - 255.86 * compensationVoltage * compensationVoltage + 857.39 * compensationVoltage) * 0.5;

      Serial.print("TDS Value:");
      Serial.print(tdsValue, 0);
      Serial.println("ppm");
    }
  }
}
```

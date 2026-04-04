---
title: Flow Sensor
layout: page
nav_order: 4
parent: "Liquid and Soil"
grand_parent: "Environmental Sensing"
---
# Flow Sensor

{% include figure.html src="/assets/images/environmental_sensors/flow_sensor/flow_sensor.png" caption="Flow Sensor" caption_prefix="Fig 1:" width="60%" %}

As the name may imply, the flow sensor measures the flowrate of the liquid flowing through it. As the water flows through the turbine, it spins a little propeller. This propeller has a magnet connected on a fin, and as the propeller spins, the sensor outputs a pulse per a certain number of rotations. The sensor roughly outputs one pulse per 2.25 milliliters of water that passes through the sensor.

## Pinout

{% include figure.html src="/assets/images/environmental_sensors/flow_sensor/flow_sensor_pinout.png" caption="Flow Sensor Pinout" caption_prefix="Fig 2:" width="60%" %}

| Wire Color | Connect to Arduino | Description |
| :---- | :---- | :---- |
| Red | 5V | Power supply |
| Black | GND | Common ground |
| Yellow | Digital Pin (2) | Pulse signal output |

## Wiring

{% include figure.html src="/assets/images/environmental_sensors/flow_sensor/flow_sensor_wiring.png" caption="Flow Sensor Wiring" caption_prefix="Fig 3:" width="80%" %}

To connect the flowrate sensor to an Arduino, connect the red wire to 5V, the black wire to ground, and connect the yellow wire to a digital pin. In the code below, that wire is connected to digital pin 2.

## Example Code

The code below is adopted from [Arvind Sanjeev's instructable](https://www.instructables.com/How-to-Use-Water-Flow-Sensor-Arduino-Tutorial/). The only change made was to adapt the variable "calibrationFactor," since the pulse rate of the turbine sensor used by Arvind is different from the pulse rate of our sensor.

```cpp
/*
Liquid flow rate sensor -DIYhacking.com Arvind Sanjeev

Measure the liquid/water flow rate using this code.
Connect Vcc and Gnd of sensor to arduino, and the
signal line to arduino digital pin 2.
*/

byte statusLed    = 13;

byte sensorInterrupt = 2;
byte sensorPin       = 2;

// The hall-effect flow sensor outputs approximately 4.5 pulses per second per
// litre/minute of flow.
float calibrationFactor = 7.4;

volatile byte pulseCount;

float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;

unsigned long oldTime;

void setup()
{
  // Initialize a serial connection for reporting values to the host
  Serial.begin(9600);

  // Set up the status LED line as an output
  pinMode(statusLed, OUTPUT);
  digitalWrite(statusLed, HIGH);  // We have an active-low LED attached

  pinMode(sensorPin, INPUT);
  digitalWrite(sensorPin, HIGH);

  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;

  // The Hall-effect sensor is connected to pin 2 which uses interrupt 0.
  // Configured to trigger on a FALLING state change (transition from HIGH
  // state to LOW state)
  attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
}

/**
 * Main program loop
 */
void loop()
{
  if((millis() - oldTime) > 1000)    // Only process counters once per second
  {
    // Disable the interrupt while calculating flow rate and sending the value to
    // the host
    detachInterrupt(sensorInterrupt);

    // Because this loop may not complete in exactly 1 second intervals we calculate
    // the number of milliseconds that have passed since the last execution and use
    // that to scale the output. We also apply the calibrationFactor to scale the output
    // based on the number of pulses per second per units of measure (litres/minute in
    // this case) coming from the sensor.
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;

    // Note the time this processing pass was executed.
    oldTime = millis();

    // Divide the flow rate in litres/minute by 60 to determine how many litres have
    // passed through the sensor in this 1 second interval, then multiply by 1000 to
    // convert to millilitres.
    flowMilliLitres = (flowRate / 60) * 1000;

    // Add the millilitres passed in this second to the cumulative total
    totalMilliLitres += flowMilliLitres;

    // Print the flow rate for this second in litres / minute
    Serial.print("Flow rate: ");
    Serial.print(int(flowRate));  // Print the integer part of the variable
    Serial.print("L/min");
    Serial.print("\t");       // Print tab space

    // Print the cumulative total of litres flowed since starting
    Serial.print("Output Liquid Quantity: ");
    Serial.print(totalMilliLitres);
    Serial.println("mL");
    Serial.print("\t");
    Serial.print(totalMilliLitres / 1000);
    Serial.print("L");

    // Reset the pulse counter so we can start incrementing again
    pulseCount = 0;

    // Enable the interrupt again now that we've finished sending output
    attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
  }
}

/*
Interrupt Service Routine
*/
void pulseCounter()
{
  // Increment the pulse counter
  pulseCount++;
}
```

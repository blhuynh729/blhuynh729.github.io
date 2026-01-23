---
title: How Far Away Is An Object? (Ultrasonic sensor)
parent: Movement and Location
layout: page
nav_order: 1
---

# How Far Away Is An Object? (Ultrasonic sensor)

--- 


The ultrasonic sensor measures distance by echolocation: it sends a sound wave, then measures how long it takes for the sound wave to bounce back to the sensor. Ultrasonic sensor commonly used for obstacle detection, parking sensors, and simple range finders. A commonly used ultrasonic sensor is the HC-SR04.


<figure align="center">
    <img src = "../../../assets/images/sensors/ultrasonic_sensor_image.png">
    <figcaption>
        Fig 1: Image of the HC-SR04 ultrasonic sensor
    </figcaption>
</figure>


## Pinout
<figure align="center">
    <img src = "../../../assets/images/pinouts/ultrasonic_sensor_pinout.png">
    <figcaption>
        Fig 1: Image of the HC-SR04 ultrasonic sensor
    </figcaption>
</figure>

A standard ultrasonic sensor has 4 pins: VCC, GND, Trig, Echo

| Pin Name | Function | Description |
|---------|----------|-------------|
| VCC | Power | Supplies +5 V to the sensor |
| Trig | Trigger | Pin used to send the ultrasonic pulse from the transmitter |
| Echo | Echo | Pin used to listen for the reflected ultrasonic signal |
| GND | Ground | Common ground |

## How to Connect HC-SR04 Ultrasonic Sensor to Arduino

<figure align="center">
    <img src = "../../../assets/images/wiring/ultrasonic_wiring.png">
    <figcaption>
        Fig 1: Wiring for Ultrasonic Sensor to Arduino
    </figcaption>
</figure>

Connect the “Vcc” pin to 5V, the “Gnd” pin to ground, “Trig” to digital pin 10 and “Echo” to digital pin 9.


The code operates by setting the Trigger pin to “high” for 10 milliseconds, then measures how long it takes until the Echo pin detects the echo and goes “high.” The function pulseIn() measures how long it takes until the Echo pin goes high.


The speed of sound in air is about 343 meters per second (this will vary depending on the temperature and consistency of the medium a sound wave travels through). This converts to 0.343 meters per millisecond. If you apply this ratio to the elapsed time between the Trigger signal and the Echo signal, you will calculate the distance the sound wave traveled in both directions: the distance from the Trigger signal to the object it reflected off of, and the distance from that object to the sensor. So we divide this ratio by two to calculate the distance between the sensor and the object.


## Example Ultrasonic Sensor Code
```cpp
// C++ code
//


// define pin numbers
const int trigPin = 10;
const int echoPin = 9;


// initiate variables


long duration;
int distance;


void setup()
{
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);  // Sets the echoPin as an Input
  Serial.begin(9600);   // Starts serial communication
}


void loop()
{
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
 
  // Sets trigPin on HIGH state for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
 
  // Calculating the distance
  // Distance = (Speed x Time) / 2 = (34cm/ms x 1.5ms) / 2 = 25.5cm.
  distance = duration * 0.034 / 2;
 
  // Print the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
}

```
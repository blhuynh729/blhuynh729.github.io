---
title: Temperature and Humidity Sensor
layout: page
nav_order: 1
parent: Atmosphere
grand_parent: "Environmental Sensing"
---
# Temperature and Humidity Sensor
Humidty sensors are devices that can measure the amount of water vapor in the air. By tracking the humidity, these sensors help determine how moist or dry the surrounding air is.

A common humidity sensor is the DHT11. The DHT11 is a sensor that can measure both humidity and temperature, making it very useful in a variety of simple applications. 


{% include figure.html src="/assets/images/environmental_sensors/humidity_temp/humidity_sensor_image.png" caption="DHT11 Temperature and Humidity Sensor" link="https://wiki.keyestudio.com/Ks0034_keyestudio_DHT11_Temperature_and_Humidity_Sensor" caption_prefix="Fig 1:" width="60%" %}


## Pinout
{% include figure.html src="/assets/images/environmental_sensors/humidity_temp/humidity_sensor_pinout.jpg" caption="Image of DHT11 sensor and Module" link="https://newbiely.com/tutorials/arduino-uno-r4/arduino-uno-r4-dht11" caption_prefix="Fig 2:" %}

| DHT11 Pin | Connect to Arduino | Description |
|---|---|---|
| +Vs | 5V | Takes in 2.7-5.5V for Power |
| Data | Digital Pin | The temperature signal that will be read |
| GND | GND | Must share common ground with Arduino |
| NC | Nothing | Not Connected/Can be ignored |

The number of pins on the DHT11 may vary depending if it is a DHT11 module (3 pin) or the DHT11 (4 pin) sensor. But there is nothing to be concerned about as the 4th additional pin (NC) is not used and can be ignored. 

## Wiring
{% include figure.html src="/assets/images/environmental_sensors/humidity_temp/dht11_sensor_wiring.png" caption="Image of DHT11 sensor wiring" link="https://lastminuteengineers.com/dht11-dht22-arduino-tutorial/" caption_prefix="Fig 3:" width="60%" %}

For the DHT11 (4 pin) sensor, you can find the above wiring as such. Skip the 3rd pin from the left as it is the NC pin. Connect the VCC pin on the sensor to the 5V output on your Arduino. Then, connect the GND (ground) pin on the sensor to a ground pin on your Arduino. Next, connect the Data pin to a digital pin on your Arduino and add a 10K pull-up resistor between the Data pin and the VCC pin.

{% include figure.html src="/assets/images/environmental_sensors/humidity_temp/dht11_module_wiring.png" caption="Image of DHT11 module wiring" link="https://forum.arduino.cc/t/dht11-module-doesnt-seem-to-work/1224828" caption_prefix="Fig 4:" width="60%" %}

The DHT module wiring is very similar, but does not need a pull down resistor as it is built into the board. 


## Example Code

```cpp
/**
 * DHT11 Sensor Reader
 * This sketch reads temperature and humidity data from the DHT11 sensor and prints the values to the serial port.
 * It also handles potential error states that might occur during reading.
 *
 * Author: Dhruba Saha
 * Version: 2.1.0
 * License: MIT
 */


/*
* ------------------------------------------------------------------------------
* This is example code of how to use the DHT11 with the Arduino.
* ------------------------------------------------------------------------------
* INSTALL LIBRARY DHT11.h
*
* Wiring directions
*
* (+) -> Arduino 5V
* Sig -> Pin 2
* (-) -> Arduino GND
*
* ------------------------------------------------------------------------------
The DHT sensor reads both humidity and temperature using serial communication
You can store both values separately here
It is not waterpoof
* ------------------------------------------------------------------------------
*/


// Include the DHT11 library for interfacing with the sensor.
#include <DHT11.h>


// Create an instance of the DHT11 class.
// - For Arduino: Connect the sensor to Digital I/O Pin 2.
// - For ESP32: Connect the sensor to pin GPIO2 or P2.
// - For ESP8266: Connect the sensor to GPIO2 or D4.
DHT11 dht11(2);


void setup() {
    // Initialize serial communication to allow debugging and data readout.
    // Using a baud rate of 9600 bps.
    Serial.begin(9600);
   
    // Uncomment the line below to set a custom delay between sensor readings (in milliseconds).
    // dht11.setDelay(500); // Set this to the desired delay. Default is 500ms.
}


void loop() {
    int temperature = 0;
    int humidity = 0;


    // Attempt to read the temperature and humidity values from the DHT11 sensor.
    int result = dht11.readTemperatureHumidity(temperature, humidity);


    // Check the results of the readings.
    // If the reading is successful, print the temperature and humidity values.
    // If there are errors, print the appropriate error messages.
    if (result == 0) {
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.print(" °C\tHumidity: ");
        Serial.print(humidity);
        Serial.println(" %");
    }
}
```
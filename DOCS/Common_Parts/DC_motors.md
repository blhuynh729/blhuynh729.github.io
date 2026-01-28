---
title: DC Motors
layout: page
nav_order: 2
parent: Common Components
---

# DC Motors
---
DC motors is an electric motor that uses direct current (DC) to produce mechanical energy. When connected to an Arduino, the motor can be used to create movement by spinning wheels, fans, or other rotating mechanisms. 


{%include figure.html src="/assets/images/components/motors/dc_motor.png" caption="Image of DC Motor" width = "60%" %}

# Pinout of DC motor
--- 
{% include figure.html src="/assets/images/pinouts/motors/dc_motor_pinout.png" caption="Pinout of a DC motor" link="https://microcontrollerslab.com/dc-motor-interfacing-atmega32-l293/" caption_prefix="Fig 2:" %}



# How to control a DC motor with an Arduino 
---
As mentioned before, a DC motor is an electrical motor that uses direct current (DC) to produce mechanical force. Unlike Alternating Current (AC), whose current periodically reverses direction and changes magnitude, DC current flows steadily in one direction, typically from the positive terminal to the negative terminal. 

To control a DC motor, the two terminals of the motor are connected to the positive and negative terminals of a DC power supply. In general, a DC motor does not have a fixed positive or negative terminal. Rather, the way the motor is connected determines the direction of rotation.

For example, if Terminal 1 is connected to the positive terminal of the DC power supply and Terminal 2 is connected to the negative terminal, the motor will rotate in one direction. If the connections are swapped, thereby reversing the polarity, the motor will rotate in the opposite direction. In general, reversing the polarity will not damage the motor, however, it is a recommended practice to consult the datasheet.

The speed of the motor depends on the magnitude of the applied voltage: higher voltage results in a higher rotational speed (RPM), while lower voltage results in a slower speed. 

 ***IMPORTANT NOTE:***
A DC motor should never be powered directly with an Arduino. The digital output pins on an Arduino cannot supply enough current to safely drive a DC motor. Attempting to do so may damage the Arduino.

To properly control a DC motor, an external power supply must be used along with a motor driver (e.g. L293D), transistor, or relay. These components allow the Arduino to control the motor’s speed and direction while safely handling the higher current required to run the motor.


For the following example, we will be using the L293D Motor Driver to control a single DC motor. You can reference the section on the L293D and how to use it in the Motor Driver Section. 

# Pinout of L293D for Two DC Motor:
---

{% include figure.html src="/assets/images/pinouts/motors/L293D_motor_driver.png" caption= "Pinout of L293D Motor Driver" link="https://lastminuteengineers.com/l293d-dc-motor-arduino-tutorial/" width="60%" caption_prefix="Fig 3:" %}





| Arduino Pins -> L293D Pins | Description |
|---|---|
| 5V -> VSS (Vcc1) | Takes in 5V from Arduino, powers internal circuitry of L293D |
| GND -> GND (Pins 4, 5, 12, and 13) | Connect Arduino GND with both Power Supply GND and L293D GND |
| Pin 9 -> ENB | Controls Speed of **Motor A** via PWM |
| Pin 8 -> IN3 | Controls Direction of **Motor A** Rotation |
| Pin 7 -> IN4 | Controls Direction of **Motor A** Rotation |
| Pin 6 -> ENB | Controls Speed of **Motor B** via PWM |
| Pin 5 -> IN3 | Controls Direction of **Motor B** Rotation |
| Pin 4 -> IN4 | Controls Direction of **Motor B** Rotation |

| Power Supply -> L293D | Description |
|---|---|
| DC Power Supply Power -> VS (VCC2) | Supplies power to motors |

| Power Supply -> L293D | Description |
|---|---|
| DC Power Supply GND -> GND | Creates Common GND connection |

| L293D -> Motor | Description |
|---|---|
| OUT4 and OUT3 -> DC motor A | Pins connect to motor A |
| OUT1 and OUT2 -> DC motor B | Pins connect to motor B |

*Note, connection order for DC Terminals is arbitrary, only affects direction of motor and affects IN Pins output (for direction)

---
# Wiring for DC motors
---


{% include figure.html src="/assets/images/wiring/motors/dc_motor_wiring.png" caption="Wiring of DC motors with L293D Motor Driver and Arduino" caption_prefix="Fig 4:" %}

--- 
# Example Code for Two DC Motors:
```cpp
// Code from LastMinuteEngineers
// https://lastminuteengineers.com/l293d-dc-motor-arduino-tutorial/
// Motor A connections
int enA = 9;
int in1 = 8;
int in2 = 7;
// Motor B connections
int enB = 6;
int in3 = 5;
int in4 = 4;


void setup() {
  // Set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);


  // Turn off motors - Initial state
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}


void loop() {
  directionControl();
  delay(1000);
  speedControl();
  delay(1000);
}


// This function lets you control spinning direction of motors
void directionControl() {
  // Set motors to maximum speed
  digitalWrite(enA, HIGH);
  digitalWrite(enB, HIGH);


  // Turn on motor A & B
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(2000);


  // Now change motor directions
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(2000);


  // Turn off motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}


// This function lets you control speed of the motors
void speedControl() {
  // Turn on motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);


  // Accelerate from zero to maximum speed
  for (int i = 0; i < 256; i++) {
    analogWrite(enA, i);
    analogWrite(enB, i);
    delay(20);
  }


  // Decelerate from maximum speed to zero
  for (int i = 255; i >= 0; --i) {
    analogWrite(enA, i);
    analogWrite(enB, i);
    delay(20);
  }


  // Now turn off motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

```

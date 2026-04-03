---
title: Relays
layout: page
nav_order: 5
parent: Common Components
---

# Relays
A relay is basically a switch that allows the user to safely control and handle high voltage current using a smaller voltage. 

{% include figure.html src="/assets/images/common_components/relays/relay.png" caption="Image of a relay module" link="https://www.addicore.com/products/1-channel-relay-module-active-low-control?srsltid=AfmBOoqwyjHDoF3sEpz1KuITWzIj5PeKvbDSfj42OSHASVirMzE2WdEq" width = "60%" caption_prefix="Fig 1:" %}

How is this achieved? Inside most relays, there is an electromagnet. This electromagnet is activated using a small voltage and once activated, it will generate a magnetic field that will push or pull an actuator arm to make or separate contact between high voltage current. This may sound a little abstract but let's dive in. 

{% include figure.html src="/assets/images/common_components/relays/relay_interior.png" caption="Interior of a relay module" width = "60%" caption_prefix="Fig 2:" %}

Figure 1 is the interior of a traditional relay. As you can see, there is an electromagnetic coil, an actuator arm, a common, and two sets of contacts, normally open (NO) and normally closed (NC). When the coil becomes energized, it generates a magnetic field that pulls the actuator arm, switching the COM connection between the NC and NO contacts.

### Actuator Arm and Common 
The actuator arm is the physical “switch” that moves between the two contacts, NO and NC contacts. The actuator arm is connected to the Common (COM) terminal. COM is the “input” or “source” current you are trying to control (the higher-voltage or higher-current circuit). 

### Normally Closed and Normally Open contacts
For a relay, the normal state is when the relay’s coil is not energized (no current through the coil). The terms Normally Closed (NC) and Normally Open (NO) describe what the contacts are doing in that unpowered, normal state:
- NC (Normally Closed): When the relay coil is unpowered, COM is connected to NC (the circuit is “closed” by default).
- NO (Normally Open): When the relay coil is unpowered, COM is not connected to NO (the circuit is “open” by default).

{% include figure.html src="/assets/images/common_components/relays/relay_actuator_arm.png" caption="Normally Open and Normally Closed" width = "60%" caption_prefix="Fig 2:" %}

Therefore, when the relay is in its normal state (coil not powered), COM is connected to NC. But when the coil is powered, the actuator arm moves and COM switches to connect to NO.

## Pinout
In most cases, you will be handling a relay board that comes with some built in electronics over a bare-bones relay. 

{% include figure.html src="/assets/images/common_components/relays/relay_pinout.png" caption="Pinout of a Relay Module" width="80%" link="https://lastminuteengineers.com/one-channel-relay-module-arduino-tutorial/" caption_prefix="Fig 3:" %}


| Pin/Terminal | Function | Description |
|---|---|---|
| NO | Normally Open | Not Connected to COM in its normal state. When the coil is energized, COM connects to NO |
| NC | Normally Closed | Connected to COM in its normal state. When the coil is energized, COM disconnects from NC |
| COM | Common | The "actuator arm" that switches between NC and NO. This is where you connect the source voltage you want to switch between |
| IN | Input Signal | Control input for the relay. When the Signal is LOW (0V), COM is connected to NC. When the Signal is HIGH (5V), COM will switch from the NC to NO |
| VCC | Power Supply Pin | Provides module's operating power (NOTE: not the same as COM) |
| GND | Ground | Allows return path for VCC |


## Wiring
{% include figure.html src="/assets/images/common_components/relays/relay_wiring.png" caption="Wiring of a Relay Module"  link="https://osoyoo.com/2017/08/28/arduino-lesson-1-channel-relay-module/" caption_prefix="Fig 4:" %}


This is a simple example of how to control a Light Bulb via an Arduino, relay, and external power source. 
- Connect the Arduino 5V, GND, and Pin 2 to the Relay module’s VCC, GND, IN pins.
- From the power supply, connect the positive terminal (+) to COM and the negative terminal (-) to the negative terminal on the light bulb. 
- On the relay module, connect the NO terminal to the positive terminal on the light bulb. With this configuration, the light bulb will be OFF at the normal state and will turn ON when the relay is activated. 
- If we want to use NC instead of NO, this means that the lightbulb will be ON at the normal state and turn OFF when the relay is activated.


## Example Code 
```cpp
// C++ code
//
// define pin numbers
int relay_pin = 2;
void setup()
{
  pinMode(relay_pin, OUTPUT);
}
void loop()
{
  digitalWrite(relay_pin, HIGH); // Turns Relay ON
  delay(5000);
  digitalWrite(relay_pin, LOW); // Turns Relay OFF
  delay(5000);
}
```
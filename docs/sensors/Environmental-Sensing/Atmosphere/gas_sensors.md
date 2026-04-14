---
title: Gas Sensors
layout: page
nav_order: 3
parent: Atmosphere
grand_parent: "Environmental Sensing"
---
# Gas Sensors

The gas sensors listed below are capable of detecting a wide variety of compounds in the air. It is important to note that while these sensors are sensitive to a variety of compounds, they are not specifically sensitive to them: the sensor produces one signal for all gases, and an increase in the concentration of any of those gases will create the same signal, albeit of slightly different amplitude. So, if you want to measure just one of the gases in a gas sensor's capacity for detection, you should be reasonably sure that none of the other gases it detects are going to fluctuate significantly while you're measuring your target gas. If you're interested in measuring multiple of the gases it can detect that's fine too, but you won't be able to differentiate which specific gas is fluctuating.

Additionally, it is possible to calibrate these sensors to calculate the particular concentration of a gas in parts per million. There are pages of code below that attempt to accomplish this. However, calibrating these sensors is difficult, so do not expect those numbers to be particularly accurate. A more realistic use case for these gas sensors is to detect spikes in concentration, rather than continually monitoring real concentration. This can be done using the sensor's digital outputs, or just calculating a confidence interval for the analog value and triggering something when the analog value goes too high.



---

## MQ-135

{% include figure.html src="/assets/images/environmental_sensors/gas_sensor/gas_sensor.png" caption="MQ-135 Gas Sensor" link="https://microcontrollerslab.com/interfacing-mq-135-gas-sensor-arduino/" caption_prefix="Fig 1:" width="60%" %}

The MQ-135 is sensitive to carbon dioxide, carbon monoxide, ammonium, alcohol, toluene and acetone. The MQ-135 is a variable resistor that nonlinearly decreases in resistance with increasing concentration of gas. The relationship can be linearized on a log-log graph, as shown in the [device's data sheet](https://www.electronicoscaldas.com/datasheet/MQ-135_Hanwei.pdf). The resistor needs time to warm up, so the MQ-135 has a warm-up period of 3-5 minutes.

The breakout board for the MQ-135 has a digital output pin, which goes "high" whenever the resistor value drops below a certain level. You can adjust the screw in the blue box to dial in what that threshold is.

### Pinout

{% include figure.html src="/assets/images/environmental_sensors/gas_sensor/gas_sensor_pinout.png" caption="MQ-135 Gas Sensor" caption_prefix="Fig 2:" width="80%" %}

To wire the sensor, connect VCC to 5V, GND to ground, then connect analog output to an analog input, or digital output to a digital socket, depending on which you prefer to use.

### Wiring

To calculate the sensor's resistor value Rs from the analog output, you need to know the load resistance. To convert the sensor's change in resistance to a change in voltage, the breakout board employs a built-in resistor bridge: by putting a resistor with constant resistance in series with the sensor resistor, the voltage value at the node between the resistors will change with respect to the sensor resistor. The breakout board has a built-in load resistor of 2 kilohms.

{% include figure.html src="/assets/images/environmental_sensors/gas_sensor/gas_sensor_spec_sheet.png" caption="MQ-135 Rs/Ro sensitivity curves" caption_prefix="Fig 2:" width="60%" %}

Ro is the resistor value at 100 ppm of NH3. Rs is the resistor value of the sensor in any other given scenario. To use the sensitivities given in the datasheet, you need to know Ro, but it is very difficult to create an environment with 100 ppm of NH3. So most users have found ways around Ro or found ways to calculate Ro.

One method is to use the Rs/Ro value for air (blue flat line), then use an Rs value in clean air to calculate Ro. This method might be good for detecting carbon monoxide, ammonium, alcohol, toluene or acetone, but it gives values for CO2 that are way too low. In indoor environments, CO2 should be about 400 ppm.

Other methods are to abandon Ro and this data sheet entirely, and use either the digital output of the MQ-135 or just roughly gauge what are high/low analog values.

The sensor resistance can be calculated as:

`Rs = RL * (Vin/Vout - 1)`

Where Rs is the sensor resistance, RL is the load resistance, Vin is 5V and Vout is the output voltage.

### Example Code

The code below is written to calibrate Ro assuming the CO2 concentration is 400 ppm.

```cpp
#define MQ_PIN                       (0)     // define which analog input channel you are going to use
#define RL_VALUE                     (2)     // define the load resistance on the board, in kilo ohms
#define CLEANAIRRS_RO                (3.51)  // define the rs/ro ratio in clean air, given in datasheet

/***********************Software Related Macros***********************************/
#define CALIBARAION_SAMPLE_TIMES     (50)    // define how many samples you are going to take in the calibration phase
#define CALIBRATION_SAMPLE_INTERVAL  (500)   // define the time interval(in millisecond) between each samples in the calibration phase
#define READ_SAMPLE_INTERVAL         (50)    // define how many samples you are going to take in normal operation
#define READ_SAMPLE_TIMES            (5)     // define the time interval(in millisecond) between each samples in normal operation


/****************************Globals**********************************************/
float COCurve[2] = {-3.892, 2.770};    // B and logA for the given gas
float NH4Curve[2] = {-2.533, 1.999};
float CO2Curve[2] = {-2.825, 2.027};
float AlcoholCurve[2] = {-3.327, 1.904};
float TolueneCurve[2] = {-3.591, 1.653};
float AcetoneCurve[2] = {-3.282, 1.500};
float Ro = 75; // Initializes R0 at 75 kiloohms

void setup()
{
  Serial.begin(9600);

  delay(500);
  Ro = MQCalibration(MQ_PIN, CO2Curve);
  Serial.print(" Ro= ");
  Serial.print(Ro);
  Serial.print(" kohm");
  delay(2000);
}

void loop()
{
  Serial.print("CO2:");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, CO2Curve));
  Serial.print("ppm    ");
  Serial.print("CO:");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, COCurve));
  Serial.print("ppm    ");
  Serial.print("NH4:");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, NH4Curve));
  Serial.print("ppm    ");
  Serial.print("Alcohol:");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, AlcoholCurve));
  Serial.print("ppm");
  Serial.print("Toluene");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, TolueneCurve));
  Serial.print("ppm");
  Serial.print("Acetone");
  Serial.print(MQGetPercentage(MQRead(MQ_PIN)/Ro, AcetoneCurve));
  Serial.print("ppm");
  Serial.println(" ");
}

/****************** MQResistanceCalculation ****************************************
 * Input:   raw_adc - raw value read from ADC (represents voltage)
 * Output:  Calculated sensor resistance
 * Remarks: The sensor and the load resistor form a voltage divider.
 *          Given the voltage across the load resistor and its resistance,
 *          the sensor resistance can be derived.
 ************************************************************************************/
float MQResistanceCalculation(int raw_adc)
{
    float r;
    r = (RL_VALUE * (1023 - raw_adc) / raw_adc);
    return r;
}

/*************************** MQRead ************************************************
 * Input:   mq_pin - analog channel
 * Output:  Rs of the sensor
 * Remarks: Uses MQResistanceCalculation to compute sensor resistance (Rs).
 *          Rs varies depending on gas concentration.
 *          Sampling count and interval are configurable via macros.
 ************************************************************************************/
float MQRead(int mq_pin)
{
    int i;
    float rs = 0;

    for (i = 0; i < READ_SAMPLE_TIMES; i++)
    {
        rs += MQResistanceCalculation(analogRead(mq_pin));
        delay(READ_SAMPLE_INTERVAL);
    }

    rs = rs / READ_SAMPLE_TIMES;
    return rs;
}

/*************************** MQGetPercentage ***************************************
 * Input:   rs_ro_ratio - Rs divided by Ro
 *          pcurve      - pointer to gas curve
 * Output:  Gas concentration in ppm
 * Remarks: Uses the slope and intercept of a logarithmic curve.
 *          Converts log-scale result back to linear scale using pow(10, ...).
 ************************************************************************************/
int MQGetPercentage(float rs_ro_ratio, float *pcurve)
{
    return pow(10, pcurve[1] + pcurve[0] * log10(rs_ro_ratio));
}

/*************************** MQCalibration *****************************************
 * Input:   mq_pin - analog channel
 * Output:  Ro of the sensor
 * Remarks: Assumes clean air conditions.
 * Computes Rs and derives Ro using a known reference (e.g., 400 ppm CO2).
 ************************************************************************************/
float MQCalibration(int mq_pin, float *pcurve)
{
    int i;
    float ro;
    float val = 0;

    // Take multiple samples
    for (i = 0; i < CALIBARAION_SAMPLE_TIMES; i++)
    {
        val += MQResistanceCalculation(analogRead(mq_pin));
        delay(CALIBRATION_SAMPLE_INTERVAL);
    }

    // Average value
    val = val / CALIBARAION_SAMPLE_TIMES;

    // Calculate Ro assuming 400 ppm CO2
    ro = val / pow(10, ((log10(400) - CO2Curve[1]) / CO2Curve[0]));

    return ro;
}
```

---

## MS1100 VOC Sensor (CJMCU-1100)

{% include figure.html src="/assets/images/environmental_sensors/gas_sensor/MS1100_VOC_sensor.png" caption="MS1100 VOC Sensor (CJMCU-1100)" caption_prefix="Fig 3:" width="60%" %}

This sensor is very similar to the MQ-135 sensor. It has a resistive sensor that requires 3-5 minutes of warmup, and has both an analog out and digital output. It is also exponentially sensitive to the gases it detects, and its behavior can be linearized on a log-log graph.

Unlike the MQ-135 sensor, it does not detect carbon dioxide, carbon monoxide or ammonium. The MS1100 is sensitive to [formaldehyde, toluene, benzene, alcohol and methane](https://cdn.instructables.com/ORIG/FZB/W1GP/IPTZRTHJ/FZBW1GPIPTZRTHJ.pdf).

The load resistance on the breakout board is assumed to be 2 kilohms. Unlike the datasheet for the MQ-135, the MS-1100 does not use an Ro value calibrated at 100 ppm ammonia; the behavior of the resistor is calculated with respect to the resistance in clean air. This means that, to use the sensitivity given in the data sheet, one need only record the average resistor value for a minute or so in clean air, then compare future resistor values to that average value.

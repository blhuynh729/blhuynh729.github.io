---
title: Stuff in the Air 
has_children: true
layout: page
nav_order: 2
parent: What are you Interested in sensing?
---



The gas sensors listed below are capable of detecting a wide variety of compounds in the air. It is important to note that while these sensors are sensitive to a variety of compounds, they are not specifically sensitive to them: the sensor produces one signal for all gases, and an increase in the concentration of any of those gases will create the same signal, albeit of slightly different amplitude. So, if you want to measure just one of the gases in a gas sensor’s capacity for detection, you should be reasonably sure that none of the other gases it detects are going to fluctuate significantly while you’re measuring your target gas. If you’re interested in measuring multiple of the gases it can detect that’s fine too, but you won’t be able to differentiate which specific gas is fluctuating.

Additionally, it is possible to calibrate these sensors to calculate the particular concentration of a gas in parts per million. There are pages of code below that attempt to accomplish this. However, calibrating these sensors is difficult, so do not expect those numbers to be particularly accurate. A more realistic use case for these gas sensors is to detect spikes in concentration, rather than continually monitoring real concentration. This can be done using the sensor’s digital outputs, or just calculating a confidence interval for the analog value and triggering something when the analog value goes too high.

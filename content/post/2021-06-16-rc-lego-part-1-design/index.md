---
categories:
- KDE
date: "2021-06-16T15:00:00Z"
tags:
- KDE
- Qt
- Arduino
- Lego
title: Building RC LEGO with Arduino and Qt
---
<style type="text/css">
.image-wire {
    width: calc(30% - 15px);
    float: left;
    margin-right: 15px;
}
.l293-schema {
    width: calc(25% - 15px);
    float: left;
    margin-right: 15px;
}
</style>

Recently my 4 year-old stepson saw a kid with an RC racing car in a park. He really wanted
his own, but with Christmas and his birthday still being a long way away, I decided to
solve the "problem" by combining three things I'm really passionate about: LEGO, electronics
and programming.

In this short series of blogs I'll describe how to build one such car using LEGO, Arduino and
a bit of C++ (and Qt, of course!).

## LEGO

Obviously, we will need some LEGO to build the car. Luckily, I bought LEGO Technic [Mercedes Benz Arocs 3245
(40243)][lego-arocs] last year. It's a big build with lots of cogs, one electric engine and bunch of pneumatics. 
I can absolutely recommend it - building the set was a lot of fun and thanks to the Power Functions it has
a high play-value as well. There's also fair amount of [really good MOCs][lego-arocs-mocs], especially
the [MOC 6060 - Mobile Crane by M_longer][lego-moc-6060] is really good. But I'm digressing here. :)

{{<
    figure src="images/lego-40243-arocs.jpg"
    alt="Mercedes Benz Arocs 3245 (40243)"
    caption="Mercedes Benz Arocs 3245 (40243)"
    class="image left"
>}}
{{<
    figure src="images/lego-40243-arocs-box.jpg"
    alt="Mercedes Benz Arocs 3245 (40243)"
    caption="Mercedes Benz Arocs 3245 (40243)"
    class="image right"
>}}

<div class="clear"></div>

The problem with Arocs is that it only has a single Power Functions engine ([99499 Electric Power Functions Large Motor][lego-part-99499])
and we will need at least two: one for driving and one for steering. So I bought a second one. I bought the same one,
but a smaller one would probably do just fine for the steering.

{{<
    figure src="images/99499-engine.jpg"
    link="https://rebrickable.com/parts/99499/electric-power-functions-large-motor-with-dark-bluish-gray-bottom/"
    alt="LEGO Power Functions engine (99499)"
    caption="LEGO Power Functions engine (99499)"
    class="image" >}}

I started by prototyping the car and the drive train, especially how to design the gear ratios to not overload
the engine when accelerating while keeping the car moving at reasonable speed.

{{< figure src="images/prototype-01.jpg" alt="First prototype of engine-powered LEGO car" caption="First prototype of engine-powered LEGO car" class="image-small" >}}

Turns out the [76244 Technic Gear 24 Tooth Clutch][lego-part-76244] is really important as it prevents the gear
teeth skipping when the engine stops suddenly, or when the car gets pushed around by hand.

{{<
    figure src="images/76244-clutch.webp"
    link="https://rebrickable.com/parts/76244/technic-gear-24-tooth-clutch-with-dark-bluish-gray-center/"
    alt="76244 Technic Gear 24 Tooth Clutch"
    caption="76244 Technic Gear 24 Tooth Clutch"
    class="image-small"
>}}

Initially I thought I would base the build of the car on some existing designs but in the end I just started building
and I ended up with this skeleton:

{{<
    figure src="images/remotebrick-skelet.jpg"
    alt="Skelet of first version of the RC car"
    caption="Skelet of first version of the RC car"
    class="image" 
>}}

The two engines are in the middle - rear one powers the wheels, the front one handles the steering using the 
[61927b Technic Linear Actuator][lego-part-61927b]. I'm not entirely happy with the steering, so I might rework
that in the future. I recently got [Ford Mustang (10265)][lego-mustang] which has a really interesting steering
mechanism and I think I'll try to rebuild the steering this way.

## Wires

{{<
    figure src="images/58118-wire.jpg"
    link="https://rebrickable.com/parts/58118/electric-power-functions-extension-wire-with-one-light-bluish-gray-end-50cm/"
    alt="58118 Eletric Power Functions Extension Wires"
    class="image image-wire"
>}}

<p class="right" markdown="1" style="width: calc(70% - 15px);">
We will control the engines from Arduino. But how to connect the LEGO Power Functions to an Arduino? Well, you
just need to buy a bunch of those <a href="https://rebrickable.com/parts/58118/electric-power-functions-extension-wire-with-one-light-bluish-gray-end-50cm/">58118 Electric Power Functions Extension Wires</a>, cut them and
connect them with DuPont cables that can be connected to a breadboard. Make sure to buy the "with one Light Bluish
Gray End" version - I accidentally bought cables which had both ends light bluish, but those can't be connected to the <a href="https://rebrickable.com/parts/16511/battery-box-power-functions-4-x-11-x-7-with-orange-switch-and-dark-bluish-gray-covers-new-version/">16511 Battery Box</a>.

<div class="clear"></div>

We will need 3 of those half-cut PF cables in total: two for the engines and one to connect to the battery box. You
probably noticed that there are 4 connectors and 4 wires in each cable. Wires <em>1</em> and <em>4</em> are always
GND and 9V, respectively, regardless of what position is the switch on the battery pack. Wires <em>2</em> and <em>3</em>
are 0V and 9V or vice versa, depending on the position of the battery pack switch. This way we can control the engine
rotation direction.

{{<
    figure src="images/pf-wires-schema.png"
    link="images/pf-wires-schema.png"
    alt="LEGO Power Functions wires"
    title="Schematics of PF wires"
    align="center"
>}}

For the two cables that will control the engines we need all 4 wires connected to the DuPont cable. For the one cable
that will be connected to the battery pack we only need the outter wires to be connected, since we will only use the
battery pack to provide the power - we will control the engines using Arduino and an integrated circuit.

I used the glue gun to connect the PF wires and the DuPont cables, which works fairly well. You could use a solder
if you have one, but the glue also works as an isolator to prevent the wires from short-circuiting.

{{<
    figure src="images/pf-wires-dupont.jpg"
    link="images/pf-wires-dupont.jpg"
    alt="LEGO PF cable connected to DuPont wires"
    title="LEGO PF cable connected to DuPont wires"
>}}


This completes the LEGO part of this guide. Next comes the electronics :)

## Arduino

To remotely control the car we need some electronics on board. I used the following components:

* Arduino UNO - to run the software, obviously
* HC-06 Bluetooth module - for remote control
* 400 pin bread board - to connect the wiring
* L293D integrated circuit - to control the engines
* 1 kΩ and 2 kΩ resistors - to reduce voltage between Arduino and BT module
* 9V battery box - to power the Arduino board once on board the car
* M-M DuPont cables - to wire everything together

The total price of those components is about €30, which is still less than what I paid for the LEGO engine and PF wires.

Let's start with the Bluetooth module. There are some really nice guides online how to use them, I'll try to describe
it quickly here. The module has 4 pins: <code>RX</code>, <code>TX</code>, <code>GND</code> and <code>VCC</code>.
<code>GND</code> can be connected directly to Arduino's <code>GND</code> pin. <code>VCC</code> is power supply for the
bluetooth module. You can connect it to the <code>5V</code> pin on Arduino. Now for <code>TX</code> and <code>RX</code>
pins. You could connect them to the <code>RX</code> and <code>TX</code> pins on the Arduino board, but that makes it
hard to debug the program later, since all output from the program will go to the bluetooth module rather than our
computer. Instead connect it to pins <code>2</code> and <code>3</code>. <em>Warning</em>: you need to use a voltage
divider for the <code> RX</code> pin, because Arduino operates on 5V, but the HC-06 module operates on 3.3V. You can
do it by putting a 1kΩ resistor between Arduino pin <code>3</code> and HC-06 <code>RX</code> and 2kΩ resistor between
Arduino <code>GND</code> and HC-06 <code>RX</code> pins.

Next comes up the L293D integrated circuit. This circuit will allow us to control the engines. While in theory we
could hook up the engines directly to the Arduino board (there's enough free pins), in practice it's a bad idea. The
engines need 9V to operate, which is a lot of power drain for the Arduino circuitry. Additionally, it would mean that
the Arduino board and the engines would both be drawing power from the single 9V battery used to power the Arduino.

Instead, we use the L293D IC, where you connect external power source (the LEGO Battery pack in our case) to it as well
as the engines and use only a low voltage signal from the Arduino to control the current from the external power
source to the engines (very much like a transistor). The advantage of the L293D is that it can control up to 2 separate
engines and it can also reverse the polarity, allowing to control direction of each engine.

Here's schematics of the L293D:

{{<
    figure src="images/l293d-schema.png"
    link="images/l293d-schema.png"
    alt="L293D Schematics"
    caption="L293D Schematics"
    class="image l293-schema"
>}}

<p class="right" style="width: calc(75% - 15px);">
To sum it up, <code>pin 1 (Enable 1,2)</code> turns on the left half of the IC, <code>pin 9 (Enable 3,4)</code> turns
on the right half of the IC. Hook it up to Arduino's 5V pin. Do the same with <code>pin 16 (VCC1)</code>, which powers
the overall integrated circuit. The external power source (the 9V from the LEGO Battery pack) is connected to
<code>pin 8 (VCC2)</code>. <code>Pin 2 (Input 1)</code> and <code>pin 7 (Input 2)</code> are connected to Arduino and
are used to control the engines. <code>Pin 3 (Output 1)</code> and <code>pin 6 (Output 2)</code> are output pins that
are connected to one of the LEGO engines. On the other side of the circuit, <code>pin 10 (Input 3)</code> and
<code>pin 15 (Input 4)</code> are used to control the other LEGO engine, which is connected to <code>pin 11 (Output 3)
</code> and <code>pin 14 (Output 4)</code>. The remaining four pins in the middle (<code>4</code>, <code>5</code>,
<code>12</code> and <code>13</code> double as ground and heat sink, so connect them to GND (ideally both Arduino and
the LEGO battery GND).</p>

<div class="clear"></div>

Since we have 9V LEGO Battery pack connected to <code>VCC2</code>, sending 5V from Arduino to <code>Input 1</code> and
0V to <code>Input 2</code> will cause 9V on <code>Output 1</code> and 0V on <code>Output 2</code> (the engine will spin
clockwise). Sending 5V from Arduino to <code>Input 2</code> and 0V to <code>Input 1</code> will cause 9V to be on
<code>Output 2</code> and 0V on <code>Output 1</code>, making the engine rotate counterclockwise. Same goes for the
other side of the IC. Simple!

{{<
    figure src="images/arduino-wires-1.jpg"
    link="images/arduino-wires-1.jpg"
    alt="Photo of all electronic components wired together"
    class="image left"
>}}
{{<
    figure src="images/arduino-wires-2.jpg"
    link="images/arduino-wires-2.jpg"
    alt="Photo of all electronic components wired together"
    class="image right"
>}}

<div class="clear"></div>

## Conclusion

I also built a LEGO casing for the Arduino board and the breadboard to attach them to the car. With some effort I
could probably rebuild the chassis to allow the casing to "sink" lower into the construction.

{{<
    figure src="images/remotebrick-arduino.jpg"
    link="images/remotebrick-arduino.jpg"
    alt="Photo of LEGO car with the electronics on board."
>}}

The batterry packs (the LEGO Battery box and the 9V battery case for Arduino) are nicely hidden in the middle
of the car on the sides next to the engines.

{{<
    figure src="images/remotebrick-battery-1.jpg"
    link="images/remotebrick-battery-1.jpg"
    alt="Photo of the LEGO Battery Box"
    class="image left"
>}}
{{<
    figure src="images/remotebrick-battery-2.jpg"
    link="images/remotebrick-battery-2.jpg"
    alt="Photo of the Arduino 9V battery case"
    class="image right"
>}}

<div class="clear"></div>

Now we are done with the hardware side - we have a LEGO car with two engines and all the electronics wired together
and hooked up to the engines and battery. In the next part we will start writing software for the Arduino board so
that we can control the LEGO engines programmatically. Stay tuned!

[lego-arocs]: https://www.lego.com/en-us/product/mercedes-benz-arocs-3245-42043
[lego-mustang]: https://www.lego.com/en-us/product/ford-mustang-10265
[lego-arocs-mocs]: https://rebrickable.com/search/?q=42043&search_type=all
[lego-moc-6060]: https://rebrickable.com/mocs/MOC-6060/M_longer/42043-alternate-mobile-crane/#details
[lego-part-99499]: https://rebrickable.com/parts/99499/electric-power-functions-large-motor-with-dark-bluish-gray-bottom/
[lego-part-61927b]: https://rebrickable.com/parts/61927b/technic-linear-actuator-with-dark-bluish-gray-ends-improved-version/
[lego-part-16511]: https://rebrickable.com/parts/16511/battery-box-power-functions-4-x-11-x-7-with-orange-switch-and-dark-bluish-gray-covers-new-version/


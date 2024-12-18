---
categories:
- KDE
date: "2013-11-13T11:40:17Z"
tags:
- Akonadi
- Bluez5
- KDE
- Nepomuk
- PIM
- Solid
- sprint
title: 'KDE PIM Sprint Report: Day -2'
---
The KDE PIM sprint in Brno, Czech republic starts this Friday, but some KDE developers just [could not wait](http://www.afiestas.org/going-to-brno-for-a-week-of-awesome) and decided to come to Brno already on Monday to work with the Red Hat KDE Team. Some of the stuff we are hacking right now is PIM related, but we also want to use this few days to work on other projects that we are involved in, but that are not strictly related to KDE PIM.

So I'm just sitting right now in the office with Àlex Fiestas, David Edmundson, Vishesh Handa, Martin Klapetek and my colleagues Jan Grulich and Lukáš Tinkl. I'm waiting for Àlex to finish polishing his port of BlueDevil to BlueZ5, so that we can start hacking on KScreen - there are far too many bugs that need our attention and we've been neglecting KScreen quite a lot in the past few months. We want to fix the annoying crash in our KDED module, solve a regression that my bold attempt to fix an another crash in KDED caused and discuss the future direction of KScreen - me and Àlex have different opinions on where we should go next with KScreen so this is a great opportunity to find a common path :-)

Vishesh has been relentlessly working on improving the semantic technologies in KDE and from what I've seen, it's something to really look forward to ;-)

Yesterday, me and Vishesh discussed the possibility of using Akonadi for handling tags of PIM data (emails, contacts, events, ...) and I implemented the feature into Akonadi and the Akonadi client libraries - only as a proof of concept though, I have no intention of shipping it at this point - much more work and discussion is needed about this. I also made further progress with implementing the IDLE extension to the Akonadi protocol. It allows the Akonadi server to send notifications about changes to clients using the Akonadi protocol, instead of D-Bus (performance++)

{{< figure src="images/IMG_00000562-1024x576.jpg" link="images/IMG_00000562.jpg" title="KDE hackers fighting bugs and bringing the awesome to our users" >}}

David Edmundson and Martin Klapetek have been working on creating Plasma theme for SDDM (a new display manager that for example Fedora intends to ship instead of KDM), and today they've been improving KPeople, the meta-contact library used by KDE Telepathy and that they will also integrate with KDE PIM.

My colleagues Lukáš Tinkl and Jan Grulich are working on plasma-nm, the new Plasma applet for network management in KDE.

More people will arrive to Brno tomorrow and the rest of KDE PIM sprint attendees will arrive during Friday, when the real sprint begins. Stay tuned for more news (not just) from the PIM world ;-)

---
categories:
- KDE
date: "2014-08-15T09:08:44Z"
tags:
- Gstreamer
- KDE
- Phonon
- Plasma
- Randa
title: Hacking my way through Randa
---

Hello! This is me, reporting from Randa KDE meetings!

{{< figure src="images/clock-date-66x300.png" alt="Date in the Digital Clock applet" class="small alignright" width="66" height="300" >}}

I decided to go to Randa to work with the KDE Mutlimedia team on getting Phonon GStreamer 1.0 port out and to discuss future directions of Phonon. As you could figure out [from Harald's blog](http://apachelog.wordpress.com/2014/08/12/phonon-gstreamer-vlc-4-8-beta/), my mission was successful (mostly). All the original porting work was done by Rohan Garg, Torrie Fisher and Harald Sitter, so big thanks to them! Here in Randa I was mostly fixing existing Phonon GStreamer bugs and polishing the 1.0 port to make it ready for release (had to undust my glib skills :P). An just three days ago, we pushed out first public beta. That night we also fixed a bug that made videos in Gwenview have a blue tint, but the fix is not in the beta release.

Even though it was not part of the plans for Randa, I spend all Wednesday trying to fix some issues in Plasma 5 that were too annoying for me to just continue ignoring them - so in Plasma 5.0.2 the [labels in Kickoff will finally be properly centered](https://bugs.kde.org/show_bug.cgi?id=336705) and in Plasma 5.1 the [date will return to the Digital Clock applet](https://bugs.kde.org/show_bug.cgi?id=335006). I also submitted patches to add keyboard layout changer and CapsLock-on warning to the new screen locker.

{{< figure src="images/kwin_screenshot_bZ6370-e1408086353114-300x193.png" link="images/kwin_screenshot_bZ6370-e1408086353114.png" alt="Screenlocker with keyboard layout switcher and caps lock warning" class="alignleft small" width="300" height="193" >}} 

I tried to avoid working on KDE PIM here, but got bribed by chocolate into fixing a specific bug related to contacts and events tags, which I started working on, but haven't finished yet.

And now it's time to leave. If it was up to me, I could just stay in this beautiful place all year... :-)

Many thanks to Mario and the team for organizing the Randa meetings, many thanks to sponsors who made this possible financially and finally huge round of applause to the kitchen team for preparing such delicious meals :-)

See you all in Brno in couple weeks!

{{< figure src="images/Banner400.going.png" alt="I'm going to Akademy!" width="400" height="178" >}}

---
categories:
- kde
date: "2012-09-27T16:51:02Z"
tags:
- display management
- kde
- krandr
- plasma
- qml
title: Display Management in KDE
---
As some of you might have noticed, display management in KDE is not really something we could be proud of. It does not work as expected, it lacks some features and it's not really maintained. Time to change it, don't you think? :-)

The effort was initiated by Alex Fiestas (who is too busy to making KDE rock, so the blog post is up to me :-)). Alex has written the libkscreen library that provides information about available/connected/enabled outputs and notifications about their changes. He also intends to write a KDED daemon that would listen for these events and depending on connected monitors (every monitor can be uniquely identified by it's [EDID](http://en.wikipedia.org/wiki/Extended_display_identification_data)) it would load specific configuration. For example, docking your notebook into a docking station at work would automatically turn on a second monitor and place it left of the notebook screen (or whatever you configure the first time you do it). Undocking the notebook and connecting a data projector in a meeting room would automatically set clone mode etc. etc.

This also requires a new UI in System Settings which is the part I'm working on.

{{< figure src="images/displayconfiguration-300x229.png" link="images/displayconfiguration.png" alt="Display Configuration KCM" >}}

It's written in QML and allows you to configure your displays by dragging them around rather than configuring them through combo boxes. Picture is worth a thousand words, and when it's a moving picture, well.....

<video width="480" height="384" controls="controls" src="/assets/videos/displayconfiguration.ogv">
Your browser does not support the video tag.
</video>

[Download OGV (1.8 MB)](/assets/videos/displayconfiguration.ogv) _(in real time the animations are faster and smoother of course)_

The best part of all this is that users won't be exposed to the KCM very often, because connecting an already-known monitor will configure it and place it automatically depending on the last configuration. Connecting a previously unknown output should pop up a simple window/dialog where user can quickly select whether the display should be left/right/clone of the active screen or open the KCM and perform more advanced configuration.

{{< figure src="images/new-output-notification-300x155.png" link="images/new-output-notification.png" title="New Output Plasma Notification" >}}
_(Note: this is just a preview, we will have the icons made by someone sane)_

Right now I'm abusing the krandrtray icon for the applet. It does not provide any rich features like krandrtray though, it only has a context menu with a single action to start the KCM. This should be enough because unlike current krandr-based display configuration there most things will work automagically.

And of course we will take care of displaying these dialogs and windows on the _correct_ screen (that is the one that is connected and enabled) :-)

Finally, we want to use KWin scripting engine to display a black overlay over the entire desktop when changing display configuration in order to hide Plasma flickering and resizing from users and make it look like a smooth transition.

Hopefully I didn't miss anything :)

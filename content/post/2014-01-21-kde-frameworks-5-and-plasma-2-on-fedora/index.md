---
categories:
- KDE
- Fedora
date: "2014-01-21T20:23:09Z"
tags:
- Fedora
- Frameworks
- KDE
- Plasma
- Qt 5
title: KDE Frameworks 5 and Plasma 2 on Fedora
---

{{< figure src="images/200px-Fedora_logo.svg_.png" alt="Fedora logo" class="alignleft large" >}} First technological preview of KDE Frameworks 5 has been released [few weeks ago](http://dot.kde.org/2014/01/07/frameworks-5-tech-preview), a clear signal for us in Fedora KDE SIG to roll up our sleeves, heat up the builders and start packaging. For the last few days Martin Bříza, Jan Grulich, Lukáš Tinkl, Siddhart Sharma and I were working on bringing KDE Frameworks and Plasma 2 to Fedora. Now we are done and you can try out current technological preview of KF5 and Plasma 2 directly on your system without having to compile anything or messing up your default profile.

If you are a KDE developer, a Qt developer interested in using KF5 in your application or just a curious user, all you have to do is adding kde-frameworks repo to yum and install the packages! The repository is available in [Copr](http://copr.fedoraproject.org/coprs/dvratil/kde-frameworks/), just download the [repo](http://copr.fedoraproject.org/coprs/dvratil/kde-frameworks/repo/fedora-20-i386/) file to `/etc/yum.repos.d` and you can start using Frameworks and Plasma 2. All Frameworks packages are prefixed with `kf5-` to prevent conflicts with regular packages and at this point they are installed into `/opt/kf5` prefix instead of `/usr`

If you install `kde5-workspace` package, you can also have a sneak peek at what Plasma guys are doing for Plasma 2! Your display manager should have "_KDE Plasma Workspace 2_" entry in session types list, which will log you into Plasma 2 session. Just remember that Plasma 2 is still under heavy development and not yet ready for day to day use.

We will now start making the KDE Frameworks 5 packages co-installable with KDE 4 into regular prefix and hopefully we will ship KDE Frameworks 5 as a feature in Fedora 21 available to everyone.

Btw if you are coming to Brno for [DevConf](http://devconf.cz/) (February 7th - 9th) and want to know more about KDE Frameworks and Plasma 2, make sure to visit "[KDE Frameworks 5](http://developerconference2014.sched.org/event/efb9403d5c89da6e2e0afc4c8d1f11fd)" talk by me and Siddhart Sharma ;-)

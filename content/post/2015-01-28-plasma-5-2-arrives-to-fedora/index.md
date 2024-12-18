---
categories:
- Fedora
- KDE
date: "2015-01-28T22:01:30Z"
tags:
- Fedora
- KDE
- Plasma
params:
  thumbnail: thumbnails/fedora-kde.png
title: Plasma 5.2 arrives to Fedora
---

It's here! Plasma 5.2 has been released just yesterday and you don't have to wait a single minute longer to update your beloved Fedora boxes :-)

I won't go into detail here about all the new *awesome* things that are waiting for you in Plasma 5.2, but I totally recommend that you go and read [Plasma 5.2: The Quintessential Breakdown](https://kver.wordpress.com/2015/01/22/plasma-5-2-the-quintissential-breakdown) by Ken Vermette while you are waiting for your package manager to wade through the update. You can also read the official [Plasma 5.2 release announcement](https://dot.kde.org/2015/01/27/plasma-52-beautiful-and-featureful), it has fancy animated screenshots ;).

And there's other news related to Plasma 5.2 and Fedora: Fedora rawhide has been updated to Plasma 5.2 too. This means that KDE SIG will ship [Plasma 5 in Fedora 22](https://fedoraproject.org/wiki/Changes/Plasma_5)! Of course we will still maintain the Copr repository for our Fedora 20 and Fedora 21 users.

So, how to get Plasma 5.2 on Fedora?

On rawhide, just do `dnf update`. On Fedora 20 and Fedora 21, if you are already running Plasma 5.1.2 from [dvratil/plasma-5](http://copr.fedoraproject.org/coprs/dvratil/plasma-5) Copr, then all you need to do is to run `dnf update.` If you are running Plasma 5.1.95 (aka Plasma 5.2 beta) from `dvratil/plasma-5-beta` Copr, then it's time to switch back to stable:

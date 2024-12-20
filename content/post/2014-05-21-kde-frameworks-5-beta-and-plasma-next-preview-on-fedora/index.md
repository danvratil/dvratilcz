---
categories:
- KDE
- Fedora
date: "2014-05-21T17:19:43Z"
tags:
- Fedora
- KDE
- Frameworks
- Plasma
- Qt
title: KDE Frameworks 5 Beta and Plasma Next preview on Fedora!
---

The Fedora KDE SIG brings you all the new and cool stuff from KDE Frameworks and Plasma Next worlds!

First, our [Copr repository with KDE Frameworks](http://copr.fedoraproject.org/coprs/dvratil/kde-frameworks/) has been updated to 4.99.0 release, so go get it! All frameworks are co-installable with KDE 4, so you can develop against KF5 without needing any special setup. Also KDE Frameworks 5 were approved as [feature for Fedora 21](https://fedoraproject.org/wiki/Changes/KDE_Frameworks_5), which means that in next Fedora release, we will ship all Frameworks in the Fedora repositories! There are already some packages imported into rawhide, the rest will follow in next weeks.

And now for the awesome news: [we have a live ISO with Plasma Next preview](http://dvratil.fedorapeople.org/kde5/iso/)!

{{< figure src="images/plasma-live-sddm-300x225.png" alt="Fedora Plasma Next Live ISO Login screen" title="Fedora Plasma Next Live ISO Login screen" class="aligncenter large" >}}

We packaged as much as we could (but still not everything!), including Rekonq, Dolphin, System Settings, Baloo, Milou and more - all built against Qt 5 and KDE Frameworks 5 of course.

[Download Fedora Plasma Next Live ISO](http://dvratil.fedorapeople.org/kde5/iso/) or [get it via torrent](http://rdieter.fedorapeople.org/torrents/Fedora20-Plasma-Next-20140521.torrent).

{{< figure src="images/fedora-plasma-2-150x150.png" alt="Fedora Plasma" title="Fedora Plasma" class="tiny" >}}
{{< figure src="images/fedora-plasma-3-150x150.png" alt="Fedora Plasma" title="Fedora Plasma" class="tiny" >}}


If you are really interested in trying locally, you can check out all the additional packages from [kde-frameworks-unstable](http://copr.fedoraproject.org/coprs/dvratil/kde-frameworks-unstable/) and [plasma-next](http://copr.fedoraproject.org/coprs/dvratil/plasma-next/) COPRs, but remember that all packages from those repositories install to /usr, so you will get conflicts with KDE 4 packages.

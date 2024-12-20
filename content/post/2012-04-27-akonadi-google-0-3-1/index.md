---
categories:
- KDE
date: "2012-04-27T15:01:00Z"
tags:
- Akonadi
- Google
- KDE
- libkgoogle
- PIM
title: Akonadi Google 0.3.1
---

Hi! Nearly four weeks after the [0.3]({{< ref 2012-04-01-akonadi-google-0-3-arrives.md >}}  release of Akonadi resources for
Google there's a new version with just a few, but important bug fixes and improvements.

**UPDATE:** In order to use the Google resources, you either need KDE 4.9 (which the resources are part of), or you need **to install LibKGAPI 0.4.1 (or newer) and Akonadi resources from** `git://anongit.kde.org/scratch/dvratil/akonadi-google-resources`. See [this discussion](https://bugs.kde.org/show_bug.cgi?id=301240#c3) for details.

Fixed bugs and crashes:

- [Bug #296541](https://bugs.kde.org/show_bug.cgi?id=296541) - Uncaught exception in signal handler in Contacts resource
- [Bug #297824](https://bugs.kde.org/show_bug.cgi?id=297824) - Uncaught exception in signal handler in Calendar resource
- [Bug #297548](https://bugs.kde.org/show_bug.cgi?id=297548) - Crash at akonadi start after having added a new contact - resource
- [Bug #298054](https://bugs.kde.org/show_bug.cgi?id=298054) - Can't build libkgoogle with KCal
- [Bug #298518](https://bugs.kde.org/show_bug.cgi?id=298518) - Unable to edit newly created events
- [Bug #298519](https://bugs.kde.org/show_bug.cgi?id=298519) - Deleting events incorrectly reports an error

The first two bugs were especially tricky as I couldn't reproduce them, but many users were affected by ugly and
repeating crashes. But now the "Google experience" is much much better :).

Big thanks go to Alex Fiestas who has contributed various improvements to libkgoogle to better work with 3rd party apps
(so now we can be looking forward to his web-accounts wizard :) ).

**Sources:** [akonadi-google-0.3.1.tar.gz](/assets/akonadi-google-0.3.1.tar.gz) 
(MD5: *fed8d9082547835ab916edd219831cf6)

Bye!

PS: I found this on Akademy wiki, so:

{{< figure src="images/Ak2012_imgoing2.png" title="I'm going to Akademy 2012!" >}}

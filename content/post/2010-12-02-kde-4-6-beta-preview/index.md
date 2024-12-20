---
categories:
- KDE
date: "2010-12-02T23:11:13Z"
tags:
- KDE
title: KDE 4.6 beta preview
---
Based on [KDE 4.6 beta 1](http://www.kde.org/announcements/announce-4.6-beta1.php) release last week, I decidedI to test
the latest KDE snapshot 4.5.82 and here are the news I've found in there :) I haven't been using development snapshots
[I'm creating every week](https://bbs.archlinux.org/viewtopic.php?id=76245) for ArchLinux regularily last few weeks,
since I'm mostly on Fedora now, so the changes are now more obvious for me.

{{< figure src="images/kdm-300x201.png" alt="KDM" class="alignleft" with="300" height="201" >}}

First interesting thing I noticed already in KDM. In the list of available desktop environments, there's no longer any
"KDE", but it's KDE Plasma Workspace!

The first thing after login I was going to test was the new, aesome and almighty Akonadi.  Well - it's cool, I really
like that. On the other hand, I think it's quite slow on my 2x1.5GHz laptop. Loading 6k mails takes considerable amount
of time after the KMail starts. I hope this will get fixed soon or later (most probably later :).

Next think I checked was KAdressBook. I hoped there will be an Akonadi Resource for something like sync with GMail
contacts and calendar, but I haven't find anything, so I will probably have to write something myself :)

Unfortunatelly, Akregator does not store feeds and their content in Akonadi database, which was something I hoped for
since I first heard about KDE PIM2 migrating to Akonadi. It's not a great feature, not definetelly usefull for any
resource integrations (you really don't need to access your feeds from other apps, unless you are writing something
better then Akregator), but I'd like to see all the PIM stuff stored in one DB, which would really simplify backups and
improve portability (when you are migrating between more PCs, possibility to simply take with you just one DB file would
be a nice feature).

{{< figure class="alignright" src="images/plasma_grid1-300x226.png" alt="Plasma Grid Desktop" width="300" height="226" >}}

A really great feature, a very appreciated one is the "Grid desktop" (Desktop Settings -> View -> Layout -> Grid
Desktop).  When you are dragging an applet on you desktop, a grid is displayed allowing you to position the applet and
after you drop it, the applet is automatically aligned to grid.

When you move mouse to a screenedge, a bar with + and - buttons appears allowing you to change the density of the grid.

The new grid functionallity is further extended by applets groups. You can create widget which contains tabs. In each
tab there is a grid and you can put multiple applets into the grid. Another cool feature, don't you think? I wish there
were more usefull applets like this, instead of something like KDE Observatory.

{{< figure class="alignleft size-medium wp-image-18" src="images/applet_groups-300x188.png" alt="" width="300" height="188" >}}

However I still found some issues with this applet, mostly when you try to insert a widget which is bigger then the
Group widget, it somehow overflows.

When we are talking about Plasma, I must mention Activities. It's a very cool feature, but it's not used a lot. Probably
because they still were unperfect, I personally for example really minded that the activities were all named like
Activity #1, Activity #2...now finally you can finally name your activities as you wish and they are more stable.

KDE 4.6 is also a great step toward HAL-less KDE. The PowerDevil has UPower backend now, but it's not yet enabled by
default, HAL is still preferred, because it provides more features, but it's possible to already use it for watching
battery/AC state and scaling CPU, but some features are slower then with HAL. UDisk was also implemented in 4.5.73
bringing support for mounting devices without HAL.

KDE 4.6 will be another great release in the KDE4 series, I'm happy to see KDE still evolving and moving towards modern
and fast desktop environment.

Czech version (not exact translation) can be found on [my blog](http://www.abclinuxu.cz/blog/Archar/2010/12/kde-4.5.82)
on ABCLinuxu.cz.

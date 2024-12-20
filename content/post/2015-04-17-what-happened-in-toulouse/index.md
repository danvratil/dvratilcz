---
categories:
- kDE
date: "2015-04-17T23:54:52Z"
tags:
- Akonadi
- KDE
- PIM
title: What happened in Toulouse?
---

... a KDE PIM sprint happened in Toulouse! And what happened during that sprint? Well, read this wholly incomplete report!

Let's start with the most important part: we decided what to do next! On the last PIM sprint in Munich in November when Christian and Aaron introduced their new concept for next version of Akonadi, we decided to refocus all our efforts on working on that which meant switching to maintenance mode of KDE PIM for a very long time and then coming back with a big boom. In Toulouse we discussed this plan again and decided that it will be much better for the project and for the users as well if we continue active development of KDE PIM instead of focusing exclusively on the "next big thing" and take the one-step-at-the-time approach. So what does that mean?

[We will aim towards releasing KF5-based KDE PIM in August](http://osdir.com/ml/kde-pim/2015-04/msg00135.html) as part of KDE Applications 15.08. After that we will be working on fixing bugs, improving the current code and adding new features like normally, while at the same time preparing the code base for migration to Akonadi 2 (currently we call it Akonadi Next but I think eventually it will become "2"). I will probably write a separate technical blog post on what those "preparations" mean. In the meantime Christian will be working from the other side on Akonadi 2 and eventually both projects should meet "in the middle", where we simply swap the Akonadi 1 backend with the Akonadi 2 backend and ship next version. So instead of one "big boom" release where we would switch to Qt 5 and Akonadi 2 at the same time we do it step-by-step, causing as little disruption to user experience as possible and allowing for active development of the project. In other words *WIN-WIN-WIN* situation for users, devs and the KDE PIM project.

I'm currently running the entire KDE PIM from git master (so KF5-based) and I must say that everything works very well so far. There are [some regression against the KDE 4 version](https://bugs.kde.org/show_bug.cgi?id=346175) but nothing we couldn't handle. If you like to use bleeding-edge versions of PIM feel free to update and help us finding (and fixing) regressions (just be careful not to bleed to death ;-)).

Another discussion we had is closely related to the 15.08 release. KDE PIM is a very huge code base, but the active development team is very small. Even with the incredible Laurent Montel on our side it's still not enough to keep actively maintaining all of the KDE PIM (yes, it's THAT huge ;-)). So we had to make a tough decision: some parts of KDE PIM have to die, at least until a new maintainer steps up, and some will move to extragear and will live their own lives there. What we release as part of KDE Applications 15.08 I call KDE PIM Core and it consists of the core PIM applications: KMail, KOrganizer, KAddressbook, Kleopatra, KNotes and Kontact. If your favorite PIM app is not in the list you can volunteer as a maintainer and help us make it part of the core again. We believe that in this case quality is more important than quantity and this is the trade-off that will allow us to make the next release of PIM the best one to date ;-).

Still related to the release is also reorganization of our repos, as we have some more splitting and indeed some merging ahead of us but we'll post an announcement once everything is discussed and agreed upon.

Thanks to Christian's hard work most of the changes that Kolab did in their fork of KDE PIM has been upstreamed during the sprint. There are some very nice optimizations and performance improvements for Akonadi included (among other things), so indeed the next release will be a really shiny one and there's a lot to look forward to.

Vishesh brought up the topic of our bug count situation. We all realize the sad state of our PIM bugs and we talked a bit about re-organizing and cleaning up our bug tracker. The clean up part has already begun as Laurent with Vishesh have mass-closed over 850 old KMail 1 bugs during the sprint to make it at least a little easier to get through the rest. Regarding the re-organization I still have to send a mail about it but a short summary would be that we want to remove bugzilla components and close bugs for the apps we decided to discontinue and maybe do a few more clean up rounds for the existing bugs.

I'm sure I've forgotten something because much more happened during the sprint but let's just say I'm leaving some topics for others to blog about ;-).

Huge thank you to Franck Arrecot and Kevin Ottens for taking care of us and securing the venue for the sprint! All in all it was a great sprint and I'm happy to say that we are back on track to dominate the world of PIM.

The only disappointment of the entire sprint was my failure to acquire a French beer. I managed to try Belgian, Spanish, Mexican and Argentinian beer but they did not serve any French beer anywhere. Either there's no such thing or it must be really bad...:-)

{{< figure src="images/IMG_0071-e1429305989460-1024x768.jpg" link="images/IMG_0071-e1429305989460.jpg" alt="KDE PIM Sprint in Toulouse" class="aligncenter large" title="KDE PIM Sprint in Toulouse" >}}

We had a great dinner with the local KDE people on Saturday. Also a proof that Laurent is a real person :-D


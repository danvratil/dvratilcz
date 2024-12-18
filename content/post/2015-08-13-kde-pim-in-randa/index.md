---
categories:
- KDE
date: "2015-08-13T21:51:00Z"
tags:
- Akonadi
- KDE
- PIM
- Randa
- sprint
title: KDE PIM in Randa
---

The first release of KDE PIM based on KDE Frameworks 5 and Qt 5, which will be part of the KDE Applications 15.08 release, is [getting closer and closer](https://techbase.kde.org/Schedules/Applications/15.08_Release_Schedule). Except for porting the entire suite from Qt 4 to Qt 5 the team also managed to fix many bugs, add a few new features and do some pretty big performance and memory optimizations. And we already have some new improvements and optimizations stacked in the development branch which will be released in December!

The biggest performance improvement is thanks to switching to a faster implementation of the communication protocol used by applications to talk to the Akonadi server. We also extended the protocol and we can now use it to send change notifications from the Akonadi server to clients much more effectively than previously. Additionally we started cleaning up API of our libraries and improving it in a way that allows for safer and more effective use. None of this was possible in the KDE 4 version of KDE PIM, where we promised API and ABI compatibility with previous releases. For now we decided not to give any such promises for several more releases, so that we can tune the API and functionality even more.

During Akademy the KDE PIM team had a very long session where we analyzed where the project currently stands and we created a vision of where we want KDE PIM to be in the future. We know what parts we want to focus on more now and which parts are less relevant to us. KDE PIM is a huge and rather complicated project, unfortunately the development team is very small and so we have to make the hard and painful decision to lay off some of the features and functionality in exchange for improvement in reliability and user experience of the core parts of the product.

In order to make these decisions the team is going to meet again in couple weeks in Randa alongside many other KDE contributors and projects and will spend there a whole week. During the sprint we want to take a close look at all the parts and evaluate what to do with them as well as plan how to proceed towards Akonadi Next - the new version of Akonadi, which has some major changes in architecture and overall design (see the [Christian's talk from Akademy about Akonadi Next](https://conf.kde.org/en/akademy2015/public/events/259)).

However organizing such sprint is not easy and so we would like to ask for your support by donating to the [KDE Sprints Fundraiser](https://www.kde.org/fundraisers/kdesprints2015/). Although the attendees cover some of the costs themselves, there are still expenses like travel and accommodation that need to be covered. This year the Fundraiser has been extended so that the collected money will also be used to support additional KDE sprints throughout the year.

{{< figure src="images/cropped-web2.png" alt="" class="aligncenter large" >}}

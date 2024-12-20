---
categories:
- KDE
date: "2017-06-21T19:44:56Z"
tags:
- Akonadi
- Facebook
- KDE
- Korganizer
- PIM
title: Facebook Events in KOrganizer
---

Sounds like déjà vu? You are right! We used to have Facebook Event sync in KOrganizer back in KDE 4 days thanks to Martin Klapetek. The Facebook Akonadi resource, unfortunately, did not survive through Facebook API changes and our switch to KF5/Qt5.

I'm using a Facebook event sync app on my Android phone, which is very convenient as I get to see all events I am attending, interested in or just invited to directly in my phone's calendar and I can schedule my other events with those in mind. Now I finally grew tired of having to check my phone or Facebook whenever I wanted to schedule event through KOrganizer and I spent a few evenings writing a brand new Facebook Event resource.

Inspired by the Android app the new resource creates several calendars - for events you are attending, events you are interested in, events you have declined and invitations you have not responded to yet. You can configure if you want to receive reminders for each of those.

Additionally, the resource fetches a list of all your friend's birthdays (at least of those who have their birthday visible to their friends) and puts them into a Birthday calendar. You can also configure reminders for those separately.

{{< figure src="images/fb1.png" alt="Facebook Resource Configuration dialog" >}}
{{< figure src="images/fb2.png" alt="Facebook events in KOrganizer" >}}

The Facebook Sync resource will be available in the next KDE Applications feature release in August.

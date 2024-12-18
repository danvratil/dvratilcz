---
categories:
- KDE
date: "2011-06-27T21:34:21Z"
tags:
- Akonadi
- Google
- KDE
- PIM
title: Akonadi Google Resource, part III
---

It's been more then two weeks since my last update about progress on Akonadi Google Resource, so here we go. Many bugs
in calendar were fixed, resource now supports creating and editing events and Contacts resource can fetch contact
photos.

So let's start with the contacts. I've implemented fetching photos from Google Contacts, so now you can see all your
contacts smiling at you from your address book. Updating/removing photos is on to-do, but there are more important
things to be implemented/fixed first.

Now to calendar resource: you can now finally create and edit events from KOrganizer. I've also fixed some issues with
timezones, recurrence and reminders, so it really seems to work pretty good now. What has to be done are timezones in
recurrence. I've also implemented removing of events, but there seems to be some hidden problem somewhere, because
Akonadi refuses to invoke `itemRemoved()` signal, thus informing the resource, that event was removed and the resource
can't send deletion request to Google Calendar....I hope I'll get to look into this this week. Of course, if you feel
you can do something about it, just send patches ;)

Known bugs: except for the broken deleting of events there is a problem with authentication. Google only remembers the
last authentication token it has issued, so when you have two Calendar resources for example, Google will accept
requests only from the one you added as second. When you re-authenticate the first calendar, Google will forget access
token of the second calendar and vice versa. Using KWallet to store the access token would be probably the best way how
to share a single token among multiple resources and of course it would increase security a lot, but I need to learn how
to do it first :).

And finally, about future of this project...I was in contact with developer of the original Akonadi GData resource (now
called [Akonadi GCalendar & Contacts
resources](https://projects.kde.org/projects/extragear/pim/akonadi-googledata-resource)) and we agreed that it would be
nice to have a C++/Qt library for full support of GData API (including other services, not just calendars and contacts).
I will be slowly moving all the GData-related code from resources to a separate library. My idea is to provide a pure-Qt
library with optional KDE extensions (like conversion to KABC or KCalCore objects), which could be enabled during
build-time, so that the library could be KDE-(in)dependent, depending on developers' needs. But this will be content of
an another blog post, maybe later when things will begin to move. Now is my priority to improve the resource, because
the Akonadi-related code is minimum compared to GData-related code which can be later dragged into the library.

So, that would be all for now, please test the resource and give me some feedback :)

Cheers,

Dan

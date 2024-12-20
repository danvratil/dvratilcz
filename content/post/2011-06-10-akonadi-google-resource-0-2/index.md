---
categories:
- KDE
date: "2011-06-10T21:44:40Z"
tags:
- Akonadi
- Google
- KDE
- PIM
title: Akonadi Google Resource 0.2
---
Hi,

so it's been almost ten days since first version of Akonadi Google Resource and now here comes 0.2. This version
introduces Google Calendar Resource, so that you can finally access Google Calendar from comfortable interface of
KOrganizer.

[UPDATE]({{< ref 2011-06-10-akonadi-google-resource-0-2 >}}): Akonadi Google Resource is now in
KDE git repository!

{{< figure class="alignleft" src="images/ag_cal_settings-272x300.png" alt="Preview of Google Calendar Resource settings dialog" width="272" height="300" >}}

As of now the resource supports read-only access to calendars, so you can just watch your busy schedule, but you still
have to update it in GMail. Some basic write support is the main goal for version 0.3.

A good news is, that the resource supports multiple calendars, so you can finally see all your calendars in KOrganizer,
not just the default one. You have to add a new resource for each calendar you want to access. In configuration dialog
you can then choose, which calendar you want to sync with.

The resource supports, except for the basic properties, multiple attendees, including their roles and types, recurrent
events (but without exceptions) and reminders (popup-dialog and email notification).

As I already said, in 0.3 I'd like to introduce read-write access to Google Calendar and add photo-fetching to the
Contacts resource.

~~If you want to give it a try, you can download 0.2 tarball from~~
~~[here](https://gitorious.org/akonadi-google/akonadi-google/archive-tarball/0.2), or you get the most recent sources from git:~~

~~`git clone git://gitorious.org/akonadi-google/akonadi-google.git`~~

<a name="update"></a> Bye!

*UPDATE:* Akonadi Google Resource is now in KDE git repository. To fetch it, use:
`git clone git://anongit.kde.org/akonadi-google`.

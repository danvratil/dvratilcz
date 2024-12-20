---
categories:
- KDE
date: "2011-09-05T01:11:48Z"
tags:
- Akonadi
- Google
- KDE
- PIM
title: 'Akonadi Google Resource: Tasks support'
---
Hi!

As the title says, I just added support for Google Tasks by creating the Akonadi Google Tasks Resource. The Tasks API
provided by Google is really simple and does not support many properties, only name, summary, due to date, completed
date and status. You can't set progress percentage, start date, attendees nor reminders (this sucks!). Despite the fact,
that the API provides means for tree-like structure of tasks (tasks and subtasks), it does not seem to work. So you can
only have a linear list of tasks. A positive thing is, that due to this limited functionality of Google Tasks the
resource has a full support of this API.

The reason for independent resource is that you can have multiple task lists in Google Calendar, thus merging this
functionality into Google Calendar Resource is not an option. Unfortunately, you will now have the tasks resources
displayed in the list of calendar resources in KOrganizer.

The second and very important update is, that we now have a product in KDE Bugzilla, so you don't have to report bugs in
comments here. The product is "libkgoogle" so you can report bugs or whishes here:
[https://bugs.kde.org/enter_bug.cgi?product=libkgoogle&format=guided](https://bugs.kde.org/enter_bug.cgi?product=libkgoogle&format=guided).

If you think you have posted a request/report under an earlier blogpost and I still haven't responded/fixed/implemented
your request, please report it again in the bugzilla.

Sorry, no screenshots today :)

Bye!

---
categories:
- KDE
date: "2020-02-29T12:40:00Z"
tags:
- KDE
- PIM
- Akonadi
- sprint
params:
  thumbnail: thumbnails/kontact.png
title: January and February in KDE PIM
---
Following the post about [what happened in KDE PIM in November and December][volker-blog]
by Volker, let's look into what the KDE PIM community has been up to in the
first two months of the new year. In total 23 contributors have made 740 changes.

## KMail

* A warning is shown when message composer is opened by clicking on a URL that asks for a file to be attached

{{< figure src="images/kmail-mailto.png" alt="Files attached by clicking on a mailto URL" >}}

* DKIM validation support is enabled by default now  

{{< figure src="images/kmail-dkim.png" alt="DKIM validation information" >}}

* The email can now be easily exported to PDF
* Improved support for rendering markdown in emails
* "Important email" icon is now used consistently in KMail
* Fixed "Move Message to Folder" dialog not accepting certain characters ([#415850][bug415850])
* Fixed large emails not being displayed ([#387061][bug387061])
* Fixed attachments being lost when message is saved as draft ([#416369][bug416369])

## KOrganizer

* Fixed restoring last used calendar in incidence editor ([#411191][bug411191])
* Fixed fallback to the default calendar in incidence editor
* Fixed a crash in release builds ([#417794][bug417794])

## Akregator

* Fixed filename extensions being translated ([#416983][bug416983])

## KAlarm

* Fixed message captions
* Added warning when no default alarm calendar is set during archiving
* Fixed crashes
* Better handling when calendars are added or removed

## Common Infrastructure

Laurent has been working on porting our code away from API that has been deprecated
in Qt 5.15. Volker has been working on removing KDBusConnectionPool from all of KDE
PIM.

For network communication we now use some safer defaults - for example we enabled
[HSTS][wiki-hsts] by default and we don't allow redirects to less-safe protocols
(i.e. from https:// to http://).

KMail and some other components have begun integrating KUserFeedback to provide
some basic telemetry information about usage.

---

## Help us make Kontact even better!
Take a look at some of the [junior jobs][junior-jobs] that we have! They are simple, mostly
programming tasks that don’t require any deep knowledge or understanding of Kontact, so anyone
can work on them. Feel free to pick any task from the list and reach out to us! We’ll be happy
to guide you and answer all your questions. [Read more here…][junior-jobs-blog]

[junior-jobs]: https://phabricator.kde.org/tag/kde_pim_junior_jobs
[junior-jobs-blog]: /2018/08/kde-pim-junior-jobs-are-opened
[volker-blog]: https://volkerkrause.eu/2020/01/15/kde-pim-november-december-2019.html
[wiki-hsts]: https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
[bug387061]: https://bugs.kde.org/show_bug.cgi?id=387061
[bug411191]: https://bugs.kde.org/show_bug.cgi?id=411191
[bug415850]: https://bugs.kde.org/show_bug.cgi?id=415850
[bug416369]: https://bugs.kde.org/show_bug.cgi?id=416369
[bug416983]: https://bugs.kde.org/show_bug.cgi?id=416983
[bug417794]: https://bugs.kde.org/show_bug.cgi?id=417794

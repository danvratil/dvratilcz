---
layout: post
title: March and April in KDE PIM
thumbnail: kontact.png
date: 2019-05-01 20:00:00 +02:00
categories:
 - KDE
tags:
 - KDE
 - PIM
 - Akonadi
 - Sprint
---
The KDE PIM community has been working hard in March and April to fix various
bugs and bring new features and improvements to Kontact, Itinerary and other
KDE PIM projects. Here is a summary of some of the changes that landed in the
past two months.

## KDE PIM Sprint

The team has met for a weekend for a traditional spring PIM sprint in Toulouse
at the beginning of April. We focused on solving some long-standing issues in Akonadi,
prepared some of the KDE PIM libraries to be moved to KDE Frameworks and discussed
outreach and how to attract more people to KDE PIM.

You can read [David's report from the sprint][dfaure-blog].

---

## KMail

KMail has received a nice batch of bugfixes for the KDE Applications 19.04 release
as well as some small features, which will be available in the 19.08 release.

### Improvements and New Features

The email composer has received improvements to [support UTF-8 emojis][bug405455]
(Laurent Montel, KDE Applications 19.08) and to support composing rich-text emails
using Markdown with syntax highlighting (Laurent Montel, KDE Applications 19.08).

Additionally, [notification when sending email fails is now less intrusive][bug405775]
(Laurent Montel, KDE Applications 19.08).

### Bugfixes
* Fixed crash on shutdown due to mishandling of QWebEngineProfile (Jonathan Marten, [D19559][D19559])
* Fixed reconnecting to IMAP server when connection is lost during login (David Faure, [D20028][D20028])
* Fixed identity not appearing after creation (Laurent Montel, [bug 391631][bug391631])
* Fixed deleting spam messages (Laurent Montel, [bug 406324][bug406324])
* Fixed custom header search query failing with inconclusive error (Laurent Montel, [bug 405456][bug405456])
* Fixed trying to send a message without any recipients fails quitely (Laurent Montel, [bug 402577][bug402577])
* Fixed a crash switching on an ad-blocked (Laurent Montel, [bug 405434][bug405434])
* Fixed a crash when opening a vCard attachment (Laurent Montel, [bug 405791][bug405791])

---

## KOrganizer

During the PIM sprint, Volker Krause did a major work on cleaning up KCalCore,
a library that implements the iCal standard to store events and tasks information,
so that the library can be moved to KDE Frameworks. You can read more about Volker's
effort in his [blog post][volker-blog].

### New Features and Improvements

It is now possible to
[move event from one calendar to another in KOrganizer by changing the calendar in the incidence editor][D20340]
(David Faure, KDE Applications 19.08).

---

## KAddressBook

Volker also worked on preparing the KContacts library, a vCard standard
implementation, to be moved to KDE Frameworks alongside KCalCore. You can read
about this on [his blog][volker-blog] as well.

### Improvements
As part of his code cleanup, Volker has [removed the DataMatrix from contact display][D20339],
so we only display the QR code now (Volker Krause, KDE Applications 19.08),
and did massive clean up of the contact display code.
[When displaying contact address on a map, KAddressBook now defaults to OpenStreetMaps][D20354]
(Volker Krause, KDE Applications 19.08).

Thanks to Laurent Montel it is now also possible to
[send SMS messages from KAddressBook through KDE Connect][bug406176]
(KDE Applications 19.08).

### Bugfixes
* Fixed dialing contact's phone-number from KAddressBook through KDE Connect (Volker Krause, [D20353][D20353])

---

## Akregator

### Bugfixes

* Make the feed URI the baseUrl for article previews (Pierre Ducroquet, [D19739][D19739])
* Fixed Delete key not working after using search (Laurent Montel, [bug 394946][bug394946])

---

## Common Infrastructure

### Improvements

David Faure and I have spent large part of the PIM sprint investigating and digging
into two major issues we currently have in Akonadi: database deadlocks and a bug
known as "multiple merge candidates". We were unable to determine the real cause
for the "multiple merge candidates" bug, so it remains unfixed for now. As a result
of digging through the code base, however, David has produced a set of patches to
hugely [improve handling of database deadlocks][D20291] and transaction rollbacks in the
Akonadi server. He also did [improve the sync scheduling code][D20505]. I have
removed a large chunk of code by [removing mostly unused code to handle Collection references][D19942]
and LDAP/Kolab contact merging.

### New Features
* LibKGAPI: support for Team Drives API for Google Drive (David Barchiesi, [T10521][T10521])
* KItinerary: support for parsing train booking from SNCF confirmation emails (Volker Krause, [bug 404451][bug404451])

### Bugfixes
* Akonadi: fixed sync getting stuck after failure (David Faure, [D19487][D19487], [bug 399167][bug399167])
* Akonadi: fixed race conditions in Attribute handling (David Faure, [D19556][D19556], [D19632][D19632])
* Akonadi: fixed crash when in resources when handling a collection change (Daniel Vrátil, [bug 403642][bug403642])
* Akonadi: fixed crash when an Akonadi client unexpectedly disconnects from the server (Filipe Azevedo, [D19983][D19983])

---

## Help us make Kontact even better!
Take a look at some of the [junior jobs][junior-jobs] that we have! They are simple, mostly
programming tasks that don’t require any deep knowledge or understanding of Kontact, so anyone
can work on them. Feel free to pick any task from the list and reach out to us! We’ll be happy
to guide you and answer all your questions. [Read more here…][junior-jobs-blog]

[dfaure-blog]: https://blogs.kde.org/2019/04/17/2019-toulouse-pim-sprint-report
[volker-blog]: https://volkerkrause.eu/2019/04/27/kf5-kcontacts-and-kcalcore.html
[junior-jobs]: https://phabricator.kde.org/tag/kde_pim_junior_jobs
[junior-jobs-blog]: /2018/08/kde-pim-junior-jobs-are-opened
[bug391631]: https://bugs.kde.org/show_bug.cgi?id=391631
[bug394946]: https://bugs.kde.org/show_bug.cgi?id=394946
[bug399167]: https://bugs.kde.org/show_bug.cgi?id=399167
[bug402577]: https://bugs.kde.org/show_bug.cgi?id=402577
[bug403642]: https://bugs.kde.org/show_bug.cgi?id=403642
[bug404451]: https://bugs.kde.org/show_bug.cgi?id=404451
[bug405434]: https://bugs.kde.org/show_bug.cgi?id=405434
[bug405455]: https://bugs.kde.org/show_bug.cgi?id=405455
[bug405456]: https://bugs.kde.org/show_bug.cgi?id=405456
[bug405775]: https://bugs.kde.org/show_bug.cgi?id=405775
[bug405791]: https://bugs.kde.org/show_bug.cgi?id=405791
[bug406176]: https://bugs.kde.org/show_bug.cgi?id=406176
[bug406324]: https://bugs.kde.org/show_bug.cgi?id=406324
[D19487]: https://phabricator.kde.org/D19487
[D19556]: https://phabricator.kde.org/D19556
[D19559]: https://phabricator.kde.org/D19559
[D19632]: https://phabricator.kde.org/D19632
[D19739]: https://phabricator.kde.org/D19739
[D19942]: https://phabricator.kde.org/D19942
[D19983]: https://phabricator.kde.org/D19983
[D20028]: https://phabricator.kde.org/D20028
[D20291]: https://phabricator.kde.org/D20291
[D20339]: https://phabricator.kde.org/D20339
[D20340]: https://phabricator.kde.org/D20340
[D20353]: https://phabricator.kde.org/D20353
[D20354]: https://phabricator.kde.org/D20354
[D20505]: https://phabricator.kde.org/D20505
[T10521]: https://phabricator.kde.org/T10521

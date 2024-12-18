---
categories:
- KDE
date: "2020-05-02T16:40:00Z"
tags:
- KDE
- PIM
- Akonadi
- sprint
params:
  thumbnail: thumbnails/kontact.png
title: March and April in KDE PIM
---
Following the post about [what happened in KDE PIM in January and February][jan-feb-blog]
let's look into what the KDE PIM community has been up to in March and April. In total 38
contributors have made almost 1700 changes. Big thanks to everyone who helped us make Kontact
better!

## April 2020 Release

A new bundle of [KDE applications has been released][release-notes] in April, including Kontact
with its many bugfixes and improvements. 

## KDE PIM Sprint

Every year in April the PIM team meets in Toulouse in France for a weekend of discussions and
hacking. This year due to the coronavirus it wasn't possible for us to meet so instead we held
a virtual KDE PIM Sprint. You can read the [sprint agenda][pim-sprint-agenda] as well as
[Volker's report][pim-sprint-volker] from the sprint.

To highlight some of the topics discussed

* Moving KDAV into KDE Frameworks
* KParts usage in Kontact
* Remove the Kolab Resource, encourage users to use IMAP+DAV instead
* Data provider plugins for the KCalendarCore library
* Porting Account Wizard away from Kross (port to QML, eventually replace it completely by KAccounts)

## KMail

### Bugfixes

KMail has received its usual dose of bugfixes, mostly those:

* Fixed a crash when sending an email (Laurent Montel, [bug 419473][bug419473])
* Fixed a crash when adding too many recipients (Jonathan Marten, [D28876][D28876])
* Fixed a bug when KMail showed only a part of an HTML email (Laurent Montel, [bug 419949][bug419949])
* Fixed a bug when KMail did not correctly display email answer in HTML mode (Laurent Montel, [bug 418482][bug418482])
* Fixed broken message status filter (Laurent Montel, [bug 419720][bug419720])
* Fixed the maildir backend creating junk folders around and not storing the path configuration properly (Igor Poboiko, [D27722][D27722], [D27906][D27906] and [D28634][D28634])
* Fixed a crash when configuring the POP3 resource (Daniel Vrátil, [bug 419726][bug419726])
* Fixed name of the top-level folder created by the EWS resource (Igor Poboiko, [bug 416663][bug416663])
* Fixed the EWS resource not storing user password properly (Igor Poboiko, [bug 414789][bug414789])

### Improvements

There were some exciting improvements to KMail as well: Sandro Knauß has implemented support for
[Protected Headers for Cryptographic E-Mails][rfcdraft]. This means that we also send a signed/encrypted
copy of headers and display the signed/encrypted headers if available and ignores the unsecure 
headers. Currently we don't obfuscate the subject to not break current workflows. Those things
will be improved later on. Sandro together with Thomas Pfeiffer get a funding from [nlnet to improve 
mail encryption][nlnet]. That means there will be more improvement happen the next months. The next
topic they will look at is to add [Autocrypt support for KMail][T8408].

Volker has [improved the look and feel of the "HTML Content" and "External References" warnings
in emails][D27761].

{{< figure src="images/kmail-improved-warnings.png" alt="Improved look and feel of the 'HTML Content' and 'External References' warnings" >}}

As the [Libre Avatar service has come back from the dead a while ago][libravatar-fedora], so did now
the support for it in KMail. The 'Export to PDF' feature which we introduced in the previous report
has been polished (Daniel Vrátil, [D27793][D27793]).

The 'Move To Trash' code has been optimized so that deleting large amounts of emails should now be
faster.

For developers it is now possible to open Chromium DevTools inside the message viewer pane to make it
easier to debug message templates.

## KOrganizer

### Bugfixes

* Fixed crashes in category and filter managers (Allen Winter)
* Fixed bug when single instance of a recurring event couldn't be changed (Shashwat Jolly, [bug 410758][bug410758])
* Fixed crash when creating a new Todo from Kontact (David Faure, [bug 420192][bug420192])
* Fixed 'Only resources can modify remote identifiers' error when re-editing event (Igor Poboiko, [bug 407965][bug407965])
* Fixed the DAV resource getting stuck when parse error occurs (David Faure, [D27858][D27858])

### Improvements

The Google Calendar and Google Contacts backends have been merged into a single Google Groupware
resource (Igor Poboiko, [D28560][D28560]). The change should be mostly transparent to users, the old
backends will be migrated to the new unified backend automatically after update. During this Igor also
fixed various bugs and issues in the backends and the LibKGAPI library, big kudos to him!

The DAV resource is now able to synchronize the calendar color from KOrganizer to the DAV server
(David Faure, [D28938][D28938]). Related to that, the menu to configure calendar color in KOrganizer
has been simplified by removing the "Disable Color" action.

It is now easier to recognize and set the default calendar and the event editor now respects the
settings correctly.

{{< figure src="images/korganizer-default-calendar.png" alt="It is now easier to see the default calendar in KOrganizer" >}}

## KJots

KJots, the note taking application, which has been on life support for 5 years, has received some
love recently thanks to Igor Poboiko. Most of the things were happening under the hood: some ancient
dusty code has been dropped, some refactoring happening, etc. However, if you still use KJots, you might
also notice quite a number of changes too. And if you don't, it's a good time to consider using it :)

### Bugfixes

* Fixed a data loss issue due to bugs in the Akonadi Maildir resource, which is used as a KJots backend
* Fixed a crash on startup ([bug 420228][bug420228])
* Fixed multiple actions for the same shortcut ([bug 384000][bug384000])
* Fixed bookmarks support ([D29073][D29073])
* Fixed export to plain text and to HTML
* Fixed random scrollback jumps ([bug 195828][bug195828])
* Fixed nested bullet lists breaking the undo stack ([bug 256001][bug256001])

### Improvements

* Link destination is displayed in tooltip ([D29289][D29289])
* Ctrl+click follows the link ([bug 244846][bug244846])
* Priting support has been revived ([D29045][D29045])
* The text editing widget now supports different headings ([bug 230317][bug230317])
* Improved support for nested bullet lists

### Future

Igor has quite huge plans for the future of KJots. First of all, more bug squashing. Secondly: ability
to store notes in Markdown format, synchronization with online services (thoughts are on OwnCloud/NextCloud,
or proprietary Evernote). On a lesser scale, the port to the same text editing component as used by KMail 
email composer is being considered, which will give KJots more text-editing features. There are also plans
to add a support for inline checkboxes introduced in Qt 5.14, which would allow making checklists and
TODO-lists in KJots, and ability to sort books and pages by their modification date
(so more relevant would pop up first).


## Other components

Other parts of PIM has also received bugfixes and improvements. Kleopatra, the certificate management
software, now displays GPG configuration tabs and option groups always in the same order (Andrey Legayev,
[T6446][T6446]). A bug in Akregator has been fixed  that could have caused some feeds to have an icon
missing (David Faure, [D28581][D28581]). KAlarm has received a bunch of UI improvements as well as some
smaller features - for instance it is now possible to import alarms from multiple calendars at once
and the calendar list is now sorted by name (all by David Jarvie).


## Common Infrastructure

Lots of work went into modernizing Akonadi, the "backend" service for Kontact. One
major change was switch to C++17 and some initial usage of C++17 features internally
(public API is still C++11-compatible). Widgets for managing Tags have been improved
and polished and the deprecated ItemModel and CollectionModel have been removed.

The KIMAP library has been optimized to better handle large message sets (Daniel Vrátil,
[D28944][D28944]). The KLDAP library can now connect to LDAP server using SSL encryption
(Tobias Junghans, [D28915][D28915]), alongside the existing TLS support.

Volker Krause has been working on preparing the KDAV library (which implements the DAV
protocol) into KDE Frameworks.

Laurent Montel has been working throughout the entire PIM codebase, preparing it to port
to Qt6, once it's available.

---

## Help us make Kontact even better!
Take a look at some of the [junior jobs][junior-jobs] that we have! They are simple, mostly
programming tasks that don’t require any deep knowledge or understanding of Kontact, so anyone
can work on them. Feel free to pick any task from the list and reach out to us! We’ll be happy
to guide you and answer all your questions. [Read more here…][junior-jobs-blog]


[jan-feb-blog]: https://www.dvratil.cz/2020/02/january-and-february-in-kde-pim/
[release-notes]: https://kde.org/announcements/releases/2020-04-apps-update/
[pim-sprint-agenda]: https://community.kde.org/Sprints/PIM/2020
[pim-sprint-volker]: https://volkerkrause.eu/2020/04/07/kde-pim-sprint-april-2020.html
[bug195828]: https://bugs.kde.org?show_bug.cgi?id=195828
[bug230317]: https://bugs.kde.org?show_bug.cgi?id=230317
[bug244846]: https://bugs.kde.org?show_bug.cgi?id=244846
[bug256001]: https://bugs.kde.org?show_bug.cgi?id=256001
[bug384000]: https://bugs.kde.org?show_bug.cgi?id=384000
[bug407965]: https://bugs.kde.org/show_bug.cgi?id=407965
[bug410758]: https://bugs.kde.org/show_bug.cgi?id=410758
[bug414789]: https://bugs.kde.org/show_bug.cgi?id=414789
[bug416306]: https://bugs.kde.org/show_bug.cgi?id=416306
[bug416663]: https://bugs.kde.org/show_bug.cgi?id=416663
[bug418482]: https://bugs.kde.org/show_bug.cgi?id=418482
[bug419448]: https://bugs.kde.org/show_bug.cgi?id=419448
[bug419473]: https://bugs.kde.org/show_bug.cgi?id=419473
[bug419720]: https://bugs.kde.org/show_bug.cgi?id=419720
[bug419726]: https://bugs.kde.org/show_bug.cgi?id=419726
[bug419949]: https://bugs.kde.org/show_bug.cgi?id=419949
[bug420192]: https://bugs.kde.org/show_bug.cgi?id=420192
[bug420228]: https://bugs.kde.org?show_bug.cgi?id=420228
[D27722]: https://phabricator.kde.org/D27722
[D27761]: https://phabricator.kde.org/D27761
[D27793]: https://phabricator.kde.org/D27793
[D27858]: https://phabricator.kde.org/D27858
[D27906]: https://phabricator.kde.org/D27906
[D28560]: https://phabricator.kde.org/D28560
[D28581]: https://phabricator.kde.org/D28581
[D28634]: https://phabricator.kde.org/D28634
[D28876]: https://phabricator.kde.org/D28876
[D28915]: https://phabricator.kde.org/D28915
[D28938]: https://phabricator.kde.org/D28938
[D28944]: https://phabricator.kde.org/D28944
[D29045]: https://phabricator.kde.org/D29045
[D29073]: https://phabricator.kde.org/D29073
[D29289]: https://phabricator.kde.org/D29289
[T742]: https://phabricator.kde.org/T742
[T6446]: https://phabricator.kde.org/T6446
[T8408]: https://phabricator.kde.org/T8408

[rfcdraft]: https://datatracker.ietf.org/doc/draft-autocrypt-lamps-protected-headers/
[nlnet]: https://nlnet.nl/project/Kmail-Encryption/

[junior-jobs]: https://phabricator.kde.org/tag/kde_pim_junior_jobs
[junior-jobs-blog]: /2018/08/kde-pim-junior-jobs-are-opened

[libravatar-fedora]: https://fedoramagazine.org/libravatar-has-a-new-home/


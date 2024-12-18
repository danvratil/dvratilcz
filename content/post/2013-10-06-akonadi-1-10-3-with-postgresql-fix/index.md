---
categories:
- KDE
date: "2013-10-06T13:28:24Z"
tags:
- Akonadi
- KDE
- PIM
params:
  thumbnail: thumbnails/akonadi-logo1.png
title: Akonadi 1.10.3 - with PostgreSQL fix
---

Akonadi 1.10.3 has been released, fixing (among other things) support for PostgreSQL 9.2 with Qt 4.8.5.

I write a blog specially about this update, because the fix requires updating the Akonadi database schema. The update will be performed on next Akonadi start and it can take some time, especially on larger databases, so we kindly ask users for patience.

**Update:** if your distribution ships Qt 4.8.5 with the PSQL driver patch reverted, please make sure to remove the revert before pushing Akonadi 1.10.3 to repositories.

Users of other backends (MySQL or SQLite) will not be affected by this update.

Big thank you for investigating and fixing this problem to Cédric Villemain.

## Full changelog:

- Fix crash when there are no flags to update during flags change
- Fix crash on Akonadi shutdown when using PostgreSQL
- Fix notification to clients about database upgrade
- Send dummy requests to MySQL from time to time to keep the connection alive
- [Bug #277839](http://bugs.kde.org/show_bug.cgi?id=277839) - Fix problem with too long socket paths
- [Bug #323977](http://bugs.kde.org/show_bug.cgi?id=323977) - Check minimum MySQL version at runtime
- [Bug #252120](http://bugs.kde.org/show_bug.cgi?id=252120), [Bug #322931](https://bugs.kde.org/show_bug.cgi?id=322931) - Use text instead of bytea column type for QString in PostgreSQL

Thanks to Volker Krause, Christian Mollekopf and Cédric Villemain for their contributions to this release.

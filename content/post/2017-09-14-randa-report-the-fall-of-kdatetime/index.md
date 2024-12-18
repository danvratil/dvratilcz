---
categories:
- KDE
date: "2017-09-14T17:29:31Z"
tags:
- c++
- KDE
- PIM
- Randa
title: 'Randa Report: The Fall of KDateTime'
---

The main goal for me and Volker for this year Randa Meeting was to port KCalCore, our calendaring library, away from KDateTime. KDateTime/KTimeZone are classes for handling date, time and time zones which were used back in the KDE4 (and earlier) days when Qt's QDateTime wasn't good enough for us, mainly due to missing time zone support.

In Qt5 QDateTime finally gained all the necessary features we need which made it possible for us to leave KDateTime behind. But we couldn't just go and replace "K" with "Q" everywhere - there are many subtle (and not-so-subtle) differences in API, behavior and some missing features of QDateTime that required us to carefully consider each step. The fact that we started working on this over 2 years ago shows how challenging task this was.

We did not expect to finish the port here, but once we dived into it, things went fairly well and I'm glad to say that after four days of intensive hacking, surrounded by Swiss Alps and mountains of chocolate, we succeeded. KCalCore is now free of KDateTime and KTimeZone and that in turn made (after some minor adjustments) the rest of KDE PIM free of KDELibs4Support. That's a huge milestone for us.

Many thanks to John Layt for laying the initial ground for the porting and to Mario and Christian for the steady stream of chocolate and sweets to soothe our nerves :-)

If you want to help us to continue improving Kontact and other parts of KDE, [please donate to the Randa fundraiser](https://www.kde.org/fundraisers/randameetings2017/) so that we can continue organizing similar productive sprints in the future. Thank you!

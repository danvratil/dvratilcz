---
categories:
- KDE
date: "2017-09-16T22:50:23Z"
tags:
- KDE
- Randa
- sprint
title: Randa Report Part 2
---

Let me start by annoying you with some pictures:

{{< figure src="images/20170912_164055-e1505594646710-300x225.jpg" link="images/20170912_164055-e1505594646710.jpg" alt="<3 Randa" class="wp-image-918 size-medium" width="300" height="225" >}}

{{< figure src="images/20170916_080143-e1505594738988-300x169.jpg" link="images/20170916_080143-e1505594738988.jpg" alt="The misty mountains below which the coders dwell." class="wp-image-919 size-medium" width="300" height="169" >}}

{{< figure src="images/20170910_123000-e1505594792144-300x169.jpg" link="images/20170910_123000-e1505594792144.jpg" alt="We totally had snow in September. Well, not in Randa, but in the valley next to it, but still. SNOW!" class="wp-image-920 size-medium" width="300" height="169" >}}

And now for the serious part: in my [last blog post]({% post_url 2017-09-14-randa-report-the-fall-of-kdatetime %}), I talked about achieving our main goal for this year's Randa meetings - we successfully ported the entire Kontact away from the obsoleted KDateTime class. Since we finished this on Thursday, there was still enough time left to start working on something new and exciting.

Volker and Frederik went on to work on a [KWin plugin to simulate various kinds of color blindness](https://blog.qt.io/blog/2017/09/15/testing-applications-color-blindness/) which will help developers to see how visually impaired users see their software, I did a bit more code clean-up after the porting and a bit of code-review.

On Friday morning Volker and I discussed search in KDE PIM. Broken and unreliable search was one of the most often mentioned issues in the KMail User Survey, which we ran for the past month and a half, so I decided to tackle the problem and make our indexing and searching infrastructure fast and reliable.

The final plan consists of several phases - starting with reorganizing our current code to put related pieces of code (like email indexing and querying code) into a single place to make the code easier to maintain. This phase is already progressing and I hope to finish it within the next week. The second phase will involve moving the code that is responsible for indexing data into the backend Resources - whenever a backend retrieves an email from an IMAP server or an event from Google Calendar it will also index it and will send the index data alongside the raw data to Akonadi. Akonadi will then take care for just writing the data into the Xapian database. This will speed up indexing, reduce the IO load and will ensure that all data are reliably indexed and stored before they are presented in Kontact. The third phase will involve changing Kontact to query the index database directly, instead of asking Akonadi to do it for us. This will speed up the search and provide results faster. The final phase will focus on which data we are actually indexing. As they say - less is sometimes more - so having fewer, but better-defined data will allow us to provide better and more exact search results to the user.

Once this is settled, we can make applications to depend on the search index - for example KOrganizer will be able to query the index to only get events from e.g. December 2017 instead of fetching all events from the calendar and then figuring out if they should be displayed or not, making calendars of even the busiest people to load instantaneously.

All in all, it was an extremely productive hackfest for the PIM team and I'd again like to thank Mario, Christian and the rest of the Randa team for organizing the hackfest. You guys rock!

And remember, you can still donate to the [Randa fundraiser](https://www.kde.org/fundraisers/randameetings2017/) to make future productive sprints possible!

{{< figure src="images/banner-fundraising2017.jpg" alt="" class="aligncenter large" >}}

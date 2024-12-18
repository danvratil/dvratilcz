---
categories:
- KDE
date: "2013-11-19T21:39:11Z"
tags:
- Akonadi
- Google
- KDE
- KMail
- PIM
- Red Hat
- sprint
title: KDE PIM Sprint Report
---
The KDE PIM Sprint is over (unfortunately...I could do this every day :-)), so now it's time for some recap of what has been done. I'll try to cover the Akonadi side, and leave the rest up to others to cover their projects ;-)

{{< figure src="images/kdepim-sprint-510x150.jpg" link="images/kdepim-sprint.jpg" alt="Hacking time! (Photo by Martin Klapetek)" >}}

## Akonadi Server optimizations

We finished and reviewed Volker's old branch with a big optimization of the database schema. On my computer it reduces size of the file with the largest table by 30% and it speeds up all queries on that database, because the WHERE condition now has to perform only integer comparision, instead of string.

This however means, that we have to migrate user's database on start. During the migration it is not  be possible to use any Akonadi-based applications.  We improved the code so that the migration takes about 10 minutes on my computer (used to take 20 and more). I personally think that it's acceptable "downtime" for a one-time migration, so after I finish testing the migration code on other backends, I'll merge the branch to master and we'll ship it with KDE 4.13.

{{< figure src="images/IMG_00000593-510x150.jpg" link="images/IMG_00000593-e1384893195361.jpg" alt="There's always time for a beer!" title="There's always time for a beer!" >}}

## Server-side Search

When using online IMAP, only headers are in Akonadi, the body is downloaded on-demand when the message is opened in KMail. This means that Nepomuk can't index these emails and thus can't include them in search results. To fix this case, we want to make use of IMAP's SEARCH functionality. We simply ask Nepomuk to search it's database of indexed emails, at the same time we send IMAP server the same search query and then we just merge results and show them to users. Most of the infrastructure in Akonadi Server has been in place for a long time now, so I'll just undust it, adopt it to our current needs and we should be good to go ;-)

## Using Akonadi to store tags

{{< figure src="images/IMG_00000588-e1384891674927-150x150.jpg" link="images/IMG_00000588-e1384891674927.jpg" alt="Working on tags!" title="Working on tags!" >}}

I already mentioned this in the [previous report]({{< ref 2013-11-13-kde-pim-sprint-report-day-minus-2 >}}): we want to cache tags in the Akonadi database and write them to storage backends if they support it (for instance as additional flags to emails on IMAP server, as CATEGORIES into events in iCal, etc.). Thanks to it it will be possible to share tags between multiple computers, yay! We just need to modify the Nepomuk libraries, so that when you ask Nepomuk for all data tagged with "Holiday", Nepomuk can search it's own database and also query Akonadi. Another benefit will be that filtering emails in KMail by tags will be much much faster, because the relation will be stored locally in Akonadi and we won't have to talk to Nepomuk, which is very slow (mostly because of Virtuoso).

## Storing conversations and threads in Akonadi

In his [comment](2013-11-18-email-threading-in-kmail-your-help-is-needed/#comment-710) under my [last blog](2013-11-18-email-threading-in-kmail-your-help-is-needed), Till Adam said:

> [...] KMail has the second best threading in the world, I think, second only to mutt because that is faster. [...]

Why can't KMail just have the very best threading in the world? Because right now it has to fetch the entire folder from Akonadi in order to be able to perform Subject comparision when building threads. That's both very slow and CPU-intensive operation. So we thought: let's store information about relations between emails in Akonadi, and when KMail asks for content of a folder, we give back only first few conversations just to fill the screen, and then fetch remaining conversations on demand when user scrolls down. This should make opening even massive folders superfast and should save a lot of memory, too.

## Akonadi and KDE Frameworks

{{< figure src="images/IMG_00000583-e1384891186822-150x150.jpg" link="images/IMG_00000583-e1384891186822.jpg" alt="Hopefully David's code is more stable than his towers :)" title="Hopefully David's code is more stable than his towers :)" class="tiny alignright" >}}

The most-awaited discussion of the entire sprint was about KDE PIM and KDE Frameworks. When should we start? What has to be done? What can we use this opportunity for? From Akonadi point of view I want to do several things: remove deprecated API, change some API so that we use consistent naming and separate UI and non-UI stuff. Volker Krause suggested that we could move the client libraries into Akonadi repository with Akonadi server, so thatwe could share some of the code (protocol parsers for example), which I like, so we'll go for that, too.

A bit unrelated, but still: the Akonadi server already compiles with Qt 5 for a while, so possibly during this development cycle we might switch to supporting only Qt 5 (and making use of all the C++11 awesomeness). There's a little library that kdepimlibs link against, so we just build both Qt 4 and Qt 5 versions of it. Akonadi depends only on QtCore and QtDBus, so we only need distros to ship qt5-qtbase, which we believe most of them do by now.

## Gmail resource
    
{{< figure src="images/IMG_20131117_121721-150x150.jpg" link="images/IMG_20131117_121721.jpg" alt="Vishesh and Àlex (Photo by Lukáš Tinkl)" title="Vishesh and Àlex (Photo by Lukáš Tinkl)" class="tiny alignleft" >}}

I've been promising this for ages, now I finally discussed this with others, got some input and can start hacking :-) Let's see if I can do something before Christmas ;-) Gmail resource would store all your mails in one folder and would create virtual folders for each label and just link emails from the "All mails" folder into respective labels. This way the emails will share flags (read/unread), and you will even be able to manage the labels by linking or unlinking emails from label folders in KMail.

Here I'd like to thank everyone for coming to Brno - if was a lot of fun and great pleasure to see all of you again, and also thank Red Hat for letting us use the office. Looking forward to see you all again on FOSDEM, next sprint, Akademy or anywhere else :-)


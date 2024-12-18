---
categories:
- KDE
date: "2013-03-14T22:12:13Z"
tags:
- Akonadi
- Google
- Google Reader
- KDE
- libkgapi
- PIM
title: KDE PIM, Google Integration & more
---
I haven't blogged about my involvement in KDE PIM in a while, so let's see what's new there, especially in the Google integration part....

## Reborn Google Resources

Just before the KDE PIM sprint in Berlin this month, I've sat down and written completely new API for LibKGAPI (the library that implements Google API and is used by the Akonadi resources for Google services). The new API is job-based, and therefore much more awesome than the old one (which is known to suck). Anyway - what does this mean? It means that the new resources are awesome as well!

{{< figure src="images/google-contacts-groups.png" alt="Google Contacts resource & contacts groups" class="alignright large" >}}

Google Contacts resource now has a full support for contacts groups. All contacts are stored in the top-level collection and are linked to the respective groups, so it does not matter where you edit the contact, you are still modifying the same instance. Like in the web interface.

Google Calendar now supports limited sync, so you can choose to only sync events from last year, or last two years (the default is last 3 years) instead of the full history.

Both resources have improved status reporting, error handling, are more stable (no more mystery crashes due to unhandled exceptions thrown from LibKGAPI) and subjectively synchronization is faster too.

## Murdered Google Resources

As most of you probably noticed by now, Google is planning to shut down Google Reader by July 1. It's pitty, because I already had a fully working Akonadi resource for Google Reader ready in the *akregator_port* branch. Cost me lot of time and nerves. Well, the resource is not there anymore and the only memory of it is *greader* branch with API implementation in LibKGAPI (which will die as well sooner or later). The good news however is that I can now help Alessandro and Frank with ownCloud News and the ownCloud Akonadi resource, so that we rock when Akregator2 is out :-) I can't wait to see what has changed in ownCloud since I installed 3.0.0 some time ago...

## Upcoming Google Resources<

I have two feature requests in bugzilla: one is to support Google Bookmarks, which is fairly complicated because of missing official API and absolutely no write API. So this is not going to happen soon. The second feature request is for Google Drive KIO slave. This is much more interesting task. I already tried writing Google Docs KIO slave about three years ago and I failed epically. *Retribution!* There's almost complete API implementation by Andrius in LibKGAPI git, so I plan to port it to LibkGAPI2 and see whether we can together fight the Dark side and create a nice and shiny KIO slave.

Finally, deep in the dark corners of my mind, my so far the most evil plan is slowly shaping. The plan includes modifying the current IMAP resource, reusing most of it's code and subclassing some specific parts to build a native GMail Akonadi resource that would support some GMail-specific IMAP extensions. The main idea is to support one-mail-in-multiple-folders-at-once case. Right now the IMAP resource handles that by creating a new instance of the same email in multiple folders. My bold plan is to store all emails in Inbox and link them to respective folders. This means that marking an email as read in one folder, will automatically mark it as read in all other folders (because it's a single instance). The IMAP resource looks scary though, so I don't know yet when I'll get the courage (and time) to sit down and actually start coding...I guess probably after Akademy, after I talk to some people.

## Batch Operations in Akonadi

I have talked to Volker Krause during the KDE PIM sprint about how to effectively handle "Mark feed as read" in the Google Reader resource. Currently, Akonadi creates a new notification for every change, therefore marking 300 items as read generates 300 notifications, which are delivered to the Akonadi resource, which should then create 300 HTTP request to store 300 changes. You probably agree that this slightly suboptimal. (I temporarily solved the problem by caching the notifications in the resource itself and then sending a big request to Google Reader at once). The solution that Volker suggested sounds fairly simple (it's not) - batch notifications - i.e. a single notification about single change involving multiple items. The supported changes can be flags change, deleting or linking of items. By being able to deliver single notification about mass-change to Akonadi clients and to Akonadi resources represents new possibilities for optimizations. For instance the IMAP resource could simply send a single command to add a flag to multiple emails at once, instead of doing it one by one. The same goes for other operations and other resources that are dealing regularly with operations on larger sets of items. The obvious result: *performance boost*! After two weeks the work is in semi-working state - it works, but it goes nuts if more than 5 items are involved. The cause is known, but solution not (but I'll get there eventually :-) )

## Akregator 2

I'm occasionally helping with Akregator2 (Akonadi port of Akregator). Recently (ok, it was two months ago... ) I've written Akonadi Nepomuk Feeder plugin that is feeding RSS Articles into Nepomuk and a Search window (slightly inspired by the one in KMail) in Akregator2 where you can do full-text search (+ search via other criteria, including author's name and date of publishing) based on data indexed in Nepomuk. Obviously, when I wanted to demo that on the KDE PIM sprint I found out that it's not working as good as I thought, so there's still some work to be done. But in general I'm happy to say, that from time to time it finds something :-).

{{< figure src="images/akregator2-search-300x219.png" link="images/akregator2-search.png" alt="Akregator 2 Search Window" class="aligncenter large" >}}

Ok, so that's about what I was, am and will be working on in KDE PIM. Here I'd like to say big thank you to all KDE PIM devs, because they are doing an *incredible* job. Thank you!

---
categories:
- KDE
date: "2013-07-21T01:35:11Z"
tags:
- Akademy
- Akonadi
- KDE
- PIM
params:
  thumbnail: thumbnails/akonadi-logo1.png
title: What's new in the Akonadi World
---

Hi!

I arrived back home from Akademy just a day ago and I already miss it. I enjoyed every single moment of it and had lots and lots of fun. Thanks everyone for making this such an awesome event, and especially to the local team. They did an incredible job!

This blog however will not be about Akademy (I will write one maybe later), but about Akonadi, core component of our PIM suite. As you probably already read or heard, Volker Krause has handed over to me maintainership of Akonadi.  It means really lot to me and I'll do my best to be at least as good maintainer as he was (if that's even possible) and I would like to thank him for his outstanding job he did writing and maintaining Akonadi.

I really believe in Akonadi, I like design of the framework and admire all the work guys have done on it since the beginning, long before I even dreamed about becoming a KDE contributor. I also believe that having a powerful and well-working PIM suite is the key for success of KDE (not just) in the enterprise world. Akonadi is more powerful than most of the competition out there, we just now need to focus bit more on stability and performance. I think we are doing pretty fine with stability, so I want to focus mainly on the performance side of Akonadi. In this bit more technical blog post I want to write about what I did recently, what I'm doing know and what are (some of) my future plans with Akonadi. As usually, huge thank you to Volker for his ideas, suggestions and comments about my ideas. We had a great discussion during Akademy and we (theoretically) solved many problems and bottlenecks that were bothering Akonadi for a long time, but nobody had time to look into it.

## Batch Notifications

I started working on batch notifications after the KDE PIM sprint in March, merged it in May (I think) and hopefully have resolved all regressions by now. Akonadi server uses notifications to inform all clients about changes, like new items, changed items, removed items, etc. Notification is a simple data structure that is transferred via D-Bus to all clients. Before this patch there was one notification per each item which means that marking 500 emails as read had generated 500 notifications that had to be transferred via D-Bus. With batch notifications the server can create a single notification that references all 500 items. This saves a *lot* of D-Bus traffic and allows faster processing on the client side. This feature will be available in KDE 4.11.

## MTime-based item retrieval

This was written during Akademy and will allow Vishesh to improve start-up time of the Akonadi Nepomuk Feeder. Until now the feeder had to fetch *all* items from Akonadi and *all* items from Nepomuk on start just to compare whether everything is up-to-date. With mtime-based item retrieval the feeder can ask Akonadi to hand over only items that have been changed since some given timestamp. In most cases that means 0 items. You have to agree that fetching no or just a few items instead of all of them will give us a notable performance boost during start. Albert allowed us to backport this to 4.11, so you will get this improvement in 4.11 as well.

## External payload files without path

Another thing that has been implemented during Akademy is aimed to save some of your precious disk space. Because Akonadi is a cache for your data, it means that it has to store all your emails, contacts, events etc. somewhere. Smaller records are stored directly in the database. Larger items are stored in external files on your hard drive and there is only file path stored in the database. However the path is always the same and is usually around 50 characters long, while the file name is only around 10 characters long. This patch makes sure that only the file name without path is stored in the database, saving some disk space. Clients now also have the capability to understand file names without path in server replies, so we can even reduce size of traffic  between server and clients a bit. I know that 50 bytes is not much, but multiply it by tens or hundreds of thousands of items, and it's already worth it. As a side effect, all newly created databases will be relocatable, because all file paths are relative, not absolute. There is no plan to make an automated migration to strip the path from existing records, but I might one day implement this in the Janitor, so that users can migrate their database manually if they want to. But it's not a priority now.

## Server-side monitoring

Previously I explained that Akonadi sends notifications via D-Bus to all clients to inform them about changes. The problem here is that not all clients are usually interested in all changes. For instance KOrganizer does not care about new emails and KMail does not care about modified appointments (there are exceptions like the Nepomuk Feeder, which listens to everything for obvious reason). Yet each notification is "broadcasted" to all Akonadi clients. Each client then decides whether it's are interested in the notification and wants to process it further or just drops it. The average number of clients is around 16, but in most cases only 3 or 4 clients are actually interested in each notification. That means that other 12 or 13 clients just drop the notification. What I'm working on right now is to move this filtering code to the Akonadi server, so that the clients can tell the server what kinds and types of notifications they want and the server will only send notifications to those clients that are really interested in it. This should save us a lot of D-Bus traffic and will fix the awkward situation when all clients are consuming CPU, even when you are just syncing one of your IMAP accounts.

## Server-side change recording (IDLE)

The biggest task ahead of me. Some Akonadi clients are using feature called change recording. That means that every notification that is not dropped by the client is stored into a binary file (every client has one such file) and is removed again when the client confirms that the notification has been processed. This is used for example by the IMAP resource. When you are offline the resource is recording all notifications (about items being deleted, moved between folders, marked as read, etc) into the file and when you connect to the internet and the resource is switched to online all notifications are replayed from the file. My plan is to implement something similar to IMAP's IDLE. Changes will be recorded on the server instead of the clients and all clients will be able to connect to the server and request all pending notifications. After that they send "IDLE" command + explanation of what kind of notifications they are interested in and the server will automatically feed them with new notifications. This is essentially continuation of the "Server-side filtering" feature, but it takes it to a completely new level. With this feature the Akonadi framework will generated almost no D-Bus traffic at all and the whole thing will be much much faster. I'm really looking forward to work on this because it's a very challenging task and the result will definitely be worth the effort.

Volker has also submitted a few patches to reduce size of the messages sent between clients and server even more and started working on optimizing some SQL queries so that we don't query the database for data we don't actually use anywhere.

Of course there are more smaller ideas and improvements in the queue, but I need to keep something for next blog posts so stay tuned - there's more coming soon! :-)

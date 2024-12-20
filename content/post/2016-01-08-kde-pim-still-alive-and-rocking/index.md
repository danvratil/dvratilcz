---
categories:
- KDE
date: "2016-01-08T03:39:54Z"
tags:
- Akonadi
- c++
- Frameworks
- KDE
- PIM
params:
  thumbnail: thumbnails/akonadi-logo1.png
title: Akonadi - still alive and rocking
---

It's been a while since I wrote anything about Akonadi but that does not mean I was slacking all the time ;) The KDE PIM team has ported PIM to KDE Frameworks 5 and Qt 5 and released the first KF5-based version in August 2015 and even before that we already did some major changes under the hood that were not possible in the KDE4 version due to API and ABI freezes of kdepimlibs. The KF5-based version of Akonadi libraries (and all the other KDE PIM libraries for that matter) have no guarantees of stable API yet, so we can bend and twist the libraries to our needs to improve stability and performance. Here's an overview of what has happened (mostly in Akonadi) since we started porting to KDE Frameworks 5. It is slightly more technical than I originally intended to, sorry about that.

## Human-readable formats are overrated

As you probably know Akonadi has two parts: the Server (that manages the data and resources) and client libraries (that applications use to access the data managed by the server). The libraries need to talk to the Server somehow. In KDE4 we were using a text-based protocol very similar to IMAP (it started as RFC-compliant IMAP implementation, but over the time we diverged a bit). The problem with text-based protocol and large amount of data is that serializing everything into string representation and then deserializing it again on the other end is not very effective. The performance penalty is negligible when talking to IMAP servers over network because the network latency hides it. It however shows when everything is happening locally. So we switched from a text-based protocol to a binary protocol. That means we take the actual representation of the data in the memory (bit by bit) and write it to the socket. The other side then just takes the binary data and directly interprets them as values (numbers or strings or whatever). This means we spent almost zero time on serialization and we are able to transmit large chunks of data between the server and the applications very, very efficiently.

## Let's abuse the new cool stuff we have for things we did not originally designed it for

The communication between clients and server needs to work in two directions. It's not just the clients sending requests to server (and server sending back replice), we also need a mechanism for the server to notify the clients that something has changed (new event in a calendar, email marked as read, etc.). For this we were using DBus signals. The clients could connect to a DBus signal provided by the Akonadi Server and when something changed, the server notified the clients via the signal. However during initial synchronization or during intensive mail checks the amount of the messages sent over DBus by Akonadi was just too high. We were clogging the DBus daemon and the transmission of messages via DBus is not cheap either. But hey, we have an awesome and super-fast binary protocol, why not use that? And so we switched from using DBus for change notifications to sending those notifications through the same mechanism that we use for all other communication with the server. In the future it will also allow us tu even more customize the content of the notification thus further improving performance.

## Pfff, who needs database indexes?

We do! Once we switched to the binary protocol we found that we are no longer waiting for the data from database to be serialized and sent over to client, but that we are waiting for the database itself! I sat down and look at EXPLAIN ANALYZE results of our biggest queries. Turns out we were doing some unnecessary JOINs (usually to get data that we already had in in-memory cache inside the Server) that we could get rid of. SQL planners and optimizers are extremely efficient nowadays, but JOINing large tables still takes time, so getting rid of those JOINs made the queries up to twice faster.

One unexpected issue I found was that the database was spending large amount of time on "ORDER BY ... DESC" on our main table (yes, we query results in descending order - this way we can show the newest (= usually most relevant) emails in KMail first, while still retrieving the rest). PostgreSQL users will be happy to know that adding a special descending index sped up the queries massively. MySQL users are out of luck - although MySQL allows to create a descending index on a column, it does not really do anything about it.

## Splitting libraries is too mainstream, we merge stuff!

One of the things that I've been looking forward to for a very long time was making the Akonadi server a private part (an implementation detail) of the Akonadi client libraries. In KDE4 versions we had to maintain a backwards compatibility of the Akonadi protocol (the text-based one I mentioned earlier) as it was considered a part of public API. This was extremely limiting and annoying for me as a maintainer, as it was making fixing certain bugs and adding new features unnecessarily hard. Historically Akonadi server was a standalone project and it was expected that 3rd party developers would write their own client libraries in their own toolkits/languages. Unfortunately that never happened and the KDE Akonadi client libraries were the only client libraries out there that were actively developed and used (there were some proof-of-concept GLib/Gtk client libraries, but never used seriously).

So, since KDE Applications 15.08 the Akonadi server has no public API and writing custom client libraries is not officially supported. The only official way to talk to the server is through the KDE Akonadi client libraries, which is now the only public API for Akonadi. This may sound like a bad decision, like closing ourselves down from the world, like if we don't care about anyone else but KDE and Qt. And it's sort of true - we were waiting for almost a decade for someone else to start writing their client libraries, but nobody did. So why bother? On the other hand the only actual and real user of Akonadi - KDE - benefits much more now - for example the binary protocol is optimized so that (de)serializing Qt types (like QString or QDateTime) is very efficient because we can use the format that Qt uses internally. If we were to be "toolkit agnostic", we would have to waste time on converting the data to some more standard representation and nobody would win.

To finally get to the point: today I took the Akonadi client libraries (that lived in kdepimlibs.git) and merged them to akonadi.git repository, where the Akonadi server is - at least locally on my machine, still need to fix some build issues before actually pushing this, but I expect to do it tomorrow. In other words the entire Akonadi Framework now lives in a single self-contained git repository. This brings even more benefits, mostly from maintainer point of view. For instance we can now share more code between the server and the libraries that we previously had to duplicate or expose via some private shared library.

The kdepimlibs.git will still contain some libraries for now that we yet have to figure out what to do with, but I guess that eventually kdepimlibs.git will meet the same fate as kdelibs.git - being locked down and preserved only for historical reference.

## The Cheese Dependency

In September last year the [KDE PIM team also met in Randa](2015-08-13-kde-pim-in-randa) in Swiss Alps. I was totally going to blog about it, but then other things got into way and I kept delaying it further and further until now. So with an awkward 5 months delay: huge thanks and hugs to the entire Randa meetings staff and one more hug to Mario just for being Mario. In Randa we met to discuss where KDE PIM should go next and how to get there. After several days on intensive talking we outlined the path into future - you probably read about it already in some of the blogs about AkonadiNext from Christian and Aaron, so I won't go much into that.

To list some of the visible and practical results - we now use [Phabricator](https://phabricator.kde.org/project/board/34/) to coordinate the work in the PIM team and to better communicate what is happening and who's working on what. There's a nice backlog of tasks waiting to be done, so if you want to help us make PIM better feel free to pick up some task and get to work! Furthermore we looked into cleaning up some of the old code and optimizing some critical code-paths - basically a continuation of an effort that started already during Akademy in A Coruña. Some of the changes were already implemented, some are still pending.

## Lord of the PIM: The Return of The KJots

One of the major complaints we heard about the new KF5-based KDE PIM was the disappearance of KJots, our note-taking app. Earlier last year, on a [PIM sprint in Toulouse](2015-04-17-what-happened-in-toulouse), we decided that we need to reduce the size of the code base to keep it maintainable given the current manpower (or rather lack thereof). KJots was one of the projects we decided to kill. What we did not realize back then was that we will effectively prevent people from accessing their notes, since we don't have any other app for that! I apologize for that to all our users, and to restore the balance in the Force I decided to bring KJots back. Not as a part of the main KDE PIM suite but as a standalone app. I have yet to make a first release that packagers can package, but it already builds and is reasonably usable. I'm not planning on developing the application very actively - I'll keep it breathing, but that's about it. That's all I can afford. If there's anyone who would be interesting in maintaining the application and developing it further (it's a rather small and simple application), feel free to step up! When the app reaches certain quality level, we can start thinking about merging it back to KDE PIM.

## Is that all?

Yes. No. Well, it's all for today. There is much much more happening in KDE PIM - Laurent did tons of work on of refactoring and splitting the monolithic kdepim.git repository into smaller, better reusable pieces and now seems to be messing around Akregator, and Sandro is actively working on refactoring the email rendering code and calendaring. But I'll leave it up to them to report on their work :) And of course there's much more planned for the future (as always), but this blog post already got a bit out of hand, I'll report on the rest maybe next time I "accidentally" have an energy drink at 11 PM.

And as always: we need help. Like, lots of it. KDE PIM might look huge and scary and hard to work on, but in fact it's all rainbows and unicorns. Hacking on PIM is fun (and we are fun too sometimes!), so if you like KDE (PIM) and would like to help us, let's talk!

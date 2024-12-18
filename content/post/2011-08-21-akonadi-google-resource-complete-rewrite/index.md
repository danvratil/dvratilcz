---
layout: post
title: 'Akonadi Google Resource: complete rewrite'
date: 2011-08-21 00:39:18 +02:00
categories:
- KDE
tags:
- Akonadi
- Google
- KDE
- PIM
---

Hi there,

today I finally pushed a completely new version of the Akonadi Google Resource. Since last update cca 2 months ago I've completely rewritten the resources, moving most of the functionality into libKGoogle. The library now provides access to Google services and can be easily used by any other project. <!--more-->So what's new? A lot of things changed for programmers. I've begun to fulfill my threats about providing a C++/Qt library for accessing Google Services. It's not pure Qt, I'm using some KDE stuff in there, but that will change :)

LibKGoogle now provides API similar to QNetworkAccessManager (KGoogleAccessManager) through which you can send KGoogleRequest and if it works, you'll receive a KGoogleReply. Each Google Service is represented by a KGoogleService subclass, implementing XML and/or JSON parser and serializer and providing informations about fetch/create/update URLs. Each object (contact, event, calendar) is represented by KGoogleObject subclass. For now, Event class is implements KCalCore::Event as well, the Calendar and Contact classes provide their own implementation of everything. Porting it to KABC/KCalCore is on TODO.

libKGoogle provides unified authentication framework and stores the tokens in KWallet. For now, you can only use one account per service (means that you can't have two calendars from two different Google accounts), but this is on my TODO as well. The framework is also able to automatically refresh the tokens when they expire, so that should fix the problem with "[resources forgeting the authentication]({{< ref 2011-06-27-akonadi-google-resource-part-iii >}})".

The API needs some more polishing and I must somehow force myself to write documentation, but the I think the libKGoogle can provide a solid base for any Google-related services.

The library is still in the same git repository with the Resources. I will try to move it to it's own repo when it gets support for more services and the API will really stabilize.

{{< figure src="images/contacts_resource_settings_authenticate.png" alt="Contacts Resource new Settings Dialog" class="alignright" width="357" height="152" >}}
{{< figure src="images/contacts_resource_settings_revoke.png" alt="Contacts Resource new Settings Dialog 2" class="alignright" width="357" height="152" >}}

From users' point of view, there is just a very slight change in Contact Resource settings dialog. There are no new features in any resource. Though there are probably many new bugs :F So please try it out and don't be afraid to spam me with any issue, idea, problem, comment, invitations to a beer etc...:)

With libKGoogle I hope more developers will begin to create Google-related applications for Qt and KDE. This library could one day be a good start-point for them.

**Plans for future versions:**

- support more contacts and event properties
- support multiple Google accounts per service
- changing contact photos
- tie KGoogleObjects to KCalCore and KABC
- API cleanup
- **DOCUMENTATION :/**
- make the libkgoogle optionally KDE-independent (long-term plan)

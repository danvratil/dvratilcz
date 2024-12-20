---
categories:
- KDE
date: "2011-05-30T23:20:50Z"
tags:
- Akonadi
- Google
- KDE
- PIM
title: Google support in Akonadi, part I
---

My job as a Red Hat internet is development of Evolution, the groupware software. Although I'm using Gnome 3 and all the
Gtk stuff in work, I'm still loyal to KDE on my personal laptop. But one thing I really like on Evolution and I really
miss in KDE PIM is proper support for Google services. As result of this and after some talking with my flatmate, I
started to work on real, fullfeatured Akonadi Resource for Google Services.

At this moment, after about week of work I have working Contacts Resource. It can fetch, create, update and remove
contacts from Google server using their GData API. The implementation of GData protocol is far from complete, as of now
only few basic values are supported (name, emails, phones, addresses, notes).

Since this implementation is actually "working", I've decided to release it as 0.1.

Version 0.2 should bring basic support for Google Calendar and most probably some major refactoring of libkgoogle.
Following releases will focus on improving support of GData protocol, including fetching of contacts photos.  I have to
mention here, that the code is inspired by code of the great [Akonadi Facebook
Resource](http://thomasmcguire.wordpress.com/2011/02/27/facebook-support-in-kdepim/), because this is my first
Akonadi-related code and I really need something to learn from :)

There are no screenshots worth posting at this moment, you rather try checking out the sources, maybe sending some
patches back, what do you say? ;) ~~Sources are available in Gitorious:
[http://www.gitorious.org/akonadi-google](http://www.gitorious.org/akonadi-google), clone URL is
git://gitorious.org/akonadi-google/akonadi-google.git.~~

**UPDATE**: the project is now hosted in KDE Git repo on
*[https://projects.kde.org/projects/playground/pim/akonadi-google](https://projects.kde.org/projects/playground/pim/akonadi-google).

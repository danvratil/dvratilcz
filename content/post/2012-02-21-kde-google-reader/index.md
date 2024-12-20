---
categories:
- KDE
date: "2012-02-21T21:01:36Z"
tags:
- Google Reader
- KDE
- libkgoogle
title: KDE Google Reader
---
I've made a big progress with the upcoming libkgoogle 0.3 last weekend on the Fedora KDE SIG meetings which took place
in Brno. I then decided to take some rest from all this Google things and wanted to relax by working on something else.
But then I remembered that some time ago I experimentally implemented the Google Reader API and...well, see for
yourself.

<!--more-->

{{< figure src="images/kgooglereader_kontact-1024x660.png" alt="KGoogleReader integration with Kontact" >}}

Originally I wanted to implement my own caching mechanism for the feeds, but I soon realized that I would be just
wasting my time when there already is something as cool as Akonadi.

I have written a simple Akonadi serializer for the data (took me about 20 minutes) and an Akonadi resource (that took me
about 40 minutes to write). Finally I begun to write the client.

The client itself is very simple, it essentially only fetches list of streams (for those unfamiliar with Google's
terminology, stream == RSS feed) and their content from Google Reader and is able to update 'read' flag of one or more
items. You can't add or remove streams (maybe later).

**Note**: Do not try to "mark all as read" if you have too many unread items. The resource is sending a HTTP request for
*every single item (will be fix later, maybe...).

But hey, what's the difference between reading your feeds in a browser window or in a silly desktop client. To increase
the level of (my) awesomeness I've made a Kontact plugin as well:

{{< figure src="images/kgooglereader_kontact-1024x660.png" alt="KGoogleReader integration with Kontact" >}}

Btw, does anyone know how to change order of the items in the left pane? I'd like to have the reader where Akregator
usually is :)

In the first sync, the resource fetches up to 200 latest items form each feed (I think that's a reasonable amount), then
the updates are incremental. There is no progress indication, so just be patient.

In a way it is a "replacement" for Akregator (but it lacks almost all of its features :-), so actually it's not...). I
suppose you don't need to have local feeds in an RSS client when you can interact with feeds on Google Reader directly.
On the other hand, it's not a serious project, more like a preview or demonstration of power and awesomeness of the KDE
technologies (it's *so* simple to use Akonadi!) and all the people behind it. When libkgoogle 0.3 is out and stable, I'd
like to dedicate some time to help with the Akregator port (if it's not finished until then), so this project will just
rot in git, forgotten.

As I said, this is more of a tech preview, definitely not something for daily use. I won't be spending much time working
on it, but of course, feel free to clone the repo (see below) and contribute.

## How do I get this?

1) You have to use libkgoogle from the experimental "reader" branch. This branch is rebased against the development
branch of what-will-become-0.3, so it's completely incompatible with the current resources from master branch.

```
cmake -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_calendar=FALSE -DBUILD_contacts=FALSE
```

I recommend to install libkgoogle to some other prefix then /usr so that it does not conflict with the stable libkgoogle
library, but if you feel brave enough, you can try to compile the branch with calendar and contacts resource as well,
since they are mostly finished and working (and I would appreciate some feedback before releasing it).

2) Compile the Reader. The repository contains all the stuff - Akonadi serializer and resource, Kontact plugin,
KGoogleReader KPart and KDEGoogleReader application (sorry for the KDEGoogleReader vs. KGoogleReader inconsistency, I
couldn't decide how to name it so I was mixing both names :) )

```
git clone git://gitorious.org/kgooglereader/kgooglereader.git
cd kgooglereader
mkdir build && cd build
cmake ../ -DCMAKE_INSTALL_PREFIX=/usr -DLIBKGOOGLE_LIBRARY=/usr/local/lib/libkgoogle.so -DLIBKGOOGLE_INCLUDE_DIR=/usr/local/include/
make
make install # as root
```

Remember to replace the path to libkgoogle by wherever you have installed it. Now you should have kdegooglereader
executable installed and when you restart Kontact you should see "Google Reader" in the left pane as well.

Well, I hope you like it :)

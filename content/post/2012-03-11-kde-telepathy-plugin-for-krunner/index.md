---
categories:
- KDE
- Telepathy
date: "2012-03-11T23:11:43Z"
tags:
- KDE
- Telepathy
title: KDE Telepathy plugin for KRunner
---
Yesterday I have switched from Kopete to KDE Telepathy. At first I only wanted to see what's new, but I was quite
impressed and I didn't see any problem that would keep me from using KDE Telepathy instead of Kopete. Except for one - a
contact runner. I'm an incredibly lazy creature and instead of having to remember various shortcuts or even touching
mouse, I rather use KRunner for nearly everything, including starting chat with my IM contacts.

In the true spirit of open source, instead of whining about a missing feature I decided to take an action and write the
plugin myself :)

Same as with Kopete Contacts runner, just by typing name of your contact will display matching contacts in KRunner. If
you have one contact in multiple accounts, it will display the contact multiple times, with name of the account as well.

The results are sorted by presence, e.g. if a person is online on Jabber, but offline on GTalk, the Jabber contact will
be listed first.

If the contact has capabilities for audio or video call, file transfer or desktop sharing, you will see multiple
buttons. By default, just by hitting Enter on the selected contact will start text chat, but by clicking on one of the
buttons you can start the respective action. If the other side does not have some capability, it's button will not be
displayed.

If you want to explicitly start for example an audio call, typing "audiocall John" will list all contacts named John
capable of audio call and clicking on it or hitting Enter will start an audio call immediately. Similarly there are
commands "videocall", "sendfile" and "sharedesktop" for respective actions.

This last feature is untested though, because none of my contacts seem to use KDE Telepathy or have any capability other
than text chat :D

Here is some artificially made screen shot :)

{{< figure src="images/ktp_contacts_runner.png" alt="KDE Telepathy Contact Runner example" >}}
(Ignore the KSnapshot icon, I had already removed all the code to generate this preview when I noticed it :D )

You can get sources from my scratch repo on KDE git:

```
git://anongit.kde.org/scratch/dvratil/ktp-contact-runner.git
git://anongit.kde.org/ktp-contact-runner.git
```

And finally, big thanks to all our telepathic guys for their great work on the framework :) Keep it up!

Bye

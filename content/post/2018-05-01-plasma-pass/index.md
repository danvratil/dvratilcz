---
categories:
- KDE
date: "2018-05-01T21:57:12Z"
tags:
- KDE
- Plasma
- QML
title: Plasma Pass
---
You may have heard about [pass, the standard Unix password manager](https://www.passwordstore.org). I learned about it from Milian Wolf some months ago and I really liked it for its simplicity, respect for privacy and multiplatform support. And so over the past months, I started to slowly change my passwords to randomly generated ones stored in *pass.*

To get a password from *pass*, you simply type `pass -c SomePath/SomeService` into console and *pass* will copy the password straight to your clipboard. Super simple. Slightly less comfortable when you are dealing with websites though. Luckily there's a wonderful browser extension called [browserpass](https://github.com/dannyvankooten/browserpass#readme) that can fill online login forms with a single click and has automatic password matching based on the current domain.

But sometimes even I am simply too lazy to open Yakuake and type in a command, so I started looking for some GUI. There's [qtpass](https://qtpass.org), but that's not exactly what I was looking for. And so I dusted off my QML knowledge and wrote Plasma Pass: a systray Plasma applet to quickly find your password and copy it into the clipboard with a single mouse click. The applet also takes care of removing the password from the X11 clipboard as well as Klipper after 45 seconds so it won't leak accidentally through your clipboard history.

<video src="/assets/videos/plasma-pass.mp4" controls style="max-width: 100%"></video>

The source code is currently available in ~~my scratch repo: [https://cgit.kde.org/scratch/dvratil/plasma-pass.git/](https://cgit.kde.org/scratch/dvratil/plasma-pass.git/)~~ plasma-pass.git repo: [https://cgit.kde.org/plasma-pass.git](https://cgit.kde.org/plasma-pass.git).

And now back to fixing Akonadi ;-)

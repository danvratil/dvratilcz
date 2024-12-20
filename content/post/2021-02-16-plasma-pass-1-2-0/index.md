---
categories:
- KDE
date: "2021-02-16T07:00:00Z"
tags:
- KDE
- Plasma
- QML
- Pass
title: Plasma Pass 1.2.0
---
Plasma Pass, a [Plasma applet for the Pass password manager][plasmapass] version 1.2.0 is out.

The applet now supports OTP codes (in the format supported by the [pass OTP plugin][passotp]).
The 'clock' icon appears next to all passwords, even those that do not have OTP code. This
is a limitation caused by the passwords being stored in files encrypted and being decrypted
only when the user requests it - so the applet cannot know whether there's an OTP code
available in the password file until you click on it. There were also some small fixups
and UI improvements.

Tarball:

    https://download.kde.org/stable/plasma-pass/plasma-pass-1.2.0.tar.xz

Checksum:

    SHA-256: 01f0b03b99e41c067295e7708d41bbe581c0d73e78d43b50bf86b4699969f780
    SHA-1:   07a32d21b0c4dd38cad9c800d7b8f463f42c39c6

Signature:

    0ABDFA55A4E6BEA99A83EA974D69557AECB13683 Daniel Vrátil <dvratil@kde.org>

Feel free to report any issues or feature requests to [KDE Bugzilla][bugzilla].

[plasmapass]: {{< ref 2018-05-01-plasma-pass >}}
[bugzilla]: https://bugs.kde.org/enter_bug.cgi?product=plasma-pass&component=general

[passotp]: https://github.com/tadfisher/pass-otp

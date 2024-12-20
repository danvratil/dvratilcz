---
categories:
- KDE
date: "2012-05-30T22:59:40Z"
tags:
- Google
- KDE
- libkgapi
- libkgoogle
title: LibKGoogle → LibKGAPI
---
This is just a short note mostly for packagers and other developers using LibKGoogle (if there are any). Due to possible violation of Google trademark, the LibKGoogle library has been renamed to LibKGAPI. Thanks to Clifford Hansen for inventing such a nice name :)

Also the license has been changed and the project is now under GPLv2+ instead of GPLv3+.

The entire API is now encapsulated in KGAPI namespace instead of KGoogle and headers were moved to %prefix%/include/libkgapi.

All these changes are now reflected in LibKGAPI 0.4.0 release, which does not contain any other improvements or fixes. I decided to go directly to 0.4 instead of continuing the 0.3 series, as I consider this a big and important change.

The Akonadi resources for Google services in kdepim-runtime will depend on LibKGAPI 0.4.0, the patch has been already submitted for review.

The git repository is still called libkgoogle, it will be renamed when it's moved to KDE extragear (or somewhere else). Stable branch is LibKGAPI/0.4.

Tarball release: [libkgapi-0.4.0.tar.bz2](http://download.kde.org/stable/libkgapi/0.4.0/src/libkgapi-0.4.0.tar.bz2) ~~(will be available on ftp.kde.org soon)~~

Thanks and sorry for any inconvenience.

Cheers

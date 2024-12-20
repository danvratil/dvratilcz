---
categories:
- KDE
- Telepathy
date: "2013-01-14T23:22:19Z"
tags:
- KDE
- Telepathy
params:
  thumbnail: thumbnails/kde-telepathy-icon-100px.png
title: Packaging changes in KDE Telepathy
---
We have done some changes to our KDE Telepathy repositories recently, that might be interesting for packagers.

We have consolidated all Plasma applets into a single repository called ktp-desktop-applets (originally ktp-contact-applet). The ktp-presence-applet repository is now empty, the master branch contains just a README, the stable branch kde-telepathy-0.5 is preserved.

We have also normalized names of the applets, so they are now called org.kde.ktp-presence, org.kde.ktp-chat, org.kde.ktp-contactlist and org.kde.ktp-contact. The ktp-desktop-applets installs an update script for Plasma Desktop that will automatically update user configuration on next login.

All declarative plugins are now located in ktp-common-internals, so that all our QML models and utils are available for developers.

These changes will be first available in 0.6 release.

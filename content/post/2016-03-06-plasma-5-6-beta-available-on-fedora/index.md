---
categories:
- Fedora
- KDE
date: "2016-03-06T13:16:57Z"
tags:
- Fedora
- KDE
- Plasma
params:
  thumbnail: thumbnails/fedora-kde.png
title: Plasma 5.6 beta available on Fedora
---

Plasma 5.6 will be out in two weeks but the Plasma team has just released Plasma 5.6 beta which already features all the new yummy things and improvements as well as bunch of bug fixes that will be available in the 5.6 release.

Among other things Plasma 5.6 brings improved color scheme support, task manager on steroids, some new applets as well as further progress on the Wayland front. Two completely new things come as a tech preview: GRUB2 and Plymouth themes to make your system look fancy from the first second you power it up (see instructions below how to enable them).

You can ready the [release announcement with more detailed descriptions and screenshots here](https://www.kde.org/announcements/plasma-5.5.95.php).

The Fedora KDE SIG team has updated the Plasma 5 Unstable Copr repository so you can get a taste of Plasma 5.6 on Fedora 23 now (sorry for the lack of F22 builds). Rawhide will probably get the beta update some time next week.

```
dnf copr enable @kdesig/plasma-5-unstable
dnf update
```

Due to some changes in upstream releases of KActivities it is possible that you will get package conflict between kactivitymanagerd-debuginfo and kf5-kactivities-debuginfo. In that case please uninstall the kf5-kactivities-debuginfo package. This will be fixed properly once we roll out KDE Frameworks 5.20.

If you want to try the new GRUB and Plymouth themes, install the new packages

```
dnf install grub2-breeze-theme plymouth-theme-breeze
```

To enable the GRUB theme, edit `/etc/default/grub`:

```
GRUB_TERMINAL_OUTPUT="gfxterm"
GRUB_THEME=/boot/grub2/themes/breeze/theme.txt
```

and generate new GRUB configuration:

```
grub2-mkconfig -o /boot/grub2/grub.cfg
```

To enable the Plymouth theme, run

```
plymouth-set-default-theme breeze --rebuild-initrd
```

If you run into any packaging issues, please talk to us on #fedora-kde on IRC or kde@lists.fedoraproject.org. If you find any bugs or crashes, please report them to bugs.kde.org so that Plasma developers can fix them before the final 5.6 release.

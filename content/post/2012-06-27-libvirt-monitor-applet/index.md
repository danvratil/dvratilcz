---
categories:
- KDE
date: "2012-06-27T18:38:59Z"
tags:
- KDE
- libvirt
- Plasma
title: LibVirt Monitor Plasma Applet
---
This semester I attended _Advanced Topics of Linux Administration_ course on my university. To successfully complete the course, one must pass an exam, have a presentation and write an article on a related topic. I had a presentation about [libvirt](http://libvirt.org/) and decided to write an introduction into using libvirt's API (the article has been [published](http://www.abclinuxu.cz/blog/Atol/2012/6/atol-libvirt-api) (in English) on Czech Linux portal ABCLinuxu.cz).

As an example, I have written a Plasma Applet in QML (yay, my first QML thingie!) and a Plasma DataEngine that serves data about QEMU/KVM virtual machines running under local libvirtd.

On the applet you can watch state of all virtual machines, you can boot/pause/resume/shutdown and reboot them and configure soft and hard memory limits and amount of virtual CPUs allocated to each machine.

Pictures!

{{< figure src="images/plasma-virt-monitor-dataengine-150x150.png" link="images/plasma-virt-monitor-dataengine.png" alt="Plasma Virt Monitor DataEngine" >}}
{{< figure src="images/plasma-virt-monitor-applet-2-150x150.png" link="images/plasma-virt-monitor-applet-2.png" alt="Plasma Virt Monitor Applet" >}}
{{< figure src="images/plasma-virt-monitor-applet-1-150x150.png" link="images/plasma-virt-monitor-applet-1.png" alt="Plasma Virt Monitor Applet" >}}

I must admit that I was always a bit skeptical about QML, but my two previous encounters with QML made me really curious about it and writing this applet was really ~~pain~~ **fun** and it taught me a lot about QML.

The big advantage of the DataEngine is that it's not constantly polling libvirt for changes, but it rather utilizes it's events API.

Wanna try? :-) There's a tarball [here](http://kde-apps.org/CONTENT/content-files/151919-plasma-virt-monitor.tar.xz) and git repo here: git://anongit.kde.org/scratch/dvratil/plasma-virt-monitor

It was fun to hack and I plan to give it some more love, possibly after Akademy.

**PS:** Akademy - anyone flying on Friday at 08:10 from Vienna :-) ?

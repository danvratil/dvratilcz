---
layout: post
title: Kontact ♡ Flatpak
date: 2018-10-02 23:29:52 +02:00
thumbnail: kontact-flathub.png
categories:
- KDE
tags:
- Flatpak
- KDE
- Kontact
- PIM
---
## What is Flatpak
[Flatpak][1] is a new way of distributing applications.  Each application runs in its own isolated environment called sandbox with all its dependencies being provided as part of the Flatpak and with no access to other programs. This way every user runs the exact same application in the exact same environment no matter what Linux distribution they use.  The applications inside the sandbox are also limited to what system resources they can access, which provides greater security.

## Kontact Stable on Flathub
The latest stable version of [Kontact is now available on Flathub][2], the official app store for Flatpaks. So even if your distribution does not ship the latest version of KDE Applications or Kontact you can now easily install it from the Kontact Flatpak without having to worry about breaking your system.

How to get it? Follow this [setup guide on Flathub][3] to install Flatpak and to set up the Flathub repository.

Then you can install Kontact Flatpak from Discover or you can install it manually from terminal:

    flatpak install flathub org.kde.kontact

You should see Kontact icon in your installed apps, or you can run it manually from terminal again:

    flatpak run org.kde.kontact

Your feedback is welcomed, taming the entire Kontact to run inside of a tiny sandbox wasn't an easy task and we may have missed something. You can report issues in the [Kontact Flathub repository][4], reach us on the [KDE PIM mailing list][5] or via IRC on the #kontact channel on Freenode.

## Kontact Nightly
We also have nightly builds of the Kontact development branch. You can use the development Kontact Flatpak to see if your bug has been fixed, to help us with testing Kontact and to provide early feedback on new features before they are released. The nightly Kontact Flatpak runs completely isolated from the stable Flatpak as well as from system-wide installation, which means that your data and configuration are completely safe. We hope that offering this easy and safe way of running the latest development builds of Kontact to a wide audience we will receive more feedback and early testing, leading to better and more polished releases in the future.

To install the nightly build you first need to add the *kdeapps-testing* Flatpak repository:

    flatpak remote-add --if-not-exists kdeapps-testing --from https://distribute.kde.org/flatpak-apps-testing/kdeapps.flatpakrepo

And install Kontact Nightly:

    flatpak install kdeapps-testing org.kde.kontact//master

To run the nightly version, use

    flatpak run org.kde.kontact//master

You can read a more detailed [guide to Flatpak on our community wiki][6].

Remember to run `flatpak update`</code>` from time to time to always get the latest version.



## Help us make Kontact even better!
Take a look at some of the [junior jobs][7] that we have! They are simple, mostly programming tasks that don't require any deep knowledge or understanding of Kontact, so anyone can work on them. Feel free to pick any task from the list and reach out to us! We'll be happy to guide you and answer all your questions. [Read more here...][8]

[1]: https://www.flatpak.org
[2]: https://flathub.org/apps/details/org.kde.kontact
[3]: https://flatpak.org/setup/
[4]: http://github.com/flathub/org.kde.kontact
[5]: https://mail.kde.org/mailman/listinfo/kde-pim
[6]: https://community.kde.org/KDE_PIM/Flatpak
[7]: https://phabricator.kde.org/tag/kde_pim_junior_jobs
[8]: {% post_url 2018-08-25-kde-pim-junior-jobs-are-opened %}
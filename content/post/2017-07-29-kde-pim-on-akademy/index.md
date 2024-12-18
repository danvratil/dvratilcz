---
categories:
- KDE
date: "2017-07-29T16:07:26Z"
tags:
- Akademy
- Akonadi
- KDE
- Kmail
- PIM
title: KDE PIM on Akademy
---

Akademy is over and so here's a short summary of what the PIMsters have worked on during the past week.

## Wiki Cleanup

Me and Volker sat down and went through all KDE PIM wikipages on community.kde.org, userbase.kde.org and techbase.kde.org. Most of our wiki pages are horribly outdated, so we tried to clean them up, remove pages that are no longer relevant or useful. With fewer pages to take care of and better overview of what all content we have, we should be able to keep them more up-to-date than we did in the past years.

## Developer Story

Contributing to KDE PIM is hard and we know that. Getting all the dependencies and environment set up correctly is not trivial, and you can't run stable and development Kontact alongside each other easily.

We decided to address all those issues and make contributing to KDE PIM substantially easier. We are working on a Docker image that has all the dependencies and environment set up, so developers just need to run a single command to build entire KDE PIM. And thanks to the containerization, it's also possible to use the development version of Kontact in parallel with the stable version.

We hope that having ready-made development environment it will be easier for new contributors to get involved with KDE PIM. We will post a more details once the Docker image is ready.

## Kontact Homepage

Right now [kontact.kde.org](https://kontact.kde.org) and [kontact.org](http://kontact.org) just redirect to our page on the Userbase wiki. We decided that we want a simple, but professionally-looking web site to market Kontact as an actual product so that it appears more attractive to new users, especially those who will be coming from Windows in the future and contains comprehensive information for both users and developers.

## KMail User Survey

During QtCon 2016 we started working on KMail user survey to get a better idea of what our user base is like, how they use KMail and what their impressions of it are. And now the survey is finally live, so please [go and fill it](https://survey.kde.org/index.php/852475?lang=en) if you haven't done so yet.

## Wayland Support

Volker has finished porting Kontact to Wayland, so if you have Qt 5.9, you can now run Kontact natively on Wayland. Our main limitation was Wayland support in QWebEngine, which we use to render emails, but that has been resolved in Qt 5.9.

## Merging Exchange Support

Krzysztof Nowicki has been working on [Microsoft Exchange support for Kontact](https://github.com/KrissN/akonadi-ews) for a while now. We now have plans to merge his code into kdepim-runtime repository, so if everything goes right the Exchange support will be available out-of-the-box to all our users starting with the December release of KDE Applications.

## Next Sprint

We will be meeting soon again in Randa. Our main plan for the sprint is to continue with removal of KDateTime from our code, and thus making KDE PIM free of kdelibs4support.

There's some more that I did not mention here, you can check the [full notes](https://community.kde.org/KDE_PIM/Meetings/KDE_PIM_at_Akademy_2017) for details.

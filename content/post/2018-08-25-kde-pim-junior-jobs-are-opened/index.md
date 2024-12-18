---
categories:
- KDE
date: "2018-08-25T09:31:31Z"
tags:
- Akonadi
- c++
- KDE
- Kmail
- PIM
- QML
params:
  thumbnail: thumbnails/kontact.png
title: KDE PIM Junior Jobs are opened!
---
Do you want to help us improve your favorite PIM suite but you were always scared by its size and complexity? Well, fear no more! We have collected a bunch of simple and isolated tasks in various parts of the PIM suite that require none or just very basic understanding of how the entire Kontact and Akonadi machinery works. We have documented them and we are prepared to guide you and help you to accomplish the tasks. Those are small simple tasks, but they will make many users (and PIM developers) very very happy.

## *I'm in! What do I need to know?*
Just some C++ and maybe a bit of QML if you want to go for the QML tasks. We don't expect you to know anything about Akonadi or how the entire PIM thing works as most of the tasks are pretty self-contained (although you can read up on [the basic concepts and architecture](https://community.kde.org/KDE_PIM/Akonadi/Architecture) if you are interested).

## *Cool, what do you offer?*
We have tasks to improve the look of KAddressbook's [contact list](https://phabricator.kde.org/T9416), [contact view](https://phabricator.kde.org/T9417), and [contact editor](https://phabricator.kde.org/T9419). If you prefer working on KOrganizer, you can help us to make the [event view look more modern](https://phabricator.kde.org/T9420). We would also like to improve the Account Wizard experience by [porting it to QML](https://phabricator.kde.org/T9421) and improving [Gmail/Google Calendar and Contacts integration](https://phabricator.kde.org/T9422). Of course, the key part of Kontact is KMail and even there we have a few places that can be improved: we would like to improve the [IMAP quota warning](https://phabricator.kde.org/T9423) and add [support for Autocrypt](https://phabricator.kde.org/T8408). And finally, you can also make life easier for other KDE PIM developers by improving our debugging tool, the Akonadi Console: we want to be able to [save the output into JSON](https://phabricator.kde.org/T9426) and [load it again](https://phabricator.kde.org/T9427), [alphabetically sort some of the lists](https://phabricator.kde.org/T9428), make working with the [DB console a bit more comfortable](https://phabricator.kde.org/T9429) and be able to [restart Akonadi agents whenever](https://phabricator.kde.org/T9430) we want to.

There's also a very cool effort ongoing to allow integration between Kontact and [MyCroft](https://mycroft.ai), the opensource voice assistant. For this, we need help [improving a command line tool](https://phabricator.kde.org/T9431) that's used as a bridge between MyCroft and Kontact.

If you don't know any programming but you would still like to help, we have some non-programming tasks as well! Sure! We are working on a [new website for Kontact](https://phabricator.kde.org/T9432) and we could use help with both design and writing content for it! We also need help improving our user documentation, cleaning and updating our wikis on [community.kde.org](https://community.kde.org/KDE_PIM) and [userbase.kde.org](https://userbase.kde.org/) or cleaning up our bug tracker. If you want to help with any of that, get in touch with us on the [kde-pim mailing list](https://mail.kde.org/mailman/listinfo/kde-pim)!

You can find the [full list of junior jobs](https://phabricator.kde.org/tag/kde_pim_junior_jobs/) on Phabricator.

Haven't found anything interesting? Don't worry, we will keep adding more over the time, so just [check the list every now and then](https://phabricator.kde.org/tag/kde_pim_junior_jobs/). Or do you have your own idea how to improve KDE PIM and you just don't know where to begin? Get in touch with us and we will help you!

### *Now how do I get started?*
### 1) Get in touch with us
To make sure several people won't try to solve the same thing, it is the best to get in touch with the PIM community first so we can look at the single topics in more details. Some of the descriptions of the tasks are intentionally a bit vague as there are multiple ways how to approach or solve the problem. It's always better to talk about the options first so that no time is wasted on approaches that won't work.

### 2) Get your development environment set up
The KDE PIM community wiki contains articles on how to develop [KDE PIM inside a Docker container](https://community.kde.org/KDE_PIM/Docker). Alternatively, as most of the changes are pretty isolated, you should be able to [compile just a single component from source](https://community.kde.org/KDE_PIM/Development/Start) against your distribution packages (you will just need to install some development packages first).

### 3) Pick a task
Pick one of the tasks linked above, or just look at all the [junior job in Phabricator](https://phabricator.kde.org/tag/kde_pim_junior_jobs/). They span different topics, different components and are of different complexity and size. If you find a particular task that you would like to work on, assign it to yourself and get working! If someone else already has the task assigned, you can ask if they maybe want some help, or just look for another task.

### 4) Get to work!
Fire up your favorite IDE and start working! If you need any help with the task - from finding the right repository and code, through getting the program compiled to being stuck on a bug or something not working - just ask us! You can ask in the Phabricator task or send an email to the [kde-pim mailing list](https://mail.kde.org/mailman/listinfo/kde-pim) and some of the PIM devs will help you.

Also, don't feel limited by the description of the tasks - feel free to do only part of the task, or do even more than what's in the task description. If you think you have a better idea how to solve something, let us know in the Phabricator task.

## *I have the code, what's next?*
Awesome! Now it's time to upload the code for review. You can use the [arcanist command line tool](https://community.kde.org/Infrastructure/Phabricator), or you can just generate a diff and upload it manually [via the web interface](https://phabricator.kde.org/differential/diff/create/). Don't worry if you don't know whom to assign for review, Phabricator sends the notification the entire PIM team automatically.

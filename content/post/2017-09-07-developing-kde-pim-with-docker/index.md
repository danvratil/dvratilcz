---
categories:
- KDE
date: "2017-09-07T20:26:31Z"
tags:
- container
- development
- docker
- KDE
- PIM
title: Developing KDE PIM with Docker
---

Getting started with contributing to KDE PIM can be hard - we have nearly 60 repositories with complicated dependencies - just getting that right can discourage many people from even trying. And then there's, of course, the risk factor of running development build alongside your production Kontact, endangering your precious emails.

To address all these issues I have created a Docker image. It's based on the [KDE Neon Developer edition](https://neon.kde.org/develop) and it has all the dependencies pre-installed and pre-configured and comes with a set of handy shell scripts to make your life easier. It also has the environment set up properly so that you can run the development build of Kontact inside of the container - completely isolated from your production installation.

Interested now? Follow the instructions how to build the Docker image and how to run the container on our [KDE PIM Docker wiki page](https://community.kde.org/KDE_PIM/Docker).

The section regarding GPU drivers is still incomplete, if you have any knowledge regarding running OpenGL-enabled applications inside a Docker container with Nouveau or AMD/ATI drivers, let us know, please!

You can probably use our Docker image to develop other KDE applications in there as well, or you can take a look at Jos' blog about [Developing KDE with Docker](https://www.vandenoever.info/blog/2017/07/23/developing-kde-with-docker.html) and create your own Docker image to work on your favorite KDE application.

Happy hacking!

---
layout: post
title: KDE PIM Sprint 2024 Report
date: 2024-06-19 20:00:00 +0200
categories:
 - KDE
tags:
 - KDE
 - PIM
 - Akonadi
---

In 2021 I decided to [take a break][blog-taking-break] from contributing to KDE,
since I felt that I've been losing motivation and energy to contribute for a while…
But I've been slowly getting back to hacking on KDE stuff for the past year, which
ended in me going to Toulouse this year to attend the annual KDE PIM Sprint, my
first in 5 years.

I'm very happy to say that we have /a lot/ going on in PIM, and even though not
everything is in the best shape and the community is quite small (there were only
four of us at the sprint), we have great plans for the future, and I'm happy to be
part of it.

# Day 0

The sprint was officially supposed to start on Saturday, but everyone arrived already
on Friday, so why wait? We wrote down the topics to discuss, put them on a whiteboard
and got to it.

![Whiteboard with all discussion topics](/assets/2024-06-19-kde-pim-sprint-2024-report/whiteboard.png)

We've managed to discuss some pretty important topics - how we want to proceed with
deprecation and removal of some components, how to improve our test coverage or how
to improve indexing and much much more.

I arrived to the sprint with two big topics to discuss: milestones and testing:

## Milestones

The idea is to create milestones for all our bigger efforts that we work (or want
to work) on. The milestones should be concrete goals that are achievable within a
reasonable time frame and have clear definition of done. Each milestones should then
be split to smaller tasks that can be tackled by individuals. We hope that this
will help to make KDE PIM more attractive to new contributors, who can now clearly
see what is being worked on and can find very concrete, bite-sized tasks to work
on.

As a result, we took all the ongoing tasks and turned most of them into
[milestones in Gitlab][pim-milestones-board]. It's still very much work in progress,
we still need to break down many milestones to smaller tasks, but the general ideas
are out there.


## E2E Testing of Resources

Akonadi Resources provide "bridge" between Akonadi Server and individual services,
like IMAP servers, DAV servers, Google Calendar etc. But we have no tests to verify
that our Resources can talk to the services and vice versa. The plan is to create
a testing framework (in Python) so that we can have automated nightly tests to
verify that e.g. IMAP resource interfaces properly with common IMAP server
implementations, including major proprietary ones like Gmail or Office365. We want
to achieve decent coverage for all our resources. This is a big project, but I think
it's a very exciting one as it includes not just programming, but also figuring out
and building some infrastructure to run e.g. Dovecot, NextCloud and others in
a Docker to test against.

# Day 1

On Saturday we started quite early, all the delicious french pastry is not going to
eat itself, is it? After breakfast we continued with discussions, we dicussed tags
support, how to improve our PR. But we also managed  to produce some code. I
implemented syncing of iCal categories with Akonadi tags, so the tags are becoming
more useful. I also prepared Akonadi to be cleanly handle planned deprecation and
retirement of KJots, KNotes and their acompanying resources, as well as planned
removal of the Akonadi Kolab Resource (in favor of using IMAP+DAV).

One of the tasks I want to look into is improving how we do database transactions in
the Akonadi Server. To get some data out of it, I shoved Prometheus exporter into 
Akonadi, hooked it up to a local Prometheus service, thrown together a Grafana 
dashboard, and here we are:

![Grafana dashboard](/assets/2024-06-19-kde-pim-sprint-2024-report/grafana.png)

We decided to order some pizzas for dinner and stayed at the venue hacking until
nearly 11 o'clock.

# Day 2

On the last day of the sprint we wrapped up on the discussions and focused on actually
implementing some of the ideas. I spent most of the time extending the Migration agent
to extract tags from all existing events and todos already stored in Akonadi and helped
to create some of the milestones on the Gitlab board. We also came up with a plan for
KDE PIM BoF on this years Akademy, where we want to present out progress on the
respective milestones and to give a chance to contributors to learn what are the biggest
hurdles they are facing when trying to contribute to KDE PIM and how we can help make
it easier for them to get involved.

# Conclusion

I think it was a very productive sprint and I am really excited to be involved in PIM
again. Can't wait to meet up with everyone again on Akademy in September.

Go check out [Kevin's][kevins-blog] and [Carl's][carls-blog] reports to see what else
have they been up to during the sprint.

Did some of the milestones caught your eye, or do you have have any questions? Come
talk to us in our [matrix channel][matrix-channel]. 

Finally, many thanks to Kevin for organizing the sprint,
[Étincelle Coworking][etincelle-coworking] for providing us with nice and spacious
venue and [KDE e.V.][kde-ev] for supporting us on travel.

Finally, if you like such meetings to happen in the future so that we can push forward
your favorite software, please consider [making a tax-deductible donation][kde-donate]
to the [KDE e.V. foundation][kde-ev].


[blog-taking-break]: {% post_url 2021-05-03-taking-a-break %}
[pim-milestones-board]: https://invent.kde.org/groups/pim/-/milestones
[matrix-channel]: https://matrix.to/#/#kontact:kde.org
[etincelle-coworking]: https://www.etincelle-coworking.com/
[kevins-blog]: https://ervin.ipsquad.net/blog/2024/06/16/report-from-kdepim-spring-sprint-2024/
[carls-blog]: https://carlschwan.eu/2024/06/16/kde-pim-sprint-2024-edition/
[kde-ev]: https://ev.kde.org/
[kde-donate]: https://www.kde.org/community/donations/index.php

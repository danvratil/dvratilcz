---
categories:
- KDE
date: "2016-09-10T22:41:49Z"
tags:
- Akademy
- Akonadi
- KDE
- PIM
title: Akademy 2016 is over :(
---

It's actually been over for two days, but I'm still sitting in Berlin and only now got to write something.

As every year, it was great to see all my friends and fellow hackers again. Thanks everyone for being so awesome, I enjoyed every day of QtCon and Akademy with you. Can't wait to meet everyone again next year :-)

In the terms of KDE PIM, this year's Akademy was very productive. We had our KDE PIM BoF session on Monday afternoon, where we spent most of the time discussing KDE PIM User Survey - a plan of mine to get more information about our users and their use cases. The results will help us, the KDE PIM devs, to better understand how our users use our software and thus prioritize our focus. We ended up with an initial set of questions we intend to ask our users and next week I'll meet with some more KDE PIM hackers that could not attend Akademy and we will finalize the set of questions so that we can publish the survey later this month.

We also talked about some other topics on the meeting, like releasing of some of our libraries that Kube wants to use and so on.

You can read the mostly complete meeting notes on the [KDE PIM wiki](https://community.kde.org/KDE_PIM/Meetings/KDE_PIM_at_Akademy_2016).

Outside of the BoF session we touched the topic of KDE PIM sprints and meetings. We want them to be more focused in the future, i.e. having a specific topic for each meeting that we will all work on together. We hope to do one meeting in Autumn this year to finish porting KCalCore away from KDateTime and KDELibs4Support, then a Spring meeting in Toulouse (which has become our new regular place for Spring sprints), then Randaaaaaaaaaaa (which gives us full 6 days of uninterrupted hacking with only small breaks to eat Mario's chocolate :-)) and then it's Akademy time again!

Oh and I can't forget to mention that the KDE PIM team was awarded the Akademy Award for our work on, well, KDE PIM :-). It was a great feeling to stand on the stage knowing that people appreciate our work.

---

Regarding my PIM work during Akademy, I think this year was pretty good. I did my share of partying during QtCon, so I could spent most of Akademy days hacking from morning until they kicked us out from the venue, and then continuing with some more hacking in the KDAB office until late night. Already before the event I merged a big change that improves the Akonadi change notification system. I managed to polish it during Akademy and fix several crashes and bugs.

Another big change was to our test-suite. It contains among other things integration tests, where we run an actual Akonadi server in an isolated environment (so that it does not touch any real data) and test whether clients interact with it as they are supposed to do. For these integration tests we've been only using the SQLite database until now, but I have now enabled MySQL and PostgreSQL too, so we run each test three times - once for each of the backends. This has revealed several corner-case issues that we weren't aware of until now. The test still run into some issues on the CI on build.kde.org but locally they pass for me (with only one exception). Addressing those issues is on the top of my todo list now.

I also started working on an experimental XML->C++ generator, which would allow me to get rid of some 12,000 lines of hand-written C++ code that implements the communication protocol between Akonadi server and the clients. Instead I will generate the code from a simple XML. So far I managed to get it to generate a code that compiles, but there's still a lot of work ahead to make it generate an optimal and correct code.

I'll spend the next week meeting all my colleagues from KDAB, which I'm really looking forward to. Although I know many of them from KDE, there are lots of people I haven't met yet, so it will be great to attach faces to the names. After that, it's back to Prague and to regular work (and some more Akonadi hacking ;-)).

Oh and if you haven't heard yet, KDE is celebrating 20th birthday. Go check out the [timeline of KDE](https://timeline.kde.org) and get the amazing ["20 Years of KDE" book](https://20years.kde.org/book/index.html)!

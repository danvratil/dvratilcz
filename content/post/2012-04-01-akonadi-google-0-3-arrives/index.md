---
categories:
- KDE
date: "2012-04-01T20:45:08Z"
tags:
- Akonadi
- Google
- KDE
- libkgoogle
- PIM
title: Akonadi Google 0.3 arrives
---
After many months of "I will release it next week" I finally released libkgoogle 0.3 and new version of Akonadi resources for Google this week.

So, what's new? I managed to implement everything I described in [this post]( {% post_url 2011-11-25-akonadi-google-resource-whats-comming %} "Akonadi Google Resource: what’s coming?") back in November. That's support for multiple Google accounts, and merging the tasks resource into the calendar resource (so now it's called "Calendar and Tasks resource"). The calendar now properly supports events recurrence and partially exceptions in recurrent events (there's still some work to be done). The contacts resource now splits your contacts to "My Contacts" and "Others" groups. I hoped to fully support contact groups, the code was even in place, but I've run to some problems how to store it in Akonadi and unfortunately KAddressBook is not "compatible" with the Google's concept of contact groups, so I decided to stick with the two elementary groups and hopefully I'll get to this later (maybe some PIM dev could help me on Akademy? ;) )

If you run to any problems or bugs, please report them to the libkgoogle product in bugzilla.

Finally, I'd like to thank to Jan Grulich and Vojtěch Zeisek for putting their contacts and events at risk to test the pre-release versions and provided valuable feedback.

## Sources

**(Updated tarball!)** [akonadi-google-0.3.tar.gz](/assets/akonadi-google-0.3.tar.gz) (md5: 8c5c1e015068bea90bf25dd7858dc913)

If you want to follow the most recent development, you can use sources from the *master* branch.

Have a nice day!

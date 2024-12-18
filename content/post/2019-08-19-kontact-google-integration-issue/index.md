---
categories:
- KDE
date: "2019-08-19T20:53:00Z"
tags:
- KDE
- PIM
- Akonadi
- Google
params:
  thumbnail: thumbnails/kontact.png
title: Kontact and Google Integration Issues
---

Lately there were some issues with the Google integration in Kontact which
caused that it is no longer possible to add new Google Calendar or Gmail account
in Kontact because the log in process will fail. This is due to an oversight on
our side which lead to Google blocking Kontact as it did not comply with Google's
policies. We are working on resolving the situation, but it will take a little
bit.

Existing users should not be affected by this - if you already had Google
Calendar or Gmail set up in Kontact, the sync should continue to work. It is
only new accounts that cannot be created.

In case of Gmail the problem can mostly be worked around when setting up the
IMAP account in KMail by selecting `PLAIN` authentication[^1] method in the
*Advanced* tab and using your email and password. You may need to enable *[Less
Secure Applications][1]* in your Google account settings in order to be able to log
in with regular email address and password.

If you are interested in the technical background of this issue, the problem
comes from Google's OAuth App Verification process. When a developer wants to
connect their app to a Google service they have to select which particular
services their app needs access to, and sometimes even which data within each
service they want to access. Google will then verify that the app is not trying
to access any other data or that it is not misusing the data it has access to -
this serves to protect Google users as they might sometimes approve apps that
will access their calendars or emails with malicious intent without them
realizing that.

When I registered Kontact I forgot to list some of the data points that Kontact
needs access to. Google has noticed this after a while and asked us to clarify
the missing bits. Unfortunately I wasn't able to react within the given time
limit and so Google has preemptively blocked login for all new users.

I'm working on clarifying the missing bits and having Google review the new
information, so hopefuly the Google login should start working again soon.

[^1]: Despite its name, the `PLAIN` authentication method does *not* weaken the
    security.  Your email and password are still sent safely encrypted over the
    internet.

[1]: https://support.google.com/accounts/answer/6010255

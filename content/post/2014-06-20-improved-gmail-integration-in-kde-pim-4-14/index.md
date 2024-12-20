---
categories:
- KDE
date: "2014-06-20T19:23:34Z"
tags:
- Akonadi
- Gmail
- Google
- KDE
title: Improved Gmail integration in KDE PIM 4.14
---

*Update: [no Gmail integration after all]({{< ref 2014-07-24-no-gmail-integration-in-4-14-after-all.md >}}), feel free to contact me if you want to help*

Hi all,

I already teased publicly about the new Gmail resource on [Google+](https://plus.google.com/+DanVr%C3%A1til/posts/LsTR6sr4Wvt) yesterday, now it's time for some more explanations and...screenshots!

*What is this about?*

A native Gmail Resource for Akonadi that will bring much better integration of Gmail features into Kmail.

I've been talking about it and promising it for quite some time. But now thanks to some changes to the regular IMAP Resource that Christian Mollekopf has done recently, I could finally start working on it!

*But...why?*

Those who use Gmail know that Gmail does some things differently than most normal mail services. The biggest difference is that there are not really any folders with emails. Instead there's one folder with all your emails and then there are labels, that you can assign to emails and then you can just filter your emails by the labels. And you can assign multiple labels to one email.

*Yeah, but why bother? It already works quite well with the normal IMAP resource, right?*

Yes, Gmail is able to hide this specialities from regular email clients so that they can still work with Gmail like with any other generic mail server, but at the cost of losing some features.

More and more often you can hear today that desktop email clients are dead and the future is in webmail ([and cloud](https://github.com/hank/cloud-to-butt)). And for many users who only have one email account this is true - why having KMail and KOrganizer etc. running, when they can have all this and more opened constantly in a single tab in their web browser? And the truth is, that [Gmail is simply the largest mail provider in the world](http://www.themarysue.com/gmail-email-top-dog/) today. So if we want to persuade all these users to keep using KMail, we need to provide a user experience that is as close as possible to the native web interface. And for that we need a native Akonadi Resource ;-)

(Note: I'd like to avoid flamewars about "desktop clients are not dead vs. are dead" - I believe they are not dead for people who use more than one email account. They will cling to desktop clients until the dawn of the Gods, and even longer, but for normal users with just one mail account, it might be just matter of years to leave desktop clients. But who knows. [impossible to see the future is](http://2.bp.blogspot.com/_6MZ5IHs-3bw/TR58WKNBZ-I/AAAAAAAAASA/AakWVJ7vbEs/s1600/YodaForceLift1.jpg)).

*Ok, so what's the difference between Gmail and IMAP Resources?*

The Gmail Resource supports some Gmail-specific IMAP extensions. In other words, it can speak and understands Gmail's IMAP dialect. This means that the Gmail resource can handle the Gmail specifics better than the generic IMAP Resource:

1) **Flattened folder hierarchy**. This is best shown on screenshots: on the left, there's a folder hierarchy as shown in KMail when using the current IMAP resource, on the right there's the same account but synced via the new Gmail resource.

{{< figure src="images/gmail-imap-folders.png" alt="Folder hierarchy synced via the IMAP resource" class="small aligncenter" >}}
{{< figure src="images/gmail-folders.png" alt="Folder hierarchy synced via native Gmail Resource" class="small aligncenter" >}}

2) **One email to rule them all**! As explained above, one email on Gmail can have multiple labels. But when you sync the mail via normal IMAP, you get a *copy* of that email in each folder. That means, that marking the mail as read will only mark as read that copy, but not the other copies in other folders, simply because KMail does not know they are effectively the same mail.

The Gmail resource is aware of this, an it syncs all your emails into one hidden folder and then just *links* them to the actual folders representing Gmail labels that you can see in KMail, so when you mark an email as read in any folder, it will mark it as read in all folders it's linked into. Awesome, right?

3) **OAuth authentication**. The regular IMAP resource only supports the regular username-password authentication (and GSSAPI), which means that your password is stored in the computer somewhere, and if you use 2-step verification, you need to generate an app-specific password.

The Gmail resource has support for Gmail's OAuth2, so you only enter your password once into Google's web login, and the resource will then use a special tokens issued by Gmail with limited life-span to authenticate all your requests.

{{< figure src="images/gmail-auth-300x260.png" link="images/gmail-auth.png" alt="Gmail Resource authentication" class="aligncenter large" >}}
{{< figure src="images/gmail-2step-verification-300x260.png" link="images/gmail-2step-verification.png" alt="Gmail Resource: 2-step authentization support" class="aligncenter large" >}}

The authentication is actually powered by LibKGAPI, a Qt/KDE library that implements various Google APIs, so it has the same look and uses the same code as the Akonadi Resources for Google Calendars and Google Contacts.

(Funny story and a question: I actually had to write a custom plugin for Cyrus-SASL to support XOAUTH2 mechanism, as upstream does not support it. Does anyone know whether there's an existing implementation somewhere on the interwebs that I could use instead my crappy plugin?)

4) **Simpler configuration**. This is not really that big, bacause you don't open the dialog very often, but I really like the configuration dialog a lot: simple and without complex options like encryption, mechanisms... This is simply because Gmail supports only a specific set of IMAP features, so I could just remove lot's of stuff from the configuration dialog making it thinner and much easier to understand (IMO).

{{< figure src="images/gmail-configuration-300x269.png" link="images/gmail-configuration.png" alt="Gmail Resource configuration dialog" class="aligncenter large" >}}

5) **Push-notifications for all folders**. The IMAP Resource can only monitor one folder for changes (using [IMAP IDLE](http://tools.ietf.org/html/rfc2177)), because of certain technical restrictions. The folder usually is the Inbox. So if you have server-side filtering, you will never get push-notifications about new emails arriving to your other folders.

The limitation for watching only one folder applies to the Gmail Resource too. However since we understand Gmail, we can watch the "All Mail" folder, instead of the Inbox, so this way we get push notifications about emails from absolutely all folders (except for Trash and Junk folders, but who cares about these). Thinking about it, I could even remove the "Check Interval" option from configuration now.

*Uhm ok, so what's the state of the resource?*

Currently the resource is still in a branch, waiting for some more features to be finished and for Christian to approve some of my changes to the IMAP resource (I'll bribe him with some beer during Akademy, if necessary ;-)), and some changes must be done in KMail to properly support copying and moving of the linked emails, but other than that, it already works quite nicely :-)

That's about it, see you next time :-)

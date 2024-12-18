---
categories:
- KDE
date: "2018-04-25T22:40:26Z"
tags:
- Akonadi
- KDE
- PIM
- sprint
title: My KDE PIM Update
---
This blog post is long overdue, but now that I'm back home from the KDE PIM Sprint in Toulouse, which took place last weekend, there's some more news to report.

## Akonadi Improvements
On the sprint, I finally finished and merged a new improvement in Akonadi called Notification Payloads. I will not go into the technical details here, the most important thing is that this new improvement will notably reduce the CPU and disk load in Akonadi, especially during intensive operations like email sync. It should also help with the long-standing issue regarding errors and email duplication when using POP3 and local mail filters. Finally, this new feature opens doors to further improvements and optimizations like server-side change recording (technicalities here) and ultimately being able to shut down Akonadi Resources when they are not needed and start them on-demand, thus saving some more resources.

As I was touching the internal notification system in Akonadi I also improved the relevant debugging tools in Akonadi Console, our developer and debugging tool for Akonadi. Based on input from Sandro I also added Logs view. Thanks to that it's now possible to see debug output from all running Akonadi applications straight in the Akonadi Console without the need to restart Akonadi or the application from the terminal to see the debug output. This will make it easier for users to provide us with relevant information to help us debug and solve their Akonadi issues.

## Kontact Improvements
This was just a minor change, but it finally solved my long-standing issue with Kontact and Breeze: the side-pane icons to choose between different Kontact modules were colorful - the only non-monochromatic part of Kontact which was so obviously not fitting into the rest of the UI. With a tiny change, the icons are now also monochromatic, making the Kontact window look more uniform.

{{< figure src="images/kontact-old-1024x612.png" link="images/kontact-old.png" alt="Before" title="Before" >}}

{{< figure src="images/kontact-new-1024x625.png" link="images/kontact-new.png" alt="After" title="After" >}}

## Native Gmail authentication for IMAP and SMTP
For a while now the IMAP resource supports logging into Gmail accounts using the so-called OAuth method, where you provide your credentials into the Gmail login window which also supports two-factor authentication. The IMAP Resources was forcing the OAuth method with Gmail for everyone, but this requirement has now been relaxed. Although the IMAP resource will choose this method by default it's possible now to also choose the traditional authentication methods like with any other email provider.

Secondly, the OAuth support has finally landed also into our SMTP module which is used for sending emails, so if you select this method in your Outgoing account configuration with Gmail, you no longer need to use "App-specific passwords" from Gmail.

## Syndication Cleanup
The Syndication library is used to retrieve and parse RSS and ATOM feeds and is used among others by Akregator. We have now cleaned up the library and removed some redundant dependencies so that we will eventually be able to move it into KDE Frameworks so that even more applications can benefit from it.

## Going to Windows
Thanks to a huge effort from Hannah we are now able to build Akonadi and other parts of the KDE PIM stack on Windows. While we are still a long way away from having Kontact properly running on Windows, we managed to get Akonadi to work on Windows with some other programs. Windows is a huge platform and Kontact with all its features and functionality could be a good competition to established PIM solutions there and a huge potential to grow our user and developer base. While we still focus primarily on Linux, we are slowly looking forward to extending our reach to Windows.

## Bugfixes
A lot of them. Big thanks to David Faure who spent a big part of the weekend debugging his IMAP resource to figure out why it keeps getting stuck on occasions. He fixed several issues in the IMAP resource so that it properly reconnects after server connection is lost or times out (due to poor internet connectivity usually) and also found and fixed some issues in Akonadi syncing code.

## Future
What's next then? We will continue to work towards a stable release for Windows, and hopefully soon finish the rewrite of the indexing and search infrastructure in KDE PIM to make it faster, reliable and more useful again. There's also a lot of smaller tasks and improvements to look into during the year.

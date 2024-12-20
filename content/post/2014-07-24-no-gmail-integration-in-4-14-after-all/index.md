---
categories:
- KDE
date: "2014-07-24T16:32:26Z"
tags:
- Akonadi
- Gmail
- Google
- KDE
- PIM
title: No Gmail integration in 4.14 after all :(
---

Hi folks,

I'm sorry to bring bad news, but after trying to fight some last minute bugs in the new Gmail resource today, I realized that pushing the resource into KDE Applications 4.14 was too hurried, and so I decided **not** to ship it in KDE Applications 4.14. I know many of you are really excited about the Gmail integration, but there are far too many issues that cannot be solved this late in 4.14 cycle. And since this will probably be the last 4.x release, shipping something that does not perform as expected and cannot be fixed properly would only be disappointing and discouraging to users. [In my original post I explained]({{< ref 2014-06-20-improved-gmail-integration-in-kde-pim-4-14 >}}) that I was working on the Gmail integration to provide user experience as close as possible to native Gmail web interface so that people are not tempted to switch away from KMail to Gmail. But with the current state of the resource, the effect would be exactly the opposite. And if the resource cannot fulfil its purpose, then there's no point in offering it to users.

Instead I will focus on implementing the new native Gmail API and merging together the existing Google resources to create a single groupware solution that will provide integration with all Google's PIM services - contacts, calendars, tasks and emails.

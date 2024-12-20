---
categories:
- KDE
date: "2017-01-07T12:39:42Z"
tags:
- Akonadi
- bugs
- KDE
- Kmail
- PIM
title: 'KMail: "Multiple Merge Candidates" error and how to fix it'
---

If you can't synchronize a folder in KMail and you are seeing "[*Multiple Merge Candidates*](https://bugs.kde.org/show_bug.cgi?id=338658)" error after the synchronization fails, here's a how to fix the folder to make it synchronize again - basically you force KMail to forget and re-sync the folder again.

{{< figure src="images/x1-275x300.png" alt="" class="alignright small" width="275" height="300" >}}

1. Open Akonadi Console.
2. Go to the *Browser* tab.
3. Right-click the broken folder and select "*Clear Akonadi Cache*" - this will remove all emails from the folder in Akonadi. This will **NOT** delete your emails on the server.
4. Akonadi Console will freeze for a while, wait until it unfreezes (sorry, it's just a developer tool, we don't have a very good UX there :-)).
5. Logout and login to make sure all PIM components are restarted.

After login start KMail (or Kontact) and hit "*Check mail*". KMail will now re-download all emails from the previously broken folder. This may take a while depending on how large the folder is and how fast your internet connection is. After that the synchronization should work as expected.

In the upcoming KDE Applications 16.12.1 release Akonadi will have a fix that fixes the reason why the "*Multiple Merge Candidates*" error occurs, so hopefully in the future you should not see this error anymore.

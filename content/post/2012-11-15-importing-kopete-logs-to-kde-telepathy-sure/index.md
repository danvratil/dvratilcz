---
categories:
- KDE
- Telepathy
date: "2012-11-15T12:06:52Z"
tags:
- bugs
- glory
- KDE
- Kopete
- logs
- logviewer
- Telepathy
title: Importing Kopete logs to KDE Telepathy? Sure!
---
What is your excuse for still using Kopete instead of KDE Telepathy? Oh, you can't live without your old conversation logs? Not a problem anymore!

KDE Telepathy is now able to import your AIM, MSN, ICQ, Yahoo, Jabber or GaduGadu logs from Kopete into Telepathy logger.

When you add a new account in the Accounts KCM, we will convert the new account ID into Kopete account ID and check, whether there are any logs in Kopete folder for this account. And if there are, we ask you whether you want to import them or not.

{{< figure src="images/logimport_kcm.png" title="Import Kopete logs for a new account?" >}}

That's nice, right? But what about our current users, who just silently weep, longing for their old Kopete logs? Well, we thought about them, too! After starting the KDE IM Log Viewer, you will be prompted with initial logs import dialog. The dialog will appear only once. Whether you click "Import Logs" or "Cancel", we won't bother you with this never again. Currently I'm considering adding a main menu to the log viewer, which would contain an action to invoke this dialog again, in case you accidentally click "Cancel" for instance.

{{< figure src="images/logimport_full.png" title="Initial Kopete logs import diaog" >}}

When you are removing an existing account from KDE Telepathy, you are prompted the "Are you sure you want to remove the account?" dialog. As a bonus, I have enriched it by a "Remove conversations logs" checkbox. Guess what will happen if you check it ;)

{{< figure src="images/kcm_removelogs.png" title="Remove account confirmation dialog can now clear logs too" >}}

All these features will be available in KDE Telepathy 0.6.

And as usually, we are still looking for new contributors! There are some [junior jobs](https://bugs.kde.org/buglist.cgi?keywords=junior-jobs%2C%20&amp;keywords_type=allwords&amp;list_id=289337&amp;query_format=advanced&amp;bug_status=UNCONFIRMED&amp;bug_status=NEW&amp;bug_status=ASSIGNED&amp;bug_status=REOPENED&amp;product=telepathy) in the bugzilla, which are a perfect start for newcomers. If you would need any help with fixing these bugs or wishes, just come talk to us on #kde-telepathy IRC channel or mailing lists.

{{< figure src="images/pain-glory-meme.jpg" title="Pain is temporary, Glory is eternal!" >}}

**Earn your eternal glory by fixing KTp bugs!**

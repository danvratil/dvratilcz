---
categories:
- KDE
date: "2013-11-18T16:09:52Z"
tags:
- Akonadi
- KDE
- KMail
- PIM
title: 'Email Threading in KMail: Your Help is Needed!'
---

Hi KMail users,

we have a little favor to ask from you :-) On the KDE PIM Sprint we discussed how to improve email threading in KMail by using Akonadi to store the information, so that KMail does not have to compute it every time. This would make opening a folder almost instant, all threads would be reconstructed immediately and it would massively improve CPU and memory consumption (so it's totally something worth helping us with ;-)) More details on what else we discussed and implemented will follow in another blog post tomorrow.

To implement the threading caching, we need to know, whether in these days it still makes sense to support threading by Subject. It's used as a fallback when grouping by standardized email headers (In-Reply-To, References) are missing, which used to be a case with buggy email clients years ago, but hopefully is better now, so we could drop it, which would massively simplify the algorithms.

So we would like you to disable threading by Subject, observe how much it breaks your threading (and potentially your workflow) and report back to us. To disable it, go to _View_ ->_Message List_ ->_Aggregation_ -> _Configure_. There go to _Groups & Threading_ tab and in _Threading_ combobox select _Perfect and by Reference_. If the combo boxes are disabled, you have to click _Clone Aggregation_ to clone the default settings, and use the clone.

{{< figure src="images/contextmenu1.png" alt="View->Message List->Aggregation->Configure..." class="aligncenter large" >}} View->Message List->Aggregation->Configure...

{{< figure src="images/configdialog.png" alt="Aggregation Configuration" title="Aggregation Configuration" class="aligncenter large" >}} Aggregation Configuration

If removing threading by subject would break threading and workflow for too many users, we will keep the settings and we will try to figure out another way to do it.

So please configure your KMails, and let us know in comments below this post, on IRC, kde-pim mailing list or through any other communication means (just please try to avoid using smoke signals and pigeons ;-))

Thank you for your help!

---
categories:
- KDE
date: "2017-10-04T17:13:47Z"
tags:
- Akonadi
- bugs
- KDE
- Kmail
- PIM
title: KMail User Survey Results, Part 1
---

Back in August, we [ran a survey](https://dot.kde.org/2017/08/01/kmail-user-survey) to get input from our users and get a better understanding of how they use KMail. First, let me start by thanking everyone who took their time to fill in the survey. We collected over 3000 responses which is much more than we expected. Thank you very much! We got some interesting numbers and data from the survey, which I'll analyze later, but to my big surprise, the most interesting part was the comments that many of you left at the end of the survey. We got over 1000 comments which provided us with a consistent feedback from the userbase. In this and the next blog posts, I want to address the common themes, complaints, and remarks that appeared in the comments, address the concerns raised and present some action plans that we are going to take to address those.

## What's going to happen to KMail when Kube is released

Nothing. [Kube](https://kube.kde.org/) is not going to replace KMail. Both projects will co-exist and be continuously developed and improved. Each project targets a slightly different audience - KMail focuses on power users with several accounts and high volume email traffic, while Kube focuses on less advanced users. Kube will not, and is not attempting to, provide many of the advanced features that KMail has, instead, it will help KDE to provide a friendly PIM solution for all users.

## *"Akonadi should die"*

We hear this a lot: *"Akonadi sucks"*, *"Akonadi should be replaced"*, etc. While we understand the frustration of many users who are having huge troubles with Akonadi, we are committed to it and we are convinced it *is* the right way to go. Akonadi got a lot of bad reputation in the early days, but we worked very hard to fix the bugs and improve the performance over the years and we will continue to do so in the future. I took some more detailed notes, so I have an idea what people dislike about it the most and will try to focus towards solving that. There also seems to be a lot of misconception as to what Akonadi really does and it is often blamed for things it's not directly responsible for. I might write a detailed blog post about that sometime in the future.

Some of you also mentioned Sink: Sink (formerly known as Akonadi-next, but no longer has anything to do with the current Akonadi) is the backend used by Kube. At this moment Sink is not mature enough and lacks the capabilities and features we need in order to be viable as a replacement for Akonadi. I personally like the concept and some of the ideas behind Sink and I will try to get some of them into Akonadi and I hope that in the future we will be able to co-operate with Sink more closely.

## Search is broken/useless

I was honestly surprised with the amount of complaints about the search feature of KMail - generally it boils down to searching not being reliable and returning wrong or no results. I took a good look into our indexing and searching code and indeed found numerous issues with the way we index data and query them. I already [created a plan](https://phabricator.kde.org/T7014) how to solve this and make search fast, reliable and giving more precise results. The work on this is already under way, the fixes to actual indexing and searching code will be available in the December release, with more high-level fixes (indexing speed, better search UI, result presentation etc.) coming next year.

## Account management

This issue has been on our radar for some time now and it's good to know that it's something you want us to target and fix as well. Adding a new email account to KMail is super hard, you have to basically do three things - create the incoming email account, create an outgoing email account, create the identity, and then you need to re-visit each of the accounts to configure them. We have the Account Wizard (Settings -> Add account..., or Tools -> Account Wizard in older KMail versions) which simplifies adding new accounts, but it's not fully there yet and adjusting a configuration later on is still a painful experience spread across three different dialogs and many mouse clicks.

I took a look at what Thunderbird and Evolution do, and I also looked at K9, an opensource email client for Android, which is very close to KMail in the terms of account configurability (different identities per account, different outgoing accounts per identity etc.) and how their UI works. All in all, we have a lot of inspiration and examples to follow and build on, and we will work with the KDE VDG and our UX experts to overhaul the account management in KMail, making it much smoother and nicer experience.

## Feature Discoverability

KMail has myriads of features, but many of them are well hidden from our users, almost as if we did not want anyone to use them. I've often seen comments like "It would be nice if KMail could do X" or "Until this survey, I did not even know KMail could do Y". So, we need to fix that too. There are several ways how to do that, I think the best one is a combination of all: we need to improve our UI and make features easily discoverable and ready at hand so that they are easy to use. Secondly, we need to bring our documentation up to date. Couple years ago Scarlett did a great job at updating our documentation, but there's still so much that is not covered. Finally, we need a good and easily accessible feature overview, ideally on a web page or wiki. We would welcome any help with writing and updating the documentation - this does not require any programming skills, just some free time and will to help :-) Get in touch with us on the kde-pim@kde.org mailing list!

More coming soon in part 2...

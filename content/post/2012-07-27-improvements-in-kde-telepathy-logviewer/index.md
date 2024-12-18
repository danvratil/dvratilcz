---
categories:
- KDE
- Telepathy
date: "2012-07-27T11:39:05Z"
tags:
- KDE
- logviewer
- Telepathy
title: Improvements in KDE Telepathy LogViewer
---
On Akademy I made a few patches for KDE Telepathy text-ui and logviewer. I continued even after Akademy, and David though it would be a good idea to make a maintainer of the KDE Telepathy LogViewer (thank you David! :) ). As a new maintainer I decided to kill all bugs, implement all feature requests and add a few of my own improvements to make the LogViewer rock.

So let's see how the LogViewer will look like in KTp 0.5 :-)

## Nicknames and Accounts

The logviewer tries to retrieve real names (or nicknames) of the contacts, so that you can easily identify the person (and you don't have to remember who john123456789@gmail.com is). Unfortunately the names can be obtained only when you are online. When you account is disconnected, you will just see the ugly usernames. Also the list was converted into a tree, where contacts are grouped by your accounts.  You can filter the contacts either by their username of display name, too.

Plan is to have the same (similar) view as in Contact List (with fancy look and avatars).

## Navigating between Conversations

{{< figure src="images/conversation_navigation.png" alt="Links for easy navigation between conversations" class="center" >}}

Usually you only remember the contact in whose logs to read, but you don't remember whether you should be looking to logs from yesterday, the day before or last week. Searching for valid dates in the date picker is not always comfortable. So logviewer now automatically inserts a links to previous and next  conversations to the beginning and end of each log to make jumping between them easier.

## Global Search

{{< figure src="images/global-search.png" alt="Global search in action" class="center" >}}

If your memory is as bad as mine, you usually just remember a single word or term, but you have no idea who and when sent you it. Then use global search! The contacts view is filtered to contain only contacts that have at least one conversation with matching terms. Only matching conversations are displayed in the date picker and the searched term is highlighted in the message view so that you can spot it more easily.

## Future?

I have some cool plans for future, some of them will make it to 0.5, some will have to wait. Here's what you can be looking forward to:

- file transfer logging - Alin suggested that file transfers are part of conversation history and thus information about it should be stored in the logs as well., including link to the downloaded file. I agree and if I find out how to do it, I'll add it to the logviewer :-)
- better date picker - searching for conversation dates in the date picker can be quite painful if you don't remember the exact date or when you chat with some person only rarely, so I'd like to introduce some better UI for listing past conversations (maybe just a list of dates...)
- that's all I can remember right now, but there will be more. I  have some ideas for the text-ui as well, so stay tuned ;-)

Do you have any ideas, suggestions, bug reports? [Express your wishes in Bugzilla](https://bugs.kde.org/enter_bug.cgi?product=telepathy&format=guided&component=log-viewer)!

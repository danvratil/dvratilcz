---
categories:
- KDE
date: "2011-11-25T00:36:04Z"
tags:
- Akonadi
- Google
- KDE
- PIM
params:
  thumbnail: thumbnails/akonadi-g-logo.png
title: 'Akonadi Google Resource: what''s comming?'
---
It's been a while since my last blog about the Akonadi Google resources and since my last contribution to the project (except for a few minor bug fixes lately). Today I decided to change it (at least the former) and show you that the project is still active (I just don't have much time to work on it) and reveal to you what big changes I plan to do in the near future.

There are two questions people are often asking me: if it is possible to support multiple Google accounts and why are calendars and tasks split to two resources. If you are one of those people, I have good news for you: next release will support multiple Google accounts and the Tasks resource will be merged to the Calendars resource.

Because words are plain, I will rather show you some pictures of how I imagine the resources could look like.

{{< figure src="images/calendar_preferences.png" class="alignleft" >}}
{{< figure src="images/calendar_editor.png" class="alignleft" >}}
{{< figure src="images/calendar_korganizer.png" class="alignleft" >}}

The first image is the new preferences dialog for Calendar resource. In the first list, there will be list of all accounts. The list will be common for all resources, so you will see the same accounts in the Contacts resource as well. Below is the list of calendars for the selected account (the list will auto-update itself when you choose another account + there will be something like "Reload" button to update the list by hand) with possibility to create, modify or remove existing calendars not just from Akonadi, but from Google server as well. The last list view is for task lists.

The second image shows how the calendar editor could look like. The are two things I want to change yet: replacing the wide color combo box by a single button which will popup another dialog with list of colors to pick from (according to docs Google supports only limited set of colors for calendars) and I'd like to have the timezone list displayed as a combobox instead of a tree view. The editor for task lists will look similar.

Regarding editor of accounts, clicking on "Create" will simply display the Google login page, same as it does now when you click on "Authenticate" in the resource preferences dialog. Given second thought, the "Edit" button does not make much sense since you can't change anything (maybe just the name of the account), "Remove" will just revoke the authentication.

And finally, on the last image you can see how the list of calendars in KOrganizer could look like. Each account would have sublist of calendars and tasks lists. The image is very inaccurate (copy&paste in Gimp :)), only calendars you have selected in the "Calendars" list in the preferences dialog will be displayed in the list and there will be task lists displayed as well (again, only the task lists you choose in the preferences dialog).

So, do you like it? :) I don't have much time now and collage exams are closing in, but I hope to find some time during Christmas and as I know myself I will be hacking this new features all January instead of learning for the exams :)

And just to list some improvements since last time: we now support categories for calendar events, information about contact group membership is synchronized (you can't yet move contacts between Google's contact lists, but at least the resource does not automatically remove your contacts from the lists) and some issues with timezones and daylight saving were fixed.

And finally (I almost forgot about this) some more good news, especially for Fedora users: I've created a project in OpenSUSE Build Service, so you can add a repository to `yum` to have access to fresh Akonadi Google resources :) I'm will rebuild the packages after every important git commit, so you will be still up-to-date.

Fedora 16:
http://download.opensuse.org/repositories/home:/progdan/Fedora_16/

Fedora 15:
http://download.opensuse.org/repositories/home:/progdan/Fedora_15/

The project itself is available here:
[https://build.opensuse.org/package/show?package=akonadi-google&project=home:progdan](https://build.opensuse.org/package/show?package=akonadi-google&project=home:progdan)

Fell free to modify the .spec file to support other distributions as well, I don't have much skills in packaging .specs for anything else but Fedora :)

And if you just want to build the project from sources, you can get them from akonadi-google repo in KDE git:
`git clone git://anongit.kde.org/akonadi-google`

Cheers,

Dan

**UPDATE:**  In OpenSUSE, you can find snapshots in the KDE:Unstable:Playground repository:
[https://build.opensuse.org/package/show?package=akonadi-google&project=KDE:Unstable:Playground](https://build.opensuse.org/package/show?package=akonadi-google&project=KDE:Unstable:Playground)

---
layout: post
title: 'Git trick #628: automatically set commit author based on repo URL'
date: 2015-12-06 21:45:56 +01:00
categories:
- Fedora
- KDE
- Random Blurb
tags:
- Fedora
- git
- identity
- KDE
---
If you have more than one email identity that you use to commit to different projects you have to remember to change it in `.git/config` every time you git clone a new repository. I suck at remembering things and it's been annoying me for a long time that I kept pushing commits with wrong email addresses to wrong repositories.

I can't believe I am the only one having this problem, but I could not find anything on the interwebs so I just fixed it myself and I'm posting it here so that maybe hopefuly someone else will find it useful too :).

The trick is very simple: we create a `post-checkout` hook that will check the value of `user.email` in `.git/config `and set it to whatever we want based on URL of the "origin" remote.  Why `post-checkout`? Because there's no `post-clone` hook, but git automatically checkouts master after clone so the hook gets executed. It also gets executed every time you run `git checkout` by hand but the overhead is minimal and we have a guard against overwriting the identity in case it's already set.

```python
#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# (C) 2015 Daniel Vrátil &lt;dvratil@kde.org&gt;
# License: GPL
#
# Requires: Python 2 or 3 and compatible GitPython
#
# https://github.com/gitpython-developers/GitPython
import git
import ConfigParser
import os
import sys

repo = git.Repo(os.getcwd())

# Don't do anything if an identity is already configured in this
# repo's .git/config
config = repo.config_reader(config_level = 'repository')
try:
    # The value of user.email is non-empty, stop here
    if config.get_value('user', 'email'):
        sys.exit(0)
except (ConfigParser.NoSectionError, ConfigParser.NoOptionError):
    # Section or option does not exist, continue
    pass
origin = repo.remote('origin')
if not origin:
    print('** Failed to detect remote origin, identity not updated! **')
    sys.exit(0)
# This is where you adjust the code to fit your needs
if 'kde.org' in origin.url or origin.url.startswith('kde:'):
    email = 'dvratil@kde.org'
elif 'fedoraproject.org' in origin.url:
    email = 'dvratil@fedoraproject.org'
elif 'kdab.com' in origin.url:
    email = 'daniel.vratil@kdab.com'
else:
    print('** Failed to detect identity! **')
    sys.exit(0)
# Write the option to .git/config
config = repo.config_writer()
config.set_value('user', 'email', email)
config.release()
print('** User identity for this repository set to \'%s\' **' % email)
```

To install it, just copy the script above to `~/.git-templates/hooks/post-checkout`, make it executable and run

    git config --global init.templatedir ~/.git-templates

All hooks from templatedir are automatically copied into `.git/hooks` when a new repository is created (`git init` or `git clone`) - this way the hook will get automatically deployed to every new repo.

And here's a proof that it works :-)

```shell
[dvratil@Odin ~/devel/KDE]
$ git clone kde:kasync
Cloning into 'kasync'...
remote: Counting objects: 450, done.
remote: Compressing objects: 100% (173/173), done.
remote: Total 450 (delta 285), reused 431 (delta 273)
Receiving objects: 100% (450/450), 116.44 KiB | 0 bytes/s, done.
Resolving deltas: 100% (285/285), done.
Checking connectivity... done.
** User identity for this repository set to 'dvratil@kde.org' **

[dvratil@Odin ~/packaging/fedpkg]
$ git clone ssh://dvratil@pkgs.fedoraproject.org/gammaray
Cloning into 'gammaray'...
remote: Counting objects: 287, done.
remote: Compressing objects: 100% (286/286), done.
remote: Total 287 (delta 113), reused 0 (delta 0)
Receiving objects: 100% (287/287), 57.24 KiB | 0 bytes/s, done.
Resolving deltas: 100% (113/113), done.
Checking connectivity... done.
** User identity for this repository set to 'dvratil@fedoraproject.org' **
```

**Update 1:** added utf-8 coding (thanks, Andrea)
**Update 2:** changed shebang to more common `/usr/bin/python` (`/bin/python` is rather Fedora-specific), added "Requires" comment to top of the script (thanks, Derek)

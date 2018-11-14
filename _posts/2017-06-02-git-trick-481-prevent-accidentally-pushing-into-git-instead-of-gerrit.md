---
layout: post
title: 'Git trick #481: Prevent accidentally pushing into git instead of Gerrit'
date: 2017-06-02 23:25:49 +02:00
categories:
- Fedora
- KDE
- Random Blurb
tags:
- "."
- Fedora
- gerrit
- git
- hook
- KDE
- push
---
Some while ago I wrote about a little [git hook that automatically sets up your commit author identity][1]  after `git clone` based on the remote origin address. Recently I learned that in git 2.8 a new pre-push hook was introduced, and I immediately knew it will fix my second biggest pain point: accidentally pushing directly into git instead of Gerrit.

If you often switch between different projects where some use Gerrit for code review and some don't, it's very easy to just mistakenly do

    git push master

when in fact you wanted to

    git push HEAD:refs/for/master

There are some tricks how to make it harder for you to accidentally do this, like creating a "gpush" alias that pushes to `refs/for/master` and disabling pushing into the 'origin' remote by changing the push URL to something invalid. That, however, is not perfect because there are still ways how to by-pass it. And it becomes complicated if you use more than one remote and it's clumsy if you sometimes *do* want to push directly into git (for example to submit a large patch series).

With a custom pre-push hook, we can check if the remote that we are pushing into is a Gerrit instance and then check if the remote ref that we are pushing into is a "Gerrit ref" (`refs/for/foo`) instead of a regular branch and we can have a nice "Are you sure you want to do this?" prompt:

```python
#!/usr/bin/python3
# -*- coding: utf-8 -*-
#
# (C) 2017 Daniel Vrátil &lt;dvratil@kde.org&gt;
# License: GPL

import os
import sys

def remoteIsGerrit(remoteName, remoteUrl):
    # if the remote is called &quot;gerrit&quot;, assume it's Gerrit
    if 'gerrit' in remoteName:
        return True
    # if the remote URL contains the default Gerrit port, assume it's Gerrit
    if ':29418/' in remoteUrl:
        return True

    # TODO: Add custom checks to match your non-standard Gerrit configuration
    return False
def main():
    # name and URL of the remote we are pushing into is passed as arguments
    if not remoteIsGerrit(sys.argv[1], sys.argv[2]):
        # If we are not pushing into gerrit, then simply allow the push
        return
    # The pushed refs are passed in via stdin
    for line in sys.stdin:
        # line = &quot;localRef localRev remoteRef remoteRev&quot;
        remoteRef = line.split(' ')[2]
        # Check if the remoteRef contains the typical Gerrit 'refs/for/foo'.
        if not remoteRef.startswith('refs/for/'):
            print('!!')
            print('!! You are pushing directly into git instead of Gerrit !!')
            print('!! Do you want to continue? [y/N] ', end = '', flush = True)
            if open('/dev/tty', 'rb').readline().decode().strip().lower() == 'y':
                return
            else:
                sys.exit(1)

if __name__ == &quot;__main__&quot;:
    main()
```

Save this a file as "`pre-push`" and move it into `.git/hooks/` folder in your local repository clone. Remember to make the script executable.

Here is how it works: trying to push into "gerrit" remote to branch "5.9" directly gets intercepted by our new hook and if you press 'n' the push gets aborted. If I would've pressed 'y', then the push would proceed.

```shell
$ git push gerrit 5.9
Enter passphrase for key '/home/dvratil/.ssh/id_rsa.qt':  
!! 
!! You are pushing directly into git instead of Gerrit !! 
!! Do you want to continue? [y/N] n
error: failed to push some refs to 'ssh://dvratil@codereview.qt-project.org:29418/qt/qtbase.git'</pre>
<p>Now when we try to push to the correct ref (`refs/for/5.9`) the hook accepts the push without any complaints:</p>
<pre>$ git push gerrit HEAD:refs/for/5.9
Counting objects: 6, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 407 bytes, done.
Total 4 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2)
remote: Processing changes: new: 1, refs: 1, done    
remote: 
remote: New Changes:
remote:   https://codereview.qt-project.org/......
remote: 
To ssh://dvratil@codereview.qt-project.org:29418/qt/qtbase
 * [new branch] HEAD -&gt; refs/for/5.9
 ```

To have the hook automatically copied into every new repository that you clone, save it as "`pre-push`" into `.git-templates/hooks/` and run the following command:

    git config --global init.templatedir ~/.git-templates

Git will automatically copy everything from the 'templatedir' into the .git directory after every new `git clone`, so you don't need to bother with doing that manually. Unfortunately for all your existing checkouts, you have to copy the hook manually

[1] {% post_url 2015-12-06-git-trick-628-automatically-set-commit-author-based-on-repo-url %}
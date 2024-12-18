---
categories:
- Gnome
date: "2012-06-01T18:06:10Z"
tags:
- Evolution
- Gnome
- Webkit
title: Evolution gets a new e-mail formatter
---
While [porting  Evolution to WebKit]({{< ref 2012-03-28-evolution-meets-webkit.md >}}), I have made some major changes in how formatting emails in Evo works. But lately I've been more and more aware, that it's not flexible enough and that there is a lot of space for improvement.

With Milan Crha we designed a proper, object-oriented (within the limits of C and GLib) parser and formatter. They are now both very flexible, easily extensible and displaying e-mails is a bit faster thanks to more asynchronous approach.

{{< figure src="images/evo-patch-formatting-150x150.png" link="images/evo-patch-formatting.png" alt="Example of automated part formatting" >}}

The main feature that comes out of this redesign is an extension we call text-highlighter. It uses the [highlight](http://www.andre-simon.de/zip/download.html) utility to format text parts. For now we only highlight diffs and patches, but the list can easily be extended by all formats supported by `highlight`.

But we intend to go a bit further. We want to allow users to choose how each part should be formatted! The popup menu on each part of the email will contain a list of available (and compatible) formatters. Selecting one will reload the given part (each parts is in an &lt;iframe>) and render it again using specified formatter.

{{< figure src="images/evo-formatting-1-150x150.png" link="images/evo-patch-formatting-1.png" alt="Example of the context menu with available formats" >}}
{{< figure src="images/evo-formatting-2-150x150.png" link="images/evo-patch-formatting-2.png" alt="Evolution will format the part using selected formatter" >}}

As far as I can tell this is a quite unique feature among e-mail clients  and hopefully it will make lives of our users a bit easier :). This particular feature is not in place yet, but it will included in Evolution 3.6.

Now I'll spend a week or so by fixing regressions that we missed during testing (quite thorough, as always when Milan tests someting :D ) and that will appear when more people start using it, After that I'll finally move over to porting the message composer to WebKit.

Stay tuned ;)

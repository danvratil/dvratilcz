---
categories:
- Gnome
date: "2012-03-28T18:24:46Z"
tags:
- Evolution
- Gnome
- WebKit
title: Evolution meets WebKit
---
Evolution is the default email client, address book and calendar application in GNOME. It has large variety of features, including support for Microsoft Exchange and Google services. But it's weak spot for some time now has been a poor email renderer. Evolution is using GtkHtml, which cannot compare to today modern HTML renderers.

And so, eight months ago, after working on Evolution for about 5 months, I took the webkit branch after Matthew Barnes and begun to dig into depths of Evolution's email formatter, parser and renderer and started porting it to [WebKit](http://en.wikipedia.org/wiki/WebKit). Today all the work has been merged to the main branch and Evolution made it's first step towards leaving GtkHtml behind.

So what's new? Many things! Thanks to GObject introspection in DOM bindings we can modify the rendered emails on the fly without parsing and rendering the entire email again. This makes expanding and collapsing headers and attachments previews much faster, smoother and improves the overall user experience.

Another benefit for users is full support of [CSS](http://en.wikipedia.org/wiki/Cascading_Style_Sheets). While GtkHtml does not support any styles, WebKit does. This means that various newsletters and flyers are rendered correctly and with all the details. WebKit has also first-class JavaScript support, but don't be afraid. Scripts were disabled so that your emails and comfort are safe.

The invitation preview plugin has been rewritten to be completely in HTML, so it's much easier to copy text from it, while all it's functionality remains preserved (using DOM bindings again). It also makes it possible to print the invitations and events previews.

When I was rewriting the formatter, I have also looked on printing. Print-outs now look fresher, are better formatted and the content is better structured. I have also added a brand new feature, which allows you to select which email headers and in which order should printed. This option is available directly in the printing dialog, in "Headers" tab.

{{< figure src="/images/evo_print_gtkhtml.png" title="Printout from Evolution 3.2" class="leftalign" >}}
{{< figure src="/images/evo_print_webkit.png" title="Printout from WebKit-based Evolution" class="leftalign" >}}
{{< figure src="/images/evo_print_headers_dlg.png" title="Preview of headers configuration in printing dialog" class="leftalign" >}}

The port is ready for daily use, but there might still be bugs hiding at various places. Therefore the changes we merged so early after 3.4.0 release, so that we have enough time before 3.5.1 to catch them all and at least 6 months until 3.6 stable release to make sure that everything is perfectly in place.

And what's going to happen next? I will now start porting the email composer to WebKit. If things go well and smoothly, I might make it to have it in Evolution 3.6 this Autumn and thus getting rid of GtkHtml once and for all.

Bye!

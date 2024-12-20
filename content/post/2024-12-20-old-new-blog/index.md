---
categories:
- Random Blurbs
date: '2024-12-20 16:55:18 +0100'
tags:
- KDE
- blog
- Hugo
- Jekyll
title: 'Old New Blog'
#comments:
#    host: fosstodon.org
#    username: danvratil
#    id: 113676304131537877
---

I started this blog back in 2010. Back then I used Wordpress and it worked reasonably well. In 2018 I decided to switch to a static generated site, mostly because the Wordpress blog felt slow to load and it was hassle to maintain. Back then the go-to static site generator was Jekyll, so I went with that. Lately I've been struggling with it though, because in order to keep all the plugins working, I needed to use older versions or Ruby, which meant I had to use Docker to build the blog locally. Overall, it felt like too much work and for the past few years I've been eyeing Hugo - more so since Carl and others migrated most of KDE websites to it. I mean, if it's good enough for KDE, it's good enough for me, right?

So this year I finally got around to do the switch. I migrated all the content from Jekyll. This time I actually went through every single post, converted it to proper Markdown, fixed formatting, images etc. It was a nice trip down the memory lane, reading all the old posts, remembering all the sprints and Akademies... I also took the opportunity to clean up the tags and categories, so that they are more consistent and useful.

Finally, I have rewritten the theme - I originally ported the template from Wordpress to Jekyll, but it was a bit of a mess, responsivity was "hacked" in via JavaScript. Web development (and my skills) has come a long way since then, so I was able to leverage more modern CSS and HTML features to make the site look the same, but be more responsive and accessible.

## Comments

When I switched from Wordpress to Jekyll, I was looking for a way to preserve comments. I found [Isso][isso], which is basically a small CGI server backed with SQLite that you can run on the server and embed it into your static website through JavaScript. It could also natively import comments from Wordpress, so that's the main reason why I went with it, I think. Isso was not perfect (although the development has picked up again in the past few years) and it kept breaking for me. I think it haven't worked for the past few years on my blog and I just couldn't be bothered to fix it. So, I decided to ditch it in favor of another solution...

I wanted to keep the comments for old posts by generating them as static HTML from the Isso's SQLite database, alas the database file was empty. Looks like I lost all comments at some point in 2022. It sucks, but I guess it's not the end of the world. Due to the nature of how Isso worked, not even the Wayback Machine was able to archive the comments, so I guess they are lost forever...

For this new blog, I decided to use Carl's approach with [embedding replies to a Mastodon][carl-mastodon-comments]. I think it's a neat idea and it's probably the most reliable solution for comments on a static blog (that I don't have to pay for, host myself or deal with privacy concerns or advertising).

I have some more ideas regarding the comments system, but that's for another post ;-) Hopefully I'll get to blog more often now that I have a shiny new blog!

## Happy Holidays 🎄

Enjoy the holidays and see you in 2025 🥳!


[isso]: https://isso-comments.de/
[carl-mastodon-comments]: https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/ "Carl Schwan - Adding comments to your static blog with Mastodon"
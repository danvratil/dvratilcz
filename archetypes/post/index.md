---
categories:
-
date: '{{ time.Now |  time.Format "2006-01-02 15:04:05 -0700" }}'
tags:
-
{{ $new_title := replaceRE "([0-9]{4}-[0-9]{2}-[0-9]{2}-)(.*)" "${2}" .File.ContentBaseName }}
title: '{{ replace $new_title `-` ` ` | title }}'
#comments:
#    host: fosstodon.org
#    username: danvratil
#    id: 113676304131537877
---

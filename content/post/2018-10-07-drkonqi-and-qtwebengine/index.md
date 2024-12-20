---
categories:
- KDE
date: "2018-10-07T16:23:20Z"
tags:
- KDE
- c++
- PIM
- Qt
title: DrKonqi and QtWebEngine
---
Here’s a little tip how to get DrKonqi, the KDE crash handler to work in applications that use QtWebEngine.

If your application uses QtWebEngine, you probably noticed that DrKonqi doesn’t pop up when the program crashes. This is because QtWebEngine installs its own crash handler, overriding the one DrKonqi has set up.

The workaround is quite simple but is not trivial to find because all of it is undocumented (and not everyone wants to dig into Chromium code…). The trick is to add `--disable-in-process-stack-traces` to `QTWEBENGINE_CHROMIUM_FLAGS` environment variable before initializing QtWebEngine:

```cpp
const auto chromiumFlags = qgetenv("QTWEBENGINE_CHROMIUM_FLAGS");
if (!chromiumFlags.contains("disable-in-process-stack-traces")) {
    qputenv("QTWEBENGINE_CHROMIUM_FLAGS", chromiumFlags + " --disable-in-process-stack-traces");
}
...
auto view = new QtWebEngineView(this);
...
```

[Here’s a full example](https://phabricator.kde.org/D16004) of how we fixed this in Kontact

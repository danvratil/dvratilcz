---
categories:
- QCoro
date: "2021-09-08T14:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.2.0 Release Announcement
---

Just about a month after the first official release of QCoro, a library that provides C++ coroutine support for Qt,
here's 0.2.0 with some big changes. While the API is backwards compatible, users updating from 0.1.0 will have
to adjust their `#include` statements when including QCoro headers.

QCoro 0.2.0 brings the following changes:

## Library modularity

The code has been reorganized into three modules (and thus three standalone libraries): QCoroCore, QCoroDBus and
QCoroNetwork. QCoroCore contains the elementary QCoro tools (`QCoro::Task`, `qCoro()` wrapper etc.) and coroutine
support for some QtCore types. The QCoroDBus module contains coroutine support for types from the QtDBus module
and equally the QCoroNetwork module contains coroutine support for types from the QtNetwork module. The latter two
modules are also optional, the library can be built without them. It also means that an application that only uses
let's say QtNetwork and has no DBus dependency will no longer get QtDBus pulled in through QCoro, as long as it
only links against `libQCoroCore` and `libQCoroNetwork`. The reorganization will also allow for future
support of additional Qt modules.

## Headers clean up

The include headers in QCoro we a bit of a mess and in 0.2.0 they all got a unified form. All public header files
now start with `qcoro` (e.g. `qcorotimer.h`, `qcoronetworkreply.h` etc.), and QCoro also provides CamelCase headers
now. Thus users should simply do `#include <QCoroTimer>` if they want coroutine support for `QTimer`.

The reorganization of headers makes QCoro 0.2.0 incompatible with previous versions and any users of QCoro will
have to update their `#include` statements. I'm sorry about this extra hassle, but with this brings much needed
sanity into the header organization and naming scheme.

## Docs update

The documentation has been updated to reflect the reorganization as well as some internal changes. It should be
easier to understand now and hopefully will make it easier for users to start with QCoro now.

## Internal API cleanup and code de-duplication

Historically, certain types types which can be directly `co_await`ed with QCoro, for instance `QTimer` has their
coroutine support implemented differently than types that have multiple asynchronous operations and thus have
a coroutine-friendly wrapper classes (like `QIODevice` and it's `QCoroIODevice` wrapper). In 0.2.0 I have unified
the code so that even the coroutine support for simple types like `QTimer` are implemented through wrapper classes
(so there's `QCoroTimer` now)

<hr>

## Download

You can download QCoro 0.2.0 [here][qcoro-release] or check the latest sources on [QCoro GitHub][qcoro-github].

## More About QCoro

If you are interested in learning more about QCoro, go read the [documentation][qcoro-docs], look at the
[first release announcement][dvratil-010-announcement], which contains a nice explanation and example or
watch [recording of my talk about C++20 coroutines and QCoro][qcoro-youtube] this years' Akademy.

[qcoro-release]: https://github.com/danvratil/qcoro/releases/tag/v0.2.0
[qcoro-github]: https://github.com/danvratil/qcoro
[qcoro-youtube]: https://www.youtube.com/watch?v=KKVqFqbXJaU&list=PLsHpGlwPdtMq6pJ4mqBeYNWOanjdIIPTJ&index=20
[qcoro-docs]: https://qcoro.dvratil.cz/
[dvratil-010-announcement]: https://www.dvratil.cz/2021/08/first-qcoro-release

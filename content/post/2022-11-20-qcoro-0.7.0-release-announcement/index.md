---
categories:
- QCoro
date: "2022-11-20T23:52:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.7.0 Release Announcement
---

<!--
SPDX-FileCopyrightText: 2022 Daniel Vrátil <dvratil@kde.org>

SPDX-License-Identifier: GFDL-1.3-or-later
-->

The major new feature in this release is initial QML support, contributed by
Jonah Brüchert. Jonah also contributed `QObject::connect` helper and
a coroutine version of QQuickImageProvider. As always, this release includes
some smaller enhancements and bugfixes, you can find a full list of them
on the Github release page.

As always, big thank you to everyone who report issues and contributed to QCoro.
Your help is much appreciated!

## Initial QML Support

Jonah Brüchert has contributed initial support for QML. Unfortunately, we
cannot extend the QML engine to support the `async` and `await` keywords from
ES8, but we can make it possible to set a callback from QML that should be
called when the coroutine finishes.

The problem with `QCoro::Task` is that it is a template class so it cannot be
registered into the QML type system and used from inside QML. The solution
that Jonach has come up with is to introduce `QCoro::QmlTask` class, which
can wrap any awaitable (be it `QCoro::Task` or any generic awaitable type)
and provides a `then()` method that can be called from QML and that takes
a JavaScript function as its only argument. The function will be invoked by
`QCoro::QmlTask` when the wrapped awaitable has finished.

The disadvantage of this approach is that in order to expose a class that
uses `QCoro::Task<T>` as return types of its member functions into QML, we
need to create a wrapper class that converts those return types to 
`QCoro::QmlTask`.

Luckily, we should be able to provide a smoother user experience when using
QCoro in QML for Qt6 in a future QCoro release.

```cpp
class QmlCoroTimer: public QObject {
    Q_OBJECT
public:
    explicit QmlCoroTimer(QObject *parent = nullptr)
        : QObject(parent)
    {}

    Q_INVOCABLE QCoro::QmlTask start(int milliseconds) {
        // Implicitly wraps QCoro::Task<> into QCoro::QmlTask
        return waitFor(milliseconds);
    }

private:
    // A simple coroutine that co_awaits a timer timeout
    QCoro::Task<> waitFor(int milliseconds) {
        QTimer timer;
        timer.start(milliseconds);
        co_await timer;
    }
};

...
QCoro::Qml::registerTypes();
qmlRegisterType<QmlCoroTimer>("cz.dvratil.qcoro.example", 0, 1);
```

```qml
import cz.dvratil.qcoro.example 1.0

Item {

    QmlCoroTimer {
        id: timer
    }

    Component.onCompleted: () {
        // Attaches a callback to be called when the QmlCoroTimer::waitFor()
        // coroutine finishes.
        timer.start(1000).then(() => {
            console.log("1 second elapsed!");
        });
    }
}
```

Read the [documentation for `QCoro::QmlTask`](https://qcoro.dvratil.cz/reference/qml/qmltask) for more details.


## QCoro::connect Helper

The `QCoro::connect()` helper is similar to `QObject::connect()` - except you
you pass in a `QCoro::Task<T>` instead of a sender and signal pointers. While
using the `.then()` continuation can achieve similar results, the main 
difference is that `QCoro::connect()` takes a pointer to a context (receiver)
QObject. If the receiver is destroyed before the connected `QCoro::Task<T>`
finishes, the slot is not invoked.

```cpp
void MyClass::buttonClicked() {
    QCoro::Task<QByteArray> task = sendNetworkRequest();
    // If this object is deleted before the `task` completes,
    // the slot is not invoked.
    QCoro::connect(std::move(task), this, &handleNetworkReply);
}
```

See the [QCoro documentation](https://qcoro.dvratil.cz/reference/coro/task/#interfacing-with-synchronous-functions) for more details.


## Full changelog

[See changelog on Github](https://github.com/danvratil/qcoro/releases/tag/v0.7.0)

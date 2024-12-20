---
categories:
- QCoro
date: "2021-08-16T10:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: Initial release of QCoro
---

I'm happy to announce first release of QCoro, a library that provides C++ coroutine support for Qt.

You can download QCoro 0.1.0 [here][qcoro-release] or check the latest sources on [QCoro GitHub][qcoro-github].

I have talked about QCoro (and C++ coroutines in general) recently at KDE Akademy, you can view the
[recording of my talk on YouTube][qcoro-youtube].

In general, QCoro provides coroutine support for various asynchronous operations provided by Qt. Since
Qt doesn't support coroutines by default, QCoro provides the necessary "glue" between native Qt types
and the C++ coroutine machinery, making it possible to use Qt types with coroutines easily.

QCoro provides coroutine support for asynchronous operations of `QIODevice`, `QNetworkReply`, `QProcess`,
`QDBusPendingReply`, `QTimer` and more. Take a look at the documentation for detailed description and list
of all currently supported Qt types.

A brief example from [our documentation][qcoro-docs] that demonstrates how using coroutines makes handling asynchronous
operations in Qt simpler:

This is a (simplified) example of how we do network requests with Qt normally, using signals and slots:
```cpp
QNetworkAccessManager *manager = new QNetworkAccessManager(this);
QNetworkReply *reply = manager->get(url);
connect(reply, &QNetworkReply::finished, this,
        [this, reply]() {
            const auto data = reply->readAll();
            doSomethingWithData(data);
            reply->deleteLater();
        });
```

And this is the same code, written using C++ coroutines:
```cpp
QNetworkAccessManager networkAccessManager;
QNetworkReply *reply = co_await networkAccessManager.get(url);
const auto data = reply->readAll();
doSomethingWithData(data);
reply->deleteLater();
```

The `co_await` keyword here is the key here: it asynchronously waits for the reply to finish. During the wait,
the execution returns to the caller, which could be the Qt event loop, which means that even if this code *looks*
synchronous, in fact it won't block the event loop while keeping the code simple to read and understand.


[qcoro-release]: https://github.com/danvratil/qcoro/releases/tag/v0.1.0
[qcoro-github]: https://github.com/danvratil/qcoro
[qcoro-youtube]: https://www.youtube.com/watch?v=KKVqFqbXJaU&list=PLsHpGlwPdtMq6pJ4mqBeYNWOanjdIIPTJ&index=20
[qcoro-docs]: https://qcoro.dvratil.cz/


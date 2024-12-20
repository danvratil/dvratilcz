---
categories:
- QCoro
date: "2022-07-09T15:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.6.0 Release Announcement
---

I'm pleased to announce release 0.6.0 of QCoro, a library that allows using C++20
coroutines with Qt. This release brings several major new features alongside a bunch
of bugfixes and improvements inside QCoro.

The four major features are:

* Generator support
* New QCoroWebSockets module
* Deprecated task.h
* Clang-cl and apple-clang support

🎉 Starting with 0.6.0 I no longer consider this library to be experimental
(since clearly the experiment worked :-)) and its API to be stable enough for
general use. 🎉

As always, big thank you to everyone who report issues and contributed to QCoro.
Your help is much appreciated!

### Generator support

Unlike regular functions (or `QCoro::Task<>`-based coroutines) which can only ever
produce at most single result (through `return` or `co_return` statement), generators
can yield results repeatedly without terminating. In QCoro we have two types of generators:
synchronous and asynchronous. Synchronous means that the generator produces each value
synchronously. In QCoro those are implemented as `QCoro::Generator<T>`:

```cpp
// A generator that produces a sequence of numbers from 0 to `end`.
QCoro::Generator<int> sequence(int end) {
    for (int i = 0; i <= end; ++i) {
        // Produces current value of `i` and suspends.
        co_yield i;
    }
    // End the iterator
}

int sumSequence(int end) {
    int sum = 0;
    // Loops over the returned Generator, resuming the generator on each iterator
    // so it can produce a value that we then consume.
    for (int value : sequence(end)) {
        sum += value;
    }
    return sum;
}
```

The `Generator` interface implements `begin()` and `end()` methods which produce an
iterator-like type. When the iterator is incremented, the generator is resumed to yield
a value and then suspended again. The iterator-like interface is not mandated by the C++
standard (the C++ standard provides no requirements for generators), but it is an
intentional design choice, since it makes it possible to use the generators with existing
language constructs as well as standard-library and Qt features.

You can find more details about synchronous generators in the [`QCoro::Generator<T>`
documentation](https://qcoro.dvratil.cz/reference/coro/generator/).

Asynchronous generators work in a similar way, but they produce value asynchronously,
that is the result of the generator must be `co_await`ed by the caller.

```cpp
QCoro::AsyncGenerator<QUrl> paginator(const QUrl &baseUrl) {
  QUrl pageUrl = baseUrl;
  Q_FOREVER {
    pageUrl = co_await getNextPage(pageUrl); // co_awaits next page URL
    if (pageUrl.isNull()) { // if empty, we reached the last page
      break; // leave the loop
    }
    co_yield pageUrl; // finally, yield the value and suspend
  }
  // end the generator
}

QCoro::AsyncGenerator<QString> pageReader(const QUrl &baseUrl) {
  // Create a new generator
  auto generator = paginator(baseUrl);
  // Wait for the first value
  auto it = co_await generator.begin();
  auto end = generator.end();
  while (it != end) { // while the `it` iterator is valid...
    // Asynchronously retrieve the page content
    const auto content = co_await fetchPageContent(*it);
    // Yield it to the caller, then suspend
    co_yield content;
    // When resumed, wait for the paginator generator to produce another value
    co_await ++it;
  }
}

QCoro::Task<> downloader(const QUrl &baseUrl) {
  int page = 1;
  // `QCORO_FOREACH` is like `Q_FOREACH` for asynchronous iterators
  QCORO_FOREACH(const QString &page, pageReader(baseUrl)) {
    // When value is finally produced, write it to a file
    QFile file(QStringLiteral("page%1.html").arg(page));
    file.open(QIODevice::WriteOnly);
    file.write(page);
    ++page;
  }
}
```

Async generators also have `begin()` and `end()` methods which provide an asynchronous
iterator-like types. For one, the `begin()` method itself is a coroutine and must be
`co_await`ed to obtain the initial iterator. The increment operation of the iterator
must then be `co_await`ed as well to obtain the iterator for the next value.
Unfortunately, asynchronous iterator cannot be used with ranged-based for loops, so
QCoro provides [`QCORO_FOREACH` macro](https://qcoro.dvratil.cz/reference/coro/asyncgenerator/#qcoro_foreach) to make using asynchronous generators simpler.

Read the [documentation for `QCoro::AsyncGenerator<T>`](https://qcoro.dvratil.cz/reference/coro/asyncgenerator) for more details.

### New QCoroWebSockets module

The QCoroWebSockets module provides QCoro wrappers for `QWebSocket` and `QWebSocketServer`
classes to make them usable with coroutines. Like the other modules, it's a standalone
shared or static library that you must explicitly link against in order to be able to use
it, so you don't have to worry that QCoro would pull websockets dependency into your
project if you don't want to.

```cpp
QCoro::Task<> ChatApp::handleNotifications(const QUrl &wsServer) {
  if (!co_await qCoro(mWebSocket).open(wsServer)) {
    qWarning() << "Failed to open websocket connection to" << wsServer << ":" << mWebSocket->errorString();
    co_return;
  }
  qDebug() << "Connected to" << wsServer;

  // Loops whenever a message is received until the socket is disconnected
  QCORO_FOREACH(const QString &rawMessage, qCoro(mWebSocket).textMessages()) {
    const auto message = parseMessage(rawMessage);
    switch (message.type) {
      case MessageType::ChatMessage:
        handleChatMessage(message);
        break;
      case MessageType::PresenceChange:
        handlePresenceChange(message);
        break;
      case MessageType::Invalid:
        qWarning() << "Received an invalid message:" << message.error;
        break;
    }
  }
}
```
The `textMessages()` methods returns an asynchronous generator, which yields the message
whenever it arrives. The messages are received and enqueued as long as the generator
object exists. The difference between using a generator and just `co_await`ing the next
emission of the `QWebSocket::textMessage()` signal is that the generator holds a connection
to the signal for its entire lifetime, so no signal emission is lost. If we were only
`co_await`ing a singal emission, any message that is received before we start `co_await`ing
again after handling the current message would be lost.

You can find more details about the `QCoroWebSocket` and `QCoroWebSocketSever`
in the [QCoro's websocket module documentation](https://qcoro.dvratil.cz/reference/websockets/).

You can build QCoro without the WebSockets module by passing `-DQCORO_WITH_QTWEBSOCKETS=OFF`
to CMake.

### Deprecated tasks.h header

The `task.h` header and it's camelcase variant `Task` been deprecated in QCoro 0.6.0
in favor of `qcorotask.h` (and `QCoroTask` camelcase version). The main reasons are to
avoid such a generic name in a library and to make the name consistent with the rest of
QCoro's public headers which all start with `qcoro` (or `QCoro`) prefix.

The old header is still present and fully functional, but including it will produce a
warning that you should port your code to use `qcorotask.h`. You can suppress the warning
by defining `QCORO_NO_WARN_DEPRECATED_TASK_H` in the compiler definitions:

CMake:
```cmake
add_compiler_definitions(QCORO_NO_WARN_DEPRECATED_TASK_H)
```

QMake
```qmake
DEFINES += QCORO_NO_WARN_DEPRECATED_TASK_H
```

The header file will be removed at some point in the future, at latest in the 1.0 release.

You can also pass `-DQCORO_DISABLE_DEPRECATED_TASK_H=ON` to CMake when compiling QCoro
to prevent it from installing the deprecated task.h header.

### Clang-cl and apple-clang support

The clang compiler is fully supported by QCoro since 0.4.0. This version of QCoro
intruduces supports for clang-cl and apple-clang.

Clang-cl is a compiler-driver that provides MSVC-compatible command line options,
allowing to use clang and LLVM as a drop-in replacement for the MSVC toolchain.

Apple-clang is the official build of clang provided by Apple on MacOS, which may be
different from the upstream clang releases.

### Full changelog

* Enable exceptions when compiling with clang-cl ([#90](https://github.com/danvratil/qcoro/issues/90), [#91](https://github.com/danvratil/qcoro/pull/91))
* Add option to generate code coverage report ([commit 0f0408c](https://github.com/danvratil/qcoro/commit/0f0408ce927e50450ab847cf290dd229b2a6e12c))
* Lower CMake requirement to 3.18.4 ([commit deb80c1](https://github.com/danvratil/qcoro/commit/deb80c13d9c9d866304fd5a64a33168adab34111))
* Add support for clang-cl ([#84](https://github.com/danvratil/qcoro/issues/84), [#86](https://github.com/danvratil/qcoro/pull/86))
* Avoid identifiers that begin with underscore and uppercase letter ([#83](https://github.com/danvratil/qcoro/pull/83))
* Add mising `<chrono>` include ([#82](https://github.com/danvratil/qcoro/pull/82))
* New module: QCoroWebSockets ([#75](https://github.com/danvratil/qcoro/pull/75), [#88](https://github.com/danvratil/qcoro/pull/88), [#89](https://github.com/danvratil/qcoro/pull/89))
* Add `QCoroFwd` header with forward-declarations of relevant types ([#71](https://github.com/danvratil/qcoro/issues/71))
* Deprecate `task.h` header file in favor of `qcorotask.h` ([#70](https://github.com/danvratil/qcoro/pull/70))
* Fix installing export headers ([#77](https://github.com/danvratil/qcoro/pull/77))
* Introduce support for generator coroutines ([#69](https://github.com/danvratil/qcoro/pulls/69))
* QCoro is now build with "modern Qt" compile definitions ([#66](https://github.com/danvratil/qcoro/pull/66))
* Export QCoro wrapper classes ([#63](https://github.com/danvratil/qcoro/issues/63), [#65](https://github.com/danvratil/qcoro/pull/65))
* Extended CI to include MSVC, apple-clang and multiple version of gcc and clang-cl ([#60](https://github.com/danvratil/qcoro/pull/60), [#61](https://github.com/danvratil/qcoro/pull/61))
* Fixed build with apple-clang

<hr>

## Download

You can download QCoro 0.6.0 [here][qcoro-release] or check the latest sources on [QCoro GitHub][qcoro-github].

## More About QCoro

If you are interested in learning more about QCoro, go read the [documentation][qcoro-docs], look at the
[first release announcement][dvratil-010-announcement], which contains a nice explanation and example or
watch [recording of my talk about C++20 coroutines and QCoro][qcoro-youtube] this years' Akademy.

[qcoro-release]: https://github.com/danvratil/qcoro/releases/tag/v0.6.0
[qcoro-github]: https://github.com/danvratil/qcoro
[qcoro-youtube]: https://www.youtube.com/watch?v=KKVqFqbXJaU&list=PLsHpGlwPdtMq6pJ4mqBeYNWOanjdIIPTJ&index=20
[qcoro-docs]: https://qcoro.dvratil.cz/
[dvratil-010-announcement]: https://www.dvratil.cz/2021/08/first-qcoro-release

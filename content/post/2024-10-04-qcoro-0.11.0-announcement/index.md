---
categories:
- QCoro
date: "2024-10-04T12:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.11.0 Release Announcement
comments:
    host: fosstodon.org
    username: danvratil
    id: 113676304131537877
---

<!--
SPDX-FileCopyrightText: 2024 Daniel Vrátil <dvratil@kde.org>

SPDX-License-Identifier: GFDL-1.3-or-later
-->

A long over-due release which has accumulated a bunch of bugfixes but also some
fancy new features...read on!

As always, big thanks to everyone who reported issues and contributed to QCoro.
Your help is much appreciated!

## `QCoro::LazyTask<T>`

The biggest new features in this release is the brand-new [`QCoro::LazyTask<T>`][qcoro-lazytask].
It's a new return type that you can use for your coroutines. It differs from `QCoro::Task<T>`
in that, as the name suggest, the coroutine is evaluated lazily. What that means is when
you call a coroutine that returns `LazyTask`, it will return imediately without executing
the body of the coroutine. The body will be executed only once you `co_await` on the returned
`LazyTask` object.

This is different from the behavior of `QCoro::Task<T>`, which is eager, meaning that it will
start executing the body immediately when called (like a regular function call).

```cpp
QCoro::LazyTask<int> myWorker()
{
    qDebug() << "Starting worker";
    co_return 42;
}

QCoro::Task<> mainCoroutine()
{
    qDebug() << "Creating worker";
    const auto task = myWorker();
    qDebug() << "Awaiting on worker";
    const auto result = co_await task;
    // do something with the result
}
```

This will result in the following output:

```plain
mainCoroutine(): Creating worker
mainCoroutine(): Awaiting on worker
myWorker(): Starting worker
```

If `myWorker()` were a `QCoro::Task<T>` as we know it, the output would look like this:

```plain
mainCoroutine(): Creating worker
myWorker(): Starting worker
mainCoroutine(): Awaiting on worker
```

The fact that  the body of a  `QCoro::LazyTask<T>` coroutine is only executed when `co_await`ed has one
very important implication: **it must not be used for Qt slots**, `Q_INVOKABLE`s or, in general, for any
coroutine that may be executed directly by the Qt event loop. The reason is, that the Qt event loop
is not aware of coroutines (or QCoro), so it will never `co_await` on the returned `QCoro::LazyTask`
object - which means that the code inside the coroutine would never get executed. This is the
reason why the good old `QCoro::Task<T>` is an eager coroutine - to ensure the body of the coroutine
gets executed even when called  from the Qt event loop and not `co_await`ed.

For more details, see the [documentation of `QCoro::LazyTask<T>`][qcoro-lazytask].

## Defined Semantics for Awaiting Default-Constructed and Moved-From Tasks

This is something that wasn't clearely defined until now (both in the docs and in the code), which is
what happens when you try to `co_await` on a default-constructed `QCoro::Task<T>` (or `QCoro::LazyTask<T>`):

```cpp
co_await QCoro::Task<>(); // will hang indefinitely!
```

Previously this would trigger a `Q_ASSERT` in debug build and most likely a crash in production build.
Starting with QCoro 0.11, awaiting such task will print a `qWarning()` and will hang indefinitely.

The same applies to awaiting a moved-from task, which is identical to a default-constructed task:

```cpp
QCoro::LazyTask<int> task = myTask();
handleTask(std::move(task));

co_await task; // will hang indefinitely!`
```

## Compiler Support

We have dropped official support for older compilers. Since QCoro 0.11, the officially supported compilers are:

* GCC >= 11
* Clang >= 15
* MSVC >= 19.40 (Visual Studio 17 2022)
* AppleClang >= 15 (Xcode 15.2)

QCoro might still compile or work with older versions of those compilers, but we no longer test it and
do not guarantee that it will work correctly.

The reason is that coroutine implementation in older versions of GCC and clang were buggy and behaved differently
than they do in newer versions, so making sure that QCoro behaves correctly across wide range of compilers was
getting more difficult as we implemented more and more complex and advanced features.

## Other Features and Changes

A coroutine-friendly version of [`QFuture::takeResult()`][qtdoc-qfuture-takeresult] is now available in the
form of [`QCoroFuture::takeResult()`][qcorofuture-takeresult] when building QCoro against Qt 6 ([#217][issue217]).

`QCoro::waitFor(QCoro::Task<T>)`  no longer requires that the task return type `T` is default-constructible ([#223][pr223], Joey Richey)

## Bugfixes

* Suppress Clang error when building against Android NDK <= 25 ([#204][issue204], Daniel Vrátil)
* Fixed missing QtGui dependency in QCoroQuick module ([#209][pr209], Andreas Sturmlechner)
* Fixed `QCoroIODevice::write()` always returning 0 instead of bytes written ([#211][issue211], Daniel Vrátil)
* Fixed unchecked `std::optional` access in `QCoroIODevice::write`
* Fixed awaiting on signal emission with `qCoro()` would resume the awaiter in the sender's thread context ([#213][issue213], Daniel Vrátil)
* Fixed build wilth clang 18 due to missing `#include <exception>` ([#220][pr220], Micah Terhaar)
* Fixed crash when `QNetworkAccessManager` is destroyed from a coroutine awaiting on a network reply ([#231][issue231], Daniel Vrátil)

## Full changelog

[See changelog on Github](https://github.com/danvratil/qcoro/releases/tag/v0.11.0)

## Support

If you enjoy using QCoro, consider supporting its development on [GitHub Sponsors][github-sponsors] or buy me a coffee
on [Ko-fi][kofi] (after all, more coffee means more code, right?).


[issue231]: https://github.com/danvratil/qcoro/issues/231
[issue217]: https://github.com/danvratil/qcoro/issues/217
[issue213]: https://github.com/danvratil/qcoro/issues/213
[issue211]: https://github.com/danvratil/qcoro/issues/211
[issue204]: https://github.com/danvratil/qcoro/issues/204
[pr223]: https://github.com/danvratil/qcoro/pulls/223
[pr220]: https://github.com/danvratil/qcoro/pulls/220
[pr209]: https://github.com/danvratil/qcoro/pulls/209

[qtdoc-qfuture-takeresult]: https://doc.qt.io/qt-6/qfuture.html#takeResult
[qcorofuture-takeresult]: https://qcoro.dev/reference/core/qfuture#takeResult
[qcoro-lazytask]: https://qcoro.dev/reference/coro/lazytask

[github-sponsors]: https://github.com/sponsors/danvratil
[kofi]: https://ko-fi.com/danvratil

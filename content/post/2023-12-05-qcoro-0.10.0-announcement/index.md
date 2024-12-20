---
categories:
- QCoro
date: "2023-12-05T21:30:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.10.0 Release Announcement
---

<!--
SPDX-FileCopyrightText: 2023 Daniel Vrátil <dvratil@kde.org>

SPDX-License-Identifier: GFDL-1.3-or-later
-->

Thank you to everyone who reported issues and contributed to QCoro.
Your help is much appreciated!

## Support for awaiting Qt signals with QPrivateSignal

Qt has a feature where signals can be made "private" (in the sense that only class
that defines the signal can emit it) by appending `QPrivateSignal` argument to the 
signal method:

```cpp
class MyObject : public QObject {
    Q_OBJECT
...
Q_SIGNALS:
    void error(int code, const QString &message, QPrivateSignal);
};
```

`QPrivateSignal` is a type that is defined inside the `Q_OBJECT` macro, so it's
private and as such only `MyObject` class can emit the signal, since only `MyObject`
can instantiate `QPrivateSignal`:

```cpp
void MyObject::handleError(int code, const QString &message)
{
    Q_EMIT error(code, message, QPrivateSignal{});
}
```

QCoro has a feature that makes it possible to `co_await` a signal emission and
returns the signals arguments as a tuple:

```cpp

MyObject myObject;
const auto [code,  message] = co_await qCoro(&myObject, &MyObject::handleError);
```

While it was possible to `co_await` a "private" signal previously, it would get 
return the `QPrivateSignal` value as an additional value in the result tuple 
and on some occasions would not compile at all.

In QCoro 0.10, we can detect the `QPrivateSignal` argument and drop it inside QCoro
so that it does not cause trouble and does not clutter the result type.

Achieving this wasn't simple, as it's not really possible to detect the type (because
it's private), e.g. code like this would fail to compile, because we are not allowed
to refer to `Obj::QPrivateSignal`, since that type is private to `Obj`.

```cpp
template<typename T, typename Obj>
constexpr bool is_qprivatesignal = std::same_as_v<T, typename Obj::QPrivateSignal>;
```

After many different attempts we ended up abusing `__PRETTY_FUNCTION__`
(and `__FUNCSIG__` on MSVC) and checking whether the function's name contains 
`QPrivateSignal` string in the expected location. It's a whacky hack, but hey - if it
works, it's not stupid :). And thanks to improvements in compile-time evaluation in 
C++20, the check is evaluated completely at compile-time, so there's no runtime 
overhead of obtaining current source location and doing string comparisons.

## Source Code Reorganization (again!)

Big part of QCoro are template classes, so there's a lot of code in headers. In my
opinion, some of the files (especially qcorotask.h) were getting hard to read and
navigate and it made it harder to just see the API of the class (like you get
with non-template classes), which is what users of a library are usually most
interested in.

Therefore I decided to move definitions into separated files, so that they don't
clutter the main include files.

This change is completely source- and binary-compatible, so QCoro users don't have
to make any changes to their code. The only difference is that the main QCoro
headers are much prettier to look at now.

## Bugfixes

* `QCoro::waitFor()` now re-throws exceptions ([#172][issue172], Daniel Vrátil)
* Replaced deprecated `QWebSocket::error` with `QWbSocket::errorOccured` in QCoroWebSockets module ([#174][pr174], Marius P)
* Fix `QCoro::connect()` not working with lambdas ([#179][pr179], Johan Brüchert)
* Fix library name postfix for qmake compatibilty ([#192][pr192], Shantanu Tushar)
* Fix `std::coroutine_traits isn't a class template` error with LLVM 16 ([#196][pr196], Rafael Sadowski)

## Full changelog

[See changelog on Github](https://github.com/danvratil/qcoro/releases/tag/v0.10.0)

[issue172]: https://github.com/danvratil/qcoro/issues/172
[pr174]: https://github.com/danvratil/qcoro/pulls/174
[pr179]: https://github.com/danvratil/qcoro/pulls/179
[pr192]: https://github.com/danvratil/qcoro/pulls/192
[pr196]: https://github.com/danvratil/qcoro/pulls/196


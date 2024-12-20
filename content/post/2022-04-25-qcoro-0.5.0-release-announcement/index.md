---
categories:
- QCoro
date: "2022-04-25T22:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.5.0 Release Announcement
---

After another few months I'm happy to announce a new release of QCoro, which brings several new features and a bunch
of bugfixes.

* .then() continuation for `Task<T>`
* All asynchronous operations now return `Task<T>`
* Timeouts for many operations
* Support for `QThread`

## .then() continuation for Task<T>

Sometimes it's not possible to `co_await` a coroutine - usually because you need to integrate with a 3rd party code
that is not coroutine-ready. A good example might be implementing `QAbstractItemModel`, where none of the virtual
methods are coroutines and thus it's not possible to use `co_await` in them.

To still make it possible to all coroutines from such code, `QCoro::Task<T>` now has a new method: `.then()`,
which allows attaching a continuation callback that will be invoked by QCoro when the coroutine represented
by the `Task` finishes.

```cpp
void notACoroutine() {
    someCoroutineReturningQString().then([](const QString &result) {
        // Will be invoked when the someCoroutine() finishes.
        // The result of the coroutine is passed as an argument to the continuation.
    });
}
```

The continuation itself might be a coroutine, and the result of the `.then()` member function is again a `Task<R>`
(where `R` is the return type of the continuation callback), so it is possible to chain multiple continuations
as well as `co_await`ing the entire chain.

## All asynchronous operations now return `Task<T>`

Up until now each operation from the QCoro wrapper types returned a special awaitable  - for example,
`QCoroIODevice::read()` returned `QCoro::detail::QCoroIODevice::ReadOperation`. In most cases users of QCoro do
not need to concern themselves with that type, since they can still directly `co_await` the returned awaitable.

However, it unnecessarily leaks implementation details of QCoro into public API and it makes it harded to return
a coroutine from a non-coroutine function.

As of QCoro 0.5.0, all the operations now return `Task<T>`, which makes the API consistent. As a secondary effect,
all the operations can have a chained continuation using the `.then()` continuation, as described above.

## Timeout support for many operations

Qt doesn't allow specifying timeout for many operations, because they are typically non-blocking. But the timeout
makes sense in most QCoro cases, because they are combination of wait + the non-blocking operation. Let's take
`QIODevice::read()` for example: the Qt version doesn't have any timeout, because the call will never block - if
there's nothing to read, it simply returns an empty `QByteArray`.

On the other hand, `QCoroIODevice::read()` is an asynchronous operation, because under to hood, it's a coroutine
that asynchronously calls a sequence of

```cpp
device->waitForReadyRead();
device->read();
```

Since `QIODevice::waitForReadyRead()` takes a timeout argument, it makes sense for `QCoroIODevice::read()`
to also take (an optional) timeout argument. This and many other operations have gained support for timeout.

## Support for `QThread`

It's been a while since I added a new wrapper for a Qt class, so QCoro 0.5.0 adds wrapper for `QThread`. It's
now possible to `co_await` thread start and end:

```cpp
std::unique_ptr<QThread> thread(QThread::create([]() {
    ...
});
ui->setLabel(tr("Starting thread...");
thread->start();
co_await qCoro(thread)->waitForStarted();
ui->setLabel(tr("Calculating..."));
co_await qCoro(thread)->waitForFinished();
ui->setLabel(tr("Finished!"));
```

## Full changelog

* `.then()` continuation for `Task<T>` ([#39](https://github.com/danvratil/qcoro/pull/39))
* Fixed namespace scoping ([#45](https://github.com/danvratil/qcoro/pull/45))
* Fixed `QCoro::waitFor()` getting stuck when coroutine returns synchronously ([#46](https://github.com/danvratil/qcoro/pull/46))
* Fixed -pthread usage in CMake ([#47](https://github.com/danvratil/qcoro/pull/47))
* Produce QMake config files (.pri) for each module ([commit e215616](https://github.com/danvratil/qcoro/commit/e215616be8174438e907710025a7bd71e66a64b5))
* Fix build on platforms where -latomic must be linked explicitly ([#52](https://github.com/danvratil/qcoro/pull/52))
* Return `Task<T>` from all operations ([#54](https://github.com/danvratil/qcoro/pull/54))
* Add QCoro wrapper for `QThread` ([commit 832d931](https://github.com/danvratil/qcoro/commit/832d931068312c906db6858493fc952b8d984b1c))
* Many documentation updates

Thanks to everyone who contributed to QCoro!

<hr>

## Download

You can download QCoro 0.5.0 [here][qcoro-release] or check the latest sources on [QCoro GitHub][qcoro-github].

## More About QCoro

If you are interested in learning more about QCoro, go read the [documentation][qcoro-docs], look at the
[first release announcement][dvratil-010-announcement], which contains a nice explanation and example or
watch [recording of my talk about C++20 coroutines and QCoro][qcoro-youtube] this years' Akademy.

[qcoro-release]: https://github.com/danvratil/qcoro/releases/tag/v0.5.0
[qcoro-github]: https://github.com/danvratil/qcoro
[qcoro-youtube]: https://www.youtube.com/watch?v=KKVqFqbXJaU&list=PLsHpGlwPdtMq6pJ4mqBeYNWOanjdIIPTJ&index=20
[qcoro-docs]: https://qcoro.dvratil.cz/
[dvratil-010-announcement]: https://www.dvratil.cz/2021/08/first-qcoro-release


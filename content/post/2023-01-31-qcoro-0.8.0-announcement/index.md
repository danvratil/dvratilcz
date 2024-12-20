---
categories:
- QCoro
date: "2023-01-31T19:53:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.8.0 Release Announcement
---

<!--
SPDX-FileCopyrightText: 2022 Daniel Vrátil <dvratil@kde.org>

SPDX-License-Identifier: GFDL-1.3-or-later
-->

This is a rather small release with only two new features and one small improvement.

Big thank you to [Xstrahl Inc.](https://xstrahl.com) who sponsored development of
new features included in this release and of QCoro in general.

And as always, thank you to everyone who reported issues and contributed to QCoro.
Your help is much appreciated!

[The original release announcement on qcoro.dvratil.cz](https://qcoro.dvratil.cz/news/2023/2023-01-31-qcoro-0.8.0-announcement/).


## Improved `QCoro::waitFor()`

Up until this version, `QCoro::waitFor()` was only usable for `QCoro::Task<T>`.
Starting with QCoro 0.8.0, it is possible to use it with any type that satisfies
the `Awaitable` concept. The concept has also been fixed to satisfies not just
types with the `await_resume()`, `await_suspend()` and `await_ready()` member functions,
but also types with member `operator co_await()` and non-member `operator co_await()`
functions.

## `QCoro::sleepFor()` and `QCoro::sleepUntil()`

Working both on QCoro codebase as well as some third-party code bases using QCoro
it's clear that there's a usecase for a simple coroutine that will sleep for
specified amount of time (or until a specified timepoint). It is especially useful
in tests, where simulating delays, especially in asynchronous code is common.

Previously I used to create small coroutines like this:

```cpp
QCoro::Task<> timer(std::chrono::milliseconds timeout) {
    QTimer timer;
    timer.setSingleShot(true);
    timer.start(timeout);
    co_await timer;
}
```

Now we can do the same simply by using `QCoro::sleepFor()`.

Read the [documentation for `QCoro::sleepFor()`](https://qcoro.dvratil.cz/reference/core/qtimer/#qcorosleepfor)
and [`QCoro::sleepUntil()`](https://qcoro.dvratil.cz/reference/core/qtimer/#qcorosleepuntil) for more details.

## `QCoro::moveToThread()`

A small helper coroutine that allows a piece of function to be executed in the context
of another thread.

```cpp
void App::runSlowOperation(QThread *helperThread) {
    // Still on the main thread
    ui->statusLabel.setText(tr("Running"));

    const QString input = ui->userInput.text();

    co_await QCoro::moveToThread(helperThread);
    // Now we are running in the context of the helper thread, the main thread is not blocked

    // It is safe to use `input` which was created in another thread
    doSomeComplexCalculation(input);

    // Move the execution back to the main thread
    co_await QCoro::moveToThread(this->thread());
    // Runs on the main thread again
    ui->statusLabel.setText(tr("Done"));
}
```

Read the [documentation for `QCoro::moveToThread`](https://qcoro.dvratil.cz/reference/core/qthread#qcoromovetothread) for more details.

## Full changelog

[See changelog on Github](https://github.com/danvratil/qcoro/releases/tag/v0.8.0)


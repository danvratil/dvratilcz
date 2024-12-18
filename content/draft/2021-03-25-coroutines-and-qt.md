---
categories:
- KDE
date: "2021-03-25T10:00:00Z"
draft: true
tags:
- KDE
- C++
- Qt
title: Coroutines and Qt
---
One of the major new features in C++20 are coroutines. In this short series of blog posts I want to look at what C++
coroutines are, how they work and, finally, how to use coroutines with Qt.

## Motivation

Let me start with a short teaser. Let's say we want to do a network request using `QNetworkAccessManager`. Using the
standard Qt signal/slot approach, our code would look something like this:

```cpp
void MyClass::fetchData()
{
    auto *nam = new QNetworkAccessManager(this);
    auto *reply = nam->get(getUrl());
    connect(reply, &QNetworkReply::finished, this,
            [nam, reply]() {
                const auto data = reply->readAll();
                reply->deleteLater();
                nam->deleteLater();

                doSomethingWithData(data);
            });
}
```

Now let's write the very same thing using coroutines:

```cpp
task<> MyClass::fetchData()
{
    QNetworkAccessManager nam;
    auto *reply = co_await nam.get(getUrl());
    doSomethingWithData(reply->readAll());
    delete reply;
}
```

All the magic hides behind the `co_await` keyword here. For one, just the mere presence of that keywords turns out
`fetchData()` function into a *coroutine*. When execution reaches the `co_await` keyword the coroutine is suspended
and execution continues in the function that has called `fetchData()`. When the object that `co_await` is waiting for -
in this case the `QNetworkReply` object - is ready, the execution of the coroutine is resumed and continues as if
nothing has happened. That's why we can do `reply->readAll()` seemingly immediately after calling
`QNetworkAccessManager::get()`. The trick is that while the *code* is written immediatelly after the `get()`, it is
not *executed* immediatelly as it would without the `co_await` keyword. Coroutines can help us to write code that
looks like synchronous, but executes asynchronously.

Let me get back to one more cool thing about Qt and coroutines that may not be immediately obvious from what I wrote
above: I said that when a coroutine is suspended, execution continues in a function that has called the coroutine
(unless it is a coroutine as well, in which case the function that has called that coroutine is called and so on and
so on). If `fetchData()` is called (directly or indirectly) from Qt's event loop, when the coroutine is suspended the
execution will return all the way up to the Qt's event loop and the loop will continue to run, until the coroutine
is resumed again. That means, that while your coroutine is suspended, the application remains responsive and can
process other events in the Qt event loop.

You might also be wondering about the return type of the coroutine - why did it change from `void` to `task<>`. Let
me just say that this is called the *promise type* and it wraps the true coroutine return type. I'll describe that
in more details in future blog posts.

## QCoro

If you just take the example above and throw it into your application, it won't just work out of the box. C++ has
no idea how to wait for `QNetworkReply` to finish. We need to provide some magical machinery that is executed behind
the scenes when `co_await` is called. You will also need some implementation of the *promise type*, since there's
no such thing as `task<>` in C++ standard library.

As I've been playing around with coroutines and Qt, I've implemented some of the "behind the scenes machinery" to
support `co_await` for `QNetworkReply`, `QDBusPendingCall` and `QFuture`. I plan to add some more in the near future,
there are some more good `co_await`able candidates in Qt ;-)

The "behind the scenes" machinery is available as [QCoro library][qcoro-github] on GitHub.

I am mentioning it here, because I will use that as a basis to explain how coroutines in C++ work. In the next part
of the series I will talk about how to implement support for `co_await`ing the `QFuture` type.


[qcoro-github]: https://github.com/danvratil/qcoro




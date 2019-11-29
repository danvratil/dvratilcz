---
layout: post
title: Q_PRIVATE_SLOT with new connect syntax
date: 2019-11-29 21:18:00
categories:
 - KDE
tags:
 - KDE
 - PIM
 - Akonadi
 - C++
---

When using PIMPL, we sometimes want to move implementation of slots into
the private class as well. In order for Qt to be able to invoke those slots
that formally exist only in the private class (which usually is not a `QObject`),
we use the `Q_PRIVATE_SLOT` macro in the main class. It allows Qt to invoke 
the slot method, even though it exists in the private class.

Let's have a short example:

```
/// mybutton.h

class MyButtonPrivate;
class MyButton : public QPushButton {
    Q_OBJECT
public:
    explicit MyButton(QWidget *parent);
    ~MyButton() noexcept override;

private:
    std::unique_ptr<MyButtonPrivate> const d_ptr;
    Q_DECLARE_PRIVATE(MyButton);

    Q_PRIVATE_SLOT(d_func(), void onClicked(bool));
};

/// mybutton.cpp

class MyButtonPrivate
{
public:
    void onClicked(bool clicked) {
        qDebug() << "Clicked!";
    }
};

MyButton::MyButton(QWidget *parent)
    : QPushButton(parent)
    , d_ptr(std::make_unique<MyButtonPrivate>())
{
    // Connecting to slot on "this" (MyButton*), although "onClicked" is defined in MyButtonPrivate
    connect(this, SIGNAL(clicked(bool)),
            this, SLOT(onClicked(bool)));
}

MyButton::~MyButton() noexcept = default;
```

`Q_PRIVATE_SLOT` does not create any new method in the `MyButton` class. The way
`Q_PRIVATE_SLOT` works is that it just instructs `moc` to generate a metacall
that looks like `obj->d_func()->onClicked(val)` instead of `obj->onClicked(val)`,
like it does for normal slots or invokables. 

This approach has one big disadvantage: it means that `Q_PRIVATE_SLOT`s can only be
invoked through the old `QObject::connect()` syntax.

So far I've been using a simple workaround to get all the compile-time checks
that I would get with the new connect syntax normally:

```
connect(this, &MyButton::clicked,
        this, [this](bool clicked) { d_func()->onClicked(clicked); });
```

Here we use a lambda to forward the call to the actual PIMPL'ed slot. This is
somewhat better than the old connect syntax but IMO it has two major drawbacks:

It's hard to read - it's difficult to immediatelly decipher what method the call
is actually being forwarded to.

It's tedious to write - it's a lot of boilerplate code to be written and if there
are too many arguments it becomes quite ugly. C++14 generic lambdas improve the
situation a bit since we can use `auto` instead of spelling out the argument types,
but I don't think it makes the code necessarily better to read:

```
connect(this, &MyObject::mySignal,
        this, [this](const auto &foo, auto bar, auto *baz) {
            d_func()->mySlot(foo, bar, baz);
        });
```

It got me thinking if there might be some way to auto-generate the forwarding
lambda and be able to just use the pointer-to-function here somehow.

In the end I came up with this tiny template function, which takes the d-pointer
and the pointer to the PIMPL'ed slot and returns a generic lambda which gets passed
into `QObject::connect` and which forwards arguments to the real slot method.
```
template<typename DPtr, typename Slot>
auto priv_slot(DPtr &&dptr, Slot &&slot)
{
    return [&dptr, &slot](auto && ... args)
    {
        (dptr->*slot)(std::forward<decltype(args)>(args) ...);
    }
}
```

The result has all the benefits of the new `QObject::connect()` syntax without the
ugliness of the "forwarding lambda":

```
connect(this, &MyObject::mySignal,
        this, priv_slot(d_func(), &MyObjectPrivate::onSignal));
```



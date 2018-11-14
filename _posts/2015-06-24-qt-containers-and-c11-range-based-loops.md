---
title: Qt containers and C++11 range-based loops
date: 2015-06-24 01:32:23 +02:00
categories:
- KDE
tags:
- C++
- KDE
- Qt
---
Much has been written on teh interwebs about performance of iterations over Qt containers with Q_FOREACH vs. std iterators vs. Java iterators. However there is [very little][1] about how the new C++11 range-based loops work with Qt containers (or maybe I just suck at Googling, but well here I am...). Today I found out that there is a little catch that one has to be very careful about when using range-based loops with Qt containers.

Qt containers are all implicitly shared classes, which means that copying them is very cheap since only shallow copy occurs. When a shared copy is modified (or rather when a non-const method is called) it calls `detach()` and performs the expensive deep copy. When there are no other copies of the object (i.e. when the reference count is 1) no copying happens when `detach()` is called. We say that such instance is "not shared".

To get to the point - the code below performs equally fast in both cases:

```cpp
QStringList list{ &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, .... };
Q_FOREACH (const QString &amp;v, list) {
   ...
}

for (const QString &amp;v : list) {
  ...
}
```

However in the following code range-based loop will perform much worse than `Q_FOREACH`.

```cpp
class MyClass
{
public:
   ...
   QStringList getList() const { return mList; }
   ...
private:
   QStringList mList;
};

...

Q_FOREACH (const QString &amp;v, myObject.getList()) {
   ...
}

for (const QString &amp;v : myObject.getList()) {
  ...
}
```


The difference between the first example and this one is that the QStringList in this example is shared, i.e. reference count of it's data is higher than 1. In this particular case one reference is held by `myObject` and one reference is held by the copy returned from the `getList()` method. That means that calling any non-const method on the list will call `detach()` and perform a deep copy of the list. And that is exactly what is happening in the range-based loop (but not in the Q_FOREACH loop) and that's why the range-based loop is way slower than Q_FOREACH in this particular case. The example above could be even simpler, but this way it highlights the important fact that returning a copy from a method means that the copy is shared and has negative side-effects when used with range-based loops. Note that if the method would return a const reference to QStringList, everything would be OK (because const ...).

The reason for the speed difference is one peculiarity of Qt containers: they have a const overload of `begin()` which does not call `detach()`. Q_FOREACH internally makes a const copy of the list, so the const overload of `begin()` gets called instead of the non-const one.

On the other hand the range-based loop does not take any copy and simply uses the non-const version of `begin()`. As we explained above, calling non-const methods on shared Qt containers performs a deep copy. Only exception is when the container itself is const because then the const version of `begin()` is called and the code will behave the same as Q_FOREACH.

Ironically with stdlib containers (`std::vector` for example) the situation is exactly the opposite. std iterators are not shared classes so making a copy of an std container always performs a deep copy, but calling a non-const method does not trigger any copying. That means that Q_FOREACH, which always takes a copy of the container would be doing a deep copy in such case while range-based loop, which only calls `begin()` and `end()` would not be triggering any copying. Although std containers provide `cbegin()` and `cend()` methods to get const interators, there's no need for the range-based loop to use them, since `begin()` and `end()` will always perform equally well on std containers.

To prove my point, here is the benchmark code I used. It's an extended version of an [older benchmark of Qt containers][2].

```cpp
#include <QStringList>
#include <QObject>
#include <QMetaType>
#include <qtest.h>
#include <cassert>

enum IterationType
{
    Foreach,
    RangeLoop,
    Std,
    StdConst
};

Q_DECLARE_METATYPE(IterationType)

class IterationBenchmark : public QObject
{
    Q_OBJECT
private Q_SLOTS:
    void stringlist_data()
    {
        QTest::addColumn<QStringList>(&quot;list&quot;);
        QTest::addColumn<IterationType>(&quot;iterationType&quot;);
        QTest::addColumn<bool>(&quot;shared&quot;);

        const int size = 10e6;
        QStringList list;
        list.reserve(size);

        for (int i = 0; i < size; ++i) {
            list << QString::number(i);
        }

        QTest::newRow(&quot;Foreach&quot;) << list << Foreach << false;
        QTest::newRow(&quot;Foreach (shared)&quot;) << list << Foreach << true;
        QTest::newRow(&quot;Range loop&quot;) << list << RangeLoop << false;
        QTest::newRow(&quot;Range loop (shared)&quot;) << list << RangeLoop << true;
        QTest::newRow(&quot;Std&quot;) << list << Std << false;
        QTest::newRow(&quot;Std (shared)&quot;) << list << Std << true;
        QTest::newRow(&quot;Std Const&quot;) << list << StdConst << false;
        QTest::newRow(&quot;Std Const (shared)&quot;) << list << StdConst << true;
    }

    void stringlist()
    {
        QFETCH(QStringList, list);
        QFETCH(IterationType, iterationType);
        QFETCH(bool, shared);

        if (!shared) {
            // Force detach
            list.push_back(QString());
            list.pop_back();
        }

        int dummy = 0;
        switch (iterationType) {
        case Foreach:
            QBENCHMARK {
                Q_FOREACH(const QString &amp;v, list) {
                    dummy += v.size();
                }
            }
            break;
        case RangeLoop:
            QBENCHMARK {
                for (const QString &amp;v : list) {
                    dummy += v.size();
                }
            }
            break;
        case Std:
            QBENCHMARK {
                QStringList::iterator iter = list.begin();
                const QStringList::iterator end = list.end();
                for (; iter != end; ++iter) {
                    dummy += (*iter).size();
                }
            }
            break;
        case StdConst:
            QBENCHMARK {
                QStringList::const_iterator = list.cbegin();
                const QStringList::const_iterator = list.cend();
                for (; iter != end; ++iter) {
                    dummy += (*iter).size();
                }
            }
            break;
        }
        assert(dummy);
    }
};

QTEST_MAIN(IterationBenchmark)
#include "iterationbenchmark.moc"
```

```shell
$ moc iterationbenchmark.cpp > iterationbenchmark.moc
$ g++ iterationbenchmark.cpp `pkg-config --cflags --libs Qt5Core` `pkg-config --cflags --libs Qt5Test` --std=c++11 -fPIC -O3 --o iterationbenchmark
$ ./iterationbenchmark
********* Start testing of IterationBenchmark *********
Config: Using QtTest library 5.4.2, Qt 5.4.2 (x86_64-little_endian-lp64 shared (dynamic) release build; by GCC 5.1.1 20150422 (Red Hat 5.1.1-1))
PASS   : IterationBenchmark::initTestCase()
PASS   : IterationBenchmark::stringlist(Foreach)
RESULT : IterationBenchmark::stringlist():&quot;Foreach&quot;:
     48 msecs per iteration (total: 96, iterations: 2)
PASS   : IterationBenchmark::stringlist(Foreach (shared))
RESULT : IterationBenchmark::stringlist():&quot;Foreach (shared)&quot;:
     48 msecs per iteration (total: 96, iterations: 2)
PASS   : IterationBenchmark::stringlist(Range loop)
RESULT : IterationBenchmark::stringlist():&quot;Range loop&quot;:
     53.5 msecs per iteration (total: 107, iterations: 2)
PASS   : IterationBenchmark::stringlist(Range loop (shared))
RESULT : IterationBenchmark::stringlist():&quot;Range loop (shared)&quot;:
     177 msecs per iteration (total: 177, iterations: 1)
PASS   : IterationBenchmark::stringlist(Std)
RESULT : IterationBenchmark::stringlist():&quot;Std&quot;:
     51 msecs per iteration (total: 51, iterations: 1)
PASS   : IterationBenchmark::stringlist(Std (shared))
RESULT : IterationBenchmark::stringlist():&quot;Std (shared)&quot;:
     179 msecs per iteration (total: 179, iterations: 1)
PASS   : IterationBenchmark::stringlist(Std Const)
RESULT : IterationBenchmark::stringlist():&quot;Std Const&quot;:
     53 msecs per iteration (total: 53, iterations: 1)
PASS   : IterationBenchmark::stringlist(Std Const (shared))
RESULT : IterationBenchmark::stringlist():&quot;Std Const (shared)&quot;:
     52 msecs per iteration (total: 52, iterations: 1)
PASS   : IterationBenchmark::cleanupTestCase()
Totals: 10 passed, 0 failed, 0 skipped, 0 blacklisted
********* Finished testing of IterationBenchmark *********
```

Both Q_FOREACH cases are equally fast because as we explained above, Qt always uses the const iterators and no deep copying happens. Range-based loop with non-shared list performs equally well, because even though it calls `detach()`, there are no copies to detach from and so no deep copy occurs. However range-based loop with a shared list is over 3 times slower, because `detach()` here will actually perform a deep copy. The same happens with for loop with non-const std iterators, which is basically just expanded version of range-based loops (range-based loops are just a syntactic sugar for for loops with non-const std iterators). For loops with const std iterators perform equally well as Q_FOREACH, because that is what Q_FOREACH does internally.

To sum this up, when using range-based loops with Qt containers:

Make sure the container is const ...

```cpp
// shared, but const, forces call to QStringList::begin() const,
// which does not call detach()
const QStringList list = objectOfClassA.getList();
...
for (const QString &amp;v : list) {
   ...
}
```

... or make sure the container is not shared.
```cpp
// shared and non-const
QStringList list = objectOfClassA.getList();
// call to non-const method causes detach() and deep copy,
// 'list' is now non-shared
list.append(QLatin1String(&quot;some more data&quot;));
...
// calls non-const begin(), but detach() of non-shared
// containers does not perform deep copy
for (const QString &amp;v : list) {
   ...
}
```

Note that this just moves the slow deep-copying outside of the loop, but the deep copy still occurs. The point is that you need to be careful not to create a new copy of the 'list' after it has been detached on line 5, but before passing it to the loop on line 9. Failing to do so would make the list shared again and the loop would trigger yet another deep copy.

I was very excited when range-based loops were added in C++0x and I've been using them in some new C++11 code I wrote since then. But in Qt-based code I'll be reverting back to the much safer Q_FOREACH. While it is possible to have range-based loops as fast as Q_FOREACH as we've shown above, one has to be really careful and constantly think about whether the container is non-shared or at least const and use Q_FOREACH if not. For that reason using Q_FOREACH everywhere is much safer for now.

I know that this is not any ground-breaking revelation and many of you probably even know of it, but I hope that it will still be useful for people who are not aware of the implementation details of Q_FOREACH and range-based loops, or just like me did not realize the importance of difference between shared and non-shared container instance.

[1] http://blog.qt.io/blog/2011/05/26/cpp0x-in-qt/
[2] https://blog.qt.io/blog/2009/01/23/iterating-efficiently/
---
layout: post
title: C++20 Ranges in Akonadi right now - Part 2: Transform
date: 2019-11-15 17:00:00 +01:00
categories:
 - KDE
tags:
 - KDE
 - PIM
 - Akonadi
---

In my previous blog post I explained what the C++20 Ranges library is all about and I
also explained my motivation to write my own simplified version. Today we are going to
look at implementing the necessary infrastructure and our first ranges-like algorithm.

## The Traits

As I mentioned in the first blog post, one of the reasons you cannot use ranges-v3 library with
Qt containers is because Qt containers do not satisfy the standard library container requirements.
One of the main issues is that QVector and QList iterators are not real iterators, they are in fact
raw pointes, and thus they are missing all the iterator traits. So we need to prepare some traits.

```
template<typename Iterator>
struct IteratorTraits {
    using iterator_category = typename Iterator::iterator_category;
    using value_type = typename Iterator::value_type;
    using difference_type = typename Iterator::difference_type;
    using pointer = typename Iterator::pointer;
    using reference = typename Iterator::reference;
};

template<typename Iterator*>
struct IteratorTraits {
    // QTypedArrayData::iterator::iterator_category
    using iterator_category = typename std::random_access_iterator_tag;, 
    using value_type = std::remove_cv_t<std::remove_reference_t<Iterator>>;
    using difference_type = int;
    using pointer = Iterator *;
    using reference = Iterator &;
};
```

## The Range

As the name of the library indicates, it's all about ranges. So the most basic class
in our Ranges-like minilibrary will be a template class `Range` that will hold a
pair of iterators and have a bunch of typedefs, like regular containers have.

```
#include <algorithm> // for std::distance

template<typename Iterator>
struct Range {
    // Standard container interface
    using value_type = typename IteratorTraits<Iterator>::value_type;
    using iterator = Iterator;
    using const_iterator = Iterator;
    using reference = typename IteratorTraits<Iterator>::reference;
    using pointer = typename IteratorTraits<Iterator>::pointer;

    Range(Iterator &&begin, Iterator &&end)
        : mBegin(begin), mEnd(end) {}
    Range(const Iterator &begin, const Iterator &end)
        : mBegin(std::move(begin)), mEnd(std::move(end)) {}

    Iterator begin() const { return mBegin; }
    Iterator end() const { return mEnd; }

    std::size_t size() const { return std::distance(mBegin, mEnd); }
private:
    Iterator mBegin, mEnd;
};
```

Since we are targeting C++14 here we do not have class template argument deduction available
to us yet. We would have to specify the `Iterator` template argument manually when creating
a new `Range`. We can workaround this by using function template argument deduction, which is
available since C++14 and create a simple factory template function:

```
// Here the `Iterator` type is deduced automatically by the compiler
template<typename Iterator>
Range<Iterator> makeRange(const Iterator &begin, const Iterator &end) {
    return Range<Iterator>(begin, end);
}
```

## Transformation

Let's start with one of the simplest operations: transformation. I'm sure you all
are familiar with `std::transform`, so we'll create a similar algorithm.

Since we want the range algorithm to be lazy and to be composable with other algorithms,
we will introduce a custom iterator class that will wrap the source iterator and will
perform the transformation on the value when it is dereferenced. The source iterator can
be an iterator from a QVector, or it can be an iterator from another algorithm that we
will introduce in the future, or it can even wrap another TransformIterator!

```
#include <utility>

template<typename RangeLike, typename TransformFn, typename SourceIterator = typename RangeLike::const_iterator>
struct TransformIterator {
    // Standard iterator_traits interface

    // Use the same iterator category as the wrapped iterator
    using iterator_category = typename SourceIterator::iterator_category;
    // Deduce the value_type from the return type of the transformation function
    using value_type = decltype(std::declval<TransformFn>()(std::declval<typename SourceIterator::value_type>()));
    using pointer = value_type *;
    using reference = const value_type &;

    TransformIterator(const RangeLike &range, SourceIterator sourceIter, const TransformFn &func)
        : mIter(std::move(sourceIter)), mFunc(func), mRange(range) {}

    // When the wrapper iterator is dereferenced, we dereference the wrapped iterator and pass
    // its value through our transform function. The result is cached.
    auto &operator*() const {
        if (!mValue.has_value()) {
            mValue = mFunc(*mIter);
        }
        return *mValue;
    }
    // Same for the pointer operator.
    auto *operator->() const {
        if (!mValue.has_value()) {
            mValue = mFunc(*mIter);
        }
        return &mValue.value();
    }

    // Standard iterator interface
    TransformIterator &operator++() { ++mIter; return *this; }
    TransformIterator operator++(int) { const auto ret = mIter; ++mIter; return {ret, mFunc, mRange}; }

    TransformIterator &operator--() { --mIter; return *this; }
    TransformIterator operator--(int) { const auto ret = mIter; --mIter; return {ret, mFunc, mRange}; }

    bool operator==(const TransformIterator &other) const { return mIter == other.mIter; }
    bool operator!=(const TransformIterator &other) const { return mIter != other.mIter; }
    bool operator<(const TransformIterator &other) const { return mIter < other.mIter; }
    bool operator>(const TransformIterator &other) const { return mIter > other.mIter; }

private:
    SourceIterator mIter;
    TransformFn mFunc;
    RangeLike mRange;
    std::optional<value_type> mValue;
};
```

Note the usage of `std::optional` template class here. `std::optional` was added to the
standard library in C++17, but it saves us so much work it's worth using it here. If you
can't use C++17 you can find many C++14-compatible single-header implementations online,
e.g. [](https://github.com/akrzemi1/Optional) which we use in Akonadi.

Also notice that we keep a copy of the container in each iterator. This ensures that even temporary
containers (like the one at the very end of this post) live long enough so we can iterate over them.
This is not an issue with Qt containers which are implicitely shared, so keeping the copies around in
the iterator pairs is very cheap, however it will be very expensive with standard containers (but
we are targeting Qt containers here, otherwise we would have been using ranges-v3 library).

Now let's write a `makeTransformRange` function that takes a `Range` and the transform
callable and constructs a new `Range` containing a pair of `TransformIterator`s. Why we
don't call the function `transform` will become apparent soon.

```
template<typename Range, typename Func>
auto makeTransformRange(const Range &input, const Func &func) {
    return makeRange(TransformIterator<Range, Func>(input.begin(), func),
                      TransformIterator<Range, Func>(input.end(), func));
}

```

Let's test whether our code works so far:

```
#include <QVector>
#include <iostream>

int main() {
    QVector<int> v{1, 2, 3, 4, 5};

    for (int value : makeTransformRange(v, [](int i) { return i * 2; })) {
        std::cout << value << std::endl;
    }
}
```

Compile and run this code and you should get the following output:

```
2
4
6
8
10
```

Close, but not really there yet.

# The pipe operator

In the previous first blog post I've shown that one of the most fancy things about
the Ranges library is that you can compose multiple operations using the pipe
operator. Let's see how to implement it.

We need to start by introducing a `transform()` function that can be used as a right-hand side
of the pipe operator, like this:

```
auto transformedRange = container | transform(transformFunc)
```

So the return type of the `transform()` function is what will be used by the compiler to find
the right `operator|` overload. So it needs to return something unique. I call it a _tag_:

```
template<typename Func>
struct TransformTag {
    Func func;
};
```

The `transform()` function is then very simple, it just takes the callable and wraps it in the
tag, which it then returns. Notice that there is no actual transformation happening in the `transform()`
function itself - it only helps us to call the right `operator|` overload. 

```
template<typename Func>
auto transform(Func &&func)
{
    return TransformTag<Func>{func};
}
```

So, finally we can now write the operator| overload, and it will be pretty
straightforward:

```
template<typename Range, typename Func>
auto operator|(Range &&container, TransformTag<Func> &&tag) {
    return makeTransformRange(container, std::move(tag.func));
}
```

Notice again that no transformation really happens here either - ranges are lazily evaluated,
which is means the transformation will only happen once we actually iterate over the range
and dereference the iterator:

```
#include <iostream>
#include <QVector>

int main() {
    QVector<int> v{1, 2, 3, 4, 5};
    // No transformation happens here, we only create a new `Range` that holds a pair of
    // `TransformIterator`s, each wrapping the QVector<int> iterators.
    const auto range = v | transform([](int i) { return i * 2; });

    // No transformation happens here either...
    for (auto it = range.begin(), end = range.end(); it != end; ++it) {
        // This is when the transformation actually happens, but only for the current element,
        // not for the entire source vector.
        int v = *it;
        std::cout << v << std::endl;
    }
}
```

This all can of course be written in much shorter way:

```
#include <iostream>
#include <QVector>

int main() {
    for (int i : QVector<int>{1, 2, 3, 4, 5} | transform([](int i) { return i * 2; })) {
        std::cout << i << std::endl;
    }
}
```

In the next part we will implement a filter operation that will allow us to
skip certain elements of the input range during iteration. Stay tuned ;-)


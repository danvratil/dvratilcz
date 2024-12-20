---
categories:
- KDE
date: "2019-09-13T11:00:00Z"
draft: true
tags:
- KDE
- PIM
- Akonadi
title: C++20 Ranges in Akonadi right now - Part 1 - Motivation
---

C++20 will bring us many new cool language and standard library features. One
of the things I'm most excited for is the Ranges library. In short, the library
introduces a concept of ranges, which can be seen as views over a pair of
iterators. All standard library algorithms will be adjusted to take a range
as an argument (in addition to the current pair of iterators) and return a
range. This will allow composing algorithms in ways known from functional
languages.

Let's take the following simple piece of code as an example. This loop
iterates over a vector of elements and stores IDs of elements with size
greater than 10 into another vector.

```
std::vector<Element::Id> oversized;
std::vector<Element> list = getElements();
for (const auto &elem : list) {
    if (elem.size() > 10) {
        oversized.push_back(elem.id());
    }
}
```

Now with Ranges, we could make use of `std::views::filter` and `std::views::transform`
algorithms and compose them nicely into a single line:


```
const auto sizeFilter = [](const auto &elem) { return elem.size() > 10; }
const auto getId = [](const auto &elem) { return elem.id(); }

const std::vector<Element> list = getElements();
const auto oversized = std::views::transform(std::views::filter(list, sizeFilter), getId);
```

Since nested function calls might sometimes be hard to read, especially when the nesting
gets very deep, the Ranges library also allows for composing the algorithms using the `|`
operator:

```
const std::vector<Element> list = getElements();
const auto oversized = list | std::views::filter([](const auto &elem) { return elem.size > 10; })
                            | std::views::transform([](const auto &elem) { return elem.id(); });
```

The last syntax is what I like the most: it's concise, feels natural and is very easy
to understand.

The `oversized` variable, in addion to being `const` which you couldn't do in the
"imperative" way, is not an `std::vector` but rather a _view_ over the original
container. All the filtering and transformations will be applied lazily once
the range is iterated over - until then no computation actually happens.

In addition to _views_ there are also so called _actions_, which work in a non-lazy fashion.

The Ranges library offers much much more. If you are interested in more details, I refer
you to [this blogpost][niebler-ranges] from Eric Niebler, the author of the Ranges library
himself.

If you are as excited for Ranges like I am and you want to start using them NOW with C++14,
you can! The Ranges library also exists as a [standalone library on Github][ranges-github].
Unfortunately if you try to use the Ranges library with Qt containers, you will run into
many issues, because the Qt containers do not really fulfill the requirements of the
standard library on what containers should look like.

Looking into the implementation of Eric's library, I realized that writing a simplified
and small version of Ranges myself should be fairly simple, so I could start using them
in Akonadi. This short blog series describes how you can write your very own simplified
version of the Ranges library.

We will look into writing the first building blocks in the next part. If you don't want
to wait until the next part, you can just look at our AkRanges "library" in the
[Akonadi Git repository][akranges-git].


[niebler-ranges]: http://ericniebler.com/2018/12/05/standard-ranges/
[ranges-github]: https://github.com/ericniebler/range-v3/
[akranges-git]: https://cgit.kde.org/akonadi.git/tree/src/shared/akranges.h

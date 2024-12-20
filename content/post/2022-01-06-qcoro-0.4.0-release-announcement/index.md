---
categories:
- QCoro
date: "2022-01-06T19:00:00Z"
tags:
- KDE
- Qt
- QCoro
title: QCoro 0.4.0 Release Announcement
---

It took a few months, but there's a new release of QCoro with some new cool features. This change contains a breaking
change in CMake, wich requires QCoro users to adjust their CMakeLists.txt. I sincerely hope this is the last breaking
change for a very long time.

Major highlights in this release:

* Co-installability of Qt5 and Qt6 builds of QCoro
* Complete re-work of CMake configuration
* Support for compiling QCoro with Clang against libstdc++

## Co-installability of Qt5 and Qt6 builds of QCoro

This change mostly affects packagers of QCoro. It is now possible to install both Qt5 and Qt6 versions
of QCoro alongside each other without conflicting files. The shared libraries now contain the Qt version
number in their name (e.g. `libQCoro6Core.so`) and header files are also located in dedicated subdirectories
(e.g. `/usr/include/qcoro6/{qcoro,QCoro}`). User of QCoro should not need to do any changes to their codebase.

## Complete re-work of CMake configuration

This change affects users of QCoro, as they will need to adjust CMakeLists.txt of their projects. First,
depending on whether they want to use Qt5 or Qt6 version of QCoro, a different package must be used.
Additionally, list of QCoro components to use must be specified:

```
find_package(QCoro5 REQUIRED COMPONENTS Core Network DBus)
```

Finally, the target names to use in `target_link_libraries` have changed as well:

* `QCoro::Core`
* `QCoro::Network`
* `QCoro::DBus`

The version-less `QCoro` namespace can be used regardless of whether using Qt5 or Qt6 build of QCoro.
`QCoro5` and `QCoro6` namespaces are available as well, in case users need to combine both Qt5 and Qt6
versions in their codebase.

This change brings QCoro CMake configuration system to the same style and behavior as Qt itself, so it
should now be easier to use QCoro, especially when supporting both Qt5 and Qt6.

## Support for compiling QCoro with Clang against libstdc++

Until now, when the Clang compiler was detected, QCoro forced usage of LLVM's libc++ standard library.
Coroutine support requires tight co-operation between the compiler and standard library. Because Clang
still considers their coroutine support experimental it expects all coroutine-related types in standard
library to be located in `std::experimental` namespace. In GNU's libstdc++, coroutines are fully supported
and thus implemented in the `std` namespace. This requires a little bit of extra glue, which is now in place.

### Full changelog

* QCoro can now be built with Clang against libstdc++ ([#38](https://github.com/danvratil/qcoro/pull/38), [#22](https://github.com/danvratil/qcoro/issues/22))
* Qt5 and Qt6 builds of QCoro are now co-installable ([#36](https://github.com/danvratil/qcoro/issues/36), [#37](https://github.com/danvratil/qcoro/pull/37))
* Fixed early co_return not resuming the caller ([#24](https://github.com/danvratil/qcoro/issue/24), [#35](https://github.com/danvratil/qcoro/pull/35))
* Fixed QProcess example ([#34](https://github.com/danvratil/qcoro/pull/34))
* Test suite has been improved and extended ([#29](https://github.com/danvratil/qcoro/pull/29), [#31](https://github.com/danvratil/qcoro/pull/31))
* Task move assignment operator checks for self-assignment ([#27](https://github.com/danvratil/qcoro/pull/27))
* QCoro can now be built as a subdirectory inside another CMake project ([#25](https://github.com/danvratil/qcoro/pull/25))
* Fixed QCoroCore/qcorocore.h header ([#23](https://github.com/danvratil/qcoro/pull/23))
* DBus is disabled by default on Windows, Mac and Android ([#21](https://github.com/danvratil/qcoro/pull/21))

Thanks to everyone who contributed to QCoro!

<hr>

## Download

You can download QCoro 0.4.0 [here][qcoro-release] or check the latest sources on [QCoro GitHub][qcoro-github].

## More About QCoro

If you are interested in learning more about QCoro, go read the [documentation][qcoro-docs], look at the
[first release announcement][dvratil-010-announcement], which contains a nice explanation and example or
watch [recording of my talk about C++20 coroutines and QCoro][qcoro-youtube] this years' Akademy.

[qcoro-release]: https://github.com/danvratil/qcoro/releases/tag/v0.4.0
[qcoro-github]: https://github.com/danvratil/qcoro
[qcoro-youtube]: https://www.youtube.com/watch?v=KKVqFqbXJaU&list=PLsHpGlwPdtMq6pJ4mqBeYNWOanjdIIPTJ&index=20
[qcoro-docs]: https://qcoro.dvratil.cz/
[dvratil-010-announcement]: https://www.dvratil.cz/2021/08/first-qcoro-release

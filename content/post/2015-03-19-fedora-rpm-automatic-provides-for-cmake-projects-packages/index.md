---
categories:
- Fedora
- KDE
date: "2015-03-19T18:25:42Z"
tags:
- cmake
- Fedora
- KDE
- rpm
title: 'Fedora RPM: Automatic "Provides" for CMake projects packages'
---
If you ever did any RPM packaging (not just on Fedora) you probably noticed that some SPEC files don't use package names in `BuildRequires` fields but instead they refer to pkg-config module names, like this:

```
Name:           qt5-qtbase
Version:        5.4.1
Release:        1%{?dist}
...
BuildRequires:  pkgconfig(dbus-1)
BuildRequires:  pkgconfig(fontconfig)
BuildRequires:  pkgconfig(gl)
BuildRequires:  pkgconfig(glib-2.0)
BuildRequires:  pkgconfig(gtk+-2.0)
...
```

This is achieved by the respective packages simply having these aliases as their `Provides` (for example `dbus-devel` package `Provides: pkgconfig(dbus-1)`). The `Provides` are extracted automatically by an RPM script when the package is being built which gave me an idea...what if we could do the same for CMake modules?

And so I've written a simple script for RPM which extracts CMake package name and version from the package config files installed to /usr/lib/cmake. Simply put it means that `kf5-kcoreaddons-devel` will have

```
Provides:       cmake(KF5CoreAddons) = 5.8.0
```

and `qt5-qtdeclarative-devel` will have

```
Provides:       cmake(Qt5Qml) = 5.4.1
Provides:       cmake(Qt5Quick) = 5.4.1
Provides:       cmake(Qt5QuickTest) = 5.4.1
Provides:       cmake(Qt5QuickWidgets) = 5.4.1
```

...and all this happens automatically :-)

So, if you are packaging a CMake-based projects for Fedora you don't have to wonder which package provides the needed dependencies but you can just use the name from `find_package()` in `BuildRequires` and be done with it.

```
Name:           plasma-workspace
Version:        5.2.1
Release:        6%{?dist}
Summary:        Plasma workspace, applications and applets
...
BuildRequires:  cmake(Qt5Widgets) cmake(Qt5Quick) cmake(Qt5QuickWidgets) cmake(Qt5Concurrent) cmake(Qt5Test) cmake(Qt5Script) cmake(Qt5Network) cmake(Qt5WebKitWidgets)
BuildRequires:  cmake(Phonon4Qt5)
BuildRequires:  cmake(KF5Plasma) cmake(KF5DocTools) cmake(KF5Runner) ...
...
```

Another advantage is that this makes it easier to automate dependencies extraction from CMakeLists because we will no longer have to bother with mapping the CMake names to package names (for reference I wrote [a script](https://github.com/FedoraKDE/fedora-kde-frameworks/blob/master/scripts/cmake-to-rpm-deps.py) to mass-update dependencies of all our KDE Frameworks 5 packages in Fedora).

We have pushed the script into Fedora's cmake package (currently in rawhide and (soon) in F22 but eventually I'd like to have it in F20 and F21 too) so all packages that will be rebuilt after this will get the automatic `Provides`.

In the long-term we would like to try to get the script to upstream RPM so that other distributions can use this too. For now the script is available in [cmake package distgit]( http://pkgs.fedoraproject.org/cgit/cmake.git/commit/?id=de493a3f7706deb7b5b914b579fb8966607bc8b6).

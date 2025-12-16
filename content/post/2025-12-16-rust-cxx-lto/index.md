---
categories:
- Rust
date: '2026-12-16 23:00:00 +0100'
tags:
- Rust
title: 'Rust: linking static C/C++ libraries with LTO'
---

## The Backstory

I wasted entire afternoon today trying to figure this out, so here's a quick note for future reference - hopefully to save someone else's afternoon.

Today, I was working on adding Rust bindings for an internal C++ library. The C++ library itself is built using CMake and produces a statically-linked library, let's call it <em>libfoo.a</em>.
I used the[`cxx`](https://cxx.rs/) crate to generate the glue code between Rust and the C++ library, wrote the higher-level Rust API and ran `cargo build`. The crate built just fine, so I moved on to integrating it into our larger Rust project. However, when I tried to build the project, I got a linker error:

```
note: rust-lld: error: undefined symbol: url_to_json[abi:cxx11](std::basic_string_view<char, std::char_traits<char>> const&)
```

I double-checked the `build.rs` script of the bindings crate to ensure that <em>libfoo.a</em> was being linked. It was. I then used `nm` to confirm that the symbol actually exists in <em>libfoo.a</em>. It did. So what now? I spent a lot of time googling around, trying different "hacks" in the build.rs script and more. I had a temporary success by adding complex `build.rs` into the consumer project, but that wasn't really a scalable solution.

What was the most confusing part was that I used the exact same approach and code to create bindings for another our C++ library a while ago, and there it all just worked. No special linker flags, no magical cargo incantations, no `build.rs` in projects that used the bindings crate. What was different this time?

## A Suspect is Identified

After literally hours of trial and error and out of desparation, I decided to `objdump` the <em>libfoo.a</em> to look at the disassembly of the problematic `url_to_json` function. I am far from an assembly expert, but the disassembled output looked very suspicious, even to my untrained eye.

```
0000000000000000 <.gnu.lto__Z11url_to_jsonB5cxx11RKSt17basic_string_viewIcSt11char_traitsIcEE.1350.d0d92fceb60052fc>:
 0:   28 b5 2f fd 60 72       sub    %dh,0x7260fd2f(%rbp)
 6:   02 25 12 00 b6 a0       add    -0x5f49ffee(%rip),%ah
 c:   71 46                   jno    54 <.gnu.lto__Z11url_to_jsonB5cxx11RKSt17basic_string_viewIcSt11char_traitsIcEE.1350.d0d92fceb60052fc+0x54>
 e:   e0 d0                   loopne ffffffffffffffe0
10:   36 1d f8 c7 f0 69       ss sbb $0x69f0c7f8,%eax
16:   6c                      insb   (%dx),%es:(%rdi)
17:   81 05 c4 c0 e0 96 61    addl   $0x149c4e61,-0x691f3f3c(%rip)
1e:   4e 9c 14
21:   a0 ad c0 3f f4 3e de    movabs 0x102dde3ef43fc0ad,%al
28:   2d 10
2a:   a4                      movsb  %ds:(%rsi),%es:(%rdi)
2b:   61                      (bad)
(truncated)
```

Those instructions don't look sensible at all, especially when compared to what the actual C++ code looks like. And what about the "bad" instruction? It's not like I haven't run into miscompilations before, but this was much more than that.

At this point, I consulted the situation with an AI, and the answer was clear:

> When working with static libraries and Clang, issues with assembly output from tools like objdump can arise, particularly when Link-Time Optimization (LTO) is enabled.

Wait! Did it say LTO? The static library is definitely built with LTO (it's even in the name of the symbol). Quick check into the library's CMakeLists.txt and bingo: LTO is enabled by default. I disabled it and...the consumer project built and linked without a single error. Problem solved.

## But...why?

My (shallow) understanding of LTO has always been that it's just a special optimizer pass at link time, when the linker can see the final executable (or shared library) as a whole, and can perform optimizations across translation units and more efficiently eliminate unused code. A static library is just a collection of object files, so LTO should not really play any role here, right?

The reality is that with LTO enabled, compilers "cheat" (yes, compiler<strong>s</strong> - GCC does this as well), and instead of producing object files with the final machine code, they produce object-like files that contain the intermediate representation (IR) of the code. IR (GCC calls it GIR) is a compiler-specific representation of the code during the compilation process. It's no longer the original source code, but it's not the final machine code either.  Having access to the IR allows the linker to perform advanced optimizations that wouldn't be possible if it only had access to the final machine code. The final codegen that emits the executable machine code happens after the optimization pass.

This entire process is actually described quite nicely in the [LLVM documentation about LTO](https://llvm.org/docs/LinkTimeOptimization.html) - which is an information that is useful only when you know that you need it :-)

However, if the <em>libfoo.a</em> contained LLVM IR, and rustc also uses LLVM (and supports LTO on its own), why didn't it Just Work™? The problem is that Rust will only perform LTO between Rust crates by default.

## Cross-language LTO with `cxx`

Luckily, it's possible to coerce the Rust compiler to perform cross-language LTO, but if you are using the `cxx` crate, there's an extra step involved.

This is what ultimately worked for me, and allowed me to build both without LTO in debug mode and with LTO in release mode.

In your `build.rs`, you must make sure that the generated bridge code is also compiled with LTO enabled (when needed):

```rust

let enable_lto = std::env::var("PROFILE").unwrap_or_default() == "release";

// Compile the C++ library
cmake::Config::new(".")
    .define("ENABLE_LTO", if enable_lto { "ON" } else { "OFF" })
    .build_target("all");

// Build the cxx bridge
let mut bridge = cxx_build::bridge("src/bridge.rs")
    .file("src/bridge.cpp")
    // ... additional includes paths, source files, flags, etc.
    ;
if enable_lto {
    // Enable LTO for the bridge compilation as well
    bridge.flag_if_supported("-flto");
}

bridge.compile("foo_bridge");
```

And to compile it. Just make sure you use Clang for building the C++ code as well (the `cc` crate inside `cxx` should pick this up automatically from the environment variables):
```
# Make sure to use clang!
export CXX=clang++
export CC=clang
# Enable LTO linker plugin
export RUSTFLAGS="-Clinker-plugin-lto"
# Let's gooooo
cargo build --release
```

An important requirement is that the C/C++ code must be compiled with a version of Clang that is compatible with the LLVM version used by rustc. The compatibility matrix is [documented in the rustc book](https://doc.rust-lang.org/rustc/linker-plugin-lto.html#toolchain-compatibility). In my case, I was using rustc 1.90 (LLVM 20.1.8) and Clang 20.1.8.

## Conclusion

If you ever run into `undefined reference` linker errors when trying to link static C or C++ libraries with your Rust code, double check whether the static library was built with LTO enabled, and make sure to enable cross-language LTO in your Rust build as well.

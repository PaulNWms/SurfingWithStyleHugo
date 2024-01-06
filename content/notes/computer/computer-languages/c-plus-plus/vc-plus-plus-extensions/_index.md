---
title: VC++ Extensions
description: 
date: 2023-11-23T09:01
keywords: 
draft: false
tags:
---
## Preprocessor

- `#pragma once` - Put at the top of every .cpp file.  (Not part of the standard, but it should be. gcc now has it, too.)
- `#import` - Loads a type library
## Macros

- `_DEBUG`
-  `__FUNCDNAME__`, `__FUNCSIG__`, and `__FUNCTION__`
## Calling Conventions

- `__cdecl` - Parameters are placed onto the stack from right to left, and the caller is responsible for popping them off the stack after the function returns.  `__cdecl` is the default.
- `__stdcall` - Parameters are placed onto the stack from right to left, and the function is responsible for popping them off the stack before returning.  `va_arg`s are not possible.  `__stdcall` is the COM calling convention.
## Classes

- `_com_ptr_t`
- `_bstr_t`
- `_variant_t`
- `_com_error`
## Precompiled Headers

- VS AppWizard creates by default.

## Other Dialects

Microsoft also created [C++/CLI](/notes/) for [DotNET](/notes/computer/microsoft/dotnet), and [C++/CX](/notes/) & [C++/WinRT](/notes/) for [WinRT](/notes/).

---
# References

- [Preprocessor | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/preprocessor/preprocessor?view=msvc-170)
- [Predefined macros | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/preprocessor/predefined-macros?view=msvc-170)
- [Calling Conventions | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/calling-conventions?view=msvc-170)
- [Precompiled Header Files | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/build/creating-precompiled-header-files?view=msvc-170)
- [#import directive (C++) | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/preprocessor/hash-import-directive-cpp?view=msvc-170)
- [Compiler COM Support Classes | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/compiler-com-support-classes?view=msvc-170)

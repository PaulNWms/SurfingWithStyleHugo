---
title: Type Libraries
date: 2023-09-02T18:24-0800
draft: false
tags:
  - "#COM"
parent: COM
---

Type libraries are specified in [Interface Definition Language (IDL)](https://learn.microsoft.com/en-us/windows/win32/rpc/the-interface-definition-language-idl-file) and created using the [MIDL compiler](https://learn.microsoft.com/en-us/windows/win32/midl/using-the-midl-compiler-2).  This is a deep subject that most of us don't need to know very much about.

The MIDL compiler is invoked on the command line.  Behind the scenes, it calls [CreateTypeLib](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-createtypelib) and does most of its work through subsequent calls on [ICreateTypeLib](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypelib) and [ICreateTypeInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypeinfo).

A client can inspect an existing type library by calling [LoadTypeLib](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-loadtypelib) and making calls on [ITypeLib](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypelib) and [ITypeInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypeinfo), and navigating the deeply nested return values.

---
# References

- [MIDL Language Reference - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/midl/midl-language-reference)

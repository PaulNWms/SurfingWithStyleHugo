---
title: CComBSTR
description: 
date: 2023-11-02T20:11
keywords: 
draft: false
tags:
---
CComBSTR is a convenience class for handling BSTRs.  It's convenient, but not full-featured.  For advanced operations, sometimes ya gotta convert to a std::wstring and use the STL.

`_bstr_t` is a VC++ compiler COM support extension.  It's compiler native, so there's no dependency on atl.dll.

---
# References

[CComBSTR Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccombstr-class?view=msvc-170)

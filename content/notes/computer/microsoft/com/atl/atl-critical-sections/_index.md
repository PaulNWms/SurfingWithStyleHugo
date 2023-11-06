---
title: ATL Critical Sections
description: 
date: 2023-11-03T17:44
keywords: 
draft: false
tags:
---
ATL has the CComCriticalSection class, which wraps the native Win32 CS calls.  CComAutoCriticalSection is a slightly more convenient variation of it.  These are used by the [ATL Threading Model](/notes/computer/microsoft/com/atl/atl-threading-model)s, but can be used outside this context.

CComFakeCriticalSection is an empty implementation, which can be swapped in to turn off the critical section with minimal code change.

---
# References

- [CComCriticalSection Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomcriticalsection-class?view=msvc-170)
- [CComAutoCriticalSection Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomautocriticalsection-class?view=msvc-170)
- [CComFakeCriticalSection Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomfakecriticalsection-class?view=msvc-170)

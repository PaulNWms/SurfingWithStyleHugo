---
title: ATL Threading Model
description: 
date: 2023-11-03T17:45
keywords: 
draft: false
tags:
---
There are 3 threading models, which are self-explanatory

- CComSingleThreadModel
- CComMultiThreadModel
- CComMultiThreadModelNoCS

ATL also defines a couple typedefs

- CComObjectThreadModel
- CComGlobalsThreadModel

But you don't directly handle that.  The above are selected by compiler flags

- `_ATL_SINGLE_THREADED`
- `_ATL_APARTMENT_THREADED`
- `_ATL_FREE_THREADED`

---
# References

- [CComSingleThreadModel Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomsinglethreadmodel-class?view=msvc-170)
- [CComMultiThreadModel Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccommultithreadmodel-class?view=msvc-170)
- [CComMultiThreadModelNoCS Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccommultithreadmodelnocs-class?view=msvc-170)
- [CComMultiThreadModel Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccommultithreadmodel-class?view=msvc-170)
- [CComMultiThreadModel Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccommultithreadmodel-class?view=msvc-170)
- [Specifying the Threading Model for a Project (ATL) | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/specifying-the-threading-model-for-a-project-atl?view=msvc-170)

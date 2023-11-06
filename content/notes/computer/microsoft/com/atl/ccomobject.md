---
title: CComObject
description: 
date: 2023-11-03T17:45
keywords: 
draft: false
tags:
---
CComObject is a wrapper which is templatized by your class, e.g.

```C++
CComObject<CSimpleObject> *pObj;
```

If you're using the object within a function call, use CComObjectStack, which cleans itself up when it goes out of scope.

There are many variations of CComObject, see below.

---
# References

- [CComObject Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomobject-class?view=msvc-170)
- [CComObjectStack Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomobjectstack-class?view=msvc-170)
- [CComObjectNoLock Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomobjectnolock-class?view=msvc-170)
- [CComObjectGlobal Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomobjectglobal-class?view=msvc-170)
- [CComTearOffObject Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomtearoffobject-class?view=msvc-170)
- [CComCachedTearOffObject Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomcachedtearoffobject-class?view=msvc-170)

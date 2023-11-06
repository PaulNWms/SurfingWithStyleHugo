---
title: ATL COM Map
description: 
date: 2023-11-03T17:45
keywords: 
draft: true
tags:
---
The ATL COM MAP is a lovely bit of generated code the AppWizard decorates the COM class with.

```C++
BEGIN_COM_MAP(CMyClass)
    COM_INTERFACE_ENTRY(IMyInterface)
    COM_INTERFACE_ENTRY(IDispatch)
END_COM_MAP()
```

There a many variations of `COM_INTERFACE_ENTRY`, see below.

---
# References

- [COM Interface Entry Macros | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/com-interface-entry-macros?view=msvc-170)

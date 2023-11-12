---
title: ATL COM Map
description: 
date: 2023-11-03T17:45
keywords: 
draft: false
tags:
---
The ATL COM MAP is a (mostly) generated list of macros the AppWizard decorates the COM class with.

```C++
BEGIN_COM_MAP(CExample)
   COM_INTERFACE_ENTRY(IExample)
   COM_INTERFACE_ENTRY_IID(IID_IDispatch, CExampleDispatch)
   COM_INTERFACE_ENTRY(IExampleBase)
   COM_INTERFACE_ENTRY(ISupportErrorInfo)
END_COM_MAP()
```

There a many variations of the `COM_INTERFACE_ENTRY` macro, see below.  Occasionally you have to change one so you have to understand it.

---
# References

- [COM Interface Entry Macros | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/com-interface-entry-macros?view=msvc-170)

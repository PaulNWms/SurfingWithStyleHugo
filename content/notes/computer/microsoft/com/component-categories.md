---
title: Component Categories
description: 
date: 2023-12-30T08:17
keywords: 
draft: false
tags:
  - COM
---
Classic COM components that are registered may make use of component categories.  Categories are represented by CATIDs.

- The system comes with a number of standard categories, and you can add and remove custom categories.  You can declare a class implements or requires categories.  This is done with [ICatRegister](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatregister).
- You can discover categories and classes on a system with [ICatInformation](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatinformation).
- You can define a default CLSID for a category with [CoTreatAsClass](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cotreatasclass).  If default component is defined, you can call _CoCreateInstance_ with the CATID instead of the CLSID.

---
# References

- [ICatInformation (comcat.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatinformation)
- [ICatRegister (comcat.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatregister)
- [CoTreatAsClass function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cotreatasclass)

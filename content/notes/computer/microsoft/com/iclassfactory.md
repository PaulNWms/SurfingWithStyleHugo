---
title: IClassFactory
description: 
date: 2023-11-28T05:52
keywords: 
draft: false
tags:
---
Every COM class has a corresponding IClassFactory implementation.  This is where the C++ `new` operator is called.  Most COM classes implement their own IClassFactory, but this is not a requirement.  The AppWizard sets it up this way.

This area of COM is saddled with unfortunate naming, which leads to confusion.  So let's ignore the names at first.  Let's say the client wants an interface on an inproc server, so it calls CoCreateInstance, passing in a CLSID and IID.

- The SCM looks up the CLSID in the registry and gets the filename of the DLL.
- Then it loads it in and calls a function to get a factory pointer.
- Then it calls a method on the factory, passing in the IID, to create the object.

That's a roundabout process, but understandable.  Adding in the names makes it less so.

- The SCM calls DllGetClassObject, passing in IID_IClassFactory to get a factory pointer.
- Then it calls pFactory->CreateInstance, passing in the IID, to create the object.

So, DllGetClassObject returns a factory, and IClassFactory is an object factory.

---
# References

[CoCreateInstance function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-cocreateinstance)
[IClassFactory - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iclassfactory)
[IClassFactory2 (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iclassfactory2)

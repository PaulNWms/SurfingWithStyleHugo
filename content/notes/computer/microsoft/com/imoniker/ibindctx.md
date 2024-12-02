---
title: IBindCtx
description: 
date: 2024-02-20T21:25
keywords: 
draft: false
tags:
  - COM
---
A binding context ([IBindCtx](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ibindctx)) is an object that binds a moniker to its target.  This happens under the hood when you call [BindMoniker](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-bindmoniker), which is the typical usage.

```C++
BindMoniker(pMoniker, 0, IID_IUnknown, (void**)&pUnknown);
```

_BindMoniker_ is actually a thin wrapper around [IMoniker::BindToObject](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nf-objidl-imoniker-bindtoobject).

```C++
IBindCtx* pClassBindCtx;
CreateBindCtx(0, &pClassBindCtx);
pMoniker->BindToObject(pClassBindCtx, NULL, IID_IUnknown, (void**)&pUnknown);
pClassBindCtx->Release();|
```

---
# References

[IBindCtx (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ibindctx)
[BindMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-bindmoniker)
[IMoniker::BindToObject (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nf-objidl-imoniker-bindtoobject)

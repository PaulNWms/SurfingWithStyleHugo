---
title: IUnknown
date: 2023-07-25T07:29-0800
draft: false
tags:
  - "#COM"
---
### `AddRef()` and `Release()`

1. Functions that return an interface pointer should call `AddRef()`
2. Functions that use an interface pointer provided by another function are responsible for calling `Release()`
3. If you copy an interface pointer, the best practice is to call `AddRef()` and `Release()`

### `QueryInterface()`

Microsoft defines a bunch of goofy and pseudo-mathematical rules which state in essence that, if you have a pointer to any interface on an object, you can always get a pointer to any other interface on that object, including `IUnknown`.


---
# References

[CoInitialize function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-coinitialize)
[CoInitializeEx function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-coinitializeex)
[CoUninitialize function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-couninitialize)
[IUnknown - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iunknown)

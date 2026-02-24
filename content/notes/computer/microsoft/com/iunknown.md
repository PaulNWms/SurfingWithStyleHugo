---
title: IUnknown
date: 2023-07-25T07:29:00-08:00
draft: false
tags:
  - "#COM"
parent: COM
---
`IUnknown` describes 2 areas of functionality: interface type coercion (`QueryInterface`) and object lifetime control (`AddRef` and `Release`).
### `QueryInterface()`

Microsoft defines some pseudo-mathematical identity rules which state in essence that, if you have a pointer to any interface on an object, you can always get a pointer to any other interface on that object, including `IUnknown`.  These are easiest to explain with a picture:

![image](/img/Pasted%20image%2020231127050818.png)

- _Reflexive_ means an interface can QueryInterface itself
- _Symmetric_ means if A can can QueryInterface B, then B can QueryInterface A
- _Transitive_ means that if A can QueryInterface B, and B can QueryInterface C, then A can QueryInterface C

(I'm not sure why all the formality, but every COM book seems to point this out.)

Another identity rule is that IUnknown must be unique.  However, this does not apply to other interfaces, which can be dynamically reallocated. The implication is that, to test if objects are the same, you need to QueryInterface to get the IUnknown pointer for each and compare those.
### `AddRef()` and `Release()`

1. Functions that return an interface pointer should call `AddRef()`
2. Functions that use an interface pointer provided by another function are responsible for calling `Release()`
3. If you copy an interface pointer, the best practice is to call `AddRef()` and `Release()`

---
# References

- [CoInitialize function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-coinitialize)
- [CoInitializeEx function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-coinitializeex)
- [CoUninitialize function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-couninitialize)
- [IUnknown - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iunknown)

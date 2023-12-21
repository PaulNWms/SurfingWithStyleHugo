---
title: IDispatch
description: 
date: 2023-12-17T07:58
keywords: 
draft: false
tags:
---
## Server side

To declare a dispatch interface in IDL, use `dispinterface`.  Not a best practice.

```IDL
[ uuid(10000001-0000-0000-0000-000000000001) ]
dispinterface ISum
{
properties:
    [id(1)] int x;
    [id(2)] int y;

methods:
    [id(3)] int Sum(int x, int y);
};
```

To declare a dual interface, use `interface` with a `dual`attribute - but notice the other changes.  Considered a best practice because... you might as well.  Most clients will use the custom interface.

```IDL
[ object, uuid(10000001-0000-0000-0000-000000000001),
  dual ]
interface ISum : IDispatch
{
    [id(1)] HRESULT Sum(int x, int y, [out, retval] int* retval);
}
```

## Client side



---
# References

- [IDispatch (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-idispatch)
- [IDispatchEx Interface | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/reference/idispatchex-interface)

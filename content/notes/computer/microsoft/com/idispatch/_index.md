---
title: IDispatch
description: 
date: 2023-12-17T07:58
keywords: 
draft: false
tags:
  - COM
---
The _IDispatch_ interface was defined so that a single, standard interface could be used by all components wanting to expose their functionality to interested clients. This interface, and the marshaling code built for it, are called [OLE automation](/notes/computer/microsoft/com/ole-automation).  _IDispatch_ and [COM VARIANT](/notes/computer/microsoft/com/com-variant)s are joined at the hip.  As you would expect, calling methods through `IDispatch` is slower than over the custom interface.

The proxy-stub code needed to marshal the _IDispatch_ interface is contained in the oleaut32.dll file; this is important because it means that applications implementing the _IDispatch_ interface don't have to provide their own marshaling code.

`IDispatchEx` extends `IDispatch`.  It was added so scripting languages could add and remove properties and methods at runtime.

By the way, _IDispatchEx_ is a good example of COM working the way it's supposed to.  If `QueryInterface(IID_IDispatchEx, ...)` returns `E_NOINTERFACE`, the object does not support adding items.
## Server side

To declare a dispatch interface in IDL, use `dispinterface`.  _Not a best practice._

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

The system provides helper functions (`Disp*`), see references.
## Client side



## Early vs. Late Binding

The client has 2 styles of calling.  If you use the interface as designed, it's called "late binding".  That means you call [IDispatch::GetIDsOfNames](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nf-oaidl-idispatch-getidsofnames), followed by [IDispatch::Invoke](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nf-oaidl-idispatch-invoke).  The DISPIDs can be optionally cached.

Early binding simply means that it gets the DISPID from the type library.  (If perf is really an issue, consider using the custom interface.)

---
# References

- [IDispatch (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-idispatch)
- [IDispatchEx Interface | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/reference/idispatchex-interface)
- [IDispatch::GetIDsOfNames (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nf-oaidl-idispatch-getidsofnames)
- [IDispatch::Invoke (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nf-oaidl-idispatch-invoke)
- [DispGetIDsOfNames function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-dispgetidsofnames)
- [DispInvoke function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-dispinvoke)
- [DispGetParam function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-dispgetparam)
- [DispCallFunc function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-dispcallfunc)
 

---
title: Events
date: 2023-09-21T05:29
draft: false
tags:
  - COM
parent: COM
---
## Publish/Subscribe

COM events support a N:M publish/subscribe model.  A connection point (source) can have multiple subscribers (1:M) and a listener (sink) can subscribe to multiple COM servers (N:1).

The protocol to subscribe to an event is formal and has several steps.

0) It is assumed that a user-defined callback interface has been registered on the system.  The sink implements this interface.
1) The sink calls QueryInterface on the source to get a pointer to [IConnectionPointContainer](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer).
2) The sink calls [IConnectionPointContainer::FindConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpointcontainer-findconnectionpoint) with the IID of the callback interface, and gets a pointer to the relevant [IConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint).
3) The sink calls [IConnectionPoint::Advise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-advise) to start receiving events.
4) (The source sends events to the sink's callback interface...)
5) To unsubscribe, the sink calls [IConnectionPoint::Unadvise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-unadvise) and calls Release on the IConnectionPoint and IConnectionPointContainer pointers.

The name _IConnectionPointContainer_ can be a little confusing, 'container' refers only to the fact that it contains connection points.  If you were embedding an ActiveX control in a window, the source would be the control and the sink would be the window.  Both interfaces are implemented by the source, i.e. the control.

In IDL, the connection point interfaces are tagged with `[source]` in the `coclass` section.  Note that these are dispatch interfaces.

```IDL
coclass AConnectableObject
{
	[default] interface IAConnectableObject; 
	[default, source] dispinterface 
		_IAConnectableObjectEvents;
	[source] dispinterface _IAConnectableObjectEvents2;
};|
```

Build the project to create the type library.  Then you can run the AppWizard.  The generated class header will have a COM map and a connection map, like this:
  
```C++
BEGIN_COM_MAP(CAConnectableObject)
    COM_INTERFACE_ENTRY(IAConnectableObject)
    COM_INTERFACE_ENTRY(IConnectionPointContainer)
    COM_INTERFACE_ENTRY_IMPL(IConnectionPointContainer)
END_COM_MAP()
BEGIN_CONNECTION_POINT_MAP(CAConnectableObject)
    CONNECTION_POINT_ENTRY(DIID__IAConnectableObjectEvents)
    CONNECTION_POINT_ENTRY(DIID__IAConnectableObjectEvents2)
END_CONNECTION_POINT_MAP()
```

On the sink side, the client implements a handler by deriving a class from [IDispatchImpl](https://learn.microsoft.com/en-us/cpp/atl/reference/idispatchimpl-class?view=msvc-170), which is a templated class.

```C++
struct CAtlMsgTrafficEventSink :
    public IDispEventImpl<1, 
        CAtlMsgTrafficEventSink,
        &DIID__IATLMsgTrafficCtlEvents,
        &LIBID_ATLMSGTRAFFICLib, 1, 0>
{
    ...
```

COM does not require that the sink has a dispatch interface, this is a limitation of ATL.
## Or, Just Pass The Pointer

But most of the time, the full-blown publish/subscribe model is overkill, and it's chatty at runtime.  If you just want to pass over a callback interface, use [IQuickActivate](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iquickactivate), which gets it done in a single call.  The source still implements IConnectionPoint.

This was designed for ActiveX, so the [QACONTAINER](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/ns-ocidl-qacontainer) parameter includes ambient properties of the containing window.

However, IQuickActivate is not supported by ATL.
## COM Interop

.NET components can be both [sources and sinks](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90)) of COM events (a.k.a. unmanaged events).

---
# References

- [IConnectionPointContainer (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer)
- [IConnectionPoint (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint)
- [IEnumConnectionPoints (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnectionpoints)
- [IQuickActivate (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iquickactivate)
- [IDispatchImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/idispatchimpl-class?view=msvc-170)
- [Managed and Unmanaged Events | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90))

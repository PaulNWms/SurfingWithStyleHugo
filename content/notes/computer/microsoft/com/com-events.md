---
title: Events
date: 2023-09-21T05:29
draft: false
tags:
  - COM
parent: COM
---
## Writ large:

The full IConnectionPoint protocol is too big to fit in your head.  You'll have to look in a COM book or docs.  For a single client to subscribe to a single connection point:

- The COM server implements _IConnectionPointContainer_ and _IConnectionPoint_.  A connection point is a source.
- The client is implements the sink.  The sink is a COM object.

![image](/img/Pasted%20image%2020231231095808.png)

## Publish/Subscribe

COM events support a N:M publish/subscribe model.  A connection point (source) can have multiple subscribers (1:M) and a listener (sink) can subscribe to multiple COM servers (N:1).

The protocol to subscribe to an event has several steps:

0) It is assumed that a user-defined callback interface has been registered on the system.  The sink implements this interface.
1) The client calls _QueryInterface_ on the source to get a pointer to [IConnectionPointContainer](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer).
2) The client calls [IConnectionPointContainer::FindConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpointcontainer-findconnectionpoint) with the IID of the callback interface, and gets a pointer to the relevant [IConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint).
3) The client calls [IConnectionPoint::Advise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-advise), passing in the _IUnknown_ of its sink object.
4) The server calls _QueryInterface_ on the the sink to get its interface pointer.
5) (The source sends events to the sink's callback interface...)
6) To unsubscribe, the sink calls [IConnectionPoint::Unadvise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-unadvise) and calls Release on the IConnectionPoint and IConnectionPointContainer pointers.

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

In many situations, the full-blown publish/subscribe model is overkill.  Also the setup is chatty if you've got an outproc server.  It's needed for compatibility with scripting clients, but there are other, simpler alternatives.  Consider [IDataObject](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-idataobject), [IAdviseSink](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-iadvisesink), and [IQuickActivate](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iquickactivate), which set up the connection in a single call.  It all depends on your use case.

With _IQuickActivate_, the source still implements IConnectionPoint.  It was designed for ActiveX, so the [QACONTAINER](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/ns-ocidl-qacontainer) parameter includes ambient properties of the containing window.  However, IQuickActivate is not supported by ATL.

## COM Interop

.NET components can be both [sources and sinks](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90)) of COM events (a.k.a. unmanaged events).


---
# References

- [IConnectionPointContainer (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer)
- [IConnectionPoint (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint)
- [IEnumConnectionPoints (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnectionpoints)
- [IEnumConnections (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnections)
- [IDataObject (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-idataobject)
- [IAdviseSink (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-iadvisesink)
- [IQuickActivate (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iquickactivate)
- [IDispatchImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/idispatchimpl-class?view=msvc-170)
- [Managed and Unmanaged Events | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90))

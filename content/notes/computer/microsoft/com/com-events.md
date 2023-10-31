---
title: Events
date: 2023-09-21T05:29
draft: false
tags:
  - "COM"
---
COM events support a N:M publish/subscribe model.  A connection point (source) can have multiple subscribers (1:M) and a listener (sink) can subscribe to multiple COM servers (N:1).

The protocol to subscribe to an event is formal and has several steps.

0) It is assumed that a user-defined callback interface has been registered on the system.  The sink implements this interface.
1) The sink calls QueryInterface on the source to get a pointer to [IConnectionPointContainer](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer).
2) The sink calls [IConnectionPointContainer::FindConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpointcontainer-findconnectionpoint) with the IID of the callback interface, and gets a pointer to the relevant [IConnectionPoint](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint).
3) The sink calls [IConnectionPoint::Advise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-advise) to start receiving events.
4) (The source sends events to the sink's callback interface...)
5) To unsubscribe, the sink calls [IConnectionPoint::Unadvise](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nf-ocidl-iconnectionpoint-unadvise) and calls Release on the IConnectionPoint and IConnectionPointContainer pointers.

.NET components can be both [sources and sinks](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90)) of COM events (a.k.a. unmanaged events).

---
# References

- [IConnectionPointContainer (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpointcontainer)
- [IConnectionPoint (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iconnectionpoint)
- [IEnumConnectionPoints (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnectionpoints)
- [Managed and Unmanaged Events | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/75s611wc(v=vs.90))

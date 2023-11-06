---
title: COM
date: 2023-09-21T05:29
draft: false
tags:
  - COM
---
To implement a COM class, you need to

- Write the the class, implementing [IUnknown](/notes/computer/microsoft/com/iunknown) correctly.
- Add [IDispatch](/notes/) (or a dual interface) if the object is to be available to a scripting environment.
- Write a class object (which implements [IClassFactory](/notes/) in most cases).
- Add a reference counting mechanism to the server.
- Add self-registration to the server:
    - Add the correct entry points if the server is a DLL: DllGetClassObject, DllCanUnloadNow, DllRegisterServer, and DllUnregisterServer.
    - Add calls to CoRegisterClassObject if the server is an EXE.

Because this is a lot of boilerplate and is also error prone, you'll want to use [ATL](/notes/computer/microsoft/com/atl).  Let the AppWizard do the heavy lifting for you.

Interfaces

- [IUnknown](/notes/computer/microsoft/com/iunknown)
- [InProc Server](/notes/computer/microsoft/com/apartment-models/inproc-server) ([IClassFactory](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iclassfactory))
- [OutProc Server](/notes/computer/microsoft/com/apartment-models/outproc-server)
- [Type Libraries](/notes/computer/microsoft/com/type-libraries)
- [Parameter Marshaling](/notes/computer/microsoft/com/parameter-marshaling)
- [IStream](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-istream), [ISequentialStream](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-isequentialstream)
- [IEnumXXX](/notes/computer/microsoft/com/ienumxxx)
- [Clipboard](/notes/computer/microsoft/com/clipboard)
- [Drag 'n Drop](/notes/computer/microsoft/com/drag-n-drop)
- [Persistence](/notes/computer/microsoft/com/persistence)
- [Other Interfaces](/notes/computer/microsoft/com/other-interfaces)
- [UI Automation - Win32 apps](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiauto-win32) (not to be confused with [UI Automation - .NET Framework](https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/ui-automation-overview))
- [Running Object Table (ROT)](/notes/computer/microsoft/com/running-object-table-rot)
- [COM Events](/notes/computer/microsoft/com/com-events) (not to be confused with [Event Objects](https://learn.microsoft.com/en-us/windows/win32/sync/event-objects), or various UI framework events)
- [Apartment Models](/notes/computer/microsoft/com/apartment-models)

---
# References

A large number of related types are part of  [OLE Automation ](https://learn.microsoft.com/en-us/windows/win32/api/_automat/), here are a few of the more common ones.

- [BSTR](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/automat/bstr)
- [Variant](/notes/computer/microsoft/com/variant)
- [SafeArray](/notes/computer/microsoft/com/safearray)
- [Registry](/notes/computer/microsoft/com/registry)

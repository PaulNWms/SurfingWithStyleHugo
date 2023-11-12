---
title: COM
date: 2023-09-21T05:29
draft: false
tags:
  - COM
  - ATL
---
## COM - It's Not Dead, It's Undead

Suppose you had a problem, and you solved by writing a COM server.  Now you have two problems.

- Implementing an [ActiveX](/notes/computer/microsoft/com/activex) control is often more complex than the business problem it solves.  Win32/COM development is system programming.
- You can't write it by hand.  Technically, you can, and this was the only option until [ATL](/notes/computer/microsoft/com/atl) came out.  AFAIK, nobody outside of Microsoft actually got it right.
- Even at that, you still have to have low-level understanding of COM's inner workings, as well as broad knowledge of all the interfaces.
- Registering a bunch of COM objects on your system written by different vendors will slow it down and make it unstable.
- DLL Hell.  This problem is not limited to COM, or even unmanaged code in general, but COM tends to amplify it.
    - For a long time there was a misconception that interface-based programming in itself would solve all our compatibility issues.  Nothing could be further from the truth.  An implementation can change quite a lot and still support the same interface.
    - COM amplifies this problem through aggregation.  As you load in more components behind the scenes, the odds of this happening increase.
- Good luck debugging.
- Just like the early internet protocols, COM was designed to be used in a trusted environment.  It's one giant security hole.

It does have its upsides though.

- Many common tools are automation clients, e.g. PowerShell can load in Windows Script Host.
- It's fast.
- Components written by Microsoft can mostly be trusted.
- [ATL](/notes/computer/microsoft/com/atl) helps you sidestep a lot of traps.
- Learning COM is a big part of understanding Windows.

It's not going anywhere.  WinRT uses COM heavily.

## The Basics

To implement a COM class, you need to

- Write the the class, implementing [IUnknown](/notes/computer/microsoft/com/activex/iunknown) correctly.
- Add [IDispatch](/notes/) (or a dual interface) if the object is to be available to a scripting environment.
- Write a class object (which implements [IClassFactory](/notes/) in most cases).
- Add a reference counting mechanism to the server.
- Add self-registration to the server:
    - Add the correct entry points if the server is a DLL: DllGetClassObject, DllCanUnloadNow, DllRegisterServer, and DllUnregisterServer.
    - Add calls to CoRegisterClassObject if the server is an EXE.

Because this is a lot of boilerplate and is also error prone, you'll want to use [ATL](/notes/computer/microsoft/com/atl).  Let the AppWizard do the heavy lifting for you.

## Interfaces

- [IUnknown](/notes/computer/microsoft/com/activex/iunknown)
- [InProc Server](/notes/computer/microsoft/com/apartment-models/inproc-server) ([IClassFactory](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iclassfactory))
- [OutProc Server](/notes/computer/microsoft/com/apartment-models/outproc-server)
- [Type Libraries](/notes/computer/microsoft/com/type-libraries)
- [Parameter Marshaling](/notes/computer/microsoft/com/atl/parameter-marshaling)
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
- [IInspectable](https://learn.microsoft.com/en-us/windows/win32/api/inspectable/nn-inspectable-iinspectable)

## Types

A large number of related types are part of  [OLE Automation ](https://learn.microsoft.com/en-us/windows/win32/api/_automat/), here are a few of the more common ones.

- [BSTR](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/automat/bstr)
- [Variant](/notes/computer/microsoft/com/variant)
- [SafeArray](/notes/computer/microsoft/com/safearray)
- [Registry](/notes/computer/microsoft/com/registry)

Most COM objects implement multiple interfaces statically, through multiple inheritance.  COM also supports [dynamic composition](/notes/computer/microsoft/com/dynamic-composition).

## COM Objects

These are (or were) some types of COM objects -

- [OLE custom control](/notes/computer/microsoft/com/activex/ole-custom-control)s
- [ActiveX](/notes/computer/microsoft/com/activex) controls
- MMC snap-ins

---
# References



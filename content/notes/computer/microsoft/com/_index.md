---
title: COM
date: 2023-09-21T05:29
draft: false
tags:
  - COM
  - ATL
description:
---

## TL;DR

- Writing a COM client is pretty easy, especially in .NET.
- Writing a COM server is hard.  Don't write a COM server.
    - (Unless it's in .NET, or ATL.)
    - COM development is best done in a VM.

COM is not dead, it's undead.  It's baked into Windows.  It will be with us always.
## Features?

COM is many things.

1. COM is way too big to fit in your head.
2. COM delivers the benefits of interfaces and portable binary files.
3. But, COM also introduces its own set of problems, lots of details, and tuning parameters.
4. Beware of [MINFU](/notes/computer/microsoft/com/minfu), which often makes the documentation difficult to digest.
## Classic COM Is Hard

The server side can be, anyway.  A COM _server_ has more moving parts than a helicopter.  Hand rolling a [COM ActiveX](/notes/computer/microsoft/com/com-activex) control using traditional C++/Win32 is often more complex than the business problem it was intended to solve.
- It requires low-level understanding of COM's inner workings, as well as broad knowledge of the interfaces.  In order to troubleshoot any of it, you have to understand pretty much all of it.
- DLL hell.  This problem is not unique to COM, but COM tends to accentuate it, particularly through aggregation.
- Good luck debugging.
- Just like the early internet protocols, COM was designed to be used in a trusted environment.  Security and licensing are not part of the core design.
- [DCOM](/notes/computer/microsoft/com/dcom) will not play nicely with your firewall or security team.

When originally released and throughout the '90s, the idea was that ISVs would publish libraries of COM components, and the task of software development would evolve into mainly connecting them all together, like Legos.  This didn't pan out.  Software is just plain complicated, and adding COM to your project does not make it any simpler.

It turns out that in order to use COM components, you have to completely trust their publisher, they have to be very well tested, and they must not break any other controls installed on the _target system_.  The end user generally does not understand what he's installing, and of course, the software vendor has no way of knowing what's on the target system.

## That being said...

There are use cases where COM is the right fit.

- Creating a COM _client_ is pretty straightforward.
- Windows has a number of [COM Support Features](/notes/computer/microsoft/com/com-support-features) and removing them would break everything.
- Communications with [InProc server](/notes/computer/microsoft/com/atl/inproc-server)s is fast.
- [ATL](/notes/computer/microsoft/com/atl) helps the situation a lot.
- [DotNet](/notes/computer/microsoft/com/dotnet) helps a lot more.  If performance is not a concern and you're not interested in the internals, a .NET COM server is pretty easy to create.
- Components written by Microsoft can be trusted.
- Modern COM supports [Assemblies](/notes/computer/microsoft/com/assemblies) to save you from DLL hell.
- Learning COM is a big part of understanding Windows.

[WinRT](/notes/) provides a large collection of system-provided COM objects.  It's a clean, well thought out API.  Again, COM is easy from the client side.  There are WinRT libraries for many popular languages, including C++, C#, and Rust.

COM will continue to haunt us for the foreseeable future - and possibly eternity.
## The Basics

To implement a COM class, you need to

- Write the the class, implementing [IUnknown](/notes/computer/microsoft/com/iunknown) correctly.
- Write a class object which implements [IClassFactory](/notes/computer/microsoft/com/iclassfactory), so it can be instantiated.
- Add [IDispatch](/notes/computer/microsoft/com/idispatch) (or a dual interface) if the object is to be available to a scripting environment.
- Add a reference counting mechanism to the server.
- Add self-registration to the server:
    - Add the correct entry points if the server is a DLL: DllGetClassObject, DllCanUnloadNow, DllRegisterServer, and DllUnregisterServer.
    - Add calls to CoRegisterClassObject if the server is an EXE.

Because this is a lot of boilerplate and is also error prone, you'll want to use [ATL](/notes/computer/microsoft/com/atl).  Let the AppWizard do the heavy lifting for you.

.NET is also your friend.

## Subtopics

- [IUnknown](/notes/computer/microsoft/com/iunknown)
- [InProc Server](/notes/computer/microsoft/com/atl/inproc-server) ([IClassFactory](https://learn.microsoft.com/en-us/windows/win32/api/unknwn/nn-unknwn-iclassfactory))
- [OutProc Server](/notes/computer/microsoft/com/outproc-server)
- [Type Information](/notes/computer/microsoft/com/type-information)
- [Parameter Marshaling](/notes/computer/microsoft/com/atl/parameter-marshaling)
- [Error Handling](/notes/computer/microsoft/com/error-handling)
- [OLE Automation](/notes/computer/microsoft/com/ole-automation)
- [IStream](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-istream), [ISequentialStream](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-isequentialstream)
- [IEnumXXX](/notes/computer/microsoft/com/ienumxxx)
- [Clipboard](/notes/computer/microsoft/com/clipboard)
- [Drag 'n Drop](/notes/computer/microsoft/com/drag-n-drop)
- [Structured Storage](/notes/computer/microsoft/com/structured-storage) and [[Persistence]
- [Other Interfaces](/notes/computer/microsoft/com/other-interfaces)
- [IMoniker](/notes/computer/microsoft/com/imoniker) and the [Running Object Table (ROT)](/notes/computer/microsoft/com/running-object-table-rot)
- [COM Events](/notes/computer/microsoft/com/com-events) (not to be confused with [event objects](https://learn.microsoft.com/en-us/windows/win32/sync/event-objects), or various UI framework events)
- [COM Apartment Models](/notes/computer/microsoft/com/com-apartment-models)
- [Component Categories](/notes/computer/microsoft/com/component-categories)
- [SCM](/notes/computer/microsoft/com/scm)
- [Persistence](/notes/computer/microsoft/com/persistence)
## Types

A large number of related types are part of  [OLE automation ](https://learn.microsoft.com/en-us/windows/win32/api/_automat/), here are a few of the more common ones.

- [BSTR](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/automat/bstr)
- [COM VARIANT](/notes/computer/microsoft/com/com-variant)
- [SafeArray](/notes/computer/microsoft/com/safearray)
- [Registry](/notes/computer/microsoft/com/registry)

Most COM objects implement multiple interfaces statically, through multiple inheritance.  COM also supports [dynamic composition](/notes/computer/microsoft/com/dynamic-composition).

Interfaces and user-defined types can be defined in [Type Information](/notes/computer/microsoft/com/type-information).

## [COM+](/notes/computer/microsoft/com/com-plus)

There are (or were) several types of [COM+ objects](/notes/computer/microsoft/com/com-plus-objects) supported by the AppWizard.

## [WSH](/notes/computer/microsoft/com/wsh) Runtime Library

Windows Scripting Host (WSH) is an administrative API accessible from scripting languages like VB6, JScript and PowerShell.
## [WinRT](/notes/)

As mentioned before, for new project development, WinRT is your friend.

---
# References



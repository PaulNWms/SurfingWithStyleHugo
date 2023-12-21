---
title: COM
date: 2023-09-21T05:29
draft: false
tags:
  - COM
  - ATL
description:
---
## COM - It's Not Dead, It's Undead

Most software falls into one of three categories - alive (like .NET Core), done (like .NET Framework), or dead (like Internet Explorer).  COM is all three at once.  ActiveX is dead, Drag 'n Drop is done, and new interfaces pop up occasionally, like [IInspectable](/notes/).  There are a lot of COM zombies running on your system right now.

**Note:** [WinRT](/notes/) is based on COM, and solves most of the problems of 'classic' COM.

Suppose you had a problem, and you solved it by writing a COM server.  Now you have two problems.

- Implementing an [ActiveX](/notes/computer/microsoft/com/activex) control is often more complex than the business problem it is intended to solve.  Win32/COM development is really system programming.
- You can't write it by hand.  Technically, you can, and that was the only option until [ATL](/notes/computer/microsoft/com/atl) came out.  AFAIK, nobody outside of Microsoft actually got it right.
- It requires low-level understanding of COM's inner workings, as well as broad knowledge of the interfaces.  In order to troubleshoot _any_ of it, you have to understand _all_ of it.
- DLL hell.  This problem is not unique to COM, or even unmanaged code, but COM tends to accentuate it.
    - For a long time there was a misconception that interface-based programming would, in itself, solve all our compatibility issues.  It doesn't.  An implementation can change quite a lot and still support the same interface.  Two subtle causes of breaking changes are changing the order of operations and changing default settings.
    - Installing a custom control makes it global to the system, whether you want it to be or not.  Registering a bunch of COM objects on your system written by different vendors will slow down the boot time and make it unstable.  ([WinRT](/notes/) and DirectX take a different approach.)
    - COM amplifies this problem through aggregation.  When you load in a COM object, it may in turn load in more components behind the scenes, increasing the odds of this happening.
- Good luck debugging.
- Just like the early internet protocols, COM was designed to be used in a trusted environment.  Security and licensing are not part of the core design.
- [DCOM](/notes/computer/microsoft/com/dcom) will not play nicely with your firewall or security team.

When originally released and throughout the '90s, the idea was that ISVs would publish libraries of COM components, and the task of software development would evolve into mainly connecting them all together, like Legos.  This didn't pan out.  Software is just plain complicated, and adding COM to your project does not make it any simpler.

It turns out that in order to use COM components, you have to completely trust their publisher, they have to be very well tested, and they must not break any other controls installed on the _target system_.  Ideally, you would also have access to their source code.
## That being said...

COM does have its upsides though, and in certain environments, these requirements can be met.  One such place is at Microsoft itself.  If you treat COM objects as extensions to the OS, it can be thought of as a systems programming tool.

Also, creating a COM _client_ is pretty simple.  Ever since .NET came into being, the guidance has been something like, leave the COM server development to MS, but feel free to use it as a client.

- Removing COM from Windows would break a lot of stuff.
- Communications with [InProc server](/notes/computer/microsoft/com/apartment-models/inproc-server)s is fast.
- .NET supports access as a client.  Many common tools are automation clients, e.g. PowerShell can load in Windows Script Host.
- Components written by Microsoft can mostly be trusted.
- Learning COM is a big part of understanding Windows.
- [ATL](/notes/computer/microsoft/com/atl) helps you sidestep a lot of traps.

[WinRT](/notes/) provides a large collection of system-provided COM objects.  It's a clean, well thought out API.  Again, COM is easy when you're the client.  There are WinRT libraries for many popular languages, including C++, C#, and Rust.

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

## Interfaces

- [IUnknown](/notes/computer/microsoft/com/iunknown)
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
- [Running Object Table (ROT)](/notes/computer/microsoft/com/running-object-table-rot)
- [COM Events](/notes/computer/microsoft/com/com-events) (not to be confused with [event objects](https://learn.microsoft.com/en-us/windows/win32/sync/event-objects), or various UI framework events)
- [Apartment Models](/notes/computer/microsoft/com/apartment-models)
## Types

A large number of related types are part of  [OLE automation ](https://learn.microsoft.com/en-us/windows/win32/api/_automat/), here are a few of the more common ones.

- [BSTR](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/automat/bstr)
- [Variant](/notes/computer/microsoft/com/variant)
- [SafeArray](/notes/computer/microsoft/com/safearray)
- [Registry](/notes/computer/microsoft/com/registry)

Most COM objects implement multiple interfaces statically, through multiple inheritance.  COM also supports [dynamic composition](/notes/computer/microsoft/com/dynamic-composition).

Interfaces and user-defined types can be defined in [type libraries](/notes/computer/microsoft/com/type-libraries).
## [COM+](/notes/computer/microsoft/com/com-plus)

There are (or were) several types of [COM+ objects](/notes/computer/microsoft/com/com-plus-objects) supported by the AppWizard.

## [WinRT](/notes/)

As mentioned before, for new project development, WinRT is your friend.

---
# References



---
title: COM
date: 2023-09-21T05:29
draft: false
tags:
  - COM
  - ATL
---
## COM - It's Not Dead, It's Undead

Most software falls into one of three categories - alive (like .NET Core), done (like .NET Framework), or dead (like Internet Explorer).  COM is all three at once.  ActiveX is dead, Drag 'n Drop is done, and new interfaces are being developed all the time, like IInspectable.  There are a lot of COM zombies running on your system right now.

Suppose you had a problem, and you solved by writing a COM server.  Now you have two problems.

- Implementing an [ActiveX](/notes/computer/microsoft/com/activex) control is often more complex than the business problem it is intended to solve.  Win32/COM development is system programming.
- You can't write it by hand.  Technically, you can, and this was the only option until [ATL](/notes/computer/microsoft/com/atl) came out.  AFAIK, nobody outside of Microsoft actually got it right.
- Low-level understanding of COM's inner workings, as well as broad knowledge of all the interfaces.
- Registering a bunch of COM objects on your system written by different vendors will slow it down and make it unstable.
- DLL hell.  This problem is not limited to COM, or even unmanaged code in general, but COM tends to accentuate it.
    - For a long time there was a misconception that interface-based programming would, in itself, solve all our compatibility issues.  Nothing could be further from the truth.  An implementation can change quite a lot, in incompatible ways, and still support the same interface.  Two subtle causes of breaking changes are changing the order of operations and changing default settings.
    - COM amplifies this problem through aggregation.  When you load in a COM object, it may in turn load in more components behind the scenes, increasing the odds of this happening.
- Good luck debugging.
- Just like the early internet protocols, COM was designed to be used in a trusted environment.  It's one giant security hole.

When originally released, the idea was that ISVs would publish libraries of COM components, and the task of software development would evolve into mainly connecting them all together, like Legos.  This didn't pan out.  Software is just plain complicated, and adding COM to your project does not make it any simpler.

It turns out that in order to use COM components, you have to completely trust their publisher, they have to be very well tested, and they must not break any other controls installed on the _target system_.  Ideally you would also have access to their source code.

COM does have its upsides though, and in certain environments, these requirements can be met.  One such place is at Microsoft itself.  Also, creating a COM _client_ is pretty simple.  So the guidance for probably the last 20 years has been something like, leave the COM server development to MS, but feel free to use it as a client.

- COM is fast.
- Removing it would break a lot of stuff.
- .NET supports access as a client.  Many common tools are automation clients, e.g. PowerShell can load in Windows Script Host.
- Components written by Microsoft can mostly be trusted.
- Learning COM is a big part of understanding Windows.  For home projects, [ATL](/notes/computer/microsoft/com/atl) helps you sidestep a lot of traps.

In summary, COM is not going anywhere.
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
- [Running Object Table (ROT)](/notes/computer/microsoft/com/running-object-table-rot)
- [COM Events](/notes/computer/microsoft/com/com-events) (not to be confused with [Event Objects](https://learn.microsoft.com/en-us/windows/win32/sync/event-objects), or various UI framework events)
- [Apartment Models](/notes/computer/microsoft/com/apartment-models)

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



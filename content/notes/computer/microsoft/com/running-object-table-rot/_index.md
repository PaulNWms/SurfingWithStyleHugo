---
title: Runnng Object Table (ROT)
date: 2023-09-18T20:52
draft: false
tags:
  - "#COM"
parent: COM
---
The ROT is a system-wide table that keeps track of COM objects that are in use.  The interface to the ROT is COM-based.  Use the Win32 function [GetRunningObjectTable](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-getrunningobjecttable) to get an [IRunningObjectTable](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-irunningobjecttable) object pointer.

The ROT contains _monikers_ that identify COM objects.  Similar to how COM classes are identified by a CLSID, which is a GUID in the registry, COM objects are identified by a moniker, which is a system object that implements [IMoniker](/notes/computer/microsoft/com/imoniker) in the ROT.  There is a moniker for every entry in the ROT.

Monikers can be used to get their corresponding COM object using [CoGetObject](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetobject).  CoGetObject takes a string argument, that can either be
- the full path to a file.
- a string of the form `@ProgID:Parameters`, where the parameters are a free form string that is interpreted by the moniker.

In the second option, one possibility for passing parameters would be to use the query part of an HTTP GET URL.  The pattern is to implement [IParseDisplayName](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iparsedisplayname) in the moniker's factory class. In [ParseDisplayName](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nf-oleidl-iparsedisplayname-parsedisplayname), split the string and save off the parameters in the moniker object.  In turn, the moniker can use this to initialize the COM object.

Microsoft used to provide a tool called IRotView.exe for browsing the ROT table, but this seems to be out of support.

---
# References

[GetRunningObjectTable function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-getrunningobjecttable)
[IRunningObjectTable (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-irunningobjecttable)
[IMoniker (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-imoniker)
[IEnumMoniker (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienummoniker)
[IBindCtx (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ibindctx)
[CoGetObject function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetobject)
[IParseDisplayName (oleidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iparsedisplayname)

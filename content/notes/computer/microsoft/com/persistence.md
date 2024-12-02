---
title: Persistence
date: 2023-09-04T10:51-0800
draft: false
tags:
  - "#COM"
parent: COM
---
Persistence is achieved by implementing [IPersistStorage](https://learn.microsoft.com/en-us/windows/desktop/api/objidl/nn-objidl-ipersiststorage), [IPersistStream](https://learn.microsoft.com/en-us/windows/desktop/api/objidl/nn-objidl-ipersiststream), or [IPersistFile](https://learn.microsoft.com/en-us/windows/desktop/api/objidl/nn-objidl-ipersistfile).  These all derive from [IPersist](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ipersist).

Windows is file-based, so the most common of these is _IPersistFile_.  Typical API usage is asymmetric.  Call [IPersistFile::Save](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nf-objidl-ipersistfile-save) to save the object, but to load an object, most often you'd use [CoGetInstanceFromFile](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetinstancefromfile).  This in turn will call [IPersistFile::Load](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nf-objidl-ipersistfile-load).  It returns an array of [MULTI_QI](https://learn.microsoft.com/en-us/windows/win32/api/objidl/ns-objidl-multi_qi) objects.

Internally, CoGetInstanceFromFile calls [GetClassFile](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-getclassfile) to look up the CLSID from the file name.

---
# References

- [IPersist (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ipersist)
- [IPersistStream (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ipersiststream)
- [IPersistStreamInit (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ipersiststreaminit)
- [IPersistMemory interface (Internet Explorer) | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa768210(v=vs.85))
- [IPersistStorage (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ipersiststorage)
- [IPersistFile (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ipersistfile)
- [IPersistPropertyBag - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ipersistpropertybag)
- [IPersistMoniker interface (Windows) | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms775042(v=vs.85))
- [IPersistHistory interface (Internet Explorer) | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa768215(v=vs.85))
- [CreateStreamOnHGlobal function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-createstreamonhglobal)
- [OleSaveToStream function (ole.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole/nf-ole-olesavetostream)
- [OleLoadFromStream function (ole.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole/nf-ole-oleloadfromstream)
- [CoGetInstanceFromFile function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetinstancefromfile)
- [CoGetObject function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetobject)
- [MULTI_QI (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/ns-objidl-multi_qi)
- [ISequentialStream (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-isequentialstream)
- [IStream (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-istream)
- [IStorage (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-istorage)
- [IPropertySetStorage (propidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/propidl/nn-propidl-ipropertysetstorage)
- [IPropertyStorage (propidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/propidl/nn-propidl-ipropertystorage)


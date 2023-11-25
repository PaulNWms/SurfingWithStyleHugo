---
title: IEnumXXX
date: 2023-08-12T12:26-0800
draft: false
tags:
  - "#COM"
  - ATL
parent: COM
---

COM enumerators implement `Reset()`, `Next()`, `Skip()` and `Clone()`.  Here's the client side:

```C++
    // initialize COM libraries
    HRESULT hr = OleInitialize ((LPVOID) 0);

    // retrieve contents of clipboard
    IDataObject * pIDataObject;
    hr = OleGetClipboard (& pIDataObject);

    // retrieve a FORMATETC enumerator
    IEnumFORMATETC * pIEnumFORMATETC;
    hr = pIDataObject -> EnumFormatEtc (DATADIR_GET, & pIEnumFORMATETC);

    // enumerate all FORMATETCs supported by this data object
    FORMATETC fe;
    while ((pIEnumFORMATETC -> Next (1, & fe, (ULONG *) 0)) == S_OK)
    {
        CLIPFORMAT cfFormat = fe.cfFormat;
        if (cfFormat < CF_MAX) {
            ODS1 ("[Clipboard]\tgot format %s\n", rszClipboardNames [cfFormat]);
        }
        else {
            ODS1 ("[Clipboard]\tunknown clipboard format %d\n", cfFormat);
        }
    }

    // release enumerator object
    hr = pIEnumFORMATETC -> Release ();
```

ATL has a number of classes to support enumeration on the server side.  To create a collection that can be consumed like in the code above, [CComEnum](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenum-class?view=msvc-170) and [CComEnumImpl](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenumimpl-class?view=msvc-170) are classes of interest.

ATL also has support for loading a COM collection into a C++ STL vector, e.g. `std:vector<IThing*>`, which is kind of a neat trick.  See [CComEnumOnSTL](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenumonstl-class?view=msvc-170) and [IEnumOnSTLImpl](https://learn.microsoft.com/en-us/cpp/atl/reference/ienumonstlimpl-class?view=msvc-170)

---
# References

- [IEnumConnectionPoints (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnectionpoints)
- [IEnumFORMATETC (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienumformatetc)
- [IEnumGUID (comcat.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-ienumguid)
- [IEnumMoniker (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienummoniker)
- [CComEnum Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenum-class?view=msvc-170)
- [CComEnumImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenumimpl-class?view=msvc-170)
- [CComEnumOnSTL Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomenumonstl-class?view=msvc-170)
- [IEnumOnSTLImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ienumonstlimpl-class?view=msvc-170)


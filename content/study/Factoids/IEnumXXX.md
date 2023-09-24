---
title: "IEnumXXX"
date: 2023-08-12T12:26-0800
draft: true
tags: #COM
---

COM enumerators implement `Reset()`, `Next()`, `Skip()` and `Clone()`.

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

---
# References

[IEnumConnectionPoints (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ienumconnectionpoints)
[IEnumFORMATETC (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienumformatetc)
[IEnumGUID (comcat.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-ienumguid)
[IEnumMoniker (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienummoniker)


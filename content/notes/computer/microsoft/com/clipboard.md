---
title: Clipboard
date: 2023-08-09T22:03-0800
draft: false
tags:
  - "#COM"
  - "#OLE"
parent: COM
---
- [OleGetClipboard function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-olegetclipboard)
- [OleIsCurrentClipboard function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-oleiscurrentclipboard)

```C++
void PrintClipboardContents() {
    IDataObject* pDataObject = nullptr;
    HRESULT hr = OleGetClipboard(&pDataObject);
    if (SUCCEEDED(hr)) {
        FORMATETC fmtetc = { CF_UNICODETEXT, nullptr, DVASPECT_CONTENT, -1, TYMED_HGLOBAL };
        if (OleIsCurrentClipboard(pDataObject)) {
            STGMEDIUM stgmedium;

            // Retrieve the data
            hr = pDataObject->GetData(&fmtetc, &stgmedium);
            if (SUCCEEDED(hr)) {
                wchar_t* data = static_cast<wchar_t*>(GlobalLock(stgmedium.hGlobal));
                if (data != nullptr) {
                    std::wcout << L"Clipboard Contents:" << std::endl;
                    std::wcout << data << std::endl;
                    GlobalUnlock(stgmedium.hGlobal);
                }
                ReleaseStgMedium(&stgmedium);
            }
        }
        pDataObject->Release();
    }
}
```

# Write to Clipboard

- [OleSetClipboard function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-olesetclipboard)
- [OleFlushClipboard function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-oleflushclipboard)

Alternatively, you can use the clipboard API

- [OpenClipboard function (winuser.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-openclipboard)
- [EmptyClipboard function (winuser.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-emptyclipboard)
- [SetClipboardData function (winuser.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setclipboarddata)
- [CloseClipboard function (winuser.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-closeclipboard)

---
# References

- [OleInitialize function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-oleinitialize)
- [OleUninitialize function (ole2.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ole2/nf-ole2-oleuninitialize)
- [FORMATETC (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/ns-objidl-formatetc)
- [IEnumFORMATETC (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-ienumformatetc)

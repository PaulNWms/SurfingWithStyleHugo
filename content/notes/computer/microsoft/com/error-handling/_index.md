---
title: Error Handling
description: 
date: 2023-12-29T13:50:00Z
keywords: 
draft: false
tags:
  - COM
---
Almost all COM functions return an [HRESULT](/notes/computer/microsoft/com/error-handling/hresult).  If it's other than S_OK, the question then becomes, how to handle it.

In the Win32, a system may return 'error' (see docs).  If you want additional info, call [GetLastError](https://learn.microsoft.com/en-us/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror) to get a system error code, and then call [FormatMessage](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-formatmessage)

The COM equivalent is similar, but COM-based.  (Things are a little different over [IDispatch](/notes/computer/microsoft/com/idispatch)).

## Server

The server implements [ISupportErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-isupporterrorinfo) to let clients know that it supports error info for a given interface.  Then it uses [ICreateErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreateerrorinfo) to create a new [IErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-ierrorinfo) object.  The it calls the Win32 [SetErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-seterrorinfo).

## Client side

The client calls [ISupportErrorInfo::InterfaceSupportsErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nf-oaidl-isupporterrorinfo-interfacesupportserrorinfo) to see if the server supports it, then calls [GetErrorInfo](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-geterrorinfo).

In practice, the [`_com_error` class](https://learn.microsoft.com/en-us/cpp/cpp/com-error-class?view=msvc-170) wraps this.  Here's the pattern:

```C++
#include <comdef.h>  // Declares _com_error

inline void throw_if_fail(HRESULT hr)
{
    if (FAILED(hr))
    {
        throw _com_error(hr);
    }
}

void ShowDialog()
{
    try
    {
        CComPtr<IFileOpenDialog> pFileOpen;
        throw_if_fail(CoCreateInstance(__uuidof(FileOpenDialog), NULL, 
            CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&pFileOpen)));

        throw_if_fail(pFileOpen->Show(NULL));

        CComPtr<IShellItem> pItem;
        throw_if_fail(pFileOpen->GetResult(&pItem));

        // Use pItem (not shown).
    }
    catch (_com_error err)
    {
        // Handle error.
    }
}
```

---
# References

- [GetLastError function (errhandlingapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror)
- [FormatMessage function (winbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-formatmessage)
- [ISupportErrorInfo (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-isupporterrorinfo)
- [ICreateErrorInfo (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreateerrorinfo)
- [IErrorInfo (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-ierrorinfo)
- [SetErrorInfo function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-seterrorinfo)
- [GetErrorInfo function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-geterrorinfo)
- [`_com_error` Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/com-error-class?view=msvc-170)
- [Error Handling in COM (Get Started with Win32 and C++) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/learnwin32/error-handling-in-com#throw-on-fail)
- [Handling Errors in COM+ - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/cossdk/handling-errors-in-com-)

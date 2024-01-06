---
title: HRESULT
description: 
date: 2023-12-29T13:54
keywords: 
draft: false
tags:
  - COM
  - DotNet
---
Most COM function return an HRESULT.  An HRESULT has [3 fields](https://learn.microsoft.com/en-us/windows/win32/com/structure-of-com-error-codes): an SCODE (the high bit), an MS-defined Facility, and the application-defined code.  

## Helper macros:

- `HRESULT_SEVERITY`, `SUCCEEDED`, `FAILED`, `IS_ERROR`
- `HRESULT_FACILITY` and `HRESULT_CODE`
- `MAKE_HRESULT`

## Win32 support:

[FormatMessage](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-formatmessage) can get strings from all the system HRESULTs, but it's a little messy.  Here's a wrapper.

```C
void ErrorMessage(char* szMessage, HRESULT hr)
{
    if(HRESULT_FACILITY(hr) == FACILITY_WINDOWS)
        hr = HRESULT_CODE(hr);

    char* szError;
    if(FormatMessage(FORMAT_MESSAGE_ALLOCATE_BUFFER\|
        FORMAT_MESSAGE_FROM_SYSTEM, NULL, hr, 
        MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT), 
        (LPTSTR)&szError, 0, NULL) != 0)
    {
        printf("%s: (%0x) %s", szMessage, hr, szError);
        LocalFree(szError);
    }
    else
        printf("Error number not found\n");
}
```

## .NET interop

Many .NET exceptions map to HRESULTS.

---
# References

- [Error Codes in COM - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/learnwin32/error-codes-in-com)
- [Structure of COM Error Codes - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/com/structure-of-com-error-codes)
- [FormatMessage function (winbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-formatmessage)
- [How to: Map HRESULTs and Exceptions - .NET Framework | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/framework/interop/how-to-map-hresults-and-exceptions)

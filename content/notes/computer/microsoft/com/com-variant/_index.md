---
title: COM VARIANT
date: 2023-09-02T19:05:00-08:00
draft: false
tags:
  - "#COM"
parent: COM
---
Loosely speaking, a [VARIANT](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/ns-oaidl-variant) is the COM equivalent of a C union.  The data type is held in a [VARENUM](https://learn.microsoft.com/en-us/windows/win32/api/wtypes/ne-wtypes-varenum) field and the data value is in a union of COM-compatible data types.

In practice, you probably want to interact with an [ATL CComVariant](/notes/computer/microsoft/com/atl/atl-ccomvariant).

---
# References

- [VARIANT (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/ns-oaidl-variant)
- [CComVariant class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomvariant-class?view=msvc-170)

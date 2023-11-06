---
title: ATL
description: 
date: 2023-11-02T06:18
keywords: 
draft: false
tags:
  - COM
  - ATL
---
## COM Clients

ATL has some wrapper classes to help simplify COM clients.  Here are some common ones:

| C type | ATL class | runtime type |
|---|---|---|
| void * | [CComPtr](/notes/computer/microsoft/com/atl/ccomptr) | `_com_ptr_t` |
| BSTR | [CComBSTR](/notes/computer/microsoft/com/atl/ccombstr) | `_bstr_t` |
| VARIANT | [CComVariant](/notes/computer/microsoft/com/atl/ccomvariant) | `_variant_t` |
| IDispatch | [CComDispatchDriver](/notes/computer/microsoft/com/atl/ccomdispatchdriver) | |

The ATL classes are in atl.dll, the runtime types are compiler COM support extensions in comsuppw.lib.

The main difference in usage is that the ATL classes return error codes and the runtime types throw [_com_error](/notes/computer/microsoft/com/atl/_com_error) exceptions.  Typically the runtime types are used in clients and the ATL classes are used in servers, because you have to be more careful about throwing exceptions.

## COM Servers

The COM server is mostly set up when you run AppWizard.  This code contains self-registration, server activation logic, lifetime management logic, IDL, a COM object map, etc.

There are quite a lot of wrapper classes involved, but you don't need to understand this machinery to use it.  Look but don't touch.

These are some flags to consider when setting up a COM server:

| Flag | Effect |
|---|---|
| `_ATL_MIN_CRT` | Dynamically link to msvcrt.dll |
| `_UNICODE` | You'll probably want this |
| `_DEBUG`, `NDEBUG`  | Debug or not |
| `_ATL_DLL`, `_ATL_STATIC_REGISTRY` | Dynamically link to the registration code in atl.dll, or put it in the server |
| `_MERGE_PROXYSTUB` | For [InProc server](/notes/computer/microsoft/com/apartment-models/inproc-server)s, place the [[parameter marshaling]] code in the server DLL |

Use the AppWizard again to add COM objects to the server.  Right click project | Add | New Item... | ATL Object.  It will automatically update the IDL and object map.

## COM Objects

To add methods and variables to the objects, right click project | Class Wizard.  After that, each method must also be added to the IDL manually.

ATL has several facilities to support COM objects.  They can be grouped into these areas:

- [ATL Critical Sections](/notes/computer/microsoft/com/atl/atl-critical-sections)
- [ATL Threading Model](/notes/computer/microsoft/com/atl/atl-threading-model)
- [CComObject](/notes/computer/microsoft/com/atl/ccomobject)
- [ATL COM Map](/notes/computer/microsoft/com/atl/atl-com-map)
- [IDispatchImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/idispatchimpl-class?view=msvc-170)
- [ATL Debug Flags](/notes/computer/microsoft/com/atl/atl-debug-flags)

---
# References

- [Compiler COM Support | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/compiler-com-support?view=msvc-170)
- [IDispatchImpl Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/idispatchimpl-class?view=msvc-170)
- [ATL Wizards and Dialog Boxes | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/atl-wizards-and-dialog-boxes?view=msvc-170)

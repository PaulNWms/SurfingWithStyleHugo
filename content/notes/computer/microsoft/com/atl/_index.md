---
title: ATL
description: 
date: 2023-11-02T06:18
keywords: 
draft: false
tags:
  - COM
---
## COM Clients

ATL has several wrapper classes to help simplify COM clients.  Here are some common ones:

| C type | ATL class | runtime type |
|---|---|---|
| void * | [CComPtr](/notes/computer/microsoft/com/atl/ccomptr) | `_com_ptr_t` |
| BSTR | [CComBSTR](/notes/computer/microsoft/com/atl/ccombstr) | `_bstr_t` |
| VARIANT | [CComVariant](/notes/computer/microsoft/com/atl/ccomvariant) | `_variant_t` |
| IDispatch | [CComDispatchDriver](/notes/computer/microsoft/com/atl/ccomdispatchdriver) | |

The ATL classes are in atl.dll, the runtime types are compiler COM support extensions in comsuppw.lib.

The main difference in usage is that the ATL classes return error codes and the runtime types throw [_com_error](/notes/computer/microsoft/com/atl/_com_error) exceptions.  Typically the runtime types are used in clients and the ATL classes are used in servers, where you have to be more careful about throwing exceptions.

## COM Servers

These are some flags to consider when running the AppWizard to set up a COM server.

| Flag | Effect |
|---|---|
| `_ATL_MIN_CRT` | Dynamically link to msvcrt.dll |
| `_UNICODE` | You'll probably want this |
| `_DEBUG`, `NDEBUG`  | Debug or not |
| `_ATL_DLL`, `_ATL_STATIC_REGISTRY` | Dynamically link to the registration code in atl.dll, or put it in the server |
| `_MERGE_PROXYSTUB` | For [InProc server](/notes/computer/microsoft/com/apartment-models/inproc-server)s, place the [[parameter marshaling]] code in the server DLL |

---
# References

[Compiler COM Support | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/compiler-com-support?view=msvc-170)

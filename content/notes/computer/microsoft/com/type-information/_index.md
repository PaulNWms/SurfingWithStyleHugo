---
title: Type Information
date: 2023-09-02T18:24:00-08:00
draft: false
tags:
  - "#COM"
parent: COM
---
If you think of COM in C++ terms, a 'class' is like a ProgID, but a client still needs something analogous to a header file to consume it (if you ignore _IDispatch_).  There are multiple solutions to this.

Type libraries are specified in [Interface Definition Language (IDL)](https://learn.microsoft.com/en-us/windows/win32/rpc/the-interface-definition-language-idl-file) and created using the [MIDL compiler](https://learn.microsoft.com/en-us/windows/win32/midl/using-the-midl-compiler-2).  This is a deep subject that most of us don't need to know very much about.

The MIDL compiler is invoked on the command line.  Behind the scenes, it calls [CreateTypeLib2](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-createtypelib2) and does most of its work through subsequent calls on [ICreateTypeLib2](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypelib2) and [ICreateTypeInfo2](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypeinfo2).

A client can inspect an existing type library by calling [LoadTypeLibEx](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-loadtypelibex) and making calls on [ITypeLib2](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypelib2) and [ITypeInfo2](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypeinfo2), and navigating the deeply nested return values.

The type library may be identified by a LIBID in the [registry](/notes/computer/microsoft/com/registry), or the class may implement [IProvideClassInfo2](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iprovideclassinfo2)
## Variations

- The full solution is to have a COM server and a separate typelib DLL.  Both have entries in the registry.
- A slight optimization - both are housed in the same binary.  Both still have entries in the registry.
- Use [OLE automation](/notes/computer/microsoft/com/ole-automation) with late binding and accept the runtime penalty.  Only the server is registered.

## Alternatives

'Classic' COM uses the registry, which is not a best practice because it's system-wide.  Other solutions include

- [Reg-free COM](https://learn.microsoft.com/en-us/dotnet/framework/interop/registration-free-com-interop) is an XML manifest.
- .WinMD files were introduced in [WinRT](/notes/), which contain .NET header information.  They can be read with ILDASM.

These files can be included with your project, to avoid the registry entirely.

## Ignore

Compilers actually use [ITypeComp](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypecomp) to grab all the info fast and throw it into an internal table.

---
# References

- [MIDL Language Reference - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/midl/midl-language-reference)
- [CreateTypeLib2 function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-createtypelib2)
- [ICreateTypeLib2 (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypelib2)
- [ICreateTypeInfo2 (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-icreatetypeinfo2)
- [ITypeLib2 (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypelib2)
- [ITypeInfo2 (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypeinfo2)
- [IProvideClassInfo2 (ocidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iprovideclassinfo2)
- [LoadTypeLibEx function (oleauto.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-loadtypelibex)
- [Registration-Free COM Interop - .NET Framework | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/framework/interop/registration-free-com-interop)
- [WindowsRuntimeMetadata Class (System.Runtime.InteropServices.WindowsRuntime) | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.windowsruntime.windowsruntimemetadata?view=netframework-4.8.1)
- [ITypeComp (oaidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-itypecomp)

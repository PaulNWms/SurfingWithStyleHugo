---
title: "DotNet"
date: 2020-06-17
---
# .NET

Code Access Security (CAS) sandboxes code.

The Common Language Infrastructure (CLI) is an ECMA standard that specifies the runtime infrastructure.

The CLI defines the Virtual Execution System (VES), the Common Intermediate Language (IL), metadata and file format.

The Common Type System (CTS) defines types available to CLI-compliant languages.

The Common Language Specification (CLS) is a subset of CTS types that are guaranteed to be compatible across languages.

The BCL is CLS-compliant.

The lowest level of deployment granularity is the module.

An assembly is composed of one or more modules.

The Windows Runtime (WinRT) uses the same metadata file format (.winmd) as .NET assemblies.

PEVerify checks whether code is type safe.

A finalizer is often used to clean up native resources that object instances hold on to.

An indexer is a special property that allows access on an object instance as if it were an array.

CLS rules only apply to those parts of a type that are visible outside of the defining assembly.

PE/COFF stands for Portable Executable Common Object File Format.

The _CorExeMain() entry point is imported from mscoree.dll.

The shim loads the specific CLR version (CLR.DLL) and calls into Program.Main().

Fusion loads assemblies required by the application on an on-demand basis.

To install assemblies into the GAC, they must be strong named signed.

The GAC is located at %windir%\Microsoft.NET\assembly.

Assembly probing can be monitored with fuslogvw.exe.

.NET Remoting lets you communicate between AppDomains.

corflags.exe can be used to modify the JIT target platform.

Before jitting, a type's MethodTable points to a thunk that invokes JIT.

After jitting, a type's MethodTable points to a thunk that calls native code.

Jitted code that has not been called for a long time can be deallocated.

ngen.exe will NGEN an assembly on the command line, but most installers use mscorscw.exe.

Large objects are allocated on the Large Object Heap (LOH).

Objects who share their location with unmanaged code must be pinned.

When an API has security requirements, CAS walks the stack to make sure all callers are granted permission.

COM interop is facilitated by tlbimp.exe, tlbexp.exe and PIAs.

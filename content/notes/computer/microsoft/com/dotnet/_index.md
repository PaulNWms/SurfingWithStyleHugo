---
title: "DotNet"
date: 2020-06-17
---
# 10,000 ft view

The _Common Language Infrastructure (CLI)_ is an ECMA standard that specifies the runtime infrastructure.
- _Virtual Execution System (VES)_
- _Common Intermediate Language (IL)_
- metadata and file format
- The _Common Type System (CTS)_ defines 
    - types available to CLI-compliant languages
    - The _Common Language Specification (CLS)_ is a subset of CTS types that are guaranteed to be compatible across languages.
        - The _Base Class Library (BCL)_ is CLS-compliant.

The _Common Language Runtime (CLR)_ is Microsoft's implementation of the CLI.  The _Dynamic Language Runtime (DLR)_ is an extension to the CLR for supporting scripting languages.

A static language like C# is compiled into _assemblies_, which are containers for Common Intermediate Language (IL) and metadata.  Dynamic languages follow a different path.  A language-specific binder translates a script to expression trees.  These are in turn fed into the DLR, which converts them to IL for execution by the CLR.




Code Access Security (CAS) sandboxes code.

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

[COM interop](/notes/computer/microsoft/com/dotnet/com-interop) is facilitated by tlbimp.exe, tlbexp.exe and PIAs.

---
title: "Parameter Marshaling"
date: 2023-09-03T07:04:00-08:00
draft: false
tags: 
  - "#COM"
---
COM has 3 flavors of marshaling:
- Type library marshaling, for [automation-compatible types](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-oaut/7b5fa59b-d8f6-4a47-9695-630d3c10363e).   This is handled by `oleaut32.dll` in an optimized way.
- Standard marshaling, if the parameters include any user-defined types.  The MIDL compiler will generate a marshaling DLL.
- User-defined marshaling, in case there are performance issues with the above, can be achieved by implementing [IMarshal](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-imarshal).  The use cases for this are few.

The marshaling code is defined in an [IDL](https://learn.microsoft.com/en-us/uwp/midl-3/intro) file and compiled with the [MIDL Compiler](https://learn.microsoft.com/en-us/uwp/midl-3/intro).

It's simplest to stick with type library marshaling.  One of the supported automation types is BSTR, so in a pinch you can always serialize objects to JSON or XML strings.  In other words, it's really all you technically _need_.  A user application that's using an OutProc server is probably not in a hurry anyway.

Standard marshaling can handle any user defined type.  VS sets it up automatically at project creation.  The argument against it is that the generated code might not be the smartest.  The MIDL compiler has no semantic knowledge of your application and generates safe, one-size-fits-all code.  For example, it might pass the same constant value on every single call.  That being said, it works great in practice.  

If there are performance issues with the above and the project is well-funded, you can always implement user-defined marshaling.  In this case, the application is going outside of COM and using other [IPC](https://learn.microsoft.com/en-us/windows/win32/ipc/interprocess-communications) methods.  Putting this code behind [IMarshal](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-imarshal) keeps the app COM-compliant.

Both proxy and server derive from IMarshall.  The proxy implements [IMarshal::UnmarshalInterface](https://learn.microsoft.com/en-us/windows/win32/api/objidlbase/nf-objidlbase-imarshal-unmarshalinterface)and the server implements all the others.

---
# References

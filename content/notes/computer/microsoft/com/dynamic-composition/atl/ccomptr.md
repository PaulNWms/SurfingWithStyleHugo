---
title: CComPtr
description: 
date: 2023-11-02T19:47
keywords: 
draft: false
tags:
  - COM
  - ATL
---
COM smart pointers take care of reference counting, add type safety, and shorten the source code a lot.

There are 2 smart pointer classes, CComPtr and CComQIPtr. CComQIPtr is superset of CComPtr, but is not a child class.

COM smart pointers are not to be confused with C++ smart pointers.

`_com_ptr_t` is a VC++ compiler COM support extension.  It's compiler native, so there's no dependency on atl.dll.

```C++
// Reference counting handled for free
void Load()
{
    CComPtr<IMyClass> x;
    x.CoCreateInstance(OLESTR("MyLib.MyClass"));
    CComQIPtr<IMyClass2> y(x);
    y->DoSomething();
}
```

---
# References

[CComPtr Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomptr-class?view=msvc-170)
[CComQIPtr Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/atl/reference/ccomqiptr-class?view=msvc-170)
[`_com_ptr_t` Class | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/com-ptr-t-class?view=msvc-170)


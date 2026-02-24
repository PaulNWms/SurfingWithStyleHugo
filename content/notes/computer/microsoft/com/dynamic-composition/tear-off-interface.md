---
title: Tear-Off Interface
description: 
date: 2023-11-08T06:31:00Z
keywords: 
draft: false
tags:
  - COM
  - ATL
parent: dynamic-composition
---
Suppose you have a COM server with object A which implements I1 and object B which implements I2.  But then there is a change in requirements, and A should be changed to support I1 and I2.

In the usual case, a COM object supports a number of interfaces through multiple inheritance.   Another option is to make I2 a tear-off interface of object A.   If QueryInterface is called on an instance of A requesting I2, it will create and instance of B and return its interface pointer.

Tear-off interfaces can be _cached_ or _non-cached,_ which is kind of strange terminology.  Cached means a singleton, non-cached means a separate instance for each request.

Tear-off interfaces are only practical using ATL.

```C++
BEGIN_COM_MAP(CCoreObject)
    COM_INTERFACE_ENTRY(ICoreObject)
    COM_INTERFACE_ENTRY(IDispatch)
    COM_INTERFACE_ENTRY_TEAR_OFF(IID_IUseThisRarely, CAuxilliary)
END_COM_MAP()
```

The use cases for tear-offs are when interfaces are optional, or transient.

---
# References

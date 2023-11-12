---
title: Aggregation
description: 
date: 2023-11-08T06:32
keywords: 
draft: false
tags:
  - COM
  - ATL
---
Suppose you have a COM server α, containing object A which implements I1, and and s second server β, containing object B which implements I2.  But then there is a change in requirements, and A should be changed to support I1 and I2.  Just for fun, let's say you don't have the source code for β.

Aggregation makes it possible.  If QueryInterface is called on an instance of A requesting I2, it will load in server β, create and instance of B, and return its interface pointer I2.  Aggregation is similar in concept to [tear-off interface](/notes/computer/microsoft/com/dynamic-composition/tear-off-interface)s, the difference being, where the tear-off is housed.  It's a "binary tear-off".

Aggregation is only practical using ATL.

```C++
BEGIN_COM_MAP(COuter)
    COM_INTERFACE_ENTRY(IOuter)
    COM_INTERFACE_ENTRY_AGGREGATE(IID_IAgg, m_punkInner)
END_COM_MAP()
```

---
# References

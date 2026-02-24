---
title: IMessageFilter
description: 
date: 2023-12-05T05:58:00Z
keywords: 
draft: false
tags:
  - COM
---
An executable component can implement the IMessageFilter interface in each STA.  This only works in an STA, which is tuned for use with UI applications.

```C++
IMessageFilter* pMF = new CMessageFilter;
IMessageFilter* pOldMF;
CoRegisterMessageFilter(pMF, &pOldMF);
```

---
# References

[IMessageFilter (objidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-imessagefilter)

---
title: OLE custom control
description: 
date: 2023-11-11T09:39
keywords: 
draft: false
tags:
  - COM
  - ATL
---
An OLE custom control is a COM server that implements [IOleObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject).  In practice, they usually implement a whole lot more than that.  These sometimes have the file extension OCX.

The historical context is important.  OLE custom controls came into being at a time when the industry was changing fast.

- The specs for OLE custom controls were published in '94.
- OLE 2.0 is a lot different than OLE 1.0, which was not COM-based, so existing controls required a substantial rewrite.
- Windows went from 16 to 32 bits.
- MFC had been around, but was not yet widely adopted.
- Many ISVs were actually still in the process switching from C to C++.

Control development at that time meant getting an MSDN subscription and copying sample code off the CDs. OLE custom controls were superseded by [ActiveX](/notes/computer/microsoft/com/atl/atl-control/activex) controls in '96.  [[ATL]] did not come out until that year.  If there's OCX on your system, there's a very good chance it was hand-rolled.  Be afraid.

---
# References

[Object Linking and Embedding - Wikipedia](https://en.wikipedia.org/wiki/Object_Linking_and_Embedding)
[IOleObject (oleidl.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject)

---
title: ATL Control
description: 
date: 2023-11-11T13:04
keywords: 
draft: false
tags:
  - COM
  - ATL
---
Here's the COM map for an ATL control generated in VS '22.  This is the closest thing you'll find to an [ActiveX](/notes/computer/microsoft/com/activex) control today.  It implements [IOleObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject), so technically it's also an [OLE Custom Control](/notes/computer/microsoft/com/activex/ole-custom-control).

```C++
BEGIN_COM_MAP(CATLControl)
	COM_INTERFACE_ENTRY(IATLControl)
	COM_INTERFACE_ENTRY(IDispatch)
	COM_INTERFACE_ENTRY(IViewObjectEx)
	COM_INTERFACE_ENTRY(IViewObject2)
	COM_INTERFACE_ENTRY(IViewObject)
	COM_INTERFACE_ENTRY(IOleInPlaceObjectWindowless)
	COM_INTERFACE_ENTRY(IOleInPlaceObject)
	COM_INTERFACE_ENTRY2(IOleWindow, IOleInPlaceObjectWindowless)
	COM_INTERFACE_ENTRY(IOleInPlaceActiveObject)
	COM_INTERFACE_ENTRY(IOleControl)
	COM_INTERFACE_ENTRY(IOleObject)
END_COM_MAP()
```

---
# References

- [IDispatch](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-idispatch)
- [IViewObjectEx](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iviewobjectex)
- [IViewObject2](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iviewobject2)
- [IViewObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iviewobject)
- [IOleInPlaceObjectWindowless](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ioleinplaceobjectwindowless)
- [IOleInPlaceObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleinplaceobject)
- [IOleWindow](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iolewindow)
- [IOleInPlaceActiveObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleinplaceactiveobject)
- [IOleControl](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iolecontrol)
- [IOleObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject)

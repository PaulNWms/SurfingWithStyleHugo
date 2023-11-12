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
Here's the COM map for an ATL control generated in VS '22.  This is the closest thing you'll find to an ActiveX control today.  It implements [IOleObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject), so technically it's also an [OLE custom control](/notes/computer/microsoft/com/activex/ole-custom-control).

BEGIN_COM_MAP(CATLControl)
	COM_INTERFACE_ENTRY(IATLControl)
	COM_INTERFACE_ENTRY([IDispatch](https://learn.microsoft.com/en-us/windows/win32/api/oaidl/nn-oaidl-idispatch))
	COM_INTERFACE_ENTRY([IViewObjectEx](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iviewobjectex))
	COM_INTERFACE_ENTRY([IViewObject2](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iviewobject2))
	COM_INTERFACE_ENTRY([IViewObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iviewobject))
	COM_INTERFACE_ENTRY([IOleInPlaceObjectWindowless](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-ioleinplaceobjectwindowless))
	COM_INTERFACE_ENTRY([IOleInPlaceObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleinplaceobject))
	COM_INTERFACE_ENTRY2([IOleWindow](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iolewindow), IOleInPlaceObjectWindowless)
	COM_INTERFACE_ENTRY([IOleInPlaceActiveObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleinplaceactiveobject))
	COM_INTERFACE_ENTRY([IOleControl](https://learn.microsoft.com/en-us/windows/win32/api/ocidl/nn-ocidl-iolecontrol))
	COM_INTERFACE_ENTRY([IOleObject](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-ioleobject))
END_COM_MAP()

---
# References

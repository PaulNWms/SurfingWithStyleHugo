---
title: "Other Interfaces"
date: 2023-08-18T20:44-0800
draft: false
tags: 
  - "#COM"
---

[IMallocSpy](https://learn.microsoft.com/en-us/windows/win32/api/objidl/nn-objidl-imallocspy) is used by debuggers to detect memory leaks and other issues in calls to [IMalloc](https://learn.microsoft.com/en-us/windows/desktop/api/objidl/nn-objidl-imalloc) methods.

To provide UI for the [OLE/COM Object Viewer](https://learn.microsoft.com/en-us/windows/win32/com/ole-com-object-viewer), implement IInterfaceViewer.

To register and enumerate COM categories, use the [ICatRegister](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatregister) and [ICatInformation](https://learn.microsoft.com/en-us/windows/win32/api/comcat/nn-comcat-icatinformation) interfaces.

The [IObjectSafety](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa768224(v=vs.85)) interface should be implemented by objects that have interfaces which support "untrusted" clients, such as scripts.  (Legacy IE)

A scripting engine implements [IActiveScriptParse](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/reference/iactivescriptparse), [IActiveScriptSite](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/reference/iactivescriptsite) and [IActiveScript](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/reference/iactivescript) at a minimum.

Metro apps introduced [IInspectable](https://learn.microsoft.com/en-us/windows/win32/api/inspectable/nn-inspectable-iinspectable)

---
# References

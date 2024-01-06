---
title: COM+ Objects
description: 
date: 2023-12-01T06:05
keywords: 
draft: false
tags:
---
There are (or were) several types of COM+ objects supported by the AppWizard in prior versions of Visual Studio.  The terminology gets confusing.  Vague marketing terms map to items in the AppWizard with specific technical meaning.  (FWIW, no one I knew at the time ever used these terms "correctly" anyway.)

We began the early '90s in Win16 with OLE 2.0 and [OLE Custom Control](/notes/computer/microsoft/com/activex/ole-custom-control)s.  which sort of got redefined and renamed and [ActiveX](/notes/computer/microsoft/com/activex) controls at around the time Win32 came onto the scene.  In the late '90s', it got extended and rebranded again to [COM+](/notes/computer/microsoft/com/com-plus), sort of.  (This might not be completely accurate, but it's close enough and nobody cares anyway.)  I put the list here under COM+ because it's the high water mark for the technology, and also because I found this table in _Inside COM+_.

Because library APIs are written in stone, the product history is reflected in interface and function names.

|Object Type|Implemented Interfaces|Description|
|---|---|---|
|Simple Object|_IUnknown_|A minimal COM+ object|
|Add-in Object|_IDSAddIn_|A Visual C++ extension object|
|Internet Explorer|_IObjectWithSite_|An object that works with Internet Object Explorer, but without a user interface|
|Active Server|_IDispatch_|An object that can work with Component Active Server Pages in Internet|
|MS Transaction Server Component|_IObjectControl_|An object designed to work with Server Component Microsoft Transaction Server|
|MMC SnapIn|_IComponent,_ _IComponentData,_ _ISnapinAbout_|A Microsoft Management Console snap-in object|
|Lite Control|_IPersistStreamInit,_ _IOleControl,_ _IOleObject,_ _IOleInPlaceActiveObject,_ _IViewObjectEx,_ _IOleInPlaceObject-_ _Windowless_|An object that supports the interfaces needed by Internet Explorer, including support for a user interface|
|Full Control|All of the lite control interfaces, plus _IPersistStorage,_ _ISpecifyPropertyPages,_ _IQuickActivate,_ _IDataObject,_ _IProvideClassInfo2_|An object that supports the interfaces for all ActiveX control containers|
|Composite Control|Same as full control|A control that can host other controls|
|HTML Control|All of the full control interfaces, plus _IDispatch_|A control with DHTML functionality that displays an HTML Web page in its user interface|
|Lite HTML Control|Same as lite control, plus _IDispatch_|A control with DHTML functionality that displays an HTML Web page in its user interface but supports only the interfaces needed by Internet Explorer|
|Lite Composite Control|Same as lite control|A composite control that can host other controls but supports only the interfaces needed by Internet Explorer|
|Property Page|_IPropertyPage_|An object that implements a property page|

---
# References

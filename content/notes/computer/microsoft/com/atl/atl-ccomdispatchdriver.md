---
title: ATL CComDispatchDriver
description: 
date: 2023-11-02T20:28:00Z
keywords: 
draft: false
tags:
  - COM
  - ATL
---
CComDispatchDriver lets you conveniently get a dispinterface and call its members by ID or name.  
This example looks the dispatch ID of a function calls it using the ID with `Invoke`, then at the end calls Quit by name using `Invoke0`.

```C++
try
{
    CComPtr<IUnknown> unk;
    HRESULT hr = unk.CoCreateInstance(OLESTR("MSDEV.Application"));
    OleRun(unk);

    CComDispatchDriver disp(unk);    // QI for IDispatch
    if(!disp)                        // Is pointer NULL?
        throw(E_NOINTERFACE);

    // Calling IDispatch methods directly
    DISPID dispid;
    LPOLESTR lpStr[] = {L"Visible", NULL};
    disp->GetIDsOfNames(IID_NULL, lpStr, 1,
        LOCALE_USER_DEFAULT, &dispid);

    CComVariant vtVisible(VARIANT_TRUE);
    DISPPARAMS dispparams = {NULL, NULL, 1, 1};
    dispparams.rgvarg = &vtVisible;
    DISPID dispidPut = DISPID_PROPERTYPUT;
    dispparams.rgdispidNamedArgs = &dispidPut;

    disp->Invoke(dispid, IID_NULL, LOCALE_USER_DEFAULT,
        DISPATCH_PROPERTYPUTREF, &dispparams, &vtVisible,
        NULL, NULL);

    // Using helper functions
    disp.PutPropertyByName(L"Visible", &CComVariant(VARIANT_FALSE));
    disp.Invoke0(L"Quit");
}
catch(HRESULT hr)
{
    // Handle HRESULT
}|
```



---
# References

[How to: Create and use CComPtr and CComQIPtr instances | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/how-to-create-and-use-ccomptr-and-ccomqiptr-instances?view=msvc-170)

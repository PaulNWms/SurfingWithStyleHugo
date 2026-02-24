---
title: IMoniker
description: 
date: 2024-01-29T07:59:00Z
keywords: 
draft: false
tags:
  - COM
---
A moniker is a system object that identifies a COM object.  Win32 has several functions for creating them, see references.

A moniker is bound to its target in a binding context, an object that implements [IBindCtx](/notes/computer/microsoft/com/imoniker/ibindctx).

## Basic Usage

Monikers usually work under the hood.  _CoGetObject_ is a convenience function that retrieves an object from its display name.  It calls _MkParseDisplayName_ to get the moniker, then _IMoniker::BindToObject_ to get the underlying object.  Here's some pseudo code for that.

```C++
HRESULT __stdcall CoGetObject(LPCWSTR pszDisplayName, 
    BIND_OPTS* pBindOptions, REFIID riid, void** ppv)
{
    HRESULT hr = 0;

    // Create the bind context.
    IBindCtx* pBindCtx = 0;
    hr = CreateBindCtx(0, &pBindCtx);

    // Call MkParseDisplayName with the user's string.
    ULONG chEaten;
    IMoniker* pMoniker = 0;
    hr = MkParseDisplayName(pBindCtx, pszDisplayName, 
        &chEaten, &pMoniker);

    // Set the bind options requested by the caller.
    hr = pBindCtx->SetBindOptions(pBindOptions);

    // Call IMoniker::BindToObject to get the user's object.
    hr = pMoniker->BindToObject(pBindCtx, NULL, riid, ppv);

    // Release stuff.
    pMoniker->Release();
    pBindCtx->Release();

    return hr;
}
```

## Class Moniker

One use case of monikers is when you want to create an object with 'constructor' arguments.  Internally, _CoCreateInstance_ is a thin wrapper that calls _CoGetClassObject_, passing in the IID of the default _IClassFactory_, which does not support arguments.

We can work around this in C++ by calling _CoGetClassObject_ directly and passing in the IID of a custom class factory:

```C++
interface IPrimeFactory : IUnknown
{
    HRESULT CreatePrime([in] int starting_prime, [out, retval]IPrime** ppPrime);
};
IPrimeFactory* pPrimeFactory;
CoGetClassObject(CLSID_Prime, CLSCTX_SERVER, NULL, IID_IPrimeFactory, (void**)&pPrimeFactory);
IPrime* pPrime;
pPrimeFactory->CreatePrime(7, &pPrime);
pPrimeFactory->Release();
```

But to get to the factory interface from a scripting language, a moniker is needed.  First the C++:

```C++
// We always need a bind context.
IBindCtx* pBindCtx;
CreateBindCtx(0, &pBindCtx);

// Convert the string to a moniker.
ULONG eaten;
IMoniker* pMoniker;
OLECHAR string[] = 
    L"clsid:10000013-0000-0000-0000-000000000001";
MkParseDisplayName(pBindCtx, string, &eaten, &pMoniker);

 // Bind the moniker to the named object.
IPrimeFactory* pPrimeFactory;
pMoniker->BindToObject(pBindCtx, NULL, IID_IPrimeFactory, 
    (void**)&pPrimeFactory);

// Use the custom class object to create a Prime object.
IPrime* pPrime;
pPrimeFactory->CreatePrime(7, &pPrime);

// Now we have a Prime object.
int next_prime;
pPrime->GetNextPrime(&next_prime);
cout << next_prime << endl; // Displays 11

// Release all.
pPrimeFactory->Release();
pPrime->Release();
pBindCtx->Release();
pMoniker->Release();
```

The corresponding script looks something like this:

```VB6
Dim myPrimeFactory As IPrimeFactory
Dim myPrime As IPrime

' Call MkParseDisplayName and IMoniker::BindToObject.
Set myPrimeFactory = _
    GetObject("clsid:10000013-0000-0000-0000-000000000001")

' Call IPrimeFactory::CreatePrime.
Set myPrime = myPrimeFactory.CreatePrime(7)

' Call IPrime::GetNextPrime.
Print myPrime.GetNextPrime      ' Displays 11
```

---
# References

- [CreateFileMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createfilemoniker)
- [CreateItemMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createitemmoniker)
- [CreatePointerMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createpointermoniker)
- [CreateAntiMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createantimoniker)
- [CreateGenericComposite function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-creategenericcomposite)
- [CreateClassMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createclassmoniker)
- [URL Moniker Functions - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/com/url-moniker-api-functions)
- [CreateObjrefMoniker function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-createobjrefmoniker)
- [MkParseDisplayName function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-mkparsedisplayname)
- [CoGetObject function (objbase.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/objbase/nf-objbase-cogetobject)

---
title: "InProc Server"
date: 2023-08-12T12:35-0800
draft: false
tags: 
  - "#COM"
---
An InProc server implements `IClassFactory`, `DllGetClassObject()` and `DllCanUnloadNow()`.  The boiler plate .def file Visual Studio generates in an ATL project looks like this:

```def
LIBRARY

EXPORTS
	DllGetClassObject		PRIVATE
	DllCanUnloadNow			PRIVATE
	DllRegisterServer		PRIVATE
	DllUnregisterServer		PRIVATE
```

A client application will typically instantiate a COM object with `CoCreateInstance()` if it needs a single instance.

Note that DllGetClassObject() _does not_ directly create objects, as the name would imply.  Instead, is called with IID_IClassFactory to get a factory object.  pFactory->CreateInstance() is then called to create the object.  This all happens behind the scenes when you call CoCreateInstance.

```C++
int
main ()
{
    ODS0 ("[HelloClient]\tentering main\n");

    // initialize COM libraries
    HRESULT hr = CoInitialize ((LPVOID) 0);

    // convert ProgID into corresponding CLSID
    CLSID CLSID_HelloWorldServer;
    hr = CLSIDFromProgID (
        L"HandsOnCOM.HelloWorld.1",
        & CLSID_HelloWorldServer
    );

    // create a HelloWorld object
    IUnknown * pIUnknown;
    hr = CoCreateInstance (
        CLSID_HelloWorldServer,  // CLSID of object
        (IUnknown *) 0, // object is not part of an aggregate

#if ! defined (OUTPROC_SERVER)
        CLSCTX_INPROC_SERVER, // see CLSCTX enumeration
#else
        CLSCTX_LOCAL_SERVER,  // see CLSCTX enumeration
#endif

        IID_IUnknown,  // requested interface identifier
        (void **) & pIUnknown  // return value
    );

    // request ISayHello interface
    ISayHello * pISayHello;
    hr = pIUnknown -> QueryInterface (
        IID_ISayHello,
        (void **) & pISayHello
    );

    // allocate a BSTR
    OLECHAR szTemp[] = L"Hello World!";
    BSTR szHello = SysAllocString (szTemp);

    // invoke method SayHello
#if defined (TEST_PERFORMANCE)
    long dwMilliSeconds = GetTickCount ();
    long dwRetries = TEST_ITERATIONEN;

    for (int i = 0; i < dwRetries; i ++)
        hr = pISayHello -> SayHello (szHello);

    ODS2 ("[HelloClient]\t%ld calls: %ld milliseconds\n", dwRetries, GetTickCount () - dwMilliSeconds);
#else
    ODS0 ("[HelloClient]\tvor SayHello\n");
    hr = pISayHello -> SayHello (szHello);
    ODS0 ("[HelloClient]\tnach SayHello\n");

#endif

    // release interface pointer
    hr = pISayHello -> Release ();
    hr = pIUnknown -> Release ();

    // free BSTR
    SysFreeString (szHello);

    // release COM libraries
    CoUninitialize ();

    MessageBox ((HWND) 0, "Good bye", "Client", MB_OK);
    ODS0 ("[HelloClient]\tleaving main\n");
    return 0;
}
```

If multiple objects are needed, it will call `CoGetClassObject()` to get an `IClassFactory` and call `CreateInstance()` multiple times.

```C++
int
main ()
{
    // initialize COM libraries
    HRESULT hr = CoInitialize ((LPVOID) 0);

    // convert ProgID into corresponding CLSID
    CLSID CLSID_HelloWorldServer;
    hr = CLSIDFromProgID (
        L"HandsOnCOM.HelloWorld.1",
        & CLSID_HelloWorldServer
    );

    // retrieve class factory interface pointer
    IClassFactory * pIClassFactory;
    hr = CoGetClassObject (
        CLSID_HelloWorldServer, // CLSID of class object

#if ! defined (OUTPROC_SERVER)
        CLSCTX_INPROC_SERVER,   // see CLSCTX enumeration
#else
        CLSCTX_LOCAL_SERVER,    // see CLSCTX enumeration
#endif

        (COSERVERINFO *) 0,     // no remote machine info
        IID_IClassFactory,      // requested interface identifier
        (void **) & pIClassFactory  // return value
    );

    // create two HelloWorld objects
    ISayHello * pISayHello1;
    hr = pIClassFactory -> CreateInstance (
        (IUnknown *) 0, // object is not part of an aggregate
        IID_ISayHello,  // requested interface identifier
        (void **) & pISayHello1 // return value
    );

    ISayHello * pISayHello2;
    hr = pIClassFactory -> CreateInstance (
        (IUnknown *) 0, // object is not part of an aggregate
        IID_ISayHello,  // requested interface identifier
        (void **) & pISayHello2 // return value
    );

    // allocate two BSTRs
    OLECHAR szTemp1[] = L"Say hello to our first object!";
    OLECHAR szTemp2[] = L"Say hello to our second object!";
    BSTR szHello1 = SysAllocString (szTemp1);
    BSTR szHello2 = SysAllocString (szTemp2);

    // invoke method SayHello from first object
    hr = pISayHello1 -> SayHello (szHello1);

    // invoke method SayHello from second object
    hr = pISayHello2 -> SayHello (szHello2);

    // release interface pointer of objects
    hr = pISayHello1 -> Release ();
    hr = pISayHello2 -> Release ();

    // free BSTRs
    SysFreeString (szHello1);
    SysFreeString (szHello2);

    // release class factory
    hr = pIClassFactory -> Release ();

    // release COM libraries
    CoUninitialize ();

    MessageBox ((HWND) 0, "Good bye", "Client", MB_OK);
    return 0;
}
```

Occasionally, an InProc server may have multiple apartments.  See [COM Apartment Models](/notes/computer/microsoft/com/com-apartment-models).

Not recommended, but just to complete the thought - it _is_ possible to load an inproc server without using the registry or SCM.

```C++
IUnknown* pUnknown;
IClassFactory* pClassFactory;

// Load the DLL.
HINSTANCE myDLL = LoadLibrary("C:\\component.dll");

// Declare a pointer to the DllGetClassObject function.
typedef HRESULT (____stdcall *PFNDLLGETCLASSOBJECT)(REFCLSID clsid, 
    REFIID riid, void** ppv);

// Get a pointer to the component's DllGetClassObject function.
PFNDLLGETCLASSOBJECT DllGetClassObject = 
    (PFNDLLGETCLASSOBJECT)GetProcAddress(myDLL, "DllGetClassObject");

// Call DllGetClassObject to get a pointer to the class factory.
DllGetClassObject(CLSID_InsideCOM, IID_IClassFactory, (void**)&pClassFactory);
// IClassFactory::CreateInstance and IUnknown::Release
pClassFactory->CreateInstance(NULL, IID_IUnknown, (void**)&pUnknown);
pClassFactory->Release();
```

---
# References

- [CoCreateInstance function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-cocreateinstance)
- [CoGetClassObject function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-cogetclassobject)
- [DllGetClassObject function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-dllgetclassobject)

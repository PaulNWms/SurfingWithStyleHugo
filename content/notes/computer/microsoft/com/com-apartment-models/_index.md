---
title: COM Apartment Models
date: 2023-09-22T22:32
draft: false
tags:
  - "#COM"
parent: COM
---
**Writ large:** Don't mix apartment models.

---

But if you're stuck, it can be done, at the cost of code complexity and performance.  This is a deep subject that you'll have to read about in a COM book.  Sorry, it's just plain complicated.

The apartment model is COM's way of communicating whether a server is thread safe.  A COM server typically has one apartment.  There are 3 types:

- Single-Threaded Apartment (STA)
- Multithreaded Apartment (MTA)
- Thread-Neutral Apartment (TNA)

Occasionally, a COM server may have multiple apartments.

One server may have multiple STA apartments, a single MTA and a single TNA, in any combination.  If you don't specify anything, by default both server and client go into the 'main' STA.  This was the only option available in Win16.

A COM server can have an STA, MTA or TNA apartment and a COM client can have an STA or MTA apartment.  It's a complicated subject, which starts off on the wrong foot with inconsistent terminology.

The apartment model of an [InProc Server](/notes/computer/microsoft/com/atl/inproc-server) is specified in the class's registry entry under `HKEY_CLASSES_ROOT\CLSID\<GUID>\InprocServer32\ThreadingModel`.  The options are

| ThreadingModel | Apartment |
|---|---|
| (key doesn't exist) | main STA |
| Apartment | STA |
| Free | MTA |
| Both | client's apartment |
| Neutral | TNA |

Instead of using a registry entry, an [OutProc Server](/notes/computer/microsoft/com/outproc-server) specifies its apartment model when it calls [CoInitializeEx](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-coinitializeex)

The apartment model of a COM client is also specified when the runtime is initialized.

| Function Call | Apartment|
|---|---|
| `CoInitialize((void*)0);` | main STA |
| `CoInitializeEx((void*)0, COINIT_APARTMENTTHREADED);` | STA |
| `CoInitializeEx((void*)0, COINIT_MULTITHREADED);` | MTA |

Ideally the server and client live in the same apartment, in which case the method calls are direct.  Communication with a COM server in another apartment incurs some overhead.

To describe these models very briefly -
- An STA is implemented as a window named `OleMainThreadWndClass` and its thread is running a message loop.
    - There is one instance of this window for each STA.
    - If both server and client are in the same STA, there is one window.
- The MTA has a thread pool.
- The TNA has no threads; instead, it uses the caller's thread.  

Calling from one apartment into another may incur overhead.  Depending on the scenario, the client may call the server in another apartment using direct pointer access, using the proxy from the class's typelib, or generate a hidden "lightweight" proxy.

As a rule of thumb - keep everything in the same apartment, unless there is a compelling reason to do otherwise.
- If the COM server touches UI, leave ThreadingModel undefined or set it to Apartment, to keep the server on the window's UI thread.
- Otherwise use Both.  In all cases, this will allow direct pointer access.

An object in an STA can implement [IMessageFilter](/notes/computer/microsoft/com/com-apartment-models/imessagefilter).

In the unusual case where there are multiple apartments, you can run into a problem of fairness.  If a client in apartment STA1 instantiates an InProc server, and then a client in STA2 instantiates the same server, the server object will end up in STA1.  The first client will have direct access to it and the second will have to communicate over a proxy/stub.  (Talk about a first-world problem...)  This is where the TNA comes into the picture.  It's a neutral place where both clients will have indirect access to the server, but it will be running on their threads.

Strangely, the COM+ literature recommends [Neutral as the default](https://learn.microsoft.com/en-us/windows/win32/cossdk/neutral-apartments).  However, the registry on my dev box shows that TNA servers are exceedingly rare in practice, appearing only in very large applications like SQL Server and Visual Studio.

Even though different apartments _can_ live in the same process, i.e. address space, this is not a happy situation.  Interface pointers can't be shared between apartments.  To send a pointer over, place it on a stream with [CoMarshalInterThreadInterfaceInStream](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-comarshalinterthreadinterfaceinstream) to wrap it in a thread-neutral representation, and retrieve it with [CoGetInterfaceAndReleaseStream](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-cogetinterfaceandreleasestream).  To coordinate these calls,  you may need to use a kernel event.  A better option is the [Global Interface Table (GIT)](/notes/computer/microsoft/com/com-apartment-models/global-interface-table-git).

All that being said, for inproc servers with multiple apartments, there is a [Free-Threaded Marshaler](/notes/computer/microsoft/com/com-apartment-models/free-threaded-marshaler) to help with performance.

|Client|Not Specified|Apartment|Free|Both|Neutral|
|---|---|---|---|---|---|
|Main STA|Created in the main STA. Direct access.|Created in the main STA. Direct access.|Created in the MTA. The MTA is created by the system if necessary. Proxy access.|Created in the main STA. Direct access.|Created in the NA. Lightweight proxy access —no thread switch.|
|STA|Created in the main STA. Proxy access.|Created in the caller's STA. Direct access.|Created in the MTA. The MTA is created by the system if necessary. Proxy access.|Created in the caller's STA. Direct access.|Created in the NA. Lightweight proxy access—no thread switch.|
|MTA|Created in the main STA. The main STA is created by the system if necessary. Proxy access.|Created in a host STA. Proxy access.|Created in the MTA. Direct access.|Created in the MTA. Direct access.|Created in the NA. Lightweight proxy access—no thread switch.|
|Neutral (on an STA thread)|Created in the main STA. Proxy access.|Created in the caller's STA. Lightweight proxy access—no thread switch.|Created in the MTA. The MTA is created by the system if necessary. Proxy access.|Created in the NA. Direct access.|Created in the NA. Direct access.|
|Neutral (on an MTA thread)|Created in the main STA. Proxy access.|Created in a host STA. Proxy access.|Created in the MTA. Lightweight proxy access—no thread switch.|Created in the NA. Direct access.|Created in the NA. Direct access.|

---
# References

- [COM+ Threading Models - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/cossdk/com--threading-models)
- [CoMarshalInterThreadInterfaceInStream function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-comarshalinterthreadinterfaceinstream)
- [CoGetInterfaceAndReleaseStream function (combaseapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-cogetinterfaceandreleasestream)


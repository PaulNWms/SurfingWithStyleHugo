---
title: Apartment Models
date: 2023-09-22T22:32
draft: false
tags:
---

Occasionally, an [InProc Server](../inproc-server/) may have multiple apartments.  (This is a threading concept and doesn't apply to [OutProc Server](../outproc-server/)s, as they are in a different process.)  There are 3 types of of apartment:

- Single-Threaded Apartment (STA)
- Multithreaded Apartment (MTA)
- Thread-Neutral Apartment (TNA)

One process may have multiple STA apartments, a single MTA and a single TNA, in any combination.  If you don't specify anything, by default both server and client go into the 'main' STA.  This is the way you normally think about COM, it's the most efficient.  It was the only option available in Win16.

A COM server can live in an STA, MTA or TNA apartment and a COM client can live in an STA or MTA apartment.  It's a complicated subject, which starts off on the wrong foot with inconsistent terminology.

The apartment model of a COM server is specified in the class's registry entry under `HKEY_CLASSES_ROOT\CLSID\<GUID>\InprocServer32\ThreadingModel`.  The options are

| ThreadingModel | Apartment |
|---|---|
| (key doesn't exist) | main STA |
| Apartment | STA |
| Free | MTA |
| Both | client's apartment |
| Neutral | TNA |

The apartment model of a COM client is specified when the runtime is initialized.

| Function Call | Apartment|
|---|---|
| `CoInitialize((void*)0);` | main STA |
| `CoInitializeEx((void*)0, COINIT_APARTMENTTHREADED);` | STA |
| `CoInitializeEx((void*)0, COINIT_MULTITHREADED);` | MTA |

Ideally they server and client live in the same apartment, in which case the method calls are direct.  Communication with a COM server in another apartment incurs some overhead.

To describe these models very briefly -

- An STA is implemented as a window named `OleMainThreadWndClass` and its thread is running a message loop.
    - There is one instance of this window for each STA.
    - If both server and client are in the same STA, there is one window.
- The MTA has a thread pool.
- The TNA has no threads; instead, it uses the caller's thread.

The COM+ literature recommends [TNA](https://learn.microsoft.com/en-us/windows/win32/cossdk/neutral-apartments)s, but looking at the registry on my dev box, TNA servers are exceedingly rare in practice.

.NET COM clients can be either [MTA or STA](https://learn.microsoft.com/en-us/dotnet/api/system.stathreadattribute?view=net-7.0).  

---
# References

[COM+ Threading Models - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/cossdk/com--threading-models)

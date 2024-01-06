---
title: Global Interface Table (GIT)
description: 
date: 2023-12-12T07:22
keywords: 
draft: false
tags:
  - COM
---
The global interface table (GIT) is a process-wide object where you can register interfaces that live in different apartments.  Some of them may aggregate the free-threaded marshaler and some may not, it's all good.  The GIT handles the marshaling correctly in both cases.

Instead of calling CoMarshalInterThreadInterfaceInStream and CoGetInterfaceAndReleaseStream, it's usually simpler and less error-prone to register/unregister the objects in the GIT.  You access it over the IGlobalInterfaceTable interface, which is provided by the system.

```C++
IGlobalInterfaceTable* m_pGIT;
CoCreateInstance(CLSID_StdGlobalInterfaceTable, NULL, 
    CLSCTX_INPROC_SERVER, IID_IGlobalInterfaceTable, 
    (void**)&m_pGIT);
...
DWORD m_cookie;
m_pGIT->RegisterInterfaceInGlobal(pMyInterface, 
    IID_IMyInterface, &m_cookie);
```

```C++
// Possibly called by a client thread in another apartment
m_pGIT->GetInterfaceFromGlobal(m_cookie, IID_IMyInterface, 
    (void**)&pMyInterface);

// Use pMyInterface here.
pMyInterface->Release();
...
m_pGIT->RevokeInterfaceFromGlobal(m_cookie);

// Now release the GIT.
m_pGIT->Release();
```
---
# References

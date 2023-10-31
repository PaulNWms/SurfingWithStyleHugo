---
title: OutProc Server
date: 2023-09-02T21:07-0800
draft: false
tags:
  - COM
---

An OutProc server is housed in an EXE.  From the client's perspective, a COM object is instantiated with CoCreateInstance, just like an InProc server.  The client is unaware of the difference.

An OutProc server is a lot slower than an InProc server, approx. 1000X.

OutProc servers are implemented with proxy/stub objects.  A proxy object is created in the client's address space, and a server application is started containing a stub in its address space.  The interaction between proxy and stub is lightly documented and not important from the user's perspective.

The only concern might be parameter marshaling.  Custom marshaling might be required for performance tuning.

An OutProc server needs to call [CoRegisterClassObject](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-coregisterclassobject) at startup and [CoRevokeClassObject](https://learn.microsoft.com/en-us/windows/win32/api/combaseapi/nf-combaseapi-corevokeclassobject) before exiting.

---
# References

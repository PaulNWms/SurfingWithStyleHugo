---
title: The Ten Threading Commandments
description: 
date: 2023-12-13T21:20
keywords: 
draft: false
tags:
  - COM
---
# The Ten Threading Commandments

1. Each STA can have only one thread.
    
2. Components that use STA threads must retrieve and dispatch window messages.
    
3. Always remember to marshal interface pointers between threads running in different apartments.
    
4. Call _CoInitializeEx_ from every thread that uses COM+ services in order to declare the supported threading model.
    
5. Each object is associated with one and only one apartment, but an apartment can contain multiple objects.
    
6. The main STA is created by the first thread to call _CoInitialize_ or _CoInitializeEx(NULL, COINIT_APARTMENTTHREADED)_ within a process.
    
7. The main STA should remain alive until the process has completed all COM+ work with legacy components.
    
8. A process can have any number of STAs but at most one MTA and one NA.
    
9. Always define the _ThreadingModel_ value in the registry for in-process objects.
    
10. Build nonvisual in-process objects that support the NA model (_ThreadingModel = Neutral_).

---
# References


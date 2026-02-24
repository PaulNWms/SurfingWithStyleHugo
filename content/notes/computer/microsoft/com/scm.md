---
title: SCM
description: 
date: 2024-05-01T18:12:00Z
keywords: 
draft: false
tags:
  - COM
---
The Service Control Manager (SCM) handles Win32 COM library (`OLE32.DLL`) calls, such as `CoCreateInstance`.  It's implemented in `RPCSS.EXE`.  It listens on TCP/UDP port 135.

![image](/img/SCM.jpg)

The surrogate process on the remote machine is implemented in `DLLHOST.EXE` or `MTS.EXE`.

---
# References


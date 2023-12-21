---
title: Free-Threaded Marshaler
description: 
date: 2023-12-12T06:29
keywords: 
draft: false
tags:
---
If a process contains multiple apartments, the normal COM rules are that it has to use a proxy/stub mechanism.  But is seems wasteful if they're in an inproc server, since they're in the same address space.  For those who like to live dangerously, the free-threaded marshaler is an optimization that allows you to get around this.

The FTM implements IMarshal.  To use it, you aggregate the FTM in the object.  ATL is your friend, but if you're doing it by hand for some reason, the function is CoCreateFreeThreadedMarshaler.

When a client thread calls CoMarshalInterThreadInterfaceInStream, the SCM queries for IMarshal.  As if by magic, the FTM puts the object pointer into the marshaling stream.  When the client calls CoGetInterfaceAndReleaseStream, it gets the object pointer instead of a proxy pointer.

But wait, there's more!  An object that aggregates the FTM may itself contain proxies to other objects, i.e. it references objects that themselves do not aggregate the FTM.  Calling one of these may error out with `RPC_E_WRONG_THREAD`.  ("May" as in, "intermittently".)

To get around this edge case, the interface pointers can be registered in the process's [Global Interface Table](/notes/computer/microsoft/com/apartment-models/global-interface-table).

[The Ten Threading Commandments](/notes/computer/microsoft/com/apartment-models/free-threaded-marshaler/the-ten-threading-commandments)

---
# References

---
title: COM+
description: 
date: 2023-11-22T06:17
keywords: 
draft: false
tags:
---
COM+ is a technology stack, built approximately like this:

| Buzzword | Service|
|---|---|
| COM+ | load balancing<br/>object pooling<br/>[IMDB](/notes/)<br/>[MSMQ](/notes/)<br/>events<br/>administration |
| MTS | transactions<br/>resource pooling<br/>role-based security<br/>Just-In-Time Activation<br/>administration |
| DCOM | remote architecture<br/>distributed component service |
| COM | interface-based programming |

[DCOM](/notes/computer/microsoft/com/dcom) failed in the marketplace, taking out most of the stack above it.  

Microsoft built a monument on top of COM, a lot of  which is deprecated now.  This was motivated by [Windows DNA](/notes/computer/microsoft/com/windows-dna), parts of which are still around.

COM+ and DNA are terms that overlap.  The way I think of it is, COM+ is this specific technology stack, and DNA is more of a marketing term that means "whatever tools make up a 3-tier application".  This includes IIS and SQL Server.

---
# References

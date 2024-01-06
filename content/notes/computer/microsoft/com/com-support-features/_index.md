---
title: COM Support Features
description: 
date: 2023-12-30T09:13
keywords: 
draft: false
tags:
---
Windows has a number of system features that support COM.

- The system-wide [Registry](/notes/computer/microsoft/com/registry)
- The system-wide [Running Object Table (ROT)](/notes/computer/microsoft/com/running-object-table-rot)
- The process-wide [Global Interface Table (GIT)](/notes/computer/microsoft/com/apartment-models/global-interface-table-git)
- Thread [Apartment Models](/notes/computer/microsoft/com/apartment-models)
- Large chunks of Win32
    - all of the functions named CoXXX or OleXXX
    - some sneaky ones like _GetErrorInfo_, which take an interface pointer

---
# References

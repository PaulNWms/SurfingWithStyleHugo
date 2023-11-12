---
title: Dynamic Composition
description: 
date: 2023-11-08T06:27
keywords: 
draft: false
tags:
  - COM
  - ATL
---
The idea behind dynamic composition is that you've got a COM object and you want QueryInterface() to return an interface from a _different_ object.  COM supports 2 types of dynamic composition, [tear-off interface](/notes/computer/microsoft/com/dynamic-composition/tear-off-interface)s and [[aggregation]].

Dynamic composition is a generic COM idea, but in practice you'd better use use [ATL](/notes/computer/microsoft/com/atl).

---
# References

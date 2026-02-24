---
title: DCOM
description: 
date: 2023-11-22T07:00:00Z
keywords: 
draft: false
tags:
---
DCOM allows objects to communicate with one another across a network, enabling the development of distributed applications.  It died.  There are reasons for things.

- Complicated to understand, develop and troubleshoot in a dev environment.
- Complicated to deploy, configure and troubleshoot in a production environment.
- Uses dynamic ports and puts custom traffic on the network.  Whatever your network's firewall rules are, it's almost guaranteed to break them.  Every application has to be reviewed individually by the security and network teams.
- Vendor lock-in - Windows only.

The essence of DCOM is the remote procedure call.  Suppose you have an STA client calling a remote STA server.  This is (surprisingly) one of the more complicated scenarios.  Here is the machinery that runs behind the scenes:

![image](/img/Pasted%20image%2020231204071216.png)

This graphic came from chapter 4 of _Inside COM+_, which explains it well.  The takeaway is, the RPC involves 4 threads, 2 message loops and the message queue of an invisible window called _OleMainThreadWndClass_.  There are optimizations if the client and server are on the same machine, and the graph for MTA is actually simpler.

DCOM uses dynamic ports, which does not play nicely with firewalls.  Microsoft's solution to this was [CIS](/notes/computer/microsoft/com/dcom/cis).

---
# References

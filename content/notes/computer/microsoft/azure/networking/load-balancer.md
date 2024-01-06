---
title: "Load Balancer"
date: 2023-05-11T07:00-0800
draft: false
tags: 
  - "#Azure"
---
Distributes and balances the incoming traffic to an application or network. Uses IP address and port number to determine the receiving VM in the backend pool.

- Inbound Flows - Traffic from the Internet or local network.
- Frontend - The access point for the load balancer.  All traffic goes here first.
- Backend Pool - The VM instances receiving traffic.
- Rules & Health Probes - Checks to ensure backend instance can receive the data.

Scenarios
- Internet Traffic
- Internal Networks 
- Port Forwarding - Traffic can be forwarded to a specific machine in the backend pool.
- Outbound Traffic - Allow outbound connectivity for backend pool VMs.

---
# References

---
title: "Virtual Network"
date: 2023-05-11T06:53-0800
draft: false
tags: 
  - "#Azure"
---

A fundamental part of Azure. All services are connected to a VNet. Includes an IP address range and subnets. Belongs to a single region and a single subscription.

- Resource Grouping - Group resources onto the same subnet to make it easier to keep an overview.
- Address Allocation - More efficient to allocate addresses to resources on a smaller subnet.
- Subnet Security - Use network security groups to secure individual subnets.

Subscriptions - A VNet belongs to just one subscription, but a subscription can have multiple VNets.  

Regions - A VNet belongs to a single region. Every resource on the VNet must be in the same region too.

Cloud Advantages
- Scaling
- High Availability
- Isolation
- [VNet Peering](/study/factoids/computer/microsoft/azure/networking/virtual-network/vnet-peering)

---
# References

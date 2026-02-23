---
title: Azure Cosmos DB
description: 
date: 2024-06-22T11:58
keywords: 
draft: false
tags:
  - Azure
  - DP-900
---
Azure Cosmos DB is a multi-model NoSQL database management system.

- Data as partitioned set of documents
- Supports JavaScript Object Notation (JSON)
- Supports APIs
	- SQL, Table, MongoDB, Cassandra, Gremlin
- Highly scalable
- Single-digit millisecond response times • Automatic and instant scalability,
- Guarantee speed at any scale
### Azure Cosmos DB
- Multi-model
- NoSQL
- Instantly scalable
- Highly available
- Global distribution
- Free tier
### Advantages of Cosmos DB
- High availability of 99.999%
- Replication across regions
- 10-ms latencies for reads/writes
- Certified for compliance standards
- Encrypted at rest and in motion
### Use Cases of Cosmos DB
- Frequent bursts of large activities (IoT)
- Single digit latency (gaming)
- Elastic scaled up or down (eCommerce)
### Core components
- Database account
- Database
- Container
- Items
### Tools
- Azure Portal
- PowerShell / Azure CLI
- ARM Templates
- APIs and SDKs
- .NET, Java, Spring, Node.js, Python SDKs
- MongoDB, Table, Gremlin, Cassandra API
### Key management tasks
- Choose the most appropriate data model
- Plan capacity and costs
- Choose the right throughput mode
- Configure global distribution
### General recommendations
- Use the latest SDK
- Log metrics by using the Azure portal
- Run your app in the same Azure region as your Azure Cosmos DB account, whenever possible.
- Availability issues due to lack of resources on your client machine
### Request Unit (RU)
- CPU, IOPS, memory
- Measure of throughput
- Unit for billing, optimizing
- Manual provisioned
- Provisioned autoscale
- Serverless
###  Consistency Levels
- Strong
- Bounded staleness
- Session
- Consistent prefix
- Eventual
- Set at account level
- Can weaken in SDK
### Cosmos DB APIs
- JSON, BSON
- Wide Column, Key-Value
- Graph
- Distributed Tables
### Partition Schemes and Keys
- Account
	- Database
		- Container
			- Logical Partition (Partition Key)
			- Logical Partition (Partition Key)
	- Database
		- Container
			- Logical Partition (Partition Key)
### Cosmos DB Change Feed
- Enabled by default
- Updates and inserts
- No filter
- Soft marker for deletes and updates
- Most recent changes
- Order guaranteed within each logical partition key value
- Push model preferred over pull

---
# References

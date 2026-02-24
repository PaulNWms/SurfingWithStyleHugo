---
title: Azure Blob Storage
description: 
date: 2024-06-22T11:51:00Z
keywords: 
draft: false
tags:
  - Azure
  - DP-900
---
Azure Blob storage is a service that enables you to store massive amounts of unstructured data, or blobs, in the cloud

- Three types of blobs
    - Block
    - Page
    - Append
- Container groups related blobs
- Access tiers
    - hot (default, frequent access)
    - cool (30-90 days)
    - cold (90+ days)
    - archive (must rehydrate, 180+ days)
### Advantages of Azure Blob Storage
- Redundancy (3 times in region)
- Versioning
- Soft delete
- Snapshots
- Change feed
### Use Cases of Azure Blob Storage
- Serving images/docs from browser
- Streaming video and audio
- Storing data for backups and store
### Encryption
- Data at rest using Storage Service Encryption (SSE)
- Data in transit with client-side encryption, HTTPS, or SMB 3.0
- OS and data disk using Azure Disk Encryption
- Infrastructure encryption on top of service-level encryption
- Keys: Microsoft-managed, customer-managed, customer-provided
### Access to Service, Data, and Secrets
- RBAC roles scope to the storage account security principals to authorize resource and key management
- Azure Active Directory integration for data operations
- Shared access signature (SAS) tokens
### Redundancy Options
- Primary region: locally redundant storage (LRS), zone-redundant storage (ZRS)
- Secondary region: geo-redundant storage (GRS), geo-zone redundant storage (GZRS)
###  Blob Storage Basics
- Redundancy
- Soft delete and versioning
- Blob change feed
- Security and redundancy considerations
### Blob Types and Access Tiers
- Block, append, page
- Hot, cool, cold online tiers
- Rehydrate archived blobs
- Tiers only for block blobs
### REST API for Metadata
- Get metadata headers for containers and blobs
- Set (PUT) metadata values
- Other configuration
### Blob Lifecycle Policies
- Rules in JSON
- Parameters and filters
- Action sets
- Run conditions
### Object Model
- Storage account/service
- Container
- Blob
### Client Libraries
- BlobServiceClient
- ContainerClient (Python)
- BlobContainerClient (.NET)
- BlobClient
- .NET-Only:
    - BlobClientOptions
    - BlobUriBuilder
    
---
# References

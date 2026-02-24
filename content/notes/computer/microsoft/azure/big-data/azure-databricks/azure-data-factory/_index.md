---
title: Azure Data Factory
description: 
date: 2024-03-10T19:24:00Z
keywords: 
draft: false
tags:
  - Azure
  - DP-900
---
- Activities: the individual steps performed
- Pipelines: a logical group of activities
- Runtimes: the compute infra of ADF
- Triggers: define when a pipeline will run
- Linked Services: tell where to find the data
- Datasets: actual representation of the data

Successor to [SSIS](/notes/computer/microsoft/azure/big-data/azure-databricks/azure-data-factory/ssis)
### Data Factory Considerations
- Two versions: ADF v2 is the current and improved version
- Build options PowerShell, .NET, Python, REST, ARM
- Highly integrated DevOps, Key Vault, Monitor, Automation…
- No data storage Need to persist data by the end
- Security standards HTTP/TLS connection whenever possible
### Integration Runtime Types
- Azure IR: For data movement between public endpoints
- Self-Hosted IR: For connection to Private and On Premises resources
- Azure-SSIS IR: Exclusively for executing SSIS packages

### Linked Services and Datasets
- Linked Services: similar to Connection Strings
- Two types:
	- Data Stores
	- External Compute Services
- Datasets are about the data structure
- Examples:
	- SQL Database/Tables
	- Blob Storage/Files
### Triggers
- Schedule: Focus on ON/AT (on Sunday, at midnight)
- Tumbling Window: Focus on EVERY (every 2 hours)
- Event-based: Fired based on an event (file arrival)
### Understand ETL in Azure Databricks
- ETL vs. ELT
- Combine Azure Databricks with Azure Data Factory
- Benefits of Azure Data Factory
    - Connect to 90+ other Data Sources
    - Create Pipelines
    - Schedule Pipelines as Jobs
    - Visual Interface

Azure Databricks helps to Transformation, Clean, and Join Disparate Data

---
# References

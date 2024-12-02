---
title: "Azure Databricks"
date: 2023-05-13T09:11-0800
draft: false
tags: 
  - "#Azure"
---
Azure Databricks is a fully-managed, Apache Spark based cloud-based platform, that can be used for Big Data processing and Machine Learning.
- Based on Apache [Spark](/notes/computer/microsoft/azure/big-data/azure-databricks/spark), a distributed cluster computing framework.
- Run and process a dataset on many computers simultaneously.
- Databricks provides all the computing power.
- Integrates with other Azure Storage services.

### Top Features of Azure Databricks
- Leverage spark for Streaming, ML, Graph API, and SQL/DataFrames
- Multiple Languages: Scala, Python, Java, R, SQL
- Integration with Azure Active Directory (Azure AD)
- Integration with Azure Services e.g. Azure Data Factory, Azure Storage
- Fulfills multiple Industry Security Compliances, e.g. PCIDSS, FedRAMP etc.

### Key Components of Azure Databricks
- Workspace - Apache Spark interactive workspace for exploration and visualization
- Cluster - Apache Spark Cluster that can be created in seconds and autoscale and share across users
- Notebook - Apache Spark Notebooks that can be used to read, write, query, explore, and visualize datasets

### ETL in Azure Databricks
- Combine Azure Databricks with [Azure Data Factory](/notes/computer/microsoft/azure/big-data/azure-databricks/azure-data-factory)
- Benefits of Azure Data Factory
    - Connect to 90+ other Data Sources
    - Create Pipelines
    - Schedule Pipelines as Jobs
    - Visual Interface
- Azure Databricks helps to Transform, Clean, and Join Disparate Data

### Machine Learning in Azure Databricks
- Databricks Runtime ML
- Integrates with commonly used Open-Source Libraries
- MLflow for end-to-end ML Lifecycle
- Combine with Azure Machine Learning and Azure DevOps

### Understanding Streaming in Spark
- Structured Streaming
    - Built on top of Spark SQL Engine
    - Handles continuously streaming data
    - Improvement from Apache Spark Streaming 
- Leverages DataFrame API
- Can be queried with any SQL query
- Use Cases - Real-time scenarios like:
    - Sensors,
    - IoT,
    - social networks etc.

---
# References

---
title: Relational Database
description: 
date: 2024-06-22T07:18:00Z
keywords: 
draft: false
tags:
---
- Used for storing structured data in tables
- Are created and queried using the Structured Query Language (SQL)
- SQL is a declarative language
- Have a schema that describes all tables, fields, field types, and relations between tables
- Schema is enforced on write
### Consists of
- Entities - Things of interest 
- Relationships - Between the entities
### Relational Database Key Facts
- All Data is tabular
- All table rows have the same set of columns
- Table may contain any number of rows
- Primary Key uniquely identifies row in a table
- Foreign Key references row in related table
### Normal Forms
- Redundant Data wastes space and causes maintenance problems
- In most cases 3rd Normal Form is considered necessary
- Eliminate transitive dependency

Relational databases are suitable for transaction processing.
### Key Concepts of OLTP
- Suitable for high volume of transactions
- Support Insert, Update and Delete statements
- Convenient for running ad-hoc queries
- Focus on Data Integrity

Transaction systems are for WRITE, analytical systems are for READ
### OLAP in a Nutshell
- Big Picture - Focus shifts from single transaction to aggregated data
- Generate Insights - Sales trends, customer retention, process improvement
### Data Ingestion
- Capture raw data
- Multiple different sources
- Repository for raw data storage
### Data Transformation
- Data format is not suitable
- Address Data anomalies
- Apply cleaning operations
- Prepare data for various KPIs
### Data Analysis
- Query Data - Ad-hoc data analysis
- Visualize Data - Bar charts, Pie charts, changes over time
- Visualization Tools - Power BI, Tableau, Qlik

OLTP vs OLAP

| OLTP | OLAP | 
| --- | --- |
| Large number of small transactions | Large volumes of data | 
| WRITE operations (Insert, Update) | READ operations (Select) |
| Industry-specific (retail, banking) | Subject-specific (sales, marketing) |
| Transactions as source | Aggregated data from transactions |
| Increase productivity of end-users | Increase productivity of analysts and executives |
| Normalized databases for efficiency | Denormalized databases for analysis |


---
# References
[Transactional Workloads](/notes/computer/database/transactional-workloads)

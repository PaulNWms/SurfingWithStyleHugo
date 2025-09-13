---
title: Azure VM Deployment
description: 
date: 2025-05-15T06:59
keywords: 
draft: false
tags:
---
Imperative
- Azure CLI
- PowerShell

Declarative (DSC - Desired State Configuration)
- ARM (JSON)
- Bicep (YAML)
- Terraform (HCL - Hashicorp Configuration Language)
- Ansible (YAML/Python)

### CLI
```CMD
az vm create \
--resource-group cwgassets-rg \
--name cookingsrv \
--image UbuntuLTS \
--generate-ssh-keys \
--admin-username azureuser \
--public-ip-sku Standard
```

---
# References

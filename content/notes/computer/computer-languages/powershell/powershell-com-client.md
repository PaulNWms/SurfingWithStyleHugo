---
title: PowerShell COM Client
description: 
date: 2023-11-04
keywords: 
draft: false
tags:
---
Use New-Object to instantiate a COM object over its dispatch interface.

```PowerShell
$hello = New-Object -ComObject 'Hello.Greeter'
```

If you know the CLSID but not the ProgID, you can do this:

```PowerShell
$comObject = [Activator]::CreateInstance([type]::GetTypeFromCLSID($guid))
```

---
# References

---
title: "Powershell"
date: 2020-06-17
---

```powershell
# show version
$PSVersionTable

# online help
help <cmdlet> -Online

# pop up a window
Show-Command <cmdlet>

Get-PSProvider

Get-PSDrive

New-Item -ItemType File empty.txt

Set-Item -Path alias:npp -Value "C:\Program Files\Notepad++\notepad++.exe"

# change registry value
Set-ItemProperty

Export-CSV, Export-CliXML

diff -ReferenceObject <object 1> -DifferenceObject <object 2>

Out-File, Out-Printer, Out-GridView

Get-Process -Name notepad | Stop-Process

$ConfirmPreference

# list snapins
Get-PSSnapin

# show module path
Get-Content env:PSModulePath

# load a module and list its API
Import-Module DnsClient
Get-Command -Module DnsClient

Get-Member

Import-Module PSWorkflow

Format-Table, Format-List, Format-Wide
```
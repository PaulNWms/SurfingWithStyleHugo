Import-Module powershell-yaml

Add-Type -AssemblyName System.Core

$sourceDir = "$PSScriptRoot\..\..\..\Documents\Vault\Zettelkasten"
$tempDir = "$PSScriptRoot\temp"
$targetDir = "$PSScriptRoot\content\study\Factoids"
$mdFiles = Get-ChildItem "$sourceDir\*.md"
$copied = 0
$skipped = 0

class Page {
    [string]$Name
    [string]$FileName
    [string]$TargetPath
    [string[]]$Yaml
    [Hashtable]$Properties
    [Page]$Parent
    [System.Collections.Generic.List[Page]]$Children
    static [System.Collections.Generic.SortedDictionary[string,Page]]$Visited

    Page([System.IO.FileInfo]$fileInfo) {
        $this.FileName = $fileInfo.FullName
        $this.Name = [Page]::LinkToFile($fileInfo.Name)
        $this.Yaml = @()
        [bool]$yamlStarted = $false
        foreach ($line in (Get-Content $this.FileName)) {
            if ($yamlStarted -and $line -match '^---') {
                break
            }
            elseif (-not $yamlStarted -and $line -match '^---') {
                $yamlStarted = $true
                continue
            }

            $this.Yaml += $line
        }

        $this.Properties = ConvertFrom-Yaml ($this.Yaml | Join-String -Separator "`r`n")
    }

    static [string] LinkToFile([string]$inputString) {
        $formattedString = $inputString.ToLower()
        $regex = '(.*?)(\.md)?$'
        if ($formattedString -match $regex) {
            $formattedString = $Matches[1]
        }
        $formattedString = $formattedString -replace '\W', '-'
        $formattedString = $formattedString -replace '[-]+', '-'
        $formattedString = $formattedString -replace '-$', ''
        return $formattedString
    }

    [int] get_ChildrenCount() {
        return $this.Children.Count
    }

    [void] AssignTargetPath() {
        [Page]::Visited = @{}
        $this.AssignTargetPathHelper()
    }

    [void] AssignTargetPathHelper() {
        if ([Page]::Visited[$this.Name]) {
            Write-Host "$($this.Name) already visited"
            return
        }

        if ($this.Parent) {
            if ($this.Parent.TargetPath) {
                $this.TargetPath = Join-Path $this.Parent.TargetPath $this.Name
            } else {
                $this.Parent.AssignTargetPathHelper()
                return
            }
        } else {
            $this.TargetPath = $this.Name
        }

        [Page]::Visited[$this.Name] = $this

        foreach ($child in $this.Children) {
            $child.AssignTargetPathHelper()
        }
    }

    [string] ToString() {
        return $this.Name, $this.get_ChildrenCount()
    }
}

# 1) Copy files to temp dir
Remove-Item -Recurse $tempDir
New-Item -ItemType Directory $tempDir
foreach ($mdFile in $mdFiles) {
    $sourcePage = [Page]::new($mdFile)
    if ($sourcePage.Properties["tags"] -contains 'private') {
        Write-Host "Skipping $($mdFile.Name)"
        $skipped++
    } else {
        Copy-Item -Force $mdFile.FullName (Join-Path $tempDir $mdFile.Name)
        $copied++
    }
}

Write-Host "Copied: $copied, Skipped: $skipped"

# Populate hash
$mds = Get-ChildItem -Path $tempDir -Filter *.md
[System.Collections.Generic.SortedDictionary[string,Page]]$pages = @{}
foreach ($md in $mds) {
    $page = [Page]::new($md)
    $pages[$page.Name] = $page
    foreach ($line in $page.Yaml) {
        if ($line -match 'parent:\s*(.*)') {
            $parent = [Page]::LinkToFile($Matches[1])
            $page.Parent = $pages[$parent]
            break
        }
    }
}

# Decorate hash with parents and children, and rewrite links to standard markdown format
$regex = '\[\[(.*?)]]'
foreach ($page in $pages.Values) {
    $lines = Get-Content $page.FileName
    for ($i = 0; $i -lt $lines.Count; $i++) {
        while ($lines[$i] -match $regex) {
            $link = $Matches[1]
            $target = [Page]::LinkToFile($link)
            $child = $pages[$target]
            if ($child) {
                if (-not $child.Parent) {
                    $child.Parent = $page
                }
                $page.Children += $child
            }
            $target = "../$target/"
            $lines[$i] = $lines[$i].Replace($Matches[0], "[$link]($target)")
        }
    }
    $lines | Out-File -FilePath $md
}

# The subjects are the pages with no parent
$subjects = $pages.GetEnumerator() | 
    Where-Object { -not $_.Value.Parent } |
    ForEach-Object { $_.Value }

$subjects | select -Property Name, TargetPath, Parent, Children, Yaml | fl

foreach ($subject in $subjects) {
    $pages[$subject.Name].AssignTargetPath()
}

$pages.Values | select -Property Name, TargetPath, Parent, Children | ft

Pop-Location
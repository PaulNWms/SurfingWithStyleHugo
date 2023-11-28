using namespace System.Collections.Generic
using namespace System.IO
using namespace System.Web.HttpUtility

Import-Module powershell-yaml

Add-Type -AssemblyName System.Core
Add-Type -AssemblyName System.Text.RegularExpressions

$sourceDir = "$PSScriptRoot\..\..\..\Documents\Vault\Zettelkasten"
$tempDir = "$PSScriptRoot\temp"
$targetDir = "notes"
$imageSourcePath = "$PSScriptRoot\..\..\..\Documents\Vault\Files\*"
$imageTargetDir = "$PSScriptRoot\static\img"
$targetUrlBase = "notes"
$mdFiles = Get-ChildItem "$sourceDir\*.md"
$copied = 0
$skipped = 0

class Zettel {
    [string]$Name
    [string]$FileName
    [string]$TargetPath
    [string[]]$Yaml
    [Hashtable]$Properties
    [Zettel]$Parent
    [List[Zettel]]$Children
    static [SortedDictionary[string,Zettel]]$Visited

    Zettel([FileInfo]$fileInfo) {
        $this.FileName = $fileInfo.FullName
        $this.Name = [Zettel]::TransformLinkToFilename($fileInfo.Name)
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

    static [string] TransformLinkToFilename([string]$inputString) {
        $formattedString = $inputString.ToLower()
        $regex = '(.*?)(\.md)?$'
        if ($formattedString -match $regex) {
            $formattedString = $Matches[1]
        }
        $formattedString = $formattedString -replace '\s', '-'
        $formattedString = $formattedString -replace "'", ''
        $formattedString = $formattedString -replace '\(', ''
        $formattedString = $formattedString -replace '\)', ''
        $formattedString = $formattedString -replace '&', 'and'
        $formattedString = $formattedString -replace '\+', '-plus'
        $formattedString = $formattedString -replace '-$', ''
        return $formattedString
    }

    [int] get_ChildrenCount() {
        return $this.Children.Count
    }

    static [void] AssignTargetPaths($subjects) {
        [Zettel]::Visited = @{}

        foreach ($subject in $subjects) {
            $subject.AssignTargetPathHelper($true)
        }
    }

    static [void] AssignOrphans($orphans) {
        [Zettel]::Visited = @{}

        foreach ($orphan in $orphans) {
            $orphan.AssignTargetPathHelper($false)
        }
    }

    [void] AssignTargetPathHelper([bool]$isSubject) {
        if ([Zettel]::Visited[$this.Name]) {
            Write-Host "$($this.Name) already visited"
            return
        }

        [Zettel]::Visited[$this.Name] = $this

        if ($this.Parent) {
            if (-not $this.Parent.TargetPath) {
                $this.Parent.AssignTargetPathHelper($isSubject)
            }

            if ($this.Parent.TargetPath) {
                $this.TargetPath = $($this.Parent.TargetPath) + '/' + $this.Name
            } else {
                # leave it orphaned for now
            }
        }
        elseif ($isSubject) {
            $this.TargetPath = $this.Name
        }

        if ($this.TargetPath) {
            foreach ($child in $this.Children) {
                $child.AssignTargetPathHelper($isSubject)
            }
        }
    }

    [string] ToString() {
        return $this.Name, $this.get_ChildrenCount()
    }
}

# Delete temp and target folders
Remove-Item -Recurse $tempDir
New-Item -ItemType Directory $tempDir | Out-Null
Remove-Item -Recurse "$PSScriptRoot\content\$targetDir"
New-Item -ItemType Directory "$PSScriptRoot\content\$targetDir" | Out-Null

# Copy files to temp dir
foreach ($mdFile in $mdFiles) {
    $sourcePage = [Zettel]::new($mdFile)
    $tags = $sourcePage.Properties['tags']
    foreach ($tag in $tags) {
        if ($tag -match 'private') {
            Write-Host "Skipping $($mdFile.Name)"
            $skipped++
            continue
        }
    }
    Copy-Item -Force $mdFile.FullName (Join-Path $tempDir $mdFile.Name)
    $copied++
}

Write-Host "Copied: $copied, Skipped: $skipped"

# Copy bitmaps
Copy-Item -Path $imageSourcePath -Destination $imageTargetDir -Recurse -Include *.png, *.jpg, *.bmp

# Populate hash
$mds = Get-ChildItem -Path $tempDir -Filter *.md
[SortedDictionary[string,Zettel]]$pages = @{}
foreach ($md in $mds) {
    $page = [Zettel]::new($md)
    $pages[$page.Name] = $page
}

# Decorate hash with parents and children
$linkPattern = '\[\[(.*?)]]'
foreach ($page in $pages.Values) {
    $lines = Get-Content $page.FileName
    if ($page.Properties['parent']) {
        $parent = [Zettel]::TransformLinkToFilename($page.Properties['parent'])
        $page.Parent = $pages[$parent]
    }
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $regexMatches = [Regex]::Matches($lines[$i], $linkPattern)
        foreach ($match in $regexMatches) {
            $link = $match.Groups[1]
            $target = [Zettel]::TransformLinkToFilename($link)
            $child = $pages[$target]
            if ($child) {
                if (-not $child.Parent) {
                    $child.Parent = $page
                }
                $page.Children += $child
            }
        }
    }
}

# The subjects are the pages with no parent
$subjects = $pages.GetEnumerator() | 
    Where-Object { -not $_.Value.Parent } |
    ForEach-Object { $_.Value }

[Zettel]::AssignTargetPaths($subjects)

# Because of the way we're doing this, some orphans are expected
$oldOrphanCount = 0
while ($true) {
    $orphans = $pages.GetEnumerator() | 
        Where-Object { -not $_.Value.TargetPath } |
        ForEach-Object { $_.Value }

    if (-not $orphans.Count) { break }

    if ($orphans.Count -eq $oldOrphanCount) {
        Write-Host
        Write-Host "*** Some pages were orphaned ***"
        foreach ($page in $orphans) {
            Write-Host $page.Name
        }
        Write-Host
        break
    }

    [Zettel]::AssignOrphans($orphans)
    $oldOrphanCount = $orphans.Count
}

$pages.Values | Select-Object -Property Name, TargetPath, Parent, Children | Format-Table

$content = @"
---
title: Notes
weight: 300
---
"@
$content | Out-File -Force -FilePath "$PSScriptRoot\content\$targetDir\_index.md"

# Rewrite links to standard markdown format and new path
$imagePattern = '!\[\[(.*?)]]'
$linkPattern = '\[\[(.*?)]]'
$mathJaxPattern = '(\$\$.*?\$\$)|(\$.*\$)'
foreach ($page in $pages.Values) {
    $lines = Get-Content $page.FileName
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $regexMatches = [Regex]::Matches($lines[$i], $imagePattern, [Text.RegularExpressions.RegexOptions]::IgnoreCase)
        foreach ($match in $regexMatches) {
            $image =  [uri]::EscapeUriString($match.Groups[1].Value)
            $image = "![image](/img/$image)"
            $lines[$i] = $lines[$i].Replace($match.Groups[0].Value, $image)
        }

        $regexMatches = [Regex]::Matches($lines[$i], $linkPattern, [Text.RegularExpressions.RegexOptions]::IgnoreCase)
        foreach ($match in $regexMatches) {
            $link = $match.Groups[1]
            $target = [Zettel]::TransformLinkToFilename($link)
            $targetPage = $pages[$target]
            $lines[$i] = $lines[$i].Replace($match.Groups[0], "[$link](/$targetUrlBase/$($targetPage.TargetPath))")
        }

        # While we're here, escape underscores in MathJax
        $regexMatches = [Regex]::Matches($lines[$i], $mathJaxPattern, [Text.RegularExpressions.RegexOptions]::IgnoreCase)
        foreach ($match in $regexMatches) {
            $eqn = $match.Groups[0].Value
            $eqn = $eqn -replace '_', '\_'
            $lines[$i] = $lines[$i].Replace($match.Groups[0].Value, $eqn)
        }
    }

    if ($page.Parent) {
        $parentFullDir = "$PSScriptRoot\content\$targetDir\$($page.Parent.TargetPath)"
        if (-not (Test-Path "$parentFullDir")) {
            New-Item -ItemType Directory $parentFullDir | Out-Null
        }
    } else {
        $parentFullDir = "$PSScriptRoot\content\$targetDir"
    }

    if ($page.Children) {
        $targetFullDir = "$PSScriptRoot\content\$targetDir\$($page.TargetPath)"
        if (-not (Test-Path $targetFullDir)) {
            New-Item -ItemType Directory $targetFullDir | Out-Null
        }
        $lines | Out-File -Force -FilePath "$targetFullDir\_index.md"
    } else {
        $lines | Out-File -Force -FilePath "$PSScriptRoot\content\$targetDir\$($page.TargetPath).md"
    }
}

$subjects | Select-Object -Property Name, Children | Format-Table

Pop-Location
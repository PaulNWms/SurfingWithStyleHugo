Add-Type -AssemblyName System.Core

$sourceDir = "..\..\..\Documents\Vault\Zettelkasten"
$targetDir = ".\content\study\Factoids"
$mdFiles = Get-ChildItem "$sourceDir\*.md"
$copied = 0
$skipped = 0

class Page {
    [string]$Name
    [string]$FileName
    [string]$Slug
    [Page]$Parent
    [System.Collections.Generic.List[Page]]$Children
    static [System.Collections.Generic.SortedDictionary[string,Page]]$Visited

    Page([System.IO.FileInfo]$fileInfo) {
        $this.FileName = $fileInfo.FullName
        $this.Name = [Page]::LinkToFile($fileInfo.Name)
    }

    static [string] LinkToFile([string]$inputString) {
        $formattedString = $inputString.ToLower()
        $regex = '(.*?)(\.md)?$'
        if ($formattedString -match $regex) {
            $formattedString = $Matches[1]
        }
        $formattedString = $formattedString -replace '\W', '-'        
        return $formattedString
    }

    [int] get_ChildrenCount() {
        return $this.Children.Count
    }

    [void] AssignSlug() {
        [Page]::Visited = @{}
        $this.AssignSlugHelper()
    }

    [void] AssignSlugHelper() {
        [Page]::Visited[$this.Name] = $this

        if ($this.Parent) {
            $this.Slug = $this.Parent.Slug + '/' + $this.Name
        } else {
            $this.Slug = $this.Name
        }

        foreach ($child in $this.Children) {
            if (-not [Page]::Visited[$child.Name]) {
                $child.AssignSlugHelper()
            } else {
                Write-Host "$($child.Name) already visited"
            }
        }
    }

    [string] ToString() {
        return $this.Name, $this.get_ChildrenCount()
    }
}

# 1) Copy files
foreach ($mdFile in $mdFiles) {
    foreach ($line in (Get-Content $mdFile)) {
        if ($line -match 'tags:') {
            if ($line -match 'private') {
                Write-Host "Skipping $($mdFile.Name)"
                $skipped++
            } else {
                Copy-Item -Force $mdFile.FullName (Join-Path $targetDir $mdFile.Name)
                $copied++
            }
            break
        }
    }
}

Write-Host "Copied: $copied, Skipped: $skipped"

# Populate hash
Push-Location $targetDir
$mds = Get-ChildItem *.md
[System.Collections.Generic.SortedDictionary[string,Page]]$pages = @{}
foreach ($md in $mds) {
    $page = [Page]::new($md)
    $pages[$page.Name] = $page
}

# Decorate hash with parents and children, and rewrite links to standard markdown format
$regex = '\[\[(.*?)]]'
foreach ($page in $pages.Values) {
    $lines = Get-Content $page.FileName
    for($i = 0; $i -lt $lines.Count; $i++) {
        while ($lines[$i] -match $regex) {
            $link = $Matches[1]
            $target = [Page]::LinkToFile($link)
            $child = $pages[$target]
            if ($child) {
                $child.Parent = $page
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

$subjects | select -Property Name, Slug, Parent, Children | ft

foreach ($subject in $subjects) {
    $pages[$subject.Name].AssignSlug()
}

$pages.Values | select -Property Name, Slug, Parent, Children | ft

Pop-Location
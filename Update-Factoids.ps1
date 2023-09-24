$sourceDir = "..\..\..\Documents\Vault\Zettelkasten"
$targetDir = ".\content\study\Factoids"
$mdFiles = Get-ChildItem "$sourceDir\*.md"
$copied = 0
$skipped = 0
foreach ($mdFile in $mdFiles) {
    foreach ($line in (Get-Content $mdFile)) {
        if ($line -match 'tags:') {
            if ($line -match '#private') {
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

Push-Location $targetDir

$regex = '\[\[(.*?)]]'
$mds = Get-ChildItem *.md
foreach ($md in $mds) {
    $lines = Get-Content $md
    for($i = 0; $i -lt $lines.Count; $i++) {
        while ($lines[$i] -match $regex) {
            $link = $Matches[1]
            $folder = "$($Matches[1].ToLower())"
            $folder = $folder -replace '\W', '-'
            $folder = "../$folder/"
            $lines[$i] = $lines[$i].Replace($Matches[0], "[$link]($folder)")
        }
    }
    $lines | Out-File -FilePath $md
}

Pop-Location
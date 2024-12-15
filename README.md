In one window, run `hugo server --disableFastRender`

In a second window, 
- run `Update-Notes.ps1` to generate the Notes from Obsidian
- run `(Get-Content .\DiscreteMath_in.txt) -replace '$', '<br />' | pandoc -f html+tex_math_dollars -t html --mathml --columns=200 -o junk.txt; (Get-Content .\junk.txt) -replace '<br />', '' | Out-File -Encoding utf8 DiscreteMath.txt` to update the math
- run `npm run build`

To generate some of the .md files,
```powershell
pushd src\prolog
swipl -s .\guitar.pl
popd
```



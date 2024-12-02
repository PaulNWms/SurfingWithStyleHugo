In one window, run `hugo server --disableFastRender`

In a second window, 
- run `Update-Notes.ps1` to generate the Notes from Obsidian
- run `npm run build`

To generate some of the .md files,
```powershell
pushd src\prolog
swipl -s .\guitar.pl
popd
```



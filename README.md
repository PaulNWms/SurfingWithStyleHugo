In one window, run `hugo server --disableFastRender`

In a second window, run `npm run build`

To generate some of the .md files,
```powershell
pushd src\prolog
swipl -s .\guitar.pl
popd
```



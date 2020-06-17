---
title: "MSBuild"
date: 2020-06-17
---

# MSBuild
Links:  
[Walkthrough: Creating an MSBuild Project File from Scratch](https://msdn.microsoft.com/en-us/library/dd576348.aspx)  
[Common MSBuild Project Items](https://msdn.microsoft.com/en-us/library/bb629388.aspx")  
[MSBuild Well-known Item Metadata](https://msdn.microsoft.com/en-us/library/ms164313.aspx)  
[MSBuild Task Reference](https://msdn.microsoft.com/en-us/library/7z253716.aspx)  
[MSBuild Extension Pack](https://github.com/mikefourie/MSBuildExtensionPack")

Minimal project template:  
```xml
<?xml version="1.0" encoding="utf-8" ?>
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">  
  <PropertyGroup>  
    <AssemblyName>MSBuildSample</AssemblyName>  
    <OutputPath>Bin\</OutputPath>  
  </PropertyGroup>  
  <ItemGroup>  
    <Compile Include="helloworld.cs" />
  </ItemGroup>  
  <Target Name="Build">  
    <MakeDir Directories="$(OutputPath)" Condition="!Exists('$(OutputPath)')" />
    <Csc Sources="@(Compile)" OutputAssembly="$(OutputPath)$(AssemblyName).exe" />
  </Target>  
  <Target Name="Clean">  
    <Delete Files="$(OutputPath)$(AssemblyName).exe" />
  </Target>  
  <Target Name="Rebuild" DependsOnTargets="Clean;Build" />
</Project>  
```

Targets can be called explicitly (uncommon) with the CallTarget task  
`<CallTarget Target="TargetA;TargetB" />`

Targets can have dependencies  
`<Target Name="TargetC" DependsOnTargets="TargetA;TargetB" />`

Invoking TargetC will then be followed by TargetB  
`<Target Name="TargetB" AfterTargets="TargetC" />`

Invoking TargetC will then be preceded by TargetA  
`<Target Name="TargetA" BeforeTargets="TargetC" />`

Conditional invocation  
```xml
<PropertyGroup>
  <DoIt>true</DoIt>
</PropertyGroup>
<Target Name="TargetC" Condition="$(DoIt)" />
```

Typically .proj imports .targets, and .targets imports .props  
Import .tasks where needed  
`<Import Project="Common.props" />`

The mother ship is  
`<Import Project="$(MSBuildToolsPath)\Microsoft.CSharp.targets" />`

Special targets defined in Microsoft.CSharp.targets  
`<Target Name="BeforeBuild" />`
`<Target Name="AfterBuild" />`

Generate locale folders (cross join):  
```xml
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="CrossJoin" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup>
    <Locales Include="en;fr" />
    <Files Include="A.md;B.md" />
  </ItemGroup>

  <Target Name="CrossJoin">
    <ItemGroup>
      <OutputFiles Include="@(Files)">
        <Locale>%(Locales.Identity)</Locale>
      </OutputFiles>
    </ItemGroup>
    <Message Text="%(OutputFiles.Locale)\%(OutputFiles.Identity)" />
  </Target>
</Project>
```

Bring in custom task  
`<UsingTask AssemblyFile="file name" TaskName="task name" />`

Custom tasks extend Task (recommended) or at implement ITask.

Consider using inline tasks.

Recursive list of files
```xml
<ItemGroup>
  <Compile Include=".\**\*.cs" />
</ItemGroup>
```

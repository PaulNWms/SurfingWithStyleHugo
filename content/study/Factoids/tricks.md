---
title: "tricks"
date: 2023-05-11T14:31-0800
draft: false
tags: #msbuild
---

### Union, intersection, difference, & cross-join

```xml
<Project xmlns="[http://schemas.microsoft.com/developer/msbuild/2003&quot](http://schemas.microsoft.com/developer/msbuild/2003&quot);>  
  <ItemGroup>  
    <A Include="1" />  
    <A Include="3" />  
    <A Include="5" />

    <B Include="1" />  
    <B Include="5" />  
    <B Include="7" />  
    <B Include="9" />  
  </ItemGroup>

  <Target Name="Intersect_A_B">  
    <Message Text="A=@(A) B=@(B) I=%(Identity)" />  
    <ItemGroup>  
       <C Include="@(A)" Condition=" '@(B)' == '@(A)' and %(Identity) != '' " />  
    </ItemGroup>  
    <Message Text="C=@(C)" />  
  </Target>

  <Target Name="Union_A_B">  
    <ItemGroup>  
      <C Include="@(A)" />  
      <C Include="@(B)" Exclude="@(C)" />  
    </ItemGroup>  
    <Message Text="C=@(C)" />  
  </Target>
  
  <Target Name="A_Minus_B">  
    <ItemGroup>  
      <C Include="@(A)" Exclude="@(B)" />  
    </ItemGroup>  
    <Message Text="C=@(C)" />  
  </Target>

  <Target Name="Cartesian_A_B">
    <CreateItem Include="@(A)">
      <Output TaskParameter="Include" ItemName="A_item" />
    </CreateItem>
    <CreateItem Include="@(B)">
      <Output TaskParameter="Include" ItemName="B_item" />
    </CreateItem>
    <Message Text="A_item=%(A_item.Identity), B_item=%(B_item.Identity)" />
  </Target>

</Project>
```

---
# References

---
title: PowerShell COM Client
description: 
date: 2023-11-04T15:38
keywords: 
draft: false
tags:
---
Use New-Object to instantiate a COM object over its dispatch interface.

```PowerShell
$hello = New-Object -ComObject 'Hello.Greeter'
```

If you know the CLSID but not the ProgID, you can do this:

```PowerShell
<math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>c</mi><mi>o</mi><mi>m</mi><mi>O</mi><mi>b</mi><mi>j</mi><mi>e</mi><mi>c</mi><mi>t</mi><mo>=</mo><mrow><mo stretchy="true" form="prefix">[</mo><mi>A</mi><mi>c</mi><mi>t</mi><mi>i</mi><mi>v</mi><mi>a</mi><mi>t</mi><mi>o</mi><mi>r</mi><mo stretchy="true" form="postfix">]</mo></mrow><mo>:</mo><mo>:</mo><mi>C</mi><mi>r</mi><mi>e</mi><mi>a</mi><mi>t</mi><mi>e</mi><mi>I</mi><mi>n</mi><mi>s</mi><mi>t</mi><mi>a</mi><mi>n</mi><mi>c</mi><mi>e</mi><mo stretchy="false" form="prefix">(</mo><mrow><mo stretchy="true" form="prefix">[</mo><mi>t</mi><mi>y</mi><mi>p</mi><mi>e</mi><mo stretchy="true" form="postfix">]</mo></mrow><mo>:</mo><mo>:</mo><mi>G</mi><mi>e</mi><mi>t</mi><mi>T</mi><mi>y</mi><mi>p</mi><mi>e</mi><mi>F</mi><mi>r</mi><mi>o</mi><mi>m</mi><mi>C</mi><mi>L</mi><mi>S</mi><mi>I</mi><mi>D</mi><mo stretchy="false" form="prefix">(</mo></mrow><annotation encoding="application/x-tex">comObject = [Activator]::CreateInstance([type]::GetTypeFromCLSID(</annotation></semantics></math>guid))
```

---
# References

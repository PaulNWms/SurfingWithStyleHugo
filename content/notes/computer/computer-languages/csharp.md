---
title: CSharp
date: 2023-10-27
description: 
keywords: 
draft: false
tags:
---
Contextual keywords allow keywords to be used as identifiers.

To use a keyword as an identifier, escape it with @, e.g. @class.

Generics (C# 2), e.g. List&lt;int&gt;

Nullable types (C# 2), e.g. int?

Iterators (C# 2), e.g. IEnumerator&lt;int&gt; w/ yield return

Anonymous types (C# 3) with the var keyword.

Object initializers (C# 3), e.g. var x = new C() { Prop = val };

Collection initializers (C# 3), e.g. var x = new List&lt;int&gt; { 1, 2, 3 };

Extension methods (C# 3), e.g. public static string Reverse(this string s)

Lambda expressions (C# 3), e.g. Func&lt;int, int, int&gt; x = (a, b) => a + b;

Expression trees (C# 3), e.g. Expression&lt;Func&lt;int, int, int&gt;&gt; x = (a, b) => a + b;

Automatic properties (C# 3), e.g. public int X { get; private set; }

Dynamic types (C# 4), e.g. dynamic x = 3;

Named and optional parameters (C# 4), e.g. GetWorksheet().Shapes.Add(X1ChartType.Bar, Width: 400, Height: 300); // omits params

Covariance (C# 4), e.g. interface IEnumerable&lt;out T&gt;

Contravariance (C# 4), e.g. interface IComparer&lt;in T&gt;

async/await (C# 5)

The CLR is located under %windir%\Microsoft.NET\Framework

To look at array initialization data, find the array's address using ildasm.exe and look at the module with dumpbin.exe.

```csharp
// jagged array  
int[][] vectors = new int[3][];

// multidimensional array  
byte[,] sudoku = new byte[9,9];

// nullable  
int? d = null;

// null coalescing operator  
return d ?? 0;

// Test for overflow, which is unchecked by default  
int res = checked(max +1);

// "soft" type check operator (IL: isinst)  
bool isInt = d is int;

// "soft" type cast operator (IL: isinst)  
string s = o as string;
```

---
# References

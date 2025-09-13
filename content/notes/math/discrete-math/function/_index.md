---
title: Functions
description: 
date: 2025-04-10T06:43
keywords: 
draft: false
tags:
---
### Discrete Math

Let A and B be [Set](/notes/math/discrete-math/set)s.  A _function_ from A to B is an assignment of a unique element of B to each element of A.

If f is a function from A to B, we say that a is the _domain_ of f and B is the _codomain_ of f. If <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>a</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">f(a) = b</annotation></semantics></math> we say that b is the _image_ of a and a is a _pre-image_ of b. The _range_ of f is the set of all images of elements of A.

A function f is said to be _one-to-one_ or _injective_, if <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>≠</mo><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>y</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">f(x) ≠ f(y)</annotation></semantics></math> whenever <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mo>≠</mo><mi>y</mi></mrow><annotation encoding="application/x-tex">x ≠ y</annotation></semantics></math>. A function that is not one-to-one is not invertible.

A function f is said to be _onto_ or _surjective_, IFF for every element <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>b</mi><mo>∈</mo><mi>B</mi></mrow><annotation encoding="application/x-tex">b ∈ B</annotation></semantics></math> there is an element <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>∈</mo><mi>A</mi></mrow><annotation encoding="application/x-tex">a ∈ A</annotation></semantics></math> with <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>a</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">f(a) = b</annotation></semantics></math>.

The function f is a _one-to-one correspondence_ or a _bijection_ if it is both one-to-one and onto.

Function composition:
<math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>f</mi><mo>∘</mo><mi>g</mi><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>a</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>g</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>a</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">(f ∘ g)(a) = f(g(a))</annotation></semantics></math>
<math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>f</mi><mrow><mi>−</mi><mn>1</mn></mrow></msup><mo>∘</mo><mi>f</mi><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>a</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>a</mi></mrow><annotation encoding="application/x-tex">(f^{-1} ∘ f)(a) = a</annotation></semantics></math>


---
# References

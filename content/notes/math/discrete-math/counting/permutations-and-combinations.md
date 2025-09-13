---
title: Permutations and Combinations
description: 
date: 2025-04-13T07:48
keywords: 
draft: false
tags:
---
The number of _r-permutations_ of a set of n objects with repetition allowed is <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msup><mi>n</mi><mi>r</mi></msup><annotation encoding="application/x-tex">n^r</annotation></semantics></math>.

There are <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>+</mo><mi>r</mi><mo>−</mo><mn>1</mn><mo>,</mo><mi>r</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">C(n + r - 1, r)</annotation></semantics></math> _r-combinations_ from a set of n elements when repetition of elements is allowed.

The number of permutations of n objects, where there are <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msub><mi>n</mi><mn>1</mn></msub><annotation encoding="application/x-tex">n_1</annotation></semantics></math> indistinguishable objects of type 1, <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msub><mi>n</mi><mn>2</mn></msub><annotation encoding="application/x-tex">n_2</annotation></semantics></math> indistinguishable objects of type 2, ..., and <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msub><mi>n</mi><mi>k</mi></msub><annotation encoding="application/x-tex">n_k</annotation></semantics></math> objects of type k, is

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><mrow><mi>n</mi><mi>!</mi></mrow><mrow><msub><mi>n</mi><mn>1</mn></msub><mi>!</mi><msub><mi>n</mi><mn>2</mn></msub><mi>!</mi><mi>…</mi><msub><mi>n</mi><mi>k</mi></msub><mi>!</mi></mrow></mfrac><annotation encoding="application/x-tex">\frac{n!}{n_1!n_2!\dots n_k!}</annotation></semantics></math>

| Type           | Repetition Allowed? | Formula                     |
| -------------- | ------------------- | --------------------------- |
| r-permutations | no | <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><mrow><mi>n</mi><mi>!</mi></mrow><mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>r</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow></mfrac><annotation encoding="application/x-tex">\frac{n!}{(n-r)!}</annotation></semantics></math> |
| r-combinations | no | <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><mrow><mi>n</mi><mi>!</mi></mrow><mrow><mi>r</mi><mi>!</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>r</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow></mfrac><annotation encoding="application/x-tex">\frac{n!}{r!(n-r)!}</annotation></semantics></math> |
| r-permutations | yes | <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msup><mi>n</mi><mi>r</mi></msup><annotation encoding="application/x-tex">n^r</annotation></semantics></math> |
| r-combinations | yes | <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>+</mo><mi>r</mi><mo>−</mo><mn>1</mn><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow><mrow><mi>r</mi><mi>!</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>r</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow></mfrac><annotation encoding="application/x-tex">\frac{(n+r-1)!}{r!(n-r)!}</annotation></semantics></math> |



---
# References

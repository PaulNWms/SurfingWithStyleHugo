---
title: Geometry of Image Formation
date: 2023-05-15T05:37-0800
draft: false
tags:
  - "#OpenCV"
---
### Pinhole camera

The _focal length_ is the distance from the pinhole to the _image plane_. The size of the projected image <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo stretchy="true" form="postfix">)</mo></mrow><annotation encoding="application/x-tex">(x,y)</annotation></semantics></math> is related by the focal length <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mi>f</mi><annotation encoding="application/x-tex">f</annotation></semantics></math> and the distance to the pinhole <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mi>Z</mi><annotation encoding="application/x-tex">Z</annotation></semantics></math>.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mo>=</mo><mi>f</mi><mo>*</mo><mfrac><mi>X</mi><mi>Z</mi></mfrac></mrow><annotation encoding="application/x-tex">x = f*\frac{X}{Z}</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>y</mi><mo>=</mo><mi>f</mi><mo>*</mo><mfrac><mi>Y</mi><mi>Z</mi></mfrac></mrow><annotation encoding="application/x-tex">y = f*\frac{Y}{Z}</annotation></semantics></math>

Rays captured by a lens converge on a _focal plane_.  The distance from the lens to the image plane is twice the distance from the lens to the focal plane.

---
# References

[Image formation - Wikipedia](https://en.wikipedia.org/wiki/Image_formation)

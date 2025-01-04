---
title: Geometry of Image Formation
date: 2023-05-15T05:37-0800
draft: false
tags:
  - "#OpenCV"
---
### Pinhole camera

The _focal length_ is the distance from the pinhole to the _image plane_.  The size of the projected image $(x,y)$ is related by the focal length $f$ and the distance to the pinhole $Z$.

$$x = f*\frac{X}{Z}$$

$$y = f*\frac{Y}{Z}$$

Rays captured by a lens converge on a _focal plane_.  The distance from the lens to the image plane is twice the distance from the lens to the focal plane.

---
# References

[Image formation - Wikipedia](https://en.wikipedia.org/wiki/Image_formation)

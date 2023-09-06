---
title: "Digital Image Formation"
date: 2023-05-15T06:01-0800
draft: true
tags: #OpenCV
---

A color sensor usually has a [Bayer pattern](../bayer-pattern/), which has twice as many green pixels as red or blue pixels, because the human eye is more sensitive to green.

[Demosaicing](../demosaicing/) - The value of the 2 missing channels at each pixel is calculated by interpolation.

The raw image data is demosaiced and converted to RGB.

JPEG and most image formats contain a header with metadata and the image data as RGB.

An image in OpenCV is loaded into a standardized format represented by the [Mat](../mat/) class, which has a metadata header and the image data as BGR.


---
# References

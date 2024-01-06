---
title: "Color Images"
date: 2023-05-21T08:18-0800
draft: false
tags: 
  - "#OpenCV"
---
Matplotlib expects the image to be in RGB format whereas OpenCV stores images in BGR format. Thus, for correct display, we need to reverse the channel order of the image in order to properly render the color of the image.
```python
```

```python
# Swap the Red and Blue color channels.
logo_img = logo_img[:, :, ::-1]

# Use cv2.IMREAD_UNCHANGED to read in a PNG with an alpha channel.
logo = "Pytorch_logo.png"
logo_img = cv2.imread(logo, cv2.IMREAD_UNCHANGED)

# Swap the Red and Blue color channels using: cv2.COLOR_BGRA2RGBA.
logo_img = cv2.cvtColor(logo_img, cv2.COLOR_BGRA2RGBA)

# Display the image.
plt.figure(figsize = (12, 12))
plt.imshow(logo_img);

# Split the image into the B,G,R components.
img_bgr = cv2.imread('Emerald_Lakes_New_Zealand.jpg', cv2.IMREAD_COLOR)
b, g, r = cv2.split(img_bgr)

# Merge the individual channels into a BGR image.
imgMerged = cv2.merge((r, g, b))

# Change to HSV Color Space
img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)

# Split the image into the H, S, V components.
h, s, v = cv2.split(img_hsv)

# Modify Individual Color Channels
h_new = h + 10
img_hsv_merged = cv2.merge((h_new, s, v))
img_rgb_merged = cv2.cvtColor(img_hsv_merged, cv2.COLOR_HSV2RGB)
```

---
# References

- [**`cvtColor()`**](https://docs.opencv.org/4.5.2/d8/d01/group__imgproc__color__conversions.html#ga397ae87e1288a81d2363b61574eb8cab)
- [**`ColorConversionCodes()`** ](https://docs.opencv.org/4.5.2/d8/d01/group__imgproc__color__conversions.html#ga4e0972be5de079fed4e3a10e24ef5ef0)
- [**`split()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga0547c7fed86152d7e9d0096029c8518a)
- [**`merge()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga61f2f2bde4a0a0154b2333ea504fab1d)

---
title: Basic Image Manipulations
date: 2023-05-21T08:16:00-08:00
draft: false
tags:
  - "#OpenCV"
---
```python
# Make a copy of the original image.
mnist_3_img_copy = mnist_3_img.copy()

# Modify four pixels.
mnist_3_img_copy[2, 2] = 100
mnist_3_img_copy[2, 3] = 125
mnist_3_img_copy[3, 2] = 150
mnist_3_img_copy[3, 3] = 175

# Use numPy array slicing to modify a group of pixels.
mnist_3_img_copy[0:17,16] = 150

# Cropping an image does not require a special function in OpenCV.
img_eagle = cv2.imread('Eagle_in_Flight.jpg', cv2.IMREAD_COLOR)
plt.figure(figsize = (8, 8))
cropped_region = img_eagle[20:420, 150:600]
plt.imshow(cropped_region[:, :, ::-1]);

# Resize the image.
resized_cropped_region_2x = cv2.resize(cropped_region, None, fx = 2, fy = 2)

# Method 2: Using 'dsize'.
desired_width = 200
aspect_ratio = desired_width / cropped_region.shape[1]
desired_height = int(cropped_region.shape[0] * aspect_ratio)
dim = (desired_width, desired_height)

# Resize the image.
resized_cropped_region = cv2.resize(cropped_region, dsize = dim, interpolation = cv2.INTER_AREA)
plt.figure(figsize = (6, 6))
plt.imshow(resized_cropped_region[:, :, ::-1]);

# Flip the image three ways.
img_eagle_flipped_horz = cv2.flip(img_eagle, 1)
img_eagle_flipped_vert = cv2.flip(img_eagle, 0)
img_eagle_flipped_both = cv2.flip(img_eagle, -1)
```

---
# References

- [**`resize()`**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d)
- [**`flip()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#gaca7be533e3dac7feb70fc60635adf441)

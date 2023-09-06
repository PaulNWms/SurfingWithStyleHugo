---
title: "Thresholding in Images"
date: 2023-05-22T06:22-0800
draft: false
tags: #OpenCV
---

### Global Thresholding

```python
# Read image in grayscale.
img = cv2.imread('road_lanes.png', cv2.IMREAD_GRAYSCALE)

# Perform binary thresholding.
retval, img_thresh = cv2.threshold(img, 165, 255, cv2.THRESH_BINARY_INV)

# Display the images.
plt.figure(figsize = [20, 8])
plt.subplot(121); plt.imshow(img); plt.title('Original')
plt.subplot(122); plt.imshow(img_thresh); plt.title('Thresholded');
print(img_thresh[0][0])
```

### Adaptive Thresholding

```python
# Read the original image.
img = cv2.imread('Piano_Sheet_Music.png', cv2.IMREAD_GRAYSCALE)

# Perform adaptive thresholding.
img_thresh_adp = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 13, 7)

# Display the images.
plt.figure(figsize = [18, 15])
plt.subplot(221); plt.imshow(img);              plt.title('Original')
plt.subplot(224); plt.imshow(img_thresh_adp);   plt.title('Thresholded (adaptive)');
print(img_thresh_gbl_1[0][0])
```

---
# References

[**`threshold()`**](https://docs.opencv.org/4.5.2/d7/d1b/group__imgproc__misc.html#gae8a4a146d1ca78c626a53577199e9c57)
[**`adaptiveThreshold()`**](https://docs.opencv.org/4.5.2/d7/d1b/group__imgproc__misc.html#ga72b913f352e4a1b1b397736707afcde3)
[**`threshold tutorial`**](https://docs.opencv.org/4.5.2/d7/d4d/tutorial_py_thresholding.html)

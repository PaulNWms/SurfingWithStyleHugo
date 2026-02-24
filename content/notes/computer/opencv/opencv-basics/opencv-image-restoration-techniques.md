---
title: OpenCV Image Restoration Techniques
date: 2023-06-08T06:33:00-08:00
draft: false
tags:
  - "#OpenCV"
---
### Median Blur and Bilateral Filter
```python
# Load an images with Salt and pepper noise.
img1 = cv2.imread('images/mona_lisa.jpg')

# Apply median filter.
img1_median = cv2.medianBlur(img1, 9)

# Apply Gaussian filter for comparison.
img1_gaussian = cv2.GaussianBlur(img1, (5, 5), cv2.BORDER_DEFAULT)

plt.figure(figsize = (20, 8))
plt.subplot(131); plt.axis('off'); plt.imshow(img1[:,:,::-1]);          plt.title('Original Image with Salt & Pepper Noise')
plt.subplot(132); plt.axis('off'); plt.imshow(img1_gaussian[:,:,::-1]); plt.title('Gaussian filter applied')
plt.subplot(133); plt.axis('off'); plt.imshow(img1_median[:,:,::-1]);   plt.title('Median filter applied')

# Load image with gaussian noise.
image1 = cv2.imread('images/mri-skull-20-percent-gaussian-noise.jpg')

# diameter of the pixel neighborhood used during filtering.
dia = 20

# Larger the value the distant colours will be mixed together
# to produce areas of semi equal colors.
sigmaColor = 200

# Larger the value more the influence of the farther placed pixels 
# as long as their colors are close enough.
sigmaSpace = 100

# Apply bilateralFilter.
dst1 = cv2.bilateralFilter(image1, dia, sigmaColor, sigmaSpace)

plt.figure(figsize = (20, 12))
plt.subplot(221); plt.axis('off'); plt.imshow(image1[:,:,::-1]); plt.title("Image with 20% gaussian noise")
plt.subplot(222); plt.axis('off'); plt.imshow(dst1[:,:,::-1]);   plt.title("Bilateral blur Result")
```

###
---
# References

- [**`medianBlur()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#ga564869aa33e58769b4469101aac458f9)
- [**`bilateralFilter()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#ga9d7064d478c95d60003cf839430737ed)
- [**`inpaint()`**](https://docs.opencv.org/4.5.3/d7/d8b/group__photo__inpaint.html)

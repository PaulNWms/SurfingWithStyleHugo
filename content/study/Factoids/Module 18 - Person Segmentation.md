---
title: "Module 18 - Person Segmentation"
date: 2023-06-12T07:30-0800
draft: true
tags: #OpenCV
---

```python
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segment = mp_selfie_segmentation.SelfieSegmentation(model_selection=0)

# Convert to RGB.
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Segment the original image.
results = segment.process(img)

# Convert to BGR.
img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

# Retrieve segmentation mask from results.
img_seg_mask = results.segmentation_mask

# Apply a threhsold to generate a binary mask.
threshold = 0.5
binary_mask = img_seg_mask > threshold

plt.figure(figsize = (16,10))
plt.subplot(131); plt.axis('off'); plt.imshow(img[:,:,::-1]);                 plt.title('Original / Target Image')
plt.subplot(132); plt.axis('off'); plt.imshow(img_seg_mask, cmap='rainbow');  plt.title('Segmentation Mask')
plt.subplot(133); plt.axis('off'); plt.imshow(binary_mask);                   plt.title('Binary Mask');

# Convert the mask to a 3 channel image.
mask3d = np.dstack((binary_mask, binary_mask, binary_mask))

# Apply the mask to the original image and a new backgroud image.
img_out = np.where(mask3d, img, bg_img)

plt.figure(figsize = (15, 15))
plt.subplot(221); plt.axis('off'); plt.imshow(img[:,:,::-1]);     plt.title('Original / Target Image')
plt.subplot(222); plt.axis('off'); plt.imshow(binary_mask);       plt.title('Binary Mask');
plt.subplot(223); plt.axis('off'); plt.imshow(bg_img[:,:,::-1]);  plt.title('Background Image');
plt.subplot(224); plt.axis('off'); plt.imshow(img_out[:,:,::-1]); plt.title('Final Output');
```


---
# References

[**MediaPipe Selfie Segmentation**](https://google.github.io/mediapipe/solutions/selfie_segmentation.html) 

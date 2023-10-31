---
title: "Reading, Displaying and Saving Images"
date: 2023-05-21T08:13-0800
draft: false
tags: 
  - "#OpenCV"
---

```python
# Typical imports
import cv2
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
# Tells notebook to render figures in-page.
%matplotlib inline  
from IPython.display import Image

# Display Images Directly in the Browser
Image(filename='img_bw_18x18.png')

# Read Images using OpenCV
retval = cv2.imread(filename[, flags])

# Print the size of image.
print('Image size is ', bw_img.shape)

# Print data-type of image.
print('Data type of image is ', bw_img.dtype)

# Display the image.
plt.imshow(bw_img);

# Set color map to gray scale for proper rendering.
plt.imshow(bw_img, cmap = 'gray');

# Save BGR file
cv2.imwrite(filename, img[, params])
```

**Note**: To avoid specifying a specific color map each time you call **`imshow()`** you can include the line below at the top of your notebook where the import statements are located which will set the color map globally.

`matplotlib.rc('image', cmap = 'gray')`

```python
### Read and display an image
image = cv2.imread('Apollo-8-Launch.jpg')
plt.figure(figsize = [10, 10])
plt.imshow(image)
plt.title('Apollo-8-Launch.jpg', fontsize = 16);

# Save the image to the file system.
# The file format is determined by the file extension.
cv2.imwrite('Apollo-8-Launch.png', image)
```

---
# References

- [**`Imread()`**](https://docs.opencv.org/4.5.2/d4/da8/group__imgcodecs.html#ga288b8b3da0892bd651fce07b3bbd3a56)
- [**`ImreadModes()`**](https://docs.opencv.org/4.5.2/d8/d6a/group__imgcodecs__flags.html#ga61d9b0126a3e57d9277ac48327799c80)
- [**`imwrite()`**](https://docs.opencv.org/4.5.2/d4/da8/group__imgcodecs.html#gabbc7ef1aa2edfaa87772f1202d67e0ce)
- [**`imwriteFlags()`**](https://docs.opencv.org/4.5.2/d8/d6a/group__imgcodecs__flags.html#ga292d81be8d76901bff7988d18d2b42ac)

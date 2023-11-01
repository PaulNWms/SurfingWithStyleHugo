---
title: Super Resolution
date: 2023-06-16T06:58-0800
draft: false
tags:
  - "#OpenCV"
---
```Python
# Create super-resolution object.
obj = cv2.dnn_superres.DnnSuperResImpl_create()

# Path to the model.
obj.readModel(modelPath)

# Specify the method (one of "fsrcnn", "espcn", "lapsrn", "edsr") and scale.
obj.setModel(method, scale)

# Perform Upsampling
obj.upsample(image)
```

---
# References

- [Deep Learning for Image Super-resolution: A Survey](https://arxiv.org/pdf/1902.06068.pdf)
    1. [FSRCNN (Accelerating the Super-Resolution Convolutional Neural Network)](https://arxiv.org/pdf/1608.00367.pdf) - released in ECCV 2016
    2. [ESPCN (Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network)](https://arxiv.org/pdf/1609.05158.pdf) - released in CVPR 2016
    4. [EDSR (Enhanced Deep Residual Networks for Single Image Super-Resolution)](https://arxiv.org/pdf/1707.02921.pdf) - released in CVPR 2017 
    3. [LAPSRN (Fast and Accurate Image Super-Resolution with Deep Laplacian Pyramid Networks)](https://arxiv.org/pdf/1710.01992.pdf) - released in CVPR 2017
    1. [FSRCNN](https://github.com/Saafke/FSRCNN_Tensorflow/tree/master/models)
    2. [ESPCN](https://github.com/fannymonori/TF-ESPCN/tree/master/export)
    3. [LapSRN](https://github.com/fannymonori/TF-LapSRN/tree/master/export)
    4. [EDSR](https://github.com/Saafke/EDSR_Tensorflow/tree/master/models)
- [**`Super Resolution`**](https://docs.opencv.org/4.5.3/d9/de0/group__dnn__superres.html)

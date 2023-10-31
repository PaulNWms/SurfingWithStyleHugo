---
title: Module 9 - Lane Detection using Hough Transforms
date: 2023-06-07T18:40-0800
draft: false
tags:
  - "#OpenCV"
---

```python
def draw_lines(img, lines, color = [255, 0, 0], thickness = 2):
    """Utility for drawing lines."""
    if lines is not None:
        for line in lines:
            for x1,y1,x2,y2 in line:
                cv2.line(img, (x1, y1), (x2, y2), color, thickness)

# Hough transform parameters set according to the input image.
rho = 1
theta = np.pi / 180
threshold = 50
min_line_len = 10
max_line_gap = 20

lines = cv2.HoughLinesP(
    canny_blur, rho, theta, threshold, minLineLength = min_line_len, maxLineGap = max_line_gap)

# Draw all lines found onto a new image.
hough = np.zeros((img.shape[0], img.shape[1], 3), dtype = np.uint8)
draw_lines(hough, lines)

print("Found {} lines, including: {}".format(len(lines), lines[0]))
plt.figure(figsize = (15, 10)); plt.imshow(hough);
```

---
# References

- [**`fillPoly()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga311160e71d37e3b795324d097cb3a7dc)
- [**`Canny()`**](https://docs.opencv.org/4.5.2/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de)
- [**`GaussianBlur()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gaabe8c836e97159a9193fb0b11ac52cf1)
- [**`HoughLinesP()`**](https://docs.opencv.org/4.5.2/dd/d1a/group__imgproc__feature.html#ga8618180a5948286384e3b7ca02f6feeb)
- [**`line()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga7078a9fae8c7e7d13d24dac2520ae4a2)
- [**`VideoCapture()`**](https://docs.opencv.org/4.5.2/d8/dfe/classcv_1_1VideoCapture.html#ac4107fb146a762454a8a87715d9b7c96) 
- [**`VideoWriter()`**](https://docs.opencv.org/4.5.2/dd/d9e/classcv_1_1VideoWriter.html#ad59c61d8881ba2b2da22cff5487465b5) 
- [**`write()`**](https://docs.opencv.org/4.5.2/dd/d9e/classcv_1_1VideoWriter.html#a30ebbc09c122332f62bd706b43f02a98)
- [**`release()`**](https://docs.opencv.org/4.5.2/dd/d9e/classcv_1_1VideoWriter.html#a667f737e56d5ba6b0533c6c7bf941140)

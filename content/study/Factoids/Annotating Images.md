---
title: "Annotating Images"
date: 2023-05-21T08:36-0800
draft: true
tags: #OpenCV 
---

```python
# Make a copy of the original image.
image_line = image.copy()

# Draw a yellow line (using: cv2.LINE_8)
image_line = cv2.line(image_line, (0, 445), (450, 465), yellow, thickness=3, lineType=cv2.LINE_8)

# Display the annotated image.
plt.figure(figsize = [10, 10])
plt.imshow(image_line[:, :, ::-1]);

# Make a copy of the original image.
image_circle = image.copy()

# Draw a red circle.
image_circle = cv2.circle(image_circle, (195, 55), 20, red, thickness = 2, lineType = cv2.LINE_AA)

# Display the annotated image.
plt.figure(figsize = [8, 8])
plt.imshow(image_circle[:, :, ::-1]);

# Make a copy of the original image.
image_rectangle = image.copy()

# Draw a magenta rectangle.
image_rectangle = cv2.rectangle(image_rectangle, (300, 150), (480, 420), magenta, thickness = 3, lineType = cv2.LINE_8)

# Display the annotated image.
plt.figure(figsize = [8, 8])
plt.imshow(image_rectangle[:, :, ::-1]);

# Make a copy of the original image.
image_text = image.copy()

# Add text to the image.
text = 'Apollo 8 Saturn V Launch, 21 Dec 1968'
font_face = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.8
font_color = green
font_thickness = 1

image_text = cv2.putText(image_text, text, (45, 30), font_face, font_scale, font_color, font_thickness, cv2.LINE_AA)

# Display the annotated image.
plt.figure(figsize = [10, 10])
plt.imshow(image_text[:, :, ::-1]);
```


---
# References

[**`line()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga7078a9fae8c7e7d13d24dac2520ae4a2)
[**`linetype`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#gaf076ef45de481ac96e0ab3dc2c29a777)
[**`circle()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#gaf10604b069374903dbd0f0488cb43670)
[**`rectangle()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga07d2f74cadcf8e305e810ce8eed13bc9)
[**`putText()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga5126f47f883d730f633d74f07456c576)

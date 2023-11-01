---
title: "Logical Operations on Images"
date: 2023-05-25T05:47-0800
draft: false
tags: 
  - "#OpenCV"
---

```python
img_rec = cv2.imread('rectangle.jpg', cv2.IMREAD_GRAYSCALE)
img_cir = cv2.imread('circle.jpg', cv2.IMREAD_GRAYSCALE)

plt.figure(figsize = [20,5])
plt.subplot(121);  plt.imshow(img_rec);
plt.subplot(122);  plt.imshow(img_cir);
print(img_rec.shape)

result = cv2.bitwise_and(img_rec, img_cir, mask = None)
plt.imshow(result);

result = cv2.bitwise_or(img_rec, img_cir, mask = None)
plt.imshow(result);

result = cv2.bitwise_xor(img_rec, img_cir, mask = None)
plt.imshow(result);
```

[**Arithmetic Operations Tutorial**](https://docs.opencv.org/4.5.2/d0/d86/tutorial_py_image_arithmetics.html)

---
# References

- [**`bitwise_and()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga60b4d04b251ba5eb1392c34425497e14)
- [**`bitwsie_not()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga0002cf8b418479f4cb49a75442baee2f)
- [**`bitwise_or()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#gab85523db362a4e26ff0c703793a719b4)
- [**`bitwise_xor()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga84b2d8188ce506593dcc3f8cd00e8e2c)



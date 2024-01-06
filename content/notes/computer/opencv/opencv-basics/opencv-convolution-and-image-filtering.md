---
title: OpenCV Convolution and Image Filtering
date: 2023-06-07T05:11-0800
draft: false
tags:
  - "#OpenCV"
---
Correlation and convolution are exactly the same operation with one difference. In convolution, the kernel is rotated 180 degrees before doing the correlation operation. When the kernel is symmetric, correlation and convolution are the same.

### Blur
```python
kernel_size = 5
# Create a 5*5 kernel with all elements equal to 1.
kernel = np.ones((kernel_size, kernel_size), dtype = np.float32) / kernel_size**2

filename = 'kitten.jpg'
image = cv2.imread(filename)

dst = cv2.filter2D(image, ddepth = -1, kernel = kernel)

plt.figure(figsize = [20,10])
plt.subplot(121); plt.axis('off'); plt.imshow(image[:,:,::-1]); plt.title("Original Image")
plt.subplot(122); plt.axis('off'); plt.imshow(dst[:,:,::-1]);   plt.title("Convolution Result");

# Apply a box filter - kernel size 11.
box_blur2 = cv2.blur(image, (11,11))

# Apply Gaussian blur.
gaussian_blur2 = cv2.GaussianBlur(image, (11,11), 0, 0)

plt.figure(figsize = (20, 8))
plt.subplot(121); plt.axis('off'); plt.imshow(box_blur2[:,:,::-1]);      plt.title('Box Blur 11x11 kernel')
plt.subplot(122); plt.axis('off'); plt.imshow(gaussian_blur2[:,:,::-1]); plt.title('Gaussian Blur 11x11 kernel');

# Specifying sigmax = 0 and sigmay = 0, will compute a sigma of 2 for a 11x11 kernal
gaussian_blur3 = cv2.GaussianBlur(image, (11,11), 0, 0) 
# Here we are explicity setting the sigma values to be very large.
gaussian_blur4 = cv2.GaussianBlur(image, (11,11), 5, 5)

# Display.
plt.figure(figsize = (20, 8))
plt.subplot(121); plt.axis('off'); plt.imshow(gaussian_blur3[:,:,::-1]); plt.title('Gaussian Blur, sigma = 2')
plt.subplot(122); plt.axis('off'); plt.imshow(gaussian_blur4[:,:,::-1]); plt.title('Gaussian Blur, sigma = 5');
```

### Sharpen
```python
saturn = cv2.imread('saturn.jpg')

# Define a sharpening kernel.
kernel = np.array([[ 0, -1,  0],
                   [-1,  5, -1],
                   [ 0, -1,  0]])

saturn_sharp = cv2.filter2D(saturn, ddepth = -1, kernel = kernel)

plt.figure(figsize = (20, 15))
plt.subplot(121); plt.axis('off'); plt.imshow(saturn[:,:,::-1]);       plt.title('Telescope Image of a Saturn')
plt.subplot(122); plt.axis('off'); plt.imshow(saturn_sharp[:,:,::-1]); plt.title('Saturn Sharpened');

image = cv2.imread('kitten_zoom.png')

gaussian_blur = cv2.GaussianBlur(image, (11,11), 0, 0) 

# Sharpening kernel.
kernel1 = np.array([[ 0, -1,  0],
                   [-1,  5, -1],
                   [ 0, -1,  0]])

# More extreme sharpening kernel.
kernel2 = np.array([[0,  -4,  0],
                   [-4,  17, -4],
                   [ 0,  -4,  0]])

# Apply sharpening.
image_sharp1 = cv2.filter2D(gaussian_blur, ddepth = -1, kernel = kernel1)
image_sharp2 = cv2.filter2D(gaussian_blur, ddepth = -1, kernel = kernel2)

# Display.
plt.figure(figsize = (20,10))
plt.subplot(141); plt.axis('off'); plt.imshow(image[:,:,::-1]);         plt.title('Original')
plt.subplot(142); plt.axis('off'); plt.imshow(gaussian_blur[:,:,::-1]); plt.title('Gaussian Blur (11x11)')
plt.subplot(143); plt.axis('off'); plt.imshow(image_sharp1[:,:,::-1]);  plt.title('Sharpened')
plt.subplot(144); plt.axis('off'); plt.imshow(image_sharp2[:,:,::-1]);  plt.title('Sharpened More');
```

### Sobel Edge Detection
```python
sobelx  = cv2.Sobel(src = img_gray, ddepth = cv2.CV_64F, dx = 1, dy = 0, ksize = 3) 
sobely  = cv2.Sobel(src = img_gray, ddepth = cv2.CV_64F, dx = 0, dy = 1, ksize = 3)

plt.figure(figsize = (20,12))
plt.subplot(141); plt.axis('off'); plt.imshow(img[:,:,::-1]); plt.title('Original')
plt.subplot(142); plt.axis('off'); plt.imshow(img_gray);      plt.title('Grayscale') 
plt.subplot(143); plt.axis('off'); plt.imshow(sobelx);        plt.title('Sobel-X Edge Map')
plt.subplot(144); plt.axis('off'); plt.imshow(sobely);        plt.title('Sobel-Y Edge Map');

img = cv2.imread('coca-cola-logo.png')
```

### Canny Edge Detection

 0. Pre-processing step: Noise Reduction (blurring)
 1. Calculating the intensity gradient of the image (using a Sobel kernel)
 2. Non-maximum Suppression 
 3. Hysteresis thresholding 
 
```python
# Convert to grayscale.
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

edges = cv2.Canny(img_gray, threshold1 = 180, threshold2 = 200)

plt.figure(figsize = (20,10))
plt.subplot(131); plt.axis("off"); plt.imshow(img[:,:,::-1]); plt.title('Original') 
plt.subplot(132); plt.axis("off"); plt.imshow(img_gray);      plt.title('Grayscale') 
plt.subplot(133); plt.axis("off"); plt.imshow(edges);         plt.title('Canny Edge Map');

# Apply Gaussian blur with kernel size 7x7.
img1_blur = cv2.GaussianBlur(img1_gray, (7,7), 0)
# Edge detection with a high Threshold1 value.
blurred_edges_tight = cv2.Canny(img1_blur, threshold1 = 180, threshold2 = 200)
# Edge detection with a low Threshold1 value.
blurred_edges_open  = cv2.Canny(img1_blur, threshold1 = 50, threshold2 = 200)

plt.figure(figsize = (20,15))
plt.subplot(121); plt.axis('off'); plt.imshow(blurred_edges_tight); plt.title('Threshold1 = 180, Threshold2 = 200')
plt.subplot(122); plt.axis('off'); plt.imshow(blurred_edges_open);  plt.title('Threshold1 = 50, Threshold2 = 200');
```
---
# References

- [**`filter2d()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#ga27c049795ce870216ddfb366086b5a04)
- [**`blur()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37)
- [**`GaussianBlur()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gaabe8c836e97159a9193fb0b11ac52cf1)
- [**`sobel()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gacea54f142e81b6758cb6f375ce782c8d)
- [**`Canny()`**](https://docs.opencv.org/4.5.2/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de)
- [**`Canny Edge Detection Tutorial`**](https://docs.opencv.org/4.5.2/da/d22/tutorial_py_canny.html)
- [**`transform()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga393164aa54bb9169ce0a8cc44e08ff22)
- [**`getGaussianKernel()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gac05a120c1ae92a6060dd0db190a61afa)
- [**`convertScaleAbs()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#ga3460e9c9f37b563ab9dd550c4d8c4e7d)
- [**`pencilSketch()`**](https://docs.opencv.org/4.5.2/df/dac/group__photo__render.html#gae5930dd822c713b36f8529b21ddebd0c)
- [**`stylization()`**](https://docs.opencv.org/4.5.2/df/dac/group__photo__render.html#gacb0f7324017df153d7b5d095aed53206)

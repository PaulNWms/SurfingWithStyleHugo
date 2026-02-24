---
title: OpenCV Image Registration Techniques
date: 2023-06-08T22:04:00-08:00
draft: false
tags:
  - "#OpenCV"
---
```python
# Read reference image of the form.
img_form = 'form.jpg'
img_form = cv2.imread(img_form, cv2.IMREAD_COLOR)

# Read image of the scanned form to be aligned.
img_scan = "scanned-form.jpg"
img_scan = cv2.imread(img_scan, cv2.IMREAD_COLOR)

# Display the images. 
plt.figure(figsize = [20, 10])
plt.subplot(121); plt.axis('off'); plt.imshow(img_form[:, :, ::-1]); plt.title("Original Form")
plt.subplot(122); plt.axis('off'); plt.imshow(img_scan[:, :, ::-1]); plt.title("Scanned Form");

# Convert images to grayscale.
img_form_gray = cv2.cvtColor(img_form, cv2.COLOR_BGR2GRAY)
img_scan_gray = cv2.cvtColor(img_scan, cv2.COLOR_BGR2GRAY)
  
# Detect keypoints and compute descriptors.
orb = cv2.ORB_create(nfeatures = 600)
keypoints1, descriptors1 = orb.detectAndCompute(img_form_gray, None)
keypoints2, descriptors2 = orb.detectAndCompute(img_scan_gray, None)

# Draw the keypoints in both images.
img_form_keypoints = cv2.drawKeypoints(img_form_gray, keypoints1, None, 
                                       color = (255, 0, 0), flags = cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
img_scan_keypoints = cv2.drawKeypoints(img_scan_gray, keypoints2, None, 
                                       color = (255, 0, 0), flags = cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# Display the images with the keypoints.
plt.figure(figsize = [20,10])
plt.subplot(121); plt.axis('off'); plt.imshow(img_form_keypoints); plt.title("Original Form")
plt.subplot(122); plt.axis('off'); plt.imshow(img_scan_keypoints); plt.title("Scanned Form");

# Match features.
matcher = cv2.DescriptorMatcher_create(cv2.DESCRIPTOR_MATCHER_BRUTEFORCE_HAMMING)

matches = matcher.match(descriptors1, descriptors2, None)
  
# Sort matches by score.
matches.sort(key = lambda x: x.distance, reverse = False)

# Retain only the top 10% of matches.
numGoodMatches = int(len(matches) * 0.10)
matches = matches[:numGoodMatches]

idx = 0 # First index for best match.
d1 = descriptors1[matches[idx].queryIdx]
d2 = descriptors2[matches[idx].trainIdx]
plt.plot(d1)
plt.plot(d2)
plt.title("Best Keypoint Match Descriptor Vector");

# Draw top matches.
im_matches = cv2.drawMatches(img_form_gray, keypoints1, img_scan_gray, keypoints2, matches, None)

plt.figure(figsize = [40,10])
plt.imshow(im_matches); plt.axis('off'); plt.title("Original Form");

# Extract the location of good matches.
points1 = np.zeros((len(matches), 2), dtype = np.float32)
points2 = np.zeros((len(matches), 2), dtype = np.float32)

for i, match in enumerate(matches):
    points1[i, :] = keypoints1[match.queryIdx].pt
    points2[i, :] = keypoints2[match.trainIdx].pt
    
h, mask = cv2.findHomography(points2, points1, cv2.RANSAC)

# Use the homography to warp the scanned image.
height, width, channels = img_form.shape
img_scan_reg = cv2.warpPerspective(img_scan, h, (width, height))

# Display the final results.
plt.figure(figsize = [20,10])
plt.subplot(121); plt.imshow(img_form[:, :, ::-1]);     plt.axis('off'); plt.title("Original Form")
plt.subplot(122); plt.imshow(img_scan_reg[:, :, ::-1]); plt.axis('off'); plt.title("Scanned Form");
```

#### Creating Panoramas using the OpenCV Stitcher Class
```python
# Read images.
imagefiles = glob.glob('./scene/*')
imagefiles.sort()
print(imagefiles)

images = []
for filename in imagefiles:
    img = cv2.imread(filename)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    images.append(img)

num_images = len(images)

# Display images.
plt.figure(figsize = [20,10]) 
num_cols = 4
num_rows = math.ceil(num_images / num_cols)
for i in range(0, num_images):
    plt.subplot(num_rows, num_cols, i+1) 
    plt.axis('off')
    plt.imshow(images[i]);

stitcher = cv2.Stitcher_create()
status, panorama = stitcher.stitch(images)
if status == 0:
    plt.figure(figsize = [20,10]) 
    plt.imshow(panorama)

plt.figure(figsize = [20,10]) 
plt.imshow(panorama)
cropped_region = panorama[90:867, 1:2000]
plt.imshow(cropped_region);
```

---
# References

- [**`ORB (Oriented FAST and Rotated BRIEF) Tutorial`**](https://docs.opencv.org/4.5.2/d1/d89/tutorial_py_orb.html)
- [**`FAST (Algorithm for Corner Detection) Tutorial`**](https://docs.opencv.org/3.4/df/d0c/tutorial_py_fast.html)
- [**`BRIEF (Binary Robust Independent Elementary Features) Tutorial`**](https://docs.opencv.org/3.4/dc/d7d/tutorial_py_brief.html)
- [**`ORB Class Reference`**](https://docs.opencv.org/4.5.2/db/d95/classcv_1_1ORB.html)
- [**`detectAndCompute()`**](https://docs.opencv.org/4.5.2/d0/d13/classcv_1_1Feature2D.html#a8be0d1c20b08eb867184b8d74c15a677)
- [**`drawKeypoints()`**](https://docs.opencv.org/4.5.2/d4/d5d/group__features2d__draw.html#ga5d2bafe8c1c45289bc3403a40fb88920)
- [**`DescriptorMatcher Class Reference`**](https://docs.opencv.org/4.5.2/db/d39/classcv_1_1DescriptorMatcher.html)
- [**`match()`**](https://docs.opencv.org/4.5.2/db/d39/classcv_1_1DescriptorMatcher.html#a0f046f47b68ec7074391e1e85c750cba)
- [**`findHomography`**](https://docs.opencv.org/4.5.2/d9/d0c/group__calib3d.html#ga4abc2ece9fab9398f2e560d53c8c9780)
- [**`warpPerspective`**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#gaf73673a7e8e18ec6963e3774e6a94b87)
- [**`drawMatches()`**](https://docs.opencv.org/4.5.2/d4/d5d/group__features2d__draw.html#gad8f463ccaf0dc6f61083abd8717c261a)
- [**`Stitcher Class`**](https://docs.opencv.org/4.5.2/d2/d8d/classcv_1_1Stitcher.html)
- [**`Stitcher_create()`**](https://docs.opencv.org/4.5.2/d2/d8d/classcv_1_1Stitcher.html#a308a47865a1f381e4429c8ec5e99549f)
- [**`stitcher()`**](https://docs.opencv.org/4.5.2/d2/d8d/classcv_1_1Stitcher.html#a37ee5bacf229e9d0fb9f97c8f5ed1acd)

---
title: ArUco Markers for Augmented Reality
date: 2023-06-09T07:18-0800
draft: false
tags:
  - "#OpenCV"
---
```python
# Load the pre-defined ArUco Marker dictionary that has 250 6x6 marker patterns.
import cv2
dictionary = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)

# Generate markers with IDs: 23, 25, 30, and 33.
marker_image1 = cv2.aruco.drawMarker(dictionary, 23, 200)
marker_image2 = cv2.aruco.drawMarker(dictionary, 25, 200)
marker_image3 = cv2.aruco.drawMarker(dictionary, 30, 200)
marker_image4 = cv2.aruco.drawMarker(dictionary, 33, 200)

# Display the markers.
plt.figure(figsize = [18, 10])
plt.subplot(1,4,1); plt.imshow(marker_image1); plt.title("Marker ID: 23"); plt.axis('off')
plt.subplot(1,4,2); plt.imshow(marker_image2); plt.title("Marker ID: 25"); plt.axis('off')
plt.subplot(1,4,3); plt.imshow(marker_image3); plt.title("Marker ID: 30"); plt.axis('off')
plt.subplot(1,4,4); plt.imshow(marker_image4); plt.title("Marker ID: 33"); plt.axis('off')

# Save the generated markers.
cv2.imwrite("marker_23.png", marker_image1)
cv2.imwrite("marker_25.png", marker_image2)
cv2.imwrite("marker_30.png", marker_image3)
cv2.imwrite("marker_33.png", marker_image4)

# Read input image with the markers.
frame = cv2.imread('marker_23_printed.png')

# Detect the markers in the destination image.
corners, ids, rejected = cv2.aruco.detectMarkers(frame, dictionary)

cv2.aruco.drawDetectedMarkers(frame, corners, ids)
plt.figure(figsize = [10,10])
plt.axis('off')
plt.imshow(frame[:,:,::-1])

# Upper-left corner of ROI.
index = np.squeeze(np.where(ids == 23))
ref_pt1 = np.squeeze(corners[index[0]])[0]
```


---
# References

- [**`Aruco Marker Detection Tutorial (C++ version)`** ](https://docs.opencv.org/4.5.2/d5/dae/tutorial_aruco_detection.html)
- [**`getPredefinedDictionary()`**](https://docs.opencv.org/4.5.2/d9/d6a/group__aruco.html#gaf5d7e909fe8ff2ad2108e354669ecd17)
- [**`Pre-Defined Dictionaries`**](https://docs.opencv.org/4.5.2/d9/d6a/group__aruco.html#gac84398a9ed9dd01306592dd616c2c975)
- [**`drawMarker()`**](https://docs.opencv.org/4.5.2/d9/d6a/group__aruco.html#ga254ed245e10c5b3e2259d5d9b8ea8e2f)
- [**`detectMarkers()`**](https://docs.opencv.org/4.5.2/d9/d6a/group__aruco.html#gab9159aa69250d8d3642593e508cb6baa)
- [**`drawDetectedMarkers()`**](https://docs.opencv.org/4.5.2/d9/d6a/group__aruco.html#ga2ad34b0f277edebb6a132d3069ed2909)
- [**`findHomography()`**](https://docs.opencv.org/4.5.2/d9/d0c/group__calib3d.html#ga4abc2ece9fab9398f2e560d53c8c9780)
- [**`warpPerspective()`**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#gaf73673a7e8e18ec6963e3774e6a94b87)
- [**`fillConvexPoly()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga9bb982be9d641dc51edd5e8ae3624e1f)

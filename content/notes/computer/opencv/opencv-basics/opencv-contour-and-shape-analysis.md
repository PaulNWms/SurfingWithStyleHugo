---
title: OpenCV Contour and Shape Analysis
date: 2023-06-03T09:17-0800
draft: false
tags:
  - "#OpenCV"
---
```python
imagePath = 'shapes.jpg'
image = cv2.imread(imagePath)
# Convert to grayscale
imageGray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

# Display image
plt.imshow(imageGray);

# Find all contours in the image.
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

# Number of contours.
print("Number of contours found = {}".format(len(contours)))

# Hierarchy.
print("\nHierarchy : \n{}".format(hierarchy))

# Create a copy of the original image.
imageCopy1 = image.copy()
# Draw all the contours.
cv2.drawContours(imageCopy1, contours, -1, (0,0,255), 3)
plt.imshow(imageCopy1[:,:,::-1]);
```

```python
source = './intruder_2.mp4'  # Or specify 'source' as the index associated with your camera system.

video_cap_2 = cv2.VideoCapture(source)
if not video_cap_2.isOpened():
    print('Unable to open: ' + source)

frame_w = int(video_cap_2.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_h = int(video_cap_2.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(video_cap_2.get(cv2.CAP_PROP_FPS))

size = (frame_w, frame_h)
frame_area = frame_w * frame_h

video_out_alert_file_2 = 'video_out_alert_2.mp4'
video_out_alert_2 = cv2.VideoWriter(video_out_alert_file_2, cv2.VideoWriter_fourcc(*'XVID'), fps, size)

bg_sub = cv2.createBackgroundSubtractorKNN(history=200)

ksize = (5, 5)        # Kernel size for erosion.
max_contours = 3      # Number of contours to use for rendering a bounding rectangle.
frame_count = 0
min_contour_area_thresh = 0.01 # Minimum fraction of frame required for maximum contour.

yellow = (0, 255, 255)
red = (0, 0, 255)

# Process video frames.
while True:
    
    ret, frame = video_cap_2.read()
    frame_count += 1
    if frame is None:
        break
    
    # Stage 1: Create a foreground mask for the current frame.
    fg_mask = bg_sub.apply(frame)

    # Stage 2: Stage 1 + Erosion.
    fg_mask_erode = cv2.erode(fg_mask, np.ones(ksize, np.uint8))

    # Stage 3: Stage 2 + Contours.
    contours_erode, hierarchy = cv2.findContours(fg_mask_erode, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    if len(contours_erode) > 0:

        # Sort contours based on area.
        contours_sorted = sorted(contours_erode, key = cv2.contourArea, reverse=True)
        
        # Contour area of largest contour.
        contour_area_max = cv2.contourArea(contours_sorted[0])
        
        # Compute fraction of total frame area occupied by largest contour.
        contour_frac = contour_area_max / frame_area
        
        # Confirm contour_frac is greater than min_contour_area_thresh threshold.
        if contour_frac > min_contour_area_thresh:
            
            # Compute bounding rectangle for the top N largest contours.
            for idx in range(min(max_contours, len(contours_sorted))):
                xc, yc, wc, hc = cv2.boundingRect(contours_sorted[idx])
                if idx == 0:
                    x1 = xc
                    y1 = yc
                    x2 = xc + wc
                    y2 = yc + hc
                else:
                    x1 = min(x1, xc)
                    y1 = min(y1, yc)
                    x2 = max(x2, xc + wc)
                    y2 = max(y2, yc + hc)

            # Draw bounding rectangle for top N contours on output frame.
            cv2.rectangle(frame, (x1, y1), (x2, y2), yellow, thickness = 2)
            drawBannerText(frame, 'Intrusion Alert', text_color = red)
            
            # Write alert video to file system. 
            video_out_alert_2.write(frame)

video_cap_2.release()
video_out_alert_2.release()

from moviepy.editor import VideoFileClip

# Load output video.
clip = VideoFileClip(video_out_alert_file_2)
clip.ipython_display(width = 1000)
```
---
# References

- [**`findContours`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#gadf1ad6a0b82947fa1fe3c3d497f260e0)
- [**`drawContours()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga746c0625f1781f1ffc9056259103edbc)
- [**`moments()`**](https://docs.opencv.org/4.5.2/d8/d23/classcv_1_1Moments.html)
- [**`contourArea()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga2c759ed9f497d4a618048a2f56dc97f1)
- [**`boundingRect()`**](https://docs.opencv.org/4.5.2/db/dd6/classcv_1_1RotatedRect.html#a055a5d35e50bce65e3b1dee318dd3044)
- [**`minEnclosingCircle()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga8ce13c24081bbc7151e9326f412190f1)
- [**`fitEllipse()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#gaf259efaad93098103d6c27b9e4900ffa)
- [**`minAreaRect`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga3d476a3417130ae5154aea421ca7ead9)
- [**`createBackgroundSubtractorKNN()`**](https://docs.opencv.org/4.5.2/de/de1/group__video__motion.html#gac9be925771f805b6fdb614ec2292006d)
- [**`apply()`**](https://docs.opencv.org/4.5.2/d7/df6/classcv_1_1BackgroundSubtractor.html#aa735e76f7069b3fa9c3f32395f9ccd21)
- [**`erode()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gaeb1e0c1033e3f6b891a25d0511362aeb)
- [**`findNonZero()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#gaed7df59a3539b4cc0fe5c9c8d7586190) 
- [**`boundingRect()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga103fcbda2f540f3ef1c042d6a9b35ac7) 
- [**`findContours()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#gadf1ad6a0b82947fa1fe3c3d497f260e0) 
- [**`drawContours()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga746c0625f1781f1ffc9056259103edbc)
- [**`contourArea()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga2c759ed9f497d4a618048a2f56dc97f1)

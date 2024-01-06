---
title: OpenCV Video Processing
date: 2023-06-03T08:24-0800
draft: false
tags:
  - "#OpenCV"
---
### Preview video
```python
from moviepy.editor import VideoFileClip

input_video = './race_car.mp4'

# loading output video 
clip = VideoFileClip(input_video)
clip.ipython_display(width = 600)
```

### Annotate video
```python
source = input_video  # source = 0 for webcam

video_cap = cv2.VideoCapture(source)
if (video_cap.isOpened()== False): 
  print("Error opening video stream or file")

ret, frame = video_cap.read()
plt.figure(figsize = (10, 8))
plt.imshow(frame[...,::-1])

# Retrieve video frame properties.
frame_w   = int(video_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_h   = int(video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
frame_fps = int(video_cap.get(cv2.CAP_PROP_FPS))

# Specify the value for fourcc
fourcc_avi = cv2.VideoWriter_fourcc('M','J','P','G')
fourcc_mp4 = cv2.VideoWriter_fourcc(*'XVID')

# Specify the video output filenames.
file_out_avi = 'video_out.avi'
file_out_mp4 = 'video_out.mp4'

# Slow down the speed of the video.
frame_fps = int(frame_fps/3)

# Create the video writer objects.
out_avi = cv2.VideoWriter(file_out_avi, fourcc_avi, frame_fps, (frame_w,frame_h))
out_mp4 = cv2.VideoWriter(file_out_mp4, fourcc_mp4, frame_fps, (frame_w,frame_h))

def drawBannerText(frame, text, banner_height_percent = 0.05, text_color = (0,255,0)):
    # Draw a black filled banner across the top of the image frame.
    # percent: set the banner height as a percentage of the frame height.
    banner_height = int(banner_height_percent * frame.shape[0])
    cv2.rectangle(frame, (0,0), (frame.shape[1],banner_height), (0,0,0), thickness=-1)
    
    # Draw text on banner.
    left_offset = 20
    location = (left_offset, int( 5 + (banner_height_percent * frame.shape[0])/2 ))
    fontScale = 1.5
    fontThickness = 2
    cv2.putText(frame, text, location, cv2.FONT_HERSHEY_PLAIN, fontScale, text_color, fontThickness, cv2.LINE_AA)

# Read all the frames in the video.
frame_count = 0
while True:
  
    # Read one frame at a time.
    ok, frame = video_cap.read()
    if not ok:
        break

    # Increment the frame count for the annotation.
    frame_count += 1
  
    # Annotate each video frame.
    drawBannerText(frame, 'Frame: ' + str(int(frame_count)) + ' FPS: ' + str(int(frame_fps)))
    
    # Write the frame to the output files.
    out_avi.write(frame)
    out_mp4.write(frame)

# Release the VideoCapture and VideoWriter objects
video_cap.release()
out_avi.release()
out_mp4.release()
```

### Motion detection
```python
input_video = 'motion_test.mp4'
video_cap = cv2.VideoCapture(input_video)
if not video_cap.isOpened():
    print('Unable to open: ' + input_video)

frame_w = int(video_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_h = int(video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(video_cap.get(cv2.CAP_PROP_FPS))

size = (frame_w, frame_h)
size_quad = (int(2*frame_w), int(2*frame_h))

video_out_quad = cv2.VideoWriter('video_out_quad.mp4', cv2.VideoWriter_fourcc(*'XVID'), fps, size_quad)

def drawBannerText(frame, text, banner_height_percent = 0.08, font_scale = 0.8, text_color = (0, 255, 0), 
                   font_thickness = 2):
    # Draw a black filled banner across the top of the image frame.
    # percent: set the banner height as a percentage of the frame height.
    banner_height = int(banner_height_percent * frame.shape[0])
    cv2.rectangle(frame, (0, 0), (frame.shape[1], banner_height), (0, 0, 0), thickness = -1)

    # Draw text on banner.
    left_offset = 20
    location = (left_offset, int(10 + (banner_height_percent * frame.shape[0]) / 2))
    cv2.putText(frame, text, location, cv2.FONT_HERSHEY_SIMPLEX, font_scale, text_color, 
                font_thickness, cv2.LINE_AA)

bg_sub = cv2.createBackgroundSubtractorKNN(history = 200)

ksize = (5, 5)
red = (0, 0, 255)
yellow = (0, 255, 255)

# Quad view that will be built.
#------------------------------------
# frame_fg_mask       :  frame
# frame_fg_mask_erode :  frame_erode
#------------------------------------

while True:
    ret, frame = video_cap.read()

    if frame is None:
        break
    else:
        frame_erode = frame.copy()

    # Stage 1: Motion area based on foreground mask.
    fg_mask = bg_sub.apply(frame)
    motion_area = cv2.findNonZero(fg_mask)
    x, y, w, h = cv2.boundingRect(motion_area)

    # Stage 2: Motion area based on foreground mask (with erosion)
    fg_mask_erode = cv2.erode(fg_mask, np.ones(ksize, np.uint8))
    motion_area_erode = cv2.findNonZero(fg_mask_erode)
    xe, ye, we, he = cv2.boundingRect(motion_area_erode)

    # Draw bounding box for motion area based on foreground mask
    if motion_area is not None:
        cv2.rectangle(frame, (x, y), (x + w, y + h), red, thickness = 6)

    # Draw bounding box for motion area based on foreground mask (with erosion)
    if motion_area_erode is not None:
        cv2.rectangle(frame_erode, (xe, ye), (xe + we, ye + he), red, thickness = 6)

    # Convert foreground masks to color so we can build a composite video with color annotations.
    frame_fg_mask = cv2.cvtColor(fg_mask, cv2.COLOR_GRAY2BGR)
    frame_fg_mask_erode= cv2.cvtColor(fg_mask_erode, cv2.COLOR_GRAY2BGR)

    # Annotate each video frame.
    drawBannerText(frame_fg_mask, 'Foreground Mask')
    drawBannerText(frame_fg_mask_erode, 'Foreground Mask Eroded')

    # Build quad view.
    frame_top = np.hstack([frame_fg_mask, frame])
    frame_bot = np.hstack([frame_fg_mask_erode, frame_erode])
    frame_composite = np.vstack([frame_top, frame_bot])

    # Create composite video with intermediate results (quad grid).
    fc_h, fc_w, _= frame_composite.shape
    cv2.line(frame_composite, (0, int(fc_h/2)), (fc_w, int(fc_h/2)), yellow, thickness=1, lineType=cv2.LINE_AA)

    # Write video files.
    video_out_quad.write(frame_composite)

video_cap.release()
video_out_quad.release()

input_video = './video_out_quad.mp4'

# loading output video 
clip = VideoFileClip(input_video)
clip.ipython_display(width=1000)
```

---
# References

- [**`VideoCapture()`**](https://docs.opencv.org/4.5.2/d8/dfe/classcv_1_1VideoCapture.html)
- [**`VideoWriter()`**](https://docs.opencv.org/4.5.2/dd/d9e/classcv_1_1VideoWriter.html)
- [**`createBackgroundSubtractorKNN()`**](https://docs.opencv.org/4.5.2/de/de1/group__video__motion.html#gac9be925771f805b6fdb614ec2292006d)
- [**`apply()`**](https://docs.opencv.org/4.5.2/d7/df6/classcv_1_1BackgroundSubtractor.html#aa735e76f7069b3fa9c3f32395f9ccd21)
- [**`erode()`**](https://docs.opencv.org/3.4/d4/d86/group__imgproc__filter.html#gaeb1e0c1033e3f6b891a25d0511362aeb)
- [**`findNonZero()`**](https://docs.opencv.org/4.5.2/d2/de8/group__core__array.html#gaed7df59a3539b4cc0fe5c9c8d7586190)
- [**`boundingRect()`**](https://docs.opencv.org/4.5.2/d3/dc0/group__imgproc__shape.html#ga103fcbda2f540f3ef1c042d6a9b35ac7)

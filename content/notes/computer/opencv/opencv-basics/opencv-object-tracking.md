---
title: OpenCV Object Tracking
date: 2023-06-11T09:05-0800
draft: false
tags:
  - "#OpenCV"
---
```python
bbox = None
# Define a bounding box for the location of the object in the first video frame.
bbox = (820, 510, 420, 180) # race car

# Check if the a bounding box has been defined. If not, display the initial frame and alow the user to  
# manually select the bounding box with the mouse.
if bbox == None:
    # This will display the first frame of the video. Use the mouse to specify a bounding box
    # around the object to track. When done, hit the space bar or Enter key to complete the operation.
    bbox = cv2.selectROI(frame, False)  # Note: this may cause python to hang on Mac OS.
    print(bbox)
    
frame_copy = frame.copy() 
displayRectangle(frame_copy, bbox, color=(0, 255, 255))

# Initialize the tracker with the first frame and a bounding box to identify the object of interest.
tracker.init(frame, bbox);

while True:
    ok, frame = video_cap.read()
    if not ok:
        break 
    
    # Start timer
    timer = cv2.getTickCount()

    # Update tracker
    ok, bbox = tracker.update(frame)

    # Calculate Frames per second (FPS)
    fps = cv2.getTickFrequency() / (cv2.getTickCount() - timer);

    # Draw bounding box
    if ok:
        drawRectangle(frame, bbox, color=(0, 255, 255))
    else:
        drawText(frame, 'Tracking failure detected', location=(80,140), color=(0, 0, 255))

    # Display Info
    drawBannerText(frame, tracker_type + ' Tracker' + ', FPS : ' + str(int(fps)))
    
    # Write frame to video
    video_out.write(frame)
    
video_cap.release()
video_out.release()
```


---
# References

- [**`Tracker Class`**](https://docs.opencv.org/4.5.2/d0/d0a/classcv_1_1Tracker.html)

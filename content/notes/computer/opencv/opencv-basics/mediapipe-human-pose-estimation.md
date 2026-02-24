---
title: MediaPipe Human Pose Estimation
date: 2023-06-12T06:16:00-08:00
draft: false
tags:
  - "#OpenCV"
  - MediaPipe
---
```python
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

with mp_pose.Pose(static_image_mode = True) as pose:
        
    # Make a copy of the original image.
    annotated_img = img.copy()
    
    # Process image.
    results = pose.process(img)
    
    # Draw landmarks.
    circle_radius = int(.007*img_height) # Scale landmark circles as percentage of image height.
    
    # Specify landmark drawing style.
    point_spec = mp_drawing.DrawingSpec(color=(220, 100, 0), thickness=-1, circle_radius=circle_radius)
    
    # Draw landmark points.
    mp_drawing.draw_landmarks(annotated_img, 
                              landmark_list=results.pose_landmarks,   
                              landmark_drawing_spec=point_spec)
plt.figure(figsize = (10,10))
plt.axis('off')
plt.imshow(annotated_img[:,:,::-1]);

# Make a copy of the original image.
annotated_img = img.copy()

# Specify landmark connections drawing style.
line_spec = mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2)
    
# Draw both landmark points and connections.
mp_drawing.draw_landmarks(annotated_img, 
                          landmark_list=results.pose_landmarks, 
                          connections=mp_pose.POSE_CONNECTIONS, 
                          landmark_drawing_spec=point_spec,
                          connection_drawing_spec=line_spec)

plt.figure(figsize = (10,10))
plt.axis('off')
plt.imshow(annotated_img[:,:,::-1]);

r_hip_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].x * img_width)
r_hip_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y * img_height)

l_hip_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].x * img_width)
l_hip_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y * img_height)

print('Right hip coordinates : (', r_hip_x,',',r_hip_y,')' )
print('Left hip coordinates  : (', l_hip_x,',',l_hip_y,')' )
```


---
# References

- [**MediaPipe Pose**](https://google.github.io/mediapipe/solutions/pose.html)

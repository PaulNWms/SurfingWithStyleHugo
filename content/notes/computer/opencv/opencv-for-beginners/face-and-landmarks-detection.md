---
title: Face and Landmarks Detection
date: 2023-06-10T07:43-0800
draft: false
tags:
  - "#OpenCV"
---
```python
# A smaller version of the model (FP16) is also provided.
# MODEL_PATH = './model/res10_300x300_ssd_iter_140000_fp16.caffemodel'

MODEL_PATH = './model/res10_300x300_ssd_iter_140000.caffemodel'
CONFIG_PATH = './model/deploy.prototxt'

# Load the face detection model.
net = cv2.dnn.readNetFromCaffe(CONFIG_PATH, MODEL_PATH)

# Create the landmark detector instance.
landmarkDetector = cv2.face.createFacemarkLBF()

# Load the model.
model = './model/lbfmodel.yaml'
landmarkDetector.loadModel(model)

image_filename = 'family.jpg'
img = cv2.imread(image_filename)
img_display_faces = img.copy()
img_display_marks = img.copy()

# Detect the faces.
faces = detect_faces(img)

if len(faces) > 0:
    
    # Render bounding boxes.
    for face in faces:
        cv2.rectangle(img_display_faces, face, (0,255,0), 3)

    # Detect the facial landmarks.
    retval, landmarksList = landmarkDetector.fit(img, faces)

    # Render landmark points.
    for landmarks in landmarksList:
        cv2.face.drawFacemarks(img_display_marks, landmarks, (0, 255, 0))
        
    fig = plt.figure(figsize=(20,10))
    plt.subplot(121); plt.imshow(img_display_faces[...,::-1]); plt.axis('off');
    plt.subplot(122); plt.imshow(img_display_marks[...,::-1]); plt.axis('off');
else:
    print('No faces detected in image.')
```


---
# References

- [**`cv2.dnn.blobFromImage()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga98113a886b1d1fe0b38a8eef39ffaaa0)
- [**`cv2.dnn_Net.setInput()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a5e74adacffd6aa53d56046581de7fcbd)
- [**`cv2.dnn_Net.forward()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a98ed94cb6ef7063d3697259566da310b)
- [**`cv2.dnn.readNetFromCaffe()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga29d0ea5e52b1d1a6c2681e3f7d68473a)
- [**`cv2.dnn.readNet()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga3b34fe7a29494a6a4295c169a7d32422)
- [**`GaussianBlur()`**](https://docs.opencv.org/4.5.2/d4/d86/group__imgproc__filter.html#gaabe8c836e97159a9193fb0b11ac52cf1)
- [**`cv2.dnn.blobFromImage()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga98113a886b1d1fe0b38a8eef39ffaaa0)
- [**`cv2.dnn_Net.setInput()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a5e74adacffd6aa53d56046581de7fcbd)
- [**`cv2.dnn_Net.forward()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a98ed94cb6ef7063d3697259566da310b)
- [**Model and Configuration Parameters github**](https://github.com/opencv/opencv/blob/master/samples/dnn/models.yml)
- [**Model Architecture File github**](https://github.com/opencv/opencv/blob/master/samples/dnn/face_detector/deploy.prototxt) 
- [**`cv2.ellipse()`**](https://docs.opencv.org/4.5.2/d6/d6e/group__imgproc__draw.html#ga57be400d8eff22fb946ae90c8e7441f9)
- [**`np.putmask()`**](https://numpy.org/doc/stable/reference/generated/numpy.putmask.html)
- [**`cv2.resize()`**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d) 
- [**Face Alignment at 3000 FPS via Regressing Local Binary Features**](http://www.jiansun.org/papers/CVPR14_FaceAlignment.pdf)
- [**`face_Facemark.fit()`**](https://docs.opencv.org/4.5.3/db/dd8/classcv_1_1face_1_1Facemark.html#a9c21865859a685d16746f0097e9b3d26)
- [**`drawFacemarks()`**](https://docs.opencv.org/4.5.3/db/d7c/group__face.html#ga318d9669d5ed4dfc6ab9fae2715310f5)

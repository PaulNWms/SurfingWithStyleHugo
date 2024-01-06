---
title: OpenCV Object Detection
date: 2023-06-10T19:33-0800
draft: false
tags:
  - "#OpenCV"
---
The steps involved in detecting objects using the DNN module are as follows:

1. Load the model and input image to memory.
2. Detect objects using the forward method of the network.
3. Display the detected objects.

```python
modelFile = 'ssd_mobilenet_frozen_inference_graph.pb'
configFile = 'ssd_mobilenet_v2_coco_2018_03_29.pbtxt'
classFile = 'coco_class_labels.txt'

import requests
from os import path

if(not path.exists(modelFile)):
    print('Downloading MobileNet SSD Model.......')
    url = 'https://opencv-courses.s3.us-west-2.amazonaws.com/ssd_mobilenet_frozen_inference_graph.pb'

    r = requests.get(url)

    with open(modelFile, 'wb') as f:
        f.write(r.content)

    print('ssd_mobilenet_frozen_inference_graph Download complete!')

# Read the Tensorflow network
net = cv2.dnn.readNetFromTensorflow(modelFile, configFile)

def detect_objects(net, img):
    """Run object detection over the input image."""
    # Blob dimension (dim x dim)
    dim = 300
    mean = (0, 0, 0)

    # Create a blob from the image
    blob = cv2.dnn.blobFromImage(img, 1.0, (dim, dim), mean, True)

    # Pass blob to the network
    net.setInput(blob)

    # Peform Prediction
    objects = net.forward()
    return objects

food_img = cv2.imread('fruit-vegetable.jpg')
food_objects = detect_objects(net, food_img)

# Each detected object returns a list with the structure of:
# [[..., classId, score, x, y, w, h](/notes/)]
print(f'Detected {len(food_objects[0][0])} objects (no confidence filtering)')
first_detected_obj = food_objects[0][0][0]
print('First object:', first_detected_obj)
```

### YOLO
```python
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = (15.0,15.0)
plt.rcParams['image.cmap'] = 'gray'
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 14

# Initialize the parameters
objectnessThreshold = 0.5 # Objectness threshold, high values filter out low objectness
confThreshold = 0.5       # Confidence threshold, high values filter out low confidence detections
nmsThreshold = 0.4        # Non-maximum suppression threshold, higher values result in duplicate boxes per object
inpWidth = 416            # Width of network's input image, larger is slower but more accurate
inpHeight = 416           # Height of network's input image, larger is slower but more accurate

# Load names of classes.
classesFile = "coco.names"
classes = None
with open(classesFile, 'rt') as f:
    classes = f.read().rstrip('\n').split('\n')

# Give the configuration and weight files for the model and load the network using them.
modelConfiguration = "yolov4.cfg"
modelWeights = "yolov4.weights"

if(not path.exists(modelWeights)):
    url = "https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights"
    r = requests.get(url)
    print('Downloading YOLO v4 Model.......')

    with open(modelWeights, 'wb') as f:
        f.write(r.content)

    print('\nyolov4.weights Download complete!')

net = cv2.dnn.readNetFromDarknet(modelConfiguration, modelWeights)

def getOutputsNames(net):
    """Get the names of all output layers in the network."""
    layersNames = net.getLayerNames()
    # Get the names of the output layers, i.e. the layers with unconnected outputs
    return [layersNames[i - 1] for i in net.getUnconnectedOutLayers()]

# Process inputs
imagePath = "traffic.jpg"
frame = cv2.imread(imagePath)

# Create a 4D blob from a frame.
blob = cv2.dnn.blobFromImage(frame, 1/255, (inpWidth, inpHeight), [0,0,0], 1, crop=False)

# Sets the input to the network
net.setInput(blob)

# Runs the forward pass to get output of the output layers
outs = net.forward(getOutputsNames(net))

# Remove the bounding boxes with low confidence
display_objects(frame, outs)

# Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
t, _ = net.getPerfProfile()

label = 'Inference time: %.2f ms' % (t * 1000.0 / cv2.getTickFrequency())
cv2.putText(frame, label, (0, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 1, cv2.LINE_AA)
plt.imshow(frame[..., ::-1])
plt.show()
print(label)
```

---
# References

- [Object Detection Wiki](https://github.com/opencv/opencv/wiki/Deep-Learning-in-OpenCV#object-detection)
- [Single Shot Multibox Detector (SSD)](https://arxiv.org/pdf/1512.02325.pdf)
- [Tensorflow Object Detection API](https://github.com/tensorflow/models/tree/master/research/object_detection)
- [Tensorflow Object Detection Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf1_detection_zoo.md)
- [SSD Mobilenet v2 COCO](http://download.tensorflow.org/models/object_detection/ssd_mobilenet_v2_coco_2018_03_29.tar.gz)
- [tf_text_graph_ssd.py](https://github.com/opencv/opencv/blob/master/samples/dnn/tf_text_graph_ssd.py)

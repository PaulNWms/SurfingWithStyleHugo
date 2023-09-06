---
title: "Module 13 - Deep Learning with OpenCV"
date: 2023-06-09T19:02-0800
draft: true
tags: #OpenCV
---

```python
# Read the ImageNet class names.
with open('input/classification_classes_ILSVRC2012.txt', 'r') as f:
    image_net_names = f.read().split('\n')

# Save the names of all possible classifications, removing empty final line.
class_names = image_net_names[:-1]

# Verify the size, and inspect one of the classes by name.
print(len(class_names), class_names[0])

# Loading the Classification model.
config_file = 'models/DenseNet_121.prototxt'
model_file = 'models/DenseNet_121.caffemodel'

model = cv2.dnn.readNet(model=model_file, config=config_file, framework='Caffe')

# Load and display the image from disk.
tiger_img = cv2.imread('input/image1.jpg')
plt.figure(figsize=[10, 10])
plt.imshow(tiger_img[:, :, ::-1]);

# Create blob from image.
blob = cv2.dnn.blobFromImage(
    image=tiger_img, scalefactor=0.017, size=(224, 224), mean=(104, 117, 123), swapRB=False, crop=False)

# Set the input blob for the neural network.
model.setInput(blob)

# Pass the blob forward through the network.
outputs = model.forward()
final_outputs = outputs[0]

# Make all the outputs 1D, where each represents likihood of matching one of the 1K classification groups.
final_outputs = final_outputs.reshape(1000, 1)

# Get the class label index with the max confidence.
label_id = np.argmax(final_outputs)

# Convert score to probabilities for all matches.
probs = np.exp(final_outputs) / np.sum(np.exp(final_outputs))

print(probs[:10])
print("Max probability:", np.max(probs))

# Get the final highest probability
final_prob = np.max(probs) * 100.0

# Map the max confidence to the class label names.
out_name = class_names[label_id]
out_text = f"{out_name}, {final_prob:.3f}%"

# Display the image, best matched classification, and confidence.
plt.imshow(tiger_img[:, :, ::-1])
plt.title(out_text)
plt.xticks([]), plt.yticks([])
plt.show() 
```


---
# References

[**Deep Learning in OpenCV wiki**](https://github.com/opencv/opencv/wiki/Deep-Learning-in-OpenCV)
[**DNN github repo**](https://github.com/opencv/opencv/tree/master/samples/dnn)
[**`cv2.dnn.readNetFromCaffe()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga29d0ea5e52b1d1a6c2681e3f7d68473a)
[**`cv2.dnn.readNetFromTensorflow()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#gad820b280978d06773234ba6841e77e8d)
[**`cv2.dnn.readNetFromTorch()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga65a1da76cb7d6852bdf7abbd96f19084)
[**`cv2.dnn.readNetFromDarknet()`**](https://docs.opencv.org/3.4/d6/d0f/group__dnn.html#gafde362956af949cce087f3f25c6aff0d)
[**`cv2.dnn.readNet()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga3b34fe7a29494a6a4295c169a7d32422)
[**`cv2.dnn.blobFromImage()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga98113a886b1d1fe0b38a8eef39ffaaa0)
[**`cv2.dnn_Net.setInput()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a5e74adacffd6aa53d56046581de7fcbd)
[**`cv2.dnn_Net.forward()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a98ed94cb6ef7063d3697259566da310b)

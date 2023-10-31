---
title: Module 19 - Text Detection and OCR
date: 2023-06-14T05:24-0800
draft: false
tags:
  - "#OpenCV"
---

```python
# Define list to store the vocabulary, the recognizable characters.
vocabulary =[]

# Open file to import the vocabulary.
with open("./resources/alphabet_94.txt") as f:
    # Read the file line by line, and append each into the vocabulary list.
    for l in f:
        vocabulary.append(l.strip())
    f.close()
print("Vocabulary:", vocabulary)
print("Vocabulary size: ", len(vocabulary))

# DB model for text-detection based on resnet50.
textDetector = cv2.dnn_TextDetectionModel_DB("./resources/DB_TD500_resnet50.onnx")

inputSize = (640, 640)

# Set threshold for Binary Map creation and polygon detection.
binThresh = 0.3
polyThresh = 0.5

mean = (122.67891434, 116.66876762, 104.00698793)

textDetector.setBinaryThreshold(binThresh).setPolygonThreshold(polyThresh)
textDetector.setInputParams(1.0/255, inputSize, mean, True)

# CRNN model for text-recognition.
textRecognizer = cv2.dnn_TextRecognitionModel("./resources/crnn_cs.onnx")
textRecognizer.setDecodeType("CTC-greedy")
textRecognizer.setVocabulary(vocabulary)
textRecognizer.setInputParams(1/127.5, (100,32), (127.5, 127.5, 127.5), True)

# Use the DB text detector initialized previously to detect the presence of text in the image.
boxes, confs = textDetector.detect(image)

# Draw the bounding boxes of text detected.
cv2.polylines(image, boxes, True, (255, 0, 255), 4)
# Display the image with the bounding boxes drawn
plt.figure(figsize=(10, 8))
plt.imshow(image[:, :, ::-1]); plt.title('Bounding boxes');

def fourPointsTransform(frame, vertices):
    """Extracts and transforms roi of frame defined by vertices into a rectangle."""
    # Get vertices of each bounding box 
    vertices = np.asarray(vertices).astype(np.float32)
    outputSize = (100, 32)
    targetVertices = np.array([
        [0, outputSize[1] - 1],
        [0, 0],
        [outputSize[0] - 1, 0],
        [outputSize[0] - 1, outputSize[1] - 1]], dtype="float32")
    # Apply perspective transform
    rotationMatrix = cv2.getPerspectiveTransform(vertices, targetVertices)
    result = cv2.warpPerspective(frame, rotationMatrix, outputSize)
    return result

# Display the transformed output of the first detected text box.
warped_detection = fourPointsTransform(image, boxes[0])
plt.figure(figsize=(10, 8))
plt.imshow(warped_detection[:, :, ::-1]); plt.title('Transformed detected text');
```


---
# References

- [EAST: An Efficient and Accurate Scene Text Detector](https://arxiv.org/pdf/1704.03155.pdf)
- [Real-time Scene Text Detection with Differentiable Binarization](https://arxiv.org/pdf/1911.08947.pdf)
- [**`dnn_TextDetectionModel_EAST()`**](https://docs.opencv.org/master/d8/ddc/classcv_1_1dnn_1_1TextDetectionModel__EAST.html)
- [**`dnn_TextDetectionModel_DB()`**](https://docs.opencv.org/master/db/d0f/classcv_1_1dnn_1_1TextDetectionModel__DB.html)
- [**`East Text Detection Model()`**](https://docs.opencv.org/master/d8/ddc/classcv_1_1dnn_1_1TextDetectionModel__EAST.html)
- [EAST original repo's model code](https://github.com/argman/EAST/blob/master/model.py)
- [OpenCV Tutorials](https://github.com/opencv/opencv/blob/master/doc/tutorials/dnn/dnn_text_spotting/dnn_text_spotting.markdown)
- [**`DB Text Detection Model()`**](https://docs.opencv.org/master/db/d0f/classcv_1_1dnn_1_1TextDetectionModel__DB.html)
- [DB original repo's demo code](https://github.com/MhLiao/DB/blob/master/demo.py)
- [**`Text Recognition Model()`**](https://docs.opencv.org/4.5.2/de/dee/classcv_1_1dnn_1_1TextRecognitionModel.html)
- [**`getPerspectiveTransform() `**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#ga20f62aa3235d869c9956436c870893ae)
- [**`warpPerspective()`**](https://docs.opencv.org/4.5.2/da/d54/group__imgproc__transform.html#gaf73673a7e8e18ec6963e3774e6a94b87)
- [Tesseract](https://pypi.org/project/pytesseract)
- [EasyOCR](https://github.com/JaidedAI/EasyOCR)
- [**googletrans**](https://pypi.org/project/googletrans/) 
- [Official Google Translate API](https://cloud.google.com/translate)
- [**`googletrans.Translator()`**](https://py-googletrans.readthedocs.io/en/latest/#googletrans.Translator)
- [**`detect()`**](https://py-googletrans.readthedocs.io/en/latest/#googletrans.Translator.detect)
- [**`translate()`**](https://py-googletrans.readthedocs.io/en/latest/#googletrans.Translator.translate)

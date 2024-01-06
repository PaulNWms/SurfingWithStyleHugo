---
title: OpenCV Setup
description: 
date: 2023-12-22T07:39
keywords: 
draft: false
tags:
---
## venv

On a clean system, open a PowerShell prompt and type `python`.  This will open Windows Store.  Install it, then set up an environment, and add packages with pip.

```PowerShell
pip install opencv-python
pip install opencv-contrib-python
python
>>> import cv2 as cv
>>> cv.__version__
>>> exit()
```
## Anaconda

On a clean system, install Anaconda from [Free Download | Anaconda](https://www.anaconda.com/download).  Open an Anaconda prompt, set up an environment, and add packages.

```PowerShell
conda create --name opencv-env
conda activate opencv-env
conda install conda-forge opencv
python
>>> import cv2 as cv
>>> cv.__version__
>>> exit()
```


---
# References

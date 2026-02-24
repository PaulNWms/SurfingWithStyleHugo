---
title: Python Human-computer interaction (HCI)
date: 2023-06-03T18:07:00-08:00
draft: false
tags:
  - "#OpenCV"
  - Python
---
```python
import pyautogui
import time

# Give a moment (half a second) to bring up the application window if needed.
time.sleep(0.5)

# If on a mac OSX machine, use command key instead of ctrl.
hotkey = 'command' if 'mac' in pyautogui.platform.platform() else 'ctrl'

# Open a new tab using a shortcut key.
pyautogui.hotkey(hotkey, 't')

# Give time for the browser to open the tab and be ready for user (typing) input.
time.sleep(1.0)

# Now type a url at a speedy 100 words per minute!
pyautogui.write('https://pyautogui.readthedocs.io', 0.01)

# Bring 'focus' to the URL bar (shortcut key may vary depending on your browser).
time.sleep(0.1)
pyautogui.hotkey(hotkey, 'l')

# Press enter to load the page.
pyautogui.press('enter')
```

---
# References

[**Mouse control functions**](https://pyautogui.readthedocs.io/en/latest/mouse.html)
[**Keyboard control functions**](https://pyautogui.readthedocs.io/en/latest/keyboard.html)
[Caffe](http://caffe.berkeleyvision.org/)
[**`cv2.dnn.readNetFromCaffe()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga29d0ea5e52b1d1a6c2681e3f7d68473a)
[**`cv2.dnn.blobFromImage()`**](https://docs.opencv.org/4.5.2/d6/d0f/group__dnn.html#ga98113a886b1d1fe0b38a8eef39ffaaa0)
[**`cv2.dnn_Net.setInput()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a5e74adacffd6aa53d56046581de7fcbd)
[**`cv2.dnn_Net.forward()`**](https://docs.opencv.org/4.5.2/db/d30/classcv_1_1dnn_1_1Net.html#a98ed94cb6ef7063d3697259566da310b)
[pyautogui.KEYBOARD_KEYS](https://pyautogui.readthedocs.io/en/latest/keyboard.html#keyboard-keys)
[**`press()`**](https://pyautogui.readthedocs.io/en/latest/keyboard.html)

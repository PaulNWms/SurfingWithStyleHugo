---
title: Python Exceptions
description: 
date: 2023-12-19
keywords: 
draft: false
tags:
  - Python
---
```python
try:
    types['missing']
except KeyError:
    print("missing is not a key")
finally:
    print("always do this")

# Can also subclass and raise errors
raise KeyError('Key was missing')

# List out lots of exceptions
dir(__builtins__)
```

---
# References

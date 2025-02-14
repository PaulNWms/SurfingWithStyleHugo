---
title: Python Objects
description: 
date: 2023-12-17
keywords: 
draft: false
tags:
  - Python
---
Everything in *Python* is an object that has:

* an *identity* (``id``)
* a *type* (``type``).  Determines what operations object can perform.
* a *value* (mutable or immutable)
* a *reference count*

You'll never need it, but if you want to see the reference count, you can do this.

```python
import sys
sys.getrefcount(a)
```

---
# References

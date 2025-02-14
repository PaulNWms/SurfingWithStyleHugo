---
title: Python Functions
description: 
date: 2023-12-19
keywords: 
draft: false
tags:
  - Python
---
```python
def add(x, y):
    """This adds two values
    >>> add(2, 4)
    6
    """
    return x + y

add?
add??
help(add)

# Tuple - Return multiple items from a function
def roots(val):
    return (val**.5, -(val**.5))

# Lambda - One-line anonymous function
def adder(x, y):
    """This adds two values
    >>> add(2, 4)
    6
    """
    return x + y

adder2 = lambda x, y: x + y
adder(42, 10) == adder2(42, 10)
```
`True`
```python
# Lambdas in sorting
names = ['john', 'paul', 'george', 'ringo']
sorted(names, key=lambda name: len(name))
```
`['john', 'paul', 'ringo', 'george']`

---
# References

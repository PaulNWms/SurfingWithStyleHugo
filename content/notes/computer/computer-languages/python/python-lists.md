---
title: Python Lists
description: 
date: 2023-12-18T20:44
keywords: 
draft: false
tags:
---
```python
# Literal vs constructor
names = ['john', 'paul', 'george']
vals = list(range(4))

names = ['john', 'paul', 'george', 'ringo']
'paul' in names
# These operations dispatch to "dunders"
names.__contains__('paul')

# When you need the index as well as item of enumeration
enumerate(names)

# Defeat Laziness - With constructor, not literal!
list(enumerate(names))
[enumerate(names)]
list((i - len(names), n)
    for i, n in enumerate(names))

# list append
x.append(11)

# list sort
x.sort()

# last element of list
x[-1]

# first 3 elements of list
x[0:3]
x[:3]

# last 3 elements of list
x[-3:len(x)]
x[-3:]

# select every other element of list
x[0:len(x):2]
x[::2]

# reverse list
x[::-1]

# slicing works on LHS of assignment
x[1:3] = [1, 2]
```

---
# References

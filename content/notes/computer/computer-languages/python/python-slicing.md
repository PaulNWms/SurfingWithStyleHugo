---
title: Python Slicing
description: 
date: 2023-12-18T20:59:00Z
keywords: 
draft: false
tags:
  - Python
---
```python
names = ['john', 'paul', 'george', 'ringo']
# Defeat Laziness - With constructor, not literal!
list(enumerate(names))
```
`[(0, 'john'), (1, 'paul'), (2, 'george'), (3, 'ringo')]`
```python
list((i - len(names), n)
    for i, n in enumerate(names))
```
`[(-4, 'john'), (-3, 'paul'), (-2, 'george'), (-1, 'ringo')]`
```python
names[:3]
```
`['john', 'paul', 'george']`
```python
names[3:]
```
`['ringo']`
```python
names[-2:]
```
`['george', 'ringo']`
```python
# Shallow Copies
names2 = names[:]
names[0] is names2[0]
```
`True`
```python
names == names2
```
`True`
```python
names is names2
```
`False`
```python
# Stride
names[::-1]
```
`['ringo', 'george', 'paul', 'john']`
```python
list(range(10))[::3]
```
`[0, 3, 6, 9]`
```python
# Slicing a string
filename = 'resume.pdf'
filename[:4]
```
`'resu'`
```python
filename[-3:]
```
`'pdf'`
```python
filename[::-1]
```
`'fdp.emuser'`

---
# References

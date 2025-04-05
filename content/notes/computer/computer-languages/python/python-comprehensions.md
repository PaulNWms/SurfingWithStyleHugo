---
title: Python Comprehensions
description: 
date: 2023-12-19T19:17
keywords: 
draft: false
tags:
  - Python
---
```python
# pattern for list comprehension
names2 = []
for name in names:
    if len(name) == 4:  # filter
        names2.append(name.title())  # title is mapping
names2
```
`['John', 'Paul']`
```python
names2 = [name.title() for name in names if len(name) == 4]
names2
```
`['John', 'Paul']`
```python
# Dict Comprehensions
types = {'name': str, 'age': int, 'address': str}
new_names = {}
for t in types:
    new_names[t] = t.title()
new_names
```
`{'name': 'Name', 'age': 'Age', 'address': 'Address'}`
```python
new_names = {t: t.title() for t in types}
```
`{'name': 'Name', 'age': 'Age', 'address': 'Address'}`
```python
# Set Comprehensions
uniq_names = {name for name in names if len(name) == 4}
uniq_names
```
`{'john', 'paul'}`
```python
# Generator Expression
lazy_names = (name for name in names if len(name) == 4)
list(lazy_names)
```
`['john', 'paul']`

---
# References

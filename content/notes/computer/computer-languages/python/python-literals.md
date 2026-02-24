---
title: Python Literals
description: 
date: 2023-12-18T05:37:00Z
keywords: 
draft: false
tags:
---
## Literals

```python
age_string = str(40)  # using str constructor
loc = 1+0j   # complex literal (complex)

# List literal
names = [name, 'suzy', 'fred']
characters = list('aeiou')  # constructor

# Tuple literal
person = ('fred', 42, '123-432-0943', '123 North Street')
person2 = tuple(['susan', 43, '213-123-0987', '789 West Ave'])

# Dictionary
types = {'name': 'string', 'age': 'int'}
ages = dict(zip(['fred', 'suzy'], [20, 21]))
types2 = dict(name='string', age='int')

# Dictionary
types = {'name': 'string', 'age': 'int'}
ages = dict(zip(['fred', 'suzy'], [20, 21]))
types2 = dict(name='string', age='int')

# Where are the built-in constructors?
print(dir(__builtins__))
```

### Naming[](http://localhost:8888/notebooks/python-for-beginners.ipynb#Naming)

See PEP 8 [http://legacy.python.org/dev/peps/pep-0008/](http://legacy.python.org/dev/peps/pep-0008/)

- lowercase
- underscore_between_words

---
# References

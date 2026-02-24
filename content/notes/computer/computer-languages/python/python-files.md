---
title: Python Files
description: 
date: 2023-12-18T18:23:00Z
keywords: 
draft: false
tags:
---
```python
# The  ``with`` statement will automatically close your files. (Also used in plotting and setting pandas parameters)
with open('names.csv', mode='w', encoding='utf8') as fout:
    fout.write('name,age\n')
    fout.write('jeff,30\n')
    fout.write('linda,29\n')

print(dir(fout))

with open('names.csv', encoding='utf8') as fin:
    data = fin.read()
data
```

---
# References

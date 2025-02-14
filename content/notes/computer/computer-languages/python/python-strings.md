---
title: Python Strings
description: 
date: 2023-12-18
keywords: 
draft: false
tags:
  - Python
---
```python
# negative indexing
name[-1] == name[len(name) - 1]

greeting = 'Hello \N{GRINNING FACE} \U0001f600 😀'

greeting.encode('utf8').decode('utf8')

# f-strings, triple-quote makes a here string
minutes = 36
paragraph = f"""Greetings {name.title()},
Thank you for attending tonight.
We will be here for {minutes/60:.2f} hours
Long-winded talk.
Goodbye {name}!"""
print(paragraph)

# length of a string, list, tuple
len(s)

# string case
str.upper()
str.lower()
str.capitalize()
str.title()

# string, list concatenation
a + b

# string power
5 * s

# string trimming
line.strip()
line.lstrip()
line.rstrip()

# justify
line.ljust()
line.rjust()

# find / replace
line.find('fox')
line.rfind('fox')
line.index('fox')
line.rindex('fox')
line.startswith('fox')
line.endswith('dog')
line.replace('brown', 'red')

# splitting
line.partition('fox')
line.split()

# formatting
"pi = {0:.3f}".format(pi)

# string interpolation
f"Nice to meet you {name}.  I am {machine}."

# regex
import re
regex = re.compile('\s+')
regex.split(line)
found = regex.match(s)
```

---
# References

---
title: Python
description: 
date: 2023-10-26
keywords: 
draft: false
tags:
  - Python
---
## Step-By-Step

- [Python Setup](/notes/computer/computer-languages/python/python-setup)
- [Jupyter](/notes/computer/computer-languages/python/jupyter)
- [Python Objects](/notes/computer/computer-languages/python/python-objects)
- [Python Literals](/notes/computer/computer-languages/python/python-literals)
- [Python Math](/notes/computer/computer-languages/python/python-math)
- [Python Strings](/notes/computer/computer-languages/python/python-strings)
- [Python Help](/notes/computer/computer-languages/python/python-help)
- [Python Files](/notes/computer/computer-languages/python/python-files)
- [Python Lists](/notes/computer/computer-languages/python/python-lists)
- [Python Slicing](/notes/computer/computer-languages/python/python-slicing)
- [Python Comprehensions](/notes/computer/computer-languages/python/python-comprehensions)
- [Python Functions](/notes/computer/computer-languages/python/python-functions)
- [Python Modules](/notes/computer/computer-languages/python/python-modules)
- [Python Classes](/notes/computer/computer-languages/python/python-classes)
- [Python Exceptions](/notes/computer/computer-languages/python/python-exceptions)
## Libraries

- [NumPy](/notes/computer/computer-languages/python/numpy)
- [Pandas](/notes/computer/computer-languages/python/pandas)
- [Scikit-Learn](/notes/computer/data/machine-learning/scikit-learn)
- [MatPlotLib](/notes/computer/computer-languages/python/matplotlib)
- [TensorFlow](/notes/computer/data/machine-learning/tensorflow)
- [Keras](/notes/)
- [PyTorch](/notes/)

```python
# Continue one line with '\'

# Continue multiple lines with parenthetical expression '(...)' (preferred)

# Separate multiple statements on one line with ';'

# All variables are pointers (including ints)

# Everything is an object (including ints)

# null
x = None

# create a requirements.txt
$ pip freeze > requirements.txt

# confirm TensorFlow sees the GPU
from tensorflow.python.client import device_lib
assert 'GPU' in str(device_lib.list_local_devices())

# confirm Keras sees the GPU
from keras import backend
assert len(backend.tensorflow_backend._get_available_gpus()) > 0

# confirm PyTorch is using the GPU
from torch import cuda
assert cuda.is_available()
assert cuda.device_count() > 0
print(cuda.get_device_name(cuda.current_device()))

# list
[1, 2, 3]

# tuple
(1, 2, 3)
1, 2, 3

# dict
{'a':1, 'b':2, 'c':3}

# set
{1, 2, 3}

# Tuples are immutable.

# Indexing, slicing, and many other list functions work on tuples.

# set operations
primes | odds <=> primes.union(odds)
primes & odds <=> primes.intersection(odds)
primes - odds <=> primes.difference(odds)
primes ^ odds <=> primes.symmetric_difference(odds)

# other useful collections (there are still more)
collections.namedtuple  # Like a tuple, but each value has a name
collections.defaultdict # Like a dictionary, but unspecified keys have a user-specified default value
collections.OrderedDict # Like a dictionary, but the order of keys is maintained

if x == 0:
    print(x, "is zero")
elif x > 0:
    print(x, "is positive")
elif x < 0:
    print(x, "is negative")
else:
    print(x, "is unlike anything I've ever seen...")

for N in [2, 3, 5, 7]:
    print(N, end=' ') # print all on same line

for i in range(10):
    print(i, end=' ')

# range object
list(range(5, 10))
list(range(0, 10, 2))

i = 0
while i < 10:
    print(i, end=' ')
    i += 1

break

continue

# define functions with def
def f(val):
    return ('f', val)

Functions can have default arguments.

Functions can be called using named arguments.

# varargs - the significant things are the '*' and '**' modifiers
def catch_all(*args, **kwargs):
    print("args =", args)
    print("kwargs = ", kwargs)

# lambda statement - functions are objects too
add = lambda x, y: x + y
    add(1, 2)

# sort list of dict alphabetically by first name
sorted(data, key=lambda item: item['first'])

try:
    print("try something here")
except:
    print("this happens only if it fails")
else:
    print("this happens only if it succeeds")
finally:
    print("this happens no matter what")

raise RuntimeError("fail")

try:
    x = 1 / 0
except ZeroDivisionError as err:
    print("Error class is:  ", type(err))
    print("Error message is:", err)

# define a custom exception
class MySpecialError(ValueError):
    pass
raise MySpecialError("here's the message")

# zip
for lval, rval in zip(L, R):
    print(lval, rval)

# map
for val in map(square, range(10)):
    print(val, end=' ')

# filter
is_even = lambda x: x % 2 == 0
for val in filter(is_even, range(10)):
    print(val, end=' ')

# unzip
z = zip(L1, L2)
new_L1, new_L2 = zip(*z)

# The itertools module contains permutation, combination and product functions.

# "ternary operator"
val if val >= 0 else -val

# list comprehensions - [expr for var in iterable]
[i for i in range(20) if i % 3 > 0]

# set comprehension
{n**2 for n in range(12)}

# dict comprehension
{n:n**2 for n in range(6)}

# generator expression
(n**2 for n in range(12))

# to print a generator expression
list(n**2 for n in range(12))

A generator is used up after one iteration.

Generator functions return values with 'yield'.

# requires all imported functions to be prefixed with package name
import math
import numpy as np

# imported functions can be used w/o prefix
from math import cos, pi
from math import *

# standard libraries
os and sys - Tools for interfacing with the operating system, including navigating file directory structures and executing shell commands
math and cmath - Mathematical functions and operations on real and complex numbers 
itertools - Tools for constructing and interacting with iterators and generators 
functools - Tools that assist with functional programming 
random - Tools for generating pseudorandom numbers
pickle - Tools for object persistence: saving objects to and loading objects from disk 
json and csv - Tools for reading JSON-formatted and CSV-formatted files 
urllib - Tools for doing HTTP and other web requests

# Common tools include numpy, scipy, pandas, matplotlib, scikit-learn.

# typecast
int(4.0)
float(7)

# remove item from list
del student_names[2]

# catch all exceptions
try:
    x = 1 / 0
except Exception:
    print("Fail!")

# converting a list to a set removes duplicates and sorts it
set([3, 2, 3, 1, 5]) == (1, 2, 3, 5)

def save_file(student):
    try:
        f = open("students.txt", "a")
        f.write(student + "\n")
        f.close()
    except Exception:
        print("Could not save file")

def read_file():
    try:
        f = open("students.txt", "r")
        for student in f.readlines():
            add_student(student)
        f.close()
    except Exception:
        print("Could not read file")

# There are no access modifiers.  All class methods and members are public.

# By convention, methods are marked "private" by preceding them with an underscore.

# There are no interfaces.

os.path.join(string, string)
os.path.isdir(string)
os.makedirs(string)

import os
import tarfile
from six.moves import urllib

DOWNLOAD_ROOT = "<URL>"
HOUSING_PATH = os.path.join("datasets", "housing")
HOUSING_URL = DOWNLOAD_ROOT + "datasets/housing/housing.tgz"

def fetch_housing_data(housing_url=HOUSING_URL, housing_path=HOUSING_PATH):
    if not os.path.isdir(housing_path):
        os.makedirs(housing_path)
    tgz_path = os.path.join(housing_path, "housing.tgz")
    urllib.request.urlretrieve(housing_url, tgz_path)
    housing_tgz = tarfile.open(tgz_path)
    housing_tgz.extractall(path=housing_path)
    housing_tgz.close()

# booleans can be added
True + True == 2

# read in CSV into a list of dict
import unicodecsv
with open(enrollments_filename, 'rb') as f:
    reader = unicodecsv.DictReader(f)
    enrollments = list(reader)

# clear the display in a jupyter notebook
from IPython.display import display, clear_output
clear_output(wait=True)
display(...)

# download an image
import requests
from PIL import Image
from io import BytesIO
r = requests.get(url)
i = Image.open(BytesIO(r.content))
```

---
# References

- [Testing Your Code](http://docs.python-guide.org/en/latest/writing/tests/)  
- [Requests: HTTP for Humans™](http://docs.python-requests.org/en/master/)  
- [SQL Alchemy](http://docs.sqlalchemy.org/en/latest/)  
- [Flask SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/)  
- [Example Google Style Python Docstrings](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html)  
- [nltk.tokenize](http://www.nltk.org/api/nltk.tokenize.html)  
- [The beginner’s guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)  
- [How to Version Control Your Production Machine Learning Models](https://blog.algorithmia.com/how-to-version-control-your-production-machine-learning-models/)  
- [The Flask Mega-Tutorial Part IV: Database](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database)  
- [Getting Started on Heroku with Python](https://devcenter.heroku.com/articles/getting-started-with-python#provision-a-database)  
- [pytest Configuration](https://docs.pytest.org/en/latest/customize.html)  
- [pytest Installation and Getting Started](https://docs.pytest.org/en/latest/getting-started.html)  
- [The Python Package Index (PyPI)](https://docs.python.org/3/distutils/packageindex.html)  
- [pdb — The Python Debugger](https://docs.python.org/3/library/pdb.html)  
- [Mixins for Fun and Profit](https://easyaspython.com/mixins-for-fun-and-profit-cb9962760556)  
- [Contributing to a Github Project](https://github.com/MarcDiethelm/contributing/blob/master/README.md)  
- [Magic Commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)  
- [The MIT License](https://opensource.org/licenses/MIT)  
- [Packaging Python Projects](https://packaging.python.org/tutorials/distributing-packages/)  
- [PyPI package browser](https://pypi.org/)  
- [Python’s Instance, Class, and Static Methods Demystified](https://realpython.com/instance-class-and-static-methods-demystified/)  
- [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/)  
- [Versioning Data Science](https://shuaiw.github.io/2017/07/30/versioning-data-science.html)  
- [OLS in Matrix Form](https://web.stanford.edu/~mrosenfe/soc_meth_proj3/matrix_OLS_NYU_notes.pdf)  
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/)  
- [Integration Testing](https://www.fullstackpython.com/integration-testing.html)  
- [PyCharm](https://www.jetbrains.com/pycharm/download/)  
- [A Whirlwind Tour of Python](https://www.oreilly.com/programming/free/files/a-whirlwind-tour-of-python.pdf)  
- [How to Make Mistakes in Python](https://www.oreilly.com/programming/free/files/how-to-make-mistakes-in-python.pdf)  
- [pylint](https://www.pylint.org/)  
- [Class and Instance Attributes](https://www.python-course.eu/python3_class_and_instance_attributes.php)  
- [PEP 8 – Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)  
- [PEP 257 - Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)  
- [SQLAlchemy](https://www.sqlalchemy.org/)  
- [Test Python package publishing](https://test.pypi.org/)

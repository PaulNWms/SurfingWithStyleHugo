---
title: "Python"
date: 2020-06-17T15:21:50-08:00
---

# Python

Links:  
[Testing Your Code](http://docs.python-guide.org/en/latest/writing/tests/)  
[Requests: HTTP for Humans™](http://docs.python-requests.org/en/master/)  
[SQL Alchemy](http://docs.sqlalchemy.org/en/latest/)  
[Flask SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/)  
[Example Google Style Python Docstrings](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html)  
[Inno Setup install wizard creator](http://www.jrsoftware.org/isinfo.php)  
[nltk.tokenize](http://www.nltk.org/api/nltk.tokenize.html)  
[The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)  
[How to Version Control Your Production Machine Learning Models](https://blog.algorithmia.com/how-to-version-control-your-production-machine-learning-models/)  
[The Flask Mega-Tutorial Part IV: Database](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database)  
[Getting Started on Heroku with Python](https://devcenter.heroku.com/articles/getting-started-with-python#provision-a-database)  
[pytest Configuration](https://docs.pytest.org/en/latest/customize.html)  
[pytest Installation and Getting Started](https://docs.pytest.org/en/latest/getting-started.html)  
[The Python Package Index (PyPI)](https://docs.python.org/3/distutils/packageindex.html)  
[pdb — The Python Debugger](https://docs.python.org/3/library/pdb.html)  
[Mixins for Fun and Profit](https://easyaspython.com/mixins-for-fun-and-profit-cb9962760556)  
[Contributing to a Github Project](https://github.com/MarcDiethelm/contributing/blob/master/README.md)  
[Magic Commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)  
[NumPy Docstring Guide](https://numpydoc.readthedocs.io/en/latest/format.html)  
[The MIT License](https://opensource.org/licenses/MIT)  
[Packaging Python Projects](https://packaging.python.org/tutorials/distributing-packages/)  
[PyPI package browser](https://pypi.org/)  
[Python's Instance, Class, and Static Methods Demystified](https://realpython.com/instance-class-and-static-methods-demystified/)  
[Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/)  
[Versioning Data Science](https://shuaiw.github.io/2017/07/30/versioning-data-science.html)  
[OLS in Matrix Form](https://web.stanford.edu/~mrosenfe/soc_meth_proj3/matrix_OLS_NYU_notes.pdf)  
[Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/)  
[Integration Testing](https://www.fullstackpython.com/integration-testing.html)  
[PyCharm](https://www.jetbrains.com/pycharm/download/)  
[A Whirlwind Tour of Python](https://www.oreilly.com/programming/free/files/a-whirlwind-tour-of-python.pdf)  
[How to Make Mistakes in Python](https://www.oreilly.com/programming/free/files/how-to-make-mistakes-in-python.pdf)  
[pylint](https://www.pylint.org/)  
[Class and Instance Attributes](https://www.python-course.eu/python3_class_and_instance_attributes.php)  
[PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)  
[PEP 257 - Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)  
[SQLAlchemy](https://www.sqlalchemy.org/)  
[Test Python package publishing](https://test.pypi.org/)  

```python
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

Common Jupyter keystrokes
SHIFT+ENTER
CTRL+ENTER
UP/DOWN
TAB
SHIFT+TAB
SHIFT+TAB,SHIFT+TAB
ESC,H
CTRL+SHIFT+P

Common magic keywords:
%matplotlib
%timeit
%pdb

# convert a notebook to HTML, slides
jupyter nbconvert --to html notebook.ipynb
jupyter nbconvert notebook.ipynb --to slides
jupyter nbconvert notebook.ipynb --to slides --post serve

# Continue one line with '\'

# Continue multiple lines with parenthetical expression '(...)' (preferred)

# Separate multiple statements on one line with ';'

# All variables are pointers (including ints)

# Everything is an object (including ints)

# floor division
a // b

# exponentiation
a ** b

# bit SHIFT left, right
a << b; a >> b

# bitwise NOT
~a

# output binary
bin(10)

# Boolean operators: and, or, not

# boolean XOR
(x > 1) != (x < 10)

# identity operators
a is b
a is not b

# membership operators
a in b
a not in b

# complex numbers
x = 1 + 2j

# null
x = None

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

# list
[1, 2, 3]

# tuple
(1, 2, 3)
1, 2, 3

# dict
{'a':1, 'b':2, 'c':3}

# set
{1, 2, 3}

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

# list comprehensions - [<em>expr</em> for <em>var</em> in <em>iterable</em>]
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

# regex
import re
regex = re.compile('\s+')
regex.split(line)
found = regex.match(s)

# Common tools include numpy, scipy, pandas, matplotlib, scikit-learn.

class Employee:
   'Common base class for all employees'
   empCount = 0

   def __init__(self, name, salary):
      self.name = name
      self.salary = salary
      Employee.empCount += 1
   
   def __del__(self):
      class_name = self.__class__.__name__
      print class_name, "destroyed"

   def displayCount(self):
     print "Total Employee %d" % Employee.empCount

   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary

The getattr(obj, name[, default]) − to access the attribute of object.
The hasattr(obj,name) − to check if an attribute exists or not.
The setattr(obj,name,value) − to set an attribute. If attribute does not exist, then it would be created.
The delattr(obj, name) − to delete an attribute.

__dict__ − Dictionary containing the class's namespace.
__doc__ − Class documentation string or none, if undefined. 
__name__ − Class name.
__module__ − Module name in which the class is defined. This attribute is "__main__" in interactive mode. 
__bases__ − A possibly empty tuple containing the base classes, in the order of their occurrence in the base class list.

# multiple inheritance
class SubClassName (ParentClass1[, ParentClass2, ...]):
   'Optional class documentation string'
   class_suite

__init__ ( self [,args...] ) 
Constructor (with any optional arguments) 
Sample Call : obj = className(args)

__del__( self )
Destructor, deletes an object
Sample Call : del obj

__repr__( self )
Evaluable string representation
Sample Call : repr(obj)

__str__( self )
Printable string representation
Sample Call : str(obj)

__cmp__ ( self, x )
Object comparison
Sample Call : cmp(obj, x)

# typecast
int(4.0)
float(7)

# string interpolation
f"Nice to meet you {name}.  I am {machine}."

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

pip install virtualenv
virtualenv &lt;name&gt;
source &lt;path&gt;&lt;name&gt;/bin/activate
deactivate

# create .exe
pip install pyinstaller
pyinstaller --onefile &lt;filename containing entry point&gt;

# Use InnoSetup to create installer, see links.

os.path.join(<em>string</em>, <em>string</em>)
os.path.isdir(<em>string</em>)
os.makedirs(<em>string</em>)

import os
import tarfile
from six.moves import urllib

DOWNLOAD_ROOT = "&lt;URL&gt;"
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

conda upgrade conda
conda upgrade --all
conda install package_name
conda install numpy=1.10
conda remove package_name
conda update package_name
conda list
conda search *beautifulsoup*
conda create -n env_name list of packages
conda create -n py2 python=2
conda create -n py python=3.3
source activate my_env
source deactivate
conda env export > environment.yaml
conda env create -f environment.yaml
conda env list
conda env remove -n env_name
pip freeze > requirements.txt
pip install -r requirements.txt

conda install jupyter notebook
jupyter notebook
conda install nb_conda

Then if you run the notebook server from a conda environment, you'll also have access to the "Conda" tab.

Magic keywords

# set up matplotlib to work interactively in the notebook
%matplotlib

# time how long it takes for a function to run
%timeit fibo1(20)

# time how long it takes for a whole cell to run
%%timeit

# render figures directly in the notebook
%matplotlib inline

# On higher resolution screens, use
%config InlineBackend.figure_format = 'retina'

# turn on the interactive debugger
%pdb

jupyter nbconvert --to html notebook.ipynb
jupyter nbconvert notebook.ipynb --to slides
jupyter nbconvert notebook.ipynb --to slides --post serve

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
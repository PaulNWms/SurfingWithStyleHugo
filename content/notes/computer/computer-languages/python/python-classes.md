---
title: Python Classes
description: 
date: 2023-12-19T21:45
keywords: 
draft: false
tags:
  - Python
---
## Class Functions for Constructing an Object

- `__new__` Allocate memory for a new object and send it to the `__init__` function (you don't interact with this one)
- `__init__` Receive a new object from the `__new__` function as a "self" parameter


```python
class MyInt:
    '''Docstring for MyInt'''
    def __init__(self, val):
        self.value = val


    def __add__(self, other):
        return MyInt(self.value + other)


    def __repr__(self):
        return f'MyInt({self.value})'


    def __str__(self):
        return f'{self.value}'


    def square(self):
        "Return the square of the value"
        return MyInt(self.value**2)

MyInt
```
`__main__.MyInt`
```python
num = MyInt(42)
num + 5  # calls .__add__ the .__repr__ methods
```
`MyInt(47)`
```python
print(num)
```
`42`
```python
num
```
`MyInt(42)`
```python
# In Jupyter use ``??`` to see source code
MyInt.square??
```

Example:

```python
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
```

The `getattr(obj, name[, default])` − to access the attribute of object.
The `hasattr(obj,name)` − to check if an attribute exists or not.
The `setattr(obj,name,value)` − to set an attribute. If attribute does not exist, then it would be created.
The `delattr(obj, name)` − to delete an attribute.

Common dunder variables:
`__dict__` − Dictionary containing the class's namespace.
`__doc__` − Class documentation string or none, if undefined. 
`__name__` − Class name.
`__module__` − Module name in which the class is defined. This attribute is "__main__" in interactive mode. 
`__bases__` − A possibly empty tuple containing the base classes, in the order of their occurrence in the base class list.

```python
# multiple inheritance
class SubClassName (ParentClass1[, ParentClass2, ...]):
   'Optional class documentation string'
   class_suite

# Common dunder methods
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
```


# References

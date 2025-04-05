---
title: NumPy
date: 2023-10-26T22:45
description: 
keywords: 
draft: false
tags:
  - Python
---
```python
import numpy as np
digits = np.array(range(10))
digits.dtype
```
`dtype('int32')`
```python
# Operations
digits.shape
```
`(10,)`
```python
np.sin(digits)
```
`array([ 0.        ,  0.84147098,  0.90929743,  0.14112001, -0.7568025 , -0.95892427, -0.2794155 ,  0.6569866 ,  0.98935825,  0.41211849])`
```python
# Creation
np.arange(3)
```
`array([0, 1, 2])`
```python
np.ones(3)
```
`array([1., 1., 1.])`
```python
np.zeros(3)
```
`array([0., 0., 0.])`
```python
np.eye(3, 5)
```
`array([1., 0., 0., 0., 0.], [0., 1., 0., 0., 0.], [0., 0., 1., 0., 0.](/notes/))`
```python
np.diag(range(3))
```
`array([0, 0, 0], [0, 1, 0], [0, 0, 2](/notes/))`
```python
np.linspace(0, 10, num=15)
```
`array([ 0.        ,  0.71428571,  1.42857143,  2.14285714,  2.85714286, 3.57142857, 4.28571429,  5.        ,  5.71428571,  6.42857143, 7.14285714,  7.85714286,  8.57142857,  9.28571429, 10.        ])`
```python
# Random Creation
np.random.random(3)  # between [0,1)
```
`array([0.77345657, 0.75312733, 0.84764337])`
```python
rng = np.random.default_rng()
rng.integers(low=11, high=15, size=5)  # 5 between [11,15)
```
`array([11, 12, 11, 14, 13])`
```python
np.random.bytes(5)  # 5 bytes
```
`b'\x00\xb6\xbb\\\xc6'`
```python
np.random.randn(3)  # normal distribution
```
`array([1.57567154, 0.28837618, 0.54008422])`
```python
X = np.linspace(0, 110000, 1000)

# to make this notebook's output identical at every run
np.random.seed(42)

# Divide by 1.5 to limit the number of income categories
housing["income_cat"] = np.ceil(housing["median_income"] / 1.5)
# Label those above 5 as 5
housing["income_cat"].where(housing["income_cat"] < 5, 5.0, inplace=True)

housing["income_cat"].value_counts()

# Translates slice objects to concatenation along the first axis.
example_images = np.r_[X[:12000:600], X[13000:30600:600], X[30600:60000:590]]

# Vectorized operations
+, -, *, /, ** (exponentiation) work on 2 arrays of the same length, or an array and a scalar
If a is an array and b is a scalar, both a ** b and b ** a will work.
& (and), | (or), ~ (not) logical operators work on binary arrays
& (and), | (or), ~ (not) bitwise operators work on integer arrays (less commonly used)
>, >=, <, <=, ==, != comparison operators result in an array of boolean

# Index arrays
a = np.array([1, 2, 3, 4])
b = np.array([True, True, False, False])
a[b] == [1, 2]

# += operates in-place while + does not

# Modifying an array slice modifies the original array (different from native python arrays!)
# A NumPy array slice is a view on the original array

# Use random.randint() to create a fair coin
# Use random.choice() to create a biased coin

# get the 95% confidence interval
np.percentile(hnd, 2.5), np.percentile(hnd, 97.5)

# create a bell curve
np.random.normal(loc=mean, scale=stdev, size=1000)

# compute the p-value
obs_diff = experiment_ctr - control_ctr # from full population
(null_vals > obs_diff).mean()

# ⚠ element-wise matrix multiplication (Why are you doing this?)
a * b
np.multiply(a, b)

# ⚠ dot product (This API is slippery, read docs first.)
np.dot(a, b)
a.dot(b)

# matrix product - you probably want this one
a @ b
np.matmul(a, b)

# matrix transpose
m.T
m.transpose()

# create row matrix
features = [ 0.49671415, -0.1382643 ,  0.64768854]
np.array(features, ndmin=2)
```
`array([ 0.49671415, -0.1382643 ,  0.64768854](/notes/))`
```python
# create column matrix
np.array(features, ndmin=2).T
```
`array([ 0.49671415], [-0.1382643 ], [ 0.64768854](/notes/))`

---
# References

- [Numpy and Scipy Documentation](https://docs.scipy.org/doc/)  
- [Stat Trek Hypothesis Testing](https://stattrek.com/hypothesis-test/hypothesis-testing.aspx)  
- [NumPy Docstring Guide](https://numpydoc.readthedocs.io/en/latest/format.html")  

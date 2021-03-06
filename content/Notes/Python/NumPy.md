---
title: "NumPy"
date: 2020-06-17
---

# NumPy & SciPy

Links:  
[Numpy and Scipy Documentation](https://docs.scipy.org/doc/)  
[Stat Trek Hypothesis Testing](https://stattrek.com/hypothesis-test/hypothesis-testing.aspx)  
[NumPy Docstring Guide](https://numpydoc.readthedocs.io/en/latest/format.html")  

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
&amp; (and), | (or), ~ (not) logical operators work on binary arrays
&amp; (and), | (or), ~ (not) bitwise operators work on integer arrays (less commonly used)
&gt;, &gt;=, &lt;, &lt;=, ==, != comparison operators result in an array of boolean

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
> array([[ 0.49671415, -0.1382643 ,  0.64768854]])

# create column matrix
np.array(features, ndmin=2).T
> array([[ 0.49671415],
       [-0.1382643 ],
       [ 0.64768854]])
```
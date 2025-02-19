---
title: Pandas
date: 2023-10-26
description: 
keywords: 
draft: false
tags:
  - Python
---


```python
# load DataFrame
import pandas as pd
df = pd.read_csv('student_scores.csv', index_col='ID')

# save DataFrame
df_powerplant.to_csv('powerplant_data_edited.csv', index=False)

Pandas actually stores pointers to strings in dataframes and series, which is why object instead of str appears as the datatype.
```

```python
# inspect DataFrame
df.head()
df.info()
df.nunique()
df.describe() # descriptive statistics for each column of data

df.tail()
df.sample()
df.shape
df.dtypes
df[col].value_counts()
df.hist();
sns.heatmap(df.corr(), annot=True, fmt='.2f');
```

```python
# select all the columns from 'id' to the last mean column
df_means = df.loc[:,'id':'fractal_dimension_mean']

# repeat the step above using index numbers
df_means = df.iloc[:,:11]

# pick and choose columns with np.r_ and df.iloc
cols = np.r_[0:1, 12:22]
df_stderr = df.iloc[:, cols]

# fill missing data with mean
mean = df['view_duration'].mean()
df['view_duration'].fillna(mean, inplace=True)

# duplicates
df.duplicated()
sum(df.duplicated())
df.drop_duplicates(inplace=True)

# find rows with nulls
sum(df_08.isnull().any(axis=1))

# convert text to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'])

# pandas uses Matplotlib as a back end
%matplotlib inline

# semicolon suppresses unwanted output
df.hist(figsize=(8,8));

# bar chart
df_census['education'].value_counts().plot(kind='bar')

# pie chart
df_census['workclass'].value_counts().plot(kind='pie', figsize=(8,8))

# scatter plots
pd.plotting.scatter_matrix(df_cancer, figsize=(15, 15));
df_cancer.plot(x='compactness', y='concavity', kind='scatter');

# box plots
df_cancer['concave_points'].plot(kind='box');

# filter data
df_m = df[df['diagnosis'] == 'M']

# order multiple bar charts with the same index
ind = df_x['education'].value_counts().index
df_a['education'].value_counts()[ind].plot(kind='bar');
df_b['education'].value_counts()[ind].plot(kind='bar');

# Find the mean quality of each wine type (red and white) with groupby
grouped = df.groupby('color')

# Creates acidity_levels column
df['acidity_levels'] = pd.cut(df['pH'], bin_edges, labels=bin_names)

# query() is equivalent to selecting with a mask
df_m = df[df['diagnosis'] == 'M']
df_m = df.query('diagnosis == "M"')

# get unique values in a column
df_08.Fuel.unique()

# drop columns from 2008 dataset
df_08.drop(['Stnd', 'Underhood ID', 'FE Calc Appr', 'Unadj Cmb MPG'], axis=1, inplace=True)

# rename Sales Area to Cert Region
df_08.rename(index=str, columns={"Sales Area": "Cert Region"}, inplace=True)

# replace spaces with underscores and lowercase labels for 2008 dataset
df_08.rename(columns=lambda x: x.strip().lower().replace(" ", "_"), inplace=True)

# confirm column labels for 2008 and 2018 datasets are identical
df_08.columns == df_18.columns

# make sure they're all identical like this
(df_08.columns == df_18.columns).all()

# drop rows with any null values
df_08.dropna(inplace=True)

# check values in a specific column
df_08['cyl'].value_counts()

# Extract int from strings in the 2008 cyl column
df_08['cyl'] = df_08['cyl'].str.extract('(\d+)').astype(int)

# merge datasets
df_combined = df_08.merge(df_18, left_on='model_2008', right_on='model', how='inner')

# Cookbook recipe: convert type of multiple columns
mpg_columns = ['city_mpg', 'hwy_mpg', 'cmb_mpg']
for c in mpg_columns:
    df_18[c] = df_18[c].astype(float)
    df_08[c] = df_08[c].astype(float)

# Cookbook recipe: fix data with 2 entries in one field
hb_08 = df_08[df_08['fuel'].str.contains('/')]
df1 = hb_08.copy()  # data on first fuel type of each hybrid vehicle
df2 = hb_08.copy()  # data on second fuel type of each hybrid vehicle
# columns to split by "/"
split_columns = ['fuel', 'air_pollution_score', 'city_mpg', 'hwy_mpg', 'cmb_mpg', 'greenhouse_gas_score']
# apply split function to each column of each dataframe copy
for c in split_columns:
    df1[c] = df1[c].apply(lambda x: x.split("/")[0])
    df2[c] = df2[c].apply(lambda x: x.split("/")[1])
new_rows = df1.append(df2)
# drop the original hybrid rows
df_08.drop(hb_08.index, inplace=True)
# add in our newly separated rows
df_08 = df_08.append(new_rows, ignore_index=True)

# A Pandas series is like a numpy array with extra functionality, esp. index

# get item by position
employment[i]
employment.iloc[i]

# get item by key
employment.loc['key']

# remove NaNs from a series
s.dropna()

# replace NaNs with a value
s.fillna(0)

# split a dataframe into X and y vectors
X = df.iloc[:,:-1]
y = df.iloc[:,-1]

# or if y is an inner column
outcomes = full_data['Survived']
features_raw = full_data.drop('Survived', axis = 1)

# Split the data into features and target label
income_raw = data['income']
features_raw = data.drop('income', axis = 1)

# Log-transform the skewed features
skewed = ['capital-gain', 'capital-loss']
features_log_transformed = pd.DataFrame(data = features_raw)
features_log_transformed[skewed] = features_raw[skewed].apply(lambda x: np.log(x + 1))

# Normalize numerical features (including those that were just log-scaled)
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler() # default=(0, 1)
numerical = ['age', 'education-num', 'capital-gain', 'capital-loss', 'hours-per-week']
features_log_minmax_transform = pd.DataFrame(data = features_log_transformed)
features_log_minmax_transform[numerical] = scaler.fit_transform(features_log_transformed[numerical])

# Convert categorical data with 2 categories to 0s and 1s
features_raw[two_cat].apply(lambda x: 0 if x == 'A' else 1))

# One-hot encode categorical data with &gt; 2 categores
stripped = df.apply(lambda x: x.str.strip() if x.dtype == 'object' else x)
df2 = pd.get_dummies(stripped, columns=["body_style", "drive_wheels"], prefix=["body", "drive"])

# Split data into training and testing sets
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(features_final, 
                                                    income, 
                                                    test_size = 0.2, 
                                                    random_state = 0)

# linear regression
import statsmodels.api as sm;
df['intercept'] = 1
mod = sm.OLS(df['price'], df['intercept','area'](/notes/)) # (y, X)
res = mod.fit()
res.summary()

# VIF factor
from patsy import dmatrices
import statsmodels.api as sm;
from statsmodels.stats.outliers_influence import variance_inflation_factor
y, X = dmatrices('price ~ area + bedrooms + bathrooms', df, return_type='dataframe')
vif = pd.DataFrame()
vif["VIF Factor"] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
vif["features"] = X.columns
vif.round(1)

# logistic regression (see also scikit-learn)
df['intercept'] = 1
log_mod = sm.Logit(df['fraud'], df['intercept', 'weekday', 'duration'](/notes/))
results = log_mod.fit()
results.summary()
np.exp(results.params)
1/_

# find missing values
null_data = df[df.isnull().any(axis=1)]

# find complete rows
complete_data = df[df.notnull().all(axis=1)]

# Drop only the rows with missing values in column 3.
only3_drop = small_dataset.dropna(subset=['col3'], how='any')

# find Pearson's R between 2 columns
df['hours-per-week'].corr(df['capital-gain'])

# find duplicate column names across tables
all_columns = pd.Series(list(patients) + list(treatments) + list(adverse_reactions))
all_columns[all_columns.duplicated()]

# split data into test and train sets
from sklearn.preprocessing import Imputer
imputer = Imputer()
columns = ['CareerSatisfaction', 'HoursPerWeek', 'JobSatisfaction', 'StackOverflowSatisfaction', 'Salary']
Xy = df[columns]
Xy = pd.DataFrame(imputer.fit_transform(Xy), columns=columns)
y = Xy['Salary']
X = Xy.drop('Salary', axis=1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = .30, random_state=42)

# Subset to a dataframe only holding the categorical columns
cat_df = df.select_dtypes(include=['object'])
```


---
# References

- [pandas](https://pandas.pydata.org/docs/user_guide/index.html)  
- [Cheat Sheet](https://github.com/pandas-dev/pandas/blob/main/doc/cheatsheet/Pandas_Cheat_Sheet.pdf)
- [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Pandas Basic Functionality](https://pandas.pydata.org/pandas-docs/stable/getting_started/basics.html)  
- [Data Science TDD](https://www.linkedin.com/pulse/data-science-test-driven-development-sam-savage/)  
- [TDD for Data Science](http://engineering.pivotal.io/post/test-driven-development-for-data-science/)  
- [TDD is Essential for Good Data Science Here's Why](https://medium.com/@@karijdempsey/test-driven-development-is-essential-for-good-data-science-heres-why-db7975a03a44)  
- [Testing Your Code (general python TDD)](http://docs.python-guide.org/en/latest/writing/tests/)  
- [Code Review](https://github.com/lyst/MakingLyst/tree/master/code-reviews)  
- [Code Review Best Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html)  

---
title: Data Analysis
date: 2023-10-26T23:20
description: 
keywords: 
draft: false
tags:
  - DataScience
---
```python
# convert .ipynb to .html
jupyter nbconvert --to html notebook.ipynb

# convert .ipynb to slideshow
jupyter nbconvert notebook.ipynb --to slides

# convert .ipynb to slideshow and display it
jupyter nbconvert notebook.ipynb --to slides --post serve
```
Step 1: Ask questions

Step 2: Wrangle data
- Gather
- Assess
  - Dirty data, also known as low quality data. Low quality data has content issues.
  - Messy data, also known as untidy data. Untidy data has structural issues.
    1. Each variable forms a column.
    2. Each observation forms a row. 
    3. Each type of observational unit forms a table.
- Clean
  - Always make copies of the original pieces of data before cleaning
- Reassess and Iterate
- Store (Optional)

Step 3: Perform EDA (Exploratory Data Analysis)
- Explore
-- building intuition
-- finding patterns
-- visualizing relationships
- Augment
-- remove outliers
-- feature engineering

Step 4: Draw conclusions (or make predictions)
- machine learning
- inferential statistics

Step 5: Communicate your results
- Data visualization

Debugging Data Problems
1. Identify surprising data points
2. Print out one or a few surprising points
3. Fix any problems you find

Data Types
- Quantitative
  - Continuous (Height, Age, Income)
  - Discrete (Pages in a Book, Trees in Yard, Dogs at a Coffee Shop)
- Categorical
  - Ordinal (Letter Grade, Survey Rating)
  - Nominal (Gender, Marital Status, Breakfast Items)

Four Aspects for Quantitative Data
1. Measures of Center
2. Measures of Spread
3. The Shape of the data.
4. Outliers

Measures of Center
1. Mean
2. Median
3. Mode (most frequently occurrring value)

The median of a set with an odd number of values is the value in the middle.
The median of a set with an even number of values is the mean of the 2 values in the middle.

A random variable is a column.
An observed value is a scalar.

Measures of Spread
1. Range
2. Interquartile Range (IQR)
3. Standard Deviation
4. Variance

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mfrac><mn>1</mn><mi>n</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>−</mo><mover><mi>x</mi><mo accent="true">‾</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup><mspace width="1.0em"></mspace><mi>o</mi><mi>r</mi><mspace width="1.0em"></mspace><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mfrac><mn>1</mn><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>−</mo><mover><mi>x</mi><mo accent="true">‾</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">\sigma^2 = \frac{1}{n} \sum_{i=1}^n{(x_i-\bar{x})^2} \quad or \quad \sigma^2 = \frac{1}{n-1} \sum_{i=1}^n{(x_i-\bar{x})^2}</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>σ</mi><mo>=</mo><msqrt><msup><mi>σ</mi><mn>2</mn></msup></msqrt><mo>=</mo><msqrt><mrow><mfrac><mn>1</mn><mi>n</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>−</mo><mover><mi>x</mi><mo accent="true">‾</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow></msqrt><mspace width="1.0em"></mspace><mi>o</mi><mi>r</mi><mspace width="1.0em"></mspace><mi>σ</mi><mo>=</mo><msqrt><mrow><mfrac><mn>1</mn><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>−</mo><mover><mi>x</mi><mo accent="true">‾</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sigma = \sqrt{\sigma^2} = \sqrt{\frac{1}{n} \sum_{i=1}^n{(x_i-\bar{x})^2}} \quad or \quad \sigma = \sqrt{\frac{1}{n-1} \sum_{i=1}^n{(x_i-\bar{x})^2}}</annotation></semantics></math>

Calculating the 5 Number Summary
1. Minimum: The smallest number in the dataset.
2. Q₁: The value such that 25% of the data fall below.
3. Q₂: The value such that 50% of the data fall below.
4. Q₃: The value such that 75% of the data fall below.
5. Maximum: The largest value in the dataset.

When outliers are present we should consider the following points.
1. Noting they exist and the impact on summary statistics.
2. If typo - remove or fix
3. Understanding why they exist, and the impact on questions we are trying to answer about our data.
4. Reporting the 5 number summary values is often a better indication than measures like the mean and standard deviation when we have outliers. 
5. Be careful in reporting. Know how to ask the right questions.

Descriptive statistics is about describing our collected data.
Inferential Statistics is about using our collected data to draw conclusions to a larger population.

Parameter - numeric summary about a population

Beware of [Simpson's Paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox).

Probability of opposite event: 1 - P
Probability of composite event: P * P * P ... * P

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mo stretchy="true" form="prefix">(</mo><mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mrow><mi>n</mi><mi>!</mi></mrow><mrow><mi>k</mi><mi>!</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\binom{n}{k} = \frac{n!}{k!(n-k)!}</annotation></semantics></math>

Binomial outcomes are events that have 2 outcomes.  The outcome probabilities follow a binomial distribution:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mrow><mi>n</mi><mi>!</mi></mrow><mrow><mi>k</mi><mi>!</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>!</mi></mrow></mfrac><mo>×</mo><msup><mi>p</mi><mi>k</mi></msup><msup><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><mi>p</mi><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo>−</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup></mrow><annotation encoding="application/x-tex">\frac{n!}{k!(n-k)!} \times p^k(1-p)^{(n-k)}</annotation></semantics></math>

Conditional Probability:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>A</mi><mo stretchy="false" form="prefix">|</mo><mi>B</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>A</mi><mo>∩</mo><mi>B</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>B</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow></mfrac></mrow><annotation encoding="application/x-tex">P(A|B) = \frac{P(A \cap B)}{P(B)}</annotation></semantics></math>

Sensitivity: probability a test is positive if the condition is true (true positive)
Specitivity: probability a test is negative if the condition is false (true positive)

Bayes' Rule:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>A</mi><mo stretchy="false" form="prefix">|</mo><mi>B</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>B</mi><mo stretchy="false" form="prefix">|</mo><mi>A</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>⋅</mo><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>A</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><mrow><mi>P</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>B</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow></mfrac></mrow><annotation encoding="application/x-tex">P(A|B) = \frac{P(B|A)\cdot P(A)}{P(B)}</annotation></semantics></math>

Normal Distribution:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>∣</mo><mi>μ</mi><mo>,</mo><msup><mi>σ</mi><mn>2</mn></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mn>1</mn><msqrt><mrow><mn>2</mn><mi>π</mi><msup><mi>σ</mi><mn>2</mn></msup></mrow></msqrt></mfrac><msup><mi>e</mi><mrow><mi>−</mi><mfrac><msup><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>−</mo><mi>μ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup><mrow><mn>2</mn><msup><mi>σ</mi><mn>2</mn></msup></mrow></mfrac></mrow></msup></mrow><annotation encoding="application/x-tex">f(x\mid \mu ,\sigma ^{2})={\frac {1}{\sqrt {2\pi \sigma ^{2}}}}e^{-{\frac {(x-\mu )^{2}}{2\sigma ^{2}}}}</annotation></semantics></math>

A sampling distribution is the distribution of a statistic.

The sampling distribution is centered on the original parameter value.
The sampling distribution decreases its variance depending on the sample size used. 

Parameter Statistic Description 
μ         x̄         "The mean of a dataset"
π         p         "The mean of a dataset with only 0 and 1 values - a proportion"
μ₁−μ₂     x̄₁−x̄₂     "The difference in means"
π₁−π₂     p₁−p₂     "The difference in proportions"
β         b         "A regression coefficient - frequently used with subscripts"
σ         s         "The standard deviation"
σ²        s²        "The variance"
ρ         r         "The correlation coefficient"

The Law of Large Numbers says that as our sample size increases, the sample mean gets closer to the population mean

The Central Limit Theorem states that with a large enough sample size the sampling distribution of the mean will be normally distributed.

The Central Limit Theorem actually applies for these well known statistics:
- Sample means (x̄)
- Sample proportions (p)
- Difference in sample means (x̄₁−x̄₂)
- Difference in sample proportions (p₁−p₂)

Bootstrapping is sampling with replacement.

Confidence interval means we are 95% confident the population mean falls between the bounds that you find.

Bootstrapping can be used in place of traditional confidence interval methods (T-Test, 2 Sample T-Test, Paired T-Test, Z-Test, Chi-squared Test, F-Test).

The null hypothesis is what we believe to be true before collecting any data.  "Innocent until proven guilty."

Type I errors - choosing H₁ when H₀ is true
1. You should set up your null and alternative hypotheses, so that the worse of your errors is the type I error.
2. They are denoted by the symbol α.
3. The definition of a type I error is: Deciding the alternative (H₁) is true, when actually (H₀) is true.
4. Type I errors are often called false positives.
Type II Errors - choosing H₀ when H₁ is true
1. They are denoted by the symbol β.
2. The definition of a type II error is: Deciding the null (H₀) is true, when actually (H₁) is true.
3. Type II errors are often called false negatives.

Power = 1 - Type II Error

Common hypothesis tests include:
1. Testing a population mean [(One sample t-test).](http://sites.utexas.edu/sos/guided/inferential/numeric/claim/one-sample-t/)
2. Testing the difference in means [(Two sample t-test)](https://www.isixsigma.com/tools-templates/hypothesis-testing/making-sense-two-sample-t-test/)
3. Testing the difference before and after some treatment on the same individual [(Paired t-test)](http://www.statstutor.ac.uk/resources/uploaded/paired-t-test.pdf)
4. Testing a population proportion [(One sample z-test)](https://stattrek.com/statistics/dictionary.aspx?definition=one-sample%20z-test)
5. Testing the difference between population proportions [(Two sample z-test)](https://onlinecourses.science.psu.edu/stat414/node/268/)

You can use one of these sites to provide a t-table or z-table to support one of the above approaches: [t-table](https://s3.amazonaws.com/udacity-hosted-downloads/t-table.jpg), [t-table or z-table](http://www.z-table.com/t-value-table.html)

In hypothesis testing, we first simulate from the closest value to the alternative that is still in the null space.

The sampling distribution for the mean is also equal to σ/√n.

With a sample size of 150, the mean should follow a normal distribution by the central limit theorem.

```python
# Simulating from the Null
diffs = np.zeros(10000)
for i in range(len(diffs)):
    b_samp = df.sample(df.shape[0], replace=True)
    control_df = b_samp.query('group == "control"')
    experiment_df = b_samp.query('group == "experiment"')
    control_ctr = control_df.query('action == "click"').id.nunique() / control_df.query('action == "view"').id.nunique()
    experiment_ctr = experiment_df.query('action == "click"').id.nunique() / experiment_df.query('action == "view"').id.nunique()
    diffs[i] = experiment_ctr - control_ctr

# Find lower and upper bound of confidence interval using bootstrapping
boot_means = []
for _ in range(10000):
    bootsample = coffee_red.sample(200, replace=True)
	boot_means.append(bootsample[bootsample['drinks_coffee'] == True]['height'].mean())
np.percentile(boot_means, 2.5), np.percentile(boot_means, 97.5)

# Find lower and upper bound of confidence interval (in this case difference of means) using statsmodels
import statsmodels.stats.api as sms
cm = sms.CompareMeans(sms.DescrStatsW(X1), sms.DescrStatsW(X2))
print(cm.tconfint_diff(usevar='unequal'))
```

The p-value is the probability of getting our statistic or a more extreme value if the null is true. 
Therefore, small p-values suggest our null is not true. Rather, our statistic is likely to have come from a different distribution than the null.
When the p-value is large, we have evidence that our statistic was likely to come from the null hypothesis. Therefore, we do not have evidence to reject the null. 
By comparing our p-value to our type I error threshold (α), we can make our decision about which hypothesis we will choose.

p ≤ α ⇒ Reject H₀
p > α ⇒ Fail to Reject H₀

```python
# Find p-value with numpy (two-sided test)
n_obs = data.shape[0]
n_control = data.groupby('condition').size()[0]
p = 0.5
n_trials = 200_000
samples = np.random.binomial(n_obs, p, n_trials)
np.logical_or(samples <= n_control, samples >= (n_obs - n_control)).mean()

sms.OLS()
```

Type I error compounds when you take multiple hypothesis tests.
Bonferroni Correction says that if you have m tests, use α/m.
Other methods include the 
- [Tukey correction](https://www.itl.nist.gov/div898/handbook/prc/section4/prc471.htm) 
- [Q-values](http://www.nonlinear.com/support/progenesis/comet/faq/v2.0/pq-values.aspx)
- [Closed testing procedure](https://en.wikipedia.org/wiki/Closed_testing_procedure)
- [Boole-Bonferroni bound](https://en.wikipedia.org/wiki/Boole%27s_inequality)
- [Holm-Bonferroni method](https://en.wikipedia.org/wiki/Holm–Bonferroni_method)

A two-sided hypothesis test (that is a test involving a ≠ in the alternative) is the same in terms of the conclusions made as a confidence interval as long as 1 − CI=α

Change Aversion: Existing users may give an unfair advantage to the old version, simply because they are unhappy with change, even if it’s ultimately for the better.
Novelty Effect: Existing users may give an unfair advantage to the new version, because they’re excited or drawn to the change, even if it isn’t any better in the long run.

A/B Test:
- Compute the observed difference between the metric, average reading duration, for the control and experiment group.
- Simulate the sampling distribution for the difference in means (or average reading durations).
- Use this sampling distribution to simulate the distribution under the null hypothesis, by creating a random normal distribution centered at 0 with the same spread and size.
- Compute the p-value by finding the proportion of values in the null distribution that were greater than our observed difference.
- Use this p-value to determine the statistical significance of our observed difference.

Difficulties in A/B Testing
- Novelty effect and change aversion when existing users first experience a change
- Sufficient traffic and conversions to have significant and repeatable results
- Best metric choice for making the ultimate decision (eg. measuring revenue vs. clicks)
- Long enough run time for the experiment to account for changes in behavior based on time of day/week or seasonal events.
- Practical significance of a conversion rate (the cost of launching a new feature vs. the gain from the increase in conversion)
- Consistency among test subjects in the control and experiment group (imbalance in the population represented in each group can lead to situations like [Simpson's Paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox))

The response variable is what you want to predict, while the explanatory variable is the variable you use to predict the response.

[Pearson's correlation coefficient](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient) provides the strength and direction of a linear relationship.

[Spearman's Correlation Coefficient](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient) does not measure linear relationships specifically, and it might be more appropriate for certain cases of associating two variables.

Linear regression is notated as: ŷ = b₀ + b₁x₁

The least squares algorithm finds the line that minimizes:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>y</mi><mi>i</mi></msub><mo>−</mo><msub><mover><mi>y</mi><mo accent="true">̂</mo></mover><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">\sum\limits_{i=1}^n(y_i - \hat{y}_i)^2</annotation></semantics></math>

The R-squared value is the square of the correlation coefficient.

Problems in multiple linear regression:
- Non-linearity of the response-predictor relationships
- Correlation of error terms
- Non-constant Variance and Normally Distributed Errors
- Outliers/ High leverage points
- Collinearity

One of the most common ways to identify if you have correlated errors is based on the domain from which the data were collected. If you are unsure, there is a test known as a [Durbin-Watson](https://en.wikipedia.org/wiki/Durbin–Watson_statistic) test that is commonly used to assess whether correlation of the errors is an issue. Then [ARIMA or ARMA](http://www.statsref.com/HTML/index.html?arima.html) models are commonly implemented to use this correlation to make better predictions.

Commonly, a log (or some other transformation of the response variable is done) in order to "get rid" of the non-constant variance. In order to choose the transformation, a [Box-Cox](https://www.statisticshowto.datasciencecentral.com/box-cox-transformation/) is commonly used.

Two different ways of identifying multicollinearity:
- We can look at scatter plots.
- We can look at [VIFs](https://etav.github.io/python/vif_factor_python.html) for each variable.

Higher order terms:
- Add a squared term if the response curve is roughly parabolic
- Add a cubed term if the responce curves is roughly S-shaped
- Add an interaction term x₁x₂ if x₁ and x₂ are both linear, but with a different slope
- When adding a higher order term, also add the corresponding lower order term(s)

To interpret logistic regression, use np.exp() on the coefficient values.
Sometimes if the coeffient is negative, it's more meaningful to use 1/np.exp(coef).

Confusion matrices:
Recall: True Positive / (True Positive + False Negative)
Precision: True Positive / (True Positive + False Positive)
Eselsbrücke: Precision ⇔ Positives
⚠️ Warning: The tables are usually formatted with actuals on the row and predicted values on the columns, but not always.
⚠️ Warning: scikit-learn outputs binary tables with true positives (1, 1) in the lower right, whereas handwritten tables often have true positives in the upper left.

Data Quality Dimensions
- Completeness: do we have all of the records that we should? Do we have missing records or not? Are there specific rows, columns, or cells missing?
- Validity: we have the records, but they're not valid, i.e., they don't conform to a defined schema. A schema is a defined set of rules for data. These rules can be real-world constraints (e.g. negative height is impossible) and table-specific constraints (e.g. unique key constraints in tables).
- Accuracy: inaccurate data is wrong data that is valid. It adheres to the defined schema, but it is still incorrect. Example: a patient's weight that is 5 lbs too heavy because the scale was faulty.
- Consistency: inconsistent data is both valid and accurate, but there are multiple correct ways of referring to the same thing. Consistency, i.e., a standard format, in columns that represent the same data across tables and/or within tables is desired.

There are two main reasons for creating visuals using data:
1. Exploratory Analysis is done when you are searching for insights. These visualizations don't need to be perfect. You are using plots to find insights, but they don't need to be aesthetically appealing. You are the consumer, and you need to be able to find the answer to your question from these plots.
2. Explanatory Analysis is done when you are providing your results for others. These visualizations need to provide you the emphasis you need to convey your message. They should be accurate, insightful, and visually appealing. 

The five steps of the data analysis process:
1. Extract - Obtain the data from a spreadsheet, SQL, the web, etc.
2. Clean - Here we could use exploratory visuals.
3. Explore - Here we use exploratory visuals.
4. Analyze - Here we might use either exploratory or explanatory visuals.
5. Share - Here is where explanatory visuals live.

The Four Levels of Measurement
- Qualitative or categorical types (non-numeric types)
  1. Nominal data: pure labels without inherent order
  2. Ordinal data: labels with an intrinsic order or ranking (comparison operations can be made between values)
- Quantitative or numeric types
  3. Interval data: numeric values where absolute differences are meaningful (addition and subtraction operations can be made)
  4. Ratio data: numeric values where relative differences are meaningful (multiplication and division operations can be made)
  All quantitative-type variables also come in one of two varieties: discrete and continuous.
  - Discrete quantitative variables can only take on a specific set values at some maximum level of precision. 
  - Continuous quantitative variables can (hypothetically) take on values to any level of precision.

Chart junk
- Heavy grid lines
- Unnecessary text
- Pictures surrounding the visual
- Shading or 3d components
- Ornamented chart axes

Limiting chart junk increases the data-ink ratio. 

Color can both help and hurt a data visualization. Three tips for using color effectively.
1. Before adding color to a visualization, start with black and white.
2. When using color, use less intense colors - not all the colors of the rainbow, which is the default in many software applications.
3. Color for communication. Use color to highlight your message and separate groups of interest. Don't add color just to have color in your visualization. 

To be sensitive to those with colorblindness, you should use color pallets that do not move from red to green . 
Instead, use colors on a blue to orange pallet.

Univariate plot types:
- Bar charts (qualitative)
- Pie charts
- Histograms (quantitative)

Bivariate plot types:
- Scatter plots (quantitative vs. quantitative)
- Violin plots (quantitative vs. qualitative)
- Box plots
- Clustered bar charts (qualitative vs. qualitative)

Multivariate visualizations:
- color, size, shape
- Faceting

---
# References

- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
- [A Review and Comparison of Methods for Detecting Outliers in Univariate Data Sets](http://d-scholarship.pitt.edu/7948/1/Seo.pdf)
- [Understanding Q-Q Plots](https://data.library.virginia.edu/understanding-q-q-plots/)  
- [Kolmogorov–Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov–Smirnov_test)  
- [Generalized Linear Models](http://www.statsmodels.org/stable/glm.html)  
- [Sampling Distribution of the Mean](http://onlinestatbook.com/2/sampling_distributions/samp_dist_mean.html)  
- [What is a p-value and how do you calculate it?](https://rebeccaebarnes.github.io/2018/05/01/what-is-a-p-value)  
- [An Introduction to Statistical Learning](http://www-bcf.usc.edu/~gareth/ISL/ISLR%20First%20Printing.pdf)  
- [Markdown Syntax](https://daringfireball.net/projects/markdown/syntax)  
- [Hide the input cells from your IPython slides](http://www.damian.oquanta.info/posts/hide-the-input-cells-from-your-ipython-slides.html)  
- [Conda Cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)  
- [Conda: Myths and Misconceptions](https://jakevdp.github.io/blog/2016/08/25/conda-myths-and-misconceptions/)  
- [Conda docs](https://docs.conda.io/projects/conda/en/latest/)  
- [magic keywords](https://ipython.readthedocs.io/en/stable/interactive/magics.html)  
- [pdb — The Python Debugger](https://docs.python.org/3/library/pdb.html)

---
title: Data Science
date: 2023-10-26T23:22:00Z
description: 
keywords: 
draft: false
tags:
  - DataScience
---
Classification -> categorical outcomes
Regression -> numerical outcomes

- Supervised learning
  - Classification
  - Regression
- Unsupervised learning
  - Classification
- Reinforcement learning

Absolute Trick (to move a line towards a point)
Given y = w₁x + w₂, point (p, q) and learning rate α
y = (w₁ + pα)x + (w₂ + α)

Square Trick
y = (w₁ + p(q - q')α)x + (w₂ + (q - q')α)

Mean Absolute Error:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">|</mo><mi>y</mi><mo>−</mo><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo stretchy="true" form="postfix">|</mo></mrow></mrow><annotation encoding="application/x-tex">Error = \frac{1}{m}\sum_{i=1}^m{|y - \hat y|}</annotation></semantics></math>
Mean Squared Error:
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>m</mi></mrow></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><mi>y</mi><mo>−</mo><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">Error = \frac{1}{2m}\sum_{i=1}^m{(y - \hat y)^2}</annotation></semantics></math>

```python
# Example: calculate MSE explicitly to update line (don't actually use this)
def MSEStep(X, y, W, b, learn_rate = 0.005):
    y_pred = np.matmul(X, W) + b
    error = y - y_pred
    W_new = W + learn_rate * np.matmul(error, X)
    b_new = b + learn_rate * error.sum()
    return W_new, b_new
```
L1 regularization adds the polynomial coefficients and adds them to the error, penalizing complexity.
L2 regularization adds the squares of the coefficients.

λ is the coefficient used to tune L1 & L2 regularization.

L1 regularization
- Computationally inefficient (unless data is sparse)
- Better for sparse outputs
- Feature selection (drives less relevant columns to 0)
L2 regularization
- Computationally efficient
- Better for non-sparse outputs
- No feature selection

Standardizing is completed by taking each value of your column, subtracting the mean of the column, and then dividing by the standard deviation of the column.
Normalizing scales data between 0 and 1.

When Should I Use Feature Scaling?
- When your algorithm uses a distance based metric to predict. 
- When you incorporate regularization.

Linear boundary:
w₁x₁ + w₂x₂ + b = 0 
Wx + b = 0
W = (w₁, w₂)
x = (x₁, x₂)

Perceptron:
ŷ = 1 if Wx + b ≥ 0
    0 if Wx + b &lt; 0

Entropy in a set for 2 classes and multi-class:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mo>=</mo><mi>−</mi><mfrac><mi>m</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mi>l</mi><mi>o</mi><msub><mi>g</mi><mn>2</mn></msub><mrow><mo stretchy="true" form="prefix">(</mo><mfrac><mi>m</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mo stretchy="true" form="postfix">)</mo></mrow><mo>−</mo><mfrac><mi>n</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mi>l</mi><mi>o</mi><msub><mi>g</mi><mn>2</mn></msub><mrow><mo stretchy="true" form="prefix">(</mo><mfrac><mi>n</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">entropy = -\frac{m}{m+n}log_2(\frac{m}{m+n})-\frac{n}{m+n}log_2(\frac{n}{m+n})</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mo>=</mo><mi>−</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msub><mi>p</mi><mi>i</mi></msub><msub><mo>log</mo><mn>2</mn></msub><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>p</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">entropy = -\sum_{i=1}^n p_i\log_2(p_i)</annotation></semantics></math>

As entropy increases, knowledge decreases, and vice versa.

Information gain is a change in entropy.

When you split a dataset, the information gain is the difference between the entropy of the parent and the average entropy of the children.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>I</mi><mi>n</mi><mi>f</mi><mi>o</mi><mi>r</mi><mi>m</mi><mi>a</mi><mi>t</mi><mi>i</mi><mi>o</mi><mi>n</mi><mi>G</mi><mi>a</mi><mi>i</mi><mi>n</mi><mo>=</mo><mi>E</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>P</mi><mi>a</mi><mi>r</mi><mi>e</mi><mi>n</mi><mi>t</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>−</mo><mrow><mo stretchy="true" form="prefix">(</mo><mfrac><mi>m</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mi>E</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>C</mi><mi>h</mi><mi>i</mi><mi>l</mi><mi>d</mi><mi>₁</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mfrac><mi>n</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></mfrac><mi>E</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>C</mi><mi>h</mi><mi>i</mi><mi>l</mi><mi>d</mi><mi>₂</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">InformationGain = Entropy(Parent) - (\frac{m}{m+n}Entropy(Child₁) + \frac{n}{m+n}Entropy(Child₂))</annotation></semantics></math>

The decision tree algorithm looks a the possible splits that each column gives, calculates the information gain, and picks the largest one.

Common hyperparameters for decision trees:
- Maximum depth
- Minimum number of samples per leaf
- Minimum number of samples per split
- Maximum number of features

Naïve Bayes assumes that conditions are independent.

P(spam|'easy','money') ∝ P('easy'|spam)⋅P('money'|spam)⋅P(spam)

Error in Support Vector Machines:  ERROR = C⋅CLASSIFICATION_ERROR + MARGIN_ERROR

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mi>a</mi><mi>r</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo>=</mo><mfrac><mn>2</mn><mrow><mo stretchy="true" form="prefix">|</mo><mi>W</mi><mo stretchy="true" form="postfix">|</mo></mrow></mfrac><mspace width="2.0em"></mspace><mi>E</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><msup><mrow><mo stretchy="true" form="prefix">|</mo><mi>W</mi><mo stretchy="true" form="postfix">|</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">Margin = \frac{2}{|W|} \qquad Error = |W|^2</annotation></semantics></math>

SVMs can have linear, polynomial or radial basis function (RBF) kernels.

In an RBF kernel, large γ is similar to having a large value of C, that is your algorithm will attempt to classify every point correctly.

By combining algorithms, we can often build models that perform better by meeting in the middle in terms of bias and variance.

The introduction of randomness combats the tendency of these algorithms to overfit.  There are two main ways that randomness is introduced:
- Bootstrap the data - that is, sampling the data with replacement and fitting your algorithm and fitting your algorithm to the sampled data.
- Subset the features - in each split of a decision tree or with each algorithm used an ensemble only a subset of the total possible features are used.

A random forest builds multiple decision trees from multiple subsets of <em>features</em>, and then takes a vote.

Bagging takes random samples of <em>data</em> and splits each subset, and then combines the splits.

Adaboost tries a model, adds weight to misclassified points, creates a new model etc., then combines the models.

Bias and Variance:
- High Bias, Low Variance models tend to underfit data, as they are not flexible. Linear models fall into this category of models.
- High Variance, Low Bias models tend to overfit data, as they are too flexible. Decision trees fall into this category of models.

Ensemble Models: There were two randomization techniques you saw to combat overfitting:
- Bootstrap the data - that is, sampling the data with replacement and fitting your algorithm and fitting your algorithm to the sampled data.
- Subset the features - in each split of a decision tree or with each algorithm used an ensemble only a subset of the total possible features are used.

Thou shalt never use your testing data for training.

Confusion Matrix: Type 1 and Type 2 Errors
Type 1 Error (Error of the first kind, or False Positive): In the medical example, this is when we misdiagnose a healthy patient as sick.
Type 2 Error (Error of the second kind, or False Negative): In the medical example, this is when we misdiagnose a sick patient as healthy.

Precision: TP / (TP + FP) - Think: murder trial
Recall:    TP / (TP + FN) - Think: parachute manufacturer

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>H</mi><mi>a</mi><mi>r</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>i</mi><mi>c</mi><mi>M</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>=</mo><mfrac><mrow><mn>2</mn><mi>x</mi><mi>y</mi></mrow><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mfrac><mspace width="2.0em"></mspace><msub><mi>F</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><mo>⋅</mo><mfrac><mrow><mi>P</mi><mi>r</mi><mi>e</mi><mi>c</mi><mi>i</mi><mi>s</mi><mi>i</mi><mi>o</mi><mi>n</mi><mo>×</mo><mi>R</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>l</mi></mrow><mrow><mi>P</mi><mi>r</mi><mi>e</mi><mi>c</mi><mi>i</mi><mi>s</mi><mi>i</mi><mi>o</mi><mi>n</mi><mo>+</mo><mi>R</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>l</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">HarmonicMean= \frac{2xy}{x+y} \qquad F_1 = 2\cdot\frac{Precision\times Recall}{Precision+Recall}</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>F</mi><mi>β</mi></msub><mo>=</mo><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>+</mo><msup><mi>N</mi><mn>2</mn></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo>⋅</mo><mfrac><mrow><mtext mathvariant="normal">Precision</mtext><mo>⋅</mo><mtext mathvariant="normal">Recall</mtext></mrow><mrow><msup><mi>N</mi><mn>2</mn></msup><mo>⋅</mo><mtext mathvariant="normal">Precision</mtext><mo>+</mo><mtext mathvariant="normal">Recall</mtext></mrow></mfrac><mo>=</mo><mfrac><mrow><mtext mathvariant="normal">Precision</mtext><mo>⋅</mo><mtext mathvariant="normal">Recall</mtext></mrow><mrow><mfrac><msup><mi>N</mi><mn>2</mn></msup><mrow><mn>1</mn><mo>+</mo><msup><mi>N</mi><mn>2</mn></msup></mrow></mfrac><mtext mathvariant="normal">Precision</mtext><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><msup><mi>N</mi><mn>2</mn></msup></mrow></mfrac><mtext mathvariant="normal">Recall</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">F_\beta = (1+N^2) \cdot \frac{\text{Precision} \cdot \text{Recall}}{N^2 \cdot \text{Precision} + \text{Recall}} = \frac{\text{Precision} \cdot \text{Recall}}{\frac{N^2}{1+N^2}\text{Precision} + \frac{1}{1+N^2}\text{Recall}}</annotation></semantics></math>

The area under the Receiver Operating Characteristic (ROC) Curve is 1 for a perfect split, and .5 for a random split.

Classification metrics:
- Accuracy
- Precision
- Recall
- F<sub>β</sub> Score
- ROC Curve &amp; AUC

Regression metrics:
- Mean absolute error
- MSE
- r2 score = 1 - MSE / (score of a horizontal line)

Underfitting = high bias
Overfitting = high variance

Model Complexity Graph
- Underfitting gives a high error on both training and cross-validation sets
- Overfitting gives a low error on the training set and high error on the cross-validation set

K-fold cross validation (see scikit-learn)

A model with high bias converges to a high error as the number of training points increases
A model that's just right converges to a low error
A model with high variance does not converge

Some Supervised Learning Models available in scikit-learn
- Gaussian Naive Bayes (GaussianNB)
- Decision Trees
- Ensemble Methods (Bagging, AdaBoost, Random Forest, Gradient Boosting)
- K-Nearest Neighbors (KNeighbors)
- Stochastic Gradient Descent Classifier (SGDC)
- Support Vector Machines (SVM)
- Logistic Regression

Backpropagation:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>δ</mi><mi>j</mi><mi>h</mi></msubsup><mo>=</mo><mo>∑</mo><mrow><msub><mi>W</mi><mrow><mi>j</mi><mi>k</mi></mrow></msub><msubsup><mi>δ</mi><mi>k</mi><mn>0</mn></msubsup><mi>f</mi><mi>′</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>h</mi><mi>j</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow></mrow><annotation encoding="application/x-tex">\delta^h_j = \sum{W_{jk}\delta^0_kf&#39;(h_j)}</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>Δ</mi><msub><mi>w</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><mi>η</mi><msubsup><mi>δ</mi><mi>j</mi><mi>h</mi></msubsup><msub><mi>x</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">\Delta w_{ij} = \eta \delta^h_jx_i</annotation></semantics></math>

2 popular methods for unsupervised machine learning:
- Clustering
- Dimensionality Reduction

In the K-means algorithm 'k' represents the number of clusters you have in your dataset.

When you have no idea how many clusters exist in your dataset, a common strategy for determining k is the elbow method.  In the elbow method, you create a plot of the number of clusters (on the x-axis) vs. the average distance of the center of the cluster to each point (on the y-axis). This plot is called a scree plot

To use KMeans, you need to follow three steps:
1. Instantiate your model.
2. Fit your model to the data.
3. Predict the labels for the data.

The starting points of the centroids can actually make a difference as to the final results you obtain from the k-means algorithm.

The best set of clusters is then the clustering that creates the smallest average distance from each point to its corresponding centroid.

Feature scaling - there are two ways that are most common:
- Normalizing or Max-Min Scaling - this type of scaling moves variables between 0 and 1.
- Standardizing or Z-Score Scaling - this type of scaling creates variables with a mean of 0 and standard deviation of 1.

I. Clustering
- Visual Inspection of your data.
- Pre-conceived ideas of the number of clusters.
- The elbow method, which compares the average distance of each point to the cluster center for different numbers of centers.

II. K-Means
You saw the k-means algorithm for clustering data, which has 3 steps:
1. Randomly place k-centroids amongst your data.
Then repeat the following two steps until convergence (the centroids don't change):
   2. Look at the distance from each centroid to each point. Assign each point to the closest centroid. 
   3. Move the centroid to the center of the points assigned to it.

III. Concerns with K-Means
1. Concern: The random placement of the centroids may lead to non-optimal solutions.
   Solution: Run the algorithm multiple times and choose the centroids that create the smallest average distance of the points to the centroids.
2. Concern: Depending on the scale of the features, you may end up with different groupings of your points.
   Solution: Scale the features using Standardizing, which will create features with mean 0 and standard deviation 1 before running the k-means algorithm.

Hierarchical Clustering
- The first step is to assume that each point is already a cluster
- the next step would be to calculate the distances between each point and each other points
  - choose the smallest distance between two clusters
  - group those two points into a cluster

- Single link looks at the closest two points in the two clusters (not in sklearn)
- Complete link looks at the farthest two points in the two clusters
- Average link looks at the distance between every point and every other point in the other cluster and averages them
- Ward's method

Advantages of HC
- hierarchical representations are informative and they provide us with an additional ability to visualize the clustering structure of the datasets
- especially useful when the data contains real hierarchical relationships inside of it

Disadvantages of HC
- sensitive to noise and outliers so you're going to have to clean up the data set from any noise and outliers beforehand
- O(n²)

Density-based Clustering, DBSCAN (Density-based Spatial Clustering of Applications with Noise)

Advantages of DBSCAN
- don't need to specify the number of clusters
- flexibility in the shapes and sizes of clusters it's able to find
- robust in that it's able to deal with noise and outliers in the data

Disadvantages of DBSCAN
- not guaranteed to return the same clustering
- it has difficulties finding clusters of varying densities

Gaussian Mixture Model (GMM)

Expectation-Maximization for Gaussian Mixtures:
1. Initialize k Gaussian distributions
2. Soft-cluster data - "expectation"
3. Re-estimate the Gaussians - "maximization"
4. Evaluate the log-likelihood to check for convergence
5. Repeat from step 2 until converged

Advantages of GMM
- Soft-clustering (sample membership of multiple clusters)
- Cluster shape flexibility

Disadvantages of GMM
- Sensitive to initialization values
- Possible to converge to a local optimum
- Slow convergence rate

Principle Component Analysis (PCA)
I. The amount of variance explained by each component. This is called an eigenvalue.
II. The principal components themselves, each component is a vector of weights. In this case, the principal components help us understand which pixels of the image are most helpful in identifying the difference between between digits. Principal components are also known as eigenvectors.

Dimensionality Reduction and Latent Features
- Principal Component Analysis is a technique that is used to reduce the dimensionality of your dataset. The reduced features are called principal components, which can be thought of as latent features. These principal components are simply a linear combination of the original features in your dataset.
- these components have two major properties:
  - They aim to capture the most amount of variability in the original dataset.
  - They are orthogonal to (independent of) one another.
Interpreting Results 
- The variance (eigenvalue) explained by each component.  Visualize this with scree plots to understand how many components you might keep based on how much information was being retained.
- The components (eigenvectors) give us an idea of which original features were most related to why a component was able to explain certain aspects about the original datasets.

Random Projection

Independent Component Analysis (ICA)

Scikit Learn uses FastICA

Three strategies for working with missing values include:
- We can remove (or “drop”) the rows or columns holding the missing values.
- We can impute the missing values.
- We can build models that work around them, and only use the information provided.

The CRISP-DM Process (Cross Industry Process for Data Mining)
1. Business Understanding
2. Data Understanding
3. Prepare Data
4. Data Modeling
5. Evaluate the Results
6. Deploy

GitHub README should have:
1. Installation instructions
2. Project Motivation
3. File Descriptions
4. How to Interact with your project
5. Licensing, Authors, Acknowledgements, etc.

Questions to Ask Yourself When Conducting a Code Review:
  Is the code clean and modular?
  - Can I understand the code easily?
  - Does it use meaningful names and whitespace?
  - Is there duplicated code?
  - Can you provide another layer of abstraction?
  - Is each function and module necessary?
  - Is each function or module too long?

  Is the code efficient?
  - Are there loops or other steps we can vectorize?
  - Can we use better data structures to optimize any steps?
  - Can we shorten the number of calculations needed for any steps?
  - Can we use generators or multiprocessing to optimize any steps?

  Is documentation effective?
  - Are in-line comments concise and meaningful?
  - Is there complex code that's missing documentation?
  - Do function use effective docstrings?
  - Is the necessary project documentation provided?

  Is the code well tested?
  - Does the code high test coverage?
  - Do tests check for interesting cases?
  - Are the tests readable?
  - Can the tests be made more efficient?

  Is the logging effective?
  - Are log messages clear, concise, and professional?
  - Do they include all relevant and useful information?
  - Do they use the appropriate logging level?

The 3 stages of an NLP pipeline are: Text Processing > Feature Extraction > Modeling.
- Text Processing: Take raw input text, clean it, normalize it, and convert it into a form that is suitable for feature extraction.
- Feature Extraction: Extract and produce feature representations that are appropriate for the type of NLP task you are trying
                      to accomplish and the type of model you are planning to use.
- Modeling: Design a statistical or machine learning model, fit its parameters to training data, use an optimization procedure,
            and then use it to make predictions about unseen data.

Text data from different sources is prepared with the following text processing steps:
1. Cleaning to remove irrelevant items, such as HTML tags
   - [Requests](http://docs.python-requests.org/en/master/user/quickstart/#make-a-request)
   - [Regular Expressions](https://docs.python.org/3/library/re.html)
   - [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

2. Normalizing by converting to all lowercase and removing punctuation
   - [Regular Expressions](https://docs.python.org/3/library/re.html)

3. Splitting text into words or tokens
   - [NLTK](http://www.nltk.org/api/nltk.tokenize.html)

4. Removing words that are too common, also known as stop words
   - [NLTK](http://www.nltk.org)

5. Identifying different parts of speech and named entities
   - Part of Speech (POS) and Named Entity Recognition (NER)
   - [NLTK](http://www.nltk.org)

6. Converting words into their dictionary forms, using lemmatization and then stemming
   - [NLTK](http://www.nltk.org)

Bag of Words
- collect all of the unique words in your corpus into a vocabulary
- create Document-Term Matrix, where each row is a sentence and each column is a word
- each entry in the matrix is a word frequency
- compare sentences in the matrix using cosine similarity

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>cos</mo><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mrow><mi>a</mi><mo>⋅</mo><mi>b</mi></mrow><mrow><mo stretchy="false" form="postfix">∥</mo><mi>a</mi><mo stretchy="false" form="postfix">∥</mo><mi>⋅</mi><mo stretchy="false" form="postfix">∥</mo><mi>b</mi><mo stretchy="false" form="postfix">∥</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">\cos(\theta) = \frac{a \cdot b}{\|a\| \cdot \|b\|}</annotation></semantics></math>

TF-IDF (term frequency * inverse document frequency)

Word Embeddings
- Word2Vec 
- GloVe
- t-SNE

If you have a lot of control over features, then you have an experiment.
If you have no control over the features, then you have an observational study.
If you have some control, then you have a quasi-experiment.

In a between-subjects experiment, each unit only participates in, or sees, one of the conditions being used in the experiment.
If an individual completes all conditions, rather than just one, this is known as a within-subjects design.

Randomization still has a part in the within-subjects design in the order in which individuals complete conditions.

In a simple random sample, each individual in the population has an equal chance of being selected.
In a stratified random sample, we need to first divide the entire population into disjoint groups, or strata.  Then, from each group, 
you take a simple random sample.

Evaluation metrics are the metrics by which we compare groups.
Invariant metrics are metrics that we hope will not be different between groups.

If we aren't able to control all features or there is a lack of equivalence between groups, then we may be susceptible to confounding variables.

Construct validity is tied to how well one's goals are aligned to the evaluation metrics used to evaluate it.
Internal validity refers to the degree to which a causal relationship can be derived from an experiment's results.
External validity is concerned with the ability of an experimental outcome to be generalized to a broader population.

Biases in experiments are systematic effects that interfere with the interpretation of experimental results, 
mostly in terms of internal validity.
- Sampling biases are those that cause our observations to not be representative of the population.
  - Studies that use surveys to collect data often have to deal with the self-selection bias.
  - Survivor bias is one where losses or dropout of observed units is not accounted for in an analysis.
- A novelty effect is one that causes observers to change their behavior simply because they're seeing something new.
- Order bias may occur when the order in which conditions are completed could have an effect on participant responses.
  - A primacy effect is one that affects early conditions, perhaps biasing them to be recalled better or
    to serve as anchor values for later conditions.
  - A recency effect is one that affects later conditions, perhaps causing bias due to being fresher in memory or task fatigue.
- Experimenter bias is where the presence or knowledge of the experimenter can affect participants' behaviors or performance.
  - The double-blind design hides condition information from both the administrator and participant
    in order to have a strong rein on experimenter-based biases.
```python
# Find p-value (two-sided test) - analytic approach
n_obs = data.shape[0]
n_control = data.groupby('condition').size()[0]
p = 0.5
sd = np.sqrt(p * (1-p) * n_obs)
z = ((n_control + 0.5) - p * n_obs) / sd
print(z)
print(2 * stats.norm.cdf(z))

# Find p-value (two-sided test) - simulation approach
n_obs = data.shape[0]
n_control = data.groupby('condition').size()[0]
p = 0.5
n_trials = 200_000
samples = np.random.binomial(n_obs, p, n_trials)
np.logical_or(samples <= n_control, samples >= (n_obs - n_control)).mean()

# Perform hypothesis test (one-sided test) - analytic approach
p_click = data.groupby('condition').mean()['click']
n_control = data.groupby('condition').size()[0]
n_exper = data.groupby('condition').size()[1]
p_null = data['click'].mean()
se_p = np.sqrt(p_null * (1-p_null) * (1/n_control + 1/n_exper))
z = (p_click[1] - p_click[0]) / se_p
print(z)
print(1-stats.norm.cdf(z))

# Perform hypothesis test (one-sided test) - simulation approach
n_control = data.groupby('condition').size()[0]
n_exper = data.groupby('condition').size()[1]
p_null = data['click'].mean()
n_trials = 200_000
ctrl_clicks = np.random.binomial(n_control, p_null, n_trials)
exp_clicks = np.random.binomial(n_exper, p_null, n_trials)
samples = exp_clicks / n_exper - ctrl_clicks / n_control
print((samples >= (p_click[1] - p_click[0])).mean())
```

SMART Experiment Design
- Specific: Make sure the goals of your experiment are specific.
- Measurable: Outcomes must be measurable using objective metrics
- Achievable: The steps taken for the experiment and the goals must be realistic.
- Relevant: The experiment needs to have purpose behind it.
- Timely: Results must be obtainable in a reasonable time frame.


---
# References

- [A Kaggle Master Explains Gradient Boosting](http://blog.kaggle.com/2017/01/23/a-kaggle-master-explains-gradient-boosting/)  
- [Density-Based Clustering Validation](http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=83C3BD5E078B1444CB26E243975507E1?doi=10.1.1.707.9034&rep=rep1&type=pdf)  
- [Speaker Verification Using Adapted Gaussian Mixture Models](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.117.338&rep=rep1&type=pdf)  
- [Independent component analysis: algorithms and applications](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.322.679&rep=rep1&type=pdf)  
- [Nonparametric discovery of human routines from sensor data](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.681.3152&rep=rep1&type=pdf)  
- [Random projection in dimensionality reduction: Applications to image and text data](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.76.8124&rep=rep1&type=pdf)  
- [Dynamic Principal Component Analysis  in Multivariate Time-Series Segmentation](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.853.2380&rep=rep1&type=pdf)  
- [SVMs - Stanford's CS229 Lecture notes](http://cs229.stanford.edu/notes/cs229-notes3.pdf)  
- [TDD for Data Science](http://engineering.pivotal.io/post/test-driven-development-for-data-science/)  
- [Using Hierarchical Clustering of Secreted Protein Families to Classify and Rank Candidate Effectors of Rust Fungi](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0029847)  
- [Independent Component Analysis of Electroencephalographic Data](http://papers.nips.cc/paper/1091-independent-component-analysis-of-electroencephalographic-data.pdf)  
- [Explaining AdaBoost](http://rob.schapire.net/papers/explaining-adaboost.pdf)  
- [Adaptive background mixture models for real-time tracking](http://www.ai.mit.edu/projects/vsam/Publications/stauffer_cvpr98_track.pdf)  
- [A tutorial on Principal Components Analysis](http://www.cs.otago.ac.nz/cosc453/student_tutorials/principal_components.pdf)  
- [Application of the Gaussian mixture model in pulsar astronomy](https://arxiv.org/abs/1205.6221)  
- [Robust PCA for Anomaly Detection in Cyber Networks](https://arxiv.org/pdf/1801.01571.pdf)  
- [Technical Notes On Using Data Science & Artificial Intelligence](https://chrisalbon.com/)  
- [A Short Introduction to Boosting](https://cseweb.ucsd.edu/~yfreund/papers/IntroToBoosting.pdf)  
- [DB-Engines Ranking](https://db-engines.com/en/ranking)  
- [Bias and Variance](https://en.wikipedia.org/wiki/Bias–variance_tradeoff)  
- [Support Vector Machines](https://en.wikipedia.org/wiki/Support_vector_machine)  
- [Code Review](https://github.com/lyst/MakingLyst/tree/master/code-reviews)  
- [The AI Hierarchy of Needs](https://hackernoon.com/the-ai-hierarchy-of-needs-18f111fcc007)  
- [Anomaly detection in temperature data using dbscan algorithm](https://ieeexplore.ieee.org/abstract/document/5946052/)  
- [TDD is Essential for Good Data Science Here's Why](https://medium.com/%40karijdempsey/test-driven-development-is-essential-for-good-data-science-heres-why-db7975a03a44)  
- [Yes, you should understand backprop](https://medium.com/@@karpathy/yes-you-should-understand-backprop-e2f06eab496b)  
- [K-Means Clustering in Python](https://mubaris.com/posts/kmeans-clustering/)  
- [Traffic Classification Using Clustering Algorithms](https://pages.cpsc.ucalgary.ca/~mahanti/papers/clustering.pdf)  
- [Random Projections for k-means Clustering](https://papers.nips.cc/paper/3901-random-projections-for-k-means-clustering.pdf)  
- [Applying Independent Component Analysis to Factor Model in Finance](https://pdfs.semanticscholar.org/a34b/e08a20eba7523600203a32abb026a8dd85a3.pdf)  
- [Experiments with a New Boosting Algorithm](https://people.cs.pitt.edu/~milos/courses/cs2750/Readings/boosting.pdf)  
- [Faces recognition example using eigenfaces and SVMs](https://scikit-learn.org/stable/auto_examples/applications/plot_face_recognition.html#sphx-glr-auto-examples-applications-plot-face-recognition-py)  
- [https://sebastianraschka.com/Articles/2015_pca_in_3_steps.html](https://sebastianraschka.com/Articles/2015_pca_in_3_steps.html)  
- [Code Review Best Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html)  
- [Data Science TDD](https://www.linkedin.com/pulse/data-science-test-driven-development-sam-savage/)  
- [Visualizing DBSCAN Clustering](https://www.naftaliharris.com/blog/visualizing-dbscan-clustering/)  
- [Visualizing K-Means Clustering](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/)  
- [PRINCIPAL COMPONENTS ANALYSIS TO SUMMARIZE MICROARRAY EXPERIMENTS: APPLICATION TO SPORULATION TIME SERIES](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2669932/)  
- [Association between composition of the human gastrointestinal microbiome and development of fatty liver with choline deficiency.](https://www.ncbi.nlm.nih.gov/pubmed/21129376)  
- [Four Ways Data Science Goes Wrong and How Test Driven Data Analysis Can Help](https://www.predictiveanalyticsworld.com/patimes/four-ways-data-science-goes-wrong-and-how-test-driven-data-analysis-can-help/6947/)  
- [Four Ways Data Science Goes Wrong and How Test-Driven Data Analysis Can Help](https://www.predictiveanalyticsworld.com/patimes/four-ways-data-science-goes-wrong-and-how-test-driven-data-analysis-can-help/6947/)  
- [What is an intuitive explanation of Gradient Boosting?](https://www.quora.com/What-is-an-intuitive-explanation-of-Gradient-Boosting)  
- [A lecture from Stanford's CS231n course](https://www.youtube.com/watch?v=59Hbtz7XgjM)  
- [Eigenvectors and eigenvalues (YouTube)](https://www.youtube.com/watch?v=PFDu9oVAE-g)  
- [how @app.route works](https://ains.co/blog/things-which-arent-magic-flask-part-1.html)  
- [general decorators tutorial](https://realpython.com/primer-on-python-decorators/)

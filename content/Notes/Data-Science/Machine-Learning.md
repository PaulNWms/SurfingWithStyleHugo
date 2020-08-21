---
title: "Machine Learning"
date: 2020-06-17
---

Links:  
[Sample code](https://github.com/ageron/handson-ml)

Data sets:  
[UC Irvine Machine Learning Repository](http://archive.ics.uci.edu/ml/index.php)  
[Kaggle](https://www.kaggle.com/datasets)  
[Open Data on AWS](https://registry.opendata.aws/)  
[http://dataportals.org/](http://dataportals.org/)  
[OPENDATAMONITOR](https://opendatamonitor.eu/)  
[Quandl](https://www.quandl.com/)  
[Wikipedia's list of datasets](https://en.wikipedia.org/wiki/List_of_datasets_for_machine_learning_research)  
[Quora](https://www.quora.com/Where-can-I-find-large-datasets-open-to-the-public)  
[Datasets' Discord server](https://www.reddit.com/r/datasets/)  

In supervised learning, the training data is labelled.

Typical supervised learning tasks include classification and predicting a target numeric value.

Some of the most important supervised learning algorithms include
- k-nearest neighbors
- linear regression
- logistical regression
- support vector machines
- decision trees and random forests
- neural networks

In unsupervised learning, the training data is unlabelled.

Typical unsupervised learning tasks include
- clustering,
- visualization,
- dimensionality reduction / feature extraction,
- anomaly detection and
- association rule learning.

Some of the most important unsupervised learning algorithms include
- clustering
-- k-means
-- hierarchical cluster analysis (HCA)
-- expectation maximization
- visualization and dimensionality reduction
-- principle component analysis (PCA)
-- kernel PCA
-- locally-linear embedding (LLE)
-- t-distributed stochastic neighbor embedding (t-SNE)
- association rule learning
-- Apriori
-- Eclat

In semisupervised learning, some of the training data is labelled.

In reinforcement learning, an agent observes the environment and receives rewards for actions performed.

In batch learning, the system is trained using all available data.

In online learning, the system is trained incrementally by feeding it data in mini-batches.

In instance-based learning, the system learns examples by heart, then generalizes to new cases using a similarity measure.

In model-based learning, a model is built from a set of examples, then the model is used to make predictions.

Small data sets often suffer from sampling noise, and large data sets can still suffer from sampling bias.

Feature engineering involves feature selection, feature extraction and feature creation.

To fix overfitting you can
- simplify the model
- gather more training data
- fix data errors and remove outliers

Regularization constrains a model to make it simpler and reduce the risk of overfitting.

Underfitting occurs when your model is too simple to learn the underlying structure of the data.

To fix underfitting you can
- select a more powerful model
- perform feature engineering
- reduce regularization

To see how well a model will generalize to new cases, the data is split into a training set and a test set.

It is common to use 80% of the data for training and hold out 20% for testing.

In cross-validation, a validation set is randomly held out from the training set during training.

The No Free Lunch Theorem states that there is no model that is guaranteed to work best on a given dataset.  The only way to know for sure is to evaluate them all.

Project flow:

1. Look at the big picture.
  - Frame the problem
  -- How will the model benefit the company?
  -- What current solutions exist, if any?
  -- Supervised, unsupervised, or reinforcement learning?
  -- Classification, regression, or something else?
  -- Batch learning or online learning?
  - Select a performance measure (RMSE ‖∙‖<sub>2</sub>, MAE ‖∙‖<sub>1</sub>, or ?)
  - Check any assumptions
2. Get the data.
  - Familiarize yourself with it (pandas)
  - Plot histograms (matplotlib)
  - Create a test set
3. Discover and visualize the data to gain insights.
  - Scatter plots (pandas)
  - Correlations plots 
4. Prepare the data.
  - Clean data
  -- Delete rows with nulls (dropna)
  -- Delete attributes with nulls (drop)
  -- Replace nulls with default value (fillna or imputer)
  - Convert text to integers (factorize() to integer or one-hot encode)
  - Feature scaling (min-max scaling or standardization)
5. Select a model and train it.
  - Cross-validation (cross_val_score)
6. Fine-tune your model.
  - GridSearchCV
  - RandomizedSearchCV
7. Present your solution.
8. Launch, monitor and maintain your system.

A binary classifier distinguishes between 2 classes.

`cross_val_score()` splits the dataset into K-folds, then evaluates predictions made on each using a model trained on the remaining folds.

`cross_val_predict()` gets the actual predictions of the K-folds.

`confusion_matrix()` creates a matrix of true and false predictions, with true values on the diagonal.

precision = TP / (TP + FP)

recall (a.k.a sensitivity, true positive rate) = TP / (TP + FN)

F₁ = TP / (TP + (FN + FP)/2)

`precision_recall_curve()` computes precision and recall for all possible threasholds.

Another way to select a good precision/recall tradeoff is to plot precision vs. recall.

ROC = receiver operating characteristic

TPR = true positive rate (= recall)

TNR = true negative rate (= specificity)

FPR, FNR = false positive rate, false negative rate

An ROC curve plots sensitivity (recall) vs. 1 - specificity.

`roc_curve()` computes the ROC curve.

A good ROC AUC (area under curve) has a value close to 1, whereas a random classifier has a value of 0.5

`roc_auc_score()` computes the ROC AUC.

OvO = one vs. one

OvA = one vs. all, one vs. rest

Multilabel classification outputs multiple binary labels.

Multioutput classification output multiple multiclass labels.

Linear regression model prediction

$$\hat{y}=\theta_0+\theta_1x_1+\theta_2x_2+\cdots +\theta_nx_n$$

Vectorized form

$$\hat{y}=h_\theta(\textbf{x})=\theta^T\cdot \textbf{x}$$

Cost function of the linear regression model

$$MSE(\textbf{X},h_\theta)=\frac{1}{m}\sum_{i=1}^{m}\left(\theta^T\cdot \textbf{x}^{(i)}-y^{(i)}\right)^2$$

Normal equation

$$\hat{\theta}=\left(\textbf{X}^T\cdot\textbf{X}\right)^{-1}\cdot\textbf{X}^T\cdot\textbf{y}$$

Partial derivatives of the cost function

$$\frac{\delta}{\delta\theta_j}=\frac{2}{m}\sum_{i=1}^{m}\left(\theta^T\cdot\textbf{x}^{(i)}-y^{(i)}\right)x_j^{(i)}$$

Gradient vector of the cost function

$$\nabla_\theta MSE(\theta)=\begin{pmatrix}
\frac{\delta}{\delta\theta_0}MSE(\theta) \\
\frac{\delta}{\delta\theta_1}MSE(\theta) \\
\vdots  \\
\frac{\delta}{\delta\theta_n}MSE(\theta)
\end{pmatrix}
=\frac{2}{m}\textbf{X}^T\cdot(\textbf{X}\cdot\theta-\textbf{y})$$

Gradient descent step

$$\theta^{(\text{next step})}=\theta-\eta\nabla_\theta MSE(\theta)$$


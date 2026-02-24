---
title: Machine Learning
date: 2023-10-26T23:36:00Z
description: 
keywords: 
draft: false
tags:
  - DataScience
  - ML
  - AI
---
Machine Learning is the art of programming computers so they can learn from data.

In practice, ML is mostly done in [Python](/notes/computer/computer-languages/python) and tasks usually involve
 - [Scikit-Learn](/notes/computer/data/machine-learning/scikit-learn) which has a large collection of canned algorithms (start here), 
 - [TensorFlow](/notes/computer/data/machine-learning/tensorflow) for deep learning

![image](/img/GRRso1KXwAAnFS5.jpg)

Scikit-Learn ML Map
![image](/img/ml_map.svg)
Periodic Table of ML

![image](/img/Pasted%20image%2020250427175153.png)

ML algorithms can be grouped into these categories:

- [Supervised Learning](/notes/computer/data/machine-learning/supervised-learning)
- [Unsupervised Learning](/notes/computer/data/machine-learning/unsupervised-learning)
- [Semisupervised Learning](/notes/computer/data/machine-learning/semisupervised-learning)
- [Reinforcement Learning](/notes/computer/data/machine-learning/reinforcement-learning)

The data may arrive 2 different ways.

- In [Batch Learning](/notes/), the system is trained using all available data.
- In [Online Learning](/notes/), the system is trained incrementally by feeding it data in mini-batches.

The algorithm may generalize in 2 different ways.

- In [Instance-Based Learning](/notes/), the system learns examples by rote, then generalizes to new cases using a similarity measure.
- In [Model-Based Learning](/notes/), a model is built from a set of examples, then the model is used to make predictions.

Model training can go wrong in several ways.  [ML Challenges](/notes/computer/data/machine-learning/ml-challenges)

Feature engineering involves feature selection, feature extraction and feature creation.

To train the model, data is divided into [ML Data Sets](/notes/computer/data/machine-learning/ml-data-sets).

As a general rule, the project will follow a pretty standard [ML Workflow](/notes/computer/data/machine-learning/ml-workflow).



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

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo>=</mo><msub><mi>θ</mi><mn>0</mn></msub><mo>+</mo><msub><mi>θ</mi><mn>1</mn></msub><msub><mi>x</mi><mn>1</mn></msub><mo>+</mo><msub><mi>θ</mi><mn>2</mn></msub><msub><mi>x</mi><mn>2</mn></msub><mo>+</mo><mi>⋯</mi><mo>+</mo><msub><mi>θ</mi><mi>n</mi></msub><msub><mi>x</mi><mi>n</mi></msub></mrow><annotation encoding="application/x-tex">\hat{y}=\theta_0+\theta_1x_1+\theta_2x_2+\cdots +\theta_nx_n</annotation></semantics></math>

Vectorized form

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo>=</mo><msub><mi>h</mi><mi>θ</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><msup><mi>θ</mi><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐱</mtext></mrow><annotation encoding="application/x-tex">\hat{y}=h_\theta(\textbf{x})=\theta^T\cdot \textbf{x}</annotation></semantics></math>

Cost function of the linear regression model

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mi>S</mi><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐗</mtext><mo>,</mo><msub><mi>h</mi><mi>θ</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><msup><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mi>T</mi></msup><mo>⋅</mo><msup><mtext mathvariant="bold">𝐱</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>−</mo><msup><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">MSE(\textbf{X},h_\theta)=\frac{1}{m}\sum_{i=1}^{m}\left(\theta^T\cdot \textbf{x}^{(i)}-y^{(i)}\right)^2</annotation></semantics></math>

Normal equation

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>θ</mi><mo accent="true">̂</mo></mover><mo>=</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><msup><mtext mathvariant="bold">𝐗</mtext><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐗</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mi>−</mi><mn>1</mn></mrow></msup><mo>⋅</mo><msup><mtext mathvariant="bold">𝐗</mtext><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐲</mtext></mrow><annotation encoding="application/x-tex">\hat{\theta}=\left(\textbf{X}^T\cdot\textbf{X}\right)^{-1}\cdot\textbf{X}^T\cdot\textbf{y}</annotation></semantics></math>

```py
X_b = np.c_[np.ones((100, 1)), X]
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
```

MSE for a linear regression model is a convex function, meaning that a line segment connecting any 2 points on the curve never crosses the curve.  This implies there are no local minima, just one global minimum.

Preprocess the data with Scikit-Learn's `StandardScalar`

### Batch Gradient Descent
Partial derivatives of the cost function

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mi>δ</mi><mrow><mi>δ</mi><msub><mi>θ</mi><mi>j</mi></msub></mrow></mfrac><mo>=</mo><mfrac><mn>2</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mi>T</mi></msup><mo>⋅</mo><msup><mtext mathvariant="bold">𝐱</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>−</mo><msup><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><msubsup><mi>x</mi><mi>j</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup></mrow><annotation encoding="application/x-tex">\frac{\delta}{\delta\theta_j}=\frac{2}{m}\sum_{i=1}^{m}\left(\theta^T\cdot\textbf{x}^{(i)}-y^{(i)}\right)x_j^{(i)}</annotation></semantics></math>

Gradient vector of the cost function

$$\nabla_\theta MSE(\theta)=\begin{pmatrix}
\frac{\delta}{\delta\theta_0}MSE(\theta) \\
\frac{\delta}{\delta\theta_1}MSE(\theta) \\
\vdots  \\
\frac{\delta}{\delta\theta_n}MSE(\theta)
\end{pmatrix}
=\frac{2}{m}\textbf{X}^T\cdot(\textbf{X}\cdot\theta-\textbf{y})$$

Gradient descent step

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>θ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="normal">next step</mtext><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>=</mo><mi>θ</mi><mo>−</mo><mi>η</mi><msub><mi>∇</mi><mi>θ</mi></msub><mi>M</mi><mi>S</mi><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\theta^{(\text{next step})}=\theta-\eta\nabla_\theta MSE(\theta)</annotation></semantics></math>

### Stochastic Gradient Descent
```py
sgd_reg = SGDRegressor(n_iter=50, penalty=None, eta0=0.1)
sgd_reg.fit(X, y.ravel())
```
### Regularized Linear Models
- Ridge regression adds a regularization term to the cost function, forcing the learning algorithm to keep the weights as small as possible.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>M</mi><mi>S</mi><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mi>α</mi><mfrac><mn>1</mn><mn>2</mn></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msubsup><mi>θ</mi><mi>i</mi><mn>2</mn></msubsup></mrow><annotation encoding="application/x-tex">J(\theta)=MSE(\theta)+\alpha\frac{1}{2}\sum_{i=1}^{n}\theta_i^2</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>θ</mi><mo accent="true">̂</mo></mover><mo>=</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><msup><mtext mathvariant="bold">𝐗</mtext><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐗</mtext><mo>+</mo><mi>α</mi><mtext mathvariant="bold">𝐀</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mi>−</mi><mn>1</mn></mrow></msup><mo>⋅</mo><msup><mtext mathvariant="bold">𝐗</mtext><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐲</mtext></mrow><annotation encoding="application/x-tex">\hat{\theta}=\left(\textbf{X}^T\cdot\textbf{X}+\alpha\textbf{A}\right)^{-1}\cdot\textbf{X}^T\cdot \textbf{y}</annotation></semantics></math>
```py
ridge_reg = Ridge(alpha=1, solver="cholesky")
ridge_reg.fit(X, y)
ridge_reg.predict([1.5](/notes/))
```

- Lasso regression tends to completely eliminate the weights of the least important features.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>M</mi><mi>S</mi><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mi>α</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><mrow><mo stretchy="true" form="prefix">|</mo><msub><mi>θ</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">|</mo></mrow></mrow><annotation encoding="application/x-tex">J(\theta)=MSE(\theta)+\alpha\sum_{i=1}^{n}\left|\theta_i\right|</annotation></semantics></math>
```py
lasso_reg = Lasso(alpha=0.1)
lasso_reg.fit(X, y)
lasso_reg.predict([1.5](/notes/))
```

- Elastic Net is a combination of the two.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>M</mi><mi>S</mi><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mi>r</mi><mi>α</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><mrow><mo stretchy="true" form="prefix">|</mo><msub><mi>θ</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">|</mo></mrow><mo>+</mo><mfrac><mrow><mn>1</mn><mo>−</mo><mi>r</mi></mrow><mn>2</mn></mfrac><mi>α</mi><mfrac><mn>1</mn><mn>2</mn></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msubsup><mi>θ</mi><mi>i</mi><mn>2</mn></msubsup></mrow><annotation encoding="application/x-tex">J(\theta)=MSE(\theta)+r\alpha\sum_{i=1}^{n}\left|\theta_i\right|+\frac{1-r}{2}\alpha\frac{1}{2}\sum_{i=1}^{n}\theta_i^2</annotation></semantics></math>
```py
from sklearn.linear_model import ElasticNet
elastic_net = ElasticNet(alpha=0.1, l1_ratio=0.5)
elastic_net.fit(X, y)
elastic_net.predict([1.5](/notes/))
```
- Early stopping

### Logistic regression
estimates the probability that an instance belongs to a particular class.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>p</mi><mo accent="true">̂</mo></mover><mo>=</mo><msub><mi>h</mi><mi>θ</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\hat{p}=h_\theta(\textbf{x})=\sigma\left(\theta^T\cdot\textbf{x}\right)</annotation></semantics></math>

The logistic regression loss function is convex

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>−</mi><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">[</mo><msup><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mtext mathvariant="normal">log</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msup><mover><mi>p</mi><mo accent="true">̂</mo></mover><mrow><mo stretchy="true" form="prefix">(</mo><mi>I</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msup><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mtext mathvariant="normal">log</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msup><mover><mi>p</mi><mo accent="true">̂</mo></mover><mrow><mo stretchy="true" form="prefix">(</mo><mi>I</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">]</mo></mrow></mrow><annotation encoding="application/x-tex">J(\theta)=-\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\text{log}\left(\hat{p}^{(I)}\right)+\left(1-y^{(i)}\right)\text{log}\left(1-\hat{p}^{(I)}\right)\right]</annotation></semantics></math>

and its derivative is

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mi>δ</mi><mrow><mi>δ</mi><msub><mi>θ</mi><mi>j</mi></msub></mrow></mfrac><mo>=</mo><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">(</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mi>T</mi></msup><mo>⋅</mo><msup><mtext mathvariant="bold">𝐱</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>−</mo><msup><mi>y</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>I</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><msubsup><mi>x</mi><mi>j</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>I</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup></mrow><annotation encoding="application/x-tex">\frac{\delta}{\delta\theta_j}=\frac{1}{m}\sum_{i=1}^{m}\left(\sigma\left( \theta^T\cdot \textbf{x}^{(i)}-y^{(I)} \right) \right)x_j^{(I)}</annotation></semantics></math>

To train a logistic regression model
```py
from sklearn.linear_model import LogisticRegression
log_reg = LogisticRegression
log_reg.fit(X, y)
```

### Softmax Regression / Multinomial Logistic Regression

Softmax score for class _k_

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>s</mi><mi>k</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐱</mtext></mrow><annotation encoding="application/x-tex">s_k(\textbf{x})=\left(\theta^{(k)}\right)^T\cdot\textbf{x}</annotation></semantics></math>

Softmax function

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mover><mi>p</mi><mo accent="true">̂</mo></mover><mi>k</mi></msub><mo>=</mo><mi>σ</mi><msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐬</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mi>k</mi></msub><mo>=</mo><mfrac><mrow><mi>e</mi><mi>x</mi><mi>p</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>s</mi><mi>k</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow><mrow><munderover><mo>∑</mo><mrow><mi>j</mi><mo>=</mo><mn>1</mn></mrow><mi>K</mi></munderover><mi>e</mi><mi>x</mi><mi>p</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>s</mi><mi>j</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow></mfrac></mrow><annotation encoding="application/x-tex">\hat{p}_k=\sigma(\textbf{s}(\textbf{x}))_k=\frac{exp(s_k(\textbf{x}))}{\sum_{j=1}^{K}exp(s_j(\textbf{x}))}</annotation></semantics></math>

Softmax prediction

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo>=</mo><munder><mrow><mtext mathvariant="normal">argmax </mtext><mspace width="0.333em"></mspace></mrow><mi>k</mi></munder><mi>σ</mi><msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐬</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mi>k</mi></msub><mo>=</mo><munder><mrow><mtext mathvariant="normal">argmax </mtext><mspace width="0.333em"></mspace></mrow><mi>k</mi></munder><msub><mi>s</mi><mi>k</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><munder><mrow><mtext mathvariant="normal">argmax </mtext><mspace width="0.333em"></mspace></mrow><mi>k</mi></munder><mrow><mo stretchy="true" form="prefix">(</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><msup><mi>θ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo stretchy="true" form="postfix">)</mo></mrow><mi>T</mi></msup><mo>⋅</mo><mtext mathvariant="bold">𝐱</mtext><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\hat{y}=\underset{k}{\text{argmax }}\sigma(\textbf{s}(\textbf{x}))_k=\underset{k}{\text{argmax }}s_k(\textbf{x})=\underset{k}{\text{argmax }}\left(\left(\theta^{(k)}\right)^T\cdot\textbf{x}\right)</annotation></semantics></math>

Cross entropy cost function

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>Θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>−</mi><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mi>K</mi></munderover><msubsup><mi>y</mi><mi>k</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mtext mathvariant="normal">log</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msubsup><mover><mi>p</mi><mo accent="true">̂</mo></mover><mi>k</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">J(\Theta)=-\frac{1}{m}\sum_{i=1}^{m}\sum_{k=1}^{K}y_k^{(i)}\text{log}\left(\hat{p}_k^{(i)}\right)</annotation></semantics></math>

Cross entropy gradient vector

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>∇</mi><msup><mi>θ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup></msub><mi>J</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>Θ</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">(</mo><msubsup><mover><mi>p</mi><mo accent="true">̂</mo></mover><mi>k</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mo>−</mo><msubsup><mi>y</mi><mi>k</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mo stretchy="true" form="postfix">)</mo></mrow><msup><mtext mathvariant="bold">𝐱</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup></mrow><annotation encoding="application/x-tex">\nabla_{\theta^{(k)}}J(\Theta)=\frac{1}{m}\sum_{i=1}^{m}\left(\hat{p}_k^{(i)}-y_k^{(i)}\right)\textbf{x}^{(i)}</annotation></semantics></math>

```py
softmax_reg = LogisticRegression(multi_class="multinomial", solver="lbfgs", C=10)
softmax_reg.fit(X, y)
softmax_reg.predict([5, 2](/notes/))
softmax_reg.predict_proba([5, 2](/notes/))
```

### Support Vector Machines

Support vectors are data instances on the "fog lines" of the decision boundary "street".

_Soft margin classification_ allows some margin violations, controlled by the `C` parameter.

```py
iris = datasets.load_iris()
X = iris["data"][:, (2, 3)]  # petal length, petal width
y = (iris["target"] == 2).astype(np.float64)  # Iris-Virginica

svm_clf = Pipeline([
        ("scaler", StandardScaler()),
        ("linear_svc", LinearSVC(C=1, loss="hinge", random_state=42)),
    ])

svm_clf.fit(X, y)
```

### Nonlinear SVM Classification

```py
polynomial_svm_clf = Pipeline([
        ("poly_features", PolynomialFeatures(degree=3)),
        ("scaler", StandardScaler()),
        ("svm_clf", LinearSVC(C=10, loss="hinge", random_state=42))
    ])

polynomial_svm_clf.fit(X, y)
```

The SVC class implements the _kernel trick,_ whatever that is, which runs higher degree polynomial efficiently.

```py
poly_kernel_svm_clf = Pipeline([
        ("scaler", StandardScaler()),
        ("svm_clf", SVC(kernel="poly", degree=3, coef0=1, C=5))
    ])
poly_kernel_svm_clf.fit(X, y)
```

Gaussian radial bias function (RBF)

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>ϕ</mi><mi>γ</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><mtext mathvariant="bold">𝐱</mtext><mo>,</mo><mi>l</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mtext mathvariant="normal">exp</mtext><mrow><mo stretchy="true" form="prefix">(</mo><mi>−</mi><mi>γ</mi><msup><mrow><mo stretchy="true" form="prefix">∥</mo><mtext mathvariant="bold">𝐱</mtext><mo>−</mo><mi>l</mi><mo stretchy="true" form="postfix">∥</mo></mrow><mn>2</mn></msup><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\phi_\gamma(\textbf{x},l)=\text{exp}\left(-\gamma\left\|\textbf{x}-l\right\|^2\right)</annotation></semantics></math>

Increasing `gamma` makes the bell-shape curve narrower.

```py
rbf_kernel_svm_clf = Pipeline([
        ("scaler", StandardScaler()),
        ("svm_clf", SVC(kernel="rbf", gamma=5, C=0.001))
    ])
rbf_kernel_svm_clf.fit(X, y)
```

### SVM Regression

SVMs also support linear and nonlinear regression.

```py
svm_reg = LinearSVR(epsilon=1.5, random_state=42)
svm_reg.fit(X, y)
```
```py
svm_poly_reg = SVR(kernel="poly", degree=2, C=100, epsilon=0.1, gamma="auto")
svm_poly_reg.fit(X, y)
```

### Decision Trees

```py
iris = load_iris()
X = iris.data[:, 2:] # petal length and width
y = iris.target
tree_clf = DecisionTreeClassifier(max_depth=2, random_state=42)
tree_clf.fit(X, y)
```

A decision tree is a white box model that can be visualized.

```py
from sklearn.tree import export_graphviz
export_graphviz(
        tree_clf,
        out_file=image_path("iris_tree.dot"),
        feature_names=iris.feature_names[2:],
        class_names=iris.target_names,
        rounded=True,
        filled=True
    )
```

Decision tree prediction

```py
tree_clf.predict_proba([5, 1.5](/notes/))
tree_clf.predict([5, 1.5](/notes/))
```

Regularization hyperparameters
- `max_depth`
- `min_samples_split`
- `min_samples_leaf`
- `min_weight_fraction_leaf`
- `max_leaf_nodes`
- `max_features`

### Regression Trees

```py
tree_reg = DecisionTreeRegressor(max_depth=2, random_state=42)
tree_reg.fit(X, y)
```

Weaknesses of decision trees
- Sensitive to orientation of training data.  PCA can help.
- Sensitive to small variations of training data.

### Ensemble Methods

An ensemble can be a _strong learner_ even if each classifier is a _weak learner_, if there are enough of them and they are diverse enough.

A _hard voting_ classifier predicts the class that gets the most votes.

A _soft voting_ classifier makes predictions based on the averages of class probabilities.

```py
# set voting='soft' for soft voting
log_clf = LogisticRegression(solver="liblinear", random_state=42)
rnd_clf = RandomForestClassifier(n_estimators=10, random_state=42)
svm_clf = SVC(gamma="auto", random_state=42)
voting_clf = VotingClassifier(
    estimators=[('lr', log_clf), ('rf', rnd_clf), ('svc', svm_clf)],
    voting='hard')
```

_Bagging_ (bootstrap aggregating) is training classifiers on different subsets of data _with_ replacement.

_Pasting_ is the same thing _without_ replacement.

```py
# set bootstrap=False for pasting
# set oob_score=True for out-of-bag evaluation
# set max_features and bootstrap_features to sample random subspaces
bag_clf = BaggingClassifier(
    DecisionTreeClassifier(random_state=42), n_estimators=500,
    max_samples=100, bootstrap=True, n_jobs=-1, random_state=42)
bag_clf.fit(X_train, y_train)
y_pred = bag_clf.predict(X_test)
```

_Random patches_ sample both training instances and features.

A _random forest_ is an ensemble of decision trees.

```py
iris = load_iris()
rnd_clf = RandomForestClassifier(n_estimators=500, n_jobs=-1, random_state=42)
rnd_clf.fit(iris["data"], iris["target"])
```

The `ExtraTreesClassifier` (extra = extremely randomized) uses random thresholds for each feature and has higher bias & lower variance than the `RandomForestClassifier`.

The `RandomForestClassifier` has a `feature_importances_` variable which is handy for selecting features.

### Boosting

_Boosting_ (hypothesis boosting) combines weak learners into a strong learner by training learners sequentially.

_AdaBoost_ (adaptive boosting) trains each learner on instances that its predecessor underfitted.

```py
ada_clf = AdaBoostClassifier(
    DecisionTreeClassifier(max_depth=1), n_estimators=200,
    algorithm="SAMME.R", learning_rate=0.5, random_state=42)
ada_clf.fit(X_train, y_train)
```

_Gradient boosting_ tries to fit the new predictor to the residual errors made by the previous predictor.

```py
gbrt = GradientBoostingRegressor(max_depth=2, n_estimators=3, learning_rate=1.0, random_state=42)
gbrt.fit(X, y)
```

### Stacking (stacked generalization)

_Stacking_ trains a model to make a final prediction, instead of hard or soft voting.

The final predictor is called a _blender_.

The blender is typically trained on a hold-out data set.

### Dimensionality Reduction

_Principle Component Analysis_ (PCA) identifies the hyperplane that lies closest to the data, then projects the data onto it.

```py
pca = PCA(n_components = 2)
X2D = pca.fit_transform(X)
```

The principle components can then be accessed with the  `components_` variable.  Also interesting is the `explained_variance_ratio_` variable.

To find the minimum components to preserve a given variance, use

```py
pca = PCA(n_components=0.95)
X_reduced = pca.fit_transform(X_train)
```

Reconstruct the original set with

```py
X_recovered = pca.inverse_transform(X_reduced)
```

PCA loads the entire dataset into memory.  For large datasets, use Incremental PCA.

```py
n_batches = 100
inc_pca = IncrementalPCA(n_components=154)
for X_batch in np.array_split(X_train, n_batches):
    inc_pca.partial_fit(X_batch)
X_reduced = inc_pca.transform(X_train)
```
When _d_ is much smaller than _n_, randomized PCA can give much faster results.

```py
rnd_pca = PCA(n_components=154, svd_solver="randomized", random_state=42)
X_reduced = rnd_pca.fit_transform(X_train)
```

### Kernel PCA

```py
rbf_pca = KernelPCA(n_components = 2, kernel="rbf", gamma=0.04)
X_reduced = rbf_pca.fit_transform(X)
```

### Other

- _Locally Linear Embedding_ (LLE) is a manifold learning technique that looks at how each instance relates to its neighbors, then tries to preserve the relationship in lower dimensions.
- _Multidimensional Scaling_ (MDS) attempts to preserve the distances between instances
- _Isomap_ creates a graph between instances, then reduces dimensionality while trying to preserve geodesic distances between instances
- _t-Distributed Stochastic Neighbor Embedding_ (t-SNE) reduces dimensionality while keeping similar instances together and dissimilar instances apart.  Used mostly for visualization.
- _Linear discriminant analysis_ (LDA) is a classifier that learns the most discriminative axes between the classes. 

---
# References

- [Sample code](https://github.com/ageron/handson-ml)
- [UC Irvine Machine Learning Repository](http://archive.ics.uci.edu/ml/index.php)  
- [Kaggle](https://www.kaggle.com/datasets)  
- [Open Data on AWS](https://registry.opendata.aws/)  
- [http://dataportals.org/](http://dataportals.org/)  
- [OPENDATAMONITOR](https://opendatamonitor.eu/)  
- [Quandl](https://www.quandl.com/)  
- [Wikipedia's list of datasets](https://en.wikipedia.org/wiki/List_of_datasets_for_machine_learning_research)  
- [Quora](https://www.quora.com/Where-can-I-find-large-datasets-open-to-the-public)  
- [Datasets' Discord server](https://www.reddit.com/r/datasets/)  
- [Shadow Government Statistics](https://www.shadowstats.com/)


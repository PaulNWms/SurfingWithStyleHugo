---
title: ScikitLearn
date: 2023-10-26T22:52
description: 
keywords: 
draft: false
tags:
  - Python
---
[Classification](/notes/)
[Training Models](/notes/)
[Support Vector Machines](/notes/)
[Decision Trees](/notes/)
[Ensemble Learning](/notes/)
[Dimensionality Reduction](/notes/)

![image](/img/Pasted%20image%2020240807131857.png)

```python
# linear regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model = model.fit(X, y)
prediction = model.predict(...)

# polynomial regression
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
poly_feat = PolynomialFeatures(degree=4)
X_poly = poly_feat.fit_transform(X)
poly_model = LinearRegression()
poly_model.fit(X_poly,y)

# regularization
from sklearn.linear_model import Lasso, LinearRegression
lasso_reg = Lasso()
lasso_reg.fit(X, y)
model = LinearRegression()
model.fit(X, y)

# feature scaling + regularization
from sklearn.linear_model import Lasso, LinearRegression
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
lasso_reg = Lasso()
lasso_reg.fit(X_scaled, y)
model = LinearRegression()
model.fit(X, y)

# split the data into training and testing sets
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(features, outcomes, test_size=0.2, random_state=42)

# The accuracy score measures the measures accuracy between to vectors
from sklearn.metrics import accuracy_score
acc = accuracy_score(y, y_pred)

# decision tree classifier
from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(max_depth = 10, min_samples_leaf = 1)

# support vector machine
from sklearn.svm import SVC
model = SVC(kernel='poly', degree=4, C=0.1)

# Adaboost - requires a weak learner
# base_estimator: The model utilized for the weak learners (Warning: Don't forget to import the model that you decide to use for the weak learner).
# n_estimators: The maximum number of weak learners used.
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
model = AdaBoostClassifier(base_estimator = DecisionTreeClassifier(max_depth=2), n_estimators = 4)

# K-fold cross validation
from sklearn.model import KFold
kf = KFold(12, 3, shuffle=True)

# Grid search various kernels
# 1. Import GridSearchCV
from sklearn.model_selection import GridSearchCV

# 2. Select the parameters:
# Here we pick what are the parameters we want to choose from, and form a dictionary.
# In this dictionary, the keys will be the names of the parameters, and the values will be the lists of possible values for each parameter.
parameters = {'kernel':['poly', 'rbf'],'C':[0.1, 1, 10]}

# 3. Create a scorer.
# We need to decide what metric we'll use to score each of the candidate models. In here, we'll use F1 Score.
from sklearn.metrics import make_scorer
from sklearn.metrics import f1_score
scorer = make_scorer(f1_score)

# 4. Create a GridSearch Object with the parameters, and the scorer. Use this object to fit the data.
# Create the object.
grid_obj = GridSearchCV(clf, parameters, scoring=scorer)
# Fit the data
grid_fit = grid_obj.fit(X, y)

# 5. Get the best estimator.
best_clf = grid_fit.best_estimator_

# Random grid search
clf_svm = SVC()
# Set up the hyperparameter search
param_dist = {"C": [0.1, 0.5, 1, 3, 5],
              "kernel": ['linear','rbf']}
# Run a randomized search over the hyperparameters
random_search = RandomizedSearchCV(clf_svm, param_distributions=param_dist)
# Fit the model on the training data
random_search.fit(X_train, y_train)
# Make predictions on the test data
svc_preds = random_search.best_estimator_.predict(X_test)
# Return your metrics on test data
ch.print_metrics(y_test, svc_preds, 'svc')

# logistic regression (see also pandas)
log_mod = LogisticRegression()
log_mod.fit(X_train, y_train)
preds = log_mod.predict(X_test)
confusion_matrix(y_test, preds) # ⚠️ Warning: scikit-learn outputs binary tables with true positives (1, 1) in the lower right 
accuracy_score(y_test, preds)
recall_score(y_test, preds)
precision_score(y_test, preds) 



from sklearn import preprocessing
from sklearn import pipeline
poly = preprocessing.PolynomialFeatures(degree=60, include_bias=False)
scaler = preprocessing.StandardScaler()
lin_reg2 = linear_model.LinearRegression()
pipeline_reg = pipeline.Pipeline([('poly', poly), ('scal', scaler), ('lin', lin_reg2)])
pipeline_reg.fit(Xfull, yfull)

from sklearn.model_selection import train_test_split
train_set, test_set = train_test_split(housing, test_size=0.2, random_state=42)

from sklearn.model_selection import StratifiedShuffleSplit
split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split.split(housing, housing["income_cat"]):
    strat_train_set = housing.loc[train_index]
    strat_test_set = housing.loc[test_index]

from sklearn.preprocessing import Imputer
imputer = Imputer(strategy="median")
imputer.fit(housing_num)
imputer.statistics_
X = imputer.transform(housing_num)

from future_encoders import OrdinalEncoder
ordinal_encoder = OrdinalEncoder()
housing_cat_encoded = ordinal_encoder.fit_transform(housing_cat)
housing_cat_encoded[:10]
ordinal_encoder.categories_

from future_encoders import OneHotEncoder
cat_encoder = OneHotEncoder()
housing_cat_1hot = cat_encoder.fit_transform(housing_cat)
housing_cat_1hot
housing_cat_1hot.toarray()

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
num_pipeline = Pipeline([
        ('imputer', Imputer(strategy="median")),
        ('attribs_adder', CombinedAttributesAdder()),
        ('std_scaler', StandardScaler()),
    ])
housing_num_tr = num_pipeline.fit_transform(housing_num)

from sklearn.metrics import mean_squared_error
housing_predictions = lin_reg.predict(housing_prepared)
lin_mse = mean_squared_error(housing_labels, housing_predictions)
lin_rmse = np.sqrt(lin_mse)

from sklearn.metrics import mean_absolute_error
lin_mae = mean_absolute_error(housing_labels, housing_predictions)

from sklearn.tree import DecisionTreeRegressor
tree_reg = DecisionTreeRegressor(random_state=42)
tree_reg.fit(housing_prepared, housing_labels)

from sklearn.model_selection import cross_val_score
scores = cross_val_score(tree_reg, housing_prepared, housing_labels,
                         scoring="neg_mean_squared_error", cv=10)
tree_rmse_scores = np.sqrt(-scores)

from sklearn.ensemble import RandomForestRegressor
forest_reg = RandomForestRegressor(random_state=42)
forest_reg.fit(housing_prepared, housing_labels)
housing_predictions = forest_reg.predict(housing_prepared)
forest_mse = mean_squared_error(housing_labels, housing_predictions)
forest_rmse = np.sqrt(forest_mse)

from sklearn.svm import SVR
svm_reg = SVR(kernel="linear")
svm_reg.fit(housing_prepared, housing_labels)
housing_predictions = svm_reg.predict(housing_prepared)
svm_mse = mean_squared_error(housing_labels, housing_predictions)
svm_rmse = np.sqrt(svm_mse)

from sklearn.model_selection import GridSearchCV
param_grid = [
    # try 12 (3×4) combinations of hyperparameters
    {'n_estimators': [3, 10, 30], 'max_features': [2, 4, 6, 8]},
    # then try 6 (2×3) combinations with bootstrap set as False
    {'bootstrap': [False], 'n_estimators': [3, 10], 'max_features': [2, 3, 4]},
  ]
forest_reg = RandomForestRegressor(random_state=42)
# train across 5 folds, that's a total of (12+6)*5=90 rounds of training 
grid_search = GridSearchCV(forest_reg, param_grid, cv=5,
                           scoring='neg_mean_squared_error', return_train_score=True)
grid_search.fit(housing_prepared, housing_labels)
grid_search.best_params_
grid_search.best_estimator_
cvres = grid_search.cv_results_
for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
    print(np.sqrt(-mean_score), params)

from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint
param_distribs = {
        'n_estimators': randint(low=1, high=200),
        'max_features': randint(low=1, high=8),
    }
forest_reg = RandomForestRegressor(random_state=42)
rnd_search = RandomizedSearchCV(forest_reg, param_distributions=param_distribs,
                                n_iter=10, cv=5, scoring='neg_mean_squared_error', random_state=42)
rnd_search.fit(housing_prepared, housing_labels)
cvres = rnd_search.cv_results_
for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
    print(np.sqrt(-mean_score), params)
feature_importances = grid_search.best_estimator_.feature_importances_

from sklearn.linear_model import SGDClassifier
sgd_clf = SGDClassifier(max_iter=5, random_state=42)
sgd_clf.fit(X_train, y_train_5)
sgd_clf.predict([some_digit])

from sklearn.model_selection import cross_val_predict
y_train_pred = cross_val_predict(sgd_clf, X_train, y_train_5, cv=3)

from sklearn.metrics import confusion_matrix
confusion_matrix(y_train_5, y_train_pred)

from sklearn.metrics import precision_recall_curve
precisions, recalls, thresholds = precision_recall_curve(y_train_5, y_scores)

from sklearn.metrics import roc_curve
fpr, tpr, thresholds = roc_curve(y_train_5, y_scores)

from sklearn.metrics import roc_auc_score
roc_auc_score(y_train_5, y_scores)

# hierarchical clustering
from sklearn import datasets, cluster
X = datasets.load_iris().data[:10]
clust = cluster.AgglomerativeClustering(n_clusters=3, linkage='ward')
labels = clust.fit_predict(X)

# DBSCAN
from sklearn import datasets, cluster
X = datasets.load_iris().data
db = cluster.DBSCAN(eps=0.5, min_samples=5)
db.fit(X)

# GMM
from sklearn import datasets, mixture
X = datasets.load_iris().data[:10]
gmm = mixture.GaussianMixture(n_components=3)
gmm.fit(X)
clustering=gmm.predict(X)

# PCA
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def do_pca(n_components, data):
    '''
    Transforms data using PCA to create n_components, and provides back the results of the
    transformation.
    
    INPUT: n_components - int - the number of principal components to create
           data - the data you would like to transform
           
    OUTPUT: pca - the pca object created after fitting the data
            X_pca - the transformed X matrix with new number of components
    '''
    X = StandardScaler().fit_transform(data)
    pca = PCA(n_components)
    X_pca = pca.fit_transform(X)
    return pca, X_pca

# Random Projection
from sklearn import random_projection
rp = random_projection.SparseRandomProjection()
new_X = rp.fit_transform(X)

# ICA
from sklearn.decomposition import FastICA
X = list(zip(signal_1, signal_2, signal_3))
ica = FastICA(n_components=3)
components = ica.fit_transform(X)
```


---
# References

- [scikit-learn](http://scikit-learn.org/stable/index.html)  
- [Novelty and Outlier Detection](https://scikit-learn.org/stable/modules/outlier_detection.html)  
- [A Brief Overview of Outlier Detection Techniques](https://towardsdatascience.com/a-brief-overview-of-outlier-detection-techniques-1e0b2c19e561)  
- [Pipelines and composite estimators](https://scikit-learn.org/stable/modules/compose.html)  
- [Custom transformers](https://scikit-learn.org/stable/modules/preprocessing.html#custom-transformers)  
- [FunctionTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.FunctionTransformer.html#sklearn.preprocessing.FunctionTransformer)  
- [Ensemble methods](http://scikit-learn.org/stable/modules/ensemble.html)  
- [sklearn.ensemble.BaggingClassifier](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.BaggingClassifier.html#sklearn.ensemble.BaggingClassifier)  
- [sklearn.ensemble.RandomForestClassifier](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html#sklearn.ensemble.RandomForestClassifier)  
- [sklearn.ensemble.AdaBoostClassifier](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.AdaBoostClassifier.html#sklearn.ensemble.AdaBoostClassifier)  
- [sklearn.metrics.fbeta_score](http://scikit-learn.org/stable/modules/generated/sklearn.metrics.fbeta_score.html)  

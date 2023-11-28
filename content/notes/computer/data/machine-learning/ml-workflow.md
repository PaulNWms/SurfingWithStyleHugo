---
title: ML Workflow
description: 
date: 2023-11-26T07:01
keywords: 
draft: false
tags:
---
The life cycle of an ML project has a pretty standard workflow.  This is a well-trodden path.

1. Look at the big picture.
      - Frame the problem
          - How will the model benefit the company?
          - What current solutions exist, if any?
          - Supervised, unsupervised, or reinforcement learning?
          - Classification, regression, or something else?
          - Batch learning or online learning?
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
        - Delete rows with nulls (dropna)
        - Delete attributes with nulls (drop)
        - Replace nulls with default value (fillna or imputer)
    - Convert text to integers (factorize() to integer or one-hot encode)
    - Feature scaling (min-max scaling or standardization)
5. Select a model and train it.
    - Cross-validation (cross_val_score)
6. Fine-tune your model.
    - GridSearchCV
    - RandomizedSearchCV
7. Present your solution.
8. Launch, monitor and maintain your system.

---
# References

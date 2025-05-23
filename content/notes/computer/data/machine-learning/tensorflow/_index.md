---
title: TensorFlow
description: 
date: 2023-10-26T22:12
keywords: 
draft: false
tags:
  - Python
---
TensorFlow is a [Python](/notes/computer/computer-languages/python) library for implementing and training artificial neural networks (ANNs).

[Convolutional Neural Networks](/notes/)
[Recurrent Neural Networks](/notes/)
[Autoencoders](/notes/)
[Reinforcement Learning](/notes/computer/data/machine-learning/reinforcement-learning)

```python
# Make sure TensorFlow™ is using the GPU
import tensorflow as tf
if tf.test.gpu_device_name():
    print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
else:
    print("Please install GPU version of TF")

# Hello
import tensorflow as tf
hello_constant = tf.constant('Hello World!')
with tf.Session() as sess:
    output = sess.run(hello_constant)
    print(output)
```

`tf.placeholder()` tensors hold data.

`tf.placeholder()` and `tf.constant()` tensors can’t be modified.

The `tf.Variable` class creates a tensor with an initial value that can be modified, much like a normal Python variable. This tensor stores its state in the session, so you must initialize the state of the tensor manually. Use the `tf.global_variables_initializer()` function to initialize the state of all the Variable tensors.

The `tf.global_variables_initializer()` call returns an operation that will initialize all TensorFlow variables from the graph.

```python
# Trainable values are stored in tf.Variable()
n_features = 120
n_labels = 5
weights = tf.Variable(tf.truncated_normal((n_features, n_labels)))
bias = tf.Variable(tf.zeros(n_labels))
init = tf.global_variables_initializer()
with tf.Session() as sess:
    sess.run(init)
```

`tf.truncated_normal()` generates random numbers from a normal distribution.

`tf.zeros()` returns a tensor with all zeros.

`tf.nn.softmax()` takes in logits and returns softmax activations.

```python
# softmax() usage
softmax_data = [0.7, 0.2, 0.1]
one_hot_data = [1.0, 0.0, 0.0]
softmax = tf.placeholder(tf.float32)
one_hot = tf.placeholder(tf.float32)
cross_entropy = -tf.reduce_sum(tf.multiply(one_hot, tf.log(softmax)))
with tf.Session() as sess:
    print(sess.run(cross_entropy, feed_dict={softmax: softmax_data, one_hot: one_hot_data}))

# The None dimension is a placeholder for the batch size. At runtime, TensorFlow will accept any batch size greater than 0.
features = tf.placeholder(tf.float32, [None, n_input])
labels = tf.placeholder(tf.float32, [None, n_classes])
```

---
# References

[TensorFlow](https://www.tensorflow.org/)

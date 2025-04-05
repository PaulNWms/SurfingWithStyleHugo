---
title: Deep Learning
date: 2023-10-26T23:25
description: 
keywords: 
draft: false
tags:
  - DataScience
---
_Type_ of machine learning: supervised vs. unsupervised

_Method_ of machine learning: parametric (trial-and-error) vs. non-parametric ("counting")

Deep learning is a class of parametric model.

```python
# stare at this
weight = 0.5
goal_pred = 0.8
input = 2
alpha = 0.1
for iteration in range(20):
    pred = input * weight
    error = (pred - goal_pred) ** 2
    derivative = input * (pred - goal_pred)
    weight = weight - (alpha * derivative)
    print("Error:" + str(error) + " Prediction:" + str(pred))
```
Stochastic Gradient Descent updates the weights after each input.
Batch Gradient Descent updates the weights after each batch of input.
```python
# start at this
import numpy as np
np.random.seed(1)
 
def relu(x):
    return (x > 0) * x # returns x if x > 0
                       # return 0 otherwise
 
def relu2deriv(output):
    return output>0 # returns 1 for input > 0
                    # return 0 otherwise
streetlights = np.array( [[ 1, 0, 1 ],
                          [ 0, 1, 1 ],
                          [ 0, 0, 1 ],
                          [ 1, 1, 1 ] ] )
 
walk_vs_stop = np.array([ 1, 1, 0, 0](/notes/)).T
 
alpha = 0.2
hidden_size = 4
 
weights_0_1 = 2*np.random.random((3,hidden_size)) - 1
weights_1_2 = 2*np.random.random((hidden_size,1)) - 1
 
for iteration in range(60):
    layer_2_error = 0
    for i in range(len(streetlights)):
        layer_0 = streetlights[i:i+1]
        layer_1 = relu(np.dot(layer_0,weights_0_1))
        layer_2 = np.dot(layer_1,weights_1_2)
 
        layer_2_error += np.sum((layer_2 - walk_vs_stop[i:i+1]) ** 2)
        layer_2_delta = (layer_2 - walk_vs_stop[i:i+1])
        layer_1_delta=layer_2_delta.dot(weights_1_2.T)*relu2deriv(layer_1)
        weights_1_2 -= alpha * layer_1.T.dot(layer_2_delta)
        weights_0_1 -= alpha * layer_0.T.dot(layer_1_delta)
 
    if(iteration % 10 == 9):
        print("Error:" + str(layer_2_error))
```
Normalization techniques:
- minibatch
- early stopping
- dropout

Activation functions:
- relu is fast
- sigmoid is often used for output because it squishes the values between 0 and 1
- tanh is often used for middle layers because it squishes the values between -1 and 1

Output activation functions:
- predicting raw data values (like temperature) => no activation
- predicting yes/no probabilities => sigmoid
- predicting "which one" probabilities => softmax

function   forward prop                     back prop delta
- Relu     ones_and_zeros = (input > 0)     mask = output > 0
           output = input*ones_and_zeros    deriv = output * mask
- Sigmoid  output = 1/(1 + np.exp(-input))  deriv = output*(1-output)
- Tanh     output = np.tanh(input)          deriv = 1 - (output**2)
- Softmax  temp = np.exp(input)             temp = (output - true)
           output /= np.sum(temp)           output = temp/len(true)

A convolution layer aggregates the kernels with sum pooling, mean pooling, or max pooling.  Max pooling is the most common.

When a neural network needs to use the same idea in mutliple places, endeavor to use the same weights in both places.

The perceptron step works as follows. For a point with coordinates (p,q), label y, and prediction given by the equation ŷ = step(w₁x₁ + w₂x₂ + b):
∀ points:
    - If the point is correctly classified, do nothing.
    - If the point is classified positive, but it has a negative label, subtract αp, αq, and α from w₁, w₂ and b respectively.
    - If the point is classified negative, but it has a positive label, add αp, αq, and α from w₁, w₂ and b respectively.

By replacing the step function with the sigmoid function, ŷ = σ(w₁x₁ + w₂x₂ + b) becomes a probability that the point is above or below the line.

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mi>o</mi><mi>f</mi><mi>t</mi><mi>m</mi><mi>a</mi><mi>x</mi><mo>=</mo><mo>∑</mo><msub><mrow><mo stretchy="true" form="prefix">(</mo><mi>𝐳</mi><mo stretchy="true" form="postfix">)</mo></mrow><mi>j</mi></msub><mo>=</mo></mrow><annotation encoding="application/x-tex">Softmax=\sum(\mathbf{z})_j=</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><msup><mi>e</mi><msub><mi>z</mi><mi>j</mi></msub></msup><mrow><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mi>K</mi></munderover><msup><mi>e</mi><msub><mi>z</mi><mi>k</mi></msub></msup></mrow></mfrac><annotation encoding="application/x-tex">\frac{e^{z_j}}{\sum_{k=1}^{K}e^{z_k}}</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mi>r</mi><mi>o</mi><mi>s</mi><mi>s</mi><mi>E</mi><mi>n</mi><mi>t</mi><mi>r</mi><mi>o</mi><mi>p</mi><mi>y</mi><mo>=</mo><mi>−</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><msub><mi>y</mi><mi>i</mi></msub><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>p</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msub><mi>y</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msub><mi>p</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">CrossEntropy=-\sum_{i=1}^m y_i ln(p_i) + (1-y_i)ln(1-p_i)</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mi>u</mi><mi>l</mi><mi>t</mi><mi>i</mi><mi>C</mi><mi>l</mi><mi>a</mi><mi>s</mi><mi>s</mi><mi>C</mi><mi>E</mi><mo>=</mo><mi>−</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><munderover><mo>∑</mo><mrow><mi>j</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><msub><mi>y</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>p</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">MultiClassCE=-\sum_{i=1}^n \sum_{j=1}^m y_{ij} ln(p_{ij})</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>−</mi><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msub><mi>y</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msub><mover><mi>y</mi><mo accent="true">̂</mo></mover><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><msub><mi>y</mi><mi>i</mi></msub><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mover><mi>y</mi><mo accent="true">̂</mo></mover><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">Error=-\frac{1}{m}\sum_{i=1}^m (1-y_i)ln(1-\hat{y}_i) + y_i ln(\hat{y}_i)</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>W</mi><mo>,</mo><mi>b</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>−</mi><mfrac><mn>1</mn><mi>m</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><msub><mi>y</mi><mi>i</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>W</mi><msup><mi>x</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>+</mo><mi>b</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><msub><mi>y</mi><mi>i</mi></msub><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>W</mi><msup><mi>x</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>i</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>+</mo><mi>b</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">E(W,b)=-\frac{1}{m}\sum_{i=1}^m (1-y_i)ln(1-\sigma(Wx^{(i)}+b)) + y_i ln(\sigma(Wx^{(i)}+b))</annotation></semantics></math>

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mi>u</mi><mi>l</mi><mi>t</mi><mi>i</mi><mi>C</mi><mi>l</mi><mi>a</mi><mi>s</mi><mi>s</mi><mi>E</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>−</mi><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><munderover><mo>∑</mo><mrow><mi>j</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover><msub><mi>y</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mi>l</mi><mi>n</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mover><mi>y</mi><mo accent="true">̂</mo></mover><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">MultiClassError=-\sum_{i=1}^n \sum_{j=1}^m y_{ij} ln(\hat{y}_{ij})</annotation></semantics></math>

The derivative of the sigmoid function is really simple (here the tick means first-order derivative):

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>σ</mi><mi>′</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo>−</mo><mi>σ</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\sigma&#39;(x) = \sigma(x) (1-\sigma(x))</annotation></semantics></math>

After applying some calculus, this is the gradient step (here the tick means new value):

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>w</mi><mi>i</mi></msub><mi>′</mi><mo>←</mo><msub><mi>w</mi><mi>i</mi></msub><mo>+</mo><mi>α</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>y</mi><mo>−</mo><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow><msub><mi>x</mi><mi>i</mi></msub><mspace width="2.0em"></mspace><mi>b</mi><mi>′</mi><mo>←</mo><mi>b</mi><mo>+</mo><mi>α</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>y</mi><mo>−</mo><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">w_i&#39; \leftarrow w_i + \alpha (y - \hat{y}) x_i \qquad b&#39; \leftarrow b + \alpha (y - \hat{y})</annotation></semantics></math>

Feedforward:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover><mi>y</mi><mo accent="true">̂</mo></mover><mo>=</mo><mi>σ</mi><mo>∘</mo><msup><mi>W</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>n</mi><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>∘</mo><mi>…</mi><mo>∘</mo><mi>σ</mi><mo>∘</mo><msup><mi>W</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>2</mn><mo stretchy="true" form="postfix">)</mo></mrow></msup><mo>∘</mo><mi>σ</mi><mo>∘</mo><msup><mi>W</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>1</mn><mo stretchy="true" form="postfix">)</mo></mrow></msup><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\hat{y} = \sigma \circ W^{(n)} \circ \ldots \circ \sigma \circ W^{(2)} \circ \sigma \circ W^{(1)}(x)</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>∇</mi><mi>E</mi><mo>=</mo><mrow><mo stretchy="true" form="prefix">(</mo><mi>…</mi><mo>,</mo><mfrac><mrow><mi>δ</mi><mi>E</mi></mrow><mrow><mi>δ</mi><msubsup><mi>W</mi><mrow><mi>i</mi><mi>j</mi></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup></mrow></mfrac><mo>,</mo><mi>…</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\nabla E = (\ldots, \frac{\delta E}{\delta W_{ij}^{(k)}}, \ldots)</annotation></semantics></math>

Backpropagation:

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∀</mo><msubsup><mi>W</mi><mrow><mi>i</mi><mi>j</mi></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mrow><mspace width="0.333em"></mspace><mtext mathvariant="normal"> in </mtext><mspace width="0.333em"></mspace></mrow><mi>∇</mi><mi>E</mi><mo>:</mo><mspace width="1.0em"></mspace><msubsup><mi>W</mi><mrow><mi>i</mi><mi>j</mi></mrow><mrow><mi>′</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></mrow></msubsup><mo>←</mo><msubsup><mi>W</mi><mrow><mi>i</mi><mi>j</mi></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup><mo>−</mo><mi>α</mi><mfrac><mrow><mi>δ</mi><mi>E</mi></mrow><mrow><mi>δ</mi><msubsup><mi>W</mi><mrow><mi>i</mi><mi>j</mi></mrow><mrow><mo stretchy="true" form="prefix">(</mo><mi>k</mi><mo stretchy="true" form="postfix">)</mo></mrow></msubsup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\forall W_{ij}^{(k)}\text{ in }\nabla E: \quad W_{ij}^{&#39;(k)} \leftarrow W_{ij}^{(k)} - \alpha\frac{\delta E}{\delta W_{ij}^{(k)}}</annotation></semantics></math>

If you can't find the right size of pants, it's better to go for the slightly larger pair and use a belt.
```python
# Putting together a 
[Keras](https://keras.io/getting-started/sequential-model-guide/) network is straightforward:
model = Sequential()
model.add(...) # a bunch of layers here
model.compile(loss='binary_crossentropy', optimizer='rmsprop', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=20, batch_size=128)
score = model.evaluate(x_test, y_test, batch_size=128)
```
An epoch is a single forward and backward pass of the whole dataset.

Backpropagation (another notation):

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>δ</mi><mi>j</mi><mi>h</mi></msubsup><mo>=</mo><mo>∑</mo><mrow><msub><mi>W</mi><mrow><mi>j</mi><mi>k</mi></mrow></msub><msubsup><mi>δ</mi><mi>k</mi><mn>0</mn></msubsup><mi>f</mi><mi>′</mi><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>h</mi><mi>j</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow></mrow><annotation encoding="application/x-tex">\delta^h_j = \sum{W_{jk}\delta^0_kf&#39;(h_j)}</annotation></semantics></math>
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>Δ</mi><msub><mi>w</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><mi>η</mi><msubsup><mi>δ</mi><mi>j</mi><mi>h</mi></msubsup><msub><mi>x</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">\Delta w_{ij} = \eta \delta^h_jx_i</annotation></semantics></math>

Limitations of MLPs:
- use a lot of parameters because they only use fully connected layers
- only accept vectors as input

Four Cases when Using Transfer Learning
A large data set might have one million images. A small data could have two-thousand images. The dividing line between a large data set and small data set is somewhat subjective. Overfitting is a concern when using transfer learning with a small data set. 
Images of dogs and images of wolves would be considered similar; the images would share common characteristics. A data set of flower images would be different from a data set of dog images. 
Each of the four transfer learning cases has its own approach. In the following sections, we will look at each case one by one.
Demonstration Network
To explain how each situation works, we will start with a generic pre-trained convolutional neural network and explain how to adjust the network for each case. Our example network contains three convolutional layers and three fully connected layers:

General Overview of a Neural Network
Here is an generalized overview of what the convolutional neural network does: 
the first layer will detect edges in the image
the second layer will detect shapes
the third convolutional layer detects higher level features
Each transfer learning case will use the pre-trained convolutional neural network in a different way.
Case 1: Small Data Set, Similar Data

Case 1: Small Data Set with Similar Data
If the new data set is small and similar to the original training data:
slice off the end of the neural network
add a new fully connected layer that matches the number of classes in the new data set
randomize the weights of the new fully connected layer; freeze all the weights from the pre-trained network
train the network to update the weights of the new fully connected layer
To avoid overfitting on the small data set, the weights of the original network will be held constant rather than re-training the weights. 
Since the data sets are similar, images from each data set will have similar higher level features. Therefore most or all of the pre-trained neural network layers already contain relevant information about the new data set and should be kept.
Here's how to visualize this approach:

Neural Network with Small Data Set, Similar Data
Case 2: Small Data Set, Different Data

Case 2: Small Data Set, Different Data
If the new data set is small and different from the original training data:
slice off most of the pre-trained layers near the beginning of the network
add to the remaining pre-trained layers a new fully connected layer that matches the number of classes in the new data set
randomize the weights of the new fully connected layer; freeze all the weights from the pre-trained network
train the network to update the weights of the new fully connected layer
Because the data set is small, overfitting is still a concern. To combat overfitting, the weights of the original neural network will be held constant, like in the first case.
But the original training set and the new data set do not share higher level features. In this case, the new network will only use the layers containing lower level features.
Here is how to visualize this approach:

Neural Network with Small Data Set, Different Data
Case 3: Large Data Set, Similar Data

Case 3: Large Data Set, Similar Data
If the new data set is large and similar to the original training data:
remove the last fully connected layer and replace with a layer matching the number of classes in the new data set
randomly initialize the weights in the new fully connected layer
initialize the rest of the weights using the pre-trained weights 
re-train the entire neural network
Overfitting is not as much of a concern when training on a large data set; therefore, you can re-train all of the weights.
Because the original training set and the new data set share higher level features, the entire neural network is used as well.
Here is how to visualize this approach:

Neural Network with Large Data Set, Similar Data
Case 4: Large Data Set, Different Data

Case 4: Large Data Set, Different Data
If the new data set is large and different from the original training data:
remove the last fully connected layer and replace with a layer matching the number of classes in the new data set
retrain the network from scratch with randomly initialized weights
alternatively, you could just use the same strategy as the "large and similar" data case
Even though the data set is different from the training data, initializing the weights from the pre-trained network might make training faster. So this case is exactly the same as the case with a large, similar data set.
If using the pre-trained network as a starting point does not produce a successful model, another option is to randomly initialize the convolutional neural network weights and train the network from scratch.
Here is how to visualize this approach:

Neural Network with Large Data Set, Different Data


---
# References

- [German Traffic Sign dataset](http://benchmark.ini.rub.de/?section=gtsrb&subsection=dataset) and [project](https://github.com/udacity/CarND-Traffic-Sign-Classifier-Project)  
- [Exploring LSTMs](http://blog.echen.me/2017/05/30/exploring-lstms/)  
- [CIFAR-10 Competition Winners](http://blog.kaggle.com/2015/01/02/cifar-10-competition-winners-interviews-with-dr-ben-graham-phil-culliton-zygmunt-zajac/)  
- [A Theoretical and Empirical Analysis of Expected Sarsa](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.216.4144&rep=rep1&type=pdf)  
- [Issues in Using Function Approximation for Reinforcement Learning (1993) ](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.73.3097)  
- [Learning Deep Features for Discriminative Localization](http://cnnlocalization.csail.mit.edu/Zhou_Learning_Deep_Features_CVPR_2016_paper.pdf)  
- [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)  
- [CS231n: Convolutional Neural Networks for Visual Recognition](http://cs231n.github.io/)  
- [Commonly used activation functions](http://cs231n.github.io/neural-networks-1/#actfun)  
- [Visualizing what ConvNets learn)](http://cs231n.github.io/understanding-cnn/)  
- [Deep Reinforcement Learning: Pong from Pixels](http://karpathy.github.io/2016/05/31/rl/)  
- [Linear Combinations](http://linear.ups.edu/html/section-LC.html)  
- [Neural Networks and Deep Learning (book)](http://neuralnetworksanddeeplearning.com/)  
- [Why are deep neural networks hard to train?](http://neuralnetworksanddeeplearning.com/chap5.html)  
- [ImageNet Classiﬁcation with Deep Convolutional NeuralNetworks](http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)  
- [An Empirical Explorationof Recurrent Network Architectures](http://proceedings.mlr.press/v37/jozefowicz15.pdf)  
- [Understanding the difﬁculty of training deep feedforward neural networks](http://proceedings.mlr.press/v9/glorot10a/glorot10a.pdf)  
- [Inventory management in supply chains: a reinforcement learning approach](http://read.pudn.com/downloads142/sourcecode/others/617477/inventory%20supply%20chain/04051310570412465(1).pdf)  
- [Image Kernels Explained Visually](http://setosa.io/ev/image-kernels/)  
- [common derivatives](http://tutorial.math.lamar.edu/pdf/Common_Derivatives_Integrals.pdf)  
- [The Street View House Numbers (SVHN) Dataset](http://ufldl.stanford.edu/housenumbers/) and [project](https://github.com/udacity/machine-learning/tree/master/projects/digit_recognition)  
- [Reinforcement Learning with Replacing Eligibility Traces](http://www-anw.cs.umass.edu/legacy/pubs/1995_96/singh_s_ML96.pdf)  
- [LSTM](http://www.bioinf.jku.at/publications/older/2604.pdf)  
- [WaveNet model that generates songs](http://www.creativeai.net/posts/W2C3baXvf2yJSLbY6/a-neural-parametric-singing-synthesizer)  
- [automatic handwriting generation](http://www.cs.toronto.edu/~graves/handwriting.cgi?text=My+name+is+Luka&style=&bias=0.15&samples=3)  
- [Learning Long-Term Dependencies with RNN](http://www.cs.toronto.edu/~guerzhoy/321/lec/W09/rnn_gated.pdf)  
- [Deep Learning (book)](http://www.deeplearningbook.org/)  
- [IMAGENET Large Scale Visual Recognition Challenge (ILSVRC)](http://www.image-net.org/challenges/LSVRC/)  
- [Performance Bounds on Greedy Policies](http://www.leemon.com/papers/1993wb2.pdf)  
- [CNNs for text classification](http://www.wildml.com/2015/12/implementing-a-cnn-for-text-classification-in-tensorflow/)  
- [Introduction to Learning to Trade with Reinforcement Learning](http://www.wildml.com/2018/02/introduction-to-learning-to-trade-with-reinforcement-learning/)  
- [THE MNIST DATABASE of handwritten digits](http://yann.lecun.com/exdb/mnist/)  
- [Efficient BackProp](http://yann.lecun.com/exdb/publis/pdf/lecun-98b.pdf)  
- [Assisting Pathologists in Detecting Cancer with Deep Learning ](https://ai.googleblog.com/2017/03/assisting-pathologists-in-detecting.html)  
- [A.I. Experiments website](https://aiexperiments.withgoogle.com/)  
- [Practical recommendations for gradient-based training of deep architectures](https://arxiv.org/abs/1206.5533)  
- [On the difficulty of training Recurrent Neural Networks](https://arxiv.org/abs/1211.5063)  
- [Speech Recognition with Deep Recurrent Neural Networks](https://arxiv.org/abs/1303.5778)  
- [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)  
- [Show and Tell: A Neural Image Caption Generator](https://arxiv.org/abs/1411.4555)  
- [Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling](https://arxiv.org/abs/1412.3555)  
- [Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification](https://arxiv.org/abs/1502.01852) 
- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167) 
- [DRAW: A Recurrent Neural Network For Image Generation](https://arxiv.org/abs/1502.04623)  
- [Visualizing and Understanding Recurrent Networks](https://arxiv.org/abs/1506.02078)  
- [How to Generate a Good Word Embedding?](https://arxiv.org/abs/1507.05523)  
- [Deep Recurrent Q-Learning for Partially Observable MDPs](https://arxiv.org/abs/1507.06527)  
- [Deep Reinforcement Learning with Double Q-learning](https://arxiv.org/abs/1509.06461)  
- [Prioritized Experience Replay](https://arxiv.org/abs/1511.05952)  
- [Dueling Network Architectures for Deep Reinforcement Learning](https://arxiv.org/abs/1511.06581)  
- [Systematic evaluation of CNN advances on the ImageNet](https://arxiv.org/abs/1606.02228)  
- [Neural Speech Recognizer: Acoustic-to-Word LSTM Model for Large Vocabulary Speech Recognition](https://arxiv.org/abs/1610.09975)  
- [Understanding deep learning requires rethinking generalization](https://arxiv.org/abs/1611.03530)  
- [Massive Exploration of Neural Machine Translation Architectures](https://arxiv.org/abs/1703.03906v2)  
- [Generative Adversarial Nets](https://arxiv.org/pdf/1406.2661.pdf)  
- [VERY DEEP CONVOLUTIONAL NETWORKS FOR LARGE-SCALE IMAGE RECOGNITIO](https://arxiv.org/pdf/1409.1556.pdf)  
- [How transferable are features in deep neural networks?](https://arxiv.org/pdf/1411.1792.pdf)  
- [Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification](https://arxiv.org/pdf/1502.01852v1.pdf) 
- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/pdf/1502.03167v2.pdf) 
- [LSTM: A Search Space Odyssey](https://arxiv.org/pdf/1503.04069.pdf)  
- [SESSION-BASED RECOMMENDATIONS WITH RECURRENT NEURAL NETWORKS](https://arxiv.org/pdf/1511.06939.pdf)  
- [Deep Residual Learning for Image Recognition](https://arxiv.org/pdf/1512.03385v1.pdf)  
- [Improved Techniques for Training GANs](https://arxiv.org/pdf/1606.03498.pdf)  
- [EmergenceofLocomotionBehaviours inRichEnvironments](https://arxiv.org/pdf/1707.02286.pdf)  
- [Amazon Lex FAQs](https://aws.amazon.com/lex/faqs/)  
- [Building powerful image classification models using very little data](https://blog.keras.io/building-powerful-image-classification-models-using-very-little-data.html)  
- [How convolutional neural networks see the world](https://blog.keras.io/how-convolutional-neural-networks-see-the-world.html)  
- [DotA 2 bot by Open AI](https://blog.openai.com/dota-2/)  
- [Reading Barcodes on Hooves: How Deep Learning Is Helping Save Endangered Zebras](https://blogs.nvidia.com/blog/2016/11/04/saving-endangered-species/?adbsc=social_20170303_70517416)  
- [Facebook's CNN approach for language translation](https://code.facebook.com/posts/1978007565818999/a-novel-approach-to-neural-machine-translation/)  
- [Building an efficient neural language model over a billion words](https://code.fb.com/ml-applications/building-an-efficient-neural-language-model-over-a-billion-words/)  
- [Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)  
- [Depth Map Prediction from a Single Image using a Multi-Scale Deep Network](https://cs.nyu.edu/~deigen/depth/)  
- [Deep Dream Generator](https://deepdreamgenerator.com/)  
- [DeepMind](https://deepmind.com/)  
- [AlphaGo Zero: Learning from scratch](https://deepmind.com/blog/alphago-zero-learning-scratch/)  
- [Producing flexible behaviours in simulated environments](https://deepmind.com/blog/producing-flexible-behaviours-simulated-environments/)  
- [WaveNet](https://deepmind.com/blog/wavenet-generative-model-raw-audio/)  
- [AlphaGo](https://deepmind.com/research/alphago/)  
- [Human-level control through Deep Reinforcement Learning](https://deepmind.com/research/dqn/)  
- [Play Atari games with a CNN and reinforcement learning](https://deepmind.com/research/dqn/) and its [source code](https://sites.google.com/a/deepmind.com/dqn/)  
- [Bias of an estimator](https://en.wikipedia.org/wiki/Bias_of_an_estimator)  
- [Conditional probability distribution](https://en.wikipedia.org/wiki/Conditional_probability_distribution)  
- [Convergent series](https://en.wikipedia.org/wiki/Convergent_series)  
- [Divergent series](https://en.wikipedia.org/wiki/Divergent_series)  
- [Expected value](https://en.wikipedia.org/wiki/Expected_value)  
- [Geometric series](https://en.wikipedia.org/wiki/Geometric_series)  
- [Law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers)  
- [Markov reward model](https://en.wikipedia.org/wiki/Markov_reward_model)  
- [Mean Squared Error (MSE) (usually used in regression problems)](https://en.wikipedia.org/wiki/Mean_squared_error)  
- [Mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error)  
- [Negative binomial distribution](https://en.wikipedia.org/wiki/Negative_binomial_distribution)  
- [Elman and Jordan networks](https://en.wikipedia.org/wiki/Recurrent_neural_network#Elman_networks_and_Jordan_networks)  
- [Time delay neural network](https://en.wikipedia.org/wiki/Time_delay_neural_network)  
- [Vanishing gradient problem](https://en.wikipedia.org/wiki/Vanishing_gradient_problem)  
- [Word2vec](https://en.wikipedia.org/wiki/Word2vec)  
- [What Neural Networks See](https://experiments.withgoogle.com/what-neural-nets-see)  
- [ResNetCAM-keras](https://github.com/alexisbcook/ResNetCAM-keras)  
- [Keras Transfer Learning on CIFAR-10](https://github.com/alexisbcook/keras_transfer_cifar10)  
- [Benchmarks for popular CNN models](https://github.com/jcjohnson/cnn-benchmarks)  
- [OpenAI Gym GitHub](https://github.com/openai/gym)  
- [Learning to trade under the reinforcement learning framework ](https://github.com/ucaiado/QLearning_Trading)  
- [Reinforcement Learning Cheat Sheet](https://github.com/udacity/rl-cheatsheet/blob/master/cheatsheet.pdf)  
- [Getting Started with OpenAI Gym](https://gym.openai.com/docs/)  
- [Deep Q-Learning with Keras and Gym](https://keon.io/deep-q-learning/)  
- [How to Check-Point Deep Learning Models in Keras](https://machinelearningmastery.com/check-point-deep-learning-models-keras/)  
- [How to Grid Search Hyperparameters for Deep Learning Models in Python With Keras](https://machinelearningmastery.com/grid-search-hyperparameters-deep-learning-models-python-keras/)  
- [Image Augmentation for Deep Learning With Keras](https://machinelearningmastery.com/image-augmentation-deep-learning-keras/)  
- [NeurIPS](https://nips.cc/)  
- [Elman network](https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1402_1)  
- [Attacking Machine Learning with Adversarial Examples](https://openai.com/blog/adversarial-example-research/)  
- [OpenFrameworks ](https://openframeworks.cc/)  
- [Low Power Wireless Communication via Reinforcement Learning](https://papers.nips.cc/paper/1740-low-power-wireless-communication-via-reinforcement-learning.pdf)  
- [SEQUENCE-TO-SEQUENCE RNNS FOR TEXT SUMMARIZATION](https://pdfs.semanticscholar.org/3fbc/45152f20403266b02c4c2adab26fb367522d.pdf)  
- [Reinforcement Learning for Robots Using Neural Networks](https://pdfs.semanticscholar.org/54c4/cf3a8168c1b70f91cf78a3dc98b671935492.pdf)  
- [Reading game frames in Python with OpenCV - Python Plays GTA V](https://pythonprogramming.net/game-frames-open-cv-python-plays-gta-v/)  
- [Reinforcement Learning (DQN) Tutorial](https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html)  
- [Play pictionary with a CNN](https://quickdraw.withgoogle.com/#)  
- [Reinforcement Learning (book)](https://s3-us-west-1.amazonaws.com/udacity-drlnd/bookdraft2018.pdf) and [Python implementation](https://github.com/ShangtongZhang/reinforcement-learning-an-introduction)  
- [Keras Cheat Sheet](https://s3.amazonaws.com/assets.datacamp.com/blog_assets/Keras_Cheat_Sheet_Python.pdf)  
- [MIT 6.S094: Deep Learning for Self-Driving Cars](https://selfdrivingcars.mit.edu/)  
- [Deep Traffic](https://selfdrivingcars.mit.edu/deeptraffic/)  
- [A Beginner's Guide to LSTMs and Recurrent Neural Networks](https://skymind.ai/wiki/lstm)  
- [Geometric Sequences and Exponential Functions](https://socratic.org/algebra/exponents-and-exponential-functions/geometric-sequences-and-exponential-functions)  
- [Human-level control through deep reinforcement learning](https://storage.googleapis.com/deepmind-media/dqn/DQNNaturePaper.pdf)  
- [A Long Short-Term Memory Model for Answer Sentence Selection in Question Answering](https://www.aclweb.org/anthology/P15-2116)  
- [AutoDraw](https://www.autodraw.com/)  
- [Dropout: A Simple Way to Prevent Neural Networks from Overﬁtting](https://www.cs.toronto.edu/~hinton/absps/JMLRdropout.pdf)  
- [FaceApp uses neural networks to change your look, now available on Android](https://www.digitaltrends.com/photography/faceapp-neural-net-image-editing/)  
- [How GPS Drone Navigation Works](https://www.droneomega.com/gps-drone-navigation-works/)  
- [Deep Learning Newsletter](https://www.getrevue.co/profile/wildml)  
- [cross entropy (usually used in classification problems)](https://www.ics.uci.edu/~pjsadows/notes.pdf)  
- [Popular Datasets Over Time](https://www.kaggle.com/benhamner/popular-datasets-over-time/code)  
- [Grokking Deep Learning](https://www.manning.com/books/grokking-deep-learning)  
- [Nature publication detailing cancer-detecting CNN](https://www.nature.com/articles/nature21056.epdf)  
- [The Dark Secret at the Heart of AI](https://www.technologyreview.com/s/604087/the-dark-secret-at-the-heart-of-ai/)  
- [Finding Solace in Defeat by Artificial Intelligence](https://www.technologyreview.com/s/604273/finding-solace-in-defeat-by-artificial-intelligence/?set=604287)  
- [Visually-Indicated Sounds](https://www.youtube.com/watch?time_continue=1&v=0FW99AQmMc8)  
- [Intelligent Flying Machines (IFM)](https://www.youtube.com/watch?v=AMDiR61f86Y)  
- [Visualizing and Understanding Deep Neural Networks by Matt Zeiler](https://youtu.be/ghEmQSxT6tw)  

---
title: Basic Concepts in Machine Learning
date: 2022-06-22 13:28:12
mathjax: true
tags:  [Course note, Machine learning]
---



Machine learning is getting everywhere. This article introduce some basic concepts in machine learning. 



<!-- more -->



# Introduction 

## What is machine learning? 

* Well-posed learning problem: A computer program is said to learn from experience E with respect to some task T and some performance measure P, if its performance on T, as measured by P, improves with experience E.



## Machine learning algorithms:

* Supervised learning 
* Unsupervised learning
* Others
  * Reinforcement learning
  * Recommender systems
  * ...



## Supervised learning

* Regression problem: a continuous output
* Classification problem: a discrete output



## Unsupervised learning

* There is no feedback based on the prediction results
* For example clustering the data



# Linear regression with one variable


## Model representation

* Training set
  * $m$ = Number of training examples
  * $x^{(i)}$ = "input" variable / feature
  * $y^{(i)}$ = "output" variable / "target" variable
* The goal:
  * Given a training set, to learn a function (hypothesis) $h: X \rightarrow Y$ so that $h(x)$ is a "good" predictor for the corresponding value of $y$. 



## Cost function

Hypothesis: $h_\theta(x)=\theta_0 + \theta_1x$

Parameters: $\theta_0, \theta_1$

Cost function:
$$
J(\theta_0, \theta_1) = \frac{1}{2m}\sum^m_{i=1}(\hat{y}_i-y_i)^2=\frac{1}{2m}\sum^m_{i=1}(h_\theta(x_i)-y_i)^2
$$
This function is called the "square error function" or "mean square error". The mean is halved as a convenience for the computation of the gradient descent. 

Goal:   
$$
\underset{\theta_0, \theta_1}{minimize}\space J(\theta_0, \theta_1)
$$



## Gradient descent algorithm

Have some function $J(\theta_0, \theta_1, \dots, \theta_n)$

Want minimize $\min_{\theta_i} J$

The algorithm: 

Repeat until convergence {
$$
\theta_j := \theta_j - \alpha \frac{\partial}{\partial\theta_j}J(\theta_0, \theta_1, \dots,\theta_n), \quad \text{ for }  j=0, \dots,n
$$
} 

$\theta_j$ needs to be simultaneously updated instead of updated in turn



## Gradient descent for linear regression

$$
\begin{aligned}
\frac{\partial}{\partial \theta_0} J(\theta_0, \theta_1) &= \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)}) \\
\frac{\partial}{\partial \theta_1} J(\theta_0, \theta_1) &= \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)}) x^{(i)} \\
\end{aligned}
$$

So the algorithm is to repeat the following until convergence 
$$
\begin{aligned}
\theta_0 &:= \theta_0 - \alpha\frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)}) \\
\theta_1 &:= \theta_1 - \alpha\frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)})x^{(i)} \\
\end{aligned}
$$





# Linear regression with multiple variables


## Multiple features

* We introduce the following notations: 

  * $x_j^{(i)}$ = value of the feature $j$ in the $i^{th}$ training example
  * $x^{i}$ = the input (features) of the $i^{th}$ training example
  * $m$ = the number of training examples
  * $n$ = the number of features

* The multivariable form of the hypothesis function accommodating these multiple features is as follow:
  $$
  h_\theta(x)=\theta_0+\theta_1x_1+\theta_2x_2+\dots+\theta_nx_n=[\theta_0\quad\theta_1\quad\theta_2\quad\dots\quad\theta_n] [x_0\quad x_1\quad x_2\quad\dots\quad x_n] ^T = \theta^Tx
  $$

* The gradient descent algorithm works for multiple features as well



# Logistic regression

## Classification

* First binary classification problem: to classify in positive class and negative class
  * The linear regression does not suit this problem well
  * The logistic regression is better: $0\leq h_\theta(x)\leq 1$



## Hypothesis representation

* Logistic regression model

  * Want $0\leq h_\theta(x) \leq 1$
    * For linear regression, we have $h_\theta(x) = \theta_0 + \theta_1x$ which can be less than 0 and greater than 1. This is not desired
  * Thus we use the sigmoid (logistic) function:

  $$
  h_\theta(x)= g(\theta^T x)
  $$

  where
  $$
  g(z) = \frac{1}{1+e^{-z}}
  $$
  which gives
  $$
  h_\theta(x) = \frac{1}{1+e^{-\theta^Tx}}
  $$

* Interpretation of hypothesis output

  * $h_\theta(x) =$ estimated probability that $y=1$ on input $x$
  * "Probability that $y=1$, given $x$, parameterized by $\theta$"



## Decision boundary

In order to get our discrete 0 or 1 classificiation, we can translate the output of the hypothesis function as follows:
$$
h_\theta(x)\geq 0.5\rightarrow y=1 \\
h_\theta(x)< 0.5\rightarrow y=0 \\
$$
The way our logistic function $g$ behaves is that when its input is greater than or equal to zero, its output is greater than or equal to $0.5$: 
$$
g(z)\geq 0.5\quad\text{when}\quad z\geq 0
$$
So if our input to $g$ is $\theta^T X$, then that means: 
$$
h_\theta(x)=g(\theta^T x)\geq 0.5 \quad\text{when}\quad \theta^Tx\geq 0 \\
h_\theta(x)=g(\theta^T x)< 0.5 \quad\text{when}\quad \theta^Tx< 0 \\
$$
The decision boundary is the line that separates the area where $y=0$ and where $y=1$. It is created by our hypothesis function. 



## Cost function

Training set: $\{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(m)}, y^{(m)}), \}$.


$$
h_\theta(x)=\frac{1}{1+e^{-\theta^T x}}
$$
How to choose parameters $\theta$? 

For linear regression, the cost function is:
$$
Cost(h_\theta(x), y) = \frac{1}{2} \left(h_\theta(x)-y\right)^2
$$
However, this cost function does not work for logistic regression because its $h_\theta$ is highly non-linear. The $J(\theta)$ will have many local minimum (non-convex) which makes the optimization difficult. It might never converge to the global minimum. 



### Logistic regression cost function

$$
Cost(h_\theta(x),y)=\begin{cases}
-\log(h_\theta(x))\quad& \text{ if }y=1\\
-\log(1-h_\theta(x))\quad& \text{ if }y=0
\end{cases}
$$

Its properties:

$Cost=0$ if $y=1, h_\theta(x)=1$. But as $h_\theta(x)\rightarrow 0$, $Cost\rightarrow \infty$. Captures intuition that if $h_\theta(x)=0$, (predict $P(y=1|x;\theta)=0$, but $y=1$), we'll penalize learning algorithm by a very large cost. 



### Simplified cost function

$$
Cost\left(h_\theta(x),y\right)=-y\log\left(h_\theta(x)\right)-(1-y)\log\left(1-h_\theta(x)\right)
$$

This function is equivalent to the cased one. 

The logistic regression cost function will then be:
$$
\begin{aligned}
J(\theta) &=\frac{1}{m}\sum_{i=1}^m Cost(h_\theta(x^{(i)}), y^{(i)}) \\
&= -\frac{1}{m}\left[\sum_{i=1}^m y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)}) \log \left(1-h_\theta(x^{(i)})\right) \right]
\end{aligned}
$$
To fit parameters $\theta$: 
$$
\min_\theta J(\theta)
$$
To make a prediction given new $x$:
$$
\text{Output } h_\theta(x)=\frac{1}{1+e^{-\theta^T x}}
$$

#### Gradient descent on the simplified cost function

Repeat {
$$
\theta_j := \theta_j - \alpha \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)}) x^{(i)}
$$
}



Algorithm looks identical to linear regression! But since the hypothesis function changed, these two algorithms are actually not the same. 

A vectorized implementation is:
$$
\theta := \theta-\frac{\alpha}{m} X^T(g(X\theta)-y)
$$


#### Advanced optimization on the simplified cost function

##### Optimization algorithms: 

* Gradient descent
* Conjugate gradient
* BFGS
* L-BFGS



##### Advantages

* No need to manually pick $\alpha$
* Often faster than gradient descent

##### Disadvantages

* More complex



##### Example

We want to minimize
$$
J(\theta) = (\theta_1-5)^2 + (\theta_2-5)^2
$$
Here:

* $\theta=[\theta_1, \theta_2]^T$
* $\frac{\partial}{\partial \theta_1} J(\theta)=2(\theta_1-5)$
* $\frac{\partial}{\partial \theta_2} J(\theta)=2(\theta_2-5)$



Then this optimization problem can be solved with the following Octave code: 

```octave
function [jVal, gradient] = costFunction(theta)
	jVal = (theta(1)-5)^2 + (theta(2)-5)^2;
	gradient = zeros(2, 1);
	gradient(1) = 2 * (theta(1) - 5);
	gradient(2) = 2 * (theta(2) - 5);
end
	
options = optimset('GradObj', 'on', 'MaxIter', '100');
initialTheta = zeros(2, 1);
[optTheta, functionVal, exitFlag] = fminunc(@costFunction, initialTheta, options);
```



## Multiclass classification: one-vs-all

### Multiclass classification examples:

* Email foldering / tagging: Work, Friends, Family, Hobby
* Medical diagrams: Not ill, Cold, Flu
* Weather: Sunny, Cloudy, Rainy, Snowy



### One-vs-all (one-vs-rest):

We divide our problem into $n$ binary classification problems. In each one, we predict the probability that $y$ is a member of one of our classes. We are basically choosing one class and then lumping all the others into a single second class. We do this repeatedly, applying binary logistic regression to each case, and then use the hypothesis that returned the highest value as our prediction. 

Train a logistic regression classifier $h_\theta^{(i)}(x)$ for each class $i$ to predict the probability that $y=i$. On a new input $x$, to make a prediction, pick the class $i$ that maximizes:
$$
\max_i h_\theta^{(i)}(x)
$$


# The problem of overfitting

Overfitting: If we have too many features, the learned hypothesis may fit the training set very well, but fail to generalize to new examples. 



## Addressing overfitting

1. Reduce number of features
   * Manually select which features to keep.
   * Model selection algorithm.
2. Regularization
   * Keep all the features, but reduce magnitude/values of parameters $\theta_j$.
   * Works well when we have a lot of features, each of which contributes a bit to predicting $y$. 



## Cost function

$$
J(\theta) = \frac{1}{2m} \left[\sum_{i=1}^m(h_\theta(x^{(i)}) - y^{(i)})^2 + \lambda\sum_{j=1}^n \theta_j^2 \right]
$$

Here $\lambda \sum_{j=1}^n \theta_j^2$ is the regularization parameter. It determines how much the costs of our $\theta$ parameters are inflated. Using the above cost function with the extra summation, we can smooth the output of our hypothesis function to reduce overfitting. If $\lambda$ is chosen to be too large, it may smooth out the function too much and cause underfitting. 



## Regularized linear regression

The modified algorithm become:

Repeat {
$$
\begin{aligned}
\theta_0 &:= \theta_0 - \alpha \frac{1}{m}\sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)})x_0^{(i)} \\
\theta_j &:= \theta_j - \alpha \left[\left(\frac{1}{m}\sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)})x_j^{(i)} \right)+\frac{\lambda}{m} \theta_j \right]
\end{aligned}
$$
}



The term $\frac{\lambda}{m}\theta_j$ performs our regularization. With some manipulation our update rule can also be represented as: 
$$
\theta_j := \theta_j(1-\alpha \frac{\lambda}{m})-\alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)})-y^{(i)})x_j^{(i)}
$$
The first term in the above equation, $1-\alpha\frac{\lambda}{m}$ will always be less than 1. 



### Normal equation

Now let's approach regularization using the alternate method of the non-iterative normal equation. To add in regularization, the equation is the same as our original, except that we add another term inside the parentheses: 
$$
\theta = (X^TX+\lambda\cdot L)^{-1}X^Ty\\
\text{where } L= \begin{bmatrix}
0&\\
&1\\
&&1\\
&&&\ddots\\
&&&& 1
\end{bmatrix}
$$
$L$ should jave dimension $(n+1)\times (n+1)$. Recall that if $m<n$, then $X^TX$ is non-invertible. However, when we add the term $\lambda\cdot L$, then $X^TX+\lambda\cdot L$ becomes invertible. 



## Regularized logistic regression

The algorithm looks the same like the linear regression one with a difference hypothesis function $h_\theta$. 



# Neural Networks

## Motivations

* Some problems are fundamentally non-linear and solving them by linear regression will require gigantic feature space which is often not feasible. 
* Origins: algorithms that try to mimic the brain. Was very widely used in 80s and early 90s. Popularity diminished in late 90s.
* Recent resurgence: state-of-the-art technique for many applications.
* The one-learning-algorithm hypothesis.



## Model representation

### Neuron model: Logistic unit

At a very simple level, neurons are basically computational units that takes inputs (dendrites) as electrical inputs that are channeled to outputs. In out model, our dendrites are like the input features $x_1,\dots, x_n$, and the output is the result of our hypothesis function. In this model our $x_0$ input node is sometimes called the "bias unit". It is always equal to 1. In neural networks, we use the same logistic function as in classification, $\frac{1}{1+e^{-\theta^Tx}}$, yet we sometimes call it a sigmoid activation function. In this situation, our $\theta$ parameters are sometimes called weights. 

For example, $[x_0x_1x_2]\rightarrow [\quad]\rightarrow h_\theta(x)$. our input nodes, also known as the "input layer", go into another node, which finally outputs the hypothesis function, known as the "output layer". We can have intermediate layers of nodes betwee the input and output layers called the "hidden layers". In this example, we label these intermediate or "hidden" layer nodes $a_ 0^2\dots a_n^2$ and call them "activation units".
$$
a_i^{(j)}=\text{"activation" of unit }i\text{ in layer }j\\
\Theta^{(j)}=\text{matrix of weights controlling function mapping from layer }j \text{ to layer }j +1
$$
If we had one hidden layer, it would look like:
$$
[x_0x_1x_2]\rightarrow [a_1^{(2)}a_2^{(2)}a_3^{(2)}]\rightarrow h_\theta(x)
$$
The values for each of the activation nodes is obtained as follows:
$$
a_1^{(2)}=g\left(\Theta_{10}^{(1)}x_0+\Theta_{11}^{(1)}x_1+\Theta_{12}^{(1)}x_2+\Theta_{13}^{(1)}x_3\right)\\
a_2^{(2)}=g\left(\Theta_{20}^{(1)}x_0+\Theta_{21}^{(1)}x_1+\Theta_{22}^{(1)}x_2+\Theta_{23}^{(1)}x_3\right)\\
a_3^{(2)}=g\left(\Theta_{10}^{(1)}x_0+\Theta_{11}^{(1)}x_1+\Theta_{12}^{(1)}x_2+\Theta_{13}^{(1)}x_3\right)\\
h_\Theta(x)=a_1^{(3)}=g\left(\Theta_{10}^{(2)}a_0^{(2)}+\Theta_{11}^{(2)}a_1^{(2)}+\Theta_{12}^{(2}a_2^{(2)}+\Theta_{13}^{(2)}a_3^{(2)}\right)\\
$$
This is saying that we compute our activation nodes by using a $3\times 4$ matrix of parameters. We apply each row of the parameters to our inputs to obtain the value for one activation node. Our hypothesis output is the logistic function applied to the sum of the values of our activation nodes, which have been multiplied by yet another parameter matrix $\Theta^{(2)}$ containing the weights for our second layer of nodes. Each layer gets its own matrix of weights, $\Theta^{(j)}$. The dimensions of these matrices of weights is determined as follows: If network has $s_j$ units in layer $j$ and $s_{j+1}$ units in layer $j+1$, then $\Theta^{(j)}$ will be of dimension $s_{j+1}\times (s_j +1)$. The $+1$ comes from the addition in $\Theta^{(j)}$ of the "bias nodes" $x_0$ and $\Theta_0^{(j)}$. In other words the output nodes will not include the bias nodes while the inputs will. 



#### Vectorized implementation

$$
x=\begin{bmatrix} x_0\\x_1\\x_2\\x3\end{bmatrix}=a^{(1)},\quad z^{(2)}=\begin{bmatrix} z_1^{(2)}\\z_2^{(2)}\\z_3^{(2)}\\\end{bmatrix} \\
z^{(2)} = \Theta^{(1)}a^{(1)}, \quad a^{(2)} = g(z^{(2)}) \\
\text{Add } a_0^{(2)} = 1\rightarrow z^{(3)} = \Theta^{(2)}a^{(2)}\\
h_\Theta (x) = a^{(3)} = g(z^{(3)})
$$

So in general: 
$$
z^{(j)}=\Theta^{(j-1)}a^{(j-1)} \\
a^{(j)} = g(z^{(j)})\\
h_\Theta(x)=a^{(n)}=g(z^{(n)})
$$







## Applications

### Simple example: AND

$$
x_1, x_2\in \{0,1\},\quad y = x_1 \text{ AND }x_2
$$

Our neural network can be for example: 
$$
h_\Theta(x) = g ( -30 + 20x_1 + 20 x_2)
$$
Which will give the following table:

| $x_1$ | $x_2$ | $h_\Theta(x)$     |
| ----- | ----- | ----------------- |
| 0     | 0     | $g(-30)\approx 0$ |
| 0     | 1     | $g(-10)\approx 0$ |
| 1     | 0     | $g(-10)\approx 0$ |
| 1     | 1     | $g(10)\approx 0$  |

FYI: $g(4.6)\approx 0.99$ and $g(-4.6)\approx 0.01$



### Example: OR

Our neural network will then be:
$$
h_\Theta(x) =g(-10+20x_1+20x_2)
$$


### Example: Negation

$$
h_\Theta(x) = g(10-20x_1)
$$



### Putting it together: $x_1 \text{ XNOR } x_2$

$$
a_1^{(1)} = g(-30+20x_1+20x_2) \\
a_2^{(1)} = g(10-20x_1-20x_2) \\
h_\Theta(x) = a_1^{(2)} = g(-10 + 20 a_1^{(1)} + 20 a_2^{(1)})) \\
$$



### Multiclass classification

**Multiple output units: one-vs-all**

To classify data into multiple classes, we let our hypothesis function return a vector of values. Say we want to classify our data into one of four categories. We can define our set of resulting classes as $y$: 
$$
y^{(i)}=\begin{bmatrix}1\\0\\0\\0\end{bmatrix},
\begin{bmatrix}0\\1\\0\\0\end{bmatrix},
\begin{bmatrix}0\\0\\1\\0\end{bmatrix},
\begin{bmatrix}0\\0\\0\\1\end{bmatrix}
$$
Each $y^{(i)}$ represents a different image corresponding to either one of the four categories. The inner layers, each provides us with some new information which leads to our final hypothesis function. The setup looks like: 
$$
\begin{bmatrix}x_0\\x_1\\x_2\\\dots\\ x_n\end{bmatrix}\rightarrow
\begin{bmatrix}a_0^{(2)}\\a_1^{(2)}\\a_2^{(2)}\\\dots\end{bmatrix}\rightarrow
\begin{bmatrix}a_0^{(3)}\\a_1^{(3)}\\a_2^{(3)}\\\dots\end{bmatrix}\rightarrow
\dots \rightarrow 
\begin{bmatrix}h_\Theta(x)_1\\h_\Theta(x)_2\\h_\Theta(x)_3\\h_\Theta(x)_4\end{bmatrix}
$$


## Learning

### Cost function

For a neural network for a classification problem, let's denote: 

* $\{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(m)}, y^{(m)})\} =$ Inputs
* $L =$  total number of layers in network
* $s_l =$ number of units (not counting bias unit) in layer $l$



#### Two types of classification problems

* Binary classification: 
  * $y=0\text{ or} 1$
  * $1$ output unit: $K=1$
  * $h_\Theta(x)\in \mathbb{R}$ 
  * $S_L=1$
* Multi-class classification ($K$ classes)
  * $y\in \mathbb{R}^K$
  * $K$ output units
  * $h_\Theta(x)\in \mathbb(R)^K$
  * $S_L=K\geq 3$



#### Cost function for neural network

$$
h_\Theta(x)\in \mathbb{R}^K \Rightarrow (h_\Theta(x))_i=i^{\text{th}}\text{ output}
$$

$$
\begin{aligned}
J(\Theta) &=-\frac{1}{m}\left[\sum_{i=1}^m \sum_{k=1}^K y_k^{(i)} \log\left(h_\Theta(x^{(i)})\right)_k + (1 - y_k^{(i)}) \log\left(1 - (h_\Theta\left(x^{(i)})\right)_k\right) \right] \\
& + \frac{\lambda}{2m} \sum_{l=1}^{L-1} \sum_{i=1}^{s_l} \sum_{j=1}^{s_l+1} \left(\Theta_{ji}^{(l)}\right)^2
\end{aligned}
$$

 

In the regularization part, after the square brackets, we must account for multiple $\Theta$ matrices. The number of columns in our current $\Theta$ matrix is equal to the number of nodes in our current layer (including the bias unit). The number of rows in our current $\Theta$ matrix is equal to the number of nodes in the next layer (excluding the bias unit). 

Note:

* The double sum simply adds up the logistic regression costs calculated for each cell in the output layer. 
* The triple sum simply adds up the squares of all the individual $\Theta$s in the entire network
* The $i$ in the triple sum does not refer to training example $i$.



### Backpropagation algorithm

We need to compute $J(\Theta)$ and $\frac{\partial}{\partial \Theta_{ij}^{(l)}} J(\Theta)$. The backpropagation algorithm is then:

{

So we set $\Delta_{ij}^{(l)}=0$ for all $l,i,j$. 

For $i=1$ to $m$:

1. Set $a^{(1)} = x^{(i)}$

2. Perform forward propagation to compute $a^{(l)}$ for $l=2,3,\dots, L$.

3. Using $y^{(i)}$, compute $\delta^{(L)}=a^{(L)}-y^{(i)}$

   Compute $\delta^{(L-1)}, \delta^{(L-2)},\dots, \delta^{(2)}$

   $\Delta_{ij}^{(l)} := \Delta_{ij}^{(l)} + a_j^{(l)}\delta_i^{(l+1)}$: The vectorized implementation looks like: $\Delta^{(l)} := \Delta^{(l)} + \delta^{(l+1)}(a^{(l)})^T$

4. Then $D_{ij}^{(l)} := \frac{1}{m}\Delta_{ij}^{(l)} + \lambda \Theta_{ij}^{(l)}$ if $j\ne 0$ and $D_{ij}^{(l)} := \frac{1}{m} \Delta_{ij}^{(l)}$ if $j=0$. 

}

It can be shown that, when these computation is finished, we have 
$$
\frac{\partial}{\partial \Theta_{ij}^{(l)}} J(\Theta) = D_{ij}^{(l)}
$$


#### Backpropagation intuition

$\delta_j^{(l)} =$ "error" of cost for $a_j^{(l)}$ (unit $j$ in layer $l$). Formally, $\delta_j^{(l)} = \frac{\partial}{\partial z_j^{(l)}} \text{cost}(i)$ for $j\geq 0$, where $\text{cost}(i)=y^{(i)}\log h_\Theta(x^{(i)}) + (1-y^{(i)})\log h_\Theta (x^{(i)})$. 



### Backpropagation in practice

#### Unrolling parameters

In Matlab/Octave, for example $s_1=10, s_2=10, s_3=1$, $\Theta^{(1)}\in \mathbb{R}^{10\times 11}, \Theta^{(2)}\in \mathbb{R}^{10\times 11}, \Theta^{(3)}\in \mathbb{R}^{1\times 11}$, $D^{(1)}\in \mathbb{R}^{10\times 11}, D^{(2)}\in \mathbb{R}^{10\times 11}, D^{(3)}\in \mathbb{R}^{1\times 11}$:

```matlab
% Gather vectors
thetaVec = [Theta1(:); Theta2(:); Theta3(:)];
DVec = [D1(:); D2(:); D3(:)];

Theta1 = reshape(thetaVec(1:110), 10, 11);
Theta2 = reshape(thetaVec(111:220), 10, 11);
Theta3 = reshape(thetaVec(221:231), 1, 11);
```



#### Gradient checking with numerical estimation of gradients

```matlab
for i = 1:n
	thetaPlus = theta;
	thetaPlus(i) = thetaPlus(i) + EPSILON;
	thetaMinus = theta;
	thetaMinus(i) = thetaMinus(i) - EPSILON;
	gradApprox(i) = (J(thetaPlus) - J(thetaMinus)) / (2 * EPSION);
end;
```



Check that `gradApprox` $\approx$ `DVec`.

Implementation note:

* Implement backprop to compute `DVec`.
* Implement numerical gradient check to compute `gradApprox`.
* Make sure they give similar values.
* Turn off gradient checking. Using backprop code for learning. 
  * Be sure to disable your gradient checking code before training your classifier. The numerical estimation of gradients is much slower than the backpropagation algorithm. 



#### Random initialization

To initialize all elements of $\Theta$ to 0 does not work for neural work, the iteration will be stuck in a loop. We need random initialization to perform symmetry breaking. So we initialize each $\Theta_{ij}^{(l)}$ to a random value in $[-\epsilon, \epsilon]$:

```matlab
Theta1 = rand(10, 11) * (2 * INIT_EPSILON) - INIT_EPSILON;
Theta2 = rand( 1, 11) * (2 * INIT_EPSILON) - INIT_EPSILON;
```



#### Putting it together

To training a neural network:

1. Pick a network architecture (connectivity pattern between neurons)
   * Number of input units: dimension of features $x^{(i)}$
   * Number of output units: number of classes
   * Reasonable default: 1 hidden layer, or if $>1$ hidden layer, have same number of hidden units in every layer (usually the more the better)
2. Randomly initialize weights.
3. Implement forward propagation to get $h_\Theta(x^{(i)})$ for any $x^{(i)}$.
4. Implement code to compute cost function $J(\Theta)$.
5. Implement backprop to compute partial derivatives $\frac{\partial}{\partial\Theta_{jk}^{(l)}} J(\Theta)$.
   * Often with a `for` loop from $1$ to $m$. 
6. Use gradient checking to compare $\frac{\partial}{\partial\Theta_{jk}^{(l)}} J(\Theta)$ computed using backpropagation vs. using numerical estimate of gradient of $J(\Theta)$. Then disable gradient checking code. 
7. Use gradient descent or advanced optimization method with backpropagation to try to minimize $J(\Theta)$ as a function of parameters $\Theta$. 
   * For neural network, the cost function $J(\Theta)$ is non-convex, so theoretically the algorithm can be stuck in a local minimum. 



An example code for the cost function can be: 

```matlab
function [J grad] = nnCostFunction(nn_params, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, ...
                                   X, y, lambda)
%NNCOSTFUNCTION Implements the neural network cost function for a two layer
%neural network which performs classification
%   [J grad] = NNCOSTFUNCTON(nn_params, hidden_layer_size, num_labels, ...
%   X, y, lambda) computes the cost and gradient of the neural network. The
%   parameters for the neural network are "unrolled" into the vector
%   nn_params and need to be converted back into the weight matrices.
%
%   The returned parameter grad should be a "unrolled" vector of the
%   partial derivatives of the neural network.
%

% Reshape nn_params back into the parameters Theta1 and Theta2, the weight matrices
% for our 2 layer neural network
Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                 hidden_layer_size, (input_layer_size + 1));

Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                 num_labels, (hidden_layer_size + 1));

% Setup some useful variables
m = size(X, 1);

% You need to return the following variables correctly
J = 0;
Theta1_grad = zeros(size(Theta1));
Theta2_grad = zeros(size(Theta2));

X = [ones(m, 1) X];
Z = sigmoid(X * Theta1');
Z = [ones(size(Z, 1), 1) Z];
h = sigmoid(Z * Theta2');
yi = zeros(size(y, 1), num_labels);
for i = 1:size(y, 1)
  yi(i, y(i)) = 1;
end

for i = 1:num_labels
  J = J + sum(- yi(:, i) .* log(h(:, i)) - (1 - yi(:, i)) .* log(1 - h(:, i))) / m;
end

J = J + (sum(sum(Theta1(:, 2:end).^2)) + sum(sum(Theta2(:, 2:end).^2))) * lambda / 2 / m;


for t = 1:m
  a1 = X(t, :)';
  z2 = Theta1 * a1;
  a2 = [1; sigmoid(z2)];
  z3 = Theta2 * a2;
  a3 = sigmoid(z3);
  d3 = a3 - yi(t, :)';
  Theta2_grad = Theta2_grad + d3 * a2' / m;
  d2 = (Theta2' * d3) .* sigmoidGradient([1; z2]);
  d2 = d2(2:end);
  Theta1_grad = Theta1_grad + d2 * a1' / m;
end

Theta2_grad = Theta2_grad + lambda / m * Theta2;
Theta2_grad(:, 1) = Theta2_grad(:, 1) - lambda / m * Theta2(:, 1);
Theta1_grad = Theta1_grad + lambda / m * Theta1;
Theta1_grad(:, 1) = Theta1_grad(:, 1) - lambda / m * Theta1(:, 1);

% Unroll gradients
grad = [Theta1_grad(:) ; Theta2_grad(:)];

end
```



# Machine Learning System Design

## Evaluating a learning algorithm

### Debugging a learning algorithm

Suppose you have implemented regularized linear regression to predict housing prices. However, when you test your hypothesis on a new set of houses, you find that is makes unacceptably large errors in its predictions. What should you try next?

* Get more training examples
* Try smaller sets of features
* Try getting additional features
* Try adding polynomial features ($x_ 1^2, x_2^2, x_1x_2$, etc.)
* Try decreasing $\lambda$
* Try increasing $\lambda$



### Machine learning diagnostic

Diagnostic: A test that you can run to gain insight what is/isn't working with a learning algorithm, and gain guidance as to how best to improve its performance. 

Diagnostics can take time to implement, but doing so can be a very good use of your time. 



#### Evaluating a hypothesis

Training/testing procedure for linear regression

* Learn parameter $\theta$ from training data (minimizing training error $J(\theta)$)

* Compute test set error for linear regression:
  $$
  J_{test}(\theta) = \frac{1}{2m_{test}} \sum_{i=1}^{m_{test}} (h_\theta(x_{test}^{(i)}) - y_{test}^{(i)})^2
  $$

* 

Training/testing procedure for logistic regression

* Learn parameter $\theta$ from training data

* Compute test set error:
  $$
  J_{test}(\theta) = -\frac{1}{m_{test}} \sum_{i=1}^{m_{test}} y_{test}^{(i)} \log h_\theta(x_{test}^{(i)}) + (1-y_{test}^{(i)}) \log h_\theta(x_{test}^{(i)})
  $$

* 

* Or the misclassification error (aka. 0/1 misclassification error):
  $$
  err(h_\theta(x), y) = \begin{cases}
  1 & \text{if }h_\theta(x)\geq 0.5\text{ and }y = 0\text{ or } h_\theta(x) < 0.5\text{ and }y = 1\\
  0 & \text{otherwise}
  \end{cases}
  $$
  This gives us a binary 0 or 1 error result based on a misclassification. The average test error for the test set is:
  $$
  Test\ Error = \frac{1}{m_{test}}\sum_{i=1}^{m_{test}} err(h_\theta(x_{test}^{(i)}), y_{test}^{(i)})
  $$
  This gives us the proportion of the test data that was misclassified. 



#### Model selection and train/validation/test sets

Once parameters $\theta_0, \theta_1, \dots, \theta_n$ were fit to some set of data (training set), the error of the parameters as measured on that data (the training error $J(\theta)$) is likely to be lower than the actual generalization error. 

We thus to divide the data into three sets: 

* Training set

  * 60% of the data
  * with training error:

  $$
  J_{train}(\theta)=\frac{1}{2m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2
  $$

* Cross validation set 

  * 20% of the data
  * with cross validation error:

  $$
  J_{cv}(\theta)=\frac{1}{2m}\sum_{i=1}^{m_{cv}} (h_\theta(x^{(i)}_{cv}) - y^{(i)}_{cv})^2
  $$

* Testing set 

  * 20% of the data
  * with test error: 

  $$
  J_{test}(\theta)=\frac{1}{2m_{test}}\sum_{i=1}^{m_{test}} (h_\theta(x^{(i)}_{test}) - y^{(i)}_{test})^2
  $$

  

We can now calculate three separate error values for the three different sets using the following method:

1. Optimize the parameters in $\Theta$ using the training set for each polynomial degree.
2. Find the polynomial degree $d$ with the least error using the cross validation set.
3. Estimate the generalization error using the test set with $J_{test}(\Theta^{(d)})$. 



### Diagnosing bias vs. variance

Suppose your learning algorithm is performing less well than you were hoping. Is it a bias problem or variance problem?

* High bias (underfit):
  * $J_{train}(\theta)$ will be high
  * $J_{cv}(\theta)\approx J_{train}(\theta)$
  * If a learning algorithm is suffering from high bias, getting more training data will not (by itself) help much. 
    * Low training set size: causes $J_{train}(\Theta)$ to be low and $J_{cv}(\Theta)$ to be high.
    * Large training set size: causes both $J_{train}(\Theta)$ and $J_{cv}(\Theta)$ to be high with $J_{train}(\Theta)\approx J_{cv}(\Theta)$. 
* Variance (overfit):
  * $J_{train}(\theta)$ will be low
  * $J_{cv}(\theta) \gg J_{train}(\theta)$
  * If a learning algorithm is suffering from high variance, getting more training data is likely to help.
    * Low training set size: $J_{train}(\Theta)$ will be low and $J_{cv}(\Theta)$ will be high.
    * Large training set size: $J_{train}(\Theta)$ increases with training set size and $J_{cv}(\Theta)$ continues to decrease without leveling off. Also $J_{train}(\Theta)<J_{cv}(\Theta)$ but the difference between them remains significant. 



### Choosing the regularization parameter $\lambda$

In order to choose the model and regularization term $\lambda$, we need to:

1. Create a list of lambdas (i.e. $\lambda\in\{0,0.01,0.02,0.04,0.08,0.16,0.32,0.64,1.28,2.56,5.12,10.24\}$)
2. Create a set of models with different degrees or any other variants
3. Iterate through the $\lambda$s and for each $\lambda$ go through all the models to learn some $\Theta$. 
4. Compute the cross validation error using the learned $\Theta$ (computed with $\lambda$) on the $J_{cv}(\Theta)$ without regularization or $\lambda=0$. 
5. Select the best combo that produces the lowest error on the cross validation set. 
6. Using the best combo $\Theta$ and $\lambda$, apply it on $J_{test}(\Theta)$ to see if it has a good generalization of the problem. 



### Deciding what to do next revisited

* Get more training examples: fixes high variance
* Try smaller sets of features: fixes high variance
* Try getting additional features: fixes high bias
* Try adding polynomial features ($x_ 1^2, x_2^2, x_1x_2$, etc.): fixes high bias
* Try decreasing $\lambda$: fixes high bias
* Try increasing $\lambda$: fixes high variance



### Neural networks and overfitting

* "Small" neural network (fewer parameters; more prone to underfitting) 
  * Computationally cheaper.
* "Large" neural network (more parameters; more prone to overfitting) 
  * Computationally more expensive. 
  * Use regularization ($\lambda$) to address overfitting. 

* Using a single hidden layer is a good starting default. You can train your neural network on a number of hidden layers using your cross validation set. You can then select the one that performs best. 



## Machine learning system design: Spam classification example

### Prioritizing what to work on

Supervised learning. $x=$ features of email. $y=$ spam $(1)$ or not spam $(0)$. Features $x$: Choose 100 words indicative of spam / not spam. In practice, take most frequently occurring $n$ words (10000 to 50000) in training set, rather than manually pick 100 words. 





### Building a spam classifier

How to spend your time to make it have low error?

* Collect lots of data
  * E.g. "honeypot" project
* Develop sophisticated features based on email routing information (from email header). 
* Develop sophisticated features for message body, e.g. should "discount" and "discounts" be treated as the same word? How about "deal" and "Dealer"? Features about punctuation?
* Develop sophisticated algorithm to detect misspellings (e.g. m0rtgage, med1cine, w4tches.)



### Error analysis

#### Recommended approach

* Start with a simple algorithm that you can implement quickly. Implement it and test it on your cross-validation data.
* Plot learning curves to decide if more data, more features, etc. are likely to help. 
* Error analysis: Manually examine the examples (in cross validation set) that your algorithm made errors on. See if you spot any systematic trend in what type of examples it is making errors on. 



#### Error analysis example

$m_{CV}=500$ examples in cross validation set. Algorithm misclassifies 100 emails. Manually examine the 100 errors, and categorize them base on:

1. What type of email it is.
2. What cues (features) you think would have helped the algorithm classify them correctly.



### The importance of numerical evaluation

Should discount/discounts/discounted/discounting be treated as the same word? Can use "stemming" software (e.g. "porter stemmer"). It can hurt as well (universe/university). Error analysis may not be helpful for deciding if this is likely to improve performance. Only solution is to try it and see if it works. Need numerical evaluation (e.g., cross validation error) of algorithm's performance with and without stemming. 



## Handling skewed data

### Cancer classification example

Train logistic regression model $h_\theta(x)$. ($y=1$ if cancer, $y=0$ otherwise). Find that you got $1\%$ error on test set. However $0.50\%$ of patients have cancer. The number is too small so it create a skewed classes. (You can predict $y=0$ all the time to archive a error rate at $0.50\%$). 



### Precision/recall

$y=1$ in presence of rate class that we want to detect. 

* Precision $(P)$: of all patients where we predicted $y=1$, what fraction actually has cancer?
  $$
  \text{Precision} = \frac{\text{True positives}}{\text{\# predicted as positive}} = \frac{\text{True positives}}{\text{True positives} + \text{False positives}}
  $$

* Recall $(R)$: of all patients that actually have cancer, what fraction did we correctly detect as having cancer?
  $$
  \text{Recall} = \frac{\text{True positives}}{\#\text{actual positives} } = \frac{\text{True positives}}{\text{True positives} + \text{False negatives}}
  $$

| Predicted class \ Actual class |       1        |       0        |
| :----------------------------: | :------------: | :------------: |
|               1                | True positive  | False positive |
|               0                | False negative | True negative  |

A good classifier should have high precision and high recall. Even for a skew class, it is very difficult to cheat to a high precision and a high recall. 



### Trading off precision and recall

Logistic regression: $0\leq h_\theta(x)\leq 1$. Predict 1 if $h_\theta(x)\geq 0.5$, predict 0 if $h_\theta(x)<0.5$. 

* Suppose we want to predict $y=1$ only if we are very confident. Then we could only predict 1 if $h_\theta(x)\geq 0.7$. This gives a higher precision, lower recall. 
* Suppose we want to avoid missing too many cases of cancer (avoid false negatives). Then we could only predict 1 if $h_\theta(x)\geq 0.3$. This gives a higher recall, lower precision. 



#### $F_1$ score (F score)

How to compare precision / recall numbers? The $F_1$ score is: 
$$
2\frac{PR}{P+R}
$$
There are more way to compare precision and recall values other than $F_1$ score. 



## Data for machine learning

Assume feature $x\in \mathbb{R}^{n+1}$ has sufficient information to predict $y$ accurately. Useful test: Given the input $x$, can a human expert confidently predict $y$? 

Use a learning algorithm with many parameters (e.g. logistic regression / linear regression with many features; neural network with many hidden units), thus low bias algorithms. Use a very large training set (unlikely to overfit). 



# Large Margin Classification

## Support vector machine

Logistic regression:
$$
\min_\theta\frac{1}{m}\left[\sum_{i=1}^m y^{(i)}\left(-\log h_\theta(x^{(i)})\right) + (1 - y^{(i)})\left(-\log (1-h_\theta(x^{(i)})\right) \right] + \frac{\lambda}{2m}\sum_{j=1}^n \theta_j^2
$$
Support vector machine: 
$$
\min_\theta C\sum_{i=1}^m\left[y^{(i)} cost_1(\theta^Tx^{(i)}) + (1 - y^{(i)}) cost_0 (\theta^T x^{(i)})\right] + \frac{1}{2} \sum_{i=1}^n \theta_j^2
$$
Hypothesis: 

* If $y=1$, we want $\theta^T x\geq 1$ (not just $\geq 0$)
* If $y=0$, we want $\theta^T x\leq -1$ (not just $<0$)

If $C$ is very large, then the first term should must be $0$. Which gives the SVM decision boundary as below. The SVM is sometimes also called the large margin classification. 



### SVM decision boundary

$$
\begin{aligned}
\min_\theta & \frac{1}{2} \sum_{j=1}^n \theta_j^2 &\\
\text{s.t.} & \theta^T x^{(i)} \geq 1 & \text{if } y^{(i)}=1 \\
& \theta^T x^{(i)} \leq -1 & \text{if } y^{(i)} = 0
\end{aligned}
$$



## Kernels

Given $x$, compute new feature depending on proximity to landmarks $l^{(1)}, l^{(2)}, l^{(3)}, \dots$. We let:
$$
f_i = similarity(x, l^{(i)})=\exp(-\frac{\|x-l^{(i)}}\|{2\sigma^2})
$$
This similarity is called Gaussian kernels. 

If $x\approx l^{(i)}$: 
$$
f_i \approx \exp(-\frac{0}{2\sigma^2}) = 1
$$
If $x$ is far from $l^{(1)}$:
$$
f_i = \exp(-\frac{(\text{large number})^2}{2\sigma^2})\approx 0
$$
We predict "1" when 
$$
\theta_0 + \theta_1f_1 + \theta_2f_2 + \dots + \theta_nf_n \geq 0
$$
Then the decision boundary will be close to the $l^{(i)}$ where $\theta_{(i)}$ is large. 



### Choosing the landmarks

We can choose to put landmark at exact where the training examples are. Concretely: 

Given $(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}),\dots ,(x^{(m)}, y^{(m)})$. Choose $l^{(1)}=x^{(1)}, l^{(2)} = x^{(2)}, \dots, l^{(m)}=x^{(m)}$. Given example $x$: 
$$
f_i=similarity(x, l^{(i)})
$$
and let 
$$
f=\begin{bmatrix}
f_0 \\f_1 \\f_2 \\\vdots\\f_m
\end{bmatrix},\quad \text{where } f_0 = 1
$$
For training example $(x^{(i)}, y^{(i)})$:
$$
x^{(i)}\quad\Rightarrow\quad \begin{matrix}
f_1^{(i)} = sim(x^{(i)}, l^{(1)}) &\\
f_2^{(i)} = sim(x^{(i)}, l^{(2)}) &\\
\vdots \\
f_i^{(i)} = sim(x^{(i)}, l^{(i)})&=\exp(0)=1 \\
\vdots\\
f_m^{(i)} = sim(x^{(i)}, l^{(m)})& \\
\end{matrix} \quad \Rightarrow\quad f^{(i)}=\begin{bmatrix}
f_0^{(i)} \\
f_1^{(i)} \\
\vdots\\
f_m^{(i)}
\end{bmatrix}
$$


Hypothesis: Given $x$, compute features $f\in\mathbb{R}^{m+1}$, predict $y=1$ if $\theta^T f\geq 0$. 

Training: 
$$
\min_\theta C\sum_{i=1}^m\left[ y^{(i)} cost_1(\theta^T f^{(i)}) + (1-y^{(i)})cost_0(\theta^T f^{(i)})\right] + \frac{1}{2}\sum_{j=1}^m \theta_j^2
$$


## SVM parameters

$C=\frac{1}{\lambda}$:

* Large $C$: Lower bias, higher variance.
* Small $C$: Higher bias, lower variance.



$\sigma^2$:

* Large $\sigma^2$: Features $f_i$ vary more smoothly. 
  * Higher bias, lower variance.
* Smaller $\sigma^2$: Features $f_i$ vary less smoothly. 
  * Lower bias, higher variance.





## SVM in practice

Use SVM software package (e.g. liblinear, libsvm, ...) to solve for paramters $\theta$. Need to specify:

* Choice of parameter $C$.
* Choice of kernel (similarity function).
  * E.g. no kernel ("linear kernel"): Predict $y=1$ if $\theta^T x\geq 0$. 
    * You can do this when you have a large number of features but a small training set. You want to try to avoid over-fitting. 
  * E.g. Gaussian kernel
    * Need to choose $\sigma^2$. 



### Kernel functions in code

```octave
function f = kernel(x1, x2)
	f = exp(-norm(x1-x2)^2 / 2 / sigma^2);
```

Note: Do perform feature scaling before using the Gaussian kernel. 



### Other choices of kernel

Not all similarity functions make valid kernels. Need to satisfy technical condition called "Mercer's theorem" to make sure SVM packages' optimizations run correctly, and do not diverge. 

Many off-the-shelf kernel available: 

* Polynomial kernel: $k(x, l)= (x^Tl + \text{constant})^{\text{degree}}$.
* More esoteric: String kernel, chi-square kernel, histogram intersection kernel, ...



### Multi-class classification

Many SVM packages already have built-in multi-class classification functionality. Otherwise, use one-vs-all method. Train $K$ SVMs, one to distinguish $y=i$ from the rest, for $i=1,2,\dots, K$, get $\theta^{(1)}, \theta^{(2)},\dots, \theta^{(K)}$. Pick class $i$ with largest $(\theta^{(i)})^Tx$. 



## Logistic regression vs. SVMs

$n=$ number of features ($x\in \mathbb{R}^{n+1})$, $m=$ number of training examples.

* If $n$ is large (relative to $m$):
  * E.g. $n\geq m, n=10000, m=10\dots 1000$.
  * Use logistic regression, or SVM without a kernel ("linear kernel").

* If $n$ is small, $m$ is intermediate:
  * E.g. $n=1\dots 1000, m=10\dots 10000\sim 50000$.
  * Use SVM with Gaussian kernel.

* If $n$ is small, $m$ is large:
  * E.g. $n=1\dots 1000, m=50000+$.
  * SVM will be slow to run. 
  * Create/add more features, then use logistic regression or SVM without a kernel.

* Neural network likely to work well for most of these settings, but may be slower to train. 
  * The SVM gives a convex optimization problem so the numerical algorithm will always gives a global minima. This is a advantage of SVM over neural network. 





# Unsupervised Learning Introduction

## Clustering

Clustering is an example of unsupervised learning. In unsupervised learning, you are given an unlabeled dataset and are asked to find "structure" in the data. 



### Applications of clustering

* Market segmentation
* Social network analysis
* Organize computing clusters
* Astronomical data analysis



### K-means algorithm

Input:

* $K$ (number of clusters).
* Training set $\{x^{(1)}, x^{(2)}, \dots, x^{(m)}\}$. $x^{(i)}\in \mathbb{R}^n$, drop $x_0=1$ convention. 

The algorithm:

Randomly initialize $K$ cluster centroids $\mu_1, \mu_2, \dots, \mu_K\in \mathbb{R}^n$.

Repeat {

​	for i = 1 to m

​		$c^{(i)} :=$ index (from 1 to $K$) of cluster centroid closest to $x^{(i)}$. 

​		This means: $c^{(i)}=\arg\min_k \|x^(i)- \mu_k\|^2$

​	for k = 1 to $K$

​		$\mu_k :=$ average of points assigned to cluster $k$.

}

If there is a cluster with no point assigned to it. Commonly we can eliminate it. Or sometimes we can recreate a new one randomly. 



### Optimization objective for K-means algorithm

$c^{(i)} =$ index of cluster ($1, 2, \dots, K$) to which example $x^{(i)}$ is currently assigned

$u_k=$ cluster centroid $k$ ($\mu_k\in \mathbb{R}^n$)

$\mu_{c^{(i)}}=$ cluster centroid of cluster to which example $x^{(i)}$ has been assigned

The optimization objective: 
$$
J(c^{(1)}, \dots, c^{(m)}, \mu_1, \dots, \mu_K) = \frac{1}{m} \sum_{i=1}^m \|x^{(i)} - \mu_{c^{(i)}}\|^2
$$

$$
\min J(c^{(1)}, \dots, c^{(m)}, \mu_1, \dots, \mu_K)
$$



### Random initialization for K-means algorithm

Should have $K<m$. Randomly pick $K$ training examples. Set $\mu_1,\dots,\mu_K$ equal to these $K$ examples. 





#### Local optima

There is a possibility that the K-means stuck at the local optima. To avoid this, we can run K-means with different random initializations for 1 - 100 times, then pick clustering that gave lowest cost $J$. This method works pretty well when the number of clusters is small, 2 - 10. With a very large number of clusters, > 1000, running multiple times often does not help. 



### Choosing the number of clusters

The most common thing to do is actually to choose the number of clusters manually by looking at the data graphically or statistically. 

Sometimes, you're running K-means to get clusters to use for some later/downstream purpose. Evaluate K-means based on a metric for how well it performs for that later purpose. 









# Dimensionality reduction

## Motivation

### Data compression

If you have a highly correlated features, you may want to reduce the dimension. Suppose we apply dimensionality reduction to a dataset of $m$ examples $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}$, where $x^{(i)} \in \mathbb{R}^n$. As a result of this, we will get out a lower dimension dataset $\{z^{(1)}, z^{(2)},\dots, z^{(m)} \}$ of $m$ examples where $z^{(i)}\in \mathbb{R}^k$ for some value of $k$ and $k\leq n$. 



### Visualization

To visualize a data, we need to apply dimensionality reduction so that the plotted data has dimension 2 or 3 since we can plot 2D or 3D but don't have ways to visualize higher dimensional data. 



## Principal component analysis (PCA)

Find a direction onto which to project the data so as to minimize the projection error. Reduce from $n$-dimension to $k$-dimension: Find $k$ vectors $u^{(1)}, u^{(2)}, \dots, u^{(k)}$ onto which project project the data, so as to minimize the projection error. 



### PCA is not linear regression

For example, in 2D, we have a problem $x\mapsto y$. The linear regression is to minimize $|f(x)-y|$ for some linear function $f$. PCA finds a vector pointing a line that minimize the projection distance between point $(x,y)$ and some linear function $f$. 



### PCA algorithm

Training set: $x^{(1)}, x^{(2)}, \dots, x^{(m)}$

Preprocessing (feature scaling/mean normalization):
$$
\mu_j = \frac{1}{m} \sum_{i=1}^m x_j^{(i)}
$$
Replace each $x_j^{(i)}$ with $x_j-\mu_j$. If different features on different scales (e.g., $x_1=$ size of house, $x_2=$ number of bedrooms), scale features to have comparable range of values by
$$
x^{(i)}_j = \frac{x_j^{(i)} - \mu_j}{s_j}
$$
Here $s_j$ is some measure of range of values, it can be the maximum value or the standard derivation of $x_j$. 

Then we compute the covariance matrix:
$$
\Sigma = \frac{1}{m}\sigma_{i=1}^n (x^{(i)})(x^{(i)})^T
$$
Then compute the eigenvectors of matrix $\Sigma$ for example with Octave:

```octave
[U, S, V] = svd(Sigma);
```

Here
$$
U = \begin{bmatrix}
|&|& & | \\
u^{(1)} & u^{(2)} & \dots & u^{(n)} \\
|&|& & |
\end{bmatrix}\in \mathbb{R}^{n\times n}
$$
We are going to take out the first $k$ columns of the matrix $U$ and call it $U_{reduce}$. Then we have
$$
z=U_{reduce}^Tx
$$


### Reconstruction from compressed representation

$$
x_{approx}=U_{reduce}\cdot z
$$



## Applying PCA

### Choosing the number of principal components $k$

Average squared projection error: $\frac{1}{m} \sum_{i=1}^m \|x^{(i)} - x_{approx}^{(i)}\|^2$.

Total variation in the data: $\frac{1}{m}\sum_{i=1}^m \|x^{(i)}\|^2$

Typically, choose $k$ to be the smallest value so that
$$
\frac{\text{average squared project error}}{\text{Total variation in the data}}\leq 0.01 = 1\%
$$
"99% of variance is retained". It can be 95% or 90% as well. 

Algorithm:

1. Try PCA with $k=1, 2, 3, \dots$, compute $U_{reduce}, x_{approx}$ then check if the inequality holds. This algorithm is slow.

2. With the Octave code `[U, S, V] = svd(Sigma)`, we get the matrix `S`, then the inequality above can be expressed as:
   $$
   \frac{\sum_{i=1}^k S_{ii}}{\sum_{i=1}^n S_{ii}}\geq 0.99
   $$



### Advice for applying PCA

#### Supervised learning speedup

Mapping $x^{(i)}\mapsto z^{(i)}$ should be defined by running PCA only on the training set. This mapping can be applied as well to the examples $x_{cv}^{(i)}$ and $x_{test}^{(i)}$ in the cross validation and test sets. 



#### Bad use of PCA: To prevent overfitting

Use $z^{(i)}$ instead of $x^{(i)}$ to reduce the number of features to $k<n$. Thus, fewer features, less likely to overfit. 

This might work OK, but isn't a good way to address overfitting. Use regularization instead. 





#### PCA is sometimes used where it shouldn't be

Design of ML system:

* Get training set
* Run PCA to reduce $x^{(i)}$ in dimension to get $z^{(i)}$
* Train logistic regression on the data
* Test on test sets. 

How about doing the whole thing without using PCA? Before implementing PCA, first try running whatever you want to do with the original/raw data $x^{(i)}$. Only if that doesn't do what you want, then implement PCA and consider using $z^{(i)}$. 





# Anomaly Detection



## Density Estimation

### Problem motivation

#### Anomaly detection example

 Aircraft engine features:

* $x_1=$ heat generated
* $x_2 =$ vibration intensity
* ...

Dataset: $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}$. We get a new engine $x_{test}$, is it anomalous?



#### Fraud detection

$x^{(i)}=$ features of user $i$'s activities. Model $p(x)$ from data. Identify unusual users by checking which have $p(x) < \epsilon$. 



#### Monitoring computers in a data center

* $x^{(i)}=$ features of machine $i$
* $x_1 =$ memory use
* $x_2=$ number of disk accesses/sec
* $x_3=$ CPU load
* $x_4=$ CPU load / network traffic
* ...



### Gaussian distribution

Say $x\in \mathbb{R}$. If $x$ is a distributed Gaussian with mean $\mu$, variance $\sigma^2$. 
$$
x\sim \mathcal{N}(\mu, \sigma^2)
$$

$$
p(x; \mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma} \exp(-\frac{(x-\mu)^2}{2\sigma^2})
$$



#### Parameter estimation

Dataset: $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}, x^{(i)}\in \mathbb{R}$. 
$$
\mu=\frac{1}{m}\sum_{i=1}^m x^{(i)}
$$

$$
\sigma^2 = \frac{1}{m}\sum_{i=1}^m (x^{(i)}-\mu)^2
$$



### Algorithm

#### Density estimation

Training set: $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}, x^{(i)}\in \mathbb{R}$. 
$$
p(x)=p(x_1; \mu_1, \sigma_1^2)p(x_2; \mu_2, \sigma_2^2)\dots p(x_n; \mu_n, \sigma_n^2)=\prod_{j=1}^n p(x_j; \mu_j, \sigma_j^2)
$$
Even if this independence assumption doesn't hold, this algorithm works fine. 



#### Anomaly detection algorithm

1. Choose features $x_i$ that you think might be indicative of anomalous examples. 

2. Fit parameters $\mu_j, \sigma_ j^2$.
   $$
   \mu_j=\frac{1}{m}\sum_{i=1}^m x_j^{(i)}
   $$

   $$
   \sigma^2_j = \frac{1}{m}\sum_{i=1}^m (x_j^{(i)}-\mu_j)^2
   $$

3. Given new examples $x$, compute $p(x)$. Anomaly if $p(x)<\epsilon$. 
   $$
   p(x)=\prod_{j=1}^n p(x_j; \mu_j, \sigma_j^2)
   $$



## Building an anomaly detection system

### Developing and evaluating an anomaly detection system

The importance of real-number evaluation: When developing a learning algorithm (choosing features, etc.), making decisions is much easier if we have a way of evaluating our learning algorithm. 

Assume we have some labeled data, of anomalous and non-anomalous examples. ($y=0$ if normal, $y=1$ is anomalous). 

* Training set: $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}$ (assume normal examples / not anomalous)

* Cross validation set: $\{(x^{(1)}_{cv}, y^{(1)}_{cv}),\dots, (x^{(m)}_{cv}, y^{(m)}_{cv}) \}$.
* Test set: $\{(x^{(1)}_{test}, y^{(1)}_{test}),\dots, (x^{(m)}_{test}, y^{(m)}_{test}) \}$.



#### Aircraft engines motivating example

* 10000 good (normal) engines.
* 20 flawed engines (anomalous).
* Training set: 6000 good engines.
* CV: 2000 good engines, 10 anomalous.
* Test: 2000 good engines, 10 anomalous. 



#### Algorithm evaluation

Fit model $p(x)$ on training set $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}$. 

On a cross validation / test $x$, predict 
$$
y=\begin{cases} 
1&\text{ if } p(x)< \epsilon\text{ (anomaly)}\\
0&\text{ if } p(x)\geq \epsilon\text{ (normaly)}\\
\end{cases}
$$
Possible evaluation metrics: 

* True positive, false positive, false negative, true negative
* Precision / Recall
* F1-score
* Accuracy not good since the dataset is very skewed

Can also use cross validation set to choose parameter $\epsilon$. 



### Anomaly detection vs Supervised learning

#### Use anomaly detection when

* Very small number of positive examples (0 - 20 is common).
* Large number of negative examples. 
* Many different "types" of anomalies. Hard for any algorithm to learn from positive examples what the anomalies look like; future anomalies may look nothing like any of the anomalous examples we've seen so far. 



#### Anomaly detection is used for

* Fraud detection
* Manufacturing (e.g. aircraft engines)
* Monitoring machines in a data center
* ...



#### Use supervised learning when

* Large number of positive and negative examples.
* Enough positive examples for algorithm to get a sense of what positive examples are like, future positive examples likely to be similar to ones in training set. 



#### Supervised learning is used for

* Email spam classification
* Weather prediction (sunny / rainy / etc.)
* Cancer classification
* ...





### Choosing what features to use

If the features $x^{(i)}$ are not Gaussian-like, then we can map $x^{(i)}$ to the following data to make it Gaussian-like: 

* $\log(x)$

* $x^{0.5}$
* $x^{0.2}$
* $x^{0.05}$
* ...



#### Error analysis for anomaly detection

Want $p(x)$ large for normal examples $x$, want $p(x)$ small for anomalous examples $x$. 

Most common problem:

* $p(x)$ is comparable (say, both large) for normal and anomalous examples. 

Try coming up with more features to distinguish between the normal and the anomalous examples. It sometimes can be found from the anomaly example. 

For example: You have two features $x_1 =$ vibration intensity, and $x_2 =$ heat generated. Both $x_1$ and $x_2$ take on values between $0$ and $1$ (and are strictly greater than 0), and for most "normal" engines you expect that $x_1 \approx x_2$.  One of the suspected anomalies is that a flawed engine may vibrate very intensely even without generating much heat (large $x_1$, small $x_2$), even though the particular values of $x_1$ and $x_2$ may not fall outside their typical ranges of values. An additional feature $x_3$ can be 
$$
x_3=\frac{x_1}{x_2}
$$


When choosing features for an anomaly detection system, it is a good idea to look for features that take on unusually large or small values for (mainly the) anomalous examples. 

## Multivariate Gaussian distribution

### Multivariate Gaussian distribution

$x\in \mathbb{R}^n$. Don't model $p(x_1),p(x_2),\dots,$ etc. separately. Model $p(x)$ all in one go.

Parameters: $\mu\in\mathbb{R}^n, \Sigma\in \mathbb{R}^{n\times n}$ (Covariance matrix)
$$
p(x;\mu,\Sigma)=\frac{1}{(2\pi)^{n/2} |\Sigma|^{1/2}} \exp\left(-\frac{1}{2}(x-\mu)^T \Sigma^{-1}(x-\mu)\right)
$$
Here $|\Sigma|$ is the determinant of $\Sigma$. 



### Anomaly detection using the Multivariate Gaussian distribution

Parameter fitting: Given training set $\{x^{(1)}, x^{(2)},\dots, x^{(m)} \}$
$$
\mu=\frac{1}{m} \sum_{i=1}^m x^{(i)}
$$

$$
\Sigma=\frac{1}{m} \sum_{i=1}^m (x^{(i)} - \mu)(x^{(i)}-\mu)^T
$$



#### The algorithm

1. Fit model $p(x)$ by setting $\mu$ and $\Sigma$ to the value above.
2. Given a new example $x$, compute $p(x)$ with $\mu$ and $\Sigma$ above. 
3. Flag an anomaly if $p(x)< \epsilon$.



#### Relationship to original model

The original model $p(x)=\prod p(x_i)$ is a special case of the multivariate Gaussian distribution with the constraint 
$$
\Sigma = \begin{bmatrix}
\sigma_1^2 & 0 & 0 & \dots & 0 \\
0 & \sigma_2^2 & 0 &\dots & 0 \\
0 & 0 & \sigma_3^2 & \dots & 0 \\
\vdots & \vdots & \vdots & \ddots & 0\\
0 & 0 & 0 & \dots &\sigma_n^2
\end{bmatrix}
$$
This means that the contours of $p(x; \mu,\Sigma)$ are axis-aligned. 



#### Original model vs. Multivariate Gaussian

##### Use original model when

* Manually create features to capture anomalies where $x_1, x_2, \dots$ take unusual combinations of values. 
* Computationally cheaper. Scales better to large $n$. ($\sim100,000$).
* Works OK even if $m$ (training set size) is small.



##### Use multivariate Gaussian model

* Automatically captures correlations between features. 
* Computationally more expensive. 
* Must have $m>n$, or else $\Sigma$ is non-invertible. Better with $m\geq 10n$. 
* If you have redundant features, $\Sigma$ will be non-invertible. 



# Recommender Systems

## Predicting movie ratings

### Problem formulation

User rates movies using zero to five stars. 

* $n_u =$ number of users
* $n_m=$ number of movies
* $r(i,j)=1$ if user $j$ has rated movie $i$
* $y^{(i,j)}=$ rating given by user $j$ to movie $i$ (defined only if $r(i,j)=1$)



### Content based recommendations

For example:

|        Movie         | Alice (1) $\theta^{(1)}$ | Bob (2) $\theta^{(2)}$ | Carol (3) $\theta^{(3)}$ | Dave (4) $\theta^{(4)}$ | $x_1$ (romance) | $x_2$ (action) |
| :------------------: | :----------------------: | :--------------------: | :----------------------: | :---------------------: | :-------------: | :------------: |
|     Love at last     |            5             |           5            |            0             |            0            |       0.9       |       0        |
|   Romance forever    |            5             |           ?            |            ?             |            0            |       1.0       |      0.01      |
| Cute puppies of love |            ?             |           4            |            0             |            ?            |      0.99       |       0        |
|  Nonstop car chases  |            0             |           0            |            5             |            4            |       0.1       |      1.0       |
|   Swords vs karate   |            0             |           0            |            5             |            ?            |        0        |      0.9       |

For each user $j$, learn a parameter $\theta^{(j)}\in \mathbb{R}^3$. Predict user $j$ as rating movie $i$ with $(\theta^{(j)})^Tx^{(i)}$ stars. Here $x_0 = 1$. Here we are basically doing linear regression on each users separately. 



#### Problem formulation

* $\theta^{(i)} =$ parameter vector for user $j$. $\theta^{(j)}\in \mathbb{R}^{n+1}$

* $x^{(i)}=$ feature vector for movie $i$.

* For user $j$, movie $i$, predicted rating: $(\theta^{(j)})^Tx^{(i)}$. 

* $m^{(j)}=$ number of movies rated by user $j$. 

* To learn $\theta^{(j)}$ (parameter for user $j$)
  $$
  \min_{\theta^{(j)}} \frac{1}{2m^{(j)}} \sum_{i:r(i,j)=1} \left((\theta^{(j)})^T(x^{(i)}) - y^{(i,j)}\right)^2 + \frac{\lambda}{2m^{(j)}} \sum_{k=1}^n\left(\theta_k^{(j)}\right)^2
  $$

* To learn all $\theta^{(j)}$:
  $$
  \min_{\theta^{(1)},\dots,\theta^{(n_u)}} \frac{1}{2} \sum_{j=1}^{n_u}  \sum_{i:r(i,j)=1} \left((\theta^{(j)})^T(x^{(i)}) - y^{(i,j)}\right)^2 + \frac{\lambda}{2} \sum_{j=1}^{n_u} \sum_{k=1}^n\left(\theta_k^{(j)}\right)^2
  $$



#### Optimization algorithm

Gradient descent update: 
$$
\theta^{(j)}_k := \theta^{(j)}_k - \alpha \sum_{i:r(i,j)=1} \left( (\theta^{(j)})^T x^{(i)} - y^{(i,j)} \right)x^{(i)}_k\quad\text{ for }k=0
$$

$$
\theta^{(j)}_k := \theta^{(j)}_k - \alpha \left(\sum_{i:r(i,j)=1}  \left( (\theta^{(j)})^T x^{(i)} - y^{(i,j)} \right)x^{(i)}_k + \lambda\theta^{(j)}_k \right)\quad\text{ for }k\ne 0
$$





## Collaborative filtering

We might not have all the features at hand. We can learn the features by letting each user gives their preferences. 



### Optimization algorithm

Given $\theta^{(1)}, \dots,\theta^{(n_u)}$, to learn $x^{(i)}$: 
$$
\min_{x^{(i)}} \frac{1}{2} \sum_{j:r(i,j)=1} \left( (\theta^{(j)})^Tx^{(i)} - y^{(i,j)} \right)^2 + \frac{\lambda}{2}\sum_{k=1}^n \left( x_k^{(i)} \right)^2
$$
Given $\theta^{(1)}, \dots,\theta^{(n_u)}$, to learn $x^{(1)}, \dots,x^{(n_m)}$:
$$
\min_{x^{(1)},\dots, x^{(n_m)}} \frac{1}{2} \sum_{i=1}^{n_m} \sum_{j:r(i,j)=1} \left( (\theta^{(j)})^Tx^{(i)} - y^{(i,j)} \right)^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m} \sum_{k=1}^n \left( x_k^{(i)} \right)^2
$$


#### Collaborative filtering

Given $x^{(1)}, \dots,x^{(n_m)}$ (and movie ratings) can estimate $\theta^{(1)}, \dots,\theta^{(n_u)}$.

Given $\theta^{(1)}, \dots,\theta^{(n_u)}$ (and movie ratings) can estimate $x^{(1)}, \dots,x^{(n_m)}$. 

If we have none of them, we can begin with a random $\theta$, then compute $x$, then compute new $\theta$ again, and $x$ again, and again. Until we have a good result. 



### Collaborative filtering algorithm

Minimizing $x^{(1)}, \dots,x^{(n_m)}$ and $\theta^{(1)}, \dots,\theta^{(n_u)}$ simultaneously:
$$
J(x^{(1)}, \dots,x^{(n_m)}, \theta^{(1)}, \dots,\theta^{(n_u)})=\frac{1}{2} \sum_{(i,j): r(i,j)=1} \left( (\theta^{(j)})^T x^{(i)} - y^{(i,j)} \right)^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m} \sum_{k=1}^n \left( x_k^{(i)} \right)^2 + \frac{\lambda}{2} \sum_{j=1}^{n_u} \sum_{k=1}^n \left( \theta_k^{(j)} \right)^2
$$
Then we want
$$
\min J
$$
This is similarly to the iterative process above. 



#### The algorithm

1. Initialize $x^{(1)}, \dots,x^{(n_m)}, \theta^{(1)}, \dots,\theta^{(n_u)}$ to small random values. 

   * This serves as symmetry break (similar to the random initialization of a neural network's parameters) and ensures the algorithm learns features $x^{(1)}, \dots, x^{(n_m)}$ that are different from each other. 

2. Minimize $J(x^{(1)}, \dots,x^{(n_m)}, \theta^{(1)}, \dots,\theta^{(n_u)})$ using gradient descent (or an advanced optimization algorithm). E.g. for every $j=1,\dots, n_u, i=1,\dots, n_m$:
   $$
   x_k^{(i)} := x_k^{(i)}-\alpha \left(\sum_{i:r(i,j)=1}  \left( (\theta^{(j)})^T x^{(i)} - y^{(i,j)} \right)\theta^{(j)}_k + \lambda x^{(i)}_k  \right)
   $$

   $$
   \theta_k^{(j)} := \theta_k^{(j)}-\alpha \left(\sum_{i:r(i,j)=1}  \left( (\theta^{(j)})^T x^{(i)} - y^{(i,j)} \right)x^{(i)}_k + \lambda \theta^{(j)}_k  \right)
   $$

3. For a user with parameters $\theta$ and a movie with (learned) features $x$, predict a star rating of $\theta^Tx$. 



## Low rank matrix factorization

### Vectorization

Predicted ratings:
$$
Y = \begin{bmatrix}
(\theta^{(1)})^T(x^{(1)}) & (\theta^{(2)})^T(x^{(1)}) & \dots & (\theta^{(n_u)})^T(x^{(1)}) \\
(\theta^{(1)})^T(x^{(2)}) & (\theta^{(2)})^T(x^{(2)}) & \dots & (\theta^{(n_u)})^T(x^{(2)}) \\
\vdots & \vdots & \ddots & \vdots \\
(\theta^{(1)})^T(x^{(n_m)}) & (\theta^{(2)})^T(x^{(n_m)}) & \dots & (\theta^{(n_u)})^T(x^{(n_m)}) \\
\end{bmatrix}
$$
Given 
$$
x=\begin{bmatrix}
-& (x^{(1)})^T&- \\
-& (x^{(2)})^T&- \\
&\vdots &\\
-& (x^{(n_m)})^T&- \\
\end{bmatrix},\ \quad\quad \Theta=\begin{bmatrix}
-& (\theta^{(1)})^T&- \\
-& (\theta^{(2)})^T&- \\
&\vdots &\\
-& (\theta^{(n_u)})^T&- \\
\end{bmatrix}
$$
Then 
$$
Y=X\Theta^T
$$
This is called the low rank matrix factorization. 



#### Finding related movies

For each product $i$, we learn a feature vector $x^{(i)}\in \mathbb{R}^n$. How to find movies $j$ related to movie $i$? Small $\|x^{(i)} - x^{(j)}\| \rightarrow$ movie $i$ and $j$ are "similar".



### Implementational detail: mean normalization

We normalize each movie to make them have a average rating of zero. We call the average $\mu$. Then for user $j$, on movie $i$ predict: 
$$
(\theta^{(j)})(x^{(i)}) + \mu_i
$$
Then for the user that doesn't rated a movie, we shall predict that the user might give the average rating instead of zero. This is more reasonable. 



# Large Scale Machine Learning



## Gradient descent with large datasets

### Learning with large datasets

"It's not who has the best algorithm that wins. It's who has the most data."

Let's say that your dataset has the training set size $m=100,000,000$. This is realistic nowadays. How can you tell if using all of the data is likely to perform much better than using  a small subset of the data (say $m=1,000$)? We can plot a learning curve for a range of values of $m$ and verify that the algorithm has high variance when $m$ is small. 





### Stochastic gradient descent

* Batch gradient descent: You need to look at all the training data for each gradient descent step. 



Cost function for stochastic gradient descent:
$$
cost(\theta, (x^{(i)}, y^{(i)})) = \frac{1}{2} (h_\theta(x^{(i)}) - y^{(i)})^2
$$

$$
J_{train}(\theta) = \frac{1}{m} \sum_{i=1}^m cost(\theta, (x^{(i)}, y^{(i)}))
$$

1. Randomly shuffle dataset. 

2. Repeat {

   ​	for i = 1, ..., m {
   $$
   \theta_j := \theta_j - \alpha (h(x^{(i)}) - y^{(i)})\cdot x_j^{(i)}\quad\text{ for } j=0,\dots, n
   $$
   ​	}

   }

   The changing part is the first-order derivative of the cost function of stochastic gradient descent. 



The stochastic gradient descent gives a result that is not really at the global minimum but closes to it. The cost function might not even go down with every iteration. However, in practice, this works fine. 

Stochastic gradient descent might take 1 - 10 passes depends on your training set size. 





### Mini-batch gradient descent

* Batch gradient descent: Use all $m$ examples in each iteration.

* Stochastic gradient descent: Use 1 examples in each iteration.

* Mini-batch gradient descent: Use $b$ examples in each iteration. 

  * $b=$ mini-batch size

  * Typical mini-batch size: 2 - 100

  * For $b=10$, we have 10 examples: $(x^{(i)}, y^{(i)}), \dots, (x^{(i+9)}, y^{(i+9)})$.
    $$
    \theta_j := \theta_j - \alpha \frac{1}{10} \sum_{k=i}^{i+9} (h_\theta(x^{(k)})-y^{(k)})\cdot x^{(k)}_j \\
    \text{for every } j= 0,\dots, n
    $$
    Then $i := i + 10$. 

  * This algorithm can sometimes be even faster than the stochastic gradient descent with good vectorization and good choice of $b$. 



### Stochastic gradient descent convergence

* For batch gradient descent, we plot $J_{train}(\theta)$ as a function of the number of iterations of gradient descent. If it is decreasing, then it is converging. 
  * But you don't want to pause your computation regularly if you have a very large training set. 
* For stochastic gradient descent: During learning, compute $cost(\theta, (x^{(i)}, y^{(i)}))$ before updating $\theta$ using $(x^{(i)}, y^{(i)})$. 
  * Say for every 1000 iterations, plot $cost(\theta, (x^{(i)}, y^{(i)}))$ averaged over the last 1000 examples processed by algorithm. 
  * If you want the stochastic gradient descent to converge to the global minimum, you can slowly decrease $\alpha$ over time. (e.g. $\alpha=\frac{\text{constant 1}}{\text{iterationNumber} + \text{constant 2}})$. 





## Online learning

For example, shipping service website where user comes, specifies origin and destination, you offer to ship their package for some asking price, and users sometimes choose to use your shipping service ($y=1$), sometimes not ($y=0$). 

If you have a large steam of data, then this online learning algorithm is pretty effective. If you do not have enough data, then save them and perform a regular learning. The online learning algorithm can adopt to changing user preferences. 

Features $x$ capture properties of user, of origin / destination and asking price. We want to learn $p(y=1|x; \theta)$ to optimize price. 

The algorithm:

Repeat forever {

​	Get $(x, y)$ corresponding to user. $x$ is the features, $y$ is whether the user use our shipping or not. 

​	Update $\theta$ using $(x,y)$: 

​		$\theta_j := \theta_j - \alpha (h_\theta(x)-y)\cdot x_j$ for $(j=0,\dots, n)$

​		Then we discard the data $(x,y)$. 

}



Other online learning example: Product search (learning to search).

* User searches for "Andorid phone 1080p camera"
* Have 100 phones in store. Will return 10 results. 
* $x=$ features of phone, how many words in user query match name of phone, how many words in query match description of phone, etc. 
* $y=1$ if user clicks on link. $y=0$ otherwise. 
* Learn $p(y=1|x; \theta)$. 
* Use to show user the 10 phones they're most likely to click on. 



## Map reduce and data parallelism

### Map-reduce

Batch gradient descent example: 
$$
\theta_j := \theta_j - \alpha \frac{1}{400} \sum_{i=1}^{400} (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)}
$$

* Machine 1: Use $(x^{(1)}, y^{(1)}),\dots, (x^{(100)}, y^{(100)})$. 

  * Get $temp_j^{(1)} = \sum_{i=1}^{100} (h_\theta(x^{(i)})-y^{(i)})\cdot x_j^{(i)}$

* Machine 2: Use $(x^{(101)}, y^{(101)}),\dots, (x^{(200)}, y^{(200)})$.

  * Get $temp_j^{(2)} = \sum_{i=101}^{200} (h_\theta(x^{(i)})-y^{(i)})\cdot x_j^{(i)}$.

* Machine 3: Use $(x^{(201)}, y^{(201)}),\dots, (x^{(300)}, y^{(300)})$. 

  * Get $temp_j^{(3)} = \sum_{i=201}^{300} (h_\theta(x^{(i)})-y^{(i)})\cdot x_j^{(i)}$

* Machine 4: Use $(x^{(301)}, y^{(301)}),\dots, (x^{(400)}, y^{(400)})$.

  * Get $temp_j^{(3)} = \sum_{i=301}^{400} (h_\theta(x^{(i)})-y^{(i)})\cdot x_j^{(i)}$.

* Master server combines these data: 
  $$
  \theta_j := \theta_j - \alpha \frac{1}{400} (temp_j^{(1)} + temp_j^{(2)} + temp_j^{(3)}+ temp_j^{(4)})
  $$



### Map-reduce and summation over the training set

Many learning algorithms can be expressed as computing sums of functions over the training set. E.g. for advanced optimization, with logistic regression, need: 
$$
J_{train}(\theta)= -\frac{1}{m}\sum_{i=1}^m y^{(i)}\log h_\theta(x^{(i)}) - (1-y^{(i)}) \log (1- h_\theta(x^{(i)}))
$$

$$
\frac{\partial }{\partial \theta_j} J_{train}(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta (x^{(i)}) - y^{(i)})\cdot x_j^{(i)}
$$



If you are applying the map-reduce method to train a neural network on ten machines. In each iteration, each of the machines will compute forward propagation and back propagation on 1/10 of the data to compute the derivative with respect to that 1/10 of the data. 













# Application example: Photo OCR



## Problem description and pipeline

### The photo OCR pipeline

0. Image

1. Text detection
2. Character segmentation
3. Character classification



A machine learning pipeline: A system with many stages / components, several of which may use machine learning. 



## Sliding windows

For example, supervised learning for pedestrian detection. 

$x=$ pixels in $82\times 36$ image patches. $y=$ if a pedestrian appears in an image or not. 

Suppose you are running a text detector using $20\times 20$ image patches. You run the classifier on a $200\times 200$ image and when using sliding window, you "step" the detector by 4 pixels each time. Totally you will end up running your classifier about 2500 times on a single image. 





## Getting lots of data and artificial data

* Synthesizing data by creating data from fonts available
* Synthesizing data by introducing distortions
  * Distortion introduced should be representation of the type of noise/distortions in the test set
    * Audio: background noise, bad cellphone connection
  * Usually does not help to add purely random / meaningless noise to your data
    * For example, $x_i=$ intensity (brightness) of pixel $i$ and $x_i := x_i + \text{random noise}$. 
* Discussion on getting more data
  1. Make sure you have a low bias classifier before expending the effort. Plot the learning curves. E.g. keep increasing the number of features / number of hidden units in neural network until you have a low bias classifier. 
  2. "How much work would it be to get 10x as much data as we currently have?"
     * Artificial data synthesis
     * Collect / label it yourself
     * "Crowd source" (E.g. Amazon Mechanical Turk)



## Ceiling analysis: What part of the pipeline to work on next

### Estimating the errors due to each component (ceiling analysis)

What part of the pipeline should you spend the most time trying to improve? We can do each pipeline manually one-by-one and check how much the ending results get improved. 






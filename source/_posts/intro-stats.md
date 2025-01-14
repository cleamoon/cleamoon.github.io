---
title: Introduction to Probability and Statistics
date: 2022-01-03
mathjax: true
tags: [Mathematics]
---

Basic probability and statistics are introduced in this article. 

<!-- more -->


## 1. Introduction



### Frequentist vs Bayesian interpretations

* Frequentists say that probability measures the frequency of various outcomes of an experiment. The frequentist approach has long been dominant in fields like biology, medicine, public health and social sciences
* Bayesians say that probability is an abstract concept that measures a state of knowledge or a degree of belief in a given proposition. The Bayesian approach has enjoyed a resurgence in the era of powerful computers and big data



### Permutations and combinations

In general, the rule of product tells us that the number of permutations of a set of $k$ elements is 
$$
k!=k\cdot (k-1)\dots 3\cdot2\cdot1
$$
For permutations the order matters



In combinations order does not matter:

$_nP_k=\frac{n!}{(n-k)!}=$ number of permutations of $k$ distinct elements from a set of size $n$

$_nC_k=\binom{n}{k} = \frac{n!}{k!(n-k)!}$ number of combinations of $k$ elements from a set of size $n$



## 2. Terminology

* Experiment: a repeatable procedure with well-defined possible outcomes
* Sample space: the set of all possible outcomes. We usually denote the sample space by $\Omega$, sometimes by $S$
* Event: a subset of the sample space
* Probability function: a function giving the probability for each outcome
* Probability density: a continuous distribution of probabilities
* Random variable: a random numerical outcome

* A discrete sample space is one that is listable, it can be either finite or infinite

* The probability function

  For a discrete sample space $S$ a probability function $P$ assigns to each outcome $\omega$ a number $P(\omega)$ called the probability of $\omega$. $P$ must satisfy two rules:

  * $0\leq P(\omega)\leq 1$ (probabilities are between 0 and 1)
  * The sum of the probabilities of all possible outcomes is 1

  The probability of an event $E$ is the sum of the probabilities of all the outcomes in $E$. That is 
  $$
  P(E) = \sum_{\omega\in E} P(\omega)
  $$

## 3. Conditional probability

The conditional probability of $A$ knowing that $B$ occurred is written 
$$
P(A|B)
$$
This is read as 
$$
the\ conditional\ probability\ of\ A\ given\ B
$$
or
$$
the\ probability\ of\ A\ conditioned\ on\ B
$$
Let $A$ and $B$ be events. We define the conditional probability of $A$ given $B$ as
$$
P(A|B)=\frac{P(A\cap B)}{P(B)},\text{ provided }P(B)\ne 0
$$


### Multiplication rule

$$
P(A\cap B) = P(A|B)\cdot P(B)
$$



### Law of total probability

Support the sample space $\Omega$ is divided into 3 disjoint events $B_1, B_2, B_3$. Then for any event $A$:

$$
P(A)=P(A\cap B_1)+P(A\cap B_2)+P(A\cap B_3)
$$


### Independence

Two events are independent if knowledge that one occurred does not change the probability that the other occurred. I.e.
$$
P(A|B)=P(A)
$$
Formal definition of independence: Two events $A$ and $B$ are independent if
$$
P(A\cap B)=P(A)\cdot P(B)
$$


### Bayes' Theorem

Bayes'theorem is a pillar of both probability and statistics. For two events $A$ and $B$ Bayes' theorem:
$$
P(B|A)=\frac{P(A|B)\cdot P(B)}{P(A)}
$$




## 4. Discrete Random Variable



### Random variables

Def: Let $\Omega$ be a sample space. A discrete random variable is a function $X:\Omega\rightarrow \mathbb{R}$, that takes a discrete set of values



Def: the probability mass function (pmf) of a discrete random variable is the function $p(a)=P(X=a)$

* We always have $0\leq p(a)\leq 1$
* We allow $a$ to be any number. If $a$ is a value that $X$ never takes, then $p(a)=0$



Def: The cumulative distribution function (cdf) of a random variable $X$ is the function $F$ given by $F(a)=P(X\leq a)$. We often shorten this to distribution function



Properties of the cdf $F$:

* $F$ is non-decreasing
* $0\leq F(a) \leq 1$
* $\lim_{a\rightarrow \infty}F(a) = 1$, $\lim_{a\rightarrow-\infty}F(a) = 0$



### Specific distributions



#### Bernoulli distributions

Model: The Bernoulli distribution models one trial in an experiment that can result in either success or failure. A random variable $X$ has a Bernoulli distribution with parameter $p$ if:

1. $X$ takes the values 0 and 1
2. $P(X=1)=p$, and $P(X=0)=1-p$



#### Binomial distributions

The binomial distribution $Binomial(n,p)$, or $Bin(n,p)$, models the number of successes in $n$ independent $Bernoulli(p)$ trials. $Binomial(1,p)$ is the same as $Bernoulli(p)$. Its pmf $p(a)$ is
$$
\binom{n}{a}p^a(1-p)^{n-a}
$$

#### Geometric distributions

A geometric distribution models the number of tails before the first head in a sequence of coin flips (Bernoulli trials)

Formal definition: the random variable $X$ follows a geometric distribution with parameter $p$ if 

* $X$ takes the values $0,1,2,3,\dots$
* its pmf is given by $p(k)=P(X=k)=(1-p)^kp$



#### Uniform distribution

The uniform distribution models any situation where all the outcomes are equally likely. $X\sim uniform(N)$ means $X$ takes value $1,2,3,\dots,N$, each with probability $1/N$. 



### Expected value

Def: Suppose $X$ is a discrete random variable that takes values $x_1,x_2,\dots,x_n$ with probabilities $p(x_1), p(x_2), \dots, p(x_n)$. The expected value of $X$ is denoted $E(X)$ and defined by 
$$
E(X)=\sum_{j=1}^n p(x_j) x_j
$$
For example, the expected value of $Bernoulli(p)$ is 
$$
E(X)=p\cdot 1 + (1 - p)\cdot 0 = p
$$


#### Algebraic properties of $E(X)$

$E(X)$ is linear

1. If $X$ and $Y$ are random variables on a sample space $\Omega$ then
   $$
   E(X+Y) = E(X) + E(Y)
   $$

2. If $a$ and $b$ are constants then 
   $$
   E(aX+b) = aE(X) + b
   $$
   

Thus the expected value of $binomial(n,p)$ is 
$$
E(X) = \sum_{k=0}^n kp(k) = \sum_{k=0}^n k\binom{n}{k} p^k(1-p)^{n-k} = \sum_j E(X_j) = \sum_j p = np
$$


#### Proofs of the algebraic properties of $E(X)$

For the property 1:
$$
E(X+Y)=\sum(x_i+y_i)P(\omega_i)=\sum x_iP(\omega_i) + \sum y_iP(\omega_i) = E(X) + E(Y)
$$
For the property 2:
$$
E(aX+b) = \sum p(x_i)(ax_i+b) = a\sum p(x_i) x_i + b \sum p(x_i) = a E(X) + b
$$


Thus the mean of a geometric distribution:
$$
E(X) = \sum_{k=0}^\infty k(1-p)^k p = \frac{1-p}{p}
$$


#### Expected values of functions of a random variable

$$
E(h(X)) = \sum_j h(x_j) p(x_j)
$$



## 5. Variance of Discrete Random Variables

### Variance and standard deviation
Taking the mean as the center of a random variable's probability distribution, the variance is a measure of how much the probability mass is spread out around this center. 

Definition: If $X$ is a random variable with mean $E(X)=\mu$, then the variance of $X$ is defined by
$$
Var(X)=E((X-\mu)^2)
$$

The standard deviation $\sigma$ of $X$ is defined by
$$
\sigma = \sqrt{Var(X)}
$$

If the relevant random variable is clear from context, then the variance and standard deviation are often denoted by $\sigma^2$ and $\sigma$. If $X$ takes values $x_1, x_2, \dots, x_n$ with probability mass function $p(x_i)$ then 
$$
Var(X) = E((X-\mu)^2) = \sum_ {i=1}^n p(x_i)(x_i-\mu)^2
$$

### The variance of a Bernoulli($p$) random variable
Bernoulli random variables are fundamental. If $X \sim Bernoulli(p)$, then 
$$
Var(X) = p(1-p)
$$

Def: The discrete random variables $X$ and $Y$ are independent if 
$$
P(X=a, Y=b) = P(X=a)P(Y=b)
$$
for any values $a, b$. That is, the probabilities multiply. 

### Properties of variance
The three most useful properties for computing variance are: 
1. If $X$ and $Y$ are independent then $Var(X+Y) = Var(X) + Var(Y)$.
2. For constants $a$ and $b$, $Var(aX+b)=a^2 Var(X)$.
3. $Var(X)=E(X^2) - E(X) ^2$.

### Variance of binomial($n,p$)
Suppose $X\sim binomial(n, p)$. Since $X$ is the sum of independent Bernoulli($p$) variables and each Bernoulli variable has variance $p(1-p)$, we have
$$
X\sim binomial(n,p)\Rightarrow Var(X) = np(1-p)
$$

## 6. Continuous Random Variables

### Continuous random variables and probability density functions
A continuous random variable takes a range of values, which may be finite or infinite in extent. 

Def: A random variable $X$ is continuous if there is a function $f(x)$ such that for any $c\leq d$ we have
$$
P(c\leq X\leq d) = \int_c^d f(x)\,dx
$$

The function $f(x)$ is called the probability density function (pdf). The pdf always satisfies the following properties:
1. $f(x) \geq 0$
2. $\int_{-\infty}^{\infty} f(x)\, dx = 1$

Unlike $p(x)$, the pdf $f(x)$ is not a probability. You have to integrate it to get probability. Since $f(x)$ is not a probability, there is no restriction that $f(x)$ be less than or equal to 1. 

### Cumulative distribution function
The cumulative distribution function (cdf) of a continuous random variable $X$ is defined in exactly the same way as the cdf of a discrete random variable.
$$
F(b) = P(X\leq b) = \int_{-\infty}^b f(x)\, dx
$$
In practice we often say '$X$ has distribution $F(x)$'. 

### Properties of cumulative distribution functions
1. $0\leq F(x) \leq 1$.
2. $F(x)$ is non-decreasing.
3. $\lim_{x\rightarrow \infty} F(x) =  1$ and $\lim_{x\rightarrow -\infty} F(x) =  0$.
4. $P(a\leq X\leq b) = F(b) - F(a)$.
5. $F'(x) = f(x)$.


### Uniform distribution
1. Parameters: $a, b$
2. Range: $[a, b]$
3. Notation: uniform$(a,b)$ or $U(a,b)$
4. Density: $f(x)=\frac{1}{b-a}$ for $a\leq x\leq b$
5. Distribution: $F(x)=(x-a)/(b-a)$ for $a\leq x\leq b$.
6. Models: All outcomes in the range have equal probability. 

### Exponential distribution
1. Parameter: $\lambda$
2. Range: $[0, \infty)$
3. Notation: exponential$(\lambda)$ or $\exp(\lambda)$
4. Density: $f(x)=\lambda e^{-\lambda x}$ for $0\leq x$. 
5. Distribution: $F(x) = 1-e^{-\lambda x}$ for $x\geq 0$. 
6. Right tail distribution: $P(X>x) = 1-F(x)=e^{-\lambda x}$. 
7. Models: The waiting time for a continuous process to change state. 

Memorylessness
* The exponential distribution has a property that it is memoryless. 
* Proof
   Since $(X > s + s) \cap (X > s) = (X > s + t)$ we have: 
   $$
   P(X>s+t | X>s) = \frac{P(X>s+t)}{P(X>s)}=
   \frac{e^(-\lambda(s+t))}{e^{-\lambda s}}=
   e^{-\lambda t} = P(X>t)
   $$
   QED

### Normal distribution
1. Parameters: $\mu, \sigma$
2. Range: $(-\infty, \infty)$
3. Notation: normal$(\mu, \sigma^2)$ or $N(\mu, \sigma^2)$
4. Density: $f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$
5. Distribution: $F(x)$ has no formula
6. Models: Measurement error, intelligence/ability, height, averages of lots of data.

The standard normal distribution $N(0,1)$ has mean 0 and variance 1. 

#### Normal probabilities
To make approximations it is useful to remember the following rule of thumb for three approximate probabilities: 
$$
\begin{aligned}
P(-1\leq Z\leq 1) &\approx .68\\
P(-2\leq Z\leq 2) &\approx .95\\
P(-3\leq Z\leq 3) &\approx .99\\
\end{aligned}
$$

### Pareto distribution
1. Parameters: $m>0$ and $\alpha > 0$
2. Range: $[m, \infty)$
3. Notation: Pareto$(m,\alpha)$
4. Density: $f(x) = \frac{\alpha m^\alpha} {x^{\alpha + 1}}$
5. Distribution: $F(x)=1-\frac{m^\alpha}{x^\alpha}$, for $x\geq m$.
6. Tail distribution: $P(X>x) = m^\alpha/x^\alpha$, for $x\geq m$.
7. Models: The Pareto distribution models a power law, where the probability that an event occurs varies as a power of some attribute of the event. Many phenomena follow a power law, such as the size of meteors, income levels across a population, and population levels across cities. 

### Transformations of random variables
For continuous random variables transforming the pdf is just change of variables ('$u$-substitution') from calculus. Transforming the cdf makes direct use of the definition of the cdf. 

### Expectation, variance and standard deviation for continuous random variables
These summary statistics have the same meaning for continuous random variables
* The expected value $\mu = E(X)$ is a measure of location or central tendency.
* The standard deviation $\sigma$ is a measure of the spread or scale. 
* The variance $\sigma^2 = Var(X)$ is the square of the standard deviation. 

#### Expected value of a continuous random variable
Def: Let $X$ be a continuous random variable with range $[a,b]$ and probability density function $f(x)$. The expected value of $X$ is defined by 
$$
E(X) = \int_a^b xf(x)\, dx
$$

##### Properties of $E(X)$
1. $E(X+Y) = E(X) + E(Y)$
2. $E(aX+b) = aE(X) + b$

##### Expectation of function 
If $h(x)$ is a function then $Y=h(X)$ is a random variable and 
$$
E(Y) = E(h(X)) = \int_{-\infty}^{\infty} h(x)f_X(x)\, dx
$$

#### Variance of a continuous random variable
Def: Let $X$ be a continuous random variable with mean $\mu$. The variance of $X$ is 
$$
Var(X) = E((X-\mu)^2)
$$

##### Properties of variance
1. If $X$ and $Y$ are independent then $Var(X+Y) = Var(X) + Var(Y)$
2. For constants $a$ and $b$, $Var(aX+b) = a^2 Var(X)$.
3. Theorem: $Var(X)=E(X^2) - E(X)^2 = E(X^2) - \mu^2$

#### Quantiles
Def: The median of $X$ is the value $x$ for which $P(X\leq x) = 0.5$, i.e. the value of $x$ such that $P(X\leq x) = P(X\geq x)$. 

Def: The $p^{th}$ quantile of $X$ is the value $q_p$ such that $P(X\leq q_p) = p$. 

In this notation, the median is $q_{0.5}$. For convenience, quantiles are often described in terms of percentiles, deciles or quartiles. The $60^{th}$ percentile is the same as the $0.6$ quantile. 

## 7. Central Limit Theorem and the Law of Large Numbers

### The law of large numbers
Suppose $X_1, X_2, \dots, X_n$ are independent random variables with the same underlying distribution.In this case, we say that the $X_i$ are independent and identically-distributed, or i.i.d. In particular, the $X_i$ all have the same mean $\mu$ and standard deviation $\sigma$. 

Let
$$
\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i
$$

Note that $\bar{X}_n$ is itself a random variable. 

* The law of large numbers (LoLN): As $n$ grows, the probability that $\bar{X}_n$ is close to $\mu$ goes to 1.
* The central limit theorem (CLT): As $n$ grows, the distribution of $\bar{X}_n$ converges to the normal distribution $N(\mu, \sigma^2/n)$



#### Formal statement of the law of large numbers

Theorem: Suppose $X_1, X_2, \dots, X_n, \dots$ are i.i.d. random variables with mean $\mu$ and variance $\sigma^2$. For each $n$, let $\bar{X}_n$ be the average of the first $n$ variables. Then for any $a>0$, we have
$$
\lim_{n\rightarrow \infty} P(|\bar{X}_n-\mu|<a)=1
$$


### The central Limit Theorem

#### Standardization

Given a random variable $X$ with mean $\mu$ and standard deviation $\sigma$, we define its standardization of $X$ as the new random variable
$$
Z=\frac{X-\mu}{\sigma}
$$
Note that $Z$ has mean 0 and standard deviation 1. 





#### Statement of the Central Limit Theorem

Suppose $X_1, X_2, \dots, X_n, \dots$ are i.i.d. random variable each having mean $\mu$ and standard deviation $\sigma$. Let $S_n=\sum_{i=1}^n X_i$

The properties of mean and variance show
$$
\begin{aligned}
E(S_n)&=n\mu,\quad &Var(S_n) &= n\sigma^2,\quad &\sigma_{S_n} &= \sqrt{n}\sigma \\
E(\bar{X}_n)&=\mu,\quad &Var(\bar{X}_n) &= \frac{\sigma^2}{n},\quad &\sigma_{\bar{X}_n} &= \frac{\sigma}{\sqrt{n}} \\
\end{aligned}
$$
Since they are multiples of each other, $S_n$ and $\bar{X}_n$ have the same standardization
$$
Z_n=\frac{S_n-n\mu}{\sigma\sqrt{n}}=\frac{$\bar{X}_n-\mu}{\sigma/\sqrt{n}}
$$


Central Limit Theorem: For large $n$
$$
\bar{X}_n\approx N(\mu,\sigma^2/n),\quad S_n\approx N(n\mu, n\sigma^2),\quad Z_n \approx N(0, 1)
$$
Notes:

1. In words, $\bar{X}_n$ is approximately a normal distribution with the same mean as $X$ but a smaller variance.
2. $S_n$ is approximately normal. 
3. Standardized $\bar{X}_n$ and $S_n$ are approximately standard normal.



A precise statement of the CLT is that the cdf's of $Z_n$ converge to $\Phi(z)$:
$$
\lim_{n\rightarrow \infty} F_{Z_n}(z)=\Phi(z)
$$


#### Standard normal probabilities

To apply the CLT, we will want to have some normal probabilities. Let $Z\sim N(0,1)$, a standard normal random variable. Then with rounding we have: 

1. $P(|Z|<1)=0.68$
2. $P(|Z|<2)=0.95$; more precisely $P(|Z|<1.96)\approx 0.95$
3. $P(|Z|<3)=0.997$



#### How big does $n$ have to be apply the CLT?

Short answer: often, not that big.



## 8. Introduction to statistics

Statistics deals with data. Generally speaking, the goal of statistics is to make inferences based on data. 

### What is a statistic

Def: A statistic is anything that can be computed from the collected data. 

In scientific experiments we start with a hypothesis and collect data to test the hypothesis. We will often let $H$ represent the event "our hypothesis is true" and let $D$ be the collected data. In these words Bayes' theorem says:
$$
P(\text{hypothesis is true } | \text{ data}) = 
\frac{P(\text{data } | \text{ hypothesis is true}
\cdot P(\text{hypothesis is true})}{P(\text{data})}
$$

The left-hand term is the probability our hypothesis is true given the data we collected. 

## 9. Maximum Likelihood Estimates

We are often faced with the situation of having random data which we known (or believes) is drawn from a parametric model, whose parameters we do not know. 

### Maximum Likelihood Estimates

There are many methods for estimating unknown parameters from data. We first consider the maximum likelihood estimate (MLE), which answers the question: For which parameter value does the observed data have the biggest probability? 

The MLE is an example of a point estimate because it gives a single value for the unknown parameter. 

Def: Given data the maximum likelihood estimate (MLE) for the parameter $p$ is the value of $p$ that maximizes the likelihood $P(\text{data }|p)$. That is, the MLE is the value of $p$ for which the data is most likely. 

The maximum likelihood estimate (MLE) can be computed with derivation. 

### Log likelihood
It is often easier to work with the natural log of the likelihood function. Since $\ln(x)$ is an increasing function, the maxima of the likelihood and log likelihood coincide. 

### Maximum likelihood for continuous distributions
For continuous distributions, we use the probability density function to define the likelihood. 
$$
\frac{\partial f(x_1, \dots, x_n | \mu ,\sigma)}
{\partial \mu}
$$

### Properties of the MLE
The MLE behaves well under transformations. That is, if $\hat{p}$ is the MLE for $p$ and $g$ is a one-to-one function, then $g(\hat{p})$ is the MLE for $g(p)$. 

Furthermore, the MLE is asymptotically unbiased and has asymptomatically minimal variance. Note that the MLE is itself a random variable since the data is random and the MLE is computed from the data. Let $x_1,x_2,\dots$ be an infinite sequence of samples from a distribution with parameter $p$. Let $\hat{p}_n$ be the MLE for $p$ based on the data $x_1,\dots,x_n$. Asymptotically unbiased means that as the amount of data grows, the mean of the MLE converges to $p$: $E(\hat{p}_n)\rightarrow p$ as $n\rightarrow \infty$. Asymptotically minimal variance means that as the amount of data grows, the MLE has the minimal variance among all unbiased estimators of $p$. In symbols: for any unbiased estimator $\tilde{p}_n$ and $\epsilon > 0$ we have that $Var(\tilde{p}_n) + \epsilon > Var(\tilde{p}_n)$ as $n\rightarrow \infty$. 

## 10. Bayesian Updating

### Bayesian with discrete priors

#### Review of Bayes' theorem
If $H$ and $D$ are events, then:
$$
P(H|D) = \frac{P(D|H)P(H)}{P(D)}
$$


#### Some terminology
* Experiment: for example, pick a coin from the drawer at random, flip it, and record the result.
* Data: the result of our experiment. In this case the event $D =$ "heads". We think of $D$ as data that provides evidence for or against each hypothesis. 
* Hypotheses: we are testing several hypotheses. For example the coin is fair or unfair with 0.7 probability of giving head. 
* Prior probability: the probability of each hypothesis prior to tossing the coin (collecting data). 
* Likelihood: (This is the same likelihood we used for the MLE.) The likelihood function is $P(D|H)$, i.e., the probability of the data assuming that the hypothesis is true. Most often we will consider the data as fixed and let the hypothesis vary. For example, $P(D|A) =$ probability of heads if the coin is fair. 
* Posterior probability: the probability (posterior to) of each hypothesis given the data from tossing the coin: $P(A|D)$. These posterior probabilities are what the problem asks us to find. 

The Bayes numerator is the product of the prior and the likelihood. The process of going from the prior probability $P(H)$ to the posterior $P(H|D)$ is called Bayesian updating. Bayesian updating uses the data to alter our understanding of the probability of each of the possible hypotheses. 

We can express Bayes' theorem in: 
$$
P(\text{hypothesis} | \text{data}) = \frac
{P(\text{data} | \text{hypothesis})P(\text{hypothesis})}{P(\text{data})}
$$

This leads to the most elegant form of Bayes' theorem in the context of Bayesian updating: 
$$
\text{posterior} \propto \text{likelihood} \times\text{prior}
$$

#### Prior and posterior probability mass functions
Our standard notations will be:
* $\theta$ is the value of the hypothesis.
* $p(\theta)$ is the prior probability mass function of the hypothesis.
* $p(\theta |D)$ is the posterior probability mass function of the hypothesis given the data. 
* $p(D| \theta)$ is the likelihood function. (This is not a pmf.)

### Probabilistic prediction

Probabilistic prediction simply means assigning a probability to each possible outcomes of an experiment. 

Def: These probabilities give a (probabilistic) prediction of what will happen if the coin is tossed. Because they are computed before we collect any data they are called prior predictive probabilities.

Def: These probabilities give a (probabilistic) prediction of what will happen if the coin is tossed again. Because they are computed after collecting data and updating the prior to the posterior, they are called posterior predictive probabilities. 

Prior and posterior probabilities are for hypothesis. Prior predictive and posterior predictive probabilities are for data.

### Odds

When comparing two events, it common to phrase probability statements in terms of odds. 

Def: The odds of event $E$ versus event $E'$ are the ratio of their probabilities $P(E)/P(E')$. If unspecified, the second event is assumed to be the complement $E^C$. So the odds of $E$ are: 
$$
O(E) = \frac{P(E)}{P(E^C)}
$$

For example, $O(\text{rain})=2$ means "the odds of rain are 2 to 1$. 

#### Conversion formulas
If $P(E)=p$ then $O(E)=\frac{p}{1-p}$. If $O(E) =q$ then $P(E) = \frac{q}{1+q}$.

#### Updating odds

We can update prior odds to posterior odds with Bayesian updating. 

#### Bayes factors and strength of evidence
Def: For a hypothesis $H$ and data $D$, the Bayes factor is the ratio of the likelihoods: 
$$
\text{Bayes factor} = \frac{P(D|H)}{P(D|H^C)}
$$
$$
\text{posterior odds} = \text{Bayes factor}\times \text{prior odds}
$$

We see that the Bayes' factor tells us whether the data provides evidence for or against the hypothesis. 


### Continuous Priors 

#### Notational conventions

We will often use the letter $\theta$ to stand for an arbitrary hypothesis. This will leave symbols like $p$, $f$, and $x$ to take there usual meanings as pmf, pdf, and data. 

We have two parallel notations for outcomes and probability: 
1. (Big letters) 
   * Event $A$, probability function $P(A)$. 
   * From hypothesis $H$ and data $D$ we compute several associated probabilities: $P(H), P(D), P(H|D), P(D|H)$. 
2. (Little letters) 
   * Value $x$, pmf $p(x)$ or pdf $f(x)$. 
   * Hypothesis values $\theta$ and data values $x$ both have probabilities or probability densities: 
   
   $$
   \begin{aligned}
   p(\theta), p(x), p(\theta | x), p(x|\theta) \\
   f(\theta), f(x), f(\theta | x), f(x|\theta) \\
   \end{aligned}
   $$
   

These notations are related by $P(X=x) = p(x)$, where $x$ is a value the discrete random variable $X$ and $X=x$ is the corresponding event. 

#### The law of total probability
Theorem: Law of total probability. Suppose we have a continuous parameter $\theta$ in the range $[a,b]$, and discrete random data $x$. Assume $\theta$ is itself random with density $f(\theta)$ and that $x$ and $\theta$ have likelihood $p(x|\theta)$. In this case, the total probability of $x$ is given by the formula: 
$$
p(x) = \int_a^b\, p(x|\theta) f(\theta)\, d\theta
$$
We call $p(x)$ the prior predictive probability for $x$. 

#### Bayes' theorem for continuous probability densities
Theorem: Bayes' theorem. Use the same assumptions as in the law of total probability: 
$$
f(\theta |x)\, d\theta = 
\frac{p(x|\theta)f(\theta)\,d\theta}{p(x)} = 
\frac{p(x|\theta)f(\theta)\,d\theta}{\int_a^b p(x|\theta)f(\theta)\,d\theta}
$$

#### Flat priors
One important prior is called a flat or uniform prior. A flat prior assumes that every hypothesis is equally probable. 



## 11. Beta distributions
The beta distribution $beta(a,b)$ is a two-parameter distribution with range $[0, 1]$ and pdf
$$
f(\theta) = \frac{(a+b-1)!}{(a-1)!(b-1)!}
\theta^{a-1} (1-\theta)^{b-1}
$$
In the context of Bayesian updating, $a$ and $b$ are often called hyperparameters to distinguish them from the unknown parameter $\theta$ representing our hypotheses. In a sense, $a$ and $b$ are "one level up" from $\theta$ since they parameterize its pdf. 


### Beta priors and posteriors for binomial random variables

If the probability of heads is $\theta$, the number of heads in $n+m$ tosses follows a binomial($n+m, \theta$) distribution. We have seen that if the prior on $\theta$ is beta distribution then so is the posterior; only the parameters $a, b$ of the beta distribution change. We assume the data is $n$ heads in $n+m$ tosses:

| hypothesis | data | prior | likelihood | posterior | 
|---|---|---|---|---|
| $\theta$ | $x=n$ | $beta(a,b)$ | $binomial(n+m, \theta)$ | $beta(a+n,b+m)$ | 
| $\theta$ | $x=n$ | $c_1\theta^{a-1}(1-\theta)^{b-1}\, d\theta$ | $c_2\theta^n(1-\theta)^m$ | $c_3\theta^{a+n-1}(1-\theta)^{b+m-1}\, d\theta$ | 


### Conjugate priors
That beta distribution is called a conjugate prior for the binomial distribution. This means that if the likelihood function is binomial, then a beta prior gives a beta posterior. In fact, the beta distribution is a conjugate prior for the Bernoulli and geometric distributions as well. 

## 12. Conjugate priors
Conjugate priors are useful because they reduce Bayesian updating to modifying the parameters of the prior distribution (so-called hyperparameters) rather than computing integrals. 

Def: Suppose we have data with likelihood function $f(x|\theta)$ depending on a hypothesized parameter. Also suppose the prior distribution for $\theta$ is one of a family of parametrized distributions. If the posterior distribution for $\theta$ is in this family then we say the prior is a conjugate prior for the likelihood. 


### Beta distribution

We saw that the beta distribution is a conjugate prior for the binomial distribution. This means that if the likelihood function is binomial and the prior distribution is beta then the posterior is also beta. 

More specifically, suppose that the likelihood follows a binomial($N, \theta$) distribution where $N$ is known and $\theta$ is the (unknown) parameter of interest. We also have that the data $x$ from one trial is an integer between $0$ and $N$. Then for a beta prior we have:
| hypothesis | data | prior | likelihood | posterior | 
|---|---|---|---|---|
| $\theta$ | $x$ | $beta(a,b)$ | $binomial(N,\theta)$ | $beta(a+x, b+N-x)$
| $\theta$ | $x$ | $c_1\theta^{a-1}(1-\theta)^{b-1}$ | $c_2 \theta^x (1-\theta)^{N-x}$ | $c_3 \theta^{a+x-1} (1-\theta)^{b+N-x-1}$ |

Here 
$$
c_1=\frac{(a+b-1)!}{(a-1)!(b-1)!}
$$
$$
c_2=\binom{N}{x}=\frac{N!}{x!(N-x)!}
$$
$$
c_3=\frac{(a+b+N-1)!}{(a+x-1)!(b+N-x-1)!}
$$


Beta distribution is a conjugate prior for a geometric likelihood as well.

### Normal begets normal
The normal distribution is its own conjugate prior. In particular, if the likelihood function is normal with known variance, then a normal prior gives a normal posterior. 

#### Normal-normal update formulas for $n$ data points
$$
\frac{\mu_{post}}{\sigma^2_{post}} = 
\frac{\mu_{prior}}{\sigma^2_{prior}} + \frac{n\bar{x}}{\sigma^2},\quad
\frac{1}{\sigma^2_{post}}=\frac{1}{\sigma^2_{prior}} + \frac{n}{\sigma^2},\quad
\bar{x}= \frac{x_1+\dots + x_n}{n}
$$
The easier to read form, note that $\mu_{post}$ is a weighted average of $\mu_{prior}$ and the sample average $\bar{x}$:
$$
a=\frac{1}{\sigma^2_{prior}},\quad 
b=\frac{n}{\sigma^2},\quad
\mu_{post}=\frac{a\mu_{prior}+b\bar{x}}{a+b},\quad
\sigma^2_{post}=\frac{1}{a+b}
$$
If the number of data points is large then the weight $b$ is large and $\bar{x}$ will have a strong influence on the posterior. If $\sigma^2_{prior}$ is small then the weight $a$ is large and $\mu_{prior}$ will have a strong influence on the posterior.

## 13. Choosing priors

When the prior is known there is no controversy on how to proceed. The art of statistics starts when the prior is not known with certainty. There are two main schools on how to proceed in this case: Bayesian and frequentist. 

Recall that given data $D$ and a hypothesis $H$ we used Bayes' theorem to write
$$
P(H|D) = \frac{P(D|H)\cdot P(H)}{P(D)}
$$
$$
\text{posterior}\propto \text{likelihood}\cdot \text{prior}
$$

* Bayesian: Bayesians make inferences using the posterior $P(H|D)$, and therefore always need a prior $P(H)$. If a prior is not known with certainty the Bayesian must try to make a reasonable choice. There are many ways to do this and reasonable people might make different choices. In general it is good practice to justify your choices and to explore a range of priors to see if they all point to the same conclusion.
   * Benefits: 
      1. The posterior probability $P(H|D)$ for the hypothesis given the evidence is usually exactly what we'd like to know. The Bayesian can say something like "the parameter of interest has probability 0.95 of being between 0.49 and 0.51".
      2. The assumptions that go into choosing the prior can be clearly spelled out. 
   * Choose prior
      * Uniform prior/Flat prior
      * Informed prior: statistic with prior information. 
      * Rigid priors: Too rigid a prior belief can overwhelm any amount of data.
* Frequentist: Very briefly, frequentists do not try to create a prior. Instead, they make inferences using the likelihood $P(D|H)$.
* More good data: It is always the case that more good data allows for stronger conclusions and lessens the influence of the prior. The emphasis should be as much on good data (quality) as on more data (quantity).


## 14. Probability intervals

Suppose we have a pmf $p(\theta)$ or pdf $f(\theta)$ describing our belief about the value of an unknown parameter of interest $\theta$.

Def: A $p$-probability interval for $\theta$ is an interval $[a,b]$ with $P(a\leq \theta\leq b) = p$. 

1. In the discrete case with pmf $p(\theta)$, this means $\sum_{a\leq \theta_i\leq b} p(\theta_i)=p$.
2. In the continuous case with pdf $f(\theta)$, this means $\int_a^b f(\theta)\, d\theta = p$.
3. We may say 90%-probability internal to mean 0.9-probability interval. Probability intervals are also called credible intervals to contrast them with confidence intervals. 

Notice that the $p$-probability interval for $\theta$ is not unique. 

$Q$-notation. We can phrase probability intervals in terms of quantiles. Recall that the $s$-quantile for $\theta$ is the value $q_s$ with $P(\theta\leq q_s)=s$. So for $s\leq t$, the amount of probability between the $s$-quantile and the $t$-quantile is just $t-s$. In these terms, a $p$-probability interval is any interval $[q_s, q_t]$ with $t-s=p$. 

### Symmetric probability intervals
The interval $[q_{0.25}, q_{0.75}]$ is symmetric because the amount of probability remaining on either side of the interval is the same, namely 0.25. 

### Uses of probability intervals
Summarizing and communicating your beliefs

### Constructing a prior using subjective probability intervals
Probability intervals are also useful when we do not have a pmf or pdf at hand. In this case, subjective probability intervals gives us a method for constructing a reasonable prior for $\theta$ "from scratch". The thought process is to ask yourself a series of questions, e.g. "what is my expected value for $\theta$?"; "my 0.5-probability interval?"; "my 0.9-probability interval?".

## 15. The Frequentist School Statistics
Both schools of statistics start with probability. in particular both know and love Bayes' theorem. Bayes' theorem is a complete recipe for updating our beliefs in the face of new data. In practice, different people will have different priori belief. But we would still like to make useful inferences from data. Bayesians and frequentists take fundamentally different approaches to this challenge.
* Bayesians require a prior, so they develop one from the best information they have.
* Without a known prior frequentists draw inferences from just the likelihood function. 

In short, Bayesians put probability distributions on everything (hypotheses and data), while frequentists put probability distributions on (random, repeatable, experimental) data given a hypothesis. For the frequentist, when dealing with data from an unknown distribution, only the likelihood has meaning. The prior and posterior do not. 

* Point statistic: A point statistic is a single value computed from data. For example, the mean and the maximum are both point statistics. 
* Interval statistic: An interval statistic is an interval computed from data. For example, the range from the minimum to maximum is an interval statistic. 
* Set statistic: An interval statistic is a set computed from data. For example, the set of possible outcomes of a dice. 
* Sampling distribution: The probability distribution of a statistic is called its sampling distribution.
* Point estimate: We can use statistics to make a point estimate of a parameter $\theta$. 

## 16. Null Hypothesis Significance Testing

### Introduction
Frequentist statistics is often applied in the framework of null hypothesis significance testing (NHST). Stated simply, this method asks if the data is well outside the region where we would expect to see it under the null hypothesis. If so, then we reject the null hypothesis in favor of a second hypothesis called the alternative hypothesis. 

The computations done here all involve the likelihood function. There are two main differences between what we'll do here and what we did in Bayesian updating. 
1. The evidence of the data will be considered purely through the likelihood function it will not be weighted by our prior beliefs.
2. We will need a notion of extreme data, e.g. 95 out of 100 heads in a coin toss or a Mayfly that lives for a month. 

### Significance testing

#### Ingredients

* $H_0$: the null hypothesis. This is the default assumptioin for the model generating the data. 
* $H_A$: The alternative hypothesis. If we reject the null hypothesis we accept this alternative as the best explanation for the data. 
* $X$: The test statistic. We compute this from the data. 
* Null distribution: the probability distribution of $X$ assuming $H_0$.
* Rejection region: If $X$ is in the rejection region we reject $H_0$ in favor of $H_A$. 
* Non-rejection region: The complement to the rejection region. 

#### Simple and composite hypotheses

Def: (simple hypothesis): A simple hypothesis is one for which we can specify its distribution completely. A typical simple hypothesis is that a parameter of interest takes a specific value. 

Def: (composite hypothesis): If its distribution cannot be fully specified, we say that the hypothesis is composite. A typical composite hypthesis is that a parameter of interest lies in a range of values. 

#### Type of error
There are two types of errors we can make. We can incorrectly reject the null hypothesis when it is true or we can incorrectly fail to reject it when it is false. These are unimaginatively labeled type I and type II errors. 

#### Significance level and power
Significance level and power are used to quantify the quality of the significance test. Ideally a significance test would not make errors. 

The two probabilities we focus on:
$$
\begin{aligned}
\text{Significance level} &= P(\text{reject } H_0|H_0) \\
&= \text{probability we incrrectly reject }H_0 \\
&= P(\text{type I error})
\end{aligned}
$$

$$
\begin{aligned}
\text{Power} &= P(\text{reject } H_0|H_A) \\
&= \text{probability we correctly reject }H_0\\
&= 1- P(\text{type II error})
\end{aligned}
$$

Ideally, a hypothesis test should have a small significance level (near 0) and a large power (near 1).

#### Critical values
Critical values are like quantiles expect they refer to the probability to the right of the value instead of the left.

#### $p$-values
In practice people often specify the significance level and do the significance test using what are called $p$-values. We will first define $p$-value and see that: If the $p$-value is less than the significance level $\alpha$ then qw reject $H_0$. Otherwise we do not reject $H_0$. 

Def: The $p$-value is the probability, assuming the null hypothesis, of seeing data at least as extreme as the experimental data. What "at least as extreme" means depends on the experimental design. 

### $t$-tests
Many significance tests assume that the data are drawn from a normal distribution, so before using such a test you should examine the data to see if the normality assumption is reasonable. 

#### $z$-test
* Data: we assume $x_1, x_2, \dots, x_n\sim N(\mu, \sigma^2)$, where $\mu$ is unknown and $\sigma$ is known. 
* Null hypothesis: $\mu=\mu_0$ for some specific value $\mu_0$. 
* Test statistic: $z = \frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}} =$ standardized mean. 
* Null distribution: $f(z|H_0)$ is the pdf of $Z\sim N(0,1)$.
* One-sided $p$-value (right side): $p=P(Z>z |H_0)$
   One-sided $p$-value (left side): $p=P(Z<z |H_0 )$
   Two-sided $p$-value: $p=P(|Z|>|z|)$

#### The Student $t$ distribution
The $t$-distribution is symmetric and bell-shaped like the normal distribution. It has a parameter $df$ which stands for degrees of freedom. For $df$ small, the $t$-distribution has more probability in its tails than the standard normal distribution. As $df$ increases $t(df)$ becomes more and more like the standard normal distribution. 

#### One-sample $t$-test
For the $z$-test, we assumed that the variance of the underlying distribution of the data was known. However, it is often the case that we don't know $\sigma$ and therefore we must estimate it from the data. In these cases, we use a one sample $t$-test instead of a $z$-test and the studentized mean in place of the standardized mean
* Data: we assume $x_1, x_2, \dots, x_n \sim N(\mu, \sigma^2)$, where both $\mu$ and $\sigma$ are unknown. 
* Null hypothesis: $\mu=\mu_0$ for some specific value $\mu_0$.
* Test statistic: 
   $$
   t=\frac{\bar{x}-\mu_0}{s/\sqrt{n}}
   $$
   where
   $$
   s^2=\frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2
   $$
   here $t$ is called the Studentized mean and $s^2$ is called the sample variance. The latter is an estimate of the true variance $\sigma^2$. 
* Null distribution: $f(t|H_0)$ is the pdf of $T\sim t(n-1)$, the $t$ distribution with $n-1$ degrees of freedom. 
* One sided $p$-value (right side): $p=P(T>t|H_0)$
   One-sided $p$-value (left side): $p=P(T<t |H_0 )$
   Two-sided $p$-value: $p=P(|T|>|t|)$

If's a theorem (not an assumption) that if the data is normal with mean $\mu_0$ then the Studentized mean follows a $t$-distribution. 

#### Two-sample $t$-test with equal variances
We next consider the case of comparing the means of two samples. For example, we might be interested in comparing the mean efficacies of two medical treatments. 
* Data: We assume we have two sets of data drawn from normal distributions
   $$
   x_1, x_2, \dots, x_n \sim N(\mu_1, \sigma)^2
   $$
   $$
   y_1, y_2, \dots, y_n \sim N(\mu_2, \sigma)^2
   $$
   where the means $\mu_1$ and $\mu_2$ and the variance $\sigma^2$ are all unknown. Notice the assumption that the two distributions have the same variance. Also notice that there are $n$ samples in the first group and $m$ samples in the second. 
* Null hypothesis: $\mu_1=\mu_2$. (The values of $\mu_1$ and $\mu_2$ are not specified)
* Test statistic: 
   $$
   t = \frac{\bar{x}-\bar{y}}{s_p}
   $$
   where $s_p^2$ is the pooled variance
   $$
   s_p^2 = \frac{(n-1)s_x^2 + (m-1)s_y^2}{n+m-2} \left(\frac{1}{n} + \frac{1}{m}\right)
   $$
   here $s_x^2$ and $s_y^2$ are the sample variances of the $x_i$ and $y_j$ respectively. The expression for $t$ is somewhat complicated, but the basic idea remains the same and it still results in a known null distribution. 
* Null distribution: $f(t|H_0)$ is the pdf of $T\sim t(n+m-2)$ 
* One sided $p$-value (right side): $p=P(T>t|H_0)$
   One-sided $p$-value (left side): $p=P(T<t |H_0 )$
   Two-sided $p$-value: $p=P(|T|>|t|)$1


## 17. Comparison of Frequentist and Bayesian Inference

* Bayesian inference
   * uses probabilities for both hypothesis and data.
   * depends on the prior and likelihood of observed data.
   * requires one to know or construct a 'subjective prior'.
   * dominated statistical practice before the 20th century.
   * may be computationally intensive due to integration over many parameters. 
* Frequentist inference (NHST)
   * never uses or gives the probability of a hypothesis (no prior or posterior).
   * depends on the likelihood $P(D|H)$ for both observed and unobserved data. 
   * does not require a prior
   * dominated statistical practice during the 20th century
   * tends to be less computationally intensive. 

## 18. Confidence intervals
Suppose we have a model (probability distribution) for observed data with an unknown parameter. We have seen how NHST uses data to test the hypothesis that the unknown parameter has a particular value. Statisticians augment point estimates with confidence intervals. For example, to estimate an unknown mean $\mu$ we might be able to say that our best estimate of the mean is $\bar{x}=2.2$ with $95\%$ confidence interval. You should think of the confidence level of an interval as analogous to the significance level of a NHST. 

### Based on normal data

#### Interval statistics
Technically an interval statistic is nothing more than a pair of point statistics giving the lower and upper bounds of the interval. Our reason for emphasizing that the interval is a statistic is to highlight the following:
1. The interval is random - new random data will produce a new interval
2. As frequentists, we perfectly happy using it because it doesn't depend on the value of an unknown parameter or hypothesis
3. As usual with frequentist statistics we have to assume a certain hypothesis, e.g. value of $\mu$, before we can compute probabilities about the interval.
4. Be careful in your thinking about these probabilities. Confidence intervals are a frequentist notion. Since frequentists do not compute probabilities of hypothesis, the confidence level is never a probability that the unknown parameter is in the confidence interval

#### $z$ confidence intervals for the mean
Throughout this section we will assume that we have normally distributed data: 
$$
x_1, x_2, \dots, x_n\sim N(\mu, \sigma^2)
$$

Def: Suppose the data $x_1, x_2, \dots, x_n\sim N(\mu, \sigma^2)$, with unknown mean $\mu$ and known variance $\sigma^2$. The $(1-\alpha)$ confidence interval for $\mu$ is 
$$
\left[\bar{x} - \frac{z_{\alpha/2}\cdot \sigma}{\sqrt{n}},\ \bar{x} + \frac{z_{\alpha/2}\cdot \sigma}{\sqrt{n}}\right]
$$
where $z_{\alpha/2}$ is the right critical value $P(Z>z_{\alpha/2}) = \alpha/2$.

#### Manipulating intervals: pivoting
Here is a quick summary of intervals around $\bar{x}$ and $\mu_0$ and what is called pivoting. Pivoting is the idea the $\bar{x}$ is in $\mu_0 \pm a$ says exactly the same thing as $\mu_0$ is in $\bar{x}\pm a$. 

There is a symmetry: $\bar{x}$ is in the interval $[\mu_0-\sigma/\sqrt{n}, \mu_0+\sigma/\sqrt{n}]$ is equivalent to $\mu_0$ is in the interval $[\bar{x} - \sigma/\sqrt{n}, \bar{x} + \sigma/\sqrt{n}]$. 

#### $t$-confidence intervals for the mean
This will be nearly identical to normal confidence intervals. In this setting $\sigma$ is not known, so we have to make the following replacements.
1. Use $s_{\bar{x}}=\frac{s}{\sqrt{n}}$ instead of $\sigma_{\bar{x}}=\frac{\sigma}{\sqrt{n}}$. Here $s$ is the sample variance we used before in $t$-tests. 
2. use $t$-critical values instead of $z$-critical values. 

Def: Suppose that $x_1, x_2, \dots, x_n\sim N(\mu, \sigma^2)$, where the values of the mean $\mu$ and the standard deviation $\sigma$ are both unknown. The $(1-\alpha)$ confidence interval for $\mu$ is 
$$
[\bar{x}-\frac{t_{\alpha/2}\cdot s}{\sqrt{n}}, \bar{x} + \frac{t_{\alpha/2}\cdot s}{\sqrt{n}}]
$$
here $t_{\alpha/2}$ is the right critical value $P(T>t_{\alpha/2})=\alpha/2$ for $T\sim t(n-1)$ and $s^2$is the sample variance of the data.

Suppose that $n$ data points are drawn from $N(\mu, \sigma^2)$ where $\mu$ and $\sigma$ are unknown. We'll derive the $t$ confidence interval following the same pattern as for the $z$ confidence interval. Under the null hypothesis $\mu=\mu_0$, we have $x_i\sim N(\mu_0, \sigma^2)$. So the studentized mean follows a Student $t$ distribution with $n-1$ degrees of freedom: 
$$
t= \frac{\bar{x}-\mu_0}{s/\sqrt{n}} \sim t(n-1)
$$
Let $t_{\alpha/2}$ be the critical value: $P(T>t_{\alpha/2})=\alpha/2$, where $T\sim t(n-1)$. We know from running one-sample $t$-tests that the non-rejection region is given by 
$$
|t| \leq t_{\alpha/2}
$$
Using the definition of the $t$-statistic to write the rejection region in terms of $\bar{x}$ we get: at significance level $\alpha$ we don't reject if 
$$
|\bar{x}-\mu_0| \leq t_{\alpha/2}\cdot \frac{s}{\sqrt{n}}
$$
Geometrically, the right hand side says that we don't reject if 
$$
\mu_0 \text{ is within }t_{\alpha/2}\cdot \frac{s}{\sqrt{n}}\text{ of }\bar{x}
$$
This is exactly equivalent to saying that we don't reject if 
$$
\text{the interval }[\bar{x}-\frac{t_{\alpha/2}\cdot s}{\sqrt{n}}, \bar{x} + \frac{t_{\alpha/2}\cdot s}{\sqrt{n}}]\text{ contains }\mu_0
$$

#### Chi-square confidence intervals for the variance
Def: Suppose the data $x_1, \dots, x_n$ is drawn from $N(\mu, \sigma^2)$ with mean $\mu$ and standard deviation $\sigma$ both unknown. The $(1-\alpha)$ confidence interval for the variance $\sigma^2$ is 
$$
\frac{(n-1)s^2}{c_{\alpha/2}},\quad \frac{(n-1)s^2}{c_{1-\alpha/2}}
$$
Here $c_{\alpha/2}$ is the right critical value $P(X^2 > c_{\alpha/2}) = \alpha/2$ for $X^2\sim \chi^2(n-1)$ and $s^2$ is the sample variance of the data. 

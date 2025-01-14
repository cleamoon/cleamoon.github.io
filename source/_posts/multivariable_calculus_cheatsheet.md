---
title: Multivariable Calculus Cheatsheet
date: 2022-01-29
tags: [Mathematics]
---

A cheatsheet of basic multivariable calculus. 

<!-- more -->

## Terminology and notation

**Vector**: We will denote vectors in the plane by $(x,y)$



**Orthogonal**: Two vectors are orthogonal if their dot product is zero, i.e. $\vec{v}=(v_1, v_2)$, and $\vec{w}=(w_1, w_2)$ are orthogonal if 
$$
\vec{v}\cdot\vec{w}=(v_1\cdot v_2)\cdot(w_1\cdot w_2) = v_1w_1 + v_2w_2 = 0
$$

**Composition**: Composition of functions will be denoted $f(g(z))$ or $f\circ g(z)$.



## Parametrized curves

We often use $\gamma$ for parametrized curve, i.e. 
$$
\gamma(t) = (x(t), y(t))
$$
The tangent vector
$$
\gamma'(t)=(x'(t), y'(t))
$$
is tangent to the curve at the point $(x(t), y(t))$. It's length $|\gamma'(t)|$ is the instantaneous speed of the moving point. 



## Chain rule

For a function $f(x,y)$ and a curve $\gamma(t)=(x(t), y(t))$ the chain rule gives
$$
\frac{d\,f(\gamma(t))}{dt}=\frac{\partial f}{\partial x}\bigg\rvert_{\gamma(t)} x'(t) + \frac{\partial f}{\partial y}\bigg\rvert_{\gamma(t)} y'(t) = \nabla f(\gamma(t))\cdot \gamma'(t)
$$


## Grad, curl and div

**Gradient**: For a function $f(x,y)$, the gradient is defined as $\text{grad }f=\nabla f=(f_x, f_y)$. A vector field $\vec{F}$ which is the gradient of some function is called a gradient vector field. 



**Curl**: For a vector in the plane $\vec{F}(x,y)=(M(x,y), N(x,y))$, we define
$$
\text{curl }\vec{F}=N_x-M_y
$$


**Divergence**: The divergence of the vector field $\vec{F}=(M, N)$ is 
$$
\text{div }\vec{F}=M_x + N_y
$$


## Level curves

The level curves of a function $f(x,y)$ are the curves given by $f(x,y)=\text{ constant}$. The gradient $\nabla f$ is orthogonal to the level curves of $f$. 



## Line integrals

The ingredients for line (also called path or contour) integrals are the following:

* A vector field $\vec{F}=(M,N)$
* A curve $\gamma(t)=(x(t), y(t))$ defined for $a\leq t \leq b$

The the line integral of $\vec{F}$ along $\gamma$ is defined by
$$
\int_\gamma\vec{F}\cdot d\,\vec{r}=\int_a^b\vec{F}(\gamma(t))\cdot\gamma'(t)dt=\int_\gamma Mdx+Ndy
$$


### Properties of line integrals

1. Independent of parametrization

2. Reverse direction on curve $\Rightarrow$ change sign. That is,
   $$
   \int_{-C}\vec{F}\cdot d\vec{r}=-\int_C\vec{F}\cdot d\vec{r}
   $$



### Fundamental theorem for gradient fields

If $\vec{F}=\nabla f$, then $\int_\gamma \vec{F}\cdot d\vec{r}=f(P)-f(Q)$, where $Q,P$ are the beginning and endpoints respectively of $\gamma$. 



Def: If a vector field $\vec{F}$ is a gradient field, with $\vec{F}=\nabla f$, then we call $f$ a potential function for $\vec{F}$.



### Path independence and conservative functions

Def: For a vector field $\vec{F}$, the line integral $\int \vec{F}\cdot d\vec{r}$ is called path independent if, for any two points $P$ and $Q$, the line integral has the same value for every path between $P$ and $Q$. 



Theorem: $\int_C \vec{F}\cdot d\vec{r}$ is path independent is equivalent to $\oint \vec{F}\cdot d\vec{r}=0$ for any closed path. 



Def: A vector field with path independent line integrals, equivalently a field whose line integrals around any closed loop is 0 is called a conservative vector field.



## Green's theorem

$C$ is a simple closed curve, and $R$ the interior of $C$. $C$ must be positively oriented (traversed so interior region $R$ is on the left) and piecewise smooth (a few corners are okay). 



Green theorem: If the vector field $\vec{F}=(M,N)$ is defined and differentiable on $R$ then 
$$
\oint_C Mdx+Ndy=\iint_R (N_x-M_y) dA
$$
In vector form this is written
$$
\oint_C \vec{F}\cdot d\vec{r}=\iint_R\text{curl }\vec{F} d\,A
$$
where the curl is defined as $\text{curl }\vec{F}=(N_x-M_y)$.



### Extensions and applications of Green's theorem

### Simply connected regions

Def: A region $D$ in the plane is simply connected if it has "no holes". 



### Potential theorem

**Potential Theorem**: Take $\vec{F}=(M,N)$ defined and differentiable on a region $D$.

1. If $\vec{F}=\nabla f$ then $\text{curl }\vec{F}=N_x-M_y=0$.
2. If $D$ is simply connected and $\text{curl }\vec{F}=0$ on $D$, then $\vec{F}=\nabla f$ for some $f$. 



#### Extended Green's theorem

We can extend Green's theorem to a region $R$ which has multiple boundary curves. Suppose $R$ is the region between the two simple closed curves $C_1$ and $C_2$. Then we can extend Green's theorem to this setting by
$$
\oint_{C_1}\vec{F}\cdot d\vec{r}+\oint_{C_2}\vec{F}\cdot d\vec{r}=\iint_R\text{curl }\vec{F}\,dA
$$

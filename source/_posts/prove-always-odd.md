---
title: Prove of that $\lfloor(2+\sqrt{3})^n\rfloor$ is always odd for integer $n\geq 0$
date: 2020-03-09 19:00:00
mathjax: true
tags: [Mathematics]
---

Let's prove the theorem in the title. 

<!-- more -->
We have the followig relations: 
$$
(2+\sqrt{3})^n = \sum_{k=0}^{n} 2^{n-k} (\sqrt{3})^k 
$$
and
$$
(2-\sqrt{3})^n = \sum_{k=0}^{n} (-1)^k 2^{n-k} (\sqrt{3})^k 
$$

Thus 
$$
\begin{equation*}
\begin{aligned}
(2+\sqrt{3})^n + (2-\sqrt{3})^n & = \sum_{k=0}^{n} \left[2^{n-k}\times (\sqrt{3})^k + (-1)^k 2^{n-k}  \times(\sqrt{3})^k\right] \\
& = \sum_{k=0, \text{ k is even}}^{n} 2 \times 2^{n-k} \times (\sqrt{3})^k 
\end{aligned}
\end{equation*}
$$

When $k$ is an even number, $(\sqrt{3})^k$ will be an integer. Then the right-hand side of the equation above is clearly a even number. Furthermore, $2-\sqrt{3} < 1$ which implies that $(2-\sqrt{3})^n < 1$ for all integer $n\geq 0$. Then we know that 
$$
0 <= \text{An even number} - (2+\sqrt{3})^n < 1 \Rightarrow \lfloor(2+\sqrt{3})^n\rfloor = \text{This even number}
$$

Q.E.D

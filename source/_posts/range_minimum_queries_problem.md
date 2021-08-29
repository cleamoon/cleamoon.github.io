---
title: The Range Minimum Query Problem
date: 2021-06-08
mathjax: true
tags: [Data structure, Algorithm, Course note]
---


In this article, data structures that are used to solve the range minimum query problem is presented. 

<!-- more -->

### The Range Minimum Query problem (RMQ)

* Given an array $A$ and two indices $i\leq j$, what is the smallest element out of $A[i], A[i+1], \dots, A[j-1],A[j]$

* Notation: $RMQ_A(i,j)$



### A trivial solution

* Just iterate across the elements between $i$ and $j$
* Problem: If $A$ is fixed in advance and we are going to make multiple queries on it



### A different approach 

* There are only $\Theta(n^2)$ possible RMQs in an array of length $n$
* If we precompute all of them, we can answer $RMQ$ in time $O(1)$ per query

* Building the table: we can precompute all subarrays in time $\Theta(n^2)$ using dynamic programming



### Some notation

* We will say that an RMQ data structure has time complexity $\langle p(n),q(n)\rangle$ if
  * Preprocessing takes time at most $p(n)$ and
  * queries take time at most $q(n)$
* We now have two RMQ data structures
  * $\langle O(1), O(n)\rangle$ with no preprocessing
  * $\langle O(n^2), O(1)\rangle$ with full preprocessing

* Is there a "golden mean" between these extremes?



### Another approach: Block decomposition

* Split the input into $O(n/b)$ blocks of some block size $b$
* Compute the minimum value in each block



#### Analyzing the approach

* Preprocessing time:
  * $O(b)$ works on $O(n/b)$ blocks to find minima
  * Total work: $O(n)$
* Time to evaluate $RMQ_A(i,j)$
  * $O(1)$ work to find block indices (divide by block size)
  * $O(b)$ work to scan inside $i$ and $j$'s blocks
  * $O(n/b)$ work looking at block minima between $i$ and $j$
  * Total work: $O(b+n/b)$



#### Intuiting $O(b+n/b)$

* As $b$ increases

  * The $b$ term rises (more elements to scan within each block)
  * The $n/b$ term drops (fewer blocks to look at)

* Is there an optimal choice of b given these constraints?

  * Starting by taking the derivative:
    $$
    \frac{d}{db}(b+n/b) = 1-\frac{n}{b^2}
    $$
    Which gives $b=\sqrt{n}$

  * Then the runtime is $O(n^{1/2})$

* Then the block partition method has: $\langle O(n), O(n^{1/2})\rangle$



### A second approach: Sparse tables

* Can we still get constant-time queries without preprocessing all possible ranges?
* Goal: precompute RMQ over a set of ranges such that 
  * There are $o(n^2)$ total ranges, but
  * There are enough ranges to support $O(1)$ query times

* The approach
  * For each index $i$, compute RMQ for ranges starting at $i$ of size $1,2,4,8,16, \dots,2^k$ as long as they fit in the array
  * Gives both large and small ranges starting at any point in the array
  * Only $O(\log n)$ ranges computed for each array element
  * Total number of ranges: $O(n \log n)$
* Claim: Any range in the array can be formed as the union of two of these ranges
* Doing a query
  * Find the largest $k$ such that $2^k \leq j - i +1$ 
    * With the right preprocessing, this can be done in time $O(1)$
  * The range $[i, j]$ can be formed as the overlap of the ranges $[i, i+2^k - 1]$ and $[j-2^k+1, j]$
  * Each range can be looked up in time $O(1)$
  * Total time: $O(1)$
* Precomputing the ranges
  * Using dynamic programming, we can compute all of them in time $O(n\log n)$
* This data structure is called a sparse table
  * It gives an $\langle O(n\log n), O(1)\rangle$ solution to RMQ



### A third approach: Hybrid strategies

* The framework

  * Split the input into blocks of size $b$
  * Form an array of the block minima
  * Construct a "summary" RMQ structure over the block minima
  * Construct "block" RMQ structures for each block
  * Aggregate the results together

* Analyzing efficiency

  * Suppose we use a $\langle p_1(n), q_1(n)\rangle$-time RMQ for the summary RMQ and a $\langle p_2(n), q_2(n)\rangle$-time RMQ for each block, with block size $b$

  * What is the preprocessing time for this hybrid structure?

    * $O(n)$ time to compute the minima of each block
    * $O(p_1(n/b))$ time to construct RMQ on the minima
    * $O((n/b) p_2(b))$ time to construct the block RMQs
    * Total construction time is $O(n+p_1(n/b)+(n/b)p_2(b))$

  * What is the query time for this hybrid structure?

    * $O(q_1(n/b))$ time to query the summary RMQ
    * $O(q_2(b))$ time to query the block RMQs
    * Total query time: $O(q_1(n/b)+q_2(b))$

  * Hybrid preprocessing time:
    $$
    O(n+p_1(n/b)+ (n/b)p_2(b))
    $$

  * Hybrid query time:
    $$
    O(q_1(n/b)+q_2(b))
    $$

* One possible hybrid

  * Set the block size to $\log n$

  * Use a sparse table for the summary RMQ

  * Use the "no preprocessing" structure for each block

  * Preprocessing time:
    $$
    O(n + p_1(n/b) + (n/b)p_2(b))=O(n)
    $$

  * Query time:
    $$
    O(q_1(n/b) + q_2(b)) = O(\log n)
    $$

  * An $\langle O(n), O(\log n)\rangle$ solution!

* Another hybrid

  * Let's suppose we use the $\langle O(n\log n), O(1\rangle)$ sparse table for both the summary and block RMQ structures with a block size of $\log n$

  * The preprocessing time is 
    $$
    O(n+p_1(n/b) + (n/b)p_2(b)) = O(n\log \log n)
    $$

  * The query time is 
    $$
    O(q_1(n/b) + q_2(b)) = O(1)
    $$

  * We have an $\langle O(n\log \log n), O(1)\rangle$ solution to RMQ



### Optimal solution: Cartesian Trees

* From this point forward, let's have $RMQ_A(i,j)$ denote the index of the minimum value in the range rather than the value itself

* Some notation

  * Let $B_1$ and $B_2$ be blocks of length $b$

  * We will say that $B_1$ and $B_2$ have the same block type (denoted $B_1 \sim B_2$) if the following holds:
    $$
    \text{For all }0\leq i\leq j<b: RMQ_{B_1}(i,j)=RMQ_{B_2}(i,j)
    $$

  * Intuitively, the RMQ answers for $B_1$ are always the same as the RMQ answers for $B_2$ 

  * If we build an RMQ to answer queries on some block $B_1$, we can reuse that RMQ structure on some other block $B_2$ iff $B_1 \sim B_2$

* Detecting block types

  * If $B_1$ and $B_2$ have the same permutation on their elements, then $B_1\sim B_2$
  * Claim: If $B_1\sim B_2$, the minimum elements of $B_1$ and $B_2$ must occur at the same position
    * This property must hold recursively on the subarrays to the left and right of the minimum

* Cartesian trees

  * The Cartesian trees for an array is a binary tree obeying the min-heaps property (each node's value is at least as large as its parent's) whose inorder traversal (from left to right) gives back the original array
  * A Cartesian tree for an array is a binary tree built as follows:
    * The root of the tree is the minimum element of the array
    * Its left and right subtrees are formed by recursively building Cartesian trees for the subarrays to the left and right of the minimum
    * Base case: if the array is empty, the Cartesian tree is empty
  * Cartesian trees and RMQ
    * Theorem: Let $B_1$ and $B_2$ be blocks of length $b$. Then $B_1\sim B_2$ iff $B_1$ and $B_2$ have isomorphic ("same shape") Cartesian trees
  * Building Cartesian trees
    * High-level idea: Build a Cartesian tree for the first element, then the first two, then the first three, then the first four, etc
    * We can implement this algorithm efficiently by maintaining a stack of the nodes in the right spine
    * Pop the stack until the new value is no bigger than the stack top (or the stack is empty). Remember the last node popped this way
    * Rewire the tree by
      * making the stack top point to the new node, and
      * making the most-recently-popped node the new node's left child
    * This algorithm takes time $O(k)$ on an array of size $k$
      * Idea: each element is pushed onto the stack at most once, when it's created. Each element can therefore be popped at most once
      * Therefore, there are at most $O(k)$ pushes and $O(k)$ pops, so the runtime is $O(k)$

* Theorem: The number of distinct Cartesian tree shapes for arrays of length b is at most $4^b$ 

  * The actual number is $\frac{1}{b+1}\binom{2b}{b}$ which is roughly equal to $\frac{4^b}{b^{3/2}\sqrt{\pi}}$
  * Reference: Catalan numbers
  * There are at most $2b$ stack operations during the execution of the algorithm: $b$ pushes and no more than $b$ pops
  * Represent the execution of the algorithm as a $2b$-bit number, where 1 means "push" and 0 means "pop". We will pad the end with 0's. This number is the Cartesian tree number of a block

* Observation: If all we care about is finding blocks that can share RMQ structures, we never need to build Cartesian trees. Instead, we can just compute the Cartesian tree number for each block

* How efficient is this?

  * We are using the hybrid approach, and all the types we're using have constant query times. Query time: $O(1)$

  * Our preprocessing time is:
    $$
    O(n+(n/b)\log(n/b)+ b^24^b)
    $$
    The term $n$ is for computing block minima, compute Cartesian tree numbers of each block

    The term $(n/b)\log(n/b)$ is for building a sparse table on blocks of size $n/b$

    The term $b^24^b$ is for constructing at most $4^b$ block-level RMQ structures at a cost of $O(b^2)$ each

  * Suppose we pick $b=k\log_4 n$ for some constant $k$, then the preprocessing time is
    $$
    O(2n + (\log n)^2n^k)
    $$
    For $k=1/2$, it is:
    $$
    O(n)
    $$

* This data structure is called the Fischer-Heun structure. It uses a modified version of our hybrid RMQ framework:

  * Set $b=\frac{1}{2}\log_4n=\frac{1}{4}\log_2n$
  * Split the input into blocks of size $b$. Compute an array of minimum values from each block
  * Build a sparse table on that array of minima
  * Build per-block RMQ strctures for each block, using Cartesian tree numbers to avoid recomputing RMQ structures unnecessarily
  * Make queries using the standard hybrid solution approach

* This is an $\langle O(n), O(1)\rangle$ solution to RMQ

* The technique emplyed here is an example of the Method of Four Russians or a Four Russians Speedup. Think of it as "divide, precompute, and conquer"

  * Break the problem of size $n$ into subproblems of size $b$, plus some top-level problem of size $n/b$

    * This is called a macro/micro decomposition

  * Solve all posible subproblems of size $b$

    * Here, we only solved the subproblems that actually came up in the original array, but that's just an optimization

  * Solve the overall problem by combining solutions to the micro and macro problems

    
### Reference
* [Stanford online courses](https://online.stanford.edu/free-courses)
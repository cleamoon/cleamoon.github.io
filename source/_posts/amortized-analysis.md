---
title: An Brief Introduction to Amortized Analysis
date: 2021-11-16
mathjax: true
tags: [Data structure, Algorithm, Course note]
---

Sometimes we want to design data structures that trade per-operation efficiency for overall efficiency. To analyze efficiency of these data structures, we will need to use amortized analysis. 

<!-- more -->

# Examples

## The two-stack queue

* Maintain an *In* stack and an *Out* stack. 
* To enqueue an element, push it onto the *In* stack. 
  * Each enqueue takes time $O(1)$.
    * Just push an item onto the *In* stack.
* To dequeue an element: 
  * If the *Out* stack is nonempty, pop it. 
  * If the *Out* stack is empty, pop lements from the *In* stack, pushing them into the *Out* stack. Then dequeue as usual. 
  * Dequeues can vary in their runtime. 
    * Could be $O(1)$ if the *Out* stack isn't empty. 
    * Could be $\Theta(n)$ if the *Out* stack is empty. 
    * It's wrong, but useful, to pretend the cost of a dequeue is $O(1)$.
      * Some operations take more time than this.
      * However, if we pretend each operation takes time $O(1)$, then the sum of all the costs never underestimates the total. 
* Intuition: We only do expensive dequeues after a long run of cheap enqueues. 
  * Provided we move all items from *In* to *Out* at once, and provided that enqueue items accumulate slowly, this is a fast strategy. 
* Key fact: Any series of $m$ operations on a two-stack queue will take time $O(m)$.
  * Each item is pushed into at most two stacks and popped from at most two stacks. 
  * Adding up the work done per element across all $m$ operations, we can do at most $O(m)$ work.

## Dynamic arrays

* A dynamic array is the most common way to implement a list of values. 

* Maintain an array slihtly biggerthan the one you need. When you run out of space, double the array size and copy the elements over.

* Most appends to a dynamic array take time $O(1)$. 

* Infrequently, we do $\Theta(n)$ work to copy all $n$ elements from the old array to a new one. 

* Claim: The cost of doing $n$ appends to an initially empty dynamic array is always $O(n)$.
  
  * The array doubles at sizes $2^0, 2^1, 2^2, \dots$, etc. 
  
  * The very last doubling is at the largest power of two less than $n$. This is at most $2^{\lfloor\log_2 n\rfloor}$. 
  
  * Total work done across all doubling is at most
    $$
    \begin{aligned}
    2^0 + 2^1 + \dots + 2^{\lfloor\log_2 n\rfloor} &= 2^{\lfloor\log_2 n\rfloor + 1} -1 \\
    &\leq 2^{\log_2 n + 1} \\ &= 2n
    \end{aligned}
    $$
  
  * It's wrong, but useful, to pretend that the cost of an append is $O(1)$.

## Building B-Trees

* You are given a sorted list of $n$ values and a value of $b$. 
* What's the most efficient way to construct a B-tree of order $b$ holding these $n$ values? 
  * Idea 1: Insertthe items into an empty B-tree in sorted order.
    * Cost: $\Omega(n \log_b n)$, due to the top-down search.
  * Idea 2: Since all insertions will happen at the rightmost leaf, store a pointer to that leaf. Add new values by appending to this leaf, then doing any necessary splits. 
    * Cost: The cost of an insert varies based on the shape of the tree. 
      * If no splits are required, the cost is $O(1)$.
      * If one split is required, the cost is $O(b)$. 
      * If we have to split all the way up, the cost is $O(b\log_b n)$
    * Using our worst-case cost across $n$ inserts gives a runtime bound of $O(nb\log_b n)$
    * Claim: The cost of $n$ inserts is always $O(n)$
    * If is wrong, but useful, to pretend that the cost of an insert is $O(1)$
      * Some operations take more time than this
      * However, pretending each insert takes time $O(1)$ never underestimates the total amount of work done across all operations. 

# Amortized analysis

## The setup

* We now have three examples of data strucutres where
  
  * individual operations may be slow, but 
  
  * any series of operations is fast

* Giving weak upper bounds on the cost of each operation is not useful for making predictions.

* How can we clearly communicate when a situation like this one exists?

## Key idea

* Backcharge expensive operations to cheaper ones. 
  
  * For the real costs, most operations are fast, but we can't get a nice upper bound on any one operation cost. 
  * For the amortized costs, each operation is still reasonably fast, and all of them are nicely bounded from above.

* Assign each operation a (fake) cost called its amortized cost such that, for any series of operations performed, the following is true:
  
  $$
  \sum \text{amortized} - \text{cost} \geq 
  \sum \text{real} - \text{cost}
  $$

* Key intuition: amortized costs shift work backwards from expensive operations onto cheaper ones.

## Formalizing this idea

### Assigning amortized costs

* The approach we've taken so far for assigning amortized costs is called an aggregate analysis. 
  
  * Directly compute the maximum possible work done across any sequence of operations, then divide that by the number of operations.

* This approach works well here, but it doesn't scale well to more complex data structures.
  
  * What if different operations contribute to / clean up messes in different ways?
  
  * What if it's not clear what sequence is the worst-case sequence of operations?

* In practice, we tend to use a different strategy called the potential method to assign amortized costs. 

### Potential functions

* To assign amortized costs, we'll need to measure how "messy" the data structure is.

* For each data structure, we define a potential function $\Phi$ such that
  
  * $\Phi$ is small when the data strucuture is "clean"
  
  * $\Phi$ is large when the data structure is "messy"

* Once we've chosen a potential function $\Phi$, we define the amortized cost of an operation to be:
  
  $$
  \begin{aligned}
  \text{amortized-cost} &= \sum\left(
  \text{actual-cost} + O(1)\cdot \Delta\Phi
  \right)\\
  &=\sum\text{actual-cost} + O(1)\cdot\sum\Delta\Phi\\
  &=\sum\text{actual-cost} + O(1)\cdot
  (\Phi_\text{end} - \Phi_\text{start})
  \end{aligned}
  $$
  
  where $\Delta\Phi$ is the difference between $\Phi$ just after the operation finishes and $\Phi$ just before the operation started:
  
  $$
  \Delta \Phi = 
  \Phi_\text{after} - \Phi_\text{before}
  $$

* Intuitively:
  
  * if $\Phi$ increases, the data structure got "messier", and the amortized cost is higher than the real cost.
  
  * If $\Phi$ decreases, the data strucutre got "cleaner", and the amortized cost is lower than the real cost. 

* Let's make two assumptions: 
  
  * $\Phi$ is always nonnegative.
  
  * $\Phi_\text{start}=0$
  
  * Thus, $\sum\text{amortized-cost}\geq\sum\text{real-cost}$. 

* For example, for two-stack queues: 
  
  * $\Phi=$ height of *In* stack. 
  
  * Theorem: The amortized cost of anny enqueue or dequeue operation on a two-stack queue is $O(1)$.

* For example, for dynamic arrays
  
  * Goal: Choose potential function $\Phi$ such that the amortized cost of an append is $O(1)$. 
  
  * Intuition: $\Phi$ should measure how "messy" the data strucuture is.
    * Having lots of free slots means there's very little mess.
    * Having few free slots means there's a lot of mess.
  
  * We can come up with
    $$
    \Phi = \#\text{elems} - \#\text{free-slots}
    $$
  
  * Theorem: The amortized cost of an append to a dynamic array is $O(1)$. 

* For example, building B-trees. 
  
  * What is the actual cost of appending an element?
    * Suppose that we perform splits at $L$ layers in the tree.
    * Each split takes time $\Theta(b)$ to copy and move keys around.
    * Total cost: $\Theta(bL)$.
  
  * Goal: Pick a potential function $\Phi$ so that we can offset this cost and make each append cost amortized $O(1)$.
  
  * Let $\Phi$ be the number of keys on the right spine
  
  * Each split moves (roughly) half the keys from the split node into a node off the right spine. 
  
  * Change in potential per split: $-\Theta(b)$.
  
  * Net $\Delta\Theta:-\Theta(bL)$.

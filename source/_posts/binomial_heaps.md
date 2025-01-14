---
title: Introduction to Binomial Heap
date: 2021-12-28
mathjax: true
tags: [Data structure, Algorithm, Course note]
---

Binomial heap is a useful data structure. This article will introduce some basic properties of binomial heap. 

<!-- more -->

## Binomial Heaps

### Priority queues
* A Priority queue is a data structure that supports these operations:
    * `pq.enqueue(v, k)`, which enqueues element `v` with key `k`
    * `pq.find-min()`, which returns the element with the least key
    * `pg.extract-min()`, which removes and returns the element with the least key
* Priority queues in practice
    * They're useful as building blocks in a bunch of algorithms
    * Many graph algorithms directly rely priority queues supporting extra operations:
        * `meld(pq1, pq2)`: Destroy `pq1` and `pq2` and combine their elements into a single priority queue. (MSTs via Cheriton-Tarjan)
        * `pq.decrease-key(v, k')`: Given a pointer to element `v` already in the queue, lower its key to have new value `k'`. (Shortest paths via Dijkstra, global min-cut via Stoer-Wagner)
        * `pq.add-to-all(dk)`: Add `dk` to the keys of each element in the priority queue, typically used with meld. (Optimum branchings via Chu-Edmonds-Liu)

### Binary heaps
* Priority queues are frequently implemented as binary heaps
    * `enqueue` and `extract-min` run in time $O(\log n)$; `find-min` runs in time $O(1)$
* These heaps are surprisingly fast in practice. It's tough to beat their performance.
    * $d$-ary heaps can outperform binary heaps for a well-tuned value of $d$, and otherwise only these sequence heap is known to specifically outperform this family.
    * In that case, why do we need other heaps?

## Meldable Priority Queues
* A priority queue supporting the meld operation is called a meldable priority queue. 
* Efficiently meldable queues
    * Standard binary heaps do not efficiently support meld
    * Intuition: Binary heaps are complete binary trees, and two complete binary cannot easily be linked to one another.
    * A different intuition
* Building a priority queue
    * Idea: Store elements in "packets" whose sizes are powers of two and meld by "adding" groups of packets.
    * What properties must our packets have?
        * Sizes must be powers of two. 
        * Can efficiently fuse packets of the same size.
            * As long as the packets provide $O(1)$ access to the minimum, we can execute find-min in time $O(\log n)$
        * Can efficiently find the minimum element of each packet. 
* Inserting into the queue
    * If we can efficiently meld two priority queues, we can efficiently enqueue elements to the queue. 
    * Idea: Meld together the queue and a new queue with a single packet. 
        * Time required: $O(\log n)$ fuses. 
* Deleting the minimum
    * After losing an element, the packet will not necessarily hold a number of elements that is a power of two. 
    * If we have a packet with $2^k$ elements in it and remove a single element, we are left with $2^k-1$ remaining elements. 
    * Idea: "Fracture" the packet into $k$ smaller packets, then add them back in. 
        * We can `extract-min` by fracturing the packet containing the minimum and adding the fragments back in.
        * Runtime is $O(\log n)$ fuses in meld, plus fracture cost. 
* What properties must our packets have? 
    * Size is a power of two.
    * Can efficiently fuse packets of the same size. 
    * Can efficiently find the minimum element of each packet. 
    * Ca efficiently "fracture" a packet of $2^k$ nodes into packets of $2^0, 2^1, \dots, 2^{k-1}$ nodes.


## Binomial trees
* A binomial tree of order $k$ is a type of tree recursively defined as follows: 
    * A binomial tree of order $k$ is a single node whose children are binomial trees of order $0, 1, 2, \dots, k-1$.
* Theorem: A binomial tree of order $k$ has exactly $2^k$ nodes.
    * Proof: Induction on $k$. 
    Assume that binomial trees of orders $0, 1, \dots, k-1$ have $2^0, 2^1, \dots, 2^{k-1}$ nodes. The number of nodes in an order-$k$ binomial tree is
    $$
    2^0 + 2^1 + \dots + 2^{k-1} +1 = 2^k
    $$
    So the claim holds for $k$ as well. 
* A heap-ordered binomial tree is a binomial tree whose nodes obey the heap property: all nodes are less than or equal to their descendants. 
    * We will use heap-ordered binomial trees to implement our "packets" 
    * Make the binomial tree with the larger root the first child of the tree with the smaller root.
* A binomial heap is a collection of binomial trees stored in ascending order of size. 
    * Operations defined as follows: 
        * `meld(pq1, pq2)`: Use addition to combine all the trees
            * Fuses $O(\log n + \log m)$ trees. Cost: $O(\log n + \log m)$. Here assume one binomial heap has $n$ nodes, the other $m$.
        * `pq.enqueue(v, k)`: Meld `pq` and a singleton heap of `(v, k)`
            * Total time: $O(\log n)$
        * `pq.find-min()`: Find the minimum of all tree roots.
            * Total time: $O(\log n)$
        * `pq.extract-min()`: Find the min, delete the tree root, then meld together the queue and the exposed children.
            * Total time: $O(\log n)$.
* Theorem: No comparison-based priority queue structure can have `enqueue` and `extract-min` each take time $o(\log n)$. 
    * Proof: Suppose these operations each take time $o(\log n)$. Then we could sort $n$ elements by perform $n$ `enqueue`s and then $n$ `extract-min`s in time $o(n\log n)$. This is impossible with comparison-based algorithms.
    * We can't make both `enqueue` and `extract-min` run in time $o(\log n)$
    * However, we could conceivably make one of them faster.
    * Which one should we prioritize?
        * Probably `enqueue` since we aren't guaranteed to have to remove all added items.
        * Goal: make `enqueue` take time $O(1)$
        * The `enqueue` operation is implemented in terms of `meld`

## Thinking with amortization: Lazy Melding

* Consider the following lazy melding approach: 
    * To meld together two binomial heaps, just combine the two sets of trees together. 
* Intuition: Why do any work to organize keys if we're not going to do an `extract-min`? 
* If we store our list of trees as circularly, doubly-linked lists, we can concatenate tree lists in time $O(1)$. 
    * Cost of a meld: $O(1)$
    * Cost of an enqueue: $O(1)$

### Lazy binomial heap
* A lazy binomial heap is a binomial heap, modified as follows
    * The `meld` operation is lazy. It just combines the two groups of trees together.
    * After doing an `extract-min`, we do a coalesce to combine together trees until there's at most one tree of each order. 
* Intuitively, we'd expect this to amortize away nicely, since the "mess" left by meld gets cleaned up later on by a future `extract-min`.

### Coalescing trees
* The coalesce step repeatedly combines trees together until there's at most one tree of each order. 
* Observation: This would be a lot easier to do if all the trees were sorted by size. 
* We can sort our group of $t$ trees by size in time $O(t\log t)$ using a standard sorting algorithm.
* Better idea: All the sizes are small integers. Use counting sort.
* A faster implementation of coalesce:
    * Distribute the trees into an array of buckets big enough to hold trees of orders $0, 1, 2, \dots, \lceil\log_2 (n+1)\rceil$.
    * Start at bucket 0. While there's two or more trees in the buckets, fuse them and place the result one bucket higher. 
* Analyzing coalesce
    * Claim: Coalescing a group of $t$ trees takes time $O(t + \log n)$.
        * Time to create the array of buckets: $O(\log n)$.
        * Time to distribute trees into buckets: $O(t)$. 
        * Time to fuse trees: $O(t + \log n)$ 
            * Number of fuses is $O(t)$, since each fuse decreases the number of trees by one. Cost per fuse is $O(1)$.
            * Need to iterate across $O(\log n)$ buckets. 
        * Total work done: $O(t+\log n)$
            * In the worst case, this is $O(n)$
    * But these are worst-case time bounds. Intuitively, things should nicely amortize away. 
        * The number of trees grows slowly (one per `enqueue`)
        * The number of trees drops quickly (at most one tree per order) after an `extract-min` 
        * Amortize analyzing: Set $\Phi$ to the number of trees in the lazy binomial heap. 

### Analyzing extract-min
* Suppose we perform an `extract-min` on a binomial heap with $t$ trees in it.
* Initially, we expose the children of the minimum element. This increases the number of trees to $t + O(\log n)$.
* The runtime for coalescing these trees is $O(t+\log n)$.
* When we're done merging, there will be $O(\log n)$ trees remaining, so $\Delta \Phi = -t + O(\log n)$
* Amortized cost is:
    $$
    \begin{aligned}
    & O(t + \log n) + O(1)\cdot (-t +O(\log n))\\
    =& O(t) - O(1)\cdot t + O(1)\cdot O(\log n)\\
    =& O(\log n)
    \end{aligned}
    $$



### Operation costs

* Eager binomial heap:
  * enqueue: $O(\log n)$
  * meld: $O(\log n)$
  * find-min: $O(\log n)$
  * extract-min: $O(\log n)$
* Lazy binomial heap:
  * enqueue: $O(1)$
  * meld: $O(1)$
  * find-min: $O(1)$
  * extract-min: $O(\log n)$ (amortized)




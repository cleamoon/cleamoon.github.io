---
title: An Intuitive Introduction to the Balanced Tree
date: 2021-08-31
mathjax: true
tags: [Data structure, Algorithm, Course note]
---

The balance tree is one of the most widely used data structure. In this article, an intuitive introduction of the balance tree is given in hoping to help you understand the idea behind it. 

<!-- more -->

## Balanced trees

### Balanced trees
* Balanced search trees are among the most useful and versatile data structures
* Many programming languages ship with a balanced tree library
  * C++: `std::map`, `std::set`
  * Java: `TreeMap`, `TreeSet`
* Many advanced data structures are layered on top of balanced trees


### A quick BST review

#### Binary search trees
* A binary search tree is a binary tree with the following properties
  * Each node in the BST stores a key, and optionally, some auxiliary information
  * The key of every node in a BST is strictly greater than all keys to its left and strictly smaller than all keys to its right
* The height of a binary search tree is the length of the longest path from the root to a leaf, measured in the number of edges
  * A tree with one node has height 0
  * A tree with no nodes has height -1, by convention

#### Operation on BST
* Searching a BST
  * Trivial, binary search
* Inserting into a BST
  * Trivial, binary search
* Deleting from a BST
  * Case 0: If the node has no child, just remove it
  * Case 1: If the node has just one child, remove it and replace it with its child
  * Case 2:If the node has two children, find its inorder successor (which has zero or one child), replace the node's key with its successor's key, then delete its successor


#### Runtime analysis
* The time complexity of all these operations is $O(h)$, where $h$ is the height of the tree
  * That's the longest path we can take
* In the best case, $h=O(\log n)$ and all operations take time $O(\log n)$
* In the worst case, $h=\Theta(n)$ and some operations will take time $\Theta(n)$
* Challenge: How do you efficiently keep the height of a tree low?


### A glimpse of red / black trees

#### Red/black trees
* A red/black is a BST with the following properties:
  * Every node is either red or black
  * The root is black
  * No red node has a red child
  * Every root->null path in the tree pass through the same number of black nodes
* Theorem: Any red/black tree with $n$ nodes has height $O(\log n)$
  * There is a simple proof of this we'll see later on
* Given a fixed red/black tree, lookups can be done in time $O(\log n)$

#### Fixing up red/black trees when adding and removing nodes
* The good news: After doing an insertion or deletion, we can locally modify a red/black tree in time $O(\log n)$ to fix up the red/black properties
* The bad news: There are a lof of cases to consider and they are not trivial
* Some questions:
  * How to memorize all the rules?
  * How did anyone come up with red/black trees in the first place?


### B-trees

#### Generalizing BSTs
* In a binary search tree, each node stores a single key
* That key splits the "key space" into two pieces, and each subtree stores the keys in those halves
* In a multiway search tree, each node stores an arbitrary number of keys in sorted order
* A node with $k$ keys splits the key space into $k+1$ regions, with subtrees for keys in each regions
* Surprisingly, it's a bit easier to build a balanced multiway tree than it is to build a balanced BST


#### Balanced multiway trees
* In some sense, building a lanced multiway tree isn't all that hard. We can always just cram more keys into a single node
* At a certain point, this stops being a good idea - it's basically just a sorted array
* What could we do if our nodes get too big?
  * Option 1: Push the new key down into its own node
  * Option 2: Split big nodes in half, kicking the middle key up
  * Assume that, during an insertion, we add keys to the deepest node possible
  * How do these options compare?
    * Option 1: Push keys down into new nodes
      * Simple to implement
      * Can lead to tree imbalances
    * Option 2: Split big nodes, kicking keys higher up
      * Keep the tree balanced
      * Slightly trickier to implement
      * Each existing node's depth just increased by one
  * General idea: Cap the maximum number of keys in a node. Add keys into leaves. Whenever a node gets too big, split it and kick one key higher up the tree
    * Advantage 1: The tree is always balanced
    * Insertions and lookups are pretty fast
* We currently have a mechanical description of how these balanced multiway trees work
  * Cap the size of each node
  * Add keys into leaves
  * Split nodes when they get too big and propagate the splits upward


#### B-Trees
* A B-tree of order $b$ is a multiway search tree where
  * Each node has between $b-1$ and $2b-1$ keys, except the root
  * Each node is either a leaf or has one more child than key
  * All leaves are at the same depth
* Different authors give different bounds on how many keys can be in each node. The ranges are often $[b-1, 2b-1]$ or $[b, 2b]$


#### Analyzing B-trees

##### The height of a B-tree
* What is the maximum possible height of a B-tree of order $b$ that holds $n$ keys
  * The branching factor of the tree is at least $b$, so the number of keys per level grows exponentially in $b$
* Theorem: The maximum height of a B-tree of order $b$ containing $n$ keys is $O(\log_b n)$


##### Analyzing efficiency
* Suppose we have a B-tree of order $b$
* What is the worst case runtime of looking up a key in the B-tree?
  * It depends on how we do the search
  * To do a lookup in a B-tree, we need to determine which child tree to descend into
  * This means we need to compare our query key against the keys in the node
  * How should we do this?
    * Option 1: Use a linear search
      * Cost per node: $O(b)$
      * Nodes visited $O(\log_b n)$
      * Total cost: $O(b)\cdot O(\log_b n)= O(b\log_b n)$
    * Option 2: Use a binary search
      * Cost per node: $O(\log b)$
      * Nodes visited: $O(\log_b n)$
      * Total cost: $O(\log b)\cdot O(\log_b n) = O(\log n)$
    * Intuition: we can't do better than $O(\log n)$ for arbitrary data, because it's the information theoretic minimum number of comparisons needed to find something in a sorted collection
* The cost of an insertion in a B-tree of order $b$ is $O(b\log_b n)$
  * What's the best choice of $b$ to use here?
  * Note: $b\log_b n = (b/\log b)\log n$
  * Pick $b = e$ minimizes $b / \log b$


#### 2-3-4 trees
* A 2-3-4 tree is a B-tree of order 2. Specifically
  * each node has between 1 and 3 keys
  * each node is either a leaf or has one more child than key 
  * all leaves are at the same depth
* In practice, you most often see choices of $b$ like 1024 or 4096


### The memory hierarchy

#### Memory tradeoffs
* There is an enormous tradeoff between speed and size in memory
* SRAM (the stuff registers are made of) is fast but very expensive
  * Can keep up with processor speeds in the GHz
  * SRAM units can't be easily combined together; increasing sizes require better nanofabrication techniques (difficult, expensive)
* Hard disks are cheap but very slow


#### The memory hierarchy
* Idea: try to get the best of all worlds by using multiple types of memory


#### External data structures
* Suppose you have a data set that's way too big to fit in RAM
* The data structure is on disk and read into RAM as needed
* Data from disk doesn't come back one byte at a time, but rather one page at a time
* Goal: Minimize the number of disk reads and writes, not the number of instructions executed

#### B-trees on disk
* Suppose we tune $b$ so that each node in the B-tree fits inside a single disk page
* We only care about the number of disk pages read or written
  * It is so much slower than RAM that it will dominate the runtime
* Because B-tree have a huge branching factor, they're great for on-disk storage
  * Disk block reads/writes are slow compared to CPU operations
  * The high branching factor minimizes the number of blocks to read during a lookup
  * Extra work scanning inside a block offset by these savings
* Major use cases for B-trees and their variants (B$^+$-trees, H-trees, etc.) include
  * Databases (huge amount of data stored on disk)
  * File systems (ext4, NTFS, ReFS)
  * In-memory data structures (due to cache effects)


### Back to red/black trees
* A red/black tree is a BST with the following properties
  * Every node is either red or black
  * The root is black
  * No red node has a red child
  * Every root-null path in the tree passes through the same number of black nodes
* After we hoist red nodes into their parents: 
  * Each "meta node" has 1, 2, or 3 keys in it. (No red node has a red child)
  * Each "meta node" is either a leaf or has one more child than key (Rot null path property)
  * Each "meta leaf" is at the same depth (Root-null path property)
  * This is a 2-3-4 tree!


### Data structure isometries
* Red/black trees are an isometry of 2-3-4 trees; they represent the structure of 2-3-4 trees in a different way
* Many data structure can be designed and analyzed in the same way
* Huge advantage: Rather than memorizing a complex list of red/black tree rules, just think about what the equivalent operations on the corresponding 2-3-4 tree would be and simulate it with BST operations
* Theorem: The maximum height of a red/black tree with $n$ nodes is $O(\log n)$
  * Proof idea: pulling red nodes into their parents forms a 2-3-4 tree with $n$ keys, which has height $O(\log n)$. Undoning this at most doubles the height of the tree


#### Exploring the isometry
* Nodes in a 2-3-4 tree are classified into types based on the number of children they can have
  * 2-nodes have one key (two children)
  * 3-nodes have two keys (three children)
  * 4-nodes have three keys (four children)
* The complex rules on red/black trees make perfect sense if you connect it back to 2-3-4 trees
* There are lots of cases to consider because there are many different ways you can insert into a red/black tree
* Main point: Simulating the insertion of a key into a node takes time $O(1)$ in all cases. Therefore, since 2-3-4 trees support $O(\log n)$ insertions, red/black trees support $O(\log n)$ insertions
* The same is true for deletions


### Dynamic problems

#### Classical algorithms
* The "classical" algorithms model goes something like this: 
  * Given some input $X$, compute some interesting function $f(X)$
  * The input $X$ is provided up front, and only a single answer is produced
* Dynamic versions of problems are framed like this:
  * Given an input $X$ that can change in fixed ways, maintain $X$ while being able to compute $f(X)$ efficiently at any point in time


#### Dynamic selection
* The selection problem is the following:
  * Given a list of distinct values and a number $k$, return the $k$th-smallest value
* In the static case, where the data set is fixed in advance and $k$ is known, we can solve this in time $O(n)$ using quickselect or the median-of-medians algorithm
* Goal: Solve this problem efficiently when the data set is changing - that is, the underlying set of elements can have insertions and deletions intermixed with queries
* We can listing them in a red/black tree and record the order of each number
  * Problem: After inserting a new value, we may have to update $\Theta(n)$ values
  * This is inherent in this solution route. These numbers track global properties of the tree
  * Solution:
    * Mechanically: number each key so that it only stores its order statistic in the subtree rooted at itself
    * Operationally: annotate each key with the number of keys in its left subtree
    * We only update values on nodes that gained a new key in their left subtree. And there are only $O(\log n)$ of these
  * How do we update the numbers after the rotation?

##### Order statistic trees
* This modified red/black tree is called an order statistics tree
  * Start with a red/black tree
  * Tag each node with the number of nodes in its left subtree
  * Use the preceding update rules to preserve values during rotations
  * Propagate other changes up to the root of the tree
* Only $O(\log n)$ values must be updated on an insertion or deletion and each can be updated in time $O(1)$
* It supports all BST operations plus `select` (find $k$th order statistic) and `rank` (given a key, report its order statistic) in time $O(\log n)$


### Generalizing our idea
* Values are localized along the access path
* We can recompute values after a rotation
  * Imagine we cache some value in each node that can be computed just from (1) the node itself and (2) its children's values
  * Recompute values on the access path, bottom-up
* Theorem: Suppose we want to cache some computed value in each node of a red/black tree. Provided that the value can be recomputed purely from the node's value and from it's children's values, and provided that each value can be computed in time $O(1)$, then these values can be cached in each node with insertions, lookups, and deletions still taking time $O(\log n)$

#### Example: Hierarchical clusering
* Dynamic 1D closest points
  * The problem is the following: 
    Maintain a set of real numbers undergoing insertion and deletion while efficiently supporting queries of the form "What is the closest pair of points"
* A tree augmentation
  * Augment each node to store the following:
    * The maximum value in the tree
    * The minimum value in the tree
    * The closest pair of points in the tree
  * Claim: each of these properties can be computed in time $O(1)$ from the left and right subtrees
  * These properties can be augmented into red/black tree so that insertions and deletions take time $O(\log n)$ and "what is the closest pair of points?" can be answered in time $O(1)$
  * Some other questions
    * How would you augment this tree so that you can efficiently (in time $O(1)$) compute the appropriate weighted averages? 
    * Trickier question: Is this the fastest possible algorithm for this problem?

    
### Reference
* [Stanford online courses](https://online.stanford.edu/free-courses)
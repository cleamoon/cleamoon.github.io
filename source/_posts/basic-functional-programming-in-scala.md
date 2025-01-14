---
title: Basic Functional Programming in Scala
date: 2022-06-22 14:04:01
tags: [Course note, Functional programming, Scala, Programming]
---



A brief introduction to functional programming in Scala. 



<!-- more -->



# Main programming paradigms:

* Imperative programming

  * Imperative programming is about:

    * Modifying mutable variables
    * Using assignment
    * Control structures such as if-then-else, loops, return

  * The most common informal way to understand imperative programs is as instruction sequences for a Von Neumann computer

    * There is a strong correspondence between 
      * Mutable variables $\approx$ memory cells
      * Variable dereference $\approx$ load instructions
      * Variable assignment $\approx$ store instructions
      * Control structures $\approx$ jumps

  * Problem: 

    * Scaling up. How can we avoid conceptualising programs word by word? 
    * We need other techniques for defining high-level abstractions
    * Ideally: develop theories of collections, shapes, strings, ...

  * Theory

    * A theory consist of:

      * One or more data types
      * Operations on these types
      * Laws that describe the relationships between values and operations

    * Normally, a theory does not describe mutations

      * For instance the theory of polynomials defines the sum of two polynomials by law such as: 

        (a \* x + b) + (c \* x + d) = (a + c) \* x + (b + d)

        But it does not define an operator to change a coefficient while keeping the polynomial the same

    * Consequently, if we want to implement high-level concept following their mathematical theories, there is no place for mutation

      * The theories do not admit it
      * Mutation can destroy useful laws in the theories
      * Therefore, we want to: 
        * Concentrate on defining theories for operators expressed as functions
        * Avoid mutations
        * Have powerful ways to abstract and compose functions

* Functional programming

  * In a restricted sense, functional programming means programming without mutable variables, assignments, loops, and other imperative control structures
  * In a wider sense, functional programming means focusing on the functions
  * In particular, functions can be values that are produced, consumed, and composed
    * They can be defined anywhere, including inside other functions
    * Like any other value, they can be passed as parameters to functions and returned as results
    * As for other values, there exists a set of operators to compose functions
  * Some functional programming languages
    * In the restricted sense:
      * Pure Lisp, XSLT, XPath, XQuery, FP
      * Haskell (without I/O Monad or UnsafePerformIO)
    * In the wider sense: 
      * Lisp, Scheme, Racket, Clojure
      * SML, Ocaml, F#
      * Haskell
      * Scala
      * Smalltalk, Ruby

* Logic programming



## Element of Programming

Every non-trivial programming language provides: 

* Primitive expressions representing the simplest elements
* Ways to combine expressions
* Ways to abstract expressions, which introduce a name for an expression by which it can then be referred to



## The substitution model

* The idea underlying this model is that all evaluation does is to reduce an expression to a value
* It can be applied to all expressions, as long as they have no side effects
* The substitution model is formalized in the $\lambda$-calculus, which gives a foundation for functional programming



### Call-by-name and call-by-value evaluation strategies in Scala

Both evaluation evaluation strategies reduce an expression to the same final values as long as 

* The reduced expression consists of pure functions
* Both evaluations terminate

Comparison

* Call-by-value has the advantage that it evaluates every function argument only once
* Call-by-name has the advantage that a function argument is not evaluated if the corresponding parameter is unused in the evaluation of the function body
* If CBV evaluation of an expression terminates, then CBN evaluation of the same expression terminates too. 
* The other direction is not true

Scala normally uses call-by-value. But if the type of a function parameter starts with `=>` it uses call-by-name. 

Example: 

```scala
def constOne(x: Int, y: => Int) = 1
```

Then 

```scala
constOne(1+2, infiniteLoop)
```

will be able to terminate. 



## Value definitions in Scala

The `def` form of value definition is "by-name". Its right hand side is evaluated on each use.

The `val` form of value definition is "by-value". Its right hand side is evaluated at the point of the definition itself. Afterward, the name refers to the value. 

```scala
def loop: Boolean = loop
def x = loop  	// this is ok
val x = loop	// this will result in infinite loop
```



## Blocks in Scala

* A block is delimited by braces `{...}`

  ```scala
  { val x = f(3)
   x * x
  }
  ```

* It contains a sequence of definitions or expressions

* The last element of a block is an expression that defines its value

* This return expression can be preceded by auxiliary definitions

* Blocks are themselves expression. A block may appear everywhere an expression can

* The definitions inside a block are only visible from within the block

* The definitions inside a block shadow definitions of the same name outside the block



## Semicolons in Scala

* Semicolons at the end of lines are in most cases optional but if there are more than one statements on a line, they need to be separated by semicolons

* You could write a multi-line expression in parentheses or write the operator at the end of the first line. This tells the Scala compiler that the expression is not yet finished. 

  ```scala
  someLongExpression + 
  someOtherExpression
  
  (someLongExpression
  + someOtherExpression)
  ```



## Rewriting rule

Consider the following situation:

```scala
def f(x1, ..., xn) = B; ... f(v1, ..., vn)
```

This will be later rewritten as the following 

```scala
def f(x1, ..., xn) = B; ... [v1/x1, ..., vn/xn]B
```

Here, `[v1/x1, ..., vn/xn]B` means: 

The expression `B` in which all occurrences of `xi` have been replaced by `vi`. `[v1/x1, ..., vn/xn]` is called a substitution. 



## Tail recursion

* Implementation consideration: if a function calls itself as its last action, the function's stack frame can be reused. This is called tail recursion. Tail recursive function are iterative processes. 

* In general, if the last action of a function consist of calling a function (which may be the same), one stack frame would be sufficient for both functions. Such calls are called tail-calls. 

* In Scala, only directly recursive calls to the current function are optimized

* One can require that a function is tail-recursive using a `@tailrec` annotation: 

  ```scala
  @tailrec
  def gcd(a: Int, b: Int): Int = ...
  ```

* If the annotation is given, and the implementation of `gcd` were not tail recursive, an error would be issued





# Types and Pattern Matching

## Decomposition

Suppose you want to write a small interpreter for arithmetic expressions. To keep it simple, let's restrict ourselves to numbers and additions. Expressions can be represented as a class hierarchy, with a base trait `Expr` and two subclasses, `Number` and `Sum`. To treat an expression, it's necessary to know the expression's shape and its components. This brings us to the following implementation. 



```scala
trait Expr:
	def isNumber: Boolean
	def isSum: Boolean
	def numValue: Int
	def leftOp: Expr
	def rightOp: Expr

class Number(n: Int) extends Expr:
	def isNumber = true
	def isSum = false
	def numValue = n
	def leftOp = throw Error("Number.leftOp")
	def rightOp = throw Error("Number.rightOp")

class Sum(e1: Expr, e2: Expr) extends Expr:
	def isNumber = false
	def isSum = true
	def numValue = throw Error("Sum.numValue")
	def leftOp = e1
	def rightOp = e2

def eval(e: Expr): Int = 
	if e.isNumber then e.numValue
	else if e.isSum then eval(e.leftOp) + eval(e.rightOp)
	else throw Error("Unknown expression " + e)
```



### Problems

* Writing all these classification and accessor functions quickly becomes tedious
* There is no static guarantee you use the right accessor functions. You might hit an Error case if you are not careful. 



### Non-solution: Type tests and type casts

* Scala lets you do these using method defined in class `Any`: 

  ```scala
  def isInstanceOf[T]: Boolean
  def asInstanceOf[T]: T
  ```

* These correspond to Java's type tests and casts

  ```java
  x instanceof T;
  (T) x;
  ```

* But their use in Scala is discouraged, because there are better alternatives. 



### Solution 1: Object-oriented decomposition

* For example, suppose that all you want to do is evaluate expressions

  ```scala
  trait Expr:
  	def eval: Int
  
  class Number(n: Int) extends Expr:
  	def eval: Int = n
  
  class Sum(e1: Expr, e2: Expr) extends Expr:
  	def eval: Int = e1.eval + e2.eval
  ```

* But what happens if you'd like to display expressions now? You have to define new methods in all the subclasses. 

* Assessment of OO decomposition

  * OO decomposition mixes data with operations on the data.
  * This can be the right thing if there's a need for encapsulation and data abstraction.
  * On the other hand, it increases complexity and adds new dependencies to classes.
  * It makes it easy to add new kinds of data but hard to add new kinds of operations.
  * Thus, complexity arises from mixing several things together. 

* Limitations of OO decomposition

  * OO decomposition only works well if operations are on a single object.

  * What is you want to simplify expressions, say using the rule:

    ```
    a * b + a * c  -> a * (b + c)
    ```

  * Problem: This is a non-local simplification. It cannot be encapsulated in the method of a single object.

  * You are back to square one; you need test and access method sfor all the different subclasses. 



### Solution 2: Functional decomposition with Pattern matching

Observation: the sole purpose of test and accessor functions is to reverse the construction process:

* Which subclass was used?
* What were the arguments of the constructor? 

This situation is so common that many functional languages, Scala included, automate it. 



#### Case classes

A case class definition is similar to a normal class definition, except that it is preceded by the modifier case. For example: 

```scala
trait Expr
case class Number(n: Int) extends Expr
case class Sum(e1: Expr, e2: Expr) extends Expr
```

These classes are now empty. So how can we access the members? 



#### Pattern matching

Pattern matching is a generalization of `switch` from C/Java to class hierarchies:

```scala
def eval(e: Expr): Int = e match
	case Number(n) => n
	case Sum(e1, e2) => eval(e1) + eval(e2)
```

Rules: 

* `match` is preceded by a selector expression and is followed by a sequence of `cases`, `pat => expr`.
* Each case associates an expression `expr` with a pattern `pat`.
* A `MatchError` exception is thrown if no pattern matches the value of the selector. 
* The compiler creates a `.field_i` accessor for each `field_i` of the case class.



##### Forms of patterns

Patterns are constructed from:

* Constructors, e.g. `Number`, `Sum`

  ```scala
  def isNumberMessage(e: Expr): String = e match
  	case Number(n) => "This is a number"
  	case Sum(e1, e2) => eval(e1) + eval(e2)
  ```

* Variables, e.g. `e1`, `e2`

  ```scala
  def isNumberMessage(e: Expr): String = e match
  	case Number(n) => "This is a number"
  	case v => "This is not a number"
  ```

  * Variable  patterns are often used as fallbacks. For example, in example above, `v` is a variable pattern. 
  * Variables always begin with a lowercase letter.
  * The same variable name can only appear once in a pattern. So, `Sum(x, x)` is not a legal pattern. 

* Wildcard patterns `_`

  ```scala
  def isNumber2(n: Int): Boolean = e match
  	case 2 => true
  	case _ => false
  ```

* Constants, e.g. 1, `true`

  * Example as above.
  * Names of constants begin with a capital letter, with the exception of the reserved words `null`, `true`, `false`.

* Type tests, e.g. n: `Number`

  ```scala
  def isNumber(e: Expr): Boolean = e match
  	case n: Number => true
  	case _ => false
  ```

  



##### Evaluating match expressions

An expression of the form

```scala
e match {
    case p1 => e1
    ...
    case pn => en
}
```

matches the value of the selector `e` with the patterns `p1, ..., pn` in the order in which they are written. The whole match expression is written to the right-hand side of the first case where the pattern matches the selector `e`.  References to pattern variables are replaced by the corresponding parts in the selector. 

A constructor pattern `C(p1, ..., pn)` matches all the values of type `C` (or a subtype) that have been constructed with arguments matching the patterns `p1, ..., pn`. A variable pattern `x` matches any value, and binds the name of the variable to this value. A constant pattern `c` matches values that are equal to `c` (in the sense of ==). 



##### Pattern matching and methods

It is possible to define the evaluation function as a method of the base trait:  

```scala
trait Expr:
	def eval: Int = this match 
		case Number(n) => n
		case Sum(e1, e2) => e1.eval + e2.eval
```



Another example:

```scala
case class Var(name: String) extends Expr
case class Prod(e1: Expr, e2: Expr) extends Expr

def show(e: Expr): String = e match
	case Number(n) => n.toString
	case Sum(e1, e2) => s"${show(e1)} + ${show(e2)}"
	case Var(x) => x
	case Prod(e1, e2) =>s"${showP(e1)} * ${showP(e2)}"

def showP(e: Expr): String = e match
	case e: Sum => s"(${show(e)})"
	case _ => show(e)
```



## Lists

The list is a fundamental data structure in functional programming.. A list having `x1, ..., xn` as elements is written `List(x1, ..., xn)`.

There are two important differences between lists and arrays

* Lists are immutable - the elements of a list cannot be changed
* Lists are recursive, while arrays are flat. 



### Constructors of lists

All lists are constructed from:

* The empty list `Nil` 

* The construction operation `::` (pronounced `cons`)

  ```scala
  nums1 = List(1, 2, 3, 4)
  nums2 = 1 :: (2 :: (3 :: 4 :: Nil))
  empty = Nil
  ```

  

#### Right associativity

Convention: operators ending in `:` associate to the right. So `A :: B :: C` is interpreted as `A :: (B :: C)`. We can thus omit the parenthesis in the definition above. 





### Operations on Lists

All operations on lists can be expressed in terms of the following three:

* `head`: the first element of the list
* `tail`: the list composed of all the elements except the first. 
* `isEmpty`: `true` if the list is empty, `false` otherwise. 

These operations are defined as methods of objects of type `List`. For example: 

```scala
nums.head == 1
nums.tail == List(2, 3, 4)
empty.head == throw NoSuchElementException("head of empty list")
```



### List patterns

It is possible to decompose lists with pattern matching:

* `Nil`: the `Nil` constant
* `p :: ps`: A pattern that matches a list with a head matching `p` and a tail matching `ps`. 
* `List(p1, ..., pn)`: same as `p1 :: ... :: pn :: Nil`



### Sorting lists

Suppose we want to sort a list of number in ascending order. The code below describes insertion sort: 

```scala
def isort(xs: List[Int]): List[Int] = xs match
	case List() => List()
	case y :: ys => insert(y, isort(ys))

def insert(x: Int, xs: List[Int]): List[Int] = xs match
	case List() => List(x)
	case y :: ys => 
		if x < y then x :: xs else y :: insert(x, ys)
```



## Enums

Sometimes we just need to compose and decompose pure data without any associated functions. Case classes and pattern matching work well for this task.



### A case class hierarchy

```scala
trait Exor
object Expr:
	case class Var(s: String) extends Expr
	case class Number(n: Int) extends Expr
	case class Sum(e1: Expr, e2: Expr) extends Expr
	case class Prod(e1: Expr, e2: Expr) extends Expr
```

This time we have put all case classes in the Expr companion object, in order not to pollute the global namespace. So it's `Expr.Number(1)` instead of `Number(1)`, for example. But one can still "pull out" all the cases using an import: `import Expr.*`.

Pure data definitions like these are called algebraic data types, or ADTs for short. They are very common in functional programming. To make them even more convenient, Scala offers some special syntax. 



### Enums for ADTs

An enum enumerates all the cases of an ADT and nothing else. For example:

```scala
enum Expr:
	case Var(s: String)
	case Number(n: Int)
	case Sum(e1: Expr, e2: Expr)
	case Prod(e1: Expr, e2: Expr)
```

This enum is equivalent to the case class hierarchy above but is shorter. 



#### Pattern matching on ADTs

```scala
def show(e: Expr): String = e match
	case Expr.Var(x) => x
	case Expr.Number(n) => n.toString
	case Expr.Sum(a, b) => s"${show(a)} + ${show(b)}"
	case Expr.Prod(a, b) => s"${showP(a)} + ${showP(b)}"

import Expr.*
def showP(e: Expr): String = e match
	case e: Sum => s"(${show(e)})"
	case _ => show(e)
```



#### Simple enums

Cases of an enum can also be simple values, without any parameters. For example: 

```scala
enum Color:
	case Red
	case Green
	case Blue
```



or shorter: 

```scala
enum Color:
	case Red, Green, Blue
```



#### Pattern matching on simple enums

For pattern matching, simple cases count as constants:

```scala
enum DayOfWeek:
	case Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

import DayOfWeek.*

def isWeekend(day: DayOfWeek) = day match
	case Saturday | Sunday => true
	case _ => false
```



#### More on enums

Enumerations can take parameters and can define methods. For example:

```scala
enum Direction(val dx: Int, val dy: Int):
	case Right extends Direction( 1,  0)
	case Up    extends Direction( 0,  1)
	case Left  extends Direction(-1,  0)
	case Down  extends Direction( 0, -1)
	
	def leftTurn = Direction.values((ordinal + 1) % 4)
end Direction

val r = Direction.Right
val u = x.leftTurn			// u = Up
val v = (u.dx, u.dy)		// v = (0, 1)
```

Notes:

* Enumeration cases that pass parameters have to use an explicit `extends` clause
* The expression `e.ordinal` gives the ordinal value of the enum case `e`. Cases start with zero and are numbered consecutively. 
* `values` is an immutable array in the companion object of an enum that contains all enum values. 
* Only simple cases have ordinal numbers and show up in values, parameterized cases do not. 
* Enumerations are shorthands for classes and objects



#### Domain modeling

ADTs and enums are particularly useful for domain modelling tasks where one needs to define a large number of data types without attaching operations. For example modelling payment methods:

```scala
enum PaymentMethod:
	case CreditCard(kind: Card, holder: String, number: Long, expires: Date)
	case PayPal(email: String)
	case Cash

enum Card:
	case Visa, Mastercard, Amex
```



## Subtyping and generics

### Polymorphism

Two principal forms of polymorphism

* Subtyping
* Generics





### Type bounds

Consider the method `assertAllPos` which 

* takes an `IntSet` 
* returns the `IntSet` itself if all its elements are positive
* throws an exception otherwise

What would be the best type you can give to `assertAllPos`? Maybe:

```scala
def assertAllPos(s: IntSet): IntSet
```

In most situations this is fine, but can one be more precise? One might want to express that `assertAllPos` takes empty sets to empty sets and non-empty sets to non-empty sets. A way to express this is:

```scala
def assertAllPos[S <: IntSet](r: S): S = ...
```

Here, `<: IntSet` is an upper bound of the type parameter `S`. It means that `S` can be instantiated only to types that conform to `IntSet`. Generally, the notation:

* `S <: T`  means `S` is a subtype of `T`
* `S >: T` means `S` is a supertype of `T`



#### Lower bounds

You can also use a lower bound for a type variable. For example

```scala
[S >: NonEmpty]
```

introduces a type parameter `S` that can range only over supertypes of `NonEmpty`. So `S` could be one of `NonEmpty`, `IntSet`, `AnyRef`, or `Any`. 



#### Mixed bounds

Finally, it is possible to mix a lower bound with an upper bound. For instance:

```scala
[S >: NonEmpty <: IntSet]
```

would restrict `S` any type on the interval between `NonEmpty` and `IntSet`. 





#### Covariance

There's another interaction between subtyping and type parameters we need to consider. Given:

```
NonEmpty <: IntSet
```

is the following true?

```
List[NonEmpty] <: List[IntSet]
```



Intuitively, this makes sense: A list of non-empty sets is a special case of a list of arbitrary sets. We call types for which this relationship holds covariant because their subtyping relationship varies with the type parameter. 



#### The Liskov substitution principle

The following principle, stated by Barbara Liskov, tells us when a type can be a subtype of another. 

```
It A <: B, then everything one can to do with a value of type B one should also be able to do with a value of type A. 
```



## Variance

You have seen that some types should be covariant whereas others should not. Roughly speaking, a type that accepts mutations of its elements should not be covariant. But immutable types can be covariant, if some conditions on methods are met. 



### Definition of variance

Say `C[T]` is a parameterized type and `A`, `B` are types such that `A <: B`. In general, there are three possible relationships between `C[A]` and `C[B]`:

* `C[A] <: C[B]` --> `C` is covariant
* `C[A] >: C[B]` --> `C` is contravariant
* Neither `C[A]` nor `C[B]` is a subtype of the other --> `C` is nonvariant



Scala lets you declare the variance of a type by annotating the type parameter: 

* `class C[+A] {...}` --> `C` is covariant
* `class C[-A] {...}` --> `C` is contravariant
* `class C[A] {...}` --> `C` is nonvariant



### Typing rules for functions

Generally, we have the following rule for subtyping between function types: If `A2 <: A1` and `B1 <: B2`, then

```scala
A1 => B1 <: A2 => B2
```



So functions are contravariant in their argument types and covariant in their result type.



### Variance checks

If we turn `Array` into a class, and update into a method, it would look like this: 

```scala
class Array[+T]:
	def update(x: T) = ...
```

The problematic combination is

* the covariant type parameter `T`
* which appears in parameter position of the method update. 

The Scala compiler will check that there are no problematic combinations when compiling a class with variance annotations. Roughly,

* Covariant type parameters can only appear in method results
* Contravariant type parameters can only appear in method parameters
* Invariant type parameters can appear annywhere

The precise rules are a bit more involved, fortunately the Scala compiler performs them for us.



### Variance and lists

One shortcoming with the previous implementation of lists was that `Nil` had to be a class, whereas we would prefer it to be an object (after all, there is only one empty list). We can change this by making list covariant:

```scala
trait List[+T]

object Empty extends List[Nothing]
```



#### Idealized lists

```scala
trait List[+T]:
	def isEmpty = this match 
		case Nil => true
		case _ => false

	override def toString = 
		def recur(prefix: String, xs: List[T]): String = xs match
			case x :: xs1 => s"$prefix$x${recur(", ", xs1)}"
			case Nil => ")"
		recur("List(", this)

case class ::[+T](head: T, tail: List[T]) extends List[T]
case object Nil extends List[Nothing]

extension [T](x: T) def :: (xs: List[T]): List[T] = ::(x, xs)
```

The need for a lower bound was essentially to decouple the new parameter of the class and the parameter of the newly created object. Using an extension method such as in `::` above, sidesteps the problem and is often simpler. 



# Lists

## Lists operations

### Sublists and element access

* `xs.length`: The number of elements of `xs`.
* `xs.last`: The list's last element, exception if `xs` is empty.
* `xs.init`: A list consisting of all elements of `xs` except the last one, exception `xs` is empty.
* `xs.drop(n)`: The rest of the collection after taking `n` elements.
* `xs(n)` or `xs.apply(n)`: The element of `xs` at index `n`. 



### Creating new lists

* `xs ++ ys`: The list consisting of all elements of `xs` followed by all elements of `ys`.
* `xs.reverse`: The list containing the elements of `xs` in reversed order.
* `xs.updated(n, x)`: The list containing the same elements as `xs`, except at index `n` where it contains `x`. 



### Finding elements

* `xs.indexOf(x)`: The index of the first element in `xs` equal to `x`, or `-1` if `x` does not appear in `xs`.
* `xs.contains(x)`: same as `xs.indexOf(x) >= 0`. 



### Implementation of `last`

The complexity of `head` is small constant time. What is the complexity of last? To find out, let's write a possible implementation of `last` as a stand-alone function. 

```scala
def last[T](xs: List[T]): T = xs match
	case List() => throw Error("Last of empty list")
	case List(x) => x
	case y :: ys => last(ys)
```

So, `last` takes steps proportional to the length of the list `xs`. 



### Implementation of concatenation

Let's try to write an extension method for `++`: 

```scala
extension [T](xs: List[T])
	def ++ (ys: List[T]): List[T] = xs match 
		case Nil => ys
		case x :: xs1 => x :: (xs1 ++ ys)
```

The complexity of concatenation is `O(xs.length)`



### Implementation of `reverse`

```scala
extension [T](xs: List[T])
	def reverse: List[T] = xs match 
		case Nil => Nil
		case y :: ys => ys.reverse ++ List(y)
```

The complexity of reverse is `O(xs.length * xs.length)`. It can be done better. 



### Implementation of `flatten`

Flatten a list structure which means lists all atoms in nested lists in a list. 

```scala
def flatten(xs: Any): List[Any] = xs match
	case Nil => Nil
	case y :: ys => flatten(y) ++ flatten(ys)
	case _ => xs :: Nil
```





## Tuples and generic methods

### Pair and tuples

The pair consisting of x and y is written as `(x, y)` in Scala. Pairs can also be used as patterns:

```scala
val (label, value) = pair
```

This works analogously for tuples with more than two elements. One could also have written

```scala
val label = pair._1
val value = pair._2
```





### Translation of tuples

For small $n$, up to 22 (there is also a `TupleXXL` class that handles tuples larger than that limit), the tuple type $(T_1, \dots, T_n)$ is an abbreviation of the parameterized type
$$
\text{scala.Tuple } n[T_1,\dots, T_n]
$$
An tuple expression $(e_1,\dots, e_n)$ is equivalent to the function application 
$$
\text{scala.Tuple } n(e_1, \dots, e_n)
$$
A tuple pattern $(p_1,\dots, p_n)$ is equivalent to the constructor pattern
$$
\text{scala.Tuple } n(p_1, \dots, p_n)
$$


### Merge sort

```scala
def msort[T](xs: List[T])(lt: (T,T) => Boolean) =
	val n = xs.length / 2
	if n == 0 then xs
	else 
		def merge[T](xs: List[T], ys: List[T]) = (xs, ys) match
            case (Nil, ys) => ys
            case (xs, Nil) => xs
            case (x :: xs1, y :: ys1) => 
                if lt(x, y) then x :: merge(xs1, ys)
                else y :: merge(xs, ys1)
		val (fst, snd) = xs.splitAt(n)
		merge(msort(fst)(lt), msort(snd)(lt))
```



## Higher-order list functions 

### Mapping

A simple way to define `map` is as follows:

```scala
extension [T](xs: List[T])
	def map[U](f: T => U): List[U] = xs match
		case Nil => xs
		case x :: xs => f(x) :: xs.map(f)
```

In fact, the actual definition of `map` is a bit more complicated, because it is tail-recursive, and also because it works for arbitrary collections, not just lists. Using `map`, we can scale a list by the following code: 

```scala
def scaleList(xs: List[Double], factor: Double) = 
	xs.map(x => x * factor)
```



### Filtering

Selection of all elements satisfying a given condition. This pattern is generalized by the method `filter` of the List class:

```scala
extension [T](xs: List[T])
	def filter(p: T => Boolean): List[T] = xs match
		case Nil => xs
		case x :: xs => if p(x) then x :: xs.filter(p) else xs.filter(p)
```

Beside filter, there are also the following methods that extract sublists based on a predicate:

* `xs.filterNot(p)`: Same as `xs.filter(x => !p(x))`.
* `xs.partition(p)`: Same as `(xs.filter(p), xs.filterNot(p))`, but computed in a single traversal of the list `xs.`
* `xs.takeWhile(p)`: The longest prefix of list `xs` consisting of elements that all satisfy the predicate p.
* `xs.dropWhile(p)`: The remainder of the list `xs` after any leading elements satisfying p have been removed.
* `xs.span(p)`: Same as `(xs.takeWhile(p), xs.dropWhile(p))` but computed in a single traversal of the list `xs`.



### Reduction of lists

Another common operation on lists is to combine the elements of a list using a given operator. For example:

```scala
sum(List(x1, ..., xn))
product(List(x1, ..., xn))
```



The pattern can be abstracted out using the generic method `reduceLeft`. `reduceLeft` inserts a given binary operator between adjacent elements of a list: 

```scala
List(x1, ..., xn).reduceLeft(op) = x1.op(x2). ... .op(xn)
```

Using `reduceLeft`, we can simplify:

```scala
def sum(xs: List[Int]) = (0 :: xs).reduceLeft((x, y) => x + y)
def product(xs: List[Int]) = (1 :: xs).reduceLeft((x, y) => x * y)
```



Instead of `((x, y) => x * y)`, one can also write short: `(_ * _)`. Every `_` represents a new parameter, going from left to right. The parameters are defined at the next outer pair of parentheses (or the whole expression if there are no enclosing parentheses). So, `sum` and `product` can also be expressed like: 

```scala
def sum(xs: List[Int]) = (0 :: xs).reduceLeft(_ + _)
def product(xs: List[Int]) = (1 :: xs).reduceLeft(_ * _)
```



### FoldLeft

The function `reduceLeft` is defined in terms of a more general function, `foldLeft`. `foldLeft` is like `reduceLeft` but takes an accumulator, `z`, as an additional parameter, which is returned when `foldLeft` is called on an empty list:

```scala
List(x1, ..., xn).foldLeft(z)(op) = z.op(x1).op(x2). ... .op(xn)
```



So, `sum` and `product` can also be defined as follows: 

```scala
def sum(xs: List[Int]) = xs.foldLeft(0)(_ + _)
def product(xs: List[Int]) = xs.foldLeft(1)(_ * _)
```



### Implementations of `reduceLeft` and `foldLeft`

They can be implemented in class `List` as follows:

```scala
abstract class List[T]:
	def reduceLeft(op: (T, T) => T): T = this match
		case Nil => throw IllegalOperationException("Nil.reduceLeft")
		case x :: xs => xs.foldLeft(x)(op)

	def foldLeft[U](z: U)(op: (U, T) => U): U = this match
		case Nil => z
		case x :: xs => xs.foldLeft(op(z, x))(op)
```



### FoldRight and ReduceRight

Applications of `foldLeft` and `reduceLeft` unfold on trees that lean to the left. They have two dual functions. `foldRight` and `reduceRight`, which produce trees which lean to the right.  Their implementations:

```scala
def reduceRight(op:  (T, T) => T): T = this match
	case Nil      => throw IllegalOperationException("Nil.reduceRight")
	case x :: Nil => x
	case x :: xs  => op(x, xs.reduceRight(op))

def foldRight[U](z: U)(op: (T, U) => U): U = this match 
	case Nil     => z
	case x :: xs => op(x, xs.foldRight(z))(op)
```



#### Difference between FoldLeft and FoldRight

For operators that are associative and commutative, `foldLeft` and `foldRight` are equivalent (even though there may be a difference in efficiency). But sometimes, only one of the two operators is appropriate. For example: 

```scala
def reverse[T](xs: List[T]): List[T] = 
	xs.foldLeft(List[T]())((xs, x) => x :: xs)
```

Remark: the type parameter in `List[T]()` is necessary for type inference. 



## Reasoning about lists

### Laws of concat

Recall the concatenation operation `++` on lists. We would like to verify that concatenation is associative, and that it admits the empty list `Nil` as neutral element to the left and to the right. But how can we prove properties like these? We can do it by structural induction on lists. 



### Referential transparency

A proof can freely apply reduction steps as equalities to some part of a term. That works because pure functional programs don't have side effects; so that a term is equivalent to the term to which it reduces. This principle is called referential transparency. 



### Structural induction

The principle of structural induction is analogous to natural induction: 

To prove a property `P(xs)` for all lists xs,

* show that `P(Nil)` holds (base case)
* for a list `xs` and some element `x`, show the induction step:
  * If `P(xs)` holds, then `P(x :: xs)` also holds.



### Example

Let's show that, for lists `xs`, `ys`, `zs`:

```scala
(xs ++ ys) ++ zs = xs ++ (ys ++ zs)
```

To do this, use structural induction on `xs`. From the previous implementation of `++`:

```scala
extension [T](xs: List[T]):
	def ++ (ys: List[T]) = xs match
		case Nil => ys
		case x :: xs1 => x :: (xs1 ++ ys)
```

distill two defining clauses of `++`: 

```scala
       Nil ++ ys = ys
(x :: xs1) ++ ys = x :: (xs1 ++ ys)
```



# Other Collections

## Vectors

### Operations on vectors

Vectors are created analogously to lists

```scala
val nums = Vector(1, 2, 3, -88)
val people = Vector("Bob", "James", "Peter")
```

They support the same operations as lists, with the exception of `::`. Instead of `x :: xs`, there is 

* `x +: xs`: create a new vector with leading element `x`, followed by all elements of `xs`
* `xs :+ x`: create a new vector with trailing element `x`, preceded by all elements of `xs`
* Note that the `:` always points to the sequence. 



## Collection hierarchy

A common base class of `List` and `Vector` is `Seq`, the class of all sequences. `Seq` itself is a subclass of `Iterable`.





## Arrays and strings

Arrays and strings support the same operations as `Seq` and can implicitly be converted to sequences where needed. (They cannot be subclasses of `Seq` because they come from Java). 

```scala
val xs: Array[Int] = Array(1, 2, 3)
xs.map(x => 2 * x)

val ys: String = "Hello, world!"
ys.filter(_.isUpper)
```



## Ranges 

Another simple kind of sequence is the range. It represents a sequence of evenly spaced integers. Three operators: `to` (inclusive), `until` (exclusive), `by` (to determine step value):

```scala
val r: Range = 1 until 5		// 1,2,3,4
val s: Range = 1 to 5			// 1,2,3,4,5
1 to 10 by 3					// 1,4,7,10
6 to 1 by -2					// 6,4,2
```

A range is represented as a single object with three fields: lower bound, upper bound, step value. 



## Some more sequence operations: 

* `xs.exists(p)`: true if there is an element `x` of `xs` such that `p(x)` holds, false otherwise. 
* `xs.forall(p)`: true if `p(x)` holds for all elements `x` of `xs`, false otherwise
* `xs.zip(ys)`: A sequence of pairs drawn from corresponding elements of sequences `xs` and `ys`. 
* `xs.unzip`: Splits a sequence of pairs `xs` into two sequences consisting of the first, respectively second halves of all pairs. 
* `xs.flatMap(f)`: Applies collection-valued function `f` to all elements of `xs` and concatenates the results.
* `xs.sum`: The sum of all elements of this numeric collection.
* `xs.product`: The product of all elements of this numeric collection
* `xs.max`: The maximum of all elements of this collection (an `Ordering` must exist)
* `xs.min`: The minimum of all elements of this collection.



### Example 1:

To list all combinations of numbers `x` and `y` where `x` is drawn from `1..M` and `y` is drawn from `1..N`:

```scala
(1 to M).flatMap(x => (1 to N).map(y => (x, y)))
```

This will return the default `Seq`:  `Vector`.



### Example 2

To compute the scalar product of two vectors:

```scala
def scalarProduct(xs: Vector[Double], ys: Vector[Double]): Double = 
	xs.zip(ys).map((x, y) => x * y).sum
```

Note that there is some automatic decomposition going on here. Each pair of elements from `xs` and `ys` is split into its halves which are then passed as the `x` and `y` parameters to the lambda. 



## Combinatorial search and for-expressions

### Handling nested sequences

We can extend the usage of higher order functions on sequences to many calculations which are usually expressed using nested loops. For example, given a positive integer `n`, find all pairs of positive integers `i` and `j`, with `i <= j < i < n` such that `i + j` is prime. 

A natural way to do this is to 

* Generate the sequence of all pairs of integers `(i, j)`
* Filter the pairs for which `i + j` is prime

```scala
(1 until n)
	.flatMap(i => (1 until i).map(j => (i, j)))
	.filter((x, y) => isPrime(x + y))
```

This works, but make most people's head hurt. 



### For-expressions

Let `persons` be a list of elements of class `Person`, with fields `name` and `age`. 

```scala
case class Person(name: String, age: Int)
```

To obtain the names of persons over 20 years old, you can write:

```scala
for p <- persons if p.age > 20 yield p.name
```

which is equivalent to:

```scala
persons
	.filter(p => p.age > 20)
	.map(p => p.name)
```

The for-expression is similar to loops in imperative languages, except that it builds a list of the results of all iterations. 



#### Syntax of For

A for-expression is of the form

```scala
for s yield e
```

where `s` is a sequence of generators and filters, and `e`  is an expression whose value is returned by an iteration. 

* A generator is of the form `p <- e`, where `p` is a pattern and `e` an expression whose value is a collection.
* A filter is of the form `if f` where `f` is a boolean expression. 
* The sequence must start with a generator. 
* If there are several generators in the sequence, the last generators vary faster than the first. 

Then the previous problem can be solved by the following code: 

```scala
for 
	i <- 1 until n
	j <- 1 until i
	if isPrime(i + j)
yield (i, j)
```



## Sets

A set is written analogously to a sequence:

```scala
val fruit = Set("apple", "banana", "pear")
val s = (1 to 6).toSet
```

Most operations on sequences are also available on sets, for example, `map`, `filter` and `nonEmpty`. 

The principal differences between sets and sequences are:

1. Sets are unordered; the elements of a set do not have a predefined order in which they appear in the set.
2. Sets do not have duplicate elements
3. The fundamental operation on sets is contains



For example: N-queen problem

```scala
def queens(n: Int) =
	def checks(col: Int, delta: Int, queens: List[Int]): Boolean = queens match
		case qcol :: others => 
			qcol == col
			|| (qcol - col).abs == delta
			|| checks(col, delta + 1, others)
		case Nil => 
			false
	def isSafe(col: Int, queens: List[Int]): Boolean = 
		!checks(col, 1, queens)
	def placeQueens(k: Int): Set[List[Int]] = 
		if k == 0 then Set(List())
		else
			for
				queens <- placeQueens(k - 1)
				col <- 0 until n
				if isSafe(col, queens)
			yield col :: queens
	placeQueens(n)
```



## Maps

A map of type `Map[Key, Value]` is a data structure that associates keys of type `Key` with values of type `Value`. For example: 

```scala
val romanNumerals = Map("I" -> 1, "V" -> 5, "X" -> 10)
val capitalOfCountry = Map("US" -> "Washington", "Switzerland" -> "Bern")
```



### Maps are iterables.

Class `Map[Key, Value]` extends the collection type `Iterable[(Key, Value)]`. Therefor, maps support the same collection operations as other iterables do. Example: 

```scala
val countryOfCapital = capitalOfCountry.map((x, y) => (y, x))
```

The syntax `key -> value` is just an alternative way to write the pair `(key, value)`. (`->` implemented as an extension method in `Predef`)



### Maps are functions

Class `Map[Key, Value]` also extends the function type `Key => Value`, so maps can be used everywhere functions can. In particular, maps can be applied to key arguments:

``` scala
capitalOfCountry("US")
```



### Querying map

Apply a map to a non-existing key gives an error. To query a map without knowing beforehand whether it contains a given key, you can use the `get` operation:

```scala
capitalOfCountry.get("US")			// Some("Washington")
capitalOfCountry.get("Andorra")		// None
```

The result of a get operation is an `Option` value.



### Updating maps

Functional updates of a map are done with the `+` and `++` operations:

* `m + (k -> v)`: The map that takes key `k` to value `v` and is otherwise equal to `m`
* `m ++ kvs`: The map `m` updated via `+` with all key/value pairs in `kvs`

These operations are purely functional. 



### Sorted and `groupBy`

Two useful operations known from SQL queries are `groupBy` and `orderBy. orderBy` on a collection can be expressed using `sortWith` and `sorted`:

```scala
val fruit = List("apple", "pear", "orange", "pineapple")
fruit.sortWith(_.length < _.length)	// List("pear", "apple", "orange", "pineapple")
fruit.sorted						// List("apple", "orange", "pear", "pineapple")
```

`groupBy` is available on Scala collections. It partitions a collection into a map of collections according to a discriminator function `f`: 

```scala
fruit.groupBy(_.head) 	//> Map(p -> List(pear, pineapple),
						//| 	a -> List(apple),
						//|		o -> List(orange))
```



### Default values

So far, maps were partial functions: Applying a map to a key value in `map(key)` could lead to an exception, if the key was not stored in the map. There is an operation `withDefaultValue` that turns a map into a total function: 

```scala
val cap1 = capitalOfCountry.withDefaultValue("<unknown>")
cap1("Andorra")			// "<unknown>"
```





## The `Option` type

The `Option` type is defined as 

```scala
trait Option[+A]
case class Some[+A](value: A) extends Option[A]
object None extends Option[Nothing]
```

The expression `map.get(key)` returns:

* `None` if `map` does not contain the given key,
* `Some(x)` if `map` associates the given key with the value `x`. 



### Decomposing `Option`

Since options are defined as case classes, they can be decomposed using pattern matching: 

```scala
def showCapital(country: String) = capitalOfCountry.get(country) match
	case Some(capital) => capital
	case None => "missing data"
```

Options also support quite a few operations of the other collections.  



## Benefits of Scala's immutable collections

* Easy to use: few steps to do the job
* Concise: one word replaces a whole loop
* Safe: type checker is really good at catching errors
* Fast: collection ops are turned, can be parallelized
* Universal: one vocabulary to work on all kinds of collections 

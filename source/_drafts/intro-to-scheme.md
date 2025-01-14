---
title: Introduction to Haskell Programming
date: 2022-03-09 15:05:39
tags: [Programming, Haskell]
---


A brief introduction to haskell programming. 

<!-- more -->




## 1. Introduction
* Haskell is a purely functional programming language. 
  * You cannot set a variable to something and then set it to something else later: No side-effects
  * If a function is called twice with the same parameters, it's guaranteed to return the same result: Referential transparency
* Haskell is lazy: unless specifically told otherwise, Haskell won't execute functions and calculate things until it's really forced to show you a result. Allow infinite data structures
* Statically typed: Its type system that has type inference.
* Most widely used Haskell compiler: GHC





## 2. Starting out

### Some basic ideas

Haskell can be used as a calculator

| Some infix function  | Meaning            |
| :------------------: | :----------------- |
|      +, -, *, /      | Arithmetic         |
| ==, /=, <, >, <=, >= | Equality           |
|   &&, &#124;&#124;   | Logical            |
|          ++          | List concatenation |
|          :           | List cons          |
|          !!          | List index access  |

| Some prefix function | Meaning                                                   |
| :------------------: | :-------------------------------------------------------- |
|         not          | Logical                                                   |
|         succ         | Increase by 1                                             |
|       max, min       | Comparison                                                |
|         head         | First element of a list                                   |
|         tail         | The list without the head element                         |
|         last         | Last element of a list                                    |
|         init         | The list without the last element                         |
|        length        | Get length of a list                                      |
|         null         | Check if a list is empty                                  |
|       reverse        | Reverse a list                                            |
|         take         | Extracts a number of elements from a list                 |
|         drop         | Drop a number of elements from a list                     |
|       minimum        | Get min of a list                                         |
|       maximum        | Get max of a list                                         |
|         sum          | Get sum of a list                                         |
|       product        | Get product of a list                                     |
|         elem         | Check if an item is in a list                             |
|        cycle         | Cycles a list into an infinite list                       |
|        repeat        | Repeat an element into an infinite list                   |
|      replicate       | Repeat an element for a number of times                   |
|         fst          | Get the first component of a pair tuple                   |
|         snd          | Get the second component of a pair tuple                  |
|         zip          | Zips two lists to list of joining pairs                   |
|       compare        | return GT (greater than), LT (lesser than) or EQ          |
|         read         | Takes a string and returns a type of Read class           |
|     fromIntegral     | Takes an integral and turns it into a more general number |

Change prefix function to infix function: 

``` haskell
(div 42 5) == (42 `div` 5)
```

Change back:
``` haskell
((+) 42 5) == (42 + 5)
```

First function saved as the file __doubleMe.hs__: 
``` haskell
doubleMe x = x + x
```
Used with: 
``` haskell
ghci> :l doubleMe  
[1 of 1] Compiling Main             ( doubleMe.hs, interpreted )  
Ok, modules loaded: Main. 
ghci> doubleMe 9  
18  
```

 `if`  statement is an expression which means that it returns a value thus the `else` part of the `if` statements in Haskell is mandatory

``` haskell
sumDoubledUs x y = doubleMe x + doubleMe y

doubleSmallNumber x = if x > 100
                        then x
                        else x*2  --The else part is mandatory.

conanO'Brien = "It's a-me, Conan O'Brien!"   
```

Functions in Haskell don't have to be in any particular order. Thus the order of `doubleMe` and `sumDoubleUs` is not important

We usually use ' to either denote a strict version of a function (one that isn't lazy) or a slightly modified version of a function or a variable. 

``` haskell
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1  
```



### Intro to list

List is homogeneous data structure $\rightarrow$ stores elements with same type

 `````haskell
ghci> let lostNumbers = [4,8,15,16,23,42]
ghci> lostNumbers
[4,8,15,16,23,42]
 `````

To concatenate two lists: 

````haskell
ghci> [1,2,3,4] ++ [9,10,11,12]
[1,2,3,4,9,10,11,12]
ghci> "hello" ++ " " ++ "world"
"hello world"
````

To use `++` operator on long strings is however slow. `++` takes in two lists, so, even if you want to append one element to the end of a list with `++`, you have to surround it with square brackets so it becomes a list

To append an element at the beginning of a list: `:` operator

````haskell
ghci> 'A':" SMALL CAT"
"A SMALL CAT"
ghci> 5:[1,2,3,4]
[5,1,2,3,4]
````

`[1,2,3]` is actually just syntactic sugar for `1:2:3:[]`

Strings are lists, `"hello"` is just syntactic sugar for `['h','e','l','l','o']`. Thus, we can use list functions on them

To get an element out of a list by index: `!!` operator, the indices start at 0

````haskell
ghci> "Steve Buscemi" !! 6
'B'
ghci> [1,2,3,4,5] !! 1
2
````

Lists can contain lists. The lists within a list can be of different lengths but they can't be of different types

````haskell
ghci> let b = [[1], [2,3], [4,5,6]]
ghci> b !! 2
[4,5,6]
````

Lists can be compared in lexicographical order

````haskell
ghci> [3,2,1] > [2,10,100]
True
ghci> [3,4,2] > [3,4]
True
````



### Texas ranges

A faster way to generate a list with a certain pattern

``` haskell
[1..20] == [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]  
['a'..'z'] == "abcdefghijklmnopqrstuvwxyz"  
['K'..'Z'] == "KLMNOPQRSTUVWXYZ"   
[2,4..20] == [2,4,6,8,10,12,14,16,18,20]
[3,6..20] == [3,6,9,12,15,18]
[20,19..1] == [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
[0.5, 0.7 .. 1] == [0.5,0.7,0.8999999999999999,1.0999999999999999]
take 5 [13,26..] == [13,26,39,52,65]
take 10 (cycle [1,2,3]) == [1,2,3,1,2,3,1,2,3,1]  
take 10 (repeat 5) == [5,5,5,5,5,5,5,5,5,5]  
replicate 3 10 = [10, 10, 10]
```



### List comprehension

Similar to set comprehensions. They are used for building more specific sets out of general sets

The part before the pipe is called the output function

```haskell
[ x*2 | x <- [1..10], x*2 >= 12] == [12,14,16,18,20]  
[ x | x <- [50..100], x `mod` 7 == 3] == [52,59,66,73,80,87,94]
[ x | x <- [15..20], x /= 17, x /= 19] == [15,16,18,20]
[ x*y | x <- [2,5,10], y <- [8,10,11], x*y > 60] == [80,100,110] 
[ (a,b,c) | c <- [1..20], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2, gcd a b == 1, gcd b c == 1] == [(3,4,5),(5,12,13),(8,15,17)]
boomBangs xs = [ if x < 10 then 2*x else x | x <- xs, odd x]   
boomBangs [7..13] == [14,18,11,13]
```

It can be used to combines a list of adjectives and a list of nouns:

````haskell
ghci> let nouns = ["hobo", "frog", "pope"]
ghci> let adjectives = ["lazy", "grouchy", "scheming"]
ghci> [adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]
["lazy hobo","lazy frog","lazy pope","grouchy hobo","grouchy frog","grouchy pope","scheming hobo","scheming frog","scheming pope"]
````

We can implement our own `length`:

````haskell
length' xs = sum [1 | _ <- xs]   
````

Here `_` means that we don't care what the output is

To work on strings: 

````haskell
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]   
removeNonUppercase "Hahhhah! Ahahahha" == "HA"
````



### Tuples

Tuples are similar to lists. The fundamental differences are:

* Tuples have fixed size
* Tuples is NOT homogeneous. 
* Tuples define its own type. `[(1,2),(8,11,5),(4,5)]` or `[(1,2),("One",2)]` are not valid syntactically  because they have different types

Two useful functions that operate on pairs: 

````haskell
ghci> fst (8, 11)
8
ghci> snd (8, 11)
11
````

A cool function that produces a list of pairs: `zip`. It takes two lists and then zips them together into one list by joining the matching elements into pairs

````haskell
ghci> zip [1 .. 5] ["one", "two", "three", "four", "five"]
[(1,"one"),(2,"two"),(3,"three"),(4,"four"),(5,"five")]
ghci> zip [1,2,3,4,5,6,7] ["im", "a", "turtle"]
[(1,"im"),(2,"a"),(3,"turtle")]
ghci> zip [1 ..] ["apple", "orange","cherry","mango"]
[(1,"apple"),(2,"orange"),(3,"cherry"),(4,"mango")]
````

A cool example: 

````haskell
ghci> let rightTriangles = [(a,b,c) | c <- [1..20], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]
[(3,4,5),(6,8,10),(5,12,13),(9,12,15),(8,15,17),(12,16,20)]
````





## 3. Types and Typeclasses

### Some basic types

A type is a kind of label that every expression has. It tells us in which category of things that expression fits. A type is written in capital case

| Type    | Range                                       |
| :-----: | :-----------------------------------------: |
| Int     | 2147483647 to -2147483648 on 32-bit machine |
| Integer | No boundary                                 |
| Float   | Single precision                            |
| Double  | Double precision                            |
| Bool    | True or False                               |
| Char    | A character                                 |

Unlike Java or Pascal, Haskell has type inference. Haskell can infer some type based on context

````haskell
ghci> :t 'a'
'a' :: Char
ghci> :t True
True :: Bool
ghci> :t "Hello"
"Hello" :: [Char]
ghci> :t (True, 'a')
(True, 'a') :: (Bool, Char)
````

`::` is read as "has type of"



### Types of functions

``` haskell
removeNonUppercase :: [Char] -> [Char]  
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]

addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z
```

The parameters are separated with `->` and there's no special distinction between the parameters and the return type



### Type variables

For example: 

````haskell
ghci> : t head
head :: [a] -> a
````

Here `a` is a type variable which means that `a` can be of any type. Functions that have type variables are called polymorphic functions. Another example:

````haskell
ghci> :t fst
fst :: (a, b) -> a
````



### Intro to typeclasses

A typeclass is a sort of interface that defines some behaviour. If a type is a part of a typeclass, that means that it supports and implements the behaviour the typeclass describes

````haskell
ghci> :t (==)  
(==) :: (Eq a) => a -> a -> Bool
````

Everything before the `=>` symbol is called a class constraint. The type of those two values must be a member of the `Eq` class. This was the class constraint

The `Eq` typeclass provides an interface for testing for equality. Any type where it makes sense to test for equality between two values of that type should be a member of the `Eq` class



### Some basic typeclasses:

* `Eq` is used for types that support equality testing

  ````haskell
  ghci> 5 == 5
  True
  ghci> 'a' == 'a'
  True
  ghci> 3.432 == 3.432
  True
  ````

* `Ord` members have an ordering. The be a member of `Ord`, a type must first have membership in the prestigious and exclusive `Eq` club

  ````haskell
  ghci> :t (>)  
  (>) :: (Ord a) => a -> a -> Bool
  ghci> "Abrakadabra" < "Zebra"
  True
  ghci> "Abrakadabra" `compare` "Zebra"
  LT
  ghci> 5 `compare` 3
  GT
  ````

* `Show` members can be presented as strings

  ````haskell
  ghci> show 3
  "3"
  ghci> show 5.334
  "5.334"
  ghci> show True
  "True"
  ````

* `Read` members values can be extract from a string

  ````haskell
  ghci> read "True" || False
  True
  ghci> read "[1,2,3,4]" ++ [3]  
  [1,2,3,4,3]  
  ````

  * But we cannot run for example `read "4"`, the GHCI will give an error because it doesn't know what we want in return. It knows we want some type that is part of the `Read` class, it doesn't know which one

  * Thus we must use explicit type annotations, which is a way of explicitly saying what the type of expression should be. We do that by adding `::` at the end of the expression and then specifying a type

    ````haskell
    ghci> read "5" :: Int
    5
    ghci> read "5" :: Float
    5.0
    ghci> read "[1,2,3,4]" :: [Int]  
    [1,2,3,4]  
    ghci> read "(3, 'a')" :: (Int, Char)
    (3, 'a')
    ````

* `Enum` members are sequentially ordered types

  ````haskell
  ghci> ['a'..'e']
  "abcde"
  ghci> [LT .. GT]
  [LT,EQ,GT]
  ghci> succ 'B'
  'C'
  ````

* `Bounded` members have an upper and a lower bound

  ````haskell
  ghci> minBound :: Int
  -9223372036854775808
  ghci> maxBound :: Char
  '\1114111'
  ghci> maxBound :: (Bool, Int, Char)
  (True,9223372036854775807,'\1114111')
  ````

* `Num` members have the property of being able to act like numbers

  ````haskell
  ghci> 20 :: Int
  20
  ghci> 20 :: Integer
  20
  ghci> 20 :: Float
  20.0
  ghci> 20 :: Double
  20.0
  ghci> :t (*)
  (*) :: Num a => a -> a -> a
  ````

* `Integral` members represent integers. `Num` includes all numbers, including real numbers and integral numbers, `Integral` includes only integral (whole) numbers. In this typeclass are `Int` and `Integer`

* `Floating` members includes only floating point numbers, so `Float` and `Double`

A very useful function for dealing with numbers is `fromIntegral`. It has a type declaration of `fromIntegral :: (Num b, Integral a) => a -> b`. That's useful when you want integral and floating point types to work together nicely. For example: 

````haskell
fromIntegral (length [1,2,3,4]) + 3.2 == 7.2
````



## 4. Syntax in Functions

### Pattern matching

Pattern matching consists of specifying patterns to which some data should conform and then checking to see if it does and deconstructing the data according to those patterns

````haskell
lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of luck, pal!"
````

When you call `lucky`, the patterns will be checked from top to bottom and when it conforms to a pattern, the corresponding function body will be used

Some examples: 

````haskell
factorial :: (Integral a) => a -> a  
factorial 0 = 1  
factorial n = n * factorial (n - 1)  

addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)  
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)  

first :: (a, b, c) -> a  
first (x, _, _) = x  
  
second :: (a, b, c) -> b  
second (_, y, _) = y  

third :: (a, b, c) -> c
third (_, _, z) = z
````

We can also pattern match in list comprehensions. Should a pattern match fail, it will just move on to the next element

````haskell
ghci> let xs = [(1,3), (4,5), (6,7), (10,12)]
ghci> [a+b | (a,b) <- xs]
[4,9,13,22]
````

The following examples show some pattern matches in list comprehensions

``` haskell
head' :: [a] -> a  
head' [] = error "Can't call head on an empty list, dummy!"  
head' (x:_) = x  

length' :: (Num b) => [a] -> b  
length' [] = 0  
length' (_:xs) = 1 + length' xs  

sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs
```

There is also a thing called as patterns. Those are a handy way of breaking something up according to a pattern and binding it to names whilst still keeping a reference to the whole thing

You can do that by putting a name and an `@` in front of a pattern. For instance, the pattern `xs@(x:y:ys)`. This pattern will match exactly the same things as `x:y:ys` but you can easily get the whole list via `xs` 

````haskell
capital :: String -> String  
capital "" = "Empty string, whoops!"  
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]  
````

You can't use `++` in pattern matches. If you tried to pattern match against `(xs ++ ys)`, Haskell will not be able to decide what would be in the first and what would be in the second list



### Guards

Guards are a way of testing whether some property of a value (or several of them) are true or false. The guars are a lot more readable when you have several conditions

````haskell
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= skinny = "You're underweight, you emo, you!"  
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"  
    | otherwise     = "You're a whale, congratulations!"  
    where bmi = weight / height ^ 2  
          skinny = 18.5  
          normal = 25.0  
          fat = 30.0  
          
max' :: (Ord a) => a -> a -> a  
max' a b 
	| a > b = a 
	| otherwise = b  

myCompare :: (Ord a) => a -> a -> Ordering  
a `myCompare` b  
    | a > b     = GT  
    | a == b    = EQ  
    | otherwise = LT           
````

`otherwise`  is defined simply as `otherwise = True` and catches everything. We put the keyword `where` after the guards and then we define several names or functions. These names are visible only across the guards. All the names in `where` should be aligned at a single column, otherwise Haskell will get confused 



### Let

`let` bindings let you bind to variables anywhere and are expressions themselves but are local. `let` bindings bind values to names, it can be used for pattern matching

````haskell
cylinder :: (RealFloat a) => a -> a -> a  
cylinder r h = 
    let sideArea = 2 * pi * r * h  
        topArea = pi * r ^2  
    in  sideArea + 2 * topArea  

calcBmis :: (RealFloat a) => [(a, a)] -> [a]  
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2, bmi >= 25.0]  
````

The names that you define in the `let` part are accessible to the expression after the `in` part

The difference between `let` and `where` is that `let` bindings are expressions themselves. `where` bindings are just syntactic constructs. We can do the following with `let`: 

````haskell
ghci> 4 * (if 10 > 5 then 10 else 0) + 2  
42  
ghci> 4 * (let a = 9 in a + 1) + 2  
42  
ghci> (let a = 100; b = 200; c = 300 in a*b*c, let foo="Hey "; bar="there!" in foo++bar)
(6000000,"Hey there!")
ghci> let zoot x y z = x * y + z  
ghci> zoot 3 9 2  
29  
ghci> let boot x y z = x * y + z in boot 3 4 2  
14  
ghci> boot  
<interactive>:1:0: Not in scope: `boot'  
````

The `in` part can be omitted when defining functions and constants, then the names will be visible throughout the entire interactive session



### Case expressions

Case expressions are expressions. We can evaluate expressions based on the possible cases of the value of a variable, we can also do pattern matching. We can rewrite the `head'` above in the following way

````haskell
head' :: [a] -> a
head' xs = case xs of [] -> error "No head for empty lists"
					  (x:_) -> x
````

The syntax for case expressions is pretty simple: 

````haskell
case expression of pattern -> result
				   pattern -> result
				   pattern -> result
				   ...				   
````

Whereas pattern matching on function parameters can only be done when defining functions, case expressions can be used pretty much anywhere. For instance: 

``` haskell
describeList :: [a] -> String  
describeList xs = "The list is " ++ case xs of [] -> "empty."  
                                               [x] -> "a singleton list."   
                                               xs -> "a longer list."  

describeList' :: [a] -> String  
describeList' xs = "The list is " ++ what xs  
    where what [] = "empty."  
          what [x] = "a singleton list."  
          what xs = "a longer list."  
```



## 5. Recursion

### Some recursion examples: 
``` haskell
maximum' :: (Ord a) => [a] -> a  
maximum' [] = error "maximum of empty list"  
maximum' [x] = x  
maximum' (x:xs) = max x (maximum' xs)  

replicate' :: (Num i, Ord i) => i -> a -> [a]  
replicate' n x  
    | n <= 0    = []  
    | otherwise = x:replicate' (n-1) x  

-- take' 3 [5,4,3,2,1] ==> [5,4,3]
take' :: (Num i, Ord i) => i -> [a] -> [a]  
take' n _  
    | n <= 0   = []  
take' _ []     = []  
take' n (x:xs) = x : take' (n-1) xs  

reverse' :: [a] -> [a]  
reverse' [] = []  
reverse' (x:xs) = reverse' xs ++ [x]  

zip' :: [a] -> [b] -> [(a,b)]  
zip' _ [] = []  
zip' [] _ = []  
zip' (x:xs) (y:ys) = (x,y):zip' xs ys  

elem' :: (Eq a) => a -> [a] -> Bool  
elem' a [] = False  
elem' a (x:xs)  
    | a == x    = True  
    | otherwise = a `elem'` xs   

quicksort :: (Ord a) => [a] -> [a]  
quicksort [] = []  
quicksort (x:xs) =   
    let smallerSorted = quicksort [a | a <- xs, a <= x]  
        biggerSorted = quicksort [a | a <- xs, a > x]  
    in  smallerSorted ++ [x] ++ biggerSorted  
```





## 6. Higher order functions

Haskell functions can take functions as parameters and return functions as return values. A function that does either of those is called a higher order function



### Curried functions

Every function in Haskell officially only takes one parameter. All the functions that accept several parameters have been curried functions. For example: 

`max :: (Ord a) => a -> a -> a` is the same as `max :: (Ord a) => a -> (a -> a)` 

The following two calls are equivalent: 

````haskell
ghci> max 4 5
5
ghci> (max 4) 5
5
````

If we call a function with too few parameters, we get back a partially applied function. Using partial application is a neat way to create functions on the fly so we can pass them to another function or to seed them with some data. For example: 

``` Haskell
multThree :: (Num a) => a -> a -> a -> a  
multThree x y z = x * y * z  
```
Then
``` Haskell
ghci> let multTwoWithNine = multThree 9  
ghci> multTwoWithNine 2 3  
54  
ghci> let multWithEighteen = multTwoWithNine 2  
ghci> multWithEighteen 10  
180  
```

Another way of writing it

``` Haskell
compareWithHundred :: (Num a, Ord a) => a -> Ordering
compareWithHundred = compare 100
```



### Section an infix function

To section an infix function, simply surround it with parentheses and only supply a parameter on one side:
```Haskell
divideByTen :: (Floating a) => a -> a  
divideByTen = (/10)  

isUpperAlphanum :: Char -> Bool  
isUpperAlphanum = (`elem` ['A'..'Z'])  
```



### Some higher-orderism is in order

Functions can take functions as parameters and also return functions. Note that the parentheses in the following examples are mandatory. They indicate that the first parameter are functions

``` Haskell
applyTwice :: (a -> a) -> a -> a  
applyTwice f x = f (f x)  

zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]  
zipWith' _ [] _ = []  
zipWith' _ _ [] = []  
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys  

flip' :: (a -> b -> c) -> (b -> a -> c)  
flip' f = g  
    where g x y = f y x  
```
Applying:
``` Haskell
ghci> applyTwice (+3) 10  
16  
ghci> applyTwice (++ " HAHA") "HEY"  
"HEY HAHA HAHA"  
ghci> applyTwice ("HAHA " ++) "HEY"  
"HAHA HAHA HEY"  
ghci> applyTwice (3:) [1]  
[3,3,1]  

ghci> zipWith' (+) [4,2,5,6] [2,6,2,3]  
[6,8,7,9]  
ghci> zipWith' max [6,3,2,1] [7,3,1,5]  
[7,3,2,5]  
ghci> zipWith' (++) ["foo ", "bar ", "baz "] ["fighters", "hoppers", "aldrin"]  
["foo fighters","bar hoppers","baz aldrin"]  
ghci> zipWith' (*) (replicate 5 2) [1..]  
[2,4,6,8,10]  

```



### Maps and filters 

`map` takes a function and a list and applies that function to every element  in the list, producing a new list. Its definition: 

````haskell
map :: (a -> b) -> [a] -> [b]  
map _ [] = []  
map f (x:xs) = f x : map f xs  
````

`filter` is a function that takes a predicate (a predicate is a function that tells whether somethign is true or not) and a list and then returns the list of elements that satisfy the predicate. Its definition: 

````haskell
filter :: (a -> Bool) -> [a] -> [a]  
filter _ [] = []  
filter p (x:xs)   
    | p x       = x : filter p xs  
    | otherwise = filter p xs  
````

With them, we can implement quicksort easily: 

``` Haskell
quicksort :: (Ord a) => [a] -> [a]    
quicksort [] = []    
quicksort (x:xs) =     
    let smallerSorted = quicksort (filter (<=x) xs)  
        biggerSorted = quicksort (filter (>x) xs)   
    in  smallerSorted ++ [x] ++ biggerSorted  
```

`filter` doesn't work on infinite lists while `takeWhile` does. Eg. find the sum of all odd squares that are smaller than 10,000

````haskell
ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))  
166650  
ghci> sum (takeWhile (<10000) [n^2 | n <- [1..], odd (n^2)])  
166650  
````

Generate Collatz sequences

````haskell
chain :: (Integral a) => a -> [a]  
chain 1 = [1]  
chain n  
    | even n =  n:chain (n `div` 2)  
    | odd n  =  n:chain (n*3 + 1)  
````

Applying 

````haskell
ghci> chain 10  
[10,5,16,8,4,2,1]  
````

Another example is: 

````haskell
ghci> let listOfFuns = map (*) [0..]
ghci> (listOfFuns !! 4) 5
````

What happens here is that the number in the list is applied to the function `*`, which has a type of `(Num a) => a -> a -> a`. Applying only one parameter to a function that takes two parameters returns a function that takes one parameter. If we map `*` over the list `[0..]`, we get back a list of functions that only take one parameter. So this function produces a list like `[(0*), (1*), (2*), (3*), (4*), ...]`. Thus the fourth element is `(4*)` and it gives 20 when it applied to 5



### Lambda

Lambdas are basically anonymous function. To make a lambda, we write a `\` and then we write the parameters, separated by spaces. After that comes a `->` and then the function body. We usually surround them by parentheses, because otherwise they extend all the way to the right

````haskell
map (\(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]  

addThree :: (Num a) => a -> a -> a -> a  
addThree = \x -> \y -> \z -> x + y + z  

flip' :: (a -> b -> c) -> b -> a -> c  
flip' f = \x y -> f y x  
````



### Foldl

`foldl` - fold a list from left. It needs a binary function. The binary function is applied between the starting value and the head of the list. That produces a new accumulator value and the binary function is called with that value and the next element, etc. For example: 

````haskell
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs

sum'' :: (Num a) => [a] -> a  
sum'' = foldl (+) 0  

elem' :: (Eq a) => a -> [a] -> Bool  
elem' y ys = foldl (\acc x -> if x == y then True else acc) False ys  
````

`foldr` - fold a list from right. The starting value and the list swapped places. To generate a list as the result, right fold append is faster. Also only right fold work on infinite list. 

The accumulator value (and hence, the result) of a fold can be of any type. It can be a number, a boolean or even a new list. For example:

````haskell
map' :: (a -> b) -> [a] -> [b]  
map' f xs = foldr (\x acc -> f x : acc) [] xs  
````

Folds can be used to implement any function where you traverse a list once, element by element, and then return something based on that

`foldl1` and `foldr1` is similar but do not require starting value and assume that the starting value equal with the first inputted element from the list. Examples:

`````haskell
maximum' :: (Ord a) => [a] -> a  
maximum' = foldr1 (\x acc -> if x > acc then x else acc)  
  
reverse' :: [a] -> [a]  
reverse' = foldl (\acc x -> x : acc) []  
  
product' :: (Num a) => [a] -> a  
product' = foldr1 (*)  
  
filter' :: (a -> Bool) -> [a] -> [a]  
filter' p = foldr (\x acc -> if p x then x : acc else acc) []  
  
head' :: [a] -> a  
head' = foldr1 (\x _ -> x)  
  
last' :: [a] -> a  
last' = foldl1 (\_ x -> x)  
`````

`scanl` and `scanr` are similar but they report all the intermediate accumulated states in the form of a list. `scanl1` and `scanr1` are analogous. 



### Function application with `$`

The function application operator `$` has the lowest precedence and it is right-associative. It can help us by saving lots of parenthesis

```haskell
($) :: (a -> b) -> a -> b
f $ x = f x
```

`$` means that function application can be treated just like another function. That way, we can for instance, map function application over a list of functions

```haskell
ghci> map ($ 3) [(4+), (10*), (^2), sqrt]
[7.0,30.0,9.0,1.7320508075688772]
```





### Function composition

The `.` function define function composition $(f\circ g)(x)=f(g(x))$

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
```

Examples

````haskell
ghci> map (negate . abs) [5,-3,-6,7,-3,2,-19,24]  
[-5,-3,-6,-7,-3,-2,-19,-24]  
ghci> map (negate . sum . tail) [[1..5],[3..6],[1..7]]  
[-14,-15,-27]  
ghci> sum (replicate 5 (max 6.7 8.9)) == sum . replicate 5 . max 6.7 $ 8.9
````

If you want to rewrite an expression with a lot of parentheses by using function composition, you can start by putting the last parameter of the innermost function after a `$` and then just composing all the other function calls, writing them without their last parameter and putting dots between them

Thus `replicate 100 (product (map (*3) (zipWith max [1,2,3,4,5] [4,5,6,7,8])))` becomes `replicate 100 . product . map (*3) . zipWith max [1,2,3,4,5] $ [4,5,6,7,8]`



## 7. Modules

`````haskell
import Data.List  
  
numUniques :: (Eq a) => [a] -> Int  
numUniques = length . nub  
`````

In `ghci`: 

`````haskell
ghci> :m + Data.List Data.Map Data.Set  
`````

Import only some functions

````haskell
import Data.List (nub, sort)  
````

Import everything but some functions

```haskell
import Data.List hiding (nub)  
```

Qualified import

````haskell
import qualified Data.Map as M
-- M.filter
````



### `Data.List`

`foldl'` and `foldr'` are stricter versions of their respective lazy incarnations. When using lazy folds on really big lists, you might often get a stack overflow error. The stricter versions will not. 

`length`, `take`, `drop`, `splitAt`, `!!` and `replicate` all take an `Int` as one of their parameters. To use the more general type `Num`, `Data.list`  has `genericLength`, `genericTake`, `genericDrop`, `genericSplitAt`, `genericIndex` and `genericReplicate`. 

The `nub`, `delete`, `union`, `intersect` and `group` functions all have their more general counterparts called `nubBy`, `deleteBy`, `unionBy`, `intersectBy` and `groupBy`. They take in a function for comparison the inputted elements. 

Similarly, the `sort`, `insert`, `maximum` and `minimum` have their more general equivalents  `sortBy`, `insertBy`, `maximumBy` and `minimumBy`. They take in function for comparison as well. 

````haskell
ghci> intersperse '.' "MONKEY"  
"M.O.N.K.E.Y"  
ghci> intersperse 0 [1,2,3,4,5,6]  
[1,0,2,0,3,0,4,0,5,0,6]  

ghci> intercalate " " ["hey","there","guys"]  
"hey there guys"  
ghci> intercalate [0,0,0] [[1,2,3],[4,5,6],[7,8,9]]  
[1,2,3,0,0,0,4,5,6,0,0,0,7,8,9]  

ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]  
[[1,4,7],[2,5,8],[3,6,9]]  
ghci> transpose ["hey","there","guys"]  
["htg","ehu","yey","rs","e"]  

ghci> concat ["foo","bar","car"]  
"foobarcar"  
ghci> concat [[3,4,5],[2,3,4],[2,1,1]]  
[3,4,5,2,3,4,2,1,1]  

ghci> concatMap (replicate 4) [1..3]  
[1,1,1,1,2,2,2,2,3,3,3,3]  

ghci> and $ map (>4) [5,6,7,8]  
True  
ghci> and $ map (==4) [4,4,4,3,4]  
False  

ghci> or $ map (==4) [2,3,4,5,6,1]  
True  
ghci> or $ map (>4) [1,2,3]  
False 

ghci> any (==4) [2,3,5,6,1,4]  
True  
ghci> all (>4) [6,9,10]  
True  
ghci> all (`elem` ['A'..'Z']) "HEYGUYSwhatsup"  
False  
ghci> any (`elem` ['A'..'Z']) "HEYGUYSwhatsup"  
True  

ghci> take 10 $ iterate (*2) 1  
[1,2,4,8,16,32,64,128,256,512]  
ghci> take 3 $ iterate (++ "haha") "haha"  
["haha","hahahaha","hahahahahaha"]  

ghci> splitAt 3 "heyman"  
("hey","man")  
ghci> splitAt 100 "heyman"  
("heyman","")  
ghci> splitAt (-3) "heyman"  
("","heyman")  
ghci> let (a,b) = splitAt 3 "foobar" in b ++ a  
"barfoo"  

ghci> takeWhile (>3) [6,5,4,3,2,1,2,3,4,5,4,3,2,1]  
[6,5,4]  
ghci> takeWhile (/=' ') "This is a sentence"  
"This"  
ghci> sum $ takeWhile (<10000) $ map (^3) [1..]  
53361  

ghci> dropWhile (/=' ') "This is a sentence"  
" is a sentence"  
ghci> dropWhile (<3) [1,2,2,2,3,4,5,4,3,2,1]  
[3,4,5,4,3,2,1]  

ghci> let stock = [(994.4,2008,9,1),(995.2,2008,9,2),(999.2,2008,9,3),(1001.4,2008,9,4),(998.3,2008,9,5)]  
ghci> head (dropWhile (\(val,y,m,d) -> val < 1000) stock)  
(1001.4,2008,9,4)  

ghci> let (fw, rest) = span (/=' ') "This is a sentence" in "First word:" ++ fw ++ ", the rest:" ++ rest  
"First word: This, the rest: is a sentence"  

ghci> break (==4) [1,2,3,4,5,6,7]  
([1,2,3],[4,5,6,7])  
ghci> span (/=4) [1,2,3,4,5,6,7]  
([1,2,3],[4,5,6,7])  

ghci> sort [8,5,3,2,1,6,4,2]  
[1,2,2,3,4,5,6,8]  
ghci> sort "This will be sorted soon"  
"    Tbdeehiillnooorssstw"  

ghci> group [1,1,1,1,2,2,2,2,3,3,2,2,2,5,6,7]  
[[1,1,1,1],[2,2,2,2],[3,3],[2,2,2],[5],[6],[7]]  

ghci> map (\l@(x:xs) -> (x,length l)) . group . sort $ [1,1,1,1,2,2,2,2,3,3,2,2,2,5,6,7]  
[(1,4),(2,7),(3,2),(5,1),(6,1),(7,1)]  

ghci> inits "w00t"  
["","w","w0","w00","w00t"]  
ghci> tails "w00t"  
["w00t","00t","0t","t",""]  
ghci> let w = "w00t" in zip (inits w) (tails w)  
[("","w00t"),("w","00t"),("w0","0t"),("w00","t"),("w00t","")]  

search :: (Eq a) => [a] -> [a] -> Bool  
search needle haystack =   
    let nlen = length needle  
    in  foldl (\acc x -> if take nlen x == needle then True else acc) False (tails haystack)  

ghci> "cat" `isInfixOf` "im a cat burglar"  
True  
ghci> "Cat" `isInfixOf` "im a cat burglar"  
False  

ghci> "hey" `isPrefixOf` "hey there!"  
True  
ghci> "hey" `isPrefixOf` "oh hey there!"  
False  
ghci> "there!" `isSuffixOf` "oh hey there!"  
True  
ghci> "there!" `isSuffixOf` "oh hey there"  
False  

ghci> partition (`elem` ['A'..'Z']) "BOBsidneyMORGANeddy"  
("BOBMORGAN","sidneyeddy")  
ghci> partition (>3) [1,3,5,6,3,2,1,0,3,7]  
([5,6,7],[1,3,3,2,1,0,3])  

ghci> span (`elem` ['A'..'Z']) "BOBsidneyMORGANeddy"  
("BOB","sidneyMORGANeddy")  

ghci> find (>4) [1,2,3,4,5,6]  
Just 5  
ghci> find (>9) [1,2,3,4,5,6]  
Nothing  
ghci> :t find  
find :: (a -> Bool) -> [a] -> Maybe a  

ghci> :t elemIndex  
elemIndex :: (Eq a) => a -> [a] -> Maybe Int  
ghci> 4 `elemIndex` [1,2,3,4,5,6]  
Just 3  
ghci> 10 `elemIndex` [1,2,3,4,5,6]  
Nothing  

ghci> ' ' `elemIndices` "Where are the spaces?"  
[5,9,13]  

ghci> zipWith3 (\x y z -> x + y + z) [1,2,3] [4,5,2,2] [2,2,3]  
[7,9,8]  
ghci> zip4 [2,3,3] [2,2,2] [5,5,3] [2,2,2]  
[(2,2,5,2),(3,2,5,2),(3,2,3,2)]  

ghci> lines "first line\nsecond line\nthird line"  
["first line","second line","third line"]  

ghci> unlines ["first line", "second line", "third line"]  
"first line\nsecond line\nthird line\n"  

ghci> words "hey these are the words in this sentence"  
["hey","these","are","the","words","in","this","sentence"]  
ghci> words "hey these           are    the words in this\nsentence"  
["hey","these","are","the","words","in","this","sentence"]  
ghci> unwords ["hey","there","mate"]  
"hey there mate"  

ghci> nub [1,2,3,4,3,2,1,2,3,4,3,2,1]  
[1,2,3,4]  
ghci> nub "Lots of words and stuff"  
"Lots fwrdanu"  

ghci> delete 'h' "hey there ghang!"  
"ey there ghang!"  
ghci> delete 'h' . delete 'h' $ "hey there ghang!"  
"ey tere ghang!"  

ghci> [1..10] \\ [2,5,9]  
[1,3,4,6,7,8,10]  
ghci> "Im a big baby" \\ "big"  
"Im a  baby"  

ghci> "hey man" `union` "man what's up"  
"hey manwt'sup"  
ghci> [1..7] `union` [5..10]  
[1,2,3,4,5,6,7,8,9,10]  

ghci> [1..7] `intersect` [5..10]  
[5,6,7]  

ghci> insert 4 [3,5,1,2,8,2]  
[3,4,5,1,2,8,2]  
ghci> insert 4 [1,3,4,4,1]  
[1,3,4,4,4,1]  

ghci> let values = [-4.3, -2.4, -1.2, 0.4, 2.3, 5.9, 10.5, 29.1, 5.3, -2.4, -14.5, 2.9, 2.3]  
ghci> groupBy (\x y -> (x > 0) == (y > 0)) values  
[[-4.3,-2.4,-1.2],[0.4,2.3,5.9,10.5,29.1,5.3],[-2.4,-14.5],[2.9,2.3]]  
ghci> groupBy ((==) `on` (> 0)) values  
[[-4.3,-2.4,-1.2],[0.4,2.3,5.9,10.5,29.1,5.3],[-2.4,-14.5],[2.9,2.3]]  

ghci> let xs = [[5,4,5,4,4],[1,2,3],[3,5,4,3],[],[2],[2,2]]  
ghci> sortBy (compare `on` length) xs  
[[],[2],[2,2],[1,2,3],[3,5,4,3],[5,4,5,4,4]]  
````



### `Data.Char` 

`Data.Char` has the following trivial functions. `isControl`, `isSpace`, `isLower`, `isUpper`, `isAlpha`, `isAlphaNum`, `isPrint`, `isDigit`, `isOctDigit`, `isHexDigit`, `isLetter`, `isMark`, `isNumber`, `isPunctuation`, `isSymbol`, `isSeparator`, `isAscii`, `isAsciiUpper`, `isAsciiLower`, `toUpper`, `toLower`, `toTitle`, `digitToInt`, `intToDigit`, `ord`, `chr`.

````haskell
ghci> generalCategory ' '  
Space  
ghci> generalCategory 'A'  
UppercaseLetter  
ghci> generalCategory 'a'  
LowercaseLetter  
ghci> generalCategory '.'  
OtherPunctuation  
ghci> generalCategory '9'  
DecimalNumber  
ghci> map generalCategory " \t\nA9?|"  
[Space,Control,Control,UppercaseLetter,DecimalNumber,OtherPunctuation,MathSymbol]  

ghci> map digitToInt "34538"  
[3,4,5,3,8]  
ghci> map digitToInt "FF85AB"  
[15,15,8,5,10,11]  

ghci> intToDigit 15  
'f'  
ghci> intToDigit 5  
'5'  

ghci> ord 'a'  
97  
ghci> chr 97  
'a'  
ghci> map ord "abcdefgh"  
[97,98,99,100,101,102,103,104]  

````



### `Data.Map`

Trivial list map implementation

````haskell
findKey :: (Eq k) => k -> [(k,v)] -> v  
findKey key xs = snd . head . filter (\(k,v) -> key == k) $ xs  

findKey :: (Eq k) => k -> [(k,v)] -> Maybe v  
findKey key = foldr (\(k,v) acc -> if key == k then Just v else acc) Nothing  

phoneBook =   
    [("betty","555-2938")  
    ,("bonnie","452-2928")  
    ,("patsy","493-2928")  
    ,("lucille","205-2928")  
    ,("wendy","939-8282")  
    ,("penny","853-2492")  
    ]  
    
findKey "penny" phoneBook == Just "853-2492" 
findKey "wilma" phoneBook == Nothing  
````

But `Data.Map` is a lot faster. It can be imported by

````haskell
import qualified Data.Map as Map  
````

Usage:

````haskell
ghci> Map.fromList [("betty","555-2938"),("bonnie","452-2928"),("lucille","205-2928")] 
fromList [("betty","555-2938"),("bonnie","452-2928"),("lucille","205-2928")]  
ghci> Map.fromList [(1,2),(3,4),(3,2),(5,5)]  
fromList [(1,2),(3,2),(5,5)]  

ghci> Map.empty  
fromList []  
ghci> Map.insert 3 100 Map.empty  
fromList [(3,100)]  
ghci> Map.insert 5 600 (Map.insert 4 200 ( Map.insert 3 100  Map.empty))  
fromList [(3,100),(4,200),(5,600)]  
ghci> Map.insert 5 600 . Map.insert 4 200 . Map.insert 3 100 $ Map.empty  
fromList [(3,100),(4,200),(5,600)]  

ghci> Map.null Map.empty  
True  
ghci> Map.null $ Map.fromList [(2,3),(5,5)]  
False  

ghci> Map.size Map.empty  
0  
ghci> Map.size $ Map.fromList [(2,4),(3,3),(4,2),(5,4),(6,4)]  
5  

ghci> Map.singleton 3 9  
fromList [(3,9)]  
ghci> Map.insert 5 9 $ Map.singleton 3 9  
fromList [(3,9),(5,9)]  

ghci> Map.member 3 $ Map.fromList [(3,6),(4,3),(6,9)]  
True  
ghci> Map.member 3 $ Map.fromList [(2,5),(4,5)]  
False  

ghci> Map.map (*100) $ Map.fromList [(1,1),(2,4),(3,9)]  
fromList [(1,100),(2,400),(3,900)]  
ghci> Map.filter isUpper $ Map.fromList [(1,'a'),(2,'A'),(3,'b'),(4,'B')]  
fromList [(2,'A'),(4,'B')]  
ghci> Map.toList . Map.insert 9 2 $ Map.singleton 4 3  
[(4,3),(9,2)]  

ghci> Map.fromListWith max [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]  
fromList [(2,100),(3,29),(4,22)]  
ghci> Map.fromListWith (+) [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]  
fromList [(2,108),(3,62),(4,37)]  
ghci> Map.insertWith (+) 3 100 $ Map.fromList [(3,4),(5,103),(6,339)]  
fromList [(3,104),(5,103),(6,339)]  
````



### `Data.Set`

Imported

````haskell
import qualified Data.Set as Set  
````

Usage

````haskell
ghci> Set.null Set.empty  
True  
ghci> Set.null $ Set.fromList [3,4,5,5,4,3]  
False  
ghci> Set.size $ Set.fromList [3,4,5,3,4,5]  
3  
ghci> Set.singleton 9  
fromList [9]  
ghci> Set.insert 4 $ Set.fromList [9,3,8,1]  
fromList [1,3,4,8,9]  
ghci> Set.insert 8 $ Set.fromList [5..10]  
fromList [5,6,7,8,9,10]  
ghci> Set.delete 4 $ Set.fromList [3,4,5,4,3,4,5]  
fromList [3,5]  

ghci> Set.fromList [2,3,4] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]  
True  
ghci> Set.fromList [1,2,3,4,5] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]  
True  
ghci> Set.fromList [1,2,3,4,5] `Set.isProperSubsetOf` Set.fromList [1,2,3,4,5]  
False  
ghci> Set.fromList [2,3,4,8] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]  
False  

ghci> Set.filter odd $ Set.fromList [3,4,5,6,7,2,3,4]  
fromList [3,5,7]  
ghci> Set.map (+1) $ Set.fromList [3,4,5,6,7,2,3,4]  
fromList [3,4,5,6,7,8]  
````



### Your own modules

Example:

````haskell
module Geometry  
( sphereVolume  
, sphereArea  
, cubeVolume  
, cubeArea  
, cuboidArea  
, cuboidVolume  
) where  
  
sphereVolume :: Float -> Float  
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)  
  
sphereArea :: Float -> Float  
sphereArea radius = 4 * pi * (radius ^ 2)  
  
cubeVolume :: Float -> Float  
cubeVolume side = cuboidVolume side side side  
  
cubeArea :: Float -> Float  
cubeArea side = cuboidArea side side side  
  
cuboidVolume :: Float -> Float -> Float -> Float  
cuboidVolume a b c = rectangleArea a b * c  
  
cuboidArea :: Float -> Float -> Float -> Float  
cuboidArea a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2  
  
rectangleArea :: Float -> Float -> Float  
rectangleArea a b = a * b  
````

Or organized by files and directories. For example if we have a folder called `Geometry`. There are three files in the folder - `Sphere.hs`,  `Cuboid.hs`, and `Cube.hs`.

In `Sphere.hs`: 

````haskell
module Geometry.Sphere  
( volume  
, area  
) where  
  
volume :: Float -> Float  
volume radius = (4.0 / 3.0) * pi * (radius ^ 3)  
  
area :: Float -> Float  
area radius = 4 * pi * (radius ^ 2)  
````

In `Cuboid.hs`:

````haskell
module Geometry.Cuboid  
( volume  
, area  
) where  
  
volume :: Float -> Float -> Float -> Float  
volume a b c = rectangleArea a b * c  
  
area :: Float -> Float -> Float -> Float  
area a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2  
  
rectangleArea :: Float -> Float -> Float  
rectangleArea a b = a * b  
````

In `Cube.hs`: 

````haskell
module Geometry.Cube  
( volume  
, area  
) where  
  
import qualified Geometry.Cuboid as Cuboid  
  
volume :: Float -> Float  
volume side = Cuboid.volume side side side  
  
area :: Float -> Float  
area side = Cuboid.area side side side  
````

Usage:

````haskell
import qualified Geometry.Sphere as Sphere  
import qualified Geometry.Cuboid as Cuboid  
import qualified Geometry.Cube as Cube  
````





## 8. Make your own types and typeclasses

### Algebraic data types 

How boolean type is defined in the standard library:

```haskell
data Bool = False | True  
```

Another example: 

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float   

surface :: Shape -> Float  
surface (Circle _ _ r) = pi * r ^ 2  
surface (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)  

surface $ Circle 10 20 10 == 314.15927 
surface $ Rectangle 0 0 100 100 == 10000.0  
```

To improve the previous example, let's make an intermediate data type that defines a point in two-dimensional space and add `deriving (Show)` at the end a data declaration. Haskell will automatically make the type part of the `Show` typeclass

````haskell
data Point = Point Float Float deriving (Show)  
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)  

surface :: Shape -> Float  
surface (Circle _ r) = pi * r ^ 2  
surface (Rectangle (Point x1 y1) (Point x2 y2)) = (abs $ x2 - x1) * (abs $ y2 - y1)  

surface (Rectangle (Point 0 0) (Point 100 100)) == 10000.0  

map (Circle 10 20) [4,5,6,6] == [Circle 10.0 20.0 4.0,Circle 10.0 20.0 5.0,Circle 10.0 20.0 6.0,Circle 10.0 20.0 6.0] 
````

How about a function that nudges a shape? It takes a shape, the amount to move it on the x axis and the amount to move it on the y axis and then returns a new shape that has the same dimensions, only it's located somewhere else

```haskell
nudge :: Shape -> Float -> Float -> Shape  
nudge (Circle (Point x y) r) a b = Circle (Point (x+a) (y+b)) r  
nudge (Rectangle (Point x1 y1) (Point x2 y2)) a b = Rectangle (Point (x1+a) (y1+b)) (Point (x2+a) (y2+b))  

nudge (Circle (Point 34 34) 10) 5 10 == Circle (Point 39.0 44.0) 10.0 
```

If we don't want to deal directly with points, we can make some auxiliary functions that create shapes of some size at the zero coordinates and then nudge those:

````haskell
baseCircle :: Float -> Shape
baseCircle r = Circle (Point 0 0) r

baseRect :: Float -> Float -> Shape
baseRect width height = Rectangle (Point 0 0) (Point width height)

nudge (baseRect 40 100) 60 23 == Rectangle (Point 60.0 23.0) (Point 100.0 123.0)
````

If we wanted to export the functions and types that we defined here in a module, we could start it off like this:

```haskell
module Shapes 
( Point(..)
, Shape(..)
, surface
, nudge
, baseCircle
, baseRect
) where
```

By doing `Shape(..)`, we exported all the value constructors for `shape`, so that means that whoever imports our module can make shapes by using the `Rectangle` and `Circle` value constructors. It's the same as writing `Shape (Rectangle, Circle)`

We could also opt not to export any value constructors for `Shape` by just writing `Shape` in the export statement. That way, someone importing our module could only make shapes by using the auxiliary function functions `baseCircle` and `baseRect`

`Data.Map` uses that approach. You cannot create a map by doing `Map.Map [(1,2), (3,4)]` because it doesn't export that value constructor. However, you can make a mapping by using one of the auxiliary functions like `Map.fromList`. Not exporting the value constructors of a data types makes them more abstract in such a way that we hide their implementation



### Record syntax

If the data type we want to create is complicated, then to create it with the previous method will be unreadable. For example: `data Person = Person String string Int Float String String deriving (Show)`

Then, instead, we can do the following:

````haskell
data Person = Person { firstName :: String  
                     , lastName :: String  
                     , age :: Int  
                     , height :: Float  
                     , phoneNumber :: String  
                     , flavor :: String  
                     } deriving (Show)   

let guy = Person "Buddy" "Finklestein" 43 184.2 "526-2928" "Chocolate"  

firstName guy == "Buddy"  
height guy == 184.2 
flavor guy == "Chocolate"

data Car = Car {company :: String, model :: String, year :: Int} deriving (Show)  

Car {company="Ford", model="Mustang", year=1967}  
````



### Type parameters

Don't put type constraints into *data* declarations even if it seems to make sense, because you'll have to put them into the function type declarations either way.

`````haskell
data Maybe a = Nothing | Just a  

data Car a b c = Car { company :: a  
                     , model :: b  
                     , year :: c   
                     } deriving (Show)  

tellCar :: Car -> String  
tellCar (Car {company = c, model = m, year = y}) = "This " ++ c ++ " " ++ m ++ " was made in " ++ show y  

let stang = Car {company="Ford", model="Mustang", year=1967}  

tellCar stang == "This Ford Mustang was made in 1967"  


data Vector a = Vector a a a deriving (Show)  
  
vplus :: (Num t) => Vector t -> Vector t -> Vector t  
(Vector i j k) `vplus` (Vector l m n) = Vector (i+l) (j+m) (k+n)  
  
vectMult :: (Num t) => Vector t -> t -> Vector t  
(Vector i j k) `vectMult` m = Vector (i*m) (j*m) (k*m)  
  
scalarMult :: (Num t) => Vector t -> Vector t -> t  
(Vector i j k) `scalarMult` (Vector l m n) = i*l + j*m + k*n  
`````



### Derived instances

````haskell
data Person = Person { firstName :: String  
                     , lastName :: String  
                     , age :: Int  
                     } deriving (Eq, Show, Read)  

let mikeD = Person {firstName = "Michael", lastName = "Diamond", age = 43}  
let adRock = Person {firstName = "Adam", lastName = "Horovitz", age = 41}  
let mca = Person {firstName = "Adam", lastName = "Yauch", age = 44}  

let beastieBoys = [mca, adRock, mikeD]  
mikeD `elem` beastieBoys == True  

"mikeD is: " ++ show mikeD == "mikeD is: Person {firstName = \"Michael\", lastName = \"Diamond\", age = 43}"  

read "Person {firstName =\"Michael\", lastName =\"Diamond\", age = 43}" == mikeD  


data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday   
           deriving (Eq, Ord, Show, Read, Bounded, Enum)  

Monday `compare` Wednesday == LT  
minBound :: Day == Monday  
maxBound :: Day == Sunday  
succ Monday == Tuesday  
pred Saturday == Friday  
[Thursday .. Sunday] == [Thursday,Friday,Saturday,Sunday]  
[minBound .. maxBound] :: [Day] ==[Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]  
````



### Type synonyms

````haskell
type String = [Char]  

type PhoneNumber = String  
type Name = String  
type PhoneBook = [(Name,PhoneNumber)]  

inPhoneBook :: Name -> PhoneNumber -> PhoneBook -> Bool  
inPhoneBook name pnumber pbook = (name,pnumber) `elem` pbook  

type AssocList k v = [(k, v)]

type IntMap = Map Int
````



The names of the types and values are independent of each other. We only use a type constructor in a type declaration or a type signature. We only use a value constructor in actual code. So they can be the same.



Another useful data type is

```haskell
data Either a b = Left a | Right b deriving (Eq, Ord, Read, Show)
```

Usage:

```haskell
ghci> :t Right 'a'
Right 'a' :: Either a Char
ghci> :t Left True
Left True :: Either Bool b
```

This type can be used instead of `Maybe` to get real information about the returned value. 



For example a locker simulator:

```haskell
import qualified Data.Map as Map

data LockerState = Taken | Free deriving (Show, Eq)

type Code = String

type LockerMap = Map.Map Int (LockerState, Code)

lockerLookup :: Int -> LockerMap -> Either String Code
lockerLookup lockerNumber map =
  case Map.lookup lockerNumber map of
    Nothing -> Left $ "Locker number " ++ show lockerNumber ++ " doesn't exist!"
    Just (state, code) -> if state /= Taken
                          then Right code
                          else Left $ "Locker " ++ show lockerNumber ++ " is already taken!"
```



### Recursive data structures

For example

```haskell
data List a = Empty | Cons a (List a) deriving (Show, Read, Eq, Ord)
```

Which can be written in the record syntax as:

```haskell
data List a = Empty | Cons { listHead :: a, listTail :: List a} deriving (Show, Read, Eq, Ord)
```

Here `Cons` is another word for `:`. `:` is actually a constructor that takes a value and another list and returns a list. 



We can define functions to be automatically infix by making them comprised of only special characters. We can also do the same with constructors

```haskell
infixr 5 :-:
data List a = Empty | a :-: (List a) deriving (Show, Read, Eq, Ord)
```

When we define functions as operators, we can use that to give them a fixity. A fixity states how tightly the operator binds and whether it's left-associative `infixl` or right-associative `infixr`. 

When deriving `Show` for our type, Haskell will still display it as if the constructor was a prefix function.



#### Binary search tree

An example of implementation of the binary search tree

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)

singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
	| x == a = Node x left right
	| x <  a = Node a (treeInsert x left) right
	| x >  a = Node a left (treeInsert x right)
	
treeElem :: (Ord a) => a -> Tree a -> Bool
treeElem x EmptyTree = False
treeElem x (Node a left right)
	| x == a = True
	| x <  a = treeElem x left
	| x >  a = treeElem x right
	
let numsTree = foldr treeInsert EmptyTree [8,6,5,1,3,7,4]
```



### Typeclasses

For example:

```haskell
class Eq a where
	(==) :: a -> a -> Bool
	(/=) :: a -> a -> Bool
	x == y = not (x /= y)
	x /= y = not (x == y)
	
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
	Red == Red = True
	Green == Green = True
	Yellow == Yellow = True
	_ == _ = False
	
instance Show TrafficLight where
	show Red = "Red light"
	show Yellow = "Yellow light"
	show Green = "Green light"
	
instance (Eq m) => Eq (Maybe m) where
	Just x == Just y = x == y
	Nothing == Nothing = True
	_ == _ = False
```



#### The Functor typeclass

Types with the `Functor` typeclass is basically those things that can be mapped over, i.e. the list type is part of the `Functor` typeclass. 

For example:

```haskell
class Functor f where
	fmap :: (a -> b) -> f a -> f b

instance Functor [] where
	fmap = map

instance Functor Maybe where
	fmap f (Just x) = Just (f x)
	fmap f Nothing = Nothing

instance Functor Tree where
	fmap f EmptyTree = EmptyTree
	fmap f (Node x leftsub rightsub) = Node (f x) (fmap f leftsub) (fmap f rightsub)
	
instance Functor (Either a) where
	fmap f (Right x) = Right (f x)
	fmap f (Left x) = Left x
```



## 9. Input and Output

### Hello, world!

In file `helloworld.hs`

```haskell
main = putStrLn "Hello, world"
```



To compile and run:

```shell
$ ghc --make helloworld
[1 of 1] Compiling Main             ( helloworld.hs, helloworld.o )  
Linking helloworld ...  
$ ./helloworld
Hello, world
```



The type of the function `putStrLn`:

```haskell
ghci> :t putStrLn
putStrLn :: String -> IO ()
```



A more useful example: 

```haskell
main = do
	putStrLn "Hello, what's your name?"
	name <- getLine
	putStrLn ("Hey " ++ name ++ ", you rock!")
```

Each of these steps is an I/O action. By putting them together with `do` syntax, we glued them into one I/O action. The action that we got has a type of `IO ()`, because that's the type of the last I/O action inside. The last action cannot be bound to a name like the first two. 

The type of `getLine`

```haskell
ghci> :t getLine
getLine :: IO String
```

The `getLine` perform the I/O action and then bind its result value to `name`. `getLine` has a type of `IO String`, so `name` will have a type of `String`. 



Another example:

```haskell
main = do
	line <- getLine
	if null line
		then return ()
		else do 
			putStrLn $ reverseWords line
			main

reverseWords :: String -> String
reverseWords = unwords . map reverse . words
```

Using `return` doesn't cause the I/O do block to end in execution or anything like that. The `return` makes I/O actions that don't really do anything except have an encapsulated result and that result is thrown away because it isn't bound to a name. For example: 

```haskell
main = do 
	a <- return "hell"
	b <- return "yeah!"
	putStrLn $ a ++ " " ++ b
```

`return` is sort of the opposite to `<-`. While `return` takes a value and wraps it up in a box, `<-` takes a box (and performs it) and takes the value out of it, binding it to a name. 



There are more I/O functions:

* `putStr`

* `putChar`

* `print` == `putStrLn . show`

* `getChar`

* `when`: it looks like a control flow statement, but it's actually a normal function. It takes a boolean value and an I/O action. If that boolean value is `True`, it returns the same I/O action that we supplied to it. If it is `False`, it returns the `return ()`. 

  ```haskell
  import Control.Monad
  
  main = do
  	c <- getChar
  	when (c /= ' ') $ do
  		putChar c
  		main
  ```

* `sequence` takes a list of I/O actions and returns an I/O actions that will perform those actions one after the other. The result contained in that I/O action will be a list of the results of all the I/O actions that were performed. 

  ```haskell
  main = do
  	rs <- sequence [map print [1,2,3,4,5]]
  	print rs
  ```

* `mapM`: takes a function and a list, maps the function over the list and then sequences it

  * `mapM_` does the same, only it throws away the result later. We usually use `mapM_` when we don't care what result our sequenced I/O actions have.
  * `forM`: like `mapM`, only that it has its parameters switched around. 

* `forever`: takes an I/O action and returns an I/O action that just repeats the I/O action it got forever. 

  ```haskell
  import Control.Monad
  import Data.Char
  
  main = forever $ do
  	putStr "Give me some input: "
  	l <- getLine
  	putStrLn $ map toUpper l
  ```

  



### Files and streams
`getContents` is an I/O action that reads everything from the standard input until it encounters an end-of-file character. Its type is `getContents :: IO String`. `getContents` goes a lazy I/O, it doesn't read all of the input at once. For example: 
```Haskell
import Data.Char

main = do
	contents <- getContents
	putStr (map toUpper contexts)
```

There is a function called `interact` that takes a function of type `String -> String` as a parameter and returns an I/O action that will take some input, run that function on it and then print out the function's result. For example to filter only lines shorter than 10 characters:
```haskell
main = interact shortLinesOnly

shortLinesOnly :: String -> String
shortLinesOnly input = 
	let allLines = lines input
		shortLiens = filter (\line -> length line < 10) allLines
		result = unlines shortLines
	in result
```

Which can be reduced to one line:
```Haskell
main = interact $ unlines . filter ((< 10) . length) . lines
```

For file read, there is a function called `hGetContents`. It takes a `Handle`, so it knows which file to get the contents from and returns an `IO String` - an I/O action that holds as its result the contents of the file. `hGetContents` won't attempt to read the file at once and store it in memory, but it will read it as needed. For example: 
```Haskell
import System.IO

main = do
	handle <- openFile "file_to_read.txt" ReadMode
	contents <- hGetContents handle
	putStr contents
	hClose handle
```

Another way of doing this is with `withFile`: 
```Haskell
import System.IO

main = do
	withFile "file_to_read.txt" ReadMode (\handle -> do
		contents <- hGetContents handle
		putStr contents)
```

The `withFile` can be implemented in the following way:
```Haskell
withFile' :: FilePath -> IOMode -> (Handle -> IO a) -> IO a
withFile' path mode f = do
	handle <- openFile path mode
	result <- f handle
	hClose handle
	return result
```

Other functions to read and write file:
* `readFile` has a type signature of `readFile :: FilePath -> IO String`. `readFile` takes a path to a file and return an I/O action that will read that file (lazily) and bind its contents to something as a string. 
* `writeFile` has a type of `writeFile :: FilePath -> String -> IO ()`. It takes a path to a file and a string to write to that file and returns an I/O action that will do the writing. 
* `appendFile` has a type signature that's just like `writeFile`, only `appendFile` doesn't truncate the file to zero length if it already exists but it appends stuff to it.

You can control how exactly buffering is done by using the `hSetBuffering` function. It takes a handle and a `BufferMode` and returns an I/O action that sets the buffering. `BufferMode` is a simple enumeration data type and the possible values it can hold are: `NoBuffering`, `LineBuffering` or `BlockBuffering (Maybe Int)`. The `Maybe Int` is for how big the chunk should be, in bytes. If it is `Nothing`, then the operating system determines the chunk size. `NoBuffering` means that it will be read one character at a time. For example:
```Haskell
main = do
	withFile "something.txt" ReadMode (\handle -> do
		hSetBuffering handle $ BlockBuffering (Just 2048)
		contents <- hGetContents handle
		putStr contents)
```

We can also use `hFlush`, which is a function that takes a handle and returns an I/O action that will flush the buffer of the file associated with the handle. 

### Command line arguments
The `System.Environment` module has two cool I/O actions. One is `getArgs`, which has a type of `getArgs :: IO [String]` and is an I/O action that will get the arguments that the program was run with and have as its contained result a list with the arguments. `getProgName` has a type of `getProgName :: IO String` and is an I/O action that contains the program name: 
```Haskell
import System.Environment
import Data.List

main = do
	args <- getArgs
	progName <- getProgName
	putStrLn "The arguments are: "
	mapM putStrLn args
	putStrLn "The program name is: "
	putStrLn progName
```

#### A simple todo list apps
```Haskell
import System.Environment
import System.Directory
import System.IO
import Data.List

dispatch :: [(String, [String] -> IO ())]
dispatch = [
	("add", add),
	("view", view),
	("remove", remove)
	]
	
main = do
	(command:args) <- getArgs
	let (Just action) = lookup command dispatch
	action args

add :: [String] -> IO ()
add [fileName, todoItem] = appendFile fileName (todoItem ++ "\n")

view :: [String] -> IO ()
view [fileName] = do 
	contents <- readFile fileName
	let todoTasks = lines contents
		numberedTasks = zipWith (\n line -> show n ++ " - " ++ line) [0..] todoTasks
	putStr $ unlines numberedTasks

remove :: [String] -> IO ()
remove [fileName, numberString] = do 
	handle <- openFile fileName ReadMode
	(tempName, tempHandle) <- openTempFile "." "temp"
	contents <- hGetContents handle
	let number = read numberString 
		todoTasks = lines contents
		newTodoItems = delete (todoTasks !! number) todoTasks
	hPutStr tempHandle $ unlines newTodoItems
	hClose handle
	hClose tempHandle
	removeFile fileName
	renameFile tempName fileName
```

### Bytestrings
Bytestrings are sort of like lists, only each element is one byte (or 8 bits) in size. Bytestrings come in two flavors: strict and lazy ones. Strict bytestrings reside in `Data.ByteString`. A strict bytestring represents a series of bytes in an array. The upside is that there's less overhead because there are no thunks involved. The downside is that they're likely to fill your memory up faster. 

The other variety of bytestrings resides in `Data.ByteString.Lazy`. If you evaluatea byte in a lazy bytestring, the first 64K will be evalated. After that, it's just a promise for the rest of the chunks. 

For example:
```Haskell
import qualified Data.ByteString.Lazy as B 
import qualified Data.ByteString as S 

ghci> B.pack [99,97,110] 
Chunk "can" Empty 
ghci> B.pack [98..120] 
Chunk "bcdefghijklmnopqrstuvwx" Empty 
ghci> B.fromChunks [S.pack [40,41,42], S.pack [43,44,45], S.pack [46,47,48]] 
Chunk "()*" (Chunk "+,-" (Chunk "./0" Empty)) 
ghci> B.cons 85 $ B.pack [80,81,82,84] 
Chunk "U" (Chunk "PQRT" Empty) 
ghci> B.cons' 85 $ B.pack [80,81,82,84] 
Chunk "UPQRT" Empty 
ghci> foldr B.cons B.empty [50..60] 
Chunk "2" (Chunk "3" (Chunk "4" (Chunk "5" (Chunk "6" (Chunk "7" (Chunk "8" (Chunk "9" (Chunk ":" (Chunk ";" (Chunk "<" 
Empty)))))))))) 
ghci> foldr B.cons' B.empty [50..60] 
Chunk "23456789:;<" Empty
```

### Exceptions
Pure code can throw exceptions, but they can only be caught in the I/O part of our code. But for a good practice, don't mix exceptions and pure code. Take advatange of Haskell's powerful type system and use types like `Either` and `Maybe` to represent results that may have failed. 

An example: 
```Haskell
import System.Environment
import System.IO
import System.Directory

main = do (fileName:_) <- getArgs
	fileExists <- doesFileExist fileName
	if fileExists
		then do contents <- readFile fileName
			putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines!"
		else do putStrLn "The file doesn't exist!"
```

With exception:
```Haskell
import System.Environment
import System.IO
import System.IO.Error

main = toTry `catch` handler

toTry :: IO ()
toTry = do (fileName:_) <- getArgs
	contents <- readFile fileName
	putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines"

handler :: IOError -> IO ()
handler e
	| isDoesNotExistError e = putStrLn "The file doesn't exist"
	| otherwise = ioError e
```

The predicates that act on `IOError` are:
* `isAlreadyExistError`
* `isDoesNotExistError`
* `isAlreadyInUseError`
* `isFullError`
* `isEOFError`
* `isIllegalOperation`
* `isPermissionError`
* `isUserError`

## 10. Functors, Applicative, Functors and Monoids
### Functors redux
Functors are things that can be mapped over, like lists, `Maybe`s, trees, and such. In Haskell, they are described by the typeclass `Functor`, which has only one typeclass method, namely `fmap`, which has a type of `fmap :: (a -> b) -> f a -> f b`. 

Let's see how `IO` is an instance of `Functor`. When we `fmap` a function over an I/O action, we want to get back an I/O action that does the same thing, but has our function applied over its result value. 
```Haskell
instance Functor IO where 
	fmap f action = do 
		result <- action
		return (f result)

main = do line <- fmap reverse getLine
	putStrLn $ "You said " ++ line ++ " backwards!"
```

The result of mapping something over an I/O action will be an I/O action, so right off the bat we use do syntax to glue two actions and make a new one. 

Another instance of `Functor` that we've been dealing with all along without knowing was `(->) r`. 
```Haskell
instance Functor ((->) r) where 
	fmap f g = (\x -> f (g x))
```

Its type is then `fmap :: (a -> b) -> (r -> a) -> (r -> b)` which reminds us about function compositions. Thus it can be written as:
```Haskell
instance Functor ((->) r) where 
	fmap = (.)
```

#### Law of Functor
1. If we map the `id` function over a functor, the functor that we get back should be the same as the original functor.
2. Composing two functions and then mapping the resulting function over a functor should be the same as first mapping one function over the functor and then mapping the other one. 

### Applicative Functors
Applicative functors are represented in Haskell by the `Applicative` typeclass, found in the `Control.Applicative` module.
```Haskell
class (Functor f) => Applicative f where 
	pure :: a -> f a
	(<*>) :: f (a -> b) -> f a -> f b
```

It starts the definition of the `Applicative` class and it also introduces a class constraint. It says that if we want to make a type onstructor part of the `Applicative` typeclass, it has to be in `Functor` first. The first method it defines is called `pure`. `pure` should take a value of any type and return an applicative functor with that value inside it. The `<*>` function has a type declaration of `f (a -> b) -> f a -> f b`. It's a sort of a beefed up `fmap`. `<*>` takes a fnctor that has a function in it and another functor and sort of extracts that function from the first functor and then maps it over the second one. 

For example, `Applicative` instance implementation for `Maybe`:
```Haskell
instance Applicative Maybe where 
	pure = Just
	Nothing <*> _ = Nothing
	(Just f) <*> something = fmap f something

ghci> pure (+) <*> Just 3 <*> Just 5 
Just 8 
ghci> pure (+) <*> Just 3 <*> Nothing 
Nothing 
ghci> pure (+) <*> Nothing <*> Just 5 
Nothing 
```

`Applicative` instance implementaton for lists: 
```Haskell
instance Applicative [] where
	pure x = [x]
	fs <*> xs = [f x | f <- fs, x <- xs]

ghci> [(+),(*)] <*> [1,2] <*> [3,4] 
[4,5,5,6,3,4,6,8] 
```


`Control.Applicative` also exports a function called `<$>`, which is just `fmap` as an infix operator:
```Haskell
(<$>) :: (Functor f) => (a -> b) -> f a -> f b
f <$> x = fmap f x

(*) <$> [2,5,10] <*> [8,10,11] 
[16,20,22,40,50,55,80,100,110] 
```

### Monoids
A monoid is when you have an associative binary function and a value which acts as an identity with respect to that function. When something acts as an identity with respect to a function, it means hat when called with that function and some other value, the result is always equal to that other value. 

It is defined as:
```Haskell
class Monoid m where
	mempty :: m
	mappend :: m -> m -> m
	mconcat :: [m] -> m
	mconcat = foldr mappend mempty
```

The `Monoid` type class is defined in `Data.Monoid`. List, product, and sum are all monoids. For example:
```Haskell
instance Num a => Monoid (Product a) where 
	mempty = Product 1
	Product x `mappend` Product y = Product (x * y)

ghci> getProduct $ Product 3 `mappend` Product 9 
27 
ghci> getProduct $ Product 3 `mappend` mempty 
3 
ghci> getProduct . mconcat . map Product $ [3,4,2] 
24 
```

#### Monoid instance for `Ordering`
```Haskell
instance Monoid Ordering where
	mempty = EQ 
	LT `mappend` _ = LT
	EQ `mappend` y = y
	GT `mappend` _ = GT
```

#### `Maybe` the Monoid
```Haskell
instance Monoid a => Monoid (Maybe a) where  
    mempty = Nothing  
    Nothing `mappend` m = m  
    m `mappend` Nothing = m  
    Just m1 `mappend` Just m2 = Just (m1 `mappend` m2)  
```


## 11. Monads
Monads are just beefed up applicative functors, much like applicative functors are only beefed up functors. 

An applicative value can be seeen as a value with an added context. The `Applicative` type class allowed us tp use normal functions on these values with context and the context was preserved. For example, `Maybe a` values represent computations that might have failed, `[a]` values represent computations that have several results (non-deterministic computations), `IO a` values represent values that have side-effects, etc. 

Monads are a natural extension of applicative functors. If you have a value with a context, `m a`, how do you apply it to a function that takes a normal `a` and returns a value with a context? So essentially, we will want this function:
```Haskell
(>>=) :: (Monad m) => m a -> (a -> m b) -> m b
```

Monads are just applicative functors that support `>>=`. The `>>=` function is pronounced as bind. 

### `Maybe` Monad
`Maybe` is a monad. `>>=` would take a `Maybe a` value and a function of type `a -> Maybe b` and somehow apply the function to the `Maybe a`. For example
```Haskell
ghci> (\x -> Just (x+1)) 1
Just 2
```

Instead of calling it `>>=`, let's call it `applyMaybe` for now. It takes a `Maybe a` and a function that returns a `Maybe b` and manages to apply that function to the `Maybe a`:
```Haskell
applyMaybe :: Maybe a -> (a -> Maybe b) -> Maybe b
applyMaybe Nothing f  = Nothing
applyMaybe (Just x) f = f x

ghci> Just 3 `applyMaybe` \x -> Just (x+1) 
Just 4 
ghci> Just "smile" `applyMaybe` \x -> Just (x ++ " :)") 
Just "smile :)" 
```

### The monad type class
```Haskell
class Monad m where 
	return :: a -> m a
	
	(>>=) :: m a -> (a -> m b) -> m b
	
	(>>) :: m a -> m b -> m b
	x >> y = x >>= \_ -> y
	
	fail :: String -> m a
	fail msg = error msg
```

* We don't need to write `class (Applicative m) => Monad m where` because every monad is an applicative functor by default. 
* `return` is the same as `pure`, only with a different name. It takes a value and puts it in a minimal default context that still holds that value. In other words, it takes something and wraps it in a monad. 
* The next function is `>>=`, or bind. It's like tunction application, only instead of taking a normal value and feeding it to a normal function, it takes a monadic value and feeds it to a function that takes a normal value but returns monadic value. 
* The `>>` function comes with a default implementation and we pretty much never implement it when making `Monad` instances. `>>` is used when we want to pass some value to a function that ignores its parameter and always just returns some predetermined value. 
* `fail` function will not be used explicitly in our code. Instead, it's used by Haskell to enable failure in a special syntactic construct for monads that we'll meet later. 

`Maybe` monad:
```Haskell
instance Monad Maybe where
	return x  = Just x
	Nothing >>= f = Nothing
	Just x  >>= f x
	fail _    = Nothing

ghci> return "wait" :: Maybe String
Just "wait"
ghci> Just 9 >>= \x -> return (x * 10)
Just 90
ghci> Nothing >>= \x -> return (x * 10)
Nothing
```

### do notation
The `do` notation isn't just for `IO`, but can be used for any monad. Its principle is the same, gluing together monadic values in sequence. 

The following example: 
```Haskell
ghci> Just 3 >>= (\x -> Just "!" >>= (\y -> Just (show x ++ y)))
Just "3!"
```

Can be written as:
```Haskell
foo :: Maybe String
foo = do
	x <- Just 3
	y <- Just "!"
	Just (show x ++ y)
```

In a `do` expression, every line is a monadic value. 
```Haskell
routine :: Maybe Soup
routine = do
	start <- return (0,0)      -- means (water, salt)
	first <- addSalt 4 start   -- becomes (0, 4)
	Nothing                    -- means too salty
	second <- addWater 2 first -- too late to add water
	addWater 2 second          -- final result
```


### The list monad
The `Monad` instance for lists:
```Haskell
instance Monad [] where 
	return x = [x]
	xs >>= f = concat (map f xs)
	fail _ = []

ghci> [3, 4, 5] >>= \x -> [x, -x]
[3,-3,4,-4,5,-5]
```

Another example of propagation of the non-determinism:
```Haskell
ghci> [1,2] >>= \n -> ['a', 'b'] >>= \ch -> return (n, ch)
[(1,'a'),(1,'b'),(2,'a'),(2,'b')]
```

It is much clearer with `do` notation:
```Haskell
listOfTuples :: [(Int, Char)]
listOfTuples = do
	n <- [1, 2]
	ch <- ['a', 'b']
	return (n, ch)
```

This is similar to list comprehensions. In fact, list comprehensions are just syntactic sugar for using lists as monads. 
```Haskell
ghci> [ (n, ch) | n <- [1,2], ch <- ['a', 'b']]
[(1,'a'),(1,'b'),(2,'a'),(2,'b')]
```

### Monad laws
* Left identity: If we take a value, put it in a default context with `return` and then feed it to a function by using `>>=`, it's the same as just taking the value and applying the function to it. Formally:
  * `return x >>= f` is the same thing as `f x` 
* Right identity: If we have a monadic value and we use `>>=` to feed it to `return`, the result is our original monadic value. Formally:
  * `m >>= return` is no different than just `m`
* Associativity: When we have a chain of monadic function applications with `>>=`, it shouldn't matter how they're nested. Formally:
  * Doing `(m >>= f) >>= g` is just like doing `m >>= (\x -> f x  >>= g)`
  

### Add log to code with the Writer type
```Haskell
newtype Writer w a = Writer { runWriter :: (a, w) }

instance (Monoid w) => Monad (Writer w) where 
	return x = Writer (x, mempty)
	(Writer (x, v)) >>= f = let (Writer (y, v')) = f x in Writer (y, v `mappend` v')

-- --------------------------------------------------------
import Control.Monad.Writer

logNumber :: Int -> Writer [String] Int
logNumber x = Writer (x, ["Got number: " ++ show x])

multWithLog :: Writer [String] Int 
multWithLog = do
	a <- logNumber 3
	b <- logNumber 5
	return ( a * b )

gcd' :: Int -> Int -> Writer [String] Int
gcd' a b
	| b == 0 = do 
		tell ["Finished with " ++ show a]
		return a
	| otherwise = do 
		tell [show a ++ " mod " ++ show b ++ " = " ++ show (a `mod` b)]
		gcd' b (a `mod` b)

ghci> runWriter multWithLog 
(15,["Got number: 3","Got number: 5"]) 
ghci> mapM_ putStrLn $ snd $ runWriter (gcd' 8 3) 
8 mod 3 = 2 
3 mod 2 = 1 
2 mod 1 = 0 
Finished with 1 
```

### The apply monad 
```Haskell
instance Monad ((->) r) where 
	return x = \_ -> x
	h >>= f = \w -> f (h w) w

addStuff :: Int -> Int
addStuff = do 
	a <- (*2)
	b <- (+10)
	reutrn (a + b)

addStuff 3 == 19
```


### Stateful computations
```Haskell
newtype State s a = State { runState :: s -> (a, s) }

instance Monad (State s) where 
	return x = State $ \s -> (x, s)
	(State h) >>= f = State $ \s -> let (a, newState) = h s
		                                (State g) = f a
									in g newState

-- -------------------------------------------------------- 
import Control.Monad.State 

type Stack = [Int]
pop :: State Stack Int
pop = State $ \(x:xs) -> (x, xs)

push :: Int -> State Stack ()
push a = State $ \xs -> ((), a:xs)

stackManip :: State Stack Int
stackManip = do 
	a <- pop
	if a == 5
		then push 5
		else do
			push 3
			push 8

ghci> runState stackStuff [9,0,2,1,0]
((),[8,3,0,2,1,0])
```



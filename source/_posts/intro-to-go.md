---
title: Introduction to Go
date: 2021-01-07 
mathjax: true
tags: [Go, Programming]
---

Basic Go synax is introduced in this article. 


<!-- more -->

#### Packages, variables, and functions

  ````go
  package main
  
  import (
  	"fmt"
      "math/rand"
      "math/cmplx"
  )
  
  func add(x, y int) int {
      return x + y
  }
  
  func swap(x, y string) (string, string) {
      return y, x
  }
  
  func split(sum int) (x, y int) {
      x = sum * 4 / 9
      y = sum - x
      return
  }
  
  var (
  	ToBe	bool 		= false
      MaxInt 	uint64		= 1<<64 - 1
      z		complex128	= cmplx.Sqrt(-5 + 12i)
  )
  
  var i, j int = 1, 2
  
  const Pi = 3.14
  
  func needInt (x int) int { return x*10 + 1 }
  func needFloat (x float64) float64 { return x * 0.1 }
  
  func main() {
      fmt.Println("A random number is: ", rand.Intn(10))
      fmt.Println(add(42, 13))
      a, b := swap("hello", "world")
      fmt.Println(a, b)
      fmt.Println(split(17))
      var c, python, java = true, false, "no"
      fmt.Println(i, j, c, python, java)
      fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
  	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
  	fmt.Printf("Type: %T Value: %v\n", z, z)
  	var i int
  	var f float64
  	var t bool
  	var s string
  	fmt.Printf("%v %v %v %q\n", i, f, t, s)
      fmt.Println("Happy", Pi, "Day")
      const Big = 1 << 100
      fmt.Println(needFloat(Big))		// This line works as it print Big as a float number
  	// fmt.Println(needInt(Big))	// This line does not work as it through overflows int exception
  }
  ````

* Inside a function, the `:=` short assignment statement can be used in place of a `var` declaration with implicit type

  * Outside a function, every statement begins with a keyword (`var`, `func` and so on) and so the `:=` construct is not available

* Naked return statements should be used only in short functions. They can harm readability in longer functions

* The expression `T(v)` converts the value `v` to the type `T`. Unlike in C, in Go assignment between items of different type requires an explicit conversion
* When declaring a variable without specifying an explicit type, the variable's type is inferred from the value on the right hand side
  * When the right hand side of the declaration is typed, the new variable is of that same
  * When the right hand side contains an untyped numeric constant, the new variable may be an `int`, `float64`, or `complex128` depending on the precision of the constant

* Constants cannot be declared using the `:=` syntax

* Numeric constants are high-precision values. An untyped constant takes the type needed by its context



#### Flow control statements: for, if, else, switch and defer

  ````go
  package main
  
  import (
  	"fmt"
      "math"
      "runtime"
      "time"
  )
  
  func sqrt (x float64) string {
      if str := "i"; x < 0 {
          return sqrt(-x) + str
      } else {
          return fmt.Sprint(math.Sqrt(x))
      }
  }
  
  func main() {
      sum := 0
      for i := 0; i < 10; i++ {
          sum += i
      }
      fmt.Println(sum)
      
      prod := 1
      for prod < 1000 {
          prod += prod
      }
      fmt.Println(prod)
      
      // for {}  		// infinite loop
      
      fmt.Println(sqrt(2), sqrt(-4))
      
      fmt.Print("Go runs on ")
      switch os := runtime.GOOS; os {
      case "darwin":
          fmt.Println("OS X")
      case "linux":
          fmt.Println("Linux")
      default:
          fmt.Println("%s.\n", os)
      }
      
      t := time.Now()
      switch {
      case t.Hour() < 12:
          fmt.Println("Good morning")
      case t.Hour() < 17:
          fmt.Println("Good afternoon")
      default:
          fmt.Println("Good evening")
      }
      
      defer fmt.Println("GO!")
      defer fmt.Println("world")
      fmt.Println("hello")
  }
  ````

* Go cannot have declared but not used variables

* The init and post statements are optional for the for loop. For is Go's "while"

* Variables declared by the short statement in the if expression are only in scope until the end of `if`

* A defer statement defers the execution of a function until the surrounding function returns

  * The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns
  * Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order



#### More types: structs, slices, and maps

  ````go
  package main
  
  import (
      "fmt"
      "strings"
      "math"
  )
  
  type Vertex struct {
      X int
      Y int
  }
  
  func compute(fn func(float64, float64) float64) float64 {
      return fn(3, 4)
  }
  
  func adder() func(int) int {
      sum := 0
      return func(x int) int {
          sum += x
          return sum
      }
  }
  
  func main() {
      i := 42
      
      p := &i			// point to i
      fmt.Println(*p)	// read i through the pointer
      *p = 21			// set i through the pointer
      fmt.Println(i)	// see the new value of i
      
      v1 := Vertex {1, 2}
      fmt.Println(Vertex{1, 2})
      fmt.Println(v1.X)        
      pv := &v1
      pv.X = 4
      fmt.Println(v1, pv)
      
      v2 := Vertex{X: 1}
      v3 := Vertex{}
      fmt.Println(v2, v3)
      
      var a [2] string
      a[0] = "Hello"
      a[1] = "World"
      fmt.Println(a)
      
      primes := [6] int {2, 3, 5, 7, 11, 13}
      var s []int = primes[1:4]
      fmt.Println(s)
      fmt.Println(len(s), cap(s))
      for i, va := range primes {
          fmt.Printf("id = %d, value = %d\n", i, va)
      }
      
      ss := [] struct {
          i int
          b bool
      }{
          {1, false},
          {2, true},
          {3, true},
          {4, false},
      }
      fmt.Println(ss[1:])
      
      var nilslice []int
      fmt.Println(nilslice, len(nilslice), cap(nilslice))
      if nilslice == nil {
          fmt.Println("nil!")
      }
      
      ca := make([]int, 5)
      cb := make([]int, 0, 5)
      fmt.Println(ca, len(ca), cap(ca))
      fmt.Println(cb, len(cb), cap(cb))
      
      board := [][]string{
  		[]string{"_", "_", "_"},
  		[]string{"_", "_", "_"},
  		[]string{"_", "_", "_"},
  	}
  	board[0][0] = "X"
  	board[2][2] = "O"
	board[1][2] = "X"
  	board[1][0] = "O"
  	board[0][2] = "X"
  	for i := 0; i < len(board); i++ {
  		fmt.Printf("%s\n", strings.Join(board[i], " "))
  	}
      
      var sa []int
      fmt.Println(sa, len(sa), cap(sa))
      sa = append(sa, 1, 2, 3, 4)
      fmt.Println(sa, len(sa), cap(sa))
      
      type Vertex struct {
          Lat, Long float64
      }
      var m map[string]Vertex
      m = make(map[string]Vertex)
      m["Bell Labs"] = Vertex {40.68433, -74.39967,}
      fmt.Println(m["Bell Labs"])
      var m2 = map[string]Vertex {
          "Bell Labs" : {40.68433, -74.39967},
          "Google" 	: {37.42202, -122.08408},
      }
      fmt.Println(m2)
      va1, ok1 := m2["Google"]
      fmt.Println("The value: ", va1, "Present?", ok1)
      delete(m2, "Google")
      fmt.Println(m2)
      va2, ok2 := m2["Google"]
      fmt.Println("The value: ", va2, "Present?", ok2)
      
      hypot := func(x, y float64) float64 {
          return math.Sqrt(x * x + y * y)
      }
      fmt.Println(hypot(5, 12))
      fmt.Println(compute(hypot))
      fmt.Println(compute(math.Pow))
      
      pos, neg := adder(), adder()
      for i := 0; i < 10; i++ {
          fmt.Println(pos(i), neg(-2 * i))
      }
  }
  ````
  
* Slices are like references to arrays. Changing the elements of a slice modifies the corresponding elements of its underlying array

* A slice has both a length and a capacity

  * The length of a slice is the number of elements it contains
  * The capacity of a slice is the number of elements in the underlying array, counting from the first element in the slice
  * The length and capacity of a slice `s` can be obtained using the expressions `len(s)` and `cap(s)`
  * When appending to a slice with enough capacity, the appended slice will be written on the original slice. When appending to a slice without enough capacity, a new slice will be created with enough capacity and the original slice will remain the same

* Functions are values too. They can be passed around just like other values

* Go functions may be closures. A closure is a function value that references variables from outside its body. The function may access and assign to the referenced variables; in this sense the function is "bound" to the variables
  * For example, the `adder` function returns a closure. Each closure is bound to its own `sum` variable



#### Methods and Interfaces

  ````go
  package main
  
  import (
  	"fmt"
      "math"
      "time"
      "io"
      "strings"
      "image"
  )
  
  type Vertex struct {
      X, Y float64
  }
  
  func (v Vertex) Abs() float64 {
      return math.Sqrt(v.X * v.X + v.Y * v.Y)
  }
  
  func (v *Vertex) Scale(f float64) {
      v.X = v.X * f
      v.Y = v.Y * f
  }
  
  type MyFloat float64
  
  func (f MyFloat) Abs() float64 {
      if f < 0 {
          return float64(-f)
      }
      return float64(f)
  }
  
  type Abser interface {
      Abs() float64
  }
  
  type I interface {
      M()
  }
  
  type T struct {
      S string
  }
  
  // This method means type T implements the interface I, 
  // but we don't need to explicitly declare that it does so
  func (t *T) M() {
      if t == nil {
          fmt.Println("<nil>")
          return
      }
      fmt.Println(t.S)
  }
  
  func (f MyFloat) M() {
      fmt.Println(f)
  }
  
  func describe(i I) {
      fmt.Printf("(%v, %T)\n", i, i)
  }
  
  func describe_any (i interface{}) {
      fmt.Printf("(%v, %T)\n", i, i)
  }
  
  func do(i interface{}) {
      switch v := i.(type) {
      case int: 
          fmt.Printf("Twice %v is %v\n", v, v*2)
      case string:
          fmt.Printf("%q is %v bytes long\n", v, len(v))
      default:
          fmt.Printf("I don't know about type %T\n", v)
      }
  }
  
  type Person struct{
      Name string
      Age int
  }
  
  func (p Person) String() string {
      return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
  }
  
  type MyError struct {
      When time.Time
      What string
  }
  
  func (e *MyError) Error() string {
      return fmt.Sprintf("at %v, %s", e.When, e.What)
  }
  
  func run() error {
      return &MyError {
          time.Now(), 
          "Something is wrong",
      }
  }
  
  func main() {
      v := Vertex{3, 4}
      fmt.Println(v.Abs())
      v.Scale(2)
      fmt.Println(v)
      
      f := MyFloat(-math.Sqrt2)
      fmt.Println(f.Abs())
      
      var a Abser
      a = f
      fmt.Println(a.Abs())
      a = &v
      fmt.Println(a.Abs())
      
      var i I
      i = &T{"hello"}
      describe(i)
      i.M()
      i = MyFloat(math.Pi)
      describe(i)
      i.M()
      
      var e interface{}
      describe_any(e)
      e = 42
      describe_any(e)
      e = "hello"
      describe_any(e)
      
      var g interface{} = "hello"
      s, ok := g.(string)
      fmt.Println(s, ok)
      d, ok := g.(float64)
      fmt.Println(d, ok)
      // f = g.(float64) gives panic
      
      do(42)
      do("hello")
      do(true)
      
      ad := Person{"Arthur Dent", 42}
      zb := Person{"Zaphod Beeblebrox", 9001}
      fmt.Println(ad, zb)
      
      if err := run(); err != nil {
          fmt.Println(err)
      }
      
      
      r := strings.NewReader("Hello, Reader!")
      
      b := make([]byte, 8)
      for {
          n, err := r.Read(b)
          fmt.Printf("n = %v, err = %v, b = %v\n", n, err, b)
          fmt.Printf("b[:n] = %q\n", b[:n])
          if err == io.EOF {
              break
          }
      }
      
      im := image.NewRGBA(image.Rect(0, 0, 100, 100))
      fmt.Println(im.Bounds())
      fmt.Println(im.At(0, 0).RGBA())
  }
  ````

* Go does not have classes. You can instead define methods on types

  * A method is a function with special receiver argument
  * The receiver appears in its own argument list between the `func` keyword and the method name
  * You can only declare a method with a receiver whose type is defined in the same package as the method (includes the built-in types such as `int`)

* You can declare methods with pointer receivers. Methods with pointer receivers can modify the value to which the receiver points
  * Another reason to use pointer receiver is to avoid copying the value on each method call which can be more efficient if the receiver is a large struct

* An interface type is defined as a set of method signatures. A value of interface type can hold any value that implements those method
  * A type implements an interface by implementing its methods. There is no explicit declaration of intent, no "implements" keyword
  * Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement

* Interface value
  * Under the hood, interface values can be thought of as a tuple of a value and a concrete type: `(value, type)`
  * An interface value holds a value of a specific underlying concrete type
  * Calling a method on an interface value executes the method of the same name on its underlying type
* If the concrete value inside the interface itself is nil, the method will be called with a nil receiver
  * A nil interface value holds neither value nor concrete type
  * Calling a method on a nil interface is a run-time error because there is no type inside the interface tuple to indicate which concrete method to call
* The interface type that specifies zero methods is known as the empty interface: `interface{}`
  * An empty interface may hold values of any type
  * Empty interfaces are used by code that handles values of unknown type. For example, `fmt.Print` takes any number of arguments of type `interface{}`

* A type assertion provides access to an interface value's underlying concrete value: `t := i.(T)`

  * This statement asserts that the interface value `i` holds the concrete type `T` and assigns the underlying `T` value to the variable `t`
  * If `i` does not hold a `T`, the statement will trigger a panic
  * To test whether an interface value holds a specific type, a type assertion can return two values: the underlying value and a boolean value that reports whether the assertion succeeded. This syntax is similar to map's

* One of the most ubiquitous interfaces is `Stringer` defined by the `fmt` package

  ````go
  type Stringer interface {
      String() string
  }
  ````

  * A `Stringer` is a type that can describe itself as a string

* Go programs express error state with `error` values

  ````go
  type error interface {
      Error() string
  }
  ````

  * Functions often return an `error` value, and calling code should handle errors by testing whether the error equals `nil`
    * A nil `error` denotes success; a non-nil `error` denotes failure
  * This third party package is often used together with error: [github.com/pkg/errors](https://github.com/pkg/errors)

* The `io` package specifies the `io.Reader` interface, which represents the read end of a stream of data

  ````go
  func (T) Read(b []byte) (n int, err error)
  ````

  * `Read` populates the given byte slice with data and returns the number of bytes populated and an error value. It returns an `io.EOF` error when the stream ends

* There is no check of whether a type implemented all of the methods of an interface

  * To force a check, we can do:

    ```go
    var _ Shape = (*Square)(nil)
    ```

    If not all methods are implemented, the compiler shall give the following error: 

    ```
    cannot use (*Square)(nil)(type *Square) as type Shape in assignment: 
    *Square does not implement Shape (missing Area method)
    ```

    



#### Concurrency

  ````go
  package main
  
  import (
  	"fmt"
      "time"
      "sync"
  )
  
  func say(s string) {
      for i := 0; i < 5; i++ {
          time.Sleep(100 * time.Millisecond)
          fmt.Println(s)
      }
  }
  
  type SafeCounter struct {
      mu sync.Mutex
      v  map[string]int
  }
  
  func (c *SafeCounter) Inc(key string) {
      c.mu.Lock()
      c.v[key]++
      c.mu.Unlock()
  }
  
  func (c *SafeCounter) Value(key string) int {
      c.mu.Lock()
      defer c.mu.Unlock()
      return c.v[key]
  }
  
  func main() {
      go say("world")
      say("hello")
      
      c := SafeCounter{v: make(map[string]int)}
      for i := 0; i < 1000; i++ {
          go c.Inc("some key")
      }
      time.Sleep(time.Second)
      fmt.Println(c.Value("somekey"))
  }
  ````

* A goroutine is a lightweight thread managed by the Go runtime. `go f(x)` starts a new goroutine running `f(x)`

* The evaluation of `f` and `x` happens in the current goroutine and the execution of `f` happens in the new goroutine

* Goroutines run  in the same address space, so access to shared memory must be synchronized

* If we want to make sure only one goroutine can access a variable at a time to avoid conflicts, we can use mutual exclusion, i.e. mutex

  * We can define a block of code be executed in mutual exclusion by surrounding it with a call to `Lock` and `Unlock` as shown above

  ````go
  package main
  
  import "fmt"
  
  func sum(s []int, c chan int) {
      sum := 0
      for _, v := range s {
          sum += v
      }
      c <- sum // send sum to c
  }
  
  func fibonacci(n int, c chan int) {
      x, y := 0, 1
      for i := 0; i < n; i++ {
          c <- x
          x,y = y, x+y
      }
      close(c)
  }
  
  func fib2 (c, quit chan int) {
      x, y := 0, 1
      for {
          select {
          case c <- x:
              x, y = y, x+y
          case <-quit:
              fmt.Println("quit")
              return 
          }
      }
  }
  
  func main() {
      s := []int {7, 2, 8, -9, 4, 0}
      
      c := make(chan int)
      go sum(s[:len(s)/2], c)
      go sum(s[len(s)/2:], c)
      x, y := <-c, <-c // receive from c
      
      fmt.Println(x, y, x+y)
      
      bc := make(chan int, 2)
      bc <- 1
      bc <- 2
      fmt.Println(<-bc)
      fmt.Println(<-bc)
      
      fc := make(chan int, 10)
      go fibonacci(cap(fc), fc)
      for i := range fc {
          fmt.Println(i)
      }
      
      fc2  := make(chan int)
      quit := make(chan int)
      go func() {
          for i := 0; i < 10; i++ {
              fmt.Println(<-c)
          }
          quit <- 0
      }()
      fib2(c, quit)
  }
  ````

* Channels are a typed conduit through which you can send and receive values with the channel operator, `<-`

  ````go
  ch <- v		// Send v to channel ch
  v := <-ch	// Receive from ch, and assign value to v
  ````

  * Channels must be created before use: `ch := make(chan int)` 

  * By default, sends and receives block until the other side side ready. This allows goroutines to synchronize without explicit locks or condition variables

  * Channels can be buffered. Provide the buffer length as the second argument to to `make` to initialize a buffered channel: `ch := make(chan int, size)`

    Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty

  * A sender can `close` a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression: `v, ok := <-ch`, `ok` is false if there are no more values to receive and the channel is closed
    * Sending on a closed channel will cause a panic

* The `select` statement lets a goroutine wait on multiple communication operations

  * A `select` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready
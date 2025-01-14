---
title: The Modern JavaScript Tutorial - Part 1 Core JavaScript Note
date: 2021-10-31
mathjax: true
tags: [JavaScript, Programming]
---

Booknote of [The Modern JavaScript Tutorial](https://javascript.info/). This is a comprehensive guide to JavaScript programming in a modern style. The part 1 cover the core element of modern JavaScript. 

<!-- more -->

## An introduction

### 1.1 An introduction to JavaScript

Today, JavaScript can execute on any device that has the JavaScript engine. The browser has an embedded engine sometimes called a "JavaScript virtual machine". Different engines have different "codenames". For example: `V8` in Chrome and Opera or `SpiderMonkey` in Firefox

JavaScript's capabilities greatly depend on the environment it's running in. For example JavaScript in the browser has following restrictions:

* JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs
* Different tabs/windows generally do not know about each other
* JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled



### 1.2 Manuals and specifications

The ECMA-252 specification contains the most in-depth, detailed and formalized information about JavaScript. It defines the language

MDN (Mozilla) JavaScript Reference is the main manual with examples and other information. It's great to get in-depth information about individual language functions, methods etc. One can find it at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference



### 1.3 Code editors

For IDEs, you can choose Visual Studio Code or WebStorm. For editors, any text editor should work



### 1.4 Developer console

In the browser, users don't see errors by default. To see errors and get a lot of other useful information about scripts, "developer tools" have been embedded in browsers



## JavaScript Fundamentals


### 2.1 Hello, world!

#### The "script" tag

JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag

```html
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

  <script>
    alert( 'Hello, world!' );
  </script>

  <p>...After the script.</p>

</body>

</html>
```



#### Modern markup

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

* The `type` attribute: `<script type=...>`

  HTML4 required a script to have a type. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute

* The `language` attribute: `<script language=...>`

  This attribute no longer makes sense because JavaScript is the default language

* Comments before and after scripts

  ```html
  <script type="text/javascript"><!--
  	...
  //--></script>
  ```

  These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag



#### External scripts

Script files are attached to HTML with the `src` attribute:

``` html
<script src="/path/to/script.js"></script>
```

As a rule, only the simplest script are put into HTML. More complex ones reside in separate files. The benefit of a separate file is that the browser will download it and store it in its cache. That reduces traffic and makes pages faster. If `src` is set, the script content is ignored. A single `<script>` tag can't have both the `src` attribute and code inside



### 2.2 Code structure

#### Semicolons

A semicolon may be omitted in most cases when a line break exists. In most cases, JavaScript interprets the line break as an "implicit" semicolon. This is called automatic semicolon insertion. But there are situations where JavaScript "fails" to assume a semicolon where it is really needed. Thus we recommend putting semicolons between statements even if they are separated by newlines



#### Comments

One line comments starts with `//`

Multiline comments start with `/*` and ends with `*/`



### 2.3 The modern mode, "use strict"

#### "use strict"

Until ECMAScript 5 in 2009, JavaScript had not modified any existed features. This is change in ES5. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`. When it is located at the top of a script, the whole script works the "modern" way

`"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. If it is not at the top of your scripts or functions, it is ignored



### 2.4 Variables

#### A variable

```javascript
let message = "Hello";
```

There is also keyword `var` which is almost the same as `let`. The difference is discussed later



#### Variable naming

* The name must contain only letters, digits, or the symbols `$` and `_`
* The first character must not be a digit
* Cannot be reserved names



#### Constants

```js
const birthday = "18.04.1982";
const COLOR_RED = "#F00";
```

There is a practice to use constants as aliases for difficult-to-remember values that are prior to execution. "Hard-coded" variables.



### 2.5 Data types

There are eight basic data types in JavaScript. We can put any type in a variable. For example, a variable can at one moment be a string and then store a number

```js
// no error
let message = "hello";
message = 1234;
```



#### Number

The number type represents both integer and floating point numbers. Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity`, and `NaN`. `NaN` represents a computational error. It is a result of an incorrect or undefined mathematical operation. `NaN` is sticky. Any further operation on `NaN` returns `NaN`



#### BitInt

In JavaScript, the "number" type cannot represent integer values larger than $(2^{53}-1)$, or less than $-(2^{53}-1)$ for negatives. Sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps

`BigInt` type was recently added to the language to represent integers of arbitrary length. A `BigInt` vaule is created by appending `n` to the end of an integer: 

```js
const bigInt = 12345678901234567890n;
```



#### String

A string in JavaScript must be surrounded by quotes

```js
let str = "Hello";
let str2 = 'single quotes works too';
let phrase = `can embed another ${str}`
```



Double and single quotes are "simple" quotes. There's practically no difference between them in JS. Backticks are "extended functionality" quotes. They allow use to embed variables and expressions into a string by wrapping them in `${...}`. For example:

``` js
let name = "John";
alert( `Hello, ${name}!` ); // Hello, John!
alert( `the result is ${1 + 2}` ); // the result is 3
```



There is no character type



#### Boolean 

The boolean type has only two values: `true` and `false`



#### The "null" value

The special `null` value does not belong to any of the types described above. In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages. It's just a special value which represents "nothing", "empty" or "value unknown"



#### The "undefined" value

The meaning of `undefined` is "value is not assigned"



#### Objects and symbols

The `symbol` type is used to create unique identifiers for objects



#### The typeof operator

The `typeof` operator returns the type of the argument. It supports two forms of syntax:

1. `typeof x`
2. `typeof(x)`



### 2.6 Interaction: alert, prompt, confirm

#### alert

It shows a message and waits for the user to press "OK"



#### prompt

The function `prompt` accepts two arguments

```js
result = prompt(title, [default]);
```



It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel

* `title`: the text to show the visitor
* `default`: an optional second parameter, the initial value for the input field. Always supply a `default` in IE



#### confirm

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a question and two buttons: OK and Cancel. The result is `true` is OK is pressed and `false` otherwise


### 2.7 Type conversions

#### String conversion
For example, `alert(value)` does it to show the value. We can also call the `String(value)` function to convert a value to a string


#### Numeric conversion
Numeric conversion happens in mathematical functions and expressions automatically. For example:
```js
alert("6" / "2"); // 3
```

Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered. If the string is not a valid number, the result of such a conversion is `NaN`. For instance:
```js
let age = Number("Please insert your age: ");
alert(age);
```

Numeric conversion rules:

| value              | becomes                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `undefined`        | `NaN`                                                                                                                                                                    |
| `null`             | 0                                                                                                                                                                        |
| `true` and `false` | 1 and 0                                                                                                                                                                  |
| `string`           | Whitespaces from the start and end are removed. If the remaining string is empty, the result is 0. Otherwise, the number is "read" from the string. An error gives `NaN` |


#### Boolean conversion
It happens in logical operations but can slo be performed explicitly with a call to `Boolean(value)`. The conversion rule: 
* Values that are intuitively "empty", like 0, an empty string, `null`, `undefined`, and `NaN`, become false
* Other values become `true`


### 2.8 Basic operators, maths

#### Terms: unary, binary, operand
* An operand is what operators are applied to
* An operator is unary if it has a single operand. For example, the unary negation `-42`
* An operator is binary if it has two operands. For example, the minus `4-2`

#### Math operations
* Addition `+`
* Subtraction `-`
* Multiplication `*`
* Division `/`
* Remainder `%`
* Exponentiation `**`



#### String concatenation with binary +

```js
let s = "my" + "string"; // mystring
```



Note that if any of the operands is a string, then the other one is converted to a string too



#### Numeric conversion, unary + 

The unary plus applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number

```js
let apples = "2";
let oranges = "3";

alert(+apples + +oranges); // 5
```



#### Assignment

The assignment `=` returns a value which is the assigned value



#### Modify-in-place

For example:

```js
let n = 2;
n += 5; // n = 7
```



#### Increment / decrement

* Increment `++` increases a variable by 1
* Decrement `--` decreases a variable by 1



The operators can be placed either before or after a variable

* When the operator goes after the variable, it is in "postfix form" 
* Otherwise it is in "prefix form"
* The prefix form returns the new value while the postfix form returns the old value



#### Comma

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned



### 2.9 Comparisons

JavaScript uses the so-called "dictionary" or "lexicographical" order to compare strings



#### Strict equality

A strict equality operator `===` checks the equality without type conversion



#### Comparison with null and undefined

* For a strict equality:

  ```js
  alert (null === undefined); // false
  ```

* For a non-strict check:

  ```js
  alert (null == undefined); // true
  ```



##### Using strict equality to avoid strange bugs



### 2.10 Conditional branching

```js
let year = 2015;

if (year == 2015) alert ("It is 2015");

if (year == 2015) {
    alert ("It is 2015");
    alert ("Yes, I'm sure");
} else {
    alert ("It is not 2015");
}
```



A shorter way to write short conditionals is to write it with question mark operator:

```js
let result = condition ? value1 : value2;
```



### 2.11 Logical operators

There are four logical operators in JavaScript: 

* `||`: or

  * OR finds the first truthy value
  * Short-circuit evaluation

* `&&`: and

  * AND finds the first falsy value
  * Precedence of AND is higher than OR

* `!`: not

* `??`: nullish coalescing

  * We will say that an expression is "defined" when it's neither `null` nor `undefined`

  * The result of `a ?? b` is:

    * If `a` is defined, then `a`
    * If `a` is not defined, then `b`

    ```js
    let area = (height ?? 100) * (width ?? 50);
    ```

  * Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses

    ```js
    let x = (1 && 2) ?? 3; // 2
    ```

    

### 2.12 Loops

#### The "while" loop

```js
while (condition) {
    // code
}
```



#### The "do ... while" loop

The loop will first execute the body, then check the condition

```js
do {
    // loop body
} while (condition)
```



#### The "for" loop
```js
for (begin; condition; step) {
  // ... loop body ...
}
```



#### Labels for break/continue

```js
outer: 
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i}, ${j})`, '');

    if (!input) break outer;
  }
}
alert('Done!');
```



### 2.13 The "switch" statement

```js
switch(x) {
  case 'value1': 
    ...
    [break;]
  case 'value2':
    ...
    [break;]
  default:
    ...
    [break;]
}

```



### 2.14 Functions

```js
function name(parameter1, parameter2, ... parameterN = defaultValue) {
  ...body...
  [return [value];]
}
```

A function with an empty `return` or without it returns `undefined`



#### Alternative default parameters

```js
function showMessage(text1, text2) {
  if (text1 === undefined) {
    text1 = 'empty message';
  }

  alert(text1);

  text2 = text2 || 'empty message';

  alert(text2);
}
```



### 2.15 Function expressions

In JavaScript, a function is not a "magical language structure", but a special kind of value. The syntax that we used before is called a function declaration. There is another syntax for creating a function that is called a function expression. For example:
```js
let sayHi = function () {
  alert("Hello");
};
```

Why is there a semicolon at the end? 
* There is no need for `;` at the end of code blocks and syntax structures that use them like `if {...}`, `for {...}`, `function f {...}` etc.
* A function expression is used inside the statement: `let sayHi = ...;`, as a value. It is not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is

Here, the function is created and assigned to the variable explicitly, like any other value. The meaning of this code sample means: "create a function and put it into the variable `sayHi`". You can even print out that value using `alert` which shows the function code: 
```js 
alert( sayHi );
```

The last line does not run the function, because there are no parentheses after `sayHi`. In JavaScript, a function is a value, wo we can deal with it as a value. 

For example: 
```js
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask (
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```

A function is a value representing an "action". A function declaration can be called earlier than it is defined. A function expression is created when the execution reaches it and is usable only from that moment. In strict mode, when a function declaration is within a code block, it's visible everywhere inside that block. But not outside of it



### 2.16 Arrow function, the basics

There is another simple and concise syntax for creating functions: the arrow functions
```js
let func = (arg1, arg2, ..., argN) => expression
```

For example: 
```js
let sayHi = () => alert("Hello!");

sayHi();

let age = prompt("what is your age?", 18);

let welcome = (age < 18) ? 
  () => alert ("Hello!") :
  () => alert ("Greetings!");

welcome();

let sum = (a, b) => {
  let result = a + b;
  return result;
};

alert ( sum (1, 2) ); // 3
```

* Without curly braces, the right side is an expression: the function evaluates it and returns the result
* With curly braces, the right side contains multiple statement inside the function, the we need an explicit `return` to return something



## Code quality

### 3.1 Debugging in the browser

#### Debugger command

We can pause the code by using the `debugger` command in the code like:
```typescript
function hello(name) {
  let phrase = `Hello, ${name}!`;

  debugger;

  say(phrase);
}
```



#### Tracing the execution

* Resume: continue the execution, hotkey `F8`
* Step: run the next command, hotkey `F9`
* Step over: run the next command, but don't go into a function, hokey `F10`
* Step into：step into an asynchronous function calls, hotkey `F11`
* Step out: continue the execution till the end of the current function, hotkey `Shift+F11`



### 3.2 Coding style

#### Suggested syntax rules
* A space between parameters in function
* No space between the function name and parentheses and between the parentheses and parameter
* Curly brace `{` on the same line, after a space
* Indentation: 2 or 4 space
* Space around operators
* A space after `for`,`if`,`while`...
* A semicolon is mandatory
* A space betweem arguments
* An empty line between logical blocks
* Lines should not be very long
* `} else {` without a line break
* Spaces around a nested call

There are lots of style guide from different companies and organizations



### 3.3 Comments

#### Comments this
* Overall architecture, high-level view
* Function usage
* Important solutions, especially when not immediately obvious


#### Avoid comments:
* That tell "how code" works and "what it does"
* Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them



### 3.4 Ninja code

#### *DO NOT*:

* Make the code as short as possible
* Use one-letter variables
* Use abbreviations
* Be too abstract
* Use similar variable names
* Use many different synonyms for similar task
* Reuse names
* Use lots of underscores
* Use meaningless adjectives in variable names
* Overlap outer variables
* Have side-effects everywhere
* Provide too much functionalities to a single function



### 3.5 Automated testing with Mocha

When testing a code by manual re-runs, it's easy to miss something. Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected



#### Behavior Driven Development (BDD)

BDD is three things in one: tests AND documentation AND examples. For example, to write a function `pow`.



#### Development of "pow": the spec

Before creating the code of `pow`, we can imagine what the function should do and describe it. Such description is called a specification or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:

```js
describe("pow", function() {
    it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    });
});
```



A spec has three main building blocks that you can see:

* `describe("title", function() { ... })`: What functionality we're describing. Used to group "workers" - the `it` blocks
* `it("use case description", function() { ... })`_ In the title of `it` we in a human-readable way describe the particular use case, and the second argument is a function that tests it
* `assert.equal(value1, value2)`: The code inside `it` block, if the implementation is correct, should execute without errors



#### The development flow

1. An initial spec is written, with tests for the most basic functionality
2. An initial implementation is created
3. To check whether it works, we run the testing framework Mocha that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works
4. Now we have a working initial implementation with tests
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail
6. Go to 3, update the implementation till tests give no errors
7. Repeat steps 3 - 6 till the functionality is ready



#### The spec in action

In this tutorial we will be using the following JS libraries for test:

* `Mocha`: the core framework. It provides common testing functions including `describe` and `it` and the main function that runs tests
* `Chai`: the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`
* `Sinon`: a library to spy over functions, emulate built-in functions are more, we'll need it much later

These libraries are suitable for both in-browser and server-side testing. Here we will consider the browser variant

The full HTML page with these frameworks and `pow` spec:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- add mocha css, to show results -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
  <!-- add mocha framework code -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
  <script>
    mocha.setup('bdd'); // minimal setup
  </script>
  <!-- add chai -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
  <script>
    // chai has a lot of stuff, let's make assert global
    let assert = chai.assert;
  </script>
</head>

<body>

  <script>
    function pow(x, n) {
      /* function code is to be written, empty now */
    }
  </script>

  <!-- the script with tests (describe, it...) -->
  <script src="test.js"></script>

  <!-- the element with id="mocha" will contain test results -->
  <div id="mocha"></div>

  <!-- run tests! -->
  <script>
    mocha.run();
  </script>
</body>

</html>
```

The page can be divided into 5 parts:

1. The `<head>` - add third--party libraries and styles for tests
2. The `<script>` with the function to test, in out case - with the code for `pow`
3. The tests - in our case an external script `test.js` that has `describe("pow", ...)` from above
4. The HTML element `<div id="mocha">` will be used by Mocha to output results
5. The tests are started by the command `mocha.run()`



#### Preprocess and postprocessing

We can setup `before/after` functions that execute before/after running tests, and also `beforeEach/afterEach` functions that execute before/after every `it`. For instance:

```js
describe("test", function() {
    before(() => alert("Testing started - before all tests"));
    after(() => alert("Testing finished - after all tests"));
    
    beforeEach(() => alert("Before a test - enter a test"));
    afterEach(() => alert("After a test - exit a test"));
    
    it("test 1", () => alert(1));
    it("test 2", () => alert(2));
});
```



#### Other assertions

* `assert.equal(value1, value2)`: checks the equality `value1 == value2`
* `assert.strictEqual(value1, value2)`: checks the strict equality `value1 === value2`
* `assert.notEqual`, `assert.notStrictEqual`: inverse checks to the ones above
* `assert.isTrue(value)`: checks that `value === true`
* `assert.isFalse(value)`: checks that `value === false`
* `assert.isNaN`: checks if it is `NaN`



### 3.6 Polyfills and transpilers

How to make our modern code work on older engines that don't understand recent features yet? There are two tools for that: 

1. Transpilers 
2. Polyfills



#### Transpilers

A transpiler is a special piece of software that translates source code to another source code. It can parse modern code and rewrite it using older syntax constructs, so that it will also work in outdated engines. Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server



`Babel` is one of the most prominent transpiler out there. Modern project build systems, such as `webpack`, provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process



#### Polyfills

New language features may include not only syntax constructs and operators , but also built-in functions. A script that updates / adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations



JS is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. Two interesting libraries of polyfills are:

* `core js` that supports a lot, allows to include only needed features
* `polyfill.io` service that provides a script with polyfills, depending on the features and user's browser



## Objects: the basics

### 4.1 Objects

An object can be created with figure brackets `{...}` with an optional list of properties. A property is a "key: value" pair, where `key` is a string (also called a "property name"), and `value` can be anything



An empty object can be created using one of two syntaxes: 

```js
let user = new Object();
let user = {}; 	// This is called an object literal
```



#### Literals and properties

For example: 

```js
let user = {
    name: "John",
    age: 30,
    "likes birds": false,	// multiword property name must be quoted
};

alert( user.name );			// John
alert( user.age  );			// 30

user.isAdmin = true;
alert( user.isAdmin );		// true

delete user.age;
alert( user.age );			// Undefined

user["likes birds"]= true	// For multiword properties, the dot access doesn't work
alert (user["likes birds"])	// true

let key = "name";
alert( user[key] );			// John
alert( user.key  );			// undefined

let fruit = "apple";
let bag = {
    [fruit]: 5,
};
alert( bag.apple );			// 5 
bag[fruit + "Computer"] = 6;
alert( bag.appleComputer );	// 6
```

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed)



#### Property value shorthand

For instance: 

```js
function makeUser(name, age) {
    return {
        name,	// same as name: name
        age,	// same as age: age
    };
}

let user = makeUser("John", 30);
alert( user.name ); 	// John
```



#### Property names limitations

A variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc. But for an object property, there is no such restriction. They can be any strings or symbols. Other types are automatically converted to strings

```js
let obj = {
    0: "test"		// same as "0": "test"
};

alert( obj["0"] );	// test
alert( obj[0]   );	// test
```



#### Property existence test, "in" operator

For instance:

```js
let user { name: "John", age: 30, unde: undefined };

alert( "age" in user ); 	// true
alert( "blabla" in user );	// false
alert( "unde" in user );		// true

let key = "age"
alert( key in user );		// true
```



#### The "for...in" loop

``` js
let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    alert( key );
    alert( user[key] );
}
```



#### Ordered like an object

The properties is ordered in a special fashion: integer properties are sorted, others appear in creation order



If we want integer properties with creation order, we can "cheat" by making the codes non-integer. For instance:

```js
let codes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ...
     "+1": "USA"
};

for (let code in codes) {
    alert ( +code );	// 49, 41, 44, 1
}
```



### 4.2 Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc. - are always copied "as a whole value"



#### Comparison by reference

Two objects are equal only if they are the same object. For instance:

```js
let a = {};
let b = a;
alert( a == b );	// true
alert( a === b );	// true

let c = {};
let d = {};
alert( c == d );	// false
```



#### Cloning and merging, `Object.assign`

We can copy an object in the following way:

```js
let user = { name: "John", age: 30 };

let clone = {};

for (let key in user) {
    clone[key] = user[key];
}
```



Also we can use the method `Object.assign` for that. The syntax is: 

```js
Object.assign(dest, [src1, src2, src3 ...])
```

* The first argument `dest` is a target object
* Further arguments `src1, ..., srcN` are source objects
* It copies the properties of all source objects into the target
* If the copied property name already exists, it gets overwritten
* The call returns `dest`

For instance:

```js
let user = { name: "John" };

let permission1 = { canView: true };
let permission2 = { canEdit: true };

Object.assign(user, permission1, permission2);
// now user = { name: "John", canView: true, canEdit: true }
```



We also can use `Object.assign` for simple cloning:

```js
let clone = Object.assign({}, user);
```



#### Nested cloning

What if properties are references to other objects? Then it is not enough to just copy all properties. We then need to perform a "deep cloning". We can use recursion to implement it. Or take an existing implementation, for instance `_.cloneDeep(obj)` from the JS library `lodash`



#### Const objects can be modified

The value of the entire object is constant, it must always reference the same object, but properties of that object are free to change



### 4.3 Garbage collection

#### Reachability

The main concept of memory management in JS is reachability. Simply put, "reachable" values are those that are accessible or usable somehow. They are guaranteed to be stored in memory

1. There's a base set of inherently reachable values, that cannot be deleted for obvious reasons. These values are called roots. For instance:
   * The currently executing function, its local variables and parameters
   * Other functions on the current chain of nested calls, their local variables and parameters
   * Global variables
   * (There are some other, internal ones as well)
2. Any other value is considered reachable if it's reachable from a root by a reference or by a chain of references

There is a background process in the JS engine that is called garbage collector. It monitors all objects and removes those that have become unreachable



#### Internal algorithms

The basic garbage collection algorithm is called "mark-and-sweep". The following "garbage collection" steps are regularly performed:

* The garbage collector takes roots and "marks" (remembers) them
* Then it visits and "marks" all references from them
* Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future
* And so on until every reachable (from the roots) references are visited
* All objects except marked ones are removed

That's the concept of how garbage collection works. JS engines apply many optimizations to make it run faster and not affect the execution. Some of the optimizations: 

* Generational collection: objects are split into two sets: "new ones" and "old ones". Many objects appear, do their job and die fast, they can be cleaned up aggressively. Those that survive for long enough, become "old" and are examined less often
* Incremental collection: If there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine tries to split the garbage collection into pieces. Then the pieces are executed one by one, separately. That requires some extra bookkeeping between them to track changes, but we have many tiny delays instead of a big one
* Idle-time collection: the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution
* There exist other optimizations



### 4.4 Object methods, "this"

#### Method examples

A function that is property of an object is called its method

```js
let user = {
    name: "John",
    age: 30
};

user.sayHi = function() {
    alert("Hello!");
};

user.sayHi();	// Hello!
```



#### Method shorthand

These two notations are not fully identical. There are subtle differences related to object inheritance. In almost all cases the shorter syntax is preferred

```js
user = {
    sayHello: function() {
        alert("Hello");
    }
    
    sayHi() {
        alert("Hi");
    }
};
```



#### "this" in methods

```js
let user = {
    name: "John",
    age: 30,
    
    sayHi() {
        // "this" is the "current object"
        alert(this.name);
    }
};

user.sayHi();	// John
```



We can do the following, but the code is unreliable:

```js
let user = {
    user: "John",
    age: 30,
    
    sayHi() {
        alert(user.name);	// "user" instread of "this"
    }
};

user.sayHi();	// "John"

let admin = user;
user = null;

admin.sayHi();	// TypeError: Cannot read property 'name' of null
```



#### "this" is not bound

In JS, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object. The value of `this` is evaluated during the run-time, depending on the context. The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. For instance: 

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
    alert( this.name );
}

user.f = sayHi;
admin.f = sayHi;

user.f();	// John
admin.f();	// Admin
```



In strict mode, if we call `this` without an object, `this` is `undefined`. In non-strict mode, the value of `this` will be the global object(`window` in a browser). This is a historical behavior



#### Arrow functions have no "this"

Arrow functions don't have their "own" `this`. If we reference `this` from such a function, it's taken from the outer "normal" function. For instance: 

```js
let user = {
    firstName: "Ilya",
    sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
    }
};

user.sayHi();	// Ilya
```



### 4.5 Constructor, operator "new"

#### Constructor function

Constructor functions technically are regular functions. There are two conventions though:

1. They are named with capital letter first
2. They should be executed only with `"new"` operator

For instance: 

```js
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name);		// Jack
alert(user.isAdmin);	// false
```

When a function is executed with `new`, it does the following steps:

1. A new empty object is created and assigned to `this` 
2. The function body executes. Usually it modifies `this`, adds new properties to it
3. The value of `this` is returned

In other words, `new User(...)` does something like:

```js
function User(name) {
    // this = {};	(implicitly)
    
    this.name = name;
    this.isAdmin = false;
	
    // return this;	(implicitly)
}
```

We can omit parentheses after `new`, if it has no arguments. But it is not considered a "good style"



#### Constructor mode test: `new.target`

Inside a function, we can check whether it was called with `new` or without it, using a special `new.target` property. It is undefined for regular calls and equals the function if called with `new`:

```js
function User() {
    alert(new.target);
}

// without "new":
User();		// undefined

// with "new":
new User();	// function User {...}
```



#### Return from constructors

If there is a `return` statement, then the rule is simple:

* If `return` is called with an object, then the object is returned instead of `this`
* If `return` is called with a primitive, it is ignored



### 4.6 Optional chaining '?.'

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property



#### The "non-existing property" problem

In many practical cases, we'd prefer to get `undefined` instead of an error when we attempt to get an element of an `undefined` object. That's why the optional chaining `?.` was added to the language. 



#### Optional chaining

The optional chaining `?.` stops the evaluation (short-circuiting) if the value before `?.` is `undefined` or `null` and returns `undefined`. For example: 

```js
let user = {};

alert( user?.address?.street );		// undefined
```

The `?.` syntax makes optional the value before it, but not any further. We should use `?.` only where it's ok that something doesn't exist. If there is no variable `user` at all, then `user?.anything` triggers an error



#### Other variants: `?.()`, `?.[]`

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets. For example, `?.()` is used to call a function that may not exist. 

The `?.()` checks the left part, if it exists, then it runs. Otherwise the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous case, it allows to safely read a property from an object that may not exist. 

Also we can use `?.` with `delete`:

```js
delete user?.name;		// delete user.name if user exists
```



### 4.7 Symbol type

By specification, object property keys may be either of string type, or of symbol type. Not numbers, not booleans. 



#### Symbols

A "symbol" represents a unique identifier. A value of this type can be created using `Symbol()`:

```js
let id = Symbol();
```

Upon creation we can give symbol a description (also called a symbol name), mostly useful for debugging purposes:

```js
let id = Symbol("id");
```

Symbols are guaranteed to be unique. Even if we create many symbols with the same description, they are different values. The description is just a label that doesn't affect anything. 

To print symbols:

``` js
let id = Symbol("id");
alert(id.toString());	// Symbol(id)
alert(id.description);	// id
```



#### "Hidden" properties

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite. Symbolic properties do not participate in `for..in` loop but the direct access works. 

``` js
let user = {
    name: "John"
};

user[id] = 1;

alert( user[id] );	// 1
```

`Object.keys(user)` also ignores them. That's a part of the general "hiding symbolic properties" principle. 

If `user` objects belong to another code, and that code also works with them, we shouldn't just add any fields to it. That is unsafe. 



#### Symbols in an object literal

```js
let id = Symbol("id");

let user = {
    name: "John",
    [id]: 123	
};
```



#### Global symbols

There is a global symbol registry. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol. In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`. That call checks the global registry, and if there's a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`. For instance: 

```js
let id = Symbol.for("id");

let idAgain = Symbol.for("id");

alert(id === idAgain);	// true
```



##### `Symbol.keyFor`

For global symbols, not only `Symbol.for(key)` returns a symbol by name, but there's a reverse call: `Symbol.keyFor(sym)`, that does the reverse: returns a name by a global symbol. 

```js
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

alert( Symbol.keyFor(sym) );	// name
alert( Symbol.keyFor(sym2) );	// id
```

The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. It returns `undefined` for non-global symbols. 



#### System symbols

There exist many "system" symbols that JS uses internally, and we can use them to fine-tune various aspects of our objects. For instance: 

* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.iterator`
* `Symbol.toPrimitive`
* ...



### 4.8 Object to primitive conversion 

JS doesn't exactly allow to customize how operators work on objects. We can't implement a special object method to handle, for example, an addition. In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value. 



#### Conversion rules

1. All object are `true` in a boolean context. There are only numeric and string conversions
2. The numeric conversion happens when we subtract objects or apply matematical functions
3. As for the string conversion - it usually happens when we output an object like `alert(obj)` and in similar contexts

We can fine-tune string and numeric conversion, using special object methods. There are three variants of type conversion, that happen in various situations. They are called "hints", as described in the specification: 

* `"string"`: For an object-to-string conversion, when we're doing an operation on an object that  expects a string
* `"number"`: For an object-to-number conversion, like when we're doing maths
* `"default"`: Occurs in rare cases when the operator is "not sure" what type to expect. For instance, binary plus `+` can work both with strings and numbers, so both strings and numbers would do. So if a binary plus gets an object as an argument, it uses the `"default"` to convert it. The greater and less comparison operators can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons

In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case, `Date`, implement `"default"` conversion the same way `"number"`. And we can do the same

To do the conversion, JS tries to find and call three object methods: 

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists
2. Otherwise if hint is `"string"`: try `obj.toString()` and `obj.valueOf()`, whatever exists
3. Otherwise if hint is `"number"` or `"default"`: try `obj.valueOf()` and `obj.toString()`, whatever exists



#### `Symbol.toPrimitive`

There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this: 

````js
let user = {
    name: "John",
    money: 1000,
    
    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money; 
    }
};

// conersions demo:
alert(user); 		// hint: string -> {name: "John"}
alert(+user);		// hint: number -> 1000
alert(user + 500);	// hint: default -> 1500
````

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed



#### `toString` / `valueOf`

If there's no `Symbol.toPrimitive` then JS tries to find methods `toString`  to `valueOf`

* For the "string" hint: `toString`
* For other hints: `valueOf`

These two methods come from ancient times. They are not symbols, but rather "regular" string-named method. They provide an alternative "old-style" way to implement the conversion

By default, a plain object has following methods:

* The `toString` method returns a string `"[object Object]"`
* The `valueOf` method returns the object itself



#### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive. There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns number for a hint `"number"` 



#### Further conversions

Many operators and functions perform type conversions, e.g. multiplication `*`converts operands to numbers. If we pass an object as an argument, then there are two stages: 

1. The object is converted to a primitive (using the rules described above)
2. If the resulting primitive isn't of the right type, it's converted

For instance:

```js
let obj = {
    toString() {
        return "2";
    }
};

alert(obj * 2); 	// 4, object converted to primitive "2", then multiplication made it 2 
```



## Data types

### 5.1 Methods of primitives

JS allows us to work with primitives (strings, numbers, etc) as if they were objects. They also provide methods to call as such. 

Let's look at the key distinctions between primitives and objects:

A primitive

* Is a value of a primitive value
* There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`

An object

* Is capable of storing multiple values as properties
* Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JS: functions, for example, are objects



#### A primitive as an object

Primitives are still primitive. A single value, as desired to make them as fast and lightweight as possible. The language allow access to methods and properties of strings, numbers, booleans and symbols. In order for that to work, a special "object wrapper" that provides the extra functionality is created, and then is destroyed. The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean` and `Symbol`. For instance, there exists a string method `str.toUpperCase()` that returns a capitalized `str`:

```js
let str = "hello";

alert( str.toUpperCase() );	// HELLO
```



Constructors `String/Number/Boolean` are for internal use only, It is possible, but highly unrecommended. `null`/`undefined` have no methods. 



### 5.2 Numbers

In modern JS, there are two types of numbers: 

1. Regular numbers in JS are stored in 64-bit format IEEE-754, also known as "double precision floating point numbers". These are numbers that we're using most of the time
2. BitInt numbers, to represent integers of arbitrary length



#### More ways to write a number

````js
let billion = 1000000000;
let other_billion = 1_000_000_000;
let another_billion = 1e9;
````



#### Hex, binary and octal numbers

Hexadecimal numbers are widely used in JS to represent colors, encode chararcters, and for many other things. It is supported by the `0x` number. For instance: 

```js
alert( 0xff );	// 255
```

Binary and octal numeral systems are rarely used, but also supported using the `0b` and `0o` prefixes. 

```js
let a = 0b11111111; 	// binary form of 255
let b = 0o377;			// octal form of 255
alert ( a == b );		// true
```



#### `toString(base)`

For instance:

```js
let num = 255;
alert (num.toString(16));		// ff
alert (num.toString(2));		// 11111111
alert (123456..toString(36));	// 2n9c
```

Here the two dots mean calling a method. 



#### Rounding

There are several built-in functions for rounding:

* `Math.floor`: rounds down
* `Math.ceil`: rounds up
* `Math.round`: rounds to the nearest integer
* `Math.trunc` (not supported by internet explorer): removes anything after the decimal point without rounding



#### Imprecise calculations

A number is represented in 64-bit format IEEE-754 internally so imprecision related to float number occurs. To fix this, you can use the method `toFixed`:

```js
let sum = 0.1 + 0.2;
alert (sum.toFixed(2));	// 0.30
```



#### Tests: `isFinite` and `isNaN`

* `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything

* `NaN` represents an error

  * `isNaN(value)` converts its argument to a number and then tests it for being `NaN`

    ````js
    isNaN(NaN); 			// true
    isNan("str");			// true
    NaN === NaN;			// false
    Object.is(NaN, NaN);	// true
    Object.is(0, -0);		// false
    isFinite("15");			// true
    isFinite("str");		// false
    isFinite(Infinity);		// false
    ````
    
    



#### `parseInt` and `parseFloat`

They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system.

```js
parseInt("100px"); 		// 100
parseFloat("12.5em");	// 12.5
parseInt("12.3");		// 12
parseInt("0xff", 16);	// 255
parseInt("ff", 16);		// 255
parseInt("2n9c", 36);	// 123456
```



#### Other math functions

* `Math.random()`: returns a random number from 0 to 1 (not including 1)
* `Math.max(a, b, c...)` / `Math.min(a, b, c...)`: returns the greatest / smallest from the arbitrary number of arguments
* `Math.pow(n, power)`: Returns `n` raised to the given power



### 5.3 Strings

In JS, the textual data is stored as strings. There is no separate type for a single character. The internal format for strings is always UTF-16, it is not tied to the page encoding. 



#### Quotes

String can be enclosed within either single quotes, double quotes or backticks. Single and double quotes are essentially the same. Backticks allow use to embed any expression into the string, by wrapping it in `${...}`

```js
function sum (a, b) {
    return a + b;
}

alert (`1 + 2 = ${sum(1,2)}.`);		// 1 + 2 = 3
```

Another advantage of using backticks is that they allow a string to span multiple lines



#### Special characters

| Character                             | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| `\n`                                  | New line                                                     |
| `\r`                                  | Carriage return                                              |
| `\'`, `\"`                            | Quotes                                                       |
| `\\`                                  | Backslash                                                    |
| `\t`                                  | Tab                                                          |
| `\b`, `\f`, `\v`                      | Backspace, Form feed, Vertical tab - not used nowadays       |
| `\xXX`                                | Unicode character with the given hexadecimal Unicode `XX`    |
| `\uXXXX`                              | A Unicode symbol with the hex code `XXXX` in UTF-16 encoding |
| `\u{X...XXXXXX}` (1-6 hex characters) | A Unicode symbol with the given UTF-32 encoding              |



#### Accessing characters

To get a character at position `pos`, use square bracket `[pos]` or call the method `str.charAt(pos)`. The first character starts from the zero position. The difference between them is that if no character is found, `[]` returns `undefined`, and `charAt` returns an empty string.

We can also iterate over characters using `for ... of`



#### Strings are immutable

It is impossible to change a character. The usual workaround is to create a whole new string and assign it to `str` instead of the old one. 



#### Searching for substring

There are multiple ways to look for a substring within a string



##### `str.indexOf(substr, pos)`

It looks for the `substr` in `str`, starting from the given position `pos`, and returns the position where the match was found or `-1` if nothing can be found.

```js
let str = "Widget with id";

str.indexOf("Widget");	// 0
str.indexOf("widget");	// -1
str.indexOf("id");		// 1
str.indexOf("id", 2);	// 12
```

There is a similar method `str.lastIndexOf(substr, position)` that searches from the end of a string to its beginning. It would list the occurrences in the reverse order. 



##### The bitwise NOT trick

The bitwise NOT `~` operator converts the number to a 32-bit integer (removes the decimal part if exist) and then reverses all bits in its binary representation. In practice, that means for 32-bit integers `~n`, becomes `-(n+1)`. Thus we can use this to test is a substring is found: 

````js
let str = "Widget";

if (~str.indexOf("Widget")) {
    alert ("Found it"); 
}
````

This only works when the length of the string is not 4294967295



##### includes, startsWith, endsWith

The more modern method `str.includes(substr, pos)` return `true / false` depending on whether `str` contains `substr` within. The methods `str.startsWith` and `str.endsWith` do exactly what they say



#### Getting a substring

There are 3 methods in JS to get a substring: `substring`, `substr` and `slice`



* `str.slice(start [, end])`
  * Returns the part of the string from `start`to (but not including) `end`
  * If there is no second argument, then `slice` goes till the end of the string. 
  * Negative values for `start/end` are also possible. They mean the position is counted from the string end
* `str.substring(start [, end])`
  * Returns the part of the string between `start` and `end`
  * This is almost the same as `slice`, but it allows `start` to be greater than `end`
  * Negative arguments are not supported. They are treated as 0
* `str.substr(start [, length])`
  * Returns the part of the string from `start`, with the given `length`
  * The first argument may be negative, to count from the end



#### Comparing strings

Strings are compared character-by-character in alphabetical order. There are some oddities:

1. A lowercase letter is always greater than the uppercase
2. Letters with diacritical marks are "out of order"

All strings are encoded using UTF-16. That is, each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back:

* `str.codePointAt(pos)`
* `String.fromCodePoint(code)`

```js
"z".codePointAt(0);			// 122
String.fromCodePoint(122);	// z
```

The browser needs to know the language to compare strings. All modern browsers (IE10 - requires the additional library `Intl.js`) support the internationalization standard ECMA-402. It provides a special method to compare strings in different languages, following their rules. The call `str.localeCompare(str2)` returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules



#### Internals, Unicode

All frequently used characters have 2-byte codes. Letters in most European languages, numbers, and even most hieroglyphs, have a 2-byte representation. But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair". The surrogate pairs did not exist at the time when JS was created, and thus are not correctly processed by the language. We can have a single symbol in a string while the `length` of the string being 2. `String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language



#### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above / under it. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations. To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it. 

Since there are many ways to composite a character. There can be situations where two characters may visually look the same, but be represented with different Unicode compositions. To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form:

```js
let s1 = "S\u0307\u0323";	// Ṩ, S + dot above + dot below
let s2 = "S\u0323\u0307";	// Ṩ, S + dot below + dot above

s1 == s2;							// false
s1.normalize() == s2.normalize();	//true
```



### 5.4 Arrays

Array is a data structure to store ordered collections



#### Declaration

```js
let arr = new Array();
let arr2 = [];
let fruits = ["Apple", "Orange", "Plum"];
```

Array elements are numbered, starting with zero. We can replace an element or add a new one to the array:

```js
fruits[2] = "Pear";		// now ["Apple", "Orange", "Pear"]
fruits[3] = "Lemon";	// now ["Apple", "Orange", "Pear", "Lemon"]
```

An array can store elements of any type: 

```js
let arr = ["Apple", { name: "John" }, true, function() { alert("Hello"); } ];
alert( arr[1].name );
arr[3]();
```

An array, just like an object, may end with a comma: 

```js
let fruits = ["Apple", "Orange", "Plum", ];
```



#### Methods pop / push, shift / unshift

A queue is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations. 

* `push` appends an element to the end 
* `shift` get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st

There is another use case for arrays - the data structure named stack. It supports two operations:

* `push` adds an element to the end
* `pop` takes an element from the end

Arrays in JS can work both as a queue and as a stack. They allow you to add / remove elements both to / from the beginning or the end. In computer science the data structure that allows this, is called deque. 



#### Internals

An arrays is a special kind of object. The square brackets used to access a property `arr[0]` actually come from the object syntax. They extend objects providing special methods to work with ordered collections of data and also the `length` property. But at the core it's still an object. For instance, it is copied by reference. 

What makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another. There are other optimizations as well, to make arrays work really fast. But they all break if we quit working with an array as with an "ordered collection" and start working with it as if it were a regular object. The ways to misuse an array:

* Add a non-numeric property like `arr.test = 5`
* Make holes, like: add `arr[0]` and then `arr[1000]`
* Fill the array in the reverse order, like `arr[1000]`, `arr[999]` and so on



#### Performance

Methods `push / pop` run fast, while `shift / unshift` are slow. The more elements in the array, the more time to move them, more in-memory operations. The `pop` method does not need to move anything, because other elements keep their indexes. That's why it's blazingly fast



#### Loops

```js
let arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
    alert (arr[i])
}

for (let fruit of fruits) {
    alert (fruit);
}
```

It is possible to use `for ... in` to loop through array. But that is a bad idea. There are potential problems with it:

1. The loop `for...in` iterates over all properties, not only the numeric ones.
2. The `for...in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. 



#### Length

The length property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one. The `length` property is writable. If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible



#### `new Array()`

There is one more syntax to create an array: 

```js
let arr = new Array ("Apple", "Pear", "etc");
```

If `new Array` is called with a single argument which is a number, then it creates an array without items, but with the given length. 



#### toString

Arrays have their own implementation of `toString` method that returns a comma-separated list of elements. Arrays do not have `Symbol.toPrimitive`, neither a viable `valueOf` they implement only `toString` conversion



#### Don't compare arrays with ==

This operator has no special treatment for arrays, it works with them as with any objects. Thus two arrays are equal `==` only if they're references to the same object. So don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter. 



### 5.5 Array methods

Arrays provide a lot of methods.



#### Add / remove items

* `arr.push(...items)`: adds items to the end
* `arr.pop()`: extracts an item from the end
* `arr.shift()`: extracts an item from the beginning
* `arr.unshift(...items)`: adds items to the beginning



#### Splice

The `arr.splice` method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements. The syntax is: 

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

It modifies `arr` starting from the index `start`: removes `deleteCount` elements and then inserts `elem1, ..., elemN` at their place. Returns the array of removed elements. 

The `splice` method is also able to insert the elements without any removals. For that we need to set `deleteCount` to 0

Here and in other array methods, negative indexes are allowed. They specify the position from the end of the array



#### Slice

The method `arr.slice` is much simpler than similar-looking `arr.splice`. The syntax is:

```js
arr.slice([start], [end])
```

It returns a new array copying to it all items from index `start` to `end` (not including `end`). Both `start` and `end` can be negative, in that case position from array end is assumed

It is similar to a string method `str.slice`, but instead of substrings, it makes subarrays

```js
let arr = ["t", "e", "s", "t"];
arr.slice(1, 3);	// e,s
arr.slice(-2);		// s,t
```

We can also call it without arguments: `arr.slice()` creates a copy of `arr`. That's often used to obtain a copy for further transformations that should not affect the original array



#### Concat

The method `arr.concat` creates a new array that includes values from other arrays and additional items. The syntax is:

```js
arr.concat(arg1, arg2...)
```

It accepts any number of arguments - either arrays or values. The result is a new array containing items from `arr`, then `arg1`, `arg2` etc. If an argument `argN` is an array, then all its elements are copied. Otherwise the argument itself is copied. 

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as whole:

```js
let arr = [1, 2];
let arrayList = {
    0: "something",
    length: 1
};

arr.concat(arrayLike);	// 1,2,[object Object]
```

But if an array-like object has a special `Symbol.isConcatSpreadable` property, then it's treated as an array by `concat`: its element are added instead: 

```js
let arr = [1, 2];

let arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
};
arr.concat(arrayList);	// 1,2,something,else
```



#### Iterate: forEach

The `arr.forEach` method allows to run a function for every element of the array. The syntax:

```javascript
arr.forEach(function(item, index, array) {
    // ... do something with item
});
```

For instance, to show each element of an array: 

```js
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Or:

```js
["Bilbo", "Gandalf", "Nazul"].forEach((item, index, array) => {
    alert(`${item} is at index ${index} in ${array}`);
});
```



#### Searching in array

##### indexOf / lastIndexOf and includes

The methods `arr.indexOf`, `arr.lastIndexOf` and `arr.includes` have the same syntax and do essentially the same as their string counterparts, but operate on items instead of characters

* `arr.indexOf(item, from)`: looks for `item` starting from index `from`, and returns the index where it was found, otherwise -1
* `arr.lastIndexOf(item, from)`: same, but looks for it from right to left
* `arr.includes(item, from)`: looks for `item` starting from index `from`, returns `true` if found

A minor difference of `includes`is that it correctly handles `NaN`, unlike `indexOf / lastIndexOf`:

```js
const arr = [NaN];
arr.indexOf(NaN);		// -1 (should be 0, but === equality doesn't work for NaN)
arr.includes(NaN);		// true
```



#### find and findIndex

The find method finds an object in an array with a specific condition. The syntax is: 

```js
let result = arr.find(function(item, index, array) {
    // if true is returned, item is returned and ieration is stopped
    // for falsy scenario returns undefined
});
```

The function is called for elements of the array, one after another.

* `item` is the element
* `index` is its index
* `array` is the array itself

For example:

```js
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

user.name;		// John
```



The `arr.findIndex` method is essentially the same, but it returns the index where the element was found instead of the element itself and `-1` is returned when nothing is found



#### filter

The `find` method looks for a single element. if there may be many, we can use `arr.filter(fn)`. The syntax is similar to `find`, but `filter` returns an array of all matching elements

```js
let results = arr.filter(function(item, index, array) {
    // if true item is pushed to results and the iteration continues
    // returns empty array if nothing found
});
```



#### map

The `arr.map` method calls the function for each element of the array and returns the array of results. The syntax is: 

```js
let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
});
```

For example: 

```js
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length); 	// 5,7,6
```



#### sort(fn)

The call to `arr.sort()` sorts the array in place, changing its element order. It also returns the sorted array, but the returned value is usually ignored. 

For instance: 

```js
let arr = [1, 2, 15];

arr.sort(); 	// 1, 15, 2
```

The items are sorted as strings by default. To use our own sorting order, we need to supply a function as the argument of `arr.sort()`:

```js
function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

let arr = [1, 2, 15];

arr.sort(compareNumeric);	// 1, 2, 15
```

A shorter way to write it:

```js
arr.sort( (a, b) => a - b );
```



##### Use `localeCompare` for strings

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`. For example, let's sort in German:

```js
let countries = ["Österreich", "Andorra", "Vietnam"];

countries.sort( (a, b) => a.localeCompare(b) );		// Andorra, Österreich, Vietnam
```



#### reverse

The method `arr.reverse` reverses the order of elements in `arr`



#### split and join

The `str.split(delim)` method splits the string into an array by the given delimiter `delim`:

```js
let names = "Bilbo, Gandalf, Nazgul";

let arr = names.split(", ");	// ["Bilbo", "Gandalf", "Nazgul"]
```

The `split` method has an optional second numeric argument - a limit on the array length. If it is provided, then the extra elements are ignored. 

The call `arr.join(glue)` creates a string of `arr` items joined by `glue` between them



#### reduce / reduceRight

The methods `arr.reduce` and `arr.reduceRight` are used to calculate a single value based on the array. The syntax is: 

```js
let value = arr.reduce(function(accumulator, item, index, array) {
    // ...
}, [initial]);
```

The function is applied to all array elements one after another and "carries on" its result to the next call. 

Arguments: 

* `accumulator`: is the result of the previous function call, equals `initial` the first time (if `initial` is provided). If there is no initial, then `reduce` takes the first element of the array as the initial value and starts the iteration from the 2nd element
* `item`: is the current array item
* `index`: is its position
* `array`: is the array

As function is applied, the result of the previous function call is passed to the next one as the first argument. So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of `reduce`. For instance: 

```js
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result);		// 15
```

With `initial` requires extra care. If the array is empty, then `reduce` call without initial value gives an error. So it's advised to always specify the initial value.



The `arr.reduceRight` method does the same, but goes from right to left



#### Array.isArray

Arrays do not form a separate language type. They are based on objects. So `typeof` does not help to distinguish a plain object from an array: 

```js
alert(typeof {});	// object
alert(typeof []);	// object
```

But there is a special method, `Array.isArray(value)`. It returns `true` if the `value` is an array, and `false` otherwise 



#### Most methods support "thisArg"

Almost all array methods that call functions - like `find`, `filter`, `map`, with a notable exception of `sort`, accept an optional additional parameter `thisArg`. For example: 

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
```

The value of `thisArg` parameter becomes `this` for `func`

```js
let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
    }
};

let users = [
    {age: 16},
    {age: 20},
    {age: 23},
    {age: 30}
];

let soldiers = users.filter(armyCanJoin, army);		// 20, 23
```

The filter function can be replaced with

```js
users.filter(user => army.canJoin(user));
```



There are many other array methods. For example, `arr.some(fn)`, `arr.every(fn)`, `arr.fill(value, start, end)`, `arr.copyWithin(target, start, end)`, `arr.flat(depth)`, `arr.flatMap(fn)`. Check manual for more information.



### 5.6 Iterables

Iterable objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop. If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it



#### Symbol.iterator

We can making an iterator like this `range` object that represents an interval of numbers:

```js
let range = {
    from: 1,
    to: 5
};
```

To make the range object iterable (and thus let `for..of` work), we need to add a method to the object named `Symbol.iterator`

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an iterator - an object with the method `next`
2. Onward, `for..of` works only with that returned object
3. When `for..of` wants the next value, it calls `next()` on that object
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done = true` means that the iteration is finished, otherwise `value` is the next value

Here's the full implementation for range: 

```js
let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            }else {
                return { done: true };
            }
        }
    };
};

for (let num of range) {
    alert(num);		// 1, 2, 3, 4, 5 one by one
}
```

Note the core feature of iterables: separation of concerns

* The `range` itself does not have the `next()` method
* Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration

* So the iterator object is separate from the object it iterates over

We can put the `next()` function inside of `range` and let `Symbol.iterator()` return `this`. It works too. The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state. 



#### String is iterable

Arrays and strings are most widely used built-in iterables. 



#### Calling an iterator explicitly

For deeper understanding, let's see how to use an iterator explicitly. We'll iterate over a string in exactly the same way as `for..of`, but with direct calls: 

```js
let str = "Hello";

let iterator = str[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    alert (result.value);
}
```



#### Iterable and array-likes

* Iterables are objects that implement the `Symbol.iterator` method, as described above
* Array-likes are object that have indexes and `length`, so they look like arrays



#### Array.from

There is a universal method `Array.from` that takes an iterable or array-like value and makes a "real" `Array` from it. For instance: 

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

let arr = Array.From(arrayLike);
arr.pop();	// World
```

The full syntax for `Array.from` is:

```js
Array.from(obj[, mapFn, thisArg])
```

The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it



### 5.7 Map and set

#### Map

Map is a collection of keyed data items, just like an `Object`. But the main difference is that Map allows keys of any type

Methods and properties are: 

* `new Map()`: creates the map
* `map.set(key, value)`: stores the value by the key
  * Every `map.set` call returns the map itself, so we can "chain" the calls
* `map.get(key)`: returns the value by the key, `undefined` if `key` doesn't exist in map
* `map.has(key)`: returns true if the key exists, false otherwise
* `map.delete(key)`: removes the value by the key
* `map.clear()`: removes everything from the map
* `map.size`: returns the current element count

For instance: 

```js
let map = new Map();

map.set("1", "str1");
map.set(1, "num1");
map.set(true, "bool1");

map.get(1);		// "num1"
map.get("1");	// "str1"
map.size;		// 3
```

To test keys for equivalence, `Map` uses the algorithm `SameValueZero`. It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`



##### Map can also use objects as keys

For instance: 

```js
let john = { name: "John" };

let visitsCountMap = new Map();

visitsCountMap.set(john, 123);

visitsCountMap.get(john);	// 123
```

`Object` cannot use objects as keys



##### Iteration over Map

For looping over a `Map`, there are 3 methods:

* `map.keys()`: returns an iterable for keys
* `map.values()`: returns an iterable for values
* `map.entries()`: returns an iterable for entries `[key, value]`, it's used by default in `for..of`

The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`. Besides that, `Map` has a built-in `forEach` method, similar to Array



##### Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization: 

```js
let map = new Map([
    ["1",	"str1"],
    [1, 	"num1"],
    [true,	"bool1"]
]);
```

If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method `Object.entries(obj)` that returns an array of key/value pairs for an object exactly in that format: 

```js
let obj = {
    name: "John",
    age: 30
};

let map = new Map(Object.entries(obj));

map.get("name");	// John
```



##### Object.fromEntries: Object from Map

The `Object.fromEntries` method does the reverse of `Object.entries`. Given an array of `[key, value]` pairs, it creates an object from them. We can use `Object.fromEntries` to get a plain object from `Map`: 

```js
let map = new Map();
map.set("banana", 1);
map.set("orange", 2);
map.set("meat", 4);

let obj = Object.fromEntries(map);

alert(obj.orange);	// 2
```



#### Set

A `Set` is a special type collection - "set of values" (without keys), where each value may occur only once. Its main methods are: 

* `new Set(iterable)`: creates the set, and if an `iterable` object is provided, copies values from it into the set
* `set.add(value)`: adds a value, returns the set itself
* `set.delete(value)`: removes the value, returns true if value existed at the moment of the call, otherwise false
* `set.has(value)`: returns true if the value exists in the set, otherwise false
* `set.clear()`: removes everything from the set
* `set.size`: is the elements count



##### Iteration over Set

We can loop over a set either with `for..of` or using `forEach`

```js
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

set.forEach((value, valueAgain, set) => {
    alert(value);
});
```

The `forEach` has this form for compatibility with `Map` where the callback passed `forEach` has three arguments. Thus the same methods `Map` has for iterators are also supported by `Set` where `set.keys()` and `set.values()` are the same.



### 5.8 WeakMap and WeakSet

JS engine keeps a value in memory while it is "reachable" and can potentially be used. Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory. Similar to that, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected. 

`WeakMap` is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects. 



#### WeakMap

The first difference between `Map` and `WeakMap` is that keys must be objects, not primitive values. If we use an object as the key in it, and there are no other references to that object - it will be removed from memory (and from the map) automatically. If an object only exists as the key of `WeakMap` - it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it. `WeakMap` has only the following methods:

*  `weakMap.get(key)`
* `weakMap.set(key, value)`
* `weakMap.delete(key)`
* `weakMap.has(key)`



##### Use case: additional data

The main area of application for `WeakMap` is an additional data storage. If we are working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive - then `WeakMap` is exactly what's needed



##### Use case: caching

Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it. With `WeakMap`, the cached result will be removed from memory automatically after the object gets garbage collected. 



#### WeakSet

`WeakSet` behaves similarly:

* It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives)
* An object exists in the set while it is reachable from somewhere else
* Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations

Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object. 



The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap / WeakSet` from doing their main job - be an "additional" storage of data for objects which are stored / managed at another place



### 5.9 Object.keys, values, entries

For plain objects, the following methods are available

* `Object.keys(obj)`: returns an array of keys
* `Object.values(obj)`: returns an array of values
* `Object.entries(obj)`: returns an array of `[key, value]` pairs
* They ignore symbolic properties



#### Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others. If we'd like to apply, then we can `Object.entries` followed by `Object.fromEntries`: 

```js
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

alert(doublePrices.meat)
```



### 5.10 Destructuring assignment

Destructuring assignment is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that is more convenient. Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. 



#### Array destructuring

For example:

```js
let arr = ["John", "Smith"]

let [firstName, surname] = arr;

firstName;	// John
surname;	// Smith
```

Unwanted elements of the array can also be thrown away via an extra comma. This syntax works with any iterable on the right-side and can use any "assignables" at the left side



##### The rest "..."

Usually, if the array is longer than the list at the left, the "extra" items are omitted. If we'd like to gather all that follows, we can add one more parameter that gets "the rest":

```js
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"]

rest[0];		// Consul
rest[1];		// of the Roman Republic
rest.length;	// 2
```



##### Default values

If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined. If we want a "default" value, we can provide it using `=`:

```js
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

// runs only prompt for surname
let [name = prompt("name?"), surname = prompt("surname?")] = ["Julius"];
```



#### Object destructuring

The destructuring assignment also works with objects. The basic syntax is: 

```js
let {var1, var2} = {var1:..., var2:...}
```

We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`. For instance: 

```js
let options = {
    title: "Menu",
    width: 100,
    height: 200
};

let {title, width, height} = options;

title;		// Menu
width;		// 100
height;		// 200
```

The order does not matter. 

If we want to assign a property to a variable with another name, we can set the variable name using a colon: 

```js
let {width: w, height: h, title} = options;

w;		// 100
h;		// 200
```

For potentially missing properties, we can set default values using `=` like with arrays. 

Or another way of writing it: 

```js
let title, width, height;

({title, width, height} = {title: "Menu", width: 200, height: 100});

title;	// Menu
```



#### Nested destructuring

```js
let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

let {
    size: {
        width,
        height
    },
    items: [item1, item2],
    title = "Menu"
} = options;

alert(title); 	// Menu
alert(width);	// 100
alert(height);	// 200
alert(item1);	// Cake
alert(item2);	// Donut
```



### 5.11 Date and time

`Date` stores the date, time and provides methods for date/time management



#### Creation

```js
let now = new Date();							// current date/time
let Jan01_1970 = new Date(0);					// 1970-01-01
let Jan02_1970 = new Date(24 * 3600 * 1000);	// 1970-01-02
let Dec31_1969 = new Date(-24 * 3600 * 1000);	// 1969-12-31
let date = new Date("2017-01-26");				// 2017-01-26
```

The full syntax: 

```js
new Date(year, month, date, hours, minutes, seconds, ms)
```



#### Access date components

* `getFullYear()`
* `getMonth()`
* `getDate()`
* `getHours(), getMinutes(), getSeconds(), getMilliseconds()`
* `getDay()`
* `getUTCFullYear(), getUTFMonth(), getUTCDay()`



#### Setting date components

* `setFullYear(year, [month], [date])`
* `setMonth(month, [date])`
* `setDate(date)`
* `setHours(hour, [min], [sec], [ms])`
* `setMilliseconds(ms)`
* `setTime(milliseconds)`

Every one of them except `setTime()` has a UTC-variant



#### Autocorrection

We can set out-of-range values, and it will auto-adjust itself. 

```js
let date = new Date(2013, 0, 32);	// 2013-02-01
```



#### Date to number, date diff

When a `Date` object is converted to number, it becomes the timestamp same as `date.getTime()`

```js
let start = new Date();

for (let i = 0; i < 1000000; i++) {
    let doSomething = i * i * i;
}

let end = new Date();

alert(`The loop took ${end - start} ms`)
```



#### `Date.parse` from a string

The method `Date.parse(str)` can read a date from a string. The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where

* `YYYY-MM-DD` is the date: year-month-day
* The character `T` is used as the delimiter
* `HH:mm:ss.sss` is the time: hours, minutes, seconds and milliseconds
* The optional `Z` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0

```js
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```



### 5.12 JSON methods, toJSON

#### JSON.stringify

The JSON (JavaScript Object Notation) is a general format to represent values and objects. It is easy to use JSON for data exchange when the client uses JS and the server is written on Ruby/PHP/Java/Whatever. JS provides methods:

* `JSON.stringify` to convert objects into JSON
* `JSON.parse` to convert JSON back into an object

For instance: 

```js
let student = {
    name: "John",
    age: 30,
    isAdmin: false,
    courses: ["html", "css", "js"],
    wife: null
};

let json = JSON.stringify(student);

alert(typeof json);

alert(json);
```

The method `JSON.stringify(student)` takes the object and converts it into a string. The resulting `json` string is called a JSON-encoded or serialized or stringified or marshalled object. We can now send it over the wire or put it into a plain data store. Note that a JSON-encoded object has several important differences from the object literal:

* Strings use double quotes. No single quotes or backticks in JSON
* Object property names are double quoted also. That's obligatory

`JSON.stringify` can be applied to primitives as well. JSON supports following data types: 

* Objects
* Arrays
* Primitives
  * Strings 
  * Numbers
  * Boolean values 
  * Null

JSON is data-only language-independent specification, so some JS-specific object properties are skipped by `JSON.stringify`. Namely: 

* Function properties (Methods)
* Symbolic keys and values
* Properties that store `undefined`

```js
let user = {
    sayHi() {				// ignored
        alert("Hello");
    },
    [Symbol("id")]: 123,	// ignored
    something: undefined	// ignored
};

alert (JSON.stringify(user));	// {} (empty object)
```

The nested objects are supported and converted automatically. But there must be no circular references. 



#### Excluding and transforming: replacer

The full syntax of `JSON.stringify` is:

```js
let json = JSON.stringify(value[, replacer, space])
```

* value: a value to encode
* replacer: array of properties to encode or mapping function `function(key, value)`. If we pass an array of properties to it, only these properties will be encoded. If a function is used, then the function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one
* space: amount of space to use for formatting

#### Formatting: space
The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting. For example, `space = 2` tells JS to show nested objects on multiple lines, with indentation of 2 spaces inside an object

#### Custom "toJSON"
Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available. For instance: 
```js
let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

let meetup = {
    title: "Conference", 
    room
};

alert( JSON.stringify(room) );  // 23
alert( JSON.stringify(meetup)); 
/*
    {
        "title":"Conference",
        "room":23
    }
*/
```

#### JSON.parse
The deode a JSON-string, we need `JSON.parse`. The syntax:
```js
let value = JSON.parse(str, [reviver]);
```

Here, 
* `str`: JSON-string to parse
* `reviver`: optional `function(key, value)` that will be called for each `(key, value)` pair and can transform the value

JSON does not support comments. Adding a comment to JSON makes it invalid. 


##### Using reviver
For example: 
```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
    if (key == "date") return new Date(value);
    return value;
});
```

This works for nested objects as well. 


## Advanced working with functions

### 6.1 Recursion and stack

The information about the process of execution of a running function is stored in its execution context. The execution context is an internal data structure that contains details about the execution of a function. One function call has exactly one execution context associated with it. 

When a function makes a nested call, the following happens:

* The current function is paused
* The execution context associated with it is remembered in a special data structure called execution context stack
* The nested call executes
* After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped





### 6.2 Rest parameters and spread syntax

#### Rest parameters `...`

A function can be called with any number of arguments, no matter how it is defined. For example: 

```js
function showName(firstName, lastName, ...titles) {
    alert(firstName + " " + lastName);	// Julius Caesar
    
    alert(titles[0]);		// Consul
    alert(titles[1]);		// Imperator
    alert(titles.length);	// 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

The rest parameters must be at the end



#### The "arguments" variable

There is also a special array-like object named `arguments` that contains all arguments by their indexes. For instance:

```js
function showName() {
    alert( arguments.length );
    alert( arguments[0] );
    alert( arguments[1] );
}

showName("Julius", "Caesar");	// 2, Julius, Caesar
```

Although `arguments` is both array-like and iterable, it is not an array. It does not support array methods. Also, it always contains all arguments. We can't capture them partially, like we did with rest parameters



#### Spread syntax

Spread syntax looks similar to rest parameters, also using `...`, but does the opposite. For example:

```js
let arr  = [3, 5, 1]
let arr2 = [8, 9, 1]

// spread turns array into a list of arguments
Math.max(...arr);	// 5 
Math.max(1, ...arr, 2, ...arr2, 3);	// 9
```

Also, the spread syntax can be used to merge arrays: 

```js
let merged = [0, ...arr, 2, ...arr2]
```

And we can use the spread syntax to turn the string into array of characters:

```js
let str = "Hello";
[...str];	// H,e,l,l,o
```

The spread syntax internally uses iterators to gather elements, the same way as `for..of` does



#### Copy an array/object

It is possible to copy arrays and objects with spread syntax:

```js
let arr = [1, 2, 3];
let arrCopy = [ ...arr ];

let obj = {a: 1, b: 2, c: 3};
let objCopy = { ...obj };
```





### 6.3 Variable scope, closure

#### Code blocks

If a variable is declared inside a code block `{...}`, it is only visible inside that block



#### Nested functions

A nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables. For example: 

```js
function makeCounter() {
    let count = 0;
    
    return function() {
        return count++;
    };
}

let counter = makeCounter();

alert( counter() );		// 0
alert( counter() );		// 1
alert( counter() );		// 2
```



#### Lexical environment

##### Variables

In JS, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object know as the Lexical Environment. The Lexical Environment object consists of two parts:

1. Environment Record: an object that stores all local variables as its properties (and some other information like the value of `this`)
2. A reference to the outer lexical environment, the one associated with the outer code

A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object"

In a simple code without functions, there is only one Lexical Environment, a.k.a. global Lexical Environment, that associated with the whole script



##### Function declarations

A function is also a value, like a variable. The difference is that a Function Declaration is instantly fully initialized. When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration). What's why we can use a function, declared as Function Declaration, even before the declaration itself. 

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function()...`



##### Inner and outer Lexical Environment

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call. During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global)

* The inner Lexical Environment corresponds to the current execution of the function. It has the function arguments as its properties
* The outer Lexical Environment is the global Lexical Environment. It has the global variables and the function itself

The inner Lexical Environment has a reference to the outer one. When the code wants to access a variable - the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one. If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code)



##### Returning a function

All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created

So, a function `func.[[Environment]]` has the reference to variables in its outer Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time. 

A variable is updated in the Lexical Environment where it lives



##### Closure

There is a general programming term "closure". A closure is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But in JS, all functions are naturally closures (with only one exception to be covered later)

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables. 



#### Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. However, if there is a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment. In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive



##### Real-life optimizations

In practice, JS engines try to analyze variable usage and if it's obvious from the code that an outer variable is not used - it is removed. An important side effect in V8 is that such variable will be come unavailable in debugging

That may lead to funny debugging issues. 



#### Does a function pickup latest changes? 

A function gets outer variables as they are now, it uses the most recent values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    





### 6.4 The old "var"

The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work. But internally `var` is very different. 



#### "var" has no block scope

Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks. For instance: 

```js
if (true) {
    var test = true;
}

alert(test);
```

If a code block is inside a function, then `var` becomes a function-level variable: 

```js
function sayHi() {
    if (true) {
        var phrase = "Hello";
    }
    
    alert(phrase);	// works
}

sayHi();
alert(phrase);		// ReferenceError: phrase is not defined
```



#### "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error. With `var`, we can redeclare a variable any number of times. 



#### "var" variables can be declared below their use

`var` declarations are processed when the function starts (or script starts for globals). Even in the following situation: 

```js
function sayHi() {
    phrase = "Hello";
    
    if (false) {
        var phrase;
    }
    
    alert(phrase);
}

sayHi();	// Hello
```

People also call such behavior "hoisting" (raising), because all `var` are "hoisted" (raised) to the top of the function. Declarations are hoisted, but assignments are not. 

```js
function sayHi() {
    alert(phrase);
    
    var phrase = "Hello";
}
sayHi();	// undefined
```



#### IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (IIFE). That's not something we should use nowadays, but you can find them in old scripts:

```js
(function() {
    var message = "Hello";
    
    alert(message);		// Hello
})();
```

The parentheses around the function is a trick to show JS that the function is created in the context of another expression, and hence it's a Function Expression. It needs no name and can be called immediately

There exist other ways besides parentheses to tell JS that we mean a Function Expression: 

```js
(function() {
    alert("Parentheses around the function");
})();

(function() {
    alert("Parentheses around the whole thing");
}());

!function() {
    alert("Bitwise NOT operato starts the expression");
}();

+function() {
    alert("Unary plus starts the expression");
}();
```

Nowadays there is no reason to write such code







### 6.5 Global object

The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment. In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environment. It's supported in all major browsers. 

All properties of the global object can be accessed directly: 

```js
alert("Hello");
// is the same as
globalThis.alert("Hello");
```



#### Using for polyfills

We use the global object to test for support of modern language features. For instance, test if a built-in `Promise` object exists:

```js
if (!window.Promise) {
    alert("Your browser is really old!");
}
```









### 6.6 Function object, NFE

A good way to imagine functions in JS is as callable "action objects". We can not only call them, but also treat them as objects: add / remove properties, pass by reference etc. 



#### The "name" property

Function objects contain some usable properties. For instance, a function's name is accessible as the "name" property:

```js
function sayHi() {
    alert("Hi");
}
alert(sayHi.name);		// sayHi
```

Also works if the assignment is done via a default value:

```js
function f(sayHi = function() {}) {
    alert(sayHi.name);		// sayHi
}

f();
```

In the specification, this feature is called a "contextual name". If the function does not provide one, then in an assignment it is figured out from the context



#### The "length" property

The built-in property "length" returns the number of function parameters, for instance: 

```js
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length);		// 1
alert(f2.length);		// 2
alert(many.length);		// 2
```



#### Custom properties

We can also add properties of our own. Here we add the `counter` property to track the total calls count: 

```js
function sayHi() {
    alert("Hi");
    
    sayHi.counter++;
}
sayHi.counter = 0;	// initial value

sayHi();	// Hi
sayHi();	// Hi

alert( `Called ${sayHi.counter} times` );	// Called 2 times
```

A property assigned to a function like `sayHi.counter = 0` does not define a local variable `counter` inside it. In other words, a property `counter` and a variable `let counter` are two unrelated things

We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds



Function properties can replace closure sometimes. For instance, we can rewrite the counter function example previously to use a function property:

```js
function makeCounter() {
    function counter() {
        return counter.count++;
    };
    
    counter.count = 0;
    
    return counter;
}

let counter = makeCounter();
alert( counter() );		// 0
alert( counter() );		// 1
```

The `count` is now stored in the function directly, not in its outer Lexical Environment. The main difference is that if the value of `count` lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it's bound to a function, then such a thing is possible. 



#### Named Function Expression

Named Function Expression, or NFE, is a term for Function Expressions that have a name. 

For instance, let's take an ordinary Function Expression:

```js
let sayHi = function(who) {
    alert(`Hello, ${who}`);
};
```

And add a name to it:

```js
let sayHi = function func(who) {
    alert(`Hello, ${who}`);
};
```

This is still a Function Expression. Adding the name `func` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression. Adding such a name also did not break anything. The function is still available as `sayHi()`

There are two special things about the name `func`, that are the reasons for it: 

1. It allows the function to reference itself internally
2. It is not visible outside of the function

Why do we use `func`? Maybe just use `sayHi` for the nested call? Actually, in most cases we can. The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors. Because the name `func` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function. 

There is no such thing for Function Declaration.





### 6.7 The "new Function" syntax

There is one more way to create a function. It is rarely used, but sometimes there's no alternative. 



#### Syntax

The syntax for creating a function

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

The function is created with the arguments `arg1...argN` and the given `functionBody`. For example:

```js
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) );		// 3
```

For a function without arguments: 

```js
let sayHi = new Function('alert("Hello")');
sayHi();	// Hello
```

The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time. It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications



#### Closure

When a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one. So, such function doesn't have access to outer variables, only to the global ones. If `new Function` had access to outer variables, it would have problems with minifiers













### 6.8 Scheduling: setTimeout and setInterval

We may decide to execute a function not right now, but at a certain time later. That's called "scheduling a call". There are two methods for it: 

* `setTimeout` allows us to run a function once after the interval of time
* `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval 

These methods are not a part of JS specification. But most environments have the internal scheduler and provide these methods. In particular, they are supported in all browsers and Node.js



#### `setTimeout`

The syntax

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Parameters:

* `func|code`: Function or a string of code to execute. Usually, that's a function. For historical reasons, a string of code can be passed, but not recommended. If the first argument is a string, then JS creates a function from it
* `delay`: The delay before run, in milliseconds, by default 0
* `arg1`, `arg2`,...: Arguments for the function (not supported in IE9- )

For instance: 

```js
function sayHi() {
    alert("Hello");
}
setTimeout(sayHi, 1000);
```



#### Canceling with `clearTimeout`

A call to `setTimeout` returns a "timer identifier" `timerId` that we can use to cancel the execution. The syntax to cancel: 

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```



#### `setInterval`

The `setInterval` method has the same syntax as `setTimeout`: 

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);
```

All arguments have the same meaning. But unlike `setTimeout` it runs the function not only once, but regularly after the given interval of time. To stop further calls `clearInterval(timerId)`. 



#### Nested `setTimeout`

For example: 

```js
let timerId = setTimeout(function tick() {
    alert("tick");
    timerId(tick, 2000);
}, 2000);
```

The nested `setTimeout` is a more flexible method thant `setInterval`

The real delay between function calls for `setInterval` is less than in the code. That's normal, because the time taken by the function's execution "consumes" a part of the interval. The nested `setTimeout` guarantees the fixed delay.



#### Zero delay `setTimeout`

There is a special use case: `setTimeout(func, 0)`, or just `setTimeout(func)`. This schedules the execution of `func` as soon as possible. But the scheduler will invoke it only after the currently executing script is complete. For instance: 

```js
setTimeout(()=> alert("World"));
alert("Hello");		// Prints before "World"
```





### 6.9 Decorators and forwarding, call/apply

#### Transparent caching

For example: 

```js
function slow(x) {
    // there can be a heavy CPU-intensive job here
    alert(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();
    
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        
        let result = func(x);
        
        cache.set(x, result);
        return result;
    };
}

slow = cachingDecorator(slow);
```

In the code above, `cachingDecorator` is a decorator: a special function that takes another function and alters its behavior. There are several benefits of using a separate `cachingDecorator` instead of altering the code of `slow` itself:

* The `cachingDecorator` is reusable. We can apply it to another function
* The caching logic is separate, it did not increase the complexity of `slow` itself
* We can combine multiple decorators if needed



#### Using `func.call` for the context

The caching decorator mentioned above is not suited to work with object methods because it cannot access `this` of the object. There is a special built-in function method `func.call(context, ...args)` that allows to call a function explicitly setting `this`. The syntax is:

```js
func.call(context, arg1, arg2, ...)
```

It runs `func` providing the first argument as `this`, and the next as the arguments. For example, these two calls do almost the same: 

```js
func(1, 2, 3);
func.call(obj, 1, 2, 3);
```

The only difference is that `func.call` also sets `this` to `obj`

For example: 

```js
function sayHi() {
    alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

sayHi.call( user );		// John
sayHi.call( admin );	// Admin
```

So, we can use `call` in the wrapper to pass the context to the original function. 

```js
let worker = {
    someMethod() {
        return 1;
    },
    
    slow(x) {
        alert("Called with " + x);
        return x * this.someMethod();
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x);	// "this" is passed correctly now
        cache.set(x, result);
        return result; 
    };
}

worker.slow = cachingDecorator(worker.slow);
```

To make it more clear: 

1. After the decoration `worker.slow` is now the wrapper `function (x) {...}`
2. So when for example `worker.slow(2)` is executed, the wrapper gets `2` as an argument and `this = worker` (the object before dot)
3. Inside the wrapper, assuming the result is not yet cached, `func.call(this, x)` passes the current `this = worker` and the current argument (`=2`) to the original method



#### Going multi-argument

There are many solutions possible: 

1. Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys
2. Use nested maps
3. Join two values into one. For flexibility, we can allow to provide a hashing function for the decorator, that knows how to make one value from many

For many practical applications, the 3rd variant is good enough. Here is a more powerful `cachingDecorator`: 

```js
let worker = {
    slow(min, max) {
        alert(`Called with ${min}, ${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        let result = func.call(this, ...arguments);
        
        cache.set(key, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow, hash);
```



#### `func.apply`

Instead of `func.call(this, ...arguments)`, we could use `func.apply(this, arguments)`. The syntax of built-in method `func.apply` is:

```js
func.apply(context, args)
```

It runs the `func` setting `this = context` and using an array-like object `args` as the list of arguments. The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them. So these two calls are almost equivalent: 

```js
func.call(context, ...args);
func.apply(context, args);
```

Passing all arguments along with the context to another function is called call forwarding. The simplest form of it:

```js
let wrapper = function() {
    return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`



#### Borrowing a method

The hash function used above can be improved like this: 

```js
function hash() {
    // We cannot run arguments.join() because it is not a real array
    alert( [].join.call(arguments) );
}

hash(1, 2);
```

This trick is called method borrowing. We take (borrow) a join method from a regular array (`[]`) and use `[].join.call` to run it in the context of `arguments`. 

Why does it work? Because the internal algorithm of the native method `arr.join(glue)` is very simple:

1. Let `glue` be the first argument or, if no arguments, then a comma `,`
2. Let `result` be an empty string
3. Append `this[0]` to `result`
4. Append `glue` and `this[1]`
5. Append `glue` and `this[2]`
6. ... Do so until `this.length` items are glued
7. Return `result`

So, technically it takes `this` and joins `this[0]`, `this[1]`, ... etc together. 



#### Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one thing. If the original function had properties on it, then the decorated one will not provide them. There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function





### 6.10 Function binding

#### Losing "this"

Once a method is passed somewhere separately from the object - `this` is lost. 

```js
let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000);	// Hello. undefined
```

The task is quite typical - we want to pass an object method somewhere else where it will be called. How to make sure that it will be called in the right context?



#### Solution 1: a wrapper

The simplest solution is to use a wrapper function

```js
let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(function() {
    user.sayHi();	// Hello, John!
}, 1000);
```

It works because it receives `user` from the outer lexical environment, and then calls the method normally. 

The same, but shorter:

```js
setTimeout(() => user.sayHi(), 1000);
```

What if before `setTimeout` triggers, `user` changes value? Then, suddenly, it will call the wrong object. 



#### Solution 2: bind

Functions provide a built-in method `bind` that allows to fix `this`. The basic syntax is:

```js
let boundFunc = func.bind(context);
```

The result of `func.bind(context)` is a special function-like object that is callable as function and transparently passes the call to `func` setting `this = context`. For instance: 

```js
let user = {
    firstName: "John"
};

function func() {
    alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser();		// John
```

All arguments are passed to the original `func` "as is". It works even with an object method: 

```js
let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);

sayHi();	// Hello, John!

setTimeout(sayHi, 1000);	// Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to
user = {
    sayHi() { alert("Another user in setTimeout"); }
};
```

The arguments are passed "as is", only `this` is fixed by `bind`



##### Convenience method: `bindAll`

If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

```js
for (let key in user) {
    if (typeof user[key] == "function") {
        user[key] = user[key].bind(user);
    }
}
```

JS libraries also provide functions for convenient mass binding, e.g. `_.bindAll(object, methodNames)` in lodash



#### Partial functions

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy. The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function. For instance:

```js
function mul(a, b) {
    return a * b;
}

let double = mul.bind(null, 2);

double(3);	// 6
double(4);	// 8
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is"

That's called partial function application - we create a new function by fixing some parameters of the existing one. Note that we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`

The benefit of making a partial function is that we can create an independent function with a readable name (`double`, `triple`). In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience



#### Going partial without context

A function `partial` for bind only arguments can be easily implemented:

```js
function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

// Usage:
let user = {
    firstName: "John",
    say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

user.sayNow = partial(user.say, new Date().getHours() + ":" + new Date().getMinutes());

user.sayNow("Hello");
// Gives something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper that calls `func` with: 

* Same `this` as it gets (for `user.sayNow` call it's `user`)
* Then gives it `...argsBound` - arguments from the `partial` call (`10:00`)
* Then gives it `...arg` - arguments given to the wrapper (`Hello`)

Also there's a ready `_.partial` implementation from lodash library






### 6.11 Arrow functions revisited

Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features



#### Arrow functions have no `this`

Arrow functions do not have `this`. If `this` is accessed, it is taken from the outside. 

```js
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    
    showList() {
        this.students.forEach(
            student => alert(this.title + ": " + student)
        );
    }
};

group.showList();
```



Arrow functions cannot run with `new`. Because arrow function does not have `this`, it cannot be used as constructors. They cannot be called with `new`



##### Arrow functions vs bind

There is a subtle difference between an arrow function `=>` and a regular function called with `.bind(this)`

* `.bind(this)` creates a "bound version" of the function 
*  The arrow `=>` doesn't create any binding. The function simply doesn't have `this`



#### Arrows have no "arguments" variable

That is great for decorators, when we need to forward a call with the current `this` and `arguments`. For instance, `defer(f, ms)` gets a function and returns a wrapper around it that delays the call by `ms` milliseconds

```js
function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    };
}

function sayHi(who) {
    alert("Hello, " + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John");		// Hello, John
```



## Object Properties Configuration

### 7.1 Property flags and descriptors

Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing. 



#### Property flags

Object properties, besides a `value`, have three special attributes (so-called "flags"):

* `writable`: if `true`, the value can be changed, otherwise it's read-only
* `enumerable`: if `true`, then listed in loops, otherwise not listed
* `configurable`: if `true`, the property can be deleted and these attributes can be modified, otherwise not
  * The non-configurable flag is sometimes preset for built-in objects and properties. A non-configurable property can't be deleted, its attributes can't be modified
  * `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value
    * The only attribute change possible `wrtable true -> false`

When we create a property "the usual way", all of them are `true`. But we also can change them anytime. The method `Object.getOwnPropertyDescriptor` allows to query the full information about a property. The syntax is:

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

The returned value is a so-called "property descriptor" object: it contains the value and all the flags. For instance: 

```js
let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

alert( JSON.stringify(descriptor, null, 2) );
/* property descriptor:
{
	"value": "John",
	"writable": true,
	"enumerable": true,
	"configurable": true
}
*/ 
```

To change the flags, we can use `Object.defineProperty`. The syntax is: 

```js
Object.definePropery(obj, propertyName, descriptor)
```

If the property exists, `defineProperty` updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed `false`. For instance:

```js
let user = {};

Object.defineProperty(user, "name", {
    value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

alert( JSON.stringify(descriptor, null, 2) );
/*
{
	"value": "John",
	"writable": false,
	"enumerable": false,
	"configurable": false
}
*/
```



#### `Object.defineProperties`

There is a method `Object.defineProperties(obj, descriptors)` that allows to define many properties at once. The syntax is: 

```js
Object.defineProperties(obj, {
    prop1: descriptor1,
    prop2: descriptor2
});
```



#### `Object.getOwnPropertyDescriptors`

To get all property descriptors at once, we can use the method `Object.getOwnPropertyDescriptors(obj)`. Together with `Object.defineProperties` it can be used as a "flags-aware" way of cloning an object

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normally when we clone an object, we use an assignment to copy properties, but that does not copy flags. So if we want a "better" clone then `Object.defineProperties` is preferred



#### Sealing an object globally

Property descriptors work at the level of individual properties. There are also methods that limit access to the whole object

* `Object.preventExtensions(obj)`: forbids the addition of new properties to the object
* `Object.seal(obj)`: forbids adding / removing of properties. Set `configurable: false` for all existing properties
* `Object.freeze(obj)`: forbids adding / removing / changing of properties. Sets `configurable: false, writable: false` for all existing properties. 

And also there are tests for them:

* `Object.isExtensible(obj)`
* `Object.isSealed(obj)`
* `Object.isFrozen(obj)`





### 7.2 Property getters and setters

There are two kinds of object properties. The first kind is data properties. All properties that we have been using until now were data properties. The second type of properties is accessor properties. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code. 



#### Getters and setters

Accessor properties are represented by "getter" and "setter" methods. In an object literal they are denoted by `get` and `set`:

```js
let obj = {
    get propName() {
        // getter, the code executed on getting obj.propName
    },
    
    set propName(value) {
        // setter, the code executed on setting obj.propName = value
    }
};
```

For instance: 

```js
let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

alert(user.fullName);	// John Smith

user.fullName = "Alice Cooper";
alert(user.name);		// Alice
```

From the outside, an accessor property look like a regular one. That's the idea of accesssor properties. We don't call `user.fullName` as a function, we read it normally. 



#### Accessor descriptors

Descriptors for accessor properties are different from those for data properties. For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions. 

* `get`: a function without arguments, that works when a property is read
* `set`: a function without one argument, that is called when the property is set
* `enumerable`: same as for data properties
* `configurable`: same as for data properties



#### Smarter getters / setters

Getters / setters can be used as wrappers over "real" property values to gain more control over operations with them. For instance: 

```js
let user = {
    get name()  {
        return this._name;
    }
    
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};
```

There is a widely known convention that properties starting with an underscore `_` are internal and should not be touched from outside the object



#### Using for compatibility

One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior



## Prototypes, inheritance

### 8.1 Prototypal inheritance

#### [[Prototype]]

In JS, objects have a special hidden property `[[Prototype]]`, that is either `null` or references another object. That object is called "a prototype". When we read a property from an `object`, and it's missing, JS automatically takes it from its prototype. This is called "prototypal inheritance". The property `[[Prototype]]` is internal and hidden, but there are many ways to set it:

```js
let animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
};
let rabbit = {
    jumps: true
};
rabbit.__proto__ = animal;
rabbit.jumps;		// true
rabbit.walk();		// Animal walk
```

The prototype chain can be longer. There are only two limitations:

1. The references can't go in circles. JS will throw an error if we try to assign `__proto__` in a circle.
2. The value of `__proto__` can be either an object or `null`. Other types are ignored.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JS suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead of it. 



#### Writing doesn't use prototype

The prototype is only used for reading properties. Write/delete operations work directly with the object. Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function. For instance: 

```js
let user = {
    name: "John",
    surname: "Smith",
    
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

alert(admin.fullName);		// John Smith

// setter triggers
admin.fullName = "Alice Cooper";

alert(admin.fullName);		// Alice Cooper, state of admin modified
alert(user.fullName);		// John Smith, state of user protected
```



#### The value of "this"

`this` is not affected by prototypes at all. No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot. We may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object. as a result, methods are shared, but the object state is not. 



#### for...in loop

The `for..in` loop iterates over inherited properties too. We can filter out inherited properties:

```js
let animal = {
    eats: true
};

let rabbit = {
    jumps: true,
    __proto__: animal
};

for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);
    
    if (isOwn) {
        alert(`Our: ${prop}`);
    } else {
        alert(`Inherited: ${prop}`);
    }
}
```

Almost all other key-value getting methods, such as `Object.keys`, `Object.values` and so on, ignore inherited properties. 







### 8.2 F.prototype

New objects can be created with a constructor function, like `new F()`. If `F.prototype` is an object, then the `new` operator uses it to set `[[Prototype]]` for the new object. The `F.prototype` here means a regular property named `"prototype"` on `F`. For instance:

```js
let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit");	// rabbit.__proto__ == animal

alert( rabbit.eats );	// true
```

`F.prototype` property is only used when `new F` is called, it assigns `[[Prototype]]` of the new object. 



#### Default F.prototype, constructor property

Every function has the `"prototype"` property even if we don't supply it. The default `"prototype"` is an object with the only property `constructor` that points back to the function itself. We can use `constructor` property to create a new object using the same constructor as the existing one: 

```js
function Rabbit(name) {
    this.name = name;
    alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```

However, if we replace the default prototype as a whole, then there will be no "constructor" in it. To keep the right "constructor", we can choose to add / remove properties to the default "prototype" instead of overwriting it as a whole or, alternatively, recreate the `constructor` property manually:

```js
function Rabbit () {}

Rabbit.prototype.jumps = true

Rabbit.prototype = {
    jumps: true,
    constructor: Rabbit
};
```





### 8.3 Native prototypes

The `prototype` property is widely used by the core of JS itself. All built-in constructor functions use it. 



#### Object.prototype

For example, an empty object: 

```js
let obj = {};
alert( obj );
```

The short notation `obj = {}` is the same as `obj = new Object()`, where `Object` is a built-in object constructor function, with its own `prototype` referencing a huge object with `toString` and other methods. When `new Object()` is called (or a literal object `{...}` is created), the `[[Prototype]]` of it is set to `Object.prototype` according to the rule that we discussed previously. So then when `obj.toString()` is called the method is taken from `Object.prototype`.



#### Other build-in prototypes

Other built-in objects such as `Array`, `Date`, `Function` and others also keep methods in prototypes. By specification, all of the built-in prototypes have `Object.prototype` on the top. That's why "everything inherits from objects". 

```js
let arr = [1, 2, 3];
alert(arr.__proto__ === Array.prototype);
alert(arr.__proto__.__proto__ === Object.prototype);
alert(arr.__proto__.__proto__.__proto__);	// null
```



#### Primitives

The most intricate thing happens with strings, numbers and booleans. They are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number` and `Boolean`. They provide the methods and disappear. These objects are created invisibly to us and most engines optimize them out, but the specification describes it exactly this way. Methods of these objects also reside in prototypes



#### Changing native prototypes

Native prototypes can be modified. For instance:

```js
String.prototype.show = function() {
    alert(this);
};

"BOOM!".show();		// BOOM!
```

In modern programming, there is only one case where modifying native prototypes is approved. That's polyfilling. Polyfilling is a term for making a substitute for a method that method that exists in the JS specification, but is not yet supported by a particular JS engine. We may then implement it manually and populate the built-in prototype with it. 



#### Borrowing from prototypes

That's when we take a method from one object and copy it into another. For instance: 

```js
let obj = {
    0: "Hello",
    1: "world!",
    length: 2,
};

obj.join = Array.prototype.join;

alert(obj.join(','));	// Hello,world!
```





### 8.4 Prototype methods, objects without `__proto__`

There are modern methods to setup a prototype: 

* `Object.create(proto, [descriptors])`: creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors
* `Object.getPrototypeOf(obj)`: returns the `[[Prototype]]` of `obj`
* `Object.setPrototypeOf(obj, proto)`: sets the `[[Prototype]]` of `obj` to `proto`

For instance: 

```js
let animal = {
    eats: true
};

let rabbit = Object.create(animal, {
    jumps: {
        value: true
    }
});

alert(rabbit.eats);		// true
alert(rabbit.jumps);	// true
alert(Object.getPrototypeOf(rabbit) === animal);	// true
Object.setPrototypeOf(rabbit, {});	// change the prototype of rabbit to {}, this is a very slow operation
```



#### Store user-provided keys in object

If we try to store user-provided keys in it (for instance, a user-entered dictionary), we can see an interesting glitch: all keys work fine except `"__proto__"`. If we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:

```js
let obj = Object.create(null);

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]);	// "some value"
```



## Classes

### 9.1 Class basic syntax

The basic syntax is: 

```js
class MyClass {
    // class methods
    constructor() {...}
    method1() {...}
    method2() {...}
    method3() {...}
    ...
}
```

For example:

```js
class User {
    constructor(name) {
        this.name = name;
    }
    
    sayHi() {
        alert(this.name);
    }
}

let user = new User("John");
user.sayHi();
```

A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error. The notation here is not to be confused with object literals. Within the class, no commas are required. 





#### What is a class?

In JS, a class is a kind of function

```js
class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}

alert(typeof User);		// function
```

What `class User {...}` construct really does is: 

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method
2. Stores class methods, such as `sayHi`, in `User.prototype`

After `new User` object is created, when we call its method, it's taken from the prototype, just like `F.prototype`

```js
alert(User === User.prototype.constructor);		// true
alert(User.prototype.sayHi);	// the code of the sayHi method
alert(Object.getOwnPropertyNames(User.prototype));	// constructor, sayHi
```



#### Not just a syntactic sugar

There are important differences between `class` and `function` with `prototype`:

1. A function created by `class` is labelled by a special internal property `[[IsClassConstructor]]: true`. So it's not entirely the same as creating it manually. For example, unlike a regular function, it must be called with `new`
2. Class methods are non-enumerable. A class definition sets `enumerable` flag to `false` for all methods in the `prototype`
3. Classes always `use strict`. All code inside the class construct is automatically in strict mode



#### Class expression

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc. 

```js
let User = class {
    sayHi() {
        alert("Hello");
    }
}

let User2 = class MyClass {
    sayHi() {
        alert(MyClass);
    }
};

new User().sayHi();		// works, show MyClass definition

alert(MyClass);		// error, MyClass name isn't visible outside of the class
```



#### Getters / setters

Just like literal objects, classes may include getters / setters, computed properties etc. 

```js
class User {
    constructor(name) {
        this.name = name;
    }
    
    get name() {
        return this._name;
    }
    
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short");
            return;
        }
        this._name = value;
    }
}

let user = new User("John");
alert(user.name);		// John

user = new User("");	// Name is too short
```



#### Computed method names [...]

```js
class User {
    ['say' + 'Hi']() {
        alert("Hello");
    }
}

new User().sayHi();
```



#### Class fields

```js
class User {
    name = "John";

	sayHi() {
        alert(`Hello, ${this.name}`);
    }
}

new User().sayHi();		// Hello, John
```

The important difference of class fields is that they are set on individual objects, not `User.prototype`



#### Making bound methods with class fields

To solve the problem of "losing `this`": 

```js
class Button {
    constructor(value) {
        this.value = value;
    }
    click = () => {
        alert(this.value);
    }
}

let button = new Button("hello");

setTimeout(button.click, 1000);		// hello
```

The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. That's especially useful in browser environment, for event listeners. 





### 9.2 Class inheritance

#### The "extends" keyword

For example: 

```js
class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        alert(`${this.name} stands still.`);
    }
}

class Rabbit extends Animal {
    hide() {
        alert(`${this.name} hides!`);
    }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5);		// White Rabbit run with speed 5.
rabbit.hide();		// White Rabbit hides!
```

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`

Class syntax allows to specify not just a class, but any expression after `extends`



#### Overriding a method

Classes provide `"super"` keyword to call the parent method

* `super.method(...)` to call a parent method
* `super(...)` to call a parent constructor (inside child constructor only)

For example:

```js
class Rabbit extends Animal {
    stop() {
        super.stop();
        this.hide();
    }
}
```

However, arrow functions have no `super`. If accessed, it's taken from the outer function. 



#### Overriding constructor

According to the specification, if a class extends another class and has no `constructor`, then the following "empty" constructor is generated:

```js
class Rabbit extends Animal {
    constructor(...args) {
        super(...args);
    }
}
```

Constructors in inheriting classes must call `super(...)`, and do it before using `this`. In JS, a derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That label affects its behavior with `new`:

* When a regular function is executed with `new`, it creates an empty object and assigns it to `this`
* But when a derived constructor runs, it expects the parent constructor to do this job

For example:

```js
class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }
}
```

Thus parent constructor always uses its own field value, not the overridden one. However, it will use the overridden method. 



#### [[HomeObject]]

When a function is specified as a class or object method, its `[[HomeObject]]` property becomes that object. `super` uses it to resolve the parent prototype and its methods. For example: 

```js
let animal = {
    name: "Animal",
    eat() {
        alert(`${this.name} eats`);
    }
};

let rabbit = {
    __proto__: animal,
    name: "Rabbit", 
    eat() {
        super.eat();	// rabbit.eat.[[HomeObject]] == rabbit
    }
};

let longEar = {
    __proto__: rabbit,
    name: "Long Ear",
    eat() {
        super.eat();	// longEar.eat.[[HomeObject]] == longEar
    }
}

longEar.eat();			// Long Ear eats
```



#### Methods, not function properties

For objects, methods must be specified exactly as `method()`, not as `"method: function()"`





### 9.3 Static properties and methods

We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called static. For example:

```js
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }
    
    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

let articles = [
    new Article("HTML", new Data(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

alert( articles[0].title );		// CSS
```



#### Static properties

Static properties are also possible



#### Inheritance of static properties and methods

Static properties and methods are inherited using prototypes. `extends` gives the child the `[[Prototype]]` reference to Animal



### 9.4 Private and protected properties and methods

* Public: accessible from anywhere. They comprise the external interface
* Private: accessible only from inside the class. These are for the internal interface
* Protected: accessible only from inside the class and those extending it
  * Protected fields are not implemented in JS on the language level, but in practice they are very convenient, so they are emulated



#### Protecting "waterAmount"

Let's make a simple coffee machine class. Protected properties are usually prefixed with an underscore `_`. That is not enforced on the language level, but there's a well-known convention between programmers that such properties and methods should not be accessed from the outside

```js
class CoffeeMachine {
    _waterAmount = 0;

	set waterAmount(value) {
        if (value < 0) {
            value = 0;
        }
        this._waterAmount = value;
    }

	get waterAmount() {
        return this._waterAmount;
    }

	constructor(power) {
        this.power = power;
        alert( `Created a coffee-machine, power: ${power}` );
    }
}

let coffeeMachine = new CoffeeMachine(100);
// add water
coffeeMachine.waterAmount = -10;	// _waterAmount will become 0, not -10
```



#### Read-only "power"

If you want to make a property, for example `power`, then we only need to make getter, but not the setter. 



#### Private "#waterLimit"

There is a finished JS proposal, almost in the standard, that provides language-level support for private properties and methods. Privates should start with `#`. They are only accessible from inside the class. For instance: 

``` js
class CoffeeMachine {
    #waterLimit = 200;
    
    #fixWaterAmount (value) {
    	if (value < 0) return 0;
		if (value > this.#waterLimit) return this.#waterLimit;
	}
    
    setWaterAmount(value) {
        this.#waterLimit = this.#fixWaterAmount(value);
    }
}

let coffeeMachine = new CoffeeMachine();

coffeeMachine.#fixWaterAmount(123);		// Error
coffeeMachine.#waterLimit = 1000;		// Error
```

On the language level, `#` is a special sign that the field is private. Private fields do not conflict with public ones. We can have both private `#waterAmount` and public `waterAmount` field at the same time. 







### 9.5 Extending built-in classes

Built-in classes like Array, Map, and others are extendable also. For instance: 

```js
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty());		// false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr);			// 10, 50
alert(filteredArr.isEmtpy());	// false
```

When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JS will use internally to create new entities in `map`, `filter` and so on. If we'd like built-in methods like `map` or `filter` to return regular array, we can return `Array` in `Symbol.species`: 

```js
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
    
    // build-in methods will use this as the constructor
    static get [Symbol.species]() {
        return Array;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty());		// false

let filteredArr = arr.filter(item => item >= 10);

alert(filteredArr.isEmpty());		// Error: filteredArr.isEmpty is not a function
```



#### No static inheritance in built-ins 

Normally, when one class extends another, both static and non-static methods are inherited. But built-in classes are an exception. They don't inherit statics from each other. 





### 9.6 Class checking: "instanceof"

The `instanceof` operator allows to check whether an object belongs to a certain class. It also takes inheritance into account. The syntax is: 

```js
obj instanceof Class
```

For instance: 

```js
class Rabbit {}
let rabbit = new Rabbit();
alert (rabbit instanceof Rabbit);	// true

let arr = [1, 2, 3];
alert ( arr instanceof Array );		// true
alert ( arr instanceof Object );	// true
```

It also works with constructor functions:

```js
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit);	// true
```



The algorithm of `obj instanceof Class` works roughly as follows: 

1. If there's a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we are done. For instance: 

   ```js
   class Animal {
       static [Symbol.hasInstance](obj) {
           if (obj.canEat) return true;
       }
   }
   
   let obj = {canEat: true}
   
   alert(obj instanceof Animal);		// true: Animal[Symbol.hasInstance](obj) is called
   ```

2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceof class` check whether `class.prototype` is equal to one of the prototypes in the `obj` prototype chain 

There is also a method `objA.isPrototypeOf(objB)`, that returns `true` if `objA` is somewhere in the chain of prototypes for `objB`. So the test of `obj instanceof Class` can be rephrased as `Class.prototype.isPrototypeOf(obj)`



#### Symbol.toStringTag

The behavior of Object `toString` can be customized using a special object property `Symbol.toStringTag`. For instance:

````js
let user = {
    [Symbol.toStringTag]: "User"
};

alert ( {}.toString.call(user) );		// [object User]
````

For most environment-specific objects, there is such a property. We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.



### 9.7 Mixins

In JS we can only inherit from a single object. There can be only one `[[Prototype]]` for an object. And a class may extend only one other class. But sometimes that feels limiting. There's a concept that can help here, called "mixins". A mixin is a class containing methods that can be used by other classes without a need to inherit from it. In other words, a mixin provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes



#### A mixin example

The simplest way to implement a mixin in JS is to make an object with useful methods, so that we can easily merge them into a prototype of any class. For instance: 

```js
// mixin
let sayHiMixin = {
    sayHi() {
        alert(`Hello ${this.name}`);
    },
    sayBye() {
        alert(`Bye ${this.name}`);
    }
};

// usage
class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi();	// Hello Dude!
```

There is no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:

```js
class User extends Person {
    // ...
}
Object.assign(User.prototype, sayHiMixin);
```



Mixins can make use of inheritance inside themselves. For instance: 

```js
let sayMixin = {
    say(phrase) {
        alert(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin, 	// or we could use Object.setPrototypeOf to set the prototype here
    
    sayHi() {
        super.say(`Hello ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(User.prototype, sayHiMixin);

new User("Dude").sayHi();		// Hello Dude!
```



#### EventMixin

Now let's make a mixin for real life. An important feature of many browser objects is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object. 

* The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data
* Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call
* And the method `.off(name, handler)` that removes the handler listener

For instance: 

```js
let eventMixin = {
    /**
     * Subscribe to event, usage:
     *  menu.on('select', function(item) { ... })
     */
    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },
    
    /**
     * Cnacel the subscription, usage:
     *  menu.off('select', handler)
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    },
    
    /**
     * Generate an event with the given name and data
     *  this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
        if (!this._eventHandlers?.[eventName]) {
            return;		// no handlers for that event name
        }
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};
```

* `.on(eventName, handler)`: assigns function `handler` to run when the event with that name occurs
* `.off(eventName, handler)`: removes the function from the handlers list
* `.trigger(event, ...args)`: generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`

Usage:

```js
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}

Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection
menu.on("select", value => alert(`Value selected: ${value}`));

// 
menu.choose("123");
```

Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`. And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain. 



## Error handling

### 10.1 Error handling, "try...catch"

#### The syntax

```js
try {
    // code...
} catch (err) {
    // error handling
}
```



* `try...catch` only works for runtime errors 
* `try...catch` works synchronously
  * If an exception happens in "scheduled" code, like in `setTimeout`, then `try...catch` won't catch it



#### Error object

When an error occurs, JS generates an object containing the details about it. The object is then passed as an argument to `catch`. For all built-in errors, the error object has two main properties:

* `name`: Error name. For instance, for an undefined variable that's `"ReferenceError"`
* `message`: Textual message about error details

There are other non-standard properties available in most environments. One of most widely used and supported is:

* `stack`: Current call stack 



#### Throwing our own errors

The `throw` operator generates an error. The syntax is: 

```js
throw <error object>
```

Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it's better to use objects, preferably with `name` and `message` properties. JS has many built-in constructors for standard errors, `Error`, `SyntaxError`, `ReferenceError`, `TypeError` and others. We can use them to create error objects as well. The syntax is:

```js
let error1 = new Error (message);
let error2 = new SyntaxError (message);
let error3 = new ReferenceError (message);

let error = new Error("Things happen")
alert (error.name);		// Error
alert (error.message);	// Things happen
```



Catch should only process errors that it knows and "rethrow" all others



#### try...catch...finally

If `finally` code clause exists, it runs in all cases:

* after `try`, if there were no errors,
* after `catch`, if there were errors

```js
try {
    ... try to execute the code
} catch (err) {
    ... handle errors
} finally {
    ... execute always
}
```

The `finally` clause works for any exit from `try...catch`. That includes an explicit `return`. For instance: 

```js
function func() {
    try {
        return 1;
    } catch(err) {
        /*...*/
    } finally {
        alert("finally");
    }
}

alert( func() );	// first finally, and then 1
```



The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here, but want to be sure that processes that we started are finalized. 



#### Global catch 

What if we want to log the error, show something to the user, etc. when a fatal error outside of `try...catch` occurs. There is no solution in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has `process.on("uncaughtException")` for that. And in the browser we can assign a function to the special `window.onerror` property, that will run in case of an uncaught error. The syntax:

```js
window.onerror = function(message, url, line, col, error) {
    // ...
};
```

* `message`: Error message
* `url`: URL of the script where error happened
* `line`, `col`: Line and column numbers where error happened
* `error`: Error object

For instance: 

```html
<script>
	window.onerror = function(message, url, line, col, error) {
        alert(`${message}\n At ${line}:${col} of ${url}`);
    };
</script>
```







### 10.2 Custom errors, extending error

JS allows to use `throw` with any argument, so technically our custom error classes don't need to inherit from `Error` but it is a better practice to do so. 



#### Extending error

For instance: 

```js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function readUser(json) {
    let user = JSON.parse(json);
    
    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationErro("No field: name");
    }
    
    return user;
}

try {
    let user = readUser('{"age": 25}');
} catch (err) {
    if (err instanceof ValidationError) {
        alert("Invalid data: " + err.message);
    } else if (err instanceof SyntaxError) {
        alert("JSON syntax error: " + err.message);
    } else {
        throw err;	// unknown error, rethrow it
    }
}
```

To make the custom errors shorter: 

```js
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

alert( new PropertyRequiredError("field").name );
```





## Promises, async/await

### 11.1 Introduction: callbacks

A "callback-based" style of asynchronous programming means a function that does something asynchronously should provide a `callback` argument where we put the function to run after it's complete. For instance: 

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/some_script.js", script => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert( _ );		// function declared in the loaded script
});
```



#### Handling errors

An improved version of `loadScript` that tracks loading errors: 

```js
function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
    
    document.head.append(script);
}

loadScript("/my/script.js", function(error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
});
```





### 11.2 Promise

The constructor syntax for a promise object is: 

```js
let promise = new Promise(function(resolve, reject) {
    // executor (the producing code)
});
```

The function passed to `new Promise` is called the executor. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. Its arguments `resolve` and `reject` are callbacks provided by JS itself. Our code is only inside the executor. When the executor obtains the result, be it soon or late, doesn't matter, it should one of these callbacks:

* `resolve(value)`: if the job is finished successfully, with result `value`
* `reject(error)`: if an error has occurred, `error` is the error object

The `promise` object returned by the `new Promise` constructor has these internal properties: 

* `state`: initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called
* `result`: initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called

For instance:

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done"), 1000);
});
```

or

```js
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops")), 1000);
});
```

But there can be only a single result or an error:

```js
let promise = new Promise(function(resolve, reject) {
    resolve("done");
    
    reject(new Error("..."));	// ignored
    setTimeout(() => resolve("..."));	// ignored
})
```



#### Consumers: then, catch, finally

The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the method `.then`/`.catch`/`.finally` for that. A Promise object serves as a link between the executor and the consuming functions, which will receive the result or error. Consuming functions can be registered (substribed) using methods `.then`, `.catch` and `.finally`



#### `then`

The syntax is: 

```js
promise.then(
	function(result) { /* handle a successful result */ },
    function(error) { /* handle an error */ }
);
```

The first argument of `.then` is a function that runs when the promise is resolved, and receives the result. The second argument of `.then` is a function that runs when the promise is rejected, and receives the error. For example:

```js
promise.then(
	result => alert(result),
    error => alert(error)
);
```





#### `catch`

If we are interested only in errors, we can use `null` as the first argument in `then` or use `.catch`: 

```js
promise.catch(alert); // shows for example "Error: Whoops!"
```



#### `finally`

The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled. `finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is. 

The differences between `finally(f)` and `then(f, f)` are:

1. A `finally` handler has no arguments. 
2. A `finally` handler passes through results and errors to the next handler

For instance: 

```js
new Promise((resolve, reject) => {
    /* do something that takes time, and then call resolve/reject */ 
})
    .finally(() => stop loading indicator)
	.then(result => show result, error => show error)
```





### 11.3 Promises chaining

If we have a sequence of asynchronous tasks to be performed one after another, how can we code it well? One solution is promise chaining: 

```js
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function(result) {
    alert(result);		// 1
    return result * 2;
}).then(function(result) {
    alert(result);		// 2
    return result * 2;
}).then(function(result) {
    alert(result);		// 4
    return result * 2;
});
```

Technically we can also add many `.then` to a single promise. This is not chaining. It is just several handlers to one promise. They don't pass the result to each other; instead they process it independently



#### Returning promises

A handler, used in `.then(handler)` may create and return a promise. In that case further handlers wait until it settles, and then get its result. For instance: 

```js
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function(result){
    alert(result);		// 1
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result){
    alert(result);		// 2
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result){
    alert(result);		// 4
});
```



#### Thenables

To be precise, a handler may return not exactly a promise, but a so-called "thenable" object - an arbitrary object that ahas a method `.then`. It will be treated the same way as a promise. 





### 11.4 Error handling with promises

Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice. 



#### Implicit try...catch

The code of a promise executor and promise handlers has an "invisible `"try...catch"` around it. If an exception happens, it gets caught and treated as a rejection. This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler. 

```js
new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Whoops!");
}).catch(alert);
```



#### Rethrowing

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler





### 11.5 Promise API

There are 6 static methods in the `Promise` class



#### Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready. That's what `Promise.all` is for. `Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise. The new promise resolves when all listed promises are resolved, and the array of their results becomes its result. The syntax is:

```js
let promise = Promise.all([...promises...]);
```

For instance: 

```js
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(alert);		// 1,2,3 when promises are ready
```

The order of the resulting array members is the same as in tis source promises. If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error and other promises are ignored.  `Promise.all(iterable)` allows non-promise "regular" values in iterable. 



#### Promise.allSettled

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has: 

* `{status:"fulfilled", value:result}` for successful responses
* `{status:"rejected", reason:error}` for error

We can use `Promise.allSettled` to get the results of all given promises, even if some of them reject. 



#### Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result. The promise might be the fastest or the one that get ran first, so it become the result. After the first settled promise "wins the race", all further results / errors are ignored.



#### Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with `AggregateError` - a special error object that stores all promise errors in its `errors` property. 



#### Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax makes them somewhat obsolete. 



##### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`



##### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error` 



### 11.6 Promisification

"Promisification" is the conversion of a function that accepts a callback into a function that returns a promise. Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them. For example, the following callback style function

```js
function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
    
    document.head.append(script);
}
```

After promisify it: 

```js
let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err);
            else resolve(script);
        });
    });
};
```



A more general way to promisify functions with a helper function `promisift(f)`. It accepts a to-promisift function `f` and returns a wrapper function

```js
function promisify(f) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject (err);
                } else {
                    resolve (result);
                }
            }
            
            args.push(callback);
            
            f.call(this, ...args);
        })
    }
}

// usage: 
let loadScriptPromise = promisify(loadScript);
```





### 11.7 Microtasks

Promise handlers `.then`, `.catch`, `.finally`  are always asynchronous. Even when a Promise is immediately resolved, the code on the line below them will still execute before these handlers. 



#### Microtasks queue

Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue". 

* The queue is first-in-first-out: tasks enqueued first are run first
* Execution of a task is initiated only when nothing else is running

What if the order matters for us? Just put it into the queue with `.then`

#### Unhandled rejection
An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue. Normally, if we expect an error, we add `.catch` to the promise chain to handle it. But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event: 
```js
let promise = Promise.reject(new Error("Promise Failed!"));

window.addEventListener("unhandledrejection", event => alert(event.reason));
```

If we handle the error later, the event will still be triggered. When the microtask queue is complete, the engine examines promises and, if any of them is in the "rejected" state, then the event triggers. 


### 11.8 Async/await
There is a special syntax to work with promises in a more comfortable fashion, called "async/await". It's surprisingly easy to understand and use.

#### Async functions
The word "async" before a function means one simple thing: a function always return a promise. Other values are wrapped in a resolved promise automatically. 

#### Await
The syntax: 
```js
let value = await promise;
```

The keyword `await` makes JS wait until that promise settles and returns its result. For instance: 
```js
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 1000)
    });

    let result = await promise;

    alert(result);  // done
}

f();
``` 

The function execution "pauses" at the line with `await` and resumes when the promise settles, with `result` becoming its result. 

If we try to use `await` in a non-async function, there would be a syntax error. Thus it can't be used in top-level code. But we can do the following: 
```js
(async () => {
    let response = await fetch("/article/user.json");
    let user = await response.json();
})();
```

`await` also accept "thenable" objects. 

#### Error handling
If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, jsut as if there were a `throw` statement at that line. 

#### `async/await` works well with `Promise.all`
For instance: 
```js
let results = await Promise.all([
    fetch(url1),
    fetch(url2),
    ...
]);
```

## Generators, advanced iteration 

### 12.1 Generators
Regular functions return only one, single value (or nothing). Generators can return ("yield") multiple values, one after another, on-demand. They work great with iterables

#### Generator functions
Its special syntax: 
```js
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

let generator = generateSequence();
alert(generator);       // [object Generator]

let one = generator.next();
alert(JSON.stringify(one));     // {value: 1, done: false}

let two = generator.next();
alert(JSON.stringify(two));     // {value: 2, done: false}

let three = generator.next();
alert(JSON.stringify(three));   // {value: 3, done: true}

let more = generator.next();
alert(JSON.stringify(more));    // {done: true}
```

#### Generators are iterable
We can loop over their values using `for..of`:
```js
let generator = generateSequence();

for (let value of generator) {
    alert(value);       // 1, then 2
}
```

#### Using generators for iterables
Previously, we created an iterable `range` object that returns values `from..to`. We can use a generator function for iteration by providing it as `Symbol.iterator`: 
```js
let range = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() {  // a shorthand for [Symbol.iterator]: function* ()
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};

alert( [...range] );    // 1,2,3,4,5
```

#### Generator composition
Generator composition is a special feature of generators that allows to transparently "embed" generators in each other. There is a special `yield*` syntax to compose one generator into another. For instance: 
```js
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);
}

let str = '';

for (let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}

alert(str);     // 0..9A..Za..z
```

The `yield*` directive delegates the execution to another generator. This term means that `yield* gen` iterates over the generator `gen` and transparently forwards its yields outside. 

#### `yield` is a two-way street
`yield` not only returns the result to the outside, but also can pass the value inside the generator. To do so, we should call `generator.next(arg)`. That argument becomes the result of `yield`. For instace: 
```js
function* gen() {
    let result = yield "2 + 2 = ?`;

    alert(result);      // 4
}

let generator = gen();

let question = generator.next().value;  // <-- yield returns the value 

generator.next(4);      // --> pass the result into the generator
```

1. The first call `generator.next()` should be always made without an argument (the argument is ignored is passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution
2. Then, the result of `yield` gets into the `question` variable in the calling code
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`


#### generator.throw
The outer code may pass an error into the generator with the call `generator.throw(err)`. In that case, the `err` is thrown in the line with the `yield`. 

#### generator.return
`generator.return(value)` finishes the generator execution and return the given `value`:
```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

const g = gen();

g.next();           // { value: 1, done: false }
g.return("foo");    // { value: "foo", done: true }
g.next();           // { value: undefined, done: true }
```

### 12.2 Async iteration and generators

#### Async iterables
To make an object iterable asynchronously: 
1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`
2. The `next()` method should return a promise
    * The `async` keyword handles it, we can simply make `async next()`
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop

For instance: 
```js
let range = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() {
        return {
            current: this.from
            last: this.to,

            async next() {
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

(async () => {
    for await (let value of range) {
        alert(value);
    }
})()        // 1,2,3,4,5
```

However, features that require regular, synchronous iterators, don't work with asynchronous ones. For instance, a spread syntax won't work: `alert( [...range] );`


#### Async generators
For most practical applicatioins, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator. 

```js
async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        yield i;
    }
}

(async () => {
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
        alert(value);       // 1, 2, 3, 4, 5
    }
})();
```

## Modles

### 13.1 Modules, introduction

#### What is a module?
A module is just a file. One script is one module. Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one. For instance:

```js
// in file sayHi.js
export function sayHi(user) {
    alert(`Hello, ${user}!`);
}
```

```js
// in file main.js
import {sayHi} from './sayHi.js';

alert(sayHi);       // function...
sayHi("John");      // Hello, John!
```

Modules work only via HTTP(s), not locally. 


#### Core module features

* Always "use strict"
    * Modules always work in strict mode
* Module-level scope
    * Each module has its own top-level scope. 
* A module code is evaluated only the first time when imported
    * If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers. 
    * Such behavior allows us to configure modules. Here's the classical pattern
        1. A module exports some means of configuration, e.g. a configuration object
        2. On the first import we initialize it, write to its properties. The top-level application script may do that. 
        3. Further imports use the module
* import.meta
    * The object `import.meta` contains the information about the current module. Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML
* In a module, "this" is undefined
    * In a non-module scripts, `this` is a global object

#### Browser-specific features
There are also several browser-specific differences of scripts with `type="module"` compared to regular ones.

* Module scripts are deferred
    * Module scripts are always deferred, same effect as `defer` attribute
    * Thus downloading external module scripts `<script type="module" src="...">` does not block HTML processing
    * Module scripts wait until the HTML document is fully read, and then run
    * Relative order of scripts is maintained: scripts that go first in the document, execute first
* Async works on inline scripts
    * For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document
    * For module scripts, it works on inline scripts as well
    * For example: 
    ``` html
    <script async type="module">
        import {counter} from "./analytics.js";
        counter.count();
    </script>
    ```
* External scripts that have `type="module"` are different in two aspects: 
    1. External scripts with the same `src` run only once
    2. External scripts that are fetched from another origin require CORS headers
* No "bare" modules allowed
    * In the browser, `import` must get either a relative or absolute URL. Modules without any path are called "bare" modules. Such modules are not allowed in "import" 
* Old browsers do not understand `type="module"`. For them, it's possible to provide a fallback using the `nomodule` attribute
    ```html
    <script type="module">
        alert("Runs in modern browsers");
    </script>

    <script nomodule>
        alert("Modern browsers ignore this");
        alert("Old browsers execute this.");
    </script>
    ```


### 13.2 Export and import
Export and import directives have several syntax variants. 

#### Export before declarations
We can label any declaration as exported by placing `export` before it, be it a variable, function or a class. 

```js
export let months = ['Jan', 'Feb', 'Mar'];

export const MODUELS_BECAME_STANDARD_YEAR = 2015;

export class User {
    constructor(name) {
        this.name = name;
    }
}
```

Note that there is no semicolons after export class / function. The `export` before a class or a function does not make it a function expression. It's still a function declaration. Most JS style guides don't recommend semicolons after function and class declarations. 

#### Export apart from declarations
We can also put `export` separately. 

```js
function sayHi(user) {
    alert(`Hello, ${user}!`);
}

function sayBye(user) {
    alert(`Bye, ${user}!`);
}

export { sayHi, sayBye };
```

#### import *
We can import everything as an object using `import * as <obj>`: 

```js
import * as say from '.say.js';

say.sayHi("John");
say.sayBye("John");
```

#### import as

```js
import { sayHi as hi, sayBye as bye } from './say.js';
```

#### export as 

```js
export { sayHi as hi, sayBye as bye };
```

#### Export default
There are modules that declare a single entity, e.g. a module `user.js` exports only `class User`. This approach is preferred, so that every "thing" resides in its own module. Modules provide a special `export default` syntax to make the "one thing per module" way look better.

```js
// In user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// In main.js
import User from './user.js';   // Not {User}

new User('John');
```

As there may be at most one default export per file, the exported entity may have no name. 

#### The "default" name
In some situations the `default` keyword is used to reference the default export. For example: 

```js
function sayHi(user) {
    alert(`Hello, ${user}!`);
}

export {sayHi as default};
```

or
```js
import * as user from './user.js';

let User = user.default;
new User('John');
```

#### A word against default exports
Named exports are explicit. They exactly name what they import, so we have that information from them. For a default export, we always choose the name when importing:
```js
import User from './user.js';
import MyUser from './user.js';
```

#### Re-export
"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this: 

```js
export {sayHi} from './say.js';

export {default as User} from './user.js';
```

#### Re-exporting the default export 
The default export needs separate handling when re-exporting. We can do it in two following way: 

1. `export {default as User} from './user.js'` will re-export the default export
2. `export * from './user.js'` will re-exports only named exports, but ignores the default one. 

If we'd like to re-export both named and the default export, then two statements are needed.




### 13.3 Dynamic imports
Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict. First, we can't dynamically generate any parameters of `import`. Second, we can't import conditionally or at run-time. 

#### The import() expression
The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code. For instance: 

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
    .then(obj => <module object>)
    .catch(err => <loading error, e.g. if no such module>)
```

or
```js
let { hi, bye } = await import('./say.js');
```

or if `say.js` has the default export: 
```js 
let obj = await import('./say.js');
let say = obj.default;

say();
```

Dynamic imports work in regular scripts, they don't require `script type="module"`. Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`). 


## Miscullaneous

### 14.1 Proxy and Reflect
A `Proxy` object wraps another object and intercepts operations, like reading/writing properties and others, optionally handling them on its own, or transparently allowing the object to handle them. Proxies are used in many libraries and some browser frameworks. 

#### Proxy
The syntax: 
```js
let proxy = new Proxy(target, handler)
```

* `target` is an object to wrap
* `handler` is proxy configuration. An object with "traps", methods that intercept operations, e.g. `get` trap for reading a property, `set` trap for writign a property. 

For every internal method of objects, there is a Proxy trap for it: The name of the method that we can add to the `handler` parameter of `new Proxy` to intercept the operation

#### Default value with "get" trap
The most common tarps are for reading/writing properties. To intercept reading, the `handler` should have a method `get(target, property, receiver)`. It triggers when a property is read, with following arguments:
* `target` is the target object, the one passed as the fiorst argument to `new Proxy`
* `property` is the property name
* `receiver`: if the target property is a getter, then `receiver` is the object that's going to be used as `this` in its call. Usually that is the `proxy` object itself. 

For instance: 
```js
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0;
        }
    }
});

alert( numbers[1] );    // 1
alert( numbers[123] );  // 0 (no such item)
```

#### Validation with "set" trap
The `set` trap triggers when a property is written: `set（target, property, value, receiver)`: 
* `target` is the target object, the one passed as the first argument to `new Proxy`
* `property` is the property name
* `value` is the property value
* `receiver` is similar to `get` trap, matters only for setter properties

The `set` trap should return `true` if setting is successful, and `false` otherwise (triggers `TypeError`). For instance: 
```js
let numbers = [];

numbers = new Proxy(numbers, {
    set(target, prop, val) {
        if (typeof val == 'number') {
            target[prop] = val;
            return true;
        } else {
            return false; 
        }
    }
});

numbers.push(1);
numbers.push(2);
alert("Length is: " + numbers.length);   // 2

numbers.push("test");   // TypeError

alert("This line is never reached (error in the line above)");
```

Note that the built-in functionality of arrays is still working. 

#### Protected properties with "deleteProperty" 
For example: 
```js
let user = {
    name: "John", 
    _password: "secret",

    checkPassword(value) {
        return value === this._password;
    }
}; 

user = new Proxy(user, {
    get(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        }
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
    },

    set(target, prop, val) {
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        } else {
            target[prop] = val;
            return true;
        }
    },

    deleteProperty(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        } else {
            delete target[prop];
            return true;
        }
    },

    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    },

    getOwnPropertyDescriptor(target, prop) {    // called for every property
        return {
            enumerable: !prop.startsWith('_'),
            configurable: !prop.startsWith('_')
            /* ...other flags, probable "value:..." */
        };
    }
});
```

A call to `user.checkPassword()` gets proxied `user` as `this` (the object before dot becomes `this`), so when it tries to access `this._passsword`, the `get` trap activates (it triggers on any property read) and throws an error. So we bind the context of object methods to the original object, `target`. Then their future calls will use `target` as `this`, without any trap. That solution usually works, but isn't ideal. So, such a proxy shouldn't be used everywhere. 


#### "In range" with "has" trap
We have a range object: 
```js
let range = {
    start: 1,
    end: 10
};
```

We'd like to use the `in` operator to check that a number is in `range`. The `has` trap intercepts `in` calls: `has(target, property)`
* `target` is the target object, passed as the first argument to `new Proxy`
* `property` is the property name

```js
range = new Proxy(range, {
    has(target, prop) {
        return prop >= target.start && prop <= target.end;
    }
});

alert(5 in range);      // true
alert(50 in range);     // false
```

#### Wrapping functions: "apply" 
We can wrap a proxy around a function as well. The `apply(target, thisArg, args)` trap handles calling a proxy as function. For instance: 
```js
function delay(f, ms) {
    return new Proxy(f, {
        apply(target, thisArg, args) {
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    });
}
```

#### Reflect
`Reflect` is a built-in object that simplifies creation of `Proxy`. The internal methods, such as `[[Get]]`, `[[Set]]` and others are specification-only, they can't be called directly. The `Reflect` object makes that somewhat possible. Its methods are minimal wrappers around the internal methods. 

```js
let user = {};

Reflect.set(user, "name", "John");

alert(user.name);   // John
```

For every internal method, trappable by `Proxy`, there is a corresponding method in `Reflect`, with the same name and arguments as the `Proxy` trap. 
```js
let user = {
    name: "John", 
};

user = new Proxy(user, {
    get(target, prop, receiver) {
        alert(`GET ${prop}`);
        return Reflect.get(target, prop, receiver);
    },

    set(target, prop, val, receiver) {
        alert(`SET ${prop}=${val}`);
        return Reflect.set(target, prop, val, receiver);
    }
});

let name = user.name;   // shows "GET name"
user.name = "Pete";     // shows "SET name=Pete"
```

If a trap wants to forward the call to the object, it's enough to call `Reflect.<method>` with the same arguments. 

#### Proxy limitations

* Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called "internal slots". These are like properties, but reserved for internal, specification-only purpose. `Proxy` can't intercept that. To get around it: 
    ```js
    let map = new Map();

    let proxy = new Proxy(map, {
        get(target, prop, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value == "function" ? value.bind(target) : value;
        }
    });

    proxy.set("test", 1);
    alert(proxy.get("test"));
    ```
* A similar thing happens with private class fields. The reason is that private fields are implemented using internal slots. JS does not use `[[Get]]/[[Set]]` when accessing them. 

#### Revocable proxies
A revocable proxy is a proxy that can be disabled. Such a proxy will forward operations to object, and we can disable it at any moment. For instance: 
```js
let revokes = new WeakMap();

let object = {
    data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

revoke = revokes.get(proxy);
revoke();

alert(proxy.data);  // Error (revoked)
```

We use `WeakMap` instead of `Map` here because it won't block garbage collection. 


### 14.2 Eval: run a code string
The built-in `eval` function allows to execute a string of code. The syntax is:
```js
let result = eval(code);
```

The eval'ed code is executed in the current lexical environment, so it can see outer variables. It can change outer variables as well. In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are no visible outside. 

In modern programming `eval` is used very sparingly. A better way to use `eval`:

* If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`
* If eavl'ed code needs local variables, change `eval` to `new Function` and pass them as arguments. 
  ```js
  let f = new Function('a', 'alert(a)');

  f(5);
  ```


### 14.3 Currying
Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`. Currying doesn't call a function. It just transforms it. 

Advanced implementations of currying, such as `_.curry` from lodash library, return a wrapper that allows a function to be called both normally and partially. 
```js
function sum(a, b) {
    return a + b;
}

let curriedSum = _.curry(sum);

alert( curriedSum(1, 2) );      // 3
alert( curriedSum(1)(2) );      // 3
```

#### What for?
For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information: 
```js
function log(date, importance, message) {
    alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

log = _.curry(log);
```

Then we can create convenience functions for current logs: 
```js
let logNow = log(new Date());

let debugNow = logNow("DEBUG");

debugNow("message");
```

#### Advanced curry implementation

```js
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}
```


### 14.4 Reference type

#### Reference type explained
Looking closely, we may notice two operations in `obj.method` statement: 
1. First, the dot `.` retrieves the property `obj.method()`.
2. Then parenthese `()` execute it.

The `.` returns not a function, but a value of the special Reference Type. The Reference Type is a "specification type". We can't explicitly use it, but it is used internally by the language. The value of Reference Type is a three-value combination `(base, name, strict)`, where:
* `base` is the object
* `name` is the property name
* `strict` is true if `use strict` is in effect

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this`. Reference type is a special "intermediary" internal type, with the purpose to pass information from dot `.` to calling parentheses `()`. 

Any other operation like assignment `fun = obj.method` discards the reference type as a whole, takes the value of `obj.method` and passes it on. So any further operation "loses" `this`.


### 14.5 BigInt
`BigInt` is a special numberic tpye that provides support for integers of arbitrary length. A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.

For instance: 
```js
const bigint = 12345678901234567890234567890n;
const sameBigint = BigInt("123456789012345678901234567890");
const bigintFromNumber = BigInt(10);

alert(1n + 2n);     // 3
alert(5n / 2n);     // 2
alert(1n + 2);      // Error: Cannot mix BigInt and other types
alert( +bigint );   // Error: the unary plus is not supported on bigints

alert(2n > 1n);     // true
alert(2n > 1);      // true
alert(1 == 1n);     // true
alert(1 === 1n);    // false

if (0n) {
    // never executes
}
```

#### Polyfills
Polyfilling bigints is tricky. It is cumbersome and would cost a lot of performance. The other way around is proposed by the developers of JSBI library. This library implements big numbers uing its own methods. We can use them instead of native bigints. For example: 
```js
a = JSBI.BigInt(789);
b = JSBI.BigInt(456);
c = JSBI.add(a, b);
d = JSBI.subtract(a, b);
```

Then the polyfill plygin will convert JSBI calls to native bigints for those browsers that support them. 



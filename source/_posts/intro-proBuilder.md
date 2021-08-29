---
title: Introduction to ProBuilder Programming
date: 2020-12-03
mathjax: true
tags: [Misc, Programming]
---

ProBuild is a BASIC-type programming language that allows you to create personalized technical indicators, trading systems and market scannign programs for the ProRealTime platform.

This article gives a simple introduction to ProBuilder Programming

<!-- more -->


ProBuilder evaluates the data of each price bar starting with the oldest one to the most recent one, and then executes the formula developed in the language in order to determine the value of the indicators on the current bar.

##### Add new indicator

* Click on "New indicator" to access the programming window. You can choose between:
  * Programming directly an indicator in the text zone designed for writing code
  * Using the help function by clicking on "Insert Function". This will open a new window in which you can find all the functions available



##### Specificities of ProBuilder programming language

* The main ideas to know in the ProBuilder language are:
  * It is not necessary to declare variables
  * It is not necessary to type variables
  * There is no difference between capital letters and small letters
  * We use the same symbol "=" for mathematic equality and to attribute a value to a variable
* Financial constants
  * Price and volume constants adapted to the timeframe of the chart
    * `Open`: Opening price of each bar
    * `High`: Highest price of each bar
    * `Low`: Lowest price of each bar
    * `Close`: Closing price of each bar
    * `Volume`: The number of securities or contracts exchanged at each bar
  * If you want to use the information of previous bars rather than the current bar, you just need to add between square brackets the number of bars that you want to go back into the past. This rule is valid for any constant. For example:
    * Value of the closing price of the current bar: `Close`
    * Value of the closing price preceding the current bar: `Close[1]`
    * Value of the closing price preceding the *nth* bar preceding the current one: `Close[n]`
* Daily price constants
  * Contrary to the constants adapted to the time frame of the chart, the daily price constants refer to the value of the day, regardless the timeframe of the chart
  * The daily price constants use brackets and not square  brackets to call the values of previous bars
    * `DOpen(n)`: Opening price of the *nth* day before the one of the current bar
    * `DHigh(n)`: Highest price of the *nth* day before the one of the current bar
    * `DLow(n)`: Lowest price of the *nth* day before the one of the current bar
    * `DClose(n)`: Closing price of the *nth* day before the one of the current bar
  * If "n" is equal to 0, "n" references the current day. As the maximum and minimum values are not defined for $n=0$, we obtain a result for previous days but not for the current day
* Temporal constants
  * `Date`: indicates the date of the close of each bar in the format YearMonthDay (YYYYMMDD)
  * Temporal constants are considered as whole numbers
  * `Time`: indicates the hour of the closing price of each bar in the format HourMinuteSecond (HHMMSS)
  * `Minute`: Minute of the close of each bar (from 0 to 59): Only for intraday charts
  * `Hour`: Hour of the close of each bar (from 0 to 23): Only for intraday charts.
  * `Day`: Day of the months of the closing price of each bar (from 1 to 28 or 29 or 30 or 31)
  * `Month`: Month of the closing price of each bar (from 1 to 12)
  * `Year`: Year of the closing price of each bar
  * `DayOfWeek`: Day of the Week of the close of each bar (does not use weekend days) (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday)
  * `Time` indicates the closing time of each bar
  * `CurrentTime` indicates the current market time
  * `Days`: Counter of days since 1900
  * `BarIndex`: Counter of bars since the beginning of the displayed historical data
  * `IntradayBarIndex`: Counter of intraday bars
* Constants derived from price
  * `Range`: difference between High and Low
  * `TypicalPrice`: average between High, Low and Close
  * `WeightedClose`: weighted average of High (weight 1), Low (weight 1) and Close (weight 2)
  * `MedianPrice`: average between High and Low
  * `TotalPrice`: average between Open, High, Low and Close
* The undefined constant
  * `Undefined`: undefined data (equivalent to an empty box)



##### How to use pre-existing indicators?

```` 
NameOfFunction [calculated over n periods] (applied to which price or indicator)
````

For example: 

* Calculating the exponential moving average over 20 periods applied to the closing price:

  ```` 
  RETURN ExponentialAverage[20](Close)
  ````

* Calculating the weighted moving average over 20 bars applied to the typical price:

  ````
  mm = WeightedAverage[20](TypicalPrice)
  RETURN mm
  ````

  

##### Control Structures

* IF conditions

  ````
  IF condition1 THEN
  	procedure1
  ELSIF condition2 THEN
  	procedure2
  ELSE
  	procedure3
  ENDIF
  ````

* FOR loop

  ````
  FOR (Variable = BeginningValueOfTheSeries) TO EndingValueOfTheSeries DO
  	(Action)
  NEXT
  
  FOR (Variable = EndingValueOfTheSeries) DOWNTO BeginningValueOfTheSeries DO
  	(Action)
  NEXT
  ````

* WHILE loop

  ````
  WHILE (Condition) DO
  	(Action 1)
  WEND
  
  ````

* `BREAK` can be used to stop the loop and `CONTINUE` can be used to jump to next loop

* `ONCE`: The `ONCE` instruction is used to initialize a variable at a certain value "only ONE time" for the whole program
  * A variable without `ONCE` has scope in each run
  * A variable with `ONCE` has global scope



##### Logical operators

* `NOT(a)`: logical NO
* `a OR b`: logical OR
* `a AND b`: logical AND
* `a XOR b`: exclusive OR



##### Mathematical Functions

* `MIN(a, b)`: calculate the minimum of `a` and `b`

* `MAX(a, b)`: calculate the maximum of `a` and `b`

* `ROUND(a)`: round `a` to the nearest whole number

* `ABS(a)`: calculate the absolute value of `a`

* `SGN(a)`: shows the sign of `a` (1 if positive, -1 if negative)

* `SQUARE(a)`: calculate `a` squared

* `SQRT(a)`: calculate the square root of `a`

* `LOG(a)`: calculate the Neperian logarithm of `a`

* `EXP(a)`: calculate the exponent of `a`

* `COS(a)`: calculate the cosine of `a`

* `SIN(a)`: calculate the sine of `a`

* `TAN(a)`: calculate the tangent of `a`

* `ATAN(a)`: calculate the arc-tangent of `a`

  

##### Charting comparison functions

* `a CROSSES OVER b`: the `a` curve crosses over the `b`  curve
* `a CROSSES UNDER b`: the `a` curve crosses under the `b` curve



##### Summation functions

* `cumsum`: Calculates the sum of a price or indicator over all bars loaded on the chart

  ````
  cumsum (price or indicator)
  ````

* `summation`: Calculates the sum of a price or indicator over the last n bars

  ````
  summation[number of bars]((price or indicator)
  ````

  

##### Statistical functions

* `lowest`: displays the lowest value of the price or indicator written between brackets, over the number of periods defined
* `highest`: displays the highest value of the price or indicator written between brackets, over the number
  of periods defined
* `STD`: displays the standard deviation of a price or indicator, over the number of periods defined
* `STE`: displays the standard error of a price or indicator, over the number of periods defined



##### ProBuilder instructions

* `RETURN`: displays the result

* `CustomClose`: displays a customizable price value; by default, this price is `Close`

* `CALL`: calls another `ProBuilder` indicator to use in your current program. The quickest method is to click “Insert Function” then select the "User Indicators"  category and then select the name of the indicator you want to use and click "Add

  ````
  myHistoMACD = CALL HistoMACD
  ````

* `AS`: names the result displayed

  ````
  RETURN Result1 AS "Curve Name", Result2 AS "Curve Name"
  ````

* `COLOURED`: colours the displayed curve in with the colour of your choice

  ````
  RETURN Indicator COLOURED(Red, Green, Blue) AS "Name Of The Curve"
  ````

* `REM` or `//`: One line comment



##### Drawing instructions

* BACKGROUNDCOLOR : Lets you color the background of the chart or specific bars (such as odd/even days) The colored zone starts halfway between the previous bar and the next bar

  ````
  BACKGROUNDCOLOR (0, 127, 255, 25)
  ````

* DRAWBARCHART : Draws a custom bar on the chart. Open, high, low and close can be constants or variables

  ````
  DRAWBARCHART (open, high, low, close) COLOURED (0, 255, 0)
  ````

* DRAWCANDLE : Draws a custom candlestick on the chart. Open, high, low and close can be constants or
  variables

  ````
  DRAWCANDLE (open, high, low, close) COLOURED (0, 255, 0)
  ````

* DRAWARROW : Draws an arrow pointing right. You need to define a point for the arrow (x and y axis). You
  can also choose a colour

  ````
  DRAWARROW (x1, y1) COLOURED (R, V, B, a)
  ````

  * DRAWARROWUP : Draws an arrow pointing up
  * DRAWARROWDOWN : Draws an arrow pointing down

* DRAWRECTANGLE : Draws a rectangle on the chart

  ````
  DRAWRECTANGLE (x1, y1, x2, y2) COLOURED (R, V, B, a)
  ````

* DRAWELLIPSE : Draws an ellipse on the chart

  ````
  DRAWELLIPSE (x1, y1, x2, y2) COLOURED (R, V, B, a)
  ````

* DRAWSEGMENT : Draws a segment on the chart

  ````
  DRAWSEGMENT (x1, y1, x2, y2) COLOURED (R, V, B, a)
  ````

* DRAWTEXT : Adds a text field to the chart with the text of your choice at a specified location

  ````
  DRAWTEXT ("your text", x1, y1) COLOURED (R, V, B, a)
  ````

  
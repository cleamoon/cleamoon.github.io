# An interesting question about pigeonhole principle



I found an interesting question about pigeonhole principle. The question describe a condition: there are $100$ flowerpots, four people will have to water 30 pots, $75$ pots, $80$ pots, and $90$ pots of them respectively. The question is what is the maximum number of the flowerpots that have only been watered exactly once? There is a solution of this problem on Internet but it has caused some controversy so I will discuss the solution in greater detail. 



Here I present two solutions. 



## Solution 1

The total number of watered flowerpots are $30+75+80+90=275>100$. So we first choose to water all flowerpots once. There will be $175$ times left. If we want to maximize the number of flowerpots that have been watered once, we need to distribute these left watering to four people evenly so that we can let all of them water the same pots. 



$45+50+60 = 155$

$155-70=85$

$85/2=42.5\approx 43$

$70-43=27$



## Solution 2

30: 30W + 30W + 30 W + 30W

45: 42W + 43W + 45W

25: 18W + 7W

---------------------------------

90W + 80W + 75W + 30W

Optimal: 18W + 7W + 45W - max(42W, 43W) = 27W
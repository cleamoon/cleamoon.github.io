---
title: Solving Wordle 
date: 2022-01-14 16:54:15
tags: [game, programming]
---


Wordle is a popular word puzzle [developed by Josh Wardle](https://www.cnet.com/how-to/wordle-explained-tips-tricks-the-perfect-start-word-everything-you-need-to-know/). The basic idea is to guess a given five letters' word within six tries. After each guess, the letters are marked to show if each letter is correct or is correct and in correct position. You can find one [here](https://www.powerlanguage.co.uk/wordle/).

Here I present a half-manual simple solution to it. 

<!-- more -->

According to [Samuel Morse](https://www.lexico.com/explore/which-letters-are-used-most), the letters ordered by its usage frequency is: E, T, A, I, N, O, S, H, R, D, L, U, C, M, F, W, Y, G, P, B, V, K, Q, J, X, Z. We can use the following program to choose 4 five-letters' words that cover 20 of most frequently used letters:

```python
def feasible(word):
    return len(word) == 5 and word.isalpha() and len(word) == len(word.encode()) and len(set(list(word))) == 5

with open('/usr/share/dict/words', 'r') as dict:
    distinctWords = [w.lower() for w in list(filter(lambda word: feasible(word), dict.read().lower().splitlines()))]
    lessOftenLetters = ["v", "k", "q", "j", "x", "z"]
    words = list(filter(lambda word: len(set(list(word) + lessOftenLetters)) == len(lessOftenLetters) + 5, distinctWords))
    for w1 in words:
        if len(set(list(w1))) != 5:
            continue
        for w2 in words:
            if len(set(list(w1 + w2))) != 10:
                continue
            for w3 in words:
                if len(set(list(w1 + w2 + w3))) != 15:
                    continue
                for w4 in words:
                    if len(set(list(w1 + w2 + w3 + w4))) != 20:
                        continue
                    print(w1 + " " + w2 + " " + w3 + " " + w4)
```

I picked `cubit`, `dwarf`, `gnome`, and `sylph`. With these four words, we can get some information about correct letters. Then we can use the following python program to get a list of possible solution:

```python
with open('/usr/share/dict/words', 'r') as dict:
    print("Please input the correct letters without space:")
    inputLetters = list(set([l.lower() for l in list(input())]))
    availableLetters = inputLetters + ["v", "k", "q", "j", "x", "z"]
    feasibleWords = list(filter(lambda word: len(word) == 5 and word.isalpha(), dict.read().lower().splitlines()))
    for word in feasibleWords:
        if len(list(filter(lambda letter: letter.lower() not in availableLetters, word))) == 0:
            if len(set(filter(lambda letter: letter.lower() in inputLetters, word))) == len(inputLetters):
                print(word.upper())
```

This program does not consider the correct position of correct letters thus that must be considered by the user herself. The dictionary used in these programs contains a great number of words where many them are hardly ever used. You can use your own dictionary instead of course. 
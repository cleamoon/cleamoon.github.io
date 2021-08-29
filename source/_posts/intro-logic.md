---
title: Introduction to Logic Course Note
date: 2020-10-24
mathjax: true
tags: [Course note, Logic, Mathematics]
---

Note for the course Introduction to Logic of Stanford.

<!-- more -->

##### Usage

* We use the language of Logic to state observations, to define concepts, and to formalize theories
* We use logical reasoning to derive conclusions from these bits of information
* We use logical proof to convince others of our conclusions

##### Types of reasoning

* Deduction: The conclusion must be correct so long as the premises on which they are based are correct. Only deduction guarantees its conclusion in all cases
* Induction: Induction is reasoning from the particular to general. If we see enough cases in which something is true and we never see a case in which it is false, we tend to conclude that it is always true
* Abduction: Abduction is reasoning from effects to possible causes. Many things can cause an observed result. We often tend to infer a cause even when our enumeration of possible causes is incomplete
* Analogy: Reasoning by analogy is reasoning in which we infer a conclusion based on similarity of two situations. 

##### Propositional Resolution

$$
\begin{aligned}
p_1 \land &\dots \land p_k &\Rightarrow\qquad\qquad q_1 \lor &\dots \lor q_l \\
r_1 \land &\dots \land r_m &\Rightarrow\qquad\qquad s_1 \lor &\dots \lor q_n \\
\hline
p_1 \land \dots \land p_k &\land r_1 \land \dots \land r_m &\Rightarrow\ \ q_1 \lor \dots \lor q_l & \lor s_1 \lor \dots \lor q_n
\end{aligned}
$$

* 2 Elaborations
  * If a proposition on the left hand side of one sentence is the same as a proposition on the right hand side of the other sentence, it is okay to drop the two symbols, with the proviso that only one such pair may be dropped
  * If a constant is repeated on the same side of a single sentence, all but one of occurrences can be deleted

##### Type of Logic

* Propositional Logic: The logic of propositions. Symbols in the language represent "conditions" in the world, and complex sentences in the language express interrelationships among these conditions. The primary operators are Boolean connectives, such as *and*, *or*, and *not*
* Relational Logic: Relational Logic expands upon Propositional Logic by providing a means for explicitly talking about individual objects and their interrelationships
* Herbrand Logic: Herbrand Logic describing worlds with infinitely many objects

##### Propositional Logic

* Two types of sentences: simple sentences and compound sentences

  * Simple sentences express simple facts
  * Compound sentences express logical relationships between the simpler sentences
    * Operator (with precedence from highest to lowest)
      * Negation: $(\neg p)$
      * Conjunction: $(p\land q)$
      * Disjunction: $(p\lor q)$
      * Implication: $(p\Rightarrow q)$
      * Biconditional: $(p\Leftrightarrow q)$
    * $\land,\lor$ are left associated, $\Rightarrow,\Leftrightarrow$ are right associated

* Satisfaction

  * A sentence is valid if and only if it satisfies by every truth assignment 
  * A sentence is unsatisfiable if and only if it is not satisfied by any truth assignment
  * A sentence is contingent if and only if there is some truth assignment that satisfies it and some truth assignment that falsifies it

* Logical equivalent: a sentence $\phi$ is logically equivalent to a sentence $\psi$ if and only if every truth assignment that satisfies $\phi$  satisfies $\psi$  and every truth assignment that satisfies $\psi$  satisfies $\phi$

  * Equivalence Theorem: A sentence $\phi$ and a sentence $\psi$ are logically equivalent if and only if the sentence ($\phi \Leftrightarrow \psi$) is valid.
  * Unsatisfiability Theorem: A set $\Delta$ of sentences logically entails a sentence $\phi$ if and only if the set of sentences $\Delta \cup \{\neg\phi\}$ is unsatisfiable

* Logical entail: a sentence $\phi$ logically entails a sentence $\psi$ (written $\phi\vDash\psi$ ) if and only if every truth assignment that satisfies $\phi$ also satisfies $\psi$ 

  * Deduction Theorem: A sentence $\phi$ logically entails a sentence $\psi$ if and only if ($\phi \Rightarrow \psi$) is valid
  * Any unsatisfiable sentence entail everything

* Logical consistency: a sentence $\phi$ is consistent with a sentence $\psi$  if and only if there is a truth assignment that satisfies both $\phi$ and $\psi$ 

  * Consistency Theorem: A sentence $\phi$ is logically consistent with a sentence $\psi$ if and only if the sentence ($\phi\land\psi$ ) is satisfiable

##### Propositional Proofs

* Checking truth tables might not be practical because the number of truth assignments of a language grows exponentially with the number of logical constants

* A schema is an expression satisfying the grammatical rules of our language except for the occurrence of metavariables in place of various subparts of the expression. For example, the following expression is a schema with metavariables $\varphi$ and $\psi$:  $\varphi\Rightarrow\psi$ 

* A rule of inference is a pattern of reasoning consisting of some schemas, called premises, and one or more additional schemas, called conclusions. An example is showed below. The schemas above the line are the premise, and the schemas below the line are the conclusions. 

  * Implication Elimination (or IE). This rule eliminates the implication from the first premise

  $$
  \begin{aligned}
  &\varphi\Rightarrow\psi\\
  &\varphi\\
  \hline
  &\psi
  \end{aligned}
  $$

  * Implication Creation (IC). This rule tells us that if a sentence $\psi$ is true, we can infer ($\varphi\Rightarrow\psi$) for any $\varphi$ whatsoever

  $$
  \begin{aligned}
  &\psi\\
  \hline
  &\varphi\Rightarrow\psi
  \end{aligned}
  $$

  * Implication Distribution (ID). This rule tells us that implication can be distributed over other implications

  $$
  \begin{aligned}
  &\varphi\Rightarrow(\psi\Rightarrow\chi)\\
  \hline
  &(\varphi\Rightarrow\chi)\Rightarrow(\varphi\Rightarrow\chi)
  \end{aligned}
  $$

* An instance of a rules of inference is the rule obtained by consistently substituting sentences for the metavariables in the rule. If a metavariable occurs more than once, the same expression must be used for every occurrence

  * An instance of Implication Elimination

    $$
    \begin{aligned}
    &p\Rightarrow q\\
    &p\\
    \hline
    &q
    \end{aligned}
    $$

* A rule applies to a set of sentences if and only if there is an instance of the rule in which all of the premises are in the set. In this case, the conclusions of the instance are the results of the rule application

* In using  rules of inference, it is important to remember that they apply only to top-level sentences, not to components of sentences. The following conclusion is an example of wrong inferencing

  $$
  \begin{aligned}
  p\Rightarrow q \\
  p\Rightarrow r \\
  \hline
  q\Rightarrow r
  \end{aligned}
  $$

* A linear proof of a conclusion from a set of premises is a sequence of sentences terminating in the conclusion in which each item is either (1) a premise, (2) an instance of an axiom schema, or (3) the result of applying a rule of inference to earlier items in sequence

  * An example:
    1. $p$                                         Premise
    2. $p\Rightarrow q$                                Premise
    3. $(p\Rightarrow q) \Rightarrow (q\Rightarrow r) $      Premise
    4. $q$                                          Implication Elimination: 2, 1
    5. $q\Rightarrow r$                                 Implication Elimination: 3, 2
    6. $r$                                          Implication Elimination: 5, 4
  * Another example:
    1. $p\Rightarrow q$                                Premise
    2. $q\Rightarrow r$                                Premise
    3. $p\Rightarrow (q\Rightarrow r)$                   Implication Creation: 2
    4. $(p\Rightarrow q) \Rightarrow (p\Rightarrow r)$      Implication Distribution: 3
    5. $p\Rightarrow r$                                Implication Elimination: 4, 1

* Let $R$ be a set of rules of inference. If there exists a proof of a sentence $\varphi$ from a set $\Delta$ of premises using the rules of inference in $R$, we say that $\varphi$ is provable from $\Delta$ using $R$. We usually write this as $\Delta\vdash_R\varphi$, using the provability operator $\vdash$. If the set of rules is clear from context, we usually drop the subscript, writing just $\Delta\vdash\varphi$. 

##### Hypothetical Reasoning

* Structured proofs are similar to linear proofs in that they are sequences of reasoning steps. However, they differ from linear proofs in that they have more structure. In particular, sentences can be grouped into subproofs nested within outer superproofs

* 3 basic operations involves in creating useful subproofs: (1) making assumptions, (2) using ordinary rules of inference to derive conclusions, (3) using structed rules of inference to derive conclusions outside of subproofs

* The premises can also include conditions of the form $\varphi\vdash\psi$. The rule is called Implication Introduction:

  $$
  \begin{aligned}
  &\varphi\vdash\psi\\
  \hline
  &\varphi\Rightarrow\psi
  \end{aligned}
  $$

##### Fitch

* Fitch is a proof system that is popular in the Logic community. It is as powerful as many other proof systems and is far simpler to use

* Fitch has ten rules of inference

  * And Introduction: if a proof contains sentences $\varphi_1$ through $\varphi_n$, then we can infer their conjunction

    $$
    \begin{aligned}
    &\varphi_1\\
    &\dots\\
    &\varphi_n\\
    \hline
    &\varphi_1\land\dots\land\varphi_n
    \end{aligned}
    $$

  * And Elimination: if we have the conjunction of $\varphi_1$ through $\varphi_n$, then we can infer any of the conjuncts

    $$
    \begin{aligned}
    &\varphi_1\land\dots\land\varphi_n\\
    \hline
    &\varphi_i
    \end{aligned}
    $$

  * Or Introduction: allows us to infer an arbitrary disjunction so long as at least one of the disjuncts is already in the proof

    $$
    \begin{aligned}
    &\varphi_i\\
    \hline
    &\varphi_1\lor\dots\lor\varphi_n\\
    \end{aligned}
    $$

* Or Elimination: if we know that every disjunct entails some sentence, then we can infer that sentence even if we do not know which disjunct is true
  $$
  \begin{aligned}
  &\varphi_1\lor\dots\lor\varphi_n\\
  &\varphi_1\Rightarrow\psi\\
  &\dots\\
  &\varphi_n\Rightarrow\psi\\
  \hline
  &\psi
  \end{aligned}
  $$

* Negation Introduction: allows us to derive the negation of a sentence if it leads to a contradiction
  $$
  \begin{aligned}
  &\varphi\Rightarrow\psi\\
  &\varphi\Rightarrow\neg\psi\\
  \hline
  &\neg\varphi
  \end{aligned}
  $$

* Negation Elimination: allows us to delete double negatives
  $$
  \begin{aligned}
  &\neg\neg\psi\\
  \hline
  &\psi
  \end{aligned}
  $$

* Implication Introduction: if, by assuming $\varphi$, we can derive $\psi$, then we can derive ($\varphi\Rightarrow\psi$)
  $$
  \begin{aligned}
  &\varphi\vdash\psi\\
  \hline
  &\varphi\Rightarrow\psi
  \end{aligned}
  $$

* Implication Elimination
  $$
  \begin{aligned}
  &\varphi\Rightarrow\psi\\
  &\varphi\\
  \hline
  &\psi
  \end{aligned}
  $$

* Biconditional Introduction: allows us to deduce a biconditional from an implication and its inverse
  $$
  \begin{aligned}
  \varphi\Rightarrow\psi\\
  \psi\Rightarrow\varphi\\
  \hline
  \varphi\Leftrightarrow\psi
  \end{aligned}
  $$

* Biconditional Elimination: allows us to deduce two implications from a single biconditional
  $$
  \begin{aligned}
  \varphi\Leftrightarrow\psi\\
  \hline
  \varphi\Rightarrow\psi\\
  \psi\Rightarrow\varphi\\
  \end{aligned}
  $$

##### Soundness and completeness

* A set of premises logically entails a conclusion if and only if every truth assignment that satisfies the premises also satisfies the conclusion.
* A sentence is provable from a set of premises if and only if there is a finite proof of the conclusion from the premises
* We say that a proof system is sound if and only if every provable conclusion is logically entailed. In other words, if $\Delta\vdash\varphi$, then $\Delta\vDash\varphi$. 
* We say that a proof system is complete if and only if every logical conclusion is provable. In other words, if $\Delta\vDash\varphi$, then $\Delta\vdash\varphi$. 
* The Fitch system is sound and complete for the full language. In other words, for this system, logical entailment and provability are identical. An arbitrary set of sentences $\Delta$ logically entails an arbitrary sentence $\varphi$ if and only if $\varphi$ is provable from $\Delta$ using Fitch

##### Propositional Resolution

* Propositional Resolution is a powerful rule of inference for Propositional Logic. Using Propositional Resolution (without axiom schemata or other rules of inference), it is possible to build a theorem prover that is sound and complete for all of Propositional Logic

* The search space using Propositional Resolution is much smaller than for standard Propositional Logic

* Clausal Form

  * Propositional Resolution works only on expressions in clausal form. Before the rule can be applied, the premises and conclusions must be converted to this form

  * Literal: A literal is either an atomic sentence or a negation of an atomic sentence. For example, if $p$ is a logical constant, the following sentences are both literals: $p$, $\neg p$

  * Clausal sentence: A clausal sentence is either a literal or a disjunction of literals. If $p$ and $q$ are logical constants, then the following are clausal sentences: $p$, $\neg p$ and $\neg p \lor q$

  * Clause: A clause is the set of literals in a clausal sentence. For example, the following sets are the clauses corresponding to the clausal sentences above: $\{p\}$, $\{\neg p\}$ and $\{\neg p, q\}$. 

    * The empty set $\{\}$ is also a clause. It is equivalent to empty disjunction and, therefore, is unsatisfiable

  * There is a simple procedure for converting an arbitrary set of Propositional Logic sentences to an equivalent set of clauses. The conversion rules are summarized below and should be applied in order

    1. Implications (I): 

       $$
       \begin{aligned}
       &\varphi\Rightarrow\psi&\rightarrow\quad&\neg \varphi \lor \psi\\
       &\varphi\Leftarrow\psi&\rightarrow\quad&\varphi \lor\neg  \psi\\
       &\varphi\Leftrightarrow\psi&\rightarrow\quad&(\neg \varphi \lor \psi)\land(\varphi \lor\neg  \psi)\\
       \end{aligned}
       $$

    2. Negations (N): 

       $$
       \begin{aligned}
       &\neg\neg\varphi&\rightarrow\quad&\varphi\\
       &\neg(\varphi\land\psi)&\rightarrow\quad&\neg\varphi \lor\neg  \psi\\
       &\neg(\varphi\lor\psi)&\rightarrow\quad&\neg\varphi \land\neg  \psi\\
       \end{aligned}
       $$

    3. Distribution (D): 

       $$
       \begin{aligned}
       &\varphi\lor(\psi\land\chi)&\rightarrow\quad&(\varphi\lor\psi)\land(\varphi\lor\chi)\\
       &(\varphi\land\psi)\lor\chi&\rightarrow\quad&(\varphi\lor\chi)\land(\psi\lor\chi)\\
       &\varphi\lor(\varphi_1\lor\dots\lor\varphi_n)&\rightarrow\quad&\varphi\lor\varphi_1\lor\dots\lor\varphi_n \\
       &(\varphi_1\lor\dots\lor\varphi_n)\lor\varphi &\rightarrow\quad&\varphi_1\lor\dots\lor\varphi_n\lor\varphi\\
       &\varphi\land(\varphi_1\land\dots\land\varphi_n)&\rightarrow\quad&\varphi\land\varphi_1\land\dots\land\varphi_n \\
       &(\varphi_1\land\dots\land\varphi_n)\land\varphi &\rightarrow\quad&\varphi_1\land\dots\land\varphi_n\land\varphi\\
       \end{aligned}
       $$

    4. Operators (O): 

       $$
       \begin{aligned}
       &\varphi_1\lor\dots\lor\varphi_n&\rightarrow\quad&\{\varphi_1, \dots, \varphi_n\}\\
       &\varphi_1\land\dots\land\varphi_n&\rightarrow\quad&\{\varphi_1\}, \dots, \{\varphi_n\}\\
       \end{aligned}
       $$

##### Resolution Principle

* Given a clause containing a literal $\chi$ and other clause containing the literal $\neg\chi$, we can infer the clause consisting of all the literals of both clauses without the complementary pair. This rule of inference is called Propositional Resolution or the Resolution Principle

  $$
  \begin{aligned}
  &\{\varphi_1, \dots,\chi,\dots,\varphi_m\}\\
  &\{\psi_1, \dots,\neg\chi,\dots,\psi_n\}\\
  \hline
  &\{\varphi_1, \dots,\varphi_m,\psi_1,\dots,\psi_n\}\\
  \end{aligned}
  $$

* Example:

  $$
  \begin{aligned}
  &\{\neg p, q\} \\
  &\{p, q\} \\
  \hline
  &\{q\} \\
  \\
  &\{p, q, r\} \\
  &\{\neg p\} \\
  \hline
  &\{q, r\} \\
  \\
  &\{p\} \\
  &\{\neg p\} \\
  \hline
  &\{\} \\
  \\
  &\{p, q\} \\
  &\{\neg p, \neg q\} \\
  \hline
  &\{p, \neg p\} \\
  &\{q, \neg q\}
  \end{aligned}
  $$

##### Resolution Reasoning

* Reasoning with the Resolution Principle is analogous to reasoning with other rules of inference
  * We start with premises
  * We apply the Resolution Principle to those premises
  * We apply the rule to the results of those applications
  * And so forth until we get to our desired conclusion or we run out of things to do
* Formally, we define a resolution derivation of a conclusion from a set of premises to be a finite sequence of clauses terminating in the conclusion in which each clauses is either a premise or the result of applying the Resolution Principle to earlier members of the sequence
* The resolution is not generatively complete, i.e. it is not possible to find resolution derivations for all clauses that are logically entailed by a set of premise clauses
  * For example, given the clause $\{p\}$ and the clause $\{q\}$, there is no resolution derivation of $\{p,q\}$, despite the fact that it is logically entailed by the premises in this case
* On the other hand, if a set $\Delta$ of clauses is unsatisfiable, then there is guaranteed to be a resolution derivation of the empty clause from $\Delta$
* However we can use the relationship between unsatisfiability and logical entailment to produce a method for determining logical entailment 
  * A set $\Delta$ of sentences logically entails a sentence $\varphi$ if and only if the set of sentences $\Delta\cup\{\neg \varphi\}$ is inconsistent
  * So, to determine logical entailment, all we need to do is to negate our goal, add it to our premises, and use Resolution to determine whether the resulting set is unsatisfiable
* Define: A resolution proof of a sentence $\varphi$ from a set $\Delta$ of sentences is a resolution derivation of the empty clause from the clausal form of $\Delta\cup\{\neg\varphi\}$. A sentence $\varphi$ is provable from a set of sentences $\Delta$ by Propositional Resolution (written $\Delta\vdash\varphi$) if and only if there is a resolution proof of $\varphi$ from $\Delta$ 
* Propositional Resolution can be used in a proof procedure that always terminates without losing completeness since there are only finitely many clauses that can be constructed from a finite set of proposition constant

##### Relational Logic

* The Propositional Logic is inadequate to say things more things more general. For example: 

  ```
  If one person knows another, then the second person knows the first.
  Jack knows Jills.
  Question: Does Jill knows Jack?
  ```

  Relational Logic is an alternative to Propositional Logic that solves this problem. The trick is to argument our language with two new linguistic features, viz. variables and quantifiers. For example: 

  $$
  \forall x.\forall y. (knows(x,y)\Rightarrow (y,x))
  $$

* Syntax

  * In Relational Logic, there are no propositional constants; instead we have object constants, relation constants, and variables

  * Relation constants are used in forming complex expressions by combining them with an appropriate number of arguments

    * Each relation constant has an associated `arity`, i.e. the number of arguments with which that relation constant can be combined
    * A relation constant that can combined with a single argument is said to be `unary`
    * One that can be combined with two arguments is said to be `binary`
    * One that can be combined with three arguments is said to be `ternary`
    * A relation constant that can be combined with `n` arguments is said to be `n`-ary

  * A vocabulary consists of a set of object constants, a set of relation constants, and assignment of arities for each of the relation constants in the vocabulary

  * A term is defined to be a variable or an object constant. Terms typically denote objects presumed or hypothesized to exist in the world

  * There are 3 types of sentences in Relational Logic

    * Relational sentences (the analog of propositions in Propositional Logic, sometimes called `atoms`)

      * A relational sentence is an expression formed from an `n`-ary relation constant and `n` terms. For example, if `q` is a relation constant with arity 2 and if `a`and `y`are terms, then the expression shown below is syntactically legal relational sentence

        $$
        q(a,y)
        $$

    * Logical sentences (analogous to the logical sentences in Propositional Logic)

      * Logical sentences are defined as in Propositional Logic. There are negations, conjunctions, disjunctions, implications, and equivalences

        $$
        \begin{aligned}
        &\text{Negations:} & (\neg p(a)) \\
        &\text{Conjunction:}& (p(a)\land q(b,c)) \\
        &\text{Negations:} & (p(a)\lor q(b,c)) \\
        &\text{Negations:} & (p(a)\Rightarrow q(b,c)) \\
        &\text{Negations:} & (p(a)\Leftrightarrow q(b,c)) \\
        \end{aligned}
        $$

    * Quantified sentences (which have no analog in Propositional Logic)

      * Universally quantified sentence is used to assert that all objects have a certain property

        $$
        (\forall x.(p(x)\Rightarrow q(x,x)))
        $$

      * Existentially quantified sentence is used to assert that some object has a certain property

        $$
        (\exists x.(p(x)\land q(x,x)))
        $$

      * Quantified sentences can be nested within other sentences

* An expression in Relational Logic is `ground` if and only if it contains no variables. For example, $p(a)$ is ground, whereas the sentence $\forall x.p(x)$ is not

* An occurrence of a variable is `free` if and only if it is not in the scope of a quantifier of that variable. Otherwise, it is bound. For example, y is free and x is bound in the following sentence: $\exists x.q(x,y)$

* A sentence is open if and only if it has free variables. Otherwise, it is closed. For example, the first sentence below is open and the second is closed

  $$
  \begin{aligned}
  p(y)\Rightarrow \exists x.q(x,y)\\
  \forall y.(p(y)) \Rightarrow \exists x.q(x,y)
  \end{aligned}
  $$

* Semantics

  * The semantics of Relational Logic presented here is termed Herbrand semantics

  * The Herbrand base for a vocabulary is the set of all ground relational sentences that can be formed from the constants of the language, i.e. it is the set of all sentences of the form $r(t_1,\dots,t_n)$, where $r$ is an $n$-ary relation constant and $t_1,\dots,t_n$ are object constants

  * For a given relation constant and a finite set of object constants, there is an upper bound on the number of ground relational sentences that can be formed using that relation constant

  * A truth assignment for a Relational Logic language is a function that maps each ground relational sentence in the Herbrand base to a truth value

  * The rules for logical sentences in Relational Logic are the same as those for logical sentences in Propositional Logic

  * An instance of an expression is an expression in which all free variables have been consistently replaced by ground terms. Consistent replacement here means that, if one occurrence of a variable is replaced by a ground term, then all occurrences of that variable are replaced by the same ground term

  * A truth assignment satisfies a sentence with free variables if and only if it satisfies every instance of that sentence

  * A truth assignment satisfies a set of sentences if and only if it satisfies every sentence in the set

* Evaluation

  * Evaluation for Relational Logic is similar to evaluation for Propositional Logic
  * In order to evaluate a universally quantified sentence, we check that all instances of the scope are true
  * In order to evaluate an existentially quantified sentence, we check that at least one instance of the scope

* Satisfaction

  * As in Propositional Logic, it is possible to build a truth table for any set of sentences in Relational Logic. This truth table can be used to determine which truth assignment satisfy a given set of sentences

* It is for example possible to characterize Modular Arithmetic in Relational Logic

* Logical Properties

  * Within Propositional Logic, we can classify sentences into 3 disjoint categories

    * A sentence is valid if and only if it is satisfied by every truth assignment
    * A sentence is unsatisfiable if and only if it is not satisfied by any truth assignment
    * A sentence is contingent if and only if there is some truth assignment that satisfies it and some truth assignment that falsifies it

  * Alternatively, we can classify sentences into two overlapping categories

    * A sentence is satisfiable if and only if it is satisfied by at least one truth assignment, ie. it is either valid or contingent
    * A sentence is falsifiable if and only if there is at least one truth assignment that makes it false, ie. it is either contingent or unsatisfiable

  * These definitions are the same as in Propositional Logic

    * A ground sentence in Relational Logic is valid / contingent / unsatisfiable if and only if the corresponding sentence in Propositional Logic is valid / contingent / unsatisfiable
    * Not all sentences in Relational Logic are ground

  * The Common Quantifier Reversal gives that reversing quantifiers of the same type has no effect on truth assignment

    $$
    \begin{aligned}
    \forall x. \forall y.q(x,y) \Leftrightarrow \forall y. \forall x.q(x,y) \\
    \exists x. \exists y. q(x,y)\Leftrightarrow\exists y.\exists x.q(x,y)\\
    \end{aligned}
    $$

  * Existential Distribution gives that it is okay to move an existential quantifier inside of a universal quantifier. The reverse is not valid
    $$
    \exists y.\forall x.q(x,y)\Rightarrow \forall x.\exists y.q(x,y)
    $$

  * Negation Distribution gives that it is okay to distribute negation over quantifiers of either type by flipping the quantifier and negating the scope of the quantified sentence
    $$
    \begin{aligned}
    \neg \forall x.p(x)\Leftrightarrow \exists x.\neg p(x)\\
    \neg \exists x.p(x)\Leftrightarrow \forall x.\neg p(x)
    \end{aligned}
    $$

* Logical Entailment

  * A set of Relational Logic sentences $\Delta$ logically entails a sentence $\varphi$ ($\Delta \vDash \varphi$) if and only if every truth assignment that satisfies $\Delta$ also satisfies $\varphi$. This definition is the same for Relational Logic as for Propositional Logic

  * The presence of variables allows for additional logical entailments. For example:
    $$
    \begin{aligned}
    \exists y.\forall x.q(x,y) \vDash \forall x.\exists y.q(x,y) \\
    \forall x. \forall y.q(x,y) \vDash \forall x.\forall y. q(y,x)
    \end{aligned}
    $$

  * A sentence with free variables is equivalent to the sentence in which all of the free variables are universally quantified

* Relation Logic and Propositional Logic

  The procedure for transforming Relational Logic (RL) sentences to Propositional Logic (PL) sentences has multiple steps

  * A sentence is in prenex form if and only if it is closed and all of the quantifiers are on the outside of all logical operators

  * Converting a set of RL sentences to a logically equivalent set in prenex form: 

    * First we rename variables in different quantified sentences to eliminate any duplicates
    * We then apply quantifier distribution rules in reverse to move quantifiers outside of logical operators
    * Finally, we universally quantify any free variables in our sentences

  * Once we have a set of sentences in prenex form, we compute the grounding. We start with our initial set $\Delta$ of sentences and we incrementally build up our grounding $\Gamma$. On each step we process a sentence in $\Delta$, using the procedure described below. The procedure terminates when $\Delta$ becomes empty. The set $\Gamma$ at that point is the grounding of the input

    1. The first rule covers the case when the sentence $\varphi$ being processed is ground. In this case, we remove the sentence from $\Delta$ and add it to $\Gamma$
       $$
       \begin{aligned}
       \Delta_{i+1}&=\Delta_i-\{\varphi\} \\
       \Gamma_{i+1}&=\Gamma_i\cup\{\varphi\}
       \end{aligned}
       $$

    2. If our sentence is of the form $\forall \nu.\varphi[\nu]$, we eliminate the sentence from $\Delta_i$ and replace it with copies of the scope, one copy for each object constant $\tau$ in our language
       $$
       \begin{aligned}
       \Delta_{i+1}&=\Delta_i-\{\forall \nu.\varphi[\nu]\ |\ \tau\text{ an object constant}\} \\
       \Gamma_{i+1}&=\Gamma_i
       \end{aligned}
       $$

    3. If our sentence of the form $\exists\nu.\varphi[\nu]$, we eliminate the sentence from $\Delta_i$ and replace it with a disjunction, where each disjunct is a copy of the scope in which the quantified variable is replaced by an object constant in our language
       $$
       \begin{aligned}
       \Delta_{i+1}&=\Delta_i-\{\exists \nu.\varphi[\nu]\}\cup\{\varphi[\tau_1]\lor\dots\varphi[\tau_n]\} \\
       \Gamma_{i+1}&=\Gamma_i
       \end{aligned}
       $$

  * Once we have a grounding $\Gamma$, we replace each ground relational sentence in $\Gamma$ by a proposition constant. The resulting sentences are all in PL



##### General Relational Logic

* To analyze the properties of sentences in Relational Logic by looking at possible truth assignments is hard because that the number of possibilities is very large. Fortunately, there are some shortcuts
  * Semantic trees: We can sometimes avoid generating such truth tables by incrementally constructing the corresponding semantic trees. By interleaving unit propagation and simplification with tree generation, we can often prune away unrewarding subtrees before they are generated and thereby reduce the size of the trees
  * Boolean Models: In this approach, we write out an empty table for each relation and then fill in values based on the constraints of the problem. Given these partial assignments, we then simplify the constraints (as in the semantic trees method), possibly leading to new unit constraints. We continue until there are no more unit constraints 
  * Non-Boolean Models: Rather than treating each ground atom as a separate variable with its own Boolean value, we can think of each binary relation as a variable with 4 possible values. Moreover, we can combine this representation with the techniques described earlier to find assignments for these non-Boolean variables in an even more efficient manner



##### Relational Proofs

* As with Propositional Logic, it is possible to show that a set of Relational Logic premises logically entails a Relational Logic conclusion if and only if there is a finite proof of the conclusion from the premises. Moreover, it is possible to find such proofs in a finite time

* The Fitch system for Relational Logic is an extension of the Fitch system for Propositional Logic with five new rules of inference

* Rules for Universal Quantifiers

  * Universal Elimination (UE) allows us to reason from the general to the particular
    $$
    \begin{aligned}
    &\forall \nu . \varphi[\nu]\\
    \hline
    &\varphi [\tau] \\
    &\text{where }\tau\text{ is subsitutable and free for } \nu \text{ in }\varphi
    \end{aligned}
    $$

  * Universal Introduction (UI) allows us to reason from arbitrary sentences to universally quantified versions of those sentences
    $$
    \begin{aligned}
    &\varphi\\
    \hline
    &\forall \nu .\varphi \\
    &\text{where }\nu\text{ does not occur free in both } \varphi \text{ and an active assumption }
    \end{aligned}
    $$

* Rules for Existential Quantifiers

  * Existential Elimination (EE) allows us to reason from an existentially quantified sentence to an instance of the scope of the quantified sentence

    * However we cannot replace the existential variable with anything. Instead, we need to replace it with a Skolem term
    * A skolem term is effectively a placeholder for an actual object constant and is treated like an ordinary term by our rules of inference 

  * Existential Elimination for closed sentences:
    $$
    \begin{aligned}
    &\exists \nu .\varphi[\nu]\\
    \hline
    & \varphi[[\tau]] \\
    &\text{where }\tau\text{ is a not an existing object constant}
    \end{aligned}
    $$

  * Existential Elimination for sentences with free variables
    $$
    \begin{aligned}
    &\exists \nu .\varphi[\nu_1, \dots, \nu_n,\nu]\\
    \hline
    & \varphi[\nu_1,\dots,\nu_n,[\pi(\nu_1,\dots,\nu_n)]] \\
    &\text{where }\pi\text{ is a not an existing object constant}
    \end{aligned}
    $$

  * Existential Introduction (EI) allows us to infer an existentially quantified sentence in which one, some, or all occurrences of a term $\tau$ have been replaced by the existentially quantified variable provided that $\tau$ does not contain any explicitly quantified variables
    $$
    \begin{aligned}
    &\varphi[\tau]\\
    \hline
    &\exists \nu . \varphi[\nu]\\
    &\text{where }\tau\text{ does not contain any universally quantified variables}
    \end{aligned}
    $$

* Domain Closure

  * If we believe a schema is true for every instance, then we can infer a universally quantified version of that schema
    $$
    \begin{aligned}
    &\varphi[\sigma_1]\\
    &\vdots\\
    &\varphi[\sigma_n]\\
    \hline
    &\forall \nu . \varphi[\nu]
    \end{aligned}
    $$



##### Herbrand Logic

* Relational Logic allows us to axiomatize worlds with the restriction of that the worlds must be finite

* In Herbrand Logic, we can name infinite many objects with a finite vocabulry

  * The trick is to expand our language to include not just object constans but also complex terms that can be built from object constants in infinitely many ways
  * By constructing terms in this way, we can get infinitely many names for objects, and, because our vocabulary is still finite, we can finitely axiomatize some things in a way that would not be possible with infinitely many 

* Syntax: The syntax of Herbrand Logic is the same as that of Relational Logic except for the addition of function constants and functional expressions

  * Function constants are similar to relation constants. They are used in forming complex expressions by combining them with an appropriate number of arguments
  * Each function constant has an associated arity, ie the number of arguments with which that function constant can be combined
  * A functional expression, or functional term, is an expression formed from an $n$-ary function constant and $n$ terms enclosed in parentheses and separated by commas
  * Unlike relational sentences, functional expressions can be nested within other functional expressions
  * A term is a variable or an object constant or a functional expression in Herbrand Logic

* Semantics: is effectively the same as that of Relational Logic. The key difference is that the Herbrand base is infinitely large

  * We define the Herbrand base for a vocabulary to be the set of all ground relational sentences that can be formed from the constants of the language
  * A truth assignment for Herbrand Logic is a mapping that gives each ground relational sentence in the Herbrand base a unique truth value

* The rules defining the truth of logical sentences in Herbrand Logic are the same as those for logical sentences in Propositional Logic and Relational Logic

* Herbrand Logic is highly expressive but the questions of unsatisfiability and logical entailment for Herbrand Logic are not effectively computable

* Logical entailment for Herbrand Logic is defined the same as for Propositional Logic and Relational Logic. We also require that the proofs must be finite as the proof can go on forever 

* Herbrand Logic is inherently incomplete

* Herbrand Logic is not compact neither

  * Proof: Consider the following infinite set of sentences
    $$
    p(a), p(f(a)), p(f(f(a))),\dots
    $$
    Assume the vocabulary is $\{p,a,f\}$. Hence, the ground terms are $a, f(a), f(f(a)),\dots$ This set of sentences entails $\forall x . p(x)$. Add in the sentence $\exists x.\lnot p(x)$. Clearly, this infinite set is unsatisfiable. However, every finite subset is satisfiable since every finite subset is missing either $\exists x.\lnot p(x)$. or one of the sentences above. If it is the former, the set is satisfiable; and if it is the latter, the set can be satisfied by making the missing sentence false. Thus, compactness does not hold



##### Induction

* Induction is reasoning from the specific to the general

* Incomplete induction is induction where the set of instances is not exhaustive

  * We sometimes leap to the conclusion that a schema is always true even though we have not seen all instances

* Complete induction, or mathematical induction is induction where it is sure that all instances are true

* Domain closure works for finite number of statements but not with infinite number

* Linear Induction: if we know that a schema holds of our base element and if we know that, whenever the schema holds of an element, it also holds of the successor of that element, then we can conclude that the schema holds of all elements
  $$
  \begin{aligned}
  &\varphi[a]\\
  &\forall \mu.(\varphi[\mu]\Rightarrow\varphi[s(\mu)])\\
  \hline
  &\forall \nu.\varphi[\nu]
  \end{aligned}
  $$
  here $s$ is called the successor function and all elements can be iterated in the following way
  $$
  a\rightarrow s(a)\rightarrow s(s(a)) \rightarrow  s(s(s(a)))\rightarrow \dots
  $$

* Tree Induction: similarly
  $$
  \begin{aligned}
  &\varphi[a]\\
  &\forall \mu.(\varphi[\mu]\Rightarrow\varphi[f(\mu)])\\
  &\forall \mu.(\varphi[\mu]\Rightarrow\varphi[g(\mu)])\\
  \hline
  &\forall \nu.\varphi[\nu]
  \end{aligned}
  $$
  Here $f(\mu)$ and $g(\mu)$ shall cover all the cases

* Structural Induction: most general form of induction. We can have multiple object constants, multiple function constants, and, unlike our other forms of induction, we can have function constants with multiple arguments
  $$
  \begin{aligned}
  &\varphi[a]\\
  &\varphi[b]\\
  &\forall \lambda.\forall \mu.((\varphi[\lambda] \land \varphi[\mu])\Rightarrow \varphi[c(\lambda,\mu)])\\
  \hline
  &\forall \nu.\varphi[\nu]
  \end{aligned}
  $$

* Multidimensional Induction: similar to one variable induction but with multiple variables. A general way to do this is to prove the outer quantified formula and then use induction on each of the inner conclusions as well

* Embedded Induction: sometimes, it is easier to use induction on parts of a problem or to prove alternative conclusions and then use these intermediate results to derive the overall conclusions



##### Resolution

* Introduction

  * The Resolution Principle is a rule of inference for Relational Logic analogous to the Propositional Resolution Principle for Propositional Logic
  * Using the Resolution Principle alone (without axiom schemata or other rules of inference), it is possible to build a reasoning program that is sound and complete for all of Relational Logic
  * The search space using the Resolution Principle is smaller than the search space for generating Herbrand proofs

* Clausal Form

  * Resolution works only on expressions in clausal form. The definitions here are analogous

  * A literal is either a relational sentence or a negation of a relational sentence

  * A clause is a set of literals and represents a disjunction of the literals in the set

  * A clause set is a set of clauses and represents a conjunction of the clauses in the set

  * The procedure for converting relational sentences to clausal form is similar to that for Propositional Logic with a few additional rules

    1. Implications: 
       $$
       \begin{aligned}
       &\varphi\Rightarrow\psi&\rightarrow\quad&\neg \varphi \lor \psi\\
       &\varphi\Leftarrow\psi&\rightarrow\quad&\varphi \lor\neg  \psi\\
       &\varphi\Leftrightarrow\psi&\rightarrow\quad&(\neg \varphi \lor \psi)\land(\varphi \lor\neg  \psi)\\
       \end{aligned}
       $$

    2. Negations:
       $$
       \begin{aligned}
       &\neg\neg\varphi&\rightarrow\quad&\varphi\\
       &\neg(\varphi\land\psi)&\rightarrow\quad&\neg\varphi \lor\neg  \psi\\
       &\neg(\varphi\lor\psi)&\rightarrow\quad&\neg\varphi \land\neg  \psi\\
       &\lnot\forall \nu.\varphi&\rightarrow\quad&\exists\nu.\lnot\varphi\\
       &\lnot\exists \nu.\varphi&\rightarrow\quad&\forall\nu.\lnot\varphi\\
       \end{aligned}
       $$

3. Standardize variables: we rename variables so that each quantifier has a unique variable, ie. the variable is not quantified more than once within the same sentence

4. Existentials out: 

   1. If an existential quantifier does not occur within the scope of a universal quantifier, we simply drop the quantifier and replace all occurrences of the quantified variable by a new constant, the Skolem constant
          $$
          \exists x.p(x) \rightarrow \ p(a)
          $$

   2. If an existential quantifier is within the scope of any universal quantifiers, there is the possibility that the value of the existential variable depends on the values of the associated universal variables so we drop the existential quantifier and to replace the associated variable by a term formed from a new function symbol (Skolem function) applied to the variables associated with the enclosing universal quantifiers
          $$
          \forall x.(p(x)\land \exists z.q(x,y,z)) \rightarrow\ \forall x.(p(x)\land q(x, y, f(x,y)))
          $$
          

5. Alls out: we drop all universal quantifiers

6. Disjunctions: 
       $$
       \begin{aligned}
       &\varphi\lor(\psi\land\chi)&\rightarrow\quad&(\varphi\lor\psi)\land(\varphi\lor\chi)\\
       &(\varphi\land\psi)\lor\chi&\rightarrow\quad&(\varphi\lor\chi)\land(\psi\lor\chi)\\
       &\varphi\lor(\varphi_1\lor\dots\lor\varphi_n)&\rightarrow\quad&\varphi\lor\varphi_1\lor\dots\lor\varphi_n \\
       &(\varphi_1\lor\dots\lor\varphi_n)\lor\varphi &\rightarrow\quad&\varphi_1\lor\dots\lor\varphi_n\lor\varphi\\
       &\varphi\land(\varphi_1\land\dots\land\varphi_n)&\rightarrow\quad&\varphi\land\varphi_1\land\dots\land\varphi_n \\
       &(\varphi_1\land\dots\land\varphi_n)\land\varphi &\rightarrow\quad&\varphi_1\land\dots\land\varphi_n\land\varphi\\
       \end{aligned}
       $$

7. Operators out:
       $$
       \begin{aligned}
       &\varphi_1\lor\dots\lor\varphi_n&\rightarrow\quad&\{\varphi_1, \dots, \varphi_n\}\\
       &\varphi_1\land\dots\land\varphi_n&\rightarrow\quad&\{\varphi_1\}, \dots, \{\varphi_n\}\\
       \end{aligned}
       $$

* Unification

  * Unification is the process of determining whether two expressions can be unified, ie. made identical by appropriate substitutions for their variables
  * A substitution is a finite mapping of variables to terms. The variables being replaced together constitute the domain of the substitution, and the terms replacing them constitute the range
  * A substitution is pure if and only if all replacement terms in the range are free of the variables in the domain of the substitution. Otherwise, the substitution is impure
  * The result of applying a substitution $\sigma$ to an expression $\varphi$ is the expression $\varphi\sigma$ obtained from the original expression by replacing every occurrence of every variable in the domain of the substitution by the term with which it is associated
  * The composition of several substitution does not necessarily preserve substitutional purity
  * A substitution $\sigma$ and a substitution $\tau$ are composable if and only if the domain of $\sigma$ and the range of $\tau$ are disjoint
  * A substitution $\sigma$ is a unifier for an expression $\varphi$ and an expression $\psi$ if and only if $\varphi\sigma=\psi\sigma$. If two expressions have a unifier, they are said to be unifiable. Otherwise, they are nonunifiable
  * We say that a substitution $\sigma$ is as general as or more general than a substitution $\tau$ if and only if there is another substitution $\delta$ such that $\sigma\delta=\tau$ 
  * The most general unifier `mgu` is the the unifier that is more general that all others

* Resolution Principle

  * The Relational Resolution Principle is analogous to that of propositional resolution. The main difference is the use of unification to unify literals before applying the rule

  * Suppose that $\Phi$ and $\Psi$ are two clauses. If there is a literal $\varphi$ in some factor of $\Phi$ and a literal $\lnot\psi$ in some factor of $\Psi$, then we say that the two clauses $\Phi$ and $\psi$ resolve and that the new clause $((\Phi'-\{\varphi\})\cup(\Psi'-\{\lnot\psi\}))\sigma$ is a resolvent of the two clauses
    $$
    \begin{aligned}
    &\Phi\\
    &\Psi\\
    \hline
    &((\Phi'-\{\varphi\})\cup(\Psi'-\{\lnot\psi\}))\sigma\\
    &\text{where }\tau\text{ is a variable renaming on }\Phi\\
    &\text{where }\Phi' \text{ is a factor of }\Phi\tau \text{ and }\varphi\in\Phi'\\
    &\text{where }\Psi' \text{ is a factor of }\Psi\text{ and }\lnot\psi\in\Psi'\\
    &\text{where }\sigma = mgu(\varphi,\psi)
    \end{aligned}
    $$

* Reasoning with the Resolution Principle is analogous to reasoning with the Propositional Resolution Principle

  * We define a resolution derivation of a conclusion from a set of premises to be a finite sequence of clauses terminating in the conclusion in which each clause is either a premise or the result of applying the Resolution Principle to earlier members of the sequence. We do not use the word proof
  * Like Propositional Resolution, Resolution is not generatively complete, ie. it is not possible to find resolution derivations for all clauses that are logically entailed by a set of premise clasuses

* Unsatisfiability

  * One common use of resolution is in demonstrating unsatisfiability. To determine unsatisfiability, we need to use resolution to derive consequences from the set to be tested, terminating whenever the empty clause is generated
  * In demonstrating unsatisfiability, Resolution and Fitch without DC are equally powerful. Given a set of sentences, Resolution can derive the empty clause from the clausal form of the sentences if and only if Fitch can find a proof of a contradiction

* Logical Entailment

  * Suppose we wish to show that the set of sentences $\Delta$ logically entails the formula $\varphi$. By the refutation theorem, we can establish that $\Delta\vdash\varphi$ by showing that $\Delta\cup\{\lnot\varphi\}$ is unsatisfiable
  * To apply this technique of establishing logical entailment by establishing unsatisfiability using resolution, we first negate $\varphi$ and add it to $\Delta$ to yield $\Delta'$. We then convert $\Delta'$ to clausal form and apply resolution. If the empty clause is produced, the original $\Delta'$ was unsatisfiable, and we have demonstrated that $\Delta$ logically entails $\varphi$. This process is called a `resolution refutation`

* Answer Extraction

  * Resolution can be used to answer fill-in-the-blank questions as well. The goal is to find bindings for the free variables such that the database logically entails the sentence obtained by substituting the bindings into the original question
  * An answer literal for a fill-in-the-blank question $\varphi$ is a sentence $goal(\nu_1,\dots,\nu_n)$, where $\nu_1,\dots,\nu_n$ are the free variables in $\varphi$. To answer $\varphi$, we form an implication from $\varphi$ and its answer literal and convert to clausal form
  * To get answers, we use resolution as described above, except that we change the termination test. Rather than waiting for the empty clause to be produced, the procedure halts as soon as it derives a clause consisting of only answer literals
  * Unfortunately, we have no way of knowing whether or not the answer statement from a given refutation exhausts the possibilities
  * Fill-in-the-blank resolution in some cases can result in a clause containing more than one answer literal. No one answer is guaranteed to work, but one of the answers must be correct

* Strategies

  * One of the disadvantages of using the resolution rule in an unconstrained manner is that it leads to many useless inferences. Here presents a number of strategies for eliminating useless work
  * Pure Literal Elimination: A literal occurring in a cluase set is pure if and only if it has no instance that is complementary to an instance of another literal in the clause set. A clause that contains a pure literal is useless for the purposes of refutation, since the literal can never be resolved away. Consequently, we can safely remove such a clause. Removing clauses with pure literals defines a deletion strategy known as pure-literal elimination. If a database contains no pure literals, there is no way we can derive any clauses with pure literals using resolution
  * Tautology Elimination: A tautology is a clause containing a pair of complementary literals. The presence of tautologies in a set of clauses has no effect on that set's satisfiability. We can remove tautologies from a database, because we need never use them in subsequent inferences. The corresponding deletion strategy is called tautology elimination
  * Subsumption Elimination: In subsumption elimination, the deletion criterion depends on a relationship between two clauses in a database. A clause $\Phi$ subsumes a clause $\Psi$ if and only if there exists a substitution $\sigma$ such that $\Phi\sigma\subseteq\Psi$. If one member in a set of clauses subsumes another member, then the set remaining after eliminating the subsumed clause is satisfiable if and only if the original set is satisfiable. Therefore, subsumed clauses can be eliminated
  * Unit Resolution: A unit resolvent is one in which at least one of the parent clauses is a unit clause, ie. one containing a single literal. A unit derivation is one in which all derived clauses are unit resolvents. A unit refutation is unit derivation of the empty clause. It can be shown that there is a unit refutation of a set of Horn clauses (clauses with at most one positive literal), if and only if it is unsatisfiable
  * Input Resolution: An input resolvent is one in which at least one of two parent clauses is a member of the initial (ie. input) database. An input deduction is one in which all derived clauses are input resolvents. An input refutation is an input deduction of the empty clause. It can be shown that unit resolution and input resolution are equivalent in inferential power in that there is a unit refutation from a set of sentences whenever there is an input refutation and vice versa. One consequence of this fact is that input resolution is complete for Horn clauses but incomplete in general
  * Linear Resolution: Linear resolution (also called ancestry-filtered resolution) is a slight generalization of input resolution. A linear resolvent is one in which at least one of the parents is either in the initial database or is an ancestor of the other parent. A linear deduction is one in which each derived clause is a linear resolvent. A linear refutation is a linear deduction of the empty clause. Much of the redundancy in unconstrained resolution derives from the resolution of intermediate conclusions with other intermediate conclusions. The advantage of linear resolution is that it avoids many useless inferences by focusing deduction at each point on the ancestors of each clause and on the elements of the initial database. It can be shown that, if a set of clauses $\Delta$ is satisfiable and $\Delta\cup\{\Phi\}$ is unsatisfiable, then there is a linear refutation with $\Phi$ as top clause



##### Supplementary Material

* Propositional satisfiability problem (SAT) is the problem of determining whether a set of sentences in Propositional Logic is satisfiable. There are several basic methods for solving SAT problems:
  1. Truth Table method: The truth table method is complete because every truth assignment is checked but the method is impractical for all but very small problem instances
  2. Backtracking: In basic backtracking search, we start at the root of the tree (the empty assignment where nothing is known) and work our way down a branch. At each node, we check whether the input $\Delta$ is satisfied. If $\Delta$ is satisfied, we move down the branch by choosing a truth value for a currently unassigned propositioin. If $\Delta$ is falsified, then knowing that ll the (partial) truth assignments further down the branch also falsify $\Delta$, we backtrack to the most recent decision point and proceed down a different branch
* DPLL: The Davis-Putnam-Logemann-Loveland method (DPLL) is a classic method for SAT solving. It is essentially backtracking search along with unit propagation and pure literal elimination. Most modern, complete SAT solvers are based on DPLL, with additional optimizations
* GSAT: In some problem instances, it is impractical to exhaustively eliminate every truth assignment as a possible model. In such situations, one may consider incomplete search methods - methods that answer correctly when they can but sometimes fail to answer. The basic idea is to sample a subset of truth assignments. What enables incomplete SAT solvers to work efficiently is the use of heuristics that frequently steer the search toward satisfying assignments
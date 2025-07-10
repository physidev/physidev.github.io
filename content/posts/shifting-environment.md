+++
date = '2025-07-08T01:20:41-05:00'
draft = true
title = 'Shifting Environment'
+++

Once again, summer has arrived. 

Unfortunately, so too have the blistering temperatures and recurrent heat waves we've all come to dread nowadays. It's only natural then that anthropogenic climate change has occupied my thoughts over the last few weeks. In particular, an old question of mine---one I'd long since forgotten---crossed my mind again: in times of rapid environmental change, such as right now, is it evolutionarily more optimal to have a higher mutation rate?

Intuitively, this seems pretty obvious. We can assume each species of organism has a certain range of temperatures it can survive in; like any other trait, this range can evolve over time. If the temperature stays constant, adapted organisms have nothing to gain from mutations and face only their downsides. On the other hand, if the temperature is rapidly increasing, it's adapt or die. Mutations are the only way for the organisms to keep pace with the temperature, continually adapting to the new normal. 

Intuition is great---but mathematics is better! In this spirit, let's try to demonstrate this phenomenon *numerically*. 

## Setting up a discrete-time, fixed-variability model

We start with a fairly simple discrete-time model. Let the function \(T:\mathbb N_0 \to \mathbb R\) give the temperature \(T_n\) at time \(n\). We fix an "adaptation function" \(s: \mathbb R^2 \to [0,1] \), where \(s(\tau, T)\) gives the probability that an organism adapted most to temperature \(\tau\) will have a child at temperature \(T\). 

Now, for simplicity's sake, we lay out some rules governing the evolution of organisms. Let \(A_n\) be an organism alive at time \(n \in \mathbb N_0\):
- \(A_n\) is characterized by two numbers: its *adapted temperature* \(\tau_n\) and its *mutation rate* \(\nu >0\). 
- \(A_n\) will be dead at time \(n+1\). Before it dies, it has a probability \(s(\tau_n, T_n)\) of having a child \(A_{n+1}\) which will be alive at time \(n+1\).
- If \(A_n\) indeed begets \(A_{n+1}\), then \(A_{n+1}\)'s adaptation temperature, call it \(\tau_{n+1}\), will be normally distributed with mean \(\tau_n\) and variance \(\nu\). Furthermore, \(A_{n+1}\) will have the same mutation rate \(\nu\).  

With these rules, \(\{\tau_n\}_{n\geq 0}\) is *almost* a [discrete-time Markov chain](https://en.wikipedia.org/wiki/Discrete-time_Markov_chain) with state space \(\mathbb R\). The only obstacle is the chance that \(A_{n}\) will die, in which case it is unclear what value \(\tau_{n+1}\) will take. To remedy this, we will simply expand our state space to be \(\hat{\mathbb R} := \mathbb R \cup \{\infty\}\), assert that \(\infty\) is a *death state* or *coffin state*, and say that if \(A_n\) dies, then \(\tau_k = \infty\) for all times \(k > n\). 

Having made this adjustment, we indeed get that \(\{\tau_n\}_{n\geq 0}\) is a discrete-time Markov chain with state space \( \hat{\mathbb R} \), and---using [Wikipedia's notation](https://en.wikipedia.org/wiki/Markov_chains_on_a_measurable_state_space) and the rules above---we can explicitly specify the associated *Markov kernel* \(p_n\) at time \(n\) as follows (with \(x\in \mathbb R\)):
\[
    \begin{align}
        p_n(\infty, \infty) &= 1, \\
        p_n(\infty, \mathbb R) &= 0, \\
        p_n(x,\infty) &= 1 - s(x, T_n), \\
        p_n(x, dy) &= \frac{s(x, T_n)}{\sqrt{2\pi\nu}}\exp\left(-\frac{(y-x)^2}{2\nu}\right)\,dy.
    \end{align}
\]
Finally, to start computing probabilities, all that remains is to specify a *starting distribution* \(\mu\) on \(\hat{\mathbb R}\), which we will take to be the Dirac measure at zero.

To summarize, the Markov chain \(\{\tau_n\}_{n\geq 0}\) tracks the adapted temperature of a *lineage* of organisms, with the initial organism adapted to temperature \(\tau_0 = 0\). This lineage has a certain chance of dying out at any given time depending on the current temperature, as determined by the adaptation function \(s\). 

## Experimenting with this model

Now that we have a mathematical model, let's remind ourselves what question do we want to answer. In our case, we wanted to see whether a higher mutation rate is evolutionarily advantageous when the temperature is increasing rapidly. To study this with our model, we start by assuming the temperature \(T\) is increasing constantly, so \[T_n = Cn\] for some \(C \geq 0\). Then, assuming "evolutionarily advantageous" means "makes long-term survival more likely," it makes sense to ask the following questions:

- For large \(N\), how does the *survival probability* \[P_N(\nu):=\mathbb P\left[\text{$A_N$ is alive}\right]\] vary as a function of \(\nu\)? Is there an optimal rate \(\nu^*\) at which this probability is maximized? If so, is it independent of \(N\)?

Before getting into the nitty-gritty calculations, we can employ some heuristic reasoning to make an educated hypothesis as to what the answers are. Intuitively, \(P_N(\nu) \to 0\) as \(\nu \to 0\) since, once again, it's adapt or die. Less clear but also intuitive is that \(P_N(\nu) \to 0\) as \(\nu \to \infty\). If the mutation rate is too high, the child becomes more likely to overshoot the new range of survivable temperatures. That is, the probability of the child falling in the "Goldilocks range" diminishes to zero as \(\nu \to \infty\), making long-term survivability impossible. Combining this with the fact that \(P_N\) is a probability and thus bounded, it must achieve a maximum if it is continuous in \(\nu\). This suggests the existence of at least one or more values for \(\nu^*\). 

[Dimensional analysis](https://en.wikipedia.org/wiki/Dimensional_analysis) can take us a bit further. Let \(\mathsf{\Theta}\) and \(\mathsf{T}\) be the units of temperature and time respectively. To simplify the analysis, let's make one more concrete specification and write \[s(\tau, T) = \exp\left(-\kappa(\tau-T)^2\right).\] Then, see that \(\kappa\) parameterizes the "width" of the temperature range in which the organisms can reproduce. Since the inputs to functions must be dimensionless (*i.e.* have no units), \(\kappa\) must have units of \(\mathsf{\Theta}^{-2}\). Now, because \(\nu\) is the *variance* of temperature, it has units of \(\mathsf{\Theta}^2\). Looking back at the all the quantities we've defined, the only other quantity with a unit of temperature is \(C\), which has units of \(\mathsf{\Theta}\mathsf{T}^{-1}\), so it makes sense that. 

As a last preliminary step, it's also worth running a few simulations to see what exactly \(P_N(\nu)\) looks like when plotted against \(\nu\). 


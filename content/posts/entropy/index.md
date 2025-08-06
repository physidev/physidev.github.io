+++
date = 2025-07-19T01:05:08-05:00
draft = false
title = 'What actually is entropy?'
+++

Here are (unfinished and disorganized) notes I wrote to try to understand what on earth entropy---in both physics and information theory---really is.

<!--more-->

## The traditional thermodynamical derivation
I was first introduced to entropy in the first chapter of Kardar's *Statistical Physics of Particles*, which covers thermodynamics. In it, he takes a mostly axiomatic approach, building up the study of heat and thermodynamic systems by covering the four standard laws of thermodynamics in order. Part of this process is the identification of a quantity called "entropy," and I'll now summarize how he gets there. Skip to the next section if you've taken a thermodynamics class before.

It begins with the zeroth law: If systems \(A\) and \(B\) are each in thermal equilibrium with \(C\), then \(A\) is in equilibrium with \(B\). From this fact, he derives the existence of an *empirical temperature* function for each system, which indicates whether two states are thermally equivalent or not (whatever that means). 

Next, the first law asserts that the internal energy \(E\) is a function of the state of the system, just as temperature is, due to the law of conservation of energy. We can then write \[dE = \delta Q + \delta W,\] splitting up any change in the system's internal energy into "work" done on the system and "heat" transferred to the system. The \(\delta\) means these are *inexact differentials*, so their integrals are path-dependent. Work seems to be energy transferred by exerting some sort of meaningful *generalized force* on the system (pushing a piston down to increase pressure on a gas, pulling a spring), so we write
\[\delta W = \sum_i J_i\,dx_i, \] where the \(J_i\) are generalized forces (such as pressure \(P\)) and the \(x_i\) are *generalized displacements* (such as volume \(V\)). 

Now, a remark is made that the \(J_i\) are usually *intensive* quantities and the \(x_i\) are usually *extensive* quantities. This means that as the system's *size* increases (whatever that means), the \(J_i\)'s also do, while the \(x_i\)'s do not. To put it another way, imagine a canister of gas with a certain volume \(V\) and pressure \(P\). Then, if you pretend the top and bottom halves of the canister are different systems (in thermal equilibrium), the pressures of each system would be the same, i.e. \(P\), while the volumes would each be \(V/2\). 

Now, the intensive quantities, such as pressure, are usually indications of equilibrium. As an example, Kardar notes "the pressure is uniform in a gas in equilbirium (in the absensce of external potentials) and equal for two equilibrated gases in contact." Likewise, according to Kardar, temperature plays a similar role for heat exchange. Thus, we should be able to write
\[\delta Q = T\,dS,\]
for some mystery displacement variable \(S\), which is conjugate to the temperature \(T\). 

We then get the second law of thermodynamics: no process is possible which converts heat solely into work, according to Kelvin. This precedes a long discussion on Carnot engines, which allows us to "prove" the following theorem of Clausius: For any cyclic transformation (reversible or not), 
\[\oint \frac{\delta Q}{T} \leq 0,\]
where \(\delta Q\) is the "heat increment supplied to the system at temperature \(T\)." In particular, for *reversible processes* (whatever that means), we have
\[\oint \frac{\delta Q_{\text{rev}}}{T} = 0, \]
allowing us to define a state variable \(S\) by \(dS = dQ_{\text{rev}}/T \). Hooray! We call this quantity "entropy" and we can write
\[dE = \delta Q + \delta W = T\,dS + \sum_i J_i\,dx_i, \]
the well-known *fundamental thermodynamic relation*. Good stuff. We understand what entropy is now and move on with our lives, solving all sorts of problems with gases and wires and whatnot. Right?


## What even is thermodynamics?
My issue with this derivation is that it uses a bunch of words that don't mean anything without thermodynamics. What is "heat," really? What makes one process "reversible" and others not? What kinds of systems are we even studying in thermodynamics? At the end of the day, I can't answer "what is entropy" without having decent answers to each of these questions.

Thus, I'm going to start in a different place. Imagine our system in consideration is just a regular old Hookean spring. Then, we can characterize the state of the system by one variable, the spring's displacement \(x\). Additionally, the system has an internal energy \(U\) given by the formula \( U = \frac12kx^2.\) We graph the state of the system on a \(U\)-\(x\) plot like so:

![U-x plot of Hookean spring](hooke.png)

However, in our observation of springs, we've noticed that they can also transfer energy to the environment without changing their length! That is, even if no work has been done on the spring, it spontaneously transfers some sort of energy to the environment. Being good physicists, we follow the law of conservation of energy, and we write
\[ dU = \delta Q + \delta W,\]
where \(\delta W\) is the *work* done on the system by changing the spring's displacement by an infinitesimal amount \(dx\), and \(\delta Q\) accounts for the rest of the energy---what we shall call *heat*---transferred into the system. 

Importantly, the internal energy \(U\) is no longer a function of \(x\) and represents an *independent degree of freedom*. That is, our system is now allowed to explore all parts of the \(U\)-\(x\) plane, which is our new *state space*! We shall denote this state space by \(\Gamma\). Assuming our spring is still Hookean and the spring constant \(k\) doesn't change with energy or displacement, we have
\[ dW = F(x)\,dx, \]
where the restoring force is \(F(x) = kx \), so we can write
\[dU = \delta Q + F\,dx = \delta Q + kx\,dx.\]
Observe now that if we somehow force the spring system to evolve according to the path \(\gamma: [0,1] \to \Gamma \) through the state space given by
\[ \gamma(0) = (U_0, 0),\qquad \gamma(t) = (U_0 + 1/2k(tx_f)^2, tx_f), \]
then the change in energy will be
\[ dU = \frac{dU}{dx}\,dx = kx\,dx,\]
which can only mean \(\delta Q = 0\). A particular evolution of the system is called a *thermodynamic process*, and, since \(\delta Q =0\) in this case, it is an *adiabatic process*. That is, no heat was transferred in or out of the system!

![An adiabatic process](adiabatic.png)

Cool! We now have a working understanding of heat and adiabatic processes in the case of our spring system. But what about temperature and thermal equilibrium? Doesn't heat have something to do with temperature? Where does that come in? What about "reversible processes"---what are those? 

All these questions are reasonable, and this is where things start to get a little weird. The best explanation I found for where such quantities as "temperature" and "entropy" factor into the 

[ TO BE CONTINUED ]
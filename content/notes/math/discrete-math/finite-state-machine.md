---
title: Finite-State Machine
description: 
date: 2025-04-11T19:49:00Z
keywords: 
draft: false
tags:
---
### Finite-State Machine With Outputs

<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mo>=</mo><mrow><mo stretchy="true" form="prefix">(</mo><mi>S</mi><mo>,</mo><mi>I</mi><mo>,</mo><mi>O</mi><mo>,</mo><mi>f</mi><mo>,</mo><mi>g</mi><mo>,</mo><msub><mi>s</mi><mn>0</mn></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">M = (S,I,O,f,g,s_0)</annotation></semantics></math>
- S states
- input alphabet I
- output alphabet O
- transition function f that assigns to each state and input pair a new state
- output function g that assigns to each state and input pair an output
- initial state s₀

### Finite-State Machine With No Output

Same as above, but a little simpler
<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mo>=</mo><mrow><mo stretchy="true" form="prefix">(</mo><mi>S</mi><mo>,</mo><mi>I</mi><mo>,</mo><mi>O</mi><mo>,</mo><mi>f</mi><mo>,</mo><msub><mi>s</mi><mn>0</mn></msub><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">M = (S,I,O,f,s_0)</annotation></semantics></math>

---
# References

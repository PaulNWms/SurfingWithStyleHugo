---
title: Code Reviews
description: 
date: 2023-10-26T22:22
keywords: 
draft: false
tags:
  - computer
  - HowTo
---
Questions to Ask Yourself When Conducting a Code Review

- Is the code clean and modular?
    - Can I understand the code easily?
    - Does it use meaningful names and whitespace?
    - Is there duplicated code?
    - Can you provide another layer of abstraction?
    - Is each function and module necessary?
    - Is each function or module too long?
- Is the code efficient?
    - Are there loops or other steps we can vectorize?
    - Can we use better data structures to optimize any steps?
    - Can we shorten the number of calculations needed for any steps?
    - Can we use generators or multiprocessing to optimize any steps?
- Is documentation effective?
    - Are in-line comments concise and meaningful?
    - Is there complex code that’s missing documentation?
    - Do function use effective docstrings?
    - Is the necessary project documentation provided?
- Is the code well tested?
    - Does the code have high test coverage?
    - Do tests check for interesting cases?
    - Are the tests readable?
    - Can the tests be made more efficient?
- Is the logging effective?
    - Are log messages clear, concise, and professional?
    - Do they include all relevant and useful information?
    - Do they use the appropriate logging level?

---
# References

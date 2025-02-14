---
title: Jupyter
description: 
date: 2023-12-17
keywords: 
draft: false
tags:
  - Python
---
## Command Mode

- `CTRL-SHIFT-h` - Open a help popup

- `a` - Above
- `b` - Below
- `CTRL-Enter` - Run
    - `c`, `x`, `v` - copy, cut, paste
- `ii` - Interrupt Kernel
- `00` - Restart Kernel
## Edit Mode

- `TAB` - Completion
- `Shift-TAB` - Documentation
- `ESC` - Back to command mode w/o running
- `CTRL-Enter` - Run
## Hints

- Add `?` to functions and methods to see docs
- Add `??` to functions and methods to see source
- Add cell magic to make matplotlib plots show up:
```python
%matplotlib inline
```
- See cell magics
```python
%lsmagic
```
- Add `?` to magic for docs
```python
%timeit?
```

Magic keywords
```python
# set up matplotlib to work interactively in the notebook
%matplotlib

# time how long it takes for a function to run
%timeit fibo1(20)

# time how long it takes for a whole cell to run
%%timeit

# render figures directly in the notebook
%matplotlib inline

# On higher resolution screens, use
%config InlineBackend.figure_format = 'retina'

# turn on the interactive debugger
%pdb

# convert a notebook to HTML, slides
jupyter nbconvert --to html notebook.ipynb
jupyter nbconvert notebook.ipynb --to slides
jupyter nbconvert notebook.ipynb --to slides --post serve
```
---
# References

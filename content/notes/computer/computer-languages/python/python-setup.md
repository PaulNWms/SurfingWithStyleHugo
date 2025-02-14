---
title: Python Setup
description: 
date: 2023-12-17
keywords: 
draft: false
tags:
  - Python
---
## venv

On a clean system, open a PowerShell prompt and type `python`.  This will open Windows Store.  Install it, then set up an environment, and add packages with pip.

```PowerShell
python -m venv pyenv
pyenv\Scripts\activate
pip install notebook numpy matplotlib
jupyter notebook

# or

pip install virtualenv
virtualenv <name>
source <path><name>/bin/activate
deactivate
```
## Anaconda

On a clean system, install Anaconda from [Free Download | Anaconda](https://www.anaconda.com/download).  Open an Anaconda prompt, set up an environment, and add packages.

```CMD
conda create --name condaenv python=3.12
conda activate condaenv
conda install notebook numpy matplotlib
jupyter notebook
```

Some basic commands:

```python
conda upgrade conda
conda upgrade --all
conda install package_name
conda install numpy=1.10
conda remove package_name
conda update package_name
conda list
conda search *beautifulsoup*
conda create -n env_name list of packages
conda create -n py2 python=2
conda create -n py python=3.3
source activate my_env
source deactivate
conda env export > environment.yaml
conda env create -f environment.yaml
conda env list
conda env remove -n env_name
pip freeze > requirements.txt
pip install -r requirements.txt

conda install jupyter notebook
jupyter notebook
conda install nb_conda

# Then if you run the notebook server from a conda environment, you'll also have access to the "Conda" tab.
```

## Other

```PowerShell
# create .exe
pip install pyinstaller
pyinstaller --onefile <filename containing entry point>

# Use InnoSetup to create installer, see links.
```
---
# References

- [Free Download | Anaconda](https://www.anaconda.com/download)
- [Inno Setup install wizard creator](http://www.jrsoftware.org/isinfo.php)  

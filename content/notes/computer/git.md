---
title: Git
date: 2023-10-27T08:34
description: 
keywords: 
draft: false
tags:
---
```lang-none
git init

# print the hash of a string
echo "Apple Pie" | git hash-object --stdin -w

# print the type a hash points to
git cat-file &lt;SHA1&gt; -t

# print the contents of the object referenced by hash
git cat-file &lt;SHA1&gt; -p

# print a commit referenced by hash
git cat-file -p &lt;SHA1 of commit&gt;

# get the number of objects in the repo
git count-objects

# create an annotated tag
git tag -a mytag -m "I love cheesecake"

Git Objects
- Blobs
- Trees
- Commits
- Tags

A branch is a reference to a commit.

HEAD is a reference to a branch, but...

A detached HEAD points directly to a commit.

A merge is a commit with 2 (or more) parents.

1. The current branch tracks new commits
2. When you move to another commit, Git updates your working directory
3. Unreachable objects are garbage collected

Merges preserve history.

Rebases refactor history.

When in doubt, merge.

A tag is like a branch that doesn't move.

Like a local branch, a remote branch is a reference to a commit.

Never rebase shared commits.

The Four Areas
- Working Area
- Index (Staging Area)
- Repository
- Stash

The Two Questions
- How does this command move information across the Four Areas?
- How does this command change the Repository?

# compare Working Area to Staging Area (unusual)
git diff

# compare Staging Area to Repository
git diff --cached

# compare branches
git diff lisa master

# move HEAD to a different branch and copy data from the Repository to the Working Area
git checkout lisa

# remove file from Staging Area
git rm --cached COPYRIGHT

git rm is NOT the opposite of git add

Git automatically finds out when you're renaming or moving files.

# move/rename file
git mv menu.md menu.txt

add copies data from the Working Area to the Staging Area

commit copies data from the Staging Area to the Repository

checkout copies data from the Repository to the Working Area and the Staging Area

rm deletes files from both the Working Area and the Staging Area

mv moves a file in both the Working Area and the Staging Area

reset moves the current branch, and optionally copies data from the Repository to the other
areas

# revert changes in Staging Area
git reset HEAD

# revert changes in Working Area and Staging Area
git reset --hard HEAD

... BUT

# revert single file in Stating Area
git reset HEAD &lt;file&gt;

# revert single file in Working Area and Staging Area
# (if this looks wierd, that means you were paying attention)
git checkout HEAD &lt;file&gt;

# save off current state and pull from Repository
git stash --include-untracked

# recover stashed files
git stash apply

# clean up stash
git stash list
git stash clear

# inspect object
git show &lt;SHA1&gt;

# show history
git log --graph --decorate --oneline

# inspect commits up to 1 month ago
git show HEAD@@{"1 month ago"}

# show history of who changed lines
git blame &lt;file&gt;

# show delta between commits
git diff HEAD HEAD~2

# show changes that contain specific words
git log --grep apples --oneline

# show commits that added or removed specific words
git log -Gapples --patch

# show range of commits
git log HEAD~5..HEAD^ --oneline

# show all the commits between branches 
git log nogood..master --oneline

# sets up Git with your name
git config --global user.name "&lt;Your-Full-Name&gt;"

# change the current commit
git commit --amend

# manually edit history
git rebase -i

# look at reference log
git reflog

# automatically create a reversing commit
git revert &lt;SHA1&gt;

Be careful when you revert merge commits.

"revert" doesn't mean "undo"

Distribution Models
- Peer-to-Peer
- Centralized
- Pull Request
- Dictator and Lieutenants

# sets up Git with your email
git config --global user.email "&lt;your-email-address&gt;"

# makes sure that Git output is colored
git config --global color.ui auto

# displays the original state in a conflict
git config --global merge.conflictstyle diff3

# editor defaults to vim
git config --global core.editor ("vim"|"code --wait")

git config --list

git init

git clone &lt;URL&gt; [target-name]

git status

git log [--oneline|--stat|-p] [SHA]

# show log of all branches
git log --oneline --graph --all

# show various types of objects
git show &lt;SHA&gt;

git add (.|&lt;file&gt;)

git rm --cached &lt;file&gt;

git commit [-m "&lt;message&gt;"]

git diff

The .gitignore file is used to tell Git about the files that Git should not track.

git tag -a &lt;tag&gt; [&lt;SHA&gt;]

# list branches
git branch

# create branch
git branch &lt;branch&gt;

# delete branch
git branch &lt;branch&gt; (-d|-D)

git checkout &lt;branch&gt;

# create and checkout branch
git checkout -b &lt;branch&gt;

# ☞ back out pending changes to a specific file (`revert' in most other repos)
git checkout &lt;path/to/file&gt;

git merge &lt;name-of-branch-to-merge-in&gt;

A Fast-forward merge will just move the currently checked out branch forward until it points to
the same commit that the other branch is pointing to.

# alter the most recent commit
git commit --amend

git revert &lt;SHA-of-commit-to-revert&gt;

Here's how we can refer to previous commits:
the parent commit – the following indicate the parent commit of the current commit
HEAD^
HEAD~
HEAD~1
the grandparent commit – the following indicate the grandparent commit of the current commit
HEAD^^
HEAD~2 
the great-grandparent commit – the following indicate the great-grandparent commit of the
current commit
HEAD^^^
HEAD~3

# delete a commit
git reset &lt;reference-to-commit&gt;

# show full path to the remote repository
git remote -v

# add a connection to a new remote repository
git remote add origin https://github.com/PaulNWms/&lt;repo-name&gt;.git

git push origin master

# fetch and merge
git pull origin master

# fetch without merging
git fetch origin master

git merge origin/master

Forking a repository creates an identical copy of a repository and moves this copy to your
GitHub account.

# show contributors
git shortlog

# sort by activity
git shortlog -s -n

# show commits by author
git log --author="&lt;name&gt;"

git log --grep="&lt;regex&gt;"

CONTRIBUTING.md

# add a connection to a project's main repository (not your fork)
git remote add upstream https://github.com/

# in case you don't like working with 'origin' and 'upstream'
git remote rename &lt;name&gt; &lt;new-name&gt;

# bring project's main repository changes into our local branch
git fetch upstream master

To get commits from a source repository into your forked repository on GitHub you need to:
- get the cloneable URL of the source repository
- create a new remote with the git remote add command 
-- use the shortname upstream to point to the source repository
-- provide the URL of the source repository
- fetch the new upstream remote
- merge the upstream's branch into a local branch
- push the newly updated local branch to your origin repo

# squash 3 commits together
# create a backup branch before git rebase
git rebase -i HEAD~3

# then the change will have to be force pushed to your fork
git push -f origin &lt;branch&gt;

# apply changes to repo after updating .gitignore
git rm -r --cached .
git add .
```


---
# References

- [Git](https://git-scm.com/)  
- [Git Cheat Sheet](http://www.cheat-sheets.org/saved-copy/git-cheat-sheet.pdf)  
- [Udacity Git Commit Message Style Guide](http://udacity.github.io/git-styleguide/)  
- [UP-FOR-GRABS.net](http://up-for-grabs.net/)  
- [First Timers Only](http://www.firsttimersonly.com/)  
- [first-timers-only label on GitHub](https://github.com/search?utf8=%E2%9C%93&q=label%3Afirst-timers-only+is%3Aopen&type=Issues&ref=searchresults)  
- ["first timers only" blog post](https://blog.kentcdodds.com/first-timers-only-78281ea47455)  
- [try tackling some Git and GitHub challenges with the Git-it app](https://github.com/jlord/git-it-electron)  
- [First Pull Request](http://firstpr.me/)  
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)  
- [About merge conflicts](https://help.github.com/en/articles/about-merge-conflicts)  
- [How to Version Control Your Production Machine Learning Models](https://blog.algorithmia.com/how-to-version-control-your-production-machine-learning-models/)  
- [Versioning Data Science](https://shuaiw.github.io/2017/07/30/versioning-data-science.html)  

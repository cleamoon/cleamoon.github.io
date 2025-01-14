---
title: Simple git references
date: 2022-03-15 00:19:22
tags: [git]
---

A list of a few commonly used git commands. 

<!-- more -->


## Getting help

* `git help command` or `git command --help`: Show help for a command



## Repository creation

* `git init`: Create a repository in the current directory
* `git clone` _url_: Clone a remote repository into a subdirectory



## File operations

* `git add` _[dir]_ _[file1]_ _[file2]_: Add file or files in directory recursively
* `git rm` _path_: Remove file from the working tree
  * `-f`: Force deletion of file(s) from disk
* `git mv` _path destination_: Move file or directory to new location
  * `-f`: Overwrite existing destination files
* `git checkout` _[rev] file_: Restore file from current branch or revision
  * `-f`: Overwrite uncommitted local changes



## Working tree

* `git status` _-s_: Show status of the working tree
* `git diff` _[path]_: Show diff of changes in the working tree
* `git diff` HEAD _path_: Show diff of stages and unstaged changes
* `git diff` _--cached --stat_: Show diff of staged changes
* `git add` _path_: Stage file for commit
* `git reset` HEAD _path_: Unstage file for commit
* `git commit` _[-m 'msg']_: Commit file that has been staged
  * `-a`: Automatically stage all modified files
  * `--amend`: Replace last commit for a new one
* `git reset` --soft HEAD^: Undo commit and keep changes in the workingtree
* `git reset` --head HEAD^: Reset the working tree to the last commit
* `git clean`: Clean unknown files from the working tree
* `git revert` _[rev]_: Reverse commit specified by _<rev>_



## Examining history

* `git log` _[path]_: View commit log, optionally for specific path
  * _^branch_: View commit log without branch
* `git log`: _[from [...to]]_: View commit log for a given revision range
  * _--stat_: List diffstat for each revision
  * _--oneline --graph --decorate_: Show recent commits with decoration
* `git blame` _[file]_: Show who authored each line
* `git ls-files`: List all files in the index
* `git whatchanged`: Show logs with difference



## Remote repositories

* `git fetch` _[repo]_: Fetch changes from a remote repository
* `git pull` _[repo]_: Fetch and merge changes from a remote repo
* `git push` _[repo] [branch]_: Push changes to a remote repository
* `git remote`: List remote repositories
* `git remote add` _remote url_: Add remote to list of tracked repositories



## Branches

* `git checkout` branch: Switch working tree to branch
  * _-b branch_: Create branch before switching to it
* `git branch`: List local branches
  * _-d branch_: Delete the branch
* `git branch` -f _branch rev_: Overwrite existing branch start from revision
* `git merge` _branch_: Merge changes from branch to actual branch
* `git mergetool`: Working through conflicted files



## Exporting and importing

* `git apply -`  < _file_: Apply patch from stdin
* `git format-patch` _from [...to]_: Format a patch with log message and diffstat
* `git archive` _rev > file_: Export snapshot of revision to file
  * --prefix=_dir/_: Nest all files in the snapshot in directory
  * --format=_[tar/zip]_: Specify archive format to use, tar or zip



## Tags

* `git tag` _name [revision]_: Create tag for a given revision
  * _-s_: Sign tag with your private key using GPG
  * _-l [pattern]_: List tags, optionally matching pattern



## File status flags

* `M`odified: File has been modified
* `C`opy-edit: File has been copied and modified
* `R`ename-edit: File has been renamed and modified
* `A`dded: File has been added
* `D`eleted: File has been deleted
* `U`nmerged: File has conflicts after a merge



## Configuring

* `git config --global user.name ` 'name'
* `git config --global user.email ` 'name@email.com'



## Use Git as a magic time machine

```shell
git reflog
# you will see a list of every thing you've
# done in git, across all branches!
# each one has an index HEAD@{index}
# find the one before you broke everything
git reset HEAD@{index}
# magic time machine
```



## Make the last commit including the new changes

```shell
# make your change
git add . # or add individual files
git commit --amend --no-edit
# now your last commit contains that change!
# WARNING: never amend public commits
```



## Change message of the last commit

```shell
git commit --amend
# follow prompts to change the commit message
```



## Saving when committed to the wrong branch

```shell
git checkout name-of-the-correct-branch
# grab the last commit to master
git cherry-pick master
# delete it from master
git checkout master
git reset HEAD~ --hard
```



## Undo a change to a file

```shell
# find a hash for a commit before the file was changed
git log
# use the arrow keys to scroll up and down in history
# once you've found your commit, save the hash
git checkout [saved hash] -- path/to/file
# the old version of the file will be in your index
git commit -m "Wow, you don't have to copy-paste to undo"
```





## References

1. [Git cheat sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

2. [Oh Shit, Git!?!](https://ohshitgit.com)

---
title: Simple Guide to Find Command
date: 2021-08-13
mathjax: true
tags: [Shell]
---

The find command is one of the most powerful tools in the Linux system. It searches for files and directories based on their permissions, type, ownership, size, and more. It can also be combined with other tools such as `grep` or `sed`

<!-- more -->

## Command syntax
The general syntax for the `find` command is as follows: 

```bash
find [options] [path...] [expressio]
```

* The `options` attribute controls the treatment of the symbolic links
* The `path...` attribute defines the starting directory or directories where find will search the files
* The `expression` attribute is made up of options, search patterns, and actions separated by operators


### Find files by name
To find a file by its name, use the `-name` option followed by the name of the file you are searching for. To run a case-insensitive search, change the `-name` option with `-iname`

For example:

```bash
find /home/username -type f -name document.pdf
```


### Find files by extension
Searching for files by extension is the same as searching for files by name

For example:

```bash
find /var/log/nginx -type f -name '*.log.gz'
``` 


### Find files by type
To search for fiels based on their type, use the `-type` option and one of the following descriptors to specify the type:

* `f`: a regular file
* `d`: directory
* `l`: symbolic link
* `c`: character devices
* `b`: block devices
* `p`: named pipe (FIFO) 
* `s`: socket

For example: 

```bash
find /var/www/my_website -type d -exec chmod 0755 {} \;
find /var/www/my_website -type f -exec chmod 0644 {} \;
```


### Find files by size
To find files based on the file size, pass the `-szie` parameter along with the size criteria. You can use the following suffixes to specify the file size

* `b`: 512-byte blocks (default)
* `c`: byte
* `w`: two-byte words
* `k`: kilobytes
* `M`: Megabytes
* `G`: Gigabytes

For example

```bash
find /tmp -type f -size 1024c
```

The `find` command also allows you to search for files that are greater or less than a specified size

```bash
find . -type f -size -1M	// less than 1M
find . -type f -size +1M	// greater than 1M
find . -type f -size +1M -size -2M	// between 1 and 2M
```


### Find files by modification date
To search for files based on their last modification, access, or changed time, we can use a syntax similar to size. To use the plus and minus symbols for "greater than" or "less than" and use the `-daystart` option

For example:

```bash
find /home -name "*.conf" -mtime 5	// search for files that has been modified in the last five days
find /home -mtime +30 -daystart // search for files that were modified 30 or more days ago
```


### Find files by permissions
The `-perm` option allows you to search for files based on the file permissions

For example, to find all files with permissions of exactly `644` inside the `/var/www/html` directory

```bash
find /var/www/html -perm 644
```

You can prefix the numeric mode with minus `-` or flash `/`. When slash `/` is used as the prefix, then at least one category (user, group, or others) must have at least the respective bits set for a file to match. If minus `-` is used as the prefix, then for the file to match, at least the specified bits must be set


### Find files by owner
To find files owned by a particular user or group, use the `-user` and `-group` options

```bash
find / -user username
```


### Find and delete files
To delete all matching files, append the `-delete` option to the end of the match expression

```bash
find /var/log/ -name `*.temp` -delete
```

### Find and execute commands
For example renaming files from `js` extension to `tsx` extension:

```bash
find ./ -depth -name "*.tsx" -exec sh -c 'mv "$1" "${1%.tsx}.js"' _ {} \;
```


## Symbolic links
To specify the behavior of `find` about the symbolic links, we can use the options `-H`, `-L`, and `-P`. They must appear before the first path name

* `-P`: Never follow symbolic links. This is the default behavior
* `-L`: Follow symbolic links
* `-H`: Do not follow symbolic links, except while processing the command line arguments


## Other options
There are many other options for fine tuning. The debugger, optimizer and print function are especially useful. 



## References
1. [linuxize](https://linuxize.com/post/how-to-find-files-in-linux-using-the-command-line/)
2. [manpage](https://linux.die.net/man/1/find)

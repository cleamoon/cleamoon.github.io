---
title: Shell Scripting Note
date: 2020-07-03
mathjax: true
tags: [Shell, Programming]
---

Simple notes for writing shell scripts. 

<!-- more -->

## 1. Introduction

### prompt setup:

``` Bash
PS1="$ " ; export PS1
```

### Example

``` Bash
#!/bin/sh
# This is a comment!
echo Hello World	# This is a comment, too!
```

## 2. Philosophy

* most important criteria must be a clear, readable layout.
* avoiding unnecessary commands.
* avoiding useless code for example [those](http://porkmail.org/era/unix/award.html). 

## 3. A First Script

``` Bash
#!/bin/sh
# This is a comment!
echo Hello World	# This is a comment, too!
```

## 4. Variables - Part I

Example

``` Bash
#!/bin/sh
MY_MESSAGE="Hello World"
echo $MY_MESSAGE
```

Read input

``` Bash
#!/bin/sh
echo What is your name?
read MY_NAME
echo "Hello $MY_NAME - hope you're well."
```

Source a script via the "." (dot) command:

``` Bash
$ MYVAR=hello
$ echo $MYVAR
hello
$ . ./myvar2.sh
MYVAR is: hello
MYVAR is: hi there
$ echo $MYVAR
hi there
```

Get value from a variable:

``` Bash
#!/bin/sh
echo "What is your name?"
read USER_NAME
echo "Hello $USER_NAME"
echo "I will create you a file called ${USER_NAME}_file"
touch "${USER_NAME}_file"
```

## 5. Wildcards

``` Bash
$ cp /tmp/a/* /tmp/b/
$ cp /tmp/a/*.txt /tmp/b/
$ cp /tmp/a/*.html /tmp/b/
$ mkdir rc{0,1,2,3,4,5,6,S}.d
```

## 6. Escape Characters

``` Bash
$ echo "A quote is \", backslash is \\, backtick is \`."
A quote is ", backslash is \, backtick is `.
$ echo "A few spaces are    and dollar is \$. \$X is ${X}."
A few spaces are    and dollar is $. $X is 5.
```

## 7. Loops

For loop

``` Bash
#!/bin/sh
for i in 1 2 3 4 5
do
  echo "Looping ... number $i"
done
```

While loop

``` Bash
#!/bin/sh
INPUT_STRING=hello
while [ "$INPUT_STRING" != "bye" ]
do
  echo "Please type something in (bye to quit)"
  read INPUT_STRING
  echo "You typed: $INPUT_STRING"
done
```

The colon (:) always evaluates to true.

``` Bash
#!/bin/sh
while read f
do
  case $f in
	hello)		echo English	;;
	howdy)		echo American	;;
	gday)		echo Australian	;;
	bonjour)	echo French	;;
	"guten tag")	echo German	;;
	*)		echo Unknown Language: $f
		;;
   esac
done < myfile
```

## 8. Test

Example 

``` Bash
#!/bin/sh
if [ "$X" -lt "0" ]
then
  echo "X is less than zero"
fi
if [ "$X" -gt "0" ]; then
  echo "X is more than zero"
fi
[ "$X" -le "0" ] && \
      echo "X is less than or equal to  zero"
[ "$X" -ge "0" ] && \
      echo "X is more than or equal to zero"
[ "$X" = "0" ] && \
      echo "X is the string or number \"0\""
[ "$X" = "hello" ] && \
      echo "X matches the string \"hello\""
[ "$X" != "hello" ] && \
      echo "X is not the string \"hello\""
[ -n "$X" ] && \
      echo "X is of nonzero length"
[ -f "$X" ] && \
      echo "X is the path of a real file" || \
      echo "No such file: $X"
[ -x "$X" ] && \
      echo "X is the path of an executable file"
[ "$X" -nt "/etc/passwd" ] && \
      echo "X is a file which is newer than /etc/passwd"
```

We can use the semicolon (;) to join two lines together. The backslash (\\) serves a similar, but opposite purpose.

Check input:

``` Bash
echo -en "Please guess the magic number: "
read X
echo $X | grep "[^0-9]" > /dev/null 2>&1
if [ "$?" -eq "0" ]; then
  # If the grep found something other than 0-9
  # then it's not an integer.
  echo "Sorry, wanted a number"
else
  # The grep found only 0-9, so it's an integer. 
  # We can safely do a test on it.
  if [ "$X" -eq "7" ]; then
    echo "You entered the magic number!"
  fi
fi
```

`grep [^0-9]` finds only those lines which don't consist only of numbers.

## 9. Case

Example

``` Bash
#!/bin/sh
echo "Please talk to me ..."
while :
do
  read INPUT_STRING
  case $INPUT_STRING in
	hello)
		echo "Hello yourself!"
		;;
	bye)
		echo "See you again!"
		break
		;;
	*)
		echo "Sorry, I don't understand"
		;;
  esac
done
echo 
echo "That's all folks!"
```

## 10. Variables - Part II

The variable `$0` is the basename of the program as it was called. 
`$1 .. $9` are the first 9 additional parameters the script was called with. 
The variable `$@` is all parameters `$1 .. whatever`. 
The variable `$*`, is similar, but does not preserve any whitespace or quoting.
`$#` is the number of parameters the script was called with. 
The `$$` variable is the PID (Process Identifier) of the currently running shell.
The `$!` variable is the PID of the last run background process.
The `IFS` is the Internal Field Separator. The default value is `SPACE TAB NEWLINE`.

Example

``` Bash
#!/bin/sh
while [ "$#" -gt "0" ]
do
  echo "\$1 is $1"
  shift
done
```

This script keeps on using shift until $# is down to zero.

``` Bash
#!/bin/sh
/usr/local/bin/my-command
if [ "$?" -ne "0" ]; then
  echo "Sorry, we had a problem there!"
fi
```

How to use `IFS`:

``` Bash
#!/bin/sh
old_IFS="$IFS"
IFS=:
echo "Please input some data separated by colons ..."
read x y z
IFS=$old_IFS
echo "x is $x y is $y z is $z"
```

## 11. Variables - Part III

By using curly braces and the special ":-" usage, you can specify a default value to use if the variable is unset.

``` Bash
#!/bin/sh
echo -en "What is your name [ `whoami` ] "
read myname
echo "Your name is : ${myname:-`whoami`}"
```

## 12. External Programs

The backtick is used to indicate that the enclosed text is to be executed as a command. Basically, there is no scoping, other than the parameters (`$1`, `$2`, `$@`, etc)

``` Bash
#!/bin/sh
HTML_FILES=`find / -name "*.html" -print`
echo "$HTML_FILES" | grep "/index.html$"
echo "$HTML_FILES" | grep "/contents.html$"
```

Recursion

``` Bash
#!/bin/sh
factorial()
{
  if [ "$1" -gt "1" ]; then
    i=`expr $1 - 1`
    j=`factorial $i`
    k=`expr $1 \* $j`
    echo $k
  else
    echo 1
  fi
}

while :
do
  echo "Enter a number:"
  read x
  factorial $x
done    
```

Libraries:

``` Bash
# common.lib
# Note no #!/bin/sh as this should not spawn 
# an extra shell. It's not the end of the world 
# to have one, but clearer not to.
#
STD_MSG="About to rename some files..."

rename()
{
  # expects to be called as: rename .txt .bak 
  FROM=$1
  TO=$2

  for i in *$FROM
  do
    j=`basename $i $FROM`
    mv $i ${j}$TO
  done
}
```

``` Bash
#!/bin/sh
# function1.sh
. ./common.lib
echo $STD_MSG
rename .txt .bak
```

``` Bash
#!/bin/sh
# function2.sh
. ./common.lib
echo $STD_MSG
rename .html .html-bak
```

## 14. Hints and Tips

### Exit Codes

Exit codes are a number between 0 and 255, which is returned by any Unix command when it returns control to its parent process.

``` Bash
#!/bin/sh

check_errs()
{
  # Function. Parameter 1 is the return code
  # Para. 2 is text to display on failure.
  if [ "${1}" -ne "0" ]; then
    echo "ERROR # ${1} : ${2}"
    # as a bonus, make our script exit with the right error code.
    exit ${1}
  fi
}

### main script starts here ###

grep "^${1}:" /etc/passwd > /dev/null 2>&1
check_errs $? "User ${1} not found in /etc/passwd"
USERNAME=`grep "^${1}:" /etc/passwd|cut -d":" -f1`
check_errs $? "Cut returned an error"
echo "USERNAME: $USERNAME"
check_errs $? "echo returned an error - very strange!"
```

### Avoid too many `if`

``` Bash
#!/bin/sh
cp /foo /bar && echo Success || echo Failed
```

### Trap

``` Bash
#!/bin/sh

trap cleanup 1 2 3 6

cleanup()
{
  echo "Caught Signal ... cleaning up."
  rm -rf /tmp/temp_*.$$
  echo "Done cleanup ... quitting."
  exit 1
}

### main script
for i in *
do
  sed s/FOO/BAR/g $i > /tmp/temp_${i}.$$ && mv /tmp/temp_${i}.$$ $i
done
```

The trap statement tells the script to run cleanup() on signals 1, 2, 3 or 6. The most common one (CTRL-C) is signal 2 (SIGINT).

## 15. Run software with certain environment Variables

```shell
#!/bin/sh 
__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only __GLX_VENDOR_LIBRARY_NAME=nvidia $1
``` 

Here `$1` is the first command line argument and this script will run it will those environment variable. 

## Unzip with unicode password in unknown charset

For unzipping all kinds of chinese charsets:

```shell
password='password'
zip=file.zip

target_codes=(
    UTF-8 UTF-16 UTF-16BE UTF-16LE ISO-8859-1 ISO-2022-JP ISO-2022-CN SHIFT-JIS EUC-CN EUC-JP EUC-JP-MS EUCJP BIG5 CN CN-GB CN-BIG5 GB2312 GB18030 GBK EUC-KR ISO-2022-KR JOHAB
)

for target in "${target_codes[@]}"; do
    echo TRYING $target
    unzip -P $(printf "$password" | iconv -f UTF-8 -t $target) "$zip" && break
done
```

## A. References

* [Shell Scripting Tutorial](https://www.shellscript.sh/)
* [解压未知编码做密码的压缩包 Unzip with unicode password in unknown charset](https://recolic.net/blog/post/%E8%A7%A3%E5%8E%8B%E6%9C%AA%E7%9F%A5%E7%BC%96%E7%A0%81%E5%81%9A%E5%AF%86%E7%A0%81%E7%9A%84%E5%8E%8B%E7%BC%A9%E5%8C%85-unzip-with-unicode-password-in-unknown-charset)
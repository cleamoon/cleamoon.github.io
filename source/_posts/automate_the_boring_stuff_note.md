---
title: Automate the Boring Stuff Book Note
date: 2020-04-06
mathjax: true
tags: [Book note, Python, Programming]
---

_Automate the Boring Stuff with Python_ is a introductory book of Python and some common daily usage of it. It contains lots of good examples. This post lists some notes of the book. 

<!-- more -->

##### String partition

``` python
>>> 'Hello, world!'.partition('o')
('Hell', 'o', ', world!')

>>> 'Hello, world!'.partition('XYZ')
('Hello, world!', '', '')

>>> 'Hello'.center(20, '=')
'=======Hello========'
```



##### Copy and paste strings with pyperclip module

``` python
>>> import pyperclip
>>> pyperclip.copy('Hello, world!')
>>> pyperclip.paste()
'Hello, world!'
```



##### Regular expression

Some examples:

``` python
# If you would like to retrieve all the groups at once, use the groups() method
>>> phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d-\d\d\d\d)')
>>> mo = phoneNumRegex.search('My number is 415-555-4242.')
>>> mo.group(1)
'415'
>>> mo.group(2)
'555-4242'
>>> mo.group(0)
'415-555-4242'
>>> mo.group()
'415-555-4242'

# You can use a pipe '|' anywhere you want to match one of many expressions
>>> batRegex = re.compile(r'Bat(man|mobile|copter|bat)')
>>> mo = batRegex.search('Batmobile lost a wheel')
>>> mo.group()
'Batmobile'
>>> mo.group(1)
'mobile'

>>> batRegex = re.compile(r'Bat(wo)+man')
>>> mo1 = batRegex.search('The Adventures of Batwoman')
>>> mo1.group()
'Batwoman'
>>> mo2 = batRegex.search('The Adventures of Batwowowowoman')
>>> mo2.group()
'Batwowowowoman'

# Python’s regular expressions are greedy by default
# The lazy version has the closing brace followed by a question mark
>>> greedyHaRegex = re.compile(r'(Ha){3,5}')
>>> mo1 = greedyHaRegex.search('HaHaHaHaHa')
>>> mo1.group()
'HaHaHaHaHa'
>>> nongreedyHaRegex = re.compile(r'(Ha){3,5}?')
>>> mo2 = nongreedyHaRegex.search('HaHaHaHaHa')
>>> mo2.group()
'HaHaHa'

>>> phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d)-(\d\d\d\d)') # has groups
>>> phoneNumRegex.findall('Cell: 415-555-9999 Work: 212-555-0000')
[('415', '555', '9999'), ('212', '555', '0000')]

>>> xmasRegex = re.compile(r'\d+\s\w+')
>>> xmasRegex.findall('12 drummers, 11 pipers, 10 lords, 9 ladies, 8 maids, 7 swans, 6 geese, 5 rings, 4 birds, 3 hens, 2 doves, 1 partridge')
['12 drummers', '11 pipers', '10 lords', '9 ladies', '8 maids', '7 swans', '6 geese', '5 rings', '4 birds', '3 hens', '2 doves', '1 partridge']

# ^ just after the character class’s opening bracket is the negative character class
>>> consonantRegex = re.compile(r'[^aeiouAEIOU]')
>>> consonantRegex.findall('RoboCop eats baby food. BABY FOOD.')
['R', 'b', 'C', 'p', ' ', 't', 's', ' ', 'b', 'b', 'y', ' ', 'f', 'd', '.', ' ', 'B', 'B', 'Y', ' ', 'F', 'D', '.']

# The r'\d$' regular expression string matches strings that end with a numeric character from 0 to 9
>>> endsWithNumber = re.compile(r'\d$')
>>> endsWithNumber.search('Your number is 42')
<re.Match object; span=(16, 17), match='2'>

>>> atRegex = re.compile(r'.at')
>>> atRegex.findall('The cat in the hat sat on the flat mat.')
['cat', 'hat', 'sat', 'lat', 'mat']

>>> nameRegex = re.compile(r'First Name: (.*) Last Name: (.*)')
>>> mo = nameRegex.search('First Name: Al Last Name: Sweigart')
>>> mo.group(1)
'Al'
>>> mo.group(2)
'Sweigart'

# Case-insensitive matching
>>> robocop = re.compile(r'robocop', re.I)
>>> robocop.search('RoboCop is part man, part machine, all cop.').group()
'RoboCop'

# Substitution
>>> namesRegex = re.compile(r'Agent \w+')
>>> namesRegex.sub('CENSORED', 'Agent Alice gave the secret documents to Agent Bob.')
'CENSORED gave the secret documents to CENSORED.'

# Combine modes
>>> someRegexValue = re.compile('foo', re.IGNORECASE | re.DOTALL | re.VERBOSE)
```

Character classes

| **Shorthand character class** | **Represents**                                               |
| ----------------------------- | ------------------------------------------------------------ |
| \d                            | Any numeric digit from 0 to 9.                               |
| \D                            | Any character that is *not* a numeric digit from 0 to 9.     |
| \w                            | Any letter, numeric digit, or the underscore character. (Think of this as matching “word” characters.) |
| \W                            | Any character that is *not* a letter, numeric digit, or the underscore character. |
| \s                            | Any space, tab, or newline character.                        |
| \S                            | Any character that is *not* a space, tab, or newline.        |



##### Input validation with PYINPUTPLUS module

``` python
>>> import pyinputplus as pyip
>>> response = pyip.inputInt(prompt='Enter a number: ')
Enter a number: cat
'cat' is not an integer.

>>> response = pyip.inputNum('>', min=4, lessThan=6)
Enter num: 6
Input must be less than 6.
Enter num: 3
Input must be at minimum 4.

>>> response = pyip.inputNum(blank=True, default=42)
(blank input entered here)

>>> response = pyip.inputNum(limit=2)
blah
'blah' is not a number.
Enter num: number
'number' is not a number.
Traceback (most recent call last):
    --snip--
pyinputplus.RetryLimitException
>>> response = pyip.inputNum(timeout=10)
42 (entered after 10 seconds of waiting)
Traceback (most recent call last):
    --snip--
pyinputplus.TimeoutException

>>> response = pyip.inputNum(allowRegexes=[r'(I|V|X|L|C|D|M)+', r'zero'])
>>> response = pyip.inputNum(blockRegexes=[r'[02468]$'])
```

You can also passing a custom validation function to `inputCustom()`. The custom function should have the following properties:

* Accepts a single string argument of what the user entered
* Raises an exception if the string fails validation
* Returns `None` or do not return if the `inputCustom()` should return the string unchanged
* Otherwise return a non-`None` value. 
* This function shall be passed as the first argument to `inputCustom()`



##### Portable paths

``` python
>>> from pathlib import Path
>>> Path('spam', 'bacon', 'eggs')
WindowsPath('spam/bacon/eggs')

>>> from pathlib import Path
>>> myFiles = ['accounts.txt', 'details.csv', 'invite.docx']
>>> for filename in myFiles:
        print(Path(r'C:\Users\Al', filename))
C:\Users\Al\accounts.txt
C:\Users\Al\details.csv
C:\Users\Al\invite.docx
    
>>> from pathlib import Path
>>> Path('spam') / 'bacon' / 'eggs'
WindowsPath('spam/bacon/eggs')
>>> Path('spam') / Path('bacon/eggs')
WindowsPath('spam/bacon/eggs')
>>> Path('spam') / Path('bacon', 'eggs')
WindowsPath('spam/bacon/eggs')

>>> import os
>>> Path.cwd()
WindowsPath('C:/Users/Al/AppData/Local/Programs/Python/Python37')'
>>> os.chdir('C:\\Windows\\System32')
>>> Path.cwd()
WindowsPath('C:/Windows/System32')

>>> Path.home()
WindowsPath('C:/Users/Al')

>>> Path.cwd().is_absolute()
True
>>> Path('spam/bacon/eggs').is_absolute()
False

>>> Path('my/relative/path')
WindowsPath('my/relative/path')
>>> Path.cwd() / Path('my/relative/path')
WindowsPath('C:/Users/Al/AppData/Local/Programs/Python/Python37/my/relative/
path')

>>> os.path.abspath('.\\Scripts')
'C:\\Users\\Al\\AppData\\Local\\Programs\\Python\\Python37\\Scripts'

# Regex command using in command line can be used with glob
>>> list(p.glob('*.txt') # Lists all text files.
[WindowsPath('C:/Users/Al/Desktop/foo.txt'),
  --snip--
WindowsPath('C:/Users/Al/Desktop/zzz.txt')]

>>> winDir = Path('C:/Windows')
>>> winDir.exists()
True
>>> winDir.is_dir()
True
>>> winDir.is_file()
False
```



##### Write and read variables in file

It can be done with `shelve` module.

``` python
>>> import shelve
>>> shelfFile = shelve.open('mydata')
>>> cats = ['Zophie', 'Pooka', 'Simon']
>>> shelfFile['cats'] = cats
>>> shelfFile.close()

>>> shelfFile = shelve.open('mydata')
>>> type(shelfFile)
<class 'shelve.DbfilenameShelf'>
>>> shelfFile['cats']
['Zophie', 'Pooka', 'Simon']
>>> shelfFile.close()
```

Or with the `pprint.pformat()` function.

```python
>>> import pprint
>>> cats = [{'name': 'Zophie', 'desc': 'chubby'}, {'name': 'Pooka', 'desc': 'fluffy'}]
>>> pprint.pformat(cats)
"[{'desc': 'chubby', 'name': 'Zophie'}, {'desc': 'fluffy', 'name': 'Pooka'}]"
>>> fileObj = open('myCats.py', 'w')
>>> fileObj.write('cats = ' + pprint.pformat(cats) + '\n')
83
>>> fileObj.close()

>>> import myCats
>>> myCats.cats
[{'name': 'Zophie', 'desc': 'chubby'}, {'name': 'Pooka', 'desc': 'fluffy'}]
>>> myCats.cats[0]
{'name': 'Zophie', 'desc': 'chubby'}
>>> myCats.cats[0]['name']
'Zophie'
```



##### Organizing files

* copy, move and rename files like in shell with `shutil` (shell utilities) module.

  ```python
  >>> shutil.copy(p / 'spam.txt', p / 'some_folder')
  >>> shutil.copytree(p / 'spam', p / 'spam_backup')
  >>> shutil.move('C:\\bacon.txt', 'C:\\eggs\\new_bacon.txt')
  ```

* permanently deleting files or folders.

  * `os.unlink(file)`  deletes a file.
  * `os.rmdir(folder)` deletes an empty folder.
  * `shutil.rmtree(folder)` deletes a folder and everything within it.

* safe deletion with `send2trash` module.

* managing `zip` files with `zipfile` module

  * creation

    ```python
    >>> import zipfile
    >>> newZip = zipfile.ZipFile('new.zip', 'w')
    >>> newZip.write('spam.txt', compress_type=zipfile.ZIP_DEFLATED)
    >>> newZip.close()
    ```

  * extraction

    ```python
    >>> exampleZip = zipfile.ZipFile(Path.home() / 'example.zip')
    >>> exampleZip.extract('spam.txt')
    'C:\\spam.txt'
    >>> exampleZip.extract('spam.txt', 'C:\\some\\new\\folders')
    'C:\\some\\new\\folders\\spam.txt'
    >>> exampleZip.extractall()
    >>> exampleZip.close()
    ```

  * read

    ````python
    >>> exampleZip = zipfile.ZipFile(Path.home() / 'example.zip')
    >>> exampleZip.namelist()
    ['spam.txt', 'cats/', 'cats/catnames.txt', 'cats/zophie.jpg']
    >>> spamInfo = exampleZip.getinfo('spam.txt')
    >>> spamInfo.file_size
    13908
    >>> spamInfo.compress_size
    3828
    ````




##### Assertions

* Example

  `````python
  >>> ages = [26, 57, 92, 54, 22, 15, 17, 80, 47, 73]
  >>> ages.reverse()
  >>> ages
  [73, 47, 80, 17, 15, 22, 54, 92, 57, 26]
  >>> assert ages[0] <= ages[-1] 
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  AssertionError
  `````

* Unlike exceptions, your code should not handle assert statements with try and except; if an assert fails, your program should crash

* Assertions are for programmer errors, not user errors



##### Logging 

* Example

  ````python
  >>> import logging
  >>> logging.basicConfig(level=logging.DEBUG, format=' %(asctime)s - %(levelname)s -  %(message)s')
  >>> logging.debug('Some debugging details.')
  2019-05-18 19:04:26,901 - DEBUG - Some debugging details.
  >>> logging.info('The logging module is working.')
  2019-05-18 19:04:35,569 - INFO - The logging module is working.
  >>> logging.warning('An error message is about to be logged.')
  2019-05-18 19:04:56,843 - WARNING - An error message is about to be logged.
  >>> logging.error('An error has occurred.')
  2019-05-18 19:05:07,737 - ERROR - An error has occurred.
  >>> logging.critical('The program is unable to recover!')
  2019-05-18 19:05:45,794 - CRITICAL - The program is unable to recover!
  ````

* Logging level from lowest to highest

  * `logging.debug()`
  * `logging.info()`
  * `logging.warning()`
  * `logging.error()`
  * `logging.critical()`

* Disable logging

  ````python
  >>> logging.disable(logging.CRITICAL)
  ````

* Logging to file

  ````python
  import logging
  logging.basicConfig(filename='myProgramLog.txt', level=logging.DEBUG, format='%(asctime)s -  %(levelname)s -  %(message)s')
  ````



##### Download a web page

* With `requests.get()` function

  ````python
  >>> import requests
  >>> res = requests.get('https://automatetheboringstuff.com/files/rj.txt')
  >>> type(res)
  <class 'requests.models.Response'>
  >>> res.status_code == requests.codes.ok
  True
  >>> len(res.text)
  178981
  >>> print(res.text[:80])
  The Project Gutenberg EBook of Romeo and Juliet, by William Shakespeare...
  ````

* Error handling

  ````python
  import requests
  res = requests.get('https://inventwithpython.com/page_that_does_not_exist')
  try:
      res.raise_for_status()
  except Exception as exc:
      print('There was a problem: %s' % (exc))
  ````

* Save to file

  ````python
  >>> res = requests.get('https://automatetheboringstuff.com/files/rj.txt')
  >>> playFile = open('RomeoAndJuliet.txt', 'wb')
  >>> for chunk in res.iter_content(100000):
          playFile.write(chunk)
  100000
  78981
  >>> playFile.close()
  ````

  

##### Parsing HTML with `BS4` module

* Example HTML

  ````html
  <!-- This is the example.html example file. -->
  
  <html><head><title>The Website Title</title></head>
  <body>
  <p>Download my <strong>Python</strong> book from <a href="https://
  inventwithpython.com">my website</a>.</p>
  <p class="slogan">Learn Python the easy way!</p>
  <p>By <span id="author">Al Sweigart</span></p>
  </body></html>
  ````

* Start

  ````python
  >>> import requests, bs4
  >>> res = requests.get('https://nostarch.com')
  >>> res.raise_for_status()
  >>> noStarchSoup = bs4.BeautifulSoup(res.text, 'html.parser')
  >>> type(noStarchSoup)
  <class 'bs4.BeautifulSoup'>
  
  >>> exampleFile = open('example.html')
  >>> exampleSoup = bs4.BeautifulSoup(exampleFile, 'html.parser')
  >>> type(exampleSoup)
  <class 'bs4.BeautifulSoup'>
  ````

* Find an element with `select()` method

  ````python
  >>> exampleFile = open('example.html')
  >>> exampleSoup = bs4.BeautifulSoup(exampleFile.read(), 'html.parser')
  >>> elems = exampleSoup.select('#author')
  >>> type(elems) # elems is a list of Tag objects.
  <class 'list'>
  >>> len(elems)
  1
  >>> type(elems[0])
  <class 'bs4.element.Tag'>
  >>> str(elems[0]) # The Tag object as a string.
  '<span id="author">Al Sweigart</span>'
  >>> elems[0].getText()
  'Al Sweigart'
  >>> elems[0].attrs
  {'id': 'author'}
  >>> pElems = exampleSoup.select('p')
  >>> str(pElems[0])
  '<p>Download my <strong>Python</strong> book from <a href="https://
  inventwithpython.com">my website</a>.</p>'
  >>> pElems[0].getText()
  'Download my Python book from my website.'
  >>> str(pElems[1])
  '<p class="slogan">Learn Python the easy way!</p>'
  >>> pElems[1].getText()
  'Learn Python the easy way!'
  >>> str(pElems[2])
  '<p>By <span id="author">Al Sweigart</span></p>'
  >>> pElems[2].getText()
  'By Al Sweigart'
  >>> spanElem = soup.select('span')[0]
  >>> str(spanElem)
  '<span id="author">Al Sweigart</span>'
  >>> spanElem.get('id')
  'author'
  >>> spanElem.get('some_nonexistent_addr') == None
  True
  >>> spanElem.attrs
  {'id': 'author'}
  ````



##### Web crawler with selenium-controlled browser

* Start

  ````python
  >>> from selenium import webdriver
  >>> browser = webdriver.Firefox()
  >>> type(browser)
  <class 'selenium.webdriver.firefox.webdriver.WebDriver'>
  >>> browser.get('https://inventwithpython.com')
  ````

* Find element

  ````python
  elem = browser.find_element_by_class_name(' cover-thumb')
  print('Found <%s> element with that class name!' % (elem.tag_name))
  ````

* Clicking 

  ````python
  >>> linkElem = browser.find_element_by_link_text('Read Online for Free')
  >>> type(linkElem)
  <class 'selenium.webdriver.remote.webelement.FirefoxWebElement'>
  >>> linkElem.click()
  ````

* Filling out and submitting forms

  ```python
  >>> userElem = browser.find_element_by_id('user_name)
  >>> userElem.send_keys('your_username_here')
  >>> passwordElem = browser.find_element_by_id('user_pass')
  >>> passwordElem.send_keys('your_password_here')
  >>> passwordElem.submit()
  ```

* Send special keys

  ````python
  >>> htmlElem = browser.find_element_by_tag_name('html')
  >>> htmlElem.send_keys(Keys.END)     # scrolls to bottom
  >>> browser.refresh() 				 # clicks the refresh button
  >>> htmlElem.send_keys(Keys.HOME)    # scrolls to top
  ````

  

##### Manage Excel documents with `OpenPyXL`

* Opening

  ````python
  >>> import openpyxl
  >>> wb = openpyxl.load_workbook('example.xlsx')
  >>> type(wb)
  <class 'openpyxl.workbook.workbook.Workbook'>
  ````

* Getting sheet

  ````python
  >>> wb.sheetnames 
  ['Sheet1', 'Sheet2', 'Sheet3']
  >>> sheet = wb['Sheet3'] 
  >>> sheet
  <Worksheet "Sheet3">
  >>> type(sheet)
  <class 'openpyxl.worksheet.worksheet.Worksheet'>
  >>> sheet.title 
  'Sheet3'
  >>> anotherSheet = wb.active
  >>> anotherSheet
  <Worksheet "Sheet1">
  >>> sheet.max_row 
  7
  >>> sheet.max_column 
  3
  ````

* Getting cells

  ````python
  >>> sheet = wb['Sheet1'] 
  >>> sheet['A1'] 
  <Cell 'Sheet1'.A1>
  >>> sheet['A1'].value 
  datetime.datetime(2015, 4, 5, 13, 34, 2)
  >>> c = sheet['B1'] 1
  >>> c.value
  'Apples'
  >>> 'Row %s, Column %s is %s' % (c.row, c.column, c.value)
  'Row 1, Column B is Apples'
  >>> 'Cell %s is %s' % (c.coordinate, c.value)
  'Cell B1 is Apples'
  >>> sheet['C1'].value
  73
  >>> sheet.cell(row=1, column=2)
  <Cell 'Sheet1'.B1>
  >>> sheet.cell(row=1, column=2).value
  'Apples'
  >>> openpyxl.utils.get_column_letter(900)
  'AHP'
  >>> openpyxl.utils.column_index_from_string('AA')
  27
  >>> tuple(sheet['A1':'C3']) 
  ((<Cell 'Sheet1'.A1>, <Cell 'Sheet1'.B1>, <Cell 'Sheet1'.C1>), (<Cell 'Sheet1'.A2>, <Cell 'Sheet1'.B2>, <Cell 'Sheet1'.C2>), (<Cell 'Sheet1'.A3>, <Cell 'Sheet1'.B3>, <Cell 'Sheet1'.C3>))
  >>> sheet['A1'] = 'Hello, world!' 
  >>> sheet['A1'].value
  'Hello, world!'
  ````

* Creating and removing

  ```python 
  >>> wb = openpyxl.Workbook()
  >>> wb.sheetnames
  ['Sheet']
  >>> wb.create_sheet() 
  <Worksheet "Sheet1">
  >>> wb.sheetnames
  ['Sheet', 'Sheet1']
  >>> wb.create_sheet(index=0, title='First Sheet')
  <Worksheet "First Sheet">
  >>> wb.sheetnames
  ['First Sheet', 'Sheet', 'Sheet1']
  >>> wb.create_sheet(index=2, title='Middle Sheet')
  <Worksheet "Middle Sheet">
  >>> wb.sheetnames
  ['First Sheet', 'Sheet', 'Middle Sheet', 'Sheet1']
  >>> wb.sheetnames
  ['First Sheet', 'Sheet', 'Middle Sheet', 'Sheet1']
  >>> del wb['Middle Sheet']
  >>> del wb['Sheet1']
  >>> wb.sheetnames
  ['First Sheet', 'Sheet']
  ```

* Formula

  ```python
  >>> sheet['B9'] = '=SUM(B1:B8)'
  >>> sheet.merge_cells('A1:D3')
  >>> wb.save('writeFormula.xlsx')
  ```

* Setting size

  ````python
  >>> sheet.row_dimensions[1].height = 70
  >>> sheet.column_dimensions['B'].width = 20
  ````

* There are similar API for google sheets



##### Manage PDF

* Extract text 

  ````python
  >>> import PyPDF2
  >>> pdfFileObj = open('meetingminutes.pdf', 'rb')
  >>> pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
  >>> pdfReader.numPages
  19
  >>> pageObj = pdfReader.getPage(0)
  >>> pageObj.extractText()
  'BOARD  of ELEMENTARY and  SECONDARY EDUCATION'
  >>> pdfFileObj.close()
  ````

* Decrypting

  ````python
  >>> pdfReader = PyPDF2.PdfFileReader(open('encrypted.pdf', 'rb'))
  >>> pdfReader.isEncrypted
  True
  >>> pdfReader.decrypt('rosebud')
  1
  >>> pageObj = pdfReader.getPage(0)
  >>> pdfWriter.encrypt('swordfish')
  >>> resultPdf = open('encryptedminutes.pdf', 'wb')
  >>> pdfWriter.write(resultPdf)
  >>> resultPdf.close()
  ````

* Creating

  ````python
  >>> import PyPDF2
  >>> pdf1File = open('meetingminutes.pdf', 'rb')
  >>> pdf2File = open('meetingminutes2.pdf', 'rb')
  >>> pdf1Reader = PyPDF2.PdfFileReader(pdf1File)
  >>> pdf2Reader = PyPDF2.PdfFileReader(pdf2File)
  >>> pdfWriter = PyPDF2.PdfFileWriter()
  
  >>> page = pdf1Reader.getPage(0)
  >>> page.rotateClockwise(90)
  
  >>> for pageNum in range(pdf1Reader.numPages):
      	pageObj = pdf1Reader.getPage(pageNum)
      	pdfWriter.addPage(pageObj)
  
  >>> for pageNum in range(pdf2Reader.numPages):
  		pageObj = pdf2Reader.getPage(pageNum)
      	pdfWriter.addPage(pageObj)
  
  >>> pdfOutputFile = open('combinedminutes.pdf', 'wb')
  >>> pdfWriter.write(pdfOutputFile)
  >>> pdfOutputFile.close()
  >>> pdf1File.close()
  >>> pdf2File.close()
  ````

* Overlaying pages

  ````python
  >>> import PyPDF2
  >>> minutesFile = open('meetingminutes.pdf', 'rb')
  >>> pdfReader = PyPDF2.PdfFileReader(minutesFile)
  >>> minutesFirstPage = pdfReader.getPage(0)
  >>> pdfWatermarkReader = PyPDF2.PdfFileReader(open('watermark.pdf', 'rb'))
  >>> minutesFirstPage.mergePage(pdfWatermarkReader.getPage(0))
  >>> pdfWriter = PyPDF2.PdfFileWriter()
  >>> pdfWriter.addPage(minutesFirstPage)
  
  >>> for pageNum in range(1, pdfReader.numPages):
      	pageObj = pdfReader.getPage(pageNum)
      	pdfWriter.addPage(pageObj)
  
  >>> resultPdfFile = open('watermarkedCover.pdf', 'wb')
  >>> pdfWriter.write(resultPdfFile)
  >>> minutesFile.close()
  >>> resultPdfFile.close()
  ````

  

##### Manage Word documents

* Create

  ````python 
  >>> import docx
  >>> doc = docx.Document()
  >>> doc.add_paragraph('Hello world!')
  <docx.text.Paragraph object at 0x000000000366AD30>
  >>> paraObj1 = doc.add_paragraph('This is a second paragraph.')
  >>> paraObj2 = doc.add_paragraph('This is a yet another paragraph.')
  >>> paraObj1.add_run(' This text is being added to the second paragraph.')
  <docx.text.Run object at 0x0000000003A2C860>
  >>> doc.add_heading('Header 0', 0)
  <docx.text.Paragraph object at 0x00000000036CB3C8>
  >>> doc.add_heading('Header 1', 1)
  <docx.text.Paragraph object at 0x00000000036CB630>
  >>> doc.add_heading('Header 2', 2)
  <docx.text.Paragraph object at 0x00000000036CB828>
  >>> doc.add_heading('Header 3', 3)
  <docx.text.Paragraph object at 0x00000000036CB2E8>
  >>> doc.add_heading('Header 4', 4)
  <docx.text.Paragraph object at 0x00000000036CB3C8>
  >>> doc.add_picture('zophie.png', width=docx.shared.Inches(1), height=docx.shared.Cm(4))
  <docx.shape.InlineShape object at 0x00000000036C7D30>
  >>> doc.save('multipleParagraphs.docx')
  ````



##### Manage CSV files

* Reading

  ````python
  >>> import csv
  >>> exampleFile = open('example.csv')
  >>> exampleReader = csv.reader(exampleFile)
  >>> exampleData = list(exampleReader)
  >>> exampleData
  [['4/5/2015 13:34', 'Apples', '73'], ['4/5/2015 3:41', 'Cherries', '85'],
   ['4/6/2015 12:46', 'Pears', '14'], ['4/8/2015 8:59', 'Oranges', '52'],
   ['4/10/2015 2:07', 'Apples', '152'], ['4/10/2015 18:10', 'Bananas', '23'],
   ['4/10/2015 2:40', 'Strawberries', '98']]
  >>> exampleData[0][0]
  '4/5/2015 13:34'
  >>> exampleData[0][1]
  'Apples'
  >>> exampleData[0][2]
  '73'
  >>> exampleData[1][1]
  'Cherries'
  >>> exampleData[6][1]
  'Strawberries'
  ````

* Writing

  ````python
  >>> import csv
  >>> outputFile = open('output.csv', 'w', newline='')
  >>> outputWriter = csv.writer(outputFile, delimiter='\t', lineterminator='\n\n')
  >>> outputWriter.writerow(['spam', 'eggs', 'bacon', 'ham'])
  21
  >>> outputWriter.writerow(['Hello, world!', 'eggs', 'bacon', 'ham'])
  32
  >>> outputWriter.writerow([1, 2, 3.141592, 4])
  16
  >>> outputFile.close()
  ````

* Better reader and writer

  ````python
  >>> import csv
  >>> exampleFile = open('example.csv')
  >>> exampleDictReader = csv.DictReader(exampleFile, ['time', 'name',
  'amount'])
  >>> for row in exampleDictReader:
  ...     print(row['time'], row['name'], row['amount'])
  ...
  4/5/2015 13:34 Apples 73
  4/5/2015 3:41 Cherries 85
  4/6/2015 12:46 Pears 14
  4/8/2015 8:59 Oranges 52
  4/10/2015 2:07 Apples 152
  4/10/2015 18:10 Bananas 23
  4/10/2015 2:40 Strawberries 98
      
  >>> outputFile = open('output.csv', 'w', newline='')
  >>> outputDictWriter = csv.DictWriter(outputFile, ['Name', 'Pet', 'Phone'])
  >>> outputDictWriter.writeheader()
  >>> outputDictWriter.writerow({'Name': 'Alice', 'Pet': 'cat', 'Phone': '555-
  1234'})
  20
  >>> outputDictWriter.writerow({'Name': 'Bob', 'Phone': '555-9999'})
  15
  >>> outputDictWriter.writerow({'Phone': '555-5555', 'Name': 'Carol', 'Pet':
  'dog'})
  20
  >>> outputFile.close()
  ````

  

##### Manage JSON data

* Reading

  ```` python
  >>> stringOfJsonData = '{"name": "Zophie", "isCat": true, "miceCaught": 0,
  "felineIQ": null}'
  >>> import json
  >>> jsonDataAsPythonValue = json.loads(stringOfJsonData)
  >>> jsonDataAsPythonValue
  {'isCat': True, 'miceCaught': 0, 'name': 'Zophie', 'felineIQ': None}
  ````

* Writing

  ````python
  >>> pythonValue = {'isCat': True, 'miceCaught': 0, 'name': 'Zophie',
  'felineIQ': None}
  >>> import json
  >>> stringOfJsonData = json.dumps(pythonValue)
  >>> stringOfJsonData
  '{"isCat": true, "felineIQ": null, "miceCaught": 0, "name": "Zophie" }'
  ````

  

##### Date and time

* `Datatime` module

  ````python
  >>> import datetime
  >>> datetime.datetime.now()
  datetime.datetime(2019, 2, 27, 11, 10, 49, 55, 53)
  >>> dt = datetime.datetime(2019, 10, 21, 16, 29, 0)
  >>> dt.year, dt.month, dt.day
  (2019, 10, 21)
  >>> dt.hour, dt.minute, dt.second
  (16, 29, 0)
  
  >>> halloween2019 = datetime.datetime(2019, 10, 31, 0, 0, 0)
  >>> newyears2020 = datetime.datetime(2020, 1, 1, 0, 0, 0)
  >>> oct31_2019 = datetime.datetime(2019, 10, 31, 0, 0, 0)
  >>> halloween2019 == oct31_2019
  True
  >>> halloween2019 > newyears2020
  False
  >>> newyears2020 > halloween2019
  True
  >>> newyears2020 != oct31_2019
  True
  
  >>> delta = datetime.timedelta(days=11, hours=10, minutes=9, seconds=8)
  >>> delta.days, delta.seconds, delta.microseconds
  (11, 36548, 0)
  >>> delta.total_seconds()
  986948.0
  >>> str(delta)
  '11 days, 10:09:08'
  ````



##### Multithreading

* Example:

  ````python
  import threading, time
  print('Start of program.')
  
  def takeANap():
      time.sleep(5)
      print('Wake up!')
  
  threadObj = threading.Thread(target=takeANap)
  threadObj.start()
  
  print('End of program.')
  ````

* Passing arguments:

  `````python
  >>> import threading
  >>> threadObj = threading.Thread(target=print, args=['Cats', 'Dogs', 'Frogs'],
  kwargs={'sep': ' & '})
  >>> threadObj.start()
  Cats & Dogs & Frogs
  `````

* Synchronizing

  ````python
  for downloadThread in downloadThreads:
      downloadThread.join()
  print('Done.')
  ````

* Launch other programs

  ````python
  >>> import subprocess
  >>> subprocess.Popen('C:\\Windows\\System32\\calc.exe')
  <subprocess.Popen object at 0x0000000003055A58>
  >>> subprocess.Popen(['C:\\Windows\\notepad.exe', 'C:\\Users\Al\\hello.txt'])
  <subprocess.Popen object at 0x00000000032DCEB8>
  ````



##### Manipulate images

* Read

  ````python
  >>> from PIL import Image
  >>> catIm = Image.open('zophie.png')
  >>> catIm.size
  (816, 1088)
  >>> width, height = catIm.size
  >>> width
  816
  >>> height
  1088
  >>> catIm.filename
  'zophie.png'
  >>> catIm.format
  'PNG'
  >>> catIm.format_description
  'Portable network graphics'
  >>> catIm.save('zophie.jpg')
  ````

* Creating

  `````python
  >>> from PIL import Image
  >>> im = Image.new('RGBA', (100, 200), 'purple')
  >>> im.save('purpleImage.png')
  >>> im2 = Image.new('RGBA', (20, 20))
  >>> im2.save('transparentImage.png')
  `````

* Cropping

  ````python
  >>> from PIL import Image
  >>> catIm = Image.open('zophie.png')
  >>> croppedIm = catIm.crop((335, 345, 565, 560))
  >>> croppedIm.save('cropped.png')
  ````

* Copying and pasting

  ````python
  >>> from PIL import Image
  >>> catIm = Image.open('zophie.png')
  >>> catCopyIm = catIm.copy()
  
  >>> faceIm = catIm.crop((335, 345, 565, 560))
  >>> faceIm.size
  (230, 215)
  >>> catCopyIm.paste(faceIm, (0, 0))
  >>> catCopyIm.paste(faceIm, (400, 500))
  >>> catCopyIm.save('pasted.png')
  ````

* Resizing

  ````python
  >>> from PIL import Image
  >>> catIm = Image.open('zophie.png')
  >>> width, height = catIm.size
  >>> quartersizedIm = catIm.resize((int(width / 2), int(height / 2)))
  >>> quartersizedIm.save('quartersized.png')
  >>> svelteIm = catIm.resize((width, height + 300))
  >>> svelteIm.save('svelte.png')
  ````

* Rotating and flipping

  ````python
  >>> from PIL import Image
  >>> catIm = Image.open('zophie.png')
  >>> catIm.rotate(90).save('rotated90.png')
  >>> catIm.rotate(180).save('rotated180.png')
  >>> catIm.rotate(270).save('rotated270.png')
  >>> catIm.transpose(Image.FLIP_LEFT_RIGHT).save('horizontal_flip.png')
  >>> catIm.transpose(Image.FLIP_TOP_BOTTOM).save('vertical_flip.png')
  ````

* Drawing picture

  ````python
  >>> from PIL import Image, ImageDraw
  >>> im = Image.new('RGBA', (200, 200), 'white')
  >>> draw = ImageDraw.Draw(im)
  >>> draw.line([(0, 0), (199, 0), (199, 199), (0, 199), (0, 0)], fill='black')
  >>> draw.rectangle((20, 30, 60, 60), fill='blue')
  >>> draw.ellipse((120, 30, 160, 60), fill='red')
  >>> draw.polygon(((57, 87), (79, 62), (94, 85), (120, 90), (103, 113)), fill='brown')
  >>> for i in range(100, 200, 10):
      draw.line([(i, 0), (200, i - 100)], fill='green')
  
  >>> im.save('drawing.png')
  ````

* Drawing text

  ````python
  >>> from PIL import Image, ImageDraw, ImageFont
  >>> import os
  >>> im = Image.new('RGBA', (200, 200), 'white')
  >>> draw = ImageDraw.Draw(im)
  >>> draw.text((20, 150), 'Hello', fill='purple')
  >>> fontsFolder = 'FONT_FOLDER' # e.g. ‘/Library/Fonts'
  >>> arialFont = ImageFont.truetype(os.path.join(fontsFolder, 'arial.ttf'), 32)
  >>> draw.text((100, 150), 'Howdy', fill='gray', font=arialFont)
  >>> im.save('text.png')
  ````



##### Control mouse

* Get screen information

  ````python
  >>> import pyautogui
  >>> wh = pyautogui.size() 
  >>> wh
  Size(width=1920, height=1080)
  >>> wh[0]
  1920
  >>> wh.width
  1920
  ````

* Move the mouse

  ````python
  >>> import pyautogui
  >>> for i in range(10): 
  ...       pyautogui.moveTo(100, 100, duration=0.25)
  ...       pyautogui.moveTo(200, 100, duration=0.25)
  ...       pyautogui.moveTo(200, 200, duration=0.25)
  ...       pyautogui.moveTo(100, 200, duration=0.25)
  
  >>> for i in range(10):
  ...       pyautogui.move(100, 0, duration=0.25)   # right
  ...       pyautogui.move(0, 100, duration=0.25)   # down
  ...       pyautogui.move(-100, 0, duration=0.25)  # left
  ...       pyautogui.move(0, -100, duration=0.25)  # up
  ````

* Control mouse

  ````python
  >>> pyautogui.position() # Get current mouse position
  Point(x=377, y=481)
  >>> pyautogui.click(10, 5) # Move mouse to (10, 5) and click.
  >>> pyautogui.drag(distance, 0, duration=0.2)   # Drag right
  >>> pyautogui.scroll(200) # Scrolling
  ````



##### Manage windows

* Getting screenshoot

  ````python
  >>> import pyautogui
  >>> im = pyautogui.screenshot()
  ````

* Manipulating windows

  ````python
  >>> import pyautogui
  >>> fw = pyautogui.getActiveWindow()
  >>> fw.width # Gets the current width of the window.
  1669
  >>> fw.topleft # Gets the current position of the window.
  (174, 153)
  >>> fw.width = 1000 # Resizes the width.
  >>> fw.topleft = (800, 400) # Moves the window.
  >>> fw.isMaximized # Returns True if window is maximized.
  False
  >>> fw.isMinimized # Returns True if window is minimized.
  False
  >>> fw.isActive # Returns True if window is the active window.
  True
  >>> fw.maximize() # Maximizes the window.
  >>> fw.isMaximized
  True
  >>> fw.restore() # Undoes a minimize/maximize action.
  ````

  

##### Control the keyboard

* Send a string 

  ````python
  >>> pyautogui.click(100, 200); pyautogui.write('Hello, world!')
  ````

* Send keys

  ````python
  >>> pyautogui.write(['a', 'b', 'left', 'left', 'X', 'Y'])
  ````

* Pressing and releasing

  ````python
  >>> pyautogui.keyDown('shift'); pyautogui.press('4'); pyautogui.keyUp('shift')
  ````

  
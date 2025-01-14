---
title: Basic of Modern CMake by Examples
date: 2022-08-09
mathjax: true
tags: [Shell, C/C++]
---

CMake is one of the most popular software for building/testing automation. In this article, several basic usecases are presented with examples. 

<!-- more -->

# Makefile

## Basic hello world program

```makefile
hello: main.cpp
	$(CXX) -o hello main.cpp
	echo "DONEt"
```



## Better way to compile larger programs

```makefile
# Here CC and CXX are variables
CC := clang
CXX := clang++

# .PHONY means that `all` is not a real file to be generated, instead a fake target
# Assume hello is the executable we want to get
.PHONY: all
all: hello

# Assume hello depends on all of the files in objects
# We only need to add new depeneds to objects to make this Makefile work on them
objects := main.o

# Here `$@` is the name of the target being generated
hello: $(objects)
	$(CXX) -o $@ $(objects)
	
main.o: main.cpp
	$(CXX) -c main.cpp
	
# clean is used to clean up the temporary files used. It is a fake target as well
.PHONY: clean
clean:
	rm -f hello $(objects)
```



For example, when we need another dependence `answer.hpp`, we will have: 

```makefile
CC := clang
CXX := clang++

.PHONY: all
all: answer

objects := main.o answer.o

answer: $(objects)
	$(CXX) -o $@ $(objects)
	
main.o: answer.hpp
answer.o: answer.hpp
	
.PHONY: clean
clean:
	rm -f hello $(objects)
```

Its usage: 

```shell
$ make all
$ make answer
$ make CC=gcc CXX=g++ answer
```



# Basic CMake

For example:

```cmake
# Minimum version required
cmake_minimum_required(VERSION 3.9)
# Project name
project(answer)

#[[
All the target, similar to the following in Makefile:
	answer: main.o answer.o
	main.o: main.cpp answer.hpp
	answer.o: answer.cpp answer.hpp
CMake will find the depended header automatically 
#]]
add_executable(answer main.cpp answer.cpp)

#[[
Use the following command to build:
	cmake -B build			# generate build directory
	cmake --build build		# build
	./build/answer			# run the executable
#]]
```



## Build with library

If we need a library several times, we can make it a separate library to be linked.

```cmake
cmake_minimum_required(VERSION 3.9)
project(answer)

add_library(libanswer STATIC answer.cpp)

add_excutable(answer main.cpp)

target_link_libraries(answer libanswer)
```



## Build with subdirectories

For example, we want to move everything to the subdirectory `answer` and use a `libanswer` library inside a sub-subdirectory. 

```cmake
cmake_minimum_required(VERSION 3.9)
project(answer)

add_subdirectory(answer)

add_executable(answer_app main.cpp)
target_link_libraries(answer_app libanswer)
```

And within the directory `answer`, we have another `CMakeLists.txt` file: 

```cmake
add_library(libanswer STATIC answer.cpp)
#[[
Put `libanswer` library to `include` directory and makes it PUBLIC
When the `libanswer` library is used, this `include` directory will
be automatically used
#]]
target_include_directories(libanswer PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)
```



## To find already installed third party library in OS

```cmake
find_package(CURL REQUIRED)
target_link_libraries(libanswer PRIVATE CURL::libcurl)
```



## Cache variable

API keys and private ID should not be inside the source code, instead a configurable option to be sent in. This can be done with the cache variable:

```cmake
set(API_KEY "" CACHE STRING "PRIVATE API_KEY")

if(API_KEY STREQUAL "")
	message(SEND_ERROR "The API_KEY must not be empty")
endif()

target_compile_definitions(libanswer PRIVATE MACRO_NAME="${API_KEY}")
# If we need a integer, we can write: 
target_compile_definitions(libanswer PRIVATE ANOTHER_MACRO_NAME=42)
```

It can be used by `-D` option in command line:

```shell
$ cmake -B build -DAPI_KEY=xxxxxxxx
```

or with `ccmake` which is a cmake with CLI. 

```shell
$ ccmake -B build
```



## To use header-only library

```cmake
add_library(libanswer INTERFACE)
target_include_directories(libanswer INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/include)
target_compile_definitions(libanswer INTERFACE API_KEY="${API_KEY}")
target_link_libraries(libanswer INTERFACE web_service)
```



## Compile features

To use different compile features:

```cmake
target_compile_features(libanswer INTERFACE cxx_std_20)
```

The different of using this method and use the `CMAKE_CXX_STANDARD` variable is:

1. `CMAKE_CXX_STANDARD` variable will be applied to all of the targets. 

   * `CMAKE_CXX_STANDARD` can be used like:

     ```cmake
     set(CMAKE_CXX_STANDARD 11)
     ```

2. `target_compile_features` can use more detailed c++ features like `cxx_auto_type`, `cxx_lambda`, etc. 



## Testing with CTest

We can use the CTest by adding the following lines to the `CMakeLists.txt`: 

```cmake
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
    include(CTest)
endif()
```

And in the modules that needs to be tested, for example `answer/CMakeLists.txt`: 

```cmake
if(BUILD_TESTING)
    add_subdirectory(tests)
endif()
```

And for the tests in the `answer/test` directory, another `CMakeLists.txt`: 

```cmake
add_executable(test_some_func test_some_func.cpp)
add_test(NAME answer.test_some_func COMMAND test_some_func)
```

To run all the tests inside `answer` module:

```shell
$ ctest --test-dir build -R "^answer."
```



## Macro

To run certain CMake script multiple times, we can use macros: 

```cmake
macro(answer_add_test TEST_NAME)
	# Here ${ARGN} is similar to __VA_ARGS__ in C
    add_executable(${TEST_NAME} ${ARGN}) 
    add_test(NAME answer.${TEST_NAME} COMMAND ${TEST_NAME})
    target_link_libraries(${TEST_NAME} PRIVATE libanswer)
    target_link_libraries(${TEST_NAME} PRIVATE Catch2::Catch2WithMain)
endmacro()

answer_add_test(test_check_the_answer test_check_the_answer.cpp)
answer_add_test(test_another_function test_another_function.cpp)
```



# Back to Makefile

We can use Makefile to simplify the usage of CMake:

```makefile
API_KEY := xxxxxxxx

.PHONY: build configure run test clean

build: configure
	cmake --build build

configure:
	cmake -B build -DAPI_KEY=${API_KEY}

run:
	./build/answer_app

test:
	ctest --test-dir build -R "^answer."

clean:
	rm -rf build
```

Then we can use it like:

```shell
$ make build API_KEY=xxxxxxxx
$ make test
$ make run
$ make clean
```



# References

1. [Modern CMake by Example](https://github.com/richardchien/modern-cmake-by-example)


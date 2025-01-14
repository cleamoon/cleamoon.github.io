---
title: Getting configuration options with C++ and Boost
date: 2022-03-22 18:32:07
tags: [C++, Boost, Programming]
---

Take a look at some of the console programs, such as `cp` in Linux. They all have a fancy help, their input parameters do not depend on any position, ad have a human readable syntax. You can implement the same functionality for your program with the `Boost.ProgramOptions` library. 

<!-- more -->

Take the following simple example:

``` c++
#include <boost/program_options.hpp>
#include <boost/program_options/errors.hpp>
#include <iostream>
namespace opt = boost::program_options;

int main(int argc, char* argv[]) {
	// Constructing an options describing variable and giving
	// it a textual description "All options" to it
    opt::options_description desc("All options");
    // When we are adding options, first parameter is a name
	// to be used in command line. Second parameter is a type
	// Third parameter must be a short description of that option
    // 'a' and 'o' are short option names for apples and oranges
    // 'name' option is not marked with 'required()', so yser may not support it
    desc.add_options()
        ("apples,a", opt::value<int>()->default_value(10), "apples that you have")
        ("oranges,o", opt::value<int>(), "oranges that you have")
        ("name", opt::value<std::string>(), "your name")
        ("help", "produce help message")
    ;
    opt::variables_map vm;
    // Parsing command line options and storing values to 'vm'
    opt::store(opt::parse_command_line(argc, argv, desc), vm);
    // We can also parse environment variables using 'parse_environment' method
    opt::notify(vm);
    if (vm.count("help")) {
        std::cout << desc << "\n";
        return 1;
    }
    // Adding missing options from "apples_oranges.cfg" config file
    // You can also provide an istreamable object as a first parameter for 'parse_config_file'
    // 'char' template parameter will be passed to underlying std::basic_istream object
    try {
        opt::store(
            opt::parse_config_file<char>("apples_oranges.cfg", desc),
            vm
        );
    } catch (const opt::reading_file& e) {
        std::cout
            << "Failed to open file 'apples_oranges.cfg': "
            << e.what();
    }
    opt::notify(vm);
    if (vm.count("name")) {
        std::cout << "Hi, " << vm["name"].as<std::string>() << "!\n";
    }
    std::cout << "Fruits count: "
        << vm["apples"].as<int>() + vm["oranges"].as<int>()
        << std::endl;
    return 0;

}
```



Its usage:

```shell
$ ./our_program --help
All options:
    -a [ --apples ] arg (=10) 	how many apples do you have
    -o [ --oranges ] arg 		how many oranges do you have
    --name arg					your name
    --help						produce help message
    
$ ./our_program
Fruits count: 30

$ ./our_program -a 10 -o 10 --name="Reader"
Hi,Reader!
Fruits count: 20

$ ./our_program –apples=10 –oranges=20
Fruits count: 30
```



The code is quite self-explanatory with the comments. When using a configuration file, we need to remember that its syntax differs from the command-line syntax. We do not need to place minuses before the options. So our `apples_oranges.cfg` option must look like this:

```
oranges=20
```



Boost's official documentation contains many more examples and shows more advanced features, such as position-dependent options, nonconventional syntax, and more. 


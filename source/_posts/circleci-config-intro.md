---
title: CircleCI Configuration Introduction
date: 2022-08-17 13:46:15
mathjax: true
tags: [Programming, DevOps]
---

CircleCI is a platform for Continuous Integration and Delivery which can be used to implement DevOps practice. 

<!-- more -->

# CircleCI Configuration Introduction

CircleCI believes in configuration as code. Consequently, the entire delivery process from build to deploy is orchestrated through a single file called `config.yml`. The `config.yml` file is located in a folder called `.circleci` at the top of your repo project. CircleCI uses the YAML syntax for config.

## Using the shell
CircleCI provides an on-demand shell to run commands. 
1. Sign up with CircleCI and select your Version Control System (VCS).
2. Create a `.circleci` folder at the root of your project.
3. Create a `config.yml` file inside the `.circleci` folder and paste and following code:
  ```yml
  version: 2.1
  jobs:
    build:
      docker:
        - image: alpine: 3.15
      steps:
        - run:
            name: The first steps
            command: | 
              echo 'Hello World'
              echo 'This is the delivery pipeline'
  ```

  Explaining each line: 
  1. This indicates the version of the CircleCI platform you are using. 
  2. The `jobs` level contains a collection of children, representing your jobs. You specify the names for these jobs, for example, `build`, `test`, `deploy`. 
  3. `build` is the first child in the `jobs` collection. In this example, `build` is also the only job. 
  4. This specifies that you are using a Docker image for the container where your job's commands are run.
  5. This is the Docker image. 
  6. The `steps` collection is a list of `run` directives.
  7. Each `run` directive is executed in the order in which it is declared. 
  8. The `name` attribute provides useful information when returning warnings, errors, and output. 
  9. The `command` attribute is a list of shell commands that you want to execute. 
  10. Prints.
  11. Prints.
4. Commit your `config.yml` file and push if you are working remotely. 
5. On the projects page in CircleCI, find your project and click the blue Set Up Project button next to it. 
6. In the pop-up window, choose the default Fastest option for selecting your `config.yml` file. 
7. CircleCI uses your `config.yml` file to run the pipeline. You can see the output in the CircleCI dashboard. 

## Using code from your repo
CircleCI provides several commands to simplify complex actions. In this example, you will use the `checkout` command. This command fetches the code from your git repo. Once you have retrieved that code, you can work with it in subsequent steps. 
```yml
version: 2.1
jobs:
  build:
    docker:
      - image: cimg/base:2021.04
    steps:
      - checkout
      - run:
          name: The first step
          command: |
            echo 'Hello World'
            echo 'This is the delivery pipeline'
      - run:
          name: The second step
          command: |
            ls -al
            echo '^^^The files in your repo^^^'
```

## Using different environments and creating workflows
With CircleCI, you can run different jobs in different execution environments, such as virtual machines or Docker containers. By changing the Docker image, you can quickly upgrade your environment version or change languages. 
```yml
version: 2.1
jobs:
  # Running commands on a basic image
  Hello-World:
    docker:
      - image: cimg/base:2021.04
    steps:
      - run:
          name: Saying Hello
          command: |
            echo 'Hello World'
            echo 'This is the delivery pipeline'
  # Fetching code from the repo
  Fetch-Code:
    docker: 
      - image: cimg/base:2021.04
    steps:
      - checkout
      - run:
          name: Getting the code
          command: |
            ls -al
            echo '^^^Your repo files^^^'
  # Running a node container
  Using-Node:
    docker: 
      - image: cimg/node:17.2
    steps:
      - run:
          name: Running the Node container
          command: |
            node -v
workflows:
  Example-Workflow:
    jobs:
      - Hello-World
      - Fetch-Code:
          requires:
            - Hello-World
      - Using-Node:
          requires:
            - Fetch-Code
```

## Adding a manual approval
```yml
version: 2.1
jobs:
  # Running commands on a basic image
  Hello-World:
    docker:
      - image: cimg/base:2021.04
    steps:
      - run:
          name: Saying Hello
          command: |
            echo 'Hello World'
            echo 'This is the delivery pipeline'
  # Fetching code from the repo
  Fetch-Code:
    docker: 
      - image: cimg/base:2021.04
    steps:
      - checkout
      - run:
          name: Getting the code
          command: |
            ls -al
            echo '^^^Your repo files^^^'
  # Running a node container
  Using-Node:
    docker: 
      - image: cimg/node:17.2
    steps:
      - run:
          name: Running the Node container
          command: |
            node -v
  Now-Complete:
    docker:
      - image: alpine:3.15
    steps:
      - run:
          name: Approval complete
          command: |
            echo 'The work is now complete'
workflows:
  Example-Workflow:
    jobs:
      - Hello-World
      - Fetch-Code:
          requires:
            - Hello-World
      - Using-Node:
          requires:
            - Fetch-Code
      - Hold-for-Approval:
          type: approval
          requires:
            - Using-Node
            - Fetch-Code
      - Now-Complete:
          requires:
            - Hold-for-Approval
```

# Configuring databases

## PostgreSQL database testing example
```yml
version: 2.1

jobs:
  build:

    # Primary container image where all commands run
    docker:
      - image: cimg/python:3.10
        environment:
          TEST_DATABASE_URL: postgresql://postgres@localhost/circle_test
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference

    # Service container image
      - image: cimg/postgres:14.0
        environment:
          POSTGRES_USER: postgres
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference

    steps:
      - checkout
      - run: sudo apt-get update
      - run: sudo apt-get install postgresql-client
      - run: whoami
      - run: |
          psql \
          -d $TEST_DATABASE_URL \
          -c "CREATE TABLE test (name char(25));"
      - run: |
          psql \
          -d $TEST_DATABASE_URL \
          -c "INSERT INTO test VALUES ('John'), ('Joanna'), ('Jennifer');"
```



      


  
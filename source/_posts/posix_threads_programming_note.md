---
title: Introduction to Posix Threads Programming
date: 2021-04-05
mathjax: true
tags: [C, Programming]
---


The basic of Posix thread programming is introduced in this article. More advanced topic might be added later. 


<!-- more -->



## 1. Abstract

In shared memory multiprocessor architectures, threads can be used to implement parallelism. Historically, hardware vendors have implemented their own proprietary version of threads, making portability a concern for software developers. For UNIX systems, a standardized C language threads programming interface has been specified. Implementations that adhere to this standard are referred to as POSIX threads, or Pthreads



## 2. Pthreads Overview



### What is a thread? 

Technically, a thread is defined as an independent stream of instructions that can be scheduled to run as such by the operating system

A process is created by the operating system, and requires a fair amount of "overhead". Processes contain information about program resources and program execution state, including:

* Process ID, process group ID, user ID, and group ID
* Environment
* Working directory
* Program instructions
* Registers
* Stack 
* Heap
* File descriptors
* Signal actions
* Shared libraries
* Inter-process communication tools 
  * Such as message queues, pipes, semaphores, or shared memory

Threads use and exist within these process resources, yet are able to be schedules by the operating system and run as independent entities largely because they duplicate only the bare essential resources that enable them to exist as executable code

This independent flow of control is accomplished because a thread maintains its own:

* Stack pointer
* Registers
* Scheduling properties 
  * Such as policy or priority
* Set of pending and blocked signal
* Thread specific data

So, in summary, in the UNIX environment, a thread:

* Exists within a process and uses the process' resources
* Has its own independent flow of control as long as its parent process exists and the OS supports it
* Duplicates only the essential resources it needs to be independently schedulable
* May share the process resources with other threads that act equally independently (and dependently)
* Dies if the parent process dies 
* It "lightweight" because most of the overhead has already been accomplished throught the creation of its process

Because threads within the same process share resources:

* Changes made by one thread to shared system resources (such as closing a file) will be seen by all other threads
* Two pointers having the same value point to the same data
* Reading and writing to the same memory locationss is possible, and therefore requires explicit synchronization by the programmer



### What are Pthreads? 

Pthreadsare defined as a set of C language programming types and procedure calls, implemented with a `pthread.h` header and a thread library - though this library may be part of another library, such as `libc`, in some implementations



### Why Pthreads?

* Lightweight
  * A thread can be created with much less operating system overhead
* Efficient communications / data exchange
  * In the worst case scenario, Pthread communications become more of a cache-to-CPU or memory-to-CPU bandwidth issue. These speeds are much higher than MPI shared memory communications
* Threaded applications offer potential performance gains and practical advantages over non-threaded applications in several other ways
  * Overlapping CPU work with I/O: For example, a program may have sections where it is performing a long I/O operation. While one thread is waiting for an I/O system call to complete, CPU intensive work can be performed by other thread
  * Priority/real-time scheduling: tasks which are more important can be scheduled to supersede or interrupt lower priority tasks
  * Asynchronous event handling: tasks which service events of indeterminate frequency and duration can be interleaved. For example, a web server can both transfer data from previous requests and manage the arrival of new requests



### Designing threaded programs

There are many considerations for designing parallel programs, such as:

* What type of parallel programming model to use?
* Problem partitioning
* Load balancing
* Communications
* Data dependencies
* Synchronization and race conditions
* Memory issues
* I/O issues
* Program complexity
* Programmer effort / costs / time
* ...

In general, in order for a program to take advantage of Pthreads, it must be able to be organized into discrete, independent tasks which can execute concurrently

Programs having the following characteristics may be well suited for pthreads:

* Work that can be executed, or data that can be operated on, by multiple tasks simultaneously
* Block for potentially long I/O waits
* Use many CPU cycles in some places but not others
* Must respond to asynchronous events
* Some work is more important than other work (priority interrupts)

Several common models for threaded programs exist:

* Manager/worker: a single thread, the manager assigns work to other threads, the workers. Typically, the manager handles all input and parcels out work to the other tasks. At least two forms of the manager/worker model are common: static worker pool and dynamic worker pool
* Pipeline: a task is broken into a series of suboperations, each of which is handled in series, but concurrently, by a different thread. An automobile assembly line best describes this model
* Peer: similar to the manager / worker model, but after the main thread creates other threads, it participates in the work



#### Shared memory model

All threads have access to the same global, shared memory. Threads also have their own private data. Programmers are responsible for synchronizing access (protecting) globally shared data



#### Thread-safeness

In a nutshell, refers to an application's ability to execute multiple threads simultaneously without "clobbering" shared data or creating "race" conditions. The implication to users of external library routines is that if you aren't 100% certain the routine is thread-safe, then you take your chances with problems that could arise

Recommendation: Be careful if your application uses libraries or other objects that don't explicitly guarantee thread-safeness. When in doubt, assume that they are not until proven otherwise. This can be done by "serializing" the calls to the uncertain routine, etc.



#### Thread limits

The Pthreads API is an ANSI/IEEE standard, implementations can vary in ways not specified by the standard. Several thread limits are discussed in more detail later





## 3. The Pthreads API



The subroutines which comprise the Pthreads API can be informally grouped into four major groups

* Thread management: Routines that work directly on threads - creating, detaching, joining, etc. They also include functions to set / query thread attributes (joinable, scheduling etc.)
* Mutexes: Routines that deal with synchronization, called a " mutex", which is an abbreviation for "mutual exclusion". Mutex functions provides for creating, destroying, locking and unlocking mutexes. These are supplemented by mutex attribute functions that set or modify attributes associated with mutexes
* Condition variables: Routines that address communications between threads that share a mutex. Based upon programmer specified conditions. This group includes functions to create, destroy, wait and signal based upon specified variable values. Functions to set / query condition variable attributes are also included
* Synchronization: Routines that manage read 7 write locks and barriers

Naming conventions: 

| Routine Prefix     | Functional Group                                 |
| ------------------ | ------------------------------------------------ |
| pthread_           | Threads themselves and miscellaneous subroutines |
| pthread_attr_      | Thread attributes objects                        |
| pthread_mutex_     | Mutexes                                          |
| pthread_mutexattr_ | Mutex attributes objects                         |
| pthread_cond_      | Condition variables                              |
| pthread_condattr_  | Condition attributes objects                     |
| pthread_key_       | Thread-specific data keys                        |
| pthread_rwlock_    | Read/write locks                                 |
| pthread_barrier_   | Synchronization barriers                         |

The concept of opaque objects pervades the design of the API. The basic calls work to create or modify opaque objects - the opaque objects can be modified by calls to attribute functions, which deal with opaque attributes



## 4. Compiling Threaded Programs

Several examples of compile commands used for pthreads codes are listed in the table below

| Compiler / Platform | Compiler command | Description |
| ------------------- | ---------------- | ----------- |
| Intel Linux         | icc -pthread     | C           |
| Intel Linux         | icpc -pthread    | C++         |
| PGI Linux           | pgcc -lpthread   | C           |
| PGI Linux           | pgCC -lpthread   | C++         |
| GNU Linux           | gcc -pthread     | GNU C       |
| GNU Linux           | g++ -pthread     | GNU C++     |



## 5. Thread management

### Creating and terminating threads

#### Creating threads:

Initially, your `main()` program comprises a single, default thread. All other threads must be explicitly created by the programmer. `pthread_create` creates a new thread and makes it executable. This routine can be called any number of times from anywhere within your code

`pthread_create`'s arguments: 

* `thread`: An opaque, unique identifier for the new thread returned by the subroutine
* `attr`: An opaque attribute object that may be used to set thread attributes. You can specify a thread attributes object, or NULL for the default values
* `start_routine`: the C routine that the thread will execute once it is created
* `arg`: A single argument that may be passed to `start_routine`. It must be passed by reference as a pointer cast of type void. NULL may be used if no argument is to be passed

The maximum number of threads that may be created by a process is implementation dependent. Programs that attempt to exceed the limit can fail or produce wrong results. It can be set by command `ulimit` on Linux



#### Thread attributes

By default, a thread is created with certain attributes. Some of these attributes can be changed by the programmer via the thread attribute object

`pthread_attr_init` and `pthread_attr_destroy` are used to initialize / destroy the thread attribute object. Other routines are then used to query / set specific attributes in the thread attribute object. Attributes include:

* Detached or joinable state
* Scheduling inheritance
* Scheduling policy
* Scheduling parameters
* Scheduling contention scope
* Stack size 
* Stack address
* Stack guard (overflow) size



#### Thread binding and scheduling

The Pthreads API provides several routines that may be used to specify how threads are scheduled for execution. For example, threads can be scheduled to run FIFO (first-in first-out), RR (round-robin) or OTHER (operating system determines). It also provides the ability to set a thread's scheduling priority value. The `sched_setscheduler` man page on Linux has more information about this

The Pthreads API does not provide routines for binding threads to specific cpus/cores. However, local implementations may include this functionality - such as the non-standard `pthread_setaffinity_np` routine. Here `_np` stands for "non-portable"



#### Thread termination

There are several ways in which a thread may be terminated:

* The thread returns normally from its starting routine. Its work is done
* The thread makes a call to the `pthread_exit` subroutine - whether its work is done or not
* The thread is canceled by another thread via the `pthread_cancel` routine
* The entire process is terminated due to making a call to either the `exec()` or `exit()`
* If `main()` finishes first, without calling `pthread_exit` explicitly itself
  * There is a definite problem if `main()` finishes before the threads it spawned if you don't call `pthread_exit()` explicitly. All of the threads it created will terminate because `main()` is done and no longer exists to support the threads
  * By having `main()` explicitly call `pthread_exit()`as the last thing it does, `main()` will block and be kept alive to support the threads it created until they are done

The `pthread_exit()` routine allows the programmer to specify an optional termination status parameter. This optional parameter is typically returned to threads "joining" the terminated thread. In subroutines that execute to completion normally, you can often dispense with calling `pthread_exit()` - unless, of course, you want to pass the optional status code back

The `pthread_exit()` routine does not close files; any files opened inside the thread will remain open after the thread is terminated



#### Example:

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#define NUM_THREADS 5

void *PrintHello (void * threadid) {
    long tid;
    tid = (long) threadid;
    printf("Hello World from thread #%ld!\n", tid);
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NUM_THREADS];
    int rc;
    long t;
    for (t = 0; t < NUM_THREADS; t++) {
        printf("In main: creating thread %ld\n", t);
        rc = pthread_create(&threads[t], NULL, PrintHello, (void *)t);
        if (rc) {
            printf("ERROR: return code from pthread_create() is %d\n", rc);
            exit(-1);
        }
    }
    
    /* Last thing that main() should do */
    pthread_exit(NULL);
}
```



### Passing arguments to threads

The `pthread_create()` routine permits the programmer to pass one argument to the thread start routine. All arguments must be passed by reference and cast to `(void *)`

How can you safely pass data to newly created threads, given their non-deterministic start-up and scheduling?



#### Example 1: uses a unique data structure for each thread

```c
#include <pthread.h> 
#include <stdio.h>
#include <stdlib.h>
#define NUM_THREADS 8

char * messages[NUM_THREADS];

void *PrintHello(void *threadid) {
    long taskid;
    sleep(1);
    taskid = (long) threadid;
    printf("Thread %d: %s\n", taskid, messages[taskid]);
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NUM_THREADS];
    long taskids[NUM_THREADS];
    int rc, t;
    
    messages[0] = "English: Hello World!";
    messages[1] = "French: Bonjour, le monde!";
    messages[2] = "Spanish: Hola al mundo";
    messages[3] = "Klingon: Nuq neH!";
    messages[4] = "German: Guten Tag, Welt!"; 
    messages[5] = "Russian: Zdravstvuyte, mir!";
    messages[6] = "Japan: Sekai e konnichiwa!";
    messages[7] = "Latin: Orbis, te saluto!";
    
    for(t = 0; t < NUM_THREADS; t++) {
        taskids[t] = t;
        printf("Creating thread %d\n", t);
        rc = pthread_create(&threads[t], NULL, PrintHello, (void *) taskids[t]);
        if (rc) {
            printf("ERROR: return code from pthread_create() is %d\n", rc);
            exit(-1);
        }
    }
    
    pthread_exit(NULL);
}
```



#### Example 2: passing multiple arguments via a structure

```c
#include <pthread.h> 
#include <stdio.h>
#include <stdlib.h>
#define NUM_THREADS 8

char * messages[NUM_THREADS];

struct thread_data {
    int thread_id;
    int sum;
    char * message;
};

struct thread_data thread_data_array[NUM_THREADS];

void *PrintHello(void *threadarg) {
    int taskid, sum;
    char * hello_msg;
    struct thread_data * my_data;
    
    sleep(1);
    my_data = (struct thread_data *) threadarg;
    taskid = my_data -> threadid;
    sum = my_data -> sum;
    hello_msg = my_data -> message;
    printf("Thread %d: %s, Sum = %d\n", taskid, hello_msg, sum);
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NUM_THREADS];
    int * taskids[NUM_THREADS];
    int rc, t, sum;
    
    sum = 0;
    messages[0] = "English: Hello World!";
    messages[1] = "French: Bonjour, le monde!";
    messages[2] = "Spanish: Hola al mundo";
    messages[3] = "Klingon: Nuq neH!";
    messages[4] = "German: Guten Tag, Welt!"; 
    messages[5] = "Russian: Zdravstvuyte, mir!";
    messages[6] = "Japan: Sekai e konnichiwa!";
    messages[7] = "Latin: Orbis, te saluto!";
    
    for(t = 0; t < NUM_THREADS; t++) {
        sum = sum + t;
        thread_data_array[t].thread_id = t;
        thread_data_array[t].sum = sum;
        thread_data_array[t].message = messages[t];
        printf("Creating thread %d\n", t);
        rc = pthread_create(&threads[t], NULL, PrintHello, (void *) thread_data_array[t]);
        if (rc) {
            printf("ERROR: return code from pthread_create() is %d\n", rc);
            exit(-1);
        }
    }
    
    pthread_exit(NULL);
}
```



### Joining and detaching threads

Joining is one way to accomplish synchronization between threads. The `pthread_join()` subroutine blocks the calling thread until the specified thread terminates. The programmer is able to obtain the target thread's termination return status if it was specified in the thread's call to `pthread_exit()`. A joining thread can match one `pthread_join()` call. It is a logical error to attempt multiple joins on the same thread



#### Joinable or not?

Only threads that are created as joinable can be joined. If a thread is created as detached, it can never be joined. To explicitly create a thread as joinable or detached, the `attr` argument in the `pthread_create()` routine is used. The typical 4 step process is:

* Declare a pthread attribute variable of the `pthread_attr_t` data type
* Initialize the attribute variable with `pthread_attr_init()`
* Set the attribute detached status with `pthread_attr_setdetachstate()`
* When done, free library resources used by the attribute with `pthread_attr_destroy()`



#### Detaching

The `pthread_detach()` routine can be used to explicitly detach a thread even though it was created as joinable. There is no converse routine



#### Recommendations

If a thread requires joining, consider explicitly creating it as joinable. This provides protability as not all implementations may create threads as joinable by default. If you know in advance that a thread will never need to join with another thread, consider creating it in a detached state. Some system resources may be able to be freed



#### Joining example

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#define NUM_THREADS 4

void *BusyWork (void *t) {
    int i;
    long tid;
    double result = 0.0;
    tid = (long) t;
    printf("Thread %ld starting ...\n", tid);
    for (i = 0; i < 1000000; i++) {
        result = result + sin(i) * tan(i);
    }
    printf("Thread %ld done. Result = %e\n", tid, result);
    pthread_exit((void *) t);
}

int main() {
    pthread_t thread[NUM_THREADS];
    pthread_attr_t attr;
    int rc;
    long t;
    void *status;
    
    /* Initialize and set thread detached attribute */
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
    
    for (t = 0; t < NUM_THREADS; t++) {
        printf("Main: creating thread %ld\n", t);
        rc = pthread_create(&thread[t], &attr, BusyWork, (void *)t);
        if (rc) {
            printf("ERROR: return code from pthread_create() is %d\n", rc);
            exit(-1);
        }
    }
    
    /* Free attribute and wait for the other threads */
    pthread_attr_destroy(&attr);
    for (t = 0; t < NUM_THREADS; t++) {
        rc = pthread_join(thread[t], &status);
        if (rc) {
            printf("ERROR: return code from pthread_join() is %d\n", rc);
            exit(-1);
        }
        printf("Main: completed join with thread %ld having a status of %ld\n", t, (long) status);
    }
    
    printf("Main: program completed. Exiting.\n");
    pthread_exit(NULL);
}
```



### Stack Management

#### Preventing stack problems:

The POSIX standard does not dictate the size of a thread's stack. This is implementation dependent and varies. Safe and portable programs do not depend upon the default stack limit, but instead, explicitly allocate enough stack for each thread by using the `pthread_attr_setstacksize` routine. The `pthread_attr_getstackaddr` and `pthread_attr_setstackaddr` routines can be used by applications in an environment where the stack for a thread must be placed in some particular region of memory



#### Example

```c
#include <pthread.h>
#include <stdio.h>
#define NTHREADS 4
#define N 1000
#define MEGEXTRA 1000000

pthread_attr_t attr;

void * dowork (void * threadid) {
    double A[N][N];
    int i, j;
    long tid;
    size_t mystacksize;
    
    tid = (long) threadid;
    pthread_attr_getstacksize(&attr, &mystacksize);
    printf("Thread %ld: stack size = %li bytes\n", tid, mystacksize);
    for (i = 0; i < N; i++)
        for (j = 0; j < N; j++) 
            A[i][j] = ((i * j) / 3.452) + (N - i);
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NTHREADS];
    size_t stacksize;
    int rc;
    long t;
    
    pthread_attr_init(&attr);
    pthread_attr_getstacksize (&attr, &stacksize);
    printf("Default stack size = %li\n", stacksize);
    stacksize = sizeof (double) * N * N + MEGEXTRA;
    printf("Amount of stack needed per thread = %li\n", stacksize);
    pthread_attr_setstacksize(&attr, stacksize);
    printf("Creating threads with stack size = %li bytes\n", stacksize);
    for (t = 0; t < NTHREADS; t++) {
        rc = pthread_create(&threads[t], &attr, dowork, (void *) t);
        if (rc) {
            printf("ERROR: return code from pthread_create() is %d\n", rc);
            exit(-1);
        }
    }
    printf("Created %ld threads.\n", t);
    pthread_exit(NULL);
}
```



### Miscellaneous Routines

`pthread_self()` return the unique, system assigned thread ID of the calling thread. `pthread_equal(thread1, thread2)` compares two thread IDs. returns non-zero if they are equal. Note that for both of these routines, the thread identifier objects are opaque and cannot be easily inspected. Because thread IDs are opaque objects, the C language equivalence operator `==` should not be used for comparison

`pthread_once(once_control, init_routine)` executes the `init_routine` exactly once in a process. The first call to this routine by any thread in the process executes the given `init_routine`, without parameters. Any subsequent call will have no effect. The `init_routine` is typically an initialization routine. The `once_control` parameter is a synchronization control structure that requires initialization prior to calling `pthread_once`. For example

```c
pthread_once_t once_control = PTHREAD_ONCE_INIT;
```



## 6. Mutex Variables

Mutex variables are one of the primary means of implementing thread synchronization and for protecting shared data when multiple writes occur. A mutex variable acts like a "lock" protecting access to a shared data resource

Only one thread can lock (or own) a mutex variable at any given time. Even if several threads try to lock a mutex only one thread will be successful. No other thread can own that mutex until the owning thread unlocks that mutex

A typical sequence in the use of a mutex is as follows:

* Create and initialize a mutex variable
* Several threads attempt to lock the mutex
* Only one succeeds and that thread owns the mutex
* The owner thread performs some set of actions
* The owner unlocks the mutex
* Another thread acquires the mutex and repeats the process
* Finally the mutex is destroyed

Mutex variables must be declared with type `pthread_mutex_t`, and must be initialized before they can be used. There are two ways to initialize a mutex variable:

1. Statically, when it is declared. For example

   ```c
   pthread_mutex_t mymutex = PTHREAD_MUTEX_INITIALIZER;
   ```

2. Dynamically, with the `pthread_mutex_init()` routine. This method permits setting mutex object attributes, `attr`

   The `attr` object is used to establish properties for the mutex object, and must be of type `pthread_mutexattr_t` if used. The Pthreads standard defines 3 optional mutex attributes:

   * Protocol: Specifies the protocol used to prevent priority inversions for a mutex
   * Prioceiling: Specifies the priority ceiling of a mutex
   * Process-shared: Specifies the process sharing of a mutex

   Note that not all implementations provide the three optional mutex attributes

The mutex is initially unlocked. The `pthread_mutexattr_init()` and `pthread_mutexattr_destroy()` routines are used to create and destroy mutex attribute objects respectively

The `pthread_mutex_lock()` routine is used by a thread to acquire a lock on the specified mutex variable. If the mutex is already locked by another thread, this call will block the calling thread until the mutex is unlocked

`pthread_mutex_trylock()` will attempt to lock a mutex. If the mutex is already locked, the routine will return immediately with a "busy" error code. This routine may be useful in preventing deadlock conditions, as in a priority-inversion situation

`pthread_mutex_unlock()` will unlock a mutex if called by the owning thread. An error will be returned if: 

* If the mutex was already unlocked
* If the mutex is owned by another thread



### Example

This example program illustrates the use of mutex variables in a threads program that performs a dot product

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    double		*a;
    double		*b;
    double 	   sum;
    int     veclen;
} DOTDATA;

#define NUMTHRDS 4
#define VECLEN 100

DOTDATA dotstr;
pthread_t callThd[NUMTHRDS];
pthread_mutex_t mutexsum;

void *dotprod (void *arg) {
    int i, start, end, len;
    long offset;
    double mysum, *x, *y;
    offset = (long) arg;
    
    len = dotstr.veclen;
    start = offset*len;
    end = start + len;
    x = dotstr.a;
    y = dotstr.b;
    
    mysum = 0;
    for (i = start; i < end; i++) {
        mysum += (x[i] * y[i]);
    }
    
    pthread_mutex_lock (&mutexsum);
    dotstr.sum += mysum;
    pthread_mutex_unlock (&mutexsum);
    
    pthread_exit((void *) 0);
}

int main (int argc, char *argv[]) {
    long i;
    double *a, *b;
    void *status;
    pthread_attr_t attr;
    
    a = (double*) malloc (NUMTHRDS * VECLEN * sizeof(double));
    b = (double*) malloc (NUMTHRDS * VECLEN * sizeof(double));
    
    for (i = 0; i < VECLEN * NUMTHRDS; i++) {
        a[i] = 1.0;
        b[i] = a[i];
    }
    
    dotstr.veclen = VECLEN;
    dotstr.a = a;
    dotstr.b = b;
    dotstr.sum = 0;
    
    pthread_mutex_init(&mutexsum, NULL);
    
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
    
    for (i = 0; i < NUMTHRDS; i++) {
        pthread_create(&callThd[i], &attr, dotprod, (void *)i);
    }
    
    pthread_attr_destroy(&attr);
    
    for (i = 0; i < NUMTHRDS; i++) {
        pthread_join(callThd[i], &status);
    }
    
    printf("Sum = %f\n", dotstr.sum);
    free (a);
    free (b);
    pthread_mutex_destroy(&mutexsum);
    pthread_exit(NULL);
}
```





## 7. Condition Variables

Condition variables provide yet another way for threads to synchronize. Condition variables implement synchronization based upon the actual value of data. A condition variable is always used in conjunction with a mutex lock. A representative sequence for using condition variables is shown below

Condition variables must be declared with type `pthread_cond_t`, and must be initialized before they can be used. There are two ways to initilize a condition variable:

* Statically: when it is declared. For example

  ```c
  pthread_cond_t myconvar = PTHREAD_COND_INITIALIZER;
  ```

* Dynamically, with the `pthread_cond_init()` routine. The ID of the created condition variable is returned to the calling thread through the condition parameter. This method permits setting condition variable object attributes, `attr`

The optional `attr` object is used to set condition variable attributes. There is only one attribute defined for condition variables: process-shared, which allows the condition variable to be seen by threads in other processes. The attribute object, if used, must be of type `pthread_condattr_t`. Note that not all implemetations may provide the process-shared attribute

The `pthread_condattr_init()` and `pthread_condattr_destroy()` routines are used to create and destroy condition variable attribute objects

`pthread_cond_wait()` blocks the calling thread until the specified condition is signalled. This routine should be called while mutex is locked, and it will automatically release the mutex while it waits. After signal is received and thread is awakened, mutex will be automatically locked for use by the thread. The programmer is then responsible for unlocking mutex when the thread is finished with it

Recommendation: Using a `while` loop instead of an `if` statement to check the waited for condition can help deal with several potential problems, such as:

* If several threads are waiting for the same wake up signal, they will take turns acquiring the mutex and any one of them can then modify the condition they all waited for
* If the thread received the signal in error due to a program bug
* The Pthreads library is permitted to issue spurious wake ups to a waiting thread without violating the standard

The `pthread_cond_signal()` routine is used to signal (or wake up) another thread which is waiting on the condition variable. It should be called after mutex is locked, and must unlock mutex in order for `pthread_cond_wait()` routine to complete

The `pthread_cond_broadcast()` routine should be used instead of `pthread_cond_signal()` if more than one thread is in a blocking wait state. It is a logical error to call `pthread_cond_signal()` before calling `pthread_cond_wait()`

Proper locking and unlocking of the associated mutex variable is essential when using these routines. For example

* Failing to lock the mutex before calling `pthread_cond_wait()` may cause it NOT to block
* Failing to unlock the mutex after calling `pthread_cond_signal()` may not allow a matching `pthread_cond_wait()` routine to complete (it will remain blocked)



#### Example

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define NUM_THREADS 3
#define TCOUNT 10
#define COUNT_LIMIT 12

int count = 0;
pthread_mutex_t count_mutex;
pthread_cond_t count_threshold_cv;

void *inc_count (void *t) {
    int i;
    long my_id = (long) t;
    
    for(i = 0; i < TCOUNT; i++) {
        pthread_mutex_lock(&count_mutex);
        count++;
        
        if (count == COUNT_LIMIT) {
            printf("inc_count(): thread %ld, count = %d, Threshold reached.\n", my_id, count);
            pthread_cond_signal(&count_threshold_cv);
            printf("Just sent the signal.\n");
        }
        
        printf("inc_count(): thread %ld, count = %d, unlocking mutex\n", my_id, count);
        pthread_mutex_unlock(&count_mutex);
        
        sleep(1);
    }
    
    pthread_exit(NULL);
}

void watch_count(void *t) {
    long my_id = (long) t;
    
    printf("Starting watch_count(): thread %ld\n", my_id);
    
    pthread_mutex_lock(&count_mutex);
    while(count < COUNT_LIMIT) {
        printf("watch_count(): thread %ld. Count= %d. Going into wait...\n", my_id, count);
        pthread_cond_wait(&count_threshold_cv, &count_mutex);
        printf("watch_count(): thread %ld. Condition signal received. Count= %d\n", my_id, count);
    }
    printf("watch_count(): thread %ld. Updating the value of count...\n", my_id);
    count += 125;
    printf("watch_count(): thread %ld count now = %d.\n", my_id, count);
    printf("watch_count(): thread %ld unlocking mutex.\n", my_id);
    pthread_mutex_unlock(&count_mutex);
    pthread_exit(NULL);
}

int main() {
    int i, rc;
    long t1 = 1, t2 = 2, t3 = 3;
    pthread_t threads[3];
    pthread_attr_t attr;
    
    pthread_mutex_init(&count_mutex, NULL);
    pthread_cond_init(&count_threshold_cv, NULL);
    
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
    pthread_create(&threads[0], &attr, watch_count, (void*) t1);
    pthread_create(&threads[1], &attr, inc_count, (void*) t2);
    pthread_create(&threads[2], &attr, inc_count, (void*) t3);
    
    for(i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    printf("Main(): Waited and joined with %d threads. Final value of count = %d. Done.\n", NUM_THREADS, count);
    
    pthread_attr_destroy(&attr);
    pthread_mutex_destroy(&count_mutex);
    pthread_cond_destroy(&count_threshold_cv);
    pthread_exit(NULL);
}
```





## 8. Monitoring, Debugging

To monitoring and debugging Pthreads program, we can use the TotalView debugger

Several performance analysis tools worth investigating, include: 

* Open SpeedShop
* TAU
* HPCToolKit
* PAPI
* Intel VTune Amplifier ThreadSpotter



## 9. Topic to be Covered in Future

* Thread scheduling
  * Implementations will differ on how threads are scheduled to run. In most cases, the default mechanism is adequate
  * The Pthreads API provides routines to explicitly set thread scheduling policies ad priorities which may override the default mechanisms
  * The API does not require implementations to support these features
* Keys: Thread-specific data
  * As threads call andreturn from different routines, the local data on a thread's stack comes and goes
  * To preserve stack data you can usually pass it as an argument from one routine to the next, or else store the data in a global variable associated with a thread
  * Pthreads provides another, possibly more convenient and versatile, way of accomplishing this through keys
* Mutex protocol attributes and mutex priorit management for the handling of "priority inversion" problems
  * Condition variable sharing - across processes
  * Thread cancellation
  * Threads and signals 
  * Synchronization constructs - barriers and locks


## Reference
1. [Lawrence Livermore National Laboratory](https://hpc-tutorials.llnl.gov/posix/)
---
title: Introduction to Parallel Programing in Python 
date: 2021-9-12
mathjax: true
tags: [Python, Programming]
---

This post will briefly introduce how to use `multiprocessing` module and `mpi4py` module to achieve parallel programming in Python. 

<!-- more -->


## Multiprocessing

Traditionally, Python is considered to not support parallel programming very well, partly because of the global interpreter lock (GIL). However, things have changed over time. This part will briefly introduce the multiprocessing module in Python, which effectively side-steps the GIL by using subprocesses instead of threads. The multiprocessing module provides many useful features and is very suitable for symmetric multiprocessing (SMP) and shared memory system. In this post, we focus on the `Pool` class of the multiprocessing module, which controls a pool of worker processes and supports both synchronous and asynchronous parallel execution



### The `Pool` class

#### Creating a `Pool` object

A `Pool` object can be created by passing the desired number of processes to the constructor

```python
import multiprocessing as mp

nprocs = mp.cpu_count()
print(f"Number of CPU cores: {nprocs}")

pool = mp.Pool(processes = nprocs)
```



##### The `map` method

To demonstrate the usage of the Pool class, let's define a simple function: 

```python
def square(x):
    return x * x

# You have to define the square function before you create the instance 
# of Pool, otherwise the workers cannot see your function

pool = mp.Pool(processes = nprocs)

res1 = [square(x) for x in range(20)]
print(res1)

res2 = pool.map(square, range(20))
print(res2)
```

The above parallel code will print exactly the same result as the serial code, but the computations are actually distributed and executed in parallel on the worker processes



##### The `starmap` method

The `map` method is only applicable to computational routines that accept a single argument. For routines that accept multiple arguments, you can use the `starmap` method

```python
def power_n(x, n):
    return x ** n

result = pool.starmap(power_n, [(x, 2) for x in range(20)])
print(result)
```

Note that both `map` and `starmap` are synchronous methods. This may lead to performance degradation if the workload is not well balanced among the worker processes



##### The `apply_async` method

The `Pool` class also provides the `apply_async` method that makes asynchronous execution of the worker processes possible. The `apply_async` method executes the routine only once. Therefore, in the previous example. we would need to define another routine, `power_n_list`, that computes the values of a list of numbers raised to a particular power

```python
def power_n_list (x_list, n):
    return [x ** n for x in x_list]
```

To use the `apply_async` method, we also need to divide the whole input list `range(20)` into sub-lists (which are known as slices) and distribute them to the worker processes. The slices can be prepared by the following `slice_data` method

```python
def slice_data(data, nprocs):
    aver, res = divmod(len(data), nprocs)
    nums = []
    for proc in range(nprocs):
        if proc < res:
            nums.append(aver + 1)
        else:
            nums.append(aver)
    count = 0
    slices = []
    for proc in range(nprocs):
        slices.append(data[count: count + nums[proc]])
        count += nums[proc]
    return slices
```

Then we can pass the `power_n_list` routine and the sliced input list to the `apply_async` method

```python
inp_lists = slice_data(range(20), nprocs)
multi_result = [pool.apply_async(power_n_list, (inp, 2)) for inp in inp_lists]
```

The actual result can be obtained using the get method and nested list comprehension

```python
result = [x for p in multi_result for x in p.get()]
print(result)
```



#### Example: Computing $\pi$ 

The formula for computing $\pi$ is given below:
$$
\pi=\int_0^1 \frac{4}{1+x^2}dx
$$


##### Serial code

For example, we can choose to use 10 million points

```python
nsteps = 10000000
dx = 1.0 / nsteps
pi = 0.0
for i in range(nsteps):
    x = (i + 0.5) * dx
    pi += 4.0 / (1.0 + x * x)
pi *= dx
```



##### Parallel code

To parallelize the serial code, we need to divide the `for` loop into sub-tasks and distribute them to the worker processes. For example:

```python
def calc_partial_pi (rank, nprocs, nsteps, dx):
    partial_pi = 0.0
    for i in range(rank, nsteps, nprocs):
        x = (i + 0.5) * dx
        partial_pi += 4.0 / (1.0 + x * x)
    partial_pi *= dx
    return partial_pi
```

With the `calc_partial_pi` function we can prepare the input arguments for the sub-tasks and compute the value of $\pi$ using the `starmap` method:

```python
nprocs = mp.cpu_count()
inputs = [(rank, nprocs, nsteps, dx) for rank in range(nprocs)]

pool = mp.Pool(processes = nprocs)
result = pool.starmap (calc_partial_pi, inputs)
pi = sum(result)
```

Or using the asynchronous parallel calculation with `apply_async` method:

```python
multi_result = [pool.apply_async(calc_partial_pi, inp) for inp in inputs]
result = [p.get() for p in multi_result]
pi = sum(result)
```



### The `Process` class

The `Process` class makes it possible to have direct control over individual processes. A process can be created by providing a target function and its input arguments to the `Process` constructor. The process can then be started with the `start` method and ended using the `join` method. For example: 

```python
import multiprocessing as mp

def square(x):
    print(x * x)
   
p = mp.Process(target = square, args=(5,))
p.start()
p.join()
```



#### Process and Queue

In practice, we often want the process and the function to return the computed result, rather than just printing the result as in the previous example. This can be achieved with help from the `Queue` class in the `multiprocessing` module

The `Queue` class includes the `put` method for depositing data and the `get` method for retrieving data. The code in the earlier example can be changed to: 

```python
import multiprocessing as mp

def square(x, q):
    q.put(x * x)

qout = mp.Queue()
p = mp.Process(target = square, args=(5, qout))
p.start()
p.join()

result = qout.get()
print(result)
```

Or with multiple processes: 

```python
import multiprocessing as mp

def square(x, q):
    q.put(x * x)

qout = mp.Queue()
processes = [mp.Process(target = square, args=(i, qout)) for i in range(2, 10)]

for p in processes: 
    p.start()

for p in processes:
    p.join()
    
result = [qout.get() for p in processes]
print(result)
```

From the result, we can see that the execution of the processes is asynchronous. To make sure that the order of the output will be the same as the input, we can use "process index" to sort them. For example:

```python
import multiprocessing as mp
from random import randint
from time import sleep

def square(i, x, q):
    sleep(0.01 * randint(0, 100))
    q.put((i, x * x))

input_values = [2, 4, 6, 8, 3, 5, 7, 9]
qout = mp.Queue()
processes = [mp.Process(target = square, args=(ind, val, qout)) for ind, val in enumerate(input_values)]

for p in processes:
    p.start()

for p in processes: 
    p.join()
    
unsorted_result = [qout.get() for p in processes]
result = [t[1] for t in sorted(unsorted_result)]
print(result)
```



#### Example: computing $\pi$ again

Similarly:

```python
def calc_partial_pi(rank, nprocs, nsteps, dx, qout):
    partial_pi = 0.0
    for i in range(rank, nsteps, nprocs):
        x = (i + 0.5) * dx
        partial_pi += 4.0 / (1.0 + x * x)
    partial_pi *= dx
    qout.put(partial_pi)

nsteps = 10000000
dx = 1.0 / nsteps
nprocs = mp.cpu_count()

qout = mp.Queue()
inputs = [(rank, nprocs, nsteps, dx, qout) for rank in range(nprocs)]
processes = [mp.Process(target=calc_partial_pi, args=inp) for inp in inputs]

for p in processes:
    p.start()

for p in processes: 
    p.join()

result = [qout.get() for p in processes]
pi = sum(result)
```



## `mpi4py`

The limitation of the `multiprocessing` modules is that it does not support parallelization over multiple compute nodes (i.e. on distributed memory systems). To overcome this limitation and enable cross-node parallelization, we can use MPI for python, that is, the `mpi4py` modules. This module provides an object-oriented interface that resembles the message passing interface (MPI), and hence allow Python programs to exploit multiple processors on multiple compute nodes. The `mpi4py` module supports both point-to-point and collective communications for Python objects as well as buffer-like objects. 



### Basic of `mpi4py`

Our first Python program with `mpi4py`:

````python
from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

print("Hello from process {} out of {}".format(rank, size))
````



In parallel programming with MPI, we need the so-called communicator, which is a group processes that can talk to each other. To identify the processes with that group, each process is assigned a rank that is unique within the communicator. The total number of processes is often referred to as the size of the communicator. 

In the above code, we defined the variable `comm` as the default communicator `MPI.COMM_WORLD`. The rank of each process is retrieved via the `Get_rank` method of the communicator, and the size of the communicator is obtained by the `Get_size` method. 

The usual way to execute an `mpi4py` code in parallel is to use `mpirun` for example: `mpirun -n 4 python3 hello.py` will run the code on 4 processes. 



### Point-to-point communication

For point-to-point communication between Python objects, `mpi4py` provides the `send` and `recv` methods that are similar to those in MPI. For example: 

```python
from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

# master process
if rank == 0:
    data = {"x": 1, "y": 2.0}
    # master process sends data to worker processes by
    # going through the ranks of all worker processes
    for i in range(1, size):
        comm.send(data, dest = i, tag = i)
        print("Process {} sent data: ".format(rank), data)
        
# worker processes
else: 
    # each worker process receives data from master process
    data = comm.recv(source = 0, tag = rank)
    print("Process {} received data: ".format(rank), data)
```



Note that the above example uses blocking communication methods, which means that the execution of code will not proceed until the communication is completed. To achieve non-blocking communication, use `isend` and `irecv`.  They immediately return `Request` objects, and we can use the `wait` method to manage the completion of the communication: 

```python
if rank == 0:
    data = {"x": 1, "y": 2.0}
    for i in range(1, size):
        req = comm.isend(data, dest = i, tag = i)
        req.wait()
        print("Process {} sent data".format(rank), data)
else:
    req = comm.irecv(source = 0, tag = rank)
    data = req.wait()
    print("Process {} received data: ".format(rank), data)
```



### Collective communication

In parallel programming, it is often useful to perform what is known as collective communication, for example, broadcasting a Python object from the master process to all the worker processes. The example code below broadcasts a `Numpy` array using the `bcast` method.

```python
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

if rank == 0:
    data = np.arange(4.0)
else:
    data = None
    
data = comm.bcast(data, root = 0)

if rank == 0:
    print("Process {} broadcast data: ".format(rank), data)
else:
    print("Process {} received data: ".format(rank), data)
```



If one needs to divide a task and distribute the sub-tasks to the processes, the `scatter` method will be useful. Note that it is not possible to distribute more elements than the number of processors. If one has a big list or array, it is necessary to make slices of the list or array before calling the `scatter` method: 

```python
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
nprocs = comm.Get_size()

if rank == 0:
    data = np.arange(15.0)
	
    # determine the size of each sub-task
    ave, res = divmod(data.size, nrpocs)
    counts = [ave + 1 if p < res else ave for p in range(nprocs)]
    
    # determine the starting and ending indices of each sub-task
    starts = [sum(counts[:p]) for p in range(nprocs)]
    ends = [sum(counts[:p+1]) for p in range(nprocs)]
    
    #converts data into a list of arrays
    data = [data[starts[p]:ends[p]] for p in range(nprocs)]
else:
    data = None

data = comm.scatter(data, root = 0)

print("Process {} has data: ".format(rank), data)
```



The `gather` method does the opposite to `scatter`. If each process has an element, one can use `gather` to collect them into a list of elements on the master process. The code below use `scatter` and `gather` to compute $\pi$: 

```python
from mpi4py import MPI
import time
import math

t0 = time.time()

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
nprocs = comm.Get_size()

nsteps = 10000000
dx = 1.0 / nsteps

if rank == 0:
    ave, res = divmod(nsteps, nprocs)
    counts = [ave + 1 if p < res else ave for p in range(nprocs)]
    
    starts = [sum(counts[:p]) for p in range(nprocs)]
    ends = [sum(counts[:p+1]) for p in range(nprocs)]
    
    data = [data[starts[p]:ends[p]] for p in range(nprocs)]
else:
    data = None

data = comm.scatter(data, root = 0)

partial_pi = 0.0
for i in range(data[0], data[1]):
    x = (i + 0.5) * dx
    partial_pi += 4.0 / (1.0 + x * x)
partial_pi *= dx

partial_pi = comm.gather(partial_pi, root = 0)

if rank == 0:
    print("pi computed in {:.3f} sec".format(time.time() - t0))
    print("error is {}".format(abs(sum(partial_pi) - math.pi)))
```



### Buffer-like objects

The `mpi4py` module provides methods for directly sending and receiving buffer-like objects. The advantage of working with buffer-like objects is that the communication is fast. However, the user needs to be more explicit when it comes to handling the allocation of memory space. For example, the memory of the receiving buffer needs to be allocated prior to the communication, and the size of the sending buffer should not exceed that of the receiving buffer. One should also be aware that `mpi4py` expects the buffer-like objects to have contiguous memory. 

In `mpi4py`, a buffer-like object can be specified using a list or tuple with 2 or 3 elements (or 4 elements for the vector variants)



#### Point-to-point communication

Here is the example code corresponds to the previous one with buffer: 

```python
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

if rank == 0:
    data = np.arange(4.)
    for i in range(1, size):
        comm.Send(data, dest = i, tag = i)
        print("Process {} sent data: ".format(rank), data)
else:
    data = np.zeros(4)
    comm.Recv(data, source = 0, tag = rank)
    print("Process {} received data: ".format(rank), data)
```



Note that the data array was initialized on the worker processes before the `Recv` method was called. When using the `Send` and `Recv` methods, one thing to keep in mind is that the sending buffer and the receiving buffer should match in size. 

In `mpi4py`, the non-blocking communication methods for buffer-like objects are `Isend` and `Irecv`. The use of non-blocking methods are shown in the example below:

```python
if rank == 0:
    data = np.arange(4.)
    for i in range(1, size):
        req = comm.Isend(data, dest = i, tag = i)
        req.Wait()
        print("Process {} sent data: ".format(rank), data)
else:
    data = np.zeros(4)
    req = comm.Irecv(data, source = 0, tag = rank)
    req.Wait()
    print("Process {} received data: ".format(rank), data)
```



#### Collective communication

```python
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
rank = comm.Get_rank()

if rank == 0:
    data = np.arange(4.0)
else:
    data = np.zeros(4)
    
comm.Bcast(data, root = 0)

print("Process {} has data: ".format(rank), data)
```



Another collective communication method is `Scatter`, which sends slices of a large array to the worker processes. However, `Scatter` is not as convenient as `scatter` in practice since it requires the size of the large array to be divisible by the number of processes. In practice, the size of the array is not known beforehand and is therefore not guaranteed to be divisible by the number of available processes. If is more practical to use `Scatterv`, the vector version of `Scatter`, which offers a much more flexible way to distribute the array. For example:

````python
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
nprocs = comm.Get_size()

if rank == 0:
    sendbuf = np.arange(15.0)
    
    # count : the size of each sub-task
    ave, res = divmod(sendbuf.size, nprocs)
    count = [ave + 1 if p < res else ave for p in range(nprocs)]
    count = np.array(count)
    
    # displacement: the starting index of each sub-task
    displ = [sum(count[:p]) for p in range(nprocs)]
    displ = np.array(displ)
else:
    sendbuf = None
    # initialize count on worker processes
    count = np.zeros(nprocs, dtype=np.int)
    displ = None

# broadcast count
comm.Bcast(count, root = 0)

# initialize recvbuf on all processes
recvbuf = np.zeros(count[rank])

comm.Scatterv([sendbuf, count, displ, MPI.DOUBLE], recvbuf, root = 0)

print("After Scatterv, process {} has data: ".format(rank), recvbuf)
````



`Gatherv` is the reverse operation of `Scatterv`. When using `Gatherv`, one needs to specify the receiving buffer as `[recvbuf2, count, displ, MPI.DOUBLE]`: 

```python
sendbuf2 = recvbuf
recvbuf2 = np.zeros(sum(count))
comm.Gatherv(sendbuf2, [recvbuf2, count, displ, MPI.DOUBLE], root = 0)

if comm.Get_rank() == 0:
    print("After Gatherv, process 0 has data: ", recvbuf2)
```



`Reduce`, on the other hand, can be used to compute the sum of (or to perform another operation on) the data collected from all processes. For example:

```python
partial_sum = np.zeros(1)
partial_sum[0] = sum(recvbuf)
print("Partial sum on process {} is: ".format(rank), partial_sum[0])

total_sum = np.zeros(1)
comm.Reduce(partial_sum, total_sum, op = MPI.SUM, root = 0)
if comm.Get_rank() == 0:
    print("After Reduce, total sum on process 0 is: ", total_sum[0])
```












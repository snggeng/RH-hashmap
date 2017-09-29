# KPCB Engineering Fellows Program
Implementation of Fix-sized HashMap using RobinHood Hashing. When choosing between the existing methods of resolving hash collisions, a trade-off needs to be made between time and space complexity.

There are two major types of implementations: one is chaining and the other is open addressing. Chaining is quite common in most standard libraries, where the collision is handled by appending items into a linked list headed by the bucket the key is mapped to. Open addressing uses a different mechanism to handle collision: the key (and value) is inserted to another bucket if the bucket it attempt to insert is already occupied.

Open addressing has some clear advantages over chaining. First, it does not require extra memory allocation. This reduces memory allocation overhead and can possibly improve cpu caching. Moreover, in open addressing the developer has more control on memory layout – placing elements in buckets with certain order to make probing (search on alternative location for key) fast. Best of all, open addressing gives us better memory lower bound over chaining.

For this implementation, I chose to use a variant of open-addressing that uses linear probing called RobinHood Hashing.

Robin Hood hashing means that when you’re doing linear probing, you try to position every element such that it is as close as possible to its ideal position. You do this by moving objects around whenever you insert or erase an element, and the method for doing that is that you take from rich elements and give to poor elements. (hence the name Robin Hood hashing) A “rich” element is an element that received a slot close to its ideal insertion point. A “poor” element is one that’s far from its ideal insert point. When you insert a new element using linear probing you count how far you are from your ideal position. If you are further from your ideal position than the current element, you swap the new element with the existing element and try to find a new spot for the existing element. In this manner, we are always trying to reduce the variance between elements and so when the load factor increases, there is no drop in performance.

## References
* https://www.sebastiansylvan.com/post/robin-hood-hashing-should-be-your-default-hash-table-implementation/
* https://probablydance.com/2017/02/26/i-wrote-the-fastest-hashtable/

## Performance Testing Guidelines
For hashing when the size of the map is small and there are none or close to none collisions, the RobinHood HashMap will perform poorly as compared to HashMaps in standard libraries that use sequence chaining. This is by design. However, when the size of the map is big and there are many collisions, the RobinHood HashMap is roughly equal in terms of time as compared to standard library implementations using sequence chaining, but magnitudes more efficient in terms of space.

To test this, I used the default ES6 Map class available in Javascript (variant of sequence chaining) and a Naive implementation of a HashMap that implements open-addressing to benchmark my RobinHood HashMap (RH).

## Analysis of runtimes

### `set()` method
The runtime of our `set()` method should differ for all three maps in terms of time and space complexity. In order to simulate an environment where many collisions occur, I generate keys that contain ASCII letters and numbers and assign a random combination for each `map.set()` operation. To test the performance of the same method across all three maps, we implement a similar map of same fixed-size n and set keys multiple times and get the average and median time taken for such an operation using `testSetMethod()`:

For all n where n is the size of our map, the runtime of `set()` for NaiveHashMap and ES6 is small, since there are little or no collisions, and the additional cost of swapping the "rich" and "poor" buckets in RH-HashMap adds to our runtime. However, when n is large and the load factor increases, RH-HashMap performs marginally better in terms of time, but significantly better in terms of space.

When n = 100,
```
************ BEGIN RH **************
RobinHood HashMap 0: 1.693ms
RobinHood HashMap 1: 1.516ms
RobinHood HashMap 2: 0.454ms
RobinHood HashMap 3: 0.540ms
RobinHood HashMap 4: 0.869ms
RobinHood HashMap 5: 0.582ms
RobinHood HashMap 6: 0.496ms
RobinHood HashMap 7: 0.624ms
RobinHood HashMap 8: 0.876ms
RobinHood HashMap 9: 0.499ms
RH : Average time 1.0000 milliseconds
RH : Average space 88.0000 MB
RH : Median time 1.0000 milliseconds
RH : Median space 87.3900 MB


************ BEGIN NAIVE **************
Naive HashMap 0: 1.158ms
Naive HashMap 1: 0.900ms
Naive HashMap 2: 1.137ms
Naive HashMap 3: 0.986ms
Naive HashMap 4: 0.734ms
Naive HashMap 5: 0.578ms
Naive HashMap 6: 0.515ms
Naive HashMap 7: 0.466ms
Naive HashMap 8: 0.495ms
Naive HashMap 9: 0.449ms
Naive : Average time 1.0000 milliseconds
Naive : Average space 90.0000 MB
Naive : Median time 1.0000 milliseconds
Naive : Median space 89.3100 MB


************ BEGIN ES6 **************
ES6 HashMap 0: 0.551ms
ES6 HashMap 1: 1.251ms
ES6 HashMap 2: 0.255ms
ES6 HashMap 3: 0.274ms
ES6 HashMap 4: 0.284ms
ES6 HashMap 5: 0.322ms
ES6 HashMap 6: 0.283ms
ES6 HashMap 7: 0.253ms
ES6 HashMap 8: 0.236ms
ES6 HashMap 9: 0.226ms
ES6 : Average time 1.0000 milliseconds
ES6 : Average space 91.0000 MB
ES6 : Median time 0.0000 milliseconds
ES6 : Median space 90.7300 MB
```
When n = 10000, RH and Naive HashMaps perform poorly when compared to ES6.
```
************ BEGIN RH **************
RobinHood HashMap 0: 55.580ms
RobinHood HashMap 1: 45.802ms
RobinHood HashMap 2: 36.392ms
RobinHood HashMap 3: 38.473ms
RobinHood HashMap 4: 34.374ms
RobinHood HashMap 5: 42.784ms
RobinHood HashMap 6: 43.454ms
RobinHood HashMap 7: 35.047ms
RobinHood HashMap 8: 39.963ms
RobinHood HashMap 9: 35.334ms
RH : Average time 41.0000 milliseconds
RH : Average space 86.0000 MB
RH : Median time 40.0000 milliseconds
RH : Median space 86.4700 MB


************ BEGIN NAIVE **************
Naive HashMap 0: 47.426ms
Naive HashMap 1: 41.822ms
Naive HashMap 2: 42.369ms
Naive HashMap 3: 41.443ms
Naive HashMap 4: 34.020ms
Naive HashMap 5: 44.339ms
Naive HashMap 6: 43.429ms
Naive HashMap 7: 32.286ms
Naive HashMap 8: 41.519ms
Naive HashMap 9: 33.040ms
Naive : Average time 41.0000 milliseconds
Naive : Average space 100.0000 MB
Naive : Median time 42.0000 milliseconds
Naive : Median space 94.8400 MB


************ BEGIN ES6 **************
ES6 HashMap 0: 37.975ms
ES6 HashMap 1: 27.730ms
ES6 HashMap 2: 26.504ms
ES6 HashMap 3: 24.019ms
ES6 HashMap 4: 29.518ms
ES6 HashMap 5: 25.822ms
ES6 HashMap 6: 29.182ms
ES6 HashMap 7: 27.799ms
ES6 HashMap 8: 27.208ms
ES6 HashMap 9: 27.228ms
ES6 : Average time 29.0000 milliseconds
ES6 : Average space 106.0000 MB
ES6 : Median time 27.0000 milliseconds
ES6 : Median space 105.5700 MB
```

When n = 100000, the difference in time and space performance of the RH and the other 2 maps is not significant, but we can already see that RH is slightly more optimized, particularly in terms of space performance.

```
************ BEGIN RH **************
RH : Average time 459.0000 milliseconds
RH : Average space 141.0000 MB
RH : Median time 462.0000 milliseconds
RH : Median space 148.4300 MB


************ BEGIN NAIVE **************
Naive : Average time 464.0000 milliseconds
Naive : Average space 183.0000 MB
Naive : Median time 370.0000 milliseconds
Naive : Median space 210.4900 MB


************ BEGIN ES6 **************
ES6 : Average time 497.0000 milliseconds
ES6 : Average space 227.0000 MB
ES6 : Median time 413.0000 milliseconds
ES6 : Median space 255.6900 MB

```

When n = 1000000, the average time used by all 3 maps is roughly equal, but the average space used by RH is more than half of the ES6 Map, and significantly more time efficient than the Naive Map which although implements open-addressing, does not insert elements into buckets as efficiently as RH. (RH swaps elements to decrease variance each time)
```
************ BEGIN RH **************
RH : Average time 4488.0000 milliseconds
RH : Average space 345.0000 MB
RH : Median time 4503.0000 milliseconds
RH : Median space 258.4600 MB


************ BEGIN NAIVE **************
Naive : Average time 5110.0000 milliseconds
Naive : Average space 521.0000 MB
Naive : Median time 5284.0000 milliseconds
Naive : Median space 499.7900 MB


************ BEGIN ES6 **************
ES6 : Average time 7717.0000 milliseconds
ES6 : Average space 733.0000 MB
ES6 : Median time 7462.0000 milliseconds
ES6 : Median space 635.1200 MB
```

When n = 5000000, test takes too long to run.
```
************ BEGIN RH **************
RH : Average time 36663.0000 milliseconds
RH : Average space 629.0000 MB
RH : Median time 36834.0000 milliseconds
RH : Median space 630.3400 MB


************ BEGIN NAIVE **************
Naive : Average time 52542.0000 milliseconds
Naive : Average space 887.0000 MB
Naive : Median time 53408.0000 milliseconds
Naive : Median space 777.5800 MB


************ BEGIN ES6 **************
ES6 : Average time 2099865.0000 milliseconds
ES6 : Average space 1067.0000 MB
ES6 : Median time 2004915.0000 milliseconds
ES6 : Median space 1067.5400 MB
```

### `get()` method
The runtime of our `get()` method should be O(1) for all three maps. To test the performance of the same method across all three maps, we implement a similar map of same fixed-size n and retrieve a single key multiple times and get the average and median time taken for such an operation using `testGetMethod()`:

When n = 10, we obtain similar runtimes for all three maps:
```
RobinHood HashMap 0: 0.163ms
RobinHood HashMap 1: 0.060ms
RobinHood HashMap 2: 0.021ms
RobinHood HashMap 3: 0.010ms
RobinHood HashMap 4: 0.012ms
RobinHood HashMap 5: 0.027ms
RobinHood HashMap 6: 0.011ms
RobinHood HashMap 7: 0.037ms
RobinHood HashMap 8: 0.013ms
RobinHood HashMap 9: 0.019ms
RH : Average time 1.0000 milliseconds
RH : Average space 87.0000 MB
RH : Median time 0.0000 milliseconds
RH : Median space 86.3300 MB


************ BEGIN NAIVE **************
Naive HashMap 0: 0.028ms
Naive HashMap 1: 0.020ms
Naive HashMap 2: 0.012ms
Naive HashMap 3: 0.157ms
Naive HashMap 4: 0.018ms
Naive HashMap 5: 0.010ms
Naive HashMap 6: 0.014ms
Naive HashMap 7: 0.013ms
Naive HashMap 8: 0.019ms
Naive HashMap 9: 0.017ms
Naive : Average time 0.0000 milliseconds
Naive : Average space 87.0000 MB
Naive : Median time 0.0000 milliseconds
Naive : Median space 86.5100 MB


************ BEGIN ES6 **************
ES6 HashMap 0: 0.021ms
ES6 HashMap 1: 0.009ms
ES6 HashMap 2: 0.006ms
ES6 HashMap 3: 0.006ms
ES6 HashMap 4: 0.007ms
ES6 HashMap 5: 0.008ms
ES6 HashMap 6: 0.007ms
ES6 HashMap 7: 0.006ms
ES6 HashMap 8: 0.006ms
ES6 HashMap 9: 0.006ms
ES6 : Average time 0.0000 milliseconds
ES6 : Average space 87.0000 MB
ES6 : Median time 0.0000 milliseconds
ES6 : Median space 86.5900 MB
```


When n = 1000, we obtain similar runtimes for all three maps.
```
************ BEGIN RH **************
RH : Average time 1.0000 milliseconds
RH : Average space 87.0000 MB
RH : Median time 0.0000 milliseconds
RH : Median space 86.5100 MB


************ BEGIN NAIVE **************
Naive : Average time 1.0000 milliseconds
Naive : Average space 89.0000 MB
Naive : Median time 0.0000 milliseconds
Naive : Median space 88.4900 MB


************ BEGIN ES6 **************
ES6 : Average time 1.0000 milliseconds
ES6 : Average space 93.0000 MB
ES6 : Median time 0.0000 milliseconds
ES6 : Median space 92.3000 MB
```

### `load()` method
Statistics

## Source Tree
```
.
├── OA-HashMap.js
├── RH-HashMap.js
├── coverage
│   ├── coverage.json
│   ├── lcov-report
│   │   ├── base.css
│   │   ├── index.html
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   └── test
│   │       ├── hashMap.js.html
│   │       └── index.html
│   └── lcov.info
├── index.js
├── logger.js
├── package-lock.json
├── package.json
├── readme.md
├── test
│   └── classes
│       ├── hashMap.spec.js
│       ├── logger.spec.js
│       └── utils.spec.js
└── utils.js
```
## Commands

## Problem
Using only primitive types, implement a fixed-size hash map that associates string keys with arbitrary data object references (you don't need to copy the object). Your data structure should be optimized for algorithmic runtime and memory usage. You should not import any external libraries, and may not use primitive hash map or dictionary types in languages like Python or Ruby.

The solution should be delivered in one class (or your language's equivalent) that provides the following functions:

`constructor(size)`: return an instance of the class with pre-allocated space for the given number of objects.

`boolean set(key, value)`: stores the given key/value pair in the hash map. Returns a boolean value indicating success / failure of the operation.

`get(key)`: return the value associated with the given key, or null if no value is set.
delete(key): delete the value associated with the given key, returning the value on success or null if the key has no value.

`float load()`: return a float value representing the load factor (`(items in hash map)/(size of hash map)`) of the data structure. Since the size of the data structure is fixed, this should never be greater than 1.

If your language provides a built-in hashing function for strings (ex. `hashCode` in Java or `__hash__` in Python) you are welcome to use that. If not, you are welcome to do something naive, or use something you find online with proper attribution.

## Instructions
Please provide the source, tests, runnable command-line function and all the resources required to compile (if necessary) and run the following program. You are free to use any coding language that compiles/runs on *nix operating systems and requires no licensed software.

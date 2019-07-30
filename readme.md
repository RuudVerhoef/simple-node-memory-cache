# In-memory object cache written in typescript for Node that supports multiple eviction strategies.

Currently supported strategies are LRU, FIFO, LIFO, LFU, MRU and RR.

For more informations visit: 
[Wikipedia replacement policies](https://en.wikipedia.org/wiki/Cache_replacement_policies "Wikipedia").

## Creating a chache
Caches are named Simple followed by the name of the replacement policy. So the constructor for a LRU chache would be `SimpleLRU()`, the constructor for a FIFO chache would be `SimpleFIFO()`, etc.

There are two methods you can use to create a cache. Both the key and value of the key-value store can be of any type you like.

### Creating a LRU cache - method 1

```typescript
// Import simple-node-memory-cach
import {SimpleLRU} from './node_modules/simple-node-memory-cach/index';

// create a type that will be stored
type Person = {firstname: string, lastname: string};
type CanTeach = {courses: string[]};
type Teacher = Person & CanTeach;

// Create the LRU cache
const cache: SimpleLRU<string, Teacher> = new SimpleLRU<string, Teacher>() 
```

This creates a LRU cache that can hold the default maximum amount of object. To find out what the current default is set to use it's get method.

```typescript
// A cache has been created at this point 
console.log(cache.maxObjectsInCache);
```

At times you might want to change the maximum amount of object allowed in the cache. This can be done using it's setter.

```typescript
// A cache has been created at this point 

// Set the amount of objects this cache can contain to 50.
cache.maxObjectsInCache = 50;
```

### Creating a LRU cache - method 2

Instead of having to change the amount of objects a cache can hold after it is created. It is also possible to define this in the constructor.

```typescript
// Import simple-node-memory-cach
import {SimpleLRU} from './node_modules/simple-node-memory-cach/index';

// create a type that will be stored
type Person = {firstname: string, lastname: string};
type CanTeach = {courses: string[]};
type Teacher = Person & CanTeach;

// Create the LRU cache that can hold 100 objects
const cache: SimpleLRU<string, Teacher> = new SimpleLRU<string, Teacher>(100) 
```

## Adding and retrieving

To add an object to the cache simply:
```typescript
// A cache has been created at this point
cache.set(key, value);
```
To retrieve an entryL
```typescript
// A cache has been created at this point
cache.get(key);
```

## Currently supported methods and their signature
```typescript
clear(): void
```
Removes all entries from the cache.
```typescript
has(key: T): boolean
```
Returns if the key exists in the cache.
```typescript
length(): number
```
Returns the amount of entries in the cache.
```typescript
delete(key: T): void
```
Removes the data and key from the cache that is referred to by the provided key.
```typescript
get(key: T): [U, number, number] | undefined
```
Retrieves an entry pointed to by the key. If the entry does not exist `undefined` will be returned.
```typescript
set(key: T, value: U): Map<T, [U, number, number]>
```
Adds an entry to the cache and returns a Map file containing the keys mapped to an array containing the values, the last time the entry was viewed (as unix timestamp) and the number of times the entry was viewed (the last two are only set if the eviction strategy requires this).
```typescript
entries(): IterableIterator<[T, [U, number, number]]>
```
Returns an IterableIterator holding both the key and value.
```typescript
keys(): IterableIterator<T>
```
Returns an IterableIterator holding only the keys.
```typescript
values(): IterableIterator<[U, number, number]>
```
Returns an IterableIterator holding only the values.

## A short note

In order to use `entries()`, `keys()` and `values()`, the tsconfig.json file must use es6 as a target to compile to or set `"downlevelIteration": true` (in cases where you need to compile to es5).
# Redis
## Documentation
Documentation for Redis can be found <a href="https://redis.io/">here</a>

## Examples
Examples of a practical usage of Redis can be found in this repo.

## Commands
The commands you can use with Redis can be found <a href="https://redis.io/commands/">here</a>

### Simple Commands
<p>Data is stored in a key, value pair. The crud type of commands are:</p>
<p>SET key value - creating a record</p>
<p>GET key - retrieves a key, value pair</p>
<p>DEL key - deletes a key, value pair</p>
<p>EXISTS key - determine if key, value pair is there</p>
<p>KEYS pattern - retrieves all key, value pairs in storage matching the pattern</p>
<p>KEYS * - retrieves all key, value pairs in storage</p>
<p>FLUSHALL - clears the entire storage</p>
<p>TTL key - time to live for the key, value pair</p>
<p>EXPIRE key time - makes a key, value pair expire in t time</p>
<p>SETEX key time value - sets a key, value pair and have it expire in t time</p>

### Different data types
#### Array
<p>LRANGE key start stop - retrives an array</p>
<p>LPUSH key value - pushes the value to an array</p>
<p>RPUSH key value - add the value to the end of the array</p>
<p>LPOP key - pops the first value of the array and returns it</p>
<p>RPOP key - pops the last value of the array and returns it</p>

#### Sets
<p>SADD key member - adds a value to the set</p>
<p>SMEMBERS key - retrieves all the values of the set</p>
<p>SREM key - removes the set</p>

#### Hash - no nesting
<p>HSET key field value - inserts a key, value pair into the heap</p>
<p>HGET key field - retrieves a unique key, value pair from the heap</p>
<p>HGETALL key - retrieves all key, value pairs from the heap</p>
<p>HDEL key field - removes a key, value pair from the heap</p>
<p>HEXISTS key field - checks to see if key, value pair exists in the heap</p>

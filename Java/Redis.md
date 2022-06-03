## Command

### String

- 默认数据库： 16 个 / select 切换
- keys \* 查看数据库所有的 Key
- flushdb 清空当前数据库
- flushall 清空所有数据库
- Redis 是单线程的，基于内存操作的，其性能瓶颈 源于机器的内存而不是 CPU
- EXPIRE key time 为 Key 设置过期时间
- ttl key 查看 key 的过期时间
- type key 查看 key 的类型
- EXISTS key 查看 key 是否存在
- APPEND key value 给 key 添加后续值 value
- incr/decr key 当前 key 的值增加/减少 1
- INCRBY/DECRBY key val 当前 key 的步长增加/减少 val
- GENERATE startIndex endIndex 截取字符串
- SETRANGE key index val 替换指定位置的字符串
- setex（set with expire）key time value # 设置过期时间
- setnx（set if not exist）key value # 不存在设置
- mset 批量设置 mset key1 val1 key2 val2 ...
- mget 批量获取 mget key1 key2 ...
- getset key value 先 get 再 set 如果不存在先返回 nil 再 set

### List

- LPUSH/Rpush list_name value
- Lpop/Rpop list_name
- LRANGE list_name startIndex endIdex
- lindex list_name index
- Llen list_name 获取 list_name 长度
- lrem list_name num value 移除 list_name 中 num 个 value
- ltrim key start end 取截取元素
- rpoplpush source destination 先取再添加
- lset key index value 给 key 的索引 index 设置值为 value
- LINSERT key before/after pivot value 在 key 的 pivot 之前/之后插入 value

### Set

- sadd key value set 添加值 value
- SMEMBERs key 查看 set 所有值
- SISMEBER key value 查看 value 是否在 set key 中
- scard key 查看 set key 中所有元素数量
- srem key value 移除 set key 中的 value
- SRANDMEMBER key num 随机输出 key 中 num 个元素
- spop key 随机删除 key 中的一个 set
- smove key1 key2 value
- SDIFF key1 key2 差集
- SINTER key1 key2 交集
- SUNION key1 key2 并集

### Hash

- hset key field value
- hget key field
- hgetall key
- hdel key field ...
- HEXISTS key field
- HINCRBY key field value

### Zset 有序集合

在 set 的基础上，增加了一个值 - 排序

- zadd key rank value rank2 value2 ...
- zrange key start stop
- ZRANGEBYSCORE key min max
- zcard key
- zount key field

### GeoSpatial （底层原理为 Zset）

- GEOADD 添加
- GEODIST 查询距离
- GEOHASH 将二维经纬度变成一维字符串
- GEOPOS
- GEORADIUS
- GEORADIUSBYMEMBER 找出指定元素周围的其他元素

- 为什么 Redis 单线程还这么快？

1. 速度上 CPU > 内存 > 硬盘
2. Redis 是将所有数据全部放在内存中，所以单线程去操作效率就是最高的，多线程需要 CPU 上下文切换是很耗时的

### Redis 配置
- 对于clients的一些限制
  - maxclients \<number\> # 设置连接上redis的最大客户端的数量
  - maxmemory \<bytres\>  # Redis 配置最大的内存容量
  - maxmemory-policy XXXX # 内存到达上限之后的处理策略
    1. noeviction: 对可能导致增大内存的命令返回错误 (大多数写命令，DEL 除外) ;
    2. volatile-ttl: 在设置了过期时间的 key 中，选择剩余寿命 (TTL) 最短的 key，将其淘汰;
    3. volatile-lru: 在设置了过期时间的 key 中，选择最少使用的 key (RU) ，将其淘汰;
    4. volatile-random: 在设置了过期时间的 key 中，随机选择一些 key，将其淘汰;
    5. allkeys-1Lru: 在所有的 key 中，选择最少使用的 key (LRU) ，将其淘汰;
    6. allkeys-random: 在所有的 key 中，随机选择一些 key，将其淘汰;

### Redis持久化
- RDB (Redis Database)
  - 优点
  1. 适合大规模的数据恢复
  2. 对数据的完整性要求不高
  - 缺点
  1. 需要一定的时间间隔进程操作，如果Redis意外宕机了，最后一次修改的数据也就没有了
  2. Fork进程的时候，会占用一定的内容空间

- AOF (Append Only File)
  - 将所有命令（除了读操作）以日志的形势存储history文件，只许追加文件但不可以改写，恢复时候就把这个文件全部再执行一遍
  - AOF保存的是appendonly.aof文件 
  - 如果aof文件有错位，则redis无法启动，需要修复这个aof文件
    - redis-check-aof --fix
  - 优点
    1. 每一次修改操作都会被同步，文件完整性更好
    2. 从不同步情况下，效率最高
  - 缺点
    1. 每秒同步一次，可能会丢失一秒的数据
    2. 相对于数据文件来说，aof远远大于rdb，修复的速度也比rdb慢
    3. AOF运行效率也要比RDB慢，所以我们redis默认的配置就是RDB持久化
  - AOF默认无限追加文件，文件会越来越大；
    - auto-aof-rewrite-min-size 64mb
    - 如果AOF文件大于64M，Redis会FORK一个新的进程来将我们的文件进行重写

### Redis 主从复制
- info replication 查看本机信息
- SLAVEOF IP PORT
- SLAVEOF no one   当主机断开连接的时候，自己称为主机

### Redis 主从复制
- 主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点（master/leader），后者称为从节点（slave/flower）；数据的复制是单向的，只能由主节点到从节点。Master以写为主。Slave以读为主。读写分离；减缓服务器压力。
1. 数据冗余：主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式；
2. 故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务的冗余；
3. 负载均衡：在主从复制的基础上，配合读写分离，可以由主节点提供些服务，由从节点提供读服务（即写Redis数据时应用链接主节点，读Redis数据时应用链接从节点），分担男男女女服务器负载；尤其是在写少读多的场景下，通过多个从节点分担读写负载，可以大大提高Redis服务器的并发量。
4. 高可用（集群）基石：除上述作用以外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制是Redis高可用的基础。

### 哨兵模式
多哨兵模式
- sentinel monitor NAME HOST PORT WEIGHT
- 启动  redis-sentinel kconf/sentinel.conf

- 主机可以写，从机只能读
- 主机断开连接，从机依旧连接到主机的，但是没有写操作；此时，主机如果重新连接，从机依旧可以直接获取到主机写的信息

- Redis 事务本质
  - 一组命令的集合，一个事物中的所有命令都会被序列化，在事务执行过程中，会按照顺序执行；
  - 一次性，顺序性和排它性
  - Redis 的一致性不遵守原子性
- Redis 事务
  - 开启事务 multi
  - 命令入队 （Command NoSQL）
  - 执行事务 excute （取消事务/discard）
  -
  -
  -

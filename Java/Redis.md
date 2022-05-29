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

- 为什么 Redus 单线程还这么快？

1. 速度上 CPU > 内存 > 硬盘
2. Redis 是将所有数据全部放在内存中，所以单线程去操作效率就是最高的，多线程需要 CPU 上下文切换是很耗时的

- Redis 事务本质
  - 一组命令的集合，一个事物中的所有命令都会被序列化，在事务执行过程中，会按照顺序执行；
  - 一次性，顺序性和排它性
  - Redis 的一致性不遵守原子性
- Redis 事务
  - 开启事务 multi
  - 命令入队 （Command NoSQL）
  - 执行事务 excute （取消事务/discard）
  -

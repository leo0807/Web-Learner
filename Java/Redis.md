## Command  
### String
- 默认数据库：  16个 / select切换
- keys *      查看数据库所有的Key
- flushdb     清空当前数据库
- flushall    清空所有数据库
- Redis是单线程的，基于内存操作的，其性能瓶颈 源于机器的内存而不是CPU
- EXPIRE key time  为Key设置过期时间
- ttl  key    查看key的过期时间
- type key    查看key的类型
- EXISTS key  查看key是否存在
- APPEND key value 给key添加后续值value
- incr/decr key    当前key的值增加/减少1
- INCRBY/DECRBY key val   当前key的步长增加/减少val
- GENERATE startIndex endIndex 截取字符串
- SETRANGE key index val  替换指定位置的字符串
- setex（set with expire）key time value # 设置过期时间
- setnx（set if not exist）key value     # 不存在设置
- mset 批量设置  mset key1 val1 key2 val2 ...
- mget 批量获取  mget key1 key2 ...
- getset key value 先get 再set 如果不存在先返回nil 再set

### List
- LPUSH/Rpush list_name value
- Lpop/Rpop list_name
- LRANGE list_name startIndex endIdex
- lindex list_name index
- Llen list_name            获取list_name长度
- lrem list_name num value  移除list_name中num个value
- ltrim key start end       取截取元素
- rpoplpush source destination 先取再添加
- lset key index value      给key的索引index设置值为value
- LINSERT key before/after pivot value  在key的pivot之前/之后插入value

### Set
- sadd key value      set添加值value
- SMEMBERs key        查看set所有值
- SISMEBER key value  查看value是否在set key中
- scard key           查看set key中所有元素数量
- srem key value      移除set key中的value
- SRANDMEMBER key num 随机输出key中num个元素
- spop key            随机删除key中的一个set
- smove key1 key2 value
- SDIFF key1 key2     差集
- SINTER key1 key2    交集
- SUNION key1 key2    并集 
### Hash 
- hset key field value
- hget key field 
- hgetall key
- hdel key field ...
- HEXISTS key field   
- HINCRBY key field value

### Zset 有序集合
在set的基础上，增加了一个值 - 排序
- zadd key rank value rank2 value2 ...
- zrange key start stop
- ZRANGEBYSCORE key min max
- zcard key
- zount key field

### GeoSpatial （底层原理为Zset）
- GEOADD    添加
- GEODIST   查询距离
- GEOHASH   将二维经纬度变成一维字符串
- GEOPOS
- GEORADIUS
- GEORADIUSBYMEMBER 找出指定元素周围的其他元素

- 为什么Redus单线程还这么快？
1. 速度上CPU > 内存 > 硬盘
2. Redis是将所有数据全部放在内存中，所以单线程去操作效率就是最高的，多线程需要CPU上下文切换是很耗时的

- Redis 事务本质
  - 一组命令的集合，一个事物中的所有命令都会被序列化，在事务执行过程中，会按照顺序执行；
  - 一次性，顺序性和排它性
- Redis 事务
  - 开启事务 multi
  - 命令入队
  - 执行事务 excute （取消事务/discard）
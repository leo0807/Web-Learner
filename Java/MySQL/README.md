### Start/Stop/Restart MySQL

- sudo /usr/local/mysql/support-files/mysql.server start/stop/restart

- MySQL 中`varchar`与`char`的区别以及 varchar(50)中的 50 代表的涵义

1. varchar 与 char 的区别
   char 是一种固定长度的类型，varchar 则是一种可变长度的类型
2. varchar(50)中 50 的涵义
   最多存放 50 个字符，varchar(50)和(200)存储 hello 所占空间一样，但后者在排序时会消耗更多内存，因为 order by col 采用 fixed_length 计算 col 长度(memory 引擎也一样)

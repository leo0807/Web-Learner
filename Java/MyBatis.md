### MyBatis 简介

- 基于 `ORM` 的半自动轻量级持久层框架
- 优势：
  - 核心 `SQL` 可以优化
  - `Java` 和 `SQL` 分开，功能边界清晰

### JDBC 问题

1. 数据库配置信息存在硬编码问题 // 配置文件
2. 频繁创建释放数据库连接 // 连接池
3. SQL 语句，设置参数，获取结果集参数均存在硬编码问题 // 配置文件
4. 需要手动封装返回结果集，步骤繁琐 // 反射。内省

### 使用端:

提供核心配置文件:
`sqlMapConfig.xml` : 存放数据源信息，引入 `mapper.xml` Mapper.xml : sql 语句的配置文件信息
框架端:

1. 读取配置文件
   读取完成以后以流的形式存在，我们不能将读取到的配置信息以流的形式存放在内存中，不好操作，可以创建 `javaBean` 来存储
   - (1)`Configuration`: 存放数据库基本信息、`Map`<唯一标识，`Mapper`> 唯一标识:`namespace` + "." + id
   - (2)`MappedStatement`:`sql` 语句、`statement` 类型、输入参数 `java` 类型、输出参数 `java` 类型
2. 解析配置文件
   - 创建 `sqlSessionFactoryBuilder` 类:
   - 方法 `sqlSessionFactory.build()`:
     - 第一:使用 `dom4j` 解析配置文件，将解析出来的内容封装到 `Configuration` 和 `MappedStatement` 中
     - 第二:创建 `SqlSessionFactory` 的实现类 `DefaultSqlSession`
3. 创建 `SqlSessionFactory`:
   - 方法: `openSession()` : 获取 `sqlSession` 接口的实现类实例对象
4. 创建 sqlSession 接口及实现类:
   - 主要封装 `crud` 方法 方法:selectList(String statementId,Object param):查询所有 selectOne(String statementId,Object param):查询单个 具体实现:封装 JDBC 完成对数据库表的查询操作

- 涉及到的设计模式:
  - Builder 构建者设计模式、工厂模式、代理模式

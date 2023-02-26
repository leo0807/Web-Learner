# Java

- int 与 Integer 的基本使用对比

  - Integer 是 int 的包装类；int 是基本数据类型；
  - Integer 变量必须实例化后才能使用；int 变量不需要；
  - Integer 实际是对象的引用，指向此 new 的 Integer 对象；int 是直接存储数据值；
  - Integer 的默认值是 null；int 的默认值是 0。

- Map 、HashTable 和 HashMap 的区别

1. Map 是一个接口，HashMap 是一个框架 Java 集合类。

2. Map 接口可以通过使用它的实现类来实现。相比之下，HashMap 类实现了 Map 接口。

3. Map 包含唯一的密钥对值。但是，HashMap 可以保存重复值。

4. Map 不允许空值。但是 HashMap 可以有一个空键和多个值。

5. Map 有两种实现，分别是 HashMap 和 TreeMap。而 HashMap 实现了 Map 接口并扩展了 AbstractMap 类。

6. Map 和 HashMap 对象之间没有区别

- Java 的基本数据类型
  八种基本数据类型：byte、short、char、int、long、double、float、boolean。

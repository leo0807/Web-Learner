# Java

- int 与 Integer 的基本使用对比

  - Integer 是 int 的包装类；int 是基本数据类型；
  - Integer 变量必须实例化后才能使用；int 变量不需要；
  - Integer 实际是对象的引用，指向此 new 的 Integer 对象；int 是直接存储数据值；
  - Integer 的默认值是 null；int 的默认值是 0。

- Map 、HashTable 和 HashMap 的区别

1. `Map` 是一个接口，`HashMap` 是一个框架 Java 集合类; HashMap 和 HashTable 是都实现了 Map 接口的类，实际上 HashMap 是 HashTable 轻量级实现（非线程安全的实现），二者的区别类似于 ArrayList 和 Vector 的区别：

- `HashMap`和`ArrayList`都是线程不同步的，即线程不安全的，但只有一个线程访问时效率较高；
- `HashMap`实现线程同步需要使用下面语句：`Map m = Collections.synchronizeMap(hashMap);`
- `HashTable`和`Vector`都是线程同步的，即多线程安全，但相比于上面的访问效率较低;
- `HashTable`使用`Enumberation`遍历，`HashMap`使用`Iterator`遍历;
- `HashTalbe`直接使用对象的`HashCode`，而`HashMap`重新计算`hash`值;

2. Map 接口可以通过使用它的实现类来实现。相比之下，HashMap 类实现了 Map 接口。

3. Map 包含唯一的密钥对值。但是，HashMap 可以保存重复值。

4. Map 不允许空值。但是 HashMap 可以有一个空键和多个值。

5. Map 有两种实现，分别是 HashMap 和 TreeMap。而 HashMap 实现了 Map 接口并扩展了 AbstractMap 类。

6. Map 和 HashMap 对象之间没有区别
7. `HashMap`是采用“链表数组”的数据结构，即数组和链表的结合体（在 JDK1.8 中还引入了红黑树结构，当一个链表上的结点达到 8 时改为红黑树结构）

| 类        | 父类        | 是否线程同步   | KV 值可否为空 |
| --------- | ----------- | -------------- | ------------- |
| HashMap   | AbstractMap | 否             | 是            |
| HashTable | Dictionary  | 是(即线程安全) | 否            |

- 如果 HashMap 的大小超过了负载因子(load factor)定义的容量，怎么办？

  - HashMap 的默认负载因子大小为`0.75`，也就是说当一个 map 填满了 75%的时候，和其它集合类(如 ArrayList 等)一样，将会创建原来 HashMap 大小的两倍，来重新调整 map 的大小，并将原来的对象放入新的数组中。这个过程叫作 rehashing，因为它调用 hash 方法找到新的链表位置

- Java 的基本数据类型
  八种基本数据类型：byte、short、char、int、long、double、float、boolean。

- `final` 的作用

1. 用来修饰一个引用

- 如果引用为基本数据类型，则该引用为常量，该值无法修改；
- 如果引用为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。
- 如果引用时类的成员变量，则必须当场赋值，否则编译会报错。

2. 用来修饰一个方法

- 当使用 final 修饰方法时，这个方法将成为最终方法，无法被子类重写。但是，该方法仍然可以被继承。

3. 用来修饰类

- 当用 final 修改类时，该类成为最终类，无法被继承。比如常用的 String 类就是最终类。

- 普通类和抽象类有哪些区别？

  1. 抽象类不能被实例化；
  2. 抽象类可以有抽象方法，只需申明，无须实现；
  3. 有抽象方法的类一定是抽象类；
  4. 抽象类的子类必须实现抽象类中的所有抽象方法，否则子类仍然是抽象类；
  5. 抽象方法不能声明为静态、不能被 static、final 修饰。

- `String str="i"`与 `String str=new String(“i”)`一样吗？

  - `String str="i"`会将起分配到常量池中，常量池中没有重复的元素，如果常量池中存中 i，就将 i 的地址赋给变量，如果没有就创建一个再赋给变量。

  - `String str = new String(“i”);`会将对象分配到堆中，即使内存一样，还是会重新创建一个新的对象

### 参考文献

- [10 万字 208 道 Java 经典面试题总结(附答案)](https://blog.csdn.net/guorui_java/article/details/119299329)

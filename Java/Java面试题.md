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

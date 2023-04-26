# JVM的作用
- JVM是Java Virtual Machine的缩写。我们安装的JDK中包含了JRE，在JRE中，包含了java的虚拟机和核心类库，如果想要运行java程序，则需要上述的JRE环境；
- Java是一门高级程序语言，它符合人的使用习惯，但不符合电脑的理解（二进制）。直接运行在硬件上并不现实，所以要在运行之前，需要对其进行一些转换。
- 转换过程：通过编译器将java程序转换成虚拟机能识别的指令序列，也叫做java字节码。java虚拟机会将字节码文件（.class文件）加载到JVM中，由JVM进行解释和执行。 JVM运行在操作系统之上，与硬件没有直接的交互。
- JVM不仅仅能执行JAVA程序转换的字节码，kotlin啥的转化为字节码都能用。
简而言之JVM的两个作用：
- 第一、运行并管理`Java`源码文件所生成的Class文件。
- 第二、在不同的操作系统上安装不同的`JVM`，从而去实现跨平台的一个保障。

![JVM运行](https://img-blog.csdnimg.cn/182894a10cb0407281ff98564f4234f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGlrZTc2,size_20,color_FFFFFF,t_70,g_se,x_16)

一般情况下，即使不熟悉jvm的运行机制，也不影响业务代码的一个开发。因为在安装完JDK或者JRE之后，其中就已经内置了jvm。所以只需要将Class交给jvm运行就可以了。但当程序运行过程中，出现了问题，而这个问题发生在jvm层面的时候，我们就需要去熟悉jvm的运行机制，才能够去迅速排查并解决jvm的性能问题
## 运行时数据区域
![运行时数据区域](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxNy85LzQvZGQzYjE1YjNkODgyNmZhZWFlMjA2Mzk3NmZiOTkyMTM_aW1hZ2VWaWV3Mi8wL3cvMTI4MC9oLzk2MC9mb3JtYXQvd2VicC9pZ25vcmUtZXJyb3IvMQ)
### 程序计数机（PCR）的定义 特点和作用 
- 定义：是一块较小的内存空间，线程私有。字节码解释器工作是就是通过改变这个计数器的值来选取下一条需要执行指令的字节码指令，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖计数器完成
- 如果是`java方法`，计数器记录的就是当前线程正在执行的字节码指令地址
- 如果是`native方法`，那么程序计数器值为`undefined`
- 作用：字节码`解释器`通过改变`PCR`依次读取指令，实现代码的流程控制。如顺序执行，异常处理
- 多线程情况下，PCR用于记录当前线程执行的位置，从而当线程被切换回来的时候能够知道该线程执行到哪了。
- 此内存区域是唯一一个在 Java 虚拟机规范中没有规定任何 OutOfMemoryError 情况的区域。
- 特点：较小的内存空间，每个线程都有一个独立的程序计数器。
### Java 虚拟机栈
- 线程私有，生命周期和线程一致。描述的是 Java 方法执行的内存模型：每个方法在执行时都会床创建一个栈帧(Stack Frame)用于存储局部变量表、操作数栈、动态链接、方法出口等信息。每一个方法从调用直至执行结束，就对应着一个栈帧从虚拟机栈中入栈到出栈的过程。
- 局部变量表：存放了编译期可知的各种基本类型(boolean、byte、char、short、int、float、long、double)、对象引用(reference 类型)和 returnAddress 类型(指向了一条字节码指令的地址)
- `StackOverflowError`：线程请求的栈深度大于`虚拟机`所允许的深度。
- `OutOfMemoryError`：如果虚拟机栈可以动态扩展，而扩展时无法申请到足够的内存。
- 作用：存放方法参数和局部变量
- 特点：局部变量表的创建是在方法被执行的时候，随着栈帧创建而创建。表的大小在编译时就确定。栈内存默认最大是`1M`.
### 本地方法栈
- 定义：是用于管理Native Method(本地方法)的调用，主要是用C和C++实现
- 特性：线程私有   后进先出   作用是支撑Native方法调用，执行和退出
- 区别于`Java`虚拟机栈的是，`Java`虚拟机栈为虚拟机执行`Java`方法(也就是`字节码`)服务，而本地方法栈则为虚拟机使用到的 Native 方法服务。也会有 StackOverflowError 和 OutOfMemoryError 异常。
![Native Method Stack](https://img-blog.csdnimg.cn/20200402151248504.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9qaW4yMWNlbg==,size_16,color_FFFFFF,t_70)
### Java 堆( Heap )
- 定义：是一块内存区域，jvm启动时创建，存放所有的类实例以及数组对象，除此之外，还可以保存对象其他信息，如（哈希码，GC标志，同步锁信息）。
- 特点：java虚拟机所需管理的内存中`最大`的一块，是所有线程`共享`的一块内存区域，在虚拟机`启动`时创建，大小可以固定也可以`扩展`。
- 对于绝大多数应用来说，这块区域是`JVM`所管理的内存中最大的一块。线程共享，主要是存放对象实例和数组。内部会划分出多个线程私有的分配缓冲区(`Thread Local Allocation Buffer`, TLAB)。可以位于物理上不连续的空间，但是逻辑上要连续。
- `OutOfMemoryError`：如果堆中没有内存完成实例分配，并且堆也无法再扩展时，抛出该异常。

### 方法区（用来存放方法和static变量。）
- 定义：是堆的一个逻辑区划部分，护体实现根据不同虚拟机来实现。主要存放已经被虚拟机加载类型的相关信息，类信息：类名，访问修饰符，方法描述，运行时常量池，静态变量。
- 特点是：线程共享，内存的回收效率低，信息一般长期存在。
各个区域的存储内容：
![Java虚拟机运行时数据区](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxNy85LzQvZGE3N2Q5MDE0Njc4NmMwY2IzZTE3MGI5YzkzNzZhZTQ_aW1hZ2VWaWV3Mi8wL3cvMTI4MC9oLzk2MC9mb3JtYXQvd2VicC9pZ25vcmUtZXJyb3IvMQ)

### JVM调优的三大参数
- `-Xss`：规定了每个线程虚拟机栈的大小（影响并发线程数大小）
- `-Xms`：堆大小的初始值（超过初始值会扩容到最大值）
- `-Xmx`：堆大小的最大值（通常初始值和最大值一样，因为扩容会导致内存抖动，影响程序运行稳定性）
### Jvm中堆和栈的区别
- 管理方式：栈时自动释放，堆需要`GC`
- 效率：栈的效率比堆高
- 空间大小：栈比堆小

### 运行时常量池
属于方法区一部分，用于存放编译期生成的各种字面量和符号引用。编译器和运行期(String 的 intern() )都可以将常量放入池中。内存有限，无法申请时抛出 OutOfMemoryError。

### 直接内存
- 非虚拟机运行时数据区的部分
- 在`JDK 1.4`中新加入 NIO (New Input/Output) 类，引入了一种基于通道(Channel)和缓存(Buffer)的 I/O 方式，它可以使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。可以避免在 Java 堆和 Native 堆中来回的数据耗时操作。
- `OutOfMemoryError`：会受到本机内存限制，如果内存区域总和大于物理内存限制从而导致动态扩展时出现该异常。

## 1.2 HotSpot 虚拟机对象探秘
主要介绍数据是如何创建、如何布局以及如何访问的。
### 对象的创建

1. 遇到`new`指令时，首先检查这个指令的参数是否能在`常量池`中定位到一个类的`符号引用`，并且检查这个符号引用代表的类是否已经被`加载`、解析和初始化过。如果没有，执行相应的类加载。

2. 类加载检查通过之后，为新对象`分配内存`(内存大小在类加载完成后便可确认)。在堆的空闲内存中划分一块区域(‘指针碰撞-内存规整’或‘空闲列表-内存交错’的分配方式)。

3. 前面讲的每个线程在堆中都会有私有的`分配缓冲区`(TLAB)，这样可以很大程度避免在`并发`情况下频繁创建对象造成的线程不安全。

4. 内存空间分配完成后会初始化为`0`(不包括对象头)，接下来就是填充对象头，把对象是哪个类的实例、如何才能找到类的元数据信息、对象的哈希码、对象的`GC`分代年龄等信息存入对象头。

5. 执行`new`指令后执行`init`方法后才算一份真正可用的对象创建完成。

### 对象的内存布局
- 在 HotSpot 虚拟机中，分为 3 块区域：对象头(Header)、实例数据(Instance Data)和对齐填充(Padding)

- 对象头(`Header`)：包含两部分，第一部分用于存储对象自身的运行时数据，如`哈希码`、`GC 分代年龄`、`锁状态标志`、`线程持有的锁`、`偏向线程 ID`、`偏向时间戳`等，32 位虚拟机占`32 bit`，64 位虚拟机占`64 bit`。官方称为 ‘Mark Word’。第二部分是`类型指针`，即对象指向它的类的元数据指针，虚拟机通过这个指针确定这个对象是哪个类的实例。另外，如果是 Java 数组，对象头中还必须有一块用于记录数组长度的数据，因为普通对象可以通过 Java 对象元数据确定大小，而数组对象不可以。
- 实例数据(Instance Data)：程序代码中所定义的各种类型的字段内容(包含父类继承下来的和子类中定义的)。
- 对齐填充(Padding)：不是必然需要，主要是占位，保证对象大小是某个字节的整数倍。



## 参考
- [为什么要有jvm，jvm的作用？](https://www.cnblogs.com/Chen12138/p/16853896.html)
- [JavaEE核心【JVM 的作用、类加载器、JVM内存模型、GC回收机制】](https://blog.csdn.net/weixin_43923463/article/details/122797596)
- [JVM的作用](https://www.jianshu.com/p/61d22cc36165/)
- [Java虚拟机（JVM）你只要看这一篇就够了！](https://blog.csdn.net/qq_41701956/article/details/81664921?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168238925616800213096142%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=168238925616800213096142&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-81664921-null-null.142^v86^insert_down1,239^v2^insert_chatgpt&utm_term=java%E8%99%9A%E6%8B%9F%E6%9C%BA&spm=1018.2226.3001.4187)
- [JVM的基本理解](https://blog.csdn.net/Klaus_Xin/article/details/125110825)

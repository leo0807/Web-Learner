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

### 本地方法栈
- 区别于`Java`虚拟机栈的是，`Java`虚拟机栈为虚拟机执行`Java`方法(也就是`字节码`)服务，而本地方法栈则为虚拟机使用到的 Native 方法服务。也会有 StackOverflowError 和 OutOfMemoryError 异常。
### Java 堆
- 对于绝大多数应用来说，这块区域是`JVM`所管理的内存中最大的一块。线程共享，主要是存放对象实例和数组。内部会划分出多个线程私有的分配缓冲区(Thread Local Allocation Buffer, TLAB)。可以位于物理上不连续的空间，但是逻辑上要连续。
- OutOfMemoryError：如果堆中没有内存完成实例分配，并且堆也无法再扩展时，抛出该异常。
### 方法区
属于共享内存区域，存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。
各个区域的存储内容：
![Java虚拟机运行时数据区](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxNy85LzQvZGE3N2Q5MDE0Njc4NmMwY2IzZTE3MGI5YzkzNzZhZTQ_aW1hZ2VWaWV3Mi8wL3cvMTI4MC9oLzk2MC9mb3JtYXQvd2VicC9pZ25vcmUtZXJyb3IvMQ)

### 运行时常量池
属于方法区一部分，用于存放编译期生成的各种字面量和符号引用。编译器和运行期(String 的 intern() )都可以将常量放入池中。内存有限，无法申请时抛出 OutOfMemoryError。

### 直接内存
- 非虚拟机运行时数据区的部分
- 在`JDK 1.4`中新加入 NIO (New Input/Output) 类，引入了一种基于通道(Channel)和缓存(Buffer)的 I/O 方式，它可以使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。可以避免在 Java 堆和 Native 堆中来回的数据耗时操作。
- `OutOfMemoryError`：会受到本机内存限制，如果内存区域总和大于物理内存限制从而导致动态扩展时出现该异常。

## 1.2 HotSpot 虚拟机对象探秘
主要介绍数据是如何创建、如何布局以及如何访问的。


## 参考
- [为什么要有jvm，jvm的作用？](https://www.cnblogs.com/Chen12138/p/16853896.html)
- [JavaEE核心【JVM 的作用、类加载器、JVM内存模型、GC回收机制】](https://blog.csdn.net/weixin_43923463/article/details/122797596)
- [JVM的作用](https://www.jianshu.com/p/61d22cc36165/)
- [JVM](https://blog.csdn.net/qq_41701956/article/details/81664921?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168238925616800213096142%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=168238925616800213096142&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-81664921-null-null.142^v86^insert_down1,239^v2^insert_chatgpt&utm_term=java%E8%99%9A%E6%8B%9F%E6%9C%BA&spm=1018.2226.3001.4187)
- [JVM的基本理解](https://blog.csdn.net/Klaus_Xin/article/details/125110825)

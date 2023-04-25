# JVM的作用
- JVM是Java Virtual Machine的缩写。我们安装的JDK中包含了JRE，在JRE中，包含了java的虚拟机和核心类库，如果想要运行java程序，则需要上述的JRE环境；
- Java是一门高级程序语言，它符合人的使用习惯，但不符合电脑的理解（二进制）。直接运行在硬件上并不现实，所以要在运行之前，需要对其进行一些转换。
- 转换过程：通过编译器将java程序转换成虚拟机能识别的指令序列，也叫做java字节码。java虚拟机会将字节码文件（.class文件）加载到JVM中，由JVM进行解释和执行。 JVM运行在操作系统之上，与硬件没有直接的交互。
- JVM不仅仅能执行JAVA程序转换的字节码，kotlin啥的转化为字节码都能用。
简而言之JVM的两个作用：
- 第一、运行并管理`Java`源码文件所生成的Class文件。
- 第二、在不同的操作系统上安装不同的`JVM`，从而去实现跨平台的一个保障。

![JVM运行]（https://img-blog.csdnimg.cn/182894a10cb0407281ff98564f4234f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGlrZTc2,size_20,color_FFFFFF,t_70,g_se,x_16）

一般情况下，即使不熟悉jvm的运行机制，也不影响业务代码的一个开发。因为在安装完JDK或者JRE之后，其中就已经内置了jvm。所以只需要将Class交给jvm运行就可以了。但当程序运行过程中，出现了问题，而这个问题发生在jvm层面的时候，我们就需要去熟悉jvm的运行机制，才能够去迅速排查并解决jvm的性能问题

## 参考
- [为什么要有jvm，jvm的作用？](https://www.cnblogs.com/Chen12138/p/16853896.html)
- [JavaEE核心【JVM 的作用、类加载器、JVM内存模型、GC回收机制】](https://blog.csdn.net/weixin_43923463/article/details/122797596)
- [JVM的作用](https://www.jianshu.com/p/61d22cc36165/)

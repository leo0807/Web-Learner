# JMM（Java Memory Model）

## 什么是JMM
- JMM就是Java内存模型(java memory model)。因为在不同的硬件生产商和不同的操作系统下，内存的访问有一定的差异，所以会造成相同的代码运行在不同的系统上会出现各种问题。所以java内存模型(JMM)屏蔽掉各种硬件和操作系统的内存访问差异，以实现让java程序在各种平台下都能达到一致的`并发效果`。
- Java内存模型规定所有的变量都存储在主内存中，包括实例变量，静态变量，但是不包括局部变量和方法参数。每个线程都有自己的工作内存，线程的工作内存保存了该线程用到的变量和主内存的副本拷贝，线程对变量的操作都在工作内存中进行。线程不能直接读写主内存中的变量。
- 不同的线程之间也无法访问对方工作内存中的变量。线程之间变量值的传递均需要通过主内存来完成。
- 每个线程的工作内存都是独立的，线程操作数据只能在工作内存中进行，然后刷回到主存。这是 Java 内存模型定义的线程基本工作方式。
![JMM](https://pic3.zhimg.com/80/v2-f36f366c07a6188ea3fdefc794ba021a_1440w.webp)

## JMM定义了什么
Java内存模型实际上是围绕着三个特征建立起来的。分别是：`原子性`，`可见性`，`有序性`。这三个特征可谓是整个Java并发的基础。
### 原子性
原子性包含2个指标，分别指的是一个操作是不可分割且不可中断的，一个线程在执行时不会被其他线程干扰。
举例：
```
int i = 2;
int j = i;
i++;
i = i + 1;
```
1. 第一句是基本类型赋值操作，必定是原子性操作。
2. 第二句先读取i的值，再赋值到j，两步操作，不能保证原子性。
3. 第三和第四句其实是等效的，先读取i的值，再+1，最后赋值到i，三步操作了，不能保证原子性。

- JMM只能保证基本的原子性，如果要保证一个代码块的原子性，提供了`monitorenter` 和 `moniterexit` 两个字节码指令，也就是 `synchronized` 关键字。因此在 `synchronized` 块之间的操作都是原子性的。

### 可见性
可见性指当一个线程修改共享变量的值，其他线程能够立即知道被修改了。`Java`是利用`volatile`关键字来提供可见性的。 当变量被`volatile`修饰时，这个变量被修改后会立刻刷新到主内存，当其它线程需要读取该变量时，会去主内存中读取新值。而普通变量则不能保证这一点。
1. 除了`volatile`关键字之外，`final`和`synchronized`也能实现可见性。
2. `synchronized`的原理是，在执行完，进入`unlock`之前，必须将共享变量同步到主内存中。
3. `final`修饰的字段，一旦初始化完成，如果没有对象溢出（指对象为初始化完成就可以被别的线程使用），那么对于其他线程都是可见的。
### 有序性
- 在`Java`中，可以使用`synchronized`或者`volatile`保证多线程之间操作的有序性。实现原理有些区别：
- `volatile`关键字是使用内存屏障达到`禁止`指令重排序，以保证有序性。
- `synchronized`的原理是，一个线程`lock`之后，必须`unlock`后，其他线程才可以重新`lock`，使得被`synchronized`包住的代码块在多线程之间是串行执行的。
## 8种内存交互操作
![JMM](https://pic4.zhimg.com/80/v2-42d8f894f17ccf13252d8d8d6285f86b_1440w.webp)
- lock(锁定)，作用于主内存中的变量，把变量标识为线程独占的状态。
- read(读取)，作用于主内存的变量，把变量的值从主内存传输到线程的工作内存中，以便下一步的load操作使用。
- load(加载)，作用于工作内存的变量，把read操作主存的变量放入到工作内存的变量副本中。
- use(使用)，作用于工作内存的变量，把工作内存中的变量传输到执行引擎，每当虚拟机遇到一个需要使用到变量的值的字节码指令时将会执行这个操作。
- assign(赋值)，作用于工作内存的变量，它把一个从执行引擎中接受到的值赋值给工作内存的变量副本中，每当虚拟机遇到一个给变量赋值的字节码指令时将会执行这个操作。
- store(存储)，作用于工作内存的变量，它把一个从工作内存中一个变量的值传送到主内存中，以便后续的write使用。
- write(写入)：作用于主内存中的变量，它把store操作从工作内存中得到的变量的值放入主内存的变量中。
- unlock(解锁)：作用于主内存的变量，它把一个处于锁定状态的变量释放出来，释放后的变量才可以被其他线程锁定。

### 8种内存交互操作的规则
- 不允许read、load、store、write操作之一单独出现，也就是read操作后必须load，store操作后必须write。
- 不允许线程丢弃他最近的assign操作，即工作内存中的变量数据改变了之后，必须告知主存。
- 不允许线程将没有assign的数据从工作内存同步到主内存。
- 一个新的变量必须在主内存中诞生，不允许工作内存直接使用一个未被初始化的变量。就是对变量实施use、store操作之前，必须经过load和assign操作。
- 一个变量同一时间只能有一个线程对其进行lock操作。多次lock之后，必须执行相同次数unlock才可以解锁。
- 如果对一个变量进行lock操作，会清空所有工作内存中此变量的值。在执行引擎使用这个变量前，必须重新load或assign操作初始化变量的值。
- 如果一个变量没有被lock，就不能对其进行unlock操作。也不能unlock一个被其他线程锁住的变量。
- 一个线程对一个变量进行unlock操作之前，必须先把此变量同步回主内存。



## Volatile
### `volatile`关键字的作用
1. 保证线程间变量的`可见性`
2. 禁止CPU进行指令`重排序`
### 可见性
原理如图所示：
![JMM](https://pic3.zhimg.com/80/v2-2ce112590b4b81cdb02b8839d9d8b686_1440w.webp)
### volatile不一定能保证线程安全
```
public class VolatileTest extends Thread {

    private static volatile int count = 0;

    public static void main(String[] args) throws Exception {
        Vector<Thread> threads = new Vector<>();
        for (int i = 0; i < 100; i++) {
            VolatileTest thread = new VolatileTest();
            threads.add(thread);
            thread.start();
        }
        //等待子线程全部完成
        for (Thread thread : threads) {
            thread.join();
        }
        //输出结果，正确结果应该是1000，实际却是984
        System.out.println(count);//984
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                //休眠500毫秒
                Thread.sleep(500);
            } catch (Exception e) {
                e.printStackTrace();
            }
            count++;
        }
    }
}
```
- 可见性不能保证操作的原子性，前面说过了`count++`不是原子性操作，会当做三步，先读取`count`的值，然后`+1`，最后赋值回去`count`变量。需要保证线程安全的话，需要使用`synchronized`关键字或者`lock`锁，给`count++`这段代码上锁：
```
private static synchronized void add() {
    count++;
}
```
### 禁止指令重排序
![JMM](https://pic1.zhimg.com/80/v2-f50b6067d0c759b20bc7bea72f0e4690_1440w.webp)
## References
- [面试官问我什么是JMM](https://zhuanlan.zhihu.com/p/258393139)

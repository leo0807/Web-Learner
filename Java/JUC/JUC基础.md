# JUC基础

## 为什么条件锁会产生虚假唤醒现象（spurious wakeup）？
在不同的语言，甚至不同的操作系统上，条件锁都会产生虚假唤醒现象。所有语言的条件锁库都推荐用户把wait()放进循环里：
```
while (!cond) {
    lock.wait();
}
```
### 产生原因
以生产者消费为例：
```
作者：zzyang
链接：https://www.zhihu.com/question/271521213/answer/2449371460
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

public class SpuriousWakeupDemo {

    public static void main(String[] args) throws Exception{
        Producer producer = new Producer();

        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    producer.increment();
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
            }
        },"生产者线程A").start();

        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    producer.decrement();
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
            }
        },"消费者线程B").start();

        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    producer.decrement();
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
            }
        },"消费者线程C").start();

    }


    static class Producer {

        private int count = 0;

        public synchronized void increment() throws Exception {
            if (count > 0) {
                wait();
            }

            count++;

            System.out.println("【" + Thread.currentThread().getName() + "】生产后数量为" + count);

            notifyAll();
        }

        public synchronized void decrement() throws Exception {
            if (count <= 0) {
                wait();
            }

            count--;

            System.out.println("【" + Thread.currentThread().getName() + "】消费后数量为" + count);

            notifyAll();
        }
    }

}
```
假设某一时刻，count 为 0 ，B、C两个消费者线程按顺序（因为加锁的缘故）调用decrement都发现count为0，就都会调用wait方式进行释放锁进行等待，然后线程A也调用increment，判断是0，不满足调用wait条件，然后将count加成1之后，调用notifyAll方法同时唤醒B、C线程，A执行完代码，释放了锁；B、C被唤醒之后，假设B抢到锁，C没抢到，C继续阻塞，B从wait方法那继续往下走，将count减1，此时count变为0，B执行完释放了锁之后C这时抢到了锁，也从wait方法那继续执行代码，然后也将count减1，这下出现问题了，线程B减完之后就是0了，线程C又将count=0减1，那不就变成-1了，所以这就产生的负数的情况。

作者：zzyang
链接：https://www.zhihu.com/question/271521213/answer/2449371460
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
### 什么是虚假唤醒？
虚假唤醒就是由于把所有线程都唤醒了，但是只有其中一部分是有用的唤醒操作，其余的唤醒都是无用功，对于不应该被唤醒的线程而言，便是虚假唤醒。

### 如何解决虚假唤醒？
```
As in the one argument version, interrupts and spurious wakeups are
possible, and this method should always be used in a loop:
<pre>
 synchronized (obj) {
 while (&lt;condition does not hold&gt;)
   obj.wait();
    // Perform action appropriate to condition
  }
</pre>
```
这段注释主要是告诉我们，可能会出现虚假唤醒的现象，可以用过`while`条件来代替`if`条件来解决虚假唤醒的问题。在`while`中调用`wait`方法，而不是在`if`中。那么为什么`while`可以解决虚假唤醒？
就拿上面的例子来说，当`C`获取到锁，执行代码，但是由于是`while`循环，再一次判断`count`是不是小于等于`0`，发现此时`count`是`0`，`while`条件满足，则继续调用`wait`方法进入等待，而不是执行`count--`，就避免了出现负数的情况。

## References
- [为什么条件锁会产生虚假唤醒现象（spurious wakeup）？](https://www.zhihu.com/question/271521213)

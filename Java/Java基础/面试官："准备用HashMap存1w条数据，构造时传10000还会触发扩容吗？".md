- PS：本文所涉及代码，均以 JDK 1.8 中 HashMap 的源码举例。
### `HashMap`的初始化
- 在 HashMap 中，提供了一个指定初始容量的构造方法 HashMap(int initialCapacity)，这个方法最终会调用到 HashMap 另一个构造方法，其中的参数 loadFactor 就是默认值 0.75f。
  ```
public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
public HashMap(int initialCapacity, float loadFactor) {
  	......
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}
```
- 其中的成员变量 threshold 就是用来存储，触发 HashMap 扩容的阈值，也就是说，当 HashMap 存储的数据量达到 threshold 时，就会触发扩容。
- 从构造方法的逻辑可以看出，HashMap 并不是直接使用外部传递进来的 initialCapacity，而是经过了 tableSizeFor() 方法的处理，再赋值到 threshold 上。
  ```
  static final int tableSizeFor(int cap){
    int n = cap = 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1: (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
  ```
  
  - 关于如何选择 `initialCapacity`，我们看看阿里巴巴 Java 开发规范，规范要求在初始化 HashMap 时，必须指定 initialCapacity，因为这样可以减少 `resize` 次数，提高程序效率。
    因为 `threshold = initialCapacity * loadFactor`，所以 `initialCapacity = (需要存储元素个数 / loadFactor) + 1`。![Uploading image.png…]()

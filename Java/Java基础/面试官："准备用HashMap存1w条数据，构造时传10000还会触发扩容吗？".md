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
### 示例
- 想要使用 HashMap 存放 10000 条数据，应该设置 `initialCapacity = 10000 / 0.75 + 1 = 13334`，然后哈希表容量会被 `tableSizeFor` 方法调整到 `16384(2^14)`，`threshold = 16384 * 0.75 = 12288` 足够存储 `10000` 条数据而不会触发扩容。
- `table.size = threshold * loadFactor`

### 总结
- HashMap 构造方法传递的 initialCapacity，虽然在处理后被存入了 loadFactor 中，但它实际表示 table 的容量。
- 构造方法传递的 initialCapacity，最终会被 tableSizeFor() 方法动态调整为 2 的 N 次幂，以方便在扩容的时候，计算数据在 newTable 中的位置。
- 如果设置了 table 的初始容量，会在初始化 table 时，将扩容阈值 threshold 重新调整为 table.size * loadFactor。
- HashMap 是否扩容，由 threshold 决定，而 threshold 又由初始容量和 loadFactor 决定。
- 如果我们预先知道 HashMap 数据量范围，可以预设 HashMap 的容量值来提升效率，但是需要注意要考虑装载因子的影响，才能保证不会触发预期之外的动态扩容。

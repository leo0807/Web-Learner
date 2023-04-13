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
 
 - 当我们首次调用 `HashMap` 的 `put()` 方法存数据时，如果发现 `table` 为 `null`，则会调用 `resize()` 去初始化 `table`，具体逻辑在 `putVal()` 方法中。
  ```
  final V putVal(int hash, K key, V value, boolean onlyIfAbsent,boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
      n = (tab = resize()).length; // 调用 resize()
    // ...
  }
  ``` 
- 在 `resize()` 方法中，调整了最终 `threshold` 值，以及完成了 `table` 的初始化。
  ```
  final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; 
    }
    else if (oldThr > 0) 
        newCap = oldThr; // ①
    else {               
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
      	// ②
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr; // ③
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab; // ④
  	// ....
  }
  ```  
- 因为 resize() 还糅合了动态扩容的逻辑，所以我将初始化 table 的逻辑用注释标记出来了。其中 xxxCap 和 xxxThr 分别对应了 table 的容量和动态扩容的阈值，所以存在旧和新两组数据。
- 当我们指定了初始容量，且 table 未被初始化时，oldThr 就不为 0，则会走到代码 ① 的逻辑。在其中将 newCap 赋值为 oldThr，也就是新创建的 table 会是我们构造的 HashMap 时指定的容量值。
- 之后会进入代码 ② 的逻辑，其中就通过装载因子（loadFactor）调整了新的阈值（newThr），当然这里也做了一些限制需要让 newThr 在一个合法的范围内。
  在代码 ③ 中，将使用 loadFactor 调整后的阈值，重新保存到 threshold 中。并通过 newCap 创建新的数组，将其指定到 table 上，完成 table 的初始化（代码 ④）。
  到这里也就清楚了，虽然我们在初始化时，传递进来的 initialCapacity 虽然被赋值给 threshold，但是它实际是 table 的尺寸，并且最终会通过 loadFactor 重新调整 threshold。
  那么回到之前的问题就有答案了，虽然 HashMap 初始容量指定为 1000，但是它只是表示 table 数组为 1000，扩容的重要依据扩容阈值会在 resize() 中调整为 768（1024 * 0.75）。
  它是不足以承载 1000 条数据的，最终在存够 1k 条数据之前，还会触发一次动态扩容
  
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
